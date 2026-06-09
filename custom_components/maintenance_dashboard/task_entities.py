from __future__ import annotations

from typing import Any

TASK_SENSOR_MODES: dict[str, tuple[str, ...]] = {
    "off": (),
    "due_only": (),
    "basic": ("remaining", "progress"),
    "full": ("remaining", "progress", "due_date", "last_done", "status"),
}

TASK_BINARY_SENSOR_MODES = {"due_only", "basic", "full"}


def task_entity_base_name(task_id: str) -> str:
    """Return a stable human-readable base name for a task entity."""
    return task_id.replace("_", " ").replace("-", " ").title()


def task_unique_id(domain: str, task_id: str, metric: str) -> str:
    """Return a stable unique ID for generated task entities."""
    return f"{domain}_{task_id}_{metric}"


def task_metric_icon(metric: str) -> str:
    return {
        "remaining": "mdi:timer-outline",
        "progress": "mdi:progress-clock",
        "due_date": "mdi:calendar-clock",
        "last_done": "mdi:calendar-check",
        "status": "mdi:list-status",
        "due": "mdi:calendar-alert",
    }.get(metric, "mdi:clipboard-list-outline")


def task_entity_summary(task: dict[str, Any] | None) -> dict[str, Any]:
    if not task:
        return {"available": False}
    return {
        "task_id": task.get("id"),
        "task_name": task.get("name"),
        "enabled": task.get("enabled", True),
        "deleted": task.get("deleted", False),
    }
