// Categorized template library view rendering.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _templatesHtml() {
    const templates = (this._state.templates || [])
      .filter(t => this._templateCategory === "recommended" ? (t.recommended || Number(t.priority || 0) >= 4) : this._templateCategory === "seasonal" ? Boolean(t.season) : t.category === this._templateCategory)
      .filter(t => this._matches(t));
    const selected = templates.filter(t => this._selectedTemplates.has(t.id));
    const grouped = templates.reduce((acc, template) => {
      const key = template.category || "general";
      (acc[key] ||= []).push(template);
      return acc;
    }, {});
    const order = CATEGORY_KEYS.filter(key => grouped[key]?.length);
    const groupsHtml = order.map(key => `
      <section class="template-group">
        <div class="template-group-header"><div><p class="eyebrow">${this._t("category")}</p><h3>${this._t(key)}</h3></div><span>${grouped[key].length}</span></div>
        <div class="template-grid compact">${grouped[key].map(t => this._templateCard(t)).join("")}</div>
      </section>
    `).join("");
    return `<section class="toolbar expressive templates-toolbar"><div class="toolbar-copy"><p class="eyebrow">${this._t("templates")}</p><h2>${this._t("templates")}</h2><p>${this._t("templateSelectHint")}</p></div><div class="toolbar-main templates-main"><input id="search" class="search" placeholder="${this._t("search")}" value="${this._html(this._search)}"><button class="ghost" data-action="select-visible"><ha-icon icon="mdi:checkbox-multiple-marked-outline"></ha-icon>${this._t("selectAllVisible")}</button><button class="ghost" data-action="clear-template-selection"><ha-icon icon="mdi:checkbox-blank-off-outline"></ha-icon>${this._t("deselectAll")}</button><button class="primary big" data-action="add-selected" ${selected.length ? "" : "disabled"}><ha-icon icon="mdi:plus-box-multiple-outline"></ha-icon>${this._t("addSelected")} · ${selected.length}</button></div></section><section class="category-tabs" aria-label="${this._t("templateCategory")}">${TEMPLATE_CATEGORY_KEYS.map(k => `<button class="tab ${this._templateCategory === k ? "active" : ""}" data-template-category="${k}">${this._t(k)}</button>`).join("")}</section>${templates.length ? groupsHtml : this._emptyMessage("mdi:shape-outline", this._t("noTemplatesMatch"))}`;
  }
});
