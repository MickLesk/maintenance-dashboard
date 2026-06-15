from __future__ import annotations

import copy
from typing import Any

from .const import TASK_ENTITY_MODES


def default_settings() -> dict[str, Any]:
    """Return the default backend-owned settings document."""
    return {
        "version": 2,
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
    normalized["version"] = 2

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

    onboarding = normalized.setdefault("onboarding", {})
    onboarding["completed"] = bool(onboarding.get("completed", False))
    onboarding["selected_packs"] = [str(item) for item in onboarding.get("selected_packs", []) if item]

    return normalized
