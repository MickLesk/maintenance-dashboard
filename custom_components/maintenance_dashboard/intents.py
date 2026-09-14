"""Assist intents: complete a maintenance task or ask what is due.

Maintenance is done with both hands busy, so speaking is often the only free
input. The intent helper is imported inside the registration function: one
optional feature must never be able to stop the integration from loading.
"""

from __future__ import annotations

import logging
from typing import Any

from homeassistant.core import HomeAssistant

from .const import DOMAIN
from .i18n_generated import translate

_LOGGER = logging.getLogger(__name__)

INTENT_MARK_DONE = "MaintenanceDashboardMarkDone"
INTENT_DUE = "MaintenanceDashboardDue"
DUE_STATUSES = ("overdue", "critical", "warning")
MAX_SPOKEN_TASKS = 5


def _managers(hass: HomeAssistant) -> list[Any]:
    return [manager for manager in (hass.data.get(DOMAIN) or {}).values() if hasattr(manager, "tasks")]


def _normalize(value: Any) -> str:
    return " ".join(str(value or "").lower().split())


def find_task(hass: HomeAssistant, spoken: str) -> tuple[Any, dict[str, Any] | None]:
    """Match a spoken name against the task names, most specific first."""
    wanted = _normalize(spoken)
    if not wanted:
        return None, None
    exact: tuple[Any, dict[str, Any]] | None = None
    partial: tuple[Any, dict[str, Any]] | None = None
    overlap: tuple[int, Any, dict[str, Any]] | None = None
    wanted_words = set(wanted.split())

    for manager in _managers(hass):
        for task in manager.tasks:
            if task.get("deleted"):
                continue
            name = _normalize(task.get("name"))
            if not name:
                continue
            if name == wanted:
                exact = (manager, task)
            elif partial is None and (wanted in name or name in wanted):
                partial = (manager, task)
            else:
                shared = len(wanted_words & set(name.split()))
                if shared and (overlap is None or shared > overlap[0]):
                    overlap = (shared, manager, task)

    if exact:
        return exact
    if partial:
        return partial
    if overlap:
        return overlap[1], overlap[2]
    return None, None


def due_tasks(hass: HomeAssistant) -> list[dict[str, Any]]:
    """Open tasks that are warning, critical or overdue, worst first."""
    rows = []
    for manager in _managers(hass):
        for task in manager.tasks:
            if task.get("deleted") or not task.get("enabled", True):
                continue
            runtime = manager.runtime_for_task(task)
            if runtime.status not in DUE_STATUSES:
                continue
            rows.append({
                "name": task.get("name"),
                "status": runtime.status,
                "rank": DUE_STATUSES.index(runtime.status),
                "due_at": runtime.due_at or "",
            })
    return sorted(rows, key=lambda row: (row["rank"], row["due_at"]))


def async_register_intents(hass: HomeAssistant) -> None:
    try:
        import voluptuous as vol
        from homeassistant.helpers import config_validation as cv
        from homeassistant.helpers import intent
    except Exception:  # noqa: BLE001
        _LOGGER.warning("Assist intents are unavailable on this Home Assistant version", exc_info=True)
        return

    class MarkDoneIntent(intent.IntentHandler):
        intent_type = INTENT_MARK_DONE
        slot_schema = {vol.Required("name"): cv.string}

        async def async_handle(self, intent_obj: intent.Intent) -> intent.IntentResponse:
            language = intent_obj.language or intent_obj.hass.config.language
            slots = self.async_validate_slots(intent_obj.slots)
            spoken = slots["name"]["value"]
            manager, task = find_task(intent_obj.hass, spoken)
            response = intent_obj.create_response()
            if task is None:
                response.async_set_speech(translate(language, "intentTaskNotFound", name=spoken))
                return response
            await manager.async_mark_done(task["id"], note=translate(language, "intentCompletedNote"))
            response.async_set_speech(translate(language, "intentMarkedDone", name=task.get("name")))
            return response

    class DueIntent(intent.IntentHandler):
        intent_type = INTENT_DUE
        slot_schema: dict[Any, Any] = {}

        async def async_handle(self, intent_obj: intent.Intent) -> intent.IntentResponse:
            language = intent_obj.language or intent_obj.hass.config.language
            rows = due_tasks(intent_obj.hass)
            response = intent_obj.create_response()
            if not rows:
                response.async_set_speech(translate(language, "intentNothingDue"))
                return response
            if len(rows) == 1:
                response.async_set_speech(translate(language, "intentOneDue", name=rows[0]["name"]))
                return response
            names = ", ".join(str(row["name"]) for row in rows[:MAX_SPOKEN_TASKS])
            response.async_set_speech(translate(language, "intentSeveralDue", count=len(rows), names=names))
            return response

    try:
        intent.async_register(hass, MarkDoneIntent())
        intent.async_register(hass, DueIntent())
    except Exception:  # noqa: BLE001
        _LOGGER.warning("Registering the maintenance Assist intents failed", exc_info=True)
