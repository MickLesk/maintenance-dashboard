// Enough state to render the panel outside Home Assistant. Small and explicit:
// the checks in scripts/verify_panel.mjs read these names back.
const DAY = 86400000;
const iso = offsetDays => new Date(Date.now() + offsetDays * DAY).toISOString();

const SPECS = [
  ['boiler_service', 'Heizung warten', 'heating', 5, 'overdue', -12, 'Mickey'],
  ['filter_change', 'Lüftungsfilter wechseln', 'ventilation', 4, 'critical', 2, 'Service Nord'],
  ['smoke_detectors', 'Rauchmelder prüfen', 'safety', 5, 'warning', 9, ''],
  ['gutter_clean', 'Dachrinne reinigen', 'building', 3, 'ok', 46, 'Mickey'],
  ['mower_blades', 'Mähroboter-Messer tauschen', 'garden', 2, 'snoozed', 20, ''],
  ['backup_check', 'Backup-Wiederherstellung testen', 'it_network', 4, 'ok', 64, 'Anna'],
  ['solar_clean', 'Solarmodule reinigen', 'solar', 2, 'unavailable', null, ''],
];

const PROGRESS = { overdue: 100, critical: 94, warning: 74, ok: 38, snoozed: 55, unavailable: 0 };

const tasks = SPECS.map(([id, name, category, priority, status, days, assignee], index) => ({
  id,
  name,
  category,
  priority,
  assignee: assignee || null,
  icon: 'mdi:wrench-clock',
  type: 'time',
  schedule_mode: 'interval',
  interval: 90,
  interval_unit: 'days',
  enabled: true,
  deleted: false,
  position: index,
  tags: index % 2 === 0 ? ['haus', 'winter'] : [],
  area_name: index % 3 === 0 ? 'Keller' : '',
  workflow_state: index === 1 ? 'in_progress' : 'open',
  description: index < 3 ? 'Wartung laut Herstellerintervall.' : '',
  checklist: index < 2
    ? [{ id: 's1', label: 'Filter prüfen', done: index === 1, required: true, minutes: 10 },
       { id: 's2', label: 'Dichtung fetten', done: false, required: false, minutes: 5 }]
    : [],
  notifications: { enabled: true },
  snoozed_until: status === 'snoozed' ? iso(20) : null,
}));

const runtime = Object.fromEntries(SPECS.map(([id, , , , status, days]) => [id, {
  task_id: id,
  status,
  current: null,
  limit: null,
  progress: PROGRESS[status],
  remaining: days,
  due_at: days === null ? null : iso(days),
  last_done: iso(-90 + (days || 0)),
  unavailable_reason: status === 'unavailable' ? 'entity_missing' : null,
  period_start: null,
  schedule_label: 'alle 90 Tage',
}]));

const settings = {
  dashboard: {
    view_mode: 'cards', density: 'comfortable', theme: 'auto', default_due_filter: 'all',
    show_quick_filters: false, remember_last_view: true, cost_tracking: true,
    default_currency: 'EUR', saved_filters: [],
    widgets: ['health', 'open', 'critical', 'warning'],
  },
  modules: { documents: true, consumption: true, inventory: true, budget: true },
  workflow: { show_checklists: true, default_state: 'open' },
  native_platforms: {
    todo_enabled: true, calendar_enabled: true, calendar_event_duration_minutes: 60,
    ical_enabled: true, ical_token: 'Xq7fL2m9TzR4vB8nK1cW5dYs',
  },
  notifications: { enabled: true },
  backups: {}, data_integrity: {}, budget: {}, onboarding: { completed: true },
  user_templates: { custom: [], favorites: [] },
};

export default {
  'maintenance_dashboard/get_state': {
    version: '3.1.0b4',
    schema_version: 6,
    tasks,
    runtime,
    settings,
    history: [],
    templates: [],
    backups: [],
    quarantine: [],
    audit: [],
    assets: [],
    documents: [],
    parts: [],
    media: [],
    asset_expiries: [],
    asset_costs: {},
    restock_alerts: [],
    template_favorites: [],
    statistics_years: [new Date().getFullYear()],
    history_count: 0,
    backup_count: 0,
    diagnostics: {},
    integrity: {},
    meta: {},
    native_platforms: {
      todo_enabled: true, todo_item_count: tasks.length,
      calendar_enabled: true, calendar_event_count: tasks.length,
      calendar_event_duration_minutes: 60,
      ical_enabled: true,
      ical_path: '/api/maintenance_dashboard/calendar/Xq7fL2m9TzR4vB8nK1cW5dYs.ics',
      automation_triggers: [], automation_conditions: [],
    },
    summary: {
      health: 78, active: tasks.length, open: tasks.length, ok: 2, critical: 1, warning: 1,
      snoozed: 1, unavailable: 1, workflow_open: 6, in_progress: 1, blocked: 0,
      completed_one_time: 0, completed_this_year: 41,
      next_task: { id: 'boiler_service', name: 'Heizung warten', status: 'overdue' },
    },
  },
  'maintenance_dashboard/get_statistics': {
    year: new Date().getFullYear(),
    available_years: [new Date().getFullYear()],
    cost_tracking: true,
    currency: 'EUR',
    totals: { cost: 0, completions: 0, materials: 0 },
    by_category: {}, by_month: {}, top_cost_tasks: [],
    is_current_year: true,
    activity: { days: {}, max: 0, active_days: 0, total: 0, busiest: null },
    backlog: { total_days: 12, weighted_days: 60, tasks: 1, worst: [{ task_id: 'boiler_service', name: 'Heizung warten', days: 12, priority: 5 }] },
    reliability: {}, runs: {}, effort: {}, forecast: { months: [] },
    health_trend: [], health_trend_since: null,
  },
};
