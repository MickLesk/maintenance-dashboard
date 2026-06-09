from __future__ import annotations

from collections.abc import Callable
from typing import Any

from homeassistant.components.sensor import SensorEntity
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from .const import DASHBOARD_URL, DOMAIN
from .manager import MaintenanceManager
from .task_entities import TASK_SENSOR_MODES, task_entity_base_name, task_metric_icon, task_unique_id

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
    entities: list[SensorEntity] = [MaintenanceSensor(manager, key, name, unit, icon) for key, name, unit, icon in GLOBAL_SENSORS]

    mode = manager.settings.get("task_entities", {}).get("mode", "off")
    metrics = TASK_SENSOR_MODES.get(mode, ())
    for task in manager.tasks:
        if task.get("deleted"):
            continue
        for metric in metrics:
            entities.append(MaintenanceTaskSensor(manager, task["id"], metric))

    async_add_entities(entities)

class _BaseMaintenanceSensor(SensorEntity):
    _attr_has_entity_name = True

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
    def __init__(self, manager: MaintenanceManager, task_id: str, metric: str) -> None:
        super().__init__(manager)
        self._task_id = task_id
        self._metric = metric
        self._attr_unique_id = task_unique_id(DOMAIN, task_id, metric)
        self._attr_name = f"{task_entity_base_name(task_id)} {metric.replace('_', ' ').title()}"
        self._attr_icon = task_metric_icon(metric)
        if metric == "progress":
            self._attr_native_unit_of_measurement = "%"

    def _task(self) -> dict[str, Any] | None:
        return next((task for task in self._manager.tasks if task.get("id") == self._task_id), None)

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
        return self._manager.task_summary(task, self._manager.runtime_for_task(task)) or {}
