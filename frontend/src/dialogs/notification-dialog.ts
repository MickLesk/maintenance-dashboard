// Notification settings, per-task preview, history and entity integration settings.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _notificationDialogHtml() {
    if (!this._notificationDialog) return "";
    const settings = this._state?.settings || {};
    const n = settings.notifications || {};
    const e = settings.task_entities || {};
    const checked = value => value ? "checked" : "";
    const tasks = (this._state?.tasks || []).filter(task => !task.deleted);
    const history = (this._state?.notification_state?.history || []).slice(0, 30);
    const preview = this._notificationPreview;
    return `<div class="dialog-backdrop"><section class="dialog"><header><h2>${this._t("notifications")}</h2><button class="icon" data-action="close-notification-dialog"><ha-icon icon="mdi:close"></ha-icon></button></header><div class="dialog-body">
      <section class="dialog-section notification-overview">
        <div><p class="eyebrow">Maintenance Dashboard</p><h3>${this._t("notificationRules")}</h3><p class="section-hint">${this._t("notificationRulesHint")}</p></div>
        <label class="switch-card"><input id="notifyEnabled" type="checkbox" ${checked(n.enabled)}><span><strong>${this._t("notifications")}</strong><small>${n.enabled ? this._t("enabled") : this._t("off")}</small></span></label>
      </section>
      <section class="dialog-section">
        <h3>${this._t("notifications")}</h3>
        <div class="form-grid">
          <label class="field"><span>${this._t("notifyService")}</span><input id="notifyService" value="${this._html(n.notify_service || this._notifyService || "")}" placeholder="notify.mobile_app_phone"></label>
          <label class="field"><span>${this._t("digestTime")}</span><input id="digestTime" type="time" value="${this._html(n.digest_time || "08:00")}"></label>
          <label class="field"><span>${this._t("repeatEveryDays")}</span><input id="notificationRepeatDays" type="number" min="0" max="365" value="${this._html(n.repeat_days ?? 3)}"></label>
          <label class="field"><span>${this._t("escalationAfterDays")}</span><input id="notificationEscalationDays" type="number" min="0" max="365" value="${this._html(n.escalation_after_days ?? 3)}"></label>
          <label class="field"><span>${this._t("actionSnoozeDays")}</span><input id="actionSnoozeDays" type="number" min="1" max="365" value="${this._html(n.action_snooze_days ?? 7)}"></label>
          <label class="field"><span>${this._t("notificationHistoryRetention")}</span><input id="notificationHistoryRetention" type="number" min="20" max="2000" value="${this._html(n.history_retention ?? 200)}"></label>
        </div>
        <div class="toggle-grid">
          <label class="check"><input id="notifyWarning" type="checkbox" ${checked(n.warning !== false)}><span>${this._t("warningNotifications")}</span></label>
          <label class="check"><input id="notifyCritical" type="checkbox" ${checked(n.critical !== false)}><span>${this._t("criticalNotifications")}</span></label>
          <label class="check"><input id="notifyOverdue" type="checkbox" ${checked(n.overdue !== false)}><span>${this._t("overdueNotifications")}</span></label>
          <label class="check"><input id="notifyUnavailable" type="checkbox" ${checked(Boolean(n.unavailable))}><span>${this._t("unavailableNotifications")}</span></label>
          <label class="check"><input id="notifyDue" type="checkbox" ${checked(n.due !== false)}><span>${this._t("dueNotifications")}</span></label>
          <label class="check"><input id="oncePerStatus" type="checkbox" ${checked(n.once_per_status !== false)}><span>${this._t("oncePerStatus")}</span></label>
          <label class="check"><input id="notificationEscalation" type="checkbox" ${checked(n.escalation_enabled !== false)}><span>${this._t("escalation")}</span></label>
          <label class="check"><input id="actionableNotifications" type="checkbox" ${checked(n.actionable !== false)}><span>${this._t("actionableNotifications")}</span></label>
          <label class="check"><input id="notificationTestMode" type="checkbox" ${checked(Boolean(n.test_mode))}><span>${this._t("testMode")}</span></label>
        </div>
      </section>
      <section class="dialog-section">
        <h3>${this._t("dailyDigest")}</h3>
        <div class="toggle-grid">
          <label class="check"><input id="dailyDigest" type="checkbox" ${checked(n.daily_digest)}><span>${this._t("dailyDigest")}</span></label>
          <label class="check"><input id="digestGroupByCategory" type="checkbox" ${checked(n.digest_group_by_category !== false)}><span>${this._t("groupDigestByCategory")}</span></label>
          <label class="check"><input id="includeSnoozed" type="checkbox" ${checked(n.include_snoozed)}><span>${this._t("includeSnoozed")}</span></label>
          <label class="check"><input id="includeDashboardLink" type="checkbox" ${checked(n.include_dashboard_link !== false)}><span>${this._t("includeDashboardLink")}</span></label>
        </div>
      </section>
      <section class="dialog-section">
        <h3>${this._t("quietHours")}</h3>
        <div class="form-grid">
          <label class="field"><span>${this._t("quietFrom")}</span><input id="quietFrom" type="time" value="${this._html(n.quiet_from || "22:00")}"></label>
          <label class="field"><span>${this._t("quietTo")}</span><input id="quietTo" type="time" value="${this._html(n.quiet_to || "07:00")}"></label>
        </div>
        <label class="check"><input id="quietHours" type="checkbox" ${checked(n.quiet_hours_enabled)}><span>${this._t("quietHours")}</span></label>
      </section>
      <section class="dialog-section">
        <h3>${this._t("notificationPreview")}</h3>
        <div class="form-grid"><label class="field"><span>${this._t("previewTask")}</span><select id="notificationPreviewTask"><option value="">—</option>${tasks.map(task => `<option value="${this._html(task.id)}" ${this._notificationPreviewTask === task.id ? "selected" : ""}>${this._html(task.name)}</option>`).join("")}</select></label></div>
        <div class="button-row"><button class="ghost" data-action="preview-notification" ${this._notificationPreviewTask ? "" : "disabled"}><ha-icon icon="mdi:eye-outline"></ha-icon>${this._t("notificationPreview")}</button><button class="ghost" data-action="test-notification"><ha-icon icon="mdi:bell-ring-outline"></ha-icon>${this._t("testNotification")}</button><button class="ghost" data-action="send-digest"><ha-icon icon="mdi:message-text-clock-outline"></ha-icon>${this._t("sendDigest")}</button><button class="ghost" data-action="notify-due"><ha-icon icon="mdi:alert-outline"></ha-icon>${this._t("notifyDueTasks")}</button><button class="ghost" data-action="process-notifications"><ha-icon icon="mdi:refresh-auto"></ha-icon>${this._t("processNotificationsNow")}</button></div>
        ${preview ? `<article class="notification-preview-card ${this._html(preview.level || "normal")}"><small>${this._html(preview.service || "")}</small><h4>${this._html(preview.title || "")}</h4><pre>${this._html(preview.message || "")}</pre><div class="preview-actions">${(preview.data?.actions || []).map(action => `<span>${this._html(action.title)}</span>`).join("")}</div></article>` : ""}
      </section>
      <section class="dialog-section">
        <h3>${this._t("entityMode")}</h3><p class="section-hint">${this._t("entitySyncHint")}</p>
        <div class="form-grid"><label class="field"><span>${this._t("entityMode")}</span><select id="entityMode"><option value="off" ${e.mode === "off" ? "selected" : ""}>${this._t("off")}</option><option value="due_only" ${e.mode === "due_only" ? "selected" : ""}>${this._t("dueOnly")}</option><option value="basic" ${e.mode === "basic" ? "selected" : ""}>${this._t("basic")}</option><option value="full" ${e.mode === "full" ? "selected" : ""}>${this._t("full")}</option></select></label><label class="field"><span>${this._t("entityGrouping")}</span><select id="entityGrouping"><option value="dashboard" ${e.device_grouping === "dashboard" ? "selected" : ""}>${this._t("entityGroupingDashboard")}</option><option value="category" ${e.device_grouping === "category" ? "selected" : ""}>${this._t("entityGroupingCategory")}</option><option value="none" ${e.device_grouping === "none" ? "selected" : ""}>${this._t("entityGroupingNone")}</option></select></label></div>
        <label class="check"><input id="cleanupRemovedEntities" type="checkbox" ${checked(Boolean(e.cleanup_removed))}><span>${this._t("cleanupRemovedEntities")}</span></label>
        <button class="ghost" data-action="cleanup-task-entities"><ha-icon icon="mdi:broom"></ha-icon>${this._t("cleanupEntitiesNow")}</button>
      </section>
      <section class="dialog-section"><div class="section-title-actions"><h3>${this._t("notificationHistory")}</h3><button class="ghost small" data-action="clear-notification-history" ${history.length ? "" : "disabled"}><ha-icon icon="mdi:delete-sweep-outline"></ha-icon>${this._t("clearNotificationHistory")}</button></div>${history.length ? `<div class="notification-history">${history.map(item => `<article><div><strong>${this._html(item.task_name || item.title || item.kind || "Notification")}</strong><small>${this._datetime(item.sent_at)} · ${this._html(item.status || item.kind || "")}${item.automatic ? ` · ${this._t("automatic")}` : ` · ${this._t("manual")}`}${item.error ? ` · ${this._html(item.error)}` : ""}</small></div><span class="status ${item.success === false ? "critical" : this._html(item.status || item.level || "ok")}">${item.success === false ? this._t("notificationFailed") : this._html(item.level || item.status || "ok")}</span></article>`).join("")}</div>` : `<p>${this._t("notificationHistoryEmpty")}</p>`}</section>
      <section class="dialog-section"><div class="button-row"><button class="primary" data-action="save-notification-settings"><ha-icon icon="mdi:content-save"></ha-icon>${this._t("save")}</button></div></section>
    </div></section></div>`;
  }
});
