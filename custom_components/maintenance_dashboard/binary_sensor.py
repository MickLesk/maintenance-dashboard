from __future__ import annotations

import asyncio
from collections.abc import Callable
from typing import Any

from homeassistant.components.binary_sensor import BinarySensorDeviceClass, BinarySensorEntity
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback

from .const import DASHBOARD_URL, DOMAIN
from .entity_management import (
    async_cleanup_orphaned_task_entities,
    dashboard_device_info,
    desired_task_binary_specs,
    task_device_info,
)
from .manager import MaintenanceManager
from .task_entities import task_entity_base_name, task_metric_icon


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry, async_add_entities) -> None:
    manager: MaintenanceManager = hass.data[DOMAIN][entry.entry_id]
    async_add_entities([MaintenanceCriticalBinarySensor(manager), MaintenanceWarningBinarySensor(manager)])
    platform = MaintenanceTaskBinaryPlatform(hass, entry, manager, async_add_entities)
    await platform.async_sync()
    entry.async_on_unload(manager.async_add_listener(platform.schedule_sync))
    entry.async_on_unload(platform.unload)


class _BaseMaintenanceBinarySensor(BinarySensorEntity):
    _attr_has_entity_name = True
    _attr_device_class = BinarySensorDeviceClass.PROBLEM
    _attr_should_poll = False

    def __init__(self, manager: MaintenanceManager) -> None:
        self._manager = manager
        self._remove_listener: Callable[[], None] | None = None

    async def async_added_to_hass(self) -> None:
        self._remove_listener = self._manager.async_add_listener(self.async_write_ha_state)

    async def async_will_remove_from_hass(self) -> None:
        if self._remove_listener:
            self._remove_listener()
            self._remove_listener = None


class MaintenanceCriticalBinarySensor(_BaseMaintenanceBinarySensor):
    _attr_unique_id = f"{DOMAIN}_has_critical_tasks"
    _attr_name = "Has Critical Tasks"
    _attr_icon = "mdi:alert-circle"
    _attr_device_info = dashboard_device_info()

    @property
    def is_on(self) -> bool:
        return self._manager.get_summary()["critical"] > 0

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        return {"dashboard_url": DASHBOARD_URL, "critical": self._manager.get_summary()["critical"]}


class MaintenanceWarningBinarySensor(_BaseMaintenanceBinarySensor):
    _attr_unique_id = f"{DOMAIN}_has_warning_tasks"
    _attr_name = "Has Warning Tasks"
    _attr_icon = "mdi:alert-outline"
    _attr_device_info = dashboard_device_info()

    @property
    def is_on(self) -> bool:
        return self._manager.get_summary()["warning"] > 0

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        return {"dashboard_url": DASHBOARD_URL, "warning": self._manager.get_summary()["warning"]}


class MaintenanceTaskDueBinarySensor(_BaseMaintenanceBinarySensor):
    def __init__(self, manager: MaintenanceManager, task_id: str, unique_id: str) -> None:
        super().__init__(manager)
        self._task_id = task_id
        self._attr_unique_id = unique_id
        self._refresh_metadata()

    def update_task_reference(self, task_id: str) -> None:
        self._task_id = task_id
        self._refresh_metadata()

    def _task(self) -> dict[str, Any] | None:
        return next((task for task in self._manager.tasks if task.get("id") == self._task_id), None)

    def _refresh_metadata(self) -> None:
        task = self._task()
        base_name = str(task.get("name")) if task else task_entity_base_name(self._task_id)
        self._attr_name = f"{base_name} Due"
        self._attr_icon = task_metric_icon("due")
        grouping = self._manager.settings.get("task_entities", {}).get("device_grouping", "dashboard")
        self._attr_device_info = task_device_info(task or {"id": self._task_id}, grouping)

    @property
    def available(self) -> bool:
        task = self._task()
        return bool(task and not task.get("deleted") and task.get("enabled", True))

    @property
    def is_on(self) -> bool:
        task = self._task()
        if not task or task.get("deleted") or not task.get("enabled", True):
            return False
        runtime = self._manager.runtime_for_task(task)
        return runtime.status in {"warning", "critical", "overdue"}

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        task = self._task()
        if not task:
            return {"task_id": self._task_id, "dashboard_url": DASHBOARD_URL, "available": False}
        summary = self._manager.task_summary(task, self._manager.runtime_for_task(task)) or {}
        summary["last_notification"] = self._manager.last_task_notification(task["id"])
        return summary


class MaintenanceTaskBinaryPlatform:
    def __init__(self, hass: HomeAssistant, entry: ConfigEntry, manager: MaintenanceManager, async_add_entities) -> None:
        self.hass = hass
        self.entry = entry
        self.manager = manager
        self.async_add_entities = async_add_entities
        self.entities: dict[str, MaintenanceTaskDueBinarySensor] = {}
        self._lock = asyncio.Lock()
        self._unloaded = False
        self._last_grouping: str | None = None

    @callback
    def schedule_sync(self) -> None:
        if not self._unloaded:
            self.hass.async_create_task(self.async_sync())

    async def async_sync(self) -> None:
        async with self._lock:
            if self._unloaded:
                return
            entity_settings = self.manager.settings.get("task_entities", {})
            mode = entity_settings.get("mode", "off")
            grouping = entity_settings.get("device_grouping", "dashboard")
            if self._last_grouping is not None and grouping != self._last_grouping:
                for entity in list(self.entities.values()):
                    if entity.hass:
                        await entity.async_remove()
                self.entities.clear()
            self._last_grouping = grouping
            desired = desired_task_binary_specs(self.manager.tasks, mode)
            new_entities: list[MaintenanceTaskDueBinarySensor] = []
            for unique_id, (task_id, _metric) in desired.items():
                entity = self.entities.get(unique_id)
                if entity:
                    entity.update_task_reference(task_id)
                    entity.async_write_ha_state()
                    continue
                entity = MaintenanceTaskDueBinarySensor(self.manager, task_id, unique_id)
                self.entities[unique_id] = entity
                new_entities.append(entity)
            if new_entities:
                self.async_add_entities(new_entities)
            for unique_id in set(self.entities) - set(desired):
                entity = self.entities.pop(unique_id)
                if entity.hass:
                    await entity.async_remove()
            if self.manager.settings.get("task_entities", {}).get("cleanup_removed", False):
                from .entity_management import desired_task_sensor_specs
                all_desired = set(desired) | set(desired_task_sensor_specs(self.manager.tasks, mode))
                await async_cleanup_orphaned_task_entities(self.hass, self.entry, all_desired)

    @callback
    def unload(self) -> None:
        self._unloaded = True
