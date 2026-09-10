// Statistics view: reliability, runs, effort, forecast, health trend and costs.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _statisticsHtml() {
    const stats = this._statisticsData || this._state?.statistics || {};
    const year = Number(stats.year || this._statisticsYear || new Date().getFullYear());
    const years = (stats.available_years || this._state?.statistics_years || [year]).map(Number).filter(Number.isFinite);
    const yearSelect = years.length > 1
      ? `<label class="field statistics-year-field"><span>${this._t("statisticsYear")}</span><select id="statisticsYear">${years.map(v => `<option value="${v}" ${v === year ? "selected" : ""}>${v}</option>`).join("")}</select></label>`
      : "";
    const empty = !stats.reliability?.rated && !stats.totals?.completions && !(stats.runs?.completed || stats.runs?.skipped);
    return `<section class="page-header page-header-compact"><div><h1>${this._t("statistics")}</h1><p>${this._t("statisticsHint")}</p></div>${yearSelect}</section>
      ${empty ? this._emptyMessage("mdi:chart-box-outline", this._t("statisticsNeedsHistory")) : `
      ${this._statsReliabilityHtml(stats)}
      ${this._statsRunsHtml(stats)}
      ${this._statsEffortHtml(stats)}
      ${this._statsForecastHtml(stats)}
      ${this._statsHealthTrendHtml(stats)}
      ${stats.cost_tracking ? this._statsCostsHtml(stats, year) : ""}`}`;
  },

  _statCard(label, value, hint = "") {
    return `<article class="stat-card"><span>${label}</span><strong>${value}</strong>${hint ? `<small>${hint}</small>` : ""}</article>`;
  },

  _statSection(icon, title, hint, body) {
    return `<section class="panel statistics-panel"><header class="statistics-head"><ha-icon icon="${icon}"></ha-icon><div><h2>${title}</h2>${hint ? `<p>${hint}</p>` : ""}</div></header>${body}</section>`;
  },

  _statBars(rows, { max, format } = {}) {
    if (!rows.length) return `<p class="section-hint">${this._t("noDataYet")}</p>`;
    const peak = Math.max(1, max ?? Math.max(...rows.map(row => row.value)));
    return `<div class="statistics-bars">${rows.map(row => `<article class="statistics-bar-row"><div class="statistics-bar-label"><strong>${row.label}</strong>${row.hint ? `<small>${row.hint}</small>` : ""}</div><div class="statistics-bar-track"><span style="width:${Math.max(2, Math.round(row.value / peak * 100))}%"></span></div><strong>${format ? format(row.value) : row.value}</strong></article>`).join("")}</div>`;
  },

  _statsReliabilityHtml(stats) {
    const r = stats.reliability || {};
    const pct = value => (value == null ? "—" : `${value}%`);
    const delta = r.on_time_rate != null && r.previous_on_time_rate != null
      ? `${r.on_time_rate >= r.previous_on_time_rate ? "▲" : "▼"} ${Math.abs(Math.round((r.on_time_rate - r.previous_on_time_rate) * 10) / 10)}%`
      : "";
    const cards = [
      this._statCard(this._t("onTimeRate"), pct(r.on_time_rate), delta ? `${this._t("previousYear")}: ${pct(r.previous_on_time_rate)} · ${delta}` : ""),
      this._statCard(this._t("ratedCompletions"), r.rated ?? 0, `${r.on_time ?? 0} / ${r.late ?? 0}`),
      this._statCard(this._t("averageDaysLate"), `${r.average_days_late ?? 0} ${this._t("days")}`),
      r.worst ? this._statCard(this._t("worstDelay"), `${r.worst.days} ${this._t("days")}`, this._html(r.worst.name || "")) : "",
    ].filter(Boolean).join("");
    return this._statSection("mdi:target", this._t("statisticsReliability"), this._t("reliabilityHint"), `<div class="stat-card-grid">${cards}</div>`);
  },

  _statsRunsHtml(stats) {
    const runs = stats.runs || {};
    const cards = [
      this._statCard(this._t("runsCompletedTotal"), runs.completed ?? 0),
      this._statCard(this._t("runsSkippedTotal"), runs.skipped ?? 0),
      this._statCard(this._t("runsRestartedTotal"), runs.restarted ?? 0),
      this._statCard(this._t("runsResetTotal"), runs.resets ?? 0),
      this._statCard(this._t("skipRate"), `${runs.skip_rate ?? 0}%`),
    ].join("");
    const rows = Object.entries(runs.by_category || {})
      .filter(([, value]) => value.completed || value.skipped)
      .sort(([, a], [, b]) => (b.skip_rate || 0) - (a.skip_rate || 0))
      .map(([key, value]) => ({
        label: this._t(key),
        hint: `${value.completed} / ${value.skipped}`,
        value: value.skip_rate || 0,
      }));
    return this._statSection("mdi:repeat-variant", this._t("statisticsRuns"), this._t("runsHint"),
      `<div class="stat-card-grid">${cards}</div>${this._statBars(rows, { max: 100, format: v => `${v}%` })}`);
  },

  _statsEffortHtml(stats) {
    const effort = stats.effort || {};
    const people = (effort.by_person || []).map(item => ({ label: this._html(item.name), value: item.completions }));
    const materials = (effort.materials || []).map(item => ({ label: this._html(item.name), value: item.completions }));
    const categories = Object.entries(effort.completions_by_category || {})
      .sort(([, a], [, b]) => b - a)
      .map(([key, value]) => ({ label: this._t(key), value }));
    return this._statSection("mdi:account-wrench-outline", this._t("statisticsEffort"), "",
      `<div class="statistics-columns">
        <div><h3>${this._t("byPerson")}</h3>${this._statBars(people)}</div>
        <div><h3>${this._t("topMaterials")}</h3>${this._statBars(materials)}</div>
        <div><h3>${this._t("completionsByCategory")}</h3>${this._statBars(categories)}</div>
      </div>`);
  },

  _statsForecastHtml(stats) {
    const forecast = stats.forecast || {};
    const currency = this._defaultCurrency();
    const cards = [
      this._statCard(this._t("forecastTotalDue"), forecast.total_due ?? 0),
      stats.cost_tracking ? this._statCard(this._t("forecastTotalCost"), `${Number(forecast.total_cost || 0).toFixed(2)} ${currency}`) : "",
    ].filter(Boolean).join("");
    const rows = (forecast.months || []).map(item => ({
      label: this._monthLabel(item.month),
      hint: stats.cost_tracking && item.cost ? `${Number(item.cost).toFixed(2)} ${currency}` : "",
      value: item.due,
    }));
    return this._statSection("mdi:chart-timeline-variant", this._t("statisticsForecast"), this._t("forecastHint"),
      `<div class="stat-card-grid">${cards}</div>${this._statBars(rows)}`);
  },

  _statsHealthTrendHtml(stats) {
    const trend = stats.health_trend || [];
    if (trend.length < 2) return "";
    const points = trend.map((item, index) => {
      const x = (index / (trend.length - 1)) * 100;
      const y = 100 - Math.max(0, Math.min(100, Number(item.health) || 0));
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    }).join(" ");
    const latest = trend[trend.length - 1] || {};
    return this._statSection("mdi:heart-pulse", this._t("healthTrend"), `${this._date(trend[0].date)} – ${this._date(latest.date)}`,
      `<div class="health-trend"><svg viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label="${this._t("healthTrend")}"><polyline points="${points}"></polyline></svg><strong>${latest.health ?? 0}%</strong></div>`);
  },

  _statsCostsHtml(stats, year) {
    const currency = this._defaultCurrency();
    const totals = stats.totals || {};
    const money = value => `${Number(value || 0).toFixed(2)} ${currency}`;
    const cards = [
      this._statCard(this._t("yearlyCosts"), money(totals.cost), String(year)),
      this._statCard(this._t("completedThisYear"), totals.completions || 0),
      this._statCard(this._t("completedWithMaterials"), totals.materials || 0),
    ].join("");
    const byCategory = Object.entries(stats.by_category || {})
      .sort(([, a], [, b]) => (b.cost || 0) - (a.cost || 0))
      .map(([key, value]) => ({ label: this._t(key), hint: `${value.completions || 0}`, value: Number(value.cost || 0) }));
    const byMonth = Object.entries(stats.by_month || {})
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => ({ label: this._monthLabel(key), value: Number(value.cost || 0) }));
    const top = stats.top_cost_tasks || [];
    return this._statSection("mdi:cash-multiple", this._t("statisticsCosts"), "",
      `<div class="stat-card-grid">${cards}</div>
       <div class="statistics-columns">
         <div><h3>${this._t("costsByCategory")}</h3>${this._statBars(byCategory, { format: money })}</div>
         <div><h3>${this._t("costsByMonth")}</h3>${this._statBars(byMonth, { format: money })}</div>
       </div>
       <h3>${this._t("topCostTasks")}</h3>
       ${top.length ? `<div class="statistics-list">${top.map(item => `<article class="statistics-task-row"><button class="ghost linkish" data-open-task-detail="${this._html(item.task_id)}"><strong>${this._html(item.name || item.task_id)}</strong></button><span>${money(item.cost)}</span></article>`).join("")}</div>` : `<p class="section-hint">${this._t("noDataYet")}</p>`}`);
  },

  _monthLabel(value) {
    const [year, month] = String(value || "").split("-");
    if (!year || !month) return this._html(value);
    const date = new Date(Number(year), Number(month) - 1, 1);
    return new Intl.DateTimeFormat(this._lang() === "de" ? "de-DE" : "en-US", { month: "short", year: "2-digit" }).format(date);
  },

  _defaultCurrency() {
    return String(this._state?.settings?.dashboard?.default_currency || "EUR");
  },

  _costTrackingEnabled() {
    return Boolean(this._state?.settings?.dashboard?.cost_tracking);
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
