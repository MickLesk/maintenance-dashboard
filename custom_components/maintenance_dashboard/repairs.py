from __future__ import annotations

from typing import Any

import voluptuous as vol

from homeassistant import data_entry_flow
from homeassistant.components.repairs import RepairsFlow
from homeassistant.core import HomeAssistant

from .const import DOMAIN
from .repair_issues import ISSUE_DATA_INTEGRITY


class IntegrityRepairFlow(RepairsFlow):
    """Confirm and execute a non-destructive integrity repair."""

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass

    async def async_step_init(
        self, user_input: dict[str, Any] | None = None
    ) -> data_entry_flow.FlowResult:
        return await self.async_step_confirm(user_input)

    async def async_step_confirm(
        self, user_input: dict[str, Any] | None = None
    ) -> data_entry_flow.FlowResult:
        if user_input is not None:
            managers = self.hass.data.get(DOMAIN, {})
            if managers:
                manager = next(iter(managers.values()))
                await manager.async_repair_integrity()
            return self.async_create_entry(title="", data={})
        return self.async_show_form(step_id="confirm", data_schema=vol.Schema({}))


async def async_create_fix_flow(
    hass: HomeAssistant,
    issue_id: str,
    data: dict[str, str | int | float | None] | None,
) -> RepairsFlow:
    """Create the requested Repairs flow."""
    if issue_id == ISSUE_DATA_INTEGRITY:
        return IntegrityRepairFlow(hass)
    raise ValueError(f"Unsupported repair issue: {issue_id}")
