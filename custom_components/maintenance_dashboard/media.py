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


def build_record(
    *,
    task_id: str,
    filename: str,
    mime_type: str,
    payload: bytes,
    phase: str = "single",
    attachment_id: str | None = None,
    created_at: str | None = None,
) -> dict[str, Any]:
    identifier = str(attachment_id or "")
    if not is_safe_segment(identifier):
        identifier = f"att_{uuid.uuid4().hex[:12]}"
    return {
        "id": identifier,
        "task_id": task_id,
        "filename": str(filename or "attachment")[:180],
        "stored_name": f"{identifier}{extension_for(mime_type, filename)}",
        "mime_type": str(mime_type or "application/octet-stream")[:120],
        "size": len(payload),
        "sha256": hashlib.sha256(payload).hexdigest(),
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
        if not is_safe_segment(identifier) or identifier in seen or not is_safe_segment(stored):
            continue
        seen.add(identifier)
        records.append({
            "id": identifier,
            "task_id": str(item.get("task_id") or ""),
            "filename": str(item.get("filename") or "attachment")[:180],
            "stored_name": stored,
            "mime_type": str(item.get("mime_type") or "application/octet-stream")[:120],
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
