// Notification settings, entity settings and test dialog rendering.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _notificationDialogHtml() {
    if (!this._notificationDialog) return "";
    const settings = this._state?.settings || {};
    const n = settings.notifications || {};
    const e = settings.task_entities || {};
    const checked = v => v ? "checked" : "";
    return `<div class="dialog-backdrop"><section class="dialog"><header><h2>${this._t("notifications")}</h2><button class="icon" data-action="close-notification-dialog"><ha-icon icon="mdi:close"></ha-icon></button></header><div class="dialog-body">
      <section class="dialog-section">
        <h3>${this._t("notifications")}</h3>
        <label class="check"><input id="notifyEnabled" type="checkbox" ${checked(n.enabled)}><span>Enabled</span></label>
        <div class="form-grid">
          <label class="field"><span>${this._t("notifyService")}</span><input id="notifyService" value="${this._html(n.notify_service || this._notifyService || "")}" placeholder="notify.mobile_app_phone"></label>
          <label class="field"><span>${this._t("digestTime")}</span><input id="digestTime" type="time" value="${this._html(n.digest_time || "08:00")}"></label>
          <label class="field"><span>${this._t("quietFrom")}</span><input id="quietFrom" type="time" value="${this._html(n.quiet_from || "22:00")}"></label>
          <label class="field"><span>${this._t("quietTo")}</span><input id="quietTo" type="time" value="${this._html(n.quiet_to || "07:00")}"></label>
        </div>
        <div class="toggle-grid">
          <label class="check"><input id="notifyWarning" type="checkbox" ${checked(n.warning !== false)}><span>${this._t("warningNotifications")}</span></label>
          <label class="check"><input id="notifyCritical" type="checkbox" ${checked(n.critical !== false)}><span>${this._t("criticalNotifications")}</span></label>
          <label class="check"><input id="notifyDue" type="checkbox" ${checked(n.due !== false)}><span>${this._t("dueNotifications")}</span></label>
          <label class="check"><input id="dailyDigest" type="checkbox" ${checked(n.daily_digest)}><span>${this._t("dailyDigest")}</span></label>
          <label class="check"><input id="quietHours" type="checkbox" ${checked(n.quiet_hours_enabled)}><span>${this._t("quietHours")}</span></label>
          <label class="check"><input id="includeSnoozed" type="checkbox" ${checked(n.include_snoozed)}><span>${this._t("includeSnoozed")}</span></label>
          <label class="check"><input id="includeDashboardLink" type="checkbox" ${checked(n.include_dashboard_link !== false)}><span>${this._t("includeDashboardLink")}</span></label>
        </div>
        <p class="section-hint">Use any Home Assistant notify service or leave empty to create a persistent notification.</p>
      </section>
      <section class="dialog-section">
        <h3>${this._t("entityMode")}</h3>
        <p class="section-hint">${this._t("entityModeHint")}</p>
        <label class="field"><span>${this._t("entityMode")}</span><select id="entityMode"><option value="off" ${e.mode === "off" ? "selected" : ""}>${this._t("off")}</option><option value="due_only" ${e.mode === "due_only" ? "selected" : ""}>${this._t("dueOnly")}</option><option value="basic" ${e.mode === "basic" ? "selected" : ""}>${this._t("basic")}</option><option value="full" ${e.mode === "full" ? "selected" : ""}>${this._t("full")}</option></select></label>
        <p class="section-hint">Changing this setting may require a Home Assistant restart or integration reload to create new task entities.</p>
      </section>
      <section class="dialog-section"><div class="button-row"><button class="primary" data-action="save-notification-settings"><ha-icon icon="mdi:content-save"></ha-icon>${this._t("save")}</button><button class="ghost" data-action="test-notification"><ha-icon icon="mdi:bell-ring-outline"></ha-icon>${this._t("testNotification")}</button><button class="ghost" data-action="send-digest"><ha-icon icon="mdi:message-text-clock-outline"></ha-icon>${this._t("sendDigest")}</button><button class="ghost" data-action="notify-due"><ha-icon icon="mdi:alert-outline"></ha-icon>${this._t("notifyDueTasks")}</button></div></section>
    </div></section></div>`;
  }
});
