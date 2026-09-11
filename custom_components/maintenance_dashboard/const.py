from __future__ import annotations

DOMAIN = "maintenance_dashboard"
NAME = "Maintenance Dashboard"
VERSION = "3.1.0b4"

# Native Home Assistant platforms introduced in v1.6.0.
PLATFORMS: list[str] = ["sensor", "binary_sensor", "todo", "calendar"]

PANEL_URL = "maintenance-dashboard"
PANEL_TITLE = "Wartung"
PANEL_ICON = "mdi:clipboard-list-outline"
PANEL_ELEMENT = "maintenance-dashboard-panel"
STATIC_URL = f"/api/{DOMAIN}/static"
MEDIA_URL = f"/api/{DOMAIN}/media"
PANEL_MODULE_URL = f"{STATIC_URL}/maintenance-dashboard-panel.js?v={VERSION}"
DASHBOARD_URL = "/maintenance-dashboard"

EVENT_UPDATED = f"{DOMAIN}_updated"
EVENT_TASK_STATUS_CHANGED = f"{DOMAIN}_task_status_changed"
EVENT_TASK_WARNING = f"{DOMAIN}_task_warning"
EVENT_TASK_CRITICAL = f"{DOMAIN}_task_critical"
EVENT_TASK_OVERDUE = f"{DOMAIN}_task_overdue"
EVENT_TASK_UNAVAILABLE = f"{DOMAIN}_task_unavailable"
EVENT_TASK_COMPLETED = f"{DOMAIN}_task_completed"
EVENT_TASK_SNOOZED = f"{DOMAIN}_task_snoozed"

# Home Assistant Store's serializer version remains stable so existing v1.5 data
# can always be loaded. DATA_SCHEMA_VERSION is migrated by the integration itself.
STORE_VERSION = 2
DATA_SCHEMA_VERSION = 6
STORE_TASKS_KEY = f"{DOMAIN}.tasks"
STORE_HISTORY_KEY = f"{DOMAIN}.history"
STORE_BACKUPS_KEY = f"{DOMAIN}.backups"
STORE_META_KEY = f"{DOMAIN}.meta"
STORE_SETTINGS_KEY = f"{DOMAIN}.settings"
STORE_NOTIFICATION_STATE_KEY = f"{DOMAIN}.notification_state"
STORE_QUARANTINE_KEY = f"{DOMAIN}.quarantine"
STORE_AUDIT_KEY = f"{DOMAIN}.audit"
STORE_ATTACHMENTS_KEY = f"{DOMAIN}.attachments"
STORE_METRICS_KEY = f"{DOMAIN}.metrics"
STORE_ASSETS_KEY = f"{DOMAIN}.assets"
STORE_MEDIA_KEY = f"{DOMAIN}.media"
STORE_INVENTORY_KEY = f"{DOMAIN}.inventory"

# Optional feature areas. All default to off; switching one off hides its
# surfaces but never deletes its data, the same rule cost tracking follows.
MODULES = ("documents", "consumption", "inventory", "budget")

# What a filed document is. "meter" may carry a reading instead of a file.
DOCUMENT_KINDS = ("invoice", "proof", "warranty", "manual", "meter", "photo", "other")

BACKUP_RETENTION = 20
BACKUP_MAX_AGE_DAYS = 90
HISTORY_RETENTION_DEFAULT = 500
AUDIT_RETENTION_DEFAULT = 1000
QUARANTINE_RETENTION_DEFAULT = 500
METRICS_RETENTION_DAYS = 400

# Whole-store cap; the per-attachment limit lives in user_content.py.
ATTACHMENT_STORE_MAX_BYTES = 16 * 1024 * 1024

DEFAULT_WARNING_THRESHOLD = 70
DEFAULT_CRITICAL_THRESHOLD = 90

TASK_TYPES = {"time", "meter"}
SCHEDULE_MODES = {"interval", "one_time", "fixed_date", "seasonal"}
CALENDAR_REPEAT_MODES = {"monthly", "yearly"}
SEASONS = {"spring", "summer", "autumn", "winter"}
INTERVAL_UNITS = {"days", "hours", "weeks", "months"}

# Task state. How a run ended is tracked as current_execution.outcome.
WORKFLOW_STATES = {"open", "in_progress", "blocked"}
EXECUTION_OUTCOMES = {"completed", "skipped", "canceled"}

# Pre-v3 states, accepted by the migration and by lenient normalization.
LEGACY_WORKFLOW_STATE_MAP = {
    "planned": "open",
    "ready": "open",
    "open": "open",
    "in_progress": "in_progress",
    "blocked": "blocked",
}
LEGACY_TERMINAL_STATES = {"completed", "skipped", "canceled"}
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
DASHBOARD_VIEW_MODES = {"cards", "compact", "timeline"}
SUPPORTED_CURRENCIES = ("EUR", "USD", "GBP", "CHF", "SEK", "NOK", "DKK", "PLN", "CZK")
# "auto" follows the Home Assistant language; the others pin a locale so the
# separators do not change when the interface language does.
NUMBER_FORMATS = {"auto", "comma", "dot", "space"}
DASHBOARD_WIDGETS = {
    "health",
    "open",
    "critical",
    "warning",
    "next",
    "completed_this_year",
    "upcoming_week",
    "notification_status",
    "unavailable",
    "paused",
    "due_today",
    "due_week",
    "due_month",
    "high_priority",
    "meter_tasks",
    "one_time",
}

BACKUP_SECTIONS = {
    "tasks",
    "history",
    "settings",
    "notification_state",
    "quarantine",
    "audit",
}
IMPORT_MODES = {"replace", "merge"}
IMPORT_DUPLICATE_MODES = {"skip", "overwrite", "new_id"}
