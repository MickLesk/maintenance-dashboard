# Notifications

Delivery rules, quiet hours, escalation and the events behind them.

## Notification Rules v2

Maintenance Dashboard can use any Home Assistant `notify.*` service. If no notify service is configured, notifications fall back to `persistent_notification.create`. Action buttons are included when the selected notification target supports Home Assistant Companion actionable notifications.

Global notification settings include:

- Warning, critical, overdue and unavailable-task rules
- Once-per-status delivery or configurable repeat intervals
- Escalation after a configurable number of overdue days
- Quiet-hour suppression, including windows crossing midnight
- Daily digests optionally grouped by category
- Dashboard links, snoozed-task inclusion and test mode
- Configurable **Done**, **Snooze**, and **Open dashboard** actions
- Notification preview and retained delivery history with configurable retention and manual clearing

Every task can inherit the global rules or override its own statuses, repeat interval, escalation behavior, actionable-notification setting and notify service from the advanced editor section.

Automatic processing records the last delivered status and escalation level. This prevents repeated notifications after Home Assistant restarts while still allowing deliberately configured reminders.

An optional event-based automation blueprint is included at:

```text
blueprints/automation/maintenance_dashboard/maintenance_notifications.yaml
```

Copy it into the matching directory below `/config/blueprints/` when the repository installation method does not deploy top-level blueprint files. The blueprint supports an **Integration rules** mode that delegates warning and critical event delivery to the built-in deduplication and quiet-hour engine, plus a **Direct** mode for explicit event-to-notify-service delivery.

### Home Assistant events

The integration fires automation-ready events containing task ID, name, status, priority, due date and dashboard URL:

```text
maintenance_dashboard_task_status_changed
maintenance_dashboard_task_warning
maintenance_dashboard_task_critical
maintenance_dashboard_task_overdue
maintenance_dashboard_task_unavailable
maintenance_dashboard_task_completed
maintenance_dashboard_task_snoozed
```

The generic status event also includes `previous_status` and the update reason.
