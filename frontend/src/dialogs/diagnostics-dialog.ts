// Extended diagnostics dialog rendering.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _diagnosticsHtml() {
    if (!this._diagnostics) return "";
    const diag = this._state.diagnostics || [];
    const notificationState = this._state.notification_state || {};
    const notificationHistory = Array.isArray(notificationState.history) ? notificationState.history : [];
    const notificationSettings = this._state?.settings?.notifications || {};
    const entitySettings = this._state?.settings?.task_entities || {};
    const lastDigest = notificationState?.last_sent?.digest;
    const lastDigestAt = typeof lastDigest === "object" ? lastDigest?.at : lastDigest;
    const payload = {
      integration_version: VERSION,
      frontend_version: VERSION,
      store_version: this._state.version,
      panel_url: `/api/maintenance_dashboard/static/maintenance-dashboard-panel.js?v=${VERSION}`,
      task_count: (this._state.tasks || []).length,
      history_count: (this._state.history || []).length,
      backup_count: (this._state.backups || []).length,
      notification_history_count: notificationHistory.length,
      last_digest_at: lastDigestAt || null,
      summary: this._state.summary,
      diagnostics: diag,
      language: this._lang(),
      loaded_at: new Date().toISOString(),
      settings: this._state.settings,
      notification_state: notificationState,
    };
    return `<div class="dialog-backdrop"><section class="dialog"><header><h2>${this._t("diagnostics")}</h2><button class="icon" data-action="close-diagnostics"><ha-icon icon="mdi:close"></ha-icon></button></header><div class="dialog-body"><section class="dialog-section"><h3>${this._t("diagnostics")}</h3><div class="diagnostic-grid"><div><span>Integration</span><strong>${VERSION}</strong></div><div><span>Frontend</span><strong>${VERSION}</strong></div><div><span>Store</span><strong>${this._state.version}</strong></div><div><span>Tasks</span><strong>${payload.task_count}</strong></div><div><span>History</span><strong>${payload.history_count}</strong></div><div><span>Backups</span><strong>${payload.backup_count}</strong></div><div><span>Notification history</span><strong>${notificationHistory.length}</strong></div><div><span>Last digest</span><strong>${lastDigestAt ? this._datetime(lastDigestAt) : "—"}</strong></div><div><span>Language</span><strong>${payload.language}</strong></div><div><span>Task entities</span><strong>${this._html(entitySettings.mode || "off")}</strong></div><div><span>Device grouping</span><strong>${this._html(entitySettings.device_grouping || "dashboard")}</strong></div><div><span>Entity cleanup</span><strong>${entitySettings.cleanup_removed ? "automatic" : "manual"}</strong></div><div><span>Notifications</span><strong>${notificationSettings.enabled ? "enabled" : "off"}</strong></div><div><span>Test mode</span><strong>${notificationSettings.test_mode ? "enabled" : "off"}</strong></div></div>${diag.length ? diag.map(i => `<p class="${i.severity}">${i.task_id || "global"}: ${i.message}</p>`).join("") : `<p>${this._t("ok")}</p>`}<button class="ghost" data-copy-diagnostics="${this._html(JSON.stringify(payload))}"><ha-icon icon="mdi:content-copy"></ha-icon>${this._t("copyDiagnostics")}</button></section></div></section></div>`;
  }
});
