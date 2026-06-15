from __future__ import annotations

import copy
from datetime import UTC, datetime
from typing import Any, Callable

from .const import DATA_SCHEMA_VERSION


def _utcnow() -> str:
    return datetime.now(UTC).isoformat()


def _version(payload: dict[str, Any]) -> int:
    value = payload.get("schema_version", payload.get("version", 1))
    try:
        return max(1, int(value))
    except (TypeError, ValueError):
        return 1


def _migrate_v1_to_v2(kind: str, payload: dict[str, Any]) -> dict[str, Any]:
    migrated = copy.deepcopy(payload)
    if kind == "tasks":
        for task in migrated.get("tasks", []):
            if isinstance(task, dict) and task.get("id"):
                task.setdefault("entity_key", str(task["id"]))
                task.setdefault("notifications", {"inherit": True})
    elif kind == "backups":
        for backup in migrated.get("backups", []):
            if isinstance(backup, dict):
                backup.setdefault("pinned", False)
                backup.setdefault("name", None)
    migrated["schema_version"] = 2
    return migrated


def _migrate_v2_to_v3(kind: str, payload: dict[str, Any]) -> dict[str, Any]:
    migrated = copy.deepcopy(payload)
    if kind == "backups":
        for backup in migrated.get("backups", []):
            if not isinstance(backup, dict):
                continue
            backup.setdefault("pinned", False)
            backup.setdefault("name", None)
            backup.setdefault("automatic", True)
            backup.setdefault("settings", None)
            backup.setdefault("notification_state", None)
            backup.setdefault("quarantine", [])
            backup.setdefault("audit", [])
    elif kind == "meta":
        migrated.setdefault("created_at", _utcnow())
        migrated.setdefault("last_integrity_check", None)
        migrated.setdefault("last_migration", None)
    migrated["schema_version"] = 3
    return migrated


_MIGRATIONS: dict[int, Callable[[str, dict[str, Any]], dict[str, Any]]] = {
    1: _migrate_v1_to_v2,
    2: _migrate_v2_to_v3,
}


def migrate_document(kind: str, payload: dict[str, Any] | None) -> tuple[dict[str, Any], dict[str, Any]]:
    """Migrate one storage document additively and preserve unknown fields."""
    current = copy.deepcopy(payload or {})
    from_version = _version(current)
    version = from_version
    steps: list[dict[str, int]] = []
    while version < DATA_SCHEMA_VERSION:
        migration = _MIGRATIONS.get(version)
        if migration is None:
            raise ValueError(f"No migration available from schema version {version}")
        current = migration(kind, current)
        steps.append({"from": version, "to": version + 1})
        version += 1
    current["schema_version"] = DATA_SCHEMA_VERSION
    return current, {
        "kind": kind,
        "from": from_version,
        "to": version,
        "changed": bool(steps),
        "steps": steps,
        "completed_at": _utcnow() if steps else None,
    }
