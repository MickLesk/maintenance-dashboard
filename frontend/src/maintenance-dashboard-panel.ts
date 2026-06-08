// @ts-nocheck
const VERSION = "1.0.0";

const CATEGORY_KEYS = ["general", "heating", "ventilation", "water", "electrical", "safety", "solar", "garden", "building", "it_network", "household", "garage", "custom"];
const STATUS_ORDER = { overdue: 0, critical: 1, warning: 2, unavailable: 3, snoozed: 4, ok: 5, disabled: 6, deleted: 7 };
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
    add: "Wartungseintrag hinzufügen", addFirst: "Ersten Wartungseintrag hinzufügen", active: "Offen", all: "Alle", backups: "Backups", cancel: "Abbrechen", cardColor: "Kartenfarbe", category: "Kategorie", clear: "Aufheben", clearSnooze: "Pause aufheben", completedThisYear: "Dieses Jahr erledigt", critical: "Kritisch", dashboard: "Dashboard", delete: "Löschen", deleted: "Gelöscht", description: "Beschreibung", diagnostics: "Diagnose", done: "Erledigt", due: "Fällig", edit: "Bearbeiten", enabled: "Aktiviert", entity: "Entität", health: "Health-Score", healthHelp: "Gewichteter Score aus Status, Priorität und Verfügbarkeit. Kritische Aufgaben mit hoher Priorität senken ihn deutlich stärker.", history: "Historie", icon: "Icon", iconColor: "Iconfarbe", interval: "Intervall", intervalUnit: "Einheit", lastDone: "Zuletzt erledigt", materialEmpty: "Starte mit einer Vorlage oder lege einen eigenen Wartungseintrag an. Die Daten werden backendseitig in Home Assistant gespeichert.", meter: "Sensor/Zähler", name: "Name", next: "Nächste Aufgabe", noTasks: "Noch keine Wartungseinträge vorhanden.", ok: "OK", overdue: "Überfällig", priority: "Priorität", progress: "Fortschritt", remaining: "verbleibend", restore: "Wiederherstellen", save: "Speichern", search: "Suche", selectTemplate: "Aus Vorlage starten", selectedTemplates: "ausgewählt", settings: "Einstellungen", snooze: "Pausieren", snoozeFor: "Pausieren für", sort: "Sortieren", sortSmart: "Smart", sortPosition: "Manuell", sortPriority: "Priorität", sortDue: "Fälligkeit", sortStatus: "Status", status: "Status", templates: "Vorlagen", templateSelectHint: "Wähle mehrere Vorlagen aus und füge nur die passenden hinzu – kein Vollspammen mehr.", time: "Zeit", undo: "Rückgängig", unavailable: "Nicht verfügbar", unavailableHelp: "Sensor-/Zähleraufgaben ohne valide Entity, ungültige Limits oder aktuell nicht lesbare HA-States.", warning: "Warnung", warnings: "Warnungen", days: "Tage", hours: "Stunden", weeks: "Wochen", months: "Monate", general: "Allgemein", heating: "Heizung", ventilation: "Lüftung", water: "Wasser", electrical: "Elektrik", safety: "Sicherheit", solar: "Solar", garden: "Garten", building: "Gebäude", it_network: "IT/Netzwerk", household: "Haushalt", garage: "Garage", custom: "Manuell", addSelected: "Gewählte hinzufügen", selectAllVisible: "Sichtbare auswählen", deselectAll: "Auswahl leeren", pausedUntil: "Pausiert bis", dragHint: "Manuelle Sortierung per Drag & Drop oder Pfeile. Smart-Sortierung nutzt Status, Priorität, Fälligkeit und manuelle Position.", randomColors: "Zufällige Farben", clearColors: "Farben zurücksetzen", priorityHint: "Priorität beeinflusst Smart-Sortierung und Health-Score.", appearanceHint: "Farben sind optional. Leer bedeutet: Home-Assistant-Theme verwenden."
  },
  en: {
    add: "Add maintenance task", addFirst: "Add first maintenance task", active: "Open", all: "All", backups: "Backups", cancel: "Cancel", cardColor: "Card color", category: "Category", clear: "Clear", clearSnooze: "Clear snooze", completedThisYear: "Done this year", critical: "Critical", dashboard: "Dashboard", delete: "Delete", deleted: "Deleted", description: "Description", diagnostics: "Diagnostics", done: "Done", due: "Due", edit: "Edit", enabled: "Enabled", entity: "Entity", health: "Health score", healthHelp: "Weighted score based on status, priority and availability. High-priority critical tasks reduce it much more strongly.", history: "History", icon: "Icon", iconColor: "Icon color", interval: "Interval", intervalUnit: "Unit", lastDone: "Last done", materialEmpty: "Start with a template or create a custom maintenance task. Data is stored by the backend inside Home Assistant.", meter: "Sensor/Meter", name: "Name", next: "Next task", noTasks: "No maintenance tasks yet.", ok: "OK", overdue: "Overdue", priority: "Priority", progress: "Progress", remaining: "remaining", restore: "Restore", save: "Save", search: "Search", selectTemplate: "Start from template", selectedTemplates: "selected", settings: "Settings", snooze: "Snooze", snoozeFor: "Snooze for", sort: "Sort", sortSmart: "Smart", sortPosition: "Manual", sortPriority: "Priority", sortDue: "Due date", sortStatus: "Status", status: "Status", templates: "Templates", templateSelectHint: "Select multiple templates and add only what fits.", time: "Time", undo: "Undo", unavailable: "Unavailable", unavailableHelp: "Meter tasks without a valid entity, invalid limits or currently unreadable Home Assistant states.", warning: "Warning", warnings: "Warnings", days: "Days", hours: "Hours", weeks: "Weeks", months: "Months", general: "General", heating: "Heating", ventilation: "Ventilation", water: "Water", electrical: "Electrical", safety: "Safety", solar: "Solar", garden: "Garden", building: "Building", it_network: "IT/Network", household: "Household", garage: "Garage", custom: "Manual", addSelected: "Add selected", selectAllVisible: "Select visible", deselectAll: "Clear selection", pausedUntil: "Paused until", dragHint: "Manual sorting via drag & drop or arrows. Smart sorting uses status, priority, due date and manual position.", randomColors: "Random colors", clearColors: "Reset colors", priorityHint: "Priority affects smart sorting and health score.", appearanceHint: "Colors are optional. Empty means: use the Home Assistant theme."
  }
};

const EMPTY = {
  name: "", type: "time", interval: "90", interval_unit: "days", entity_id: "", category: "general", custom_category: "", area_id: "", area_name: "", priority: "3", icon: "mdi:wrench-clock", icon_color: "", card_color: "", enabled: true, warning_threshold: "70", critical_threshold: "90", description: "", last_done: ""
};

class MaintenanceDashboardPanel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._view = "dashboard";
    this._state = null;
    this._draft = { ...EMPTY };
    this._dialog = null;
    this._diagnostics = false;
    this._search = "";
    this._statusFilter = "all";
    this._sortMode = "smart";
    this._dragTaskId = null;
    this._snoozeMenu = null;
    this._selectedTemplates = new Set();
    this._busy = false;
    this._error = "";
    this._searchTimer = null;
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
    this.shadowRoot.innerHTML = `${this._styles()}<main class="shell">${this._hero()}${content}${this._dialogHtml()}${this._diagnosticsHtml()}</main>`;
    this._bind();
    this._restoreFocus(focusState);
  }

  _renderSoon(delay = 180) {
    if (this._searchTimer) clearTimeout(this._searchTimer);
    this._searchTimer = setTimeout(() => { this._searchTimer = null; this._render(); }, delay);
  }

  _captureFocus() {
    const active = this.shadowRoot?.activeElement;
    if (!active || !active.id) return null;
    return { id: active.id, start: active.selectionStart, end: active.selectionEnd };
  }

  _restoreFocus(state) {
    if (!state?.id) return;
    const el = this.shadowRoot?.getElementById(state.id);
    if (!el) return;
    requestAnimationFrame(() => {
      el.focus();
      if (typeof el.setSelectionRange === "function" && state.start != null) {
        try { el.setSelectionRange(state.start, state.end ?? state.start); } catch (_) { }
      }
    });
  }

  _hero() {
    return `<section class="hero"><div><p class="eyebrow">Maintenance Dashboard</p><h1>Hauswartung & Technik</h1><p>Backend-gespeicherte Wartungsplanung mit Historie, Backups und Sidebar-Panel.</p></div><div class="hero-actions">${this._nav("dashboard", "mdi:view-dashboard", this._t("dashboard"))}${this._nav("templates", "mdi:shape-outline", this._t("templates"))}${this._nav("history", "mdi:history", this._t("history"))}${this._nav("settings", "mdi:cog", this._t("settings"))}</div></section>`;
  }

  _nav(view, icon, label) { return `<button data-view="${view}" class="nav ${this._view === view ? "active" : ""}"><ha-icon icon="${icon}"></ha-icon>${label}</button>`; }
  _viewHtml() { if (this._view === "templates") return this._templatesHtml(); if (this._view === "history") return this._historyHtml(); if (this._view === "settings") return this._settingsHtml(); return this._dashboardHtml(); }

  _dashboardHtml() {
    const s = this._state.summary || {};
    const tasks = this._filteredTasks(false);
    return `
      <section class="kpis">
        ${this._kpi("mdi:heart-pulse", this._t("health"), `${s.health ?? 100}%`, this._t("healthHelp"))}
        ${this._kpi("mdi:clipboard-list-outline", this._t("active"), s.open ?? s.active ?? 0, `${s.ok ?? 0} ${this._t("ok")}`)}
        ${this._kpi("mdi:alert-circle", this._t("critical"), s.critical ?? 0)}
        ${this._kpi("mdi:alert-outline", this._t("warnings"), s.warning ?? 0)}
        ${this._kpi("mdi:calendar-clock", this._t("next"), s.next_task?.name || "—", s.next_task?.remaining != null ? `${Math.ceil(s.next_task.remaining)} ${this._t("days")} ${this._t("remaining")}` : "")}
        ${this._kpi("mdi:check-decagram", this._t("completedThisYear"), s.completed_this_year ?? 0)}
        ${this._kpi("mdi:cloud-question", this._t("unavailable"), s.unavailable ?? 0, this._t("unavailableHelp"))}
      </section>
      <section class="toolbar expressive">
        <button data-action="create" class="primary big"><ha-icon icon="mdi:plus"></ha-icon>${this._t("add")}</button>
        <input id="search" class="search" placeholder="${this._t("search")}" value="${this._html(this._search)}">
        <label><span>${this._t("status")}</span><select id="statusFilter">${["all", "ok", "warning", "critical", "overdue", "snoozed", "unavailable"].map(x => `<option value="${x}" ${this._statusFilter === x ? "selected" : ""}>${this._t(x)}</option>`).join("")}</select></label>
        <label><span>${this._t("sort")}</span><select id="sortMode">${["smart", "position", "priority", "due", "status"].map(x => `<option value="${x}" ${this._sortMode === x ? "selected" : ""}>${this._t(`sort${x[0].toUpperCase()}${x.slice(1)}`)}</option>`).join("")}</select></label>
      </section>
      ${tasks.length ? `<section class="task-grid">${tasks.map(t => this._taskCard(t)).join("")}</section>` : this._emptyHtml()}
    `;
  }

  _kpi(icon, label, value, sub = "") {
    return `<article class="kpi" title="${this._html(sub)}"><ha-icon icon="${icon}"></ha-icon><div><small>${this._html(label)}</small><strong>${this._html(value)}</strong>${sub ? `<span>${this._html(sub)}</span>` : ""}</div></article>`;
  }

  _taskCard(task) {
    const r = this._state.runtime[task.id] || {};
    const status = r.status || "unavailable";
    const progress = Math.min(100, Math.max(0, r.progress || 0));
    const accent = task.card_color || task.icon_color || "var(--primary-color)";
    const snoozed = status === "snoozed";
    const options = this._snoozeOptions(task);
    return `<article class="task-card ${status}" style="--task-accent:${this._html(accent)}">
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

  _emptyHtml() {
    return `<section class="empty expressive-empty"><div class="empty-orb"><ha-icon icon="mdi:clipboard-plus-outline"></ha-icon></div><h2>${this._t("noTasks")}</h2><p>${this._t("materialEmpty")}</p><div class="empty-actions"><button class="primary big" data-action="create"><ha-icon icon="mdi:plus"></ha-icon>${this._t("addFirst")}</button><button class="ghost big" data-view="templates"><ha-icon icon="mdi:shape-plus-outline"></ha-icon>${this._t("templates")}</button></div></section>`;
  }

  _templatesHtml() {
    const visible = (this._state.templates || []).filter(t => this._matches(t));
    const selected = visible.filter(t => this._selectedTemplates.has(t.id));
    return `<section class="toolbar expressive templates-toolbar"><div><h2>${this._t("templates")}</h2><p>${this._t("templateSelectHint")}</p></div><input id="search" class="search" placeholder="${this._t("search")}" value="${this._html(this._search)}"><button class="ghost" data-action="select-visible"><ha-icon icon="mdi:checkbox-multiple-marked-outline"></ha-icon>${this._t("selectAllVisible")}</button><button class="ghost" data-action="clear-template-selection"><ha-icon icon="mdi:checkbox-blank-off-outline"></ha-icon>${this._t("deselectAll")}</button><button class="primary big" data-action="add-selected" ${selected.length ? "" : "disabled"}><ha-icon icon="mdi:plus-box-multiple-outline"></ha-icon>${this._t("addSelected")} · ${selected.length}</button></section><section class="template-grid">${visible.map(t => this._templateCard(t)).join("")}</section>`;
  }

  _templateCard(t) {
    const checked = this._selectedTemplates.has(t.id);
    const exists = (this._state.tasks || []).some(task => !task.deleted && String(task.name).toLowerCase() === String(t.name).toLowerCase());
    return `<article class="template-card ${checked ? "selected" : ""} ${exists ? "exists" : ""}"><header><label class="template-check"><input type="checkbox" data-template-check="${t.id}" ${checked ? "checked" : ""}><span></span></label><ha-icon icon="${this._html(t.icon)}"></ha-icon><h3>${this._html(t.name)}</h3></header><p>${this._html(t.description)}</p><small>${this._categoryLabel(t)} · ${t.interval} ${this._unitLabel(t.interval_unit)} · ${this._t("priority")} ${t.priority}/5</small><footer><button class="ghost" data-template="${t.id}" ${exists ? "disabled" : ""}><ha-icon icon="mdi:plus"></ha-icon>${exists ? this._t("ok") : this._t("add")}</button></footer></article>`;
  }

  _historyHtml() {
    return `<section class="panel"><h2>${this._t("history")}</h2><div class="history-list">${(this._state.history || []).map(event => `<article class="history-row"><ha-icon icon="${event.type === "completed" ? "mdi:check-circle-outline" : "mdi:history"}"></ha-icon><div><strong>${this._html(event.task_name || event.task_id)}</strong><p>${this._html(event.summary)} · ${this._datetime(event.created_at)}</p>${event.details?.runtime_before ? `<small>${this._runtimeSummary(event.details.runtime_before)}</small>` : ""}</div>${event.type === "completed" && !event.undone_at ? `<button class="ghost" data-undo="${event.id}">${this._t("undo")}</button>` : ""}</article>`).join("")}</div></section>`;
  }

  _settingsHtml() {
    const tasks = this._filteredTasks(true).sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
    return `<section class="panel settings-head"><div><h2>${this._t("settings")}</h2><p>${this._t("dragHint")}</p></div><button class="ghost" data-action="diagnostics"><ha-icon icon="mdi:alert-circle-outline"></ha-icon>${this._t("diagnostics")}</button></section><section class="settings-list">${tasks.map((t, idx) => `<article class="settings-row" draggable="true" data-drag="${t.id}" data-drop="${t.id}"><span class="drag"><ha-icon icon="mdi:drag"></ha-icon></span><ha-icon icon="${this._html(t.icon)}"></ha-icon><div><strong>${this._html(t.name)}</strong><small>${this._categoryLabel(t)} · ${t.interval} ${this._unitLabel(t.interval_unit)} · ${this._t("priority")} ${t.priority}/5</small></div><button class="icon" data-move="${t.id}:up" ${idx === 0 ? "disabled" : ""}><ha-icon icon="mdi:chevron-up"></ha-icon></button><button class="icon" data-move="${t.id}:down" ${idx === tasks.length - 1 ? "disabled" : ""}><ha-icon icon="mdi:chevron-down"></ha-icon></button><button class="icon" data-edit="${t.id}"><ha-icon icon="mdi:pencil"></ha-icon></button><button class="icon danger" data-delete="${t.id}"><ha-icon icon="mdi:delete-outline"></ha-icon></button></article>`).join("")}</section>`;
  }

  _dialogHtml() {
    if (!this._dialog) return "";
    const d = this._draft;
    const areas = this._areas();
    return `<div class="dialog-backdrop"><section class="dialog"><header><h2>${this._dialog === "edit" ? this._t("edit") : this._t("add")}</h2><button class="icon" data-action="close"><ha-icon icon="mdi:close"></ha-icon></button></header><div class="dialog-body">${this._dialog === "create" ? `<section class="dialog-section"><h3>${this._t("selectTemplate")}</h3><div class="template-strip">${(this._state.templates || []).slice(0, 12).map(t => `<button class="template-pill" data-apply-template="${t.id}"><ha-icon icon="${this._html(t.icon)}"></ha-icon>${this._html(t.name)}</button>`).join("")}</div></section>` : ""}<section class="dialog-section"><h3>Basis</h3><div class="form-grid">${this._input("name", this._t("name"), "text")}<label class="field"><span>${this._t("category")}</span><select data-draft="category">${CATEGORY_KEYS.map(k => `<option value="${k}" ${d.category === k ? "selected" : ""}>${this._t(k)}</option>`).join("")}</select></label>${d.category === "custom" ? this._input("custom_category", "Eigene Kategorie", "text") : ""}<label class="field"><span>Bereich</span><select data-draft="area_id"><option value="">—</option>${areas.map(a => `<option value="${a.area_id}" ${d.area_id === a.area_id ? "selected" : ""}>${this._html(a.name)}</option>`).join("")}</select></label></div><label class="entity-field"><span>${this._t("entity")}</span><ha-entity-picker id="entityPicker" allow-custom-entity></ha-entity-picker></label><label class="description-field"><span>${this._t("description")}</span><textarea data-draft="description">${this._html(d.description)}</textarea></label></section><section class="dialog-section"><h3>Intervall</h3><div class="form-grid"><label class="field"><span>Typ</span><select data-draft="type"><option value="time" ${d.type === "time" ? "selected" : ""}>${this._t("time")}</option><option value="meter" ${d.type === "meter" ? "selected" : ""}>${this._t("meter")}</option></select></label>${this._input("interval", this._t("interval"), "number")}<label class="field"><span>${this._t("intervalUnit")}</span><select data-draft="interval_unit">${["days", "hours", "weeks", "months"].map(u => `<option value="${u}" ${d.interval_unit === u ? "selected" : ""}>${this._t(u)}</option>`).join("")}</select></label>${this._input("last_done", this._t("lastDone"), "datetime-local")}</div><div class="form-grid">${this._input("warning_threshold", this._t("warning"), "number")}${this._input("critical_threshold", this._t("critical"), "number")}</div></section><section class="dialog-section"><h3>Darstellung</h3><p class="section-hint">${this._t("appearanceHint")}</p><div class="appearance-grid"><label class="field icon-picker-field"><span>${this._t("icon")}</span><div id="iconHost"></div></label><label class="field color-field"><span>${this._t("iconColor")}</span><div class="color-input-row"><input data-draft="icon_color" type="color" value="${this._html(d.icon_color || "#00bcd4")}"><button class="ghost small" data-action="random-icon-color" type="button">↻</button></div></label><label class="field color-field"><span>${this._t("cardColor")}</span><div class="color-input-row"><input data-draft="card_color" type="color" value="${this._html(d.card_color || "#1f2937")}"><button class="ghost small" data-action="random-card-color" type="button">↻</button></div></label></div><div class="color-actions"><button class="ghost" data-action="random-colors" type="button"><ha-icon icon="mdi:palette-swatch-outline"></ha-icon>${this._t("randomColors")}</button><button class="ghost" data-action="clear-colors" type="button"><ha-icon icon="mdi:close-circle-outline"></ha-icon>${this._t("clearColors")}</button></div><label class="check"><input data-draft="enabled" type="checkbox" ${d.enabled ? "checked" : ""}>${this._t("enabled")}</label></section><section class="dialog-section"><h3>${this._t("priority")}</h3><p class="section-hint">${this._t("priorityHint")}</p><label class="field"><span>${this._priorityLabel(d.priority)} (${d.priority}/5)</span><select data-draft="priority">${[1, 2, 3, 4, 5].map(p => `<option value="${p}" ${String(d.priority) === String(p) ? "selected" : ""}>${this._priorityLabel(p)} (${p}/5)</option>`).join("")}</select></label></section>${this._error ? `<div class="error">${this._html(this._error)}</div>` : ""}</div><footer><button class="ghost" data-action="close">${this._t("cancel")}</button><button class="primary" data-action="save" ${this._busy ? "disabled" : ""}>${this._t("save")}</button></footer></section></div>`;
  }

  _input(key, label, type) { return `<label class="field"><span>${label}</span><input data-draft="${key}" type="${type}" value="${this._html(this._draft[key] || "")}"></label>`; }

  _diagnosticsHtml() {
    if (!this._diagnostics) return "";
    return `<div class="dialog-backdrop"><section class="dialog small"><header><h2>${this._t("diagnostics")}</h2><button class="icon" data-action="close-diagnostics"><ha-icon icon="mdi:close"></ha-icon></button></header><div class="dialog-body"><section class="dialog-section"><h3>${this._t("diagnostics")}</h3>${this._state.diagnostics.length ? this._state.diagnostics.map(i => `<p class="${i.severity}">${i.task_id || "global"}: ${i.message}</p>`).join("") : `<p>${this._t("ok")}</p>`}</section><section class="dialog-section"><h3>${this._t("backups")}</h3>${this._state.backups.map(b => `<div class="backup-row"><span>${this._datetime(b.created_at)} · ${this._html(b.reason)}</span><button class="ghost" data-restore="${b.id}">${this._t("restore")}</button></div>`).join("")}</section></div></section></div>`;
  }

  _bind() {
    this.shadowRoot.querySelectorAll("[data-view]").forEach(el => el.addEventListener("click", () => { this._view = el.dataset.view; this._snoozeMenu = null; this._render(); }));
    this.shadowRoot.querySelectorAll("[data-action='create']").forEach(el => el.addEventListener("click", () => this._openCreate()));
    this.shadowRoot.querySelectorAll("[data-action='close']").forEach(el => el.addEventListener("click", () => { this._dialog = null; this._error = ""; this._render(); }));
    this.shadowRoot.querySelectorAll("[data-action='save']").forEach(el => el.addEventListener("click", () => this._save()));
    this.shadowRoot.querySelectorAll("[data-action='diagnostics']").forEach(el => el.addEventListener("click", () => { this._diagnostics = true; this._render(); }));
    this.shadowRoot.querySelectorAll("[data-action='close-diagnostics']").forEach(el => el.addEventListener("click", () => { this._diagnostics = false; this._render(); }));
    this.shadowRoot.querySelectorAll("[data-action='select-visible']").forEach(el => el.addEventListener("click", () => { (this._state.templates || []).filter(t => this._matches(t)).forEach(t => this._selectedTemplates.add(t.id)); this._render(); }));
    this.shadowRoot.querySelectorAll("[data-action='clear-template-selection']").forEach(el => el.addEventListener("click", () => { this._selectedTemplates.clear(); this._render(); }));
    this.shadowRoot.querySelectorAll("[data-action='add-selected']").forEach(el => el.addEventListener("click", () => this._addSelectedTemplates()));
    this.shadowRoot.querySelectorAll("[data-action='random-colors']").forEach(el => el.addEventListener("click", () => { this._randomizeColors("both"); }));
    this.shadowRoot.querySelectorAll("[data-action='random-icon-color']").forEach(el => el.addEventListener("click", () => { this._randomizeColors("icon"); }));
    this.shadowRoot.querySelectorAll("[data-action='random-card-color']").forEach(el => el.addEventListener("click", () => { this._randomizeColors("card"); }));
    this.shadowRoot.querySelectorAll("[data-action='clear-colors']").forEach(el => el.addEventListener("click", () => { this._draft.icon_color = ""; this._draft.card_color = ""; this._render(); }));
    const search = this.shadowRoot.getElementById("search"); if (search) search.addEventListener("input", e => { this._search = e.target.value; this._renderSoon(240); });
    const sf = this.shadowRoot.getElementById("statusFilter"); if (sf) sf.addEventListener("change", e => { this._statusFilter = e.target.value; this._render(); });
    const sm = this.shadowRoot.getElementById("sortMode"); if (sm) sm.addEventListener("change", e => { this._sortMode = e.target.value; this._render(); });
    this.shadowRoot.querySelectorAll("[data-edit]").forEach(el => el.addEventListener("click", () => this._openEdit(el.dataset.edit)));
    this.shadowRoot.querySelectorAll("[data-done]").forEach(el => el.addEventListener("click", () => this._markDone(el.dataset.done)));
    this.shadowRoot.querySelectorAll("[data-snooze-menu]").forEach(el => el.addEventListener("click", () => { this._snoozeMenu = this._snoozeMenu === el.dataset.snoozeMenu ? null : el.dataset.snoozeMenu; this._render(); }));
    this.shadowRoot.querySelectorAll("[data-snooze-days]").forEach(el => el.addEventListener("click", () => { const [id, days] = el.dataset.snoozeDays.split(":"); this._snooze(id, Number(days)); }));
    this.shadowRoot.querySelectorAll("[data-clear-snooze]").forEach(el => el.addEventListener("click", () => this._clearSnooze(el.dataset.clearSnooze)));
    this.shadowRoot.querySelectorAll("[data-delete]").forEach(el => el.addEventListener("click", () => this._delete(el.dataset.delete)));
    this.shadowRoot.querySelectorAll("[data-undo]").forEach(el => el.addEventListener("click", () => this._undo(el.dataset.undo)));
    this.shadowRoot.querySelectorAll("[data-restore]").forEach(el => el.addEventListener("click", () => this._restoreBackup(el.dataset.restore)));
    this.shadowRoot.querySelectorAll("[data-template]").forEach(el => el.addEventListener("click", () => this._openCreate(this._template(el.dataset.template))));
    this.shadowRoot.querySelectorAll("[data-template-check]").forEach(el => el.addEventListener("change", () => { if (el.checked) this._selectedTemplates.add(el.dataset.templateCheck); else this._selectedTemplates.delete(el.dataset.templateCheck); this._render(); }));
    this.shadowRoot.querySelectorAll("[data-apply-template]").forEach(el => el.addEventListener("click", () => { this._applyTemplate(this._template(el.dataset.applyTemplate)); this._render(); }));
    this.shadowRoot.querySelectorAll("[data-move]").forEach(el => el.addEventListener("click", () => { const [id, dir] = el.dataset.move.split(":"); this._move(id, dir === "up" ? -1 : 1); }));
    this.shadowRoot.querySelectorAll("[data-drag]").forEach(el => { el.addEventListener("dragstart", () => this._dragTaskId = el.dataset.drag); el.addEventListener("dragover", e => e.preventDefault()); el.addEventListener("drop", () => this._dropOn(el.dataset.drop)); });
    this.shadowRoot.querySelectorAll("[data-draft]").forEach(el => el.addEventListener("input", e => this._draftChange(e)));
    this.shadowRoot.querySelectorAll("select[data-draft]").forEach(el => el.addEventListener("change", e => this._draftChange(e)));
    const picker = this.shadowRoot.getElementById("entityPicker"); if (picker) { picker.hass = this.hass; picker.value = this._draft.entity_id; picker.addEventListener("value-changed", e => { this._draft.entity_id = String(e.detail?.value || ""); }); }
    const iconHost = this.shadowRoot.getElementById("iconHost"); if (iconHost) this._mountIconPicker(iconHost);
  }

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

  _randomColor(list) { return list[Math.floor(Math.random() * list.length)] || "#00bcd4"; }

  _randomizeColors(target = "both") {
    if (target === "both" || target === "icon") this._draft.icon_color = this._randomColor(COLOR_PALETTE);
    if (target === "both" || target === "card") this._draft.card_color = this._randomColor(CARD_COLOR_PALETTE);
    this._render();
  }

  _priorityLabel(value) {
    const normalized = Math.min(5, Math.max(1, Number(value) || 3));
    return PRIORITY_LABELS[this._lang()]?.[normalized] || PRIORITY_LABELS.en[normalized] || String(normalized);
  }

  _draftChange(e) {
    const el = e.target;
    const key = el.dataset.draft;
    this._draft[key] = el.type === "checkbox" ? el.checked : el.value;
    if (key === "area_id") { const area = this._areas().find(x => x.area_id === el.value); this._draft.area_name = area?.name || ""; }
    if (key === "category") this._render();
  }

  _openCreate(template) { this._draft = { ...EMPTY, last_done: this._dateInput(new Date()) }; if (template) this._applyTemplate(template); this._dialog = "create"; this._render(); }
  _openEdit(id) { const t = this._state.tasks.find(x => x.id === id); if (!t) return; this._draft = { id: t.id, name: t.name || "", type: t.type || "time", interval: String(t.interval || 90), interval_unit: t.interval_unit || "days", entity_id: t.entity_id || "", category: t.category || "general", custom_category: t.custom_category || "", area_id: t.area_id || "", area_name: t.area_name || "", priority: String(t.priority || 3), icon: t.icon || "mdi:wrench-clock", icon_color: t.icon_color || "", card_color: t.card_color || "", enabled: t.enabled !== false, warning_threshold: String(t.warning_threshold ?? 70), critical_threshold: String(t.critical_threshold ?? 90), description: t.description || "", last_done: this._dateInput(t.last_done ? new Date(t.last_done) : new Date()) }; this._dialog = "edit"; this._render(); }
  _applyTemplate(t) { if (!t) return; Object.assign(this._draft, { name: t.name || this._draft.name, type: t.type || "time", interval: String(t.interval || this._draft.interval), interval_unit: t.interval_unit || "days", category: t.category || "general", area_name: t.area_name || "", priority: String(t.priority || 3), icon: t.icon || "mdi:wrench-clock", description: t.description || "" }); }

  async _save() {
    if (!this.hass) return;
    if (!this._draft.name.trim()) { this._error = "Name fehlt"; this._render(); return; }
    if (this._draft.category === "custom" && !this._draft.custom_category.trim()) { this._error = "Eigene Kategorie fehlt"; this._render(); return; }
    const task = this._draftToTask();
    try {
      this._busy = true;
      if (this._dialog === "edit" && this._draft.id) await this.hass.callWS({ type: "maintenance_dashboard/update_task", task_id: this._draft.id, patch: task });
      else await this.hass.callWS({ type: "maintenance_dashboard/create_task", task });
      this._dialog = null; await this._load();
    } catch (e) { this._error = String(e); this._render(); }
    finally { this._busy = false; }
  }

  _draftToTask() {
    const area = this._areas().find(a => a.area_id === this._draft.area_id);
    return { name: this._draft.name.trim(), type: this._draft.type, interval: Number(this._draft.interval) || 1, interval_unit: this._draft.interval_unit, entity_id: this._draft.entity_id || undefined, category: this._draft.category, custom_category: this._draft.category === "custom" ? this._draft.custom_category.trim() : undefined, area_id: this._draft.area_id || undefined, area_name: area?.name || this._draft.area_name || undefined, priority: Number(this._draft.priority) || 3, icon: this._draft.icon || "mdi:wrench-clock", icon_color: this._draft.icon_color || undefined, card_color: this._draft.card_color || undefined, enabled: Boolean(this._draft.enabled), warning_threshold: Number(this._draft.warning_threshold) || 70, critical_threshold: Number(this._draft.critical_threshold) || 90, description: this._draft.description || "", last_done: this._draft.last_done ? new Date(this._draft.last_done).toISOString() : undefined };
  }

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
  }

  async _markDone(id) { await this.hass.callWS({ type: "maintenance_dashboard/mark_done", task_id: id }); await this._load(); }
  async _snooze(id, days) { this._snoozeMenu = null; await this.hass.callWS({ type: "maintenance_dashboard/snooze", task_id: id, days }); await this._load(); }
  async _clearSnooze(id) { await this.hass.callWS({ type: "maintenance_dashboard/clear_snooze", task_id: id }); await this._load(); }
  async _undo(id) { await this.hass.callWS({ type: "maintenance_dashboard/undo_completion", event_id: id }); await this._load(); }
  async _delete(id) { await this.hass.callWS({ type: "maintenance_dashboard/delete_task", task_id: id }); await this._load(); }
  async _restoreBackup(id) { await this.hass.callWS({ type: "maintenance_dashboard/restore_backup", backup_id: id }); await this._load(); }

  async _move(id, delta) { const tasks = this._filteredTasks(true).sort((a, b) => (a.position ?? 0) - (b.position ?? 0)); const idx = tasks.findIndex(t => t.id === id); const target = idx + delta; if (idx < 0 || target < 0 || target >= tasks.length) return; const [item] = tasks.splice(idx, 1); tasks.splice(target, 0, item); await this.hass.callWS({ type: "maintenance_dashboard/reorder", ordered_ids: tasks.map(t => t.id) }); await this._load(); }
  async _dropOn(targetId) { if (!this._dragTaskId || this._dragTaskId === targetId) return; const tasks = this._filteredTasks(true).sort((a, b) => (a.position ?? 0) - (b.position ?? 0)); const from = tasks.findIndex(t => t.id === this._dragTaskId); const to = tasks.findIndex(t => t.id === targetId); if (from < 0 || to < 0) return; const [item] = tasks.splice(from, 1); tasks.splice(to, 0, item); this._dragTaskId = null; await this.hass.callWS({ type: "maintenance_dashboard/reorder", ordered_ids: tasks.map(t => t.id) }); await this._load(); }

  _filteredTasks(includeDeleted) { return (this._state?.tasks || []).filter(t => includeDeleted || !t.deleted).filter(t => this._matches(t)).filter(t => this._statusFilter === "all" || this._state?.runtime[t.id]?.status === this._statusFilter).sort((a, b) => this._compareTasks(a, b)); }
  _compareTasks(a, b) { const ar = this._state?.runtime[a.id] || {}; const br = this._state?.runtime[b.id] || {}; if (this._sortMode === "position") return (a.position ?? 0) - (b.position ?? 0); if (this._sortMode === "priority") return (b.priority ?? 0) - (a.priority ?? 0) || this._dueValue(ar) - this._dueValue(br); if (this._sortMode === "due") return this._dueValue(ar) - this._dueValue(br); if (this._sortMode === "status") return (STATUS_ORDER[ar.status] ?? 99) - (STATUS_ORDER[br.status] ?? 99) || (b.priority ?? 0) - (a.priority ?? 0); return (STATUS_ORDER[ar.status] ?? 99) - (STATUS_ORDER[br.status] ?? 99) || (b.priority ?? 0) - (a.priority ?? 0) || this._dueValue(ar) - this._dueValue(br) || (a.position ?? 0) - (b.position ?? 0); }
  _dueValue(runtime) { return runtime?.due_at ? new Date(runtime.due_at).getTime() : Number.MAX_SAFE_INTEGER; }
  _matches(task) { const q = this._search.trim().toLowerCase(); if (!q) return true; return [task.name, task.description, task.area_name, task.category, task.custom_category].filter(Boolean).join(" ").toLowerCase().includes(q); }

  _snoozeOptions(task) { const days = this._intervalAsDays(task); if (days <= 30) return [1, 3, 7]; if (days <= 90) return [1, 3, 7, 14]; return [1, 3, 7, 14, 30]; }
  _intervalAsDays(task) { const n = Number(task.interval) || 1; const u = task.interval_unit || "days"; if (u === "hours") return Math.max(1, Math.ceil(n / 24)); if (u === "weeks") return n * 7; if (u === "months") return n * 30; return n; }
  _template(id) { return (this._state.templates || []).find(t => t.id === id); }
  _areas() { const raw = this.hass?.areas; if (!raw) return []; return Array.isArray(raw) ? raw : Object.values(raw); }
  _categoryLabel(task) { return task.category === "custom" ? this._html(task.custom_category || this._t("custom")) : this._t(task.category || "general"); }
  _unitLabel(unit) { return this._t(unit || "days"); }
  _date(value) { if (!value) return "—"; return new Intl.DateTimeFormat(this._lang() === "de" ? "de-DE" : "en-US", { dateStyle: "medium" }).format(new Date(value)); }
  _datetime(value) { if (!value) return "—"; return new Intl.DateTimeFormat(this._lang() === "de" ? "de-DE" : "en-US", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value)); }
  _dateInput(date) { return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}T${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`; }
  _remaining(runtime, task) { if (!runtime || runtime.remaining == null) return "—"; return `${Math.ceil(Math.abs(runtime.remaining))} ${this._unitLabel(task.interval_unit)} ${runtime.remaining < 0 ? this._t("overdue") : this._t("remaining")}`; }
  _runtimeSummary(runtime) { return `${this._t("progress")}: ${Math.round(runtime.progress || 0)}%, ${this._t("remaining")}: ${runtime.remaining ?? "—"}`; }

  _styles() {
    return `<style>
    :host{display:block;min-height:100vh;background:var(--primary-background-color);color:var(--primary-text-color);}
    .shell{min-height:100vh;box-sizing:border-box;padding:24px 32px;max-width:1880px;margin:0 auto;}
    .hero{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:18px 4px 22px;border-bottom:1px solid var(--divider-color);margin-bottom:18px;}
    .eyebrow{margin:0 0 6px;color:var(--primary-color);font-weight:850;letter-spacing:.08em;text-transform:uppercase;font-size:.72rem;} h1{margin:0;font-size:clamp(1.5rem,3vw,2.6rem);letter-spacing:-.045em;} h2,h3{margin:0;} p{margin:0;color:var(--secondary-text-color);} button,input,select,textarea{font:inherit;} button{cursor:pointer;transition:transform .1s ease,background .15s ease,border-color .15s ease;} button:active{transform:scale(.97);} button[disabled]{opacity:.45;pointer-events:none;}
    .hero-actions,.empty-actions,footer,.actions{display:flex;gap:10px;flex-wrap:wrap;align-items:center;}.nav,.ghost,.primary,.icon{display:inline-flex;align-items:center;justify-content:center;gap:8px;border-radius:999px;border:1px solid var(--divider-color);min-height:40px;padding:0 16px;background:color-mix(in srgb,var(--card-background-color) 92%,transparent);color:var(--primary-text-color);} .nav.active,.ghost:hover{background:color-mix(in srgb,var(--primary-color) 18%,transparent);border-color:color-mix(in srgb,var(--primary-color) 55%,var(--divider-color));}.primary{border:0;background:var(--primary-color);color:var(--text-primary-color);font-weight:850;}.big{min-height:48px;padding:0 22px;}.icon,.icon-only{width:40px;min-width:40px;padding:0;color:var(--secondary-text-color);}.danger{color:var(--error-color);}
    .kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:14px;margin-bottom:18px;}.kpi,.panel,.toolbar,.task-card,.empty,.template-card,.settings-row{border:1px solid var(--divider-color);border-radius:24px;background:var(--card-background-color);box-shadow:var(--ha-card-box-shadow);}.kpi{display:flex;gap:13px;align-items:center;min-height:86px;padding:16px;overflow:hidden;}.kpi ha-icon{padding:12px;border-radius:16px;background:color-mix(in srgb,var(--primary-color) 16%,transparent);color:var(--primary-color);flex:0 0 auto;}.kpi small{color:var(--secondary-text-color);text-transform:uppercase;font-size:.72rem;font-weight:900;}.kpi strong{display:block;font-size:1.25rem;margin-top:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}.kpi span{display:block;color:var(--secondary-text-color);font-size:.76rem;margin-top:2px;line-height:1.25;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
    .toolbar{display:flex;justify-content:flex-end;align-items:end;gap:12px;padding:16px;margin-bottom:18px;}.toolbar label{display:grid;gap:5px;color:var(--secondary-text-color);font-size:.75rem;font-weight:850;}.templates-toolbar{justify-content:space-between;align-items:center;}.expressive{background:radial-gradient(circle at 15% 0%,color-mix(in srgb,var(--primary-color) 16%,transparent),transparent 35%),var(--card-background-color);}.search,select,input,textarea{background:var(--input-fill-color,color-mix(in srgb,var(--primary-text-color) 7%,transparent));color:var(--primary-text-color);border:1px solid var(--divider-color);border-radius:14px;min-height:42px;padding:0 12px;outline:none;}.search{min-width:min(340px,100%);}textarea{min-height:90px;padding:12px;resize:vertical;}
    .task-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,380px),1fr));gap:18px;align-items:stretch;}.task-card{--task-accent:var(--primary-color);position:relative;padding:18px;display:grid;grid-template-rows:auto auto auto auto 1fr auto;gap:14px;min-width:0;border-color:color-mix(in srgb,var(--task-accent) 34%,var(--divider-color));background:linear-gradient(135deg,color-mix(in srgb,var(--task-accent) 8%,transparent),transparent 42%),var(--card-background-color);overflow:visible;}.task-card header{display:flex;justify-content:space-between;gap:12px;align-items:flex-start;}.title-row{display:flex;gap:12px;align-items:flex-start;min-width:0;}.title-row h3{overflow-wrap:anywhere;line-height:1.25;}.icon-chip{display:grid;place-items:center;width:42px;height:42px;border-radius:16px;background:color-mix(in srgb,var(--task-accent) 15%,transparent);color:var(--task-accent);flex:0 0 auto;}.status{border-radius:999px;padding:5px 9px;font-weight:850;font-size:.72rem;background:color-mix(in srgb,var(--primary-text-color) 8%,transparent);white-space:nowrap;}.status.warning{color:var(--warning-color);background:color-mix(in srgb,var(--warning-color) 15%,transparent);}.status.critical,.status.overdue{color:var(--error-color);background:color-mix(in srgb,var(--error-color) 15%,transparent);}.status.snoozed{color:var(--primary-color);background:color-mix(in srgb,var(--primary-color) 15%,transparent);}.description{line-height:1.45;min-height:2.7em;}.progress-line{display:flex;justify-content:space-between;color:var(--secondary-text-color);}.progress{height:12px;background:color-mix(in srgb,var(--disabled-text-color) 16%,transparent);border-radius:999px;overflow:hidden;}.progress div{height:100%;background:var(--task-accent);border-radius:999px;}.meta-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;}.meta-grid div{background:color-mix(in srgb,var(--primary-text-color) 4%,transparent);border-radius:16px;padding:10px;min-width:0;}.meta-grid span{display:block;color:var(--secondary-text-color);font-size:.70rem;font-weight:850;text-transform:uppercase;}.meta-grid strong{display:block;margin-top:4px;overflow:hidden;text-overflow:ellipsis;}.meta-grid em{font-style:normal;color:var(--secondary-text-color);font-size:.8rem;margin-left:6px;}.snooze-note{display:flex;align-items:center;gap:7px;padding:9px 11px;border-radius:14px;background:color-mix(in srgb,var(--primary-color) 12%,transparent);color:var(--primary-color);font-weight:850;}.snooze-wrap{position:relative;}.snooze-menu{position:absolute;right:0;bottom:48px;z-index:20;display:grid;gap:6px;min-width:170px;padding:10px;border:1px solid var(--divider-color);border-radius:18px;background:var(--card-background-color);box-shadow:0 16px 40px rgb(0 0 0 / 35%);}.snooze-menu strong{font-size:.8rem;color:var(--secondary-text-color);}.snooze-menu button{border:0;border-radius:12px;min-height:34px;background:color-mix(in srgb,var(--primary-text-color) 6%,transparent);color:var(--primary-text-color);}
    .empty{min-height:330px;display:grid;place-items:center;text-align:center;padding:34px;gap:14px;}.empty-orb{display:grid;place-items:center;width:90px;height:90px;border-radius:32px;color:var(--primary-color);background:radial-gradient(circle,color-mix(in srgb,var(--primary-color) 28%,transparent),color-mix(in srgb,var(--primary-color) 8%,transparent));}.empty-orb ha-icon{--mdc-icon-size:46px;}.template-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr));gap:16px;}.template-card{padding:16px;display:grid;gap:12px;}.template-card.selected{border-color:color-mix(in srgb,var(--primary-color) 60%,var(--divider-color));background:linear-gradient(135deg,color-mix(in srgb,var(--primary-color) 10%,transparent),transparent 50%),var(--card-background-color);}.template-card header{display:flex;align-items:center;gap:10px;}.template-card h3{line-height:1.25;}.template-check input{display:none;}.template-check span{display:grid;width:22px;height:22px;border-radius:7px;border:1px solid var(--divider-color);background:color-mix(in srgb,var(--primary-text-color) 4%,transparent);}.template-check input:checked + span{background:var(--primary-color);border-color:var(--primary-color);}.template-check input:checked + span:after{content:'✓';color:var(--text-primary-color);font-weight:900;text-align:center;line-height:21px;}.panel{padding:18px;margin-bottom:16px;}.history-list,.settings-list{display:grid;gap:10px;}.history-row,.settings-row{display:flex;align-items:center;gap:12px;padding:13px;}.history-row div,.settings-row div{flex:1;}.history-row small,.settings-row small{display:block;color:var(--secondary-text-color);margin-top:3px;}.settings-head{display:flex;align-items:center;justify-content:space-between;gap:14px;}.drag{color:var(--secondary-text-color);cursor:grab;}
    .dialog-backdrop{position:fixed;inset:0;z-index:2147483000;display:grid;place-items:center;padding:24px;background:rgb(3 5 14 / 94%);}.dialog{width:min(1060px,100%);max-height:90vh;overflow:auto;border-radius:28px;background:var(--card-background-color);border:1px solid var(--divider-color);box-shadow:0 28px 90px rgb(0 0 0 / 48%);}.dialog.small{width:min(760px,100%);}.dialog>header,.dialog>footer{padding:18px 22px;border-bottom:1px solid var(--divider-color);display:flex;justify-content:space-between;align-items:center;}.dialog>footer{border-top:1px solid var(--divider-color);border-bottom:0;justify-content:flex-end;}.dialog-body{display:grid;gap:16px;padding:18px;}.dialog-section{display:grid;gap:14px;padding:16px;border:1px solid var(--divider-color);border-radius:20px;background:color-mix(in srgb,var(--primary-text-color) 2%,transparent);}.dialog-section .section-hint{margin:0;color:var(--secondary-text-color);font-size:.82rem;line-height:1.35}.form-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:14px;}.appearance-grid{display:grid;grid-template-columns:minmax(280px,1.5fr) minmax(180px,.7fr) minmax(180px,.7fr);gap:14px;align-items:start}.field,.entity-field,.description-field{display:grid;gap:7px;color:var(--secondary-text-color);font-size:.78rem;font-weight:850;}.field input[type=color]{width:56px;height:44px;padding:4px;border-radius:13px}.color-input-row{display:flex;align-items:center;gap:8px}.color-actions{display:flex;flex-wrap:wrap;gap:10px}.ghost.small{min-height:34px;padding:0 10px}.icon-picker-field{min-width:0}.icon-picker-field ha-icon-picker{width:100%;max-width:100%;display:block}.check{display:flex;gap:10px;align-items:center;font-weight:850;}.template-strip,.icon-grid{display:flex;flex-wrap:wrap;gap:8px;}.template-pill,.icon-choice{border:1px solid var(--divider-color);border-radius:999px;min-height:36px;padding:0 12px;background:transparent;color:var(--primary-text-color);display:inline-flex;gap:7px;align-items:center;}.icon-choice{width:42px;padding:0;justify-content:center;}.error{color:var(--error-color);font-weight:850;padding:12px;border-radius:14px;background:color-mix(in srgb,var(--error-color) 12%,transparent);}.backup-row{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px;border:1px solid var(--divider-color);border-radius:14px;}@media(max-width:820px){.appearance-grid{grid-template-columns:1fr}.dialog{border-radius:20px}.dialog-backdrop{padding:10px}}
    @media (max-width:760px){.shell{padding:12px}.hero,.settings-head,.toolbar,.templates-toolbar{flex-direction:column;align-items:stretch}.hero-actions,.empty-actions,footer,.actions{flex-direction:column;align-items:stretch}.task-grid,.template-grid{grid-template-columns:1fr}.dialog-backdrop{padding:8px}.snooze-menu{left:0;right:auto}}
  </style>`;
  }
}

if (!customElements.get("maintenance-dashboard-panel")) {
  customElements.define("maintenance-dashboard-panel", MaintenanceDashboardPanel);
}
console.info(`%cmaintenance-dashboard-panel%c v${VERSION}`, "color: var(--primary-color); font-weight: 800;", "color: inherit;");
