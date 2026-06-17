// @ts-nocheck
const VERSION = "2.2.1";
const LOGO_URL = `/api/maintenance_dashboard/static/logo.png?v=${VERSION}`;

const CATEGORY_KEYS = ["general", "heating", "ventilation", "water", "electrical", "safety", "solar", "garden", "building", "it_network", "household", "garage", "custom"];
const STATUS_ORDER = { overdue: 0, critical: 1, warning: 2, unavailable: 3, snoozed: 4, ok: 5, completed: 6, disabled: 7, deleted: 8 };
const STATUS_ACCENTS = {
  overdue: "var(--error-color)",
  critical: "var(--error-color)",
  warning: "var(--warning-color)",
  unavailable: "var(--disabled-text-color)",
  snoozed: "var(--primary-color)",
  ok: null,
  completed: "var(--success-color, #4caf50)"
};
const ICONS = [
  "mdi:wrench-clock", "mdi:air-filter", "mdi:heat-pump-outline", "mdi:fan", "mdi:water-pump", "mdi:smoke-detector-outline",
  "mdi:home-battery-outline", "mdi:robot-mower-outline", "mdi:fire-extinguisher", "mdi:server-network", "mdi:home-roof", "mdi:garage",
  "mdi:solar-power-variant-outline", "mdi:medical-bag", "mdi:tumble-dryer", "mdi:fridge-outline", "mdi:router-network", "mdi:valve"
];

const COLOR_PALETTE = [
  "#00bcd4", "#03a9f4", "#3f51b5", "#673ab7", "#9c27b0", "#e91e63",
  "#f44336", "#ff5722", "#ff9800", "#ffc107", "#8bc34a", "#4caf50",
  "#009688", "#607d8b", "#795548"
];

const CARD_COLOR_PALETTE = [
  "#102a43", "#123524", "#2d1b3d", "#3a1f1f", "#332800", "#16213e",
  "#102f2f", "#2b2435", "#232323", "#1f2937", "#312e21", "#1f2a1f"
];

const TEMPLATE_CATEGORY_KEYS = ["all", "favorites", "recommended", "heating", "ventilation", "water", "electrical", "safety", "solar", "garden", "building", "it_network", "household", "garage", "seasonal"];
const SCHEDULE_MODES = ["interval", "one_time", "fixed_date", "seasonal"];
const RECURRENCE_MODES = ["standard", "persistent"];
const WORKFLOW_STATES = ["planned", "ready", "in_progress", "blocked"];

const EMPTY = {
  name: "", type: "time", schedule_mode: "interval", calendar_repeat: "yearly", due_date: "",
  interval: "90", interval_unit: "days", entity_id: "", category: "general", custom_category: "",
  area_id: "", area_name: "", priority: "3", icon: "mdi:wrench-clock", icon_color: "", card_color: "",
  enabled: true, warning_threshold: "70", critical_threshold: "90", description: "", last_done: "",
  fixed_month: "9", fixed_day: "1", season: "autumn", tags: [], workflow_state: "planned", recurrence_mode: "standard", checklist: [],
  completion_requirements_note: false, completion_requirements_material: false, completion_requirements_cost: false,
  completion_requirements_performed_by: false, completion_requirements_checklist: false,
  notifications_enabled: true, notifications_inherit: true, notifications_warning: true,
  notifications_critical: true, notifications_overdue: true, notifications_unavailable: false,
  notifications_once_per_status: true, notifications_repeat_days: "3",
  notifications_escalation_enabled: true, notifications_escalation_after_days: "3",
  notifications_actionable: true, notifications_notify_service: ""
};
