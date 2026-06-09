// Backup, restore, import and export dialog rendering.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _dataDialogHtml() {
    if (!this._dataDialog) return "";
    const backups = this._state?.backups || [];
    return `<div class="dialog-backdrop"><section class="dialog"><header><h2>${this._t("dataSafety")}</h2><button class="icon" data-action="close-data-dialog"><ha-icon icon="mdi:close"></ha-icon></button></header><div class="dialog-body"><section class="dialog-section"><h3>${this._t("exportData")}</h3><p>Export tasks, history and backup metadata as JSON.</p><button class="primary" data-action="export-data"><ha-icon icon="mdi:download"></ha-icon>${this._t("exportData")}</button></section><section class="dialog-section"><h3>${this._t("importData")}</h3><textarea id="importPayload" placeholder="${this._t("importPaste")}">${this._html(this._importPayload)}</textarea><button class="ghost" data-action="import-data"><ha-icon icon="mdi:upload"></ha-icon>${this._t("importJson")}</button></section><section class="dialog-section"><h3>${this._t("backupRestore")}</h3>${backups.length ? backups.map(b => `<div class="backup-row"><span>${this._datetime(b.created_at)} · ${this._html(b.reason)} · ${b.task_count} tasks</span><button class="ghost" data-restore="${b.id}">${this._t("restore")}</button></div>`).join("") : `<p>${this._t("noHistory")}</p>`}</section></div></section></div>`;
  }
});
