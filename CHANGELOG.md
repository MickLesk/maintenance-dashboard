# Changelog

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