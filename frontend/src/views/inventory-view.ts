// Inventory view: spare parts, stock levels, restock alerts and budgets.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _inventoryEnabled() {
    return Boolean(this._state?.settings?.modules?.inventory);
  },

  _budgetEnabled() {
    return Boolean(this._state?.settings?.modules?.budget);
  },

  _partList() {
    const filter = String(this._partFilter || "").trim().toLowerCase();
    return (this._state?.parts || [])
      .filter(part => !filter || `${part.name} ${part.part_number || ""} ${part.supplier || ""}`.toLowerCase().includes(filter))
      .sort((a, b) => String(a.name || "").localeCompare(String(b.name || ""), this._lang()));
  },

  _restockAlerts() {
    return this._state?.restock_alerts || [];
  },

  _partAsset(part) {
    return (this._state?.assets || []).find(asset => asset.id === part.asset_id) || null;
  },

  _partStockChip(part) {
    const minimum = Number(part.minimum || 0);
    const stock = Number(part.stock || 0);
    let tone = "";
    if (minimum > 0 && stock <= 0) tone = "overdue";
    else if (minimum > 0 && stock <= minimum) tone = "warning";
    return `<span class="status ${tone}">${this._num(stock)} ${this._html(part.unit || "")}</span>`;
  },

  _inventoryHtml() {
    const parts = this._partList();
    const alerts = this._restockAlerts();
    return `<section class="page-header page-header-compact">
        <div><h1>${this._t("inventory")}</h1><p>${this._t("inventoryHint")}</p></div>
        <div class="settings-utility-bar">
          <input class="search" type="search" data-part-filter placeholder="${this._t("search")}" value="${this._html(this._partFilter || "")}">
          <button class="primary" data-action="create-part"><ha-icon icon="mdi:plus"></ha-icon>${this._t("newPart")}</button>
        </div>
      </section>
      ${this._budgetHtml()}
      ${alerts.length ? `<section class="panel restock-panel"><header class="section-title-actions"><div><h3>${this._t("restockNeeded")}</h3><p>${this._t("restockHint")}</p></div></header>
        <div class="restock-list">${alerts.map(alert => `<div class="restock-row ${alert.out_of_stock ? "critical" : "warning"}">
          <ha-icon icon="${alert.out_of_stock ? "mdi:alert-octagon-outline" : "mdi:alert-outline"}"></ha-icon>
          <button class="ghost small" data-edit-part="${this._html(alert.part_id)}">${this._html(alert.name)}</button>
          <span>${this._num(alert.stock)} / ${this._num(alert.minimum)}</span>
          <small>${alert.supplier ? this._html(alert.supplier) : ""}</small>
        </div>`).join("")}</div></section>` : ""}
      ${parts.length
        ? `<section class="panel"><div class="meta-grid">
             <div><span>${this._t("inventoryParts")}</span><strong>${parts.length}</strong></div>
             <div><span>${this._t("inventoryValue")}</span><strong>${this._money(this._state?.inventory_value || 0)}</strong></div>
           </div></section>
           <section class="asset-grid">${parts.map(part => this._partCard(part)).join("")}</section>`
        : this._emptyMessage("mdi:package-variant-closed", this._t("inventoryEmpty"))}`;
  },

  _partCard(part) {
    const asset = this._partAsset(part);
    return `<article class="panel asset-card">
      <header class="asset-card-head">
        <span class="icon-chip"><ha-icon icon="mdi:package-variant-closed"></ha-icon></span>
        <div><h3>${this._html(part.name)}</h3>${part.part_number ? `<p>${this._html(part.part_number)}</p>` : ""}</div>
        <button class="icon" data-edit-part="${this._html(part.id)}" title="${this._t("edit")}"><ha-icon icon="mdi:pencil"></ha-icon></button>
      </header>
      <div class="asset-expiries">${this._partStockChip(part)}</div>
      <div class="meta-grid">
        ${Number(part.minimum || 0) > 0 ? `<div><span>${this._t("partMinimum")}</span><strong>${this._num(part.minimum)}</strong></div>` : ""}
        ${Number(part.unit_price || 0) > 0 ? `<div><span>${this._t("partUnitPrice")}</span><strong>${this._money(part.unit_price)}</strong></div>` : ""}
        ${part.supplier ? `<div><span>${this._t("partSupplier")}</span><strong>${this._html(part.supplier)}</strong></div>` : ""}
        ${asset ? `<div><span>${this._t("asset")}</span><strong>${this._html(asset.name)}</strong></div>` : ""}
        ${part.last_ordered ? `<div><span>${this._t("partLastOrdered")}</span><strong>${this._date(part.last_ordered)}</strong></div>` : ""}
      </div>
      <div class="part-actions">
        <button class="ghost small" data-consume-part="${this._html(part.id)}" data-amount="1"><ha-icon icon="mdi:minus"></ha-icon>${this._t("partTake")}</button>
        <button class="ghost small" data-consume-part="${this._html(part.id)}" data-amount="-1"><ha-icon icon="mdi:plus"></ha-icon>${this._t("partRestock")}</button>
      </div>
    </article>`;
  },

  _partDialogHtml() {
    const draft = this._partDraft;
    if (!draft) return "";
    const assets = this._assetsEnabled() ? this._assetList() : [];
    const field = (key, label, type = "text", extra = "") =>
      `<label class="field"><span>${this._t(label)}</span><input data-part-field="${key}" type="${type}" ${extra} value="${this._html(draft[key] ?? "")}"></label>`;
    return `<div class="dialog-backdrop"><section class="dialog"><header><div class="dialog-title-block"><h2>${draft.id ? this._t("edit") : this._t("newPart")}</h2></div><button class="icon" data-action="close-part-dialog"><ha-icon icon="mdi:close"></ha-icon></button></header><div class="dialog-body">
      <section class="dialog-section"><div class="form-grid">
        ${field("name", "partName")}
        ${field("part_number", "partNumber")}
        ${field("supplier", "partSupplier")}
        ${field("unit", "partUnit")}
        ${field("stock", "partStock", "number", 'min="0" step="0.001"')}
        ${field("minimum", "partMinimum", "number", 'min="0" step="0.001"')}
        ${field("unit_price", "partUnitPrice", "number", 'min="0" step="0.01"')}
        ${field("last_ordered", "partLastOrdered", "date")}
        ${assets.length ? `<label class="field"><span>${this._t("asset")}</span><select data-part-field="asset_id"><option value="">${this._t("assetNoDevice")}</option>${assets.map(asset => `<option value="${this._html(asset.id)}" ${draft.asset_id === asset.id ? "selected" : ""}>${this._html(asset.name)}</option>`).join("")}</select></label>` : ""}
      </div>
      <label class="description-field"><span class="field-head"><span>${this._t("maintenanceNotes")}</span></span><textarea data-part-field="notes">${this._html(draft.notes || "")}</textarea></label>
      </section>
    </div><footer>${draft.id ? `<button class="ghost danger" data-action="delete-part"><ha-icon icon="mdi:delete-outline"></ha-icon>${this._t("delete")}</button>` : ""}<button class="ghost" data-action="close-part-dialog">${this._t("cancel")}</button><button class="primary" data-action="save-part" ${String(draft.name || "").trim() ? "" : "disabled"}><ha-icon icon="mdi:content-save"></ha-icon>${this._t("save")}</button></footer></section></div>`;
  },

  // Only categories that are actually in use are offered; a budget for a
  // category without tasks would never move.
  _budgetSettingsHtml() {
    if (!this._budgetEnabled()) return "";
    const budget = this._state?.settings?.budget || {};
    const used = new Set((this._state?.tasks || []).filter(task => !task.deleted).map(task => String(task.category || "general")));
    const categories = CATEGORY_KEYS.filter(key => used.has(key) || budget[key] !== undefined);
    return `<div class="settings-subpanel"><h4>${this._t("budget")}</h4><p class="section-hint">${this._t("budgetSettingsHint")}</p>
      <div class="form-grid">${categories.map(key => `<label class="field"><span>${this._t(key)}</span><input data-budget="${key}" type="number" min="0" step="1" value="${budget[key] ?? ""}" placeholder="0"></label>`).join("")}</div></div>`;
  },

  _budgetHtml() {
    const rows = this._state?.budget_status || [];
    if (!rows.length) return "";
    return `<section class="panel"><header class="section-title-actions"><div><h3>${this._t("budget")}</h3><p>${this._t("budgetHint")}</p></div></header>
      <div class="budget-list">${rows.map(row => {
        const limit = Number(row.budget) || 0;
        const share = limit > 0 ? Math.max(0, Math.min(100, Number(row.share || 0))) : 0;
        const pace = limit > 0 ? Math.max(0, Math.min(100, Number(row.expected_by_now) / limit * 100)) : 0;
        const tone = row.over_budget ? "overdue" : row.ahead_of_pace ? "warning" : "";
        return `<div class="budget-row">
          <div class="budget-head"><strong>${this._t(row.category)}</strong><span class="status ${tone}">${this._money(row.spent)} / ${this._money(limit)}</span></div>
          <div class="budget-bar" title="${this._t("budgetExpected")}: ${this._money(row.expected_by_now)}"><div class="budget-fill ${tone}" style="width:${share}%"></div><div class="budget-pace" style="left:${pace}%"></div></div>
          <small>${row.over_budget ? this._t("budgetOver") : row.ahead_of_pace ? this._t("budgetAhead") : this._t("budgetOnTrack")} · ${this._t("budgetRemaining")}: ${this._money(row.remaining)}</small>
        </div>`;
      }).join("")}</div></section>`;
  },
});
