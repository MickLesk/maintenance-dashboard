from __future__ import annotations

from datetime import datetime, timedelta
from typing import Any

from homeassistant.components.calendar import CalendarEntity, CalendarEvent
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.util import dt as dt_util

from .const import DOMAIN
from .entity_management import dashboard_device_info
from .manager import MaintenanceManager


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    manager: MaintenanceManager = hass.data[DOMAIN][entry.entry_id]
    async_add_entities([MaintenanceCalendarEntity(manager, entry)])


class MaintenanceCalendarEntity(CalendarEntity):
    """Calendar containing all calculated maintenance due dates."""

    _attr_has_entity_name = True
    _attr_name = "Schedule"
    _attr_icon = "mdi:calendar-wrench"

    def __init__(self, manager: MaintenanceManager, entry: ConfigEntry) -> None:
        self.manager = manager
        self._attr_unique_id = f"{entry.entry_id}_calendar"
        self._attr_device_info = dashboard_device_info()

    @property
    def available(self) -> bool:
        return bool(self.manager.settings.get("native_platforms", {}).get("calendar_enabled", True))

    @property
    def event(self) -> CalendarEvent | None:
        now = dt_util.now()
        events = [event for event in self._events() if _event_end(event) > now]
        return min(events, key=lambda item: _event_start(item), default=None)

    async def async_get_events(
        self,
        hass: HomeAssistant,
        start_date: datetime,
        end_date: datetime,
    ) -> list[CalendarEvent]:
        return [
            event
            for event in self._events()
            if _event_end(event) > start_date and _event_start(event) < end_date
        ]

    async def async_added_to_hass(self) -> None:
        self.async_on_remove(self.manager.async_add_listener(self._handle_manager_update))

    @callback
    def _handle_manager_update(self) -> None:
        self.async_write_ha_state()

    def _events(self) -> list[CalendarEvent]:
        events: list[CalendarEvent] = []
        native_settings = self.manager.settings.get("native_platforms", {})
        include_snoozed = bool(native_settings.get("calendar_include_snoozed", False))
        duration = int(native_settings.get("calendar_event_duration_minutes", 60) or 60)
        duration = max(15, min(1440, duration))
        for task in self.manager.tasks:
            if task.get("deleted") or not task.get("enabled", True):
                continue
            runtime = self.manager.runtime_for_task(task)
            if runtime.status in {"completed", "disabled", "deleted", "unavailable"} or not runtime.due_at:
                continue
            if runtime.status == "snoozed" and not include_snoozed:
                continue
            start = _parse_datetime(runtime.due_at)
            if start is None:
                continue
            events.append(
                CalendarEvent(
                    start=start,
                    end=start + timedelta(minutes=duration),
                    summary=_event_summary(task, runtime.status),
                    description=_event_description(self.manager, task, runtime),
                    location=str(task.get("area_name") or "") or None,
                    uid=_event_uid(task, start),
                )
            )
        return sorted(events, key=_event_start)


def _parse_datetime(value: str) -> datetime | None:
    try:
        parsed = datetime.fromisoformat(value.replace("Z", "+00:00"))
    except (TypeError, ValueError):
        return None
    if parsed.tzinfo is None:
        parsed = parsed.replace(tzinfo=dt_util.DEFAULT_TIME_ZONE)
    return parsed


def _event_start(event: CalendarEvent) -> datetime:
    value = event.start
    if isinstance(value, datetime):
        return value
    return datetime.combine(value, datetime.min.time(), tzinfo=dt_util.DEFAULT_TIME_ZONE)


def _event_end(event: CalendarEvent) -> datetime:
    value = event.end
    if isinstance(value, datetime):
        return value
    return datetime.combine(value, datetime.min.time(), tzinfo=dt_util.DEFAULT_TIME_ZONE)


def _event_uid(task: dict[str, Any], start: datetime) -> str:
    return f"maintenance-dashboard-{task.get('id')}-{start.date().isoformat()}"


def _event_summary(task: dict[str, Any], status: str) -> str:
    prefix = {
        "overdue": "Overdue",
        "critical": "Critical",
        "warning": "Warning",
        "snoozed": "Snoozed",
    }.get(status)
    name = str(task.get("name") or "Maintenance task")
    return f"{prefix}: {name}" if prefix else name


def _event_description(manager: MaintenanceManager, task: dict[str, Any], runtime: Any) -> str:
    lines: list[str] = []
    description = str(task.get("description") or "").strip()
    if description:
        lines.extend([description, ""])
    summary = manager.task_summary(task, runtime) or {}
    lines.extend(
        [
            f"Status: {summary.get('status')}",
            f"Priority: {summary.get('priority_label')} ({summary.get('priority')}/5)",
            f"Remaining: {summary.get('remaining_label')}",
            f"Schedule: {summary.get('schedule_label') or summary.get('schedule_mode')}",
            f"Category: {summary.get('category')}",
        ]
    )
    if summary.get("tags"):
        lines.append(f"Tags: {', '.join(summary['tags'])}")
    lines.append(f"Dashboard: {summary.get('dashboard_url')}")
    return "\n".join(line for line in lines if line)
