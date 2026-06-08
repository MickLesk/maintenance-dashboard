// Extended diagnostics dialog rendering.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _diagnosticsHtml() {
    if (!this._diagnostics) return "";
    const diag = this._state.diagnostics || [];
    const payload = {
      frontend_version: VERSION,
      store_version: this._state.version,
      panel_url: `/api/maintenance_dashboard/static/maintenance-dashboard-panel.js?v=${VERSION}`,
      task_count: (this._state.tasks || []).length,
      history_count: (this._state.history || []).length,
      backup_count: (this._state.backups || []).length,
      summary: this._state.summary,
      diagnostics: diag,
      language: this._lang(),
      loaded_at: new Date().toISOString()
    };
    return `<div class="dialog-backdrop"><section class="dialog"><header><h2>${this._t("diagnostics")}</h2><button class="icon" data-action="close-diagnostics"><ha-icon icon="mdi:close"></ha-icon></button></header><div class="dialog-body"><section class="dialog-section"><h3>${this._t("diagnostics")}</h3><div class="diagnostic-grid"><div><span>Frontend</span><strong>${VERSION}</strong></div><div><span>Store</span><strong>${this._state.version}</strong></div><div><span>Tasks</span><strong>${payload.task_count}</strong></div><div><span>History</span><strong>${payload.history_count}</strong></div><div><span>Backups</span><strong>${payload.backup_count}</strong></div><div><span>Language</span><strong>${payload.language}</strong></div></div>${diag.length ? diag.map(i => `<p class="${i.severity}">${i.task_id || "global"}: ${i.message}</p>`).join("") : `<p>${this._t("ok")}</p>`}<button class="ghost" data-copy-diagnostics="${this._html(JSON.stringify(payload))}"><ha-icon icon="mdi:content-copy"></ha-icon>${this._t("copyDiagnostics")}</button></section></div></section></div>`;
  }
});
