from __future__ import annotations

import logging
from datetime import timedelta

from homeassistant.config_entries import ConfigEntry
from homeassistant.const import Platform
from homeassistant.core import HomeAssistant
from homeassistant.helpers.event import async_track_time_interval

from .const import DOMAIN, PLATFORMS
from .manager import MaintenanceManager
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
        await manager.async_maybe_send_scheduled_notifications()

    entry.async_on_unload(async_track_time_interval(hass, _scheduled_notifications, timedelta(minutes=1)))

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
