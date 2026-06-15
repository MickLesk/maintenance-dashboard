from __future__ import annotations

DOMAIN = "maintenance_dashboard"
NAME = "Maintenance Dashboard"
VERSION = "1.5.0"

PLATFORMS: list[str] = ["sensor", "binary_sensor"]

PANEL_URL = "maintenance-dashboard"
PANEL_TITLE = "Wartung"
PANEL_ICON = "mdi:clipboard-list-outline"
PANEL_ELEMENT = "maintenance-dashboard-panel"
STATIC_URL = f"/api/{DOMAIN}/static"
PANEL_MODULE_URL = f"{STATIC_URL}/maintenance-dashboard-panel.js?v={VERSION}"

EVENT_UPDATED = f"{DOMAIN}_updated"
EVENT_TASK_STATUS_CHANGED = f"{DOMAIN}_task_status_changed"
EVENT_TASK_WARNING = f"{DOMAIN}_task_warning"
EVENT_TASK_CRITICAL = f"{DOMAIN}_task_critical"
EVENT_TASK_COMPLETED = f"{DOMAIN}_task_completed"
EVENT_TASK_SNOOZED = f"{DOMAIN}_task_snoozed"

STORE_TASKS_KEY = f"{DOMAIN}.tasks"
STORE_HISTORY_KEY = f"{DOMAIN}.history"
STORE_BACKUPS_KEY = f"{DOMAIN}.backups"
STORE_META_KEY = f"{DOMAIN}.meta"
STORE_SETTINGS_KEY = f"{DOMAIN}.settings"
STORE_NOTIFICATION_STATE_KEY = f"{DOMAIN}.notification_state"
STORE_VERSION = 2
BACKUP_RETENTION = 30
HISTORY_RETENTION_DEFAULT = 500

DEFAULT_WARNING_THRESHOLD = 70
DEFAULT_CRITICAL_THRESHOLD = 90

TASK_TYPES = {"time", "meter"}
SCHEDULE_MODES = {"interval", "one_time", "fixed_date", "seasonal"}
CALENDAR_REPEAT_MODES = {"monthly", "yearly"}
SEASONS = {"spring", "summer", "autumn", "winter"}
INTERVAL_UNITS = {"days", "hours", "weeks", "months"}
CATEGORIES = {
    "general",
    "heating",
    "ventilation",
    "water",
    "electrical",
    "safety",
    "solar",
    "garden",
    "building",
    "it_network",
    "household",
    "garage",
    "custom",
}

TASK_ENTITY_MODES = {"off", "due_only", "basic", "full"}
DASHBOARD_URL = "/maintenance-dashboard"
