from __future__ import annotations

from collections.abc import Callable
from typing import Any

from .const import DASHBOARD_URL
from .notification_policy import task_action_ids

Translator = Callable[..., str]


def service_target(notify_service: str | None, configured_service: str | None, *, test_mode: bool = False) -> str:
    """Resolve the notify target with a persistent notification fallback."""
    if test_mode:
        return "persistent_notification.create"
    return notify_service or configured_service or "persistent_notification.create"


def persistent_notification_payload(message: str, title: str) -> dict[str, Any]:
    return {"title": title, "message": message}


def notify_payload(message: str) -> dict[str, Any]:
    return {"message": message}


def build_digest_message(
    summary: dict[str, Any],
    category_groups: dict[str, list[dict[str, Any]]],
    *,
    t: Translator,
    include_dashboard_link: bool = True,
) -> str:
    """Build a compact category-grouped digest notification body."""
    parts = [
        t("brandName"),
        f"{t('health')}: {summary.get('health', 100)}%",
        f"{t('open')}: {summary.get('open', summary.get('active', 0))}",
        f"{t('critical')}: {summary.get('critical', 0)}",
        f"{t('warning')}: {summary.get('warning', 0)}",
        f"{t('unavailable')}: {summary.get('unavailable', 0)}",
    ]
    next_task = summary.get("next_task") or {}
    if next_task.get("name"):
        parts.append(f"{t('notifyDigestNext')}: {next_task['name']}")
    for category, tasks in list(category_groups.items())[:12]:
        lines = [f"- {task.get('name')}: {t('notifyStatus_' + str(task.get('status') or 'ok'))}" for task in tasks[:8]]
        if lines:
            parts.append(f"{t(category)}:\n" + "\n".join(lines))
    if include_dashboard_link:
        parts.append(f"{t('notifyFieldDashboard')}: {DASHBOARD_URL}")
    return "\n\n".join(parts)


def format_task_notification(
    task: dict[str, Any],
    *,
    status: str,
    remaining_label: str,
    t: Translator,
    include_dashboard_link: bool = True,
    escalated: bool = False,
) -> str:
    """Build a task-specific notification body."""
    priority = min(5, max(1, int(task.get("priority") or 3)))
    parts = [
        t(
            "notifyTaskBodyUrgent" if escalated else "notifyTaskBody",
            name=task.get("name"),
            status=t(f"notifyStatus_{status}"),
        ),
        f"{t('notifyFieldPriority')}: {t(f'priority{priority}')}",
        f"{t('notifyFieldCategory')}: {t(str(task.get('category') or 'general'))}",
        f"{t('notifyFieldRemaining')}: {remaining_label}",
    ]
    if include_dashboard_link:
        parts.append(f"{t('notifyFieldDashboard')}: {DASHBOARD_URL}")
    return "\n".join(parts)


def build_mobile_action_data(
    task_id: str,
    *,
    actionable: bool,
    t: Translator,
    snooze_days: int = 7,
    escalated: bool = False,
    dashboard_url: str = DASHBOARD_URL,
) -> dict[str, Any]:
    """Build Home Assistant Companion actionable-notification payload data."""
    task_url = f"{dashboard_url}?task={task_id}"
    data: dict[str, Any] = {
        "url": task_url,
        "clickAction": task_url,
        "tag": f"maintenance-{task_id}",
        "group": "maintenance-dashboard",
        "channel": t("notifyChannel"),
    }
    if escalated:
        data.update({
            "priority": "high",
            "ttl": 0,
            "color": "#ff5252",
            "push": {"interruption-level": "time-sensitive"},
        })
    if actionable:
        actions = task_action_ids(task_id, snooze_days)
        data["actions"] = [
            {"action": actions["done"], "title": t("notifyActionDone")},
            {"action": actions["snooze"], "title": t("notifyActionSnooze", days=snooze_days)},
            {"action": "URI", "title": t("notifyActionOpen"), "uri": task_url},
        ]
    return data
