"""RFC 5545 rendering for the read-only maintenance feed.

Pure text assembly: no Home Assistant imports, so it can be reasoned about and
tested on its own. Only what a calendar needs leaves the house here. Notes,
costs and photos stay inside Home Assistant.
"""

from __future__ import annotations

from datetime import UTC, datetime, timedelta
from typing import Any, Callable, Iterable

PRODID = "-//Maintenance Dashboard//Maintenance feed//EN"
MAX_LINE_OCTETS = 75


def escape_text(value: Any) -> str:
    """Escape per RFC 5545 section 3.3.11."""
    text = str(value if value is not None else "")
    for needle, replacement in (("\\", "\\\\"), (";", "\\;"), (",", "\\,")):
        text = text.replace(needle, replacement)
    return text.replace("\r\n", "\\n").replace("\n", "\\n").replace("\r", "\\n")


def fold(line: str) -> list[str]:
    """Split a content line into 75 octet chunks, continuations start with a space."""
    encoded = line.encode("utf-8")
    if len(encoded) <= MAX_LINE_OCTETS:
        return [line]
    chunks: list[str] = []
    current = bytearray()
    limit = MAX_LINE_OCTETS
    for char in line:
        char_bytes = char.encode("utf-8")
        if len(current) + len(char_bytes) > limit:
            chunks.append(current.decode("utf-8"))
            current = bytearray()
            limit = MAX_LINE_OCTETS - 1
        current.extend(char_bytes)
    if current:
        chunks.append(current.decode("utf-8"))
    return [chunks[0], *[f" {chunk}" for chunk in chunks[1:]]]


def format_timestamp(value: datetime) -> str:
    moment = value if value.tzinfo else value.replace(tzinfo=UTC)
    return moment.astimezone(UTC).strftime("%Y%m%dT%H%M%SZ")


def build_calendar(events: Iterable[dict[str, Any]], *, name: str, now: datetime | None = None) -> str:
    """Render a VCALENDAR. Events are dicts with uid, start, end, summary and optional description/location."""
    stamp = format_timestamp(now or datetime.now(UTC))
    lines = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        f"PRODID:{PRODID}",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH",
        f"X-WR-CALNAME:{escape_text(name)}",
    ]
    for event in events:
        lines.extend([
            "BEGIN:VEVENT",
            f"UID:{escape_text(event['uid'])}",
            f"DTSTAMP:{stamp}",
            f"DTSTART:{format_timestamp(event['start'])}",
            f"DTEND:{format_timestamp(event['end'])}",
            f"SUMMARY:{escape_text(event['summary'])}",
        ])
        if event.get("description"):
            lines.append(f"DESCRIPTION:{escape_text(event['description'])}")
        if event.get("location"):
            lines.append(f"LOCATION:{escape_text(event['location'])}")
        if event.get("status"):
            lines.append(f"CATEGORIES:{escape_text(event['status'])}")
        lines.append("END:VEVENT")
    lines.append("END:VCALENDAR")

    folded: list[str] = []
    for line in lines:
        folded.extend(fold(line))
    return "\r\n".join(folded) + "\r\n"


SKIPPED_STATUSES = frozenset({"completed", "disabled", "deleted", "unavailable"})


def feed_events(
    tasks: Iterable[dict[str, Any]],
    runtime_for: Callable[[dict[str, Any]], Any],
    *,
    duration_minutes: int = 60,
    include_snoozed: bool = False,
    priority_label: Callable[[Any], str] | None = None,
    parse: Callable[[str], datetime | None] | None = None,
) -> list[dict[str, Any]]:
    """Turn tasks and their runtime into calendar events, earliest first."""
    duration = max(15, min(1440, int(duration_minutes or 60)))
    to_datetime = parse or _parse
    events: list[dict[str, Any]] = []
    for task in tasks:
        if task.get("deleted") or not task.get("enabled", True):
            continue
        runtime = runtime_for(task)
        status = getattr(runtime, "status", None)
        due_at = getattr(runtime, "due_at", None)
        if status in SKIPPED_STATUSES or not due_at:
            continue
        if status == "snoozed" and not include_snoozed:
            continue
        start = to_datetime(due_at)
        if start is None:
            continue
        priority = task.get("priority", 3)
        label = priority_label(priority) if priority_label else str(priority)
        events.append({
            "uid": f"maintenance-dashboard-{task.get('id')}-{start.date().isoformat()}",
            "start": start,
            "end": start + timedelta(minutes=duration),
            "summary": str(task.get("name") or "Maintenance"),
            "description": " · ".join(
                part for part in (f"{label} ({priority}/5)", str(getattr(runtime, "schedule_label", "") or "")) if part
            ),
            "location": str(task.get("area_name") or "") or None,
            "status": status,
        })
    events.sort(key=lambda event: event["start"])
    return events


def _parse(value: Any) -> datetime | None:
    try:
        parsed = datetime.fromisoformat(str(value).replace("Z", "+00:00"))
    except (TypeError, ValueError):
        return None
    return parsed if parsed.tzinfo else parsed.replace(tzinfo=UTC)
