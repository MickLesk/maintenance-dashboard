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
        summary = self._manager.get_summary()
        state = self._manager.tasks
        runtime = {task["id"]: self._manager.runtime_for_task(task).as_dict() for task in state}
        attrs: dict[str, Any] = {
            "dashboard_url": "/maintenance-dashboard",
            "health": summary.get("health"),
            "open": summary.get("open"),
            "critical": summary.get("critical"),
            "warning": summary.get("warning"),
            "unavailable": summary.get("unavailable"),
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
                {
                    "id": task["id"],
                    "name": task.get("name"),
                    "priority": task.get("priority"),
                    "category": task.get("category"),
                    "due_at": runtime.get(task["id"], {}).get("due_at"),
                    "status": runtime.get(task["id"], {}).get("status"),
                }
                for task in state
                if runtime.get(task["id"], {}).get("status") in wanted
            ]
        return attrs
