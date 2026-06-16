from __future__ import annotations

import copy
from typing import Any

from .const import (
    AUDIT_RETENTION_DEFAULT,
    BACKUP_MAX_AGE_DAYS,
    BACKUP_RETENTION,
    DASHBOARD_VIEW_MODES,
    DASHBOARD_WIDGETS,
    QUARANTINE_RETENTION_DEFAULT,
    TASK_ENTITY_MODES,
)


def default_settings() -> dict[str, Any]:
    """Return the default backend-owned settings document."""
    return {
        "version": 3,
        "notifications": {
            "enabled": False,
            "notify_service": "",
            "warning": True,
            "critical": True,
            "overdue": True,
            "unavailable": False,
            "due": True,
            "daily_digest": False,
            "digest_time": "08:00",
            "digest_group_by_category": True,
            "quiet_hours_enabled": False,
            "quiet_from": "22:00",
            "quiet_to": "07:00",
            "include_dashboard_link": True,
            "include_snoozed": False,
            "once_per_status": True,
            "repeat_days": 3,
            "escalation_enabled": True,
            "escalation_after_days": 3,
            "actionable": True,
            "action_snooze_days": 7,
            "test_mode": False,
            "history_retention": 200,
        },
        "task_entities": {
            "mode": "off",
            "device_grouping": "dashboard",
            "cleanup_removed": False,
        },
        "backups": {
            "maximum_count": BACKUP_RETENTION,
            "maximum_age_days": BACKUP_MAX_AGE_DAYS,
            "before_task_update": True,
            "before_task_delete": True,
            "before_import": True,
            "before_migration": True,
            "before_restore": True,
            "before_bulk_operation": True,
        },
        "data_integrity": {
            "check_on_start": True,
            "quarantine_invalid_records": True,
            "audit_retention": AUDIT_RETENTION_DEFAULT,
            "quarantine_retention": QUARANTINE_RETENTION_DEFAULT,
        },
        "dashboard": {
            "view_mode": "cards",
            "density": "comfortable",
            "default_due_filter": "all",
            "show_quick_filters": False,
            "remember_last_view": True,
            "widgets": [
                "health",
                "open",
                "critical",
                "warning",
                "next",
                "due_today",
                "due_week",
                "completed_this_year",
                "unavailable",
            ],
            "saved_filters": [],
        },
        "workflow": {
            "default_state": "planned",
            "show_checklists": True,
            "reset_checklist_on_completion": True,
            "default_completion_requirements": {
                "note": False,
                "material": False,
                "cost": False,
                "performed_by": False,
                "checklist": False,
            },
        },
        "native_platforms": {
            "todo_enabled": True,
            "todo_include_disabled": False,
            "calendar_enabled": True,
            "calendar_include_snoozed": False,
            "calendar_event_duration_minutes": 60,
        },
        "onboarding": {
            "completed": False,
            "selected_packs": [],
        },
    }


def deep_merge(base: dict[str, Any], patch: dict[str, Any] | None) -> dict[str, Any]:
    """Recursively merge dictionaries while preserving unknown fields."""
    merged = copy.deepcopy(base)
    for key, value in (patch or {}).items():
        if isinstance(value, dict) and isinstance(merged.get(key), dict):
            merged[key] = deep_merge(merged[key], value)
        else:
            merged[key] = copy.deepcopy(value)
    return merged


def _clamp_int(value: Any, default: int, minimum: int, maximum: int) -> int:
    try:
        parsed = int(value)
    except (TypeError, ValueError):
        parsed = default
    return max(minimum, min(maximum, parsed))


def normalize_settings(settings: dict[str, Any] | None) -> dict[str, Any]:
    """Normalize user settings without destructively dropping unknown fields."""
    normalized = deep_merge(default_settings(), settings or {})
    normalized["version"] = 3

    task_entities = normalized.setdefault("task_entities", {})
    if task_entities.get("mode") not in TASK_ENTITY_MODES:
        task_entities["mode"] = "off"
    if task_entities.get("device_grouping") not in {"none", "dashboard", "category"}:
        task_entities["device_grouping"] = "dashboard"
    task_entities["cleanup_removed"] = bool(task_entities.get("cleanup_removed", False))

    notifications = normalized.setdefault("notifications", {})
    for key, default in {
        "enabled": False,
        "warning": True,
        "critical": True,
        "overdue": True,
        "unavailable": False,
        "due": True,
        "daily_digest": False,
        "digest_group_by_category": True,
        "quiet_hours_enabled": False,
        "include_dashboard_link": True,
        "include_snoozed": False,
        "once_per_status": True,
        "escalation_enabled": True,
        "actionable": True,
        "test_mode": False,
    }.items():
        notifications[key] = bool(notifications.get(key, default))
    notifications["notify_service"] = str(notifications.get("notify_service") or "").strip()
    notifications["digest_time"] = str(notifications.get("digest_time") or "08:00")[:5]
    notifications["quiet_from"] = str(notifications.get("quiet_from") or "22:00")[:5]
    notifications["quiet_to"] = str(notifications.get("quiet_to") or "07:00")[:5]
    notifications["repeat_days"] = _clamp_int(notifications.get("repeat_days"), 3, 0, 365)
    notifications["escalation_after_days"] = _clamp_int(notifications.get("escalation_after_days"), 3, 0, 365)
    notifications["action_snooze_days"] = _clamp_int(notifications.get("action_snooze_days"), 7, 1, 365)
    notifications["history_retention"] = _clamp_int(notifications.get("history_retention"), 200, 20, 2000)

    backups = normalized.setdefault("backups", {})
    backups["maximum_count"] = _clamp_int(backups.get("maximum_count"), BACKUP_RETENTION, 1, 500)
    backups["maximum_age_days"] = _clamp_int(backups.get("maximum_age_days"), BACKUP_MAX_AGE_DAYS, 1, 3650)
    for key in (
        "before_task_update",
        "before_task_delete",
        "before_import",
        "before_migration",
        "before_restore",
        "before_bulk_operation",
    ):
        backups[key] = bool(backups.get(key, True))

    integrity = normalized.setdefault("data_integrity", {})
    integrity["check_on_start"] = bool(integrity.get("check_on_start", True))
    integrity["quarantine_invalid_records"] = bool(integrity.get("quarantine_invalid_records", True))
    integrity["audit_retention"] = _clamp_int(integrity.get("audit_retention"), AUDIT_RETENTION_DEFAULT, 100, 10000)
    integrity["quarantine_retention"] = _clamp_int(
        integrity.get("quarantine_retention"), QUARANTINE_RETENTION_DEFAULT, 20, 5000
    )

    dashboard = normalized.setdefault("dashboard", {})
    if dashboard.get("view_mode") not in DASHBOARD_VIEW_MODES:
        dashboard["view_mode"] = "cards"
    if dashboard.get("density") not in {"comfortable", "compact"}:
        dashboard["density"] = "comfortable"
    if dashboard.get("default_due_filter") not in {"all", "overdue", "today", "week", "next14", "month", "next90", "later", "no_due"}:
        dashboard["default_due_filter"] = "all"
    dashboard["show_quick_filters"] = bool(dashboard.get("show_quick_filters", False))
    dashboard["remember_last_view"] = bool(dashboard.get("remember_last_view", True))
    widgets = [str(item) for item in dashboard.get("widgets", []) if str(item) in DASHBOARD_WIDGETS]
    dashboard["widgets"] = list(dict.fromkeys(widgets)) or ["health", "open", "next"]
    saved_filters = dashboard.get("saved_filters", [])
    clean_filters: list[dict[str, Any]] = []
    seen_filter_ids: set[str] = set()
    for item in saved_filters:
        if not isinstance(item, dict) or not item.get("id") or not item.get("name"):
            continue
        filter_id = str(item["id"])
        if filter_id in seen_filter_ids:
            continue
        seen_filter_ids.add(filter_id)
        clean = copy.deepcopy(item)
        clean["id"] = filter_id
        clean["name"] = str(clean["name"])
        clean["pinned"] = bool(clean.get("pinned", False))
        clean.setdefault("created_at", None)
        clean.setdefault("updated_at", clean.get("created_at"))
        if not isinstance(clean.get("values"), dict):
            clean["values"] = {}
        clean_filters.append(clean)
    dashboard["saved_filters"] = clean_filters[:50]

    workflow = normalized.setdefault("workflow", {})
    if workflow.get("default_state") not in {"planned", "in_progress", "blocked"}:
        workflow["default_state"] = "planned"
    workflow["show_checklists"] = bool(workflow.get("show_checklists", True))
    workflow["reset_checklist_on_completion"] = bool(workflow.get("reset_checklist_on_completion", True))
    requirements = workflow.setdefault("default_completion_requirements", {})
    for key in ("note", "material", "cost", "performed_by", "checklist"):
        requirements[key] = bool(requirements.get(key, False))

    native = normalized.setdefault("native_platforms", {})
    native["todo_enabled"] = bool(native.get("todo_enabled", True))
    native["todo_include_disabled"] = bool(native.get("todo_include_disabled", False))
    native["calendar_enabled"] = bool(native.get("calendar_enabled", True))
    native["calendar_include_snoozed"] = bool(native.get("calendar_include_snoozed", False))
    native["calendar_event_duration_minutes"] = _clamp_int(native.get("calendar_event_duration_minutes"), 60, 15, 1440)

    onboarding = normalized.setdefault("onboarding", {})
    onboarding["completed"] = bool(onboarding.get("completed", False))
    onboarding["selected_packs"] = [str(item) for item in onboarding.get("selected_packs", []) if item]

    return normalized
