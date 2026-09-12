// @ts-nocheck
// Printable QR labels. Maintenance happens in front of the appliance, so the
// link to a task belongs on the appliance.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _taskDeepLink(taskId) {
    const base = `${window.location.origin}${window.location.pathname}`;
    return `${base}?task=${encodeURIComponent(taskId)}`;
  },

  _labelTasks() {
    return (this._state?.tasks || [])
      .filter(task => !task.deleted && task.enabled !== false)
      .filter(task => !this._labelFilter || task.id === this._labelFilter || task.asset_id === this._labelFilter)
      .sort((a, b) => String(a.name || "").localeCompare(String(b.name || ""), this._lang()));
  },

  _labelsDialogHtml() {
    if (!this._labelsDialogOpen) return "";
    const tasks = this._labelTasks();
    const cards = tasks.map(task => {
      const link = this._taskDeepLink(task.id);
      let code = "";
      try {
        code = qrSvg(link, { size: 132, label: this._html(task.name) });
      } catch {
        code = `<p class="section-hint">${this._t("labelTooLong")}</p>`;
      }
      return `<article class="label-card">${code}<div class="label-text">
        <strong>${this._html(task.name)}</strong>
        <small>${this._categoryLabel(task)}${task.area_name ? ` · ${this._html(task.area_name)}` : ""}</small>
        <small>${this._scheduleSummary(task)}</small>
      </div></article>`;
    }).join("");

    return `<div class="dialog-backdrop labels-backdrop"><section class="dialog wide labels-dialog">
      <header><div class="dialog-title-block"><h2>${this._t("labelSheet")}</h2><p class="section-hint">${this._t("labelSheetHint")}</p></div><button class="icon" data-action="close-labels"><ha-icon icon="mdi:close"></ha-icon></button></header>
      <div class="dialog-body">${tasks.length ? `<div class="label-sheet">${cards}</div>` : `<p class="section-hint">${this._t("noDataYet")}</p>`}</div>
      <footer><button class="ghost" data-action="close-labels">${this._t("cancel")}</button><button class="primary" data-action="print-labels"><ha-icon icon="mdi:printer"></ha-icon>${this._t("print")}</button></footer>
    </section></div>`;
  },
});
