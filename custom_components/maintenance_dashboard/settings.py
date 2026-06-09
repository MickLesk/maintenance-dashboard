from __future__ import annotations

import copy
from typing import Any

from .const import TASK_ENTITY_MODES


def default_settings() -> dict[str, Any]:
    """Return the default backend-owned settings document."""
    return {
        "version": 1,
        "notifications": {
            "enabled": False,
            "notify_service": "",
            "warning": True,
            "critical": True,
            "due": True,
            "daily_digest": False,
            "digest_time": "08:00",
            "quiet_hours_enabled": False,
            "quiet_from": "22:00",
            "quiet_to": "07:00",
            "include_dashboard_link": True,
            "include_snoozed": False,
        },
        "task_entities": {
            "mode": "off",
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


def normalize_settings(settings: dict[str, Any] | None) -> dict[str, Any]:
    """Normalize user settings without destructively dropping unknown fields."""
    normalized = deep_merge(default_settings(), settings or {})

    task_entities = normalized.setdefault("task_entities", {})
    if task_entities.get("mode") not in TASK_ENTITY_MODES:
        task_entities["mode"] = "off"

    notifications = normalized.setdefault("notifications", {})
    notifications["enabled"] = bool(notifications.get("enabled", False))
    notifications["notify_service"] = str(notifications.get("notify_service") or "").strip()
    notifications["warning"] = bool(notifications.get("warning", True))
    notifications["critical"] = bool(notifications.get("critical", True))
    notifications["due"] = bool(notifications.get("due", True))
    notifications["daily_digest"] = bool(notifications.get("daily_digest", False))
    notifications["digest_time"] = str(notifications.get("digest_time") or "08:00")[:5]
    notifications["quiet_hours_enabled"] = bool(notifications.get("quiet_hours_enabled", False))
    notifications["quiet_from"] = str(notifications.get("quiet_from") or "22:00")[:5]
    notifications["quiet_to"] = str(notifications.get("quiet_to") or "07:00")[:5]
    notifications["include_dashboard_link"] = bool(notifications.get("include_dashboard_link", True))
    notifications["include_snoozed"] = bool(notifications.get("include_snoozed", False))

    return normalized
