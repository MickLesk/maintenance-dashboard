//#region frontend/src/maintenance-dashboard-panel.ts
var e = "2.1.0", t = [
	"general",
	"heating",
	"ventilation",
	"water",
	"electrical",
	"safety",
	"solar",
	"garden",
	"building",
	"it_network",
	"household",
	"garage",
	"custom"
], n = {
	overdue: 0,
	critical: 1,
	warning: 2,
	unavailable: 3,
	snoozed: 4,
	ok: 5,
	disabled: 6,
	deleted: 7
}, r = [
	"mdi:wrench-clock",
	"mdi:air-filter",
	"mdi:heat-pump-outline",
	"mdi:fan",
	"mdi:water-pump",
	"mdi:smoke-detector-outline",
	"mdi:home-battery-outline",
	"mdi:robot-mower-outline",
	"mdi:fire-extinguisher",
	"mdi:server-network",
	"mdi:home-roof",
	"mdi:garage",
	"mdi:solar-power-variant-outline",
	"mdi:medical-bag",
	"mdi:tumble-dryer",
	"mdi:fridge-outline",
	"mdi:router-network",
	"mdi:valve"
], i = {
	de: {
		add: "Wartungseintrag hinzufügen",
		addFirst: "Ersten Wartungseintrag hinzufügen",
		active: "Offen",
		all: "Alle",
		backups: "Backups",
		cancel: "Abbrechen",
		cardColor: "Kartenfarbe",
		category: "Kategorie",
		clear: "Aufheben",
		clearSnooze: "Pause aufheben",
		completedThisYear: "Dieses Jahr erledigt",
		critical: "Kritisch",
		dashboard: "Dashboard",
		delete: "Löschen",
		deleted: "Gelöscht",
		description: "Beschreibung",
		diagnostics: "Diagnose",
		done: "Erledigt",
		due: "Fällig",
		edit: "Bearbeiten",
		enabled: "Aktiviert",
		entity: "Entität",
		health: "Health-Score",
		healthHelp: "Gewichteter Score aus Status, Priorität und Verfügbarkeit. Kritische Aufgaben mit hoher Priorität senken ihn deutlich stärker.",
		history: "Historie",
		icon: "Icon",
		iconColor: "Iconfarbe",
		interval: "Intervall",
		intervalUnit: "Einheit",
		lastDone: "Zuletzt erledigt",
		materialEmpty: "Starte mit einer Vorlage oder lege einen eigenen Wartungseintrag an. Die Daten werden backendseitig in Home Assistant gespeichert.",
		meter: "Sensor/Zähler",
		name: "Name",
		next: "Nächste Aufgabe",
		noTasks: "Noch keine Wartungseinträge vorhanden.",
		ok: "OK",
		overdue: "Überfällig",
		priority: "Priorität",
		progress: "Fortschritt",
		remaining: "verbleibend",
		restore: "Wiederherstellen",
		save: "Speichern",
		search: "Suche",
		selectTemplate: "Aus Vorlage starten",
		selectedTemplates: "ausgewählt",
		settings: "Einstellungen",
		snooze: "Pausieren",
		snoozeFor: "Pausieren für",
		sort: "Sortieren",
		sortSmart: "Smart",
		sortPosition: "Manuell",
		sortPriority: "Priorität",
		sortDue: "Fälligkeit",
		sortStatus: "Status",
		status: "Status",
		templates: "Vorlagen",
		templateSelectHint: "Wähle mehrere Vorlagen aus und füge nur die passenden hinzu – kein Vollspammen mehr.",
		time: "Zeit",
		undo: "Rückgängig",
		unavailable: "Nicht verfügbar",
		unavailableHelp: "Sensor-/Zähleraufgaben ohne valide Entity, ungültige Limits oder aktuell nicht lesbare HA-States.",
		warning: "Warnung",
		warnings: "Warnungen",
		days: "Tage",
		hours: "Stunden",
		weeks: "Wochen",
		months: "Monate",
		general: "Allgemein",
		heating: "Heizung",
		ventilation: "Lüftung",
		water: "Wasser",
		electrical: "Elektrik",
		safety: "Sicherheit",
		solar: "Solar",
		garden: "Garten",
		building: "Gebäude",
		it_network: "IT/Netzwerk",
		household: "Haushalt",
		garage: "Garage",
		custom: "Manuell",
		addSelected: "Gewählte hinzufügen",
		selectAllVisible: "Sichtbare auswählen",
		deselectAll: "Auswahl leeren",
		pausedUntil: "Pausiert bis",
		dragHint: "Manuelle Sortierung per Drag & Drop oder Pfeile. Smart-Sortierung nutzt Status, Priorität, Fälligkeit und manuelle Position."
	},
	en: {
		add: "Add maintenance task",
		addFirst: "Add first maintenance task",
		active: "Open",
		all: "All",
		backups: "Backups",
		cancel: "Cancel",
		cardColor: "Card color",
		category: "Category",
		clear: "Clear",
		clearSnooze: "Clear snooze",
		completedThisYear: "Done this year",
		critical: "Critical",
		dashboard: "Dashboard",
		delete: "Delete",
		deleted: "Deleted",
		description: "Description",
		diagnostics: "Diagnostics",
		done: "Done",
		due: "Due",
		edit: "Edit",
		enabled: "Enabled",
		entity: "Entity",
		health: "Health score",
		healthHelp: "Weighted score based on status, priority and availability. High-priority critical tasks reduce it much more strongly.",
		history: "History",
		icon: "Icon",
		iconColor: "Icon color",
		interval: "Interval",
		intervalUnit: "Unit",
		lastDone: "Last done",
		materialEmpty: "Start with a template or create a custom maintenance task. Data is stored by the backend inside Home Assistant.",
		meter: "Sensor/Meter",
		name: "Name",
		next: "Next task",
		noTasks: "No maintenance tasks yet.",
		ok: "OK",
		overdue: "Overdue",
		priority: "Priority",
		progress: "Progress",
		remaining: "remaining",
		restore: "Restore",
		save: "Save",
		search: "Search",
		selectTemplate: "Start from template",
		selectedTemplates: "selected",
		settings: "Settings",
		snooze: "Snooze",
		snoozeFor: "Snooze for",
		sort: "Sort",
		sortSmart: "Smart",
		sortPosition: "Manual",
		sortPriority: "Priority",
		sortDue: "Due date",
		sortStatus: "Status",
		status: "Status",
		templates: "Templates",
		templateSelectHint: "Select multiple templates and add only what fits.",
		time: "Time",
		undo: "Undo",
		unavailable: "Unavailable",
		unavailableHelp: "Meter tasks without a valid entity, invalid limits or currently unreadable Home Assistant states.",
		warning: "Warning",
		warnings: "Warnings",
		days: "Days",
		hours: "Hours",
		weeks: "Weeks",
		months: "Months",
		general: "General",
		heating: "Heating",
		ventilation: "Ventilation",
		water: "Water",
		electrical: "Electrical",
		safety: "Safety",
		solar: "Solar",
		garden: "Garden",
		building: "Building",
		it_network: "IT/Network",
		household: "Household",
		garage: "Garage",
		custom: "Manual",
		addSelected: "Add selected",
		selectAllVisible: "Select visible",
		deselectAll: "Clear selection",
		pausedUntil: "Paused until",
		dragHint: "Manual sorting via drag & drop or arrows. Smart sorting uses status, priority, due date and manual position."
	}
}, a = {
	name: "",
	type: "time",
	interval: "90",
	interval_unit: "days",
	entity_id: "",
	category: "general",
	custom_category: "",
	area_id: "",
	area_name: "",
	priority: "3",
	icon: "mdi:wrench-clock",
	icon_color: "",
	card_color: "",
	enabled: !0,
	warning_threshold: "70",
	critical_threshold: "90",
	description: "",
	last_done: ""
}, o = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }), this._view = "dashboard", this._state = null, this._draft = { ...a }, this._dialog = null, this._diagnostics = !1, this._search = "", this._statusFilter = "all", this._sortMode = "smart", this._dragTaskId = null, this._snoozeMenu = null, this._selectedTemplates = /* @__PURE__ */ new Set(), this._busy = !1, this._error = "";
	}
	set hass(e) {
		this._hass = e, this._state || this._load(), this._subscribe();
	}
	get hass() {
		return this._hass;
	}
	connectedCallback() {
		this._load(), this._render();
	}
	disconnectedCallback() {
		this._unsubscribe && this._unsubscribe();
	}
	async _subscribe() {
		!this.hass?.connection?.subscribeEvents || this._unsubscribe || (this._unsubscribe = await this.hass.connection.subscribeEvents(() => this._load(), "maintenance_dashboard_updated"));
	}
	async _load() {
		if (this.hass?.callWS) {
			try {
				this._state = await this.hass.callWS({ type: "maintenance_dashboard/get_state" }), this._error = "";
			} catch (e) {
				this._error = String(e);
			}
			this._render();
		}
	}
	_lang() {
		return String(this.hass?.language || this.hass?.locale?.language || document.documentElement.lang || "en").toLowerCase().startsWith("de") ? "de" : "en";
	}
	_t(e) {
		return i[this._lang()][e] || i.en[e] || e;
	}
	_html(e) {
		return String(e ?? "").replace(/[&<>"]/g, (e) => ({
			"&": "&amp;",
			"<": "&lt;",
			">": "&gt;",
			"\"": "&quot;"
		})[e]);
	}
	_render() {
		let e = this._state ? this._viewHtml() : "<div class=\"loading\">Loading…</div>";
		this.shadowRoot.innerHTML = `${this._styles()}<main class="shell">${this._hero()}${e}${this._dialogHtml()}${this._diagnosticsHtml()}</main>`, this._bind();
	}
	_hero() {
		return `<section class="hero"><div><p class="eyebrow">Maintenance Dashboard</p><h1>Hauswartung & Technik</h1><p>Backend-gespeicherte Wartungsplanung mit Historie, Backups und Sidebar-Panel.</p></div><div class="hero-actions">${this._nav("dashboard", "mdi:view-dashboard", this._t("dashboard"))}${this._nav("templates", "mdi:shape-outline", this._t("templates"))}${this._nav("history", "mdi:history", this._t("history"))}${this._nav("settings", "mdi:cog", this._t("settings"))}</div></section>`;
	}
	_nav(e, t, n) {
		return `<button data-view="${e}" class="nav ${this._view === e ? "active" : ""}"><ha-icon icon="${t}"></ha-icon>${n}</button>`;
	}
	_viewHtml() {
		return this._view === "templates" ? this._templatesHtml() : this._view === "history" ? this._historyHtml() : this._view === "settings" ? this._settingsHtml() : this._dashboardHtml();
	}
	_dashboardHtml() {
		let e = this._state.summary || {}, t = this._filteredTasks(!1);
		return `
      <section class="kpis">
        ${this._kpi("mdi:heart-pulse", this._t("health"), `${e.health ?? 100}%`, this._t("healthHelp"))}
        ${this._kpi("mdi:clipboard-list-outline", this._t("active"), e.open ?? e.active ?? 0, `${e.ok ?? 0} ${this._t("ok")}`)}
        ${this._kpi("mdi:alert-circle", this._t("critical"), e.critical ?? 0)}
        ${this._kpi("mdi:alert-outline", this._t("warnings"), e.warning ?? 0)}
        ${this._kpi("mdi:calendar-clock", this._t("next"), e.next_task?.name || "—", e.next_task?.remaining == null ? "" : `${Math.ceil(e.next_task.remaining)} ${this._t("days")} ${this._t("remaining")}`)}
        ${this._kpi("mdi:check-decagram", this._t("completedThisYear"), e.completed_this_year ?? 0)}
        ${this._kpi("mdi:cloud-question", this._t("unavailable"), e.unavailable ?? 0, this._t("unavailableHelp"))}
      </section>
      <section class="toolbar expressive">
        <button data-action="create" class="primary big"><ha-icon icon="mdi:plus"></ha-icon>${this._t("add")}</button>
        <input id="search" class="search" placeholder="${this._t("search")}" value="${this._html(this._search)}">
        <label><span>${this._t("status")}</span><select id="statusFilter">${[
			"all",
			"ok",
			"warning",
			"critical",
			"overdue",
			"snoozed",
			"unavailable"
		].map((e) => `<option value="${e}" ${this._statusFilter === e ? "selected" : ""}>${this._t(e)}</option>`).join("")}</select></label>
        <label><span>${this._t("sort")}</span><select id="sortMode">${[
			"smart",
			"position",
			"priority",
			"due",
			"status"
		].map((e) => `<option value="${e}" ${this._sortMode === e ? "selected" : ""}>${this._t(`sort${e[0].toUpperCase()}${e.slice(1)}`)}</option>`).join("")}</select></label>
      </section>
      ${t.length ? `<section class="task-grid">${t.map((e) => this._taskCard(e)).join("")}</section>` : this._emptyHtml()}
    `;
	}
	_kpi(e, t, n, r = "") {
		return `<article class="kpi" title="${this._html(r)}"><ha-icon icon="${e}"></ha-icon><div><small>${this._html(t)}</small><strong>${this._html(n)}</strong>${r ? `<span>${this._html(r)}</span>` : ""}</div></article>`;
	}
	_taskCard(e) {
		let t = this._state.runtime[e.id] || {}, n = t.status || "unavailable", r = Math.min(100, Math.max(0, t.progress || 0)), i = e.card_color || e.icon_color || "var(--primary-color)", a = n === "snoozed", o = this._snoozeOptions(e);
		return `<article class="task-card ${n}" style="--task-accent:${this._html(i)}">
      <header>
        <div class="title-row"><span class="icon-chip" style="${e.icon_color ? `color:${this._html(e.icon_color)}` : ""}"><ha-icon icon="${this._html(e.icon || "mdi:wrench-clock")}"></ha-icon></span><div><h3>${this._html(e.name)}</h3><p>${this._categoryLabel(e)}${e.area_name ? ` · ${this._html(e.area_name)}` : ""}</p></div></div>
        <span class="status ${n}">${this._t(n)}</span>
      </header>
      ${e.description ? `<p class="description">${this._html(e.description)}</p>` : ""}
      <div class="progress-line"><span>${this._t("progress")}</span><strong>${Math.round(r)}%</strong></div>
      <div class="progress"><div style="width:${r}%"></div></div>
      <div class="meta-grid">
        <div><span>${this._t("lastDone")}</span><strong>${this._date(t.last_done)}</strong></div>
        <div><span>${this._t("due")}</span><strong>${this._date(t.due_at)}</strong></div>
        <div><span>${this._t("remaining")}</span><strong>${this._remaining(t, e)}</strong></div>
        <div><span>${this._t("priority")}</span><strong>${"●".repeat(Number(e.priority || 3))}<em>${e.priority}/5</em></strong></div>
      </div>
      ${a ? `<div class="snooze-note"><ha-icon icon="mdi:pause-circle-outline"></ha-icon>${this._t("pausedUntil")} ${this._datetime(e.snoozed_until)}</div>` : ""}
      <footer class="actions">
        <button class="ghost icon-only" title="${this._t("edit")}" data-edit="${e.id}"><ha-icon icon="mdi:pencil"></ha-icon></button>
        <div class="snooze-wrap"><button class="ghost icon-only" title="${this._t("snooze")}" data-snooze-menu="${e.id}"><ha-icon icon="mdi:clock-plus-outline"></ha-icon></button>${this._snoozeMenu === e.id ? `<div class="snooze-menu"><strong>${this._t("snoozeFor")}</strong>${o.map((t) => `<button data-snooze-days="${e.id}:${t}">${t} ${this._t("days")}</button>`).join("")}</div>` : ""}</div>
        ${a ? `<button class="ghost" data-clear-snooze="${e.id}"><ha-icon icon="mdi:play-circle-outline"></ha-icon>${this._t("clearSnooze")}</button>` : ""}
        <button class="primary" data-done="${e.id}"><ha-icon icon="mdi:check"></ha-icon>${this._t("done")}</button>
      </footer>
    </article>`;
	}
	_emptyHtml() {
		return `<section class="empty expressive-empty"><div class="empty-orb"><ha-icon icon="mdi:clipboard-plus-outline"></ha-icon></div><h2>${this._t("noTasks")}</h2><p>${this._t("materialEmpty")}</p><div class="empty-actions"><button class="primary big" data-action="create"><ha-icon icon="mdi:plus"></ha-icon>${this._t("addFirst")}</button><button class="ghost big" data-view="templates"><ha-icon icon="mdi:shape-plus-outline"></ha-icon>${this._t("templates")}</button></div></section>`;
	}
	_templatesHtml() {
		let e = (this._state.templates || []).filter((e) => this._matches(e)), t = e.filter((e) => this._selectedTemplates.has(e.id));
		return `<section class="toolbar expressive templates-toolbar"><div><h2>${this._t("templates")}</h2><p>${this._t("templateSelectHint")}</p></div><input id="search" class="search" placeholder="${this._t("search")}" value="${this._html(this._search)}"><button class="ghost" data-action="select-visible"><ha-icon icon="mdi:checkbox-multiple-marked-outline"></ha-icon>${this._t("selectAllVisible")}</button><button class="ghost" data-action="clear-template-selection"><ha-icon icon="mdi:checkbox-blank-off-outline"></ha-icon>${this._t("deselectAll")}</button><button class="primary big" data-action="add-selected" ${t.length ? "" : "disabled"}><ha-icon icon="mdi:plus-box-multiple-outline"></ha-icon>${this._t("addSelected")} · ${t.length}</button></section><section class="template-grid">${e.map((e) => this._templateCard(e)).join("")}</section>`;
	}
	_templateCard(e) {
		let t = this._selectedTemplates.has(e.id), n = (this._state.tasks || []).some((t) => !t.deleted && String(t.name).toLowerCase() === String(e.name).toLowerCase());
		return `<article class="template-card ${t ? "selected" : ""} ${n ? "exists" : ""}"><header><label class="template-check"><input type="checkbox" data-template-check="${e.id}" ${t ? "checked" : ""}><span></span></label><ha-icon icon="${this._html(e.icon)}"></ha-icon><h3>${this._html(e.name)}</h3></header><p>${this._html(e.description)}</p><small>${this._categoryLabel(e)} · ${e.interval} ${this._unitLabel(e.interval_unit)} · ${this._t("priority")} ${e.priority}/5</small><footer><button class="ghost" data-template="${e.id}" ${n ? "disabled" : ""}><ha-icon icon="mdi:plus"></ha-icon>${n ? this._t("ok") : this._t("add")}</button></footer></article>`;
	}
	_historyHtml() {
		return `<section class="panel"><h2>${this._t("history")}</h2><div class="history-list">${(this._state.history || []).map((e) => `<article class="history-row"><ha-icon icon="${e.type === "completed" ? "mdi:check-circle-outline" : "mdi:history"}"></ha-icon><div><strong>${this._html(e.task_name || e.task_id)}</strong><p>${this._html(e.summary)} · ${this._datetime(e.created_at)}</p>${e.details?.runtime_before ? `<small>${this._runtimeSummary(e.details.runtime_before)}</small>` : ""}</div>${e.type === "completed" && !e.undone_at ? `<button class="ghost" data-undo="${e.id}">${this._t("undo")}</button>` : ""}</article>`).join("")}</div></section>`;
	}
	_settingsHtml() {
		let e = this._filteredTasks(!0).sort((e, t) => (e.position ?? 0) - (t.position ?? 0));
		return `<section class="panel settings-head"><div><h2>${this._t("settings")}</h2><p>${this._t("dragHint")}</p></div><button class="ghost" data-action="diagnostics"><ha-icon icon="mdi:alert-circle-outline"></ha-icon>${this._t("diagnostics")}</button></section><section class="settings-list">${e.map((t, n) => `<article class="settings-row" draggable="true" data-drag="${t.id}" data-drop="${t.id}"><span class="drag"><ha-icon icon="mdi:drag"></ha-icon></span><ha-icon icon="${this._html(t.icon)}"></ha-icon><div><strong>${this._html(t.name)}</strong><small>${this._categoryLabel(t)} · ${t.interval} ${this._unitLabel(t.interval_unit)} · ${this._t("priority")} ${t.priority}/5</small></div><button class="icon" data-move="${t.id}:up" ${n === 0 ? "disabled" : ""}><ha-icon icon="mdi:chevron-up"></ha-icon></button><button class="icon" data-move="${t.id}:down" ${n === e.length - 1 ? "disabled" : ""}><ha-icon icon="mdi:chevron-down"></ha-icon></button><button class="icon" data-edit="${t.id}"><ha-icon icon="mdi:pencil"></ha-icon></button><button class="icon danger" data-delete="${t.id}"><ha-icon icon="mdi:delete-outline"></ha-icon></button></article>`).join("")}</section>`;
	}
	_dialogHtml() {
		if (!this._dialog) return "";
		let e = this._draft, n = this._areas();
		return `<div class="dialog-backdrop"><section class="dialog"><header><h2>${this._dialog === "edit" ? this._t("edit") : this._t("add")}</h2><button class="icon" data-action="close"><ha-icon icon="mdi:close"></ha-icon></button></header><div class="dialog-body">${this._dialog === "create" ? `<section class="dialog-section"><h3>${this._t("selectTemplate")}</h3><div class="template-strip">${(this._state.templates || []).slice(0, 12).map((e) => `<button class="template-pill" data-apply-template="${e.id}"><ha-icon icon="${this._html(e.icon)}"></ha-icon>${this._html(e.name)}</button>`).join("")}</div></section>` : ""}<section class="dialog-section"><h3>Basis</h3><div class="form-grid">${this._input("name", this._t("name"), "text")}<label class="field"><span>${this._t("category")}</span><select data-draft="category">${t.map((t) => `<option value="${t}" ${e.category === t ? "selected" : ""}>${this._t(t)}</option>`).join("")}</select></label>${e.category === "custom" ? this._input("custom_category", "Eigene Kategorie", "text") : ""}<label class="field"><span>Bereich</span><select data-draft="area_id"><option value="">—</option>${n.map((t) => `<option value="${t.area_id}" ${e.area_id === t.area_id ? "selected" : ""}>${this._html(t.name)}</option>`).join("")}</select></label></div><label class="entity-field"><span>${this._t("entity")}</span><ha-entity-picker id="entityPicker" allow-custom-entity></ha-entity-picker></label><label class="description-field"><span>${this._t("description")}</span><textarea data-draft="description">${this._html(e.description)}</textarea></label></section><section class="dialog-section"><h3>Intervall</h3><div class="form-grid"><label class="field"><span>Typ</span><select data-draft="type"><option value="time" ${e.type === "time" ? "selected" : ""}>${this._t("time")}</option><option value="meter" ${e.type === "meter" ? "selected" : ""}>${this._t("meter")}</option></select></label>${this._input("interval", this._t("interval"), "number")}<label class="field"><span>${this._t("intervalUnit")}</span><select data-draft="interval_unit">${[
			"days",
			"hours",
			"weeks",
			"months"
		].map((t) => `<option value="${t}" ${e.interval_unit === t ? "selected" : ""}>${this._t(t)}</option>`).join("")}</select></label>${this._input("last_done", this._t("lastDone"), "datetime-local")}</div><div class="form-grid">${this._input("warning_threshold", this._t("warning"), "number")}${this._input("critical_threshold", this._t("critical"), "number")}</div></section><section class="dialog-section"><h3>Darstellung</h3><div class="form-grid"><label class="field"><span>${this._t("icon")}</span><div id="iconHost"></div></label>${this._input("icon_color", this._t("iconColor"), "color")}${this._input("card_color", this._t("cardColor"), "color")}<label class="field priority"><span>${this._t("priority")}: ${e.priority}</span><input data-draft="priority" type="range" min="1" max="5" value="${this._html(e.priority)}"></label></div><label class="check"><input data-draft="enabled" type="checkbox" ${e.enabled ? "checked" : ""}>${this._t("enabled")}</label></section>${this._error ? `<div class="error">${this._html(this._error)}</div>` : ""}</div><footer><button class="ghost" data-action="close">${this._t("cancel")}</button><button class="primary" data-action="save" ${this._busy ? "disabled" : ""}>${this._t("save")}</button></footer></section></div>`;
	}
	_input(e, t, n) {
		return `<label class="field"><span>${t}</span><input data-draft="${e}" type="${n}" value="${this._html(this._draft[e] || "")}"></label>`;
	}
	_diagnosticsHtml() {
		return this._diagnostics ? `<div class="dialog-backdrop"><section class="dialog small"><header><h2>${this._t("diagnostics")}</h2><button class="icon" data-action="close-diagnostics"><ha-icon icon="mdi:close"></ha-icon></button></header><div class="dialog-body"><section class="dialog-section"><h3>${this._t("diagnostics")}</h3>${this._state.diagnostics.length ? this._state.diagnostics.map((e) => `<p class="${e.severity}">${e.task_id || "global"}: ${e.message}</p>`).join("") : `<p>${this._t("ok")}</p>`}</section><section class="dialog-section"><h3>${this._t("backups")}</h3>${this._state.backups.map((e) => `<div class="backup-row"><span>${this._datetime(e.created_at)} · ${this._html(e.reason)}</span><button class="ghost" data-restore="${e.id}">${this._t("restore")}</button></div>`).join("")}</section></div></section></div>` : "";
	}
	_bind() {
		this.shadowRoot.querySelectorAll("[data-view]").forEach((e) => e.addEventListener("click", () => {
			this._view = e.dataset.view, this._snoozeMenu = null, this._render();
		})), this.shadowRoot.querySelectorAll("[data-action='create']").forEach((e) => e.addEventListener("click", () => this._openCreate())), this.shadowRoot.querySelectorAll("[data-action='close']").forEach((e) => e.addEventListener("click", () => {
			this._dialog = null, this._error = "", this._render();
		})), this.shadowRoot.querySelectorAll("[data-action='save']").forEach((e) => e.addEventListener("click", () => this._save())), this.shadowRoot.querySelectorAll("[data-action='diagnostics']").forEach((e) => e.addEventListener("click", () => {
			this._diagnostics = !0, this._render();
		})), this.shadowRoot.querySelectorAll("[data-action='close-diagnostics']").forEach((e) => e.addEventListener("click", () => {
			this._diagnostics = !1, this._render();
		})), this.shadowRoot.querySelectorAll("[data-action='select-visible']").forEach((e) => e.addEventListener("click", () => {
			(this._state.templates || []).filter((e) => this._matches(e)).forEach((e) => this._selectedTemplates.add(e.id)), this._render();
		})), this.shadowRoot.querySelectorAll("[data-action='clear-template-selection']").forEach((e) => e.addEventListener("click", () => {
			this._selectedTemplates.clear(), this._render();
		})), this.shadowRoot.querySelectorAll("[data-action='add-selected']").forEach((e) => e.addEventListener("click", () => this._addSelectedTemplates()));
		let e = this.shadowRoot.getElementById("search");
		e && e.addEventListener("input", (e) => {
			this._search = e.target.value, this._render();
		});
		let t = this.shadowRoot.getElementById("statusFilter");
		t && t.addEventListener("change", (e) => {
			this._statusFilter = e.target.value, this._render();
		});
		let n = this.shadowRoot.getElementById("sortMode");
		n && n.addEventListener("change", (e) => {
			this._sortMode = e.target.value, this._render();
		}), this.shadowRoot.querySelectorAll("[data-edit]").forEach((e) => e.addEventListener("click", () => this._openEdit(e.dataset.edit))), this.shadowRoot.querySelectorAll("[data-done]").forEach((e) => e.addEventListener("click", () => this._markDone(e.dataset.done))), this.shadowRoot.querySelectorAll("[data-snooze-menu]").forEach((e) => e.addEventListener("click", () => {
			this._snoozeMenu = this._snoozeMenu === e.dataset.snoozeMenu ? null : e.dataset.snoozeMenu, this._render();
		})), this.shadowRoot.querySelectorAll("[data-snooze-days]").forEach((e) => e.addEventListener("click", () => {
			let [t, n] = e.dataset.snoozeDays.split(":");
			this._snooze(t, Number(n));
		})), this.shadowRoot.querySelectorAll("[data-clear-snooze]").forEach((e) => e.addEventListener("click", () => this._clearSnooze(e.dataset.clearSnooze))), this.shadowRoot.querySelectorAll("[data-delete]").forEach((e) => e.addEventListener("click", () => this._delete(e.dataset.delete))), this.shadowRoot.querySelectorAll("[data-undo]").forEach((e) => e.addEventListener("click", () => this._undo(e.dataset.undo))), this.shadowRoot.querySelectorAll("[data-restore]").forEach((e) => e.addEventListener("click", () => this._restoreBackup(e.dataset.restore))), this.shadowRoot.querySelectorAll("[data-template]").forEach((e) => e.addEventListener("click", () => this._openCreate(this._template(e.dataset.template)))), this.shadowRoot.querySelectorAll("[data-template-check]").forEach((e) => e.addEventListener("change", () => {
			e.checked ? this._selectedTemplates.add(e.dataset.templateCheck) : this._selectedTemplates.delete(e.dataset.templateCheck), this._render();
		})), this.shadowRoot.querySelectorAll("[data-apply-template]").forEach((e) => e.addEventListener("click", () => {
			this._applyTemplate(this._template(e.dataset.applyTemplate)), this._render();
		})), this.shadowRoot.querySelectorAll("[data-move]").forEach((e) => e.addEventListener("click", () => {
			let [t, n] = e.dataset.move.split(":");
			this._move(t, n === "up" ? -1 : 1);
		})), this.shadowRoot.querySelectorAll("[data-drag]").forEach((e) => {
			e.addEventListener("dragstart", () => this._dragTaskId = e.dataset.drag), e.addEventListener("dragover", (e) => e.preventDefault()), e.addEventListener("drop", () => this._dropOn(e.dataset.drop));
		}), this.shadowRoot.querySelectorAll("[data-draft]").forEach((e) => e.addEventListener("input", (e) => this._draftChange(e))), this.shadowRoot.querySelectorAll("select[data-draft]").forEach((e) => e.addEventListener("change", (e) => this._draftChange(e)));
		let r = this.shadowRoot.getElementById("entityPicker");
		r && (r.hass = this.hass, r.value = this._draft.entity_id, r.addEventListener("value-changed", (e) => {
			this._draft.entity_id = String(e.detail?.value || "");
		}));
		let i = this.shadowRoot.getElementById("iconHost");
		i && this._mountIconPicker(i);
	}
	_mountIconPicker(e) {
		if (customElements.get("ha-icon-picker")) {
			let t = document.createElement("ha-icon-picker");
			t.hass = this.hass, t.value = this._draft.icon, t.addEventListener("value-changed", (e) => {
				this._draft.icon = String(e.detail?.value || "mdi:wrench-clock");
			}), e.appendChild(t);
		} else e.innerHTML = `<input data-draft="icon" value="${this._html(this._draft.icon)}"><div class="icon-grid">${r.map((e) => `<button class="icon-choice" data-icon-choice="${e}"><ha-icon icon="${e}"></ha-icon></button>`).join("")}</div>`, e.querySelector("input").addEventListener("input", (e) => this._draft.icon = e.target.value), e.querySelectorAll("[data-icon-choice]").forEach((e) => e.addEventListener("click", () => {
			this._draft.icon = e.dataset.iconChoice, this._render();
		}));
	}
	_draftChange(e) {
		let t = e.target, n = t.dataset.draft;
		if (this._draft[n] = t.type === "checkbox" ? t.checked : t.value, n === "area_id") {
			let e = this._areas().find((e) => e.area_id === t.value);
			this._draft.area_name = e?.name || "";
		}
		n === "category" && this._render();
	}
	_openCreate(e) {
		this._draft = {
			...a,
			last_done: this._dateInput(/* @__PURE__ */ new Date())
		}, e && this._applyTemplate(e), this._dialog = "create", this._render();
	}
	_openEdit(e) {
		let t = this._state.tasks.find((t) => t.id === e);
		t && (this._draft = {
			id: t.id,
			name: t.name || "",
			type: t.type || "time",
			interval: String(t.interval || 90),
			interval_unit: t.interval_unit || "days",
			entity_id: t.entity_id || "",
			category: t.category || "general",
			custom_category: t.custom_category || "",
			area_id: t.area_id || "",
			area_name: t.area_name || "",
			priority: String(t.priority || 3),
			icon: t.icon || "mdi:wrench-clock",
			icon_color: t.icon_color || "",
			card_color: t.card_color || "",
			enabled: t.enabled !== !1,
			warning_threshold: String(t.warning_threshold ?? 70),
			critical_threshold: String(t.critical_threshold ?? 90),
			description: t.description || "",
			last_done: this._dateInput(t.last_done ? new Date(t.last_done) : /* @__PURE__ */ new Date())
		}, this._dialog = "edit", this._render());
	}
	_applyTemplate(e) {
		e && Object.assign(this._draft, {
			name: e.name || this._draft.name,
			type: e.type || "time",
			interval: String(e.interval || this._draft.interval),
			interval_unit: e.interval_unit || "days",
			category: e.category || "general",
			area_name: e.area_name || "",
			priority: String(e.priority || 3),
			icon: e.icon || "mdi:wrench-clock",
			description: e.description || ""
		});
	}
	async _save() {
		if (!this.hass) return;
		if (!this._draft.name.trim()) {
			this._error = "Name fehlt", this._render();
			return;
		}
		if (this._draft.category === "custom" && !this._draft.custom_category.trim()) {
			this._error = "Eigene Kategorie fehlt", this._render();
			return;
		}
		let e = this._draftToTask();
		try {
			this._busy = !0, this._dialog === "edit" && this._draft.id ? await this.hass.callWS({
				type: "maintenance_dashboard/update_task",
				task_id: this._draft.id,
				patch: e
			}) : await this.hass.callWS({
				type: "maintenance_dashboard/create_task",
				task: e
			}), this._dialog = null, await this._load();
		} catch (e) {
			this._error = String(e), this._render();
		} finally {
			this._busy = !1;
		}
	}
	_draftToTask() {
		let e = this._areas().find((e) => e.area_id === this._draft.area_id);
		return {
			name: this._draft.name.trim(),
			type: this._draft.type,
			interval: Number(this._draft.interval) || 1,
			interval_unit: this._draft.interval_unit,
			entity_id: this._draft.entity_id || void 0,
			category: this._draft.category,
			custom_category: this._draft.category === "custom" ? this._draft.custom_category.trim() : void 0,
			area_id: this._draft.area_id || void 0,
			area_name: e?.name || this._draft.area_name || void 0,
			priority: Number(this._draft.priority) || 3,
			icon: this._draft.icon || "mdi:wrench-clock",
			icon_color: this._draft.icon_color || void 0,
			card_color: this._draft.card_color || void 0,
			enabled: !!this._draft.enabled,
			warning_threshold: Number(this._draft.warning_threshold) || 70,
			critical_threshold: Number(this._draft.critical_threshold) || 90,
			description: this._draft.description || "",
			last_done: this._draft.last_done ? new Date(this._draft.last_done).toISOString() : void 0
		};
	}
	async _addSelectedTemplates() {
		if (!this.hass || !this._selectedTemplates.size) return;
		let e = (this._state.templates || []).filter((e) => this._selectedTemplates.has(e.id));
		for (let t of e) {
			let e = {
				...t,
				last_done: (/* @__PURE__ */ new Date()).toISOString()
			};
			delete e.id, await this.hass.callWS({
				type: "maintenance_dashboard/create_task",
				task: e
			});
		}
		this._selectedTemplates.clear(), await this._load(), this._view = "dashboard", this._render();
	}
	async _markDone(e) {
		await this.hass.callWS({
			type: "maintenance_dashboard/mark_done",
			task_id: e
		}), await this._load();
	}
	async _snooze(e, t) {
		this._snoozeMenu = null, await this.hass.callWS({
			type: "maintenance_dashboard/snooze",
			task_id: e,
			days: t
		}), await this._load();
	}
	async _clearSnooze(e) {
		await this.hass.callWS({
			type: "maintenance_dashboard/clear_snooze",
			task_id: e
		}), await this._load();
	}
	async _undo(e) {
		await this.hass.callWS({
			type: "maintenance_dashboard/undo_completion",
			event_id: e
		}), await this._load();
	}
	async _delete(e) {
		await this.hass.callWS({
			type: "maintenance_dashboard/delete_task",
			task_id: e
		}), await this._load();
	}
	async _restoreBackup(e) {
		await this.hass.callWS({
			type: "maintenance_dashboard/restore_backup",
			backup_id: e
		}), await this._load();
	}
	async _move(e, t) {
		let n = this._filteredTasks(!0).sort((e, t) => (e.position ?? 0) - (t.position ?? 0)), r = n.findIndex((t) => t.id === e), i = r + t;
		if (r < 0 || i < 0 || i >= n.length) return;
		let [a] = n.splice(r, 1);
		n.splice(i, 0, a), await this.hass.callWS({
			type: "maintenance_dashboard/reorder",
			ordered_ids: n.map((e) => e.id)
		}), await this._load();
	}
	async _dropOn(e) {
		if (!this._dragTaskId || this._dragTaskId === e) return;
		let t = this._filteredTasks(!0).sort((e, t) => (e.position ?? 0) - (t.position ?? 0)), n = t.findIndex((e) => e.id === this._dragTaskId), r = t.findIndex((t) => t.id === e);
		if (n < 0 || r < 0) return;
		let [i] = t.splice(n, 1);
		t.splice(r, 0, i), this._dragTaskId = null, await this.hass.callWS({
			type: "maintenance_dashboard/reorder",
			ordered_ids: t.map((e) => e.id)
		}), await this._load();
	}
	_filteredTasks(e) {
		return (this._state?.tasks || []).filter((t) => e || !t.deleted).filter((e) => this._matches(e)).filter((e) => this._statusFilter === "all" || this._state?.runtime[e.id]?.status === this._statusFilter).sort((e, t) => this._compareTasks(e, t));
	}
	_compareTasks(e, t) {
		let r = this._state?.runtime[e.id] || {}, i = this._state?.runtime[t.id] || {};
		return this._sortMode === "position" ? (e.position ?? 0) - (t.position ?? 0) : this._sortMode === "priority" ? (t.priority ?? 0) - (e.priority ?? 0) || this._dueValue(r) - this._dueValue(i) : this._sortMode === "due" ? this._dueValue(r) - this._dueValue(i) : this._sortMode === "status" ? (n[r.status] ?? 99) - (n[i.status] ?? 99) || (t.priority ?? 0) - (e.priority ?? 0) : (n[r.status] ?? 99) - (n[i.status] ?? 99) || (t.priority ?? 0) - (e.priority ?? 0) || this._dueValue(r) - this._dueValue(i) || (e.position ?? 0) - (t.position ?? 0);
	}
	_dueValue(e) {
		return e?.due_at ? new Date(e.due_at).getTime() : 2 ** 53 - 1;
	}
	_matches(e) {
		let t = this._search.trim().toLowerCase();
		return t ? [
			e.name,
			e.description,
			e.area_name,
			e.category,
			e.custom_category
		].filter(Boolean).join(" ").toLowerCase().includes(t) : !0;
	}
	_snoozeOptions(e) {
		let t = this._intervalAsDays(e);
		return t <= 30 ? [
			1,
			3,
			7
		] : t <= 90 ? [
			1,
			3,
			7,
			14
		] : [
			1,
			3,
			7,
			14,
			30
		];
	}
	_intervalAsDays(e) {
		let t = Number(e.interval) || 1, n = e.interval_unit || "days";
		return n === "hours" ? Math.max(1, Math.ceil(t / 24)) : n === "weeks" ? t * 7 : n === "months" ? t * 30 : t;
	}
	_template(e) {
		return (this._state.templates || []).find((t) => t.id === e);
	}
	_areas() {
		let e = this.hass?.areas;
		return e ? Array.isArray(e) ? e : Object.values(e) : [];
	}
	_categoryLabel(e) {
		return e.category === "custom" ? this._html(e.custom_category || this._t("custom")) : this._t(e.category || "general");
	}
	_unitLabel(e) {
		return this._t(e || "days");
	}
	_date(e) {
		return e ? new Intl.DateTimeFormat(this._lang() === "de" ? "de-DE" : "en-US", { dateStyle: "medium" }).format(new Date(e)) : "—";
	}
	_datetime(e) {
		return e ? new Intl.DateTimeFormat(this._lang() === "de" ? "de-DE" : "en-US", {
			dateStyle: "medium",
			timeStyle: "short"
		}).format(new Date(e)) : "—";
	}
	_dateInput(e) {
		return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}T${String(e.getHours()).padStart(2, "0")}:${String(e.getMinutes()).padStart(2, "0")}`;
	}
	_remaining(e, t) {
		return !e || e.remaining == null ? "—" : `${Math.ceil(Math.abs(e.remaining))} ${this._unitLabel(t.interval_unit)} ${e.remaining < 0 ? this._t("overdue") : this._t("remaining")}`;
	}
	_runtimeSummary(e) {
		return `${this._t("progress")}: ${Math.round(e.progress || 0)}%, ${this._t("remaining")}: ${e.remaining ?? "—"}`;
	}
	_styles() {
		return "<style>\n    :host{display:block;min-height:100vh;background:var(--primary-background-color);color:var(--primary-text-color);}\n    .shell{min-height:100vh;box-sizing:border-box;padding:24px 32px;max-width:1880px;margin:0 auto;}\n    .hero{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:18px 4px 22px;border-bottom:1px solid var(--divider-color);margin-bottom:18px;}\n    .eyebrow{margin:0 0 6px;color:var(--primary-color);font-weight:850;letter-spacing:.08em;text-transform:uppercase;font-size:.72rem;} h1{margin:0;font-size:clamp(1.5rem,3vw,2.6rem);letter-spacing:-.045em;} h2,h3{margin:0;} p{margin:0;color:var(--secondary-text-color);} button,input,select,textarea{font:inherit;} button{cursor:pointer;transition:transform .1s ease,background .15s ease,border-color .15s ease;} button:active{transform:scale(.97);} button[disabled]{opacity:.45;pointer-events:none;}\n    .hero-actions,.empty-actions,footer,.actions{display:flex;gap:10px;flex-wrap:wrap;align-items:center;}.nav,.ghost,.primary,.icon{display:inline-flex;align-items:center;justify-content:center;gap:8px;border-radius:999px;border:1px solid var(--divider-color);min-height:40px;padding:0 16px;background:color-mix(in srgb,var(--card-background-color) 92%,transparent);color:var(--primary-text-color);} .nav.active,.ghost:hover{background:color-mix(in srgb,var(--primary-color) 18%,transparent);border-color:color-mix(in srgb,var(--primary-color) 55%,var(--divider-color));}.primary{border:0;background:var(--primary-color);color:var(--text-primary-color);font-weight:850;}.big{min-height:48px;padding:0 22px;}.icon,.icon-only{width:40px;min-width:40px;padding:0;color:var(--secondary-text-color);}.danger{color:var(--error-color);}\n    .kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:14px;margin-bottom:18px;}.kpi,.panel,.toolbar,.task-card,.empty,.template-card,.settings-row{border:1px solid var(--divider-color);border-radius:24px;background:var(--card-background-color);box-shadow:var(--ha-card-box-shadow);}.kpi{display:flex;gap:13px;align-items:center;min-height:86px;padding:16px;overflow:hidden;}.kpi ha-icon{padding:12px;border-radius:16px;background:color-mix(in srgb,var(--primary-color) 16%,transparent);color:var(--primary-color);flex:0 0 auto;}.kpi small{color:var(--secondary-text-color);text-transform:uppercase;font-size:.72rem;font-weight:900;}.kpi strong{display:block;font-size:1.25rem;margin-top:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}.kpi span{display:block;color:var(--secondary-text-color);font-size:.76rem;margin-top:2px;line-height:1.25;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}\n    .toolbar{display:flex;justify-content:flex-end;align-items:end;gap:12px;padding:16px;margin-bottom:18px;}.toolbar label{display:grid;gap:5px;color:var(--secondary-text-color);font-size:.75rem;font-weight:850;}.templates-toolbar{justify-content:space-between;align-items:center;}.expressive{background:radial-gradient(circle at 15% 0%,color-mix(in srgb,var(--primary-color) 16%,transparent),transparent 35%),var(--card-background-color);}.search,select,input,textarea{background:var(--input-fill-color,color-mix(in srgb,var(--primary-text-color) 7%,transparent));color:var(--primary-text-color);border:1px solid var(--divider-color);border-radius:14px;min-height:42px;padding:0 12px;outline:none;}.search{min-width:min(340px,100%);}textarea{min-height:90px;padding:12px;resize:vertical;}\n    .task-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,380px),1fr));gap:18px;align-items:stretch;}.task-card{--task-accent:var(--primary-color);position:relative;padding:18px;display:grid;grid-template-rows:auto auto auto auto 1fr auto;gap:14px;min-width:0;border-color:color-mix(in srgb,var(--task-accent) 34%,var(--divider-color));background:linear-gradient(135deg,color-mix(in srgb,var(--task-accent) 8%,transparent),transparent 42%),var(--card-background-color);overflow:visible;}.task-card header{display:flex;justify-content:space-between;gap:12px;align-items:flex-start;}.title-row{display:flex;gap:12px;align-items:flex-start;min-width:0;}.title-row h3{overflow-wrap:anywhere;line-height:1.25;}.icon-chip{display:grid;place-items:center;width:42px;height:42px;border-radius:16px;background:color-mix(in srgb,var(--task-accent) 15%,transparent);color:var(--task-accent);flex:0 0 auto;}.status{border-radius:999px;padding:5px 9px;font-weight:850;font-size:.72rem;background:color-mix(in srgb,var(--primary-text-color) 8%,transparent);white-space:nowrap;}.status.warning{color:var(--warning-color);background:color-mix(in srgb,var(--warning-color) 15%,transparent);}.status.critical,.status.overdue{color:var(--error-color);background:color-mix(in srgb,var(--error-color) 15%,transparent);}.status.snoozed{color:var(--primary-color);background:color-mix(in srgb,var(--primary-color) 15%,transparent);}.description{line-height:1.45;min-height:2.7em;}.progress-line{display:flex;justify-content:space-between;color:var(--secondary-text-color);}.progress{height:12px;background:color-mix(in srgb,var(--disabled-text-color) 16%,transparent);border-radius:999px;overflow:hidden;}.progress div{height:100%;background:var(--task-accent);border-radius:999px;}.meta-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;}.meta-grid div{background:color-mix(in srgb,var(--primary-text-color) 4%,transparent);border-radius:16px;padding:10px;min-width:0;}.meta-grid span{display:block;color:var(--secondary-text-color);font-size:.70rem;font-weight:850;text-transform:uppercase;}.meta-grid strong{display:block;margin-top:4px;overflow:hidden;text-overflow:ellipsis;}.meta-grid em{font-style:normal;color:var(--secondary-text-color);font-size:.8rem;margin-left:6px;}.snooze-note{display:flex;align-items:center;gap:7px;padding:9px 11px;border-radius:14px;background:color-mix(in srgb,var(--primary-color) 12%,transparent);color:var(--primary-color);font-weight:850;}.snooze-wrap{position:relative;}.snooze-menu{position:absolute;right:0;bottom:48px;z-index:20;display:grid;gap:6px;min-width:170px;padding:10px;border:1px solid var(--divider-color);border-radius:18px;background:var(--card-background-color);box-shadow:0 16px 40px rgb(0 0 0 / 35%);}.snooze-menu strong{font-size:.8rem;color:var(--secondary-text-color);}.snooze-menu button{border:0;border-radius:12px;min-height:34px;background:color-mix(in srgb,var(--primary-text-color) 6%,transparent);color:var(--primary-text-color);}\n    .empty{min-height:330px;display:grid;place-items:center;text-align:center;padding:34px;gap:14px;}.empty-orb{display:grid;place-items:center;width:90px;height:90px;border-radius:32px;color:var(--primary-color);background:radial-gradient(circle,color-mix(in srgb,var(--primary-color) 28%,transparent),color-mix(in srgb,var(--primary-color) 8%,transparent));}.empty-orb ha-icon{--mdc-icon-size:46px;}.template-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr));gap:16px;}.template-card{padding:16px;display:grid;gap:12px;}.template-card.selected{border-color:color-mix(in srgb,var(--primary-color) 60%,var(--divider-color));background:linear-gradient(135deg,color-mix(in srgb,var(--primary-color) 10%,transparent),transparent 50%),var(--card-background-color);}.template-card header{display:flex;align-items:center;gap:10px;}.template-card h3{line-height:1.25;}.template-check input{display:none;}.template-check span{display:grid;width:22px;height:22px;border-radius:7px;border:1px solid var(--divider-color);background:color-mix(in srgb,var(--primary-text-color) 4%,transparent);}.template-check input:checked + span{background:var(--primary-color);border-color:var(--primary-color);}.template-check input:checked + span:after{content:'✓';color:var(--text-primary-color);font-weight:900;text-align:center;line-height:21px;}.panel{padding:18px;margin-bottom:16px;}.history-list,.settings-list{display:grid;gap:10px;}.history-row,.settings-row{display:flex;align-items:center;gap:12px;padding:13px;}.history-row div,.settings-row div{flex:1;}.history-row small,.settings-row small{display:block;color:var(--secondary-text-color);margin-top:3px;}.settings-head{display:flex;align-items:center;justify-content:space-between;gap:14px;}.drag{color:var(--secondary-text-color);cursor:grab;}\n    .dialog-backdrop{position:fixed;inset:0;z-index:2147483000;display:grid;place-items:center;padding:24px;background:rgb(3 5 14 / 94%);}.dialog{width:min(1060px,100%);max-height:90vh;overflow:auto;border-radius:28px;background:var(--card-background-color);border:1px solid var(--divider-color);box-shadow:0 28px 90px rgb(0 0 0 / 48%);}.dialog.small{width:min(760px,100%);}.dialog>header,.dialog>footer{padding:18px 22px;border-bottom:1px solid var(--divider-color);display:flex;justify-content:space-between;align-items:center;}.dialog>footer{border-top:1px solid var(--divider-color);border-bottom:0;justify-content:flex-end;}.dialog-body{display:grid;gap:16px;padding:18px;}.dialog-section{display:grid;gap:14px;padding:16px;border:1px solid var(--divider-color);border-radius:20px;background:color-mix(in srgb,var(--primary-text-color) 2%,transparent);}.form-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:14px;}.field,.entity-field,.description-field{display:grid;gap:7px;color:var(--secondary-text-color);font-size:.78rem;font-weight:850;}.field input[type=color]{padding:4px;}.priority input{width:100%;}.check{display:flex;gap:10px;align-items:center;font-weight:850;}.template-strip,.icon-grid{display:flex;flex-wrap:wrap;gap:8px;}.template-pill,.icon-choice{border:1px solid var(--divider-color);border-radius:999px;min-height:36px;padding:0 12px;background:transparent;color:var(--primary-text-color);display:inline-flex;gap:7px;align-items:center;}.icon-choice{width:42px;padding:0;justify-content:center;}.error{color:var(--error-color);font-weight:850;padding:12px;border-radius:14px;background:color-mix(in srgb,var(--error-color) 12%,transparent);}.backup-row{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px;border:1px solid var(--divider-color);border-radius:14px;}\n    @media (max-width:760px){.shell{padding:12px}.hero,.settings-head,.toolbar,.templates-toolbar{flex-direction:column;align-items:stretch}.hero-actions,.empty-actions,footer,.actions{flex-direction:column;align-items:stretch}.task-grid,.template-grid{grid-template-columns:1fr}.dialog-backdrop{padding:8px}.snooze-menu{left:0;right:auto}}\n  </style>";
	}
};
customElements.get("maintenance-dashboard-panel") || customElements.define("maintenance-dashboard-panel", o), console.info(`%cmaintenance-dashboard-panel%c v${e}`, "color: var(--primary-color); font-weight: 800;", "color: inherit;");
//#endregion
