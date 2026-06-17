from __future__ import annotations

import copy
from datetime import UTC, datetime, timedelta
from typing import Any, Callable


def _parse_datetime(value: Any) -> datetime | None:
    if not value:
        return None
    try:
        parsed = datetime.fromisoformat(str(value).replace("Z", "+00:00"))
    except (TypeError, ValueError):
        return None
    if parsed.tzinfo is None:
        parsed = parsed.replace(tzinfo=UTC)
    return parsed.astimezone(UTC)


def rotate_backups(
    backups: list[dict[str, Any]],
    *,
    maximum_count: int,
    maximum_age_days: int,
    now: datetime | None = None,
) -> list[dict[str, Any]]:
    """Rotate unpinned backups while always retaining pinned snapshots."""
    reference = now or datetime.now(UTC)
    cutoff = reference - timedelta(days=max(1, maximum_age_days))
    pinned: list[dict[str, Any]] = []
    retained: list[dict[str, Any]] = []
    ordered = sorted(
        (copy.deepcopy(item) for item in backups if isinstance(item, dict)),
        key=lambda item: item.get("created_at") or "",
        reverse=True,
    )
    for backup in ordered:
        if backup.get("pinned"):
            pinned.append(backup)
            continue
        created = _parse_datetime(backup.get("created_at"))
        if created is not None and created < cutoff:
            continue
        retained.append(backup)
    return sorted(
        pinned + retained[: max(1, maximum_count)],
        key=lambda item: item.get("created_at") or "",
        reverse=True,
    )


def diff_task_records(
    current_tasks: list[dict[str, Any]],
    backup_tasks: list[dict[str, Any]],
    *,
    summarize: Callable[[dict[str, Any]], dict[str, Any]],
    ignored_fields: set[str] | None = None,
) -> dict[str, Any]:
    """Return task changes from the perspective of restoring a backup."""
    ignored = ignored_fields or set()
    current = {str(item.get("id")): item for item in current_tasks if isinstance(item, dict)}
    previous = {str(item.get("id")): item for item in backup_tasks if isinstance(item, dict)}
    added = [summarize(previous[item]) for item in sorted(previous.keys() - current.keys())]
    removed = [summarize(current[item]) for item in sorted(current.keys() - previous.keys())]
    changed: list[dict[str, Any]] = []
    for task_id in sorted(current.keys() & previous.keys()):
        before = previous[task_id]
        after = current[task_id]
        fields = [
            {"field": field, "before": before.get(field), "after": after.get(field)}
            for field in sorted((set(before) | set(after)) - ignored)
            if before.get(field) != after.get(field)
        ]
        if fields:
            changed.append(
                {
                    "id": task_id,
                    "name": after.get("name") or before.get("name"),
                    "fields": fields,
                }
            )
    return {
        "added": added,
        "removed": removed,
        "changed": changed,
        "added_count": len(added),
        "removed_count": len(removed),
        "changed_count": len(changed),
    }


def restore_task_records(
    current_tasks: list[dict[str, Any]],
    backup_tasks: list[dict[str, Any]],
    *,
    task_ids: list[str] | None = None,
) -> tuple[list[dict[str, Any]], int]:
    """Restore all tasks or replace only selected task IDs from a backup."""
    source = [copy.deepcopy(item) for item in backup_tasks if isinstance(item, dict)]
    if not task_ids:
        return source, len(source)
    wanted = set(task_ids)
    source_by_id = {str(item.get("id")): item for item in source}
    current_by_id = {
        str(item.get("id")): copy.deepcopy(item)
        for item in current_tasks
        if isinstance(item, dict)
    }
    restored = 0
    for task_id in wanted:
        if task_id not in source_by_id:
            continue
        current_by_id[task_id] = copy.deepcopy(source_by_id[task_id])
        restored += 1
    return list(current_by_id.values()), restored
