from __future__ import annotations

import copy
import uuid
from datetime import UTC, datetime
from typing import Any

from .const import (
    EXECUTION_OUTCOMES,
    LEGACY_TERMINAL_STATES,
    LEGACY_WORKFLOW_STATE_MAP,
    WORKFLOW_STATES,
)

DEFAULT_WORKFLOW_STATE = "open"


def utcnow() -> str:
    return datetime.now(UTC).isoformat()


def normalize_workflow_state(value: Any, *, default: str = DEFAULT_WORKFLOW_STATE) -> str:
    """Coerce a stored or user-supplied state into the three-state model."""
    fallback = default if default in WORKFLOW_STATES else DEFAULT_WORKFLOW_STATE
    candidate = str(value or fallback)
    if candidate in WORKFLOW_STATES:
        return candidate
    if candidate in LEGACY_TERMINAL_STATES:
        return DEFAULT_WORKFLOW_STATE
    return LEGACY_WORKFLOW_STATE_MAP.get(candidate, fallback)


def normalize_outcome(value: Any) -> str | None:
    """Return a valid run outcome, or None while the run is unfinished."""
    candidate = str(value or "")
    return candidate if candidate in EXECUTION_OUTCOMES else None


def new_execution(
    *,
    state: str = DEFAULT_WORKFLOW_STATE,
    started_at: str | None = None,
    sequence: int = 1,
    reset_count: int = 0,
) -> dict[str, Any]:
    started = started_at or utcnow()
    return {
        "id": uuid.uuid4().hex,
        "sequence": max(1, int(sequence or 1)),
        "state": normalize_workflow_state(state),
        "outcome": None,
        "started_at": started,
        "updated_at": started,
        "completed_at": None,
        "reset_count": max(0, int(reset_count or 0)),
    }


def normalize_execution(
    raw: dict[str, Any] | None,
    *,
    fallback_state: str = DEFAULT_WORKFLOW_STATE,
    fallback_started_at: str | None = None,
    fallback_sequence: int = 1,
    fallback_outcome: str | None = None,
) -> dict[str, Any]:
    candidate = copy.deepcopy(raw or {})
    started = str(candidate.get("started_at") or fallback_started_at or utcnow())
    sequence = max(1, int(candidate.get("sequence") or fallback_sequence or 1))
    raw_state = str(candidate.get("state") or "")
    state = normalize_workflow_state(raw_state, default=fallback_state)

    # A pre-v3 execution encoded its result in `state`; recover it as an outcome.
    recovered = raw_state if raw_state in LEGACY_TERMINAL_STATES else None
    outcome = (
        normalize_outcome(candidate.get("outcome"))
        or recovered
        or normalize_outcome(fallback_outcome)
    )

    completed_at = candidate.get("completed_at")
    if outcome is None:
        completed_at = None
    elif not completed_at:
        completed_at = str(candidate.get("updated_at") or started)
    return {
        "id": str(candidate.get("id") or uuid.uuid4().hex),
        "sequence": sequence,
        "state": state,
        "outcome": outcome,
        "started_at": started,
        "updated_at": str(candidate.get("updated_at") or started),
        "completed_at": completed_at,
        "reset_count": max(0, int(candidate.get("reset_count") or 0)),
    }


def finish_execution(
    execution: dict[str, Any] | None,
    *,
    outcome: str,
    completed_at: str | None = None,
) -> dict[str, Any]:
    """Stamp a result on an ending run, before a successor replaces it."""
    resolved = normalize_outcome(outcome)
    if resolved is None:
        raise ValueError(f"Unknown execution outcome: {outcome!r}")
    finished = normalize_execution(execution)
    stamp = completed_at or utcnow()
    finished["outcome"] = resolved
    finished["completed_at"] = stamp
    finished["updated_at"] = stamp
    return finished


def next_execution(
    previous: dict[str, Any] | None,
    *,
    state: str = DEFAULT_WORKFLOW_STATE,
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
