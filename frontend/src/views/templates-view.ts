// Categorized template library view rendering with starter packs and metadata filters.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _templatesHtml() {
    const templates = this._filteredTemplates();
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
    const packs = this._state?.template_packs || [];
    return `<section class="toolbar expressive templates-toolbar"><div class="toolbar-copy"><p class="eyebrow">${this._t("templates")}</p><h2>${this._t("templates")}</h2><p>${this._t("templateSelectHint")}</p></div><div class="toolbar-main templates-main"><input id="search" class="search" placeholder="${this._t("search")}" value="${this._html(this._search)}"><button class="ghost" data-action="select-visible"><ha-icon icon="mdi:checkbox-multiple-marked-outline"></ha-icon>${this._t("selectAllVisible")}</button><button class="ghost" data-action="clear-template-selection"><ha-icon icon="mdi:checkbox-blank-off-outline"></ha-icon>${this._t("deselectAll")}</button><button class="primary big" data-action="add-selected" ${selected.length ? "" : "disabled"}><ha-icon icon="mdi:plus-box-multiple-outline"></ha-icon>${this._t("addSelected")} · ${selected.length}</button></div></section>
      <section class="template-filter-bar"><div class="category-tabs" aria-label="${this._t("templateCategory")}">${TEMPLATE_CATEGORY_KEYS.map(k => `<button class="tab ${this._templateCategory === k ? "active" : ""}" data-template-category="${k}">${this._t(k)}</button>`).join("")}</div><div class="template-secondary-filters"><label><span>${this._t("seasonal")}</span><select id="templateSeason"><option value="all">${this._t("all")}</option>${["spring","summer","autumn","winter"].map(x => `<option value="${x}" ${this._templateSeason === x ? "selected" : ""}>${this._t(x)}</option>`).join("")}</select></label><label class="check compact-check"><input id="templateCommon" type="checkbox" ${this._templateOnlyCommon ? "checked" : ""}>${this._t("common")}</label></div></section>
      ${packs.length ? `<section class="starter-packs"><div class="section-title"><div><p class="eyebrow">${this._t("onboarding")}</p><h2>${this._t("starterPacks")}</h2></div></div><div class="pack-strip">${packs.map(pack => `<article class="pack-mini"><ha-icon icon="${this._html(pack.icon || "mdi:package-variant")}"></ha-icon><div><strong>${this._html(pack.name)}</strong><p>${this._html(pack.description || "")}</p><small>${(pack.template_ids || []).length} ${this._t("templates")}</small></div><button class="ghost" data-add-pack="${this._html(pack.id)}"><ha-icon icon="mdi:plus"></ha-icon>${this._t("add")}</button></article>`).join("")}</div></section>` : ""}
      ${templates.length ? groupsHtml : this._emptyMessage("mdi:shape-outline", this._t("noTemplatesMatch"))}`;
  },

  _filteredTemplates() {
    return (this._state.templates || []).filter(template => {
      if (this._templateCategory === "recommended" && !(template.recommended || Number(template.priority || 0) >= 4)) return false;
      if (this._templateCategory === "popular" && !template.popular) return false;
      if (this._templateCategory === "seasonal" && !template.season) return false;
      if (!["all", "recommended", "popular", "seasonal"].includes(this._templateCategory) && template.category !== this._templateCategory) return false;
      if (this._templateSeason !== "all" && template.season !== this._templateSeason) return false;
      if (this._templateOnlyCommon && !template.common) return false;
      return this._matches(template);
    });
  }
});
