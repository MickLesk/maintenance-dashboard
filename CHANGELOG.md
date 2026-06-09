# Changelog

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