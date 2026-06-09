from __future__ import annotations

from typing import Any

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback

from .const import DOMAIN
from .manager import MaintenanceManager

REGISTERED = f"_{DOMAIN}_websocket_registered"


def _manager(hass: HomeAssistant) -> MaintenanceManager:
    managers = hass.data.get(DOMAIN, {})
    if not managers:
        raise websocket_api.WebSocketError("not_configured", "Maintenance Dashboard is not configured")
    return next(iter(managers.values()))


@callback
def async_register_websocket(hass: HomeAssistant) -> None:
    if hass.data.get(REGISTERED):
        return
    hass.data[REGISTERED] = True

    websocket_api.async_register_command(hass, websocket_get_state)
    websocket_api.async_register_command(hass, websocket_create_task)
    websocket_api.async_register_command(hass, websocket_update_task)
    websocket_api.async_register_command(hass, websocket_delete_task)
    websocket_api.async_register_command(hass, websocket_restore_task)
    websocket_api.async_register_command(hass, websocket_mark_done)
    websocket_api.async_register_command(hass, websocket_undo_completion)
    websocket_api.async_register_command(hass, websocket_snooze)
    websocket_api.async_register_command(hass, websocket_clear_snooze)
    websocket_api.async_register_command(hass, websocket_reorder)
    websocket_api.async_register_command(hass, websocket_restore_backup)
    websocket_api.async_register_command(hass, websocket_import_tasks)
    websocket_api.async_register_command(hass, websocket_export_data)
    websocket_api.async_register_command(hass, websocket_import_data)
    websocket_api.async_register_command(hass, websocket_send_notification)
    websocket_api.async_register_command(hass, websocket_get_settings)
    websocket_api.async_register_command(hass, websocket_update_settings)
    websocket_api.async_register_command(hass, websocket_send_digest)
    websocket_api.async_register_command(hass, websocket_notify_task)
    websocket_api.async_register_command(hass, websocket_notify_due_tasks)


@websocket_api.websocket_command({vol.Required("type"): "maintenance_dashboard/get_state"})
@callback
def websocket_get_state(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    async def _send() -> None:
        connection.send_result(msg["id"], await _manager(hass).async_get_state())
    hass.async_create_task(_send())


@websocket_api.websocket_command({vol.Required("type"): "maintenance_dashboard/create_task", vol.Required("task"): dict})
@websocket_api.require_admin
@callback
def websocket_create_task(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    async def _run() -> None:
        try:
            connection.send_result(msg["id"], await _manager(hass).async_create_task(msg["task"]))
        except Exception as err:  # noqa: BLE001
            connection.send_error(msg["id"], "create_failed", str(err))
    hass.async_create_task(_run())


@websocket_api.websocket_command({vol.Required("type"): "maintenance_dashboard/update_task", vol.Required("task_id"): str, vol.Required("patch"): dict})
@websocket_api.require_admin
@callback
def websocket_update_task(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    async def _run() -> None:
        try:
            connection.send_result(msg["id"], await _manager(hass).async_update_task(msg["task_id"], msg["patch"]))
        except Exception as err:  # noqa: BLE001
            connection.send_error(msg["id"], "update_failed", str(err))
    hass.async_create_task(_run())


@websocket_api.websocket_command({vol.Required("type"): "maintenance_dashboard/delete_task", vol.Required("task_id"): str})
@websocket_api.require_admin
@callback
def websocket_delete_task(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    async def _run() -> None:
        try:
            await _manager(hass).async_delete_task(msg["task_id"])
            connection.send_result(msg["id"], {"ok": True})
        except Exception as err:  # noqa: BLE001
            connection.send_error(msg["id"], "delete_failed", str(err))
    hass.async_create_task(_run())


@websocket_api.websocket_command({vol.Required("type"): "maintenance_dashboard/restore_task", vol.Required("task_id"): str})
@websocket_api.require_admin
@callback
def websocket_restore_task(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    async def _run() -> None:
        try:
            connection.send_result(msg["id"], await _manager(hass).async_restore_task(msg["task_id"]))
        except Exception as err:  # noqa: BLE001
            connection.send_error(msg["id"], "restore_failed", str(err))
    hass.async_create_task(_run())


@websocket_api.websocket_command({vol.Required("type"): "maintenance_dashboard/mark_done", vol.Required("task_id"): str, vol.Optional("done_at"): str, vol.Optional("note"): str})
@callback
def websocket_mark_done(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    async def _run() -> None:
        try:
            connection.send_result(msg["id"], await _manager(hass).async_mark_done(msg["task_id"], msg.get("done_at"), msg.get("note")))
        except Exception as err:  # noqa: BLE001
            connection.send_error(msg["id"], "mark_done_failed", str(err))
    hass.async_create_task(_run())


@websocket_api.websocket_command({vol.Required("type"): "maintenance_dashboard/undo_completion", vol.Required("event_id"): str})
@websocket_api.require_admin
@callback
def websocket_undo_completion(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    async def _run() -> None:
        try:
            connection.send_result(msg["id"], await _manager(hass).async_undo_completion(msg["event_id"]))
        except Exception as err:  # noqa: BLE001
            connection.send_error(msg["id"], "undo_failed", str(err))
    hass.async_create_task(_run())


@websocket_api.websocket_command({vol.Required("type"): "maintenance_dashboard/snooze", vol.Required("task_id"): str, vol.Required("days"): int})
@callback
def websocket_snooze(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    async def _run() -> None:
        try:
            connection.send_result(msg["id"], await _manager(hass).async_snooze(msg["task_id"], msg["days"]))
        except Exception as err:  # noqa: BLE001
            connection.send_error(msg["id"], "snooze_failed", str(err))
    hass.async_create_task(_run())




@websocket_api.websocket_command({vol.Required("type"): "maintenance_dashboard/clear_snooze", vol.Required("task_id"): str})
@callback
def websocket_clear_snooze(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    async def _run() -> None:
        try:
            connection.send_result(msg["id"], await _manager(hass).async_clear_snooze(msg["task_id"]))
        except Exception as err:  # noqa: BLE001
            connection.send_error(msg["id"], "clear_snooze_failed", str(err))
    hass.async_create_task(_run())


@websocket_api.websocket_command({vol.Required("type"): "maintenance_dashboard/reorder", vol.Required("ordered_ids"): [str]})
@websocket_api.require_admin
@callback
def websocket_reorder(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    async def _run() -> None:
        try:
            await _manager(hass).async_reorder(msg["ordered_ids"])
            connection.send_result(msg["id"], {"ok": True})
        except Exception as err:  # noqa: BLE001
            connection.send_error(msg["id"], "reorder_failed", str(err))
    hass.async_create_task(_run())


@websocket_api.websocket_command({vol.Required("type"): "maintenance_dashboard/restore_backup", vol.Required("backup_id"): str})
@websocket_api.require_admin
@callback
def websocket_restore_backup(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    async def _run() -> None:
        try:
            await _manager(hass).async_restore_backup(msg["backup_id"])
            connection.send_result(msg["id"], {"ok": True})
        except Exception as err:  # noqa: BLE001
            connection.send_error(msg["id"], "restore_backup_failed", str(err))
    hass.async_create_task(_run())


@websocket_api.websocket_command({vol.Required("type"): "maintenance_dashboard/import_tasks", vol.Required("tasks"): [dict]})
@websocket_api.require_admin
@callback
def websocket_import_tasks(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    async def _run() -> None:
        try:
            await _manager(hass).async_import_tasks(msg["tasks"])
            connection.send_result(msg["id"], {"ok": True})
        except Exception as err:  # noqa: BLE001
            connection.send_error(msg["id"], "import_failed", str(err))
    hass.async_create_task(_run())


@websocket_api.websocket_command({vol.Required("type"): "maintenance_dashboard/export_data"})
@websocket_api.require_admin
@callback
def websocket_export_data(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    async def _run() -> None:
        try:
            connection.send_result(msg["id"], await _manager(hass).async_export_data())
        except Exception as err:  # noqa: BLE001
            connection.send_error(msg["id"], "export_failed", str(err))
    hass.async_create_task(_run())


@websocket_api.websocket_command({vol.Required("type"): "maintenance_dashboard/import_data", vol.Required("payload"): dict})
@websocket_api.require_admin
@callback
def websocket_import_data(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    async def _run() -> None:
        try:
            connection.send_result(msg["id"], await _manager(hass).async_import_data(msg["payload"]))
        except Exception as err:  # noqa: BLE001
            connection.send_error(msg["id"], "import_failed", str(err))
    hass.async_create_task(_run())


@websocket_api.websocket_command({vol.Required("type"): "maintenance_dashboard/send_notification", vol.Optional("service"): str, vol.Optional("message"): str})
@websocket_api.require_admin
@callback
def websocket_send_notification(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    async def _run() -> None:
        try:
            connection.send_result(msg["id"], await _manager(hass).async_send_notification(msg.get("service"), msg.get("message")))
        except Exception as err:  # noqa: BLE001
            connection.send_error(msg["id"], "notification_failed", str(err))
    hass.async_create_task(_run())


@websocket_api.websocket_command({vol.Required("type"): "maintenance_dashboard/get_settings"})
@websocket_api.require_admin
@callback
def websocket_get_settings(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    async def _run() -> None:
        try:
            connection.send_result(msg["id"], await _manager(hass).async_get_settings())
        except Exception as err:  # noqa: BLE001
            connection.send_error(msg["id"], "settings_failed", str(err))
    hass.async_create_task(_run())


@websocket_api.websocket_command({vol.Required("type"): "maintenance_dashboard/update_settings", vol.Required("patch"): dict})
@websocket_api.require_admin
@callback
def websocket_update_settings(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    async def _run() -> None:
        try:
            connection.send_result(msg["id"], await _manager(hass).async_update_settings(msg["patch"]))
        except Exception as err:  # noqa: BLE001
            connection.send_error(msg["id"], "settings_update_failed", str(err))
    hass.async_create_task(_run())


@websocket_api.websocket_command({vol.Required("type"): "maintenance_dashboard/send_digest", vol.Optional("service"): str, vol.Optional("include_ok"): bool, vol.Optional("include_snoozed"): bool})
@websocket_api.require_admin
@callback
def websocket_send_digest(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    async def _run() -> None:
        try:
            connection.send_result(msg["id"], await _manager(hass).async_send_digest(msg.get("service"), include_ok=msg.get("include_ok", False), include_snoozed=msg.get("include_snoozed", False)))
        except Exception as err:  # noqa: BLE001
            connection.send_error(msg["id"], "digest_failed", str(err))
    hass.async_create_task(_run())


@websocket_api.websocket_command({vol.Required("type"): "maintenance_dashboard/notify_task", vol.Required("task_id"): str, vol.Optional("service"): str})
@websocket_api.require_admin
@callback
def websocket_notify_task(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    async def _run() -> None:
        try:
            connection.send_result(msg["id"], await _manager(hass).async_notify_task(msg["task_id"], msg.get("service")))
        except Exception as err:  # noqa: BLE001
            connection.send_error(msg["id"], "notify_task_failed", str(err))
    hass.async_create_task(_run())


@websocket_api.websocket_command({vol.Required("type"): "maintenance_dashboard/notify_due_tasks", vol.Optional("service"): str, vol.Optional("statuses"): [str]})
@websocket_api.require_admin
@callback
def websocket_notify_due_tasks(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    async def _run() -> None:
        try:
            connection.send_result(msg["id"], await _manager(hass).async_notify_due_tasks(msg.get("service"), msg.get("statuses")))
        except Exception as err:  # noqa: BLE001
            connection.send_error(msg["id"], "notify_due_failed", str(err))
    hass.async_create_task(_run())
