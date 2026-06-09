from __future__ import annotations

from typing import Any

from .const import DASHBOARD_URL


def service_target(notify_service: str | None, configured_service: str | None) -> str:
    """Resolve the notify target with a persistent notification fallback."""
    return notify_service or configured_service or "persistent_notification.create"


def persistent_notification_payload(message: str) -> dict[str, Any]:
    return {
        "title": "Maintenance Dashboard",
        "message": message,
    }


def notify_payload(message: str) -> dict[str, Any]:
    return {
        "message": message,
    }


def build_digest_message(
    summary: dict[str, Any],
    task_lines: list[str],
    *,
    include_dashboard_link: bool = True,
) -> str:
    """Build a compact digest notification body."""
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

    if task_lines:
        parts.append("Tasks:\n" + "\n".join(task_lines[:12]))

    if include_dashboard_link:
        parts.append(f"Dashboard: {DASHBOARD_URL}")

    return "\n".join(parts)


def format_task_notification(
    task: dict[str, Any],
    *,
    status: str,
    remaining_label: str,
    include_dashboard_link: bool = True,
) -> str:
    """Build a task-specific notification body."""
    parts = [
        f"{task.get('name')} is {status}.",
        f"Priority: {task.get('priority', 3)}",
        f"Category: {task.get('category', 'general')}",
        f"Remaining: {remaining_label}",
    ]
    if include_dashboard_link:
        parts.append(f"Dashboard: {DASHBOARD_URL}")
    return "\n".join(parts)
