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
    return `<article class="task-card ${status}" data-task-card="${this._html(task.id)}" style="--task-accent:${this._html(accent)}">
      <header>
        <label class="task-select" title="${this._t("selectedTasksCount")}"><input type="checkbox" data-select-task="${task.id}" ${this._selectedTasks.has(task.id) ? "checked" : ""}><span></span></label>
        <div class="title-row"><span class="icon-chip" style="${task.icon_color ? `color:${this._html(task.icon_color)}` : ""}"><ha-icon icon="${this._html(task.icon || "mdi:wrench-clock")}"></ha-icon></span><div><h3>${this._html(task.name)}</h3><p>${this._categoryLabel(task)} · ${this._scheduleSummary(task)}${task.area_name ? ` · ${this._html(task.area_name)}` : ""}</p></div></div>
        <span class="status ${status}">${completed ? this._t("archived") : this._t(status)}</span>
      </header>
      ${task.description ? `<p class="description">${this._html(task.description)}</p>` : ""}
      ${task.tags?.length ? `<div class="tag-strip">${task.tags.slice(0, 6).map(tag => `<button data-quick-tag="${this._html(tag)}">#${this._html(tag)}</button>`).join("")}</div>` : ""}
      <div class="progress-line"><span>${this._t("progress")}</span><strong>${Math.round(progress)}%</strong></div>
      <div class="progress"><div style="width:${progress}%"></div></div>
      <div class="meta-grid">
        <div><span>${this._t("lastDone")}</span><strong>${this._date(r.last_done)}</strong></div>
        <div><span>${completed ? this._t("archived") : this._t("due")}</span><strong>${completed ? this._date(task.completed_at) : this._date(r.due_at)}</strong></div>
        <div><span>${this._t("remaining")}</span><strong>${completed ? "—" : this._remaining(r, task)}</strong></div>
        <div><span>${this._t("priority")}</span><strong>${this._priorityLabel(task.priority)}<em>${task.priority}/5</em></strong></div>
      </div>
      ${snoozed ? `<div class="snooze-note"><ha-icon icon="mdi:pause-circle-outline"></ha-icon>${this._t("pausedUntil")} ${this._datetime(task.snoozed_until)}</div>` : ""}
      <footer class="actions">
        <button class="ghost icon-only" title="${this._t("edit")}" data-edit="${task.id}"><ha-icon icon="mdi:pencil"></ha-icon></button>
        ${completed ? `<button class="primary" data-reactivate="${task.id}"><ha-icon icon="mdi:restore"></ha-icon>${this._t("reactivate")}</button>` : `<div class="snooze-wrap"><button class="ghost icon-only" title="${this._t("snooze")}" data-snooze-menu="${task.id}"><ha-icon icon="mdi:clock-plus-outline"></ha-icon></button>${this._snoozeMenu === task.id ? `<div class="snooze-menu"><strong>${this._t("snoozeFor")}</strong>${options.map(days => `<button data-snooze-days="${task.id}:${days}">${days} ${this._t("days")}</button>`).join("")}</div>` : ""}</div>${snoozed ? `<button class="ghost" data-clear-snooze="${task.id}"><ha-icon icon="mdi:play-circle-outline"></ha-icon>${this._t("clearSnooze")}</button>` : ""}<button class="primary" data-done="${task.id}"><ha-icon icon="mdi:check"></ha-icon>${this._t("done")}</button>`}
      </footer>
    </article>`;
  }
});
