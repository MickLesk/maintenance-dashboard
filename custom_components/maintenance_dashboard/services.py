from __future__ import annotations

from typing import Any

import voluptuous as vol

from homeassistant.core import HomeAssistant, ServiceCall, callback
from homeassistant.helpers import config_validation as cv

from .const import DOMAIN
from .manager import MaintenanceManager

REGISTERED = f"_{DOMAIN}_services_registered"


def _manager(hass: HomeAssistant) -> MaintenanceManager:
    managers = hass.data.get(DOMAIN, {})
    if not managers:
        raise RuntimeError("Maintenance Dashboard is not configured")
    return next(iter(managers.values()))


@callback
def async_register_services(hass: HomeAssistant) -> None:
    if hass.data.get(REGISTERED):
        return
    hass.data[REGISTERED] = True

    async def mark_done(call: ServiceCall) -> None:
        await _manager(hass).async_mark_done(call.data["task_id"], call.data.get("done_at"))

    async def snooze(call: ServiceCall) -> None:
        await _manager(hass).async_snooze(call.data["task_id"], call.data["days"])

    async def clear_snooze(call: ServiceCall) -> None:
        await _manager(hass).async_clear_snooze(call.data["task_id"])

    async def restore_backup(call: ServiceCall) -> None:
        await _manager(hass).async_restore_backup(call.data["backup_id"])

    hass.services.async_register(
        DOMAIN,
        "mark_done",
        mark_done,
        schema=vol.Schema({vol.Required("task_id"): cv.string, vol.Optional("done_at"): cv.string}),
    )
    hass.services.async_register(
        DOMAIN,
        "snooze",
        snooze,
        schema=vol.Schema({vol.Required("task_id"): cv.string, vol.Required("days", default=7): cv.positive_int}),
    )
    hass.services.async_register(
        DOMAIN,
        "clear_snooze",
        clear_snooze,
        schema=vol.Schema({vol.Required("task_id"): cv.string}),
    )
    hass.services.async_register(
        DOMAIN,
        "restore_backup",
        restore_backup,
        schema=vol.Schema({vol.Required("backup_id"): cv.string}),
    )
