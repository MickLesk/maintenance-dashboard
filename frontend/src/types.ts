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
 * @property {string} [entity_key]
 * @property {Object} [notifications]
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

/**
 * @typedef {Object} NotificationSettings
 * @property {boolean} enabled
 * @property {string} notify_service
 * @property {boolean} once_per_status
 * @property {number} repeat_days
 * @property {boolean} escalation_enabled
 * @property {number} escalation_after_days
 * @property {boolean} actionable
 * @property {boolean} test_mode
 */

/**
 * @typedef {Object} TaskEntitySettings
 * @property {"off"|"due_only"|"basic"|"full"} mode
 * @property {"none"|"dashboard"|"category"} device_grouping
 * @property {boolean} cleanup_removed
 */

const FRONTEND_CONTRACTS = Object.freeze({
  task: ["id", "name", "type", "schedule_mode", "interval", "interval_unit", "priority", "category", "enabled"],
  runtime: ["status", "progress", "remaining", "due_at"],
  template: ["id", "name", "category", "interval", "priority", "description", "tags"],
  templatePack: ["id", "name", "description", "template_ids"],
  backup: ["id", "created_at", "task_count", "history_count"],
  settings: ["notifications", "task_entities", "onboarding"],
  integrity: ["healthy", "errors", "warnings", "repairable", "issues"],
  quarantine: ["id", "reason", "detected_at", "original_data"],
  audit: ["id", "action", "created_at", "source"],
});

function hasContractFields(value, contract) {
  return Boolean(value && FRONTEND_CONTRACTS[contract]?.every((key) => Object.prototype.hasOwnProperty.call(value, key)));
}

/**
 * @typedef {Object} BackupMetadata
 * @property {string} id
 * @property {string} created_at
 * @property {string|null} [name]
 * @property {string} reason
 * @property {boolean} pinned
 * @property {boolean} automatic
 * @property {number} task_count
 * @property {number} history_count
 */

/**
 * @typedef {Object} IntegrityIssue
 * @property {"error"|"warning"} severity
 * @property {string} code
 * @property {boolean} repairable
 * @property {string} [task_id]
 */

/**
 * @typedef {Object} IntegrityReport
 * @property {boolean} healthy
 * @property {number} errors
 * @property {number} warnings
 * @property {number} repairable
 * @property {number} quarantined
 * @property {IntegrityIssue[]} issues
 */

/**
 * @typedef {Object} DashboardSettings
 * @property {"cards"|"compact"|"table"|"calendar"|"timeline"} view_mode
 * @property {string[]} widgets
 * @property {Array<{id:string,name:string,values:Object}>} saved_filters
 */
