// Draft state conversion and task focus helpers.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _draftChange(e) {
    const el = e.target;
    const key = el.dataset.draft;
    this._draft[key] = el.type === "checkbox" ? el.checked : el.value;
    if (key === "area_id") {
      const area = this._areas().find(x => x.area_id === el.value);
      this._draft.area_name = area?.name || "";
    }
    if (key === "type" && el.value === "meter") this._draft.schedule_mode = "interval";
    if (key === "season") {
      this._draft.fixed_month = String({ spring: 3, summer: 6, autumn: 9, winter: 12 }[el.value] || 9);
    }
    if (["category", "type", "schedule_mode", "calendar_repeat", "season", "priority"].includes(key)) this._render();
  },

  _openCreate(template) {
    this._draft = { ...EMPTY, last_done: this._dateInput(new Date()) };
    if (template) this._applyTemplate(template);
    this._dialog = "create";
    this._render();
  },

  _openEdit(id) {
    const t = this._state.tasks.find(x => x.id === id);
    if (!t) return;
    this._draft = {
      id: t.id,
      name: t.name || "",
      type: t.type || "time",
      schedule_mode: t.schedule_mode || "interval",
      calendar_repeat: t.calendar_repeat || "yearly",
      due_date: t.due_date ? this._dateInput(new Date(t.due_date)) : "",
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
      enabled: t.enabled !== false,
      warning_threshold: String(t.warning_threshold ?? 70),
      critical_threshold: String(t.critical_threshold ?? 90),
      description: t.description || "",
      fixed_month: String(t.fixed_month || 9),
      fixed_day: String(t.fixed_day || 1),
      season: t.season || "autumn",
      tags: Array.isArray(t.tags) ? t.tags : [],
      last_done: t.last_done ? this._dateInput(new Date(t.last_done)) : "",
    };
    this._dialog = "edit";
    this._render();
  },

  _applyTemplate(t) {
    if (!t) return;
    const seasonMonth = { spring: 3, summer: 6, autumn: 9, winter: 12 }[t.season] || t.fixed_month || 9;
    Object.assign(this._draft, {
      name: t.name || this._draft.name,
      type: t.type || "time",
      schedule_mode: t.schedule_mode || "interval",
      calendar_repeat: t.calendar_repeat || "yearly",
      due_date: t.due_date || "",
      interval: String(t.interval || this._draft.interval),
      interval_unit: t.interval_unit || "days",
      category: t.category || "general",
      area_name: t.area_name || "",
      priority: String(t.priority || 3),
      icon: t.icon || "mdi:wrench-clock",
      description: t.description || "",
      fixed_month: String(seasonMonth),
      fixed_day: String(t.fixed_day || 1),
      season: t.season || "autumn",
      tags: Array.isArray(t.tags) ? [...t.tags] : [],
      template_id: t.id,
    });
  },

  _draftToTask() {
    const area = this._areas().find(a => a.area_id === this._draft.area_id);
    const parseDate = value => value ? new Date(value).toISOString() : undefined;
    return {
      name: this._draft.name.trim(),
      type: this._draft.type,
      schedule_mode: this._draft.schedule_mode || "interval",
      calendar_repeat: this._draft.calendar_repeat || "yearly",
      due_date: this._draft.schedule_mode === "one_time" ? parseDate(this._draft.due_date) : undefined,
      interval: Number(this._draft.interval) || 1,
      interval_unit: this._draft.interval_unit,
      entity_id: this._draft.entity_id || undefined,
      category: this._draft.category,
      custom_category: this._draft.category === "custom" ? this._draft.custom_category.trim() : undefined,
      area_id: this._draft.area_id || undefined,
      area_name: area?.name || this._draft.area_name || undefined,
      priority: Number(this._draft.priority) || 3,
      icon: this._draft.icon || "mdi:wrench-clock",
      icon_color: this._draft.icon_color || undefined,
      card_color: this._draft.card_color || undefined,
      enabled: Boolean(this._draft.enabled),
      warning_threshold: Number(this._draft.warning_threshold) || 70,
      critical_threshold: Number(this._draft.critical_threshold) || 90,
      description: this._draft.description || "",
      fixed_month: Number(this._draft.fixed_month) || 1,
      fixed_day: Number(this._draft.fixed_day) || 1,
      season: this._draft.schedule_mode === "seasonal" ? this._draft.season || "autumn" : undefined,
      tags: Array.isArray(this._draft.tags) ? this._draft.tags : String(this._draft.tags || "").split(",").map(x => x.trim()).filter(Boolean),
      template_id: this._draft.template_id || undefined,
      last_done: this._draft.last_done ? parseDate(this._draft.last_done) : undefined,
    };
  },

  _focusTask(id) {
    if (!id) return;
    this._view = "dashboard";
    this._statusFilter = "all";
    this._showCompleted = true;
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

  _openCompletion(id) {
    this._completionDialog = id;
    this._completionNote = "";
    this._completionMaterial = "";
    this._completionCost = "";
    this._completionCurrency = "EUR";
    this._completionPerformedBy = "";
    this._render();
  }
});
