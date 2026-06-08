import { mkdir, readFile, copyFile, access } from 'node:fs/promises';
import { constants } from 'node:fs';
import { dirname } from 'node:path';

const source = 'frontend/src/maintenance-dashboard-panel.ts';
const target = 'custom_components/maintenance_dashboard/www/maintenance-dashboard-panel.js';
const logoSource = 'public/logo.png';
const logoTarget = 'custom_components/maintenance_dashboard/www/logo.png';

await mkdir(dirname(target), { recursive: true });
const content = await readFile(source, 'utf8');
await mkdir(dirname(target), { recursive: true });
await import('node:fs/promises').then(fs => fs.writeFile(target, content, 'utf8'));

try {
  await access(logoSource, constants.R_OK);
  await copyFile(logoSource, logoTarget);
} catch {
  // Logo asset is optional for development builds.
}
