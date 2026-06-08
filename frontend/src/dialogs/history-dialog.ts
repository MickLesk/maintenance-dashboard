// History modal rendering.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _historyHtml() {
    const rows = (this._state.history || []).slice(0, 60).map(event => `<article class="history-row"><ha-icon icon="${event.type === "completed" ? "mdi:check-circle-outline" : "mdi:history"}"></ha-icon><div><strong>${this._html(event.task_name || event.task_id)}</strong><p>${this._html(event.summary)} · ${this._datetime(event.created_at)}</p>${event.details?.runtime_before ? `<small>${this._runtimeSummary(event.details.runtime_before)}</small>` : ""}</div>${event.type === "completed" && !event.undone_at ? `<button class="ghost" data-undo="${event.id}">${this._t("undo")}</button>` : ""}</article>`).join("");
    return `<section class="panel"><h2>${this._t("history")}</h2><div class="history-list">${rows || `<p>${this._t("noHistory")}</p>`}</div></section>`;
  },

  _historyDialogHtml() {
    if (!this._historyDialog) return "";
    return `<div class="dialog-backdrop"><section class="dialog small history-dialog"><header><h2>${this._t("history")}</h2><button class="icon" data-action="close-history"><ha-icon icon="mdi:close"></ha-icon></button></header><div class="dialog-body">${this._historyHtml()}</div></section></div>`;
  }
});
