from __future__ import annotations

from datetime import date, datetime, time
from typing import Any

from homeassistant.components.todo import (
    TodoItem,
    TodoItemStatus,
    TodoListEntity,
    TodoListEntityFeature,
)
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.util import dt as dt_util

from .const import DOMAIN, NAME
from .entity_management import dashboard_device_info
from .manager import MaintenanceManager


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    manager: MaintenanceManager = hass.data[DOMAIN][entry.entry_id]
    async_add_entities([MaintenanceTodoEntity(manager, entry)])


class MaintenanceTodoEntity(TodoListEntity):
    """Native Home Assistant to-do representation of maintenance tasks."""

    _attr_has_entity_name = True
    _attr_name = "Tasks"
    _attr_icon = "mdi:clipboard-check-outline"
    _attr_supported_features = (
        TodoListEntityFeature.CREATE_TODO_ITEM
        | TodoListEntityFeature.DELETE_TODO_ITEM
        | TodoListEntityFeature.UPDATE_TODO_ITEM
        | TodoListEntityFeature.MOVE_TODO_ITEM
        | TodoListEntityFeature.SET_DUE_DATE_ON_ITEM
        | TodoListEntityFeature.SET_DUE_DATETIME_ON_ITEM
        | TodoListEntityFeature.SET_DESCRIPTION_ON_ITEM
    )

    def __init__(self, manager: MaintenanceManager, entry: ConfigEntry) -> None:
        self.manager = manager
        self._attr_unique_id = f"{entry.entry_id}_todo"
        self._attr_device_info = dashboard_device_info()

    @property
    def available(self) -> bool:
        return bool(self.manager.settings.get("native_platforms", {}).get("todo_enabled", True))

    @property
    def todo_items(self) -> list[TodoItem]:
        items: list[TodoItem] = []
        for task in sorted(self.manager.tasks, key=lambda item: int(item.get("position", 0))):
            if task.get("deleted"):
                continue
            runtime = self.manager.runtime_for_task(task)
            due = self._due_value(runtime.due_at)
            completed = _parse_datetime(task.get("completed_at"))
            status = (
                TodoItemStatus.COMPLETED
                if runtime.status == "completed"
                else TodoItemStatus.NEEDS_ACTION
            )
            items.append(
                TodoItem(
                    uid=str(task["id"]),
                    summary=str(task.get("name") or "Maintenance task"),
                    status=status,
                    due=due,
                    description=str(task.get("description") or "") or None,
                    completed=completed,
                )
            )
        return items

    async def async_added_to_hass(self) -> None:
        self.async_on_remove(self.manager.async_add_listener(self._handle_manager_update))

    @callback
    def _handle_manager_update(self) -> None:
        self.async_write_ha_state()

    async def async_create_todo_item(self, item: TodoItem) -> None:
        due = _serialize_due(item.due)
        payload: dict[str, Any] = {
            "name": item.summary or "Maintenance task",
            "description": item.description or "",
            "type": "time",
            "priority": 3,
            "category": "general",
            "enabled": True,
        }
        if due:
            payload.update({"schedule_mode": "one_time", "due_date": due, "interval": 1, "interval_unit": "days"})
        else:
            payload.update({"schedule_mode": "interval", "interval": 30, "interval_unit": "days"})
        await self.manager.async_create_task(payload)

    async def async_update_todo_item(self, item: TodoItem) -> None:
        if not item.uid:
            raise ValueError("To-do item uid is required")
        task = next((candidate for candidate in self.manager.tasks if candidate.get("id") == item.uid), None)
        if not task:
            raise ValueError("Maintenance task not found")
        patch: dict[str, Any] = {}
        if item.summary is not None:
            patch["name"] = item.summary
        if item.description is not None:
            patch["description"] = item.description
        due = _serialize_due(item.due)
        if due is not None:
            patch.update({"schedule_mode": "one_time", "due_date": due})
        elif task.get("schedule_mode") == "one_time" and item.status != TodoItemStatus.COMPLETED:
            # Clearing a native to-do due date converts the item to a normal recurring task.
            patch.update({
                "schedule_mode": "interval",
                "due_date": None,
                "interval": task.get("interval") or 30,
                "interval_unit": task.get("interval_unit") or "days",
            })
        if patch:
            await self.manager.async_update_task(str(item.uid), patch)
        if item.status == TodoItemStatus.COMPLETED:
            await self.manager.async_mark_done(str(item.uid), note="Completed from Home Assistant to-do")
        elif item.status == TodoItemStatus.NEEDS_ACTION and task.get("completed_at"):
            await self.manager.async_reactivate_task(str(item.uid))

    async def async_delete_todo_items(self, uids: list[str]) -> None:
        for uid in uids:
            await self.manager.async_delete_task(uid)

    async def async_move_todo_item(self, uid: str, previous_uid: str | None = None) -> None:
        ordered = [str(item.get("id")) for item in self.manager.tasks if not item.get("deleted")]
        if uid not in ordered:
            raise ValueError("Maintenance task not found")
        ordered.remove(uid)
        if previous_uid is None:
            ordered.insert(0, uid)
        elif previous_uid in ordered:
            ordered.insert(ordered.index(previous_uid) + 1, uid)
        else:
            ordered.append(uid)
        await self.manager.async_reorder(ordered)

    @staticmethod
    def _due_value(value: str | None) -> datetime | None:
        parsed = _parse_datetime(value)
        return parsed


def _parse_datetime(value: Any) -> datetime | None:
    if not value:
        return None
    try:
        parsed = datetime.fromisoformat(str(value).replace("Z", "+00:00"))
    except (TypeError, ValueError):
        return None
    if parsed.tzinfo is None:
        parsed = parsed.replace(tzinfo=dt_util.DEFAULT_TIME_ZONE)
    return parsed


def _serialize_due(value: date | datetime | None) -> str | None:
    if value is None:
        return None
    if isinstance(value, datetime):
        parsed = value
        if parsed.tzinfo is None:
            parsed = parsed.replace(tzinfo=dt_util.DEFAULT_TIME_ZONE)
        return parsed.isoformat()
    return datetime.combine(value, time(hour=9), tzinfo=dt_util.DEFAULT_TIME_ZONE).isoformat()
