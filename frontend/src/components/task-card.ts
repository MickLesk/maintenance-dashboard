// Task card rendering.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _taskCard(task) {
    const r = this._state.runtime[task.id] || {};
    const status = r.status || "unavailable";
    const completed = status === "completed";
    const progress = completed ? 100 : Math.min(100, Math.max(0, r.progress || 0));
    const accent = this._statusAccent(status, task.card_color || task.icon_color || "var(--primary-color)");
    const snoozed = status === "snoozed";
    const options = this._snoozeOptions(task);
    const checklist = Array.isArray(task.checklist) ? task.checklist : [];
    const checklistProgress = this._checklistProgress(task);
    const showChecklist = this._workflowSettings().show_checklists !== false && checklist.length;
    const workflowState = task.workflow_state || "planned";
    const recurrenceMode = task.recurrence_mode || "standard";
    const execution = task.current_execution || {};
    const executionStats = task.execution_stats || {};
    const canStart = !completed && workflowState !== "in_progress";
    const canBlock = !completed && workflowState !== "blocked";
    const statTotal = Number(executionStats.completed || 0) + Number(executionStats.skipped || 0) + Number(executionStats.resets || 0);
    const primaryWorkflow = canStart
      ? `<button class="ghost" title="${this._t("workflowStart")}" data-task-id="${task.id}" data-workflow-state="in_progress"><ha-icon icon="mdi:play"></ha-icon>${this._t("workflowStartShort")}</button>`
      : `<button class="ghost" title="${this._t("workflowReady")}" data-task-id="${task.id}" data-workflow-state="ready"><ha-icon icon="mdi:pause"></ha-icon>${this._t("workflowPauseShort")}</button>`;
    const workflowMenu = !completed ? `<div class="workflow-menu-wrap"><button class="ghost icon-only" title="${this._t("moreActions")}" data-workflow-menu="${task.id}"><ha-icon icon="mdi:dots-vertical"></ha-icon></button>${this._workflowMenu === task.id ? `<div class="workflow-menu"><button data-task-id="${task.id}" data-workflow-state="${canBlock ? "blocked" : "ready"}"><ha-icon icon="${canBlock ? "mdi:pause-octagon-outline" : "mdi:play-pause"}"></ha-icon>${canBlock ? this._t("workflowBlock") : this._t("workflowReady")}</button><button data-reset-task-progress="${task.id}"><ha-icon icon="mdi:restart"></ha-icon>${this._t("workflowResetAction")}</button>${task.schedule_mode !== "one_time" ? `<button data-restart-task-cycle="${task.id}"><ha-icon icon="mdi:refresh"></ha-icon>${this._t("restartCycle")}</button><button data-skip-task-cycle="${task.id}"><ha-icon icon="mdi:skip-next"></ha-icon>${this._t("skipCycle")}</button>` : ""}</div>` : ""}</div>` : "";
    const mobile = this._isMobileViewport();
    const footerActions = mobile
      ? `<button class="primary" data-done="${task.id}"><ha-icon icon="mdi:check"></ha-icon>${this._t("done")}</button><button class="ghost" data-mobile-actions="${task.id}"><ha-icon icon="mdi:dots-horizontal"></ha-icon>${this._t("mobileActions")}</button>`
      : `${completed ? `<button class="primary" data-reactivate="${task.id}"><ha-icon icon="mdi:restore"></ha-icon>${this._t("reactivate")}</button>` : `${primaryWorkflow}<div class="snooze-wrap"><button class="ghost icon-only" title="${this._t("snooze")}" data-snooze-menu="${task.id}"><ha-icon icon="mdi:clock-plus-outline"></ha-icon></button>${this._snoozeMenu === task.id ? `<div class="snooze-menu"><strong>${this._t("snoozeFor")}</strong>${options.map(days => `<button data-snooze-days="${task.id}:${days}">${days} ${this._t("days")}</button>`).join("")}</div>` : ""}</div>${snoozed ? `<button class="ghost" data-clear-snooze="${task.id}"><ha-icon icon="mdi:play-circle-outline"></ha-icon>${this._t("clearSnooze")}</button>` : ""}${workflowMenu}<button class="primary" data-done="${task.id}"><ha-icon icon="mdi:check"></ha-icon>${this._t("done")}</button>`}`;
    return `<article class="task-card ${status}" data-task-card="${this._html(task.id)}" style="--task-accent:${this._html(accent)}">
      <header>
        <label class="task-select" title="${this._t("selectedTasksCount")}"><input type="checkbox" data-select-task="${task.id}" ${this._selectedTasks.has(task.id) ? "checked" : ""}><span></span></label>
        <div class="title-row"><span class="icon-chip" style="${task.icon_color ? `color:${this._html(task.icon_color)}` : ""}"><ha-icon icon="${this._html(task.icon || "mdi:wrench-clock")}"></ha-icon></span><div><h3>${this._html(task.name)}</h3><p>${this._categoryLabel(task)} · ${this._scheduleSummary(task)}${task.area_name ? ` · ${this._html(task.area_name)}` : ""}</p></div></div>
        <span class="status ${status}">${completed ? this._t("archived") : this._t(status)}</span>
      </header>
      <div class="workflow-strip"><span class="workflow-state state-${this._html(workflowState)}">${this._workflowStateLabel(workflowState)}</span><span class="workflow-metric">${this._t(recurrenceMode === "persistent" ? "recurrencePersistentShort" : "recurrenceStandardShort")}</span>${execution.sequence ? `<span class="workflow-metric">#${execution.sequence}</span>` : ""}${showChecklist ? `<span class="workflow-metric">${this._t("checklist")}: ${checklistProgress.done}/${checklistProgress.total}</span>` : ""}</div>
      ${task.description ? `<p class="description">${this._html(task.description)}</p>` : ""}
      ${task.tags?.length ? `<div class="tag-strip">${task.tags.slice(0, 6).map(tag => `<button data-quick-tag="${this._html(tag)}">#${this._html(tag)}</button>`).join("")}</div>` : ""}
      ${showChecklist ? `<div class="checklist-preview">${checklist.slice(0, 4).map((item, index) => `<label class="checklist-item ${item.done ? "done" : ""} ${item.required ? "is-required" : ""}"><input type="checkbox" data-toggle-checklist="${task.id}:${index}" ${item.done ? "checked" : ""} ${completed ? "disabled" : ""}><span>${this._html(item.label)}</span>${item.required ? `<span class="required-mark" aria-label="${this._t("required")}" title="${this._t("required")}"></span>` : ""}</label>`).join("")}${checklist.length > 4 ? `<small>${this._t("checklistMore").replace("{count}", String(checklist.length - 4))}</small>` : ""}</div>` : ""}
      <div class="progress-line"><span>${this._t("progress")}</span><strong>${Math.round(progress)}%</strong></div>
      <div class="progress"><div style="width:${progress}%"></div></div>
      <div class="meta-grid">
        <div><span>${this._t("lastDone")}</span><strong>${this._date(r.last_done)}</strong></div>
        <div><span>${completed ? this._t("archived") : this._t("due")}</span><strong>${completed ? this._date(task.completed_at) : this._date(r.due_at)}</strong></div>
        <div><span>${this._t("remaining")}</span><strong>${completed ? "—" : this._remaining(r, task)}</strong></div>
        <div><span>${this._t("priority")}</span><strong>${this._priorityLabel(task.priority)}<em>${task.priority}/5</em></strong></div>
      </div>
      ${statTotal ? `<div class="workflow-meta-row"><small>${this._t("runsCompleted")}: ${executionStats.completed || 0}</small><small>${this._t("runsSkipped")}: ${executionStats.skipped || 0}</small><small>${this._t("workflowResets")}: ${executionStats.resets || 0}</small></div>` : ""}
      ${snoozed ? `<div class="snooze-note"><ha-icon icon="mdi:pause-circle-outline"></ha-icon>${this._t("pausedUntil")} ${this._datetime(task.snoozed_until)}</div>` : ""}
      <footer class="actions">
        <button class="ghost icon-only" title="${this._t("edit")}" data-edit="${task.id}"><ha-icon icon="mdi:pencil"></ha-icon></button>
        ${footerActions}
      </footer>
    </article>`;
  }
});
