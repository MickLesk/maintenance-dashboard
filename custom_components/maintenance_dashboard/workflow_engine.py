from __future__ import annotations

import copy
import uuid
from datetime import UTC, datetime
from typing import Any

from .const import OPEN_WORKFLOW_STATES, RECURRENCE_MODES, WORKFLOW_STATES


def utcnow() -> str:
    return datetime.now(UTC).isoformat()


def normalize_recurrence_mode(value: Any, default: str = "standard") -> str:
    candidate = str(value or default)
    return candidate if candidate in RECURRENCE_MODES else default


def normalize_workflow_state(
    value: Any,
    *,
    default: str = "planned",
    allow_terminal: bool = True,
) -> str:
    candidate = str(value or default)
    allowed = WORKFLOW_STATES if allow_terminal else OPEN_WORKFLOW_STATES
    return candidate if candidate in allowed else default


def initial_workflow_state(
    recurrence_mode: str,
    *,
    default_state: str = "planned",
    persistent_state: str = "ready",
) -> str:
    normalized_mode = normalize_recurrence_mode(recurrence_mode, "standard")
    if normalized_mode == "persistent":
        return normalize_workflow_state(
            persistent_state,
            default=default_state,
            allow_terminal=False,
        )
    return normalize_workflow_state(default_state, default="planned", allow_terminal=False)


def new_execution(
    *,
    state: str,
    started_at: str | None = None,
    sequence: int = 1,
    reset_count: int = 0,
) -> dict[str, Any]:
    started = started_at or utcnow()
    return {
        "id": uuid.uuid4().hex,
        "sequence": max(1, int(sequence or 1)),
        "state": normalize_workflow_state(state, default="planned"),
        "started_at": started,
        "updated_at": started,
        "completed_at": None,
        "reset_count": max(0, int(reset_count or 0)),
    }


def normalize_execution(
    raw: dict[str, Any] | None,
    *,
    fallback_state: str,
    fallback_started_at: str | None = None,
    fallback_sequence: int = 1,
) -> dict[str, Any]:
    candidate = copy.deepcopy(raw or {})
    started = str(candidate.get("started_at") or fallback_started_at or utcnow())
    sequence = max(1, int(candidate.get("sequence") or fallback_sequence or 1))
    state = normalize_workflow_state(
        candidate.get("state"),
        default=fallback_state,
    )
    completed_at = candidate.get("completed_at")
    if state in OPEN_WORKFLOW_STATES:
        completed_at = None
    return {
        "id": str(candidate.get("id") or uuid.uuid4().hex),
        "sequence": sequence,
        "state": state,
        "started_at": started,
        "updated_at": str(candidate.get("updated_at") or started),
        "completed_at": completed_at,
        "reset_count": max(0, int(candidate.get("reset_count") or 0)),
    }


def next_execution(
    previous: dict[str, Any] | None,
    *,
    state: str,
    started_at: str | None = None,
) -> dict[str, Any]:
    previous_sequence = 0
    if isinstance(previous, dict):
        previous_sequence = max(0, int(previous.get("sequence") or 0))
    return new_execution(
        state=state,
        started_at=started_at,
        sequence=previous_sequence + 1,
    )


def normalize_execution_stats(raw: dict[str, Any] | None) -> dict[str, int]:
    candidate = raw if isinstance(raw, dict) else {}
    return {
        "completed": max(0, int(candidate.get("completed") or 0)),
        "skipped": max(0, int(candidate.get("skipped") or 0)),
        "restarted": max(0, int(candidate.get("restarted") or 0)),
        "resets": max(0, int(candidate.get("resets") or 0)),
        "canceled": max(0, int(candidate.get("canceled") or 0)),
    }
