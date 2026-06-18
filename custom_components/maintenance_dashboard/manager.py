from __future__ import annotations

import asyncio
import copy
import json
import logging
import math
import uuid
from collections.abc import Callable
from dataclasses import dataclass
from datetime import UTC, datetime, timedelta
from typing import Any

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.storage import Store
from homeassistant.util import dt as dt_util

from .const import (
    BACKUP_MAX_AGE_DAYS,
    BACKUP_RETENTION,
    BACKUP_SECTIONS,
    DATA_SCHEMA_VERSION,
    CALENDAR_REPEAT_MODES,
    CATEGORIES,
    DEFAULT_CRITICAL_THRESHOLD,
    DEFAULT_WARNING_THRESHOLD,
    DOMAIN,
    EVENT_UPDATED,
    EVENT_TASK_STATUS_CHANGED,
    EVENT_TASK_WARNING,
    EVENT_TASK_CRITICAL,
    EVENT_TASK_OVERDUE,
    EVENT_TASK_UNAVAILABLE,
    EVENT_TASK_COMPLETED,
    EVENT_TASK_SNOOZED,
    HISTORY_RETENTION_DEFAULT,
    INTERVAL_UNITS,
    OPEN_WORKFLOW_STATES,
    RECURRENCE_MODES,
    SCHEDULE_MODES,
    SEASONS,
    STORE_BACKUPS_KEY,
    STORE_AUDIT_KEY,
    STORE_ATTACHMENTS_KEY,
    STORE_HISTORY_KEY,
    STORE_META_KEY,
    STORE_NOTIFICATION_STATE_KEY,
    STORE_QUARANTINE_KEY,
    STORE_SETTINGS_KEY,
    STORE_TASKS_KEY,
    STORE_VERSION,
    DASHBOARD_URL,
    TASK_TYPES,
    VERSION,
    WORKFLOW_STATES,
)
from .templates import TEMPLATES, TEMPLATE_PACKS
from .data_integrity import inspect_integrity, repair_record_ids
from .storage_migrations import migrate_document
from .recovery import diff_task_records, restore_task_records, rotate_backups
from .settings import default_settings, deep_merge, normalize_settings
from .scheduling import evaluate_schedule
from .workflow_engine import (
    initial_workflow_state,
    next_execution,
    normalize_execution,
    normalize_execution_stats,
    normalize_recurrence_mode,
    normalize_workflow_state,
)
from .notifications import (
    build_digest_message,
    build_mobile_action_data,
    format_task_notification,
    notify_payload,
    persistent_notification_payload,
    service_target,
)
from .user_content import (
    MAX_ATTACHMENTS_PER_COMPLETION,
    apply_template_import,
    build_statistics,
    list_statistics_years,
    merge_templates,
    normalize_attachment,
    normalize_custom_template,
    preview_template_import,
    template_from_task,
)
from .notification_policy import (
    NOTIFIABLE_STATUSES,
    effective_task_notification_settings,
    escalation_level,
    group_task_summaries_by_category,
    is_quiet_time,
    notification_record,
    normalize_task_notification_settings,
    should_send_task_notification,
)

_LOGGER = logging.getLogger(__name__)

Listener = Callable[[], None]



def _today_key() -> str:
    return datetime.now(UTC).date().isoformat()


def _utcnow() -> str:
    return datetime.now(UTC).isoformat()


def _parse_dt(value: str | None) -> datetime | None:
    if not value:
        return None
    try:
        parsed = datetime.fromisoformat(value.replace("Z", "+00:00"))
        if parsed.tzinfo is None:
            return parsed.replace(tzinfo=UTC)
        return parsed.astimezone(UTC)
    except (TypeError, ValueError):
        return None


def _slug(value: str) -> str:
    clean = "".join(ch.lower() if ch.isalnum() else "_" for ch in value).strip("_")
    while "__" in clean:
        clean = clean.replace("__", "_")
    return clean or f"task_{uuid.uuid4().hex[:8]}"


def _safe_float(value: Any) -> float | None:
    try:
        if value in (None, "", "unknown", "unavailable"):
            return None
        return float(str(value).replace(",", "."))
    except (TypeError, ValueError):
        return None




def _deepcopy_json(data: Any) -> Any:
    return copy.deepcopy(data)


@dataclass(slots=True)
class RuntimeResult:
    task_id: str
    status: str
    current: float | None
    limit: float | None
    progress: float
    remaining: float | None
    due_at: str | None
    last_done: str | None
    unavailable_reason: str | None = None
    period_start: str | None = None
    schedule_label: str | None = None

    def as_dict(self) -> dict[str, Any]:
        return {
            "task_id": self.task_id,
            "status": self.status,
            "current": self.current,
            "limit": self.limit,
            "progress": self.progress,
            "remaining": self.remaining,
            "due_at": self.due_at,
            "last_done": self.last_done,
            "unavailable_reason": self.unavailable_reason,
            "period_start": self.period_start,
            "schedule_label": self.schedule_label,
        }


class MaintenanceManager:
    """Backend-owned storage and mutation layer for Maintenance Dashboard."""

    def __init__(self, hass: HomeAssistant, entry: ConfigEntry) -> None:
        self.hass = hass
        self.entry = entry
        self._tasks_store: Store[dict[str, Any]] = Store(hass, STORE_VERSION, STORE_TASKS_KEY)
        self._history_store: Store[dict[str, Any]] = Store(hass, STORE_VERSION, STORE_HISTORY_KEY)
        self._backups_store: Store[dict[str, Any]] = Store(hass, STORE_VERSION, STORE_BACKUPS_KEY)
        self._settings_store: Store[dict[str, Any]] = Store(hass, STORE_VERSION, STORE_SETTINGS_KEY)
        self._notification_state_store: Store[dict[str, Any]] = Store(hass, STORE_VERSION, STORE_NOTIFICATION_STATE_KEY)
        self._meta_store: Store[dict[str, Any]] = Store(hass, STORE_VERSION, STORE_META_KEY)
        self._quarantine_store: Store[dict[str, Any]] = Store(hass, STORE_VERSION, STORE_QUARANTINE_KEY)
        self._audit_store: Store[dict[str, Any]] = Store(hass, STORE_VERSION, STORE_AUDIT_KEY)
        self._attachments_store: Store[dict[str, Any]] = Store(hass, STORE_VERSION, STORE_ATTACHMENTS_KEY)
        self._tasks: list[dict[str, Any]] = []
        self._history: list[dict[str, Any]] = []
        self._backups: list[dict[str, Any]] = []
        self._quarantine: list[dict[str, Any]] = []
        self._audit: list[dict[str, Any]] = []
        self._attachments: dict[str, Any] = {}
        self._settings: dict[str, Any] = default_settings()
        self._notification_state: dict[str, Any] = {"version": 2, "last_sent": {}, "task_status": {}, "history": []}
        self._meta: dict[str, Any] = {
            "schema_version": DATA_SCHEMA_VERSION,
            "last_migration": None,
            "last_integrity_check": None,
            "last_automatic_backup": None,
        }
        self._integrity: dict[str, Any] = {
            "healthy": True,
            "errors": 0,
            "warnings": 0,
            "repairable": 0,
            "quarantined": 0,
            "checked_at": None,
            "issues": [],
        }
        self._listeners: list[Listener] = []
        self._lock = asyncio.Lock()

    async def async_load(self) -> None:
        """Load, migrate and validate all persisted integration documents."""
        raw_documents = {
            "tasks": await self._tasks_store.async_load() or {},
            "history": await self._history_store.async_load() or {},
            "backups": await self._backups_store.async_load() or {},
            "settings": await self._settings_store.async_load() or {},
            "notification_state": await self._notification_state_store.async_load() or {},
            "meta": await self._meta_store.async_load() or {},
            "quarantine": await self._quarantine_store.async_load() or {},
            "audit": await self._audit_store.async_load() or {},
            "attachments": await self._attachments_store.async_load() or {},
        }

        migrated: dict[str, dict[str, Any]] = {}
        migration_results: list[dict[str, Any]] = []
        try:
            for kind, document in raw_documents.items():
                migrated[kind], result = migrate_document(kind, document)
                migration_results.append(result)
        except Exception as err:
            self._meta = {
                **(raw_documents.get("meta") or {}),
                "schema_version": DATA_SCHEMA_VERSION,
                "migration_error": str(err),
                "migration_failed_at": _utcnow(),
            }
            await self._meta_store.async_save(self._meta)
            raise

        any_migration = any(result.get("changed") for result in migration_results)
        settings_payload = migrated["settings"]
        self._settings = normalize_settings(deep_merge(default_settings(), settings_payload))
        self._quarantine = [item for item in migrated["quarantine"].get("quarantine", []) if isinstance(item, dict)]
        self._audit = [item for item in migrated["audit"].get("audit", []) if isinstance(item, dict)]

        quarantine_before_load = len(self._quarantine)
        raw_tasks = migrated["tasks"].get("tasks", [])
        seen_ids: set[str] = set()
        normalized_tasks: list[dict[str, Any]] = []
        for index, item in enumerate(raw_tasks if isinstance(raw_tasks, list) else []):
            if not isinstance(item, dict):
                self._quarantine_record("task_not_object", item, source="load", index=index)
                continue
            raw_id = str(item.get("id") or "").strip()
            if raw_id and raw_id in seen_ids:
                self._quarantine_record("duplicate_task_id", item, source="load", index=index)
                continue
            try:
                task = self._normalize_task(item)
                self._validate_task(task)
            except Exception as err:
                self._quarantine_record("invalid_task", item, source="load", index=index, error=str(err))
                continue
            seen_ids.add(task["id"])
            normalized_tasks.append(task)
        self._tasks = normalized_tasks

        raw_history = migrated["history"].get("history", [])
        self._history = []
        for index, item in enumerate(raw_history if isinstance(raw_history, list) else []):
            if isinstance(item, dict):
                self._history.append(item)
            else:
                self._quarantine_record("history_not_object", item, source="load", index=index)

        raw_backups = migrated["backups"].get("backups", [])
        self._backups = []
        seen_backup_ids: set[str] = set()
        for index, item in enumerate(raw_backups if isinstance(raw_backups, list) else []):
            if not isinstance(item, dict):
                self._quarantine_record("backup_not_object", item, source="load", index=index, record_type="backup")
                continue
            backup_id = str(item.get("id") or "").strip()
            if backup_id and backup_id in seen_backup_ids:
                self._quarantine_record("duplicate_backup_id", item, source="load", index=index, record_type="backup")
                continue
            if not isinstance(item.get("tasks", []), list) or not isinstance(item.get("history", []), list):
                self._quarantine_record("invalid_backup_snapshot", item, source="load", index=index, record_type="backup")
                continue
            backup = self._normalize_backup(item)
            seen_backup_ids.add(backup["id"])
            self._backups.append(backup)
        self._notification_state = deep_merge(
            {"version": 2, "last_sent": {}, "task_status": {}, "history": []},
            migrated["notification_state"],
        )
        self._notification_state["version"] = 2
        if not isinstance(self._notification_state.get("last_sent"), dict):
            self._notification_state["last_sent"] = {}
        if not isinstance(self._notification_state.get("task_status"), dict):
            self._notification_state["task_status"] = {}
        if not isinstance(self._notification_state.get("history"), list):
            self._notification_state["history"] = []
        retention = int(self._settings.get("notifications", {}).get("history_retention", 200))
        self._notification_state["history"] = self._notification_state["history"][: max(20, retention)]
        if not self._notification_state.get("task_status"):
            self._notification_state["task_status"] = {
                task["id"]: self.runtime_for_task(task).status for task in self._tasks if not task.get("deleted")
            }

        self._meta = {
            **migrated["meta"],
            "schema_version": DATA_SCHEMA_VERSION,
        }
        attachments_payload = migrated.get("attachments") or {}
        self._attachments = attachments_payload.get("attachments", {}) if isinstance(attachments_payload, dict) else {}
        if not isinstance(self._attachments, dict):
            self._attachments = {}
        quarantined_on_load = len(self._quarantine) > quarantine_before_load
        if any_migration:
            if self._settings.get("backups", {}).get("before_migration", True):
                migration_backup = self._build_backup(
                    "before_migration",
                    name=f"Pre-migration schema {min(r['from'] for r in migration_results)}",
                    pinned=True,
                    automatic=True,
                    raw_documents=raw_documents,
                )
                self._backups.insert(0, migration_backup)
            self._meta["last_migration"] = {
                "completed_at": _utcnow(),
                "documents": migration_results,
            }
            try:
                await self._save_everything()
            except Exception as err:
                _LOGGER.exception("Persisting migrated Maintenance Dashboard data failed; restoring previous stores")
                await self._restore_raw_documents(raw_documents)
                self._meta = {
                    **(raw_documents.get("meta") or {}),
                    "schema_version": DATA_SCHEMA_VERSION,
                    "migration_error": str(err),
                    "migration_failed_at": _utcnow(),
                }
                await self._meta_store.async_save(self._meta)
                raise
        elif quarantined_on_load:
            await self._save_everything()

        backup_ids_before_rotation = [item.get("id") for item in self._backups]
        self._rotate_backups()
        if backup_ids_before_rotation != [item.get("id") for item in self._backups]:
            await self._backups_store.async_save(
                {"schema_version": DATA_SCHEMA_VERSION, "backups": self._backups}
            )
        await self.async_check_integrity(sync_repairs=False)
        if self._settings.get("data_integrity", {}).get("check_on_start", True):
            try:
                from .repair_issues import async_sync_repair_issues

                await async_sync_repair_issues(self.hass, self)
            except Exception:  # noqa: BLE001
                _LOGGER.exception("Unable to synchronize Maintenance Dashboard repair issues")

    @callback
    def async_add_listener(self, listener: Listener) -> Callable[[], None]:
        self._listeners.append(listener)

        def remove_listener() -> None:
            if listener in self._listeners:
                self._listeners.remove(listener)

        return remove_listener

    @callback
    def _notify_listeners(self) -> None:
        for listener in list(self._listeners):
            listener()

    async def async_broadcast_update(self, *, reason: str) -> None:
        await self.async_process_status_transitions(reason=reason)
        self._notify_listeners()
        self.hass.bus.async_fire(EVENT_UPDATED, {"reason": reason})

    @property
    def tasks(self) -> list[dict[str, Any]]:
        return _deepcopy_json(self._tasks)

    @property
    def history(self) -> list[dict[str, Any]]:
        return _deepcopy_json(self._history)

    @property
    def backups(self) -> list[dict[str, Any]]:
        return _deepcopy_json(self._backups)

    @property
    def quarantine(self) -> list[dict[str, Any]]:
        return _deepcopy_json(self._quarantine)

    @property
    def audit(self) -> list[dict[str, Any]]:
        return _deepcopy_json(self._audit)

    @property
    def settings(self) -> dict[str, Any]:
        return _deepcopy_json(self._settings)

    async def async_get_settings(self) -> dict[str, Any]:
        return self.settings

    async def async_update_settings(self, patch: dict[str, Any]) -> dict[str, Any]:
        if not isinstance(patch, dict):
            raise ValueError("Settings patch must be an object")
        async with self._lock:
            previous = _deepcopy_json(self._settings)
            self._settings = normalize_settings(deep_merge(self._settings, patch))
            self._append_audit("settings_updated", source="panel", previous=previous, current=self._settings)
            await self._save_everything()
        await self.async_broadcast_update(reason="update_settings")
        return self.settings

    def last_task_notification(self, task_id: str) -> dict[str, Any] | None:
        value = self._notification_state.get("last_sent", {}).get(f"task:{task_id}")
        return _deepcopy_json(value) if isinstance(value, dict) else None

    def notification_history(self) -> list[dict[str, Any]]:
        return _deepcopy_json(self._notification_state.get("history", []))

    async def async_clear_notification_history(self) -> dict[str, Any]:
        async with self._lock:
            removed = len(self._notification_state.get("history", []))
            self._notification_state["history"] = []
            self._append_audit(
                "notification_history_cleared",
                source="panel",
                details={"removed": removed},
            )
            await self._save_everything()
        await self.async_broadcast_update(reason="clear_notification_history")
        return {"ok": True, "removed": removed}

    async def async_get_state(self, *, include_deleted: bool = True) -> dict[str, Any]:
        tasks = self.tasks if include_deleted else [task for task in self.tasks if not task.get("deleted")]
        runtime = {task["id"]: self.runtime_for_task(task).as_dict() for task in tasks}
        custom_templates = self._settings.get("user_templates", {}).get("custom", [])
        merged_templates = merge_templates(TEMPLATES, custom_templates)
        return {
            "version": VERSION,
            "schema_version": DATA_SCHEMA_VERSION,
            "tasks": tasks,
            "history": self.history,
            "runtime": runtime,
            "diagnostics": self.get_diagnostics(),
            "integrity": _deepcopy_json(self._integrity),
            "backups": [
                {k: b.get(k) for k in (
                    "id", "created_at", "reason", "name", "pinned", "automatic",
                    "task_count", "history_count", "size_bytes",
                )}
                for b in self._backups
            ],
            "quarantine": self.quarantine,
            "audit": self.audit[:200],
            "meta": _deepcopy_json(self._meta),
            "templates": merged_templates,
            "template_packs": TEMPLATE_PACKS,
            "template_favorites": list(self._settings.get("user_templates", {}).get("favorites", [])),
            "statistics": build_statistics(self.history, tasks),
            "statistics_years": list_statistics_years(self.history),
            "summary": self.get_summary(),
            "settings": self.settings,
            "notification_state": _deepcopy_json(self._notification_state),
        }

    def get_summary(self) -> dict[str, Any]:
        enabled = [task for task in self._tasks if not task.get("deleted") and task.get("enabled", True)]
        evaluated = [(task, self.runtime_for_task(task)) for task in enabled]
        open_items = [(task, runtime) for task, runtime in evaluated if runtime.status != "completed"]
        runtime = [item[1] for item in open_items]
        critical = sum(1 for item in runtime if item.status in {"critical", "overdue"})
        warning = sum(1 for item in runtime if item.status == "warning")
        unavailable = sum(1 for item in runtime if item.status == "unavailable")
        snoozed = sum(1 for item in runtime if item.status == "snoozed")
        ok = sum(1 for item in runtime if item.status == "ok")
        completed_one_time = sum(1 for _, item in evaluated if item.status == "completed")
        persistent = sum(1 for task, _ in open_items if task.get("recurrence_mode") == "persistent")
        ready = sum(1 for task, _ in open_items if task.get("workflow_state") == "ready")
        in_progress = sum(1 for task, _ in open_items if task.get("workflow_state") == "in_progress")
        blocked = sum(1 for task, _ in open_items if task.get("workflow_state") == "blocked")
        completed_year = sum(
            1
            for event in self._history
            if event.get("type") == "completed"
            and (_parse_dt(event.get("created_at")) or datetime(1970, 1, 1, tzinfo=UTC)).year == datetime.now(UTC).year
        )

        penalty = 0.0
        max_penalty = max(1.0, sum(float(task.get("priority", 3)) * 6.0 for task, _ in open_items))
        by_id = {task["id"]: task for task, _ in open_items}
        for item in runtime:
            task = by_id.get(item.task_id) or {}
            priority = float(task.get("priority", 3))
            if item.status == "overdue":
                penalty += 10 + priority * 7
            elif item.status == "critical":
                penalty += 8 + priority * 5
            elif item.status == "warning":
                penalty += 4 + priority * 3
            elif item.status == "unavailable":
                penalty += 3 + priority * 2
            elif item.status == "snoozed":
                penalty += 1 + priority
        health = max(0, min(100, round(100 - (penalty / max_penalty * 42))))

        def next_sort(item: RuntimeResult) -> tuple[float, float, float, float]:
            task = by_id.get(item.task_id) or {}
            status_rank = {"overdue": 0, "critical": 1, "warning": 2, "unavailable": 3, "ok": 4, "snoozed": 5}.get(item.status, 9)
            return (
                status_rank,
                -float(task.get("priority", 3)),
                item.remaining if item.remaining is not None else math.inf,
                float(task.get("position", 9999)),
            )

        next_runtime = sorted(
            (
                item
                for item in runtime
                if item.status not in {"snoozed", "deleted", "disabled", "completed", "unavailable"}
                and item.remaining is not None
            ),
            key=next_sort,
        )
        next_task = None
        if next_runtime:
            rt = next_runtime[0]
            task = self._find_task(rt.task_id)
            next_task = self.task_summary(task, rt) if task else None
        return {
            "health": health,
            "health_explanation": "weighted_by_status_priority_and_availability",
            "active": len(open_items),
            "open": len(open_items),
            "ok": ok,
            "critical": critical,
            "warning": warning,
            "snoozed": snoozed,
            "unavailable": unavailable,
            "persistent": persistent,
            "ready": ready,
            "in_progress": in_progress,
            "blocked": blocked,
            "completed_one_time": completed_one_time,
            "completed_this_year": completed_year,
            "next_task": next_task,
        }

    def get_diagnostics(self) -> list[dict[str, Any]]:
        issues: list[dict[str, Any]] = []
        seen_ids: set[str] = set()
        for task in self._tasks:
            task_id = task.get("id")
            if task_id in seen_ids:
                issues.append({"severity": "error", "task_id": task_id, "message": "duplicate_task_id"})
            seen_ids.add(task_id)

            if task.get("warning_threshold", DEFAULT_WARNING_THRESHOLD) >= task.get("critical_threshold", DEFAULT_CRITICAL_THRESHOLD):
                issues.append({"severity": "error", "task_id": task_id, "message": "invalid_thresholds"})

            if task.get("type") == "meter" and not task.get("entity_id"):
                issues.append({"severity": "error", "task_id": task_id, "message": "missing_entity"})

            if task.get("entity_id") and task.get("entity_id") not in self.hass.states.async_entity_ids():
                issues.append({"severity": "warning", "task_id": task_id, "message": "entity_not_found"})

            mode = task.get("schedule_mode", "interval")
            if mode == "one_time" and not task.get("due_date") and not task.get("completed_at"):
                issues.append({"severity": "error", "task_id": task_id, "message": "missing_due_date"})
            if mode == "fixed_date":
                if task.get("calendar_repeat") not in CALENDAR_REPEAT_MODES:
                    issues.append({"severity": "error", "task_id": task_id, "message": "invalid_calendar_repeat"})
                if not 1 <= int(task.get("fixed_day", 1)) <= 31:
                    issues.append({"severity": "error", "task_id": task_id, "message": "invalid_fixed_day"})
            if mode == "seasonal" and task.get("season") not in SEASONS:
                issues.append({"severity": "error", "task_id": task_id, "message": "invalid_season"})

        notif_service = self._settings.get("notifications", {}).get("notify_service")
        if notif_service and "." not in str(notif_service):
            issues.append({"severity": "warning", "task_id": None, "message": "invalid_notify_service"})
        if self._settings.get("task_entities", {}).get("mode") not in {"off", "due_only", "basic", "full"}:
            issues.append({"severity": "warning", "task_id": None, "message": "invalid_task_entity_mode"})
        notifications = self._settings.get("notifications", {})
        if notifications.get("repeat_days", 0) < 0:
            issues.append({"severity": "warning", "task_id": None, "message": "invalid_notification_repeat"})
        if notifications.get("quiet_hours_enabled") and notifications.get("quiet_from") == notifications.get("quiet_to"):
            issues.append({"severity": "warning", "task_id": None, "message": "quiet_hours_cover_full_day"})
        return issues

    def runtime_for_task(self, task: dict[str, Any]) -> RuntimeResult:
        task_id = task["id"]
        if task.get("deleted"):
            return RuntimeResult(task_id, "deleted", None, task.get("interval"), 0, None, None, task.get("last_done"))
        if not task.get("enabled", True):
            return RuntimeResult(task_id, "disabled", None, task.get("interval"), 0, None, None, task.get("last_done"))

        snoozed_until = _parse_dt(task.get("snoozed_until"))
        if snoozed_until and snoozed_until > datetime.now(UTC):
            base = self._runtime_without_status_override(task)
            if base.status != "completed":
                base.status = "snoozed"
            return base
        return self._runtime_without_status_override(task)

    def _runtime_without_status_override(self, task: dict[str, Any]) -> RuntimeResult:
        task_id = task["id"]
        limit = _safe_float(task.get("interval"))
        warning = float(task.get("warning_threshold", DEFAULT_WARNING_THRESHOLD))
        critical = float(task.get("critical_threshold", DEFAULT_CRITICAL_THRESHOLD))

        if task.get("type") == "meter":
            if task.get("schedule_mode") == "one_time" and task.get("completed_at"):
                completed_at = task.get("completed_at")
                return RuntimeResult(task_id, "completed", None, limit, 100, 0, completed_at, task.get("last_done"), schedule_label="one_time")
            if not limit or limit <= 0:
                return RuntimeResult(task_id, "unavailable", None, limit, 0, None, None, task.get("last_done"), "invalid_limit")
            entity_id = task.get("entity_id")
            if not entity_id:
                return RuntimeResult(task_id, "unavailable", None, limit, 0, None, None, task.get("last_done"), "missing_entity")
            state = self.hass.states.get(entity_id)
            value = _safe_float(state.state if state else None)
            if value is None:
                return RuntimeResult(task_id, "unavailable", None, limit, 0, None, None, task.get("last_done"), "entity_unavailable")
            baseline = _safe_float(task.get("baseline")) or 0
            current = max(0, value - baseline)
            progress = max(0, current / limit * 100)
            remaining = limit - current
            status = self._status(progress, remaining, warning, critical)
            return RuntimeResult(task_id, status, current, limit, progress, remaining, None, task.get("last_done"), schedule_label="meter")

        evaluation = evaluate_schedule(task)
        return RuntimeResult(
            task_id=task_id,
            status=evaluation.status,
            current=evaluation.current,
            limit=evaluation.limit,
            progress=evaluation.progress,
            remaining=evaluation.remaining,
            due_at=evaluation.due_at,
            last_done=evaluation.last_done,
            unavailable_reason=evaluation.unavailable_reason,
            period_start=evaluation.period_start,
            schedule_label=evaluation.schedule_label,
        )

    def _status(self, progress: float, remaining: float, warning: float, critical: float) -> str:
        if remaining < 0:
            return "overdue"
        if progress >= critical:
            return "critical"
        if progress >= warning:
            return "warning"
        return "ok"

    async def async_create_task(self, data: dict[str, Any]) -> dict[str, Any]:
        async with self._lock:
            await self._async_backup("before_create_task")
            task = self._normalize_task(data, create=True)
            self._validate_task(task)
            if not task.get("id"):
                task["id"] = self._unique_id(task.get("name", "task"))
            if task.get("position") is None:
                task["position"] = self._next_position()
            now = _utcnow()
            task.setdefault("created_at", now)
            task["updated_at"] = now
            if task.get("type") == "time" and task.get("schedule_mode") == "interval" and not task.get("last_done"):
                task["last_done"] = now
            self._tasks.append(task)
            self._append_history("created", task, summary="Task created")
            await self._async_save_all()
        await self.async_broadcast_update(reason="create_task")
        return task

    async def async_update_task(self, task_id: str, patch: dict[str, Any]) -> dict[str, Any]:
        async with self._lock:
            idx = self._find_task_index(task_id)
            old = _deepcopy_json(self._tasks[idx])
            if self._settings.get("backups", {}).get("before_task_update", True):
                await self._async_backup("before_update_task")
            merged = {**self._tasks[idx], **patch, "id": task_id, "updated_at": _utcnow()}
            # never reset thresholds accidentally during frontend/version changes
            if "warning_threshold" not in patch:
                merged["warning_threshold"] = old.get("warning_threshold", DEFAULT_WARNING_THRESHOLD)
            if "critical_threshold" not in patch:
                merged["critical_threshold"] = old.get("critical_threshold", DEFAULT_CRITICAL_THRESHOLD)
            self._tasks[idx] = self._normalize_task(merged)
            self._validate_task(self._tasks[idx])
            self._append_history("updated", self._tasks[idx], summary="Task updated", previous_state=old, new_state=self._tasks[idx])
            await self._async_save_all()
        await self.async_broadcast_update(reason="update_task")
        return self._tasks[idx]

    async def async_delete_task(self, task_id: str) -> None:
        async with self._lock:
            idx = self._find_task_index(task_id)
            old = _deepcopy_json(self._tasks[idx])
            if self._settings.get("backups", {}).get("before_task_delete", True):
                await self._async_backup("before_delete_task")
            self._tasks[idx]["deleted"] = True
            self._tasks[idx]["deleted_at"] = _utcnow()
            self._tasks[idx]["updated_at"] = _utcnow()
            self._append_history("deleted", self._tasks[idx], summary="Task soft deleted", previous_state=old, new_state=self._tasks[idx])
            await self._async_save_all()
        await self.async_broadcast_update(reason="delete_task")

    async def async_restore_task(self, task_id: str) -> dict[str, Any]:
        async with self._lock:
            idx = self._find_task_index(task_id)
            old = _deepcopy_json(self._tasks[idx])
            await self._async_backup("before_restore_task")
            self._tasks[idx]["deleted"] = False
            self._tasks[idx].pop("deleted_at", None)
            self._tasks[idx]["updated_at"] = _utcnow()
            self._append_history("restored", self._tasks[idx], summary="Task restored", previous_state=old, new_state=self._tasks[idx])
            await self._async_save_all()
        await self.async_broadcast_update(reason="restore_task")
        return self._tasks[idx]

    async def async_mark_done(
        self,
        task_id: str,
        done_at: str | None = None,
        note: str | None = None,
        *,
        checklist: list[dict[str, Any]] | None = None,
        material: str | None = None,
        cost: float | None = None,
        currency: str | None = None,
        performed_by: str | None = None,
        attachments: list[str] | None = None,
    ) -> dict[str, Any]:
        async with self._lock:
            idx = self._find_task_index(task_id)
            old = _deepcopy_json(self._tasks[idx])
            runtime = self.runtime_for_task(old).as_dict()
            done = _parse_dt(done_at) or datetime.now(UTC)
            task = self._tasks[idx]
            if task.get("schedule_mode") == "one_time" and task.get("completed_at"):
                raise ValueError("One-time task is already completed")
            parsed_cost: float | None = None
            if cost not in (None, ""):
                parsed_cost = float(cost)
                if not math.isfinite(parsed_cost) or parsed_cost < 0:
                    raise ValueError("Completion cost must be a finite non-negative number")
            if checklist is not None:
                task["checklist"] = self._normalize_checklist(checklist)
            completion_requirements = self._normalize_completion_requirements(task.get("completion_requirements"))
            completion_checklist = _deepcopy_json(task.get("checklist", []))
            if completion_requirements.get("note") and not str(note or "").strip():
                raise ValueError("Completion note is required")
            if completion_requirements.get("material") and not str(material or "").strip():
                raise ValueError("Completion material is required")
            if completion_requirements.get("performed_by") and not str(performed_by or "").strip():
                raise ValueError("Performed by is required")
            if completion_requirements.get("cost") and parsed_cost is None:
                raise ValueError("Completion cost is required")
            if completion_requirements.get("checklist"):
                checklist_targets = [item for item in completion_checklist if item.get("required")]
                if not checklist_targets:
                    checklist_targets = completion_checklist
                pending_items = [item["label"] for item in checklist_targets if not item.get("done")]
                if pending_items:
                    raise ValueError(f"Checklist incomplete: {', '.join(pending_items[:3])}")
            await self._async_backup("before_mark_done")
            if task.get("type") == "meter" and task.get("entity_id"):
                state = self.hass.states.get(task["entity_id"])
                value = _safe_float(state.state if state else None)
                if value is not None:
                    task["baseline"] = value
            execution_before = self._current_execution(task)
            task["last_done"] = done.isoformat()
            if task.get("schedule_mode") in {"fixed_date", "seasonal"} and runtime.get("due_at"):
                task["last_scheduled_due"] = runtime["due_at"]
            if task.get("schedule_mode") == "one_time":
                task["completed_at"] = done.isoformat()
                task["archived_at"] = done.isoformat()
                task["workflow_state"] = "completed"
                task["current_execution"] = {
                    **execution_before,
                    "state": "completed",
                    "updated_at": done.isoformat(),
                    "completed_at": done.isoformat(),
                }
            else:
                task.pop("completed_at", None)
                task.pop("archived_at", None)
                self._begin_new_cycle(task, started_at=done.isoformat())
            self._increment_execution_stat(task, "completed")
            task.pop("snoozed_until", None)
            task["updated_at"] = _utcnow()
            completion = {
                "note": (note or "").strip() or None,
                "material": (material or "").strip() or None,
                "cost": round(parsed_cost, 2) if parsed_cost is not None else None,
                "currency": (currency or "EUR").strip().upper() or "EUR",
                "performed_by": (performed_by or "").strip() or None,
                "attachments": self._completion_attachment_refs(attachments),
            }
            event = self._append_history(
                "completed",
                task,
                summary="Task marked done",
                previous_state=old,
                new_state=task,
                details={
                    "runtime_before": runtime,
                    "completion": completion,
                    "checklist_completed": completion_checklist,
                    "completion_requirements": completion_requirements,
                    "workflow_before": old.get("workflow_state"),
                    "workflow_after": task.get("workflow_state"),
                    "execution_before": execution_before,
                    "execution_after": _deepcopy_json(task.get("current_execution")),
                    **completion,
                },
            )
            await self._async_save_all()
        await self.async_broadcast_update(reason="mark_done")
        payload = self.task_summary(self._find_task(task_id)) or {"id": task_id}
        payload["event_id"] = event.get("id")
        self.hass.bus.async_fire(EVENT_TASK_COMPLETED, payload)
        return event

    async def async_reactivate_task(self, task_id: str) -> dict[str, Any]:
        async with self._lock:
            idx = self._find_task_index(task_id)
            old = _deepcopy_json(self._tasks[idx])
            if old.get("schedule_mode") != "one_time":
                raise ValueError("Only one-time tasks can be reactivated")
            await self._async_backup("before_reactivate_task")
            task = self._tasks[idx]
            task.pop("completed_at", None)
            task.pop("archived_at", None)
            task["workflow_state"] = self._default_workflow_state(task.get("recurrence_mode", "standard"))
            task["current_execution"] = next_execution(
                self._current_execution(old),
                state=task["workflow_state"],
                started_at=_utcnow(),
            )
            task["checklist"] = self._reset_checklist_items(task.get("checklist"))
            task["updated_at"] = _utcnow()
            self._append_history(
                "reactivated",
                task,
                summary="One-time task reactivated",
                previous_state=old,
                new_state=task,
                details={
                    "execution_before": old.get("current_execution"),
                    "execution_after": _deepcopy_json(task.get("current_execution")),
                },
            )
            await self._async_save_all()
        await self.async_broadcast_update(reason="reactivate_task")
        return self._tasks[idx]

    async def async_set_workflow_state(
        self,
        task_id: str,
        state: str,
        *,
        note: str | None = None,
    ) -> dict[str, Any]:
        requested = normalize_workflow_state(state, default="", allow_terminal=False)
        if requested not in OPEN_WORKFLOW_STATES:
            raise ValueError("Unsupported workflow state")
        async with self._lock:
            idx = self._find_task_index(task_id)
            task = self._tasks[idx]
            old = _deepcopy_json(task)
            task["workflow_state"] = requested
            current_execution = self._current_execution(task)
            task["current_execution"] = {
                **current_execution,
                "state": requested,
                "updated_at": _utcnow(),
            }
            task["updated_at"] = _utcnow()
            self._append_history(
                "workflow_changed",
                task,
                summary="Workflow state changed",
                previous_state=old,
                new_state=task,
                details={
                    "workflow_before": old.get("workflow_state"),
                    "workflow_after": requested,
                    "execution_before": old.get("current_execution"),
                    "execution_after": _deepcopy_json(task.get("current_execution")),
                    "note": (note or "").strip() or None,
                },
            )
            await self._async_save_all()
        await self.async_broadcast_update(reason="workflow_changed")
        return self._tasks[idx]

    async def async_reset_task_progress(self, task_id: str, *, note: str | None = None) -> dict[str, Any]:
        async with self._lock:
            idx = self._find_task_index(task_id)
            task = self._tasks[idx]
            old = _deepcopy_json(task)
            current_execution = self._current_execution(task)
            task["workflow_state"] = self._next_cycle_state(task)
            task["checklist"] = self._reset_checklist_items(task.get("checklist"))
            task["current_execution"] = {
                **current_execution,
                "state": task["workflow_state"],
                "updated_at": _utcnow(),
                "completed_at": None,
                "reset_count": int(current_execution.get("reset_count") or 0) + 1,
            }
            task.pop("snoozed_until", None)
            task["updated_at"] = _utcnow()
            self._increment_execution_stat(task, "resets")
            self._append_history(
                "workflow_reset",
                task,
                summary="Workflow progress reset",
                previous_state=old,
                new_state=task,
                details={
                    "execution_before": old.get("current_execution"),
                    "execution_after": _deepcopy_json(task.get("current_execution")),
                    "note": (note or "").strip() or None,
                },
            )
            await self._async_save_all()
        await self.async_broadcast_update(reason="workflow_reset")
        return self._tasks[idx]

    async def async_restart_task_cycle(
        self,
        task_id: str,
        *,
        restarted_at: str | None = None,
        note: str | None = None,
    ) -> dict[str, Any]:
        async with self._lock:
            idx = self._find_task_index(task_id)
            task = self._tasks[idx]
            if task.get("schedule_mode") == "one_time":
                raise ValueError("One-time tasks must be reactivated instead of restarted")
            old = _deepcopy_json(task)
            restart_at = (_parse_dt(restarted_at) or datetime.now(UTC)).astimezone(UTC).isoformat()
            previous_execution = self._current_execution(task)
            if task.get("schedule_mode") == "interval":
                task["last_done"] = restart_at
                task["last_scheduled_due"] = None
            task.pop("snoozed_until", None)
            self._begin_new_cycle(task, started_at=restart_at)
            task["updated_at"] = _utcnow()
            self._increment_execution_stat(task, "restarted")
            self._append_history(
                "cycle_restarted",
                task,
                summary="Task cycle restarted",
                previous_state=old,
                new_state=task,
                details={
                    "execution_before": previous_execution,
                    "execution_after": _deepcopy_json(task.get("current_execution")),
                    "note": (note or "").strip() or None,
                },
            )
            await self._async_save_all()
        await self.async_broadcast_update(reason="cycle_restarted")
        return self._tasks[idx]

    async def async_skip_task_cycle(
        self,
        task_id: str,
        *,
        skipped_at: str | None = None,
        note: str | None = None,
    ) -> dict[str, Any]:
        async with self._lock:
            idx = self._find_task_index(task_id)
            task = self._tasks[idx]
            if task.get("schedule_mode") == "one_time":
                raise ValueError("One-time tasks cannot be skipped")
            old = _deepcopy_json(task)
            runtime = self.runtime_for_task(task).as_dict()
            when = (_parse_dt(skipped_at) or datetime.now(UTC)).astimezone(UTC).isoformat()
            previous_execution = self._current_execution(task)
            task["last_done"] = when
            if task.get("schedule_mode") in {"fixed_date", "seasonal"} and runtime.get("due_at"):
                task["last_scheduled_due"] = runtime["due_at"]
            task.pop("snoozed_until", None)
            self._begin_new_cycle(task, started_at=when)
            task["updated_at"] = _utcnow()
            self._increment_execution_stat(task, "skipped")
            self._append_history(
                "cycle_skipped",
                task,
                summary="Task cycle skipped",
                previous_state=old,
                new_state=task,
                details={
                    "runtime_before": runtime,
                    "execution_before": previous_execution,
                    "execution_after": _deepcopy_json(task.get("current_execution")),
                    "note": (note or "").strip() or None,
                },
            )
            await self._async_save_all()
        await self.async_broadcast_update(reason="cycle_skipped")
        return self._tasks[idx]

    async def async_undo_completion(self, event_id: str) -> dict[str, Any]:
        async with self._lock:
            event = self._find_history_event(event_id)
            if event.get("type") != "completed" or not event.get("previous_state"):
                raise ValueError("History event cannot be undone")
            task_id = event["task_id"]
            idx = self._find_task_index(task_id)
            await self._async_backup("before_undo_completion")
            current = _deepcopy_json(self._tasks[idx])
            restored = self._normalize_task(event["previous_state"])
            restored["updated_at"] = _utcnow()
            self._tasks[idx] = restored
            event["undone_at"] = _utcnow()
            undo_event = self._append_history(
                "undo_completed",
                restored,
                summary="Completion undone",
                previous_state=current,
                new_state=restored,
                details={"undone_event_id": event_id},
            )
            await self._async_save_all()
        await self.async_broadcast_update(reason="undo_completion")
        return undo_event

    async def async_snooze(self, task_id: str, days: int) -> dict[str, Any]:
        async with self._lock:
            idx = self._find_task_index(task_id)
            old = _deepcopy_json(self._tasks[idx])
            await self._async_backup("before_snooze")
            self._tasks[idx]["snoozed_until"] = (datetime.now(UTC) + timedelta(days=days)).isoformat()
            self._tasks[idx]["updated_at"] = _utcnow()
            self._append_history("snoozed", self._tasks[idx], summary=f"Task snoozed for {days} days", previous_state=old, new_state=self._tasks[idx])
            await self._async_save_all()
        await self.async_broadcast_update(reason="snooze")
        payload = self.task_summary(self._find_task(task_id)) or {"id": task_id}
        payload["snoozed_until"] = self._find_task(task_id).get("snoozed_until") if self._find_task(task_id) else None
        self.hass.bus.async_fire(EVENT_TASK_SNOOZED, payload)
        return self._tasks[idx]

    async def async_clear_snooze(self, task_id: str) -> dict[str, Any]:
        async with self._lock:
            idx = self._find_task_index(task_id)
            old = _deepcopy_json(self._tasks[idx])
            await self._async_backup("before_clear_snooze")
            self._tasks[idx].pop("snoozed_until", None)
            self._tasks[idx]["updated_at"] = _utcnow()
            self._append_history("snooze_cleared", self._tasks[idx], summary="Task snooze cleared", previous_state=old, new_state=self._tasks[idx])
            await self._async_save_all()
        await self.async_broadcast_update(reason="clear_snooze")
        return self._tasks[idx]

    async def async_reorder(self, ordered_ids: list[str]) -> None:
        async with self._lock:
            await self._async_backup("before_reorder")
            position = 0
            by_id = {task["id"]: task for task in self._tasks}
            for task_id in ordered_ids:
                task = by_id.get(task_id)
                if task:
                    task["position"] = position
                    task["updated_at"] = _utcnow()
                    position += 1
            for task in self._tasks:
                if task["id"] not in ordered_ids:
                    task["position"] = position
                    position += 1
            await self._async_save_all()
        await self.async_broadcast_update(reason="reorder")

    async def async_restore_backup(self, backup_id: str) -> dict[str, Any]:
        """Restore all supported sections from a backup."""
        return await self.async_restore_backup_sections(backup_id, sections=sorted(BACKUP_SECTIONS))

    async def async_restore_backup_sections(
        self,
        backup_id: str,
        *,
        sections: list[str] | None = None,
        task_ids: list[str] | None = None,
    ) -> dict[str, Any]:
        selected = set(sections or BACKUP_SECTIONS) & BACKUP_SECTIONS
        if not selected:
            raise ValueError("At least one restore section is required")
        async with self._lock:
            backup = self._find_backup(backup_id)
            if self._settings.get("backups", {}).get("before_restore", True):
                await self._async_backup("before_restore_backup")
            restored: dict[str, Any] = {}
            if "tasks" in selected:
                restored_records, restored_count = restore_task_records(
                    self._tasks,
                    backup.get("tasks", []),
                    task_ids=task_ids,
                )
                self._tasks = [self._normalize_task(item) for item in restored_records]
                restored["tasks"] = restored_count
            if "history" in selected:
                self._history = [item for item in backup.get("history", []) if isinstance(item, dict)]
                restored["history"] = len(self._history)
            if "settings" in selected and isinstance(backup.get("settings"), dict):
                self._settings = normalize_settings(deep_merge(default_settings(), backup["settings"]))
                restored["settings"] = True
            if "notification_state" in selected and isinstance(backup.get("notification_state"), dict):
                self._notification_state = self._normalize_notification_state(backup["notification_state"])
                restored["notification_state"] = True
            if "quarantine" in selected and isinstance(backup.get("quarantine"), list):
                self._quarantine = [item for item in backup["quarantine"] if isinstance(item, dict)]
                restored["quarantine"] = len(self._quarantine)
            if "audit" in selected and isinstance(backup.get("audit"), list):
                self._audit = [item for item in backup["audit"] if isinstance(item, dict)]
                restored["audit"] = len(self._audit)
            self._append_audit(
                "backup_restored",
                source="panel",
                details={"backup_id": backup_id, "sections": sorted(selected), "task_ids": task_ids or []},
            )
            await self._save_everything()
        await self.async_check_integrity(sync_repairs=True)
        await self.async_broadcast_update(reason="restore_backup")
        return {"ok": True, "restored": restored}

    async def async_create_backup(
        self,
        *,
        name: str | None = None,
        pinned: bool = False,
        reason: str = "manual",
    ) -> dict[str, Any]:
        async with self._lock:
            backup = self._build_backup(reason, name=name, pinned=pinned, automatic=False)
            self._backups.insert(0, backup)
            self._rotate_backups()
            self._append_audit("backup_created", source="panel", details={"backup_id": backup["id"], "name": name})
            await self._save_everything()
        await self.async_broadcast_update(reason="create_backup")
        return self._backup_metadata(backup)

    async def async_update_backup(
        self, backup_id: str, *, name: str | None = None, pinned: bool | None = None
    ) -> dict[str, Any]:
        async with self._lock:
            backup = self._find_backup(backup_id)
            if name is not None:
                backup["name"] = str(name).strip() or None
            if pinned is not None:
                backup["pinned"] = bool(pinned)
            backup["updated_at"] = _utcnow()
            self._append_audit("backup_updated", source="panel", details={"backup_id": backup_id})
            await self._save_everything()
        await self.async_broadcast_update(reason="update_backup")
        return self._backup_metadata(backup)

    async def async_delete_backup(self, backup_id: str) -> dict[str, Any]:
        async with self._lock:
            backup = self._find_backup(backup_id)
            self._backups.remove(backup)
            self._append_audit("backup_deleted", source="panel", details={"backup_id": backup_id})
            await self._save_everything()
        await self.async_broadcast_update(reason="delete_backup")
        return {"ok": True}

    async def async_backup_diff(self, backup_id: str) -> dict[str, Any]:
        backup = self._find_backup(backup_id)
        task_diff = diff_task_records(
            self._tasks,
            backup.get("tasks", []),
            summarize=self._task_diff_summary,
            ignored_fields={"updated_at"},
        )
        history_before = len(backup.get("history", []))
        settings_changed = backup.get("settings") is not None and backup.get("settings") != self._settings
        notification_changed = (
            backup.get("notification_state") is not None
            and backup.get("notification_state") != self._notification_state
        )
        return {
            "backup": self._backup_metadata(backup),
            "tasks": task_diff,
            "history": {"backup_count": history_before, "current_count": len(self._history)},
            "settings_changed": settings_changed,
            "notification_state_changed": notification_changed,
        }

    async def async_import_tasks(self, tasks: list[dict[str, Any]]) -> None:
        await self.async_import_data({"tasks": tasks}, mode="replace", duplicate_mode="overwrite")

    def get_diagnostics_payload(self) -> dict[str, Any]:
        summary = self.get_summary()
        runtime = {task["id"]: self.runtime_for_task(task).as_dict() for task in self._tasks}
        native_settings = self._settings.get("native_platforms", {})
        native_active_tasks = [
            task for task in self._tasks if not task.get("deleted") and task.get("enabled", True)
        ]
        native_calendar_tasks = []
        for task in native_active_tasks:
            task_runtime = self.runtime_for_task(task)
            if task_runtime.status == "snoozed" and not native_settings.get("calendar_include_snoozed", False):
                continue
            if task_runtime.due_at and task_runtime.status not in {"completed", "disabled", "deleted", "unavailable"}:
                native_calendar_tasks.append(task)
        return {
            "integration_version": VERSION,
            "schema_version": DATA_SCHEMA_VERSION,
            "task_count": len(self._tasks),
            "active_task_count": summary.get("active", 0),
            "history_count": len(self._history),
            "backup_count": len(self._backups),
            "quarantine_count": len(self._quarantine),
            "audit_count": len(self._audit),
            "summary": summary,
            "diagnostics": self.get_diagnostics(),
            "integrity": _deepcopy_json(self._integrity),
            "runtime": runtime,
            "entity_count": len(self.hass.states.async_entity_ids()),
            "settings": self.settings,
            "native_platforms": {
                "todo_enabled": bool(native_settings.get("todo_enabled", True)),
                "todo_include_disabled": bool(native_settings.get("todo_include_disabled", False)),
                "todo_item_count": len([
                    task for task in self._tasks
                    if not task.get("deleted")
                    and (task.get("enabled", True) or native_settings.get("todo_include_disabled", False))
                ]),
                "calendar_enabled": bool(native_settings.get("calendar_enabled", True)),
                "calendar_include_snoozed": bool(native_settings.get("calendar_include_snoozed", False)),
                "calendar_event_duration_minutes": int(native_settings.get("calendar_event_duration_minutes", 60) or 60),
                "calendar_event_count": len(native_calendar_tasks),
                "automation_triggers": [
                    "task_status_changed",
                    "task_warning",
                    "task_critical",
                    "task_overdue",
                    "task_unavailable",
                    "task_completed",
                    "task_snoozed",
                ],
                "automation_conditions": [
                    "any_critical",
                    "any_overdue",
                    "any_unavailable",
                    "category_has_due",
                    "category_has_status",
                    "task_is_overdue",
                    "task_status_is",
                ],
            },
            "meta": _deepcopy_json(self._meta),
            "notification_state": _deepcopy_json(self._notification_state),
            "last_notification_execution": self._meta.get("last_notification_execution"),
            "last_automatic_backup": self._meta.get("last_automatic_backup"),
            "pending_repairs": self._integrity.get("errors", 0),
        }

    async def async_export_data(self, *, include_backups: bool = True) -> dict[str, Any]:
        return {
            "version": VERSION,
            "schema_version": DATA_SCHEMA_VERSION,
            "exported_at": _utcnow(),
            "tasks": self.tasks,
            "history": self.history,
            "backups": self.backups if include_backups else [],
            "settings": self.settings,
            "notification_state": _deepcopy_json(self._notification_state),
            "quarantine": self.quarantine,
            "audit": self.audit,
            "meta": _deepcopy_json(self._meta),
        }

    async def async_preview_import(
        self,
        payload: dict[str, Any],
        *,
        mode: str = "replace",
        duplicate_mode: str = "overwrite",
    ) -> dict[str, Any]:
        prepared = self._prepare_import(payload, mode=mode, duplicate_mode=duplicate_mode)
        report = inspect_integrity(
            prepared["tasks"],
            prepared["history"],
            prepared["backups"],
            prepared["settings"],
            prepared["notification_state"],
            prepared["quarantine"],
            prepared["audit"],
            known_entity_ids=set(self.hass.states.async_entity_ids()),
            orphaned_task_entities=self._orphaned_task_entity_ids(prepared["tasks"]),
            templates=TEMPLATES,
        )
        current_ids = {item["id"] for item in self._tasks}
        imported_ids = {item["id"] for item in prepared["tasks"]}
        return {
            "ok": report["errors"] == 0,
            "mode": mode,
            "duplicate_mode": duplicate_mode,
            "task_count": len(prepared["tasks"]),
            "history_count": len(prepared["history"]),
            "added": len(imported_ids - current_ids),
            "removed": len(current_ids - imported_ids) if mode == "replace" else 0,
            "matching": len(current_ids & imported_ids),
            "integrity": report,
        }

    async def async_import_data(
        self,
        payload: dict[str, Any],
        *,
        mode: str = "replace",
        duplicate_mode: str = "overwrite",
    ) -> dict[str, Any]:
        prepared = self._prepare_import(payload, mode=mode, duplicate_mode=duplicate_mode)
        report = inspect_integrity(
            prepared["tasks"],
            prepared["history"],
            prepared["backups"],
            prepared["settings"],
            prepared["notification_state"],
            prepared["quarantine"],
            prepared["audit"],
            known_entity_ids=set(self.hass.states.async_entity_ids()),
            orphaned_task_entities=self._orphaned_task_entity_ids(prepared["tasks"]),
            templates=TEMPLATES,
        )
        if report["errors"]:
            raise ValueError(f"Import validation failed with {report['errors']} error(s)")
        async with self._lock:
            snapshot = self._snapshot_runtime()
            try:
                if self._settings.get("backups", {}).get("before_import", True):
                    await self._async_backup("before_import_data")
                self._tasks = prepared["tasks"]
                self._history = prepared["history"]
                self._settings = prepared["settings"]
                self._notification_state = prepared["notification_state"]
                self._backups = prepared["backups"]
                self._quarantine = prepared["quarantine"]
                self._audit = prepared["audit"]
                self._append_history("imported", {"id": "global", "name": "Import"}, summary="Data imported")
                self._append_audit(
                    "import_executed",
                    source="panel",
                    details={"mode": mode, "duplicate_mode": duplicate_mode, "task_count": len(self._tasks)},
                )
                await self._save_everything()
            except Exception:
                self._restore_runtime_snapshot(snapshot)
                try:
                    await self._save_everything()
                except Exception:  # noqa: BLE001
                    _LOGGER.exception("Unable to persist the import rollback snapshot")
                raise
        await self.async_check_integrity(sync_repairs=True)
        await self.async_broadcast_update(reason="import_data")
        return {
            "ok": True,
            "task_count": len(self._tasks),
            "history_count": len(self._history),
            "backup_count": len(self._backups),
            "audit_count": len(self._audit),
            "integrity": _deepcopy_json(self._integrity),
        }

    async def async_check_integrity(self, *, sync_repairs: bool = True) -> dict[str, Any]:
        self._integrity = inspect_integrity(
            self._tasks,
            self._history,
            self._backups,
            self._settings,
            self._notification_state,
            self._quarantine,
            self._audit,
            known_entity_ids=set(self.hass.states.async_entity_ids()),
            orphaned_task_entities=self._orphaned_task_entity_ids(self._tasks),
            templates=TEMPLATES,
        )
        self._meta["last_integrity_check"] = {
            "checked_at": self._integrity["checked_at"],
            "healthy": self._integrity["healthy"],
            "errors": self._integrity["errors"],
            "warnings": self._integrity["warnings"],
        }
        await self._meta_store.async_save({"schema_version": DATA_SCHEMA_VERSION, **self._meta})
        if sync_repairs:
            try:
                from .repair_issues import async_sync_repair_issues

                await async_sync_repair_issues(self.hass, self)
            except Exception:  # noqa: BLE001
                _LOGGER.exception("Unable to synchronize repair issues")
        return _deepcopy_json(self._integrity)

    async def async_repair_integrity(self) -> dict[str, Any]:
        """Repair safe inconsistencies and quarantine records that cannot be normalized."""
        async with self._lock:
            await self._async_backup("before_integrity_repair")
            now = _utcnow()
            self._tasks, task_repairs = repair_record_ids(self._tasks)
            self._history, history_repairs = repair_record_ids(self._history)
            self._backups, backup_repairs = repair_record_ids(self._backups)
            self._quarantine, quarantine_repairs = repair_record_ids(self._quarantine)
            self._audit, audit_repairs = repair_record_ids(self._audit)

            repaired_tasks: list[dict[str, Any]] = []
            quarantined = 0
            for task in self._tasks:
                candidate = _deepcopy_json(task)
                for field in ("created_at", "updated_at"):
                    if candidate.get(field) and _parse_dt(candidate.get(field)) is None:
                        candidate[field] = now
                for field in ("last_done", "snoozed_until", "completed_at", "archived_at", "last_scheduled_due"):
                    if candidate.get(field) and _parse_dt(candidate.get(field)) is None:
                        candidate[field] = None
                try:
                    normalized = self._normalize_task(candidate)
                    self._validate_task(normalized)
                    repaired_tasks.append(normalized)
                except Exception as err:
                    self._quarantine_record("unrepairable_task", task, source="repair", error=str(err))
                    quarantined += 1
            self._tasks = repaired_tasks

            for event in self._history:
                if not _parse_dt(event.get("created_at")):
                    event["created_at"] = now
            normalized_backups: list[dict[str, Any]] = []
            for backup in self._backups:
                if not _parse_dt(backup.get("created_at")):
                    backup["created_at"] = now
                normalized_backups.append(self._normalize_backup(backup))
            self._backups = normalized_backups
            for record in self._quarantine:
                if not _parse_dt(record.get("detected_at")):
                    record["detected_at"] = now
            for event in self._audit:
                if not _parse_dt(event.get("created_at")):
                    event["created_at"] = now

            self._settings = normalize_settings(self._settings)
            self._notification_state = self._normalize_notification_state(self._notification_state)
            active_ids = {str(task["id"]) for task in self._tasks if not task.get("deleted")}
            self._notification_state["task_status"] = {
                str(task_id): status
                for task_id, status in self._notification_state.get("task_status", {}).items()
                if str(task_id) in active_ids
            }
            last_sent = self._notification_state.get("last_sent", {})
            self._notification_state["last_sent"] = {
                key: value
                for key, value in last_sent.items()
                if not str(key).startswith("task:") or str(key).split(":", 1)[1] in active_ids
            }
            self._append_audit(
                "integrity_repaired",
                source="repair",
                details={
                    "task_ids_repaired": task_repairs,
                    "history_ids_repaired": history_repairs,
                    "backup_ids_repaired": backup_repairs,
                    "quarantine_ids_repaired": quarantine_repairs,
                    "audit_ids_repaired": audit_repairs,
                    "quarantined": quarantined,
                },
            )
            await self._save_everything()

        orphaned_removed = 0
        try:
            from .entity_management import (
                async_cleanup_orphaned_task_entities,
                desired_task_binary_specs,
                desired_task_sensor_specs,
            )

            mode = self._settings.get("task_entities", {}).get("mode", "off")
            desired = set(desired_task_sensor_specs(self.tasks, mode)) | set(
                desired_task_binary_specs(self.tasks, mode)
            )
            orphaned_removed = await async_cleanup_orphaned_task_entities(
                self.hass, self.entry, desired
            )
        except Exception:  # noqa: BLE001
            _LOGGER.exception("Unable to remove orphaned task entities during integrity repair")

        result = await self.async_check_integrity(sync_repairs=True)
        result["orphaned_entities_removed"] = orphaned_removed
        await self.async_broadcast_update(reason="repair_integrity")
        return result

    async def async_restore_quarantine(self, quarantine_id: str) -> dict[str, Any]:
        async with self._lock:
            record = self._find_quarantine(quarantine_id)
            original = record.get("original_data")
            if record.get("record_type") == "task" and isinstance(original, dict):
                task = self._normalize_task(original, create=True)
                self._validate_task(task)
                if self._find_task(task["id"]):
                    task["id"] = self._unique_id(str(task.get("name") or "task"))
                    task["entity_key"] = task["id"]
                self._tasks.append(task)
            elif record.get("record_type") == "history" and isinstance(original, dict):
                self._history.insert(0, original)
            elif record.get("record_type") == "backup" and isinstance(original, dict):
                if not isinstance(original.get("tasks", []), list) or not isinstance(original.get("history", []), list):
                    raise ValueError("Quarantined backup snapshot is still invalid")
                backup = self._normalize_backup(original)
                if any(item.get("id") == backup["id"] for item in self._backups):
                    backup["id"] = uuid.uuid4().hex
                self._backups.insert(0, backup)
            else:
                raise ValueError("Quarantined record cannot be restored automatically")
            self._quarantine.remove(record)
            self._append_audit("quarantine_restored", source="panel", details={"quarantine_id": quarantine_id})
            await self._save_everything()
        await self.async_check_integrity(sync_repairs=True)
        await self.async_broadcast_update(reason="restore_quarantine")
        return {"ok": True}

    async def async_delete_quarantine(self, quarantine_id: str) -> dict[str, Any]:
        async with self._lock:
            record = self._find_quarantine(quarantine_id)
            self._quarantine.remove(record)
            self._append_audit("quarantine_deleted", source="panel", details={"quarantine_id": quarantine_id})
            await self._save_everything()
        await self.async_broadcast_update(reason="delete_quarantine")
        return {"ok": True}

    async def async_preview_bulk_operation(
        self,
        task_ids: list[str],
        *,
        action: str,
        value: Any = None,
    ) -> dict[str, Any]:
        """Return a non-mutating preview for a bulk operation."""
        wanted = list(dict.fromkeys(str(item) for item in task_ids if item))
        if not wanted:
            raise ValueError("No tasks selected")
        allowed = {"done", "snooze", "clear_snooze", "category", "area", "priority", "workflow", "reset_progress", "enable", "disable", "delete", "restore", "duplicate"}
        if action not in allowed:
            raise ValueError("Unsupported bulk action")
        changes: list[dict[str, Any]] = []
        for task_id in wanted:
            task = self._find_task(task_id)
            if not task:
                continue
            field_changes: list[dict[str, Any]] = []
            if action == "done":
                field_changes.append({"field": "last_done", "before": task.get("last_done"), "after": "now"})
                if task.get("schedule_mode") == "one_time":
                    field_changes.append({"field": "completed_at", "before": task.get("completed_at"), "after": "now"})
            elif action == "snooze":
                days = max(1, int(value or 7))
                field_changes.append({"field": "snoozed_until", "before": task.get("snoozed_until"), "after": f"+{days} days"})
            elif action == "clear_snooze":
                field_changes.append({"field": "snoozed_until", "before": task.get("snoozed_until"), "after": None})
            elif action == "category":
                category = str(value or "general")
                normalized = category if category in CATEGORIES else "custom"
                field_changes.append({"field": "category", "before": task.get("category"), "after": normalized})
                if normalized == "custom":
                    field_changes.append({"field": "custom_category", "before": task.get("custom_category"), "after": category})
            elif action == "area":
                if isinstance(value, dict):
                    field_changes.extend([
                        {"field": "area_id", "before": task.get("area_id"), "after": value.get("area_id") or None},
                        {"field": "area_name", "before": task.get("area_name"), "after": value.get("area_name") or None},
                    ])
                else:
                    field_changes.append({"field": "area_name", "before": task.get("area_name"), "after": str(value or "") or None})
            elif action == "priority":
                field_changes.append({"field": "priority", "before": task.get("priority"), "after": min(5, max(1, int(value or 3)))})
            elif action == "workflow":
                state = normalize_workflow_state(str(value or "ready"), default="ready", allow_terminal=False)
                field_changes.append({"field": "workflow_state", "before": task.get("workflow_state"), "after": state})
            elif action == "reset_progress":
                field_changes.extend([
                    {"field": "current_execution", "before": task.get("current_execution"), "after": "reset"},
                    {"field": "checklist", "before": task.get("checklist"), "after": "unchecked"},
                ])
            elif action in {"enable", "disable"}:
                field_changes.append({"field": "enabled", "before": task.get("enabled", True), "after": action == "enable"})
            elif action == "delete":
                field_changes.append({"field": "deleted", "before": task.get("deleted", False), "after": True})
            elif action == "restore":
                field_changes.append({"field": "deleted", "before": task.get("deleted", False), "after": False})
            elif action == "duplicate":
                field_changes.append({"field": "id", "before": task.get("id"), "after": "new_id"})
                field_changes.append({"field": "name", "before": task.get("name"), "after": f"{task.get('name')} copy"})
            changes.append({
                "id": task_id,
                "name": task.get("name"),
                "action": action,
                "changes": field_changes,
            })
        return {
            "ok": True,
            "action": action,
            "value": value,
            "requested": len(wanted),
            "affected": len(changes),
            "backup_will_be_created": bool(
                self._settings.get("backups", {}).get("before_bulk_operation", True)
            ),
            "tasks": changes,
        }

    async def async_bulk_operation(
        self,
        task_ids: list[str],
        *,
        action: str,
        value: Any = None,
    ) -> dict[str, Any]:
        wanted = list(dict.fromkeys(str(item) for item in task_ids if item))
        if not wanted:
            raise ValueError("No tasks selected")
        allowed = {"done", "snooze", "clear_snooze", "category", "area", "priority", "workflow", "reset_progress", "enable", "disable", "delete", "restore", "duplicate"}
        if action not in allowed:
            raise ValueError("Unsupported bulk action")
        async with self._lock:
            if self._settings.get("backups", {}).get("before_bulk_operation", True):
                await self._async_backup(f"before_bulk_{action}")
            affected = 0
            now = _utcnow()
            for task_id in wanted:
                task = self._find_task(task_id)
                if not task:
                    continue
                before = _deepcopy_json(task)
                if action == "done":
                    done_at = now
                    if task.get("type") == "meter":
                        entity = self.hass.states.get(task.get("entity_id")) if task.get("entity_id") else None
                        task["baseline"] = _safe_float(entity.state if entity else None) or task.get("baseline", 0)
                    task["last_done"] = done_at
                    task.pop("snoozed_until", None)
                    if task.get("schedule_mode") == "one_time":
                        task["completed_at"] = done_at
                        task["archived_at"] = done_at
                elif action == "snooze":
                    days = max(1, int(value or 7))
                    task["snoozed_until"] = (datetime.now(UTC) + timedelta(days=days)).isoformat()
                elif action == "clear_snooze":
                    task.pop("snoozed_until", None)
                elif action == "category":
                    category = str(value or "general")
                    task["category"] = category if category in CATEGORIES else "custom"
                    task["custom_category"] = None if category in CATEGORIES else category
                elif action == "area":
                    if isinstance(value, dict):
                        task["area_id"] = value.get("area_id") or None
                        task["area_name"] = value.get("area_name") or None
                    else:
                        task["area_name"] = str(value or "") or None
                elif action == "priority":
                    task["priority"] = min(5, max(1, int(value or 3)))
                elif action == "workflow":
                    state = normalize_workflow_state(str(value or "ready"), default="ready", allow_terminal=False)
                    task["workflow_state"] = state
                    task["current_execution"] = normalize_execution(
                        task.get("current_execution"),
                        fallback_state=state,
                        fallback_started_at=task.get("updated_at") or now,
                    )
                    task["current_execution"]["state"] = state
                    if state in OPEN_WORKFLOW_STATES:
                        task["current_execution"]["completed_at"] = None
                elif action == "reset_progress":
                    current_execution = self._current_execution(task)
                    task["workflow_state"] = self._next_cycle_state(task)
                    task["checklist"] = self._reset_checklist_items(task.get("checklist"))
                    task["current_execution"] = {
                        **current_execution,
                        "state": task["workflow_state"],
                        "updated_at": now,
                        "completed_at": None,
                        "reset_count": int(current_execution.get("reset_count") or 0) + 1,
                    }
                    task.pop("snoozed_until", None)
                    self._increment_execution_stat(task, "resets")
                elif action == "enable":
                    task["enabled"] = True
                elif action == "disable":
                    task["enabled"] = False
                elif action == "delete":
                    task["deleted"] = True
                    task["deleted_at"] = now
                elif action == "restore":
                    task["deleted"] = False
                    task.pop("deleted_at", None)
                elif action == "duplicate":
                    duplicate = self._normalize_task({
                        **_deepcopy_json(task),
                        "id": self._unique_id(f"{task.get('name') or 'task'} copy"),
                        "entity_key": None,
                        "name": f"{task.get('name') or 'Task'} copy",
                        "position": self._next_position(),
                        "created_at": now,
                        "updated_at": now,
                        "deleted": False,
                        "deleted_at": None,
                    })
                    self._tasks.append(duplicate)
                    self._append_history(
                        "bulk_duplicate",
                        duplicate,
                        summary="Bulk action: duplicate",
                        previous_state=before,
                        new_state=duplicate,
                        details={"bulk": True, "source_task_id": before.get("id")},
                    )
                    affected += 1
                    continue
                task["updated_at"] = now
                self._append_history(
                    f"bulk_{action}",
                    task,
                    summary=f"Bulk action: {action}",
                    previous_state=before,
                    new_state=task,
                    details={"bulk": True},
                )
                affected += 1
            self._append_audit(
                "bulk_operation",
                source="panel",
                details={"action": action, "requested": len(wanted), "affected": affected},
            )
            await self._save_everything()
        await self.async_check_integrity(sync_repairs=False)
        await self.async_broadcast_update(reason=f"bulk_{action}")
        return {"ok": True, "affected": affected}


    def task_summary(self, task: dict[str, Any] | None, runtime: RuntimeResult | None = None) -> dict[str, Any] | None:
        """Return automation-ready task metadata for sensors, events and notifications."""
        if not task:
            return None
        runtime = runtime or self.runtime_for_task(task)
        return {
            "id": task.get("id"),
            "entity_key": task.get("entity_key") or task.get("id"),
            "name": task.get("name"),
            "status": runtime.status,
            "category": task.get("category"),
            "custom_category": task.get("custom_category"),
            "area": task.get("area_name") or task.get("area_id"),
            "area_id": task.get("area_id"),
            "priority": task.get("priority"),
            "priority_label": self.priority_label(task.get("priority", 3)),
            "progress": runtime.progress,
            "remaining": runtime.remaining,
            "remaining_label": self.remaining_label(task, runtime),
            "due_at": runtime.due_at,
            "last_done": runtime.last_done,
            "last_scheduled_due": task.get("last_scheduled_due"),
            "schedule_mode": task.get("schedule_mode"),
            "schedule_label": runtime.schedule_label,
            "period_start": runtime.period_start,
            "calendar_repeat": task.get("calendar_repeat"),
            "season": task.get("season"),
            "completed_at": task.get("completed_at"),
            "workflow_state": task.get("workflow_state"),
            "recurrence_mode": task.get("recurrence_mode"),
            "current_execution": _deepcopy_json(task.get("current_execution")),
            "execution_stats": _deepcopy_json(task.get("execution_stats")),
            "enabled": task.get("enabled", True),
            "deleted": task.get("deleted", False),
            "tags": list(task.get("tags") or []),
            "dashboard_url": DASHBOARD_URL,
            "last_notification": self.last_task_notification(str(task.get("id"))),
        }

    def priority_label(self, priority: Any) -> str:
        return {1: "Low", 2: "Normal", 3: "Important", 4: "High", 5: "Critical"}.get(
            int(_safe_float(priority) or 3), "Important"
        )

    def remaining_label(self, task: dict[str, Any], runtime: RuntimeResult) -> str:
        if runtime.remaining is None:
            return "unknown"
        unit = "days" if task.get("schedule_mode", "interval") != "interval" else task.get("interval_unit", "days")
        value = abs(float(runtime.remaining))
        formatted = f"{value:.0f}"
        if runtime.remaining < 0:
            return f"{formatted} {unit} overdue"
        return f"{formatted} {unit} remaining"

    def _notification_policy(self, task: dict[str, Any]) -> dict[str, Any]:
        return effective_task_notification_settings(self._settings.get("notifications", {}), task)

    def _notification_target(self, task: dict[str, Any] | None, service: str | None = None) -> str:
        notifications = self._settings.get("notifications", {})
        configured = notifications.get("notify_service")
        if task:
            policy = self._notification_policy(task)
            configured = policy.get("notify_service") or configured
        return service_target(service, configured, test_mode=bool(notifications.get("test_mode", False)))

    def _notification_title(self, task: dict[str, Any], runtime: RuntimeResult, level: str) -> str:
        if level == "escalated":
            return f"URGENT Maintenance: {task.get('name')}"
        return f"Maintenance: {task.get('name')}"

    def _notification_preview(self, task: dict[str, Any], runtime: RuntimeResult, service: str | None = None) -> dict[str, Any]:
        policy = self._notification_policy(task)
        level = escalation_level(runtime.status, runtime.remaining, policy)
        target = self._notification_target(task, service)
        message = format_task_notification(
            task,
            status=runtime.status,
            remaining_label=self.remaining_label(task, runtime),
            include_dashboard_link=self._settings.get("notifications", {}).get("include_dashboard_link", True),
            escalated=level == "escalated",
        )
        data = build_mobile_action_data(
            task["id"],
            actionable=bool(policy.get("actionable", True)),
            snooze_days=int(self._settings.get("notifications", {}).get("action_snooze_days", 7)),
            escalated=level == "escalated",
        )
        return {
            "task_id": task["id"],
            "status": runtime.status,
            "level": level,
            "service": target,
            "title": self._notification_title(task, runtime, level),
            "message": message,
            "data": data,
            "policy": policy,
        }

    async def async_preview_notification(self, task_id: str, service: str | None = None) -> dict[str, Any]:
        task = self._find_task(task_id)
        if not task:
            raise ValueError("Task not found")
        return self._notification_preview(task, self.runtime_for_task(task), service)

    async def _async_call_notify_recording_failures(
        self,
        target_service: str,
        message: str,
        title: str,
        extra_data: dict[str, Any] | None,
        history_event: dict[str, Any],
    ) -> None:
        try:
            await self._async_call_notify_service(target_service, message, title, extra_data)
        except Exception as err:
            self._append_notification_history({
                **history_event,
                "service": target_service,
                "title": title,
                "message": message,
                "sent_at": _utcnow(),
                "success": False,
                "error": str(err),
            })
            await self._save_notification_state()
            raise

    async def async_send_notification(self, service: str | None = None, message: str | None = None) -> dict[str, Any]:
        target_service = self._notification_target(None, service)
        msg = message or self._notification_digest_message()
        await self._async_call_notify_recording_failures(target_service, msg, "Maintenance Dashboard", None, {"kind": "manual"})
        self._append_notification_history({"kind": "manual", "service": target_service, "title": "Maintenance Dashboard", "message": msg, "sent_at": _utcnow(), "success": True})
        await self._save_notification_state()
        return {"ok": True, "service": target_service}

    async def async_test_notification(self, service: str | None = None) -> dict[str, Any]:
        target_service = service_target(service, self._settings.get("notifications", {}).get("notify_service"), test_mode=False)
        await self._async_call_notify_recording_failures(target_service, "Maintenance Dashboard test notification", "Maintenance Dashboard Test", {"url": DASHBOARD_URL, "tag": "maintenance-dashboard-test"}, {"kind": "test"})
        self._append_notification_history({"kind": "test", "service": target_service, "title": "Maintenance Dashboard Test", "message": "Maintenance Dashboard test notification", "sent_at": _utcnow(), "success": True})
        await self._save_notification_state()
        return {"ok": True, "service": target_service}

    async def async_send_digest(
        self,
        service: str | None = None,
        *,
        include_ok: bool = False,
        include_snoozed: bool = False,
        respect_quiet_hours: bool = False,
    ) -> dict[str, Any]:
        notifications = self._settings.get("notifications", {})
        now_local = dt_util.now()
        if respect_quiet_hours and is_quiet_time(now_local, notifications):
            return {"ok": True, "suppressed": "quiet_hours", "sent": 0}
        target_service = self._notification_target(None, service)
        message = self._notification_digest_message(include_ok=include_ok, include_snoozed=include_snoozed)
        await self._async_call_notify_recording_failures(target_service, message, "Maintenance Digest", {"url": DASHBOARD_URL, "tag": "maintenance-dashboard-digest", "group": "maintenance-dashboard"}, {"kind": "digest"})
        self._notification_state.setdefault("last_sent", {})["digest"] = {"at": _utcnow(), "local_date": dt_util.now().date().isoformat(), "status": "digest", "level": "normal", "count": 1}
        self._append_notification_history({"kind": "digest", "service": target_service, "title": "Maintenance Digest", "message": message, "sent_at": _utcnow(), "success": True})
        await self._save_notification_state()
        return {"ok": True, "service": target_service, "sent": 1}

    async def async_notify_task(
        self,
        task_id: str,
        service: str | None = None,
        *,
        automatic: bool = False,
        respect_quiet_hours: bool = False,
    ) -> dict[str, Any]:
        task = self._find_task(task_id)
        if not task:
            raise ValueError("Task not found")
        runtime = self.runtime_for_task(task)
        notifications = self._settings.get("notifications", {})
        policy = self._notification_policy(task)
        if automatic and not notifications.get("due", True):
            return {"ok": True, "suppressed": "due_notifications_disabled", "task_id": task_id}
        if respect_quiet_hours and is_quiet_time(dt_util.now(), notifications):
            return {"ok": True, "suppressed": "quiet_hours", "task_id": task_id}
        level = escalation_level(runtime.status, runtime.remaining, policy)
        if automatic:
            previous = self._notification_state.setdefault("last_sent", {}).get(f"task:{task_id}")
            if not should_send_task_notification(previous, status=runtime.status, level=level, now=datetime.now(UTC), policy=policy):
                return {"ok": True, "suppressed": "deduplicated", "task_id": task_id}
        preview = self._notification_preview(task, runtime, service)
        await self._async_call_notify_recording_failures(preview["service"], preview["message"], preview["title"], preview["data"], {"kind": "task", "task_id": task_id, "task_name": task.get("name"), "status": runtime.status, "level": level, "automatic": automatic})
        previous = self._notification_state.setdefault("last_sent", {}).get(f"task:{task_id}")
        previous_count = previous.get("count", 0) if isinstance(previous, dict) else 0
        record = notification_record(status=runtime.status, level=level, now=datetime.now(UTC), count=previous_count + 1)
        self._notification_state["last_sent"][f"task:{task_id}"] = record
        self._append_notification_history({
            "kind": "task",
            "task_id": task_id,
            "task_name": task.get("name"),
            "status": runtime.status,
            "level": level,
            "service": preview["service"],
            "title": preview["title"],
            "message": preview["message"],
            "sent_at": record["at"],
            "automatic": automatic,
            "success": True,
        })
        await self._save_notification_state()
        return {"ok": True, "service": preview["service"], "task_id": task_id, "level": level}

    async def async_notify_due_tasks(self, service: str | None = None, statuses: list[str] | None = None, *, automatic: bool = False) -> dict[str, Any]:
        wanted = set(statuses or ["warning", "critical", "overdue", "unavailable"])
        sent = 0
        suppressed = 0
        failures: list[dict[str, str]] = []
        for task in [t for t in self._tasks if not t.get("deleted") and t.get("enabled", True)]:
            runtime = self.runtime_for_task(task)
            if runtime.status not in wanted:
                continue
            try:
                result = await self.async_notify_task(task["id"], service, automatic=automatic, respect_quiet_hours=automatic)
            except Exception as err:  # noqa: BLE001
                failures.append({"task_id": str(task.get("id")), "error": str(err)})
                continue
            if result.get("suppressed"):
                suppressed += 1
            else:
                sent += 1
        return {"ok": not failures, "sent": sent, "suppressed": suppressed, "failed": len(failures), "failures": failures}

    async def _async_call_notify_service(self, target_service: str, message: str, title: str, extra_data: dict[str, Any] | None = None) -> None:
        domain, _, service_name = target_service.partition(".")
        if not domain or not service_name:
            raise ValueError("Notify service must use domain.service format")
        data = persistent_notification_payload(message) if target_service == "persistent_notification.create" else notify_payload(message)
        data["title"] = title
        if target_service != "persistent_notification.create":
            payload_data = dict(extra_data or {})
            if self._settings.get("notifications", {}).get("include_dashboard_link", True):
                payload_data.setdefault("url", DASHBOARD_URL)
            if payload_data:
                data["data"] = payload_data
        await self.hass.services.async_call(domain, service_name, data, blocking=False)

    def _notification_digest_message(self, *, include_ok: bool = False, include_snoozed: bool = False) -> str:
        summary = self.get_summary()
        task_summaries: list[dict[str, Any]] = []
        for task in [t for t in self._tasks if not t.get("deleted") and t.get("enabled", True)]:
            runtime = self.runtime_for_task(task)
            if runtime.status in {"critical", "overdue", "warning", "unavailable"} or (include_ok and runtime.status == "ok") or (include_snoozed and runtime.status == "snoozed"):
                item = self.task_summary(task, runtime) or {}
                task_summaries.append(item)
        notifications = self._settings.get("notifications", {})
        grouped = group_task_summaries_by_category(task_summaries) if notifications.get("digest_group_by_category", True) else {"tasks": task_summaries}
        return build_digest_message(summary, grouped, include_dashboard_link=notifications.get("include_dashboard_link", True))

    def _format_task_notification(self, task: dict[str, Any], runtime: RuntimeResult) -> str:
        policy = self._notification_policy(task)
        level = escalation_level(runtime.status, runtime.remaining, policy)
        return format_task_notification(
            task,
            status=runtime.status,
            remaining_label=self.remaining_label(task, runtime),
            include_dashboard_link=self._settings.get("notifications", {}).get("include_dashboard_link", True),
            escalated=level == "escalated",
        )

    def _append_notification_history(self, event: dict[str, Any]) -> None:
        history = self._notification_state.setdefault("history", [])
        history.insert(0, {"id": uuid.uuid4().hex, **event})
        retention = int(self._settings.get("notifications", {}).get("history_retention", 200))
        del history[max(20, retention):]

    async def _save_notification_state(self) -> None:
        await self._notification_state_store.async_save(self._notification_state)

    async def async_process_status_transitions(self, *, reason: str) -> None:
        status_state = self._notification_state.setdefault("task_status", {})
        changed = False
        for task in [task for task in self._tasks if not task.get("deleted")]:
            runtime = self.runtime_for_task(task)
            previous = status_state.get(task["id"])
            current = runtime.status
            if previous is None:
                status_state[task["id"]] = current
                changed = True
                continue
            if previous == current:
                continue
            status_state[task["id"]] = current
            changed = True
            if current not in NOTIFIABLE_STATUSES:
                self._notification_state.setdefault("last_sent", {}).pop(f"task:{task['id']}", None)
            payload = self.task_summary(task, runtime) or {}
            payload.update({"previous_status": previous, "reason": reason})
            self.hass.bus.async_fire(EVENT_TASK_STATUS_CHANGED, payload)
            if current == "warning":
                self.hass.bus.async_fire(EVENT_TASK_WARNING, payload)
            if current in {"critical", "overdue"}:
                self.hass.bus.async_fire(EVENT_TASK_CRITICAL, payload)
            if current == "overdue":
                self.hass.bus.async_fire(EVENT_TASK_OVERDUE, payload)
            if current == "unavailable":
                self.hass.bus.async_fire(EVENT_TASK_UNAVAILABLE, payload)
        active_ids = {task["id"] for task in self._tasks if not task.get("deleted")}
        for task_id in set(status_state) - active_ids:
            status_state.pop(task_id, None)
            changed = True
        if changed:
            await self._save_notification_state()

    async def async_maybe_send_scheduled_notifications(self) -> dict[str, Any]:
        self._meta["last_notification_execution"] = _utcnow()
        await self._meta_store.async_save({"schema_version": DATA_SCHEMA_VERSION, **self._meta})
        await self.async_process_status_transitions(reason="scheduled_check")
        notifications = self._settings.get("notifications", {})
        if not notifications.get("enabled"):
            return {"ok": True, "suppressed": "notifications_disabled", "sent": 0, "digest_sent": 0}
        now_local = dt_util.now()
        if is_quiet_time(now_local, notifications):
            return {"ok": True, "suppressed": "quiet_hours", "sent": 0, "digest_sent": 0}
        due_result = await self.async_notify_due_tasks(automatic=True)
        result: dict[str, Any] = {**due_result, "digest_sent": 0}
        if not notifications.get("daily_digest"):
            return result
        configured = str(notifications.get("digest_time") or "08:00")[:5]
        if now_local.strftime("%H:%M") != configured:
            return result
        previous = self._notification_state.setdefault("last_sent", {}).get("digest")
        previous_local_date = previous.get("local_date") if isinstance(previous, dict) else None
        previous_at = previous.get("at") if isinstance(previous, dict) else previous
        if previous_local_date == now_local.date().isoformat():
            return result
        if not previous_local_date and previous_at and str(previous_at)[:10] == now_local.date().isoformat():
            return result
        digest_result = await self.async_send_digest(
            include_snoozed=bool(notifications.get("include_snoozed")),
            respect_quiet_hours=True,
        )
        result["digest_sent"] = int(digest_result.get("sent", 0))
        return result

    async def async_cleanup_task_entities(self) -> dict[str, Any]:
        from .entity_management import async_cleanup_orphaned_task_entities, desired_task_binary_specs, desired_task_sensor_specs
        mode = self._settings.get("task_entities", {}).get("mode", "off")
        desired = set(desired_task_sensor_specs(self.tasks, mode)) | set(desired_task_binary_specs(self.tasks, mode))
        removed = await async_cleanup_orphaned_task_entities(self.hass, self.entry, desired)
        await self.async_broadcast_update(reason="cleanup_task_entities")
        return {"ok": True, "removed": removed}

    async def _async_backup(self, reason: str) -> None:
        """Create an automatic safety backup and apply configured rotation."""
        backup = self._build_backup(reason, automatic=True)
        self._backups.insert(0, backup)
        self._meta["last_automatic_backup"] = self._backup_metadata(backup)
        self._rotate_backups()
        await self._backups_store.async_save(
            {"schema_version": DATA_SCHEMA_VERSION, "backups": self._backups}
        )
        await self._meta_store.async_save({"schema_version": DATA_SCHEMA_VERSION, **self._meta})

    def _build_backup(
        self,
        reason: str,
        *,
        name: str | None = None,
        pinned: bool = False,
        automatic: bool = True,
        raw_documents: dict[str, Any] | None = None,
    ) -> dict[str, Any]:
        if raw_documents:
            tasks = _deepcopy_json((raw_documents.get("tasks") or {}).get("tasks", []))
            history = _deepcopy_json((raw_documents.get("history") or {}).get("history", []))
            settings = _deepcopy_json(raw_documents.get("settings") or {})
            notification_state = _deepcopy_json(raw_documents.get("notification_state") or {})
            quarantine = _deepcopy_json((raw_documents.get("quarantine") or {}).get("quarantine", []))
            audit = _deepcopy_json((raw_documents.get("audit") or {}).get("audit", []))
            meta = _deepcopy_json(raw_documents.get("meta") or {})
        else:
            tasks = _deepcopy_json(self._tasks)
            history = _deepcopy_json(self._history)
            settings = _deepcopy_json(self._settings)
            notification_state = _deepcopy_json(self._notification_state)
            quarantine = _deepcopy_json(self._quarantine)
            audit = _deepcopy_json(self._audit)
            meta = _deepcopy_json(self._meta)
        backup = {
            "id": uuid.uuid4().hex,
            "created_at": _utcnow(),
            "updated_at": None,
            "reason": reason,
            "name": str(name).strip() if name else None,
            "pinned": bool(pinned),
            "automatic": bool(automatic),
            "schema_version": DATA_SCHEMA_VERSION,
            "task_count": len(tasks),
            "history_count": len(history),
            "tasks": tasks,
            "history": history,
            "settings": settings,
            "notification_state": notification_state,
            "quarantine": quarantine,
            "audit": audit,
            "meta": meta,
        }
        backup["size_bytes"] = len(json.dumps(backup, default=str, separators=(",", ":")).encode("utf-8"))
        return backup

    def _normalize_backup(self, raw: dict[str, Any]) -> dict[str, Any]:
        backup = {
            **raw,
            "id": str(raw.get("id") or uuid.uuid4().hex),
            "created_at": raw.get("created_at") or _utcnow(),
            "updated_at": raw.get("updated_at") or None,
            "reason": str(raw.get("reason") or "legacy"),
            "name": str(raw.get("name") or "").strip() or None,
            "pinned": bool(raw.get("pinned", False)),
            "automatic": bool(raw.get("automatic", True)),
            "schema_version": int(raw.get("schema_version") or raw.get("version") or 1),
            "tasks": [item for item in raw.get("tasks", []) if isinstance(item, dict)],
            "history": [item for item in raw.get("history", []) if isinstance(item, dict)],
            "settings": raw.get("settings") if isinstance(raw.get("settings"), dict) else None,
            "notification_state": raw.get("notification_state") if isinstance(raw.get("notification_state"), dict) else None,
            "quarantine": [item for item in raw.get("quarantine", []) if isinstance(item, dict)],
            "audit": [item for item in raw.get("audit", []) if isinstance(item, dict)],
            "meta": raw.get("meta") if isinstance(raw.get("meta"), dict) else {},
        }
        backup["task_count"] = len(backup["tasks"])
        backup["history_count"] = len(backup["history"])
        backup["size_bytes"] = int(raw.get("size_bytes") or len(json.dumps(backup, default=str).encode("utf-8")))
        return backup

    def _backup_metadata(self, backup: dict[str, Any]) -> dict[str, Any]:
        return {
            key: backup.get(key)
            for key in (
                "id",
                "created_at",
                "updated_at",
                "reason",
                "name",
                "pinned",
                "automatic",
                "task_count",
                "history_count",
                "size_bytes",
            )
        }

    def _rotate_backups(self) -> None:
        settings = self._settings.get("backups", {})
        self._backups = rotate_backups(
            self._backups,
            maximum_count=int(settings.get("maximum_count", BACKUP_RETENTION)),
            maximum_age_days=int(settings.get("maximum_age_days", BACKUP_MAX_AGE_DAYS)),
        )

    async def _async_save_all(self) -> None:
        """Compatibility wrapper used by existing mutation methods."""
        await self._save_everything()

    async def _save_everything(self) -> None:
        retention = int(self.entry.options.get("history_retention", HISTORY_RETENTION_DEFAULT))
        self._history = self._history[: max(retention, 50)]
        audit_retention = int(self._settings.get("data_integrity", {}).get("audit_retention", 1000))
        quarantine_retention = int(self._settings.get("data_integrity", {}).get("quarantine_retention", 500))
        self._audit = self._audit[:audit_retention]
        self._quarantine = self._quarantine[:quarantine_retention]
        self._rotate_backups()
        await self._tasks_store.async_save({"schema_version": DATA_SCHEMA_VERSION, "tasks": self._tasks})
        await self._history_store.async_save({"schema_version": DATA_SCHEMA_VERSION, "history": self._history})
        await self._backups_store.async_save({"schema_version": DATA_SCHEMA_VERSION, "backups": self._backups})
        await self._settings_store.async_save({"schema_version": DATA_SCHEMA_VERSION, **self._settings})
        await self._notification_state_store.async_save(
            {"schema_version": DATA_SCHEMA_VERSION, **self._notification_state}
        )
        await self._quarantine_store.async_save(
            {"schema_version": DATA_SCHEMA_VERSION, "quarantine": self._quarantine}
        )
        await self._audit_store.async_save({"schema_version": DATA_SCHEMA_VERSION, "audit": self._audit})
        await self._attachments_store.async_save({"schema_version": DATA_SCHEMA_VERSION, "attachments": self._attachments})
        await self._meta_store.async_save({"schema_version": DATA_SCHEMA_VERSION, **self._meta})

    async def _restore_raw_documents(self, documents: dict[str, Any]) -> None:
        """Best-effort rollback used when a multi-store migration cannot be persisted atomically."""
        stores = {
            "tasks": self._tasks_store,
            "history": self._history_store,
            "backups": self._backups_store,
            "settings": self._settings_store,
            "notification_state": self._notification_state_store,
            "meta": self._meta_store,
            "quarantine": self._quarantine_store,
            "audit": self._audit_store,
        }
        for kind, store in stores.items():
            try:
                await store.async_save(_deepcopy_json(documents.get(kind) or {}))
            except Exception:  # noqa: BLE001
                _LOGGER.exception("Unable to roll back %s storage after migration failure", kind)

    def _append_history(
        self,
        event_type: str,
        task: dict[str, Any],
        *,
        summary: str,
        previous_state: dict[str, Any] | None = None,
        new_state: dict[str, Any] | None = None,
        details: dict[str, Any] | None = None,
    ) -> dict[str, Any]:
        event = {
            "id": uuid.uuid4().hex,
            "type": event_type,
            "task_id": task.get("id"),
            "task_name": task.get("name"),
            "created_at": _utcnow(),
            "summary": summary,
            "previous_state": _deepcopy_json(previous_state) if previous_state else None,
            "new_state": _deepcopy_json(new_state) if new_state else _deepcopy_json(task),
            "details": details or {},
        }
        self._history.insert(0, event)
        self._append_audit(
            event_type,
            source=str((details or {}).get("source") or "panel"),
            task_id=str(task.get("id") or "") or None,
            previous=previous_state,
            current=new_state or task,
            details={"history_event_id": event["id"], **(details or {})},
        )
        return event

    def _append_audit(
        self,
        action: str,
        *,
        source: str,
        task_id: str | None = None,
        previous: dict[str, Any] | None = None,
        current: dict[str, Any] | None = None,
        details: dict[str, Any] | None = None,
    ) -> dict[str, Any]:
        event = {
            "id": uuid.uuid4().hex,
            "created_at": _utcnow(),
            "action": action,
            "source": source,
            "task_id": task_id,
            "context_id": None,
            "user_id": None,
            "previous": _deepcopy_json(previous) if previous is not None else None,
            "current": _deepcopy_json(current) if current is not None else None,
            "details": _deepcopy_json(details or {}),
        }
        self._audit.insert(0, event)
        return event

    def _quarantine_record(
        self,
        reason: str,
        original_data: Any,
        *,
        source: str,
        index: int | None = None,
        error: str | None = None,
        record_type: str | None = None,
    ) -> dict[str, Any]:
        inferred = record_type or ("history" if reason.startswith("history") else "task")
        record = {
            "id": uuid.uuid4().hex,
            "reason": reason,
            "record_type": inferred,
            "source": source,
            "index": index,
            "error": error,
            "detected_at": _utcnow(),
            "original_data": _deepcopy_json(original_data),
        }
        self._quarantine.insert(0, record)
        return record

    def _normalize_notification_state(self, value: dict[str, Any] | None) -> dict[str, Any]:
        normalized = deep_merge({"version": 2, "last_sent": {}, "task_status": {}, "history": []}, value or {})
        normalized["version"] = 2
        if not isinstance(normalized.get("last_sent"), dict):
            normalized["last_sent"] = {}
        if not isinstance(normalized.get("task_status"), dict):
            normalized["task_status"] = {}
        if not isinstance(normalized.get("history"), list):
            normalized["history"] = []
        return normalized

    def _prepare_import(
        self,
        payload: dict[str, Any],
        *,
        mode: str,
        duplicate_mode: str,
    ) -> dict[str, Any]:
        if not isinstance(payload, dict):
            raise ValueError("Import payload must be an object")
        if mode not in {"replace", "merge"}:
            raise ValueError("Import mode must be replace or merge")
        if duplicate_mode not in {"skip", "overwrite", "new_id"}:
            raise ValueError("Duplicate mode must be skip, overwrite or new_id")
        raw_tasks = payload.get("tasks")
        if not isinstance(raw_tasks, list):
            raise ValueError("Import payload must contain a tasks array")
        imported: dict[str, dict[str, Any]] = {}
        for raw in raw_tasks:
            if not isinstance(raw, dict):
                continue
            task = self._normalize_task(raw, create=True)
            self._validate_task(task)
            task_id = task["id"]
            if task_id in imported:
                if duplicate_mode == "skip":
                    continue
                if duplicate_mode == "new_id":
                    task_id = f"{task_id}_{uuid.uuid4().hex[:8]}"
                    task["id"] = task_id
                    task["entity_key"] = task_id
            imported[task_id] = task
        if mode == "merge":
            result = {item["id"]: _deepcopy_json(item) for item in self._tasks}
            for task_id, task in imported.items():
                if task_id in result and duplicate_mode == "skip":
                    continue
                if task_id in result and duplicate_mode == "new_id":
                    new_id = self._unique_import_id(task_id, set(result) | set(imported))
                    task["id"] = new_id
                    task["entity_key"] = new_id
                    result[new_id] = task
                else:
                    result[task_id] = task
            tasks = list(result.values())
        else:
            tasks = list(imported.values())
        raw_history = payload.get("history")
        imported_history = [item for item in raw_history if isinstance(item, dict)] if isinstance(raw_history, list) else []
        history = imported_history if mode == "replace" else imported_history + _deepcopy_json(self._history)
        settings = (
            normalize_settings(deep_merge(default_settings(), payload.get("settings")))
            if isinstance(payload.get("settings"), dict)
            else _deepcopy_json(self._settings)
        )
        notification_state = (
            self._normalize_notification_state(payload.get("notification_state"))
            if isinstance(payload.get("notification_state"), dict)
            else _deepcopy_json(self._notification_state)
        )
        quarantine = (
            [item for item in payload.get("quarantine", []) if isinstance(item, dict)]
            if isinstance(payload.get("quarantine"), list)
            else _deepcopy_json(self._quarantine)
        )
        imported_backups = (
            [self._normalize_backup(item) for item in payload.get("backups", []) if isinstance(item, dict)]
            if isinstance(payload.get("backups"), list)
            else []
        )
        if mode == "replace" and isinstance(payload.get("backups"), list):
            backups = imported_backups
        elif mode == "merge" and imported_backups:
            backup_map = {str(item.get("id")): _deepcopy_json(item) for item in self._backups}
            for backup in imported_backups:
                backup_id = str(backup.get("id"))
                if backup_id in backup_map and duplicate_mode == "skip":
                    continue
                if backup_id in backup_map and duplicate_mode == "new_id":
                    backup["id"] = uuid.uuid4().hex
                backup_map[str(backup["id"])] = backup
            backups = list(backup_map.values())
        else:
            backups = _deepcopy_json(self._backups)
        imported_audit = (
            [item for item in payload.get("audit", []) if isinstance(item, dict)]
            if isinstance(payload.get("audit"), list)
            else []
        )
        if mode == "replace" and isinstance(payload.get("audit"), list):
            audit = imported_audit
        elif mode == "merge" and imported_audit:
            audit_map = {str(item.get("id")): _deepcopy_json(item) for item in self._audit}
            for event in imported_audit:
                event_id = str(event.get("id") or uuid.uuid4().hex)
                if event_id in audit_map and duplicate_mode == "skip":
                    continue
                if event_id in audit_map and duplicate_mode == "new_id":
                    event_id = uuid.uuid4().hex
                event["id"] = event_id
                audit_map[event_id] = event
            audit = list(audit_map.values())
        else:
            audit = _deepcopy_json(self._audit)
        return {
            "tasks": tasks,
            "history": history,
            "backups": backups,
            "settings": settings,
            "notification_state": notification_state,
            "quarantine": quarantine,
            "audit": audit,
        }

    def _orphaned_task_entity_ids(self, tasks: list[dict[str, Any]]) -> list[str]:
        """Return generated task entities that no longer belong to the desired entity set."""
        try:
            from homeassistant.helpers import entity_registry as er

            from .entity_management import (
                desired_task_binary_specs,
                desired_task_sensor_specs,
                is_task_entity_unique_id,
            )

            mode = self._settings.get("task_entities", {}).get("mode", "off")
            desired = set(desired_task_sensor_specs(tasks, mode)) | set(
                desired_task_binary_specs(tasks, mode)
            )
            registry = er.async_get(self.hass)
            return [
                entry.entity_id
                for entry in er.async_entries_for_config_entry(registry, self.entry.entry_id)
                if is_task_entity_unique_id(entry.unique_id) and entry.unique_id not in desired
            ]
        except Exception:  # noqa: BLE001
            _LOGGER.debug("Unable to inspect the entity registry", exc_info=True)
            return []

    def _snapshot_runtime(self) -> dict[str, Any]:
        return {
            "tasks": _deepcopy_json(self._tasks),
            "history": _deepcopy_json(self._history),
            "backups": _deepcopy_json(self._backups),
            "settings": _deepcopy_json(self._settings),
            "notification_state": _deepcopy_json(self._notification_state),
            "quarantine": _deepcopy_json(self._quarantine),
            "audit": _deepcopy_json(self._audit),
            "meta": _deepcopy_json(self._meta),
        }

    def _restore_runtime_snapshot(self, snapshot: dict[str, Any]) -> None:
        self._tasks = snapshot["tasks"]
        self._history = snapshot["history"]
        self._backups = snapshot["backups"]
        self._settings = snapshot["settings"]
        self._notification_state = snapshot["notification_state"]
        self._quarantine = snapshot["quarantine"]
        self._audit = snapshot["audit"]
        self._meta = snapshot["meta"]

    def _task_diff_summary(self, task: dict[str, Any]) -> dict[str, Any]:
        return {
            "id": task.get("id"),
            "name": task.get("name"),
            "category": task.get("category"),
            "priority": task.get("priority"),
        }

    def _find_backup(self, backup_id: str) -> dict[str, Any]:
        for backup in self._backups:
            if backup.get("id") == backup_id:
                return backup
        raise ValueError("Backup not found")

    def _find_quarantine(self, quarantine_id: str) -> dict[str, Any]:
        for record in self._quarantine:
            if record.get("id") == quarantine_id:
                return record
        raise ValueError("Quarantine record not found")

    def _unique_import_id(self, base: str, existing: set[str]) -> str:
        candidate = f"{base}_{uuid.uuid4().hex[:8]}"
        while candidate in existing:
            candidate = f"{base}_{uuid.uuid4().hex[:8]}"
        return candidate

    def _default_recurrence_mode(self) -> str:
        return normalize_recurrence_mode(
            self._settings.get("workflow", {}).get("default_recurrence_mode"),
            "standard",
        )

    def _default_workflow_state(self, recurrence_mode: str = "standard") -> str:
        workflow = self._settings.get("workflow", {})
        return initial_workflow_state(
            normalize_recurrence_mode(recurrence_mode, self._default_recurrence_mode()),
            default_state=str(workflow.get("default_state") or "planned"),
            persistent_state=str(workflow.get("persistent_default_state") or "ready"),
        )

    def _reset_checklist_items(self, checklist: list[dict[str, Any]] | None) -> list[dict[str, Any]]:
        return [{**item, "done": False} for item in (checklist or [])]

    def _normalize_checklist(self, raw: Any) -> list[dict[str, Any]]:
        items: list[dict[str, Any]] = []
        seen_ids: set[str] = set()
        for index, item in enumerate(raw if isinstance(raw, list) else []):
            if isinstance(item, str):
                candidate = {"label": item}
            elif isinstance(item, dict):
                candidate = item
            else:
                continue
            label = str(candidate.get("label") or candidate.get("title") or "").strip()
            if not label:
                continue
            item_id = _slug(str(candidate.get("id") or label or f"item_{index + 1}"))
            base_id = item_id
            suffix = 2
            while item_id in seen_ids:
                item_id = f"{base_id}_{suffix}"
                suffix += 1
            seen_ids.add(item_id)
            items.append(
                {
                    "id": item_id,
                    "label": label,
                    "done": bool(candidate.get("done", False)),
                    "required": bool(candidate.get("required", False)),
                }
            )
        return items

    def _normalize_completion_requirements(self, raw: Any) -> dict[str, bool]:
        defaults = copy.deepcopy(
            self._settings.get("workflow", {}).get("default_completion_requirements", {})
        )
        normalized = {
            "note": bool(defaults.get("note", False)),
            "material": bool(defaults.get("material", False)),
            "cost": bool(defaults.get("cost", False)),
            "performed_by": bool(defaults.get("performed_by", False)),
            "checklist": bool(defaults.get("checklist", False)),
        }
        if isinstance(raw, dict):
            for key in normalized:
                if key in raw:
                    normalized[key] = bool(raw.get(key))
        return normalized

    def _normalize_task(self, raw: dict[str, Any], *, create: bool = False) -> dict[str, Any]:
        now = _utcnow()
        task_type = raw.get("type") if raw.get("type") in TASK_TYPES else "time"
        unit = raw.get("interval_unit") if raw.get("interval_unit") in INTERVAL_UNITS else "days"
        category = raw.get("category") if raw.get("category") in CATEGORIES else "general"
        interval = _safe_float(raw.get("interval", raw.get("max", 90))) or 90
        warning = _safe_float(raw.get("warning_threshold"))
        critical = _safe_float(raw.get("critical_threshold"))
        schedule_mode = raw.get("schedule_mode") if raw.get("schedule_mode") in SCHEDULE_MODES else "interval"
        if task_type == "meter":
            schedule_mode = "interval"
        recurrence_mode = normalize_recurrence_mode(
            raw.get("recurrence_mode") or raw.get("lifecycle_mode"),
            self._default_recurrence_mode(),
        )
        calendar_repeat = raw.get("calendar_repeat") if raw.get("calendar_repeat") in CALENDAR_REPEAT_MODES else "yearly"
        season = raw.get("season") if raw.get("season") in SEASONS else ("autumn" if schedule_mode == "seasonal" else None)
        default_month = {"spring": 3, "summer": 6, "autumn": 9, "winter": 12}.get(season, 1)
        last_done = raw.get("last_done")
        if create and task_type == "time" and schedule_mode == "interval" and not last_done:
            last_done = now
        default_workflow_state = self._default_workflow_state(recurrence_mode)
        workflow_state = normalize_workflow_state(
            raw.get("workflow_state"),
            default="completed" if raw.get("completed_at") else default_workflow_state,
        )
        checklist = self._normalize_checklist(raw.get("checklist"))
        completion_requirements = self._normalize_completion_requirements(raw.get("completion_requirements"))
        execution_stats = normalize_execution_stats(raw.get("execution_stats"))
        task_id = str(raw.get("id") or self._unique_id(str(raw.get("name") or "task")))
        execution_fallback_state = workflow_state
        if schedule_mode != "one_time" and execution_fallback_state in {"completed", "skipped", "canceled"}:
            execution_fallback_state = default_workflow_state
        current_execution = normalize_execution(
            raw.get("current_execution"),
            fallback_state=execution_fallback_state,
            fallback_started_at=last_done or raw.get("created_at") or now,
        )
        task = {
            **raw,
            "id": task_id,
            "entity_key": str(raw.get("entity_key") or task_id),
            "name": str(raw.get("name") or "Unnamed task"),
            "type": task_type,
            "schedule_mode": schedule_mode,
            "calendar_repeat": calendar_repeat,
            "interval": interval,
            "interval_unit": unit,
            "entity_id": raw.get("entity_id") or raw.get("entity") or None,
            "category": category,
            "custom_category": raw.get("custom_category") or None,
            "area_id": raw.get("area_id") or None,
            "area_name": raw.get("area_name") or raw.get("area") or None,
            "priority": int(_safe_float(raw.get("priority")) or 3),
            "icon": raw.get("icon") or "mdi:wrench-clock",
            "icon_color": raw.get("icon_color") or None,
            "card_color": raw.get("card_color") or None,
            "enabled": raw.get("enabled", True) is not False,
            "warning_threshold": warning if warning is not None else DEFAULT_WARNING_THRESHOLD,
            "critical_threshold": critical if critical is not None else DEFAULT_CRITICAL_THRESHOLD,
            "description": raw.get("description") or "",
            "position": int(_safe_float(raw.get("position")) if _safe_float(raw.get("position")) is not None else self._next_position()),
            "baseline": _safe_float(raw.get("baseline")) or 0,
            "deleted": raw.get("deleted", False) is True,
            "created_at": raw.get("created_at") or now,
            "updated_at": raw.get("updated_at") or now,
            "last_done": last_done,
            "last_scheduled_due": raw.get("last_scheduled_due") or None,
            "completed_at": raw.get("completed_at") or None,
            "archived_at": raw.get("archived_at") or raw.get("completed_at") or None,
            "due_date": raw.get("due_date") or None,
            "fixed_month": min(12, max(1, int(_safe_float(raw.get("fixed_month")) or default_month))),
            "fixed_day": min(31, max(1, int(_safe_float(raw.get("fixed_day")) or 1))),
            "season": season,
            "snoozed_until": raw.get("snoozed_until") or None,
            "tags": [str(tag).strip() for tag in raw.get("tags", []) if str(tag).strip()],
            "template_id": raw.get("template_id") or None,
            "starter_pack": raw.get("starter_pack") or None,
            "workflow_state": workflow_state,
            "recurrence_mode": recurrence_mode,
            "checklist": checklist,
            "completion_requirements": completion_requirements,
            "current_execution": current_execution,
            "execution_stats": execution_stats,
            "notifications": normalize_task_notification_settings(raw.get("notifications")),
        }
        task["priority"] = min(5, max(1, task["priority"]))
        task["warning_threshold"] = min(99, max(1, float(task["warning_threshold"])))
        task["critical_threshold"] = min(100, max(task["warning_threshold"] + 1, float(task["critical_threshold"])))
        if schedule_mode != "one_time":
            task["due_date"] = None
            task["completed_at"] = None
            task["archived_at"] = None
            if schedule_mode != "fixed_date":
                task["calendar_repeat"] = "yearly"
        if schedule_mode not in {"fixed_date", "seasonal"}:
            task["last_scheduled_due"] = None
        if schedule_mode != "seasonal":
            task["season"] = None
        if schedule_mode != "one_time" and task.get("workflow_state") in {"completed", "skipped", "canceled"}:
            task["workflow_state"] = default_workflow_state
        if schedule_mode == "one_time" and task.get("completed_at"):
            task["workflow_state"] = "completed"
        task["current_execution"]["state"] = task["workflow_state"]
        if task["workflow_state"] in OPEN_WORKFLOW_STATES:
            task["current_execution"]["completed_at"] = None
        elif not task["current_execution"].get("completed_at"):
            task["current_execution"]["completed_at"] = task.get("completed_at") or task.get("updated_at") or now
        return task

    def _validate_task(self, task: dict[str, Any]) -> None:
        mode = task.get("schedule_mode", "interval")
        if mode == "one_time" and not task.get("completed_at") and _parse_dt(task.get("due_date")) is None:
            raise ValueError("One-time tasks require a valid due_date")
        if mode == "fixed_date":
            if task.get("calendar_repeat") not in CALENDAR_REPEAT_MODES:
                raise ValueError("Invalid calendar repeat mode")
            if not 1 <= int(task.get("fixed_day", 1)) <= 31:
                raise ValueError("Fixed day must be between 1 and 31")
            if task.get("calendar_repeat") == "yearly" and not 1 <= int(task.get("fixed_month", 1)) <= 12:
                raise ValueError("Fixed month must be between 1 and 12")
        if mode == "seasonal" and task.get("season") not in SEASONS:
            raise ValueError("Invalid season")
        if task.get("recurrence_mode") not in RECURRENCE_MODES:
            raise ValueError("Invalid recurrence mode")
        if task.get("workflow_state") not in WORKFLOW_STATES:
            raise ValueError("Invalid workflow state")
        requirements = task.get("completion_requirements") or {}
        if not isinstance(requirements, dict):
            raise ValueError("Invalid completion requirements")
        execution = task.get("current_execution")
        if not isinstance(execution, dict) or execution.get("state") not in WORKFLOW_STATES:
            raise ValueError("Invalid execution state")
        for item in task.get("checklist", []) or []:
            if not item.get("label"):
                raise ValueError("Checklist items require labels")

    def _unique_id(self, name: str) -> str:
        base = _slug(name)
        existing = {task.get("id") for task in self._tasks}
        if base not in existing:
            return base
        idx = 2
        while f"{base}_{idx}" in existing:
            idx += 1
        return f"{base}_{idx}"

    def _next_position(self) -> int:
        if not self._tasks:
            return 0
        return max(int(task.get("position", 0)) for task in self._tasks) + 1

    def _find_task(self, task_id: str) -> dict[str, Any] | None:
        return next((task for task in self._tasks if task.get("id") == task_id), None)

    def _find_task_index(self, task_id: str) -> int:
        for idx, task in enumerate(self._tasks):
            if task.get("id") == task_id:
                return idx
        raise ValueError("Task not found")

    def _find_history_event(self, event_id: str) -> dict[str, Any]:
        for event in self._history:
            if event.get("id") == event_id:
                return event
        raise ValueError("History event not found")

    def _current_execution(self, task: dict[str, Any]) -> dict[str, Any]:
        return normalize_execution(
            task.get("current_execution"),
            fallback_state=task.get("workflow_state") or self._default_workflow_state(task.get("recurrence_mode", "standard")),
            fallback_started_at=task.get("created_at") or _utcnow(),
        )

    def _refresh_execution_state(self, task: dict[str, Any]) -> None:
        default_state = self._default_workflow_state(task.get("recurrence_mode", "standard"))
        fallback_state = (
            "completed"
            if task.get("schedule_mode") == "one_time" and task.get("completed_at")
            else default_state
        )
        task["current_execution"] = normalize_execution(
            task.get("current_execution"),
            fallback_state=fallback_state,
            fallback_started_at=task.get("created_at") or _utcnow(),
        )
        if task.get("schedule_mode") != "one_time" and task.get("workflow_state") not in OPEN_WORKFLOW_STATES:
            task["workflow_state"] = default_state
        task["current_execution"]["state"] = task.get("workflow_state") or default_state
        if task["current_execution"]["state"] in OPEN_WORKFLOW_STATES:
            task["current_execution"]["completed_at"] = None

    def _next_cycle_state(self, task: dict[str, Any]) -> str:
        return self._default_workflow_state(task.get("recurrence_mode", "standard"))

    def _begin_new_cycle(self, task: dict[str, Any], *, started_at: str | None = None) -> None:
        previous = self._current_execution(task)
        task["workflow_state"] = self._next_cycle_state(task)
        task["current_execution"] = next_execution(
            previous,
            state=task["workflow_state"],
            started_at=started_at or _utcnow(),
        )
        if self._settings.get("workflow", {}).get("reset_checklist_on_completion", True):
            task["checklist"] = self._reset_checklist_items(task.get("checklist"))

    def _increment_execution_stat(self, task: dict[str, Any], key: str) -> None:
        stats = normalize_execution_stats(task.get("execution_stats"))
        stats[key] = stats.get(key, 0) + 1
        task["execution_stats"] = stats

    def _completion_attachment_refs(self, attachment_ids: list[str] | None) -> list[dict[str, Any]]:
        refs: list[dict[str, Any]] = []
        for attachment_id in attachment_ids or []:
            record = self._attachments.get(str(attachment_id))
            if not isinstance(record, dict):
                continue
            refs.append(
                {
                    "id": record.get("id"),
                    "filename": record.get("filename"),
                    "mime_type": record.get("mime_type"),
                    "size": record.get("size"),
                }
            )
            if len(refs) >= MAX_ATTACHMENTS_PER_COMPLETION:
                break
        return refs

    def _user_custom_templates(self) -> list[dict[str, Any]]:
        return list(self._settings.get("user_templates", {}).get("custom", []))

    async def async_update_template_favorites(self, favorites: list[str]) -> dict[str, Any]:
        async with self._lock:
            block = self._settings.setdefault("user_templates", {"favorites": [], "custom": []})
            block["favorites"] = list(dict.fromkeys(str(item) for item in favorites if item))[:500]
            self._settings = normalize_settings(self._settings)
            await self._save_everything()
        await self.async_broadcast_update(reason="update_template_favorites")
        return self.settings.get("user_templates", {})

    async def async_save_custom_template(self, template: dict[str, Any]) -> dict[str, Any]:
        async with self._lock:
            block = self._settings.setdefault("user_templates", {"favorites": [], "custom": []})
            custom = list(block.get("custom", []))
            normalized = normalize_custom_template(template, create=not any(item.get("id") == template.get("id") for item in custom))
            replaced = False
            for index, item in enumerate(custom):
                if item.get("id") == normalized["id"]:
                    normalized["created_at"] = item.get("created_at") or normalized["created_at"]
                    custom[index] = normalized
                    replaced = True
                    break
            if not replaced:
                custom.append(normalized)
            block["custom"] = custom[:200]
            self._settings = normalize_settings(self._settings)
            await self._save_everything()
        await self.async_broadcast_update(reason="save_custom_template")
        return normalized

    async def async_delete_custom_template(self, template_id: str) -> dict[str, Any]:
        async with self._lock:
            block = self._settings.setdefault("user_templates", {"favorites": [], "custom": []})
            block["custom"] = [item for item in block.get("custom", []) if item.get("id") != template_id]
            block["favorites"] = [item for item in block.get("favorites", []) if item != template_id]
            self._settings = normalize_settings(self._settings)
            await self._save_everything()
        await self.async_broadcast_update(reason="delete_custom_template")
        return {"ok": True}

    async def async_save_template_from_task(self, task_id: str) -> dict[str, Any]:
        task = self._find_task(task_id)
        if not task:
            raise ValueError("Task not found")
        return await self.async_save_custom_template(template_from_task(task))

    async def async_preview_user_template_import(self, payload: Any) -> dict[str, Any]:
        return preview_template_import(payload, self._user_custom_templates())

    async def async_import_user_templates(self, payload: Any, *, skip_duplicates: bool = True) -> dict[str, Any]:
        async with self._lock:
            block = self._settings.setdefault("user_templates", {"favorites": [], "custom": []})
            before = len(block.get("custom", []))
            block["custom"] = apply_template_import(payload, block.get("custom", []), skip_duplicates=skip_duplicates)
            self._settings = normalize_settings(self._settings)
            await self._save_everything()
            added = len(block.get("custom", [])) - before
        await self.async_broadcast_update(reason="import_user_templates")
        return {"added": added, "total": len(block.get("custom", []))}

    async def async_update_task_note(self, task_id: str, note_id: str, text: str) -> dict[str, Any]:
        async with self._lock:
            idx = self._find_task_index(task_id)
            notes = [copy.deepcopy(item) for item in self._tasks[idx].get("notes", []) if isinstance(item, dict)]
            found = False
            for note in notes:
                if note.get("id") == note_id:
                    note["text"] = str(text or "").strip()
                    note["updated_at"] = _utcnow()
                    found = True
                    break
            if not found:
                raise ValueError("Note not found")
            self._tasks[idx]["notes"] = notes
            self._tasks[idx]["updated_at"] = _utcnow()
            await self._async_save_all()
        await self.async_broadcast_update(reason="update_task_note")
        return self._tasks[idx]

    async def async_delete_task_note(self, task_id: str, note_id: str) -> dict[str, Any]:
        async with self._lock:
            idx = self._find_task_index(task_id)
            notes = [copy.deepcopy(item) for item in self._tasks[idx].get("notes", []) if isinstance(item, dict)]
            filtered = [item for item in notes if item.get("id") != note_id]
            if len(filtered) == len(notes):
                raise ValueError("Note not found")
            self._tasks[idx]["notes"] = filtered
            self._tasks[idx]["updated_at"] = _utcnow()
            await self._async_save_all()
        await self.async_broadcast_update(reason="delete_task_note")
        return self._tasks[idx]

    async def async_store_completion_attachment(self, payload: dict[str, Any]) -> dict[str, Any]:
        async with self._lock:
            attachment = normalize_attachment(payload)
            self._attachments[attachment["id"]] = attachment
            await self._attachments_store.async_save({"schema_version": DATA_SCHEMA_VERSION, "attachments": self._attachments})
        return {
            "id": attachment["id"],
            "filename": attachment["filename"],
            "mime_type": attachment["mime_type"],
            "size": attachment["size"],
        }

    async def async_get_statistics(self, year: int | None = None) -> dict[str, Any]:
        tasks = [task for task in self._tasks if not task.get("deleted")]
        return build_statistics(self.history, tasks, year=year)

    async def async_get_attachment(self, attachment_id: str) -> dict[str, Any] | None:
        record = self._attachments.get(str(attachment_id))
        return _deepcopy_json(record) if isinstance(record, dict) else None
