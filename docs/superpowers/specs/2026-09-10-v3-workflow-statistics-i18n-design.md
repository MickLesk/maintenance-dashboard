# Maintenance Dashboard v3.0.0b1 — Design

- **Status:** approved, ready for implementation planning
- **Date:** 2026-09-10
- **Baseline:** v2.4.1 (`5262431`)
- **Target:** `3.0.0b1` (pre-release)

## Goal

Reduce conceptual overhead where the product carries more machinery than the use
case justifies, close the gaps that make correct data look wrong, and make the
statistics view earn its place as a separate page. Shipped as a single
pre-release so the workflow migration can be exercised before a stable v3.0.0.

## Decisions taken during brainstorming

| Question | Decision |
| --- | --- |
| Workflow scope | Collapse 7 states to 3 (`open` / `in_progress` / `blocked`) |
| Release cut | One combined v3.0, not split across v2.5 + v3.0 |
| Backend translations | `scripts/build.mjs` generates a Python catalog from `frontend/src/i18n/*.json` |
| `recurrence_mode` | Removed without replacement |
| `dashboard.widgets` | Built out into a real setting rather than deleted |
| Cost tracking scope | Global switch, not per task |
| Version string | `3.0.0b1` (PEP 440), not `3.0.0-pre` |

## 1 · Workflow model: 7 states to 3

### Rationale

`planned` and `ready` are not distinguishable anywhere in the UI, and
`completed` / `skipped` / `canceled` describe how a *run* ended rather than what
state a *task* is in. `in_progress` and `blocked` are genuinely useful for house
maintenance ("started but not finished", "waiting for a spare part") and stay.

`recurrence_mode` (`standard` / `persistent`) exists solely to choose between
`workflow.default_state` and `workflow.persistent_default_state` when a cycle
starts — see `_default_workflow_state` (manager.py:2547) and `_next_cycle_state`
(manager.py:2797). Once `planned` and `ready` merge into `open`, both branches
return the same value and the field becomes decorative. It is removed.

### Target model

Task-level state, `WORKFLOW_STATES`:

```
open | in_progress | blocked
```

Run outcome, new field `current_execution.outcome`, nullable:

```
null | completed | skipped | canceled
```

`OPEN_WORKFLOW_STATES` becomes equal to `WORKFLOW_STATES` and is removed as a
separate constant; every call site that tested membership now tests for a
non-null `outcome` instead.

#### Outcome lifecycle

`outcome` describes a *finished* run and is therefore only non-null while no
successor run has started:

- **Recurring tasks.** `_begin_new_cycle` (manager.py:2800) stamps the outcome on
  the outgoing execution *before* replacing it, so the value is carried into the
  history event as `details.execution_before.outcome`. The freshly created
  `current_execution` starts at `outcome: null`. Steady-state `outcome` on a
  recurring task is therefore always `null`, and that is correct — the run's
  result lives in history, which is where the statistics read it from.
- **One-time tasks.** No successor run is created, so `current_execution` retains
  `outcome: "completed"` permanently. This is what replaces the old
  `workflow_state: completed`.

`execution_stats` keeps all five counters unchanged. They move off the task card
and surface in the statistics view and the task detail sheet.

Checklists and completion requirements are untouched. They are independent of the
workflow model and stay exactly as they are.

### Settings changes

| Key | Change |
| --- | --- |
| `workflow.default_state` | Accepts `open` \| `in_progress` only; `planned`/`ready` normalize to `open` |
| `workflow.persistent_default_state` | Removed |
| `workflow.default_recurrence_mode` | Removed |
| `workflow.show_checklists` | Unchanged |
| `workflow.reset_checklist_on_completion` | Unchanged |
| `workflow.default_completion_requirements` | Unchanged |

### Migration (`DATA_SCHEMA_VERSION` 4 → 5)

Additive and reversible, using the existing pre-migration backup path.

| Old value | New value |
| --- | --- |
| `workflow_state: planned` \| `ready` | `open` |
| `workflow_state: completed`, recurring task | `open`, `current_execution.outcome = "completed"` |
| `workflow_state: skipped` \| `canceled`, recurring task | `open`, outcome preserved on the execution |
| `workflow_state: completed`, one-time task with `completed_at` | `open`, archival still driven by `archived_at` |
| `recurrence_mode` | Dropped from the task, original value copied to `_migrated.recurrence_mode` |
| `workflow.default_state: planned` \| `ready` | `open` |
| `workflow.persistent_default_state` | Dropped, original copied to `_migrated.persistent_default_state` |

`_migrated.*` is a write-once diagnostic record so a rollback can reconstruct the
old shape. It is never read by application code.

### UI changes

Task card workflow strip collapses from three badges to one state chip plus the
run counter:

```
before                          after
[Geplant][Geplant][#2]          [Offen] · Durchlauf 2
Abgeschlossene Durchläufe: 1
Übersprungene Durchläufe: 0     (counters move to statistics
Resets: 0                        and the task detail sheet)
```

"Durchlauf N" renders `current_execution.sequence`, the same value the old `#N`
badge showed. The whole strip is hidden when the task is archived — a one-time
task with `archived_at` set would otherwise display "Offen" next to an "Archiviert"
status chip.

The task editor loses the "Aufgabenrelevanz" field. The settings workflow tab
loses two selects. The card context menu keeps reset / restart / skip.

## 2 · Cost tracking as a switch

New settings under `dashboard`:

- `cost_tracking: bool`, default `false`
- `default_currency: str`, default `"EUR"`

`default_currency` is already read by `_defaultCurrency` (statistics-view.ts:37)
but does not exist in `default_settings()` and has no UI. This makes it real.

When `cost_tracking` is `false`:

- completion dialog hides the cost and currency fields
- statistics hides all cost tiles, cost-by-category, cost-by-month, top-cost tasks
- task detail sheet hides the "Kosten" tab and the yearly-cost metric
- history hides the cost chip
- task editor shows the "cost" completion requirement disabled with a hint

Already-recorded costs are never deleted, only hidden. Re-enabling restores
everything. `_taskYearCost` (dashboard-view.ts:267) stops hard-coding `"EUR"` and
uses `default_currency`.

## 3 · Statistics

Four sections. Everything except the health trend derives from data already in
the store.

**Zuverlässigkeit** — on-time rate computed from `details.runtime_before.remaining`
on each `completed` event (`>= 0` means on time), average days overdue, worst
case, delta against the previous year.

**Durchläufe** — `execution_stats` summed across tasks: completed, skipped,
restarted, resets. Skip rate per category, which surfaces tasks that are being
routinely ignored.

**Aufwand** — completions per `performed_by`, most-used materials, completions per
category. Cost figures appear here only when `cost_tracking` is on.

**Prognose** — next twelve months projected from task intervals: count of tasks
falling due per month (load distribution) and, with cost tracking on, expected
cost from the median of that task's past completion costs.

**Health-Verlauf** — the only item needing new persistence. New store
`maintenance_dashboard.metrics`, one record per day:

```json
{"date": "2026-09-10", "health": 73, "open": 2, "overdue": 0, "critical": 1, "warning": 0}
```

Roughly 60 bytes per day, retention 400 days. No new scheduler: the existing
one-minute tick (`__init__.py:50`) checks whether today's snapshot exists and
writes it if not.

`build_statistics` (user_content.py:239) grows accordingly and its cost paths
become conditional on `cost_tracking`.

## 4 · History as a real timeline

```
before (day groups)             after (continuous axis)
┌──────────────────────┐        Fr, 14. Aug 2026    ← sticky
│ Freitag, 14. Aug   1 │        │
├──────────────────────┤        ● 09:34  Erledigt
│ ┌──────────────────┐ │        │  Rasenroboter Klingenwechsel
│ │ ✓ Rasenroboter…  │ │        │  War 24 Tage überfällig
│ │ [Erledigt] 09:34 │ │        │  ▸ 1 Änderung
│ │ Fortschritt:168%,│ │        │
│ │ verbleibend:     │ │        Do, 18. Jun 2026
│ │ -23.7479932256…  │ │        │
│ │ ▸ Änderungen · 1 │ │        ● 14:37  Aktualisiert
│ └──────────────────┘ │        │  Rasenroboter Klingenwechsel
└──────────────────────┘        │  ▸ 4 Änderungen
```

Existing `.timeline-entry` / `.timeline-marker` styles from the dashboard timeline
layout are reused. Time moves onto the marker, event type becomes the marker
colour instead of a badge, change details stay collapsible.

### The runtime-summary bug

`_runtimeSummary` (utils.ts:186) currently renders:

```js
`${this._t("progress")}: ${Math.round(runtime.progress || 0)}%, ${this._t("remaining")}: ${runtime.remaining ?? "—"}`
```

Three defects:

1. `remaining` is printed raw — no rounding, no unit, no sign handling. The
   correct helper `_remaining()` already exists two lines above (utils.ts:184).
2. `remaining` is expressed in interval units, not days. The function does not
   receive the task, so it cannot resolve the unit.
3. It renders `details.runtime_before` (manager.py:828) — the state *before*
   completion — with nothing saying so, which reads as a post-completion figure.

Fix: pass the task, use `_remaining()`, and phrase from the intended perspective
("War 24 Tage überfällig" / "War 9 Tage vor Fälligkeit").

Separately, interval-mode progress is uncapped (scheduling.py:208) while calendar
modes clamp to 200 % (scheduling.py:78). Interval mode gets the same clamp.

## 5 · Translations

### Frontend

`_historySummaryLine` (history-dialog.ts:106) must never render `event.summary`
again. It maps `event.type` to an i18n key for every type; the labels already
exist in `_historyEventLabel`. `event.summary` stays in the store as an English
machine field for diagnostics and export.

### Backend

`scripts/build.mjs` additionally emits
`custom_components/maintenance_dashboard/i18n_generated.py` containing the
`notify.*`-prefixed subset of the frontend catalog. Language resolves from
`hass.config.language`, falling back to `en`. The generated file is committed
because HACS does not run a build step, and `npm run validate` fails if it is
stale — the same mechanism that already enforces key parity (build.mjs:52).

Sites that currently hard-code English and become translated:

- every notification body and title (notifications.py:51, notifications.py:24)
- mobile action titles "Mark done" / "Snooze N days" / "Open dashboard"
  (notifications.py:86)
- `priority_label()` (manager.py:1804), today duplicated against the frontend
  catalog
- `remaining_label()` (manager.py:1809)
- `"Completed from notification action"` (`__init__.py:44`), which lands
  verbatim in the user's history

### Catalog corrections

- `recurrenceStandardShort` and `recurrencePersistentShort` are removed with
  `recurrence_mode`. They currently produce the duplicate "Geplant Geplant" badge
  because `workflow_planned` carries the same German string.
- `remaining` is capitalized to match the other meta labels; the sentence context
  gets its own key.
- New test: every key except an allowlist of genuine proper nouns (Dashboard,
  Status, Solar, Backup, …) must differ between `de` and `en`. 31 keys are
  currently identical; roughly half of those are legitimate.

## 6 · Push notifications

The transport is already correct — `notify.mobile_app_*` with actionable
notifications, `tag`, `group`, and `priority: high` on escalation
(notifications.py:72). The work is making it reachable.

- **Service picker** instead of a free-text field, populated from the registered
  `notify.*` services, with a warning when none exist. Applies to the global
  setting and the per-task override (task-editor-dialog.ts:91).
- **Onboarding step** for notifications: lists discovered mobile-app services and
  enables them in one click. Today `enabled` defaults to `false` *and*
  `notify_service` defaults to `""`, so both must be set before anything is sent.
- **Test button** reports which service was used and whether it exists.
- **Translated content**, including action button titles.
- **Additional Companion fields:** `channel: "Maintenance"` so the category can be
  silenced separately on Android, `clickAction` targeting the task rather than the
  dashboard root, and `interruption-level` for iOS on escalation.

The `persistent_notification.create` fallback (notifications.py:13) stays, but as
a deliberate fallback rather than a default users land in by accident.

## 7 · Cleanup

- **`dashboard.widgets` becomes real.** `DASHBOARD_WIDGETS` (const.py:84) defines
  16 widgets and the setting is stored and normalized, but
  `_dashboardWidgetsHtml` (dashboard-view.ts:31) ignores the list entirely and
  hard-codes a primary/secondary split. The status line renders from the
  configured list, with selection in the general settings tab.
- **Attachment leak.** Attachments are stored base64 in their own HA store
  (manager.py:2242), capped at 512 KB each and 5 per completion, and the whole
  store is rewritten on every save. History rotates at 500 events but the
  associated attachments are never removed, so orphaned blobs accumulate forever.
  Rotation now removes attachments whose history event has aged out, plus a total
  size ceiling surfaced in diagnostics.
- **Settings search** across all seven tabs, filtering options and jumping to the
  owning tab. With roughly 50 options this is the cheapest large usability gain.

## 8 · Version and release

`3.0.0b1` must be written to six locations, all checked for equality by
`validate_repository.py:26`:

```
package.json
package-lock.json
custom_components/maintenance_dashboard/manifest.json
custom_components/maintenance_dashboard/const.py          VERSION = "..."
frontend/src/core/constants.ts                            const VERSION = "...";
custom_components/maintenance_dashboard/www/…panel.js     (generated by the build)
```

`test_release_structure.py:44` hard-codes `2.4.1` in the test name and four
assertions. It is rewritten to read the expected version from `package.json` so
future bumps do not touch it.

`.github/workflows/release.yml:79` calls `gh release create` without
`--prerelease`. A `v3.0.0b1` tag would therefore publish as a stable release and
HACS would offer it to every user as a normal update. The workflow gains
pre-release detection: tags matching a PEP 440 pre-release suffix
(`aN` / `bN` / `rcN`) pass `--prerelease`, and `gh release edit` gets the matching
`--prerelease` / `--latest=false` flags.

## 9 · Tests

| File | Change |
| --- | --- |
| `test_storage_migrations.py` | v4→v5 across all seven legacy states, plus rollback |
| `test_workflow_engine.py` | Rewritten for the 3-state model and `outcome` |
| `test_workflow_v19_contracts.py` | Retired or rewritten; it asserts the old model |
| `test_i18n_contracts.py` | Value divergence per key, freshness of `i18n_generated.py` |
| `test_statistics.py` | New — on-time rate, run aggregates, forecast, cost switch |
| `test_notification_texts.py` | New — translation, action IDs, service resolution |
| `test_data_integrity.py` | Attachment rotation and orphan removal |
| `test_release_structure.py` | Version assertions read from `package.json` |
| `test_settings_v16.py` | Settings shape after workflow key removal |

## 10 · Out of scope

Deliberately excluded from this release, each plausible as its own design:

- spare-part and consumables register per task
- multi-user assignment
- maintenance contracts and warranty deadlines
- Excel/PDF export
- additional locales beyond `de` and `en`
