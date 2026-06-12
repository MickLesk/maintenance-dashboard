// Runtime data contracts for the backend-owned Maintenance Dashboard panel.
// JSDoc is used because the lightweight build concatenates browser-compatible
// source modules directly into the final Home Assistant panel bundle.

/**
 * @typedef {Object} MaintenanceTask
 * @property {string} id
 * @property {string} name
 * @property {"time"|"meter"} type
 * @property {"interval"|"one_time"|"fixed_date"|"seasonal"} schedule_mode
 * @property {"monthly"|"yearly"} [calendar_repeat]
 * @property {string|null} [due_date]
 * @property {number} interval
 * @property {"hours"|"days"|"weeks"|"months"} interval_unit
 * @property {number} [fixed_month]
 * @property {number} [fixed_day]
 * @property {"spring"|"summer"|"autumn"|"winter"|null} [season]
 * @property {string|null} [last_scheduled_due]
 * @property {string|null} [completed_at]
 * @property {string|null} [archived_at]
 * @property {number} priority
 * @property {string} category
 * @property {string[]} tags
 * @property {string|null} [template_id]
 * @property {string|null} [starter_pack]
 * @property {boolean} enabled
 */

/**
 * @typedef {Object} RuntimeState
 * @property {"ok"|"warning"|"critical"|"overdue"|"snoozed"|"unavailable"|"completed"|"disabled"|"deleted"} status
 * @property {number} progress
 * @property {number|null} remaining
 * @property {string|null} due_at
 * @property {string|null} period_start
 * @property {string|null} schedule_label
 */

/**
 * @typedef {Object} MaintenanceTemplate
 * @property {string} id
 * @property {string} name
 * @property {string} category
 * @property {number} interval
 * @property {number} priority
 * @property {string[]} tags
 * @property {boolean} [popular]
 * @property {boolean} [common]
 * @property {boolean} [recommended]
 */

/**
 * @typedef {Object} TemplatePack
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {string[]} template_ids
 */

const FRONTEND_CONTRACTS = Object.freeze({
  task: ["id", "name", "type", "schedule_mode", "interval", "interval_unit", "priority", "category", "enabled"],
  runtime: ["status", "progress", "remaining", "due_at"],
  template: ["id", "name", "category", "interval", "priority", "description", "tags"],
  templatePack: ["id", "name", "description", "template_ids"],
  backup: ["id", "created_at", "task_count", "history_count"],
  settings: ["notifications", "task_entities", "onboarding"],
});

function hasContractFields(value, contract) {
  return Boolean(value && FRONTEND_CONTRACTS[contract]?.every((key) => Object.prototype.hasOwnProperty.call(value, key)));
}
