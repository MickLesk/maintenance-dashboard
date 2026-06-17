// WebSocket API helpers and backend mutation methods.
Object.assign(MaintenanceDashboardPanel.prototype, {
  async _save() {
    if (!this.hass) return;
    if (!this._draft.name.trim()) { this._error = this._t("nameMissing"); this._render(); return; }
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
      checklist: this._completionChecklist,
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
    this._completionChecklist = [];
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

  async _toggleChecklistItem(taskId, index, done) {
    const task = (this._state?.tasks || []).find(item => item.id === taskId);
    if (!task) return;
    const checklist = Array.isArray(task.checklist) ? task.checklist.map(item => ({ ...item })) : [];
    if (!checklist[index]) return;
    checklist[index].done = Boolean(done);
    await this.hass.callWS({ type: "maintenance_dashboard/update_task", task_id: taskId, patch: { checklist } });
    await this._load();
  },

  async _reactivate(id) {
    await this.hass.callWS({ type: "maintenance_dashboard/reactivate_task", task_id: id });
    await this._load();
    this._showCompleted = true;
    this._showToast(this._t("actionReactivated"));
  },

  async _setWorkflowState(id, state) {
    await this.hass.callWS({ type: "maintenance_dashboard/set_workflow_state", task_id: id, state });
    await this._load();
    this._showToast(this._t("actionWorkflowUpdated"));
  },

  async _resetTaskProgress(id) {
    await this.hass.callWS({ type: "maintenance_dashboard/reset_task_progress", task_id: id });
    await this._load();
    this._showToast(this._t("actionWorkflowReset"));
  },

  async _restartTaskCycle(id) {
    await this.hass.callWS({ type: "maintenance_dashboard/restart_task_cycle", task_id: id });
    await this._load();
    this._showToast(this._t("actionCycleRestarted"));
  },

  async _skipTaskCycle(id) {
    await this.hass.callWS({ type: "maintenance_dashboard/skip_task_cycle", task_id: id });
    await this._load();
    this._showToast(this._t("actionCycleSkipped"));
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

// v1.6 data safety, bulk operation, saved filter and dashboard settings API helpers.
Object.assign(MaintenanceDashboardPanel.prototype, {
  async _setLayout(mode) {
    this._layoutMode = mode || "cards";
    this._render();
    try {
      await this.hass.callWS({ type: "maintenance_dashboard/update_settings", patch: { dashboard: { view_mode: this._layoutMode } } });
      if (this._state?.settings?.dashboard) this._state.settings.dashboard.view_mode = this._layoutMode;
    } catch (error) { this._showToast(String(error)); }
  },

  async _saveCurrentFilter({ pinned = false } = {}) {
    const name = String(this._savedFilterName || "").trim();
    if (!name) { this._showToast(this._t("filterName")); return; }
    const current = this._state?.settings?.dashboard?.saved_filters || [];
    const existing = current.find(item => String(item.name || "").toLowerCase() === name.toLowerCase());
    const now = new Date().toISOString();
    const filter = {
      ...(existing || {}),
      id: existing?.id || `filter_${Date.now().toString(36)}`,
      name,
      pinned: pinned || Boolean(existing?.pinned),
      created_at: existing?.created_at || now,
      updated_at: now,
      values: this._currentFilterPayload(),
    };
    const filters = existing ? current.map(item => item.id === existing.id ? filter : item) : [...current, filter];
    filters.sort((a, b) => Number(Boolean(b.pinned)) - Number(Boolean(a.pinned)) || String(a.name || "").localeCompare(String(b.name || ""), this._lang()));
    await this.hass.callWS({ type: "maintenance_dashboard/update_settings", patch: { dashboard: { saved_filters: filters } } });
    this._savedFilterName = "";
    await this._load();
    this._showToast(existing ? this._t("actionFilterUpdated") : this._t("actionFilterSaved"));
  },

  _applySavedFilter(id) {
    const filter = (this._state?.settings?.dashboard?.saved_filters || []).find(item => item.id === id);
    if (!filter) return;
    this._applyFilterPayload(filter.values || {});
    this._showAdvancedFilters = true;
    this._render();
  },

  async _deleteSavedFilter(id) {
    const filters = (this._state?.settings?.dashboard?.saved_filters || []).filter(item => item.id !== id);
    await this.hass.callWS({ type: "maintenance_dashboard/update_settings", patch: { dashboard: { saved_filters: filters } } });
    await this._load();
    this._showToast(this._t("actionFilterDeleted"));
  },

  async _executeBulk() {
    const taskIds = this._selectedTaskList();
    if (!taskIds.length) return;
    let value = this._bulkValue;
    if (this._bulkAction === "snooze" || this._bulkAction === "priority") value = Number(value || (this._bulkAction === "snooze" ? 7 : 3));
    this._bulkPreview = await this.hass.callWS({
      type: "maintenance_dashboard/preview_bulk_operation",
      task_ids: taskIds,
      action: this._bulkAction,
      value,
    });
    this._render();
  },

  async _confirmBulk() {
    if (!this._bulkPreview) return;
    const taskIds = (this._bulkPreview.tasks || []).map(task => task.id);
    const result = await this.hass.callWS({
      type: "maintenance_dashboard/bulk_operation",
      task_ids: taskIds,
      action: this._bulkPreview.action,
      value: this._bulkPreview.value,
    });
    this._bulkPreview = null;
    this._selectedTasks.clear();
    await this._load();
    this._showToast(`${this._t("actionBulkDone")}: ${result.affected || taskIds.length}`);
  },

  async _exportSelected() {
    const ids = new Set(this._selectedTaskList());
    const payload = await this.hass.callWS({ type: "maintenance_dashboard/export_data" });
    payload.tasks = (payload.tasks || []).filter(task => ids.has(task.id));
    payload.history = (payload.history || []).filter(event => ids.has(event.task_id));
    payload.backups = [];
    this._downloadJson(payload, `maintenance-dashboard-selection-${new Date().toISOString().slice(0,10)}.json`);
  },

  _downloadJson(payload, filename) {
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = filename; anchor.click();
    URL.revokeObjectURL(url);
  },

  async _checkIntegrity() {
    this._integrityResult = await this.hass.callWS({ type: "maintenance_dashboard/check_integrity" });
    if (this._state) this._state.integrity = this._integrityResult;
    this._render();
    this._showToast(this._integrityResult.healthy ? this._t("integrityHealthy") : `${this._integrityResult.errors} ${this._t("integrityErrors")}`);
  },

  async _repairIntegrity() {
    const result = await this.hass.callWS({ type: "maintenance_dashboard/repair_integrity" });
    this._integrityResult = result.integrity || result;
    await this._load();
    this._showToast(this._t("actionIntegrityRepaired"));
  },

  async _createBackup() {
    await this.hass.callWS({ type: "maintenance_dashboard/create_backup", name: String(this._backupName || "").trim() || undefined, pinned: Boolean(this._backupPinned) });
    this._backupName = ""; this._backupPinned = false;
    await this._load();
    this._showToast(this._t("actionBackupCreated"));
  },

  async _updateBackup(id, patch) {
    await this.hass.callWS({ type: "maintenance_dashboard/update_backup", backup_id: id, ...patch });
    await this._load();
    this._showToast(this._t("actionBackupUpdated"));
  },

  async _deleteBackup(id) {
    if (!window.confirm(this._t("delete"))) return;
    await this.hass.callWS({ type: "maintenance_dashboard/delete_backup", backup_id: id });
    if (this._backupDiffId === id) { this._backupDiff = null; this._backupDiffId = null; }
    await this._load();
    this._showToast(this._t("actionBackupDeleted"));
  },

  async _loadBackupDiff(id) {
    this._backupDiffId = id;
    this._restoreTaskIds.clear();
    this._backupDiff = await this.hass.callWS({ type: "maintenance_dashboard/backup_diff", backup_id: id });
    this._render();
  },

  async _restoreSelectedBackup() {
    if (!this._backupDiffId || !this._restoreSections.size) return;
    const payload = { type: "maintenance_dashboard/restore_backup_sections", backup_id: this._backupDiffId, sections: [...this._restoreSections] };
    if (this._restoreTaskIds.size && this._restoreSections.has("tasks")) payload.task_ids = [...this._restoreTaskIds];
    await this.hass.callWS(payload);
    this._backupDiff = null; this._backupDiffId = null; this._restoreTaskIds.clear();
    await this._load();
    this._showToast(this._t("actionRestored"));
  },

  async _previewImport() {
    try {
      const payload = JSON.parse(this._importPayload || "{}");
      this._importPreview = await this.hass.callWS({ type: "maintenance_dashboard/preview_import", payload, mode: this._importMode, duplicate_mode: this._importDuplicateMode });
      this._render();
    } catch (error) { this._importPreview = null; this._showToast(String(error)); }
  },

  async _importData() {
    if (!this._importPreview?.ok) { this._showToast(this._t("previewRequired")); return; }
    const payload = JSON.parse(this._importPayload || "{}");
    await this.hass.callWS({ type: "maintenance_dashboard/import_data", payload, mode: this._importMode, duplicate_mode: this._importDuplicateMode });
    this._importPayload = ""; this._importPreview = null;
    await this._load();
    this._showToast(this._t("actionImported"));
  },

  async _restoreQuarantine(id) {
    await this.hass.callWS({ type: "maintenance_dashboard/restore_quarantine", quarantine_id: id });
    await this._load();
    this._showToast(this._t("restoreRecord"));
  },

  async _deleteQuarantine(id) {
    if (!window.confirm(this._t("deleteRecord"))) return;
    await this.hass.callWS({ type: "maintenance_dashboard/delete_quarantine", quarantine_id: id });
    await this._load();
  },

  _exportQuarantine(id = undefined) {
    const records = id ? (this._state?.quarantine || []).filter(record => record.id === id) : (this._state?.quarantine || []);
    this._downloadJson({ version: VERSION, exported_at: new Date().toISOString(), quarantine: records }, `maintenance-dashboard-quarantine-${new Date().toISOString().slice(0,10)}.json`);
  },

  async _saveGeneralSettings() {
    const current = this._state?.settings || {};
    const currentDashboard = current.dashboard || {};
    const currentBackups = current.backups || {};
    const currentIntegrity = current.data_integrity || {};
    const currentWorkflow = current.workflow || {};
    const currentWorkflowRequirements = currentWorkflow.default_completion_requirements || {};
    const currentNative = current.native_platforms || {};
    const patch = {
      dashboard: {
        view_mode: this.shadowRoot.getElementById("dashboardViewMode")?.value || currentDashboard.view_mode || "cards",
        density: this.shadowRoot.getElementById("dashboardDensity")?.value || currentDashboard.density || "comfortable",
        default_due_filter: this.shadowRoot.getElementById("dashboardDefaultDue")?.value || currentDashboard.default_due_filter || "all",
        show_quick_filters: this.shadowRoot.getElementById("dashboardQuickFilters") ? Boolean(this.shadowRoot.getElementById("dashboardQuickFilters")?.checked) : Boolean(currentDashboard.show_quick_filters),
        remember_last_view: this.shadowRoot.getElementById("dashboardRememberView") ? Boolean(this.shadowRoot.getElementById("dashboardRememberView")?.checked) : currentDashboard.remember_last_view !== false,
      },
      backups: {
        maximum_count: Number(this.shadowRoot.getElementById("maximumBackups")?.value || currentBackups.maximum_count || 30),
        maximum_age_days: Number(this.shadowRoot.getElementById("maximumBackupAge")?.value || currentBackups.maximum_age_days || 90),
        before_task_update: this.shadowRoot.getElementById("beforeTaskUpdate") ? Boolean(this.shadowRoot.getElementById("beforeTaskUpdate")?.checked) : currentBackups.before_task_update !== false,
        before_task_delete: this.shadowRoot.getElementById("beforeTaskDelete") ? Boolean(this.shadowRoot.getElementById("beforeTaskDelete")?.checked) : currentBackups.before_task_delete !== false,
        before_import: this.shadowRoot.getElementById("beforeImport") ? Boolean(this.shadowRoot.getElementById("beforeImport")?.checked) : currentBackups.before_import !== false,
        before_migration: this.shadowRoot.getElementById("beforeMigration") ? Boolean(this.shadowRoot.getElementById("beforeMigration")?.checked) : currentBackups.before_migration !== false,
        before_restore: this.shadowRoot.getElementById("beforeRestore") ? Boolean(this.shadowRoot.getElementById("beforeRestore")?.checked) : currentBackups.before_restore !== false,
        before_bulk_operation: this.shadowRoot.getElementById("beforeBulk") ? Boolean(this.shadowRoot.getElementById("beforeBulk")?.checked) : currentBackups.before_bulk_operation !== false,
      },
      data_integrity: {
        check_on_start: this.shadowRoot.getElementById("checkIntegrityOnStart") ? Boolean(this.shadowRoot.getElementById("checkIntegrityOnStart")?.checked) : currentIntegrity.check_on_start !== false,
        quarantine_invalid_records: this.shadowRoot.getElementById("quarantineInvalidRecords") ? Boolean(this.shadowRoot.getElementById("quarantineInvalidRecords")?.checked) : currentIntegrity.quarantine_invalid_records !== false,
        audit_retention: Number(this.shadowRoot.getElementById("auditRetention")?.value || currentIntegrity.audit_retention || 1000),
        quarantine_retention: Number(this.shadowRoot.getElementById("quarantineRetention")?.value || currentIntegrity.quarantine_retention || 200),
      },
      workflow: {
        default_state: this.shadowRoot.getElementById("defaultWorkflowState")?.value || currentWorkflow.default_state || "planned",
        default_recurrence_mode: this.shadowRoot.getElementById("defaultRecurrenceMode")?.value || currentWorkflow.default_recurrence_mode || "standard",
        persistent_default_state: this.shadowRoot.getElementById("persistentDefaultState")?.value || currentWorkflow.persistent_default_state || "ready",
        show_checklists: this.shadowRoot.getElementById("workflowShowChecklists") ? Boolean(this.shadowRoot.getElementById("workflowShowChecklists")?.checked) : currentWorkflow.show_checklists !== false,
        reset_checklist_on_completion: this.shadowRoot.getElementById("workflowResetChecklist") ? Boolean(this.shadowRoot.getElementById("workflowResetChecklist")?.checked) : currentWorkflow.reset_checklist_on_completion !== false,
        default_completion_requirements: {
          note: this.shadowRoot.getElementById("workflowRequireNote") ? Boolean(this.shadowRoot.getElementById("workflowRequireNote")?.checked) : Boolean(currentWorkflowRequirements.note),
          material: this.shadowRoot.getElementById("workflowRequireMaterial") ? Boolean(this.shadowRoot.getElementById("workflowRequireMaterial")?.checked) : Boolean(currentWorkflowRequirements.material),
          cost: this.shadowRoot.getElementById("workflowRequireCost") ? Boolean(this.shadowRoot.getElementById("workflowRequireCost")?.checked) : Boolean(currentWorkflowRequirements.cost),
          performed_by: this.shadowRoot.getElementById("workflowRequirePerformedBy") ? Boolean(this.shadowRoot.getElementById("workflowRequirePerformedBy")?.checked) : Boolean(currentWorkflowRequirements.performed_by),
          checklist: this.shadowRoot.getElementById("workflowRequireChecklist") ? Boolean(this.shadowRoot.getElementById("workflowRequireChecklist")?.checked) : Boolean(currentWorkflowRequirements.checklist),
        },
      },
      native_platforms: {
        todo_enabled: this.shadowRoot.getElementById("todoPlatformEnabled") ? Boolean(this.shadowRoot.getElementById("todoPlatformEnabled")?.checked) : currentNative.todo_enabled !== false,
        todo_include_disabled: this.shadowRoot.getElementById("todoIncludeDisabled") ? Boolean(this.shadowRoot.getElementById("todoIncludeDisabled")?.checked) : Boolean(currentNative.todo_include_disabled),
        calendar_enabled: this.shadowRoot.getElementById("calendarPlatformEnabled") ? Boolean(this.shadowRoot.getElementById("calendarPlatformEnabled")?.checked) : currentNative.calendar_enabled !== false,
        calendar_include_snoozed: this.shadowRoot.getElementById("calendarIncludeSnoozed") ? Boolean(this.shadowRoot.getElementById("calendarIncludeSnoozed")?.checked) : Boolean(currentNative.calendar_include_snoozed),
        calendar_event_duration_minutes: Number(this.shadowRoot.getElementById("calendarEventDuration")?.value || currentNative.calendar_event_duration_minutes || 60),
      },
    };
    await this.hass.callWS({ type: "maintenance_dashboard/update_settings", patch });
    this._layoutMode = patch.dashboard.view_mode;
    this._density = patch.dashboard.density;
    await this._load();
    this._showToast(this._t("actionSaved"));
  },

  async _restoreBackup(id) {
    if (!window.confirm(this._t("restoreBackup"))) return;
    await this.hass.callWS({ type: "maintenance_dashboard/restore_backup", backup_id: id });
    await this._load();
    this._showToast(this._t("actionRestored"));
  },
});

Object.assign(MaintenanceDashboardPanel.prototype, {
  async _move(id, delta) {
    const tasks = this._filteredTasks(true).sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
    const idx = tasks.findIndex(t => t.id === id); const target = idx + delta;
    if (idx < 0 || target < 0 || target >= tasks.length) return;
    this._lastOrder = tasks.map(t => t.id);
    const [item] = tasks.splice(idx, 1); tasks.splice(target, 0, item);
    await this.hass.callWS({ type: "maintenance_dashboard/reorder", ordered_ids: tasks.map(t => t.id) });
    await this._load();
  },
  async _dropOn(targetId) {
    if (!this._dragTaskId || this._dragTaskId === targetId) return;
    const tasks = this._filteredTasks(true).sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
    const from = tasks.findIndex(t => t.id === this._dragTaskId); const to = tasks.findIndex(t => t.id === targetId);
    if (from < 0 || to < 0) return;
    this._lastOrder = tasks.map(t => t.id);
    const [item] = tasks.splice(from, 1); tasks.splice(to, 0, item);
    this._dragTaskId = null;
    await this.hass.callWS({ type: "maintenance_dashboard/reorder", ordered_ids: tasks.map(t => t.id) });
    await this._load();
  },
  async _undoReorder() {
    if (!this._lastOrder?.length) return;
    const order = [...this._lastOrder]; this._lastOrder = null;
    await this.hass.callWS({ type: "maintenance_dashboard/reorder", ordered_ids: order });
    await this._load();
    this._showToast(this._t("actionUndo"));
  },
});
