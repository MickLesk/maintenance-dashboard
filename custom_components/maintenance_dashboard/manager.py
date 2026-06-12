from __future__ import annotations

import asyncio
import copy
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

from .const import (
    BACKUP_RETENTION,
    CALENDAR_REPEAT_MODES,
    CATEGORIES,
    DEFAULT_CRITICAL_THRESHOLD,
    DEFAULT_WARNING_THRESHOLD,
    DOMAIN,
    EVENT_UPDATED,
    HISTORY_RETENTION_DEFAULT,
    INTERVAL_UNITS,
    SCHEDULE_MODES,
    SEASONS,
    STORE_BACKUPS_KEY,
    STORE_HISTORY_KEY,
    STORE_NOTIFICATION_STATE_KEY,
    STORE_SETTINGS_KEY,
    STORE_TASKS_KEY,
    STORE_VERSION,
    DASHBOARD_URL,
    TASK_TYPES,
)
from .templates import TEMPLATES, TEMPLATE_PACKS
from .settings import default_settings, deep_merge, normalize_settings
from .scheduling import evaluate_schedule
from .notifications import (
    build_digest_message,
    format_task_notification,
    notify_payload,
    persistent_notification_payload,
    service_target,
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
        self._tasks: list[dict[str, Any]] = []
        self._history: list[dict[str, Any]] = []
        self._backups: list[dict[str, Any]] = []
        self._settings: dict[str, Any] = default_settings()
        self._notification_state: dict[str, Any] = {"version": 1, "last_sent": {}}
        self._listeners: list[Listener] = []
        self._lock = asyncio.Lock()

    async def async_load(self) -> None:
        tasks_payload = await self._tasks_store.async_load() or {}
        history_payload = await self._history_store.async_load() or {}
        backups_payload = await self._backups_store.async_load() or {}
        settings_payload = await self._settings_store.async_load() or {}
        notification_state_payload = await self._notification_state_store.async_load() or {}

        self._tasks = [self._normalize_task(item) for item in tasks_payload.get("tasks", []) if isinstance(item, dict)]
        self._history = [item for item in history_payload.get("history", []) if isinstance(item, dict)]
        self._backups = [item for item in backups_payload.get("backups", []) if isinstance(item, dict)]
        self._settings = normalize_settings(deep_merge(default_settings(), settings_payload))
        self._notification_state = deep_merge({"version": 1, "last_sent": {}}, notification_state_payload)

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
    def settings(self) -> dict[str, Any]:
        return _deepcopy_json(self._settings)

    async def async_get_settings(self) -> dict[str, Any]:
        return self.settings

    async def async_update_settings(self, patch: dict[str, Any]) -> dict[str, Any]:
        if not isinstance(patch, dict):
            raise ValueError("Settings patch must be an object")
        async with self._lock:
            self._settings = normalize_settings(deep_merge(self._settings, patch))
            await self._settings_store.async_save(self._settings)
        await self.async_broadcast_update(reason="update_settings")
        return self.settings

    async def async_get_state(self, *, include_deleted: bool = True) -> dict[str, Any]:
        tasks = self.tasks if include_deleted else [task for task in self.tasks if not task.get("deleted")]
        runtime = {task["id"]: self.runtime_for_task(task).as_dict() for task in tasks}
        return {
            "version": STORE_VERSION,
            "tasks": tasks,
            "history": self.history,
            "runtime": runtime,
            "diagnostics": self.get_diagnostics(),
            "backups": [{k: b.get(k) for k in ("id", "created_at", "reason", "task_count", "history_count")} for b in self._backups],
            "templates": TEMPLATES,
            "template_packs": TEMPLATE_PACKS,
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
        material: str | None = None,
        cost: float | None = None,
        currency: str | None = None,
        performed_by: str | None = None,
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
            await self._async_backup("before_mark_done")
            if task.get("type") == "meter" and task.get("entity_id"):
                state = self.hass.states.get(task["entity_id"])
                value = _safe_float(state.state if state else None)
                if value is not None:
                    task["baseline"] = value
            task["last_done"] = done.isoformat()
            if task.get("schedule_mode") in {"fixed_date", "seasonal"} and runtime.get("due_at"):
                task["last_scheduled_due"] = runtime["due_at"]
            if task.get("schedule_mode") == "one_time":
                task["completed_at"] = done.isoformat()
                task["archived_at"] = done.isoformat()
            task.pop("snoozed_until", None)
            task["updated_at"] = _utcnow()
            completion = {
                "note": (note or "").strip() or None,
                "material": (material or "").strip() or None,
                "cost": round(parsed_cost, 2) if parsed_cost is not None else None,
                "currency": (currency or "EUR").strip().upper() or "EUR",
                "performed_by": (performed_by or "").strip() or None,
            }
            event = self._append_history(
                "completed",
                task,
                summary="Task marked done",
                previous_state=old,
                new_state=task,
                details={"runtime_before": runtime, "completion": completion, **completion},
            )
            await self._async_save_all()
        await self.async_broadcast_update(reason="mark_done")
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
            task["updated_at"] = _utcnow()
            self._append_history(
                "reactivated",
                task,
                summary="One-time task reactivated",
                previous_state=old,
                new_state=task,
            )
            await self._async_save_all()
        await self.async_broadcast_update(reason="reactivate_task")
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

    async def async_restore_backup(self, backup_id: str) -> None:
        async with self._lock:
            backup = next((b for b in self._backups if b.get("id") == backup_id), None)
            if not backup:
                raise ValueError("Backup not found")
            await self._async_backup("before_restore_backup")
            self._tasks = [self._normalize_task(task) for task in backup.get("tasks", [])]
            self._history = [event for event in backup.get("history", []) if isinstance(event, dict)]
            await self._async_save_all()
        await self.async_broadcast_update(reason="restore_backup")

    async def async_import_tasks(self, tasks: list[dict[str, Any]]) -> None:
        async with self._lock:
            await self._async_backup("before_import")
            normalized = [self._normalize_task(task, create=True) for task in tasks]
            for task in normalized:
                self._validate_task(task)
            self._tasks = normalized
            await self._async_save_all()
        await self.async_broadcast_update(reason="import")

    def get_diagnostics_payload(self) -> dict[str, Any]:
        summary = self.get_summary()
        runtime = {task["id"]: self.runtime_for_task(task).as_dict() for task in self._tasks}
        invalid_tasks = self.get_diagnostics()
        return {
            "integration_version": self.entry.version if hasattr(self.entry, "version") else None,
            "store_version": STORE_VERSION,
            "task_count": len(self._tasks),
            "active_task_count": summary.get("active", 0),
            "history_count": len(self._history),
            "backup_count": len(self._backups),
            "summary": summary,
            "diagnostics": invalid_tasks,
            "runtime": runtime,
            "entity_count": len(self.hass.states.async_entity_ids()),
            "settings": self.settings,
            "notification_state": _deepcopy_json(self._notification_state),
        }

    async def async_export_data(self) -> dict[str, Any]:
        return {
            "version": STORE_VERSION,
            "exported_at": _utcnow(),
            "tasks": self.tasks,
            "history": self.history,
            "backups": self.backups,
            "settings": self.settings,
        }

    async def async_import_data(self, payload: dict[str, Any]) -> dict[str, Any]:
        if not isinstance(payload, dict):
            raise ValueError("Import payload must be an object")
        tasks = payload.get("tasks")
        history = payload.get("history", [])
        if not isinstance(tasks, list):
            raise ValueError("Import payload must contain a tasks array")
        async with self._lock:
            await self._async_backup("before_import_data")
            normalized = [self._normalize_task(task, create=True) for task in tasks if isinstance(task, dict)]
            for task in normalized:
                self._validate_task(task)
            ids = [task["id"] for task in normalized]
            if len(ids) != len(set(ids)):
                raise ValueError("Import contains duplicate task IDs")
            self._tasks = normalized
            if isinstance(history, list):
                self._history = [event for event in history if isinstance(event, dict)]
            if isinstance(payload.get("settings"), dict):
                self._settings = normalize_settings(deep_merge(default_settings(), payload["settings"]))
                await self._settings_store.async_save(self._settings)
            self._append_history("imported", {"id": "global", "name": "Import"}, summary="Data imported")
            await self._async_save_all()
        await self.async_broadcast_update(reason="import_data")
        return {"ok": True, "task_count": len(self._tasks), "history_count": len(self._history)}

    async def async_send_notification(self, service: str | None = None, message: str | None = None) -> dict[str, Any]:
        target_service = service_target(service, self._settings.get("notifications", {}).get("notify_service"))
        msg = message or self._notification_digest_message()
        await self._async_call_notify_service(target_service, msg, "Maintenance Dashboard")
        return {"ok": True, "service": target_service}

    async def async_test_notification(self, service: str | None = None) -> dict[str, Any]:
        return await self.async_send_notification(service, "Maintenance Dashboard test notification")

    async def async_send_digest(self, service: str | None = None, *, include_ok: bool = False, include_snoozed: bool = False) -> dict[str, Any]:
        target_service = service_target(service, self._settings.get("notifications", {}).get("notify_service"))
        message = self._notification_digest_message(include_ok=include_ok, include_snoozed=include_snoozed)
        await self._async_call_notify_service(target_service, message, "Maintenance Digest")
        self._notification_state.setdefault("last_sent", {})["digest"] = _today_key()
        await self._notification_state_store.async_save(self._notification_state)
        return {"ok": True, "service": target_service}

    async def async_notify_task(self, task_id: str, service: str | None = None) -> dict[str, Any]:
        task = self._find_task(task_id)
        if not task:
            raise ValueError("Task not found")
        runtime = self.runtime_for_task(task)
        target_service = service_target(service, self._settings.get("notifications", {}).get("notify_service"))
        message = self._format_task_notification(task, runtime)
        await self._async_call_notify_service(target_service, message, f"Maintenance: {task.get('name')}")
        key = f"task:{task_id}:{runtime.status}"
        self._notification_state.setdefault("last_sent", {})[key] = _today_key()
        await self._notification_state_store.async_save(self._notification_state)
        return {"ok": True, "service": target_service, "task_id": task_id}

    async def async_notify_due_tasks(self, service: str | None = None, statuses: list[str] | None = None) -> dict[str, Any]:
        wanted = set(statuses or ["warning", "critical", "overdue"])
        sent = 0
        for task in [t for t in self._tasks if not t.get("deleted") and t.get("enabled", True)]:
            runtime = self.runtime_for_task(task)
            if runtime.status not in wanted:
                continue
            if runtime.status == "snoozed" and not self._settings.get("notifications", {}).get("include_snoozed"):
                continue
            await self.async_notify_task(task["id"], service)
            sent += 1
        return {"ok": True, "sent": sent}

    async def _async_call_notify_service(self, target_service: str, message: str, title: str) -> None:
        domain, _, service_name = target_service.partition(".")
        if not domain or not service_name:
            raise ValueError("Notify service must use domain.service format")
        data = persistent_notification_payload(message) if target_service == "persistent_notification.create" else notify_payload(message)
        data["title"] = title
        if self._settings.get("notifications", {}).get("include_dashboard_link", True):
            data["data"] = {"url": DASHBOARD_URL}
        await self.hass.services.async_call(domain, service_name, data, blocking=False)

    def _notification_digest_message(self, *, include_ok: bool = False, include_snoozed: bool = False) -> str:
        summary = self.get_summary()
        task_lines = []
        for task in [t for t in self._tasks if not t.get("deleted") and t.get("enabled", True)]:
            runtime = self.runtime_for_task(task)
            if runtime.status in {"critical", "overdue", "warning", "unavailable"} or (include_ok and runtime.status == "ok") or (include_snoozed and runtime.status == "snoozed"):
                task_lines.append(f"- {task.get('name')}: {runtime.status}")
        return build_digest_message(
            summary,
            task_lines,
            include_dashboard_link=self._settings.get("notifications", {}).get("include_dashboard_link", True),
        )

    def _format_task_notification(self, task: dict[str, Any], runtime: RuntimeResult) -> str:
        return format_task_notification(
            task,
            status=runtime.status,
            remaining_label=self.remaining_label(task, runtime),
            include_dashboard_link=self._settings.get("notifications", {}).get("include_dashboard_link", True),
        )

    def task_summary(self, task: dict[str, Any] | None, runtime: RuntimeResult | None = None) -> dict[str, Any] | None:
        if not task:
            return None
        runtime = runtime or self.runtime_for_task(task)
        return {
            "id": task.get("id"),
            "name": task.get("name"),
            "status": runtime.status,
            "category": task.get("category"),
            "area": task.get("area_name") or task.get("area_id"),
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
            "dashboard_url": DASHBOARD_URL,
        }

    def priority_label(self, priority: Any) -> str:
        return {1: "Low", 2: "Normal", 3: "Important", 4: "High", 5: "Critical"}.get(int(_safe_float(priority) or 3), "Important")

    def remaining_label(self, task: dict[str, Any], runtime: RuntimeResult) -> str:
        if runtime.remaining is None:
            return "unknown"
        unit = "days" if task.get("schedule_mode", "interval") != "interval" else task.get("interval_unit", "days")
        return f"{runtime.remaining:.0f} {unit} remaining"

    async def async_maybe_send_scheduled_notifications(self) -> None:
        notifications = self._settings.get("notifications", {})
        if not notifications.get("enabled") or not notifications.get("daily_digest"):
            return
        now = datetime.now(UTC)
        configured = str(notifications.get("digest_time") or "08:00")[:5]
        current = now.strftime("%H:%M")
        if current != configured:
            return
        today = _today_key()
        if self._notification_state.setdefault("last_sent", {}).get("digest") == today:
            return
        await self.async_send_digest(include_snoozed=bool(notifications.get("include_snoozed")))

    async def _async_backup(self, reason: str) -> None:
        backup = {
            "id": uuid.uuid4().hex,
            "created_at": _utcnow(),
            "reason": reason,
            "task_count": len(self._tasks),
            "history_count": len(self._history),
            "tasks": _deepcopy_json(self._tasks),
            "history": _deepcopy_json(self._history),
        }
        self._backups.insert(0, backup)
        self._backups = self._backups[:BACKUP_RETENTION]
        await self._backups_store.async_save({"version": STORE_VERSION, "backups": self._backups})

    async def _async_save_all(self) -> None:
        retention = int(self.entry.options.get("history_retention", HISTORY_RETENTION_DEFAULT))
        self._history = self._history[: max(retention, 50)]
        await self._tasks_store.async_save({"version": STORE_VERSION, "tasks": self._tasks})
        await self._history_store.async_save({"version": STORE_VERSION, "history": self._history})
        await self._backups_store.async_save({"version": STORE_VERSION, "backups": self._backups})

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
        return event

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
        calendar_repeat = raw.get("calendar_repeat") if raw.get("calendar_repeat") in CALENDAR_REPEAT_MODES else "yearly"
        season = raw.get("season") if raw.get("season") in SEASONS else ("autumn" if schedule_mode == "seasonal" else None)
        default_month = {"spring": 3, "summer": 6, "autumn": 9, "winter": 12}.get(season, 1)
        last_done = raw.get("last_done")
        if create and task_type == "time" and schedule_mode == "interval" and not last_done:
            last_done = now
        task = {
            **raw,
            "id": str(raw.get("id") or self._unique_id(str(raw.get("name") or "task"))),
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
