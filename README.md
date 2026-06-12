<p align="center">
  <img src="docs/images/logo@2x.png" alt="Maintenance Dashboard logo" width="650">
</p>

<h1 align="center">Maintenance Dashboard</h1>

<p align="center">
  A dedicated Home Assistant integration for recurring maintenance, calendar schedules, one-time tasks, service history, starter packs, notifications and safe backend storage.
</p>

Maintenance Dashboard adds its own Home Assistant sidebar panel. It is not a Lovelace card and does not require dashboard YAML. Tasks, history, settings and backups are owned by the integration backend and remain independent from the frontend panel configuration.

## Highlights

- Dedicated Home Assistant sidebar panel
- Backend-managed storage through Home Assistant's internal storage layer
- Interval, one-time, monthly, yearly and seasonal schedules
- Time-, sensor- and consumption-based maintenance tracking
- Completion history with notes, materials, cost and performed-by metadata
- Undo support for completion events
- Automatic rolling backups before mutations and imports
- Soft-delete and restore behavior
- 80 built-in maintenance templates
- Categories, tags, popular/common filters and template previews
- First-run onboarding with selectable starter packs
- Smart sorting based on status, priority, due date and manual position
- Responsive desktop and mobile interface
- Notification services and optional daily digest
- Global and optional per-task Home Assistant entities
- Full JSON export/import and diagnostics

## Preview

### Dashboard

![Dashboard overview](docs/images/dashboard-overview.png)

### Template library

![Template library](docs/images/template-library.png)

### Task editor

![Task editor](docs/images/task-editor.png)

### Task cards

![Maintenance task cards](docs/images/task-cards.png)

## Scheduling modes

| Mode | Behavior | Example |
| --- | --- | --- |
| Interval | Next due date is calculated from the last completion | Replace a filter every 90 days |
| One-time | Uses one due date and is archived after completion | Arrange an inspection before a specific date |
| Monthly | Runs on a fixed day of every month | Review water usage on the first day of the month |
| Yearly | Runs on a fixed month and day every year | Check heating before September |
| Seasonal | Runs once per selected season every year | Winterize outdoor water in autumn |
| Meter | Tracks a Home Assistant entity against a configurable limit | Service a device after a runtime threshold |

Calendar calculations clamp invalid dates safely. For example, a monthly task configured for day 31 is moved to the final valid day of shorter months.

### One-time tasks

Completed one-time tasks are archived instead of becoming due again. They remain available in history and in the optional completed-task view. An archived one-time task can be reactivated from the dashboard or through the `maintenance_dashboard.reactivate_task` service.

## Completion history

When completing a task, the panel can store:

- Completion note
- Used material or replacement parts
- Cost and currency
- Person who performed the work
- Runtime state before completion
- Previous and new task state

History can be filtered by text, task and action type. Stored before/after values are shown as a compact field diff, and supported completion events can be undone.

## Template library and onboarding

The integration includes 80 brand-neutral templates for:

- Heating and ventilation
- Water and leak protection
- Electrical systems and safety
- Solar and energy
- Garden and seasonal work
- Building envelope and moisture checks
- Garage and mobility
- IT, network and backup
- Household appliances

Templates support categories, tags, popular/common flags, seasonal metadata and schedule previews. Multiple templates can be selected and added together.

First-run onboarding offers selectable starter packs such as:

- Home essentials
- Safety first
- Heating and indoor air
- Garden and seasonal work
- Solar and energy
- IT and backup
- Household appliance care
- Water and leak protection
- Building and moisture checks
- Garage and mobility

Starter packs only add their selected templates and never replace existing tasks.

## Installation

### HACS

1. Open HACS in Home Assistant.
2. Open the three-dot menu and select **Custom repositories**.
3. Add the public GitHub repository URL.
4. Select **Integration** as the category.
5. Install **Maintenance Dashboard**.
6. Restart Home Assistant.
7. Open **Settings → Devices & services → Add integration**.
8. Add **Maintenance Dashboard**.

After setup, the **Maintenance** entry appears in the Home Assistant sidebar.

### Manual installation

Copy the integration directory into your Home Assistant configuration:

```bash
cp -r custom_components/maintenance_dashboard /config/custom_components/
```

Restart Home Assistant and add the integration through:

```text
Settings → Devices & services → Add integration → Maintenance Dashboard
```

## Services

### Mark a task as completed

```yaml
service: maintenance_dashboard.mark_done
data:
  task_id: robot_mower_blades
  note: Replaced all blades and cleaned the cutting deck.
  material: Replacement blade set
  cost: 18.90
  currency: EUR
  performed_by: Mickey
```

### Reactivate a completed one-time task

```yaml
service: maintenance_dashboard.reactivate_task
data:
  task_id: annual_inspection
```

### Snooze a task

```yaml
service: maintenance_dashboard.snooze
data:
  task_id: robot_mower_blades
  days: 7
```

### Clear a snooze

```yaml
service: maintenance_dashboard.clear_snooze
data:
  task_id: robot_mower_blades
```

### Send a digest

```yaml
service: maintenance_dashboard.send_digest
data:
  notify_service: notify.mobile_app_phone
  include_ok: false
  include_snoozed: false
```

Additional services:

```text
maintenance_dashboard.restore_backup
maintenance_dashboard.test_notification
maintenance_dashboard.notify_task
maintenance_dashboard.notify_due_tasks
```

## Notifications

Maintenance Dashboard can use any Home Assistant `notify.*` service. If no notify service is configured, notifications fall back to `persistent_notification.create`.

Notification settings include:

- Warning, critical and due-task notifications
- Daily digest and digest time
- Quiet-hour settings
- Snoozed-task inclusion
- Dashboard link inclusion

An optional automation blueprint is included at:

```text
blueprints/automation/maintenance_dashboard/maintenance_notifications.yaml
```

Copy it into the matching directory below `/config/blueprints/` when the repository installation method does not deploy top-level blueprint files.

## Entities

Global entities include:

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

Optional per-task entity modes:

| Mode | Generated entities |
| --- | --- |
| `off` | No individual task entities |
| `due_only` | Due binary sensor |
| `basic` | Due, remaining and progress |
| `full` | Basic entities plus due date, last done and status |

Changing the entity mode may require a Home Assistant restart or integration reload before newly generated entities appear.

## Data storage and safety

Maintenance Dashboard does not store task definitions in Lovelace configuration and does not use the Recorder database as its primary application database. It uses Home Assistant's internal storage layer for:

```text
maintenance_dashboard.tasks
maintenance_dashboard.history
maintenance_dashboard.backups
maintenance_dashboard.settings
maintenance_dashboard.notification_state
```

Safety behavior:

- A backup is created before task mutations and full imports.
- Deletes are soft deletes where possible.
- Completion events preserve the previous task state for undo.
- Existing warning and critical thresholds are retained during partial updates.
- Older task records are normalized additively when loaded.
- Unknown task fields are preserved where possible.
- Full JSON export/import is available from the Data Safety dialog.

## Development

Install frontend dependencies:

```bash
npm ci
```

Build the browser panel:

```bash
npm run build
```

Run all unit tests:

```bash
npm test
```

Run individual suites:

```bash
npm run test:scheduling
npm run test:templates
```

Run the complete validation set:

```bash
npm ci --no-audit --no-fund
npm run build
npm run typecheck
npm test
python3 -m compileall -q custom_components/maintenance_dashboard
```

The build produces the assets Home Assistant and HACS load:

```text
custom_components/maintenance_dashboard/www/maintenance-dashboard-panel.js
custom_components/maintenance_dashboard/www/logo.png
```

These compiled assets must be committed because HACS does not build the frontend during installation.

## Repository layout

```text
custom_components/maintenance_dashboard/
├── __init__.py
├── binary_sensor.py
├── config_flow.py
├── const.py
├── manager.py
├── manifest.json
├── notifications.py
├── panel.py
├── scheduling.py
├── sensor.py
├── services.py
├── services.yaml
├── settings.py
├── task_entities.py
├── templates.py
├── websocket.py
└── www/
    ├── logo.png
    └── maintenance-dashboard-panel.js

frontend/src/
├── components/
├── core/
├── dialogs/
├── views/
├── api.ts
├── events.ts
├── maintenance-dashboard-panel.ts
├── state.ts
├── styles.ts
├── types.ts
└── utils.ts

tests/
├── test_scheduling.py
└── test_templates.py
```

## License

MIT
