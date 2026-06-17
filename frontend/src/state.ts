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
    if (key === "recurrence_mode") {
      this._draft.workflow_state = this._workflowStartState(el.value || "standard");
    }
    if (["category", "type", "schedule_mode", "calendar_repeat", "season", "priority", "notifications_inherit", "recurrence_mode"].includes(key)) this._render();
  },

  _workflowSettings() {
    return this._state?.settings?.workflow || {};
  },

  _defaultWorkflowState() {
    const state = this._workflowSettings().default_state || "planned";
    return ["planned", "ready", "in_progress", "blocked"].includes(state) ? state : "planned";
  },

  _defaultRecurrenceMode() {
    const value = this._workflowSettings().default_recurrence_mode || "standard";
    return ["standard", "persistent"].includes(value) ? value : "standard";
  },

  _persistentWorkflowState() {
    const value = this._workflowSettings().persistent_default_state || "ready";
    return ["planned", "ready", "in_progress", "blocked"].includes(value) ? value : "ready";
  },

  _workflowStartState(recurrenceMode = "standard") {
    return recurrenceMode === "persistent" ? this._persistentWorkflowState() : this._defaultWorkflowState();
  },

  _defaultCompletionRequirements() {
    const defaults = this._workflowSettings().default_completion_requirements || {};
    return {
      note: Boolean(defaults.note),
      material: Boolean(defaults.material),
      cost: Boolean(defaults.cost),
      performed_by: Boolean(defaults.performed_by),
      checklist: Boolean(defaults.checklist),
    };
  },

  _draftChecklist() {
    if (!Array.isArray(this._draft.checklist)) this._draft.checklist = [];
    return this._draft.checklist;
  },

  _addDraftChecklistItem() {
    this._draftChecklist().push({
      id: `check_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`,
      label: "",
      done: false,
      required: false,
    });
    this._render();
  },

  _updateDraftChecklistItem(index, key, value) {
    const item = this._draftChecklist()[index];
    if (!item) return;
    item[key] = key === "label" ? value : Boolean(value);
    this._render();
  },

  _removeDraftChecklistItem(index) {
    this._draftChecklist().splice(index, 1);
    this._render();
  },

  _completionRequirementsFromTask(task) {
    const defaults = this._defaultCompletionRequirements();
    const requirements = task?.completion_requirements || {};
    return {
      note: Boolean(requirements.note ?? defaults.note),
      material: Boolean(requirements.material ?? defaults.material),
      cost: Boolean(requirements.cost ?? defaults.cost),
      performed_by: Boolean(requirements.performed_by ?? defaults.performed_by),
      checklist: Boolean(requirements.checklist ?? defaults.checklist),
    };
  },

  _workflowStateLabel(state) {
    return this._t(`workflow_${state || "planned"}`);
  },

  _workflowTransitionLabel(state) {
    return this._t(`workflowSet_${state || "planned"}`);
  },

  _checklistProgress(taskOrChecklist) {
    const checklist = Array.isArray(taskOrChecklist) ? taskOrChecklist : taskOrChecklist?.checklist;
    const items = Array.isArray(checklist) ? checklist : [];
    const total = items.length;
    const done = items.filter(item => item?.done).length;
    return { total, done, pending: Math.max(total - done, 0) };
  },

  _completionMissing(task) {
    const requirements = this._completionRequirementsFromTask(task);
    const missing = [];
    if (requirements.note && !String(this._completionNote || "").trim()) missing.push("completionRequirementNote");
    if (requirements.material && !String(this._completionMaterial || "").trim()) missing.push("completionRequirementMaterial");
    if (requirements.cost && this._completionCost === "") missing.push("completionRequirementCost");
    if (requirements.performed_by && !String(this._completionPerformedBy || "").trim()) missing.push("completionRequirementPerformedBy");
    if (requirements.checklist) {
      const requiredOnly = this._completionChecklist.filter(item => item.required);
      const targets = requiredOnly.length ? requiredOnly : this._completionChecklist;
      if (targets.some(item => !item.done)) missing.push("completionRequirementChecklist");
    }
    return missing;
  },

  _updateCompletionChecklist(index, checked) {
    const item = this._completionChecklist[index];
    if (!item) return;
    item.done = Boolean(checked);
    this._render();
  },

  _openCreate(template) {
    const defaults = this._defaultCompletionRequirements();
    this._dialogStep = 0;
    this._templateDraftId = template?.id || "";
    this._draft = {
      ...EMPTY,
      recurrence_mode: this._defaultRecurrenceMode(),
      workflow_state: this._workflowStartState(this._defaultRecurrenceMode()),
      completion_requirements_note: defaults.note,
      completion_requirements_material: defaults.material,
      completion_requirements_cost: defaults.cost,
      completion_requirements_performed_by: defaults.performed_by,
      completion_requirements_checklist: defaults.checklist,
      last_done: this._dateInput(new Date()),
    };
    if (template) this._applyTemplate(template);
    this._dialog = "create";
    this._render();
  },

  _openEdit(id) {
    const t = this._state.tasks.find(x => x.id === id);
    if (!t) return;
    const n = t.notifications || {};
    this._dialogStep = 0;
    this._templateDraftId = "";
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
      workflow_state: t.workflow_state || this._workflowStartState(t.recurrence_mode || "standard"),
      recurrence_mode: t.recurrence_mode || "standard",
      checklist: Array.isArray(t.checklist) ? t.checklist.map(item => ({ ...item })) : [],
      completion_requirements_note: Boolean(t.completion_requirements?.note),
      completion_requirements_material: Boolean(t.completion_requirements?.material),
      completion_requirements_cost: Boolean(t.completion_requirements?.cost),
      completion_requirements_performed_by: Boolean(t.completion_requirements?.performed_by),
      completion_requirements_checklist: Boolean(t.completion_requirements?.checklist),
      last_done: t.last_done ? this._dateInput(new Date(t.last_done)) : "",
      notifications_enabled: n.enabled !== false,
      notifications_inherit: n.inherit !== false,
      notifications_warning: n.warning !== false,
      notifications_critical: n.critical !== false,
      notifications_overdue: n.overdue !== false,
      notifications_unavailable: Boolean(n.unavailable),
      notifications_once_per_status: n.once_per_status !== false,
      notifications_repeat_days: String(n.repeat_days ?? 3),
      notifications_escalation_enabled: n.escalation_enabled !== false,
      notifications_escalation_after_days: String(n.escalation_after_days ?? 3),
      notifications_actionable: n.actionable !== false,
      notifications_notify_service: n.notify_service || "",
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
      recurrence_mode: t.recurrence_mode || this._draft.recurrence_mode || this._defaultRecurrenceMode(),
      workflow_state: t.workflow_state || this._draft.workflow_state || this._workflowStartState(t.recurrence_mode || this._draft.recurrence_mode || "standard"),
      checklist: Array.isArray(t.checklist) ? t.checklist.map(item => ({ ...item })) : this._draftChecklist(),
      completion_requirements_note: Boolean(t.completion_requirements?.note ?? this._draft.completion_requirements_note),
      completion_requirements_material: Boolean(t.completion_requirements?.material ?? this._draft.completion_requirements_material),
      completion_requirements_cost: Boolean(t.completion_requirements?.cost ?? this._draft.completion_requirements_cost),
      completion_requirements_performed_by: Boolean(t.completion_requirements?.performed_by ?? this._draft.completion_requirements_performed_by),
      completion_requirements_checklist: Boolean(t.completion_requirements?.checklist ?? this._draft.completion_requirements_checklist),
      template_id: t.id,
    });
    if (!this._draft.workflow_state) this._draft.workflow_state = this._workflowStartState(this._draft.recurrence_mode || "standard");
  },

  _templateAutocompleteOptions() {
    return (this._state?.templates || [])
      .filter(template => template.recommended || template.common || Number(template.priority || 0) >= 4)
      .slice(0, 36);
  },

  _selectedTemplateDraft() {
    return this._template(this._templateDraftId || this._draft.template_id);
  },

  _setTemplateDraft(value) {
    const raw = String(value || "").trim();
    const templates = this._state?.templates || [];
    const found = templates.find(template => template.id === raw || template.name === raw || `${template.name} (${this._categoryLabel(template)})` === raw);
    this._templateDraftId = found?.id || "";
  },

  _applySelectedTemplateDraft() {
    const template = this._selectedTemplateDraft();
    if (!template) return;
    this._applyTemplate(template);
    this._templateDraftId = template.id;
    this._render();
  },

  _wizardSteps() {
    return [
      ["mdi:clipboard-edit-outline", "wizardStepStart"],
      ["mdi:calendar-clock-outline", "schedule"],
      ["mdi:timeline-check-outline", "workflow"],
      ["mdi:bell-outline", "notifications"],
    ];
  },

  _dialogStepMissing(step = this._dialogStep) {
    const missing = [];
    if (step === 0) {
      if (!String(this._draft.name || "").trim()) missing.push("name");
      if (this._draft.category === "custom" && !String(this._draft.custom_category || "").trim()) missing.push("ownCategory");
    }
    if (step === 1 && this._draft.schedule_mode === "one_time" && !this._draft.due_date) missing.push("dueDate");
    return missing;
  },

  _dialogMissingTotal() {
    return this._wizardSteps().reduce((total, _step, index) => total + this._dialogStepMissing(index).length, 0);
  },

  _isRequiredDraftField(key) {
    if (key === "name") return true;
    if (key === "custom_category") return this._draft.category === "custom";
    if (key === "due_date") return this._draft.schedule_mode === "one_time";
    return false;
  },

  _goDialogStep(direction) {
    const steps = this._wizardSteps();
    this._dialogStep = Math.min(steps.length - 1, Math.max(0, Number(this._dialogStep || 0) + direction));
    this._render();
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
      workflow_state: this._draft.workflow_state || this._workflowStartState(this._draft.recurrence_mode || "standard"),
      recurrence_mode: this._draft.recurrence_mode || this._defaultRecurrenceMode(),
      checklist: this._draftChecklist().map(item => ({ id: item.id, label: String(item.label || "").trim(), done: Boolean(item.done), required: Boolean(item.required) })).filter(item => item.label),
      completion_requirements: {
        note: Boolean(this._draft.completion_requirements_note),
        material: Boolean(this._draft.completion_requirements_material),
        cost: Boolean(this._draft.completion_requirements_cost),
        performed_by: Boolean(this._draft.completion_requirements_performed_by),
        checklist: Boolean(this._draft.completion_requirements_checklist),
      },
      last_done: this._draft.last_done ? parseDate(this._draft.last_done) : undefined,
      notifications: {
        enabled: Boolean(this._draft.notifications_enabled),
        inherit: Boolean(this._draft.notifications_inherit),
        warning: Boolean(this._draft.notifications_warning),
        critical: Boolean(this._draft.notifications_critical),
        overdue: Boolean(this._draft.notifications_overdue),
        unavailable: Boolean(this._draft.notifications_unavailable),
        once_per_status: Boolean(this._draft.notifications_once_per_status),
        repeat_days: Number(this._draft.notifications_repeat_days) || 0,
        escalation_enabled: Boolean(this._draft.notifications_escalation_enabled),
        escalation_after_days: Number(this._draft.notifications_escalation_after_days) || 0,
        actionable: Boolean(this._draft.notifications_actionable),
        notify_service: String(this._draft.notifications_notify_service || "").trim(),
      },
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
    const task = (this._state?.tasks || []).find(x => x.id === id);
    this._completionChecklist = Array.isArray(task?.checklist) ? task.checklist.map(item => ({ ...item })) : [];
    this._render();
  }
});
