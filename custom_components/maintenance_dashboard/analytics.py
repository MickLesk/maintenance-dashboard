from __future__ import annotations

from datetime import UTC, datetime, timedelta
from statistics import median
from typing import Any

FORECAST_MONTHS = 12

_PERIOD_DAYS = {
    "hours": 1 / 24,
    "days": 1.0,
    "weeks": 7.0,
    "months": 30.44,
}


def _parse(value: Any) -> datetime | None:
    if not value:
        return None
    try:
        parsed = datetime.fromisoformat(str(value).replace("Z", "+00:00"))
    except (TypeError, ValueError):
        return None
    return parsed.replace(tzinfo=UTC) if parsed.tzinfo is None else parsed.astimezone(UTC)


def _completion(event: dict[str, Any]) -> dict[str, Any]:
    details = event.get("details") or {}
    inner = details.get("completion")
    return inner if isinstance(inner, dict) else details


def _cost(event: dict[str, Any]) -> float | None:
    value = _completion(event).get("cost")
    return float(value) if isinstance(value, (int, float)) else None


def _completions(history: list[dict[str, Any]], year: int | None = None) -> list[dict[str, Any]]:
    events = []
    for event in history:
        if event.get("type") != "completed" or event.get("undone_at"):
            continue
        created = _parse(event.get("created_at"))
        if year is not None and (created is None or created.year != year):
            continue
        events.append(event)
    return events


def list_statistics_years(history: list[dict[str, Any]]) -> list[int]:
    years = {datetime.now(UTC).year}
    for event in history:
        if event.get("type") != "completed":
            continue
        created = _parse(event.get("created_at"))
        if created:
            years.add(created.year)
    return sorted(years, reverse=True)


def days_late(event: dict[str, Any]) -> float | None:
    """Days between the due date and the completion.

    Derived from timestamps rather than runtime_before.remaining, which is
    expressed in interval units and is not comparable across tasks.
    """
    runtime = (event.get("details") or {}).get("runtime_before") or {}
    due = _parse(runtime.get("due_at"))
    done = _parse(event.get("created_at"))
    if due is None or done is None:
        return None
    return (done - due).total_seconds() / 86400


def build_reliability(history: list[dict[str, Any]], task_names: dict[str, str], year: int) -> dict[str, Any]:
    def rated(events: list[dict[str, Any]]) -> list[tuple[dict[str, Any], float]]:
        pairs = ((event, days_late(event)) for event in events)
        return [(event, late) for event, late in pairs if late is not None]

    current = rated(_completions(history, year))
    previous = rated(_completions(history, year - 1))

    def on_time_rate(pairs: list[tuple[dict[str, Any], float]]) -> float | None:
        if not pairs:
            return None
        return round(sum(1 for _, late in pairs if late <= 0) / len(pairs) * 100, 1)

    on_time = sum(1 for _, late in current if late <= 0)
    late_pairs = [(event, late) for event, late in current if late > 0]
    worst = None
    if late_pairs:
        worst_event, worst_days = max(late_pairs, key=lambda item: item[1])
        worst = {
            "task_id": worst_event.get("task_id"),
            "name": task_names.get(str(worst_event.get("task_id"))) or worst_event.get("task_name"),
            "days": round(worst_days, 1),
        }
    return {
        "rated": len(current),
        "on_time": on_time,
        "late": len(current) - on_time,
        "on_time_rate": on_time_rate(current),
        "previous_on_time_rate": on_time_rate(previous),
        "average_days_late": round(sum(late for _, late in late_pairs) / len(late_pairs), 1) if late_pairs else 0.0,
        "worst": worst,
    }


_RUN_EVENT_TYPES = {
    "completed": "completed",
    "cycle_skipped": "skipped",
    "cycle_restarted": "restarted",
    "workflow_reset": "resets",
}


def _skip_rate(completed: int, skipped: int) -> float:
    finished = completed + skipped
    return round(skipped / finished * 100, 1) if finished else 0.0


def build_runs(history: list[dict[str, Any]], tasks: list[dict[str, Any]], year: int) -> dict[str, Any]:
    """Count runs that ended during the selected year.

    execution_stats are lifetime counters with no timestamp, so they cannot
    answer a per-year question. History events can, at the cost of being
    truncated by history retention; both are reported side by side.
    """
    categories = {str(task.get("id")): str(task.get("category") or "general") for task in tasks}
    totals = {"completed": 0, "skipped": 0, "restarted": 0, "resets": 0, "canceled": 0}
    by_category: dict[str, dict[str, Any]] = {}

    for event in history:
        key = _RUN_EVENT_TYPES.get(str(event.get("type") or ""))
        if key is None or event.get("undone_at"):
            continue
        created = _parse(event.get("created_at"))
        if created is None or created.year != year:
            continue
        totals[key] += 1
        bucket = by_category.setdefault(
            categories.get(str(event.get("task_id")), "general"),
            {"completed": 0, "skipped": 0, "skip_rate": 0.0},
        )
        if key in bucket:
            bucket[key] += 1

    for bucket in by_category.values():
        bucket["skip_rate"] = _skip_rate(bucket["completed"], bucket["skipped"])

    lifetime = {"completed": 0, "skipped": 0, "restarted": 0, "resets": 0, "canceled": 0}
    for task in tasks:
        if task.get("deleted"):
            continue
        stats = task.get("execution_stats") or {}
        for key in lifetime:
            lifetime[key] += max(0, int(stats.get(key) or 0))

    return {
        **totals,
        "skip_rate": _skip_rate(totals["completed"], totals["skipped"]),
        "by_category": by_category,
        "lifetime": {**lifetime, "skip_rate": _skip_rate(lifetime["completed"], lifetime["skipped"])},
    }


def build_effort(history: list[dict[str, Any]], tasks: list[dict[str, Any]], year: int) -> dict[str, Any]:
    categories = {str(task.get("id")): str(task.get("category") or "general") for task in tasks}
    by_person: dict[str, int] = {}
    materials: dict[str, int] = {}
    by_category: dict[str, int] = {}
    for event in _completions(history, year):
        completion = _completion(event)
        person = str(completion.get("performed_by") or "").strip()
        if person:
            by_person[person] = by_person.get(person, 0) + 1
        material = str(completion.get("material") or "").strip()
        if material:
            materials[material] = materials.get(material, 0) + 1
        category = categories.get(str(event.get("task_id")), "general")
        by_category[category] = by_category.get(category, 0) + 1

    def top(counts: dict[str, int]) -> list[dict[str, Any]]:
        ordered = sorted(counts.items(), key=lambda item: (-item[1], item[0]))
        return [{"name": name, "completions": count} for name, count in ordered[:10]]

    return {
        "by_person": top(by_person),
        "materials": top(materials),
        "completions_by_category": by_category,
    }


def _period_days(task: dict[str, Any]) -> float | None:
    mode = str(task.get("schedule_mode") or "interval")
    if mode == "one_time":
        return None
    if mode == "seasonal":
        return 365.25
    if mode == "fixed_date":
        return 30.44 if str(task.get("calendar_repeat") or "yearly") == "monthly" else 365.25
    interval = float(task.get("interval") or 0)
    if interval <= 0:
        return None
    return interval * _PERIOD_DAYS.get(str(task.get("interval_unit") or "days"), 1.0)


def expected_cost(history: list[dict[str, Any]], task_id: str) -> float:
    costs = [
        cost
        for event in _completions(history)
        if str(event.get("task_id")) == task_id and (cost := _cost(event)) is not None
    ]
    return round(median(costs), 2) if costs else 0.0


def build_forecast(
    tasks: list[dict[str, Any]],
    history: list[dict[str, Any]],
    due_by_task: dict[str, str | None],
    *,
    now: datetime,
    cost_tracking: bool,
) -> dict[str, Any]:
    """Project the next twelve months of due dates from each task's period."""
    buckets: dict[str, dict[str, Any]] = {}
    for offset in range(FORECAST_MONTHS):
        year, month = divmod(now.year * 12 + now.month - 1 + offset, 12)
        buckets[f"{year}-{month + 1:02d}"] = {"due": 0, "cost": 0.0}
    horizon = now + timedelta(days=FORECAST_MONTHS * 31)

    for task in tasks:
        if task.get("deleted") or task.get("enabled") is False:
            continue
        occurrence = _parse(due_by_task.get(str(task.get("id"))))
        if occurrence is None:
            continue
        period = _period_days(task)
        cost = expected_cost(history, str(task.get("id"))) if cost_tracking else 0.0
        steps = 0
        while occurrence <= horizon and steps < 400:
            bucket = buckets.get(f"{occurrence.year}-{occurrence.month:02d}")
            if bucket is not None:
                bucket["due"] += 1
                bucket["cost"] = round(bucket["cost"] + cost, 2)
            if period is None:
                break
            occurrence = occurrence + timedelta(days=period)
            steps += 1

    months = [{"month": key, **value} for key, value in sorted(buckets.items())]
    return {
        "months": months,
        "total_due": sum(item["due"] for item in months),
        "total_cost": round(sum(item["cost"] for item in months), 2),
        # The projection always starts today; it does not follow the year selector.
        "from_month": months[0]["month"] if months else None,
    }


def build_costs(history: list[dict[str, Any]], tasks: list[dict[str, Any]], year: int) -> dict[str, Any]:
    task_names = {str(task.get("id")): task.get("name") for task in tasks}
    categories = {str(task.get("id")): str(task.get("category") or "general") for task in tasks}
    totals = {"cost": 0.0, "completions": 0, "materials": 0}
    by_category: dict[str, dict[str, Any]] = {}
    by_month: dict[str, dict[str, Any]] = {}
    per_task: dict[str, float] = {}

    for event in _completions(history, year):
        completion = _completion(event)
        cost = _cost(event)
        material = str(completion.get("material") or "").strip()
        task_id = str(event.get("task_id") or "")
        category = categories.get(task_id, "general")

        totals["completions"] += 1
        bucket = by_category.setdefault(category, {"cost": 0.0, "completions": 0, "materials": 0})
        bucket["completions"] += 1
        if material:
            totals["materials"] += 1
            bucket["materials"] += 1

        created = _parse(event.get("created_at"))
        month_key = f"{created.year}-{created.month:02d}" if created else f"{year}-01"
        month_bucket = by_month.setdefault(month_key, {"cost": 0.0, "completions": 0})
        month_bucket["completions"] += 1

        if cost is not None:
            totals["cost"] += cost
            bucket["cost"] = round(bucket["cost"] + cost, 2)
            month_bucket["cost"] = round(month_bucket["cost"] + cost, 2)
            per_task[task_id] = round(per_task.get(task_id, 0.0) + cost, 2)

    top = sorted(
        (
            {"task_id": task_id, "name": task_names.get(task_id) or task_id, "cost": value}
            for task_id, value in per_task.items()
        ),
        key=lambda item: item["cost"],
        reverse=True,
    )[:8]
    return {
        "totals": {**totals, "cost": round(totals["cost"], 2)},
        "by_category": by_category,
        "by_month": by_month,
        "top_cost_tasks": top,
    }


def build_statistics(
    history: list[dict[str, Any]],
    tasks: list[dict[str, Any]],
    *,
    year: int | None = None,
    cost_tracking: bool = False,
    currency: str = "EUR",
    due_by_task: dict[str, str | None] | None = None,
    now: datetime | None = None,
) -> dict[str, Any]:
    moment = (now or datetime.now(UTC)).astimezone(UTC)
    target_year = int(year or moment.year)
    task_names = {str(task.get("id")): task.get("name") for task in tasks}
    costs = build_costs(history, tasks, target_year)
    return {
        "year": target_year,
        "available_years": list_statistics_years(history),
        "cost_tracking": bool(cost_tracking),
        "currency": currency,
        "totals": costs["totals"],
        "by_category": costs["by_category"],
        "by_month": costs["by_month"],
        "top_cost_tasks": costs["top_cost_tasks"] if cost_tracking else [],
        "is_current_year": target_year == moment.year,
        "reliability": build_reliability(history, task_names, target_year),
        "runs": build_runs(history, tasks, target_year),
        "effort": build_effort(history, tasks, target_year),
        "forecast": build_forecast(
            tasks,
            history,
            due_by_task or {},
            now=moment,
            cost_tracking=cost_tracking,
        ),
    }
