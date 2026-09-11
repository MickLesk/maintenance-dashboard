from __future__ import annotations

import re
import uuid
from datetime import UTC, date, datetime
from typing import Any

MAX_PARTS = 1000


def _utcnow() -> str:
    return datetime.now(UTC).isoformat()


def _clean(value: Any, limit: int = 180) -> str | None:
    text = str(value or "").strip()
    return text[:limit] or None


def _number(value: Any, default: float = 0.0) -> float:
    try:
        return float(value)
    except (TypeError, ValueError):
        return default


def _url(value: Any) -> str | None:
    """Only http(s) links; anything else could become a javascript: href."""
    text = str(value or "").strip()[:500]
    return text if text.lower().startswith(("http://", "https://")) else None


def normalize_part(raw: dict[str, Any], *, create: bool = False) -> dict[str, Any]:
    name = str(raw.get("name") or "").strip()
    if not name:
        raise ValueError("Part name is required")
    part_id = str(raw.get("id") or "").strip()
    if not part_id or create:
        slug = re.sub(r"[^a-z0-9]+", "_", name.lower()).strip("_") or "part"
        part_id = f"part_{slug}_{uuid.uuid4().hex[:6]}"
    return {
        "id": part_id,
        "name": name[:180],
        "asset_id": _clean(raw.get("asset_id")),
        "task_ids": [str(item) for item in raw.get("task_ids") or [] if str(item).strip()][:50],
        "part_number": _clean(raw.get("part_number")),
        "supplier": _clean(raw.get("supplier")),
        "location": _clean(raw.get("location")),
        "purchase_url": _url(raw.get("purchase_url")),
        "unit": _clean(raw.get("unit"), 24) or "Stk",
        "stock": round(max(0.0, _number(raw.get("stock"))), 3),
        "minimum": round(max(0.0, _number(raw.get("minimum"))), 3),
        "unit_price": round(max(0.0, _number(raw.get("unit_price"))), 2),
        "last_ordered": _clean(raw.get("last_ordered"), 10),
        "notes": str(raw.get("notes") or "")[:2000],
        "created_at": raw.get("created_at") or _utcnow(),
        "updated_at": _utcnow(),
    }


def normalize_parts(raw: Any) -> list[dict[str, Any]]:
    parts: list[dict[str, Any]] = []
    seen: set[str] = set()
    for item in raw if isinstance(raw, list) else []:
        if not isinstance(item, dict):
            continue
        try:
            part = normalize_part(item)
        except ValueError:
            continue
        if part["id"] in seen:
            continue
        seen.add(part["id"])
        parts.append(part)
    return parts[:MAX_PARTS]


def restock_alerts(parts: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """Parts at or below their minimum stock, out of stock first."""
    alerts = []
    for part in parts:
        minimum = _number(part.get("minimum"))
        stock = _number(part.get("stock"))
        if minimum <= 0 or stock > minimum:
            continue
        alerts.append({
            "part_id": part.get("id"),
            "name": part.get("name"),
            "stock": stock,
            "minimum": minimum,
            "supplier": part.get("supplier"),
            "out_of_stock": stock <= 0,
        })
    return sorted(alerts, key=lambda item: (not item["out_of_stock"], item["name"] or ""))


def inventory_value(parts: list[dict[str, Any]]) -> float:
    return round(sum(_number(p.get("stock")) * _number(p.get("unit_price")) for p in parts), 2)


def normalize_budget(raw: Any) -> dict[str, float]:
    """Yearly budget per category, keyed by category id."""
    budget: dict[str, float] = {}
    for key, value in (raw if isinstance(raw, dict) else {}).items():
        amount = _number(value, -1)
        if amount >= 0:
            budget[str(key)] = round(amount, 2)
    return budget


def budget_status(
    budget: dict[str, float],
    spent_by_category: dict[str, float],
    *,
    today: date | None = None,
) -> list[dict[str, Any]]:
    """Compare spend against budget, prorated by how far the year has run.

    Being at 60% of the budget means something different in February than in
    November, so the pace matters as much as the total.
    """
    moment = today or datetime.now(UTC).date()
    leap = moment.year % 4 == 0 and (moment.year % 100 != 0 or moment.year % 400 == 0)
    elapsed = moment.timetuple().tm_yday / (366 if leap else 365)

    rows = []
    for category, limit in sorted(budget.items()):
        spent = round(_number(spent_by_category.get(category)), 2)
        expected = round(limit * elapsed, 2)
        rows.append({
            "category": category,
            "budget": limit,
            "spent": spent,
            "remaining": round(limit - spent, 2),
            "expected_by_now": expected,
            "share": round(spent / limit * 100, 1) if limit else None,
            "over_budget": spent > limit,
            "ahead_of_pace": spent > expected and spent <= limit,
        })
    return rows
