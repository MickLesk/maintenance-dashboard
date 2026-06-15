// WebSocket API helpers and backend mutation methods.
Object.assign(MaintenanceDashboardPanel.prototype, {
  async _save() {
    if (!this.hass) return;
    if (!this._draft.name.trim()) { this._error = "Name fehlt"; this._render(); return; }
    if (this._draft.category === "custom" && !this._draft.custom_category.trim()) { this._error = this._t("customCategoryMissing"); this._render(); return; }
    if (this._draft.schedule_mode === "one_time" && !this._draft.due_date) { this._error = this._t("dueDateMissing"); this._render(); return; }
    const task = this._draftToTask();
    try {
      this._busy = true;
      if (this._dialog === "edit" && this._draft.id) await this.hass.callWS({ type: "maintenance_dashboard/update_task", task_id: this._draft.id, patch: task });
      else await this.hass.callWS({ type: "maintenance_dashboard/create_task", task });
      this._dialog = null; await this._load(); this._showToast(this._t("actionSaved"));
    } catch (e) { this._error = String(e); this._render(); }
    finally { this._busy = false; }
  },

  async _createTemplateTask(template, starterPack = undefined) {
    const task = { ...template, template_id: template.id, starter_pack: starterPack };
    delete task.id;
    if (task.schedule_mode === "interval" && !task.last_done) task.last_done = new Date().toISOString();
    await this.hass.callWS({ type: "maintenance_dashboard/create_task", task });
  },

  async _addSelectedTemplates() {
    if (!this.hass || !this._selectedTemplates.size) return;
    const selected = (this._state.templates || []).filter(t => this._selectedTemplates.has(t.id));
    for (const template of selected) await this._createTemplateTask(template);
    this._selectedTemplates.clear();
    await this._load();
    this._view = "dashboard";
    this._render();
    this._showToast(this._t("actionTemplatesAdded"));
  },

  async _addStarterPack(packId, { completeOnboarding = false, reload = true } = {}) {
    const pack = (this._state?.template_packs || []).find(item => item.id === packId);
    if (!pack) return;
    const existingTasks = (this._state.tasks || []).filter(task => !task.deleted);
    const existingTemplateIds = new Set(existingTasks.map(task => task.template_id).filter(Boolean));
    const existingNames = new Set(existingTasks.map(task => String(task.name || "").trim().toLowerCase()).filter(Boolean));
    for (const templateId of pack.template_ids || []) {
      const template = this._template(templateId);
      if (!template || existingTemplateIds.has(templateId) || existingNames.has(String(template.name || "").trim().toLowerCase())) continue;
      await this._createTemplateTask(template, pack.id);
      existingTemplateIds.add(templateId);
      existingNames.add(String(template.name || "").trim().toLowerCase());
    }
    if (completeOnboarding) {
      await this.hass.callWS({
        type: "maintenance_dashboard/update_settings",
        patch: { onboarding: { completed: true, selected_packs: [...this._selectedPacks] } },
      });
    }
    if (reload) {
      await this._load();
      this._showToast(`${this._t("packAdded")}: ${pack.name}`);
    }
  },

  async _applyOnboarding() {
    const packIds = [...this._selectedPacks];
    const selectedPacks = (this._state?.template_packs || []).filter(pack => this._selectedPacks.has(pack.id));
    const templateIds = [...new Set(selectedPacks.flatMap(pack => pack.template_ids || []))];
    const existingTasks = (this._state.tasks || []).filter(task => !task.deleted);
    const existingTemplateIds = new Set(existingTasks.map(task => task.template_id).filter(Boolean));
    const existingNames = new Set(existingTasks.map(task => String(task.name || "").trim().toLowerCase()).filter(Boolean));
    for (const templateId of templateIds) {
      const template = this._template(templateId);
      if (!template || existingTemplateIds.has(templateId) || existingNames.has(String(template.name || "").trim().toLowerCase())) continue;
      const owner = selectedPacks.find(pack => (pack.template_ids || []).includes(templateId));
      await this._createTemplateTask(template, owner?.id);
      existingTemplateIds.add(templateId);
      existingNames.add(String(template.name || "").trim().toLowerCase());
    }
    await this.hass.callWS({
      type: "maintenance_dashboard/update_settings",
      patch: { onboarding: { completed: true, selected_packs: packIds } },
    });
    this._onboardingDialog = false;
    this._onboardingDismissed = true;
    this._selectedPacks.clear();
    await this._load();
    this._showToast(this._t("actionTemplatesAdded"));
  },

  async _skipOnboarding() {
    this._onboardingDialog = false;
    this._onboardingDismissed = true;
    await this.hass.callWS({
      type: "maintenance_dashboard/update_settings",
      patch: { onboarding: { completed: true, selected_packs: [] } },
    });
    await this._load();
  },

  async _confirmDone() {
    const id = this._completionDialog;
    if (!id) return;
    await this._markDone(id, {
      note: this._completionNote,
      material: this._completionMaterial,
      cost: this._completionCost === "" ? undefined : Number(this._completionCost),
      currency: this._completionCurrency,
      performed_by: this._completionPerformedBy,
    });
    this._completionDialog = null;
    this._completionNote = "";
    this._completionMaterial = "";
    this._completionCost = "";
    this._completionPerformedBy = "";
  },

  async _markDone(id, details = {}) {
    try {
      await this.hass.callWS({ type: "maintenance_dashboard/mark_done", task_id: id, ...details });
      await this._load();
      this._showToast(this._t("actionDone"));
    } catch (error) {
      this._showToast(String(error));
    }
  },

  async _reactivate(id) {
    await this.hass.callWS({ type: "maintenance_dashboard/reactivate_task", task_id: id });
    await this._load();
    this._showCompleted = true;
    this._showToast(this._t("actionReactivated"));
  },

  async _exportData() { const payload = await this.hass.callWS({ type: "maintenance_dashboard/export_data" }); const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" }); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = `maintenance-dashboard-${new Date().toISOString().slice(0,10)}.json`; a.click(); URL.revokeObjectURL(url); this._showToast(this._t("actionExported")); },

  async _importData() { const payload = JSON.parse(this._importPayload || "{}"); await this.hass.callWS({ type: "maintenance_dashboard/import_data", payload }); this._importPayload = ""; this._dataDialog = false; await this._load(); this._showToast(this._t("actionImported")); },

  async _saveNotificationSettings() {
    const patch = {
      notifications: {
        enabled: Boolean(this.shadowRoot.getElementById("notifyEnabled")?.checked),
        notify_service: this.shadowRoot.getElementById("notifyService")?.value || "",
        warning: Boolean(this.shadowRoot.getElementById("notifyWarning")?.checked),
        critical: Boolean(this.shadowRoot.getElementById("notifyCritical")?.checked),
        overdue: Boolean(this.shadowRoot.getElementById("notifyOverdue")?.checked),
        unavailable: Boolean(this.shadowRoot.getElementById("notifyUnavailable")?.checked),
        due: Boolean(this.shadowRoot.getElementById("notifyDue")?.checked),
        once_per_status: Boolean(this.shadowRoot.getElementById("oncePerStatus")?.checked),
        repeat_days: Number(this.shadowRoot.getElementById("notificationRepeatDays")?.value || 0),
        escalation_enabled: Boolean(this.shadowRoot.getElementById("notificationEscalation")?.checked),
        escalation_after_days: Number(this.shadowRoot.getElementById("notificationEscalationDays")?.value || 0),
        actionable: Boolean(this.shadowRoot.getElementById("actionableNotifications")?.checked),
        action_snooze_days: Number(this.shadowRoot.getElementById("actionSnoozeDays")?.value || 7),
        history_retention: Number(this.shadowRoot.getElementById("notificationHistoryRetention")?.value || 200),
        test_mode: Boolean(this.shadowRoot.getElementById("notificationTestMode")?.checked),
        daily_digest: Boolean(this.shadowRoot.getElementById("dailyDigest")?.checked),
        digest_time: this.shadowRoot.getElementById("digestTime")?.value || "08:00",
        digest_group_by_category: Boolean(this.shadowRoot.getElementById("digestGroupByCategory")?.checked),
        quiet_hours_enabled: Boolean(this.shadowRoot.getElementById("quietHours")?.checked),
        quiet_from: this.shadowRoot.getElementById("quietFrom")?.value || "22:00",
        quiet_to: this.shadowRoot.getElementById("quietTo")?.value || "07:00",
        include_snoozed: Boolean(this.shadowRoot.getElementById("includeSnoozed")?.checked),
        include_dashboard_link: Boolean(this.shadowRoot.getElementById("includeDashboardLink")?.checked),
      },
      task_entities: {
        mode: this.shadowRoot.getElementById("entityMode")?.value || "off",
        device_grouping: this.shadowRoot.getElementById("entityGrouping")?.value || "dashboard",
        cleanup_removed: Boolean(this.shadowRoot.getElementById("cleanupRemovedEntities")?.checked),
      },
    };
    await this.hass.callWS({ type: "maintenance_dashboard/update_settings", patch });
    await this._load();
    this._showToast(this._t("actionSaved"));
  },

  async _sendNotification(test) {
    const service = this.shadowRoot.getElementById("notifyService")?.value || this._state?.settings?.notifications?.notify_service || undefined;
    if (test) await this.hass.callWS({ type: "maintenance_dashboard/test_notification", service });
    else await this.hass.callWS({ type: "maintenance_dashboard/send_digest", service, include_snoozed: Boolean(this.shadowRoot.getElementById("includeSnoozed")?.checked) });
    await this._load();
    this._showToast(this._t("actionNotificationSent"));
  },

  async _notifyDueTasks() {
    const service = this.shadowRoot.getElementById("notifyService")?.value || this._state?.settings?.notifications?.notify_service || undefined;
    const result = await this.hass.callWS({ type: "maintenance_dashboard/notify_due_tasks", service, statuses: ["warning", "critical", "overdue", "unavailable"] });
    await this._load();
    this._showToast(`${this._t("actionNotificationSent")}: ${result.sent || 0}${result.failed ? ` · ${result.failed} ${this._t("notificationFailed")}` : ""}`);
  },

  async _previewNotification() {
    if (!this._notificationPreviewTask) return;
    const service = this.shadowRoot.getElementById("notifyService")?.value || undefined;
    this._notificationPreview = await this.hass.callWS({ type: "maintenance_dashboard/preview_notification", task_id: this._notificationPreviewTask, service });
    this._render();
  },

  async _processNotifications() {
    const result = await this.hass.callWS({ type: "maintenance_dashboard/process_notifications" });
    await this._load();
    const sent = Number(result.sent || 0) + Number(result.digest_sent || 0);
    this._showToast(result.suppressed ? `${this._t("processNotificationsNow")}: ${result.suppressed}` : `${this._t("actionNotificationSent")}: ${sent}`);
  },

  async _cleanupTaskEntities() {
    const result = await this.hass.callWS({ type: "maintenance_dashboard/cleanup_task_entities" });
    await this._load();
    this._showToast(`${this._t("cleanupEntitiesNow")}: ${result.removed || 0}`);
  },

  async _clearNotificationHistory() {
    await this.hass.callWS({ type: "maintenance_dashboard/clear_notification_history" });
    await this._load();
    this._showToast(this._t("notificationHistoryCleared"));
  },

  async _snooze(id, days) { this._snoozeMenu = null; await this.hass.callWS({ type: "maintenance_dashboard/snooze", task_id: id, days }); await this._load(); this._showToast(`${this._t("actionSnoozed")} · ${days} ${this._t("days")}`); },

  async _clearSnooze(id) { await this.hass.callWS({ type: "maintenance_dashboard/clear_snooze", task_id: id }); await this._load(); this._showToast(this._t("actionSnoozeCleared")); },

  async _undo(id) { await this.hass.callWS({ type: "maintenance_dashboard/undo_completion", event_id: id }); await this._load(); this._showToast(this._t("actionUndo")); },

  async _delete(id) { await this.hass.callWS({ type: "maintenance_dashboard/delete_task", task_id: id }); await this._load(); this._showToast(this._t("actionDeleted")); },

  async _restoreBackup(id) { await this.hass.callWS({ type: "maintenance_dashboard/restore_backup", backup_id: id }); await this._load(); this._showToast(this._t("actionRestored")); },

  async _move(id, delta) { const tasks = this._filteredTasks(true).sort((a, b) => (a.position ?? 0) - (b.position ?? 0)); const idx = tasks.findIndex(t => t.id === id); const target = idx + delta; if (idx < 0 || target < 0 || target >= tasks.length) return; const [item] = tasks.splice(idx, 1); tasks.splice(target, 0, item); await this.hass.callWS({ type: "maintenance_dashboard/reorder", ordered_ids: tasks.map(t => t.id) }); await this._load(); },

  async _dropOn(targetId) { if (!this._dragTaskId || this._dragTaskId === targetId) return; const tasks = this._filteredTasks(true).sort((a, b) => (a.position ?? 0) - (b.position ?? 0)); const from = tasks.findIndex(t => t.id === this._dragTaskId); const to = tasks.findIndex(t => t.id === targetId); if (from < 0 || to < 0) return; const [item] = tasks.splice(from, 1); tasks.splice(to, 0, item); this._dragTaskId = null; await this.hass.callWS({ type: "maintenance_dashboard/reorder", ordered_ids: tasks.map(t => t.id) }); await this._load(); }
});
