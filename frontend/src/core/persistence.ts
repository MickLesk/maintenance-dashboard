// Lightweight UI state persistence in localStorage.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _uiStorageKey() {
    return "maintenance-dashboard-ui";
  },

  _readUiState() {
    try {
      return JSON.parse(localStorage.getItem(this._uiStorageKey()) || "{}") || {};
    } catch {
      return {};
    }
  },

  _writeUiState(patch) {
    const next = { ...this._readUiState(), ...patch };
    try { localStorage.setItem(this._uiStorageKey(), JSON.stringify(next)); } catch { /* ignore quota */ }
  },

  _restoreUiState() {
    const saved = this._readUiState();
    if (["dashboard", "statistics", "history", "settings"].includes(saved.view)) this._view = saved.view;
    if (saved.settingsTab) this._settingsTab = saved.settingsTab;
    if (Number.isFinite(Number(saved.statisticsYear))) this._statisticsYear = Number(saved.statisticsYear);
    if (typeof saved.statusMetricsExpanded === "boolean") this._statusMetricsExpanded = saved.statusMetricsExpanded;
  },

  _persistUiState() {
    this._writeUiState({
      view: this._view,
      settingsTab: this._settingsTab,
      statisticsYear: this._statisticsYear,
      statusMetricsExpanded: this._statusMetricsExpanded,
    });
  },
});
