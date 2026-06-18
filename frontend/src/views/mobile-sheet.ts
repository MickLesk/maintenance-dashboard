// Mobile bottom action sheet for compact task interactions.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _isMobileViewport() {
    return typeof window !== "undefined" && window.matchMedia("(max-width: 760px)").matches;
  },

  _mobileActionSheetHtml() {
    if (!this._mobileActionTaskId) return "";
    const task = (this._state?.tasks || []).find(item => item.id === this._mobileActionTaskId);
    if (!task) return "";
    const runtime = this._state?.runtime?.[task.id] || {};
    const completed = runtime.status === "completed";
    const workflowState = task.workflow_state || "planned";
    const actions = completed
      ? `<button class="ghost" data-edit="${task.id}"><ha-icon icon="mdi:pencil"></ha-icon>${this._t("edit")}</button><button class="primary" data-reactivate="${task.id}"><ha-icon icon="mdi:restore"></ha-icon>${this._t("reactivate")}</button>`
      : `<button class="primary" data-done="${task.id}"><ha-icon icon="mdi:check"></ha-icon>${this._t("done")}</button><button class="ghost" data-task-id="${task.id}" data-workflow-state="in_progress"><ha-icon icon="mdi:play"></ha-icon>${this._t("workflowStart")}</button><button class="ghost" data-task-id="${task.id}" data-workflow-state="ready"><ha-icon icon="mdi:pause"></ha-icon>${this._t("workflowReady")}</button><button class="ghost" data-task-id="${task.id}" data-workflow-state="blocked"><ha-icon icon="mdi:pause-octagon-outline"></ha-icon>${this._t("workflowBlock")}</button><button class="ghost" data-reset-task-progress="${task.id}"><ha-icon icon="mdi:restart"></ha-icon>${this._t("workflowResetAction")}</button><button class="ghost" data-snooze-menu="${task.id}"><ha-icon icon="mdi:clock-plus-outline"></ha-icon>${this._t("snooze")}</button><button class="ghost" data-edit="${task.id}"><ha-icon icon="mdi:pencil"></ha-icon>${this._t("edit")}</button><button class="ghost" data-action="open-task-detail" data-task-id="${task.id}"><ha-icon icon="mdi:card-text-outline"></ha-icon>${this._t("openDetails")}</button>`;
    return `<div class="mobile-sheet-backdrop" data-action="close-mobile-actions"><aside class="mobile-action-sheet" onclick="event.stopPropagation()"><header><div><strong>${this._html(task.name)}</strong><small>${this._categoryLabel(task)} · ${this._workflowStateLabel(workflowState)}</small></div><button class="icon" data-action="close-mobile-actions"><ha-icon icon="mdi:close"></ha-icon></button></header><div class="mobile-action-list">${actions}</div></aside></div>`;
  },
});
