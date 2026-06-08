from __future__ import annotations

DOMAIN = "maintenance_dashboard"
NAME = "Maintenance Dashboard"
VERSION = "1.0.3"

PLATFORMS: list[str] = ["sensor", "binary_sensor"]

PANEL_URL = "maintenance-dashboard"
PANEL_TITLE = "Wartung"
PANEL_ICON = "mdi:clipboard-list-outline"
PANEL_ELEMENT = "maintenance-dashboard-panel"
STATIC_URL = f"/api/{DOMAIN}/static"
PANEL_MODULE_URL = f"{STATIC_URL}/maintenance-dashboard-panel.js"

EVENT_UPDATED = f"{DOMAIN}_updated"

STORE_TASKS_KEY = f"{DOMAIN}.tasks"
STORE_HISTORY_KEY = f"{DOMAIN}.history"
STORE_BACKUPS_KEY = f"{DOMAIN}.backups"
STORE_META_KEY = f"{DOMAIN}.meta"
STORE_VERSION = 2
BACKUP_RETENTION = 30
HISTORY_RETENTION_DEFAULT = 500

DEFAULT_WARNING_THRESHOLD = 70
DEFAULT_CRITICAL_THRESHOLD = 90

TASK_TYPES = {"time", "meter"}
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
