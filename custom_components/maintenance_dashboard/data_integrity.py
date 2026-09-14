from __future__ import annotations

import copy
import uuid
from datetime import UTC, datetime
from typing import Any

from .const import (
    CALENDAR_REPEAT_MODES,
    DEFAULT_CRITICAL_THRESHOLD,
    DEFAULT_WARNING_THRESHOLD,
    INTERVAL_UNITS,
    SCHEDULE_MODES,
    SEASONS,
    TASK_TYPES,
)


def _parse_datetime(value: Any) -> bool:
    if value in (None, ""):
        return False
    try:
        parsed = datetime.fromisoformat(str(value).replace("Z", "+00:00"))
        return parsed.tzinfo is not None or isinstance(parsed, datetime)
    except (TypeError, ValueError):
        return False


def _number(value: Any) -> float | None:
    try:
        return float(value)
    except (TypeError, ValueError):
        return None


def issue(
    code: str,
    severity: str,
    scope: str,
    record_id: str | None,
    *,
    repairable: bool,
    details: dict[str, Any] | None = None,
) -> dict[str, Any]:
    return {
        "code": code,
        "severity": severity,
        "scope": scope,
        "record_id": record_id,
        "repairable": repairable,
        "details": details or {},
    }


def inspect_integrity(
    tasks: list[Any],
    history: list[Any],
    backups: list[Any],
    settings: dict[str, Any],
    notification_state: dict[str, Any],
    quarantine: list[Any] | None = None,
    audit: list[Any] | None = None,
    *,
    known_entity_ids: set[str] | None = None,
    orphaned_task_entities: list[str] | None = None,
    templates: list[dict[str, Any]] | None = None,
) -> dict[str, Any]:
    """Return a structured, non-destructive integrity report."""
    issues: list[dict[str, Any]] = []
    task_ids: set[str] = set()

    for index, raw in enumerate(tasks):
        if not isinstance(raw, dict):
            issues.append(issue("task_not_object", "error", "task", str(index), repairable=True))
            continue
        task_id = str(raw.get("id") or "").strip()
        if not task_id:
            issues.append(issue("missing_task_id", "error", "task", None, repairable=True, details={"index": index}))
        elif task_id in task_ids:
            issues.append(issue("duplicate_task_id", "error", "task", task_id, repairable=True))
        else:
            task_ids.add(task_id)

        if raw.get("type") not in TASK_TYPES:
            issues.append(issue("invalid_task_type", "error", "task", task_id, repairable=True))
        entity_id = str(raw.get("entity_id") or "").strip()
        if entity_id and known_entity_ids is not None and entity_id not in known_entity_ids:
            issues.append(
                issue(
                    "entity_not_found",
                    "warning",
                    "task",
                    task_id,
                    repairable=False,
                    details={"entity_id": entity_id},
                )
            )
        mode = raw.get("schedule_mode", "interval")
        if mode not in SCHEDULE_MODES:
            issues.append(issue("invalid_schedule_mode", "error", "task", task_id, repairable=True))
        if raw.get("interval_unit", "days") not in INTERVAL_UNITS:
            issues.append(issue("invalid_interval_unit", "error", "task", task_id, repairable=True))
        interval = _number(raw.get("interval"))
        if interval is None or interval <= 0:
            issues.append(issue("invalid_interval", "error", "task", task_id, repairable=True))
        warning = _number(raw.get("warning_threshold", DEFAULT_WARNING_THRESHOLD))
        critical = _number(raw.get("critical_threshold", DEFAULT_CRITICAL_THRESHOLD))
        if warning is None or critical is None or warning >= critical:
            issues.append(issue("invalid_thresholds", "error", "task", task_id, repairable=True))

        if mode == "one_time" and not raw.get("completed_at") and not _parse_datetime(raw.get("due_date")):
            issues.append(issue("invalid_due_date", "error", "task", task_id, repairable=False))
        if mode == "fixed_date":
            if raw.get("calendar_repeat") not in CALENDAR_REPEAT_MODES:
                issues.append(issue("invalid_calendar_repeat", "error", "task", task_id, repairable=True))
            day = _number(raw.get("fixed_day"))
            month = _number(raw.get("fixed_month"))
            if day is None or not 1 <= day <= 31:
                issues.append(issue("invalid_fixed_day", "error", "task", task_id, repairable=True))
            if raw.get("calendar_repeat") == "yearly" and (month is None or not 1 <= month <= 12):
                issues.append(issue("invalid_fixed_month", "error", "task", task_id, repairable=True))
        if mode == "seasonal" and raw.get("season") not in SEASONS:
            issues.append(issue("invalid_season", "error", "task", task_id, repairable=True))
        for field in ("created_at", "updated_at", "last_done", "snoozed_until", "completed_at"):
            value = raw.get(field)
            if value and not _parse_datetime(value):
                issues.append(issue("invalid_timestamp", "warning", "task", task_id, repairable=True, details={"field": field}))

    history_ids: set[str] = set()
    for index, raw in enumerate(history):
        if not isinstance(raw, dict):
            issues.append(issue("history_not_object", "error", "history", str(index), repairable=True))
            continue
        event_id = str(raw.get("id") or "").strip()
        if not event_id:
            issues.append(issue("missing_history_id", "warning", "history", None, repairable=True, details={"index": index}))
        elif event_id in history_ids:
            issues.append(issue("duplicate_history_id", "warning", "history", event_id, repairable=True))
        else:
            history_ids.add(event_id)
        task_id = raw.get("task_id")
        if task_id not in (None, "global") and str(task_id) not in task_ids:
            issues.append(issue("orphan_history_entry", "warning", "history", event_id, repairable=False, details={"task_id": task_id}))
        if raw.get("created_at") and not _parse_datetime(raw.get("created_at")):
            issues.append(issue("invalid_history_timestamp", "warning", "history", event_id, repairable=True))

    backup_ids: set[str] = set()
    for index, raw in enumerate(backups):
        if not isinstance(raw, dict):
            issues.append(issue("backup_not_object", "error", "backup", str(index), repairable=True))
            continue
        backup_id = str(raw.get("id") or "").strip()
        if not backup_id:
            issues.append(issue("missing_backup_id", "error", "backup", None, repairable=True, details={"index": index}))
        elif backup_id in backup_ids:
            issues.append(issue("duplicate_backup_id", "error", "backup", backup_id, repairable=True))
        else:
            backup_ids.add(backup_id)
        if not isinstance(raw.get("tasks", []), list) or not isinstance(raw.get("history", []), list):
            issues.append(issue("invalid_backup_snapshot", "error", "backup", backup_id, repairable=False))
        if raw.get("created_at") and not _parse_datetime(raw.get("created_at")):
            issues.append(issue("invalid_backup_timestamp", "warning", "backup", backup_id, repairable=True))

    notifications = settings.get("notifications", {}) if isinstance(settings, dict) else {}
    notify_service = str(notifications.get("notify_service") or "")
    if notify_service and "." not in notify_service:
        issues.append(issue("invalid_notify_service", "warning", "settings", None, repairable=False))
    for numeric_key in ("repeat_days", "escalation_after_days", "action_snooze_days", "history_retention"):
        value = _number(notifications.get(numeric_key))
        if value is None or value < 0:
            issues.append(
                issue(
                    "invalid_notification_rule",
                    "warning",
                    "settings",
                    None,
                    repairable=True,
                    details={"field": numeric_key},
                )
            )
    for time_key in ("digest_time", "quiet_from", "quiet_to"):
        value = str(notifications.get(time_key) or "")
        try:
            hour, minute = (int(part) for part in value.split(":", 1))
            valid_time = 0 <= hour <= 23 and 0 <= minute <= 59
        except (TypeError, ValueError):
            valid_time = False
        if not valid_time:
            issues.append(
                issue(
                    "invalid_notification_time",
                    "warning",
                    "settings",
                    None,
                    repairable=True,
                    details={"field": time_key, "value": value},
                )
            )

    task_entity_settings = settings.get("task_entities", {}) if isinstance(settings, dict) else {}
    if task_entity_settings.get("mode", "off") not in {"off", "due_only", "basic", "full"}:
        issues.append(issue("invalid_task_entity_mode", "warning", "settings", None, repairable=True))
    for entity_id in orphaned_task_entities or []:
        issues.append(
            issue(
                "orphaned_entity_registry_entry",
                "warning",
                "entity_registry",
                entity_id,
                repairable=True,
            )
        )

    template_ids: set[str] = set()
    for index, template in enumerate(templates or []):
        template_id = str(template.get("id") or "").strip() if isinstance(template, dict) else ""
        if not template_id:
            issues.append(issue("missing_template_id", "warning", "template", str(index), repairable=False))
        elif template_id in template_ids:
            issues.append(issue("duplicate_template_id", "error", "template", template_id, repairable=False))
        else:
            template_ids.add(template_id)
    if not isinstance(notification_state.get("last_sent", {}), dict):
        issues.append(issue("invalid_notification_last_sent", "error", "notification_state", None, repairable=True))
    if not isinstance(notification_state.get("task_status", {}), dict):
        issues.append(issue("invalid_notification_task_status", "error", "notification_state", None, repairable=True))
    if not isinstance(notification_state.get("history", []), list):
        issues.append(issue("invalid_notification_history", "error", "notification_state", None, repairable=True))
    task_status = notification_state.get("task_status", {})
    if isinstance(task_status, dict):
        for task_id in task_status:
            if str(task_id) not in task_ids:
                issues.append(
                    issue(
                        "orphan_notification_task_state",
                        "warning",
                        "notification_state",
                        str(task_id),
                        repairable=True,
                    )
                )

    quarantine_ids: set[str] = set()
    for index, raw in enumerate(quarantine or []):
        if not isinstance(raw, dict):
            issues.append(issue("quarantine_not_object", "error", "quarantine", str(index), repairable=True))
            continue
        record_id = str(raw.get("id") or "").strip()
        if not record_id:
            issues.append(issue("missing_quarantine_id", "warning", "quarantine", None, repairable=True, details={"index": index}))
        elif record_id in quarantine_ids:
            issues.append(issue("duplicate_quarantine_id", "warning", "quarantine", record_id, repairable=True))
        else:
            quarantine_ids.add(record_id)
        if raw.get("detected_at") and not _parse_datetime(raw.get("detected_at")):
            issues.append(issue("invalid_quarantine_timestamp", "warning", "quarantine", record_id, repairable=True))

    audit_ids: set[str] = set()
    for index, raw in enumerate(audit or []):
        if not isinstance(raw, dict):
            issues.append(issue("audit_not_object", "error", "audit", str(index), repairable=True))
            continue
        record_id = str(raw.get("id") or "").strip()
        if not record_id:
            issues.append(issue("missing_audit_id", "warning", "audit", None, repairable=True, details={"index": index}))
        elif record_id in audit_ids:
            issues.append(issue("duplicate_audit_id", "warning", "audit", record_id, repairable=True))
        else:
            audit_ids.add(record_id)
        if raw.get("created_at") and not _parse_datetime(raw.get("created_at")):
            issues.append(issue("invalid_audit_timestamp", "warning", "audit", record_id, repairable=True))

    errors = sum(1 for item in issues if item["severity"] == "error")
    warnings = sum(1 for item in issues if item["severity"] == "warning")
    repairable = sum(1 for item in issues if item["repairable"])
    return {
        "healthy": errors == 0,
        "errors": errors,
        "warnings": warnings,
        "repairable": repairable,
        "quarantined": len(quarantine or []),
        "checked_at": datetime.now(UTC).isoformat(),
        "issues": issues,
    }


def repair_record_ids(records: list[dict[str, Any]], id_field: str = "id") -> tuple[list[dict[str, Any]], int]:
    """Generate stable unique IDs for missing or duplicate records."""
    repaired = copy.deepcopy(records)
    seen: set[str] = set()
    count = 0
    for record in repaired:
        value = str(record.get(id_field) or "").strip()
        if not value or value in seen:
            value = uuid.uuid4().hex
            record[id_field] = value
            count += 1
        seen.add(value)
    return repaired, count
