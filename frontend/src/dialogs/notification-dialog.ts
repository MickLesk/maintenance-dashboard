// Notification settings and test dialog rendering.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _notificationDialogHtml() {
    if (!this._notificationDialog) return "";
    return `<div class="dialog-backdrop"><section class="dialog small"><header><h2>${this._t("notifications")}</h2><button class="icon" data-action="close-notification-dialog"><ha-icon icon="mdi:close"></ha-icon></button></header><div class="dialog-body"><section class="dialog-section"><label class="field"><span>${this._t("notifyService")}</span><input id="notifyService" value="${this._html(this._notifyService)}" placeholder="notify.mobile_app_phone"></label><p class="section-hint">Use any Home Assistant notify service or leave empty to create a persistent notification.</p><div class="button-row"><button class="ghost" data-action="test-notification"><ha-icon icon="mdi:bell-ring-outline"></ha-icon>${this._t("testNotification")}</button><button class="primary" data-action="send-digest"><ha-icon icon="mdi:message-text-clock-outline"></ha-icon>${this._t("sendDigest")}</button></div></section></div></section></div>`;
  }
});
