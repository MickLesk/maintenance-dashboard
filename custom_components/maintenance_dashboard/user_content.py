from __future__ import annotations

import copy
import re
import uuid
from datetime import UTC, datetime
from typing import Any

MAX_ATTACHMENT_BYTES = 512 * 1024
MAX_ATTACHMENTS_PER_COMPLETION = 5
MAX_CUSTOM_TEMPLATES = 200

_TEMPLATE_FIELDS = {
    "name",
    "category",
    "custom_category",
    "area_name",
    "icon",
    "interval",
    "interval_unit",
    "priority",
    "description",
    "schedule_mode",
    "type",
    "tags",
    "season",
    "fixed_month",
    "fixed_day",
    "calendar_repeat",
    "warning_threshold",
    "critical_threshold",
    "checklist",
    "recommended",
    "common",
}


def _utcnow() -> str:
    return datetime.now(UTC).isoformat()


def _slug(value: str) -> str:
    clean = re.sub(r"[^a-z0-9]+", "_", value.lower()).strip("_")
    return clean or f"custom_{uuid.uuid4().hex[:8]}"


def default_user_templates() -> dict[str, Any]:
    return {"favorites": [], "custom": []}


def normalize_user_templates(settings: dict[str, Any]) -> dict[str, Any]:
    block = settings.setdefault("user_templates", default_user_templates())
    favorites = [str(item) for item in block.get("favorites", []) if item]
    custom: list[dict[str, Any]] = []
    seen: set[str] = set()
    for raw in block.get("custom", []):
        if not isinstance(raw, dict):
            continue
        try:
            template = normalize_custom_template(raw)
        except ValueError:
            continue
        if template["id"] in seen:
            continue
        seen.add(template["id"])
        custom.append(template)
    block["favorites"] = list(dict.fromkeys(favorites))[:500]
    block["custom"] = custom[:MAX_CUSTOM_TEMPLATES]
    return block


def normalize_custom_template(raw: dict[str, Any], *, create: bool = False) -> dict[str, Any]:
    name = str(raw.get("name") or "").strip()
    if not name:
        raise ValueError("Template name is required")
    template_id = str(raw.get("id") or "").strip()
    if not template_id or create:
        template_id = f"custom_{_slug(name)}_{uuid.uuid4().hex[:6]}"
    category = str(raw.get("category") or "general")
    template = {
        "id": template_id,
        "name": name,
        "category": category,
        "custom_category": str(raw.get("custom_category") or "").strip() or None,
        "area_name": str(raw.get("area_name") or "").strip() or None,
        "icon": str(raw.get("icon") or "mdi:wrench-clock"),
        "interval": max(1, int(raw.get("interval") or 90)),
        "interval_unit": str(raw.get("interval_unit") or "days"),
        "priority": max(1, min(5, int(raw.get("priority") or 3))),
        "description": str(raw.get("description") or "").strip(),
        "schedule_mode": str(raw.get("schedule_mode") or "interval"),
        "type": str(raw.get("type") or "time"),
        "tags": [str(tag).strip() for tag in (raw.get("tags") or []) if str(tag).strip()],
        "season": raw.get("season"),
        "fixed_month": raw.get("fixed_month"),
        "fixed_day": raw.get("fixed_day"),
        "calendar_repeat": raw.get("calendar_repeat"),
        "warning_threshold": raw.get("warning_threshold"),
        "critical_threshold": raw.get("critical_threshold"),
        "checklist": raw.get("checklist") if isinstance(raw.get("checklist"), list) else [],
        "recommended": bool(raw.get("recommended", False)),
        "common": bool(raw.get("common", False)),
        "custom": True,
        "source_task_id": str(raw.get("source_task_id") or "").strip() or None,
        "created_at": raw.get("created_at") or _utcnow(),
        "updated_at": _utcnow(),
    }
    return template


def template_from_task(task: dict[str, Any]) -> dict[str, Any]:
    payload = {key: copy.deepcopy(task.get(key)) for key in _TEMPLATE_FIELDS if key in task}
    payload["name"] = task.get("name")
    payload["source_task_id"] = task.get("id")
    return normalize_custom_template(payload, create=True)


def merge_templates(builtin: list[dict[str, Any]], custom: list[dict[str, Any]]) -> list[dict[str, Any]]:
    merged = [copy.deepcopy(item) for item in builtin]
    builtin_ids = {str(item.get("id")) for item in merged}
    builtin_names = {str(item.get("name", "")).strip().lower() for item in merged}
    for item in custom:
        if item["id"] in builtin_ids:
            continue
        if str(item.get("name", "")).strip().lower() in builtin_names:
            continue
        merged.append(copy.deepcopy(item))
    return merged


def preview_template_import(payload: Any, existing: list[dict[str, Any]]) -> dict[str, Any]:
    candidates = _parse_template_payload(payload)
    existing_ids = {str(item.get("id")) for item in existing}
    existing_names = {str(item.get("name", "")).strip().lower() for item in existing}
    preview: list[dict[str, Any]] = []
    duplicates: list[str] = []
    for raw in candidates:
        try:
            template = normalize_custom_template(raw, create=True)
        except ValueError as err:
            preview.append({"valid": False, "error": str(err), "raw": raw})
            continue
        duplicate = template["id"] in existing_ids or str(template["name"]).lower() in existing_names
        if duplicate:
            duplicates.append(template["name"])
        preview.append({"valid": True, "template": template, "duplicate": duplicate})
    return {
        "count": len(candidates),
        "valid": sum(1 for item in preview if item.get("valid")),
        "duplicates": duplicates,
        "items": preview,
    }


def apply_template_import(payload: Any, existing: list[dict[str, Any]], *, skip_duplicates: bool = True) -> list[dict[str, Any]]:
    preview = preview_template_import(payload, existing)
    merged = [copy.deepcopy(item) for item in existing]
    existing_ids = {str(item.get("id")) for item in merged}
    existing_names = {str(item.get("name", "")).strip().lower() for item in merged}
    for item in preview["items"]:
        if not item.get("valid"):
            continue
        template = item["template"]
        if item.get("duplicate") and skip_duplicates:
            continue
        if template["id"] in existing_ids or str(template["name"]).lower() in existing_names:
            continue
        merged.append(template)
        existing_ids.add(template["id"])
        existing_names.add(str(template["name"]).lower())
    return merged[:MAX_CUSTOM_TEMPLATES]


def _parse_template_text(text: str) -> Any:
    raw = str(text or "").strip()
    if not raw:
        raise ValueError("Template import payload is empty")
    if raw.startswith("{") or raw.startswith("["):
        import json

        try:
            return json.loads(raw)
        except json.JSONDecodeError as err:
            raise ValueError("Invalid JSON template payload") from err
    try:
        import yaml
    except ImportError as err:
        raise ValueError("YAML import requires PyYAML in Home Assistant") from err
    parsed = yaml.safe_load(raw)
    if parsed is None:
        raise ValueError("YAML template payload is empty")
    return parsed


def _parse_template_payload(payload: Any) -> list[dict[str, Any]]:
    if isinstance(payload, str):
        payload = _parse_template_text(payload)
    if isinstance(payload, list):
        return [item for item in payload if isinstance(item, dict)]
    if isinstance(payload, dict):
        if isinstance(payload.get("templates"), list):
            return [item for item in payload["templates"] if isinstance(item, dict)]
        if payload.get("name"):
            return [payload]
    raise ValueError("Template import payload must be a template object or a templates array")


def normalize_attachment(raw: dict[str, Any]) -> dict[str, Any]:
    data = str(raw.get("data_base64") or raw.get("data") or "")
    if not data:
        raise ValueError("Attachment data is required")
    size = len(data.encode("utf-8"))
    if size > MAX_ATTACHMENT_BYTES:
        raise ValueError(f"Attachment exceeds {MAX_ATTACHMENT_BYTES // 1024} KB limit")
    return {
        "id": str(raw.get("id") or f"att_{uuid.uuid4().hex[:10]}"),
        "filename": str(raw.get("filename") or "attachment.bin")[:180],
        "mime_type": str(raw.get("mime_type") or "application/octet-stream")[:120],
        "data_base64": data,
        "size": size,
        "created_at": raw.get("created_at") or _utcnow(),
    }


def list_statistics_years(history: list[dict[str, Any]]) -> list[int]:
    years: set[int] = set()
    years.add(datetime.now(UTC).year)
    for event in history:
        if event.get("type") != "completed":
            continue
        created = event.get("created_at")
        try:
            years.add(datetime.fromisoformat(str(created).replace("Z", "+00:00")).year)
        except (TypeError, ValueError):
            continue
    return sorted(years, reverse=True)


def build_statistics(history: list[dict[str, Any]], tasks: list[dict[str, Any]], *, year: int | None = None) -> dict[str, Any]:
    target_year = int(year or datetime.now(UTC).year)
    task_names = {task["id"]: task.get("name") for task in tasks if isinstance(task, dict)}
    totals = {"cost": 0.0, "completions": 0, "materials": 0}
    by_category: dict[str, dict[str, Any]] = {}
    by_month: dict[str, dict[str, Any]] = {}
    for event in history:
        if event.get("type") != "completed":
            continue
        created = event.get("created_at")
        try:
            event_year = datetime.fromisoformat(str(created).replace("Z", "+00:00")).year
        except (TypeError, ValueError):
            event_year = target_year
        if event_year != target_year:
            continue
        details = event.get("details") or {}
        completion = details.get("completion") if isinstance(details.get("completion"), dict) else details
        cost = completion.get("cost")
        material = str(completion.get("material") or "").strip()
        totals["completions"] += 1
        if material:
            totals["materials"] += 1
        if isinstance(cost, (int, float)):
            totals["cost"] += float(cost)
        task_id = event.get("task_id")
        task = next((item for item in tasks if item.get("id") == task_id), {})
        category = str(task.get("category") or "general")
        bucket = by_category.setdefault(category, {"cost": 0.0, "completions": 0, "materials": 0})
        bucket["completions"] += 1
        if material:
            bucket["materials"] += 1
        if isinstance(cost, (int, float)):
            bucket["cost"] += float(cost)
        month_key = str(created)[:7] if created else f"{target_year}-01"
        month_bucket = by_month.setdefault(month_key, {"cost": 0.0, "completions": 0})
        month_bucket["completions"] += 1
        if isinstance(cost, (int, float)):
            month_bucket["cost"] += float(cost)
    top_tasks: dict[str, float] = {}
    for event in history:
        if event.get("type") != "completed":
            continue
        created = event.get("created_at")
        try:
            event_year = datetime.fromisoformat(str(created).replace("Z", "+00:00")).year
        except (TypeError, ValueError):
            continue
        if event_year != target_year:
            continue
        details = event.get("details") or {}
        completion = details.get("completion") if isinstance(details.get("completion"), dict) else details
        cost = completion.get("cost")
        if not isinstance(cost, (int, float)):
            continue
        task_id = str(event.get("task_id") or "")
        top_tasks[task_id] = top_tasks.get(task_id, 0.0) + float(cost)
    top = sorted(
        (
            {"task_id": task_id, "name": task_names.get(task_id) or task_id, "cost": round(value, 2)}
            for task_id, value in top_tasks.items()
        ),
        key=lambda item: item["cost"],
        reverse=True,
    )[:8]
    return {
        "year": target_year,
        "available_years": list_statistics_years(history),
        "totals": {
            "cost": round(totals["cost"], 2),
            "completions": totals["completions"],
            "materials": totals["materials"],
        },
        "by_category": by_category,
        "by_month": by_month,
        "top_cost_tasks": top,
    }
