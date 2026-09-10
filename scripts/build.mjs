import { mkdir, readFile, writeFile, copyFile, access, readdir } from 'node:fs/promises';
import { constants } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname } from 'node:path';

const sources = [
  'frontend/src/core/constants.ts',
  'frontend/src/types.ts',
  'frontend/src/maintenance-dashboard-panel.ts',
  'frontend/src/core/persistence.ts',
  'frontend/src/core/keyboard.ts',
  'frontend/src/components/app-header.ts',
  'frontend/src/views/dashboard-view.ts',
  'frontend/src/views/templates-view.ts',
  'frontend/src/components/task-card.ts',
  'frontend/src/views/statistics-view.ts',
  'frontend/src/views/assets-view.ts',
  'frontend/src/views/mobile-sheet.ts',
  'frontend/src/dialogs/quality-dialog.ts',
  'frontend/src/dialogs/shortcuts-dialog.ts',
  'frontend/src/dialogs/template-import-dialog.ts',
  'frontend/src/components/template-card.ts',
  'frontend/src/views/settings-view.ts',
  'frontend/src/dialogs/history-dialog.ts',
  'frontend/src/dialogs/task-editor-dialog.ts',
  'frontend/src/dialogs/diagnostics-dialog.ts',
  'frontend/src/dialogs/template-preview-dialog.ts',
  'frontend/src/dialogs/completion-dialog.ts',
  'frontend/src/dialogs/onboarding-dialog.ts',
  'frontend/src/dialogs/data-dialog.ts',
  'frontend/src/dialogs/notification-dialog.ts',
  'frontend/src/events.ts',
  'frontend/src/api.ts',
  'frontend/src/state.ts',
  'frontend/src/utils.ts',
  'frontend/src/styles.ts',
  'frontend/src/register.ts',
];
const target = 'custom_components/maintenance_dashboard/www/maintenance-dashboard-panel.js';
const logoSource = 'public/logo.png';
const logoTarget = 'custom_components/maintenance_dashboard/www/logo.png';
const backendCatalogTarget = 'custom_components/maintenance_dashboard/i18n_generated.py';

// Keys the Python side renders into notifications. Kept explicit rather than
// prefix-based so existing UI keys can be reused instead of duplicated.
const BACKEND_KEYS = [
  'brandName',
  'warning', 'critical', 'unavailable', 'open', 'health',
  'notifyStatus_ok', 'notifyStatus_warning', 'notifyStatus_critical', 'notifyStatus_overdue',
  'notifyStatus_unavailable', 'notifyStatus_snoozed', 'notifyStatus_completed',
  'notifyUnit_days', 'notifyUnit_hours', 'notifyUnit_weeks', 'notifyUnit_months',
  'priority1', 'priority2', 'priority3', 'priority4', 'priority5',
  'general', 'heating', 'ventilation', 'water', 'electrical', 'safety', 'solar',
  'garden', 'building', 'it_network', 'household', 'garage', 'custom',
  'notifyTaskTitle', 'notifyTaskTitleUrgent', 'notifyTaskBody', 'notifyTaskBodyUrgent',
  'notifyFieldPriority', 'notifyFieldCategory', 'notifyFieldRemaining', 'notifyFieldDashboard',
  'notifyActionDone', 'notifyActionSnooze', 'notifyActionOpen',
  'notifyDigestTitle', 'notifyDigestNext',
  'notifyRemainingOverdue', 'notifyRemainingLeft', 'notifyRemainingUnknown',
  'notifyTestTitle', 'notifyTestBody', 'notifyChannel', 'notifyCompletedFromAction',
  'notifyCompletedFromTodo', 'notifyCreatedFromTodo',
];

async function buildI18nChunk() {
  const locales = (await readdir('frontend/src/i18n'))
    .filter(name => name.endsWith('.json'))
    .map(name => name.slice(0, -5))
    .sort();
  if (!locales.includes('en')) {
    throw new Error('i18n requires frontend/src/i18n/en.json as fallback locale');
  }
  const catalogs = {};
  for (const locale of locales) {
    catalogs[locale] = JSON.parse(await readFile(`frontend/src/i18n/${locale}.json`, 'utf8'));
  }
  const baseKeys = Object.keys(catalogs.en).sort();
  for (const locale of locales) {
    const keys = Object.keys(catalogs[locale]).sort();
    const missing = baseKeys.filter(key => !keys.includes(key));
    const extra = keys.filter(key => !baseKeys.includes(key));
    if (missing.length || extra.length) {
      throw new Error(`i18n key mismatch for ${locale}: missing=${missing.join(',')} extra=${extra.join(',')}`);
    }
  }
  backendCatalogs = {};
  for (const locale of locales) {
    const subset = {};
    for (const key of BACKEND_KEYS) {
      if (!(key in catalogs[locale])) {
        throw new Error(`Backend catalog key "${key}" is missing from ${locale}.json`);
      }
      subset[key] = catalogs[locale][key];
    }
    backendCatalogs[locale] = subset;
  }
  return `// ---- generated from frontend/src/i18n/*.json ----\nconst I18N_LOCALES = Object.freeze(${JSON.stringify(locales)});\nconst I18N = Object.freeze(${JSON.stringify(catalogs, null, 2)});`;
}

function backendDigest(catalogs) {
  const canonical = JSON.stringify(
    Object.keys(catalogs).sort().map(locale => [
      locale,
      Object.keys(catalogs[locale]).sort().map(key => [key, catalogs[locale][key]]),
    ]),
  );
  return createHash('sha256').update(canonical, 'utf8').digest('hex');
}

function renderBackendCatalog(catalogs) {
  const body = Object.keys(catalogs).sort().map(locale => {
    const entries = Object.keys(catalogs[locale]).sort()
      .map(key => `        ${JSON.stringify(key)}: ${JSON.stringify(catalogs[locale][key])},`)
      .join('\n');
    return `    ${JSON.stringify(locale)}: {\n${entries}\n    },`;
  }).join('\n');
  return `"""Generated by scripts/build.mjs from frontend/src/i18n/*.json. Do not edit."""

from __future__ import annotations

from typing import Any

FALLBACK_LOCALE = "en"
SOURCE_DIGEST = ${JSON.stringify(backendDigest(catalogs))}

STRINGS: dict[str, dict[str, str]] = {
${body}
}


def translate(locale: str | None, key: str, **params: Any) -> str:
    """Return the localized string for key, falling back to English."""
    language = str(locale or "").split("-", 1)[0].lower()
    catalog = STRINGS.get(language) or STRINGS[FALLBACK_LOCALE]
    template = catalog.get(key) or STRINGS[FALLBACK_LOCALE].get(key) or key
    if not params:
        return template
    try:
        return template.format(**params)
    except (KeyError, IndexError, ValueError):
        return template
`;
}

let backendCatalogs = {};

await mkdir(dirname(target), { recursive: true });
const chunks = [];
for (const source of sources) {
  chunks.push(`// ---- ${source} ----\n${await readFile(source, 'utf8')}`);
  if (source === 'frontend/src/core/constants.ts') {
    chunks.push(await buildI18nChunk());
  }
}
await writeFile(target, `${chunks.join('\n\n')}\n`, 'utf8');
await writeFile(backendCatalogTarget, renderBackendCatalog(backendCatalogs), 'utf8');

try {
  await access(logoSource, constants.R_OK);
  await copyFile(logoSource, logoTarget);
} catch {
  // Logo asset is optional for development builds.
}
