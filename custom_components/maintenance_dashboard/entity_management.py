from __future__ import annotations

from typing import Any

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers.entity import DeviceInfo

from .const import DOMAIN, NAME, VERSION
from .task_entities import TASK_SENSOR_MODES, TASK_BINARY_SENSOR_MODES, task_unique_id

TASK_METRICS = {"due", "remaining", "progress", "due_date", "last_done", "status"}


def task_entity_key(task: dict[str, Any]) -> str:
    """Return immutable key used for task entity unique IDs."""
    return str(task.get("entity_key") or task.get("id") or "task")


def dashboard_device_info() -> DeviceInfo:
    return DeviceInfo(
        identifiers={(DOMAIN, "dashboard")},
        name=NAME,
        manufacturer="Maintenance Dashboard",
        model="Virtual maintenance controller",
        sw_version=VERSION,
    )


def task_device_info(task: dict[str, Any], grouping: str) -> DeviceInfo | None:
    if grouping == "none":
        return None
    if grouping == "category":
        category = str(task.get("category") or "general")
        label = str(task.get("custom_category") or category.replace("_", " ").title())
        category_key = "".join(ch.lower() if ch.isalnum() else "_" for ch in label).strip("_") or category
        return DeviceInfo(
            identifiers={(DOMAIN, f"category:{category_key}")},
            name=f"Maintenance – {label}",
            manufacturer="Maintenance Dashboard",
            model="Maintenance category",
            sw_version=VERSION,
            via_device=(DOMAIN, "dashboard"),
        )
    return dashboard_device_info()


def desired_task_sensor_specs(tasks: list[dict[str, Any]], mode: str) -> dict[str, tuple[str, str]]:
    specs: dict[str, tuple[str, str]] = {}
    for task in tasks:
        if task.get("deleted"):
            continue
        entity_key = task_entity_key(task)
        for metric in TASK_SENSOR_MODES.get(mode, ()):
            unique_id = task_unique_id(DOMAIN, entity_key, metric)
            specs[unique_id] = (str(task["id"]), metric)
    return specs


def desired_task_binary_specs(tasks: list[dict[str, Any]], mode: str) -> dict[str, tuple[str, str]]:
    specs: dict[str, tuple[str, str]] = {}
    if mode not in TASK_BINARY_SENSOR_MODES:
        return specs
    for task in tasks:
        if task.get("deleted"):
            continue
        entity_key = task_entity_key(task)
        unique_id = task_unique_id(DOMAIN, entity_key, "due")
        specs[unique_id] = (str(task["id"]), "due")
    return specs


def is_task_entity_unique_id(unique_id: str | None) -> bool:
    value = str(unique_id or "")
    return value.startswith(f"{DOMAIN}_") and any(value.endswith(f"_{metric}") for metric in TASK_METRICS)


async def async_cleanup_orphaned_task_entities(
    hass: HomeAssistant,
    entry: ConfigEntry,
    desired_unique_ids: set[str],
) -> int:
    """Remove stale task entities from the entity registry."""
    registry = er.async_get(hass)
    removed = 0
    for registry_entry in list(er.async_entries_for_config_entry(registry, entry.entry_id)):
        if not is_task_entity_unique_id(registry_entry.unique_id):
            continue
        if registry_entry.unique_id in desired_unique_ids:
            continue
        registry.async_remove(registry_entry.entity_id)
        removed += 1
    return removed
