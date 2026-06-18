from __future__ import annotations

import asyncio
from collections.abc import Callable
from typing import Any

from homeassistant.components.sensor import SensorEntity
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback

from .const import DASHBOARD_URL, DOMAIN
from .entity_management import (
    async_cleanup_orphaned_task_entities,
    dashboard_device_info,
    desired_task_sensor_specs,
    task_device_info,
)
from .manager import MaintenanceManager
from .task_entities import task_entity_base_name, task_metric_icon

GLOBAL_SENSORS = [
    ("health_score", "Health Score", "%", "mdi:heart-pulse"),
    ("active_tasks", "Active Tasks", None, "mdi:clipboard-list-outline"),
    ("critical_tasks", "Critical Tasks", None, "mdi:alert-circle"),
    ("warning_tasks", "Warning Tasks", None, "mdi:alert-outline"),
    ("unavailable_tasks", "Unavailable Tasks", None, "mdi:cloud-question"),
    ("completed_this_year", "Completed This Year", None, "mdi:check-decagram"),
    ("next_task", "Next Task", None, "mdi:calendar-clock"),
]


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry, async_add_entities) -> None:
    manager: MaintenanceManager = hass.data[DOMAIN][entry.entry_id]
    async_add_entities([MaintenanceSensor(manager, key, name, unit, icon) for key, name, unit, icon in GLOBAL_SENSORS])
    platform = MaintenanceTaskSensorPlatform(hass, entry, manager, async_add_entities)
    await platform.async_sync()
    entry.async_on_unload(manager.async_add_listener(platform.schedule_sync))
    entry.async_on_unload(platform.unload)


class _BaseMaintenanceSensor(SensorEntity):
    _attr_has_entity_name = True
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


class MaintenanceSensor(_BaseMaintenanceSensor):
    def __init__(self, manager: MaintenanceManager, key: str, name: str, unit: str | None, icon: str) -> None:
        super().__init__(manager)
        self._key = key
        self._attr_unique_id = f"{DOMAIN}_{key}"
        self._attr_name = name
        self._attr_native_unit_of_measurement = unit
        self._attr_icon = icon
        self._attr_device_info = dashboard_device_info()

    @property
    def native_value(self) -> Any:
        summary = self._manager.get_summary()
        if self._key == "health_score":
            return summary["health"]
        if self._key == "active_tasks":
            return summary["active"]
        if self._key == "critical_tasks":
            return summary["critical"]
        if self._key == "warning_tasks":
            return summary["warning"]
        if self._key == "unavailable_tasks":
            return summary["unavailable"]
        if self._key == "completed_this_year":
            return summary["completed_this_year"]
        if self._key == "next_task":
            task = summary.get("next_task")
            return task.get("name") if task else "none"
        return None

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        summary = self._manager.get_summary()
        state = self._manager.tasks
        runtime = {task["id"]: self._manager.runtime_for_task(task) for task in state}
        attrs: dict[str, Any] = {
            "dashboard_url": DASHBOARD_URL,
            "health": summary.get("health"),
            "open": summary.get("open"),
            "critical": summary.get("critical"),
            "warning": summary.get("warning"),
            "unavailable": summary.get("unavailable"),
            "health_explanation": summary.get("health_explanation"),
            "task_entities_mode": self._manager.settings.get("task_entities", {}).get("mode"),
            "notification_enabled": self._manager.settings.get("notifications", {}).get("enabled", False),
        }
        if self._key == "next_task":
            attrs.update(summary.get("next_task") or {})
        if self._key in {"critical_tasks", "warning_tasks", "unavailable_tasks"}:
            wanted = {
                "critical_tasks": {"critical", "overdue"},
                "warning_tasks": {"warning"},
                "unavailable_tasks": {"unavailable"},
            }[self._key]
            attrs["tasks"] = [
                self._manager.task_summary(task, runtime.get(task["id"]))
                for task in state
                if runtime.get(task["id"]) and runtime[task["id"]].status in wanted
            ]
        return attrs


class MaintenanceTaskSensor(_BaseMaintenanceSensor):
    def __init__(self, manager: MaintenanceManager, task_id: str, metric: str, unique_id: str) -> None:
        super().__init__(manager)
        self._task_id = task_id
        self._metric = metric
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
        self._attr_name = f"{base_name} {self._metric.replace('_', ' ').title()}"
        self._attr_icon = task_metric_icon(self._metric)
        if self._metric == "progress":
            self._attr_native_unit_of_measurement = "%"
        grouping = self._manager.settings.get("task_entities", {}).get("device_grouping", "dashboard")
        self._attr_device_info = task_device_info(task or {"id": self._task_id}, grouping)

    @property
    def available(self) -> bool:
        task = self._task()
        return bool(task and not task.get("deleted") and task.get("enabled", True))

    @property
    def native_value(self) -> Any:
        task = self._task()
        if not task or task.get("deleted"):
            return None
        runtime = self._manager.runtime_for_task(task)
        if self._metric == "remaining":
            return None if runtime.remaining is None else round(runtime.remaining, 2)
        if self._metric == "progress":
            return round(runtime.progress, 1)
        if self._metric == "due_date":
            return runtime.due_at
        if self._metric == "last_done":
            return runtime.last_done
        if self._metric == "status":
            return runtime.status
        return None

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        task = self._task()
        if not task:
            return {"task_id": self._task_id, "dashboard_url": DASHBOARD_URL, "available": False}
        summary = self._manager.task_summary(task, self._manager.runtime_for_task(task)) or {}
        summary["last_notification"] = self._manager.last_task_notification(task["id"])
        return summary


class MaintenanceTaskSensorPlatform:
    def __init__(self, hass: HomeAssistant, entry: ConfigEntry, manager: MaintenanceManager, async_add_entities) -> None:
        self.hass = hass
        self.entry = entry
        self.manager = manager
        self.async_add_entities = async_add_entities
        self.entities: dict[str, MaintenanceTaskSensor] = {}
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
            desired = desired_task_sensor_specs(self.manager.tasks, mode)
            new_entities: list[MaintenanceTaskSensor] = []
            for unique_id, (task_id, metric) in desired.items():
                entity = self.entities.get(unique_id)
                if entity:
                    entity.update_task_reference(task_id)
                    entity.async_write_ha_state()
                    continue
                entity = MaintenanceTaskSensor(self.manager, task_id, metric, unique_id)
                self.entities[unique_id] = entity
                new_entities.append(entity)
            if new_entities:
                self.async_add_entities(new_entities)
            for unique_id in set(self.entities) - set(desired):
                entity = self.entities.pop(unique_id)
                if entity.hass:
                    await entity.async_remove()
            if self.manager.settings.get("task_entities", {}).get("cleanup_removed", False):
                from .entity_management import desired_task_binary_specs
                all_desired = set(desired) | set(desired_task_binary_specs(self.manager.tasks, mode))
                await async_cleanup_orphaned_task_entities(self.hass, self.entry, all_desired)

    @callback
    def unload(self) -> None:
        self._unloaded = True
