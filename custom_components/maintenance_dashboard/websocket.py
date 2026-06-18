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
    websocket_api.async_register_command(hass, websocket_reactivate_task)
    websocket_api.async_register_command(hass, websocket_set_workflow_state)
    websocket_api.async_register_command(hass, websocket_reset_task_progress)
    websocket_api.async_register_command(hass, websocket_restart_task_cycle)
    websocket_api.async_register_command(hass, websocket_skip_task_cycle)
    websocket_api.async_register_command(hass, websocket_undo_completion)
    websocket_api.async_register_command(hass, websocket_snooze)
    websocket_api.async_register_command(hass, websocket_clear_snooze)
    websocket_api.async_register_command(hass, websocket_reorder)
    websocket_api.async_register_command(hass, websocket_restore_backup)
    websocket_api.async_register_command(hass, websocket_import_tasks)
    websocket_api.async_register_command(hass, websocket_export_data)
    websocket_api.async_register_command(hass, websocket_import_data)
    websocket_api.async_register_command(hass, websocket_send_notification)
    websocket_api.async_register_command(hass, websocket_test_notification)
    websocket_api.async_register_command(hass, websocket_get_settings)
    websocket_api.async_register_command(hass, websocket_update_settings)
    websocket_api.async_register_command(hass, websocket_send_digest)
    websocket_api.async_register_command(hass, websocket_notify_task)
    websocket_api.async_register_command(hass, websocket_notify_due_tasks)
    websocket_api.async_register_command(hass, websocket_preview_notification)
    websocket_api.async_register_command(hass, websocket_process_notifications)
    websocket_api.async_register_command(hass, websocket_cleanup_task_entities)
    websocket_api.async_register_command(hass, websocket_clear_notification_history)
    websocket_api.async_register_command(hass, websocket_check_integrity)
    websocket_api.async_register_command(hass, websocket_repair_integrity)
    websocket_api.async_register_command(hass, websocket_create_backup)
    websocket_api.async_register_command(hass, websocket_update_backup)
    websocket_api.async_register_command(hass, websocket_delete_backup)
    websocket_api.async_register_command(hass, websocket_backup_diff)
    websocket_api.async_register_command(hass, websocket_restore_backup_sections)
    websocket_api.async_register_command(hass, websocket_preview_import)
    websocket_api.async_register_command(hass, websocket_restore_quarantine)
    websocket_api.async_register_command(hass, websocket_delete_quarantine)
    websocket_api.async_register_command(hass, websocket_preview_bulk_operation)
    websocket_api.async_register_command(hass, websocket_bulk_operation)
    websocket_api.async_register_command(hass, websocket_update_template_favorites)
    websocket_api.async_register_command(hass, websocket_save_custom_template)
    websocket_api.async_register_command(hass, websocket_delete_custom_template)
    websocket_api.async_register_command(hass, websocket_save_template_from_task)
    websocket_api.async_register_command(hass, websocket_preview_user_template_import)
    websocket_api.async_register_command(hass, websocket_import_user_templates)
    websocket_api.async_register_command(hass, websocket_update_task_note)
    websocket_api.async_register_command(hass, websocket_delete_task_note)
    websocket_api.async_register_command(hass, websocket_store_completion_attachment)
    websocket_api.async_register_command(hass, websocket_get_statistics)
    websocket_api.async_register_command(hass, websocket_get_attachment)


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


@websocket_api.websocket_command({
    vol.Required("type"): "maintenance_dashboard/mark_done",
    vol.Required("task_id"): str,
    vol.Optional("done_at"): str,
    vol.Optional("note"): str,
    vol.Optional("checklist"): [dict],
    vol.Optional("material"): str,
    vol.Optional("cost"): vol.Coerce(float),
    vol.Optional("currency"): str,
    vol.Optional("performed_by"): str,
    vol.Optional("attachments"): [str],
})
@callback
def websocket_mark_done(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    async def _run() -> None:
        try:
            connection.send_result(
                msg["id"],
                await _manager(hass).async_mark_done(
                    msg["task_id"],
                    msg.get("done_at"),
                    msg.get("note"),
                    checklist=msg.get("checklist"),
                    material=msg.get("material"),
                    cost=msg.get("cost"),
                    currency=msg.get("currency"),
                    performed_by=msg.get("performed_by"),
                    attachments=msg.get("attachments"),
                ),
            )
        except Exception as err:  # noqa: BLE001
            connection.send_error(msg["id"], "mark_done_failed", str(err))
    hass.async_create_task(_run())


@websocket_api.websocket_command({vol.Required("type"): "maintenance_dashboard/reactivate_task", vol.Required("task_id"): str})
@websocket_api.require_admin
@callback
def websocket_reactivate_task(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    async def _run() -> None:
        try:
            connection.send_result(msg["id"], await _manager(hass).async_reactivate_task(msg["task_id"]))
        except Exception as err:  # noqa: BLE001
            connection.send_error(msg["id"], "reactivate_failed", str(err))
    hass.async_create_task(_run())


@websocket_api.websocket_command({
    vol.Required("type"): "maintenance_dashboard/set_workflow_state",
    vol.Required("task_id"): str,
    vol.Required("state"): vol.In({"planned", "ready", "in_progress", "blocked"}),
    vol.Optional("note"): str,
})
@websocket_api.require_admin
@callback
def websocket_set_workflow_state(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    async def _run() -> None:
        try:
            connection.send_result(
                msg["id"],
                await _manager(hass).async_set_workflow_state(
                    msg["task_id"],
                    msg["state"],
                    note=msg.get("note"),
                ),
            )
        except Exception as err:  # noqa: BLE001
            connection.send_error(msg["id"], "workflow_state_failed", str(err))
    hass.async_create_task(_run())


@websocket_api.websocket_command({
    vol.Required("type"): "maintenance_dashboard/reset_task_progress",
    vol.Required("task_id"): str,
    vol.Optional("note"): str,
})
@websocket_api.require_admin
@callback
def websocket_reset_task_progress(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    async def _run() -> None:
        try:
            connection.send_result(
                msg["id"],
                await _manager(hass).async_reset_task_progress(
                    msg["task_id"],
                    note=msg.get("note"),
                ),
            )
        except Exception as err:  # noqa: BLE001
            connection.send_error(msg["id"], "reset_task_progress_failed", str(err))
    hass.async_create_task(_run())


@websocket_api.websocket_command({
    vol.Required("type"): "maintenance_dashboard/restart_task_cycle",
    vol.Required("task_id"): str,
    vol.Optional("restarted_at"): str,
    vol.Optional("note"): str,
})
@websocket_api.require_admin
@callback
def websocket_restart_task_cycle(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    async def _run() -> None:
        try:
            connection.send_result(
                msg["id"],
                await _manager(hass).async_restart_task_cycle(
                    msg["task_id"],
                    restarted_at=msg.get("restarted_at"),
                    note=msg.get("note"),
                ),
            )
        except Exception as err:  # noqa: BLE001
            connection.send_error(msg["id"], "restart_task_cycle_failed", str(err))
    hass.async_create_task(_run())


@websocket_api.websocket_command({
    vol.Required("type"): "maintenance_dashboard/skip_task_cycle",
    vol.Required("task_id"): str,
    vol.Optional("skipped_at"): str,
    vol.Optional("note"): str,
})
@websocket_api.require_admin
@callback
def websocket_skip_task_cycle(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    async def _run() -> None:
        try:
            connection.send_result(
                msg["id"],
                await _manager(hass).async_skip_task_cycle(
                    msg["task_id"],
                    skipped_at=msg.get("skipped_at"),
                    note=msg.get("note"),
                ),
            )
        except Exception as err:  # noqa: BLE001
            connection.send_error(msg["id"], "skip_task_cycle_failed", str(err))
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
            connection.send_result(msg["id"], await _manager(hass).async_restore_backup(msg["backup_id"]))
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


@websocket_api.websocket_command({vol.Required("type"): "maintenance_dashboard/import_data", vol.Required("payload"): dict, vol.Optional("mode", default="replace"): vol.In({"replace", "merge"}), vol.Optional("duplicate_mode", default="overwrite"): vol.In({"skip", "overwrite", "new_id"})})
@websocket_api.require_admin
@callback
def websocket_import_data(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    async def _run() -> None:
        try:
            connection.send_result(msg["id"], await _manager(hass).async_import_data(msg["payload"], mode=msg.get("mode", "replace"), duplicate_mode=msg.get("duplicate_mode", "overwrite")))
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


@websocket_api.websocket_command({vol.Required("type"): "maintenance_dashboard/test_notification", vol.Optional("service"): str})
@websocket_api.require_admin
@callback
def websocket_test_notification(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    async def _run() -> None:
        try:
            connection.send_result(msg["id"], await _manager(hass).async_test_notification(msg.get("service")))
        except Exception as err:  # noqa: BLE001
            connection.send_error(msg["id"], "test_notification_failed", str(err))
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


@websocket_api.websocket_command({vol.Required("type"): "maintenance_dashboard/preview_notification", vol.Required("task_id"): str, vol.Optional("service"): str})
@websocket_api.require_admin
@callback
def websocket_preview_notification(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    async def _run() -> None:
        try:
            connection.send_result(msg["id"], await _manager(hass).async_preview_notification(msg["task_id"], msg.get("service")))
        except Exception as err:  # noqa: BLE001
            connection.send_error(msg["id"], "preview_notification_failed", str(err))
    hass.async_create_task(_run())


@websocket_api.websocket_command({vol.Required("type"): "maintenance_dashboard/process_notifications"})
@websocket_api.require_admin
@callback
def websocket_process_notifications(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    async def _run() -> None:
        try:
            connection.send_result(msg["id"], await _manager(hass).async_maybe_send_scheduled_notifications())
        except Exception as err:  # noqa: BLE001
            connection.send_error(msg["id"], "process_notifications_failed", str(err))
    hass.async_create_task(_run())


@websocket_api.websocket_command({vol.Required("type"): "maintenance_dashboard/cleanup_task_entities"})
@websocket_api.require_admin
@callback
def websocket_cleanup_task_entities(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    async def _run() -> None:
        try:
            connection.send_result(msg["id"], await _manager(hass).async_cleanup_task_entities())
        except Exception as err:  # noqa: BLE001
            connection.send_error(msg["id"], "cleanup_task_entities_failed", str(err))
    hass.async_create_task(_run())


@websocket_api.websocket_command({vol.Required("type"): "maintenance_dashboard/clear_notification_history"})
@websocket_api.require_admin
@callback
def websocket_clear_notification_history(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    async def _run() -> None:
        try:
            connection.send_result(msg["id"], await _manager(hass).async_clear_notification_history())
        except Exception as err:  # noqa: BLE001
            connection.send_error(msg["id"], "clear_notification_history_failed", str(err))
    hass.async_create_task(_run())


@websocket_api.websocket_command({vol.Required("type"): "maintenance_dashboard/check_integrity"})
@websocket_api.require_admin
@callback
def websocket_check_integrity(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    async def _run() -> None:
        try:
            connection.send_result(msg["id"], await _manager(hass).async_check_integrity())
        except Exception as err:  # noqa: BLE001
            connection.send_error(msg["id"], "integrity_check_failed", str(err))
    hass.async_create_task(_run())


@websocket_api.websocket_command({vol.Required("type"): "maintenance_dashboard/repair_integrity"})
@websocket_api.require_admin
@callback
def websocket_repair_integrity(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    async def _run() -> None:
        try:
            connection.send_result(msg["id"], await _manager(hass).async_repair_integrity())
        except Exception as err:  # noqa: BLE001
            connection.send_error(msg["id"], "integrity_repair_failed", str(err))
    hass.async_create_task(_run())


@websocket_api.websocket_command({
    vol.Required("type"): "maintenance_dashboard/create_backup",
    vol.Optional("name"): str,
    vol.Optional("pinned", default=False): bool,
})
@websocket_api.require_admin
@callback
def websocket_create_backup(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    async def _run() -> None:
        try:
            connection.send_result(
                msg["id"],
                await _manager(hass).async_create_backup(name=msg.get("name"), pinned=msg.get("pinned", False)),
            )
        except Exception as err:  # noqa: BLE001
            connection.send_error(msg["id"], "create_backup_failed", str(err))
    hass.async_create_task(_run())


@websocket_api.websocket_command({
    vol.Required("type"): "maintenance_dashboard/update_backup",
    vol.Required("backup_id"): str,
    vol.Optional("name"): str,
    vol.Optional("pinned"): bool,
})
@websocket_api.require_admin
@callback
def websocket_update_backup(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    async def _run() -> None:
        try:
            connection.send_result(
                msg["id"],
                await _manager(hass).async_update_backup(
                    msg["backup_id"], name=msg.get("name"), pinned=msg.get("pinned")
                ),
            )
        except Exception as err:  # noqa: BLE001
            connection.send_error(msg["id"], "update_backup_failed", str(err))
    hass.async_create_task(_run())


@websocket_api.websocket_command({
    vol.Required("type"): "maintenance_dashboard/delete_backup",
    vol.Required("backup_id"): str,
})
@websocket_api.require_admin
@callback
def websocket_delete_backup(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    async def _run() -> None:
        try:
            connection.send_result(msg["id"], await _manager(hass).async_delete_backup(msg["backup_id"]))
        except Exception as err:  # noqa: BLE001
            connection.send_error(msg["id"], "delete_backup_failed", str(err))
    hass.async_create_task(_run())


@websocket_api.websocket_command({
    vol.Required("type"): "maintenance_dashboard/backup_diff",
    vol.Required("backup_id"): str,
})
@websocket_api.require_admin
@callback
def websocket_backup_diff(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    async def _run() -> None:
        try:
            connection.send_result(msg["id"], await _manager(hass).async_backup_diff(msg["backup_id"]))
        except Exception as err:  # noqa: BLE001
            connection.send_error(msg["id"], "backup_diff_failed", str(err))
    hass.async_create_task(_run())


@websocket_api.websocket_command({
    vol.Required("type"): "maintenance_dashboard/restore_backup_sections",
    vol.Required("backup_id"): str,
    vol.Optional("sections"): [str],
    vol.Optional("task_ids"): [str],
})
@websocket_api.require_admin
@callback
def websocket_restore_backup_sections(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    async def _run() -> None:
        try:
            connection.send_result(
                msg["id"],
                await _manager(hass).async_restore_backup_sections(
                    msg["backup_id"], sections=msg.get("sections"), task_ids=msg.get("task_ids")
                ),
            )
        except Exception as err:  # noqa: BLE001
            connection.send_error(msg["id"], "restore_backup_sections_failed", str(err))
    hass.async_create_task(_run())


@websocket_api.websocket_command({
    vol.Required("type"): "maintenance_dashboard/preview_import",
    vol.Required("payload"): dict,
    vol.Optional("mode", default="replace"): vol.In({"replace", "merge"}),
    vol.Optional("duplicate_mode", default="overwrite"): vol.In({"skip", "overwrite", "new_id"}),
})
@websocket_api.require_admin
@callback
def websocket_preview_import(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    async def _run() -> None:
        try:
            connection.send_result(
                msg["id"],
                await _manager(hass).async_preview_import(
                    msg["payload"], mode=msg["mode"], duplicate_mode=msg["duplicate_mode"]
                ),
            )
        except Exception as err:  # noqa: BLE001
            connection.send_error(msg["id"], "preview_import_failed", str(err))
    hass.async_create_task(_run())


@websocket_api.websocket_command({
    vol.Required("type"): "maintenance_dashboard/restore_quarantine",
    vol.Required("quarantine_id"): str,
})
@websocket_api.require_admin
@callback
def websocket_restore_quarantine(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    async def _run() -> None:
        try:
            connection.send_result(msg["id"], await _manager(hass).async_restore_quarantine(msg["quarantine_id"]))
        except Exception as err:  # noqa: BLE001
            connection.send_error(msg["id"], "restore_quarantine_failed", str(err))
    hass.async_create_task(_run())


@websocket_api.websocket_command({
    vol.Required("type"): "maintenance_dashboard/delete_quarantine",
    vol.Required("quarantine_id"): str,
})
@websocket_api.require_admin
@callback
def websocket_delete_quarantine(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    async def _run() -> None:
        try:
            connection.send_result(msg["id"], await _manager(hass).async_delete_quarantine(msg["quarantine_id"]))
        except Exception as err:  # noqa: BLE001
            connection.send_error(msg["id"], "delete_quarantine_failed", str(err))
    hass.async_create_task(_run())


@websocket_api.websocket_command({
    vol.Required("type"): "maintenance_dashboard/preview_bulk_operation",
    vol.Required("task_ids"): [str],
    vol.Required("action"): vol.In({"done", "snooze", "clear_snooze", "category", "area", "priority", "enable", "disable", "delete", "restore", "duplicate"}),
    vol.Optional("value"): object,
})
@websocket_api.require_admin
@callback
def websocket_preview_bulk_operation(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    async def _run() -> None:
        try:
            connection.send_result(
                msg["id"],
                await _manager(hass).async_preview_bulk_operation(
                    msg["task_ids"], action=msg["action"], value=msg.get("value")
                ),
            )
        except Exception as err:  # noqa: BLE001
            connection.send_error(msg["id"], "preview_bulk_operation_failed", str(err))
    hass.async_create_task(_run())


@websocket_api.websocket_command({
    vol.Required("type"): "maintenance_dashboard/bulk_operation",
    vol.Required("task_ids"): [str],
    vol.Required("action"): vol.In({"done", "snooze", "clear_snooze", "category", "area", "priority", "enable", "disable", "delete", "restore", "duplicate"}),
    vol.Optional("value"): object,
})
@websocket_api.require_admin
@callback
def websocket_bulk_operation(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    async def _run() -> None:
        try:
            connection.send_result(
                msg["id"],
                await _manager(hass).async_bulk_operation(
                    msg["task_ids"], action=msg["action"], value=msg.get("value")
                ),
            )
        except Exception as err:  # noqa: BLE001
            connection.send_error(msg["id"], "bulk_operation_failed", str(err))
    hass.async_create_task(_run())


@websocket_api.websocket_command({
    vol.Required("type"): "maintenance_dashboard/update_template_favorites",
    vol.Required("favorites"): [str],
})
@websocket_api.require_admin
@callback
def websocket_update_template_favorites(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    async def _run() -> None:
        try:
            connection.send_result(msg["id"], await _manager(hass).async_update_template_favorites(msg["favorites"]))
        except Exception as err:  # noqa: BLE001
            connection.send_error(msg["id"], "update_template_favorites_failed", str(err))
    hass.async_create_task(_run())


@websocket_api.websocket_command({
    vol.Required("type"): "maintenance_dashboard/save_custom_template",
    vol.Required("template"): dict,
})
@websocket_api.require_admin
@callback
def websocket_save_custom_template(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    async def _run() -> None:
        try:
            connection.send_result(msg["id"], await _manager(hass).async_save_custom_template(msg["template"]))
        except Exception as err:  # noqa: BLE001
            connection.send_error(msg["id"], "save_custom_template_failed", str(err))
    hass.async_create_task(_run())


@websocket_api.websocket_command({
    vol.Required("type"): "maintenance_dashboard/delete_custom_template",
    vol.Required("template_id"): str,
})
@websocket_api.require_admin
@callback
def websocket_delete_custom_template(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    async def _run() -> None:
        try:
            connection.send_result(msg["id"], await _manager(hass).async_delete_custom_template(msg["template_id"]))
        except Exception as err:  # noqa: BLE001
            connection.send_error(msg["id"], "delete_custom_template_failed", str(err))
    hass.async_create_task(_run())


@websocket_api.websocket_command({
    vol.Required("type"): "maintenance_dashboard/save_template_from_task",
    vol.Required("task_id"): str,
})
@websocket_api.require_admin
@callback
def websocket_save_template_from_task(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    async def _run() -> None:
        try:
            connection.send_result(msg["id"], await _manager(hass).async_save_template_from_task(msg["task_id"]))
        except Exception as err:  # noqa: BLE001
            connection.send_error(msg["id"], "save_template_from_task_failed", str(err))
    hass.async_create_task(_run())


@websocket_api.websocket_command({
    vol.Required("type"): "maintenance_dashboard/preview_user_template_import",
    vol.Required("payload"): object,
})
@websocket_api.require_admin
@callback
def websocket_preview_user_template_import(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    async def _run() -> None:
        try:
            connection.send_result(msg["id"], await _manager(hass).async_preview_user_template_import(msg["payload"]))
        except Exception as err:  # noqa: BLE001
            connection.send_error(msg["id"], "preview_user_template_import_failed", str(err))
    hass.async_create_task(_run())


@websocket_api.websocket_command({
    vol.Required("type"): "maintenance_dashboard/import_user_templates",
    vol.Required("payload"): object,
    vol.Optional("skip_duplicates", default=True): bool,
})
@websocket_api.require_admin
@callback
def websocket_import_user_templates(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    async def _run() -> None:
        try:
            connection.send_result(
                msg["id"],
                await _manager(hass).async_import_user_templates(msg["payload"], skip_duplicates=msg.get("skip_duplicates", True)),
            )
        except Exception as err:  # noqa: BLE001
            connection.send_error(msg["id"], "import_user_templates_failed", str(err))
    hass.async_create_task(_run())


@websocket_api.websocket_command({
    vol.Required("type"): "maintenance_dashboard/update_task_note",
    vol.Required("task_id"): str,
    vol.Required("note_id"): str,
    vol.Required("text"): str,
})
@websocket_api.require_admin
@callback
def websocket_update_task_note(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    async def _run() -> None:
        try:
            connection.send_result(msg["id"], await _manager(hass).async_update_task_note(msg["task_id"], msg["note_id"], msg["text"]))
        except Exception as err:  # noqa: BLE001
            connection.send_error(msg["id"], "update_task_note_failed", str(err))
    hass.async_create_task(_run())


@websocket_api.websocket_command({
    vol.Required("type"): "maintenance_dashboard/delete_task_note",
    vol.Required("task_id"): str,
    vol.Required("note_id"): str,
})
@websocket_api.require_admin
@callback
def websocket_delete_task_note(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    async def _run() -> None:
        try:
            connection.send_result(msg["id"], await _manager(hass).async_delete_task_note(msg["task_id"], msg["note_id"]))
        except Exception as err:  # noqa: BLE001
            connection.send_error(msg["id"], "delete_task_note_failed", str(err))
    hass.async_create_task(_run())


@websocket_api.websocket_command({
    vol.Required("type"): "maintenance_dashboard/store_completion_attachment",
    vol.Required("attachment"): dict,
})
@websocket_api.require_admin
@callback
def websocket_store_completion_attachment(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    async def _run() -> None:
        try:
            connection.send_result(msg["id"], await _manager(hass).async_store_completion_attachment(msg["attachment"]))
        except Exception as err:  # noqa: BLE001
            connection.send_error(msg["id"], "store_completion_attachment_failed", str(err))
    hass.async_create_task(_run())


@websocket_api.websocket_command({
    vol.Required("type"): "maintenance_dashboard/get_statistics",
    vol.Optional("year"): int,
})
@callback
def websocket_get_statistics(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    async def _run() -> None:
        connection.send_result(msg["id"], await _manager(hass).async_get_statistics(msg.get("year")))
    hass.async_create_task(_run())


@websocket_api.websocket_command({
    vol.Required("type"): "maintenance_dashboard/get_attachment",
    vol.Required("attachment_id"): str,
})
@callback
def websocket_get_attachment(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    async def _run() -> None:
        record = await _manager(hass).async_get_attachment(msg["attachment_id"])
        if not record:
            connection.send_error(msg["id"], "not_found", "Attachment not found")
            return
        connection.send_result(msg["id"], record)
    hass.async_create_task(_run())
