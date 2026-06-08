// Frontend data contract documentation used by the panel runtime.
const FRONTEND_CONTRACTS = Object.freeze({
  task: ["id", "name", "type", "schedule_mode", "interval", "interval_unit", "priority", "category", "enabled"],
  runtime: ["status", "progress", "remaining", "due_at"],
  template: ["id", "name", "category", "interval", "priority", "description"],
  backup: ["id", "created_at", "task_count", "history_count"]
});
