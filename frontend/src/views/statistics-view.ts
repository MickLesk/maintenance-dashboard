// Yearly cost and completion statistics view.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _statisticsHtml() {
    const stats = this._state?.statistics || {};
    const totals = stats.totals || {};
    const byCategory = Object.entries(stats.by_category || {}).sort(([, a], [, b]) => (b.cost || 0) - (a.cost || 0));
    const byMonth = Object.entries(stats.by_month || {}).sort(([a], [b]) => a.localeCompare(b));
    const topTasks = stats.top_cost_tasks || [];
    return `<section class="page-header page-header-compact"><div><h1>${this._t("statistics")}</h1><p>${this._t("statisticsHint")}</p></div></section>
      <section class="panel statistics-panel">
        <div class="statistics-summary">
          <article><span>${this._t("yearlyCosts")}</span><strong>${Number(totals.cost || 0).toFixed(2)} EUR</strong></article>
          <article><span>${this._t("completedThisYear")}</span><strong>${totals.completions || 0}</strong></article>
          <article><span>${this._t("completedWithMaterials")}</span><strong>${totals.materials || 0}</strong></article>
        </div>
        <section class="statistics-section"><h2>${this._t("costsByCategory")}</h2>${byCategory.length ? `<div class="statistics-list">${byCategory.map(([key, value]) => `<article><div><strong>${this._t(key)}</strong><small>${value.completions || 0} ${this._t("completedThisYear").toLowerCase()}</small></div><span>${Number(value.cost || 0).toFixed(2)} EUR</span></article>`).join("")}</div>` : `<p class="section-hint">${this._t("noHistory")}</p>`}</section>
        <section class="statistics-section"><h2>${this._t("costsByMonth")}</h2>${byMonth.length ? `<div class="statistics-list">${byMonth.map(([key, value]) => `<article><div><strong>${key}</strong><small>${value.completions || 0}</small></div><span>${Number(value.cost || 0).toFixed(2)} EUR</span></article>`).join("")}</div>` : `<p class="section-hint">${this._t("noHistory")}</p>`}</section>
        <section class="statistics-section"><h2>${this._t("topCostTasks")}</h2>${topTasks.length ? `<div class="statistics-list">${topTasks.map(item => `<article><div><strong>${this._html(item.name || item.task_id)}</strong></div><span>${Number(item.cost || 0).toFixed(2)} EUR</span></article>`).join("")}</div>` : `<p class="section-hint">${this._t("noHistory")}</p>`}</section>
      </section>`;
  },
});
