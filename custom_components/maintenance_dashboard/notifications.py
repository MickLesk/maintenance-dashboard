from __future__ import annotations

from typing import Any

from .const import DASHBOARD_URL
from .notification_policy import task_action_ids


def service_target(notify_service: str | None, configured_service: str | None, *, test_mode: bool = False) -> str:
    """Resolve the notify target with a persistent notification fallback."""
    if test_mode:
        return "persistent_notification.create"
    return notify_service or configured_service or "persistent_notification.create"


def persistent_notification_payload(message: str) -> dict[str, Any]:
    return {"title": "Maintenance Dashboard", "message": message}


def notify_payload(message: str) -> dict[str, Any]:
    return {"message": message}


def build_digest_message(
    summary: dict[str, Any],
    category_groups: dict[str, list[dict[str, Any]]],
    *,
    include_dashboard_link: bool = True,
) -> str:
    """Build a compact category-grouped digest notification body."""
    parts = [
        "Maintenance Dashboard",
        f"Health: {summary.get('health', 100)}%",
        f"Open: {summary.get('open', summary.get('active', 0))}",
        f"Critical: {summary.get('critical', 0)}",
        f"Warnings: {summary.get('warning', 0)}",
        f"Unavailable: {summary.get('unavailable', 0)}",
    ]
    next_task = summary.get("next_task") or {}
    if next_task.get("name"):
        parts.append(f"Next: {next_task['name']}")
    for category, tasks in list(category_groups.items())[:12]:
        lines = [f"- {task.get('name')}: {task.get('status')}" for task in tasks[:8]]
        if lines:
            parts.append(f"{category.replace('_', ' ').title()}:\n" + "\n".join(lines))
    if include_dashboard_link:
        parts.append(f"Dashboard: {DASHBOARD_URL}")
    return "\n\n".join(parts)


def format_task_notification(
    task: dict[str, Any],
    *,
    status: str,
    remaining_label: str,
    include_dashboard_link: bool = True,
    escalated: bool = False,
) -> str:
    """Build a task-specific notification body."""
    prefix = "URGENT: " if escalated else ""
    parts = [
        f"{prefix}{task.get('name')} is {status}.",
        f"Priority: {task.get('priority', 3)}",
        f"Category: {task.get('category', 'general')}",
        f"Remaining: {remaining_label}",
    ]
    if include_dashboard_link:
        parts.append(f"Dashboard: {DASHBOARD_URL}")
    return "\n".join(parts)


def build_mobile_action_data(
    task_id: str,
    *,
    actionable: bool,
    snooze_days: int = 7,
    escalated: bool = False,
    dashboard_url: str = DASHBOARD_URL,
) -> dict[str, Any]:
    """Build Home Assistant Companion actionable-notification payload data."""
    data: dict[str, Any] = {"url": dashboard_url, "tag": f"maintenance-{task_id}", "group": "maintenance-dashboard"}
    if escalated:
        data.update({"priority": "high", "ttl": 0, "color": "#ff5252"})
    if actionable:
        actions = task_action_ids(task_id, snooze_days)
        data["actions"] = [
            {"action": actions["done"], "title": "Mark done"},
            {"action": actions["snooze"], "title": f"Snooze {snooze_days} days"},
            {"action": "URI", "title": "Open dashboard", "uri": dashboard_url},
        ]
    return data
