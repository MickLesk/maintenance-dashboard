from __future__ import annotations

import re
import uuid
from datetime import UTC, date, datetime
from typing import Any

MAX_ASSETS = 500
WARRANTY_WARNING_DAYS = 60


def _utcnow() -> str:
    return datetime.now(UTC).isoformat()


def _parse_date(value: Any) -> date | None:
    raw = str(value or "").strip()
    if not raw:
        return None
    try:
        return date.fromisoformat(raw[:10])
    except ValueError:
        return None


def _clean(value: Any, limit: int = 180) -> str | None:
    text = str(value or "").strip()
    return text[:limit] or None


def normalize_contract(raw: Any) -> dict[str, Any] | None:
    if not isinstance(raw, dict):
        return None
    partner = _clean(raw.get("partner"))
    reference = _clean(raw.get("reference"))
    expires = _parse_date(raw.get("expires_at"))
    hours = raw.get("response_hours")
    try:
        response_hours = max(0, int(hours)) if hours not in (None, "") else None
    except (TypeError, ValueError):
        response_hours = None
    if not any((partner, reference, expires, response_hours)):
        return None
    return {
        "partner": partner,
        "reference": reference,
        "response_hours": response_hours,
        "expires_at": expires.isoformat() if expires else None,
    }


def normalize_asset(raw: dict[str, Any], *, create: bool = False) -> dict[str, Any]:
    name = str(raw.get("name") or "").strip()
    if not name:
        raise ValueError("Asset name is required")
    asset_id = str(raw.get("id") or "").strip()
    if not asset_id or create:
        slug = re.sub(r"[^a-z0-9]+", "_", name.lower()).strip("_") or "asset"
        asset_id = f"asset_{slug}_{uuid.uuid4().hex[:6]}"
    installed = _parse_date(raw.get("installed_at"))
    warranty = _parse_date(raw.get("warranty_until"))
    return {
        "id": asset_id,
        "name": name[:180],
        "area_id": _clean(raw.get("area_id")),
        "ha_device_id": _clean(raw.get("ha_device_id")),
        "manufacturer": _clean(raw.get("manufacturer")),
        "model": _clean(raw.get("model")),
        "serial": _clean(raw.get("serial")),
        "installed_at": installed.isoformat() if installed else None,
        "warranty_until": warranty.isoformat() if warranty else None,
        "contract": normalize_contract(raw.get("contract")),
        "notes": str(raw.get("notes") or "")[:2000],
        "icon": _clean(raw.get("icon")) or "mdi:cube-outline",
        "created_at": raw.get("created_at") or _utcnow(),
        "updated_at": _utcnow(),
    }


def normalize_assets(raw: Any) -> list[dict[str, Any]]:
    assets: list[dict[str, Any]] = []
    seen: set[str] = set()
    for item in raw if isinstance(raw, list) else []:
        if not isinstance(item, dict):
            continue
        try:
            asset = normalize_asset(item)
        except ValueError:
            continue
        if asset["id"] in seen:
            continue
        seen.add(asset["id"])
        assets.append(asset)
    return assets[:MAX_ASSETS]


def expiry_entries(asset: dict[str, Any]) -> list[dict[str, Any]]:
    """Return the dated obligations of an asset: warranty and contract."""
    entries = []
    warranty = _parse_date(asset.get("warranty_until"))
    if warranty:
        entries.append({"kind": "warranty", "date": warranty.isoformat()})
    contract = asset.get("contract") or {}
    expires = _parse_date(contract.get("expires_at"))
    if expires:
        entries.append({"kind": "contract", "date": expires.isoformat()})
    return entries


def expiry_status(
    assets: list[dict[str, Any]],
    *,
    today: date | None = None,
    warning_days: int = WARRANTY_WARNING_DAYS,
) -> list[dict[str, Any]]:
    """Report warranties and contracts that expired or expire soon."""
    moment = today or datetime.now(UTC).date()
    results = []
    for asset in assets:
        for entry in expiry_entries(asset):
            due = _parse_date(entry["date"])
            if due is None:
                continue
            days = (due - moment).days
            if days > warning_days:
                continue
            results.append({
                "asset_id": asset.get("id"),
                "name": asset.get("name"),
                "kind": entry["kind"],
                "date": entry["date"],
                "days": days,
                "expired": days < 0,
            })
    return sorted(results, key=lambda item: item["days"])


def propose_assets_from_tasks(tasks: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """Suggest one asset per distinct area name, for the user to confirm.

    Nothing is created automatically: a free-text area is not a device, and
    guessing would fill the registry with duplicates.
    """
    seen: dict[str, dict[str, Any]] = {}
    for task in tasks:
        if task.get("deleted") or task.get("asset_id"):
            continue
        name = str(task.get("area_name") or "").strip()
        if not name:
            continue
        entry = seen.setdefault(
            name.lower(),
            {"name": name, "area_id": task.get("area_id"), "task_ids": []},
        )
        entry["task_ids"].append(str(task.get("id")))
    return sorted(seen.values(), key=lambda item: item["name"].lower())
