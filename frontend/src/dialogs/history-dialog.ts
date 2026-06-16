// History modal rendering with filters, completion metadata and before/after changes.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _historyHtml() {
    const events = this._filteredHistory();
    const taskOptions = [...new Map((this._state.history || []).filter(event => event.task_id).map(event => [event.task_id, event.task_name || event.task_id])).entries()];
    const types = [...new Set((this._state.history || []).map(event => event.type).filter(Boolean))].sort();
    const rows = events.slice(0, 120).map(event => {
      const completion = event.details?.completion || event.details || {};
      const completionBits = [
        completion.note ? `<span><ha-icon icon="mdi:note-text-outline"></ha-icon>${this._html(completion.note)}</span>` : "",
        completion.material ? `<span><ha-icon icon="mdi:package-variant-closed"></ha-icon>${this._html(completion.material)}</span>` : "",
        completion.cost != null ? `<span><ha-icon icon="mdi:cash"></ha-icon>${this._html(completion.cost)} ${this._html(completion.currency || "EUR")}</span>` : "",
        completion.performed_by ? `<span><ha-icon icon="mdi:account-wrench-outline"></ha-icon>${this._html(completion.performed_by)}</span>` : "",
      ].filter(Boolean).join("");
      const changes = this._historyChanges(event);
      return `<article class="history-row ${this._html(event.type || "event")}"><ha-icon icon="${this._historyIcon(event.type)}"></ha-icon><div class="history-content"><div class="history-title"><strong>${this._html(event.task_name || event.task_id || this._t("globalLabel"))}</strong><span class="history-event-type">${this._historyEventLabel(event.type)}</span></div><p>${this._html(event.summary)} · ${this._datetime(event.created_at)}</p>${event.details?.runtime_before ? `<small>${this._runtimeSummary(event.details.runtime_before)}</small>` : ""}${completionBits ? `<div class="completion-details">${completionBits}</div>` : ""}${changes}</div>${event.type === "completed" && !event.undone_at ? `<button class="ghost" data-undo="${event.id}">${this._t("undo")}</button>` : ""}</article>`;
    }).join("");
    return `<section class="panel history-panel"><div class="history-toolbar">
      <input id="historySearch" class="search" placeholder="${this._t("historySearch")}" value="${this._html(this._historySearch)}">
      <label><span>${this._t("historyType")}</span><select id="historyType"><option value="all">${this._t("allActions")}</option>${types.map(type => `<option value="${type}" ${this._historyType === type ? "selected" : ""}>${this._historyEventLabel(type)}</option>`).join("")}</select></label>
      <label><span>${this._t("historyRange")}</span><select id="historyRange">${["all","today","week","month"].map(value => `<option value="${value}" ${this._historyRange === value ? "selected" : ""}>${this._t(value === "all" ? "allTime" : value === "today" ? "todayRange" : value === "week" ? "weekRange" : "monthRange")}</option>`).join("")}</select></label>
      <label><span>${this._t("historyTask")}</span><select id="historyTask"><option value="all">${this._t("allTasks")}</option>${taskOptions.map(([id, name]) => `<option value="${this._html(id)}" ${this._historyTask === id ? "selected" : ""}>${this._html(name)}</option>`).join("")}</select></label>
      <div class="history-scope segmented" role="group" aria-label="${this._t("history")}">${["all","completed","changes"].map(scope => `<button class="${this._historyScope === scope ? "active" : ""}" data-history-scope="${scope}">${this._t(scope === "all" ? "historyScopeAll" : scope === "completed" ? "historyScopeCompleted" : "historyScopeChanges")}</button>`).join("")}</div>
    </div><div class="history-list">${rows || `<p>${this._t("noHistory")}</p>`}</div></section>`;
  },

  _historyPageHtml() {
    const events = this._filteredHistory();
    return `<section class="page-header"><div><p class="eyebrow">${this._t("brandName")}</p><h1>${this._t("history")}</h1><p>${this._t("historyDescription")}</p></div></section><section class="history-page-grid">${this._historyHtml()}${this._historySummaryHtml(events)}</section>`;
  },

  _historySummaryHtml(events) {
    const now = new Date();
    const startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const startWeek = now.getTime() - 7 * 86400000;
    const countSince = start => events.filter(event => new Date(event.created_at || 0).getTime() >= start).length;
    const items = [
      ["mdi:calendar-today-outline", "activitiesToday", countSince(startToday)],
      ["mdi:calendar-week-outline", "activitiesWeek", countSince(startWeek)],
      ["mdi:check-circle-outline", "completedActivities", events.filter(event => event.type === "completed").length],
      ["mdi:backup-restore", "backupActivities", events.filter(event => String(event.type || "").includes("backup")).length],
      ["mdi:compare-horizontal", "changeActivities", events.filter(event => ["created","updated","deleted","restored","reactivated","imported","snoozed","snooze_cleared","undo_completed"].includes(event.type)).length],
    ];
    return `<aside class="history-summary" aria-label="${this._t("history")}">${items.map(([icon, label, value]) => `<div><ha-icon icon="${icon}"></ha-icon><span>${this._t(label)}</span><strong>${value}</strong></div>`).join("")}</aside>`;
  },

  _historyIcon(type) {
    return {
      completed: "mdi:check-circle-outline",
      created: "mdi:plus-circle-outline",
      updated: "mdi:pencil-circle-outline",
      deleted: "mdi:delete-circle-outline",
      restored: "mdi:restore",
      reactivated: "mdi:restart",
      imported: "mdi:import",
      snoozed: "mdi:clock-plus-outline",
      snooze_cleared: "mdi:play-circle-outline",
      undo_completed: "mdi:undo",
    }[type] || "mdi:history";
  },

  _historyEventLabel(type) {
    return {
      created: this._t("created"),
      updated: this._t("updated"),
      completed: this._t("completedEvent"),
      deleted: this._t("deletedEvent"),
      restored: this._t("restoredEvent"),
      reactivated: this._t("reactivatedEvent"),
      imported: this._t("importedEvent"),
      snoozed: this._t("snoozedEvent"),
      snooze_cleared: this._t("snoozeClearedEvent"),
      undo_completed: this._t("undoCompletedEvent"),
    }[type] || this._html(type || "—");
  },

  _historyChanges(event) {
    const previous = event.previous_state;
    const next = event.new_state;
    if (!previous || !next) return "";
    const fields = [
      ["name", "fieldName"], ["description", "fieldDescription"], ["category", "fieldCategory"],
      ["priority", "fieldPriority"], ["enabled", "fieldEnabled"], ["schedule_mode", "fieldSchedule"],
      ["calendar_repeat", "fieldCalendarRepeat"], ["interval", "fieldInterval"], ["interval_unit", "intervalUnit"],
      ["due_date", "fieldDueDate"], ["last_done", "fieldLastDone"], ["season", "fieldSeason"],
    ];
    const changes = fields.filter(([key]) => JSON.stringify(previous[key] ?? null) !== JSON.stringify(next[key] ?? null));
    if (!changes.length) return "";
    const rows = changes.map(([key, label]) => `<div class="history-change-row"><strong>${this._t(label)}</strong><span>${this._historyValue(key, previous[key])}</span><ha-icon icon="mdi:arrow-right"></ha-icon><span>${this._historyValue(key, next[key])}</span></div>`).join("");
    return `<details class="history-changes"><summary><ha-icon icon="mdi:compare-horizontal"></ha-icon>${this._t("changes")} · ${changes.length}</summary><div class="history-change-head"><span></span><strong>${this._t("previousValue")}</strong><span></span><strong>${this._t("newValue")}</strong></div>${rows}</details>`;
  },

  _historyValue(key, value) {
    if (value == null || value === "") return "—";
    if (["due_date", "last_done"].includes(key)) return this._html(this._datetime(value));
    if (key === "enabled") return value ? "✓" : "—";
    if (key === "priority") return `${this._html(this._priorityLabel(value))} (${this._html(value)}/5)`;
    if (key === "schedule_mode") return this._html(this._scheduleModeLabel(value));
    if (key === "calendar_repeat" || key === "season" || key === "interval_unit") return this._html(this._t(String(value)));
    if (Array.isArray(value)) return this._html(value.join(", "));
    if (typeof value === "object") return this._html(JSON.stringify(value));
    return this._html(value);
  },

  _filteredHistory() {
    const query = String(this._historySearch || "").trim().toLowerCase();
    const changeTypes = ["created","updated","deleted","restored","reactivated","imported","snoozed","snooze_cleared","undo_completed"];
    const now = new Date();
    const rangeStart = {
      today: new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime(),
      week: now.getTime() - 7 * 86400000,
      month: new Date(now.getFullYear(), now.getMonth(), 1).getTime(),
    }[this._historyRange || "all"];
    return (this._state.history || []).filter(event => {
      if (this._historyType !== "all" && event.type !== this._historyType) return false;
      if (this._historyTask !== "all" && event.task_id !== this._historyTask) return false;
      if (this._historyScope === "completed" && event.type !== "completed") return false;
      if (this._historyScope === "changes" && !changeTypes.includes(event.type)) return false;
      if (rangeStart && new Date(event.created_at || 0).getTime() < rangeStart) return false;
      if (!query) return true;
      const completion = event.details?.completion || event.details || {};
      return [event.task_name, event.task_id, event.summary, completion.note, completion.material, completion.performed_by]
        .filter(Boolean).join(" ").toLowerCase().includes(query);
    });
  },

  _historyDialogHtml() {
    if (!this._historyDialog) return "";
    return `<div class="dialog-backdrop"><section class="dialog history-dialog"><header><h2>${this._t("history")}</h2><button class="icon" data-action="close-history"><ha-icon icon="mdi:close"></ha-icon></button></header><div class="dialog-body">${this._historyHtml()}</div></section></div>`;
  }
});
