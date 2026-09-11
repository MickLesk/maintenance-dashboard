from __future__ import annotations

import base64
import binascii
import hashlib
import re
import uuid
from pathlib import Path
from typing import Any

MEDIA_DIRNAME = "maintenance_dashboard/media"
PHASES = {"before", "after", "single"}
KINDS = {"invoice", "proof", "warranty", "manual", "meter", "photo", "other"}
UNFILED = "_unfiled"
_SAFE = re.compile(r"^[A-Za-z0-9_.-]+$")

_EXTENSIONS = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
    "image/heic": ".heic",
    "application/pdf": ".pdf",
}


def normalize_phase(value: Any) -> str:
    candidate = str(value or "single")
    return candidate if candidate in PHASES else "single"


def extension_for(mime_type: str, filename: str) -> str:
    known = _EXTENSIONS.get(str(mime_type or "").lower())
    if known:
        return known
    suffix = Path(str(filename or "")).suffix.lower()
    return suffix if len(suffix) <= 8 and _SAFE.match(suffix.lstrip(".") or "x") else ".bin"


def is_safe_segment(value: str) -> bool:
    """Reject anything that could escape the media directory."""
    candidate = str(value or "")
    if not candidate or candidate in {".", ".."}:
        return False
    if "/" in candidate or "\\" in candidate or "\0" in candidate:
        return False
    return bool(_SAFE.match(candidate))


def normalize_kind(value: Any) -> str:
    candidate = str(value or "other")
    return candidate if candidate in KINDS else "other"


def folder_for(record: dict[str, Any]) -> str:
    """Directory a document is stored under: its task, its asset, or unfiled."""
    for key in ("task_id", "asset_id"):
        candidate = str(record.get(key) or "")
        if is_safe_segment(candidate):
            return candidate
    return UNFILED


def media_path(root: Path, task_id: str, filename: str) -> Path:
    """Resolve a media file, refusing any path that leaves the root."""
    if not is_safe_segment(task_id) or not is_safe_segment(filename):
        raise ValueError("Unsafe media path")
    base = Path(root).resolve()
    target = (base / task_id / filename).resolve()
    if not target.is_relative_to(base):
        raise ValueError("Unsafe media path")
    return target


def decode_payload(data: str) -> bytes:
    raw = str(data or "")
    if raw.strip().startswith("data:") and "," in raw:
        raw = raw.split(",", 1)[1]
    try:
        return base64.b64decode(raw, validate=True)
    except (binascii.Error, ValueError) as err:
        raise ValueError("Attachment payload is not valid base64") from err


def _reading(value: Any) -> float | None:
    if value in (None, ""):
        return None
    try:
        return round(float(value), 3)
    except (TypeError, ValueError):
        return None


def build_record(
    *,
    task_id: str = "",
    asset_id: str = "",
    filename: str = "",
    mime_type: str = "",
    payload: bytes = b"",
    phase: str = "single",
    kind: str = "other",
    title: str = "",
    note: str = "",
    reading: Any = None,
    reading_unit: str = "",
    attachment_id: str | None = None,
    created_at: str | None = None,
) -> dict[str, Any]:
    identifier = str(attachment_id or "")
    if not is_safe_segment(identifier):
        identifier = f"att_{uuid.uuid4().hex[:12]}"
    return {
        "id": identifier,
        "task_id": str(task_id or ""),
        "asset_id": str(asset_id or ""),
        "kind": normalize_kind(kind),
        "title": str(title or "")[:180],
        "note": str(note or "")[:2000],
        "reading": _reading(reading),
        "reading_unit": str(reading_unit or "")[:24],
        "filename": str(filename or "")[:180],
        "stored_name": f"{identifier}{extension_for(mime_type, filename)}" if payload else "",
        "mime_type": str(mime_type or "application/octet-stream")[:120] if payload else "",
        "size": len(payload),
        "sha256": hashlib.sha256(payload).hexdigest() if payload else "",
        "phase": normalize_phase(phase),
        "created_at": created_at,
    }


def normalize_records(raw: Any) -> list[dict[str, Any]]:
    records: list[dict[str, Any]] = []
    seen: set[str] = set()
    for item in raw if isinstance(raw, list) else []:
        if not isinstance(item, dict):
            continue
        identifier = str(item.get("id") or "")
        stored = str(item.get("stored_name") or "")
        # A meter reading is a document without a file, so stored_name may be
        # empty; anything that is present has to be a safe segment.
        if not is_safe_segment(identifier) or identifier in seen:
            continue
        if stored and not is_safe_segment(stored):
            continue
        seen.add(identifier)
        records.append({
            "id": identifier,
            "task_id": str(item.get("task_id") or ""),
            "asset_id": str(item.get("asset_id") or ""),
            "kind": normalize_kind(item.get("kind")),
            "title": str(item.get("title") or "")[:180],
            "note": str(item.get("note") or "")[:2000],
            "reading": _reading(item.get("reading")),
            "reading_unit": str(item.get("reading_unit") or "")[:24],
            "filename": str(item.get("filename") or "")[:180],
            "stored_name": stored,
            "mime_type": str(item.get("mime_type") or "")[:120],
            "size": max(0, int(item.get("size") or 0)),
            "sha256": str(item.get("sha256") or ""),
            "phase": normalize_phase(item.get("phase")),
            "created_at": item.get("created_at"),
        })
    return records


def pair_by_phase(records: list[dict[str, Any]]) -> dict[str, list[dict[str, Any]]]:
    """Group a completion's media into before, after and unpaired."""
    grouped: dict[str, list[dict[str, Any]]] = {"before": [], "after": [], "single": []}
    for record in records:
        grouped[normalize_phase(record.get("phase"))].append(record)
    return grouped
