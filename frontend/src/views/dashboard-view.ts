// Dashboard view rendering, configurable KPI widgets, layouts, filters and bulk actions.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _dashboardHtml() {
    const tasks = this._filteredTasks(false);
    const savedFilters = this._state?.settings?.dashboard?.saved_filters || [];
    return `
      ${this._dashboardWidgetsHtml()}
      ${this._dashboardFocusBarHtml()}
      <section class="toolbar dashboard-toolbar compact-dashboard-toolbar">
        <div class="toolbar-main dashboard-main">
          <input id="search" class="search" placeholder="${this._t("search")}" value="${this._html(this._search)}">
          <label><span>${this._t("status")}</span><select id="statusFilter">${["all", "ok", "warning", "critical", "overdue", "snoozed", "unavailable", "completed"].map(x => `<option value="${x}" ${this._statusFilter === x ? "selected" : ""}>${this._t(x)}</option>`).join("")}</select></label>
          <label><span>${this._t("sort")}</span><select id="sortMode">${["smart", "position", "priority", "due", "status", "name", "area", "created", "updated"].map(x => `<option value="${x}" ${this._sortMode === x ? "selected" : ""}>${this._t(`sort${x[0].toUpperCase()}${x.slice(1)}`)}</option>`).join("")}</select></label>
          <button class="ghost icon-only" data-action="toggle-quick-filters" title="${this._t("filters")}"><ha-icon icon="mdi:filter-variant"></ha-icon></button>
          <button class="ghost completed-toggle" data-action="toggle-completed"><ha-icon icon="mdi:archive-check-outline"></ha-icon>${this._showCompleted ? this._t("hideCompleted") : this._t("showCompleted")}</button>
        </div>
        <div class="layout-switch" role="group" aria-label="${this._t("dashboardLayout")}">
          ${this._layoutButton("cards", "mdi:view-grid-outline", "cardsView")}
          ${this._layoutButton("compact", "mdi:view-list-outline", "compactView")}
          ${this._layoutButton("timeline", "mdi:timeline-clock-outline", "timelineView")}
        </div>
      </section>
      ${this._quickFiltersOpen ? this._quickFiltersHtml() : ""}
      ${this._showAdvancedFilters ? this._advancedFiltersHtml(savedFilters) : ""}
      ${tasks.length ? this._taskLayoutHtml(tasks) : this._emptyHtml()}
      ${this._selectedTasks.size ? this._bulkToolbarHtml() : ""}
      <div class="quick-create-wrap">${this._quickCreateOpen ? `<div class="quick-create-menu"><button data-action="create"><ha-icon icon="mdi:plus"></ha-icon>${this._t("createEmpty")}</button><button data-action="quick-create-template"><ha-icon icon="mdi:shape-plus-outline"></ha-icon>${this._t("createFromTemplate")}</button></div>` : ""}<button class="dashboard-fab extended-fab" data-action="toggle-quick-create" title="${this._t("newEntry")}" aria-label="${this._t("newEntry")}"><ha-icon icon="mdi:plus"></ha-icon><span>${this._t("newEntry")}</span></button></div>
    `;
  },

  _dashboardFocusBarHtml() {
    const saved = (this._state?.settings?.dashboard?.saved_filters || []).filter(filter => filter.pinned).slice(0, 6);
    const suggestions = this._qualityIssues();
    return `<section class="dashboard-focus-bar">
      <button data-action="apply-today-focus"><ha-icon icon="mdi:calendar-today"></ha-icon><span>${this._t("todayFocus")}</span><strong>${this._countDueByFilter("today")}</strong></button>
      <button data-quick-filter="due:week"><ha-icon icon="mdi:calendar-week"></ha-icon><span>${this._t("thisWeek")}</span><strong>${this._countDueByFilter("week")}</strong></button>
      <button data-quick-filter="status:overdue"><ha-icon icon="mdi:alert-octagon-outline"></ha-icon><span>${this._t("overdue")}</span><strong>${this._countByStatus("overdue")}</strong></button>
      <button data-quick-filter="status:all" class="quality-chip" data-action="apply-quality-check"><ha-icon icon="mdi:clipboard-search-outline"></ha-icon><span>${this._t("qualityCheck")}</span><strong>${suggestions.length}</strong></button>
      ${saved.map(filter => `<button data-apply-filter="${this._html(filter.id)}"><ha-icon icon="mdi:view-dashboard-edit-outline"></ha-icon><span>${this._html(filter.name)}</span></button>`).join("")}
    </section>`;
  },

  _dashboardWidgetsHtml() {
    const s = this._state?.summary || {};
    const health = Number(s.health ?? 100);
    const unavailable = Number(s.unavailable ?? 0);
    const items = [
      `<strong class="status-health ${health < 70 ? "warning" : ""}"><ha-icon icon="mdi:heart-pulse"></ha-icon>${health}% ${this._t("health")}</strong>`,
      `<span class="status-open metric-popover"><ha-icon icon="mdi:circle-outline"></ha-icon><b>${s.open ?? s.active ?? 0}</b> ${this._t("active")}${this._openBreakdownHtml()}</span>`,
      `<span class="${s.critical ? "critical" : ""}"><ha-icon icon="mdi:alert-circle-outline"></ha-icon><b>${s.critical ?? 0}</b> ${this._t("critical")}</span>`,
      `<span><ha-icon icon="mdi:calendar-week-outline"></ha-icon><b>${this._countDueWithinDays(7)}</b> ${this._t("dueNext7")}</span>`,
      `<span><ha-icon icon="mdi:calendar-month-outline"></ha-icon><b>${this._countDueWithinDays(30)}</b> ${this._t("dueNext30")}</span>`,
      `<span><ha-icon icon="mdi:check-circle-outline"></ha-icon><b>${s.completed_this_year ?? 0}</b> ${this._t("completedThisYear")}</span>`,
      unavailable ? `<span title="${this._t("unavailableHelp")}"><ha-icon icon="mdi:cloud-question-outline"></ha-icon><b>${unavailable}</b> ${this._t("unavailable")}</span>` : "",
    ];
    return `<section class="dashboard-status-line">${items.filter(Boolean).join("<i></i>")}</section>`;
  },

  _openBreakdownHtml() {
    const tasks = (this._state?.tasks || []).filter(task => {
      const status = this._state?.runtime?.[task.id]?.status;
      return !task.deleted && status !== "completed";
    });
    const byPriority = [5, 4, 3, 2, 1].map(priority => [priority, tasks.filter(task => Number(task.priority || 0) === priority).length]).filter(([, count]) => count);
    const workflow = [
      ["in_progress", "workflow_in_progress", tasks.filter(task => task.workflow_state === "in_progress").length],
      ["blocked", "workflow_blocked", tasks.filter(task => task.workflow_state === "blocked").length],
      ["ready", "workflow_ready", tasks.filter(task => task.workflow_state === "ready").length],
    ].filter(([, , count]) => count);
    const rows = [
      ...byPriority.map(([priority, count]) => `<div><span>${this._priorityLabel(priority)}</span><strong>${count}</strong></div>`),
      ...workflow.map(([, label, count]) => `<div><span>${this._t(label)}</span><strong>${count}</strong></div>`),
    ];
    return rows.length ? `<aside class="status-popover"><strong>${this._t("openBreakdown")}</strong>${rows.join("")}</aside>` : "";
  },

  _quickFiltersHtml() {
    const chips = [
      ["status", "all", "mdi:format-list-bulleted", "all", (this._state?.tasks || []).filter(task => !task.deleted).length],
      ["status", "overdue", "mdi:alert-octagon-outline", "overdue", this._countByStatus("overdue")],
      ["status", "critical", "mdi:alert-circle", "critical", this._countByStatus("critical")],
      ["status", "warning", "mdi:alert-outline", "warning", this._countByStatus("warning")],
      ["due", "today", "mdi:calendar-today", "today", this._countDueByFilter("today")],
      ["due", "week", "mdi:calendar-week", "thisWeek", this._countDueByFilter("week")],
      ["priority", "5", "mdi:flag-variant", "highPriority", this._countHighPriority()],
      ["entity", "missing", "mdi:cloud-question", "withoutEntity", this._countMissingEntities()],
    ];
    return `<section class="quick-filter-strip"><button data-action="toggle-advanced-filters"><ha-icon icon="mdi:tune-variant"></ha-icon><span>${this._t("advancedFilters")}</span></button>${chips.map(([kind, value, icon, label, count]) => {
      const active = (kind === "status" && this._statusFilter === value) || (kind === "due" && this._dueFilter === value) || (kind === "priority" && String(this._priorityFilter) === String(value)) || (kind === "entity" && this._entityFilter === value);
      return `<button class="${active ? "active" : ""}" data-quick-filter="${kind}:${value}"><ha-icon icon="${icon}"></ha-icon><span>${this._t(label)}</span><strong>${count}</strong></button>`;
    }).join("")}</section>`;
  },

  _countDueWithinDays(days) {
    const now = Date.now();
    const end = now + days * 86400000;
    return (this._state?.tasks || []).filter(task => {
      if (task.deleted || task.enabled === false) return false;
      const status = this._state?.runtime?.[task.id]?.status;
      if (status === "completed") return false;
      const due = this._state?.runtime?.[task.id]?.due_at;
      const ts = due ? new Date(due).getTime() : Number.NaN;
      return Number.isFinite(ts) && ts >= now && ts <= end;
    }).length;
  },

  _layoutButton(mode, icon, labelKey) {
    return `<button class="icon ${this._layoutMode === mode ? "active" : ""}" data-layout="${mode}" title="${this._t(labelKey)}"><ha-icon icon="${icon}"></ha-icon><span>${this._t(labelKey)}</span></button>`;
  },

  _advancedFiltersHtml(savedFilters) {
    const areas = [...new Map((this._state?.tasks || []).filter(t => t.area_id || t.area_name).map(t => [t.area_id || t.area_name, t.area_name || t.area_id])).entries()];
    const tags = [...new Set((this._state?.tasks || []).flatMap(t => t.tags || []))].sort();
    return `<section class="panel advanced-filter-panel">
      <header class="section-title-actions"><div><h3>${this._t("advancedFilters")}</h3><p>${this._t("filters")}</p></div><button class="icon" data-action="reset-filters" title="${this._t("clear")}"><ha-icon icon="mdi:filter-remove-outline"></ha-icon></button></header>
      <div class="filter-grid">
        <label><span>${this._t("categoryFilter")}</span><select id="categoryFilter"><option value="all">${this._t("all")}</option>${CATEGORY_KEYS.map(key => `<option value="${key}" ${this._categoryFilter === key ? "selected" : ""}>${this._t(key)}</option>`).join("")}</select></label>
        <label><span>${this._t("areaFilter")}</span><select id="areaFilter"><option value="all">${this._t("all")}</option>${areas.map(([value, label]) => `<option value="${this._html(value)}" ${this._areaFilter === value ? "selected" : ""}>${this._html(label)}</option>`).join("")}</select></label>
        <label><span>${this._t("priorityFilter")}</span><select id="priorityFilter"><option value="all">${this._t("all")}</option>${[1,2,3,4,5].map(value => `<option value="${value}" ${String(this._priorityFilter) === String(value) ? "selected" : ""}>${value} · ${this._priorityLabel(value)}</option>`).join("")}</select></label>
        <label><span>${this._t("scheduleFilter")}</span><select id="scheduleFilter"><option value="all">${this._t("all")}</option>${SCHEDULE_MODES.map(value => `<option value="${value}" ${this._scheduleFilter === value ? "selected" : ""}>${this._scheduleModeLabel(value)}</option>`).join("")}</select></label>
        <label><span>${this._t("dueFilter")}</span><select id="dueFilter">${["all","overdue","today","week","next14","month","next90","later","no_due"].map(value => `<option value="${value}" ${this._dueFilter === value ? "selected" : ""}>${this._dueFilterLabel(value)}</option>`).join("")}</select></label>
        <label><span>${this._t("tagFilter")}</span><input id="tagFilter" list="maintenanceTagOptions" value="${this._html(this._tagFilter)}"><datalist id="maintenanceTagOptions">${tags.map(tag => `<option value="${this._html(tag)}"></option>`).join("")}</datalist></label>
        <label><span>${this._t("entityFilter")}</span><select id="entityFilter"><option value="all">${this._t("all")}</option><option value="available" ${this._entityFilter === "available" ? "selected" : ""}>${this._t("hasEntity")}</option><option value="missing" ${this._entityFilter === "missing" ? "selected" : ""}>${this._t("withoutEntity")}</option></select></label>
      </div>
      <div class="saved-filter-bar">
        <label class="grow"><span>${this._t("filterName")}</span><input id="savedFilterName" value="${this._html(this._savedFilterName)}"></label>
        <button class="ghost" data-action="save-filter"><ha-icon icon="mdi:content-save-outline"></ha-icon>${this._t("saveFilter")}</button>
        <button class="ghost" data-action="save-filter-pinned"><ha-icon icon="mdi:pin-outline"></ha-icon>${this._t("savePinnedFilter")}</button>
        ${savedFilters.length ? `<div class="saved-filter-list">${savedFilters.map(filter => `<span class="saved-filter-chip"><button data-apply-filter="${this._html(filter.id)}">${this._html(filter.name)}</button><button class="icon" data-delete-filter="${this._html(filter.id)}" title="${this._t("deleteFilter")}"><ha-icon icon="mdi:close"></ha-icon></button></span>`).join("")}</div>` : ""}
      </div>
    </section>`;
  },

  _bulkToolbarHtml() {
    const selected = this._selectedTaskList();
    return `<section class="panel bulk-toolbar floating-bulk-toolbar">
      <div class="bulk-toolbar-head"><strong>${selected.length} ${this._t("selectedTasksCount")}</strong><span>${this._t("selectionToolbarHint")}</span></div>
      <label class="bulk-toolbar-field"><span>${this._t("bulkAction")}</span><select id="bulkAction">${[
        ["done","bulkDone"],["workflow","bulkWorkflow"],["reset_progress","bulkResetProgress"],["snooze","bulkSnooze"],["clear_snooze","bulkClearSnooze"],["category","bulkCategory"],["area","bulkArea"],["priority","bulkPriority"],["enable","bulkEnable"],["disable","bulkDisable"],["delete","bulkDelete"],["restore","bulkRestore"],["duplicate","bulkDuplicate"]
      ].map(([value,key]) => `<option value="${value}" ${this._bulkAction === value ? "selected" : ""}>${this._t(key)}</option>`).join("")}</select></label>
      ${this._bulkValueInputHtml()}
      <button class="primary" data-action="execute-bulk"><ha-icon icon="mdi:playlist-check"></ha-icon>${this._t("execute")}</button>
      <div class="bulk-toolbar-secondary">
        <button class="ghost" data-action="export-selected"><ha-icon icon="mdi:download-multiple"></ha-icon>${this._t("exportSelected")}</button>
        <button class="ghost" data-action="select-problem-tasks"><ha-icon icon="mdi:alert-plus-outline"></ha-icon>${this._t("selectProblems")}</button>
        <button class="ghost" data-action="invert-task-selection"><ha-icon icon="mdi:select-inverse"></ha-icon>${this._t("invertSelection")}</button>
        <button class="ghost" data-action="clear-task-selection"><ha-icon icon="mdi:selection-remove"></ha-icon>${this._t("clearSelection")}</button>
      </div>
    </section>`;
  },

  _bulkValueInputHtml() {
    if (this._bulkAction === "snooze") return `<label class="bulk-toolbar-field"><span>${this._t("days")}</span><input id="bulkValue" type="number" min="1" max="365" value="${this._html(this._bulkValue || "7")}"></label>`;
    if (this._bulkAction === "priority") return `<label class="bulk-toolbar-field"><span>${this._t("priority")}</span><select id="bulkValue">${[1,2,3,4,5].map(v => `<option value="${v}" ${String(this._bulkValue || 3) === String(v) ? "selected" : ""}>${v} · ${this._priorityLabel(v)}</option>`).join("")}</select></label>`;
    if (this._bulkAction === "workflow") return `<label class="bulk-toolbar-field"><span>${this._t("workflowState")}</span><select id="bulkValue">${["ready","in_progress","blocked"].map(state => `<option value="${state}" ${String(this._bulkValue || "ready") === state ? "selected" : ""}>${this._workflowStateLabel(state)}</option>`).join("")}</select></label>`;
    if (this._bulkAction === "category") return `<label class="bulk-toolbar-field"><span>${this._t("category")}</span><select id="bulkValue">${CATEGORY_KEYS.map(key => `<option value="${key}" ${this._bulkValue === key ? "selected" : ""}>${this._t(key)}</option>`).join("")}</select></label>`;
    if (this._bulkAction === "area") return `<label class="bulk-toolbar-field"><span>${this._t("area")}</span><input id="bulkValue" value="${this._html(this._bulkValue)}"></label>`;
    return "";
  },

  _taskLayoutHtml(tasks) {
    if (this._layoutMode === "compact") return this._compactTasksHtml(tasks);
    if (this._layoutMode === "timeline") return this._timelineTasksHtml(tasks);
    return `<section class="smart-task-groups">${this._smartTaskGroups(tasks).map(group => group.tasks.length ? `<section class="smart-task-group"><header><div><h2>${this._t(group.label)}</h2><p>${group.tasks.length} ${this._t("taskLabel")}</p></div><span>${group.tasks.length}</span></header><div class="task-grid">${group.tasks.map(t => this._taskCard(t)).join("")}</div></section>` : "").join("")}</section>`;
  },

  _smartTaskGroups(tasks) {
    const now = Date.now();
    const endWeek = now + 7 * 86400000;
    const buckets = [
      { label: "groupBlocked", tasks: [] },
      { label: "groupOverdue", tasks: [] },
      { label: "groupThisWeek", tasks: [] },
      { label: "groupLater", tasks: [] },
    ];
    for (const task of tasks) {
      const runtime = this._state?.runtime?.[task.id] || {};
      const due = runtime.due_at ? new Date(runtime.due_at).getTime() : Number.MAX_SAFE_INTEGER;
      if (task.workflow_state === "blocked") buckets[0].tasks.push(task);
      else if (runtime.status === "overdue" || due < now) buckets[1].tasks.push(task);
      else if (due <= endWeek) buckets[2].tasks.push(task);
      else buckets[3].tasks.push(task);
    }
    return buckets;
  },

  _compactTasksHtml(tasks) {
    return `<section class="compact-task-list">${tasks.map(task => {
      const runtime = this._state?.runtime?.[task.id] || {};
      const workflowState = task.workflow_state || "planned";
      const completed = runtime.status === "completed";
      return `<article class="compact-task-row ${runtime.status || "unavailable"}" data-task-card="${this._html(task.id)}">
        <label class="task-select"><input type="checkbox" data-select-task="${task.id}" ${this._selectedTasks.has(task.id) ? "checked" : ""}><span></span></label>
        <span class="icon-chip"><ha-icon icon="${this._html(task.icon || "mdi:wrench-clock")}"></ha-icon></span>
        <div class="grow"><strong>${this._html(task.name)}</strong><small>${this._categoryLabel(task)} · ${this._scheduleSummary(task)} · ${this._workflowStateLabel(workflowState)}</small></div>
        <span>${this._date(runtime.due_at)}</span><span class="status ${runtime.status || "unavailable"}">${this._t(runtime.status || "unavailable")}</span>
        <button class="icon" data-edit="${task.id}"><ha-icon icon="mdi:pencil"></ha-icon></button>${completed ? `<button class="icon" data-reactivate="${task.id}"><ha-icon icon="mdi:restore"></ha-icon></button>` : `<button class="icon" data-task-id="${task.id}" data-workflow-state="${workflowState === "in_progress" ? "ready" : "in_progress"}"><ha-icon icon="${workflowState === "in_progress" ? "mdi:rewind" : "mdi:play"}"></ha-icon></button><button class="icon" data-reset-task-progress="${task.id}"><ha-icon icon="mdi:restart"></ha-icon></button><button class="primary small" data-done="${task.id}"><ha-icon icon="mdi:check"></ha-icon></button>`}
      </article>`;
    }).join("")}</section>`;
  },

  _timelineTasksHtml(tasks) {
    const sorted = [...tasks].sort((a,b) => this._dueValue(this._state?.runtime?.[a.id]) - this._dueValue(this._state?.runtime?.[b.id]));
    return `<section class="timeline-view">${sorted.map(task => {
      const runtime = this._state?.runtime?.[task.id] || {};
      const status = runtime.status || "unavailable";
      const progress = status === "completed" ? 100 : Math.min(100, Math.max(0, runtime.progress || 0));
      const accent = this._statusAccent(status, task.card_color || task.icon_color || "var(--primary-color)");
      const workflowState = task.workflow_state || "planned";
      return `<article class="timeline-entry ${status}">
        <div class="timeline-marker"><span></span></div>
        <div class="timeline-card" data-task-card="${this._html(task.id)}" style="--task-accent:${this._html(accent)}">
          <span class="icon-chip"><ha-icon icon="${this._html(task.icon || "mdi:wrench-clock")}"></ha-icon></span>
          <div class="timeline-main"><strong>${this._html(task.name)}</strong><small>${this._categoryLabel(task)} · ${this._scheduleSummary(task)} · ${this._workflowStateLabel(workflowState)}</small></div>
          <div class="timeline-date"><span>${status === "completed" ? this._t("lastDone") : this._t("due")}</span><strong>${this._date(status === "completed" ? runtime.last_done : runtime.due_at)}</strong></div>
          <span class="status ${status}">${this._t(status)}</span>
          <div class="timeline-progress"><strong>${Math.round(progress)}%</strong><div class="progress"><div style="width:${progress}%"></div></div></div>
          <div class="timeline-actions"><button class="icon" title="${this._t("edit")}" data-edit="${task.id}"><ha-icon icon="mdi:pencil"></ha-icon></button>${status === "completed" ? `<button class="icon" title="${this._t("reactivate")}" data-reactivate="${task.id}"><ha-icon icon="mdi:restore"></ha-icon></button>` : `<button class="icon" title="${workflowState === "in_progress" ? this._t("workflowReady") : this._t("workflowStart")}" data-task-id="${task.id}" data-workflow-state="${workflowState === "in_progress" ? "ready" : "in_progress"}"><ha-icon icon="${workflowState === "in_progress" ? "mdi:rewind" : "mdi:play"}"></ha-icon></button><button class="icon" title="${this._t("workflowResetAction")}" data-reset-task-progress="${task.id}"><ha-icon icon="mdi:restart"></ha-icon></button><button class="icon" title="${this._t("done")}" data-done="${task.id}"><ha-icon icon="mdi:check"></ha-icon></button>`}</div>
        </div>
      </article>`;
    }).join("")}</section>`;
  },

  _emptyHtml() {
    return `<section class="empty expressive-empty"><div class="empty-orb"><ha-icon icon="mdi:clipboard-plus-outline"></ha-icon></div><h2>${this._t("noTasks")}</h2><p>${this._t("materialEmpty")}</p><div class="empty-actions"><button class="primary big" data-action="create"><ha-icon icon="mdi:plus"></ha-icon>${this._t("addFirst")}</button><button class="ghost big" data-view="templates"><ha-icon icon="mdi:shape-plus-outline"></ha-icon>${this._t("templates")}</button></div></section>`;
  }
});

Object.assign(MaintenanceDashboardPanel.prototype, {
  _taskDetailSheetHtml() {
    const task = (this._state?.tasks || []).find(item => item.id === this._taskDetailId);
    if (!task) return "";
    const runtime = this._state?.runtime?.[task.id] || {};
    const history = (this._state?.history || []).filter(event => event.task_id === task.id).slice(0, 12);
    const notes = Array.isArray(task.notes) ? task.notes : [];
    const checklist = Array.isArray(task.checklist) ? task.checklist : [];
    const totalCost = this._taskYearCost(task.id);
    return `<div class="sheet-backdrop"><aside class="task-detail-sheet"><header><div class="detail-title"><span class="icon-chip"><ha-icon icon="${this._html(task.icon || "mdi:wrench-clock")}"></ha-icon></span><div><h2>${this._html(task.name)}</h2><p>${this._categoryLabel(task)} · ${this._scheduleSummary(task)}</p></div></div><button class="icon" data-action="close-task-detail"><ha-icon icon="mdi:close"></ha-icon></button></header>
      <section class="detail-metrics"><div><span>${this._t("status")}</span><strong>${this._t(runtime.status || "unavailable")}</strong></div><div><span>${this._t("workflow")}</span><strong>${this._workflowStateLabel(task.workflow_state || "planned")}</strong></div><div><span>${this._t("due")}</span><strong>${this._date(runtime.due_at)}</strong></div><div><span>${this._t("yearlyCosts")}</span><strong>${totalCost}</strong></div></section>
      <section class="detail-actions"><button class="ghost" data-edit="${task.id}"><ha-icon icon="mdi:pencil"></ha-icon>${this._t("edit")}</button><button class="ghost" data-task-id="${task.id}" data-workflow-state="ready">${this._t("workflowReady")}</button><button class="ghost" data-task-id="${task.id}" data-workflow-state="in_progress">${this._t("workflowStart")}</button><button class="ghost" data-task-id="${task.id}" data-workflow-state="blocked">${this._t("workflowBlock")}</button><button class="primary" data-done="${task.id}"><ha-icon icon="mdi:check"></ha-icon>${this._t("done")}</button></section>
      ${task.description ? `<section class="detail-section"><h3>${this._t("description")}</h3><p>${this._html(task.description)}</p></section>` : ""}
      <section class="detail-section"><h3>${this._t("checklist")}</h3>${checklist.length ? checklist.map((item, index) => `<label class="checklist-item ${item.done ? "done" : ""}"><input type="checkbox" data-toggle-checklist="${task.id}:${index}" ${item.done ? "checked" : ""}><span>${this._html(item.label)}</span>${item.required ? `<span class="required-mark" title="${this._t("required")}"></span>` : ""}</label>`).join("") : `<p class="section-hint">${this._t("checklistEmpty")}</p>`}</section>
      <section class="detail-section"><h3>${this._t("maintenanceNotes")}</h3><div class="note-composer"><textarea id="taskNoteDraft" placeholder="${this._t("notePlaceholder")}">${this._html(this._taskNoteDraft)}</textarea><button class="primary" data-action="save-task-note">${this._t("saveNote")}</button></div>${notes.length ? `<div class="note-list">${notes.slice(0, 8).map(note => `<article><strong>${this._datetime(note.created_at)}</strong><p>${this._html(note.text || "")}</p></article>`).join("")}</div>` : `<p class="section-hint">${this._t("noNotes")}</p>`}</section>
      <section class="detail-section"><h3>${this._t("history")}</h3><div class="detail-timeline">${history.length ? history.map(event => `<article><ha-icon icon="${this._historyIcon(event.type)}"></ha-icon><div><strong>${this._historyEventLabel(event.type)}</strong><p>${this._historySummaryLine(event)}</p><small>${this._datetime(event.created_at)}</small></div></article>`).join("") : `<p class="section-hint">${this._t("noHistory")}</p>`}</div></section>
    </aside></div>`;
  },

  _taskYearCost(taskId) {
    const year = new Date().getFullYear();
    const total = (this._state?.history || [])
      .filter(event => event.task_id === taskId && new Date(event.created_at || 0).getFullYear() === year)
      .map(event => Number((event.details?.completion || event.details || {}).cost || 0))
      .reduce((sum, value) => sum + (Number.isFinite(value) ? value : 0), 0);
    return total ? `${total.toFixed(2)} EUR` : "—";
  },
});

Object.assign(MaintenanceDashboardPanel.prototype, {
  _bulkPreviewHtml() {
    const preview = this._bulkPreview;
    if (!preview) return "";
    return `<div class="dialog-backdrop"><section class="dialog bulk-preview-dialog"><header><div class="dialog-title-block"><h2>${this._t("confirmBulkTitle")}</h2><p class="section-hint">${this._t("bulkPreview")}</p></div><button class="icon" data-action="close-bulk-preview"><ha-icon icon="mdi:close"></ha-icon></button></header><div class="dialog-body">
      <section class="dialog-section"><div class="diff-summary"><div><strong>${preview.affected || 0}</strong><span>${this._t("selectedTasksCount")}</span></div><div><strong>${this._bulkActionLabel(preview.action)}</strong><span>${this._t("bulkAction")}</span></div><div><strong>${preview.backup_will_be_created ? this._t("yes") : this._t("no")}</strong><span>${this._t("safetyBackup")}</span></div></div>
      <div class="change-list">${(preview.tasks || []).map(task => `<article><strong>${this._html(task.name || task.id)}</strong>${(task.changes || []).map(change => `<div class="field-diff"><span>${this._html(change.field)}</span><code>${this._html(JSON.stringify(change.before))}</code><ha-icon icon="mdi:arrow-right"></ha-icon><code>${this._html(JSON.stringify(change.after))}</code></div>`).join("")}</article>`).join("")}</div></section>
    </div><footer><button class="ghost" data-action="close-bulk-preview">${this._t("cancel")}</button><button class="primary" data-action="confirm-bulk"><ha-icon icon="mdi:playlist-check"></ha-icon>${this._t("execute")}</button></footer></section></div>`;
  }
});
