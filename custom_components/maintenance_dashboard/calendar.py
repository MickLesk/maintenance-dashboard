from __future__ import annotations

from datetime import datetime, timedelta

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
        for task in self.manager.tasks:
            if task.get("deleted") or not task.get("enabled", True):
                continue
            runtime = self.manager.runtime_for_task(task)
            if runtime.status == "completed" or not runtime.due_at:
                continue
            start = _parse_datetime(runtime.due_at)
            if start is None:
                continue
            events.append(
                CalendarEvent(
                    start=start,
                    end=start + timedelta(hours=1),
                    summary=str(task.get("name") or "Maintenance task"),
                    description=str(task.get("description") or "") or None,
                    location=str(task.get("area_name") or "") or None,
                    uid=str(task.get("id")),
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
