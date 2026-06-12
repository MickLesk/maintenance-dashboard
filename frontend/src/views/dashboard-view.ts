// Dashboard view rendering, KPI cards and next-task cycling UI.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _dashboardHtml() {
    const s = this._state.summary || {};
    const tasks = this._filteredTasks(false);
    return `
      <section class="kpis">
        ${this._kpi("mdi:heart-pulse", this._t("health"), `${s.health ?? 100}%`, this._t("healthHelp"))}
        ${this._kpi("mdi:clipboard-list-outline", this._t("active"), s.open ?? s.active ?? 0, `${s.ok ?? 0} ${this._t("ok")}`)}
        ${(s.critical ?? 0) > 0 ? this._kpi("mdi:alert-circle", this._t("critical"), s.critical ?? 0) : ""}
        ${(s.warning ?? 0) > 0 ? this._kpi("mdi:alert-outline", this._t("warnings"), s.warning ?? 0) : ""}
        ${this._nextKpi()}
        ${this._kpi("mdi:check-decagram", this._t("completedThisYear"), s.completed_this_year ?? 0)}
        ${(s.unavailable ?? 0) > 0 ? this._kpi("mdi:cloud-question", this._t("unavailable"), s.unavailable ?? 0, this._t("unavailableHelp")) : ""}
      </section>
      <section class="toolbar expressive dashboard-toolbar">
        <div class="toolbar-copy">
          <p class="eyebrow">${this._t("dashboard")}</p>
          <h2>${this._t("dashboard")}</h2>
          <p>${this._t("dashboardToolbarHint")}</p>
        </div>
        <div class="toolbar-main dashboard-main">
          <button data-action="create" class="primary big"><ha-icon icon="mdi:plus"></ha-icon>${this._t("add")}</button>
          <input id="search" class="search" placeholder="${this._t("search")}" value="${this._html(this._search)}">
          <label><span>${this._t("status")}</span><select id="statusFilter">${["all", "ok", "warning", "critical", "overdue", "snoozed", "unavailable", "completed"].map(x => `<option value="${x}" ${this._statusFilter === x ? "selected" : ""}>${this._t(x)}</option>`).join("")}</select></label>
          <label><span>${this._t("sort")}</span><select id="sortMode">${["smart", "position", "priority", "due", "status"].map(x => `<option value="${x}" ${this._sortMode === x ? "selected" : ""}>${this._t(`sort${x[0].toUpperCase()}${x.slice(1)}`)}</option>`).join("")}</select></label>
          <button class="ghost completed-toggle" data-action="toggle-completed"><ha-icon icon="mdi:archive-check-outline"></ha-icon>${this._showCompleted ? this._t("hideCompleted") : this._t("showCompleted")}</button>
        </div>
      </section>
      ${tasks.length ? `<section class="task-grid">${tasks.map(t => this._taskCard(t)).join("")}</section>` : this._emptyHtml()}
    `;
  },

  _kpi(icon, label, value, sub = "", extraClass = "") {
    return `<article class="kpi ${this._html(extraClass)}" title="${this._html(sub)}"><ha-icon icon="${icon}"></ha-icon><div><small>${this._html(label)}</small><strong>${this._html(value)}</strong>${sub ? `<span>${this._html(sub)}</span>` : ""}</div></article>`;
  },

  _nextKpi() {
    const candidates = this._nextTaskCandidates();
    if (!candidates.length) return this._kpi("mdi:calendar-clock", this._t("next"), "—");
    if (this._nextTaskOffset >= candidates.length) this._nextTaskOffset = 0;
    const candidate = candidates[this._nextTaskOffset] || candidates[0];
    const task = candidate.task;
    const runtime = candidate.runtime;
    const name = this._shortTaskName(task.name || "—");
    const sub = runtime.remaining != null ? `${Math.ceil(Math.abs(runtime.remaining))} ${this._t("days")} ${runtime.remaining < 0 ? this._t("overdue") : this._t("remaining")}` : this._t("focusNextTask");
    const status = runtime.status || "ok";
    return `<article class="kpi next-kpi ${status}" data-focus-task="${this._html(task.id)}" title="${this._t("nextTaskHint")}">
      <ha-icon icon="mdi:calendar-clock"></ha-icon>
      <div class="next-kpi-body"><small>${this._t("next")}</small><strong>${this._html(name)}</strong><span>${this._html(sub)} · ${this._t("priority")} ${task.priority || 3}/5</span></div>
      ${candidates.length > 1 ? `<div class="next-cycle" title="${this._t("taskCounter")}"><button data-action="prev-next-task" title="${this._t("previousTask")}"><ha-icon icon="mdi:chevron-left"></ha-icon></button><span>${this._nextTaskOffset + 1}/${candidates.length}</span><button data-action="next-next-task" title="${this._t("nextTask")}"><ha-icon icon="mdi:chevron-right"></ha-icon></button></div>` : ""}
    </article>`;
  },

  _nextTaskCandidates() {
    const tasks = (this._state?.tasks || []).filter(task => !task.deleted && task.enabled !== false);
    const candidates = tasks.map(task => ({ task, runtime: this._state?.runtime?.[task.id] || {} }))
      .filter(item => !["snoozed", "disabled", "deleted", "completed"].includes(item.runtime.status) && item.runtime.remaining != null)
      .sort((a, b) => {
        const ar = a.runtime || {}; const br = b.runtime || {};
        return (STATUS_ORDER[ar.status] ?? 99) - (STATUS_ORDER[br.status] ?? 99)
          || (b.task.priority ?? 0) - (a.task.priority ?? 0)
          || this._dueValue(ar) - this._dueValue(br)
          || (a.task.position ?? 0) - (b.task.position ?? 0);
      });
    return candidates;
  },

  _shortTaskName(name) {
    const clean = String(name || "—").trim();
    if (clean.length <= 24) return clean;
    return `${clean.slice(0, 23)}…`;
  },

  _emptyHtml() {
    return `<section class="empty expressive-empty"><div class="empty-orb"><ha-icon icon="mdi:clipboard-plus-outline"></ha-icon></div><h2>${this._t("noTasks")}</h2><p>${this._t("materialEmpty")}</p><div class="empty-actions"><button class="primary big" data-action="create"><ha-icon icon="mdi:plus"></ha-icon>${this._t("addFirst")}</button><button class="ghost big" data-view="templates"><ha-icon icon="mdi:shape-plus-outline"></ha-icon>${this._t("templates")}</button></div></section>`;
  }
});
