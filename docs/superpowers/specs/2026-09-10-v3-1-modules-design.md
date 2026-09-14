# Maintenance Dashboard v3.1.0 — Modules Design

- **Status:** draft, awaiting approval
- **Date:** 2026-09-10
- **Baseline:** v3.0.0b3 (`526f6da`)
- **Target:** `3.1.0`

Three modules in one release: assets, consumption and evidence. Not a beta
patch, so the version moves to 3.1.0.

## 0 · Module architecture

`settings.modules` generalises the `dashboard.cost_tracking` switch already
shipped in v3.0:

```json
{"modules": {"assets": false, "consumption": false, "evidence": false}}
```

Every module is off by default. When off, its settings sections, panel views,
entities and websocket commands are hidden, and its stored data is retained.
This is the same rule cost tracking follows: hide, never delete.

`inventory` and `budget` join the same map when those features are built. They
are out of scope here, but both attach to an asset, so the assets module has to
land first either way.

## 1 · Assets (features 5 + 4)

### Problem

`area_name` is a free-text field on the task (`manager.py:1632`). Two tasks on
the same heat pump share nothing, so "everything about the heat pump" and
"warranty expires in 60 days" are both impossible. A warranty belongs to a
device, not to a maintenance task.

### Data model

New store `maintenance_dashboard.assets`, one document per asset:

```json
{
  "id": "asset_a1b2c3",
  "name": "Wärmepumpe",
  "area_id": "heizungsraum",
  "ha_device_id": "abc123",
  "manufacturer": "Vaillant",
  "model": "aroTHERM plus",
  "serial": "…",
  "installed_at": "2024-04-01",
  "warranty_until": "2029-04-01",
  "contract": {
    "partner": "Fa. Meier",
    "reference": "WV-2024-117",
    "response_hours": 24,
    "expires_at": "2027-04-01"
  },
  "notes": "",
  "created_at": "2026-09-10T09:26:00+00:00",
  "updated_at": "2026-09-10T09:26:00+00:00"
}
```

Tasks gain `asset_id`. `area_name` and `area_id` stay on the task and keep
working for tasks without an asset, so nothing breaks for existing users.

`ha_device_id` links to the Home Assistant device registry, which makes
manufacturer, model and area resolvable from HA itself rather than retyped. The
link is optional; an asset can exist without an HA device (a roof has no entity).

### Home Assistant integration

`entity_management.task_device_info` already builds a `via_device` hierarchy
(`entity_management.py:31`). A third grouping mode `asset` places task entities
under `(DOMAIN, f"asset:{id}")`, itself `via_device` the dashboard. Maintenance
entities then appear on the asset's device page.

Warranty and contract expiry surface three ways:

- as calendar events on the existing calendar platform
- as a notification, reusing the escalation policy already in place
- as an integrity warning when an expiry has passed

### Migration (`DATA_SCHEMA_VERSION` 5 → 6)

Additive. Tasks gain `asset_id: null`. No asset is invented from existing
`area_name` values, because a free-text area is not a device and guessing would
produce a registry full of duplicates. Instead the settings page offers a
one-click import that proposes an asset per distinct area name, which the user
confirms or edits.

## 2 · Consumption (feature 10)

### Problem

`manager.py:660` reads the tracked entity through `hass.states.get()`, which
returns only the current value. There is no history, so a meter task can say "in
30 days" but never "40 operating hours left", which is the entire point of
tracking a meter.

### Approach

Home Assistant's recorder keeps long-term statistics per entity. Reading them
through `homeassistant.components.recorder.statistics.statistics_during_period`
avoids duplicating data we do not own, and survives restarts and purges the way
the rest of HA does.

From that series:

- **rate** — mean change per day over a configurable window, default 30 days
- **remaining** — `(limit - current) / rate`, expressed in the meter's own unit
- **projected due date** — today plus remaining, feeding the existing scheduler
- **trend** — sparkline over the window

A meter task gains `consumption: {"window_days": 30, "mode": "rate" | "fixed"}`.
`fixed` keeps today's behaviour, so existing meter tasks are untouched.

### Fallback

If the recorder is disabled, or the entity has no statistics, the module reports
that plainly and the task falls back to `fixed`. It must not silently invent a
rate; a wrong prediction on a wear part is worse than no prediction.

## 3 · Evidence (features 3 + 9)

### Problem

Attachments are base64 inside a store that is rewritten in full on every save.
v3.0.0b2 capped it at 16 MB and added rotation, which limits the damage but does
not fix the design. Photos are also unpaired: there is no before/after and no way
to see one task's photos over time.

### Storage

Files move to disk under `hass.config.path()`, one directory per task, served
through an authenticated `HomeAssistantView`. Deliberately not the
`StaticPathConfig` route that `panel.py:21` uses for the bundle: that path is
public, and photos of a home are not.

```
<config>/maintenance_dashboard/media/<task_id>/<attachment_id>.jpg
```

The store keeps only metadata: id, task, filename, mime type, size, hash,
`phase` (`before` | `after` | `single`), and the completion event it belongs to.

Migration moves existing base64 attachments to files and rewrites their records.
It runs once, writes a safety backup first, and leaves the old store in place
until the next release so a rollback stays possible.

### Report

A printable HTML report per year and category: completions, costs when cost
tracking is on, materials, people and photos. Rendered in the panel and printed
through the browser.

No server-side PDF. `reportlab` and `weasyprint` are heavy dependencies for a
HACS integration, and the browser already produces the same output.

## 4 · Small addition: performed-by autocomplete (feature 8)

The completion dialog offers previously used names from history through a
`<datalist>`, the pattern already used for tags (`dashboard-view.ts:166`). No new
storage: the values are derived from completion events.

## 5 · Build order

1. Module switches and settings surface
2. Assets: store, migration, HA device link, panel view, warranty notifications
3. Consumption: recorder statistics, rate, scheduler integration
4. Evidence: file store, authenticated view, migration, before/after, report
5. Performed-by autocomplete

Assets first is not preference but dependency: warranties, inventory and budget
all hang off an asset.

## 6 · Testing

| Area | Coverage |
| --- | --- |
| Migration v5→v6 | Additive shape, rollback, no invented assets |
| Assets | Normalisation, HA device link resolution, expiry detection |
| Consumption | Rate from a synthetic series, missing recorder, zero and negative rates |
| Evidence | Base64 to file migration, path traversal rejection, authenticated access |
| Modules | Every module off by default; disabled modules hide surfaces but keep data |

## 7 · Out of scope

Inventory and budget (features 1 and 2), task dependencies (6), multi-step
procedures (7). Each is its own design; all three become simpler once assets
exist.

## 8 · Risk

The v4→v5 migration shipped in v3.0.0b1 has never run against real data, and this
release adds v5→v6 plus a file migration on top. Both write a safety backup
first, but the compounding is real and worth stating.
