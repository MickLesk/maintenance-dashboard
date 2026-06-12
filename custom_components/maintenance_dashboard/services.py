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
        await _manager(hass).async_mark_done(
            call.data["task_id"],
            call.data.get("done_at"),
            call.data.get("note"),
            material=call.data.get("material"),
            cost=call.data.get("cost"),
            currency=call.data.get("currency"),
            performed_by=call.data.get("performed_by"),
        )

    async def reactivate_task(call: ServiceCall) -> None:
        await _manager(hass).async_reactivate_task(call.data["task_id"])

    async def snooze(call: ServiceCall) -> None:
        await _manager(hass).async_snooze(call.data["task_id"], call.data["days"])

    async def clear_snooze(call: ServiceCall) -> None:
        await _manager(hass).async_clear_snooze(call.data["task_id"])

    async def restore_backup(call: ServiceCall) -> None:
        await _manager(hass).async_restore_backup(call.data["backup_id"])

    async def send_digest(call: ServiceCall) -> None:
        await _manager(hass).async_send_digest(
            call.data.get("notify_service") or call.data.get("service"),
            include_ok=call.data.get("include_ok", False),
            include_snoozed=call.data.get("include_snoozed", False),
        )

    async def test_notification(call: ServiceCall) -> None:
        await _manager(hass).async_test_notification(call.data.get("notify_service") or call.data.get("service"))

    async def notify_task(call: ServiceCall) -> None:
        await _manager(hass).async_notify_task(call.data["task_id"], call.data.get("notify_service") or call.data.get("service"))

    async def notify_due_tasks(call: ServiceCall) -> None:
        await _manager(hass).async_notify_due_tasks(
            call.data.get("notify_service") or call.data.get("service"),
            call.data.get("statuses"),
        )

    hass.services.async_register(
        DOMAIN,
        "mark_done",
        mark_done,
        schema=vol.Schema({
            vol.Required("task_id"): cv.string,
            vol.Optional("done_at"): cv.string,
            vol.Optional("note"): cv.string,
            vol.Optional("material"): cv.string,
            vol.Optional("cost"): vol.Coerce(float),
            vol.Optional("currency"): cv.string,
            vol.Optional("performed_by"): cv.string,
        }),
    )
    hass.services.async_register(
        DOMAIN,
        "reactivate_task",
        reactivate_task,
        schema=vol.Schema({vol.Required("task_id"): cv.string}),
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

    hass.services.async_register(
        DOMAIN,
        "send_digest",
        send_digest,
        schema=vol.Schema({
            vol.Optional("notify_service"): cv.string,
            vol.Optional("service"): cv.string,
            vol.Optional("include_ok", default=False): cv.boolean,
            vol.Optional("include_snoozed", default=False): cv.boolean,
        }),
    )
    hass.services.async_register(
        DOMAIN,
        "test_notification",
        test_notification,
        schema=vol.Schema({vol.Optional("notify_service"): cv.string, vol.Optional("service"): cv.string}),
    )
    hass.services.async_register(
        DOMAIN,
        "notify_task",
        notify_task,
        schema=vol.Schema({vol.Required("task_id"): cv.string, vol.Optional("notify_service"): cv.string, vol.Optional("service"): cv.string}),
    )
    hass.services.async_register(
        DOMAIN,
        "notify_due_tasks",
        notify_due_tasks,
        schema=vol.Schema({
            vol.Optional("notify_service"): cv.string,
            vol.Optional("service"): cv.string,
            vol.Optional("statuses"): vol.All(cv.ensure_list, [cv.string]),
        }),
    )
