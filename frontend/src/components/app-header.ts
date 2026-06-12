// Header and navigation rendering.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _hero() {
    return `<section class="hero"><div class="hero-brand"><img src="${LOGO_URL}" alt="Maintenance Dashboard" class="hero-logo"><div><p class="eyebrow">Maintenance Dashboard</p><h1>${this._t("appTitle")}</h1><p>${this._t("appSubtitle")}</p></div></div><div class="hero-actions">${this._nav("dashboard", "mdi:view-dashboard", this._t("dashboard"))}${this._nav("templates", "mdi:shape-outline", this._t("templates"))}<button data-action="history-dialog" class="nav icon-nav" title="${this._t("openHistory")}"><ha-icon icon="mdi:history"></ha-icon><span class="sr-only">${this._t("history")}</span></button><button data-view="settings" class="nav icon-nav ${this._view === "settings" ? "active" : ""}" title="${this._t("settings")}"><ha-icon icon="mdi:cog"></ha-icon><span class="sr-only">${this._t("settings")}</span></button></div></section>`;
  },

  _nav(view, icon, label) { return `<button data-view="${view}" class="nav ${this._view === view ? "active" : ""}"><ha-icon icon="${icon}"></ha-icon>${label}</button>`; },

  _viewHtml() { if (this._view === "templates") return this._templatesHtml(); if (this._view === "settings") return this._settingsHtml(); return this._dashboardHtml(); }
});
