// Assets view: devices, warranties and maintenance contracts.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _assetsEnabled() {
    return Boolean(this._state?.settings?.modules?.assets);
  },

  _assetList() {
    return (this._state?.assets || []).slice()
      .sort((a, b) => String(a.name || "").localeCompare(String(b.name || ""), this._lang()));
  },

  _assetTasks(assetId) {
    return (this._state?.tasks || []).filter(task => !task.deleted && task.asset_id === assetId);
  },

  _assetExpiryFor(assetId) {
    return (this._state?.asset_expiries || []).filter(entry => entry.asset_id === assetId);
  },

  _assetExpiryChip(entry) {
    const label = entry.expired
      ? this._t("assetExpired")
      : this._t("assetExpiresIn").replace("{days}", String(entry.days));
    return `<span class="status ${entry.expired ? "overdue" : "warning"}">${this._t(entry.kind === "contract" ? "assetContract" : "assetWarrantyUntil")}: ${label}</span>`;
  },

  _assetsHtml() {
    const assets = this._assetList();
    return `<section class="page-header page-header-compact">
        <div><h1>${this._t("assets")}</h1><p>${this._t("assetsHint")}</p></div>
        <div class="settings-utility-bar">
          <button class="ghost" data-action="propose-assets"><ha-icon icon="mdi:auto-fix"></ha-icon>${this._t("assetImport")}</button>
          <button class="primary" data-action="create-asset"><ha-icon icon="mdi:plus"></ha-icon>${this._t("newAsset")}</button>
        </div>
      </section>
      ${this._assetProposalsHtml()}
      ${assets.length ? `<section class="asset-grid">${assets.map(asset => this._assetCard(asset)).join("")}</section>`
        : this._emptyMessage("mdi:cube-outline", this._t("assetsEmpty"))}`;
  },

  _assetCard(asset) {
    const tasks = this._assetTasks(asset.id);
    const expiries = this._assetExpiryFor(asset.id);
    const meta = [asset.manufacturer, asset.model].filter(Boolean).map(value => this._html(value)).join(" · ");
    return `<article class="panel asset-card">
      <header class="asset-card-head">
        <span class="icon-chip"><ha-icon icon="${this._html(asset.icon || "mdi:cube-outline")}"></ha-icon></span>
        <div><h3>${this._html(asset.name)}</h3>${meta ? `<p>${meta}</p>` : ""}</div>
        <button class="icon" data-edit-asset="${this._html(asset.id)}" title="${this._t("edit")}"><ha-icon icon="mdi:pencil"></ha-icon></button>
      </header>
      ${expiries.length ? `<div class="asset-expiries">${expiries.map(entry => this._assetExpiryChip(entry)).join("")}</div>` : ""}
      <div class="meta-grid">
        ${asset.warranty_until ? `<div><span>${this._t("assetWarrantyUntil")}</span><strong>${this._date(asset.warranty_until)}</strong></div>` : ""}
        ${asset.contract?.partner ? `<div><span>${this._t("contractPartner")}</span><strong>${this._html(asset.contract.partner)}</strong></div>` : ""}
        ${asset.installed_at ? `<div><span>${this._t("assetInstalledAt")}</span><strong>${this._date(asset.installed_at)}</strong></div>` : ""}
        <div><span>${this._t("assetTasks")}</span><strong>${tasks.length}</strong></div>
      </div>
      ${tasks.length ? `<div class="asset-task-list">${tasks.slice(0, 6).map(task => `<button class="ghost small" data-open-task-detail="${this._html(task.id)}"><ha-icon icon="${this._html(task.icon || "mdi:wrench-clock")}"></ha-icon>${this._html(task.name)}</button>`).join("")}</div>` : ""}
    </article>`;
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
    const devices = this._haDevices();
    const field = (key, label, type = "text") =>
      `<label class="field"><span>${this._t(label)}</span><input data-asset-field="${key}" type="${type}" value="${this._html(draft[key] || "")}"></label>`;
    return `<div class="dialog-backdrop"><section class="dialog"><header><div class="dialog-title-block"><h2>${draft.id ? this._t("edit") : this._t("newAsset")}</h2></div><button class="icon" data-action="close-asset-dialog"><ha-icon icon="mdi:close"></ha-icon></button></header><div class="dialog-body">
      <section class="dialog-section"><div class="form-grid">
        ${field("name", "assetName")}
        ${field("manufacturer", "assetManufacturer")}
        ${field("model", "assetModel")}
        ${field("serial", "assetSerial")}
        ${field("installed_at", "assetInstalledAt", "date")}
        ${field("warranty_until", "assetWarrantyUntil", "date")}
        <label class="field"><span>${this._t("assetDevice")}</span><select data-asset-field="ha_device_id"><option value="">${this._t("assetNoDevice")}</option>${devices.map(device => `<option value="${this._html(device.id)}" ${draft.ha_device_id === device.id ? "selected" : ""}>${this._html(device.name)}</option>`).join("")}</select></label>
      </div></section>
      <section class="dialog-section"><h3>${this._t("assetContract")}</h3><div class="form-grid">
        <label class="field"><span>${this._t("contractPartner")}</span><input data-asset-contract="partner" value="${this._html(contract.partner || "")}"></label>
        <label class="field"><span>${this._t("contractReference")}</span><input data-asset-contract="reference" value="${this._html(contract.reference || "")}"></label>
        <label class="field"><span>${this._t("contractResponseHours")}</span><input data-asset-contract="response_hours" type="number" min="0" value="${this._html(contract.response_hours ?? "")}"></label>
        <label class="field"><span>${this._t("contractExpiresAt")}</span><input data-asset-contract="expires_at" type="date" value="${this._html(contract.expires_at || "")}"></label>
      </div></section>
    </div><footer>${draft.id ? `<button class="ghost danger" data-action="delete-asset" title="${this._t("deleteAssetHint")}"><ha-icon icon="mdi:delete-outline"></ha-icon>${this._t("deleteAsset")}</button>` : ""}<button class="ghost" data-action="close-asset-dialog">${this._t("cancel")}</button><button class="primary" data-action="save-asset" ${String(draft.name || "").trim() ? "" : "disabled"}><ha-icon icon="mdi:content-save"></ha-icon>${this._t("save")}</button></footer></section></div>`;
  },

  _haDevices() {
    const raw = this.hass?.devices;
    if (!raw) return [];
    const list = Array.isArray(raw) ? raw : Object.values(raw);
    return list
      .map(device => ({ id: device.id, name: device.name_by_user || device.name || device.id }))
      .filter(device => device.id && device.name)
      .sort((a, b) => String(a.name).localeCompare(String(b.name), this._lang()));
  },
});
