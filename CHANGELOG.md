# Changelog

## v2.0.0

- workflow management with ready/in progress/blocked states
- persistent recurring tasks and cycle controls
- reset, restart and skip actions for recurring work
- execution tracking and richer workflow history

## v1.9.0

### Added
- Added workflow state support for maintenance tasks with planned, in-progress, blocked and completed phases.
- Added per-task checklists with optional required items and default workflow behavior in settings.
- Added completion requirements for note, material, cost, performer and checklist validation.

### Changed
- Extended the task editor, task cards, completion dialog, history view and settings page to expose workflow and checklist data end to end.
- Recorded workflow and checklist snapshots in completion history for better auditability and filtering.
- Hardened backend normalization and validation for workflow metadata without breaking older stored tasks.

## v1.8.4

### Changed
- Reduced dashboard task cards so 3 to 4 cards fit side by side on desktop while keeping clearer metadata and actions.
- Moved bulk-selection actions into a bottom action tray above the floating create button for better reach and less layout jumping.
- Reworked the templates workbench with a cleaner toolbar, icon-based category chips and tighter spacing across filters and actions.
- Renamed starter-pack add actions to `Paket hinzufügen` / `Add package` and made the starter-pack strip collapsible.
- Added category icons to template filters, group headers and template metadata rows.
- Reworked the history page into searchable day groups with clearer event badges, timestamps and change documentation.
- Refactored the settings page into overview cards, cleaner grouped sections and a dedicated ordering block.

## v1.8.3

### Changed
- Moved frontend translations into maintainable locale files under `frontend/src/i18n/`.
- Added generated frontend i18n catalog loading during the build with key parity validation.
- Replaced remaining visible frontend literals with translation keys for German and English.
- Moved priority labels and shared fallback labels into the same i18n catalog.
- Added i18n contract tests for locale coverage and missing translation keys.

## v1.8.1

### Changed
- Reworked the full frontend shell around Material 3 dark-theme tokens.
- Added a compact Top App Bar with Dashboard, Vorlagen, Verlauf and Einstellungen as first-class pages.
- Converted the dashboard KPI area into a flat status summary line with semantic icons.
- Reworked Dashboard toolbar, Grid, List and Timeline layouts for clearer hierarchy and less vertical waste.
- Converted task cards to flat M3 filled cards with a 2x2 text matrix instead of nested metric boxes.
- Added an Extended FAB for creating new entries.
- Added a dedicated Verlauf page with search, event type, period filters, segmented scope and summary metrics.
- Aligned Vorlagen and Einstellungen with shared page headers, tonal surfaces, inputs, chips and buttons.

## v1.8.0

### Added
- Added configurable native To-do handling for showing or hiding disabled maintenance tasks.
- Added configurable native Calendar event duration and optional snoozed-task visibility.
- Added richer native Calendar event titles, descriptions and stable per-occurrence UIDs.
- Added device automation triggers for unavailable and snoozed maintenance tasks.
- Added device conditions for overdue, unavailable, category-status and task-status checks.
- Added native platform metrics to diagnostics.

### Changed
- Hardened Home Assistant To-do completion handling to avoid completing already-completed one-time tasks again.
- Cleaned up stale frontend contracts and styles for removed table and dashboard-calendar views.

## v1.7.2

### Changed
- Reworked the dashboard into a more compact Material 3 Expressive surface.
- Replaced the large KPI card row with a compact status line.
- Moved the create action into a floating action button.
- Collapsed quick filters behind a dedicated filter control by default.
- Reduced dashboard switching to Grid, List and Timeline views.
- Improved task-card readability with stronger date metadata contrast and wider card columns.

## v1.7.1

### Fixed
- Fixed frontend startup crash caused by extending the frozen `FRONTEND_CONTRACTS` object after `Object.freeze`.

## v1.7.0

### Added
- Added dashboard quick-filter chips for status, due windows, high-priority tasks and missing entities.
- Added compact dashboard density, default due-filter settings and quick-filter visibility settings.
- Added dashboard widgets for due today, due this week, due this month, snoozed tasks, high-priority tasks, meter tasks and one-time tasks.
- Added dashboard sorting by name, area, created time and updated time.
- Added due filters for the next 14 days, next 90 days and tasks without due dates.
- Added pinned saved filters and same-name saved-filter updates.
- Added tag chips on task cards that jump directly into tag filtering.
- Added selection helpers for problem tasks and inverted selections.
- Added bulk actions for clearing snoozes, restoring deleted tasks and duplicating selected tasks.
- Added contract tests for the new v1.7 dashboard, filter, selection and bulk-action surface.

### Changed
- Updated the integration, frontend and package versions to 1.7.0.
- Expanded dashboard settings normalization while preserving unknown settings fields.

## v1.6.0

### Added

- Added additive, versioned storage migrations with schema metadata, pre-migration safety backups and preservation of unknown fields.
- Added structured integrity checks for task, history, backup, notification, quarantine and audit data.
- Added safe automatic repairs for duplicate or missing record IDs and quarantine handling for records that cannot be normalized.
- Added native Home Assistant Repairs issues for integrity errors, failed migrations, invalid notify services and unreadable backup records.
- Added configurable backup rotation by count and age, manual named backups, pinned backups and automatic pre-operation backups.
- Added backup comparison with per-task field diffs and selective restore for tasks, history, settings, notification state, quarantine and audit data.
- Added import validation and preview with replace/merge modes plus skip, overwrite and generated-ID duplicate handling.
- Added a technical audit log covering task mutations, imports, restores, settings changes, backups, repairs and bulk operations.
- Added dashboard card, compact list, table, calendar and timeline views.
- Added advanced filters, saved filters, task multi-selection, bulk previews and bulk actions.
- Added configurable dashboard widgets with persistent ordering.
- Added native `todo.maintenance_dashboard_tasks` and `calendar.maintenance_dashboard_schedule` platforms.
- Added native device triggers for status changes, warning, critical, overdue and completion events.
- Added native device conditions for critical tasks, due categories and specific overdue tasks.
- Added diagnostics for storage migration state, integrity state, backup rotation, scheduler state, native platforms and pending Repairs issues.
- Added dedicated tests for migrations, integrity checks, recovery behavior, v1.6 settings and release structure.

### Changed

- Consolidated the planned data-safety, dashboard-UX and native-platform roadmap into the single v1.6.0 release.
- Expanded full exports and backups to include settings, notification state, quarantine and audit data.
- Expanded the Data Safety dialog with integrity checks, repairs, manual backups, pinning, diffs, selective restore, import preview, quarantine management and audit history.
- Expanded dashboard filtering and rendering while preserving existing cards, templates, history and notification workflows.
- Kept Home Assistant Store serializer version stable and introduced an application-level schema version to avoid destructive Store upgrades.

### Fixed

- Prevented invalid records from being silently discarded during startup or import.
- Prevented pinned backups from being removed by automatic rotation.
- Added rollback behavior for failed imports and selective restore operations.
- Preserved unselected data sections and tasks during selective restore.
- Ensured generated task entities, native platforms and dashboard views continue using stable task IDs and entity keys.

## v1.5.0

### Added

- Added Notification Rules v2 with global defaults and optional per-task overrides.
- Added notification preview, test mode, category-grouped digests and persistent notification history with manual clearing.
- Added configurable repeat intervals, once-per-status delivery and overdue escalation levels.
- Added actionable Home Assistant Companion notifications for marking tasks done, snoozing tasks and opening the dashboard.
- Added event-based automation hooks for status changes, warnings, critical tasks, completions and snoozes.
- Added dynamic per-task entity synchronization without requiring an integration reload when entity modes change.
- Added optional Home Assistant device grouping for all maintenance entities or per-category devices.
- Added manual and automatic cleanup of orphaned task entities from the entity registry.
- Added stable immutable entity keys so task entity unique IDs survive task renames.
- Added richer global and per-task sensor attributes, including last-notification metadata.
- Added notification settings, delivery history and deduplication state to full JSON exports and imports.
- Added Notification Rules v2 and entity-management unit tests plus a structural manager API regression test.

### Changed

- Expanded the notification settings UI with repeat, escalation, quiet-hours, actionable-notification and digest controls.
- Expanded task editing with advanced per-task notification rules and optional notify-service overrides.
- Expanded diagnostics with notification history, digest state, entity grouping and cleanup information.
- Updated the notification automation blueprint to use Maintenance Dashboard task events.
- Improved daily digest handling by tracking the local delivery date rather than relying only on UTC dates.
- Improved generated entity lifecycle handling across mode and device-grouping changes.

### Fixed

- Restored automation-ready task summaries used by sensors, events and notification payloads.
- Prevented malformed per-task numeric notification settings from breaking task normalization.
- Included unavailable tasks in automatic notification evaluation while still respecting the configured unavailable-task rule.
- Reduced duplicate notification risk through status-, escalation- and repeat-aware delivery records.

## v1.4.0

### Added

- Added a dedicated scheduling engine for interval, one-time, monthly, yearly and seasonal tasks.
- Added one-time task archiving and reactivation.
- Added monthly and yearly fixed-calendar schedules with safe date clamping for short months and leap years.
- Added seasonal scheduling for spring, summer, autumn and winter.
- Added completion metadata for notes, materials, cost, currency and performed-by information.
- Added history filters by text, action and task.
- Added expandable before/after field changes to history entries.
- Expanded the template library to 80 brand-neutral maintenance templates.
- Added template tags, popular/common filters and richer schedule previews.
- Added ten selectable starter packs for home, safety, heating, garden, solar, IT, household, water, building and garage maintenance.
- Added a first-run onboarding flow for selecting starter packs without bulk-adding the complete library.
- Added scheduling and template-library unit test suites.
- Added an optional Home Assistant notification automation blueprint.

### Changed

- Improved the task editor with schedule-specific controls and validation.
- Improved completed-task handling by hiding archived one-time tasks by default while keeping them accessible.
- Improved task cards with schedule labels, completed states and reactivation actions.
- Improved template browsing with category groups, season filtering, common-task filtering and starter-pack sections.
- Improved template previews with tags and schedule metadata.
- Improved global summaries so completed one-time tasks no longer count as open maintenance work.
- Improved English and German frontend text coverage for the new scheduling and onboarding interfaces.
- Kept storage changes additive and backward-compatible with existing v1.3.x task data.

### Fixed

- Prevented meter-based tasks from retaining unsupported calendar schedule modes.
- Added safe calendar handling for day 29, 30 and 31 across shorter months.
- Preserved full task state for completion undo operations.

## v1.3.1

### Fixed
- reworked the task editor layout so appearance controls are aligned more cleanly
- moved priority into the main form and switched it to a clearer long-slider style control
- preserved dialog scroll position when using random color actions and color reset actions
- prevented random-color actions from jumping the dialog back to the top

### Improved
- grouped template library entries by category for better scanning
- upgraded dashboard toolbar layout so create, search and filter controls feel less empty and more structured
- kept template selection workflow and search/filter controls intact while improving overall layout

## v1.3.0

### Added

- Added dedicated settings, notification and task-entity helper modules.
- Added a cleaner backend separation for notification payloads, settings normalization and generated task-entity metadata.

- Added optional per-task Home Assistant entities with configurable entity generation modes: off, due-only, basic, and full.
- Added richer global sensor attributes for next task, warning tasks, critical tasks, unavailable tasks, and health score metadata.
- Added notification settings for warning, critical, due and digest notifications.
- Added notification services for test notifications, task notifications, due-task notifications and maintenance digests.
- Added notification state tracking to reduce duplicate notification spam.
- Added daily digest scheduling based on the configured digest time.
- Added a Home Assistant automation blueprint for maintenance notifications.
- Added dashboard URL metadata to sensors and notification payloads.

### Changed

- Improved settings storage with dedicated notification and task-entity settings.
- Improved diagnostics with notification and task-entity information.
- Improved automation support through richer entity attributes and explicit notification services.

### Fixed

- Reduced the risk of duplicate digest notifications after Home Assistant restarts.
- Improved handling of deleted, disabled and snoozed tasks in entity and notification logic.

## v1.2.0

### Added

- Added categorized template library with quick category tabs and compact template cards.
- Added template preview dialog before adding templates.
- Added seasonal template metadata and several seasonal maintenance templates.
- Added backup, restore, import, and export UI under Settings → Data safety.
- Added extended diagnostics dialog with frontend version, store version, task count, history count, backup count, language, summary, and copy-to-clipboard support.
- Added basic notification support with test notification and maintenance digest actions.
- Added completion notes when marking tasks as done.
- Added initial support for one-time, fixed-date, and seasonal schedule modes.
- Added improved Home Assistant sensor attributes for next task, critical tasks, warning tasks, and unavailable tasks.
- Added mobile-first responsive layout for header, KPI cards, task cards, template library, dialogs, and action buttons.

### Changed

- Split the frontend source into real runtime modules instead of placeholder files.

- Split the frontend source into a modular development structure while still producing a single bundled panel file for HACS/Home Assistant.
- Improved mobile task card actions and dialog behavior.
- Improved settings layout by grouping diagnostics, notifications, and data safety actions.
- Improved release build flow to concatenate frontend source modules into the final Home Assistant panel asset.

### Fixed

- Hardened the Done action by routing completion through a dedicated confirmation dialog and preserving optional completion notes in history.
- Improved backup safety by creating a backup before full JSON imports.

## v1.1.0

### Added

- Added the project logo to the dashboard header.
- Added dashboard history access as a modal dialog.
- Added click-to-focus behavior for the next task summary card.
- Added a short highlight animation when jumping to a maintenance task.

### Changed

- Simplified the header navigation by moving settings behind the cog icon.
- Improved the next task summary card with shorter text handling.
- Hidden warning, critical, and unavailable summary cards when their value is zero.
- Kept the dashboard focused by removing history as a dedicated tab.

### Fixed

- Added panel cache busting via the registered module URL to ensure Home Assistant loads updated frontend assets after upgrades.

## v1.0.3

### Fixed

- Added frontend panel cache busting to ensure Home Assistant loads the updated panel JavaScript after integration updates.
- Updated internal integration version constant to match the released package version.

## v1.0.2

### Added

- Added project logo and banner assets.
- Added README preview images for dashboard overview, template library, task editor, and task cards.
- Added branding assets for repository presentation and future Home Assistant / HACS brand usage.

### Changed

- Improved README presentation with logo, banner, and preview screenshots.
- Improved GitHub release notes handling by extracting release notes from `CHANGELOG.md`.
- Cleaned up public repository presentation for HACS distribution.

## v1.0.1

### Changed

- Improved project README with a clearer product description, installation notes, safety goals, and development workflow.
- Added stronger wording around backend-managed storage, task history, backups, and safe update behavior.
- Improved repository presentation for HACS and GitHub mirrors.
- Added initial branding guidance and recommended repository description.
- Clarified that the compiled frontend panel must be committed because HACS does not build frontend assets during installation.

### Fixed

- Cleaned up HACS-related metadata expectations.
- Clarified the Forgejo-to-GitHub mirror workflow for HACS distribution.
- Documented the recommended release process for mirrored GitHub releases.

---

## 1.0.0

Initial release.
