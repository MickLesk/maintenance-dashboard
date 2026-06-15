from __future__ import annotations

import logging
from datetime import timedelta

from homeassistant.config_entries import ConfigEntry
from homeassistant.const import Platform
from homeassistant.core import Event, HomeAssistant
from homeassistant.helpers.event import async_track_time_interval

from .const import DOMAIN, PLATFORMS
from .manager import MaintenanceManager
from .notification_policy import parse_notification_action
from .panel import async_register_panel, async_unregister_panel
from .services import async_register_services
from .websocket import async_register_websocket

_LOGGER = logging.getLogger(__name__)

async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    hass.data.setdefault(DOMAIN, {})

    manager = MaintenanceManager(hass, entry)
    await manager.async_load()
    hass.data[DOMAIN][entry.entry_id] = manager

    await async_register_panel(hass)
    async_register_websocket(hass)
    async_register_services(hass)

    async def _scheduled_notifications(_now) -> None:
        try:
            await manager.async_maybe_send_scheduled_notifications()
        except Exception:  # noqa: BLE001
            _LOGGER.exception("Scheduled maintenance notification processing failed")

    async def _mobile_notification_action(event: Event) -> None:
        parsed = parse_notification_action(event.data.get("action"))
        if not parsed:
            return
        action, payload = parsed
        try:
            if action == "done":
                await manager.async_mark_done(payload["task_id"], note="Completed from notification action")
            elif action == "snooze":
                await manager.async_snooze(payload["task_id"], payload["days"])
        except Exception:  # noqa: BLE001
            _LOGGER.exception("Failed to process maintenance notification action")

    entry.async_on_unload(async_track_time_interval(hass, _scheduled_notifications, timedelta(minutes=1)))
    entry.async_on_unload(hass.bus.async_listen("mobile_app_notification_action", _mobile_notification_action))

    await hass.config_entries.async_forward_entry_setups(entry, [Platform.SENSOR, Platform.BINARY_SENSOR])
    await manager.async_broadcast_update(reason="setup")
    return True

async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    unload_ok = await hass.config_entries.async_unload_platforms(entry, [Platform.SENSOR, Platform.BINARY_SENSOR])
    if unload_ok:
        hass.data.get(DOMAIN, {}).pop(entry.entry_id, None)
        if not hass.data.get(DOMAIN):
            await async_unregister_panel(hass)
            hass.data.pop(DOMAIN, None)
    return unload_ok
