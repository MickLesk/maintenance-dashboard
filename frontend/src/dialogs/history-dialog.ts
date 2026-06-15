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
      return `<article class="history-row"><ha-icon icon="${event.type === "completed" ? "mdi:check-circle-outline" : event.type === "reactivated" ? "mdi:restore" : "mdi:history"}"></ha-icon><div class="history-content"><div class="history-title"><strong>${this._html(event.task_name || event.task_id || "Global")}</strong><span class="history-event-type">${this._historyEventLabel(event.type)}</span></div><p>${this._html(event.summary)} · ${this._datetime(event.created_at)}</p>${event.details?.runtime_before ? `<small>${this._runtimeSummary(event.details.runtime_before)}</small>` : ""}${completionBits ? `<div class="completion-details">${completionBits}</div>` : ""}${changes}</div>${event.type === "completed" && !event.undone_at ? `<button class="ghost" data-undo="${event.id}">${this._t("undo")}</button>` : ""}</article>`;
    }).join("");
    return `<section class="panel history-panel"><div class="history-toolbar"><input id="historySearch" class="search" placeholder="${this._t("historySearch")}" value="${this._html(this._historySearch)}"><label><span>${this._t("historyType")}</span><select id="historyType"><option value="all">${this._t("allActions")}</option>${types.map(type => `<option value="${type}" ${this._historyType === type ? "selected" : ""}>${this._historyEventLabel(type)}</option>`).join("")}</select></label><label><span>${this._t("historyTask")}</span><select id="historyTask"><option value="all">${this._t("allTasks")}</option>${taskOptions.map(([id, name]) => `<option value="${this._html(id)}" ${this._historyTask === id ? "selected" : ""}>${this._html(name)}</option>`).join("")}</select></label></div><div class="history-list">${rows || `<p>${this._t("noHistory")}</p>`}</div></section>`;
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
    return (this._state.history || []).filter(event => {
      if (this._historyType !== "all" && event.type !== this._historyType) return false;
      if (this._historyTask !== "all" && event.task_id !== this._historyTask) return false;
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
