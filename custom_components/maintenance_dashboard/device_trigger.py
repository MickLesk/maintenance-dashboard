from __future__ import annotations

from typing import Any

import voluptuous as vol

from homeassistant.components.device_automation import DEVICE_TRIGGER_BASE_SCHEMA
from homeassistant.components.homeassistant.triggers import event as event_trigger
from homeassistant.const import CONF_DEVICE_ID, CONF_DOMAIN, CONF_PLATFORM, CONF_TYPE
from homeassistant.core import HomeAssistant
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.trigger import TriggerActionType, TriggerInfo

from .const import (
    DOMAIN,
    EVENT_TASK_COMPLETED,
    EVENT_TASK_CRITICAL,
    EVENT_TASK_OVERDUE,
    EVENT_TASK_SNOOZED,
    EVENT_TASK_STATUS_CHANGED,
    EVENT_TASK_UNAVAILABLE,
    EVENT_TASK_WARNING,
)

CONF_TASK_ID = "task_id"
CONF_CATEGORY = "category"
CONF_STATUS = "status"
TRIGGER_EVENT_MAP = {
    "task_status_changed": EVENT_TASK_STATUS_CHANGED,
    "task_warning": EVENT_TASK_WARNING,
    "task_critical": EVENT_TASK_CRITICAL,
    "task_overdue": EVENT_TASK_OVERDUE,
    "task_unavailable": EVENT_TASK_UNAVAILABLE,
    "task_completed": EVENT_TASK_COMPLETED,
    "task_snoozed": EVENT_TASK_SNOOZED,
}

TRIGGER_SCHEMA = DEVICE_TRIGGER_BASE_SCHEMA.extend(
    {
        vol.Required(CONF_TYPE): vol.In(TRIGGER_EVENT_MAP),
        vol.Optional(CONF_TASK_ID): cv.string,
        vol.Optional(CONF_CATEGORY): cv.string,
        vol.Optional(CONF_STATUS): cv.string,
    }
)


async def async_get_triggers(hass: HomeAssistant, device_id: str) -> list[dict[str, Any]]:
    return [
        {
            CONF_PLATFORM: "device",
            CONF_DOMAIN: DOMAIN,
            CONF_DEVICE_ID: device_id,
            CONF_TYPE: trigger_type,
        }
        for trigger_type in TRIGGER_EVENT_MAP
    ]


async def async_attach_trigger(
    hass: HomeAssistant,
    config: dict[str, Any],
    action: TriggerActionType,
    trigger_info: TriggerInfo,
) -> Any:
    event_config: dict[str, Any] = {
        CONF_PLATFORM: "event",
        "event_type": TRIGGER_EVENT_MAP[config[CONF_TYPE]],
    }
    if task_id := config.get(CONF_TASK_ID):
        event_config.setdefault("event_data", {})["id"] = task_id
    if category := config.get(CONF_CATEGORY):
        event_config.setdefault("event_data", {})["category"] = category
    if status := config.get(CONF_STATUS):
        event_config.setdefault("event_data", {})["status"] = status
    event_config = event_trigger.TRIGGER_SCHEMA(event_config)
    return await event_trigger.async_attach_trigger(
        hass,
        event_config,
        action,
        trigger_info,
        platform_type="device",
    )


async def async_get_trigger_capabilities(
    hass: HomeAssistant, config: dict[str, Any]
) -> dict[str, vol.Schema]:
    """Return optional task filtering fields for the automation editor."""
    return {
        "extra_fields": vol.Schema(
            {
                vol.Optional(CONF_TASK_ID): cv.string,
                vol.Optional(CONF_CATEGORY): cv.string,
                vol.Optional(CONF_STATUS): cv.string,
            }
        )
    }
