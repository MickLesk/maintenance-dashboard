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

  _filteredTasks(includeDeleted) {
    return (this._state?.tasks || [])
      .filter(task => includeDeleted || !task.deleted)
      .filter(task => {
        const status = this._state?.runtime?.[task.id]?.status;
        if (!includeDeleted && status === "completed" && !this._showCompleted && this._statusFilter !== "completed") return false;
        return true;
      })
      .filter(task => this._matches(task))
      .filter(task => this._statusFilter === "all" || this._state?.runtime?.[task.id]?.status === this._statusFilter)
      .filter(task => this._categoryFilter === "all" || task.category === this._categoryFilter)
      .filter(task => this._areaFilter === "all" || (task.area_id || task.area_name || "") === this._areaFilter)
      .filter(task => this._priorityFilter === "all" || Number(task.priority) === Number(this._priorityFilter))
      .filter(task => this._scheduleFilter === "all" || task.schedule_mode === this._scheduleFilter)
      .filter(task => this._matchesDueFilter(task))
      .filter(task => !this._tagFilter.trim() || (task.tags || []).some(tag => String(tag).toLowerCase().includes(this._tagFilter.trim().toLowerCase())))
      .filter(task => this._entityFilter === "all" || (this._entityFilter === "available" ? Boolean(task.entity_id && this.hass?.states?.[task.entity_id]) : !task.entity_id || !this.hass?.states?.[task.entity_id]))
      .sort((a, b) => this._compareTasks(a, b));
  },

  _compareTasks(a, b) { const ar = this._state?.runtime[a.id] || {}; const br = this._state?.runtime[b.id] || {}; if (this._sortMode === "position") return (a.position ?? 0) - (b.position ?? 0); if (this._sortMode === "priority") return (b.priority ?? 0) - (a.priority ?? 0) || this._dueValue(ar) - this._dueValue(br); if (this._sortMode === "due") return this._dueValue(ar) - this._dueValue(br); if (this._sortMode === "status") return (STATUS_ORDER[ar.status] ?? 99) - (STATUS_ORDER[br.status] ?? 99) || (b.priority ?? 0) - (a.priority ?? 0); return (STATUS_ORDER[ar.status] ?? 99) - (STATUS_ORDER[br.status] ?? 99) || (b.priority ?? 0) - (a.priority ?? 0) || this._dueValue(ar) - this._dueValue(br) || (a.position ?? 0) - (b.position ?? 0); },

  _dueValue(runtime) { return runtime?.due_at ? new Date(runtime.due_at).getTime() : Number.MAX_SAFE_INTEGER; },

  _matches(task) {
    const q = this._search.trim().toLowerCase();
    if (!q) return true;
    return [task.name, task.description, task.area_name, task.category, task.custom_category, ...(task.tags || [])]
      .filter(Boolean).join(" ").toLowerCase().includes(q);
  },

  _snoozeOptions(task) { const days = this._intervalAsDays(task); if (days <= 30) return [1, 3, 7]; if (days <= 90) return [1, 3, 7, 14]; return [1, 3, 7, 14, 30]; },

  _intervalAsDays(task) { const n = Number(task.interval) || 1; const u = task.interval_unit || "days"; if (u === "hours") return Math.max(1, Math.ceil(n / 24)); if (u === "weeks") return n * 7; if (u === "months") return n * 30; return n; },

  _template(id) { return (this._state.templates || []).find(t => t.id === id); },

  _areas() { const raw = this.hass?.areas; if (!raw) return []; return Array.isArray(raw) ? raw : Object.values(raw); },

  _categoryLabel(task) { return task.category === "custom" ? this._html(task.custom_category || this._t("custom")) : this._t(task.category || "general"); },

  _unitLabel(unit) { return this._t(unit || "days"); },

  _date(value) { if (!value) return "—"; return new Intl.DateTimeFormat(this._lang() === "de" ? "de-DE" : "en-US", { dateStyle: "medium" }).format(new Date(value)); },

  _datetime(value) { if (!value) return "—"; return new Intl.DateTimeFormat(this._lang() === "de" ? "de-DE" : "en-US", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value)); },

  _dateInput(date) { return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}T${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`; },

  _remaining(runtime, task) { if (!runtime || runtime.remaining == null) return "—"; const unit = task.schedule_mode && task.schedule_mode !== "interval" ? "days" : task.interval_unit; return `${Math.ceil(Math.abs(runtime.remaining))} ${this._unitLabel(unit)} ${runtime.remaining < 0 ? this._t("overdue") : this._t("remaining")}`; },

  _runtimeSummary(runtime) { return `${this._t("progress")}: ${Math.round(runtime.progress || 0)}%, ${this._t("remaining")}: ${runtime.remaining ?? "—"}`; },

  _scheduleSummary(task) {
    const mode = task?.schedule_mode || "interval";
    if (mode === "one_time") return `${this._t("oneTime")} · ${this._date(task.due_date)}`;
    if (mode === "fixed_date") {
      if (task.calendar_repeat === "monthly") return `${this._t("monthly")} · ${this._t("fixedDay")} ${task.fixed_day || 1}`;
      return `${this._t("yearly")} · ${String(task.fixed_day || 1).padStart(2,"0")}.${String(task.fixed_month || 1).padStart(2,"0")}.`;
    }
    if (mode === "seasonal") return `${this._t("seasonal")} · ${this._t(task.season || "autumn")}`;
    return `${task.interval} ${this._unitLabel(task.interval_unit)}`;
  },

  _matchesDueFilter(task) {
    if (this._dueFilter === "all") return true;
    const dueAt = this._state?.runtime?.[task.id]?.due_at;
    if (!dueAt) return false;
    const due = new Date(dueAt);
    const now = new Date();
    const endToday = new Date(now); endToday.setHours(23, 59, 59, 999);
    const endWeek = new Date(endToday); endWeek.setDate(endWeek.getDate() + 7);
    const endMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
    if (this._dueFilter === "overdue") return due < now;
    if (this._dueFilter === "today") return due >= new Date(now.getFullYear(), now.getMonth(), now.getDate()) && due <= endToday;
    if (this._dueFilter === "week") return due > endToday && due <= endWeek;
    if (this._dueFilter === "month") return due > endWeek && due <= endMonth;
    if (this._dueFilter === "later") return due > endMonth;
    return true;
  },

  _currentFilterPayload() {
    return {
      search: this._search,
      status: this._statusFilter,
      category: this._categoryFilter,
      area: this._areaFilter,
      priority: this._priorityFilter,
      schedule: this._scheduleFilter,
      due: this._dueFilter,
      tag: this._tagFilter,
      entity: this._entityFilter,
      sort: this._sortMode,
      show_completed: this._showCompleted,
    };
  },

  _applyFilterPayload(filter = {}) {
    this._search = filter.search || "";
    this._statusFilter = filter.status || "all";
    this._categoryFilter = filter.category || "all";
    this._areaFilter = filter.area || "all";
    this._priorityFilter = filter.priority || "all";
    this._scheduleFilter = filter.schedule || "all";
    this._dueFilter = filter.due || "all";
    this._tagFilter = filter.tag || "";
    this._entityFilter = filter.entity || "all";
    this._sortMode = filter.sort || "smart";
    this._showCompleted = Boolean(filter.show_completed);
  },

  _dashboardWidgetEnabled(key) {
    const widgets = this._state?.settings?.dashboard?.widgets || [];
    return widgets.includes(key);
  },

  _selectedTaskList() {
    return [...this._selectedTasks].filter(id => (this._state?.tasks || []).some(task => task.id === id));
  },

});
