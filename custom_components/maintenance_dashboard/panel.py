from __future__ import annotations

import logging
from pathlib import Path

from aiohttp import web

from homeassistant.components import frontend
from homeassistant.components.http import HomeAssistantView, StaticPathConfig
from homeassistant.core import HomeAssistant

from .const import (
    DOMAIN,
    MEDIA_URL,
    PANEL_ELEMENT,
    PANEL_ICON,
    PANEL_MODULE_URL,
    PANEL_TITLE,
    PANEL_URL,
    STATIC_URL,
)

_LOGGER = logging.getLogger(__name__)
REGISTERED = f"_{DOMAIN}_panel_registered"


async def async_register_panel(hass: HomeAssistant) -> None:
    if hass.data.get(REGISTERED):
        return

    www_path = Path(__file__).parent / "www"
    await hass.http.async_register_static_paths([StaticPathConfig(STATIC_URL, str(www_path), True)])

    # Attachments are served through an authenticated view rather than the
    # static path above, which is public.
    hass.http.register_view(MaintenanceMediaView(hass))

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


class MaintenanceMediaView(HomeAssistantView):
    """Serve a completion attachment to a signed-in Home Assistant user."""

    url = f"{MEDIA_URL}/{{attachment_id}}"
    name = f"api:{DOMAIN}:media"
    requires_auth = True

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass

    async def get(self, request: web.Request, attachment_id: str) -> web.Response:
        managers = self.hass.data.get(DOMAIN, {})
        if not managers:
            return web.Response(status=503)
        manager = next(iter(managers.values()))
        try:
            found = await manager.async_read_media(attachment_id)
        except ValueError:
            return web.Response(status=400)
        if found is None:
            return web.Response(status=404)
        record, payload = found
        return web.Response(
            body=payload,
            content_type=record.get("mime_type") or "application/octet-stream",
            headers={"Cache-Control": "private, max-age=3600"},
        )

