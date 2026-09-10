from __future__ import annotations

from collections import defaultdict
from datetime import datetime, time, timedelta
from typing import Any

NOTIFIABLE_STATUSES = {"warning", "critical", "overdue", "unavailable"}


def parse_clock(value: str | None, fallback: str) -> time:
    """Parse a HH:MM value without raising on invalid user data."""
    raw = str(value or fallback)[:5]
    try:
        hour, minute = raw.split(":", 1)
        return time(hour=max(0, min(23, int(hour))), minute=max(0, min(59, int(minute))))
    except (TypeError, ValueError):
        fallback_hour, fallback_minute = fallback.split(":", 1)
        return time(hour=int(fallback_hour), minute=int(fallback_minute))


def is_quiet_time(now: datetime, settings: dict[str, Any]) -> bool:
    """Return whether local time is inside the configured quiet-hour window."""
    if not settings.get("quiet_hours_enabled", False):
        return False
    start = parse_clock(settings.get("quiet_from"), "22:00")
    end = parse_clock(settings.get("quiet_to"), "07:00")
    current = now.timetz().replace(tzinfo=None)
    if start == end:
        return True
    if start < end:
        return start <= current < end
    return current >= start or current < end


def normalize_task_notification_settings(raw: dict[str, Any] | None) -> dict[str, Any]:
    """Normalize per-task notification overrides."""
    source = raw or {}
    def _bounded_int(value: Any, default: int) -> int:
        try:
            parsed = int(value)
        except (TypeError, ValueError):
            parsed = default
        return max(0, min(365, parsed))

    repeat_days = _bounded_int(source.get("repeat_days", 3), 3)
    escalation_days = _bounded_int(source.get("escalation_after_days", 3), 3)
    return {
        "enabled": bool(source.get("enabled", True)),
        "inherit": bool(source.get("inherit", True)),
        "warning": bool(source.get("warning", True)),
        "critical": bool(source.get("critical", True)),
        "overdue": bool(source.get("overdue", True)),
        "unavailable": bool(source.get("unavailable", False)),
        "once_per_status": bool(source.get("once_per_status", True)),
        "repeat_days": repeat_days,
        "escalation_enabled": bool(source.get("escalation_enabled", True)),
        "escalation_after_days": escalation_days,
        "actionable": bool(source.get("actionable", True)),
        "notify_service": str(source.get("notify_service") or "").strip(),
    }


def effective_task_notification_settings(global_settings: dict[str, Any], task: dict[str, Any]) -> dict[str, Any]:
    """Combine global defaults with optional per-task overrides."""
    task_settings = normalize_task_notification_settings(task.get("notifications"))
    base = {
        "enabled": bool(global_settings.get("enabled", False)),
        "warning": bool(global_settings.get("warning", True)),
        "critical": bool(global_settings.get("critical", True)),
        "overdue": bool(global_settings.get("overdue", True)),
        "unavailable": bool(global_settings.get("unavailable", False)),
        "once_per_status": bool(global_settings.get("once_per_status", True)),
        "repeat_days": max(0, min(365, int(global_settings.get("repeat_days", 3) or 0))),
        "escalation_enabled": bool(global_settings.get("escalation_enabled", True)),
        "escalation_after_days": max(0, min(365, int(global_settings.get("escalation_after_days", 3) or 0))),
        "actionable": bool(global_settings.get("actionable", True)),
        "notify_service": str(global_settings.get("notify_service") or "").strip(),
    }
    if task_settings["inherit"]:
        return {**base, "task_enabled": task_settings["enabled"], "inherit": True}
    return {**task_settings, "task_enabled": task_settings["enabled"], "inherit": False}


def status_enabled(policy: dict[str, Any], status: str) -> bool:
    if status not in NOTIFIABLE_STATUSES:
        return False
    if not policy.get("enabled") or not policy.get("task_enabled", True):
        return False
    return bool(policy.get(status, False))


def escalation_level(status: str, remaining: float | None, policy: dict[str, Any]) -> str:
    """Return normal/escalated level for deduplication and presentation."""
    if status != "overdue" or not policy.get("escalation_enabled", True):
        return "normal"
    days_overdue = abs(float(remaining or 0))
    return "escalated" if days_overdue >= float(policy.get("escalation_after_days", 3) or 0) else "normal"


def should_send_task_notification(
    previous: dict[str, Any] | str | None,
    *,
    status: str,
    level: str,
    now: datetime,
    policy: dict[str, Any],
) -> bool:
    """Apply status-change, repeat and escalation deduplication rules."""
    if not status_enabled(policy, status):
        return False
    if previous is None:
        return True
    if isinstance(previous, str):
        try:
            previous_at = datetime.fromisoformat(previous.replace("Z", "+00:00"))
        except ValueError:
            return True
        previous_status = status
        previous_level = "normal"
    else:
        previous_status = str(previous.get("status") or "")
        previous_level = str(previous.get("level") or "normal")
        try:
            previous_at = datetime.fromisoformat(str(previous.get("at") or "").replace("Z", "+00:00"))
        except ValueError:
            return True
    if previous_status != status or previous_level != level:
        return True
    if policy.get("once_per_status", True):
        return False
    repeat_days = int(policy.get("repeat_days", 3) or 0)
    if repeat_days <= 0:
        return False
    if previous_at.tzinfo is None:
        previous_at = previous_at.replace(tzinfo=now.tzinfo)
    return now - previous_at >= timedelta(days=repeat_days)


def notification_record(*, status: str, level: str, now: datetime, count: int = 1) -> dict[str, Any]:
    return {"status": status, "level": level, "at": now.isoformat(), "count": max(1, int(count))}


def group_task_summaries_by_category(tasks: list[dict[str, Any]]) -> dict[str, list[dict[str, Any]]]:
    grouped: dict[str, list[dict[str, Any]]] = defaultdict(list)
    for task in tasks:
        grouped[str(task.get("category") or "general")].append(task)
    return dict(grouped)


def task_action_ids(task_id: str, snooze_days: int = 7) -> dict[str, str]:
    safe_id = str(task_id).replace("::", "_")
    return {
        "done": f"MAINTENANCE_DONE::{safe_id}",
        "snooze": f"MAINTENANCE_SNOOZE::{max(1, int(snooze_days))}::{safe_id}",
    }


def parse_notification_action(action: str | None) -> tuple[str, dict[str, Any]] | None:
    raw = str(action or "")
    parts = raw.split("::")
    if len(parts) == 2 and parts[0] == "MAINTENANCE_DONE":
        return "done", {"task_id": parts[1]}
    if len(parts) == 3 and parts[0] == "MAINTENANCE_SNOOZE":
        try:
            days = max(1, int(parts[1]))
        except ValueError:
            return None
        return "snooze", {"days": days, "task_id": parts[2]}
    return None
