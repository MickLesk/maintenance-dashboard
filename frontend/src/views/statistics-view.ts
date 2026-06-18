// Yearly cost and completion statistics view with year selector and bar charts.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _statisticsHtml() {
    const stats = this._statisticsData || this._state?.statistics || {};
    const totals = stats.totals || {};
    const currency = this._defaultCurrency();
    const year = Number(stats.year || this._statisticsYear || new Date().getFullYear());
    const years = (stats.available_years || this._state?.statistics_years || [year]).map(Number).filter(Number.isFinite);
    const byCategory = Object.entries(stats.by_category || {}).sort(([, a], [, b]) => (b.cost || 0) - (a.cost || 0));
    const byMonth = Object.entries(stats.by_month || {}).sort(([a], [b]) => a.localeCompare(b));
    const topTasks = stats.top_cost_tasks || [];
    const maxCategoryCost = Math.max(1, ...byCategory.map(([, value]) => Number(value.cost || 0)));
    const maxMonthCost = Math.max(1, ...byMonth.map(([, value]) => Number(value.cost || 0)));
    const yearSelect = years.length > 1 ? `<label class="field statistics-year-field"><span>${this._t("statisticsYear")}</span><select id="statisticsYear">${years.map(value => `<option value="${value}" ${value === year ? "selected" : ""}>${value}</option>`).join("")}</select></label>` : "";
    return `<section class="page-header page-header-compact"><div><h1>${this._t("statistics")}</h1><p>${this._t("statisticsHint")}</p></div>${yearSelect}</section>
      <section class="panel statistics-panel">
        <div class="statistics-summary">
          <article><span>${this._t("yearlyCosts")}</span><strong>${Number(totals.cost || 0).toFixed(2)} ${currency}</strong><small>${year}</small></article>
          <article><span>${this._t("completedThisYear")}</span><strong>${totals.completions || 0}</strong></article>
          <article><span>${this._t("completedWithMaterials")}</span><strong>${totals.materials || 0}</strong></article>
        </div>
        <section class="statistics-section"><h2>${this._t("costsByCategory")}</h2>${byCategory.length ? `<div class="statistics-bars">${byCategory.map(([key, value]) => {
          const cost = Number(value.cost || 0);
          const width = Math.max(6, Math.round((cost / maxCategoryCost) * 100));
          return `<article class="statistics-bar-row"><div class="statistics-bar-label"><strong>${this._t(key)}</strong><small>${value.completions || 0} ${this._t("completedThisYear").toLowerCase()}</small></div><div class="statistics-bar-track"><span style="width:${width}%"></span></div><strong>${cost.toFixed(2)} ${currency}</strong></article>`;
        }).join("")}</div>` : `<p class="section-hint">${this._t("noHistory")}</p>`}</section>
        <section class="statistics-section"><h2>${this._t("costsByMonth")}</h2>${byMonth.length ? `<div class="statistics-bars month-bars">${byMonth.map(([key, value]) => {
          const cost = Number(value.cost || 0);
          const width = Math.max(6, Math.round((cost / maxMonthCost) * 100));
          return `<article class="statistics-bar-row"><div class="statistics-bar-label"><strong>${this._html(key)}</strong><small>${value.completions || 0}</small></div><div class="statistics-bar-track"><span style="width:${width}%"></span></div><strong>${cost.toFixed(2)} ${currency}</strong></article>`;
        }).join("")}</div>` : `<p class="section-hint">${this._t("noHistory")}</p>`}</section>
        <section class="statistics-section"><h2>${this._t("topCostTasks")}</h2>${topTasks.length ? `<div class="statistics-list">${topTasks.map(item => `<article class="statistics-task-row"><button class="ghost linkish" data-open-task-detail="${this._html(item.task_id)}"><strong>${this._html(item.name || item.task_id)}</strong></button><span>${Number(item.cost || 0).toFixed(2)} ${currency}</span></article>`).join("")}</div>` : `<p class="section-hint">${this._t("noHistory")}</p>`}</section>
      </section>`;
  },

  _defaultCurrency() {
    return String(this._state?.settings?.dashboard?.default_currency || "EUR");
  },

  async _loadStatisticsYear(year) {
    if (!this.hass?.callWS) return;
    const target = Number(year || new Date().getFullYear());
    this._statisticsYear = target;
    this._persistUiState();
    try {
      this._statisticsData = await this.hass.callWS({ type: "maintenance_dashboard/get_statistics", year: target });
    } catch {
      this._statisticsData = this._state?.statistics || null;
    }
    this._render();
  },
});
