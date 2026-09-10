"""Printable yearly maintenance report.

Rendered as a standalone HTML document so it survives outside Home Assistant:
saved to disk or printed to PDF it still reads correctly. Photos stay as
references into the authenticated media view, so a saved copy shows them only
while signed in. Inlining every photo as base64 would produce files far too
large to be useful.
"""

from __future__ import annotations

import html
from datetime import datetime
from typing import Any, Callable

MAX_PHOTOS_PER_TASK = 6


def _escape(value: Any) -> str:
    return html.escape(str(value if value is not None else ""), quote=True)


def _parse(value: Any) -> datetime | None:
    try:
        return datetime.fromisoformat(str(value).replace("Z", "+00:00"))
    except (TypeError, ValueError):
        return None


def build_report(
    *,
    year: int,
    tasks: list[dict[str, Any]],
    history: list[dict[str, Any]],
    media: list[dict[str, Any]],
    costs: dict[str, Any],
) -> dict[str, Any]:
    """Collect one year of completions into a report document."""
    names = {str(task.get("id")): task.get("name") or str(task.get("id")) for task in tasks}
    categories = {str(task.get("id")): str(task.get("category") or "general") for task in tasks}
    photos_by_task: dict[str, list[dict[str, Any]]] = {}
    for record in media:
        photos_by_task.setdefault(str(record.get("task_id") or ""), []).append(record)

    entries: list[dict[str, Any]] = []
    people: dict[str, int] = {}
    materials: list[str] = []

    for event in history:
        if str(event.get("type") or "") != "completed":
            continue
        created = _parse(event.get("created_at"))
        if created is None or created.year != year:
            continue
        completion = event.get("completion") if isinstance(event.get("completion"), dict) else {}
        task_id = str(event.get("task_id") or "")
        performed_by = str(completion.get("performed_by") or "").strip()
        material = str(completion.get("material") or "").strip()
        if performed_by:
            people[performed_by] = people.get(performed_by, 0) + 1
        if material:
            materials.append(material)

        photos = [
            record for record in photos_by_task.get(task_id, [])
            if (_parse(record.get("created_at")) or created).year == year
        ][:MAX_PHOTOS_PER_TASK]

        entries.append({
            "task_id": task_id,
            "task_name": names.get(task_id, task_id),
            "category": categories.get(task_id, "general"),
            "completed_at": event.get("created_at"),
            "note": str(completion.get("note") or "").strip(),
            "material": material,
            "performed_by": performed_by,
            "cost": completion.get("cost"),
            "currency": completion.get("currency"),
            "photos": photos,
        })

    entries.sort(key=lambda item: str(item.get("completed_at") or ""))
    return {
        "year": year,
        "generated_at": datetime.now().isoformat(timespec="seconds"),
        "entries": entries,
        "totals": costs.get("totals", {}),
        "by_category": costs.get("by_category", {}),
        "people": sorted(people.items(), key=lambda item: (-item[1], item[0])),
        "materials": materials,
    }


def render_html(
    report: dict[str, Any],
    labels: dict[str, str],
    photo_url: Callable[[str], str],
    currency: str,
) -> str:
    """Render the report document as self-contained printable HTML.

    ``photo_url`` turns an attachment id into a URL the browser can fetch
    without an Authorization header, because the report opens in a plain tab.
    """
    def label(key: str) -> str:
        return _escape(labels.get(key, key))

    def money(value: Any, code: Any = None) -> str:
        try:
            return f"{float(value):.2f} {_escape(code or currency)}"
        except (TypeError, ValueError):
            return ""

    def date(value: Any) -> str:
        moment = _parse(value)
        return moment.strftime("%d.%m.%Y") if moment else ""

    totals = report.get("totals", {})
    rows = []
    for entry in report["entries"]:
        details = [
            f'<span class="tag">{label(entry["category"])}</span>',
            f'<span>{date(entry["completed_at"])}</span>',
        ]
        if entry["performed_by"]:
            details.append(f'<span>{label("reportPerformedBy")}: {_escape(entry["performed_by"])}</span>')
        if entry["cost"] is not None:
            details.append(f'<span>{money(entry["cost"], entry["currency"])}</span>')
        photos = "".join(
            f'<img src="{_escape(photo_url(str(photo.get("id"))))}" alt="{_escape(photo.get("phase") or "")}" loading="lazy">'
            for photo in entry["photos"]
        )
        note = f'<p class="note">{_escape(entry["note"])}</p>' if entry["note"] else ""
        material = (
            f'<p class="material"><strong>{label("reportMaterial")}:</strong> {_escape(entry["material"])}</p>'
            if entry["material"] else ""
        )
        gallery = f'<div class="photos">{photos}</div>' if photos else ""
        rows.append(
            f'<article class="entry"><h3>{_escape(entry["task_name"])}</h3>'
            f'<div class="meta">{"".join(details)}</div>{note}{material}{gallery}</article>'
        )

    categories = "".join(
        f'<tr><td>{label(name)}</td><td>{bucket.get("completions", 0)}</td><td>{money(bucket.get("cost", 0))}</td></tr>'
        for name, bucket in sorted(report.get("by_category", {}).items())
    )
    people = "".join(
        f"<li>{_escape(name)} <span>{count}</span></li>" for name, count in report.get("people", [])
    )
    category_table = (
        f'<table><thead><tr><th>{label("category")}</th><th>{label("reportCompletions")}</th>'
        f'<th>{label("reportCost")}</th></tr></thead><tbody>{categories}</tbody></table>'
        if categories else f'<p class="empty">{label("reportEmpty")}</p>'
    )
    people_block = f'<h2>{label("reportPeople")}</h2><ul class="people">{people}</ul>' if people else ""
    entry_block = "".join(rows) if rows else f'<p class="empty">{label("reportEmpty")}</p>'

    return f"""<!DOCTYPE html>
<html lang="{_escape(labels.get("_lang", "en"))}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{label("reportTitle")} {report["year"]}</title>
<style>
  :root{{color-scheme:light}}
  *{{box-sizing:border-box}}
  body{{margin:0 auto;padding:32px;max-width:960px;font:15px/1.5 system-ui,-apple-system,"Segoe UI",sans-serif;color:#1b1b1f;background:#fff}}
  h1{{margin:0 0 4px;font-size:1.9rem}}
  h2{{margin:32px 0 12px;font-size:1.2rem;border-bottom:2px solid #e2e2e6;padding-bottom:6px}}
  h3{{margin:0 0 6px;font-size:1.02rem}}
  .subtitle{{margin:0 0 24px;color:#5a5a63}}
  .summary{{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px}}
  .summary div{{border:1px solid #e2e2e6;border-radius:12px;padding:12px}}
  .summary span{{display:block;font-size:.72rem;text-transform:uppercase;letter-spacing:.04em;color:#5a5a63}}
  .summary strong{{display:block;margin-top:4px;font-size:1.3rem}}
  table{{width:100%;border-collapse:collapse}}
  th,td{{text-align:left;padding:7px 8px;border-bottom:1px solid #e2e2e6}}
  .entry{{border:1px solid #e2e2e6;border-radius:12px;padding:14px;margin-bottom:12px;break-inside:avoid}}
  .meta{{display:flex;flex-wrap:wrap;gap:10px;color:#5a5a63;font-size:.86rem}}
  .tag{{background:#eceef4;border-radius:999px;padding:1px 9px}}
  .note{{margin:8px 0 0;white-space:pre-wrap}}
  .material{{margin:6px 0 0;font-size:.9rem}}
  .photos{{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}}
  .photos img{{width:150px;height:110px;object-fit:cover;border-radius:8px;border:1px solid #e2e2e6}}
  ul.people{{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:8px}}
  ul.people li{{border:1px solid #e2e2e6;border-radius:999px;padding:4px 12px}}
  ul.people span{{color:#5a5a63}}
  .empty{{color:#5a5a63;font-style:italic}}
  @media print{{body{{padding:0}}.entry{{border-color:#bbb}}}}
</style>
</head>
<body>
<h1>{label("reportTitle")} {report["year"]}</h1>
<p class="subtitle">{label("brandName")} · {label("reportGenerated")} {date(report["generated_at"])}</p>

<section class="summary">
  <div><span>{label("reportCompletions")}</span><strong>{totals.get("completions", 0)}</strong></div>
  <div><span>{label("reportCost")}</span><strong>{money(totals.get("cost", 0))}</strong></div>
  <div><span>{label("reportMaterials")}</span><strong>{len(report.get("materials", []))}</strong></div>
  <div><span>{label("reportPeople")}</span><strong>{len(report.get("people", []))}</strong></div>
</section>

<h2>{label("reportByCategory")}</h2>
{category_table}

{people_block}

<h2>{label("reportEntries")}</h2>
{entry_block}
</body>
</html>
"""
