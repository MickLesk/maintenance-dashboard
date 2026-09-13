# Development

Building the panel, running the checks and finding your way around.

## Development

Install frontend dependencies:

```bash
npm ci
```

Build the browser panel:

```bash
npm run build
```

Type check the panel sources:

```bash
npm run typecheck
```

`scripts/typecheck.mjs` runs `tsc` over `frontend/src` and fails on anything
that is not a consequence of the `Object.assign` prototype pattern the panel is
built on: undefined identifiers, syntax errors, wrong call arity. The expected
diagnostics (implicit `any`, properties on `this`) are filtered by error code.

Run all unit tests:

```bash
npm test
```

The test step is skipped when the checkout has no `tests/` directory, so the
distribution repository validates without them.

`tests/_integration.py` imports the integration modules through a package
object whose `__init__` is never executed, so their relative imports keep
working without booting Home Assistant, and stubs Home Assistant only when it
is not installed.

Run individual suites:

```bash
npm run test:scheduling
npm run test:templates
```

Run the complete validation set:

```bash
npm ci --no-audit --no-fund
npm run validate
```

The validation command builds the frontend bundle, checks JavaScript syntax, runs all Python unit and structure tests, compiles the integration and validates versions, JSON, YAML, WebSocket contracts and release contents.

Two optional checks cover what neither the type check nor the unit tests can
see. Both skip cleanly when their dependency is missing, so they stay optional.

Drive the built panel in a real browser:

```bash
npm i -D playwright && npx playwright install chromium
npm run verify:panel
```

It loads the compiled bundle against a fixture Home Assistant and asserts the
behaviour that only exists at runtime: dialog role and focus trap, Escape and
Tab handling, the shortcut suppression while typing, deep links, the light and
dark choice, the QR label sheet and the offline completion queue.

Check the built-in QR encoder against the reference implementation:

```bash
pip install qrcode
npm run verify:qr
```

It compares every module of every version and mask against `python-qrcode`.

The build produces the assets Home Assistant and HACS load:

```text
custom_components/maintenance_dashboard/www/maintenance-dashboard-panel.js
custom_components/maintenance_dashboard/www/logo.png
```

These compiled assets must be committed because HACS does not build the frontend during installation.

## Frontend translations

The panel UI translations are maintained as JSON catalogs:

```text
frontend/src/i18n/de.json
frontend/src/i18n/en.json
```

`en.json` is the fallback catalog. The build reads every `*.json` file in `frontend/src/i18n`, verifies that all locales expose the same keys and injects the generated `I18N` catalog into the shipped panel bundle. To add another language, add a new locale JSON file with the same keys.

## Repository layout

```text
custom_components/maintenance_dashboard/
├── __init__.py
├── binary_sensor.py
├── calendar.py
├── config_flow.py
├── const.py
├── data_integrity.py
├── device_condition.py
├── device_trigger.py
├── diagnostics.py
├── entity_management.py
├── manager.py
├── notification_policy.py
├── notifications.py
├── panel.py
├── recovery.py
├── repair_issues.py
├── repairs.py
├── scheduling.py
├── sensor.py
├── services.py
├── services.yaml
├── settings.py
├── storage_migrations.py
├── task_entities.py
├── templates.py
├── todo.py
├── websocket.py
└── www/
    ├── logo.png
    └── maintenance-dashboard-panel.js

frontend/src/
├── components/
├── core/
├── dialogs/
├── views/
├── api.ts
├── events.ts
├── maintenance-dashboard-panel.ts
├── state.ts
├── styles.ts
├── types.ts
└── utils.ts

tests/
├── test_data_integrity.py
├── test_manager_structure.py
├── test_notification_policy.py
├── test_recovery.py
├── test_release_structure.py
├── test_scheduling.py
├── test_settings_v16.py
├── test_storage_migrations.py
├── test_task_entities.py
└── test_templates.py
```
