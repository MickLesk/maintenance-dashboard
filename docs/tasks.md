# Tasks, schedules and history

How a maintenance task is scheduled, completed and recorded.

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
- Cost and currency, when cost tracking is enabled under Settings → General
- Person who performed the work
- Runtime state before completion
- Previous and new task state

History is available as its own panel page and can be filtered by text, task, action type, time period and activity scope. Stored before/after values are shown as a compact field diff, and supported completion events can be undone.

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

## Spare parts and procedure steps

A checklist item can be a procedure step with an instruction, an estimated
duration and a spare part with a quantity. Ticking a step that names a part
books that part out of the inventory on completion.

Restock alerts cover two cases: a part at or below its minimum stock, and a
part that the tasks due within the next 60 days will run out of, even when the
stock is still above the minimum. The alert names how much is missing.
