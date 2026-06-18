// Task editor dialog rendering.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _dialogHtml() {
    if (!this._dialog) return "";
    const d = this._draft;
    const steps = this._wizardSteps();
    const activeStep = Math.min(steps.length - 1, Math.max(0, Number(this._dialogStep || 0)));
    const missingTotal = this._dialogMissingTotal();
    const stepHtml = [
      this._wizardStartStepHtml(d),
      this._wizardScheduleStepHtml(d),
      this._workflowFieldsHtml(d),
      this._taskNotificationFieldsHtml(d),
    ][activeStep];
    const stepper = `<nav class="wizard-steps" aria-label="${this._t("newEntryWizard")}">${steps.map(([icon, label], index) => `<button class="${activeStep === index ? "active" : ""} ${this._dialogStepMissing(index).length ? "has-missing" : ""}" data-action="${index < activeStep ? "wizard-back" : "wizard-next"}" ${index === activeStep ? "disabled" : ""}><ha-icon icon="${icon}"></ha-icon><span>${this._t(label)}</span></button>`).join("")}</nav>`;
    return `<div class="dialog-backdrop"><section class="dialog wizard-dialog"><header><div class="dialog-title-block"><h2>${this._dialog === "edit" ? this._t("edit") : this._t("newEntry")}</h2><p class="section-hint">${missingTotal ? this._t("wizardMissingHint").replace("{count}", String(missingTotal)) : this._t("wizardReadyHint")}</p></div><button class="icon" data-action="close"><ha-icon icon="mdi:close"></ha-icon></button></header>${stepper}<div class="dialog-body wizard-body">
      ${stepHtml}
      ${this._error ? `<div class="error">${this._html(this._error)}</div>` : ""}
      ${this._duplicateTaskWarning ? `<div class="schedule-callout warning"><ha-icon icon="mdi:alert-outline"></ha-icon><div><strong>${this._t("duplicateTaskWarning")}</strong><p>${this._t("similarTaskExists")}: ${this._html(this._duplicateTaskWarning)}</p></div></div>` : ""}
    </div><footer><button class="ghost" data-action="close">${this._t("cancel")}</button>${activeStep > 0 ? `<button class="ghost" data-action="wizard-back"><ha-icon icon="mdi:arrow-left"></ha-icon>${this._t("wizardBack")}</button>` : ""}${activeStep < steps.length - 1 ? `<button class="primary" data-action="wizard-next">${this._t("wizardNext")}</button>` : `<button class="primary" data-action="save" ${this._busy ? "disabled" : ""}>${this._t("save")}</button>`}</footer></section></div>`;
  },

  _wizardStartStepHtml(d) {
    const scheduleFields = this._scheduleFieldsHtml(d);
    const areas = this._areas();
    const picked = this._selectedTemplateDraft();
    const templateOptions = this._templateAutocompleteOptions();
    const pickerQuery = this._templatePickerQuery || "";
    const templatePicker = this._dialog === "create" ? `<div class="template-autocomplete"><div class="template-picker-head"><label class="field grow"><span>${this._t("selectTemplate")}</span><input id="templatePicker" value="${this._html(pickerQuery)}" placeholder="${this._t("templatePickerPlaceholder")}" autocomplete="off"></label><button class="ghost" data-action="apply-picked-template" ${picked ? "" : "disabled"}><ha-icon icon="mdi:shape-plus-outline"></ha-icon>${this._t("applyTemplate")}</button></div><p class="section-hint">${picked ? this._t("templatePickerSelected").replace("{name}", this._html(picked.name || "")) : this._t("templatePickerHint")}</p><div class="template-picker-list">${templateOptions.map(t => `<button type="button" class="template-picker-option ${picked?.id === t.id ? "active" : ""}" data-pick-template="${this._html(t.id)}"><ha-icon icon="${this._html(t.icon || "mdi:wrench-clock")}"></ha-icon><span><strong>${this._html(t.name)}</strong><small>${this._categoryLabel(t)} · ${this._scheduleSummary(t)} · ${this._t("priority")} ${t.priority || 3}/5</small></span></button>`).join("")}</div></div>` : "";
    return `<section class="dialog-section wizard-section"><div class="section-heading"><div><h3>${this._t("wizardStepStart")}</h3><p class="section-hint">${this._t("wizardStartHint")}</p></div></div>
      ${templatePicker}
      <div class="form-grid">${this._input("name", this._fieldLabel("name"), "text")}<label class="field"><span>${this._t("category")}</span><select data-draft="category">${CATEGORY_KEYS.map(k => `<option value="${k}" ${d.category === k ? "selected" : ""}>${this._t(k)}</option>`).join("")}</select></label>${d.category === "custom" ? this._input("custom_category", this._fieldLabel("custom_category", "ownCategory"), "text") : ""}<label class="field"><span>${this._t("area")}</span><select data-draft="area_id"><option value="">—</option>${areas.map(a => `<option value="${a.area_id}" ${d.area_id === a.area_id ? "selected" : ""}>${this._html(a.name)}</option>`).join("")}</select></label></div>
      <label class="entity-field"><span>${this._t("entity")}</span><ha-entity-picker id="entityPicker" allow-custom-entity></ha-entity-picker></label>
      <label class="description-field"><span>${this._t("description")}</span><textarea data-draft="description">${this._html(d.description)}</textarea></label>
      <label class="field"><span>${this._t("tags")}</span><input data-draft="tags" type="text" value="${this._html(Array.isArray(d.tags) ? d.tags.join(", ") : d.tags || "")}" placeholder="${this._t("tagPlaceholder")}"></label>
      <div class="wizard-split"><section class="inline-priority"><div class="priority-head"><div><h4>${this._t("priority")}</h4><p class="section-hint">${this._t("priorityHint")}</p></div><strong>${this._priorityLabel(d.priority)} (${d.priority}/5)</strong></div><input class="priority-slider" data-draft="priority" type="range" min="1" max="5" step="1" value="${this._html(d.priority || 3)}"><div class="priority-scale">${[1,2,3,4,5].map(p => `<span class="${Number(d.priority || 3) === p ? "active" : ""}">${this._priorityLabel(p)}</span>`).join("")}</div></section>${this._appearanceCompactHtml(d)}</div>
    </section>`;
  },

  _wizardScheduleStepHtml(d) {
    const scheduleFields = this._scheduleFieldsHtml(d);
    return `<section class="dialog-section wizard-section"><div class="section-heading"><div><h3>${this._t("schedule")}</h3><p class="section-hint">${this._t("wizardScheduleHint")}</p></div></div><div class="form-grid"><label class="field"><span>${this._t("taskType")}</span><select data-draft="type"><option value="time" ${d.type === "time" ? "selected" : ""}>${this._t("time")}</option><option value="meter" ${d.type === "meter" ? "selected" : ""}>${this._t("meter")}</option></select></label><label class="field"><span>${this._t("scheduleMode")}</span><select data-draft="schedule_mode">${(d.type === "meter" ? ["interval"] : SCHEDULE_MODES).map(m => `<option value="${m}" ${d.schedule_mode === m ? "selected" : ""}>${this._scheduleModeLabel(m)}</option>`).join("")}</select></label></div>${scheduleFields}<div class="form-grid">${this._input("warning_threshold", this._t("warning"), "number")}${this._input("critical_threshold", this._t("critical"), "number")}</div></section>`;
  },

  _appearanceCompactHtml(d) {
    return `<section class="appearance-compact"><div class="section-heading compact-heading"><div><h4>${this._t("appearance")}</h4><p class="section-hint">${this._t("appearanceHint")}</p></div></div><div class="appearance-grid"><label class="field icon-picker-field appearance-icon-field"><span>${this._t("icon")}</span><div id="iconHost"></div></label><label class="field color-field"><span>${this._t("iconColor")}</span><div class="color-input-row"><input id="iconColorInput" data-draft="icon_color" type="color" value="${this._html(d.icon_color || "#a855f7")}"><button class="ghost small" data-action="random-icon-color" type="button" title="${this._t("randomColors")}"><ha-icon icon="mdi:palette"></ha-icon></button></div></label><label class="field color-field"><span>${this._t("cardColor")}</span><div class="color-input-row"><input id="cardColorInput" data-draft="card_color" type="color" value="${this._html(d.card_color || "#6b5a00")}"><button class="ghost small" data-action="random-card-color" type="button" title="${this._t("randomColors")}"><ha-icon icon="mdi:palette"></ha-icon></button></div></label></div><div class="color-actions"><button class="ghost" data-action="random-colors" type="button"><ha-icon icon="mdi:palette-swatch-outline"></ha-icon>${this._t("randomColors")}</button><button class="ghost" data-action="clear-colors" type="button"><ha-icon icon="mdi:close-circle-outline"></ha-icon>${this._t("clearColors")}</button><label class="check inline-check"><input data-draft="enabled" type="checkbox" ${d.enabled ? "checked" : ""}>${this._t("enabled")}</label></div></section>`;
  },

  _workflowFieldsHtml(d) {
    const checklist = Array.isArray(d.checklist) ? d.checklist : [];
    return `<section class="dialog-section wizard-section"><div class="section-heading"><div><h3>${this._t("workflow")}</h3><p class="section-hint">${this._t("workflowHint")}</p></div></div><div class="preset-row">${[["maintenance","mdi:wrench-clock","presetMaintenance"],["persistent","mdi:infinity","presetPersistent"],["repair","mdi:alert-wrench-outline","presetRepair"]].map(([id, icon, label]) => `<button class="ghost" data-workflow-preset="${id}"><ha-icon icon="${icon}"></ha-icon>${this._t(label)}</button>`).join("")}</div><div class="form-grid"><label class="field"><span>${this._t("taskRelevance")}</span><select data-draft="recurrence_mode">${RECURRENCE_MODES.map(mode => `<option value="${mode}" ${d.recurrence_mode === mode ? "selected" : ""}>${this._t(mode === "persistent" ? "recurrencePersistent" : "recurrenceStandard")}</option>`).join("")}</select></label><label class="field"><span>${this._t("workflowState")}</span><select data-draft="workflow_state">${WORKFLOW_STATES.map(state => `<option value="${state}" ${d.workflow_state === state ? "selected" : ""}>${this._workflowStateLabel(state)}</option>`).join("")}</select></label></div><div class="checklist-editor"><div class="checklist-editor-head"><div><strong>${this._t("checklist")}</strong><p class="section-hint">${this._t("checklistHint")}</p></div><button class="ghost small" type="button" data-action="add-checklist-item"><ha-icon icon="mdi:plus"></ha-icon>${this._t("addChecklistItem")}</button></div>${checklist.length ? checklist.map((item, index) => `<div class="checklist-editor-row"><label class="check compact"><input type="checkbox" data-draft-checklist-done="${index}" ${item.done ? "checked" : ""}>${this._t("done")}</label><label class="field"><span>${this._t("label")}</span><input type="text" data-draft-checklist-label="${index}" value="${this._html(item.label || "")}" placeholder="${this._t("checklistItemPlaceholder")}"></label><label class="check compact icon-check" title="${this._t("required")}"><input type="checkbox" data-draft-checklist-required="${index}" ${item.required ? "checked" : ""}><ha-icon icon="mdi:asterisk"></ha-icon></label><button class="ghost icon-only" type="button" title="${this._t("delete")}" data-action="remove-checklist-item" data-checklist-index="${index}"><ha-icon icon="mdi:delete-outline"></ha-icon></button></div>`).join("") : `<p class="section-hint">${this._t("checklistEmpty")}</p>`}</div><div class="completion-requirements"><strong>${this._t("completionRequirements")}</strong><div class="check-grid">${[
      ["completion_requirements_note", "completionRequirementNote"],
      ["completion_requirements_material", "completionRequirementMaterial"],
      ["completion_requirements_cost", "completionRequirementCost"],
      ["completion_requirements_performed_by", "completionRequirementPerformedBy"],
      ["completion_requirements_checklist", "completionRequirementChecklist"],
    ].map(([key, label]) => `<label class="check"><input data-draft="${key}" type="checkbox" ${d[key] ? "checked" : ""}>${this._t(label)}</label>`).join("")}</div></div></section>`;
  },

  _scheduleFieldsHtml(d) {
    if (d.type === "meter") {
      return `<div class="form-grid">${this._input("interval", this._t("interval"), "number")}<label class="field"><span>${this._t("intervalUnit")}</span><select data-draft="interval_unit">${["hours","days","weeks","months"].map(u => `<option value="${u}" ${d.interval_unit === u ? "selected" : ""}>${this._t(u)}</option>`).join("")}</select></label>${this._input("last_done", this._t("lastDone"), "datetime-local")}</div>`;
    }
    if (d.schedule_mode === "one_time") {
      return `<div class="schedule-callout"><ha-icon icon="mdi:calendar-check-outline"></ha-icon><div><strong>${this._t("oneTime")}</strong><p>${this._t("oneTimeArchiveHint")}</p></div></div><div class="form-grid">${this._input("due_date", this._fieldLabel("due_date", "dueDate"), "datetime-local")}</div>`;
    }
    if (d.schedule_mode === "fixed_date") {
      return `<div class="form-grid"><label class="field"><span>${this._t("calendarRepeat")}</span><select data-draft="calendar_repeat"><option value="monthly" ${d.calendar_repeat === "monthly" ? "selected" : ""}>${this._t("monthly")}</option><option value="yearly" ${d.calendar_repeat !== "monthly" ? "selected" : ""}>${this._t("yearly")}</option></select></label>${d.calendar_repeat === "monthly" ? "" : this._input("fixed_month", this._t("fixedMonth"), "number")}${this._input("fixed_day", this._t("fixedDay"), "number")}${this._input("last_done", this._t("lastDone"), "datetime-local")}</div>`;
    }
    if (d.schedule_mode === "seasonal") {
      return `<div class="form-grid"><label class="field"><span>${this._t("seasonal")}</span><select data-draft="season">${["spring","summer","autumn","winter"].map(x => `<option value="${x}" ${d.season === x ? "selected" : ""}>${this._t(x)}</option>`).join("")}</select></label>${this._input("fixed_day", this._t("fixedDay"), "number")}${this._input("last_done", this._t("lastDone"), "datetime-local")}</div>`;
    }
    return `<div class="form-grid">${this._input("interval", this._t("interval"), "number")}<label class="field"><span>${this._t("intervalUnit")}</span><select data-draft="interval_unit">${["days", "hours", "weeks", "months"].map(u => `<option value="${u}" ${d.interval_unit === u ? "selected" : ""}>${this._t(u)}</option>`).join("")}</select></label>${this._input("last_done", this._t("lastDone"), "datetime-local")}</div>`;
  },

  _taskNotificationFieldsHtml(d) {
    const disabled = d.notifications_inherit ? "disabled" : "";
    return `<section class="dialog-section wizard-section"><div class="section-heading"><div><h3>${this._t("notificationRules")}</h3><p class="section-hint">${this._t("notificationRulesHint")}</p></div></div><label class="check"><input data-draft="notifications_enabled" type="checkbox" ${d.notifications_enabled ? "checked" : ""}>${this._t("taskNotificationsEnabled")}</label><label class="check"><input data-draft="notifications_inherit" type="checkbox" ${d.notifications_inherit ? "checked" : ""}>${this._t("inheritGlobalRules")}</label><div class="toggle-grid"><label class="check"><input data-draft="notifications_warning" type="checkbox" ${d.notifications_warning ? "checked" : ""} ${disabled}>${this._t("notifyWarning")}</label><label class="check"><input data-draft="notifications_critical" type="checkbox" ${d.notifications_critical ? "checked" : ""} ${disabled}>${this._t("notifyCritical")}</label><label class="check"><input data-draft="notifications_overdue" type="checkbox" ${d.notifications_overdue ? "checked" : ""} ${disabled}>${this._t("notifyOverdue")}</label><label class="check"><input data-draft="notifications_unavailable" type="checkbox" ${d.notifications_unavailable ? "checked" : ""} ${disabled}>${this._t("notifyUnavailable")}</label><label class="check"><input data-draft="notifications_once_per_status" type="checkbox" ${d.notifications_once_per_status ? "checked" : ""} ${disabled}>${this._t("oncePerStatus")}</label><label class="check"><input data-draft="notifications_escalation_enabled" type="checkbox" ${d.notifications_escalation_enabled ? "checked" : ""} ${disabled}>${this._t("escalation")}</label><label class="check"><input data-draft="notifications_actionable" type="checkbox" ${d.notifications_actionable ? "checked" : ""} ${disabled}>${this._t("actionableNotifications")}</label></div><div class="form-grid"><label class="field"><span>${this._t("repeatEveryDays")}</span><input data-draft="notifications_repeat_days" type="number" min="0" max="365" value="${this._html(d.notifications_repeat_days || "3")}" ${disabled}></label><label class="field"><span>${this._t("escalationAfterDays")}</span><input data-draft="notifications_escalation_after_days" type="number" min="0" max="365" value="${this._html(d.notifications_escalation_after_days || "3")}" ${disabled}></label><label class="field"><span>${this._t("notificationServiceOverride")}</span><input data-draft="notifications_notify_service" value="${this._html(d.notifications_notify_service || "")}" placeholder="notify.mobile_app_phone" ${disabled}></label></div></section>`;
  },

  _fieldLabel(key, labelKey = key) { return `${this._t(labelKey)}${this._isRequiredDraftField(key) ? `<span class="required-mark inline-required" title="${this._t("required")}"></span>` : ""}`; },

  _input(key, label, type) { return `<label class="field ${this._isRequiredDraftField(key) ? "is-required" : ""}"><span>${label}</span><input data-draft="${key}" type="${type}" value="${this._html(this._draft[key] || "")}"></label>`; },

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
