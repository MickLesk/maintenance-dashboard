# The dashboard

Layouts, filters, bulk actions and the statistics behind them.

![Maintenance task cards](images/task-cards.png)

## Dashboard views and bulk operations

The dashboard supports three persistent layouts:

| View | Purpose |
| --- | --- |
| Grid | Full maintenance cards with progress and actions |
| List | Dense list for larger task collections |
| Timeline | Chronological due-date stream |

Advanced filters cover category, area, status, priority, schedule mode, due range, tags and entity availability. Filter combinations can be named and saved in the backend.

Tasks can be selected individually or in groups. Supported bulk actions include completing, snoozing, clearing snoozes, changing category, area or priority, enabling, disabling, deleting, restoring, duplicating and exporting selected tasks. Mutating bulk actions show a preview and can create an automatic safety backup before execution.

Dashboard status values are shown in a compact top status line instead of large KPI cards. Available dashboard metrics include health score, open tasks, critical tasks, warnings, due today, completed tasks and unavailable tasks.

Version 1.8.1 applies the same compact Material 3 shell across Dashboard, Templates, History and Settings. It keeps quick-filter chips behind a filter control by default, moves task creation into an extended floating action button and promotes History to a first-class page with summary metrics.

## Search syntax

The dashboard search accepts free text and tokens, combined:

```text
tag:garden prio:5 due:7 status:overdue workflow:in_progress quality:issue for:mickey
```

| Token | Matches |
| --- | --- |
| `tag:` | a tag of the task |
| `prio:` / `priority:` | the exact priority |
| `due:` | due within that many days |
| `status:` | the current status |
| `workflow:` | the workflow state |
| `quality:issue` | tasks the quality check complains about |
| `for:` | the person a task is assigned to |

Everything without a colon searches name, description, area, assignee, category and tags.

## Who a task belongs to

A task can name the person responsible. The name is offered from the people
already seen in the completion history, shown on the card, searchable as
`for:name`, prefilled into the completion dialog and included in the task
payload of every event, so an automation can notify the right person.

## Completions without a connection

Maintenance is recorded in the cellar, the garage, the loft: exactly where the
wifi is not. A completion whose call to Home Assistant fails is written to the
browser's local storage and shown as a counter in the status line. It is sent
on the next successful load, and the counter disappears.

## QR labels

**Settings → QR labels** prints one label per task. Scanning it opens that task
directly, in front of the appliance it belongs to. The same link works when
shared: `?task=<task id>` after the panel URL opens the task detail.

The QR codes are generated inside the panel. An offline Home Assistant does not
have to reach a CDN to print a label.

## Statistics

| Section | Answers |
| --- | --- |
| Completion calendar | When work actually happened, one square per day of the year |
| Maintenance backlog | How far behind the open tasks are, in overdue days, and whether that is growing |
| Reliability | How much was completed on time, and the worst delay |
| Runs | Completed, skipped, restarted and reset cycles, and the skip rate per category |
| Effort | Who did the work, which materials were used, which categories take the most runs |
| Forecast | What the next twelve months will demand, in tasks and in money |
| Health trend | The recorded health score over the last 90 days |
| Costs | Yearly spend by category, by month and by task |

A printable yearly report is available from the same page when the documents
module is on.

## Light and dark

The panel brings its own Material palette rather than inheriting the Home
Assistant theme, so it follows the light/dark choice explicitly. **Settings →
Panel appearance** offers:

| Value | Behaviour |
| --- | --- |
| `auto` | Follows the Home Assistant theme (default) |
| `dark` | Always dark |
| `light` | Always light |

Before this setting the panel was dark in every case, which sat badly inside a
light Home Assistant.
