import { mkdir, readFile, writeFile, copyFile, access } from 'node:fs/promises';
import { constants } from 'node:fs';
import { dirname } from 'node:path';

const sources = [
  'frontend/src/core/constants.ts',
  'frontend/src/types.ts',
  'frontend/src/maintenance-dashboard-panel.ts',
  'frontend/src/components/app-header.ts',
  'frontend/src/views/dashboard-view.ts',
  'frontend/src/components/task-card.ts',
  'frontend/src/views/templates-view.ts',
  'frontend/src/components/template-card.ts',
  'frontend/src/views/settings-view.ts',
  'frontend/src/dialogs/history-dialog.ts',
  'frontend/src/dialogs/task-editor-dialog.ts',
  'frontend/src/dialogs/diagnostics-dialog.ts',
  'frontend/src/dialogs/template-preview-dialog.ts',
  'frontend/src/dialogs/completion-dialog.ts',
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

await mkdir(dirname(target), { recursive: true });
const chunks = [];
for (const source of sources) {
  chunks.push(`// ---- ${source} ----\n${await readFile(source, 'utf8')}`);
}
await writeFile(target, `${chunks.join('\n\n')}\n`, 'utf8');

try {
  await access(logoSource, constants.R_OK);
  await copyFile(logoSource, logoTarget);
} catch {
  // Logo asset is optional for development builds.
}
