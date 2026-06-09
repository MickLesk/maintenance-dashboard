<p align="center">
  <img src="docs/images/logo@2x.png" alt="Maintenance Dashboard logo" width="650">
</p>

<h1 align="center">Maintenance Dashboard</h1>


Maintenance Dashboard is a Home Assistant custom integration that adds a dedicated sidebar panel for managing recurring home maintenance tasks, technical checks, service intervals, reminders, templates, task history, and maintenance health.

It is designed as a standalone Home Assistant experience rather than a Lovelace card. After installation, the integration registers its own sidebar entry, stores task data in the Home Assistant backend, and exposes services and sensors for automations, notifications, and dashboards.

The goal is simple: keep important home, garden, utility, and technical maintenance tasks visible, trackable, recoverable, and safe across updates.

## Highlights

- Dedicated Home Assistant sidebar panel
- No Lovelace card or YAML dashboard required
- Backend-managed task storage
- Time-based, sensor-based, and consumption-based maintenance tracking
- Built-in template library for common home, garden, utility, and technical checks
- Task priorities, categories, areas, colors, icons, and manual ordering
- Smart sorting based on status, priority, due date, and position
- Maintenance health score
- Open, warning, critical, snoozed, unavailable, and completed task states
- Flexible snooze handling
- Completion history with undo support
- Rolling backups before task mutations
- Soft-delete behavior for safer recovery
- Home Assistant services for automations
- Sensors and binary sensors for dashboards and notifications
- Optional per-task Home Assistant entities
- Notification services, daily digest support and automation blueprint
- HACS-compatible custom integration structure

## Preview

### Dashboard overview

![Dashboard overview](docs/images/dashboard-overview.png)

### Template library

![Template library](docs/images/template-library.png)

### Task editor

![Task editor](docs/images/task-editor.png)

### Maintenance task cards

![Maintenance task cards](docs/images/task-cards.png)

---

## Installation

### HACS

HACS only supports public repositories hosted on GitHub. If this project is developed on Forgejo, mirror it to a public GitHub repository before adding it as a HACS custom repository.

1. Open HACS in Home Assistant.
2. Open the three-dot menu.
3. Select **Custom repositories**.
4. Add the public GitHub repository URL.
5. Select category **Integration**.
6. Install **Maintenance Dashboard**.
7. Restart Home Assistant.
8. Go to **Settings → Devices & services → Add integration**.
9. Search for **Maintenance Dashboard** and add it.

After setup/restart, a new sidebar entry named **Maintenance** should appear.

### Manual installation

Copy the integration into your Home Assistant configuration directory:

```bash
cp -r custom_components/maintenance_dashboard /config/custom_components/
```

Restart Home Assistant and add the integration via:

```text
Settings → Devices & services → Add integration → Maintenance Dashboard
```

## Notifications and automations

Maintenance Dashboard exposes notification services for Home Assistant automations and scripts:

- `maintenance_dashboard.test_notification`
- `maintenance_dashboard.send_digest`
- `maintenance_dashboard.notify_task`
- `maintenance_dashboard.notify_due_tasks`

A ready-to-use blueprint is included at:

```text
blueprints/automation/maintenance_dashboard/maintenance_notifications.yaml
```

The integration can send notifications through any Home Assistant `notify.*` service. If no notify service is configured, it falls back to `persistent_notification.create`.

## Optional per-task entities

Per-task entities can be enabled from the Maintenance Dashboard settings. Supported modes are:

- `off` - do not create individual task entities
- `due_only` - create one due binary sensor per task
- `basic` - create due, remaining and progress entities
- `full` - additionally expose due date, last done and status entities

Global sensors remain available regardless of this setting. Changing the per-task entity mode may require a Home Assistant restart or integration reload before newly generated entities appear.

## Repository layout

```text
custom_components/
└── maintenance_dashboard/
    ├── __init__.py
    ├── manifest.json
    ├── config_flow.py
    ├── const.py
    ├── manager.py
    ├── panel.py
    ├── services.py
    ├── services.yaml
    ├── sensor.py
    ├── binary_sensor.py
    ├── websocket.py
    ├── templates.py
    ├── strings.json
    ├── translations/
    │   └── de.json
    └── www/
        └── maintenance-dashboard-panel.js

frontend/
└── src/
    └── maintenance-dashboard-panel.ts

public/
└── logo.png

scripts/
└── build.mjs

package.json
vite.config.ts
tsconfig.json
hacs.json
README.md
CHANGELOG.md
```

## Development

Install dependencies:

```bash
npm ci
```

Build the frontend panel:

```bash
npm run build
```

The build script copies the browser-compatible frontend source and static logo asset into the Home Assistant integration output directory:

```text
custom_components/maintenance_dashboard/www/maintenance-dashboard-panel.js
custom_components/maintenance_dashboard/www/logo.png
```

These files must be included in releases. HACS does not run a frontend build during installation.

## Validation

Recommended checks before pushing a release:

```bash
python3 -m compileall custom_components/maintenance_dashboard
npm ci
npm run build
npm run typecheck
git diff --exit-code custom_components/maintenance_dashboard/www/maintenance-dashboard-panel.js
```

For GitHub mirrors, it is recommended to add the official HACS validation action and hassfest validation.

## Services

### `maintenance_dashboard.mark_done`

Marks a maintenance task as completed.

```yaml
service: maintenance_dashboard.mark_done
data:
  task_id: robot_mower_blades
```

### `maintenance_dashboard.snooze`

Snoozes a task for a number of days.

```yaml
service: maintenance_dashboard.snooze
data:
  task_id: robot_mower_blades
  days: 7
```

### `maintenance_dashboard.clear_snooze`

Removes an active snooze from a task.

```yaml
service: maintenance_dashboard.clear_snooze
data:
  task_id: robot_mower_blades
```

### `maintenance_dashboard.restore_backup`

Restores a stored backup snapshot.

```yaml
service: maintenance_dashboard.restore_backup
data:
  backup_id: backup-id
```

## Entities

The integration exposes sensors and binary sensors for dashboards and automations.

Example entities:

```text
sensor.maintenance_dashboard_health_score
sensor.maintenance_dashboard_active_tasks
sensor.maintenance_dashboard_critical_tasks
sensor.maintenance_dashboard_warning_tasks
sensor.maintenance_dashboard_unavailable_tasks
sensor.maintenance_dashboard_completed_this_year
sensor.maintenance_dashboard_next_task
binary_sensor.maintenance_dashboard_has_critical_tasks
binary_sensor.maintenance_dashboard_has_warning_tasks
```

## Data storage

Maintenance Dashboard stores data in Home Assistant's internal storage layer, not in Lovelace dashboard configuration and not in the Home Assistant Recorder database.

The integration keeps separate storage for:

- Tasks
- History
- Backups

Backups are created before task mutations. Delete operations should be treated as soft deletes where possible so recovery remains possible.

## Safety goals

The project is designed around safe maintenance data handling:

- Task warnings and critical thresholds must not be silently reset by updates.
- Schema migrations must be additive and non-destructive.
- Unknown task fields should be preserved where possible.
- Completion history should contain enough data to undo state changes.
- Frontend updates must not delete backend task data.

## HACS notes

For HACS installation, this project must be available as a public GitHub repository and selected as repository type **Integration**.

Forgejo can be used as the development origin, but HACS requires a GitHub-hosted repository for installation.

## License

MIT

## Frontend source layout

The frontend is split into smaller source files under `frontend/src/` and concatenated into a single panel asset during build. Home Assistant and HACS load only:

```text
custom_components/maintenance_dashboard/www/maintenance-dashboard-panel.js
```

Build command:

```bash
npm run build
```

## Data safety

The integration provides a Data Safety dialog with backup restore, full JSON export and full JSON import. Imports create a backup before replacing data.

## Notifications

Maintenance Dashboard exposes basic notification actions for test notifications and maintenance digests. Use any Home Assistant notification service such as `notify.mobile_app_phone`, or leave it empty to use a persistent notification.
