// Data integrity, backup rotation, diff, selective restore, import and quarantine UI.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _dataDialogHtml() {
    if (!this._dataDialog) return "";
    const backups = this._state?.backups || [];
    const quarantine = this._state?.quarantine || [];
    const audit = this._state?.audit || [];
    const integrity = this._integrityResult || this._state?.integrity || {};
    return `<div class="dialog-backdrop"><section class="dialog wide data-dialog"><header><div class="dialog-title-block"><h2>${this._t("dataSafety")}</h2><div class="dialog-meta-row"><span class="dialog-meta-chip">v${VERSION}</span></div></div><button class="icon" data-action="close-data-dialog"><ha-icon icon="mdi:close"></ha-icon></button></header><div class="dialog-body">
      <section class="dialog-section integrity-summary ${integrity.healthy === false ? "has-errors" : "healthy"}">
        <div class="section-title-actions"><div><h3>${this._t("dataIntegrity")}</h3><p>${integrity.healthy ? this._t("integrityHealthy") : `${integrity.errors || 0} ${this._t("integrityErrors")} · ${integrity.warnings || 0} ${this._t("integrityWarnings")}`}</p></div><div class="button-row"><button class="ghost" data-action="check-integrity"><ha-icon icon="mdi:shield-search-outline"></ha-icon>${this._t("runIntegrityCheck")}</button><button class="primary" data-action="repair-integrity" ${integrity.repairable ? "" : "disabled"}><ha-icon icon="mdi:shield-sync-outline"></ha-icon>${this._t("repairIntegrity")}</button></div></div>
        ${Array.isArray(integrity.issues) && integrity.issues.length ? `<div class="issue-list">${integrity.issues.slice(0, 20).map(issue => `<article class="issue ${this._html(issue.severity || "warning")}"><ha-icon icon="${issue.severity === "error" ? "mdi:alert-circle" : "mdi:alert-outline"}"></ha-icon><div><strong>${this._html(issue.code || issue.message || "integrity_issue")}</strong><small>${this._html(issue.task_id || issue.record_id || issue.section || this._t("globalLabel"))}</small></div>${issue.repairable ? `<span>${this._t("repairIntegrity")}</span>` : ""}</article>`).join("")}</div>` : ""}
      </section>

      <section class="dialog-section">
        <div class="section-title-actions"><div><h3>${this._t("createBackup")}</h3><p>${this._t("backupRotation")}</p></div><button class="primary" data-action="create-backup"><ha-icon icon="mdi:database-plus-outline"></ha-icon>${this._t("createBackup")}</button></div>
        <div class="form-grid"><label class="field"><span>${this._t("backupName")}</span><input id="backupName" value="${this._html(this._backupName)}"></label><label class="check"><input id="backupPinned" type="checkbox" ${this._backupPinned ? "checked" : ""}>${this._t("pinBackup")}</label></div>
        ${backups.length ? `<div class="backup-list">${backups.map(backup => this._backupRowHtml(backup)).join("")}</div>` : `<p>${this._t("noHistory")}</p>`}
      </section>

      ${this._backupDiff ? this._backupDiffHtml() : ""}

      <section class="dialog-section">
        <div class="section-title-actions"><div><h3>${this._t("exportData")}</h3><p>${this._t("dataSafetyExportHint")}</p></div><button class="primary" data-action="export-data"><ha-icon icon="mdi:download"></ha-icon>${this._t("exportData")}</button></div>
      </section>

      <section class="dialog-section import-section">
        <h3>${this._t("importData")}</h3>
        <div class="form-grid"><label class="field"><span>${this._t("importMode")}</span><select id="importMode"><option value="replace" ${this._importMode === "replace" ? "selected" : ""}>${this._t("replaceMode")}</option><option value="merge" ${this._importMode === "merge" ? "selected" : ""}>${this._t("mergeMode")}</option></select></label><label class="field"><span>${this._t("duplicateMode")}</span><select id="importDuplicateMode"><option value="overwrite" ${this._importDuplicateMode === "overwrite" ? "selected" : ""}>${this._t("duplicateOverwrite")}</option><option value="skip" ${this._importDuplicateMode === "skip" ? "selected" : ""}>${this._t("duplicateSkip")}</option><option value="new_id" ${this._importDuplicateMode === "new_id" ? "selected" : ""}>${this._t("duplicateNewId")}</option></select></label></div>
        <textarea id="importPayload" placeholder="${this._t("importPaste")}">${this._html(this._importPayload)}</textarea>
        <div class="button-row"><button class="ghost" data-action="preview-import"><ha-icon icon="mdi:file-search-outline"></ha-icon>${this._t("importPreview")}</button><button class="primary" data-action="import-data" ${this._importPreview?.ok ? "" : "disabled"}><ha-icon icon="mdi:upload"></ha-icon>${this._t("importJson")}</button></div>
        ${this._importPreview ? `<div class="import-preview ${this._importPreview.ok ? "ok" : "error"}"><strong>${this._importPreview.ok ? this._t("ok") : this._t("integrityErrors")}</strong><span>${this._importPreview.task_count || 0} ${this._t("tasksSection")} · +${this._importPreview.added || 0} / -${this._importPreview.removed || 0} · ${this._importPreview.matching || 0} ${this._t("matchingRecords")}</span><span>${this._importPreview.integrity?.errors || 0} ${this._t("integrityErrors")} · ${this._importPreview.integrity?.warnings || 0} ${this._t("integrityWarnings")}</span></div>` : ""}
      </section>

      <section class="dialog-section">
        <div class="section-title-actions"><div><h3>${this._t("quarantine")}</h3><p>${quarantine.length} ${this._t("records")}</p></div>${quarantine.length ? `<button class="ghost" data-action="export-quarantine"><ha-icon icon="mdi:download"></ha-icon>${this._t("exportData")}</button>` : ""}</div>
        ${quarantine.length ? `<div class="quarantine-list">${quarantine.map(record => `<article><div><strong>${this._html(record.reason || this._t("invalidRecord"))}</strong><small>${this._datetime(record.detected_at)} · ${this._html(record.source || this._t("unknownLabel"))}</small></div><div class="button-row"><button class="ghost small" data-export-quarantine="${record.id}"><ha-icon icon="mdi:download"></ha-icon></button><button class="ghost small" data-restore-quarantine="${record.id}"><ha-icon icon="mdi:restore"></ha-icon>${this._t("restoreRecord")}</button><button class="icon danger" data-delete-quarantine="${record.id}"><ha-icon icon="mdi:delete-outline"></ha-icon></button></div></article>`).join("")}</div>` : `<p>${this._t("noHistory")}</p>`}
      </section>

      <section class="dialog-section audit-section">
        <div class="section-title-actions"><div><h3>${this._t("auditLog")}</h3><p>${audit.length} ${this._t("records")}</p></div></div>
        ${audit.length ? `<div class="audit-list">${audit.slice(0, 100).map(event => `<article><div class="audit-icon"><ha-icon icon="mdi:text-box-search-outline"></ha-icon></div><div class="audit-content"><strong>${this._html(event.action || this._t("auditEvent"))}</strong><small>${this._datetime(event.created_at)} · ${this._t("auditSource")}: ${this._html(event.source || this._t("unknownLabel"))}${event.task_id ? ` · ${this._t("auditTask")}: ${this._html(event.task_id)}` : ""}</small>${event.previous || event.current ? `<details><summary>${this._t("auditChanges")}</summary><pre>${this._html(JSON.stringify({ previous: event.previous, current: event.current, details: event.details }, null, 2))}</pre></details>` : ""}</div></article>`).join("")}</div>` : `<p>${this._t("auditEmpty")}</p>`}
      </section>
    </div></section></div>`;
  },

  _backupRowHtml(backup) {
    return `<article class="backup-row ${backup.pinned ? "pinned" : ""}"><div class="backup-main"><ha-icon icon="${backup.pinned ? "mdi:pin" : backup.automatic ? "mdi:backup-restore" : "mdi:database-outline"}"></ha-icon><div><strong>${this._html(backup.name || backup.reason || this._t("backupLabel"))}</strong><small>${this._datetime(backup.created_at)} · ${backup.task_count || 0} ${this._t("taskLabel")} · ${backup.history_count || 0} ${this._t("historyLabel")}${backup.automatic ? ` · ${this._t("automaticLabel")}` : ""}</small></div></div><div class="button-row"><button class="icon" data-pin-backup="${backup.id}" data-pinned="${backup.pinned ? "1" : "0"}" title="${this._t("pinBackup")}"><ha-icon icon="${backup.pinned ? "mdi:pin-off-outline" : "mdi:pin-outline"}"></ha-icon></button><button class="ghost small" data-diff-backup="${backup.id}"><ha-icon icon="mdi:compare"></ha-icon>${this._t("compareBackup")}</button><button class="ghost small" data-restore="${backup.id}"><ha-icon icon="mdi:restore"></ha-icon>${this._t("restore")}</button><button class="icon danger" data-delete-backup="${backup.id}" title="${this._t("delete")}"><ha-icon icon="mdi:delete-outline"></ha-icon></button></div></article>`;
  },

  _backupDiffHtml() {
    const diff = this._backupDiff;
    const taskDiff = diff.tasks || {};
    const changed = taskDiff.changed || [];
    const restorableTaskIds = [...(taskDiff.added || []), ...changed].map(item => item.id).filter(Boolean);
    return `<section class="dialog-section backup-diff-section"><div class="section-title-actions"><div><h3>${this._t("backupDiff")}</h3><p>${diff.backup?.name || diff.backup?.reason || this._t("backupLabel")}</p></div><button class="icon" data-action="close-backup-diff"><ha-icon icon="mdi:close"></ha-icon></button></div>
      <div class="diff-summary"><div><strong>${taskDiff.added_count || 0}</strong><span>${this._t("added")}</span></div><div><strong>${taskDiff.changed_count || 0}</strong><span>${this._t("changed")}</span></div><div><strong>${taskDiff.removed_count || 0}</strong><span>${this._t("removed")}</span></div><div><strong>${diff.history?.backup_count || 0}</strong><span>${this._t("historySection")}</span></div></div>
      ${changed.length ? `<details open><summary>${this._t("changed")} (${changed.length})</summary><div class="change-list">${changed.map(item => `<article><label class="check"><input type="checkbox" data-restore-task="${item.id}" ${this._restoreTaskIds.has(item.id) ? "checked" : ""}><strong>${this._html(item.name || item.id)}</strong></label>${(item.fields || []).map(field => `<div class="field-diff"><span>${this._html(field.field)}</span><code>${this._html(JSON.stringify(field.before))}</code><ha-icon icon="mdi:arrow-right"></ha-icon><code>${this._html(JSON.stringify(field.after))}</code></div>`).join("")}</article>`).join("")}</div></details>` : ""}
      ${taskDiff.added?.length ? `<details><summary>${this._t("added")} (${taskDiff.added.length})</summary>${taskDiff.added.map(item => `<label class="check"><input type="checkbox" data-restore-task="${item.id}" ${this._restoreTaskIds.has(item.id) ? "checked" : ""}>${this._html(item.name || item.id)}</label>`).join("")}</details>` : ""}
      <div class="restore-options"><h4>${this._t("restoreSections")}</h4>${[["tasks","tasksSection"],["history","historySection"],["settings","settingsSection"],["notification_state","notificationStateSection"],["quarantine","quarantineSection"],["audit","auditSection"]].map(([section,key]) => `<label class="check"><input type="checkbox" data-restore-section="${section}" ${this._restoreSections.has(section) ? "checked" : ""}>${this._t(key)}</label>`).join("")}</div>
      <p class="section-hint">${this._restoreTaskIds.size ? `${this._restoreTaskIds.size} ${this._t("selectedTasks")}` : `${restorableTaskIds.length} ${this._t("availableRestoreTasks")}`}</p>
      <button class="primary" data-action="restore-selected-backup"><ha-icon icon="mdi:restore"></ha-icon>${this._t("selectiveRestore")}</button>
    </section>`;
  }
});
