from __future__ import annotations

from collections.abc import Callable

from homeassistant.components.binary_sensor import BinarySensorEntity, BinarySensorDeviceClass
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from .const import DOMAIN
from .manager import MaintenanceManager

async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry, async_add_entities) -> None:
    manager: MaintenanceManager = hass.data[DOMAIN][entry.entry_id]
    async_add_entities([
        MaintenanceCriticalBinarySensor(manager),
        MaintenanceWarningBinarySensor(manager),
    ])

class _BaseMaintenanceBinarySensor(BinarySensorEntity):
    _attr_has_entity_name = True
    _attr_device_class = BinarySensorDeviceClass.PROBLEM

    def __init__(self, manager: MaintenanceManager) -> None:
        self._manager = manager
        self._remove_listener: Callable[[], None] | None = None

    async def async_added_to_hass(self) -> None:
        self._remove_listener = self._manager.async_add_listener(self.async_write_ha_state)

    async def async_will_remove_from_hass(self) -> None:
        if self._remove_listener:
            self._remove_listener()
            self._remove_listener = None

class MaintenanceCriticalBinarySensor(_BaseMaintenanceBinarySensor):
    _attr_unique_id = f"{DOMAIN}_has_critical_tasks"
    _attr_name = "Has Critical Tasks"
    _attr_icon = "mdi:alert-circle"

    @property
    def is_on(self) -> bool:
        return self._manager.get_summary()["critical"] > 0

class MaintenanceWarningBinarySensor(_BaseMaintenanceBinarySensor):
    _attr_unique_id = f"{DOMAIN}_has_warning_tasks"
    _attr_name = "Has Warning Tasks"
    _attr_icon = "mdi:alert-outline"

    @property
    def is_on(self) -> bool:
        return self._manager.get_summary()["warning"] > 0
