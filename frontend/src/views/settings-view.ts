// Settings view rendering for dashboard, recovery, native HA platforms and task ordering.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _settingsHtml() {
    const tasks = this._filteredTasks(true).sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
    const settings = this._state?.settings || {};
    const dashboard = settings.dashboard || {};
    const backups = settings.backups || {};
    const integrity = settings.data_integrity || {};
    const native = settings.native_platforms || {};
    return `
      <section class="panel settings-head"><div><h2>${this._t("settings")}</h2><p>${this._t("settingsIntro")}</p></div><div class="settings-actions">
        <button class="ghost" data-action="open-onboarding"><ha-icon icon="mdi:rocket-launch-outline"></ha-icon>${this._t("onboarding")}</button>
        <button class="ghost" data-action="data-dialog"><ha-icon icon="mdi:database-cog-outline"></ha-icon>${this._t("dataSafety")}</button>
        <button class="ghost" data-action="notification-dialog"><ha-icon icon="mdi:bell-outline"></ha-icon>${this._t("notifications")}</button>
        <button class="ghost" data-action="diagnostics"><ha-icon icon="mdi:alert-circle-outline"></ha-icon>${this._t("diagnostics")}</button>
      </div></section>

      <section class="settings-grid">
        <article class="panel settings-section">
          <header><ha-icon icon="mdi:view-dashboard-edit-outline"></ha-icon><div><h3>${this._t("dashboardLayout")}</h3><p>${this._t("dashboardSurfaceHint")}</p></div></header>
          <div class="form-grid">
            <label class="field"><span>${this._t("dashboardLayout")}</span><select id="dashboardViewMode">${["cards","compact","timeline"].map(mode => `<option value="${mode}" ${(dashboard.view_mode || "cards") === mode ? "selected" : ""}>${this._t(`${mode}View`)}</option>`).join("")}</select></label>
            <label class="field"><span>${this._t("dashboardDensity")}</span><select id="dashboardDensity"><option value="comfortable" ${(dashboard.density || "comfortable") !== "compact" ? "selected" : ""}>${this._t("densityComfortable")}</option><option value="compact" ${dashboard.density === "compact" ? "selected" : ""}>${this._t("densityCompact")}</option></select></label>
            <label class="field"><span>${this._t("defaultDueFilter")}</span><select id="dashboardDefaultDue">${["all","overdue","today","week","next14","month","next90","later","no_due"].map(value => `<option value="${value}" ${(dashboard.default_due_filter || "all") === value ? "selected" : ""}>${this._dueFilterLabel(value)}</option>`).join("")}</select></label>
          </div>
          <div class="check-grid">
            <label class="check"><input id="dashboardQuickFilters" type="checkbox" ${dashboard.show_quick_filters !== false ? "checked" : ""}>${this._t("showQuickFilters")}</label>
            <label class="check"><input id="dashboardRememberView" type="checkbox" ${dashboard.remember_last_view !== false ? "checked" : ""}>${this._t("rememberDashboardView")}</label>
          </div>
        </article>

        <article class="panel settings-section">
          <header><ha-icon icon="mdi:backup-restore"></ha-icon><div><h3>${this._t("backupRotation")}</h3><p>${this._t("dataSafety")}</p></div></header>
          <div class="form-grid">
            <label class="field"><span>${this._t("maximumBackups")}</span><input id="maximumBackups" type="number" min="1" max="500" value="${Number(backups.maximum_count || 30)}"></label>
            <label class="field"><span>${this._t("maximumBackupAge")}</span><input id="maximumBackupAge" type="number" min="1" max="3650" value="${Number(backups.maximum_age_days || 90)}"></label>
          </div>
          <div class="check-grid">
            ${[
              ["beforeTaskUpdate","before_task_update",this._t("backupBeforeTaskUpdate")],
              ["beforeTaskDelete","before_task_delete",this._t("backupBeforeTaskDelete")],
              ["beforeImport","before_import",this._t("backupBeforeImport")],
              ["beforeMigration","before_migration",this._t("backupBeforeMigration")],
              ["beforeRestore","before_restore",this._t("backupBeforeRestore")],
              ["beforeBulk","before_bulk_operation",this._t("backupBeforeBulk")],
            ].map(([id,key,label]) => `<label class="check"><input id="${id}" type="checkbox" ${backups[key] !== false ? "checked" : ""}>${label}</label>`).join("")}
          </div>
        </article>

        <article class="panel settings-section">
          <header><ha-icon icon="mdi:shield-check-outline"></ha-icon><div><h3>${this._t("dataIntegrity")}</h3><p>${this._t("integrityHealthy")}</p></div></header>
          <div class="check-grid">
            <label class="check"><input id="checkIntegrityOnStart" type="checkbox" ${integrity.check_on_start !== false ? "checked" : ""}>${this._t("integrityCheckOnStart")}</label>
            <label class="check"><input id="quarantineInvalidRecords" type="checkbox" ${integrity.quarantine_invalid_records !== false ? "checked" : ""}>${this._t("quarantineInvalidRecords")}</label>
          </div>
          <div class="form-grid">
            <label class="field"><span>${this._t("auditRetention")}</span><input id="auditRetention" type="number" min="100" max="10000" value="${Number(integrity.audit_retention || 1000)}"></label>
            <label class="field"><span>${this._t("quarantineRetention")}</span><input id="quarantineRetention" type="number" min="20" max="5000" value="${Number(integrity.quarantine_retention || 200)}"></label>
          </div>
        </article>

        <article class="panel settings-section">
          <header><ha-icon icon="mdi:home-assistant"></ha-icon><div><h3>${this._t("nativePlatforms")}</h3><p>${this._t("nativePlatformsHint")}</p></div></header>
          <div class="check-grid">
            <label class="check"><input id="todoPlatformEnabled" type="checkbox" ${native.todo_enabled !== false ? "checked" : ""}>${this._t("todoPlatform")}</label>
            <label class="check"><input id="todoIncludeDisabled" type="checkbox" ${native.todo_include_disabled === true ? "checked" : ""}>${this._t("todoIncludeDisabled")}</label>
            <label class="check"><input id="calendarPlatformEnabled" type="checkbox" ${native.calendar_enabled !== false ? "checked" : ""}>${this._t("calendarPlatform")}</label>
            <label class="check"><input id="calendarIncludeSnoozed" type="checkbox" ${native.calendar_include_snoozed === true ? "checked" : ""}>${this._t("calendarIncludeSnoozed")}</label>
          </div>
          <div class="form-grid">
            <label class="field"><span>${this._t("calendarDuration")}</span><input id="calendarEventDuration" type="number" min="15" max="1440" step="15" value="${Number(native.calendar_event_duration_minutes || 60)}"></label>
          </div>
        </article>
      </section>

      <section class="panel settings-save"><button class="primary big" data-action="save-general-settings"><ha-icon icon="mdi:content-save"></ha-icon>${this._t("saveDashboardSettings")}</button></section>
      <section class="panel ordering-help"><p>${this._t("dragHint")}</p>${this._lastOrder ? `<button class="ghost" data-action="undo-reorder"><ha-icon icon="mdi:undo"></ha-icon>${this._t("undo")}</button>` : ""}</section>
      <section class="settings-list">${tasks.map((t, idx) => `<article class="settings-row" draggable="true" data-drag="${t.id}" data-drop="${t.id}"><button class="drag icon" type="button" data-keyboard-reorder="${t.id}" aria-label="${this._t("dragHint")}"><ha-icon icon="mdi:drag"></ha-icon></button><ha-icon icon="${this._html(t.icon)}"></ha-icon><div><strong>${this._html(t.name)}</strong><small>${this._categoryLabel(t)} · ${this._scheduleSummary(t)} · ${this._t("priority")} ${t.priority}/5</small></div><button class="icon" data-move="${t.id}:up" ${idx === 0 ? "disabled" : ""}><ha-icon icon="mdi:chevron-up"></ha-icon></button><button class="icon" data-move="${t.id}:down" ${idx === tasks.length - 1 ? "disabled" : ""}><ha-icon icon="mdi:chevron-down"></ha-icon></button><button class="icon" data-edit="${t.id}"><ha-icon icon="mdi:pencil"></ha-icon></button><button class="icon danger" data-delete="${t.id}"><ha-icon icon="mdi:delete-outline"></ha-icon></button></article>`).join("")}</section>
    `;
  }
});
