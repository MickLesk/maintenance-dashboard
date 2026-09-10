from __future__ import annotations

import logging
from pathlib import Path

from homeassistant.components import frontend
from homeassistant.components.http import StaticPathConfig
from homeassistant.core import HomeAssistant

from .const import DOMAIN, PANEL_ELEMENT, PANEL_ICON, PANEL_MODULE_URL, PANEL_TITLE, PANEL_URL, STATIC_URL

_LOGGER = logging.getLogger(__name__)
REGISTERED = f"_{DOMAIN}_panel_registered"


async def async_register_panel(hass: HomeAssistant) -> None:
    if hass.data.get(REGISTERED):
        return

    www_path = Path(__file__).parent / "www"
    await hass.http.async_register_static_paths([StaticPathConfig(STATIC_URL, str(www_path), True)])

    frontend.async_register_built_in_panel(
        hass,
        component_name="custom",
        sidebar_title=PANEL_TITLE,
        sidebar_icon=PANEL_ICON,
        frontend_url_path=PANEL_URL,
        require_admin=False,
        config={
            "_panel_custom": {
                "name": PANEL_ELEMENT,
                "module_url": PANEL_MODULE_URL,
                "embed_iframe": False,
                "trust_external": False,
            }
        },
    )
    hass.data[REGISTERED] = True


async def async_unregister_panel(hass: HomeAssistant) -> None:
    if not hass.data.pop(REGISTERED, None):
        return
    frontend.async_remove_panel(hass, PANEL_URL)
