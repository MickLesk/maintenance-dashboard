// Quality check panel with quick-fix suggestions.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _qualityDialogHtml() {
    if (!this._qualityDialogOpen) return "";
    const issues = this._qualityIssues();
    return `<div class="dialog-backdrop"><section class="dialog small quality-dialog"><header><div class="dialog-title-block"><h2>${this._t("qualityIssuesTitle")}</h2><p class="section-hint">${issues.length} ${this._t("taskLabel")}</p></div><button class="icon" data-action="close-quality-dialog"><ha-icon icon="mdi:close"></ha-icon></button></header><div class="dialog-body"><div class="quality-issue-list">${issues.map(task => {
      const taskIssues = this._taskQualityIssues(task);
      const fixes = taskIssues.map(issue => `<button class="ghost small" data-quality-fix="${task.id}:${issue}">${this._t(`qualityFix_${issue}`)}</button>`).join("");
      return `<article class="quality-issue-row"><div><strong>${this._html(task.name)}</strong><small>${taskIssues.map(issue => this._t(`qualityIssue_${issue}`)).join(" · ")}</small></div><div class="quality-fix-actions">${fixes}<button class="ghost small" data-edit="${task.id}"><ha-icon icon="mdi:pencil"></ha-icon>${this._t("edit")}</button></div></article>`;
    }).join("")}</div></div><footer><button class="ghost" data-action="close-quality-dialog">${this._t("cancel")}</button></footer></section></div>`;
  },

  async _applyQualityFix(taskId, issue) {
    const task = (this._state?.tasks || []).find(item => item.id === taskId);
    if (!task) return;
    const patch = {};
    if (issue === "description") patch.description = this._t("qualityFixDescriptionDefault");
    if (issue === "category") patch.category = "general";
    if (issue === "tags" && (!Array.isArray(task.tags) || !task.tags.length)) patch.tags = ["maintenance"];
    if (issue === "interval") {
      patch.interval = 90;
      patch.interval_unit = "days";
    }
    if (!Object.keys(patch).length) return;
    await this.hass.callWS({ type: "maintenance_dashboard/update_task", task_id: taskId, patch });
    await this._load();
    this._showToast(this._t("applyQualityFix"));
  },
});
