from __future__ import annotations

import voluptuous as vol

from homeassistant import config_entries
from homeassistant.core import callback

from .const import DOMAIN, NAME

class MaintenanceDashboardConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    VERSION = 1

    async def async_step_user(self, user_input=None):
        await self.async_set_unique_id(DOMAIN)
        self._abort_if_unique_id_configured()

        if user_input is not None:
            return self.async_create_entry(title=user_input.get("title", NAME), data={"title": user_input.get("title", NAME)})

        return self.async_show_form(
            step_id="user",
            data_schema=vol.Schema({vol.Optional("title", default=NAME): str}),
        )

    @staticmethod
    @callback
    def async_get_options_flow(config_entry):
        return MaintenanceDashboardOptionsFlow(config_entry)

class MaintenanceDashboardOptionsFlow(config_entries.OptionsFlow):
    def __init__(self, config_entry):
        self.config_entry = config_entry

    async def async_step_init(self, user_input=None):
        if user_input is not None:
            return self.async_create_entry(title="", data=user_input)

        return self.async_show_form(
            step_id="init",
            data_schema=vol.Schema({
                vol.Optional("history_retention", default=self.config_entry.options.get("history_retention", 500)): int,
                vol.Optional("show_in_sidebar", default=self.config_entry.options.get("show_in_sidebar", True)): bool,
            }),
        )
