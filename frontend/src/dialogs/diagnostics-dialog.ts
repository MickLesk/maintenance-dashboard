// Extended diagnostics and structured integrity report.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _diagnosticsHtml() {
    if (!this._diagnostics) return "";
    const diag = this._state?.diagnostics || [];
    const integrity = this._integrityResult || this._state?.integrity || {};
    const notificationState = this._state?.notification_state || {};
    const notificationHistory = Array.isArray(notificationState.history) ? notificationState.history : [];
    const notificationSettings = this._state?.settings?.notifications || {};
    const entitySettings = this._state?.settings?.task_entities || {};
    const meta = this._state?.meta || {};
    const lastDigest = notificationState?.last_sent?.digest;
    const lastDigestAt = typeof lastDigest === "object" ? lastDigest?.at : lastDigest;
    const payload = {
      integration_version: VERSION,
      frontend_version: VERSION,
      schema_version: this._state?.schema_version,
      task_count: (this._state?.tasks || []).length,
      history_count: (this._state?.history || []).length,
      backup_count: (this._state?.backups || []).length,
      quarantine_count: (this._state?.quarantine || []).length,
      audit_count: (this._state?.audit || []).length,
      summary: this._state?.summary,
      diagnostics: diag,
      integrity,
      settings: this._state?.settings,
      meta,
      notification_state: notificationState,
      loaded_at: new Date().toISOString(),
    };
    return `<div class="dialog-backdrop"><section class="dialog wide diagnostics-dialog"><header><div class="dialog-title-block"><h2>${this._t("diagnostics")}</h2><p class="section-hint">${this._t("settingsIntro")}</p></div><button class="icon" data-action="close-diagnostics"><ha-icon icon="mdi:close"></ha-icon></button></header><div class="dialog-body">
      <section class="dialog-section"><div class="diagnostic-grid">
        <div><span>${this._t("integrationLabel")}</span><strong>${VERSION}</strong></div><div><span>${this._t("frontendLabel")}</span><strong>${VERSION}</strong></div><div><span>${this._t("schemaLabel")}</span><strong>${this._state?.schema_version ?? "—"}</strong></div>
        <div><span>${this._t("taskLabel")}</span><strong>${payload.task_count}</strong></div><div><span>${this._t("historyLabel")}</span><strong>${payload.history_count}</strong></div><div><span>${this._t("backups")}</span><strong>${payload.backup_count}</strong></div>
        <div><span>${this._t("quarantine")}</span><strong>${payload.quarantine_count}</strong></div><div><span>${this._t("auditLog")}</span><strong>${payload.audit_count}</strong></div><div><span>${this._t("notificationHistory")}</span><strong>${notificationHistory.length}</strong></div>
        <div><span>${this._t("lastDigest")}</span><strong>${lastDigestAt ? this._datetime(lastDigestAt) : "—"}</strong></div><div><span>${this._t("lastAutomaticBackup")}</span><strong>${meta.last_automatic_backup?.created_at ? this._datetime(meta.last_automatic_backup.created_at) : "—"}</strong></div><div><span>${this._t("pendingRepairs")}</span><strong>${integrity.errors || 0}</strong></div>
        <div><span>${this._t("taskEntities")}</span><strong>${this._t(entitySettings.mode || "off")}</strong></div><div><span>${this._t("notifications")}</span><strong>${notificationSettings.enabled ? this._t("enabled") : this._t("off")}</strong></div><div><span>${this._t("testMode")}</span><strong>${notificationSettings.test_mode ? this._t("enabled") : this._t("off")}</strong></div>
      </div></section>
      <section class="dialog-section integrity-summary ${integrity.healthy ? "healthy" : "has-errors"}"><div class="section-title-actions"><div><h3>${this._t("dataIntegrity")}</h3><p>${integrity.healthy ? this._t("integrityHealthy") : `${integrity.errors || 0} ${this._t("integrityErrors")} · ${integrity.warnings || 0} ${this._t("integrityWarnings")}`}</p></div><div class="button-row"><button class="ghost" data-action="check-integrity"><ha-icon icon="mdi:shield-search-outline"></ha-icon>${this._t("runIntegrityCheck")}</button><button class="primary" data-action="repair-integrity" ${integrity.repairable ? "" : "disabled"}><ha-icon icon="mdi:shield-sync-outline"></ha-icon>${this._t("repairIntegrity")}</button></div></div>
        ${(integrity.issues || []).map(issue => `<p class="${this._html(issue.severity || "warning")}"><strong>${this._html(issue.code || issue.message)}</strong>${issue.task_id ? ` · ${this._html(issue.task_id)}` : ""}</p>`).join("") || `<p>${this._t("ok")}</p>`}
      </section>
      <section class="dialog-section"><h3>${this._t("migration")}</h3>${meta.last_migration ? `<pre>${this._html(JSON.stringify(meta.last_migration, null, 2))}</pre>` : `<p>—</p>`}</section>
      <section class="dialog-section"><h3>${this._t("diagnostics")}</h3>${diag.length ? diag.map(i => `<p class="${this._html(i.severity || "warning")}">${this._html(i.task_id || this._t("globalLabel"))}: ${this._html(i.message)}</p>`).join("") : `<p>${this._t("ok")}</p>`}</section>
      <section class="dialog-section"><div class="button-row"><button class="ghost" data-copy-diagnostics="${this._html(JSON.stringify(payload))}"><ha-icon icon="mdi:content-copy"></ha-icon>${this._t("copyDiagnostics")}</button><button class="ghost" data-action="data-dialog"><ha-icon icon="mdi:database-cog-outline"></ha-icon>${this._t("dataSafety")}</button></div></section>
    </div></section></div>`;
  }
});
