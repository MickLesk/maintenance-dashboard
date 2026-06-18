// Header and navigation rendering.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _hero() {
    return `<header class="hero top-app-bar"><div class="hero-brand compact-brand"><strong>${this._t("brandName")}</strong></div><nav class="hero-actions" aria-label="${this._t("navigation")}">${this._nav("dashboard", "mdi:view-dashboard", this._t("dashboard"))}${this._nav("templates", "mdi:shape-outline", this._t("templates"))}${this._nav("statistics", "mdi:chart-box-outline", this._t("statistics"))}${this._nav("history", "mdi:history", this._t("history"))}${this._nav("settings", "mdi:cog", this._t("settings"))}</nav></header>`;
  },

  _nav(view, icon, label) { return `<button data-view="${view}" class="nav ${this._view === view ? "active" : ""}" title="${label}" aria-label="${label}"><ha-icon icon="${icon}"></ha-icon><span>${label}</span></button>`; },

  _viewHtml() {
    if (this._view === "templates") return this._templatesHtml();
    if (this._view === "history") return this._historyPageHtml();
    if (this._view === "statistics") return this._statisticsHtml();
    if (this._view === "settings") return this._settingsHtml();
    return this._dashboardHtml();
  }
});
