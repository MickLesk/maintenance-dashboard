// Drives the built panel in a real browser and checks the behaviour that is
// invisible to a type check: dialog semantics, focus handling, keyboard
// shortcuts, deep links, theme selection. Skips when Playwright is absent, so
// it stays optional for contributors.
import { copyFileSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');

let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  console.log('Playwright is not installed, skipping. npm i -D playwright && npx playwright install chromium');
  process.exit(0);
}

const { default: fixtures } = await import('./panel-harness/fixtures.mjs');
const work = mkdtempSync(resolve(tmpdir(), 'maintenance-panel-'));
copyFileSync(resolve(here, 'panel-harness/index.html'), resolve(work, 'index.html'));
copyFileSync(resolve(root, 'custom_components/maintenance_dashboard/www/maintenance-dashboard-panel.js'), resolve(work, 'panel.js'));
writeFileSync(resolve(work, 'fixtures.js'), `window.FIXTURES = ${JSON.stringify(fixtures)};`);

const results = [];
const errors = [];
const check = (name, value) => {
  results.push({ name, ok: value === true });
  return value === true;
};

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });

const open = async query => {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  page.on('pageerror', error => errors.push(String(error)));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto(`file://${resolve(work, 'index.html')}${query}`);
  await page.waitForFunction(() => window.__ready === true, { timeout: 20000 });
  await page.waitForTimeout(300);
  return page;
};

let page = await open('?view=dashboard&task=filter_change');
check('a deep link opens the task detail',
  await page.evaluate(() => window.__panel._taskDetailId) === 'filter_change');
check('every status chip carries an icon, not only a colour', await page.evaluate(() => {
  const chips = [...window.__panel.shadowRoot.querySelectorAll('.task-card .status')];
  return chips.length > 0 && chips.every(chip => chip.querySelector('ha-icon'));
}));
check('for: filters by assignee', await page.evaluate(() => {
  const panel = window.__panel;
  panel._search = 'for:anna';
  const names = panel._filteredTasks(false).map(task => task.name);
  panel._search = '';
  return names.length === 1 && names[0] === 'Backup-Wiederherstellung testen';
}));
await page.close();

page = await open('?view=dashboard');
await page.evaluate(() => { window.__panel._completionDialog = 'boiler_service'; window.__panel._render(); });
await page.waitForTimeout(300);
check('the dialog announces itself as a modal dialog', await page.evaluate(() => {
  const dialog = window.__panel.shadowRoot.querySelector('.dialog');
  return dialog?.getAttribute('role') === 'dialog'
    && dialog?.getAttribute('aria-modal') === 'true'
    && Boolean(dialog?.getAttribute('aria-labelledby'));
}));
check('focus moves into the dialog when it opens', await page.evaluate(() => {
  const dialog = window.__panel.shadowRoot.querySelector('.dialog');
  return Boolean(dialog?.contains(window.__panel.shadowRoot.activeElement));
}));
check('Tab cycles inside the dialog', await page.evaluate(() => {
  const panel = window.__panel;
  const dialog = panel.shadowRoot.querySelector('.dialog');
  const items = panel._focusableIn(dialog);
  items[items.length - 1].focus();
  window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
  return panel.shadowRoot.activeElement === items[0];
}));
check('Escape closes the dialog', await page.evaluate(() => {
  const panel = window.__panel;
  window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
  return panel._completionDialog === null;
}));
await page.close();

page = await open('?view=dashboard');
check('typing ? in a field does not open the shortcuts dialog', await page.evaluate(() => {
  const panel = window.__panel;
  const search = panel.shadowRoot.getElementById('search');
  search.focus();
  panel._handleKeyboard({ key: '?', target: panel, composedPath: () => [search], preventDefault() {} });
  return panel._shortcutsDialogOpen === false;
}));
check('? opens it from the page itself', await page.evaluate(() => {
  const panel = window.__panel;
  panel._handleKeyboard({ key: '?', target: panel, composedPath: () => [panel.shadowRoot.querySelector('.shell')], preventDefault() {} });
  return panel._shortcutsDialogOpen === true;
}));
await page.close();

page = await open('?view=dashboard&theme=light');
check('the light theme follows Home Assistant',
  await page.evaluate(() => window.__panel.classList.contains('theme-light')));
check('the light background is applied',
  await page.evaluate(() => getComputedStyle(window.__panel).backgroundColor) === 'rgb(254, 247, 255)');
check('the setting overrides Home Assistant', await page.evaluate(() => {
  const panel = window.__panel;
  panel._state.settings.dashboard.theme = 'dark';
  panel._render();
  const dark = !panel.classList.contains('theme-light');
  panel._state.settings.dashboard.theme = 'light';
  panel.hass = { ...panel.hass, themes: { darkMode: true } };
  panel._render();
  return dark && panel.classList.contains('theme-light');
}));
await page.close();

page = await open('?view=settings');
check('the label sheet renders one QR per task', await page.evaluate(() => {
  const panel = window.__panel;
  panel._labelsDialogOpen = true;
  panel._render();
  const cards = panel.shadowRoot.querySelectorAll('.label-card');
  const codes = panel.shadowRoot.querySelectorAll('.label-card .qr');
  return cards.length === panel._labelTasks().length && codes.length === cards.length;
}));
check('a completion without a connection is queued', await page.evaluate(async () => {
  const panel = window.__panel;
  localStorage.removeItem('maintenance-dashboard-pending-completions');
  const hass = panel.hass;
  panel.hass = { ...hass, connection: { ...hass.connection, connected: false }, callWS: async msg => {
    if (msg.type.endsWith('get_state') || msg.type.endsWith('get_statistics')) return hass.callWS(msg);
    throw new Error('Connection lost');
  } };
  await panel._markDone('gutter_clean', { note: 'im Keller' });
  const queued = JSON.parse(localStorage.getItem('maintenance-dashboard-pending-completions') || '[]');
  return queued.length === 1 && queued[0].task_id === 'gutter_clean' && queued[0].details.note === 'im Keller';
}));
check('the queue is replayed on the next load', await page.evaluate(async () => {
  const panel = window.__panel;
  const sent = [];
  panel.hass = { ...panel.hass, connection: { connected: true, subscribeEvents: async () => () => {} }, callWS: async msg => {
    if (msg.type in window.FIXTURES) return JSON.parse(JSON.stringify(window.FIXTURES[msg.type]));
    sent.push(msg);
    return { ok: true };
  } };
  await panel._load();
  return sent.length === 1
    && sent[0].type === 'maintenance_dashboard/mark_done'
    && !localStorage.getItem('maintenance-dashboard-pending-completions');
}));
await page.close();

await browser.close();
rmSync(work, { recursive: true, force: true });

for (const result of results) console.log(`${result.ok ? 'PASS' : 'FAIL'}  ${result.name}`);
const failed = results.filter(result => !result.ok);
const unique = [...new Set(errors)];
if (unique.length) console.error(`\nconsole errors:\n${unique.join('\n')}`);
if (failed.length || unique.length) process.exit(1);
console.log(`\n${results.length} panel checks passed.`);
