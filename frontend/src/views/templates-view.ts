// Categorized template library view rendering.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _templatesHtml() {
    const templates = (this._state.templates || []).filter(t => this._templateCategory === "recommended" ? (t.recommended || Number(t.priority || 0) >= 4) : this._templateCategory === "seasonal" ? Boolean(t.season) : t.category === this._templateCategory).filter(t => this._matches(t));
    const visible = templates;
    const selected = visible.filter(t => this._selectedTemplates.has(t.id));
    return `<section class="toolbar expressive templates-toolbar"><div><h2>${this._t("templates")}</h2><p>${this._t("templateSelectHint")}</p></div><input id="search" class="search" placeholder="${this._t("search")}" value="${this._html(this._search)}"><button class="ghost" data-action="select-visible"><ha-icon icon="mdi:checkbox-multiple-marked-outline"></ha-icon>${this._t("selectAllVisible")}</button><button class="ghost" data-action="clear-template-selection"><ha-icon icon="mdi:checkbox-blank-off-outline"></ha-icon>${this._t("deselectAll")}</button><button class="primary big" data-action="add-selected" ${selected.length ? "" : "disabled"}><ha-icon icon="mdi:plus-box-multiple-outline"></ha-icon>${this._t("addSelected")} · ${selected.length}</button></section><section class="category-tabs" aria-label="${this._t("templateCategory")}">${TEMPLATE_CATEGORY_KEYS.map(k => `<button class="tab ${this._templateCategory === k ? "active" : ""}" data-template-category="${k}">${this._t(k)}</button>`).join("")}</section>${visible.length ? `<section class="template-grid compact">${visible.map(t => this._templateCard(t)).join("")}</section>` : this._emptyMessage("mdi:shape-outline", this._t("noTemplatesMatch"))}`;
  }
});
