from __future__ import annotations

from typing import TYPE_CHECKING

from homeassistant.helpers import issue_registry as ir

from .const import DOMAIN

if TYPE_CHECKING:
    from homeassistant.core import HomeAssistant

    from .manager import MaintenanceManager


ISSUE_DATA_INTEGRITY = "data_integrity"
ISSUE_MIGRATION_FAILED = "migration_failed"
ISSUE_NOTIFY_SERVICE = "notify_service_invalid"
ISSUE_BACKUP_STORAGE = "backup_storage_invalid"


async def async_sync_repair_issues(hass: HomeAssistant, manager: MaintenanceManager) -> None:
    """Create or clear native Home Assistant repair issues."""
    integrity = manager._integrity  # Internal synchronization helper.
    if integrity.get("errors", 0):
        ir.async_create_issue(
            hass,
            DOMAIN,
            ISSUE_DATA_INTEGRITY,
            is_fixable=True,
            is_persistent=False,
            severity=ir.IssueSeverity.ERROR,
            translation_key=ISSUE_DATA_INTEGRITY,
            translation_placeholders={
                "errors": str(integrity.get("errors", 0)),
                "warnings": str(integrity.get("warnings", 0)),
            },
        )
    else:
        ir.async_delete_issue(hass, DOMAIN, ISSUE_DATA_INTEGRITY)

    migration_error = manager._meta.get("migration_error")
    if migration_error:
        ir.async_create_issue(
            hass,
            DOMAIN,
            ISSUE_MIGRATION_FAILED,
            is_fixable=False,
            is_persistent=True,
            severity=ir.IssueSeverity.ERROR,
            translation_key=ISSUE_MIGRATION_FAILED,
            translation_placeholders={"error": str(migration_error)},
        )
    else:
        ir.async_delete_issue(hass, DOMAIN, ISSUE_MIGRATION_FAILED)

    notify_service = str(manager.settings.get("notifications", {}).get("notify_service") or "")
    invalid_notify = False
    if notify_service:
        if "." not in notify_service:
            invalid_notify = True
        else:
            service_domain, service_name = notify_service.split(".", 1)
            invalid_notify = not hass.services.has_service(service_domain, service_name)
    if invalid_notify:
        ir.async_create_issue(
            hass,
            DOMAIN,
            ISSUE_NOTIFY_SERVICE,
            is_fixable=False,
            is_persistent=False,
            severity=ir.IssueSeverity.WARNING,
            translation_key=ISSUE_NOTIFY_SERVICE,
            translation_placeholders={"service": notify_service},
        )
    else:
        ir.async_delete_issue(hass, DOMAIN, ISSUE_NOTIFY_SERVICE)

    invalid_backups = [
        item
        for item in manager.backups
        if not isinstance(item.get("tasks"), list) or not isinstance(item.get("history"), list)
    ]
    invalid_backups.extend(
        item
        for item in manager.quarantine
        if item.get("record_type") == "backup"
    )
    if invalid_backups:
        ir.async_create_issue(
            hass,
            DOMAIN,
            ISSUE_BACKUP_STORAGE,
            is_fixable=False,
            is_persistent=False,
            severity=ir.IssueSeverity.ERROR,
            translation_key=ISSUE_BACKUP_STORAGE,
            translation_placeholders={"count": str(len(invalid_backups))},
        )
    else:
        ir.async_delete_issue(hass, DOMAIN, ISSUE_BACKUP_STORAGE)
