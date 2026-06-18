// Settings view rendering for dashboard, recovery, native HA platforms and task ordering.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _settingsHtml() {
    const tasks = this._filteredTasks(true).sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
    const settings = this._state?.settings || {};
    const dashboard = settings.dashboard || {};
    const backups = settings.backups || {};
    const integrity = settings.data_integrity || {};
    const workflow = settings.workflow || {};
    const workflowDefaults = workflow.default_completion_requirements || {};
    const native = settings.native_platforms || {};
    const notifications = settings.notifications || {};
    const tabs = [
      ["general", "mdi:tune-variant", this._t("general")],
      ["data", "mdi:database-cog-outline", this._t("dataSafety")],
      ["workflow", "mdi:timeline-check-outline", this._t("workflow")],
      ["platforms", "mdi:home-assistant", this._t("nativePlatforms")],
      ["manual", "mdi:sort-variant", this._t("sortPosition")],
      ["notifications", "mdi:bell-outline", this._t("notifications")],
    ];
    const activeTab = ["general", "data", "workflow", "platforms", "manual", "notifications"].includes(this._settingsTab) ? this._settingsTab : "general";
    return `
      <section class="page-header page-header-compact settings-head">
        <div><h1>${this._t("settings")}</h1><p>${this._t("settingsDescription")}</p></div>
        <div class="settings-utility-bar">
          <button class="ghost" data-action="open-onboarding"><ha-icon icon="mdi:rocket-launch-outline"></ha-icon>${this._t("onboarding")}</button>
          <button class="ghost" data-action="diagnostics"><ha-icon icon="mdi:alert-circle-outline"></ha-icon>${this._t("diagnostics")}</button>
        </div>
      </section>

      <nav class="settings-nav segmented-tabs" aria-label="${this._t("settings")}">
        ${tabs.map(([id, icon, label]) => `<button class="tab ${activeTab === id ? "active" : ""}" data-settings-tab="${id}"><ha-icon icon="${icon}"></ha-icon><span>${label}</span></button>`).join("")}
      </nav>

      <section class="settings-stack">
        ${activeTab === "general" ? `<article class="panel settings-section" id="dashboard-settings">
          <header><ha-icon icon="mdi:view-dashboard-edit-outline"></ha-icon><div><h3>${this._t("dashboardLayout")}</h3><p>${this._t("dashboardSurfaceHint")}</p></div></header>
          <div class="settings-section-grid three-column"><label class="field"><span>${this._t("dashboardLayout")}</span><select id="dashboardViewMode">${["cards","compact","timeline"].map(mode => `<option value="${mode}" ${(dashboard.view_mode || "cards") === mode ? "selected" : ""}>${this._t(`${mode}View`)}</option>`).join("")}</select></label><label class="field"><span>${this._t("dashboardDensity")}</span><select id="dashboardDensity"><option value="comfortable" ${(dashboard.density || "comfortable") !== "compact" ? "selected" : ""}>${this._t("densityComfortable")}</option><option value="compact" ${dashboard.density === "compact" ? "selected" : ""}>${this._t("densityCompact")}</option></select></label><label class="field"><span>${this._t("defaultDueFilter")}</span><select id="dashboardDefaultDue">${["all","overdue","today","week","next14","month","next90","later","no_due"].map(value => `<option value="${value}" ${(dashboard.default_due_filter || "all") === value ? "selected" : ""}>${this._dueFilterLabel(value)}</option>`).join("")}</select></label></div>
          <div class="check-grid"><label class="check"><input id="dashboardQuickFilters" type="checkbox" ${dashboard.show_quick_filters !== false ? "checked" : ""}>${this._t("showQuickFilters")}</label><label class="check"><input id="dashboardRememberView" type="checkbox" ${dashboard.remember_last_view !== false ? "checked" : ""}>${this._t("rememberDashboardView")}</label></div>
          <footer class="settings-section-footer"><button class="primary big" data-action="save-general-settings"><ha-icon icon="mdi:content-save"></ha-icon>${this._t("saveDashboardSettings")}</button></footer>
        </article>` : ""}

        ${activeTab === "data" ? `<article class="panel settings-section" id="data-settings">
          <header><ha-icon icon="mdi:backup-restore"></ha-icon><div><h3>${this._t("dataSafety")}</h3><p>${this._t("backupRotation")} · ${this._t("dataIntegrity")}</p></div></header>
          <div class="settings-section-grid two-column">
            <div class="settings-subpanel"><h4>${this._t("backupRotation")}</h4><div class="form-grid"><label class="field"><span>${this._t("maximumBackups")}</span><input id="maximumBackups" type="number" min="1" max="500" value="${Number(backups.maximum_count || 30)}"></label><label class="field"><span>${this._t("maximumBackupAge")}</span><input id="maximumBackupAge" type="number" min="1" max="3650" value="${Number(backups.maximum_age_days || 90)}"></label></div><div class="check-grid">
            ${[
              ["beforeTaskUpdate","before_task_update",this._t("backupBeforeTaskUpdate")],
              ["beforeTaskDelete","before_task_delete",this._t("backupBeforeTaskDelete")],
              ["beforeImport","before_import",this._t("backupBeforeImport")],
              ["beforeMigration","before_migration",this._t("backupBeforeMigration")],
              ["beforeRestore","before_restore",this._t("backupBeforeRestore")],
              ["beforeBulk","before_bulk_operation",this._t("backupBeforeBulk")],
            ].map(([id,key,label]) => `<label class="check"><input id="${id}" type="checkbox" ${backups[key] !== false ? "checked" : ""}>${label}</label>`).join("")}
          </div></div><div class="settings-subpanel"><h4>${this._t("dataIntegrity")}</h4><div class="check-grid"><label class="check"><input id="checkIntegrityOnStart" type="checkbox" ${integrity.check_on_start !== false ? "checked" : ""}>${this._t("integrityCheckOnStart")}</label><label class="check"><input id="quarantineInvalidRecords" type="checkbox" ${integrity.quarantine_invalid_records !== false ? "checked" : ""}>${this._t("quarantineInvalidRecords")}</label></div><div class="form-grid"><label class="field"><span>${this._t("auditRetention")}</span><input id="auditRetention" type="number" min="100" max="10000" value="${Number(integrity.audit_retention || 1000)}"></label><label class="field"><span>${this._t("quarantineRetention")}</span><input id="quarantineRetention" type="number" min="20" max="5000" value="${Number(integrity.quarantine_retention || 200)}"></label></div><div class="settings-inline-actions"><button class="ghost" data-action="data-dialog"><ha-icon icon="mdi:database-search-outline"></ha-icon>${this._t("backupRestore")}</button></div></div>
          </div>
          <footer class="settings-section-footer"><button class="primary big" data-action="save-general-settings"><ha-icon icon="mdi:content-save"></ha-icon>${this._t("saveDashboardSettings")}</button></footer>
        </article>` : ""}

        ${activeTab === "workflow" ? `<article class="panel settings-section" id="workflow-settings">
          <header><ha-icon icon="mdi:timeline-check-outline"></ha-icon><div><h3>${this._t("workflow")}</h3><p>${this._t("workflowSettingsHint")}</p></div></header>
          <div class="settings-section-grid two-column">
            <div class="settings-subpanel"><h4>${this._t("workflowDefaults")}</h4><div class="form-grid"><label class="field"><span>${this._t("defaultWorkflowState")}</span><select id="defaultWorkflowState">${["planned","ready","in_progress","blocked"].map(state => `<option value="${state}" ${(workflow.default_state || "planned") === state ? "selected" : ""}>${this._workflowStateLabel(state)}</option>`).join("")}</select></label><label class="field"><span>${this._t("defaultTaskRelevance")}</span><select id="defaultRecurrenceMode">${["standard","persistent"].map(mode => `<option value="${mode}" ${(workflow.default_recurrence_mode || "standard") === mode ? "selected" : ""}>${this._t(mode === "persistent" ? "recurrencePersistent" : "recurrenceStandard")}</option>`).join("")}</select></label><label class="field"><span>${this._t("persistentDefaultState")}</span><select id="persistentDefaultState">${["planned","ready","in_progress","blocked"].map(state => `<option value="${state}" ${(workflow.persistent_default_state || "ready") === state ? "selected" : ""}>${this._workflowStateLabel(state)}</option>`).join("")}</select></label></div><div class="check-grid"><label class="check"><input id="workflowShowChecklists" type="checkbox" ${workflow.show_checklists !== false ? "checked" : ""}>${this._t("showChecklists")}</label><label class="check"><input id="workflowResetChecklist" type="checkbox" ${workflow.reset_checklist_on_completion !== false ? "checked" : ""}>${this._t("resetChecklistOnCompletion")}</label></div></div>
            <div class="settings-subpanel"><h4>${this._t("completionRequirements")}</h4><div class="check-grid">
              <label class="check"><input id="workflowRequireNote" type="checkbox" ${workflowDefaults.note ? "checked" : ""}>${this._t("completionRequirementNote")}</label>
              <label class="check"><input id="workflowRequireMaterial" type="checkbox" ${workflowDefaults.material ? "checked" : ""}>${this._t("completionRequirementMaterial")}</label>
              <label class="check"><input id="workflowRequireCost" type="checkbox" ${workflowDefaults.cost ? "checked" : ""}>${this._t("completionRequirementCost")}</label>
              <label class="check"><input id="workflowRequirePerformedBy" type="checkbox" ${workflowDefaults.performed_by ? "checked" : ""}>${this._t("completionRequirementPerformedBy")}</label>
              <label class="check"><input id="workflowRequireChecklist" type="checkbox" ${workflowDefaults.checklist ? "checked" : ""}>${this._t("completionRequirementChecklist")}</label>
            </div></div>
          </div>
          <footer class="settings-section-footer"><button class="primary big" data-action="save-general-settings"><ha-icon icon="mdi:content-save"></ha-icon>${this._t("saveDashboardSettings")}</button></footer>
        </article>` : ""}

        ${activeTab === "platforms" ? `<article class="panel settings-section expressive platform-settings-card" id="platform-settings">
          <header><ha-icon icon="mdi:home-assistant"></ha-icon><div><h3>${this._t("nativePlatformsTitle")}</h3><p>${this._t("nativePlatformsHint")}</p></div></header>
          <div class="platform-status-grid">
            <article><ha-icon icon="mdi:format-list-checkbox"></ha-icon><div><strong>${this._t("todoPlatform")}</strong><p>${this._t("todoEntityHint")}</p><code>todo.maintenance_dashboard_tasks</code></div><span class="status ${native.todo_enabled !== false ? "ok" : "warning"}">${native.todo_enabled !== false ? this._t("enabled") : this._t("disabled")}</span></article>
            <article><ha-icon icon="mdi:calendar-sync"></ha-icon><div><strong>${this._t("calendarPlatform")}</strong><p>${this._t("calendarEntityHint")}</p><code>calendar.maintenance_dashboard_schedule</code></div><span class="status ${native.calendar_enabled !== false ? "ok" : "warning"}">${native.calendar_enabled !== false ? this._t("enabled") : this._t("disabled")}</span></article>
          </div>
          <div class="check-grid platform-grid">
            <label class="check"><input id="todoPlatformEnabled" type="checkbox" ${native.todo_enabled !== false ? "checked" : ""}>${this._t("todoPlatform")}</label>
            <label class="check"><input id="todoIncludeDisabled" type="checkbox" ${native.todo_include_disabled === true ? "checked" : ""}>${this._t("todoIncludeDisabled")}</label>
            <label class="check"><input id="calendarPlatformEnabled" type="checkbox" ${native.calendar_enabled !== false ? "checked" : ""}>${this._t("calendarPlatform")}</label>
            <label class="check"><input id="calendarIncludeSnoozed" type="checkbox" ${native.calendar_include_snoozed === true ? "checked" : ""}>${this._t("calendarIncludeSnoozed")}</label>
          </div>
          <div class="form-grid"><label class="field"><span>${this._t("calendarDuration")}</span><input id="calendarEventDuration" type="number" min="15" max="1440" step="15" value="${Number(native.calendar_event_duration_minutes || 60)}"></label></div>
          <footer class="settings-section-footer"><button class="primary big" data-action="save-general-settings"><ha-icon icon="mdi:content-save"></ha-icon>${this._t("saveDashboardSettings")}</button></footer>
        </article>` : ""}

        ${activeTab === "manual" ? `<article class="panel settings-section" id="ordering-settings">
          <header><ha-icon icon="mdi:sort-variant"></ha-icon><div><h3>${this._t("sortPosition")}</h3><p>${this._t("dragHint")}</p></div></header>
          <div class="settings-ordering-head">${this._lastOrder ? `<button class="ghost" data-action="undo-reorder"><ha-icon icon="mdi:undo"></ha-icon>${this._t("undo")}</button>` : ""}<button class="primary big" data-action="save-general-settings"><ha-icon icon="mdi:content-save"></ha-icon>${this._t("saveDashboardSettings")}</button></div>
          <section class="settings-list">${tasks.map((t, idx) => `<article class="settings-row" draggable="true" data-drag="${t.id}" data-drop="${t.id}"><button class="drag icon" type="button" data-keyboard-reorder="${t.id}" aria-label="${this._t("dragHint")}"><ha-icon icon="mdi:drag"></ha-icon></button><ha-icon icon="${this._html(t.icon)}"></ha-icon><div><strong>${this._html(t.name)}</strong><small>${this._categoryLabel(t)} · ${this._scheduleSummary(t)} · ${this._t("priority")} ${t.priority}/5</small></div><button class="icon" data-move="${t.id}:up" ${idx === 0 ? "disabled" : ""}><ha-icon icon="mdi:chevron-up"></ha-icon></button><button class="icon" data-move="${t.id}:down" ${idx === tasks.length - 1 ? "disabled" : ""}><ha-icon icon="mdi:chevron-down"></ha-icon></button><button class="icon" data-edit="${t.id}"><ha-icon icon="mdi:pencil"></ha-icon></button><button class="icon danger" data-delete="${t.id}"><ha-icon icon="mdi:delete-outline"></ha-icon></button></article>`).join("")}</section>
        </article>` : ""}

        ${activeTab === "notifications" ? `<article class="panel settings-section" id="notification-settings">
          <header><ha-icon icon="mdi:bell-outline"></ha-icon><div><h3>${this._t("notifications")}</h3><p>${this._t("notificationRulesHint")}</p></div></header>
          <div class="settings-section-grid two-column">
            <div class="settings-subpanel"><h4>${this._t("notificationRules")}</h4><div class="form-grid"><label class="field"><span>${this._t("notifyService")}</span><input id="notifyService" value="${this._html(notifications.notify_service || "")}" placeholder="notify.mobile_app_phone"></label><label class="field"><span>${this._t("digestTime")}</span><input id="digestTime" type="time" value="${this._html(notifications.digest_time || "08:00")}"></label><label class="field"><span>${this._t("repeatEveryDays")}</span><input id="notificationRepeatDays" type="number" min="0" max="365" value="${this._html(notifications.repeat_days ?? 3)}"></label><label class="field"><span>${this._t("escalationAfterDays")}</span><input id="notificationEscalationDays" type="number" min="0" max="365" value="${this._html(notifications.escalation_after_days ?? 3)}"></label><label class="field"><span>${this._t("actionSnoozeDays")}</span><input id="actionSnoozeDays" type="number" min="1" max="365" value="${this._html(notifications.action_snooze_days ?? 7)}"></label><label class="field"><span>${this._t("notificationHistoryRetention")}</span><input id="notificationHistoryRetention" type="number" min="20" max="2000" value="${this._html(notifications.history_retention ?? 200)}"></label></div></div>
            <div class="settings-subpanel"><h4>${this._t("notifications")}</h4><div class="check-grid"><label class="check"><input id="notifyEnabled" type="checkbox" ${notifications.enabled !== false ? "checked" : ""}>${this._t("enabled")}</label><label class="check"><input id="notifyWarning" type="checkbox" ${notifications.warning !== false ? "checked" : ""}>${this._t("warningNotifications")}</label><label class="check"><input id="notifyCritical" type="checkbox" ${notifications.critical !== false ? "checked" : ""}>${this._t("criticalNotifications")}</label><label class="check"><input id="notifyOverdue" type="checkbox" ${notifications.overdue !== false ? "checked" : ""}>${this._t("overdueNotifications")}</label><label class="check"><input id="notifyDue" type="checkbox" ${notifications.due !== false ? "checked" : ""}>${this._t("dueNotifications")}</label><label class="check"><input id="dailyDigest" type="checkbox" ${notifications.daily_digest ? "checked" : ""}>${this._t("dailyDigest")}</label><label class="check"><input id="notificationEscalation" type="checkbox" ${notifications.escalation_enabled !== false ? "checked" : ""}>${this._t("escalation")}</label><label class="check"><input id="actionableNotifications" type="checkbox" ${notifications.actionable !== false ? "checked" : ""}>${this._t("actionableNotifications")}</label></div></div>
          </div>
          <footer class="settings-section-footer"><button class="ghost" data-action="notification-dialog"><ha-icon icon="mdi:tune-variant"></ha-icon>${this._t("advancedSettings")}</button><button class="ghost" data-action="test-notification"><ha-icon icon="mdi:bell-ring-outline"></ha-icon>${this._t("testNotification")}</button><button class="primary big" data-action="save-notification-settings"><ha-icon icon="mdi:content-save"></ha-icon>${this._t("save")}</button></footer>
        </article>` : ""}
      </section>
    `;
  }
});
