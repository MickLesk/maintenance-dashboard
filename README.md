<p align="center">
  <img src="docs/images/logo@2x.png" alt="Maintenance Dashboard logo" width="650">
</p>

<h1 align="center">Maintenance Dashboard</h1>

<p align="center">
  Everything in a house that has to be done again: filters, inspections, batteries, gutters.
  A Home Assistant sidebar panel that remembers when, records what was done, and says what it cost.
</p>

Maintenance Dashboard adds its own Home Assistant sidebar panel. It is not a
Lovelace card and needs no dashboard YAML. Tasks, history, settings and backups
belong to the integration backend and stay independent of the frontend.

![Dashboard overview](docs/images/dashboard-overview.png)

## What it does

- **Schedules that match reality** — intervals, fixed dates, seasons, and entity
  readings such as operating hours. Invalid dates are clamped, not rejected.
- **A record, not just a checkbox** — every completion can carry a note, the
  material used, the cost, who did it and a photo.
- **Tells you in time** — repeats, escalation, quiet hours and actionable
  notifications on any `notify.*` service, translated into your instance
  language.
- **Answers questions** — reliability, backlog, effort, costs, a twelve-month
  forecast and a printable yearly report.
- **Part of Home Assistant** — sensors, binary sensors, a to-do list, a
  calendar, device triggers and conditions, services and events.
- **Safe with your data** — backups before every mutation, soft deletes, undo,
  integrity checks, quarantine instead of deletion, and a full export.

80 built-in templates and ten starter packs mean the first task is a click, not
a form.

| | |
| --- | --- |
| ![Template library](docs/images/template-library.png) | ![Task editor](docs/images/task-editor.png) |

## Installation

### HACS

1. Open HACS, three-dot menu, **Custom repositories**.
2. Add this repository URL, category **Integration**.
3. Install **Maintenance Dashboard** and restart Home Assistant.
4. **Settings → Devices & services → Add integration → Maintenance Dashboard**.

### Manual

```bash
cp -r custom_components/maintenance_dashboard /config/custom_components/
```

Restart Home Assistant, then add the integration the same way. The
**Maintenance** entry appears in the sidebar.

Requires Home Assistant 2026.1.0 or newer.

## Documentation

| Page | Contents |
| --- | --- |
| [Tasks, schedules and history](docs/tasks.md) | Scheduling modes, one-time tasks, completion history, templates, spare parts |
| [The dashboard](docs/dashboard.md) | Layouts, filters, bulk actions, search syntax, QR labels, offline completions, statistics |
| [Notifications](docs/notifications.md) | Rules, quiet hours, escalation, events, blueprint |
| [Entities, platforms and services](docs/automation.md) | Sensors, to-do and calendar platforms, device triggers, service calls |
| [Data, backups and recovery](docs/data.md) | Storage, integrity, backups, import and export, device documents |
| [Development](docs/development.md) | Building the panel, checks, translations, repository layout |

## License

MIT
