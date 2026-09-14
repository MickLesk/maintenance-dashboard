// @ts-nocheck
// The panel brings its own Material palette instead of inheriting the Home
// Assistant theme, so it has to follow the light/dark choice itself.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _panelTheme() {
    const configured = String(this._state?.settings?.dashboard?.theme || "auto");
    if (configured === "light" || configured === "dark") return configured;
    return this.hass?.themes?.darkMode === false ? "light" : "dark";
  },

  _applyTheme() {
    this.classList.toggle("theme-light", this._panelTheme() === "light");
  },
});
