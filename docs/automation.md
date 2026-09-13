# Entities, platforms and services

What Maintenance Dashboard exposes to the rest of Home Assistant.

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

Entity modes are synchronized dynamically after settings changes. Generated entities use an immutable backend-owned entity key, so renaming a task does not change its unique ID.

Device grouping can be configured as:

| Grouping | Behavior |
| --- | --- |
| `none` | Generated task entities are not attached to a virtual device |
| `dashboard` | All global and task entities belong to the Maintenance Dashboard device |
| `category` | Task entities are grouped below category-specific virtual devices |

Deleted tasks and reduced entity modes intentionally leave registry records available unless cleanup is enabled. Use **Clean up task entities** from the settings dialog or call `maintenance_dashboard.cleanup_task_entities` to remove orphaned entries. Automatic cleanup can also be enabled in entity settings.

## Native Home Assistant platforms

Version 1.6.0 can expose Maintenance Dashboard through native Home Assistant platforms:

```text
todo.maintenance_dashboard_tasks
calendar.maintenance_dashboard_schedule
```

The To-do platform supports creating, updating, completing, deleting and reordering maintenance tasks. To-do completion is synchronized back to the maintenance history. The Calendar platform exposes calculated due dates for active tasks.

Both platforms can be disabled independently in the integration settings. Version 1.8.0 adds native-platform controls for including disabled tasks in the To-do list, including snoozed tasks in the Calendar and setting the Calendar event duration.

Calendar events include status, priority, remaining time, schedule, category, tags and the dashboard path in their description. Event UIDs are stable per task occurrence.

Native device automation support includes:

- Triggers for status changes, warning, critical, overdue, unavailable, snoozed and completion events
- Optional trigger filters for task ID, category and status
- Conditions for critical, overdue, unavailable, category due, category status, specific overdue task and specific task status

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
maintenance_dashboard.restore_backup_sections
maintenance_dashboard.create_backup
maintenance_dashboard.check_integrity
maintenance_dashboard.repair_integrity
maintenance_dashboard.bulk_operation
maintenance_dashboard.test_notification
maintenance_dashboard.notify_task
maintenance_dashboard.notify_due_tasks
maintenance_dashboard.process_notifications
maintenance_dashboard.cleanup_task_entities
maintenance_dashboard.clear_notification_history
```

## Voice

Maintenance is done with both hands busy, so the integration registers two
Assist intents:

| Intent | Does |
| --- | --- |
| `MaintenanceDashboardMarkDone` | Records the named task as done, with the note "Completed by voice" |
| `MaintenanceDashboardDue` | Answers which tasks are warning, critical or overdue |

The spoken name is matched against the task names: exact first, then a
contained name, then the best word overlap. "Heizung" finds "Heizung warten".

Home Assistant only loads sentences from the configuration folder, so the
sentence files are not installed with the integration. Copy them once:

```bash
cp -r custom_sentences/* /config/custom_sentences/
```

Then restart Home Assistant. The shipped sentences cover, in German and
English:

```text
Wartung Heizung warten ist erledigt
markiere Dachrinne reinigen als erledigt
welche Wartungen sind fällig

mark gutter cleaning as done
which maintenance is due
```

`custom_sentences/<language>/maintenance_dashboard.yaml` is an ordinary
sentence file. Add your own phrasings there; the intent names are what matters.

The response is spoken in the language of the request, falling back to English.
