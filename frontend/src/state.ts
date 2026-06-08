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
