"""Import integration modules without booting Home Assistant.

The package __init__ pulls in half of Home Assistant, so the modules under test
are imported through a package object whose __init__ is never executed. Their
relative imports keep working. Modules that do touch Home Assistant get a stub
when it is not installed, so the suite runs in a bare checkout too.
"""

from __future__ import annotations

import importlib
import sys
import types
from pathlib import Path

PACKAGE = "maintenance_dashboard_under_test"
ROOT = Path(__file__).resolve().parents[1] / "custom_components" / "maintenance_dashboard"


def _stub_homeassistant() -> None:
    try:
        importlib.import_module("homeassistant.core")
        return
    except Exception:  # noqa: BLE001
        pass
    homeassistant = types.ModuleType("homeassistant")
    core = types.ModuleType("homeassistant.core")
    core.HomeAssistant = object
    core.callback = lambda func: func
    sys.modules.setdefault("homeassistant", homeassistant)
    sys.modules.setdefault("homeassistant.core", core)


def load(name: str):
    """Return one module of the integration, importing it at most once."""
    _stub_homeassistant()
    if PACKAGE not in sys.modules:
        package = types.ModuleType(PACKAGE)
        package.__path__ = [str(ROOT)]
        sys.modules[PACKAGE] = package
    return importlib.import_module(f"{PACKAGE}.{name}")
