from __future__ import annotations

from datetime import UTC, datetime, timedelta
from typing import Any

DEFAULT_WINDOW_DAYS = 30
MIN_SAMPLES = 2


def normalize_consumption(raw: Any) -> dict[str, Any]:
    source = raw if isinstance(raw, dict) else {}
    mode = str(source.get("mode") or "fixed")
    try:
        window = int(source.get("window_days") or DEFAULT_WINDOW_DAYS)
    except (TypeError, ValueError):
        window = DEFAULT_WINDOW_DAYS
    return {
        "mode": mode if mode in {"fixed", "rate"} else "fixed",
        "window_days": max(1, min(365, window)),
    }


def _parse(value: Any) -> datetime | None:
    if isinstance(value, datetime):
        return value if value.tzinfo else value.replace(tzinfo=UTC)
    if isinstance(value, (int, float)):
        return datetime.fromtimestamp(float(value), tz=UTC)
    try:
        parsed = datetime.fromisoformat(str(value).replace("Z", "+00:00"))
    except (TypeError, ValueError):
        return None
    return parsed if parsed.tzinfo else parsed.replace(tzinfo=UTC)


def consumption_rate(samples: list[dict[str, Any]]) -> dict[str, Any]:
    """Mean change per day across a statistics series.

    Returns rate None when the series cannot support one. A wrong prediction on
    a wear part is worse than no prediction, so nothing is extrapolated from a
    single sample or from a meter that ran backwards.
    """
    points: list[tuple[datetime, float]] = []
    for sample in samples or []:
        when = _parse(sample.get("start") or sample.get("last_reset") or sample.get("time"))
        value = sample.get("state", sample.get("mean", sample.get("sum")))
        if when is None or value is None:
            continue
        try:
            points.append((when, float(value)))
        except (TypeError, ValueError):
            continue
    points.sort(key=lambda item: item[0])
    if len(points) < MIN_SAMPLES:
        return {"rate": None, "samples": len(points), "reason": "not_enough_samples"}

    first, last = points[0], points[-1]
    days = (last[0] - first[0]).total_seconds() / 86400
    delta = last[1] - first[1]
    if days <= 0:
        return {"rate": None, "samples": len(points), "reason": "no_time_span"}
    if delta < 0:
        # A meter that decreased was reset or replaced; the span is meaningless.
        return {"rate": None, "samples": len(points), "reason": "meter_reset"}
    return {
        "rate": round(delta / days, 4),
        "samples": len(points),
        "reason": None,
        "from": first[0].isoformat(),
        "to": last[0].isoformat(),
        "delta": round(delta, 4),
    }


def predict_remaining(current: float, limit: float, rate: float | None) -> dict[str, Any]:
    """Translate a consumption rate into remaining units and days."""
    remaining_units = round(float(limit) - float(current), 4)
    if rate is None or rate <= 0:
        return {"remaining_units": remaining_units, "remaining_days": None, "due_at": None}
    remaining_days = remaining_units / rate
    due = datetime.now(UTC) + timedelta(days=max(0.0, remaining_days))
    return {
        "remaining_units": remaining_units,
        "remaining_days": round(remaining_days, 1),
        "due_at": due.isoformat(),
    }


def build_forecast(samples: list[dict[str, Any]], *, current: float, limit: float) -> dict[str, Any]:
    rate = consumption_rate(samples)
    prediction = predict_remaining(current, limit, rate["rate"])
    return {**rate, **prediction, "current": float(current), "limit": float(limit)}
