from __future__ import annotations

import calendar
from dataclasses import dataclass
from datetime import UTC, datetime, timedelta
from typing import Any

SEASON_DEFAULTS: dict[str, tuple[int, int]] = {
    "spring": (3, 1),
    "summer": (6, 1),
    "autumn": (9, 1),
    "winter": (12, 1),
}


@dataclass(slots=True)
class ScheduleEvaluation:
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


def parse_datetime(value: Any) -> datetime | None:
    if not value:
        return None
    try:
        parsed = datetime.fromisoformat(str(value).replace("Z", "+00:00"))
    except (TypeError, ValueError):
        return None
    if parsed.tzinfo is None:
        parsed = parsed.replace(tzinfo=UTC)
    return parsed.astimezone(UTC)


def clamp_date(year: int, month: int, day: int) -> datetime:
    month = min(12, max(1, int(month)))
    max_day = calendar.monthrange(year, month)[1]
    day = min(max_day, max(1, int(day)))
    return datetime(year, month, day, tzinfo=UTC)


def add_months(value: datetime, months: int) -> datetime:
    total = value.year * 12 + value.month - 1 + months
    year, month_index = divmod(total, 12)
    return clamp_date(year, month_index + 1, value.day)


def interval_seconds(value: float, unit: str) -> float:
    multiplier = {
        "hours": 3600,
        "days": 86400,
        "weeks": 604800,
        "months": 2592000,
    }.get(unit, 86400)
    return float(value) * multiplier


def status_for(progress: float, remaining: float, warning: float, critical: float) -> str:
    if remaining < 0:
        return "overdue"
    if progress >= critical:
        return "critical"
    if progress >= warning:
        return "warning"
    return "ok"


def _progress(start: datetime, due: datetime, now: datetime) -> tuple[float, float, float, float]:
    total_seconds = max(1.0, (due - start).total_seconds())
    elapsed_seconds = max(0.0, (now - start).total_seconds())
    progress = max(0.0, min(200.0, elapsed_seconds / total_seconds * 100.0))
    remaining_days = (due - now).total_seconds() / 86400
    return elapsed_seconds / 86400, total_seconds / 86400, progress, remaining_days


def _monthly_occurrence(
    now: datetime,
    day: int,
    last_done: datetime | None,
    completed_due: datetime | None,
) -> tuple[datetime, datetime]:
    candidate = clamp_date(now.year, now.month, day)
    if completed_due and completed_due >= candidate:
        candidate = add_months(completed_due, 1)
    elif not completed_due and last_done and last_done >= candidate:
        # Compatibility fallback for tasks completed before occurrence tracking existed.
        candidate = add_months(candidate, 1)
    previous = add_months(candidate, -1)
    return previous, candidate


def _yearly_occurrence(
    now: datetime,
    month: int,
    day: int,
    last_done: datetime | None,
    completed_due: datetime | None,
) -> tuple[datetime, datetime]:
    candidate = clamp_date(now.year, month, day)
    if completed_due and completed_due >= candidate:
        candidate = clamp_date(completed_due.year + 1, month, day)
    elif not completed_due and last_done and last_done >= candidate:
        # Compatibility fallback for tasks completed before occurrence tracking existed.
        candidate = clamp_date(now.year + 1, month, day)
    previous = clamp_date(candidate.year - 1, month, day)
    return previous, candidate


def evaluate_schedule(task: dict[str, Any], *, now: datetime | None = None) -> ScheduleEvaluation:
    now = (now or datetime.now(UTC)).astimezone(UTC)
    task_id = str(task.get("id") or "")
    mode = str(task.get("schedule_mode") or "interval")
    warning = float(task.get("warning_threshold", 70))
    critical = float(task.get("critical_threshold", 90))
    last_done = parse_datetime(task.get("last_done"))
    completed_due = parse_datetime(task.get("last_scheduled_due"))
    created_at = parse_datetime(task.get("created_at")) or now

    if mode == "one_time":
        if task.get("completed_at"):
            completed = parse_datetime(task.get("completed_at")) or last_done or now
            return ScheduleEvaluation(
                status="completed",
                current=1,
                limit=1,
                progress=100,
                remaining=0,
                due_at=(parse_datetime(task.get("due_date")) or completed).isoformat(),
                last_done=last_done.isoformat() if last_done else None,
                period_start=created_at.isoformat(),
                schedule_label="one_time",
            )
        due = parse_datetime(task.get("due_date"))
        if due is None:
            return ScheduleEvaluation("unavailable", None, None, 0, None, None, last_done.isoformat() if last_done else None, "missing_due_date", created_at.isoformat(), "one_time")
        current, limit, progress, remaining = _progress(created_at, due, now)
        return ScheduleEvaluation(
            status=status_for(progress, remaining, warning, critical),
            current=current,
            limit=limit,
            progress=progress,
            remaining=remaining,
            due_at=due.isoformat(),
            last_done=last_done.isoformat() if last_done else None,
            period_start=created_at.isoformat(),
            schedule_label="one_time",
        )

    if mode == "fixed_date":
        repeat = str(task.get("calendar_repeat") or "yearly")
        day = int(task.get("fixed_day") or 1)
        if repeat == "monthly":
            previous, due = _monthly_occurrence(now, day, last_done, completed_due)
            label = "monthly"
        else:
            month = int(task.get("fixed_month") or 1)
            previous, due = _yearly_occurrence(now, month, day, last_done, completed_due)
            label = "yearly"
        start = max(previous, last_done) if last_done else previous
        current, limit, progress, remaining = _progress(start, due, now)
        return ScheduleEvaluation(
            status=status_for(progress, remaining, warning, critical),
            current=current,
            limit=limit,
            progress=progress,
            remaining=remaining,
            due_at=due.isoformat(),
            last_done=last_done.isoformat() if last_done else None,
            period_start=start.isoformat(),
            schedule_label=label,
        )

    if mode == "seasonal":
        season = str(task.get("season") or "autumn").lower()
        default_month, default_day = SEASON_DEFAULTS.get(season, SEASON_DEFAULTS["autumn"])
        month = int(task.get("fixed_month") or default_month)
        day = int(task.get("fixed_day") or default_day)
        previous, due = _yearly_occurrence(now, month, day, last_done, completed_due)
        start = max(previous, last_done) if last_done else previous
        current, limit, progress, remaining = _progress(start, due, now)
        return ScheduleEvaluation(
            status=status_for(progress, remaining, warning, critical),
            current=current,
            limit=limit,
            progress=progress,
            remaining=remaining,
            due_at=due.isoformat(),
            last_done=last_done.isoformat() if last_done else None,
            period_start=start.isoformat(),
            schedule_label=f"seasonal:{season}",
        )

    interval = float(task.get("interval") or 0)
    if interval <= 0:
        return ScheduleEvaluation("unavailable", None, interval, 0, None, None, last_done.isoformat() if last_done else None, "invalid_limit", None, "interval")
    anchor = last_done or created_at
    seconds = interval_seconds(interval, str(task.get("interval_unit") or "days"))
    due = anchor + timedelta(seconds=seconds)
    elapsed_seconds = max(0.0, (now - anchor).total_seconds())
    current = elapsed_seconds / max(1.0, seconds / interval)
    progress = max(0.0, current / interval * 100.0)
    remaining = interval - current
    return ScheduleEvaluation(
        status=status_for(progress, remaining, warning, critical),
        current=current,
        limit=interval,
        progress=progress,
        remaining=remaining,
        due_at=due.isoformat(),
        last_done=anchor.isoformat(),
        period_start=anchor.isoformat(),
        schedule_label=f"interval:{task.get('interval_unit', 'days')}",
    )
