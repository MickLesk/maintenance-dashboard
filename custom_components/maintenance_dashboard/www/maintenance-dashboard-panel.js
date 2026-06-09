// ---- frontend/src/core/constants.ts ----
// @ts-nocheck
const VERSION = "1.3.1";
const LOGO_URL = `/api/maintenance_dashboard/static/logo.png?v=${VERSION}`;

const CATEGORY_KEYS = ["general", "heating", "ventilation", "water", "electrical", "safety", "solar", "garden", "building", "it_network", "household", "garage", "custom"];
const STATUS_ORDER = { overdue: 0, critical: 1, warning: 2, unavailable: 3, snoozed: 4, ok: 5, completed: 6, disabled: 7, deleted: 8 };
const STATUS_ACCENTS = {
  overdue: "var(--error-color)",
  critical: "var(--error-color)",
  warning: "var(--warning-color)",
  unavailable: "var(--disabled-text-color)",
  snoozed: "var(--primary-color)",
  ok: null,
  completed: "var(--success-color, #4caf50)"
};
const ICONS = [
  "mdi:wrench-clock", "mdi:air-filter", "mdi:heat-pump-outline", "mdi:fan", "mdi:water-pump", "mdi:smoke-detector-outline",
  "mdi:home-battery-outline", "mdi:robot-mower-outline", "mdi:fire-extinguisher", "mdi:server-network", "mdi:home-roof", "mdi:garage",
  "mdi:solar-power-variant-outline", "mdi:medical-bag", "mdi:tumble-dryer", "mdi:fridge-outline", "mdi:router-network", "mdi:valve"
];

const COLOR_PALETTE = [
  "#00bcd4", "#03a9f4", "#3f51b5", "#673ab7", "#9c27b0", "#e91e63",
  "#f44336", "#ff5722", "#ff9800", "#ffc107", "#8bc34a", "#4caf50",
  "#009688", "#607d8b", "#795548"
];

const CARD_COLOR_PALETTE = [
  "#102a43", "#123524", "#2d1b3d", "#3a1f1f", "#332800", "#16213e",
  "#102f2f", "#2b2435", "#232323", "#1f2937", "#312e21", "#1f2a1f"
];

const PRIORITY_LABELS = {
  de: { 1: "Niedrig", 2: "Normal", 3: "Wichtig", 4: "Hoch", 5: "Kritisch" },
  en: { 1: "Low", 2: "Normal", 3: "Important", 4: "High", 5: "Critical" }
};

const I18N = {
  de: {
    add: "Wartungseintrag hinzufügen", addFirst: "Ersten Wartungseintrag hinzufügen", active: "Offen", all: "Alle", backups: "Backups", cancel: "Abbrechen", cardColor: "Kartenfarbe", category: "Kategorie", clear: "Aufheben", clearSnooze: "Pause aufheben", completedThisYear: "Dieses Jahr erledigt", critical: "Kritisch", dashboard: "Dashboard", delete: "Löschen", deleted: "Gelöscht", description: "Beschreibung", diagnostics: "Diagnose", done: "Erledigt", due: "Fällig", edit: "Bearbeiten", enabled: "Aktiviert", entity: "Entität", health: "Health-Score", healthHelp: "Gewichteter Score aus Status, Priorität und Verfügbarkeit. Kritische Aufgaben mit hoher Priorität senken ihn deutlich stärker.", history: "Historie", icon: "Icon", iconColor: "Iconfarbe", interval: "Intervall", intervalUnit: "Einheit", lastDone: "Zuletzt erledigt", materialEmpty: "Starte mit einer Vorlage oder lege einen eigenen Wartungseintrag an. Die Daten werden backendseitig in Home Assistant gespeichert.", meter: "Sensor/Zähler", name: "Name", next: "Nächste Aufgabe", noTasks: "Noch keine Wartungseinträge vorhanden.", ok: "OK", overdue: "Überfällig", priority: "Priorität", progress: "Fortschritt", remaining: "verbleibend", restore: "Wiederherstellen", save: "Speichern", search: "Suche", selectTemplate: "Aus Vorlage starten", selectedTemplates: "ausgewählt", settings: "Einstellungen", snooze: "Pausieren", snoozeFor: "Pausieren für", sort: "Sortieren", sortSmart: "Smart", sortPosition: "Manuell", sortPriority: "Priorität", sortDue: "Fälligkeit", sortStatus: "Status", status: "Status", templates: "Vorlagen", templateSelectHint: "Wähle mehrere Vorlagen aus und füge nur die passenden hinzu – kein Vollspammen mehr.", time: "Zeit", undo: "Rückgängig", unavailable: "Nicht verfügbar", unavailableHelp: "Sensor-/Zähleraufgaben ohne valide Entity, ungültige Limits oder aktuell nicht lesbare HA-States.", warning: "Warnung", warnings: "Warnungen", days: "Tage", hours: "Stunden", weeks: "Wochen", months: "Monate", general: "Allgemein", heating: "Heizung", ventilation: "Lüftung", water: "Wasser", electrical: "Elektrik", safety: "Sicherheit", solar: "Solar", garden: "Garten", building: "Gebäude", it_network: "IT/Netzwerk", household: "Haushalt", garage: "Garage", custom: "Manuell", addSelected: "Gewählte hinzufügen", selectAllVisible: "Sichtbare auswählen", deselectAll: "Auswahl leeren", pausedUntil: "Pausiert bis", dragHint: "Manuelle Sortierung per Drag & Drop oder Pfeile. Smart-Sortierung nutzt Status, Priorität, Fälligkeit und manuelle Position.", randomColors: "Zufällige Farben", clearColors: "Farben zurücksetzen", priorityHint: "Priorität beeinflusst Smart-Sortierung und Health-Score.", appearanceHint: "Farben sind optional. Leer bedeutet: Home-Assistant-Theme verwenden.", openHistory: "Historie öffnen", focusNextTask: "Zur nächsten Aufgabe springen", noHistory: "Noch keine Historie vorhanden.", nextTaskHint: "Klicken, um zur Aufgabe zu springen", taskFocused: "Aufgabe hervorgehoben", previousTask: "Vorherige Aufgabe", nextTask: "Nächste Aufgabe", taskCounter: "Aufgabe", noTemplatesMatch: "Keine passenden Vorlagen gefunden.", noTasksMatch: "Keine passenden Wartungseinträge gefunden.", settingsIntro: "Konfiguration, Diagnose und Backups für dein Maintenance Dashboard.", actionSaved: "Wartungseintrag gespeichert", actionDone: "Wartungseintrag erledigt", actionSnoozed: "Wartungseintrag pausiert", actionSnoozeCleared: "Pause aufgehoben", actionUndo: "Historieneintrag rückgängig gemacht", actionDeleted: "Wartungseintrag gelöscht", actionRestored: "Backup wiederhergestellt", actionTemplatesAdded: "Vorlagen hinzugefügt"
  },
  en: {
    add: "Add maintenance task", addFirst: "Add first maintenance task", active: "Open", all: "All", backups: "Backups", cancel: "Cancel", cardColor: "Card color", category: "Category", clear: "Clear", clearSnooze: "Clear snooze", completedThisYear: "Done this year", critical: "Critical", dashboard: "Dashboard", delete: "Delete", deleted: "Deleted", description: "Description", diagnostics: "Diagnostics", done: "Done", due: "Due", edit: "Edit", enabled: "Enabled", entity: "Entity", health: "Health score", healthHelp: "Weighted score based on status, priority and availability. High-priority critical tasks reduce it much more strongly.", history: "History", icon: "Icon", iconColor: "Icon color", interval: "Interval", intervalUnit: "Unit", lastDone: "Last done", materialEmpty: "Start with a template or create a custom maintenance task. Data is stored by the backend inside Home Assistant.", meter: "Sensor/Meter", name: "Name", next: "Next task", noTasks: "No maintenance tasks yet.", ok: "OK", overdue: "Overdue", priority: "Priority", progress: "Progress", remaining: "remaining", restore: "Restore", save: "Save", search: "Search", selectTemplate: "Start from template", selectedTemplates: "selected", settings: "Settings", snooze: "Snooze", snoozeFor: "Snooze for", sort: "Sort", sortSmart: "Smart", sortPosition: "Manual", sortPriority: "Priority", sortDue: "Due date", sortStatus: "Status", status: "Status", templates: "Templates", templateSelectHint: "Select multiple templates and add only what fits.", time: "Time", undo: "Undo", unavailable: "Unavailable", unavailableHelp: "Meter tasks without a valid entity, invalid limits or currently unreadable Home Assistant states.", warning: "Warning", warnings: "Warnings", days: "Days", hours: "Hours", weeks: "Weeks", months: "Months", general: "General", heating: "Heating", ventilation: "Ventilation", water: "Water", electrical: "Electrical", safety: "Safety", solar: "Solar", garden: "Garden", building: "Building", it_network: "IT/Network", household: "Household", garage: "Garage", custom: "Manual", addSelected: "Add selected", selectAllVisible: "Select visible", deselectAll: "Clear selection", pausedUntil: "Paused until", dragHint: "Manual sorting via drag & drop or arrows. Smart sorting uses status, priority, due date and manual position.", randomColors: "Random colors", clearColors: "Reset colors", priorityHint: "Priority affects smart sorting and health score.", appearanceHint: "Colors are optional. Empty means: use the Home Assistant theme.", openHistory: "Open history", focusNextTask: "Jump to next task", noHistory: "No history yet.", nextTaskHint: "Click to jump to the task", taskFocused: "Task highlighted", previousTask: "Previous task", nextTask: "Next task", taskCounter: "Task", noTemplatesMatch: "No matching templates found.", noTasksMatch: "No matching maintenance tasks found.", settingsIntro: "Configuration, diagnostics and backups for your Maintenance Dashboard.", actionSaved: "Maintenance task saved", actionDone: "Maintenance task marked as done", actionSnoozed: "Maintenance task snoozed", actionSnoozeCleared: "Snooze cleared", actionUndo: "History entry undone", actionDeleted: "Maintenance task deleted", actionRestored: "Backup restored", actionTemplatesAdded: "Templates added"
  }
};

Object.assign(I18N.de, {
  entityMode: "Task-Entities", entityModeHint: "Optional pro Wartungseintrag eigene Home-Assistant-Entities erzeugen.", off: "Aus", dueOnly: "Nur fällig", basic: "Basis", full: "Vollständig", dueNotifications: "Fällig-Benachrichtigungen", warningNotifications: "Warnungen", criticalNotifications: "Kritisch", dailyDigest: "Täglicher Digest", digestTime: "Digest-Zeit", quietHours: "Ruhezeiten", quietFrom: "Ruhe ab", quietTo: "Ruhe bis", includeSnoozed: "Pausierte einbeziehen", includeDashboardLink: "Dashboard-Link einfügen", notifyDueTasks: "Fällige Aufgaben senden",
  dataSafety: "Datensicherheit", exportData: "Exportieren", importData: "Importieren", backupRestore: "Backup & Restore", downloadBackup: "Backup herunterladen", importJson: "JSON importieren", importPaste: "JSON hier einfügen", restoreBackup: "Backup wiederherstellen", copyDiagnostics: "Diagnose kopieren", notifications: "Benachrichtigungen", notifyService: "Notify-Service", testNotification: "Test senden", sendDigest: "Digest senden", templateCategory: "Vorlagen-Kategorie", preview: "Vorschau", addTemplate: "Vorlage hinzufügen", recommended: "Empfohlen", seasonal: "Saisonal", spring: "Frühling", summer: "Sommer", autumn: "Herbst", winter: "Winter", scheduleMode: "Planung", intervalSchedule: "Intervall", oneTime: "Einmalig", fixedDate: "Fixes Datum", completionNote: "Erledigt-Notiz", markDone: "Als erledigt speichern", noteOptional: "Optionale Notiz", actionExported: "Export erstellt", actionImported: "Daten importiert", actionNotificationSent: "Benachrichtigung gesendet", mobileMore: "Mehr", completed: "Erledigt"
});
Object.assign(I18N.en, {
  entityMode: "Task entities", entityModeHint: "Optionally create Home Assistant entities for individual maintenance tasks.", off: "Off", dueOnly: "Due only", basic: "Basic", full: "Full", dueNotifications: "Due notifications", warningNotifications: "Warnings", criticalNotifications: "Critical", dailyDigest: "Daily digest", digestTime: "Digest time", quietHours: "Quiet hours", quietFrom: "Quiet from", quietTo: "Quiet to", includeSnoozed: "Include snoozed", includeDashboardLink: "Include dashboard link", notifyDueTasks: "Send due tasks",
  dataSafety: "Data safety", exportData: "Export", importData: "Import", backupRestore: "Backup & Restore", downloadBackup: "Download backup", importJson: "Import JSON", importPaste: "Paste JSON here", restoreBackup: "Restore backup", copyDiagnostics: "Copy diagnostics", notifications: "Notifications", notifyService: "Notify service", testNotification: "Send test", sendDigest: "Send digest", templateCategory: "Template category", preview: "Preview", addTemplate: "Add template", recommended: "Recommended", seasonal: "Seasonal", spring: "Spring", summer: "Summer", autumn: "Autumn", winter: "Winter", scheduleMode: "Schedule", intervalSchedule: "Interval", oneTime: "One-time", fixedDate: "Fixed date", completionNote: "Completion note", markDone: "Save completion", noteOptional: "Optional note", actionExported: "Export created", actionImported: "Data imported", actionNotificationSent: "Notification sent", mobileMore: "More", completed: "Done"
});

const TEMPLATE_CATEGORY_KEYS = ["recommended", "heating", "ventilation", "water", "electrical", "safety", "solar", "garden", "building", "it_network", "household", "garage", "seasonal"];
const SCHEDULE_MODES = ["interval", "one_time", "fixed_date", "seasonal"];

const EMPTY = {
  name: "", type: "time", schedule_mode: "interval", interval: "90", interval_unit: "days", entity_id: "", category: "general", custom_category: "", area_id: "", area_name: "", priority: "3", icon: "mdi:wrench-clock", icon_color: "", card_color: "", enabled: true, warning_threshold: "70", critical_threshold: "90", description: "", last_done: "", fixed_month: "1", fixed_day: "1", season: "autumn", completion_note: ""
};


// ---- frontend/src/types.ts ----
// Runtime data contracts for the backend-owned Maintenance Dashboard panel.
// These definitions are intentionally JSDoc-based because the lightweight build
// concatenates source modules directly into the Home Assistant panel bundle.

/**
 * @typedef {Object} MaintenanceTask
 * @property {string} id
 * @property {string} name
 * @property {"time"|"meter"} type
 * @property {"interval"|"one_time"|"fixed_date"|"seasonal"} schedule_mode
 * @property {number} interval
 * @property {"hours"|"days"|"weeks"|"months"} interval_unit
 * @property {number} priority
 * @property {string} category
 * @property {boolean} enabled
 */

/**
 * @typedef {Object} RuntimeState
 * @property {"ok"|"warning"|"critical"|"overdue"|"snoozed"|"unavailable"|"completed"|"disabled"|"deleted"} status
 * @property {number} progress
 * @property {number|null} remaining
 * @property {string|null} due_at
 */

/**
 * @typedef {Object} MaintenanceTemplate
 * @property {string} id
 * @property {string} name
 * @property {string} category
 * @property {number} interval
 * @property {number} priority
 */

const FRONTEND_CONTRACTS = Object.freeze({
  task: ["id", "name", "type", "schedule_mode", "interval", "interval_unit", "priority", "category", "enabled"],
  runtime: ["status", "progress", "remaining", "due_at"],
  template: ["id", "name", "category", "interval", "priority", "description"],
  backup: ["id", "created_at", "task_count", "history_count"],
  settings: ["notifications", "task_entities"],
});

function hasContractFields(value, contract) {
  return Boolean(value && FRONTEND_CONTRACTS[contract]?.every((key) => Object.prototype.hasOwnProperty.call(value, key)));
}


// ---- frontend/src/maintenance-dashboard-panel.ts ----
// Main custom element shell and lifecycle. Feature/rendering methods are attached by split modules.
class MaintenanceDashboardPanel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._view = "dashboard";
    this._state = null;
    this._draft = { ...EMPTY };
    this._dialog = null;
    this._diagnostics = false;
    this._historyDialog = false;
    this._search = "";
    this._statusFilter = "all";
    this._sortMode = "smart";
    this._dragTaskId = null;
    this._snoozeMenu = null;
    this._selectedTemplates = new Set();
    this._busy = false;
    this._error = "";
    this._searchTimer = null;
    this._nextTaskOffset = 0;
    this._toast = null;
    this._toastTimer = null;
    this._templateCategory = "recommended";
    this._templatePreview = null;
    this._dataDialog = false;
    this._notificationDialog = false;
    this._completionDialog = null;
    this._completionNote = "";
    this._importPayload = "";
    this._notifyService = "";
  }

  set hass(value) { this._hass = value; if (!this._state) this._load(); this._subscribe(); }

  get hass() { return this._hass; }

  connectedCallback() { this._load(); this._render(); }

  disconnectedCallback() { if (this._unsubscribe) this._unsubscribe(); }

  async _subscribe() {
    if (!this.hass?.connection?.subscribeEvents || this._unsubscribe) return;
    this._unsubscribe = await this.hass.connection.subscribeEvents(() => this._load(), "maintenance_dashboard_updated");
  }

  async _load() {
    if (!this.hass?.callWS) return;
    try {
      this._state = await this.hass.callWS({ type: "maintenance_dashboard/get_state" });
      this._error = "";
    } catch (e) {
      this._error = String(e);
    }
    this._render();
  }

  _lang() { return String(this.hass?.language || this.hass?.locale?.language || document.documentElement.lang || "en").toLowerCase().startsWith("de") ? "de" : "en"; }

  _t(key) { return I18N[this._lang()][key] || I18N.en[key] || key; }

  _html(value) { return String(value ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[c])); }

  _render() {
    const focusState = this._captureFocus();
    const content = this._state ? this._viewHtml() : `<div class="loading">Loading…</div>`;
    this.shadowRoot.innerHTML = `${this._styles()}<main class="shell">${this._hero()}${content}${this._dialogHtml()}${this._historyDialogHtml()}${this._diagnosticsHtml()}${this._dataDialogHtml()}${this._notificationDialogHtml()}${this._templatePreviewHtml()}${this._completionDialogHtml()}${this._toastHtml()}</main>`;
    this._bind();
    this._restoreFocus(focusState);
  }

  _renderSoon(delay = 180) {
    if (this._searchTimer) clearTimeout(this._searchTimer);
    this._searchTimer = setTimeout(() => { this._searchTimer = null; this._render(); }, delay);
  }

  _captureFocus() {
    const active = this.shadowRoot?.activeElement;
    const dialog = this.shadowRoot?.querySelector(".dialog");
    const shell = this.shadowRoot?.querySelector(".shell");
    return {
      id: active?.id || "",
      start: active?.selectionStart,
      end: active?.selectionEnd,
      dialogScrollTop: dialog?.scrollTop || 0,
      shellScrollTop: shell?.scrollTop || 0,
    };
  }

  _restoreFocus(state) {
    requestAnimationFrame(() => {
      const dialog = this.shadowRoot?.querySelector(".dialog");
      const shell = this.shadowRoot?.querySelector(".shell");
      if (dialog && typeof state?.dialogScrollTop === "number") dialog.scrollTop = state.dialogScrollTop;
      if (shell && typeof state?.shellScrollTop === "number") shell.scrollTop = state.shellScrollTop;
      if (!state?.id) return;
      const el = this.shadowRoot?.getElementById(state.id);
      if (!el) return;
      el.focus();
      if (typeof el.setSelectionRange === "function" && state.start != null) {
        try { el.setSelectionRange(state.start, state.end ?? state.start); } catch (_) { }
      }
    });
  }
}


// ---- frontend/src/components/app-header.ts ----
// Header and navigation rendering.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _hero() {
    return `<section class="hero"><div class="hero-brand"><img src="${LOGO_URL}" alt="Maintenance Dashboard" class="hero-logo"><div><p class="eyebrow">Maintenance Dashboard</p><h1>Hauswartung & Technik</h1><p>Backend-gespeicherte Wartungsplanung mit Historie, Backups und Sidebar-Panel.</p></div></div><div class="hero-actions">${this._nav("dashboard", "mdi:view-dashboard", this._t("dashboard"))}${this._nav("templates", "mdi:shape-outline", this._t("templates"))}<button data-action="history-dialog" class="nav icon-nav" title="${this._t("openHistory")}"><ha-icon icon="mdi:history"></ha-icon><span class="sr-only">${this._t("history")}</span></button><button data-view="settings" class="nav icon-nav ${this._view === "settings" ? "active" : ""}" title="${this._t("settings")}"><ha-icon icon="mdi:cog"></ha-icon><span class="sr-only">${this._t("settings")}</span></button></div></section>`;
  },

  _nav(view, icon, label) { return `<button data-view="${view}" class="nav ${this._view === view ? "active" : ""}"><ha-icon icon="${icon}"></ha-icon>${label}</button>`; },

  _viewHtml() { if (this._view === "templates") return this._templatesHtml(); if (this._view === "settings") return this._settingsHtml(); return this._dashboardHtml(); }
});


// ---- frontend/src/views/dashboard-view.ts ----
// Dashboard view rendering, KPI cards and next-task cycling UI.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _dashboardHtml() {
    const s = this._state.summary || {};
    const tasks = this._filteredTasks(false);
    return `
      <section class="kpis">
        ${this._kpi("mdi:heart-pulse", this._t("health"), `${s.health ?? 100}%`, this._t("healthHelp"))}
        ${this._kpi("mdi:clipboard-list-outline", this._t("active"), s.open ?? s.active ?? 0, `${s.ok ?? 0} ${this._t("ok")}`)}
        ${(s.critical ?? 0) > 0 ? this._kpi("mdi:alert-circle", this._t("critical"), s.critical ?? 0) : ""}
        ${(s.warning ?? 0) > 0 ? this._kpi("mdi:alert-outline", this._t("warnings"), s.warning ?? 0) : ""}
        ${this._nextKpi()}
        ${this._kpi("mdi:check-decagram", this._t("completedThisYear"), s.completed_this_year ?? 0)}
        ${(s.unavailable ?? 0) > 0 ? this._kpi("mdi:cloud-question", this._t("unavailable"), s.unavailable ?? 0, this._t("unavailableHelp")) : ""}
      </section>
      <section class="toolbar expressive dashboard-toolbar">
        <div class="toolbar-copy">
          <p class="eyebrow">${this._t("dashboard")}</p>
          <h2>${this._t("dashboard")}</h2>
          <p>Neuen Eintrag anlegen, offene Aufgaben durchsuchen und die Liste nach Status oder Priorität eingrenzen.</p>
        </div>
        <div class="toolbar-main dashboard-main">
          <button data-action="create" class="primary big"><ha-icon icon="mdi:plus"></ha-icon>${this._t("add")}</button>
          <input id="search" class="search" placeholder="${this._t("search")}" value="${this._html(this._search)}">
          <label><span>${this._t("status")}</span><select id="statusFilter">${["all", "ok", "warning", "critical", "overdue", "snoozed", "unavailable"].map(x => `<option value="${x}" ${this._statusFilter === x ? "selected" : ""}>${this._t(x)}</option>`).join("")}</select></label>
          <label><span>${this._t("sort")}</span><select id="sortMode">${["smart", "position", "priority", "due", "status"].map(x => `<option value="${x}" ${this._sortMode === x ? "selected" : ""}>${this._t(`sort${x[0].toUpperCase()}${x.slice(1)}`)}</option>`).join("")}</select></label>
        </div>
      </section>
      ${tasks.length ? `<section class="task-grid">${tasks.map(t => this._taskCard(t)).join("")}</section>` : this._emptyHtml()}
    `;
  },

  _kpi(icon, label, value, sub = "", extraClass = "") {
    return `<article class="kpi ${this._html(extraClass)}" title="${this._html(sub)}"><ha-icon icon="${icon}"></ha-icon><div><small>${this._html(label)}</small><strong>${this._html(value)}</strong>${sub ? `<span>${this._html(sub)}</span>` : ""}</div></article>`;
  },

  _nextKpi() {
    const candidates = this._nextTaskCandidates();
    if (!candidates.length) return this._kpi("mdi:calendar-clock", this._t("next"), "—");
    if (this._nextTaskOffset >= candidates.length) this._nextTaskOffset = 0;
    const candidate = candidates[this._nextTaskOffset] || candidates[0];
    const task = candidate.task;
    const runtime = candidate.runtime;
    const name = this._shortTaskName(task.name || "—");
    const sub = runtime.remaining != null ? `${Math.ceil(Math.abs(runtime.remaining))} ${this._t("days")} ${runtime.remaining < 0 ? this._t("overdue") : this._t("remaining")}` : this._t("focusNextTask");
    const status = runtime.status || "ok";
    return `<article class="kpi next-kpi ${status}" data-focus-task="${this._html(task.id)}" title="${this._t("nextTaskHint")}">
      <ha-icon icon="mdi:calendar-clock"></ha-icon>
      <div class="next-kpi-body"><small>${this._t("next")}</small><strong>${this._html(name)}</strong><span>${this._html(sub)} · ${this._t("priority")} ${task.priority || 3}/5</span></div>
      ${candidates.length > 1 ? `<div class="next-cycle" title="${this._t("taskCounter")}"><button data-action="prev-next-task" title="${this._t("previousTask")}"><ha-icon icon="mdi:chevron-left"></ha-icon></button><span>${this._nextTaskOffset + 1}/${candidates.length}</span><button data-action="next-next-task" title="${this._t("nextTask")}"><ha-icon icon="mdi:chevron-right"></ha-icon></button></div>` : ""}
    </article>`;
  },

  _nextTaskCandidates() {
    const tasks = (this._state?.tasks || []).filter(task => !task.deleted && task.enabled !== false);
    const candidates = tasks.map(task => ({ task, runtime: this._state?.runtime?.[task.id] || {} }))
      .filter(item => item.runtime.status !== "snoozed" && item.runtime.status !== "disabled" && item.runtime.status !== "deleted" && item.runtime.remaining != null)
      .sort((a, b) => {
        const ar = a.runtime || {}; const br = b.runtime || {};
        return (STATUS_ORDER[ar.status] ?? 99) - (STATUS_ORDER[br.status] ?? 99)
          || (b.task.priority ?? 0) - (a.task.priority ?? 0)
          || this._dueValue(ar) - this._dueValue(br)
          || (a.task.position ?? 0) - (b.task.position ?? 0);
      });
    return candidates;
  },

  _shortTaskName(name) {
    const clean = String(name || "—").trim();
    if (clean.length <= 24) return clean;
    return `${clean.slice(0, 23)}…`;
  },

  _emptyHtml() {
    return `<section class="empty expressive-empty"><div class="empty-orb"><ha-icon icon="mdi:clipboard-plus-outline"></ha-icon></div><h2>${this._t("noTasks")}</h2><p>${this._t("materialEmpty")}</p><div class="empty-actions"><button class="primary big" data-action="create"><ha-icon icon="mdi:plus"></ha-icon>${this._t("addFirst")}</button><button class="ghost big" data-view="templates"><ha-icon icon="mdi:shape-plus-outline"></ha-icon>${this._t("templates")}</button></div></section>`;
  }
});


// ---- frontend/src/components/task-card.ts ----
// Task card rendering.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _taskCard(task) {
    const r = this._state.runtime[task.id] || {};
    const status = r.status || "unavailable";
    const progress = Math.min(100, Math.max(0, r.progress || 0));
    const accent = this._statusAccent(status, task.card_color || task.icon_color || "var(--primary-color)");
    const snoozed = status === "snoozed";
    const options = this._snoozeOptions(task);
    return `<article class="task-card ${status}" data-task-card="${this._html(task.id)}" style="--task-accent:${this._html(accent)}">
      <header>
        <div class="title-row"><span class="icon-chip" style="${task.icon_color ? `color:${this._html(task.icon_color)}` : ""}"><ha-icon icon="${this._html(task.icon || "mdi:wrench-clock")}"></ha-icon></span><div><h3>${this._html(task.name)}</h3><p>${this._categoryLabel(task)}${task.area_name ? ` · ${this._html(task.area_name)}` : ""}</p></div></div>
        <span class="status ${status}">${this._t(status)}</span>
      </header>
      ${task.description ? `<p class="description">${this._html(task.description)}</p>` : ""}
      <div class="progress-line"><span>${this._t("progress")}</span><strong>${Math.round(progress)}%</strong></div>
      <div class="progress"><div style="width:${progress}%"></div></div>
      <div class="meta-grid">
        <div><span>${this._t("lastDone")}</span><strong>${this._date(r.last_done)}</strong></div>
        <div><span>${this._t("due")}</span><strong>${this._date(r.due_at)}</strong></div>
        <div><span>${this._t("remaining")}</span><strong>${this._remaining(r, task)}</strong></div>
        <div><span>${this._t("priority")}</span><strong>${this._priorityLabel(task.priority)}<em>${task.priority}/5</em></strong></div>
      </div>
      ${snoozed ? `<div class="snooze-note"><ha-icon icon="mdi:pause-circle-outline"></ha-icon>${this._t("pausedUntil")} ${this._datetime(task.snoozed_until)}</div>` : ""}
      <footer class="actions">
        <button class="ghost icon-only" title="${this._t("edit")}" data-edit="${task.id}"><ha-icon icon="mdi:pencil"></ha-icon></button>
        <div class="snooze-wrap"><button class="ghost icon-only" title="${this._t("snooze")}" data-snooze-menu="${task.id}"><ha-icon icon="mdi:clock-plus-outline"></ha-icon></button>${this._snoozeMenu === task.id ? `<div class="snooze-menu"><strong>${this._t("snoozeFor")}</strong>${options.map(days => `<button data-snooze-days="${task.id}:${days}">${days} ${this._t("days")}</button>`).join("")}</div>` : ""}</div>
        ${snoozed ? `<button class="ghost" data-clear-snooze="${task.id}"><ha-icon icon="mdi:play-circle-outline"></ha-icon>${this._t("clearSnooze")}</button>` : ""}
        <button class="primary" data-done="${task.id}"><ha-icon icon="mdi:check"></ha-icon>${this._t("done")}</button>
      </footer>
    </article>`;
  }
});


// ---- frontend/src/views/templates-view.ts ----
// Categorized template library view rendering.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _templatesHtml() {
    const templates = (this._state.templates || [])
      .filter(t => this._templateCategory === "recommended" ? (t.recommended || Number(t.priority || 0) >= 4) : this._templateCategory === "seasonal" ? Boolean(t.season) : t.category === this._templateCategory)
      .filter(t => this._matches(t));
    const selected = templates.filter(t => this._selectedTemplates.has(t.id));
    const grouped = templates.reduce((acc, template) => {
      const key = template.category || "general";
      (acc[key] ||= []).push(template);
      return acc;
    }, {});
    const order = CATEGORY_KEYS.filter(key => grouped[key]?.length);
    const groupsHtml = order.map(key => `
      <section class="template-group">
        <div class="template-group-header"><div><p class="eyebrow">${this._t("category")}</p><h3>${this._t(key)}</h3></div><span>${grouped[key].length}</span></div>
        <div class="template-grid compact">${grouped[key].map(t => this._templateCard(t)).join("")}</div>
      </section>
    `).join("");
    return `<section class="toolbar expressive templates-toolbar"><div class="toolbar-copy"><p class="eyebrow">${this._t("templates")}</p><h2>${this._t("templates")}</h2><p>${this._t("templateSelectHint")}</p></div><div class="toolbar-main templates-main"><input id="search" class="search" placeholder="${this._t("search")}" value="${this._html(this._search)}"><button class="ghost" data-action="select-visible"><ha-icon icon="mdi:checkbox-multiple-marked-outline"></ha-icon>${this._t("selectAllVisible")}</button><button class="ghost" data-action="clear-template-selection"><ha-icon icon="mdi:checkbox-blank-off-outline"></ha-icon>${this._t("deselectAll")}</button><button class="primary big" data-action="add-selected" ${selected.length ? "" : "disabled"}><ha-icon icon="mdi:plus-box-multiple-outline"></ha-icon>${this._t("addSelected")} · ${selected.length}</button></div></section><section class="category-tabs" aria-label="${this._t("templateCategory")}">${TEMPLATE_CATEGORY_KEYS.map(k => `<button class="tab ${this._templateCategory === k ? "active" : ""}" data-template-category="${k}">${this._t(k)}</button>`).join("")}</section>${templates.length ? groupsHtml : this._emptyMessage("mdi:shape-outline", this._t("noTemplatesMatch"))}`;
  }
});


// ---- frontend/src/components/template-card.ts ----
// Template card rendering and preview entry points.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _templateCard(t) {
    const checked = this._selectedTemplates.has(t.id);
    const exists = (this._state.tasks || []).some(task => !task.deleted && String(task.name).toLowerCase() === String(t.name).toLowerCase());
    return `<article class="template-card compact ${checked ? "selected" : ""} ${exists ? "exists" : ""}" data-template-preview="${this._html(t.id)}"><header><label class="template-check" onclick="event.stopPropagation()"><input type="checkbox" data-template-check="${t.id}" ${checked ? "checked" : ""}><span></span></label><ha-icon icon="${this._html(t.icon)}"></ha-icon><h3>${this._html(t.name)}</h3></header><small>${this._categoryLabel(t)} · ${t.interval} ${this._unitLabel(t.interval_unit)} · ${this._t("priority")} ${t.priority}/5${t.season ? ` · ${this._t(t.season)}` : ""}</small><footer><button class="ghost" data-template-preview-btn="${t.id}"><ha-icon icon="mdi:eye-outline"></ha-icon>${this._t("preview")}</button><button class="ghost" data-template="${t.id}" ${exists ? "disabled" : ""}><ha-icon icon="mdi:plus"></ha-icon>${exists ? this._t("ok") : this._t("add")}</button></footer></article>`;
  }
});


// ---- frontend/src/views/settings-view.ts ----
// Settings view rendering.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _settingsHtml() {
    const tasks = this._filteredTasks(true).sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
    return `<section class="panel settings-head"><div><h2>${this._t("settings")}</h2><p>${this._t("settingsIntro")}</p></div><div class="settings-actions"><button class="ghost" data-action="data-dialog"><ha-icon icon="mdi:database-cog-outline"></ha-icon>${this._t("dataSafety")}</button><button class="ghost" data-action="notification-dialog"><ha-icon icon="mdi:bell-outline"></ha-icon>${this._t("notifications")}</button><button class="ghost" data-action="diagnostics"><ha-icon icon="mdi:alert-circle-outline"></ha-icon>${this._t("diagnostics")}</button></div></section><section class="panel"><p>${this._t("dragHint")}</p></section><section class="settings-list">${tasks.map((t, idx) => `<article class="settings-row" draggable="true" data-drag="${t.id}" data-drop="${t.id}"><span class="drag"><ha-icon icon="mdi:drag"></ha-icon></span><ha-icon icon="${this._html(t.icon)}"></ha-icon><div><strong>${this._html(t.name)}</strong><small>${this._categoryLabel(t)} · ${t.interval} ${this._unitLabel(t.interval_unit)} · ${this._t("priority")} ${t.priority}/5</small></div><button class="icon" data-move="${t.id}:up" ${idx === 0 ? "disabled" : ""}><ha-icon icon="mdi:chevron-up"></ha-icon></button><button class="icon" data-move="${t.id}:down" ${idx === tasks.length - 1 ? "disabled" : ""}><ha-icon icon="mdi:chevron-down"></ha-icon></button><button class="icon" data-edit="${t.id}"><ha-icon icon="mdi:pencil"></ha-icon></button><button class="icon danger" data-delete="${t.id}"><ha-icon icon="mdi:delete-outline"></ha-icon></button></article>`).join("")}</section>`;
  }
});


// ---- frontend/src/dialogs/history-dialog.ts ----
// History modal rendering.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _historyHtml() {
    const rows = (this._state.history || []).slice(0, 60).map(event => `<article class="history-row"><ha-icon icon="${event.type === "completed" ? "mdi:check-circle-outline" : "mdi:history"}"></ha-icon><div><strong>${this._html(event.task_name || event.task_id)}</strong><p>${this._html(event.summary)} · ${this._datetime(event.created_at)}</p>${event.details?.runtime_before ? `<small>${this._runtimeSummary(event.details.runtime_before)}</small>` : ""}</div>${event.type === "completed" && !event.undone_at ? `<button class="ghost" data-undo="${event.id}">${this._t("undo")}</button>` : ""}</article>`).join("");
    return `<section class="panel"><h2>${this._t("history")}</h2><div class="history-list">${rows || `<p>${this._t("noHistory")}</p>`}</div></section>`;
  },

  _historyDialogHtml() {
    if (!this._historyDialog) return "";
    return `<div class="dialog-backdrop"><section class="dialog small history-dialog"><header><h2>${this._t("history")}</h2><button class="icon" data-action="close-history"><ha-icon icon="mdi:close"></ha-icon></button></header><div class="dialog-body">${this._historyHtml()}</div></section></div>`;
  }
});


// ---- frontend/src/dialogs/task-editor-dialog.ts ----
// Task editor dialog rendering.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _dialogHtml() {
    if (!this._dialog) return "";
    const d = this._draft;
    const areas = this._areas();
    return `<div class="dialog-backdrop"><section class="dialog"><header><h2>${this._dialog === "edit" ? this._t("edit") : this._t("add")}</h2><button class="icon" data-action="close"><ha-icon icon="mdi:close"></ha-icon></button></header><div class="dialog-body">${this._dialog === "create" ? `<section class="dialog-section"><h3>${this._t("selectTemplate")}</h3><div class="template-strip">${(this._state.templates || []).slice(0, 12).map(t => `<button class="template-pill" data-apply-template="${t.id}"><ha-icon icon="${this._html(t.icon)}"></ha-icon>${this._html(t.name)}</button>`).join("")}</div></section>` : ""}<section class="dialog-section"><h3>Basis</h3><div class="form-grid">${this._input("name", this._t("name"), "text")}<label class="field"><span>${this._t("category")}</span><select data-draft="category">${CATEGORY_KEYS.map(k => `<option value="${k}" ${d.category === k ? "selected" : ""}>${this._t(k)}</option>`).join("")}</select></label>${d.category === "custom" ? this._input("custom_category", "Eigene Kategorie", "text") : ""}<label class="field"><span>Bereich</span><select data-draft="area_id"><option value="">—</option>${areas.map(a => `<option value="${a.area_id}" ${d.area_id === a.area_id ? "selected" : ""}>${this._html(a.name)}</option>`).join("")}</select></label></div><label class="entity-field"><span>${this._t("entity")}</span><ha-entity-picker id="entityPicker" allow-custom-entity></ha-entity-picker></label><label class="description-field"><span>${this._t("description")}</span><textarea data-draft="description">${this._html(d.description)}</textarea></label><section class="inline-priority"><div class="priority-head"><div><h4>${this._t("priority")}</h4><p class="section-hint">${this._t("priorityHint")}</p></div><strong>${this._priorityLabel(d.priority)} (${d.priority}/5)</strong></div><input class="priority-slider" data-draft="priority" type="range" min="1" max="5" step="1" value="${this._html(d.priority || 3)}"><div class="priority-scale">${[1,2,3,4,5].map(p => `<span class="${Number(d.priority || 3) === p ? "active" : ""}">${this._priorityLabel(p)}</span>`).join("")}</div></section></section><section class="dialog-section"><h3>Intervall</h3><div class="form-grid"><label class="field"><span>Typ</span><select data-draft="type"><option value="time" ${d.type === "time" ? "selected" : ""}>${this._t("time")}</option><option value="meter" ${d.type === "meter" ? "selected" : ""}>${this._t("meter")}</option></select></label><label class="field"><span>${this._t("scheduleMode")}</span><select data-draft="schedule_mode">${SCHEDULE_MODES.map(m => `<option value="${m}" ${d.schedule_mode === m ? "selected" : ""}>${this._scheduleModeLabel(m)}</option>`).join("")}</select></label>${this._input("interval", this._t("interval"), "number")}<label class="field"><span>${this._t("intervalUnit")}</span><select data-draft="interval_unit">${["days", "hours", "weeks", "months"].map(u => `<option value="${u}" ${d.interval_unit === u ? "selected" : ""}>${this._t(u)}</option>`).join("")}</select></label>${this._input("last_done", this._t("lastDone"), "datetime-local")}</div>${d.schedule_mode === "fixed_date" ? `<div class="form-grid">${this._input("fixed_month", "Monat", "number")}${this._input("fixed_day", "Tag", "number")}</div>` : ""}${d.schedule_mode === "seasonal" ? `<div class="form-grid"><label class="field"><span>${this._t("seasonal")}</span><select data-draft="season">${["spring","summer","autumn","winter"].map(x => `<option value="${x}" ${d.season === x ? "selected" : ""}>${this._t(x)}</option>`).join("")}</select></label></div>` : ""}<div class="form-grid">${this._input("warning_threshold", this._t("warning"), "number")}${this._input("critical_threshold", this._t("critical"), "number")}</div></section><section class="dialog-section"><h3>Darstellung</h3><p class="section-hint">${this._t("appearanceHint")}</p><div class="appearance-grid"><label class="field icon-picker-field appearance-icon-field"><span>${this._t("icon")}</span><div id="iconHost"></div></label><label class="field color-field"><span>${this._t("iconColor")}</span><div class="color-input-row"><input id="iconColorInput" data-draft="icon_color" type="color" value="${this._html(d.icon_color || "#a855f7")}"><button class="ghost small" data-action="random-icon-color" type="button" title="${this._t("randomColors")}">↻</button></div></label><label class="field color-field"><span>${this._t("cardColor")}</span><div class="color-input-row"><input id="cardColorInput" data-draft="card_color" type="color" value="${this._html(d.card_color || "#6b5a00")}"><button class="ghost small" data-action="random-card-color" type="button" title="${this._t("randomColors")}">↻</button></div></label></div><div class="color-actions"><button class="ghost" data-action="random-colors" type="button"><ha-icon icon="mdi:palette-swatch-outline"></ha-icon>${this._t("randomColors")}</button><button class="ghost" data-action="clear-colors" type="button"><ha-icon icon="mdi:close-circle-outline"></ha-icon>${this._t("clearColors")}</button></div><label class="check"><input data-draft="enabled" type="checkbox" ${d.enabled ? "checked" : ""}>${this._t("enabled")}</label></section>${this._error ? `<div class="error">${this._html(this._error)}</div>` : ""}</div><footer><button class="ghost" data-action="close">${this._t("cancel")}</button><button class="primary" data-action="save" ${this._busy ? "disabled" : ""}>${this._t("save")}</button></footer></section></div>`;
  },

  _input(key, label, type) { return `<label class="field"><span>${label}</span><input data-draft="${key}" type="${type}" value="${this._html(this._draft[key] || "")}"></label>`; },

  _mountIconPicker(host) {
    if (customElements.get("ha-icon-picker")) {
      const picker = document.createElement("ha-icon-picker");
      picker.hass = this.hass; picker.value = this._draft.icon;
      picker.addEventListener("value-changed", e => { this._draft.icon = String(e.detail?.value || "mdi:wrench-clock"); });
      host.appendChild(picker);
    } else {
      host.innerHTML = `<input data-draft="icon" value="${this._html(this._draft.icon)}"><div class="icon-grid">${ICONS.map(i => `<button class="icon-choice" data-icon-choice="${i}"><ha-icon icon="${i}"></ha-icon></button>`).join("")}</div>`;
      host.querySelector("input").addEventListener("input", e => this._draft.icon = e.target.value);
      host.querySelectorAll("[data-icon-choice]").forEach(btn => btn.addEventListener("click", () => { this._draft.icon = btn.dataset.iconChoice; this._render(); }));
    }
  }
});


// ---- frontend/src/dialogs/diagnostics-dialog.ts ----
// Extended diagnostics dialog rendering.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _diagnosticsHtml() {
    if (!this._diagnostics) return "";
    const diag = this._state.diagnostics || [];
    const payload = {
      frontend_version: VERSION,
      store_version: this._state.version,
      panel_url: `/api/maintenance_dashboard/static/maintenance-dashboard-panel.js?v=${VERSION}`,
      task_count: (this._state.tasks || []).length,
      history_count: (this._state.history || []).length,
      backup_count: (this._state.backups || []).length,
      summary: this._state.summary,
      diagnostics: diag,
      language: this._lang(),
      loaded_at: new Date().toISOString(),
      settings: this._state.settings,
      notification_state: this._state.notification_state
    };
    return `<div class="dialog-backdrop"><section class="dialog"><header><h2>${this._t("diagnostics")}</h2><button class="icon" data-action="close-diagnostics"><ha-icon icon="mdi:close"></ha-icon></button></header><div class="dialog-body"><section class="dialog-section"><h3>${this._t("diagnostics")}</h3><div class="diagnostic-grid"><div><span>Frontend</span><strong>${VERSION}</strong></div><div><span>Store</span><strong>${this._state.version}</strong></div><div><span>Tasks</span><strong>${payload.task_count}</strong></div><div><span>History</span><strong>${payload.history_count}</strong></div><div><span>Backups</span><strong>${payload.backup_count}</strong></div><div><span>Language</span><strong>${payload.language}</strong></div><div><span>Task entities</span><strong>${this._html(this._state?.settings?.task_entities?.mode || "off")}</strong></div><div><span>Notify</span><strong>${this._state?.settings?.notifications?.enabled ? "enabled" : "off"}</strong></div></div>${diag.length ? diag.map(i => `<p class="${i.severity}">${i.task_id || "global"}: ${i.message}</p>`).join("") : `<p>${this._t("ok")}</p>`}<button class="ghost" data-copy-diagnostics="${this._html(JSON.stringify(payload))}"><ha-icon icon="mdi:content-copy"></ha-icon>${this._t("copyDiagnostics")}</button></section></div></section></div>`;
  }
});


// ---- frontend/src/dialogs/template-preview-dialog.ts ----
// Template preview dialog rendering.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _templatePreviewHtml() {
    if (!this._templatePreview) return "";
    const t = this._template(this._templatePreview);
    if (!t) return "";
    return `<div class="dialog-backdrop"><section class="dialog small"><header><h2>${this._t("preview")}</h2><button class="icon" data-action="close-template-preview"><ha-icon icon="mdi:close"></ha-icon></button></header><div class="dialog-body"><section class="dialog-section template-preview"><ha-icon icon="${this._html(t.icon)}"></ha-icon><h3>${this._html(t.name)}</h3><p>${this._html(t.description || "")}</p><div class="meta-grid"><div><span>${this._t("category")}</span><strong>${this._categoryLabel(t)}</strong></div><div><span>${this._t("interval")}</span><strong>${t.interval} ${this._unitLabel(t.interval_unit)}</strong></div><div><span>${this._t("priority")}</span><strong>${this._priorityLabel(t.priority)} ${t.priority}/5</strong></div><div><span>${this._t("scheduleMode")}</span><strong>${this._scheduleModeLabel(t.schedule_mode || "interval")}</strong></div></div></section></div><footer><button class="ghost" data-action="close-template-preview">${this._t("cancel")}</button><button class="primary" data-template="${this._html(t.id)}"><ha-icon icon="mdi:plus"></ha-icon>${this._t("addTemplate")}</button></footer></section></div>`;
  }
});


// ---- frontend/src/dialogs/completion-dialog.ts ----
// Completion note dialog rendering.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _completionDialogHtml() {
    if (!this._completionDialog) return "";
    const task = (this._state?.tasks || []).find(t => t.id === this._completionDialog);
    return `<div class="dialog-backdrop"><section class="dialog small"><header><h2>${this._t("done")}</h2><button class="icon" data-action="close-completion"><ha-icon icon="mdi:close"></ha-icon></button></header><div class="dialog-body"><section class="dialog-section"><h3>${this._html(task?.name || "")}</h3><label class="description-field"><span>${this._t("completionNote")}</span><textarea id="completionNote" placeholder="${this._t("noteOptional")}">${this._html(this._completionNote)}</textarea></label></section></div><footer><button class="ghost" data-action="close-completion">${this._t("cancel")}</button><button class="primary" data-action="confirm-done"><ha-icon icon="mdi:check"></ha-icon>${this._t("markDone")}</button></footer></section></div>`;
  }
});


// ---- frontend/src/dialogs/data-dialog.ts ----
// Backup, restore, import and export dialog rendering.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _dataDialogHtml() {
    if (!this._dataDialog) return "";
    const backups = this._state?.backups || [];
    return `<div class="dialog-backdrop"><section class="dialog"><header><h2>${this._t("dataSafety")}</h2><button class="icon" data-action="close-data-dialog"><ha-icon icon="mdi:close"></ha-icon></button></header><div class="dialog-body"><section class="dialog-section"><h3>${this._t("exportData")}</h3><p>Export tasks, history and backup metadata as JSON.</p><button class="primary" data-action="export-data"><ha-icon icon="mdi:download"></ha-icon>${this._t("exportData")}</button></section><section class="dialog-section"><h3>${this._t("importData")}</h3><textarea id="importPayload" placeholder="${this._t("importPaste")}">${this._html(this._importPayload)}</textarea><button class="ghost" data-action="import-data"><ha-icon icon="mdi:upload"></ha-icon>${this._t("importJson")}</button></section><section class="dialog-section"><h3>${this._t("backupRestore")}</h3>${backups.length ? backups.map(b => `<div class="backup-row"><span>${this._datetime(b.created_at)} · ${this._html(b.reason)} · ${b.task_count} tasks</span><button class="ghost" data-restore="${b.id}">${this._t("restore")}</button></div>`).join("") : `<p>${this._t("noHistory")}</p>`}</section></div></section></div>`;
  }
});


// ---- frontend/src/dialogs/notification-dialog.ts ----
// Notification settings, entity settings and test dialog rendering.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _notificationDialogHtml() {
    if (!this._notificationDialog) return "";
    const settings = this._state?.settings || {};
    const n = settings.notifications || {};
    const e = settings.task_entities || {};
    const checked = v => v ? "checked" : "";
    return `<div class="dialog-backdrop"><section class="dialog"><header><h2>${this._t("notifications")}</h2><button class="icon" data-action="close-notification-dialog"><ha-icon icon="mdi:close"></ha-icon></button></header><div class="dialog-body">
      <section class="dialog-section">
        <h3>${this._t("notifications")}</h3>
        <label class="check"><input id="notifyEnabled" type="checkbox" ${checked(n.enabled)}><span>Enabled</span></label>
        <div class="form-grid">
          <label class="field"><span>${this._t("notifyService")}</span><input id="notifyService" value="${this._html(n.notify_service || this._notifyService || "")}" placeholder="notify.mobile_app_phone"></label>
          <label class="field"><span>${this._t("digestTime")}</span><input id="digestTime" type="time" value="${this._html(n.digest_time || "08:00")}"></label>
          <label class="field"><span>${this._t("quietFrom")}</span><input id="quietFrom" type="time" value="${this._html(n.quiet_from || "22:00")}"></label>
          <label class="field"><span>${this._t("quietTo")}</span><input id="quietTo" type="time" value="${this._html(n.quiet_to || "07:00")}"></label>
        </div>
        <div class="toggle-grid">
          <label class="check"><input id="notifyWarning" type="checkbox" ${checked(n.warning !== false)}><span>${this._t("warningNotifications")}</span></label>
          <label class="check"><input id="notifyCritical" type="checkbox" ${checked(n.critical !== false)}><span>${this._t("criticalNotifications")}</span></label>
          <label class="check"><input id="notifyDue" type="checkbox" ${checked(n.due !== false)}><span>${this._t("dueNotifications")}</span></label>
          <label class="check"><input id="dailyDigest" type="checkbox" ${checked(n.daily_digest)}><span>${this._t("dailyDigest")}</span></label>
          <label class="check"><input id="quietHours" type="checkbox" ${checked(n.quiet_hours_enabled)}><span>${this._t("quietHours")}</span></label>
          <label class="check"><input id="includeSnoozed" type="checkbox" ${checked(n.include_snoozed)}><span>${this._t("includeSnoozed")}</span></label>
          <label class="check"><input id="includeDashboardLink" type="checkbox" ${checked(n.include_dashboard_link !== false)}><span>${this._t("includeDashboardLink")}</span></label>
        </div>
        <p class="section-hint">Use any Home Assistant notify service or leave empty to create a persistent notification.</p>
      </section>
      <section class="dialog-section">
        <h3>${this._t("entityMode")}</h3>
        <p class="section-hint">${this._t("entityModeHint")}</p>
        <label class="field"><span>${this._t("entityMode")}</span><select id="entityMode"><option value="off" ${e.mode === "off" ? "selected" : ""}>${this._t("off")}</option><option value="due_only" ${e.mode === "due_only" ? "selected" : ""}>${this._t("dueOnly")}</option><option value="basic" ${e.mode === "basic" ? "selected" : ""}>${this._t("basic")}</option><option value="full" ${e.mode === "full" ? "selected" : ""}>${this._t("full")}</option></select></label>
        <p class="section-hint">Changing this setting may require a Home Assistant restart or integration reload to create new task entities.</p>
      </section>
      <section class="dialog-section"><div class="button-row"><button class="primary" data-action="save-notification-settings"><ha-icon icon="mdi:content-save"></ha-icon>${this._t("save")}</button><button class="ghost" data-action="test-notification"><ha-icon icon="mdi:bell-ring-outline"></ha-icon>${this._t("testNotification")}</button><button class="ghost" data-action="send-digest"><ha-icon icon="mdi:message-text-clock-outline"></ha-icon>${this._t("sendDigest")}</button><button class="ghost" data-action="notify-due"><ha-icon icon="mdi:alert-outline"></ha-icon>${this._t("notifyDueTasks")}</button></div></section>
    </div></section></div>`;
  }
});


// ---- frontend/src/events.ts ----
// Event binding and UI interaction handlers.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _bind() {
    this.shadowRoot.querySelectorAll("[data-view]").forEach(el => el.addEventListener("click", () => { this._view = el.dataset.view; this._snoozeMenu = null; this._render(); }));
    this.shadowRoot.querySelectorAll("[data-action='create']").forEach(el => el.addEventListener("click", () => this._openCreate()));
    this.shadowRoot.querySelectorAll("[data-action='close']").forEach(el => el.addEventListener("click", () => { this._dialog = null; this._error = ""; this._render(); }));
    this.shadowRoot.querySelectorAll("[data-action='save']").forEach(el => el.addEventListener("click", () => this._save()));
    this.shadowRoot.querySelectorAll("[data-action='diagnostics']").forEach(el => el.addEventListener("click", () => { this._diagnostics = true; this._render(); }));
    this.shadowRoot.querySelectorAll("[data-action='history-dialog']").forEach(el => el.addEventListener("click", () => { this._historyDialog = true; this._render(); }));
    this.shadowRoot.querySelectorAll("[data-action='close-history']").forEach(el => el.addEventListener("click", () => { this._historyDialog = false; this._render(); }));
    this.shadowRoot.querySelectorAll("[data-action='close-diagnostics']").forEach(el => el.addEventListener("click", () => { this._diagnostics = false; this._render(); }));
    this.shadowRoot.querySelectorAll("[data-action='data-dialog']").forEach(el => el.addEventListener("click", () => { this._dataDialog = true; this._render(); }));
    this.shadowRoot.querySelectorAll("[data-action='close-data-dialog']").forEach(el => el.addEventListener("click", () => { this._dataDialog = false; this._render(); }));
    this.shadowRoot.querySelectorAll("[data-action='notification-dialog']").forEach(el => el.addEventListener("click", () => { this._notificationDialog = true; this._render(); }));
    this.shadowRoot.querySelectorAll("[data-action='close-notification-dialog']").forEach(el => el.addEventListener("click", () => { this._notificationDialog = false; this._render(); }));
    this.shadowRoot.querySelectorAll("[data-action='close-template-preview']").forEach(el => el.addEventListener("click", () => { this._templatePreview = null; this._render(); }));
    this.shadowRoot.querySelectorAll("[data-action='close-completion']").forEach(el => el.addEventListener("click", () => { this._completionDialog = null; this._completionNote = ""; this._render(); }));
    this.shadowRoot.querySelectorAll("[data-action='confirm-done']").forEach(el => el.addEventListener("click", () => this._confirmDone()));
    this.shadowRoot.querySelectorAll("[data-action='export-data']").forEach(el => el.addEventListener("click", () => this._exportData()));
    this.shadowRoot.querySelectorAll("[data-action='import-data']").forEach(el => el.addEventListener("click", () => this._importData()));
    this.shadowRoot.querySelectorAll("[data-action='save-notification-settings']").forEach(el => el.addEventListener("click", () => this._saveNotificationSettings()));
    this.shadowRoot.querySelectorAll("[data-action='test-notification']").forEach(el => el.addEventListener("click", () => this._sendNotification(true)));
    this.shadowRoot.querySelectorAll("[data-action='send-digest']").forEach(el => el.addEventListener("click", () => this._sendNotification(false)));
    this.shadowRoot.querySelectorAll("[data-action='notify-due']").forEach(el => el.addEventListener("click", () => this._notifyDueTasks()));
    this.shadowRoot.querySelectorAll("[data-action='select-visible']").forEach(el => el.addEventListener("click", () => { (this._state.templates || []).filter(t => this._matches(t)).forEach(t => this._selectedTemplates.add(t.id)); this._render(); }));
    this.shadowRoot.querySelectorAll("[data-action='clear-template-selection']").forEach(el => el.addEventListener("click", () => { this._selectedTemplates.clear(); this._render(); }));
    this.shadowRoot.querySelectorAll("[data-template-category]").forEach(el => el.addEventListener("click", () => { this._templateCategory = el.dataset.templateCategory; this._render(); }));
    this.shadowRoot.querySelectorAll("[data-action='add-selected']").forEach(el => el.addEventListener("click", () => this._addSelectedTemplates()));
    this.shadowRoot.querySelectorAll("[data-action='random-colors']").forEach(el => el.addEventListener("click", e => { e.preventDefault(); e.stopPropagation(); this._randomizeColors("both"); }));
    this.shadowRoot.querySelectorAll("[data-action='random-icon-color']").forEach(el => el.addEventListener("click", e => { e.preventDefault(); e.stopPropagation(); this._randomizeColors("icon"); }));
    this.shadowRoot.querySelectorAll("[data-action='random-card-color']").forEach(el => el.addEventListener("click", e => { e.preventDefault(); e.stopPropagation(); this._randomizeColors("card"); }));
    this.shadowRoot.querySelectorAll("[data-action='clear-colors']").forEach(el => el.addEventListener("click", e => { e.preventDefault(); e.stopPropagation(); this._draft.icon_color = ""; this._draft.card_color = ""; this._render(); }));
    const search = this.shadowRoot.getElementById("search"); if (search) search.addEventListener("input", e => { this._search = e.target.value; this._renderSoon(240); });
    const sf = this.shadowRoot.getElementById("statusFilter"); if (sf) sf.addEventListener("change", e => { this._statusFilter = e.target.value; this._render(); });
    const sm = this.shadowRoot.getElementById("sortMode"); if (sm) sm.addEventListener("change", e => { this._sortMode = e.target.value; this._render(); });
    this.shadowRoot.querySelectorAll("[data-focus-task]").forEach(el => el.addEventListener("click", e => { if (e.target.closest(".next-cycle")) return; this._focusTask(el.dataset.focusTask); }));
    this.shadowRoot.querySelectorAll("[data-action='prev-next-task']").forEach(el => el.addEventListener("click", e => { e.stopPropagation(); this._cycleNextTask(-1); }));
    this.shadowRoot.querySelectorAll("[data-action='next-next-task']").forEach(el => el.addEventListener("click", e => { e.stopPropagation(); this._cycleNextTask(1); }));
    this.shadowRoot.querySelectorAll("[data-edit]").forEach(el => el.addEventListener("click", () => this._openEdit(el.dataset.edit)));
    this.shadowRoot.querySelectorAll("[data-done]").forEach(el => el.addEventListener("click", e => { e.preventDefault(); e.stopPropagation(); this._openCompletion(el.dataset.done); }));
    this.shadowRoot.querySelectorAll("[data-snooze-menu]").forEach(el => el.addEventListener("click", () => { this._snoozeMenu = this._snoozeMenu === el.dataset.snoozeMenu ? null : el.dataset.snoozeMenu; this._render(); }));
    this.shadowRoot.querySelectorAll("[data-snooze-days]").forEach(el => el.addEventListener("click", () => { const [id, days] = el.dataset.snoozeDays.split(":"); this._snooze(id, Number(days)); }));
    this.shadowRoot.querySelectorAll("[data-clear-snooze]").forEach(el => el.addEventListener("click", () => this._clearSnooze(el.dataset.clearSnooze)));
    this.shadowRoot.querySelectorAll("[data-delete]").forEach(el => el.addEventListener("click", () => this._delete(el.dataset.delete)));
    this.shadowRoot.querySelectorAll("[data-undo]").forEach(el => el.addEventListener("click", () => this._undo(el.dataset.undo)));
    this.shadowRoot.querySelectorAll("[data-restore]").forEach(el => el.addEventListener("click", () => this._restoreBackup(el.dataset.restore)));
    this.shadowRoot.querySelectorAll("[data-copy-diagnostics]").forEach(el => el.addEventListener("click", () => { navigator.clipboard?.writeText(el.dataset.copyDiagnostics || ""); this._showToast(this._t("copyDiagnostics")); }));
    this.shadowRoot.querySelectorAll("[data-template]").forEach(el => el.addEventListener("click", e => { e.stopPropagation(); this._openCreate(this._template(el.dataset.template)); this._templatePreview = null; }));
    this.shadowRoot.querySelectorAll("[data-template-preview],[data-template-preview-btn]").forEach(el => el.addEventListener("click", e => { e.stopPropagation(); this._templatePreview = el.dataset.templatePreview || el.dataset.templatePreviewBtn; this._render(); }));
    this.shadowRoot.querySelectorAll("[data-template-check]").forEach(el => el.addEventListener("change", () => { if (el.checked) this._selectedTemplates.add(el.dataset.templateCheck); else this._selectedTemplates.delete(el.dataset.templateCheck); this._render(); }));
    this.shadowRoot.querySelectorAll("[data-apply-template]").forEach(el => el.addEventListener("click", () => { this._applyTemplate(this._template(el.dataset.applyTemplate)); this._render(); }));
    this.shadowRoot.querySelectorAll("[data-move]").forEach(el => el.addEventListener("click", () => { const [id, dir] = el.dataset.move.split(":"); this._move(id, dir === "up" ? -1 : 1); }));
    this.shadowRoot.querySelectorAll("[data-drag]").forEach(el => { el.addEventListener("dragstart", () => this._dragTaskId = el.dataset.drag); el.addEventListener("dragover", e => e.preventDefault()); el.addEventListener("drop", () => this._dropOn(el.dataset.drop)); });
    this.shadowRoot.querySelectorAll("[data-draft]").forEach(el => el.addEventListener("input", e => this._draftChange(e)));
    this.shadowRoot.querySelectorAll("select[data-draft]").forEach(el => el.addEventListener("change", e => this._draftChange(e)));
    const picker = this.shadowRoot.getElementById("entityPicker"); if (picker) { picker.hass = this.hass; picker.value = this._draft.entity_id; picker.addEventListener("value-changed", e => { this._draft.entity_id = String(e.detail?.value || ""); }); }
    const iconHost = this.shadowRoot.getElementById("iconHost"); if (iconHost) this._mountIconPicker(iconHost);
    const note = this.shadowRoot.getElementById("completionNote"); if (note) note.addEventListener("input", e => this._completionNote = e.target.value);
    const importPayload = this.shadowRoot.getElementById("importPayload"); if (importPayload) importPayload.addEventListener("input", e => this._importPayload = e.target.value);
    const notifyService = this.shadowRoot.getElementById("notifyService"); if (notifyService) notifyService.addEventListener("input", e => this._notifyService = e.target.value);
  }
});


// ---- frontend/src/api.ts ----
// WebSocket API helpers and backend mutation methods.
Object.assign(MaintenanceDashboardPanel.prototype, {
  async _save() {
    if (!this.hass) return;
    if (!this._draft.name.trim()) { this._error = "Name fehlt"; this._render(); return; }
    if (this._draft.category === "custom" && !this._draft.custom_category.trim()) { this._error = "Eigene Kategorie fehlt"; this._render(); return; }
    const task = this._draftToTask();
    try {
      this._busy = true;
      if (this._dialog === "edit" && this._draft.id) await this.hass.callWS({ type: "maintenance_dashboard/update_task", task_id: this._draft.id, patch: task });
      else await this.hass.callWS({ type: "maintenance_dashboard/create_task", task });
      this._dialog = null; await this._load(); this._showToast(this._t("actionSaved"));
    } catch (e) { this._error = String(e); this._render(); }
    finally { this._busy = false; }
  },

  async _addSelectedTemplates() {
    if (!this.hass || !this._selectedTemplates.size) return;
    const selected = (this._state.templates || []).filter(t => this._selectedTemplates.has(t.id));
    for (const tpl of selected) {
      const task = { ...tpl, last_done: new Date().toISOString() };
      delete task.id;
      await this.hass.callWS({ type: "maintenance_dashboard/create_task", task });
    }
    this._selectedTemplates.clear();
    await this._load();
    this._view = "dashboard";
    this._render();
    this._showToast(this._t("actionTemplatesAdded"));
  },

  async _confirmDone() { const id = this._completionDialog; if (!id) return; await this._markDone(id, this._completionNote); this._completionDialog = null; this._completionNote = ""; },

  async _markDone(id, note = "") { try { await this.hass.callWS({ type: "maintenance_dashboard/mark_done", task_id: id, note }); await this._load(); this._showToast(this._t("actionDone")); } catch (e) { this._showToast(String(e)); } },

  async _exportData() { const payload = await this.hass.callWS({ type: "maintenance_dashboard/export_data" }); const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" }); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = `maintenance-dashboard-${new Date().toISOString().slice(0,10)}.json`; a.click(); URL.revokeObjectURL(url); this._showToast(this._t("actionExported")); },

  async _importData() { const payload = JSON.parse(this._importPayload || "{}"); await this.hass.callWS({ type: "maintenance_dashboard/import_data", payload }); this._importPayload = ""; this._dataDialog = false; await this._load(); this._showToast(this._t("actionImported")); },

  async _saveNotificationSettings() {
    const patch = {
      notifications: {
        enabled: Boolean(this.shadowRoot.getElementById("notifyEnabled")?.checked),
        notify_service: this.shadowRoot.getElementById("notifyService")?.value || "",
        warning: Boolean(this.shadowRoot.getElementById("notifyWarning")?.checked),
        critical: Boolean(this.shadowRoot.getElementById("notifyCritical")?.checked),
        due: Boolean(this.shadowRoot.getElementById("notifyDue")?.checked),
        daily_digest: Boolean(this.shadowRoot.getElementById("dailyDigest")?.checked),
        digest_time: this.shadowRoot.getElementById("digestTime")?.value || "08:00",
        quiet_hours_enabled: Boolean(this.shadowRoot.getElementById("quietHours")?.checked),
        quiet_from: this.shadowRoot.getElementById("quietFrom")?.value || "22:00",
        quiet_to: this.shadowRoot.getElementById("quietTo")?.value || "07:00",
        include_snoozed: Boolean(this.shadowRoot.getElementById("includeSnoozed")?.checked),
        include_dashboard_link: Boolean(this.shadowRoot.getElementById("includeDashboardLink")?.checked),
      },
      task_entities: {
        mode: this.shadowRoot.getElementById("entityMode")?.value || "off",
      },
    };
    await this.hass.callWS({ type: "maintenance_dashboard/update_settings", patch });
    await this._load();
    this._showToast(this._t("actionSaved"));
  },

  async _sendNotification(test) {
    const service = this.shadowRoot.getElementById("notifyService")?.value || this._state?.settings?.notifications?.notify_service || undefined;
    if (test) await this.hass.callWS({ type: "maintenance_dashboard/send_notification", service, message: "Maintenance Dashboard test notification" });
    else await this.hass.callWS({ type: "maintenance_dashboard/send_digest", service, include_snoozed: Boolean(this.shadowRoot.getElementById("includeSnoozed")?.checked) });
    this._showToast(this._t("actionNotificationSent"));
  },

  async _notifyDueTasks() {
    const service = this.shadowRoot.getElementById("notifyService")?.value || this._state?.settings?.notifications?.notify_service || undefined;
    await this.hass.callWS({ type: "maintenance_dashboard/notify_due_tasks", service, statuses: ["warning", "critical", "overdue"] });
    this._showToast(this._t("actionNotificationSent"));
  },

  async _snooze(id, days) { this._snoozeMenu = null; await this.hass.callWS({ type: "maintenance_dashboard/snooze", task_id: id, days }); await this._load(); this._showToast(`${this._t("actionSnoozed")} · ${days} ${this._t("days")}`); },

  async _clearSnooze(id) { await this.hass.callWS({ type: "maintenance_dashboard/clear_snooze", task_id: id }); await this._load(); this._showToast(this._t("actionSnoozeCleared")); },

  async _undo(id) { await this.hass.callWS({ type: "maintenance_dashboard/undo_completion", event_id: id }); await this._load(); this._showToast(this._t("actionUndo")); },

  async _delete(id) { await this.hass.callWS({ type: "maintenance_dashboard/delete_task", task_id: id }); await this._load(); this._showToast(this._t("actionDeleted")); },

  async _restoreBackup(id) { await this.hass.callWS({ type: "maintenance_dashboard/restore_backup", backup_id: id }); await this._load(); this._showToast(this._t("actionRestored")); },

  async _move(id, delta) { const tasks = this._filteredTasks(true).sort((a, b) => (a.position ?? 0) - (b.position ?? 0)); const idx = tasks.findIndex(t => t.id === id); const target = idx + delta; if (idx < 0 || target < 0 || target >= tasks.length) return; const [item] = tasks.splice(idx, 1); tasks.splice(target, 0, item); await this.hass.callWS({ type: "maintenance_dashboard/reorder", ordered_ids: tasks.map(t => t.id) }); await this._load(); },

  async _dropOn(targetId) { if (!this._dragTaskId || this._dragTaskId === targetId) return; const tasks = this._filteredTasks(true).sort((a, b) => (a.position ?? 0) - (b.position ?? 0)); const from = tasks.findIndex(t => t.id === this._dragTaskId); const to = tasks.findIndex(t => t.id === targetId); if (from < 0 || to < 0) return; const [item] = tasks.splice(from, 1); tasks.splice(to, 0, item); this._dragTaskId = null; await this.hass.callWS({ type: "maintenance_dashboard/reorder", ordered_ids: tasks.map(t => t.id) }); await this._load(); }
});


// ---- frontend/src/state.ts ----
// Draft state conversion and task focus helpers.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _draftChange(e) {
    const el = e.target;
    const key = el.dataset.draft;
    this._draft[key] = el.type === "checkbox" ? el.checked : el.value;
    if (key === "area_id") { const area = this._areas().find(x => x.area_id === el.value); this._draft.area_name = area?.name || ""; }
    if (["category", "schedule_mode"].includes(key)) this._render();
  },

  _openCreate(template) { this._draft = { ...EMPTY, last_done: this._dateInput(new Date()) }; if (template) this._applyTemplate(template); this._dialog = "create"; this._render(); },

  _openEdit(id) { const t = this._state.tasks.find(x => x.id === id); if (!t) return; this._draft = { id: t.id, name: t.name || "", type: t.type || "time", schedule_mode: t.schedule_mode || "interval", interval: String(t.interval || 90), interval_unit: t.interval_unit || "days", entity_id: t.entity_id || "", category: t.category || "general", custom_category: t.custom_category || "", area_id: t.area_id || "", area_name: t.area_name || "", priority: String(t.priority || 3), icon: t.icon || "mdi:wrench-clock", icon_color: t.icon_color || "", card_color: t.card_color || "", enabled: t.enabled !== false, warning_threshold: String(t.warning_threshold ?? 70), critical_threshold: String(t.critical_threshold ?? 90), description: t.description || "", fixed_month: String(t.fixed_month || 1), fixed_day: String(t.fixed_day || 1), season: t.season || "autumn", completion_note: t.completion_note || "", last_done: this._dateInput(t.last_done ? new Date(t.last_done) : new Date()) }; this._dialog = "edit"; this._render(); },

  _applyTemplate(t) { if (!t) return; Object.assign(this._draft, { name: t.name || this._draft.name, type: t.type || "time", schedule_mode: t.schedule_mode || this._draft.schedule_mode || "interval", interval: String(t.interval || this._draft.interval), interval_unit: t.interval_unit || "days", category: t.category || "general", area_name: t.area_name || "", priority: String(t.priority || 3), icon: t.icon || "mdi:wrench-clock", description: t.description || "" }); },

  _draftToTask() {
    const area = this._areas().find(a => a.area_id === this._draft.area_id);
    return { name: this._draft.name.trim(), type: this._draft.type, schedule_mode: this._draft.schedule_mode || "interval", interval: Number(this._draft.interval) || 1, interval_unit: this._draft.interval_unit, entity_id: this._draft.entity_id || undefined, category: this._draft.category, custom_category: this._draft.category === "custom" ? this._draft.custom_category.trim() : undefined, area_id: this._draft.area_id || undefined, area_name: area?.name || this._draft.area_name || undefined, priority: Number(this._draft.priority) || 3, icon: this._draft.icon || "mdi:wrench-clock", icon_color: this._draft.icon_color || undefined, card_color: this._draft.card_color || undefined, enabled: Boolean(this._draft.enabled), warning_threshold: Number(this._draft.warning_threshold) || 70, critical_threshold: Number(this._draft.critical_threshold) || 90, description: this._draft.description || "", fixed_month: Number(this._draft.fixed_month) || 1, fixed_day: Number(this._draft.fixed_day) || 1, season: this._draft.season || undefined, completion_note: this._draft.completion_note || undefined, last_done: this._draft.last_done ? new Date(this._draft.last_done).toISOString() : undefined };
  },

  _focusTask(id) {
    if (!id) return;
    this._view = "dashboard";
    this._statusFilter = "all";
    this._search = "";
    this._render();
    requestAnimationFrame(() => {
      const card = this.shadowRoot.querySelector(`[data-task-card="${CSS.escape(id)}"]`);
      if (!card) return;
      card.scrollIntoView({ behavior: "smooth", block: "center" });
      card.classList.remove("focus-pulse");
      void card.offsetWidth;
      card.classList.add("focus-pulse");
      setTimeout(() => card.classList.remove("focus-pulse"), 1800);
    });
  },

  _openCompletion(id) { this._completionDialog = id; this._completionNote = ""; this._render(); }
});


// ---- frontend/src/utils.ts ----
// Shared frontend formatting, sorting, filtering and UI utility helpers.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _randomColor(list) { return list[Math.floor(Math.random() * list.length)] || "#00bcd4"; },

  _randomizeColors(target = "both") {
    if (target === "both" || target === "icon") this._draft.icon_color = this._randomColor(COLOR_PALETTE);
    if (target === "both" || target === "card") this._draft.card_color = this._randomColor(CARD_COLOR_PALETTE);
    this._render();
  },

  _priorityLabel(value) {
    const normalized = Math.min(5, Math.max(1, Number(value) || 3));
    return PRIORITY_LABELS[this._lang()]?.[normalized] || PRIORITY_LABELS.en[normalized] || String(normalized);
  },

  _scheduleModeLabel(value) {
    return { interval: this._t("intervalSchedule"), one_time: this._t("oneTime"), fixed_date: this._t("fixedDate"), seasonal: this._t("seasonal") }[value] || value;
  },

  _statusAccent(status, fallback) {
    return STATUS_ACCENTS[status] || fallback || "var(--primary-color)";
  },

  _cycleNextTask(delta) {
    const total = this._nextTaskCandidates().length;
    if (!total) return;
    this._nextTaskOffset = (this._nextTaskOffset + delta + total) % total;
    this._render();
  },

  _showToast(message) {
    if (!message) return;
    this._toast = message;
    if (this._toastTimer) clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => { this._toast = null; this._render(); }, 3200);
    this._render();
  },

  _toastHtml() {
    return this._toast ? `<aside class="toast"><ha-icon icon="mdi:check-circle-outline"></ha-icon><span>${this._html(this._toast)}</span></aside>` : "";
  },

  _emptyMessage(icon, message, action = "") {
    return `<section class="empty compact-empty"><div class="empty-orb"><ha-icon icon="${icon}"></ha-icon></div><h2>${this._html(message)}</h2>${action}</section>`;
  },

  _filteredTasks(includeDeleted) { return (this._state?.tasks || []).filter(t => includeDeleted || !t.deleted).filter(t => this._matches(t)).filter(t => this._statusFilter === "all" || this._state?.runtime[t.id]?.status === this._statusFilter).sort((a, b) => this._compareTasks(a, b)); },

  _compareTasks(a, b) { const ar = this._state?.runtime[a.id] || {}; const br = this._state?.runtime[b.id] || {}; if (this._sortMode === "position") return (a.position ?? 0) - (b.position ?? 0); if (this._sortMode === "priority") return (b.priority ?? 0) - (a.priority ?? 0) || this._dueValue(ar) - this._dueValue(br); if (this._sortMode === "due") return this._dueValue(ar) - this._dueValue(br); if (this._sortMode === "status") return (STATUS_ORDER[ar.status] ?? 99) - (STATUS_ORDER[br.status] ?? 99) || (b.priority ?? 0) - (a.priority ?? 0); return (STATUS_ORDER[ar.status] ?? 99) - (STATUS_ORDER[br.status] ?? 99) || (b.priority ?? 0) - (a.priority ?? 0) || this._dueValue(ar) - this._dueValue(br) || (a.position ?? 0) - (b.position ?? 0); },

  _dueValue(runtime) { return runtime?.due_at ? new Date(runtime.due_at).getTime() : Number.MAX_SAFE_INTEGER; },

  _matches(task) { const q = this._search.trim().toLowerCase(); if (!q) return true; return [task.name, task.description, task.area_name, task.category, task.custom_category].filter(Boolean).join(" ").toLowerCase().includes(q); },

  _snoozeOptions(task) { const days = this._intervalAsDays(task); if (days <= 30) return [1, 3, 7]; if (days <= 90) return [1, 3, 7, 14]; return [1, 3, 7, 14, 30]; },

  _intervalAsDays(task) { const n = Number(task.interval) || 1; const u = task.interval_unit || "days"; if (u === "hours") return Math.max(1, Math.ceil(n / 24)); if (u === "weeks") return n * 7; if (u === "months") return n * 30; return n; },

  _template(id) { return (this._state.templates || []).find(t => t.id === id); },

  _areas() { const raw = this.hass?.areas; if (!raw) return []; return Array.isArray(raw) ? raw : Object.values(raw); },

  _categoryLabel(task) { return task.category === "custom" ? this._html(task.custom_category || this._t("custom")) : this._t(task.category || "general"); },

  _unitLabel(unit) { return this._t(unit || "days"); },

  _date(value) { if (!value) return "—"; return new Intl.DateTimeFormat(this._lang() === "de" ? "de-DE" : "en-US", { dateStyle: "medium" }).format(new Date(value)); },

  _datetime(value) { if (!value) return "—"; return new Intl.DateTimeFormat(this._lang() === "de" ? "de-DE" : "en-US", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value)); },

  _dateInput(date) { return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}T${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`; },

  _remaining(runtime, task) { if (!runtime || runtime.remaining == null) return "—"; return `${Math.ceil(Math.abs(runtime.remaining))} ${this._unitLabel(task.interval_unit)} ${runtime.remaining < 0 ? this._t("overdue") : this._t("remaining")}`; },

  _runtimeSummary(runtime) { return `${this._t("progress")}: ${Math.round(runtime.progress || 0)}%, ${this._t("remaining")}: ${runtime.remaining ?? "—"}`; }
});


// ---- frontend/src/styles.ts ----
// Panel stylesheet.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _styles() {
    return `<style>
    :host{display:block;min-height:100vh;background:var(--primary-background-color);color:var(--primary-text-color);}
    .shell{min-height:100vh;box-sizing:border-box;padding:24px 32px;max-width:1880px;margin:0 auto;}
    .hero{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:18px 4px 22px;border-bottom:1px solid var(--divider-color);margin-bottom:18px;}
    .hero-brand{display:flex;align-items:center;gap:16px;min-width:0}.hero-logo{width:58px;height:58px;border-radius:18px;object-fit:contain;filter:drop-shadow(0 8px 20px rgb(0 0 0 / 28%));flex:0 0 auto}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}.icon-nav{min-width:48px;padding:0 14px}.icon-nav .sr-only{display:none}
    .eyebrow{margin:0 0 6px;color:var(--primary-color);font-weight:850;letter-spacing:.08em;text-transform:uppercase;font-size:.72rem;} h1{margin:0;font-size:clamp(1.5rem,3vw,2.6rem);letter-spacing:-.045em;} h2,h3,h4{margin:0;} p{margin:0;color:var(--secondary-text-color);} button,input,select,textarea{font:inherit;} button{cursor:pointer;transition:transform .1s ease,background .15s ease,border-color .15s ease;} button:active{transform:scale(.97);} button[disabled]{opacity:.45;pointer-events:none;}
    .hero-actions,.empty-actions,footer,.actions,.button-row{display:flex;gap:10px;flex-wrap:wrap;align-items:center;}.nav,.ghost,.primary,.icon{display:inline-flex;align-items:center;justify-content:center;gap:8px;border-radius:999px;border:1px solid var(--divider-color);min-height:40px;padding:0 16px;background:color-mix(in srgb,var(--card-background-color) 92%,transparent);color:var(--primary-text-color);} .nav.active,.ghost:hover{background:color-mix(in srgb,var(--primary-color) 18%,transparent);border-color:color-mix(in srgb,var(--primary-color) 55%,var(--divider-color));}.primary{border:0;background:var(--primary-color);color:var(--text-primary-color);font-weight:850;}.big{min-height:48px;padding:0 22px;}.icon,.icon-only{width:40px;min-width:40px;padding:0;color:var(--secondary-text-color);}.danger{color:var(--error-color);}
    .kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:14px;margin-bottom:18px;}.kpi,.panel,.toolbar,.task-card,.empty,.template-card,.settings-row,.template-group{border:1px solid var(--divider-color);border-radius:24px;background:var(--card-background-color);box-shadow:var(--ha-card-box-shadow);}.kpi{display:flex;gap:13px;align-items:center;min-height:86px;padding:16px;overflow:hidden;}.kpi.next-kpi{cursor:pointer;position:relative}.kpi.warning{--kpi-accent:var(--warning-color)}.kpi.critical,.kpi.overdue{--kpi-accent:var(--error-color)}.kpi.unavailable{--kpi-accent:var(--disabled-text-color)}.kpi.next-kpi ha-icon{color:var(--kpi-accent,var(--primary-color));background:color-mix(in srgb,var(--kpi-accent,var(--primary-color)) 16%,transparent)}.kpi.next-kpi:hover{border-color:color-mix(in srgb,var(--primary-color) 55%,var(--divider-color));background:linear-gradient(135deg,color-mix(in srgb,var(--primary-color) 9%,transparent),transparent 55%),var(--card-background-color);}.kpi ha-icon{padding:12px;border-radius:16px;background:color-mix(in srgb,var(--primary-color) 16%,transparent);color:var(--primary-color);flex:0 0 auto;}.kpi small{color:var(--secondary-text-color);text-transform:uppercase;font-size:.72rem;font-weight:900;}.kpi strong{display:block;font-size:1.25rem;margin-top:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}.kpi span{display:block;color:var(--secondary-text-color);font-size:.76rem;margin-top:2px;line-height:1.25;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}.next-kpi-body{min-width:0;flex:1}.next-cycle{display:flex;align-items:center;gap:4px;margin-left:auto;padding-left:6px;color:var(--secondary-text-color);font-size:.75rem;font-weight:850}.next-cycle button{display:grid;place-items:center;width:26px;height:26px;border-radius:999px;border:1px solid var(--divider-color);background:transparent;color:var(--primary-text-color);padding:0}.next-cycle ha-icon{padding:0;background:transparent;color:inherit;--mdc-icon-size:18px}
    .toolbar{display:grid;grid-template-columns:minmax(260px,1.1fr) minmax(320px,1.9fr);gap:18px;padding:18px;margin-bottom:18px;align-items:center;}.toolbar-copy{display:grid;gap:6px;align-self:stretch;align-content:center;}.toolbar-copy h2{font-size:1.6rem;letter-spacing:-.03em}.toolbar-main{display:grid;grid-template-columns:minmax(220px,auto) minmax(260px,1fr) minmax(140px,170px) minmax(140px,170px);gap:12px;align-items:end;}.toolbar label{display:grid;gap:5px;color:var(--secondary-text-color);font-size:.75rem;font-weight:850;}.templates-main{grid-template-columns:minmax(260px,1fr) repeat(2,minmax(180px,max-content)) minmax(220px,max-content);}.expressive{background:radial-gradient(circle at 15% 0%,color-mix(in srgb,var(--primary-color) 16%,transparent),transparent 35%),var(--card-background-color);}.search,select,input,textarea{background:var(--input-fill-color,color-mix(in srgb,var(--primary-text-color) 7%,transparent));color:var(--primary-text-color);border:1px solid var(--divider-color);border-radius:14px;min-height:42px;padding:0 12px;outline:none;}.search{min-width:0;width:100%;}textarea{min-height:90px;padding:12px;resize:vertical;}
    .task-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,380px),1fr));gap:18px;align-items:stretch;}.task-card{--task-accent:var(--primary-color);position:relative;padding:18px;display:grid;grid-template-rows:auto auto auto auto 1fr auto;gap:14px;min-width:0;border-color:color-mix(in srgb,var(--task-accent) 34%,var(--divider-color));background:linear-gradient(135deg,color-mix(in srgb,var(--task-accent) 8%,transparent),transparent 42%),var(--card-background-color);overflow:visible;}.task-card header{display:flex;justify-content:space-between;gap:12px;align-items:flex-start;}.title-row{display:flex;gap:12px;align-items:flex-start;min-width:0;}.title-row h3{overflow-wrap:anywhere;line-height:1.25;}.icon-chip{display:grid;place-items:center;width:42px;height:42px;border-radius:16px;background:color-mix(in srgb,var(--task-accent) 15%,transparent);color:var(--task-accent);flex:0 0 auto;}.status{border-radius:999px;padding:5px 9px;font-weight:850;font-size:.72rem;background:color-mix(in srgb,var(--primary-text-color) 8%,transparent);white-space:nowrap;}.status.warning{color:var(--warning-color);background:color-mix(in srgb,var(--warning-color) 15%,transparent);}.status.critical,.status.overdue{color:var(--error-color);background:color-mix(in srgb,var(--error-color) 15%,transparent);}.status.snoozed{color:var(--primary-color);background:color-mix(in srgb,var(--primary-color) 15%,transparent);}.description{line-height:1.45;min-height:2.7em;}.progress-line{display:flex;justify-content:space-between;color:var(--secondary-text-color);}.progress{height:12px;background:color-mix(in srgb,var(--disabled-text-color) 16%,transparent);border-radius:999px;overflow:hidden;}.progress div{height:100%;background:var(--task-accent);border-radius:999px;}.task-card.overdue,.task-card.critical{border-color:color-mix(in srgb,var(--error-color) 62%,var(--divider-color));}.task-card.warning{border-color:color-mix(in srgb,var(--warning-color) 62%,var(--divider-color));}.task-card.unavailable{border-color:color-mix(in srgb,var(--disabled-text-color) 55%,var(--divider-color));}.meta-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;}.meta-grid div{background:color-mix(in srgb,var(--primary-text-color) 4%,transparent);border-radius:16px;padding:10px;min-width:0;}.meta-grid span{display:block;color:var(--secondary-text-color);font-size:.70rem;font-weight:850;text-transform:uppercase;}.meta-grid strong{display:block;margin-top:4px;overflow:hidden;text-overflow:ellipsis;}.meta-grid em{font-style:normal;color:var(--secondary-text-color);font-size:.8rem;margin-left:6px;}.snooze-note{display:flex;align-items:center;gap:7px;padding:9px 11px;border-radius:14px;background:color-mix(in srgb,var(--primary-color) 12%,transparent);color:var(--primary-color);font-weight:850;}.snooze-wrap{position:relative;}.snooze-menu{position:absolute;right:0;bottom:48px;z-index:20;display:grid;gap:6px;min-width:170px;padding:10px;border:1px solid var(--divider-color);border-radius:18px;background:var(--card-background-color);box-shadow:0 16px 40px rgb(0 0 0 / 35%);}.snooze-menu strong{font-size:.8rem;color:var(--secondary-text-color);}.snooze-menu button{border:0;border-radius:12px;min-height:34px;background:color-mix(in srgb,var(--primary-text-color) 6%,transparent);color:var(--primary-text-color);}@keyframes task-focus-pulse{0%{transform:scale(1);box-shadow:0 0 0 0 color-mix(in srgb,var(--task-accent) 50%,transparent)}20%{transform:scale(1.015);box-shadow:0 0 0 7px color-mix(in srgb,var(--task-accent) 26%,transparent)}45%{transform:scale(.997);box-shadow:0 0 0 13px color-mix(in srgb,var(--task-accent) 12%,transparent)}70%{transform:scale(1.008);box-shadow:0 0 0 5px color-mix(in srgb,var(--task-accent) 22%,transparent)}100%{transform:scale(1);box-shadow:var(--ha-card-box-shadow)}}.task-card.focus-pulse{animation:task-focus-pulse 1.45s ease both;z-index:5;}
    .empty{min-height:330px;display:grid;place-items:center;text-align:center;padding:34px;gap:14px;}.empty-orb{display:grid;place-items:center;width:90px;height:90px;border-radius:32px;color:var(--primary-color);background:radial-gradient(circle,color-mix(in srgb,var(--primary-color) 28%,transparent),color-mix(in srgb,var(--primary-color) 8%,transparent));}.empty-orb ha-icon{--mdc-icon-size:46px;}.template-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr));gap:16px;}.template-group{padding:18px;margin-bottom:18px;display:grid;gap:16px}.template-group-header{display:flex;align-items:end;justify-content:space-between;gap:12px;padding-bottom:6px;border-bottom:1px solid color-mix(in srgb,var(--primary-text-color) 10%,transparent)}.template-group-header span{display:inline-grid;place-items:center;min-width:36px;height:36px;padding:0 10px;border-radius:999px;background:color-mix(in srgb,var(--primary-color) 12%,transparent);color:var(--primary-color);font-weight:850}.template-card{padding:16px;display:grid;gap:12px;}.template-card.selected{border-color:color-mix(in srgb,var(--primary-color) 60%,var(--divider-color));background:linear-gradient(135deg,color-mix(in srgb,var(--primary-color) 10%,transparent),transparent 50%),var(--card-background-color);}.template-card header{display:flex;align-items:center;gap:10px;}.template-card h3{line-height:1.25;}.template-check input{display:none;}.template-check span{display:grid;width:22px;height:22px;border-radius:7px;border:1px solid var(--divider-color);background:color-mix(in srgb,var(--primary-text-color) 4%,transparent);}.template-check input:checked + span{background:var(--primary-color);border-color:var(--primary-color);}.template-check input:checked + span:after{content:'✓';color:var(--text-primary-color);font-weight:900;text-align:center;line-height:21px;}.panel{padding:18px;margin-bottom:16px;}.history-dialog .panel{margin-bottom:0;border:0;background:transparent;box-shadow:none;padding:0;}.history-list,.settings-list{display:grid;gap:10px;}.history-row,.settings-row{display:flex;align-items:center;gap:12px;padding:13px;}.history-row div,.settings-row div{flex:1;}.history-row small,.settings-row small{display:block;color:var(--secondary-text-color);margin-top:3px;}.settings-head{display:flex;align-items:center;justify-content:space-between;gap:14px;}.drag{color:var(--secondary-text-color);cursor:grab;}
    .dialog-backdrop{position:fixed;inset:0;z-index:2147483000;display:grid;place-items:center;padding:24px;background:rgb(3 5 14 / 94%);}.dialog{width:min(1060px,100%);max-height:90vh;overflow:auto;border-radius:28px;background:var(--card-background-color);border:1px solid var(--divider-color);box-shadow:0 28px 90px rgb(0 0 0 / 48%);}.dialog.small{width:min(760px,100%);}.dialog>header,.dialog>footer{padding:18px 22px;border-bottom:1px solid var(--divider-color);display:flex;justify-content:space-between;align-items:center;}.dialog>footer{border-top:1px solid var(--divider-color);border-bottom:0;justify-content:flex-end;}.dialog-body{display:grid;gap:16px;padding:18px;}.dialog-section{display:grid;gap:14px;padding:16px;border:1px solid var(--divider-color);border-radius:20px;background:color-mix(in srgb,var(--primary-text-color) 2%,transparent);}.dialog-section .section-hint{margin:0;color:var(--secondary-text-color);font-size:.82rem;line-height:1.35}.form-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:14px;}.appearance-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;align-items:start}.appearance-icon-field{grid-column:1 / -1}.field,.entity-field,.description-field{display:grid;gap:7px;color:var(--secondary-text-color);font-size:.78rem;font-weight:850;}.field input[type=color]{width:56px;height:44px;padding:4px;border-radius:13px}.color-input-row{display:flex;align-items:center;gap:8px}.color-field input[type=color]{flex:0 0 auto}.color-actions{display:flex;flex-wrap:wrap;gap:10px}.ghost.small{min-height:34px;padding:0 10px}.icon-picker-field{min-width:0}.icon-picker-field ha-icon-picker{width:100%;max-width:100%;display:block}.check{display:flex;gap:10px;align-items:center;font-weight:850;}.template-strip,.icon-grid{display:flex;flex-wrap:wrap;gap:8px;}.template-pill,.icon-choice{border:1px solid var(--divider-color);border-radius:999px;min-height:36px;padding:0 12px;background:transparent;color:var(--primary-text-color);display:inline-flex;gap:7px;align-items:center;}.icon-choice{width:42px;padding:0;justify-content:center;}.inline-priority{display:grid;gap:12px;margin-top:4px;padding:14px;border-radius:18px;background:color-mix(in srgb,var(--primary-text-color) 3%,transparent);}.priority-head{display:flex;align-items:start;justify-content:space-between;gap:12px}.priority-head strong{font-size:1rem}.priority-slider{width:100%;accent-color:var(--primary-color);min-height:28px;padding:0;border:0;background:transparent}.priority-scale{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px}.priority-scale span{font-size:.74rem;color:var(--secondary-text-color);text-align:center;padding-top:4px}.priority-scale span.active{color:var(--primary-text-color);font-weight:850}.error{color:var(--error-color);font-weight:850;padding:12px;border-radius:14px;background:color-mix(in srgb,var(--error-color) 12%,transparent);}.backup-row{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px;border:1px solid var(--divider-color);border-radius:14px;}.toast{position:fixed;right:22px;bottom:22px;z-index:2147483001;display:flex;align-items:center;gap:10px;max-width:min(420px,calc(100vw - 32px));padding:13px 16px;border-radius:18px;background:color-mix(in srgb,var(--card-background-color) 96%,black);border:1px solid color-mix(in srgb,var(--primary-color) 38%,var(--divider-color));box-shadow:0 18px 55px rgb(0 0 0 / 42%);font-weight:850}.toast ha-icon{color:var(--primary-color)}@media(max-width:820px){.appearance-grid{grid-template-columns:1fr}.dialog{border-radius:20px}.dialog-backdrop{padding:10px}}
    @media (max-width:980px){.toolbar,.templates-toolbar{grid-template-columns:1fr}.toolbar-main,.templates-main{grid-template-columns:1fr 1fr}.toolbar-main>.primary.big,.templates-main>.primary.big{grid-column:1/-1}.templates-main .search{grid-column:1/-1}}
    @media (max-width:760px){.shell{padding:12px}.hero,.settings-head{flex-direction:column;align-items:stretch}.hero-brand{align-items:flex-start}.hero-logo{width:46px;height:46px}.hero-actions,.empty-actions,footer,.actions{flex-direction:column;align-items:stretch}.task-grid,.template-grid{grid-template-columns:1fr}.dialog-backdrop{padding:8px}.snooze-menu{left:0;right:auto}}
    .category-tabs{display:flex;gap:8px;overflow-x:auto;padding:4px 0 16px;scrollbar-width:thin}.tab{border:1px solid var(--divider-color);border-radius:999px;background:transparent;color:var(--primary-text-color);padding:10px 14px;white-space:nowrap;font-weight:800}.tab.active{background:color-mix(in srgb,var(--primary-color) 24%,transparent);border-color:color-mix(in srgb,var(--primary-color) 70%,var(--divider-color));}.template-grid.compact{grid-template-columns:repeat(auto-fill,minmax(min(100%,260px),1fr));}.template-card.compact p{display:none}.template-card.compact footer{display:flex;gap:8px;align-items:center}.settings-actions{display:flex;gap:10px;flex-wrap:wrap}.toggle-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px}.toggle-grid .check{padding:10px;border:1px solid var(--divider-color);border-radius:14px;background:color-mix(in srgb,var(--primary-text-color) 3%,transparent)}.diagnostic-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px}.diagnostic-grid div{padding:10px;border-radius:14px;background:color-mix(in srgb,var(--primary-text-color) 4%,transparent)}.diagnostic-grid span{display:block;color:var(--secondary-text-color);font-size:.72rem;text-transform:uppercase;font-weight:850}.template-preview>ha-icon{--mdc-icon-size:44px;color:var(--primary-color)}
    @media (max-width: 620px){.shell{padding:10px}.hero{gap:12px;border-bottom:0;margin-bottom:8px;padding-bottom:8px}.hero-brand{display:grid;grid-template-columns:42px 1fr;gap:10px}.hero-brand h1{font-size:1.35rem}.hero-brand p:not(.eyebrow){font-size:.8rem;line-height:1.25}.hero-actions{display:grid;grid-template-columns:1fr 1fr 44px 44px;gap:8px}.hero-actions .nav{min-height:42px;padding:0 10px}.hero-actions .icon-nav{width:auto}.kpis{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.kpi{min-height:98px;padding:12px}.kpi strong{font-size:1.05rem}.kpi span{font-size:.72rem;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.toolbar{padding:12px}.toolbar-main,.templates-main{grid-template-columns:1fr;gap:10px}.toolbar .primary.big,.templates-main .primary.big,.templates-main .search{grid-column:auto}.search{width:100%;min-width:0}.task-card{padding:14px;border-radius:22px}.task-card header{align-items:flex-start}.description{min-height:auto;font-size:.9rem}.meta-grid{grid-template-columns:1fr 1fr;gap:8px}.meta-grid div{padding:9px}.actions{display:grid!important;grid-template-columns:44px 44px 1fr;gap:8px}.actions .ghost:not(.icon-only){grid-column:1/-1}.actions .primary{min-width:0}.template-grid.compact{grid-template-columns:1fr}.template-card.compact{padding:14px}.template-card.compact footer{display:grid;grid-template-columns:1fr 1fr}.dialog-backdrop{align-items:end;place-items:end stretch;padding:0}.dialog{max-height:94vh;width:100%;border-radius:24px 24px 0 0}.dialog.small{width:100%}.dialog>header,.dialog>footer{padding:14px 16px}.dialog-body{padding:14px}.form-grid,.appearance-grid{grid-template-columns:1fr}.toast{left:10px;right:10px;bottom:10px}.category-tabs{margin:0 -4px;padding:2px 4px 12px}.settings-row{display:grid;grid-template-columns:28px 28px 1fr 36px 36px;gap:8px}.settings-row .danger{grid-column:5}.settings-actions{display:grid;grid-template-columns:1fr}.history-row{align-items:flex-start}.next-cycle{align-self:end}.priority-head{display:grid;gap:6px}.priority-scale{grid-template-columns:1fr}.priority-scale span{text-align:left}.template-group{padding:14px}}
  </style>`;
  }
});


// ---- frontend/src/register.ts ----
// Custom element registration and visible frontend version log.
if (!customElements.get("maintenance-dashboard-panel")) {
  customElements.define("maintenance-dashboard-panel", MaintenanceDashboardPanel);
}
console.info(`%cmaintenance-dashboard-panel%c v${VERSION}`, "color: var(--primary-color); font-weight: 800;", "color: inherit;");

