// Event binding and UI interaction handlers.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _bind() {
    const onAll = (selector, event, handler) => this.shadowRoot.querySelectorAll(selector).forEach(el => el.addEventListener(event, ev => handler(el, ev)));
    const on = (id, event, handler) => { const el = this.shadowRoot.getElementById(id); if (el) el.addEventListener(event, handler); };

    onAll("[data-view]", "click", el => {
      if (el.dataset.view === "templates") { this._openTemplatesSettings(); return; }
      this._view = el.dataset.view;
      this._snoozeMenu = null;
      this._quickCreateOpen = false;
      this._persistUiState();
      this._render();
    });
    onAll("[data-action='open-templates-settings']", "click", () => this._openTemplatesSettings());
    onAll("[data-action='close-shortcuts']", "click", () => { this._shortcutsDialogOpen = false; this._render(); });
    onAll("[data-action='export-custom-templates']", "click", () => this._exportCustomTemplates());
    onAll("[data-clear-dashboard-filter]", "click", el => this._clearDashboardFilter(el.dataset.clearDashboardFilter));
    onAll("[data-open-task-detail]", "click", el => { this._view = "dashboard"; this._taskDetailId = el.dataset.openTaskDetail || ""; this._taskDetailTab = "overview"; this._persistUiState(); this._render(); });
    onAll("[data-open-attachment]", "click", el => this._openAttachment(el.dataset.openAttachment));
    on("statisticsYear", "change", event => this._loadStatisticsYear(Number(event.target.value)));
    onAll("[data-action='create']", "click", () => this._openCreateEmpty());
    onAll("[data-action='toggle-quick-create']", "click", () => { this._quickCreateOpen = !this._quickCreateOpen; this._render(); });
    onAll("[data-action='close-quick-create']", "click", () => { this._quickCreateOpen = false; this._render(); });
    onAll("[data-action='quick-create-template']", "click", () => this._openCreateFromTemplate());
    onAll("[data-action='close']", "click", () => this._closeDialog());
    onAll("[data-action='save']", "click", () => this._save());
    onAll("[data-action='wizard-next']", "click", () => {
      if (this._isTemplatePickPhase()) { this._confirmTemplatePick(); return; }
      this._goDialogStep(1);
    });
    onAll("[data-action='wizard-back']", "click", () => this._goDialogStep(-1));
    onAll("[data-action='confirm-template-pick']", "click", () => this._confirmTemplatePick());
    onAll("[data-action='change-wizard-template']", "click", () => this._changeWizardTemplate());
    onAll("[data-action='apply-picked-template']", "click", () => this._applySelectedTemplateDraft());
    onAll("[data-pick-template]", "click", el => {
      const template = this._template(el.dataset.pickTemplate);
      this._templateDraftId = template?.id || "";
      this._templatePickerQuery = template?.name || "";
      if (this._isTemplatePickPhase() && template) this._confirmTemplatePick();
      else this._render();
    });
    onAll("[data-action='diagnostics']", "click", () => { this._diagnostics = true; this._render(); });
    onAll("[data-settings-tab]", "click", el => { this._settingsTab = el.dataset.settingsTab || "general"; this._persistUiState(); this._render(); });
    onAll("[data-action='history-dialog']", "click", () => { this._historyDialog = true; this._render(); });
    onAll("[data-action='close-history']", "click", () => { this._historyDialog = false; this._render(); });
    onAll("[data-history-scope]", "click", el => { this._historyScope = el.dataset.historyScope || "all"; this._render(); });
    onAll("[data-action='close-diagnostics']", "click", () => { this._diagnostics = false; this._render(); });
    onAll("[data-action='data-dialog']", "click", () => { this._dataDialog = true; this._render(); });
    onAll("[data-action='close-data-dialog']", "click", () => { this._dataDialog = false; this._backupDiff = null; this._render(); });
    onAll("[data-action='notification-dialog']", "click", () => { this._notificationDialog = true; this._render(); });
    onAll("[data-action='close-notification-dialog']", "click", () => { this._notificationDialog = false; this._render(); });
    onAll("[data-action='close-template-preview']", "click", () => { this._templatePreview = null; this._render(); });
    onAll("[data-action='close-task-detail']", "click", () => { this._taskDetailId = ""; this._taskNoteDraft = ""; this._taskDetailTab = "overview"; this._render(); });
    onAll("[data-action='open-quality-dialog']", "click", () => { this._qualityDialogOpen = true; this._render(); });
    onAll("[data-action='filter-quality-issues']", "click", () => this._filterQualityIssues());
    onAll("[data-action='close-quality-dialog']", "click", () => { this._qualityDialogOpen = false; this._render(); });
    onAll("[data-quality-fix]", "click", el => { const [taskId, issue] = el.dataset.qualityFix.split(":"); this._applyQualityFix(taskId, issue); });
    onAll("[data-action='toggle-status-metrics']", "click", () => { this._statusMetricsExpanded = !this._statusMetricsExpanded; this._persistUiState(); this._render(); });
    onAll("[data-action='open-template-import']", "click", () => { this._templateImportOpen = true; this._render(); });
    onAll("[data-action='close-template-import']", "click", () => { this._templateImportOpen = false; this._templateImportPreview = null; this._render(); });
    onAll("[data-action='preview-template-import']", "click", () => this._previewTemplateImport());
    onAll("[data-action='import-user-templates']", "click", () => this._importUserTemplates());
    onAll("[data-clear-template-filter]", "click", el => {
      const kind = el.dataset.clearTemplateFilter;
      if (kind === "category") this._templateCategory = "all";
      if (kind === "season") this._templateSeason = "all";
      if (kind === "recommended") this._templateOnlyCommon = false;
      if (kind === "search") this._search = "";
      this._render();
      this._scrollTemplateResults();
    });
    onAll("[data-detail-tab]", "click", el => { this._taskDetailTab = el.dataset.detailTab || "overview"; this._render(); });
    onAll("[data-action='save-template-from-task']", "click", el => this._saveTemplateFromTask(el.dataset.taskId));
    onAll("[data-edit-note]", "click", el => {
      const [taskId, noteId] = el.dataset.editNote.split(":");
      const task = (this._state?.tasks || []).find(item => item.id === taskId);
      const note = (task?.notes || []).find(item => item.id === noteId);
      const text = window.prompt(this._t("editNote"), note?.text || "");
      if (text != null) this._updateTaskNote(taskId, noteId, text);
    });
    onAll("[data-delete-note]", "click", el => {
      const [taskId, noteId] = el.dataset.deleteNote.split(":");
      if (window.confirm(this._t("deleteNote"))) this._deleteTaskNote(taskId, noteId);
    });
    onAll("[data-mobile-actions]", "click", (el, e) => { e.preventDefault(); e.stopPropagation(); this._mobileActionTaskId = el.dataset.mobileActions; this._render(); });
    onAll("[data-action='close-mobile-actions']", "click", () => { this._mobileActionTaskId = ""; this._render(); });
    onAll("[data-action='open-task-detail']", "click", el => { this._mobileActionTaskId = ""; this._taskDetailId = el.dataset.taskId || ""; this._taskDetailTab = "overview"; this._render(); });
    onAll("[data-action='close-completion']", "click", () => { this._completionDialog = null; this._render(); });
    onAll("[data-action='confirm-done']", "click", () => this._confirmDone());
    onAll("[data-completion-checklist]", "change", (el, event) => this._updateCompletionChecklist(Number(el.dataset.completionChecklist), event.target.checked));

    // Dashboard layout, filters and bulk actions.
    onAll("[data-layout]", "click", el => this._setLayout(el.dataset.layout));
    onAll("[data-action='toggle-quick-filters']", "click", () => { this._quickFiltersOpen = !this._quickFiltersOpen; this._render(); });
    onAll("[data-quick-filter]", "click", el => { const [kind, value] = el.dataset.quickFilter.split(":"); this._applyQuickFilter(kind, value); });
    onAll("[data-quick-tag]", "click", el => { this._tagFilter = el.dataset.quickTag || ""; this._showAdvancedFilters = true; this._render(); });
    onAll("[data-action='toggle-advanced-filters']", "click", () => { this._showAdvancedFilters = !this._showAdvancedFilters; this._render(); });
    onAll("[data-action='reset-filters']", "click", () => { this._applyFilterPayload({}); this._render(); });
    onAll("[data-action='toggle-completed']", "click", () => { this._showCompleted = !this._showCompleted; this._render(); });
    onAll("[data-select-task]", "change", el => { el.checked ? this._selectedTasks.add(el.dataset.selectTask) : this._selectedTasks.delete(el.dataset.selectTask); this._render(); });
    onAll("[data-action='select-visible-tasks']", "change", el => { this._filteredTasks(false).forEach(task => el.checked ? this._selectedTasks.add(task.id) : this._selectedTasks.delete(task.id)); this._render(); });
    onAll("[data-action='clear-task-selection']", "click", () => { this._selectedTasks.clear(); this._render(); });
    onAll("[data-action='select-problem-tasks']", "click", () => { this._selectedTasks.clear(); this._filteredTasks(false).filter(task => ["overdue", "critical", "warning", "unavailable"].includes(this._state?.runtime?.[task.id]?.status)).forEach(task => this._selectedTasks.add(task.id)); this._render(); });
    onAll("[data-action='invert-task-selection']", "click", () => { this._filteredTasks(false).forEach(task => this._selectedTasks.has(task.id) ? this._selectedTasks.delete(task.id) : this._selectedTasks.add(task.id)); this._render(); });
    onAll("[data-action='execute-bulk']", "click", () => this._executeBulk());
    onAll("[data-action='close-bulk-preview']", "click", () => { this._bulkPreview = null; this._render(); });
    onAll("[data-action='confirm-bulk']", "click", () => this._confirmBulk());
    onAll("[data-action='export-selected']", "click", () => this._exportSelected());
    onAll("[data-action='save-filter']", "click", () => this._saveCurrentFilter());
    onAll("[data-action='save-filter-pinned']", "click", () => this._saveCurrentFilter({ pinned: true }));
    onAll("[data-apply-filter]", "click", el => this._applySavedFilter(el.dataset.applyFilter));
    onAll("[data-delete-filter]", "click", el => this._deleteSavedFilter(el.dataset.deleteFilter));

    // Data safety and recovery.
    onAll("[data-action='export-data']", "click", () => this._exportData());
    onAll("[data-action='preview-import']", "click", () => this._previewImport());
    onAll("[data-action='import-data']", "click", () => this._importData());
    onAll("[data-action='check-integrity']", "click", () => this._checkIntegrity());
    onAll("[data-action='repair-integrity']", "click", () => this._repairIntegrity());
    onAll("[data-action='create-backup']", "click", () => this._createBackup());
    onAll("[data-pin-backup]", "click", el => this._updateBackup(el.dataset.pinBackup, { pinned: el.dataset.pinned !== "1" }));
    onAll("[data-diff-backup]", "click", el => this._loadBackupDiff(el.dataset.diffBackup));
    onAll("[data-delete-backup]", "click", el => this._deleteBackup(el.dataset.deleteBackup));
    onAll("[data-action='close-backup-diff']", "click", () => { this._backupDiff = null; this._backupDiffId = null; this._restoreTaskIds.clear(); this._render(); });
    onAll("[data-restore-section]", "change", el => { el.checked ? this._restoreSections.add(el.dataset.restoreSection) : this._restoreSections.delete(el.dataset.restoreSection); });
    onAll("[data-restore-task]", "change", el => { el.checked ? this._restoreTaskIds.add(el.dataset.restoreTask) : this._restoreTaskIds.delete(el.dataset.restoreTask); });
    onAll("[data-action='restore-selected-backup']", "click", () => this._restoreSelectedBackup());
    onAll("[data-restore-quarantine]", "click", el => this._restoreQuarantine(el.dataset.restoreQuarantine));
    onAll("[data-delete-quarantine]", "click", el => this._deleteQuarantine(el.dataset.deleteQuarantine));
    onAll("[data-export-quarantine]", "click", el => this._exportQuarantine(el.dataset.exportQuarantine));
    onAll("[data-action='export-quarantine']", "click", () => this._exportQuarantine());

    // Notification controls.
    onAll("[data-action='save-notification-settings']", "click", () => this._saveNotificationSettings());
    onAll("[data-action='test-notification']", "click", () => this._sendNotification(true));
    onAll("[data-action='send-digest']", "click", () => this._sendNotification(false));
    onAll("[data-action='notify-due']", "click", () => this._notifyDueTasks());
    onAll("[data-action='preview-notification']", "click", () => this._previewNotification());
    onAll("[data-action='process-notifications']", "click", () => this._processNotifications());
    onAll("[data-action='cleanup-task-entities']", "click", () => this._cleanupTaskEntities());
    onAll("[data-action='clear-notification-history']", "click", () => this._clearNotificationHistory());
    onAll("[data-action='save-general-settings']", "click", () => this._saveGeneralSettings());
    onAll("[data-action='undo-reorder']", "click", () => this._undoReorder());

    // Templates and onboarding.
    onAll("[data-action='select-visible']", "click", () => { this._filteredTemplates().forEach(t => this._selectedTemplates.add(t.id)); this._render(); });
    onAll("[data-action='clear-template-selection']", "click", () => { this._selectedTemplates.clear(); this._render(); });
    onAll("[data-template-category]", "click", el => { this._templateCategory = el.dataset.templateCategory; this._render(); this._scrollTemplateResults(); });
    onAll("[data-action='add-selected']", "click", () => this._addSelectedTemplates());
    onAll("[data-add-pack]", "click", el => this._addStarterPack(el.dataset.addPack));
    onAll("[data-action='toggle-starter-packs']", "click", () => { this._starterPacksCollapsed = !this._starterPacksCollapsed; this._render(); });
    onAll("[data-pack-toggle]", "click", el => { const id = el.dataset.packToggle; this._selectedPacks.has(id) ? this._selectedPacks.delete(id) : this._selectedPacks.add(id); this._render(); });
    onAll("[data-action='apply-onboarding']", "click", () => this._applyOnboarding());
    onAll("[data-action='open-onboarding']", "click", () => { this._onboardingDialog = true; this._selectedPacks.clear(); this._render(); });
    onAll("[data-action='skip-onboarding']", "click", () => this._skipOnboarding());

    // Editor-specific controls. Prevent button clicks from submitting/re-opening the dialog.
    onAll("[data-action='random-colors']", "click", (_el, e) => { e.preventDefault(); e.stopPropagation(); this._randomizeColors("both"); });
    onAll("[data-action='random-icon-color']", "click", (_el, e) => { e.preventDefault(); e.stopPropagation(); this._randomizeColors("icon"); });
    onAll("[data-action='random-card-color']", "click", (_el, e) => { e.preventDefault(); e.stopPropagation(); this._randomizeColors("card"); });
    onAll("[data-action='clear-colors']", "click", (_el, e) => { e.preventDefault(); e.stopPropagation(); this._draft.icon_color = ""; this._draft.card_color = ""; this._render(); });
    onAll("[data-action='add-checklist-item']", "click", (_el, e) => { e.preventDefault(); e.stopPropagation(); this._addDraftChecklistItem(); });
    onAll("[data-action='remove-checklist-item']", "click", (el, e) => { e.preventDefault(); e.stopPropagation(); this._removeDraftChecklistItem(Number(el.dataset.checklistIndex)); });
    onAll("[data-workflow-preset]", "click", (el, e) => { e.preventDefault(); e.stopPropagation(); this._applyWorkflowPreset(el.dataset.workflowPreset); });
    onAll("[data-draft-checklist-label]", "input", (el, event) => this._updateDraftChecklistItem(Number(el.dataset.draftChecklistLabel), "label", event.target.value));
    onAll("[data-draft-checklist-done]", "change", (el, event) => this._updateDraftChecklistItem(Number(el.dataset.draftChecklistDone), "done", event.target.checked));
    onAll("[data-draft-checklist-required]", "change", (el, event) => this._updateDraftChecklistItem(Number(el.dataset.draftChecklistRequired), "required", event.target.checked));

    // Basic controls.
    on("search", "input", e => { this._search = e.target.value; this._renderSoon(180); });
    on("statusFilter", "change", e => { this._statusFilter = e.target.value; this._render(); });
    on("sortMode", "change", e => { this._sortMode = e.target.value; this._render(); });
    on("categoryFilter", "change", e => { this._categoryFilter = e.target.value; this._render(); });
    on("areaFilter", "change", e => { this._areaFilter = e.target.value; this._render(); });
    on("priorityFilter", "change", e => { this._priorityFilter = e.target.value; this._render(); });
    on("scheduleFilter", "change", e => { this._scheduleFilter = e.target.value; this._render(); });
    on("dueFilter", "change", e => { this._dueFilter = e.target.value; this._render(); });
    on("tagFilter", "input", e => { this._tagFilter = e.target.value; this._renderSoon(150); });
    on("entityFilter", "change", e => { this._entityFilter = e.target.value; this._render(); });
    on("savedFilterName", "input", e => { this._savedFilterName = e.target.value; });
    on("bulkAction", "change", e => { this._bulkAction = e.target.value; this._bulkValue = ""; this._render(); });
    on("bulkValue", "input", e => { this._bulkValue = e.target.value; });
    on("templateSeason", "change", e => { this._templateSeason = e.target.value; this._render(); this._scrollTemplateResults(); });
    on("templateCommon", "change", e => { this._templateOnlyCommon = e.target.checked; this._render(); this._scrollTemplateResults(); });
    on("templatePicker", "input", e => { this._setTemplateDraft(e.target.value); this._renderSoon(120); });
    on("historySearch", "input", e => { this._historySearch = e.target.value; this._renderSoon(150); });
    on("historyType", "change", e => { this._historyType = e.target.value; this._render(); });
    on("historyRange", "change", e => { this._historyRange = e.target.value; this._render(); });
    on("historyTask", "change", e => { this._historyTask = e.target.value; this._render(); });
    on("notificationPreviewTask", "change", e => { this._notificationPreviewTask = e.target.value; this._notificationPreview = null; this._render(); });
    on("importPayload", "input", e => { this._importPayload = e.target.value; this._importPreview = null; });
    on("importMode", "change", e => { this._importMode = e.target.value; this._importPreview = null; this._render(); });
    on("importDuplicateMode", "change", e => { this._importDuplicateMode = e.target.value; this._importPreview = null; this._render(); });
    on("backupName", "input", e => { this._backupName = e.target.value; });
    on("backupPinned", "change", e => { this._backupPinned = e.target.checked; });
    on("notifyService", "input", e => { this._notifyService = e.target.value; });
    on("taskNoteDraft", "input", e => { this._taskNoteDraft = e.target.value; });
    on("templateImportPayload", "input", e => { this._templateImportPayload = e.target.value; this._templateImportPreview = null; });
    on("completionAttachmentInput", "change", e => { const file = e.target.files?.[0]; if (file) this._uploadCompletionAttachment(file); e.target.value = ""; });

    // Task actions and ordering.
    onAll("[data-edit]", "click", el => this._openEdit(el.dataset.edit));
    onAll("[data-done]", "click", (el, e) => { e.preventDefault(); e.stopPropagation(); this._openCompletion(el.dataset.done); });
    onAll("[data-task-card]", "click", (el, e) => {
      if (e.target.closest("button,a,input,select,textarea,label")) return;
      this._taskDetailId = el.dataset.taskCard || "";
      this._taskNoteDraft = "";
      this._render();
    });
    onAll("[data-action='save-task-note']", "click", () => this._saveTaskNote());
    onAll("[data-toggle-checklist]", "change", (el, event) => { const [id, index] = el.dataset.toggleChecklist.split(":"); this._toggleChecklistItem(id, Number(index), event.target.checked); });
    onAll("[data-reactivate]", "click", el => this._reactivate(el.dataset.reactivate));
    onAll("[data-workflow-state]", "click", el => this._setWorkflowState(el.dataset.taskId, el.dataset.workflowState));
    onAll("[data-workflow-menu]", "click", el => { this._workflowMenu = this._workflowMenu === el.dataset.workflowMenu ? null : el.dataset.workflowMenu; this._render(); });
    onAll("[data-reset-task-progress]", "click", el => this._resetTaskProgress(el.dataset.resetTaskProgress));
    onAll("[data-restart-task-cycle]", "click", el => this._restartTaskCycle(el.dataset.restartTaskCycle));
    onAll("[data-skip-task-cycle]", "click", el => this._skipTaskCycle(el.dataset.skipTaskCycle));
    onAll("[data-snooze-menu]", "click", el => { this._snoozeMenu = this._snoozeMenu === el.dataset.snoozeMenu ? null : el.dataset.snoozeMenu; this._render(); });
    onAll("[data-snooze-days]", "click", el => { const [id, days] = el.dataset.snoozeDays.split(":"); this._snooze(id, Number(days)); });
    onAll("[data-clear-snooze]", "click", el => this._clearSnooze(el.dataset.clearSnooze));
    onAll("[data-delete]", "click", el => this._delete(el.dataset.delete));
    onAll("[data-undo]", "click", el => this._undo(el.dataset.undo));
    onAll("[data-restore]", "click", el => this._restoreBackup(el.dataset.restore));
    onAll("[data-copy-diagnostics]", "click", el => { navigator.clipboard?.writeText(el.dataset.copyDiagnostics || ""); this._showToast(this._t("copyDiagnostics")); });
    onAll("[data-template]", "click", (el, e) => { e.stopPropagation(); this._openCreate(this._template(el.dataset.template)); this._templatePreview = null; });
    onAll("[data-template-favorite]", "click", (el, e) => { e.preventDefault(); e.stopPropagation(); this._toggleTemplateFavorite(el.dataset.templateFavorite); });
    onAll("[data-template-preview],[data-template-preview-btn]", "click", (el, e) => { e.stopPropagation(); this._templatePreview = el.dataset.templatePreview || el.dataset.templatePreviewBtn; this._render(); });
    onAll("[data-template-check]", "change", el => { el.checked ? this._selectedTemplates.add(el.dataset.templateCheck) : this._selectedTemplates.delete(el.dataset.templateCheck); this._render(); });
    onAll("[data-apply-template]", "click", el => { this._applyTemplate(this._template(el.dataset.applyTemplate)); this._templateDraftId = el.dataset.applyTemplate || ""; this._render(); });
    onAll("[data-move]", "click", el => { const [id, dir] = el.dataset.move.split(":"); this._move(id, dir === "up" ? -1 : 1); });
    onAll("[data-keyboard-reorder]", "keydown", (el, e) => { if (e.key === "ArrowUp") { e.preventDefault(); this._move(el.dataset.keyboardReorder, -1); } else if (e.key === "ArrowDown") { e.preventDefault(); this._move(el.dataset.keyboardReorder, 1); } });
    onAll("[data-drag]", "dragstart", el => { this._dragTaskId = el.dataset.drag; el.classList.add("dragging"); });
    onAll("[data-drag]", "dragend", el => { el.classList.remove("dragging"); this.shadowRoot.querySelectorAll(".drop-target").forEach(row => row.classList.remove("drop-target")); });
    onAll("[data-drag]", "dragover", (el, e) => { e.preventDefault(); el.classList.add("drop-target"); });
    onAll("[data-drag]", "dragleave", el => el.classList.remove("drop-target"));
    onAll("[data-drag]", "drop", el => { el.classList.remove("drop-target"); this._dropOn(el.dataset.drop); });
    onAll("[data-drag]", "pointerdown", (el, e) => { if (e.pointerType === "mouse") return; clearTimeout(this._longPressTimer); this._longPressTimer = setTimeout(() => { this._dragTaskId = el.dataset.drag; el.classList.add("dragging"); this._showToast(this._t("dragHint")); }, 500); });
    onAll("[data-drag]", "pointerenter", el => { if (this._dragTaskId) el.classList.add("drop-target"); });
    onAll("[data-drag]", "pointerleave", el => { if (this._dragTaskId) el.classList.remove("drop-target"); });
    onAll("[data-drag]", "pointerup", el => { clearTimeout(this._longPressTimer); if (this._dragTaskId && this._dragTaskId !== el.dataset.drop) this._dropOn(el.dataset.drop); el.classList.remove("dragging"); });
    onAll("[data-draft]", "input", (_el, e) => this._draftChange(e));
    onAll("select[data-draft]", "change", (_el, e) => this._draftChange(e));

    const picker = this.shadowRoot.getElementById("entityPicker");
    if (picker) { picker.hass = this.hass; picker.value = this._draft.entity_id; picker.addEventListener("value-changed", e => { this._draft.entity_id = String(e.detail?.value || ""); }); }
    const iconHost = this.shadowRoot.getElementById("iconHost"); if (iconHost) this._mountIconPicker(iconHost);
    const completionBindings = { completionNote: "_completionNote", completionMaterial: "_completionMaterial", completionCost: "_completionCost", completionCurrency: "_completionCurrency", completionPerformedBy: "_completionPerformedBy" };
    Object.entries(completionBindings).forEach(([id, property]) => on(id, "input", event => { this[property] = event.target.value; }));
  }
});
