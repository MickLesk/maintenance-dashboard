from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def read_json(relative: str) -> dict:
    return json.loads((ROOT / relative).read_text(encoding="utf-8"))


def extract(pattern: str, relative: str) -> str:
    text = (ROOT / relative).read_text(encoding="utf-8")
    match = re.search(pattern, text, re.MULTILINE)
    if not match:
        raise RuntimeError(f"Could not extract version from {relative}")
    return match.group(1)


package_version = read_json("package.json")["version"]
versions = {
    "package.json": package_version,
    "package-lock.json": read_json("package-lock.json")["version"],
    "manifest.json": read_json("custom_components/maintenance_dashboard/manifest.json")["version"],
    "const.py": extract(r'^VERSION = "([^"]+)"', "custom_components/maintenance_dashboard/const.py"),
    "constants.ts": extract(r'^const VERSION = "([^"]+)";', "frontend/src/core/constants.ts"),
    "panel.js": extract(r'^const VERSION = "([^"]+)";', "custom_components/maintenance_dashboard/www/maintenance-dashboard-panel.js"),
}
if len(set(versions.values())) != 1:
    raise RuntimeError(f"Version mismatch: {versions}")

for path in ROOT.rglob("*.json"):
    if "node_modules" not in path.parts:
        json.loads(path.read_text(encoding="utf-8"))

for path in (ROOT / "frontend/src").rglob("*.ts"):
    text = path.read_text(encoding="utf-8").lower()
    for forbidden in ("placeholder for future extraction", "todo: implement", "fixme: implement"):
        if forbidden in text:
            raise RuntimeError(f"Placeholder marker found in {path.relative_to(ROOT)}")

bundle = ROOT / "custom_components/maintenance_dashboard/www/maintenance-dashboard-panel.js"
if not bundle.exists() or bundle.stat().st_size < 10_000:
    raise RuntimeError("Compiled frontend bundle is missing or unexpectedly small")

print(f"Repository validation passed for v{package_version}")
