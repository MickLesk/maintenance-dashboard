from __future__ import annotations

from collections.abc import Callable
from typing import Any

import voluptuous as vol

from homeassistant.components.device_automation import DEVICE_CONDITION_BASE_SCHEMA
from homeassistant.const import CONF_DEVICE_ID, CONF_DOMAIN, CONF_TYPE
from homeassistant.core import HomeAssistant
from homeassistant.helpers import config_validation as cv

from .const import DOMAIN

CONF_TASK_ID = "task_id"
CONF_CATEGORY = "category"
CONF_STATUS = "status"
CONDITION_TYPES = {
    "any_critical",
    "any_overdue",
    "any_unavailable",
    "category_has_due",
    "category_has_status",
    "task_is_overdue",
    "task_status_is",
}

CONDITION_SCHEMA = DEVICE_CONDITION_BASE_SCHEMA.extend(
    {
        vol.Required(CONF_TYPE): vol.In(CONDITION_TYPES),
        vol.Optional(CONF_TASK_ID): cv.string,
        vol.Optional(CONF_CATEGORY): cv.string,
        vol.Optional(CONF_STATUS): cv.string,
    }
)


async def async_get_conditions(hass: HomeAssistant, device_id: str) -> list[dict[str, Any]]:
    return [
        {
            "condition": "device",
            CONF_DOMAIN: DOMAIN,
            CONF_DEVICE_ID: device_id,
            CONF_TYPE: condition_type,
        }
        for condition_type in CONDITION_TYPES
    ]


async def async_condition_from_config(
    hass: HomeAssistant,
    config: dict[str, Any],
) -> Callable[[HomeAssistant, dict[str, Any]], bool]:
    def test_condition(_hass: HomeAssistant, _variables: dict[str, Any]) -> bool:
        managers = _hass.data.get(DOMAIN, {})
        if not managers:
            return False
        manager = next(iter(managers.values()))
        condition_type = config[CONF_TYPE]
        if condition_type == "any_critical":
            return any(
                manager.runtime_for_task(task).status in {"critical", "overdue"}
                for task in manager.tasks
                if not task.get("deleted") and task.get("enabled", True)
            )
        if condition_type == "any_overdue":
            return any(
                manager.runtime_for_task(task).status == "overdue"
                for task in manager.tasks
                if not task.get("deleted") and task.get("enabled", True)
            )
        if condition_type == "any_unavailable":
            return any(
                manager.runtime_for_task(task).status == "unavailable"
                for task in manager.tasks
                if not task.get("deleted") and task.get("enabled", True)
            )
        if condition_type == "category_has_due":
            category = config.get(CONF_CATEGORY)
            return any(
                task.get("category") == category
                and manager.runtime_for_task(task).status in {"warning", "critical", "overdue"}
                for task in manager.tasks
                if not task.get("deleted") and task.get("enabled", True)
            )
        if condition_type == "category_has_status":
            category = config.get(CONF_CATEGORY)
            status = config.get(CONF_STATUS)
            return any(
                task.get("category") == category
                and manager.runtime_for_task(task).status == status
                for task in manager.tasks
                if not task.get("deleted") and task.get("enabled", True)
            )
        task_id = config.get(CONF_TASK_ID)
        task = next((item for item in manager.tasks if item.get("id") == task_id), None)
        if condition_type == "task_status_is":
            return bool(task and manager.runtime_for_task(task).status == config.get(CONF_STATUS))
        return bool(task and manager.runtime_for_task(task).status == "overdue")

    return test_condition


async def async_get_condition_capabilities(
    hass: HomeAssistant, config: dict[str, Any]
) -> dict[str, vol.Schema]:
    """Return condition-specific fields for the automation editor."""
    condition_type = config.get(CONF_TYPE)
    if condition_type == "category_has_due":
        return {"extra_fields": vol.Schema({vol.Required(CONF_CATEGORY): cv.string})}
    if condition_type == "category_has_status":
        return {"extra_fields": vol.Schema({vol.Required(CONF_CATEGORY): cv.string, vol.Required(CONF_STATUS): cv.string})}
    if condition_type == "task_is_overdue":
        return {"extra_fields": vol.Schema({vol.Required(CONF_TASK_ID): cv.string})}
    if condition_type == "task_status_is":
        return {"extra_fields": vol.Schema({vol.Required(CONF_TASK_ID): cv.string, vol.Required(CONF_STATUS): cv.string})}
    return {"extra_fields": vol.Schema({})}
