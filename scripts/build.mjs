import { mkdir, readFile, writeFile, copyFile, access, readdir } from 'node:fs/promises';
import { constants } from 'node:fs';
import { dirname } from 'node:path';

const sources = [
  'frontend/src/core/constants.ts',
  'frontend/src/core/persistence.ts',
  'frontend/src/core/keyboard.ts',
  'frontend/src/types.ts',
  'frontend/src/maintenance-dashboard-panel.ts',
  'frontend/src/components/app-header.ts',
  'frontend/src/views/dashboard-view.ts',
  'frontend/src/views/templates-view.ts',
  'frontend/src/components/task-card.ts',
  'frontend/src/views/statistics-view.ts',
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
  return `// ---- generated from frontend/src/i18n/*.json ----\nconst I18N_LOCALES = Object.freeze(${JSON.stringify(locales)});\nconst I18N = Object.freeze(${JSON.stringify(catalogs, null, 2)});`;
}

await mkdir(dirname(target), { recursive: true });
const chunks = [];
for (const source of sources) {
  chunks.push(`// ---- ${source} ----\n${await readFile(source, 'utf8')}`);
  if (source === 'frontend/src/core/constants.ts') {
    chunks.push(await buildI18nChunk());
  }
}
await writeFile(target, `${chunks.join('\n\n')}\n`, 'utf8');

try {
  await access(logoSource, constants.R_OK);
  await copyFile(logoSource, logoTarget);
} catch {
  // Logo asset is optional for development builds.
}
