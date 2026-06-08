from __future__ import annotations

from collections.abc import Callable
from typing import Any

from homeassistant.components.sensor import SensorEntity
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.entity import Entity

from .const import DOMAIN
from .manager import MaintenanceManager

SENSORS = [
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
    async_add_entities([MaintenanceSensor(manager, key, name, unit, icon) for key, name, unit, icon in SENSORS])

class MaintenanceSensor(SensorEntity):
    _attr_has_entity_name = True

    def __init__(self, manager: MaintenanceManager, key: str, name: str, unit: str | None, icon: str) -> None:
        self._manager = manager
        self._key = key
        self._attr_unique_id = f"{DOMAIN}_{key}"
        self._attr_name = name
        self._attr_native_unit_of_measurement = unit
        self._attr_icon = icon
        self._remove_listener: Callable[[], None] | None = None

    async def async_added_to_hass(self) -> None:
        self._remove_listener = self._manager.async_add_listener(self.async_write_ha_state)

    async def async_will_remove_from_hass(self) -> None:
        if self._remove_listener:
            self._remove_listener()
            self._remove_listener = None

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
        return self._manager.get_summary()
