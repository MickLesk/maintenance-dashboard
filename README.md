# Maintenance Dashboard

Maintenance Dashboard is a Home Assistant custom integration that provides a dedicated sidebar panel for managing recurring home maintenance tasks, technical checks, service intervals, reminders, templates, task history, and maintenance health.

It is designed as a standalone Home Assistant experience rather than a Lovelace card. After installation, the integration registers its own sidebar entry and stores task data in the Home Assistant backend.

## Features

- Dedicated Home Assistant sidebar panel
- Backend-managed persistent storage
- No Lovelace card or dashboard YAML required
- Task tracking for time-based, sensor-based, and consumption-based maintenance
- Categories, areas, icons, colors, priorities, and manual ordering
- Smart sorting based on status, priority, due date, and position
- Maintenance health score
- Open, warning, critical, snoozed, and unavailable task states
- Flexible snooze handling
- Task completion history with undo support
- Soft-delete behavior for safer recovery
- Rolling backups before data mutations
- Built-in template library for common home, garden, utility, and technical maintenance tasks
- Home Assistant services for automations
- Sensors and binary sensors for dashboards and notifications
- HACS-compatible integration structure

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

After setup, a new sidebar entry named **Maintenance** should appear.

### Manual installation

Copy the integration into your Home Assistant configuration directory:

```bash
cp -r custom_components/maintenance_dashboard /config/custom_components/
```

Restart Home Assistant and add the integration via:

```text
Settings → Devices & services → Add integration → Maintenance Dashboard
```

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
npm install
```

Build the frontend panel:

```bash
npm run build
```

The compiled frontend output is written to:

```text
custom_components/maintenance_dashboard/www/maintenance-dashboard-panel.js
```

This file must be included in releases. HACS does not run a frontend build during installation.

## Validation

Recommended checks before pushing a release:

```bash
python3 -m compileall custom_components/maintenance_dashboard
npm install
npm run build
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
