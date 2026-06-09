from __future__ import annotations

from collections.abc import Callable
from typing import Any

from homeassistant.components.binary_sensor import BinarySensorDeviceClass, BinarySensorEntity
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from .const import DASHBOARD_URL, DOMAIN
from .manager import MaintenanceManager
from .task_entities import TASK_BINARY_SENSOR_MODES, task_entity_base_name, task_metric_icon, task_unique_id

async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry, async_add_entities) -> None:
    manager: MaintenanceManager = hass.data[DOMAIN][entry.entry_id]
    entities: list[BinarySensorEntity] = [
        MaintenanceCriticalBinarySensor(manager),
        MaintenanceWarningBinarySensor(manager),
    ]
    mode = manager.settings.get("task_entities", {}).get("mode", "off")
    if mode in TASK_BINARY_SENSOR_MODES:
        for task in manager.tasks:
            if not task.get("deleted"):
                entities.append(MaintenanceTaskDueBinarySensor(manager, task["id"]))
    async_add_entities(entities)

class _BaseMaintenanceBinarySensor(BinarySensorEntity):
    _attr_has_entity_name = True
    _attr_device_class = BinarySensorDeviceClass.PROBLEM

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

    @property
    def is_on(self) -> bool:
        return self._manager.get_summary()["warning"] > 0

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        return {"dashboard_url": DASHBOARD_URL, "warning": self._manager.get_summary()["warning"]}

class MaintenanceTaskDueBinarySensor(_BaseMaintenanceBinarySensor):
    def __init__(self, manager: MaintenanceManager, task_id: str) -> None:
        super().__init__(manager)
        self._task_id = task_id
        self._attr_unique_id = task_unique_id(DOMAIN, task_id, "due")
        self._attr_name = f"{task_entity_base_name(task_id)} Due"
        self._attr_icon = task_metric_icon("due")

    def _task(self) -> dict[str, Any] | None:
        return next((task for task in self._manager.tasks if task.get("id") == self._task_id), None)

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
        return self._manager.task_summary(task, self._manager.runtime_for_task(task)) or {}
