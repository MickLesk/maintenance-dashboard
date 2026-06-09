// Completion note dialog rendering.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _completionDialogHtml() {
    if (!this._completionDialog) return "";
    const task = (this._state?.tasks || []).find(t => t.id === this._completionDialog);
    return `<div class="dialog-backdrop"><section class="dialog small"><header><h2>${this._t("done")}</h2><button class="icon" data-action="close-completion"><ha-icon icon="mdi:close"></ha-icon></button></header><div class="dialog-body"><section class="dialog-section"><h3>${this._html(task?.name || "")}</h3><label class="description-field"><span>${this._t("completionNote")}</span><textarea id="completionNote" placeholder="${this._t("noteOptional")}">${this._html(this._completionNote)}</textarea></label></section></div><footer><button class="ghost" data-action="close-completion">${this._t("cancel")}</button><button class="primary" data-action="confirm-done"><ha-icon icon="mdi:check"></ha-icon>${this._t("markDone")}</button></footer></section></div>`;
  }
});
