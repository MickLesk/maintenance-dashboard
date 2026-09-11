// Filing cabinet: devices are folders, documents live inside them, and
// anything without a device lands in the unfiled folder.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _documentsEnabled() {
    return Boolean(this._state?.settings?.modules?.documents);
  },

  _assetList() {
    return (this._state?.assets || []).slice()
      .sort((a, b) => String(a.name || "").localeCompare(String(b.name || ""), this._lang()));
  },

  _assetTasks(assetId) {
    return (this._state?.tasks || []).filter(task => !task.deleted && task.asset_id === assetId);
  },

  _documents() {
    const filter = String(this._documentFilter || "").trim().toLowerCase();
    return (this._state?.media || [])
      .filter(doc => !filter || `${doc.title || ""} ${doc.filename || ""} ${doc.note || ""}`.toLowerCase().includes(filter))
      .sort((a, b) => String(b.created_at || "").localeCompare(String(a.created_at || "")));
  },

  _documentsFor(assetId) {
    return this._documents().filter(doc => String(doc.asset_id || "") === String(assetId || ""));
  },

  _unfiledDocuments() {
    const known = new Set((this._state?.assets || []).map(asset => asset.id));
    return this._documents().filter(doc => !doc.asset_id || !known.has(doc.asset_id));
  },

  _documentKindIcon(kind) {
    return ({
      invoice: "mdi:receipt-text-outline",
      proof: "mdi:certificate-outline",
      warranty: "mdi:shield-check-outline",
      manual: "mdi:book-open-page-variant-outline",
      meter: "mdi:counter",
      photo: "mdi:image-outline",
      other: "mdi:file-outline",
    })[kind] || "mdi:file-outline";
  },

  _documentTitle(doc) {
    if (doc.title) return doc.title;
    if (doc.filename) return doc.filename;
    if (doc.reading !== null && doc.reading !== undefined) return `${this._num(doc.reading)} ${doc.reading_unit || ""}`.trim();
    return this._t(`documentKind_${doc.kind}`);
  },

  _documentTaskName(doc) {
    return (this._state?.tasks || []).find(item => item.id === doc.task_id)?.name || "";
  },

  _documentsHtml() {
    const assets = this._assetList();
    const unfiled = this._unfiledDocuments();
    return `<section class="page-header page-header-compact">
        <div><h1>${this._t("documents")}</h1><p>${this._t("documentsHint")}</p></div>
        <div class="settings-utility-bar">
          <input class="search" type="search" data-document-filter placeholder="${this._t("search")}" value="${this._html(this._documentFilter || "")}">
          <button class="ghost" data-action="propose-assets"><ha-icon icon="mdi:auto-fix"></ha-icon>${this._t("assetImport")}</button>
          <button class="primary" data-action="create-asset"><ha-icon icon="mdi:plus"></ha-icon>${this._t("newAsset")}</button>
        </div>
      </section>
      ${this._assetProposalsHtml()}
      ${this._assetExpiryBannerHtml()}
      ${assets.length || unfiled.length
        ? `<section class="folder-list">
             ${assets.map(asset => this._assetFolderHtml(asset)).join("")}
             ${unfiled.length ? this._unfiledFolderHtml(unfiled) : ""}
           </section>`
        : this._emptyMessage("mdi:folder-outline", this._t("documentsEmpty"))}`;
  },

  _assetExpiryBannerHtml() {
    const entries = this._state?.asset_expiries || [];
    if (!entries.length) return "";
    return `<section class="panel"><div class="restock-list">${entries.map(entry => `<div class="restock-row ${entry.expired ? "critical" : "warning"}">
      <ha-icon icon="${entry.expired ? "mdi:alert-octagon-outline" : "mdi:alert-outline"}"></ha-icon>
      <button class="ghost small" data-edit-asset="${this._html(entry.asset_id)}">${this._html(entry.name)}</button>
      <span>${this._t(entry.kind === "contract" ? "assetContract" : "assetWarrantyUntil")}</span>
      <small>${entry.expired ? this._t("assetExpired") : this._t("assetExpiresIn").replace("{days}", String(entry.days))}</small>
    </div>`).join("")}</div></section>`;
  },

  _folderOpen(id) {
    return Boolean(this._openFolders?.has(id));
  },

  _assetFolderHtml(asset) {
    const docs = this._documentsFor(asset.id);
    const tasks = this._assetTasks(asset.id);
    const open = this._folderOpen(asset.id);
    const meta = [asset.manufacturer, asset.model, asset.location].filter(Boolean).map(value => this._html(value)).join(" · ");
    return `<article class="panel folder ${open ? "open" : ""}">
      <header class="folder-head">
        <button class="folder-toggle" data-folder-toggle="${this._html(asset.id)}" aria-expanded="${open ? "true" : "false"}">
          <ha-icon icon="${open ? "mdi:chevron-down" : "mdi:chevron-right"}"></ha-icon>
          <span class="icon-chip"><ha-icon icon="${this._html(asset.icon || "mdi:cube-outline")}"></ha-icon></span>
          <span class="folder-title"><strong>${this._html(asset.name)}</strong>${meta ? `<small>${meta}</small>` : ""}</span>
        </button>
        <span class="folder-count">${docs.length}</span>
        <button class="icon" data-edit-asset="${this._html(asset.id)}" title="${this._t("edit")}"><ha-icon icon="mdi:pencil"></ha-icon></button>
      </header>
      ${open ? `<div class="folder-body">
        <div class="meta-grid">
          ${asset.warranty_until ? `<div><span>${this._t("assetWarrantyUntil")}</span><strong>${this._date(asset.warranty_until)}</strong></div>` : ""}
          ${asset.contract?.partner ? `<div><span>${this._t("contractPartner")}</span><strong>${this._html(asset.contract.partner)}</strong></div>` : ""}
          ${asset.contract?.expires_at ? `<div><span>${this._t("contractExpiresAt")}</span><strong>${this._date(asset.contract.expires_at)}</strong></div>` : ""}
          ${asset.installed_at ? `<div><span>${this._t("assetInstalledAt")}</span><strong>${this._date(asset.installed_at)}</strong></div>` : ""}
        </div>
        ${tasks.length ? `<div class="asset-task-list">${tasks.map(task => `<button class="ghost small" data-open-task-detail="${this._html(task.id)}"><ha-icon icon="${this._html(task.icon || "mdi:wrench-clock")}"></ha-icon>${this._html(task.name)}</button>`).join("")}</div>` : ""}
        ${this._documentListHtml(docs)}
        <button class="ghost small" data-add-document="${this._html(asset.id)}"><ha-icon icon="mdi:paperclip-plus"></ha-icon>${this._t("addDocument")}</button>
      </div>` : ""}
    </article>`;
  },

  _unfiledFolderHtml(docs) {
    const open = this._folderOpen("_unfiled");
    return `<article class="panel folder ${open ? "open" : ""}">
      <header class="folder-head">
        <button class="folder-toggle" data-folder-toggle="_unfiled" aria-expanded="${open ? "true" : "false"}">
          <ha-icon icon="${open ? "mdi:chevron-down" : "mdi:chevron-right"}"></ha-icon>
          <span class="icon-chip"><ha-icon icon="mdi:folder-outline"></ha-icon></span>
          <span class="folder-title"><strong>${this._t("documentsUnfiled")}</strong><small>${this._t("documentsUnfiledHint")}</small></span>
        </button>
        <span class="folder-count">${docs.length}</span>
      </header>
      ${open ? `<div class="folder-body">${this._documentListHtml(docs)}<button class="ghost small" data-add-document=""><ha-icon icon="mdi:paperclip-plus"></ha-icon>${this._t("addDocument")}</button></div>` : ""}
    </article>`;
  },

  _documentListHtml(docs) {
    if (!docs.length) return `<p class="section-hint">${this._t("documentsFolderEmpty")}</p>`;
    return `<div class="document-list">${docs.map(doc => {
      const meta = [this._t(`documentKind_${doc.kind}`), this._date(doc.created_at), this._documentTaskName(doc)].filter(Boolean);
      if (doc.size) meta.push(this._bytes(doc.size));
      return `<div class="document-row">
        <ha-icon icon="${this._documentKindIcon(doc.kind)}"></ha-icon>
        <div class="document-main">
          ${doc.stored_name
            ? `<a href="${this._mediaUrl(doc.id)}" target="_blank" rel="noopener">${this._html(this._documentTitle(doc))}</a>`
            : `<span>${this._html(this._documentTitle(doc))}</span>`}
          <small>${meta.map(item => this._html(item)).join(" · ")}</small>
          ${doc.note ? `<p>${this._html(doc.note)}</p>` : ""}
        </div>
        <button class="icon" data-edit-document="${this._html(doc.id)}" title="${this._t("edit")}"><ha-icon icon="mdi:pencil"></ha-icon></button>
      </div>`;
    }).join("")}</div>`;
  },

  _documentDialogHtml() {
    const draft = this._documentDraft;
    if (!draft) return "";
    const assets = this._assetList();
    const editing = Boolean(draft.id);
    return `<div class="dialog-backdrop"><section class="dialog"><header><div class="dialog-title-block"><h2>${editing ? this._t("edit") : this._t("addDocument")}</h2></div><button class="icon" data-action="close-document-dialog"><ha-icon icon="mdi:close"></ha-icon></button></header><div class="dialog-body">
      <section class="dialog-section"><div class="form-grid">
        <label class="field"><span>${this._t("documentKind")}</span><select data-document-field="kind">${DOCUMENT_KINDS.map(kind => `<option value="${kind}" ${draft.kind === kind ? "selected" : ""}>${this._t(`documentKind_${kind}`)}</option>`).join("")}</select></label>
        <label class="field"><span>${this._t("documentTitle")}</span><input data-document-field="title" value="${this._html(draft.title || "")}" placeholder="${this._t("documentTitlePlaceholder")}"></label>
        <label class="field"><span>${this._t("asset")}</span><select data-document-field="asset_id"><option value="">${this._t("documentsUnfiled")}</option>${assets.map(asset => `<option value="${this._html(asset.id)}" ${draft.asset_id === asset.id ? "selected" : ""}>${this._html(asset.name)}</option>`).join("")}</select></label>
        ${draft.kind === "meter" ? `<label class="field"><span>${this._t("documentReading")}</span><input data-document-field="reading" type="number" step="0.001" value="${draft.reading ?? ""}"></label>
        <label class="field"><span>${this._t("documentReadingUnit")}</span><input data-document-field="reading_unit" value="${this._html(draft.reading_unit || "")}" placeholder="kWh"></label>` : ""}
      </div>
      <label class="description-field"><span class="field-head"><span>${this._t("maintenanceNotes")}</span></span><textarea data-document-field="note">${this._html(draft.note || "")}</textarea></label>
      ${editing
        ? (draft.filename ? `<p class="section-hint">${this._t("documentFile")}: ${this._html(draft.filename)}</p>` : "")
        : `<div class="attachment-upload"><label class="ghost"><ha-icon icon="mdi:paperclip"></ha-icon>${draft.filename ? this._html(draft.filename) : this._t("documentChooseFile")}<input id="documentFileInput" type="file" accept="image/*,application/pdf" hidden></label><small class="field-hint">${this._t("documentFileHint")}</small></div>`}
      </section>
    </div><footer>${editing ? `<button class="ghost danger" data-action="delete-document"><ha-icon icon="mdi:delete-outline"></ha-icon>${this._t("delete")}</button>` : ""}<button class="ghost" data-action="close-document-dialog">${this._t("cancel")}</button><button class="primary" data-action="save-document"><ha-icon icon="mdi:content-save"></ha-icon>${this._t("save")}</button></footer></section></div>`;
  },

  _assetProposalsHtml() {
    const proposals = this._assetProposals;
    if (!proposals) return "";
    if (!proposals.length) return `<section class="panel"><p class="section-hint">${this._t("assetImportNone")}</p></section>`;
    return `<section class="panel"><header class="section-title-actions"><div><h3>${this._t("assetImport")}</h3><p>${this._t("assetImportHint")}</p></div><button class="icon" data-action="close-asset-proposals"><ha-icon icon="mdi:close"></ha-icon></button></header>
      <div class="check-grid">${proposals.map(item => `<label class="check"><input type="checkbox" data-asset-proposal="${this._html(item.name)}" checked>${this._html(item.name)} <small>(${item.task_ids.length})</small></label>`).join("")}</div>
      <footer class="settings-section-footer"><button class="primary" data-action="apply-asset-proposals"><ha-icon icon="mdi:check"></ha-icon>${this._t("assetImportApply")}</button></footer></section>`;
  },

  _assetDialogHtml() {
    const draft = this._assetDraft;
    if (!draft) return "";
    const contract = draft.contract || {};
    const devices = this._haDevices(this._deviceFilter);
    const field = (key, label, type = "text", placeholder = "") =>
      `<label class="field"><span>${this._t(label)}</span><input data-asset-field="${key}" type="${type}" value="${this._html(draft[key] || "")}" placeholder="${placeholder}"></label>`;
    return `<div class="dialog-backdrop"><section class="dialog"><header><div class="dialog-title-block"><h2>${draft.id ? this._t("edit") : this._t("newAsset")}</h2></div><button class="icon" data-action="close-asset-dialog"><ha-icon icon="mdi:close"></ha-icon></button></header><div class="dialog-body">
      <section class="dialog-section"><div class="form-grid">
        ${field("name", "assetName")}
        ${field("manufacturer", "assetManufacturer")}
        ${field("model", "assetModel")}
        ${field("location", "assetLocation", "text", this._t("assetLocationPlaceholder"))}
        ${field("serial", "assetSerial")}
        ${field("installed_at", "assetInstalledAt", "date")}
        ${field("warranty_until", "assetWarrantyUntil", "date")}
      </div></section>
      <section class="dialog-section"><h3>${this._t("assetContract")}</h3><p class="section-hint">${this._t("assetContractHint")}</p><div class="form-grid">
        <label class="field"><span>${this._t("contractPartner")}</span><input data-asset-contract="partner" value="${this._html(contract.partner || "")}" placeholder="${this._t("contractPartnerPlaceholder")}"></label>
        <label class="field"><span>${this._t("contractExpiresAt")}</span><input data-asset-contract="expires_at" type="date" value="${this._html(contract.expires_at || "")}"></label>
      </div></section>
      <section class="dialog-section"><h3>${this._t("assetDevice")}</h3><p class="section-hint">${this._t("assetDeviceHint")}</p>
        <div class="device-picker">
          <input class="search" type="search" id="assetDeviceFilter" placeholder="${this._t("assetDeviceSearch")}" value="${this._html(this._deviceFilter || "")}">
          <select data-asset-field="ha_device_id" size="6"><option value="" ${draft.ha_device_id ? "" : "selected"}>${this._t("assetNoDevice")}</option>${devices.map(device => `<option value="${this._html(device.id)}" ${draft.ha_device_id === device.id ? "selected" : ""}>${this._html(device.name)}</option>`).join("")}</select>
          ${devices.length ? "" : `<small class="field-hint">${this._t("assetDeviceNoMatch")}</small>`}
        </div>
      </section>
    </div><footer>${draft.id ? `<button class="ghost danger" data-action="delete-asset" title="${this._t("deleteAssetHint")}"><ha-icon icon="mdi:delete-outline"></ha-icon>${this._t("deleteAsset")}</button>` : ""}<button class="ghost" data-action="close-asset-dialog">${this._t("cancel")}</button><button class="primary" data-action="save-asset" ${String(draft.name || "").trim() ? "" : "disabled"}><ha-icon icon="mdi:content-save"></ha-icon>${this._t("save")}</button></footer></section></div>`;
  },

  // Home Assistant can easily have a hundred devices, so the list is filtered
  // rather than dumped into a dropdown that outgrows the dialog.
  _haDevices(filter) {
    const raw = this.hass?.devices;
    if (!raw) return [];
    const needle = String(filter || "").trim().toLowerCase();
    const list = Array.isArray(raw) ? raw : Object.values(raw);
    return list
      .map(device => ({ id: device.id, name: device.name_by_user || device.name || device.id }))
      .filter(device => device.id && device.name)
      .filter(device => !needle || String(device.name).toLowerCase().includes(needle))
      .sort((a, b) => String(a.name).localeCompare(String(b.name), this._lang()))
      .slice(0, 200);
  },
});
