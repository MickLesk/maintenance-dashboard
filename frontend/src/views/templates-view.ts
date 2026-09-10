// Categorized template library with starter packs and metadata filters (settings tab).
Object.assign(MaintenanceDashboardPanel.prototype, {
  _templatesSectionHtml() {
    const templates = this._filteredTemplates();
    const selected = templates.filter(t => this._selectedTemplates.has(t.id));
    const grouped = templates.reduce((acc, template) => {
      const key = template.category || "general";
      (acc[key] ||= []).push(template);
      return acc;
    }, {});
    const order = CATEGORY_KEYS.filter(key => grouped[key]?.length);
    const resultMeta = `<div class="template-results-meta"><strong>${templates.length}</strong><span>${this._t("templates")}</span><em>${order.length} ${this._t("category").toLowerCase()}</em></div>`;
    const groupsHtml = order.map(key => `
      <section class="template-group">
        <div class="template-group-header"><div class="template-group-title"><span class="template-group-icon"><ha-icon icon="${this._categoryIcon(key)}"></ha-icon></span><div><small>${this._t("category")}</small><h3>${this._t(key)}</h3></div></div><span>${grouped[key].length}</span></div>
        <div class="template-grid compact">${grouped[key].map(t => this._templateCard(t)).join("")}</div>
      </section>
    `).join("");
    const packs = this._state?.template_packs || [];
    const starterCount = packs.length ? `<span class="starter-count">${packs.length}</span>` : "";
    const activeFilters = [
      this._templateCategory !== "all" ? `<button class="active-filter-chip" data-clear-template-filter="category">${this._t(this._templateCategory)}<ha-icon icon="mdi:close"></ha-icon></button>` : "",
      this._templateSeason !== "all" ? `<button class="active-filter-chip" data-clear-template-filter="season">${this._t(this._templateSeason)}<ha-icon icon="mdi:close"></ha-icon></button>` : "",
      this._templateOnlyCommon ? `<button class="active-filter-chip" data-clear-template-filter="recommended">${this._t("recommendedOnly")}<ha-icon icon="mdi:close"></ha-icon></button>` : "",
      this._search ? `<button class="active-filter-chip" data-clear-template-filter="search">${this._t("search")}: ${this._html(this._search)}<ha-icon icon="mdi:close"></ha-icon></button>` : "",
    ].filter(Boolean).join("");
    return `<header><ha-icon icon="mdi:shape-outline"></ha-icon><div><h3>${this._t("templates")}</h3><p>${this._t("templateSelectHint")}</p></div><div class="page-header-actions"><button class="ghost" data-action="export-custom-templates"><ha-icon icon="mdi:download"></ha-icon>${this._t("exportTemplates")}</button><button class="ghost" data-action="open-template-import"><ha-icon icon="mdi:upload"></ha-icon>${this._t("importTemplates")}</button></div></header>
      <section class="templates-workbench">
        <div class="templates-toolbar-main">
          <input id="search" class="search" placeholder="${this._t("search")}" value="${this._html(this._search)}">
          <div class="template-selection-actions">
            <button class="ghost" data-action="select-visible"><ha-icon icon="mdi:checkbox-multiple-marked-outline"></ha-icon>${this._t("selectAllVisible")}</button>
            <button class="ghost" data-action="clear-template-selection"><ha-icon icon="mdi:checkbox-blank-off-outline"></ha-icon>${this._t("deselectAll")}</button>
            <button class="primary big" data-action="add-selected" ${selected.length ? "" : "disabled"}><ha-icon icon="mdi:plus-box-multiple-outline"></ha-icon>${this._t("addSelected")} · ${selected.length}</button>
          </div>
        </div>
        <section class="template-filter-bar" data-template-results>
          <div class="category-tabs" aria-label="${this._t("templateCategory")}">${TEMPLATE_CATEGORY_KEYS.map(k => `<button class="tab ${this._templateCategory === k ? "active" : ""}" data-template-category="${k}"><ha-icon icon="${this._categoryIcon(k)}"></ha-icon><span>${this._t(k)}</span></button>`).join("")}</div>
          <div class="template-secondary-filters">${resultMeta}<div class="template-filter-controls"><label><span>${this._t("seasonal")}</span><select id="templateSeason"><option value="all">${this._t("all")}</option>${["spring","summer","autumn","winter"].map(x => `<option value="${x}" ${this._templateSeason === x ? "selected" : ""}>${this._t(x)}</option>`).join("")}</select></label><label class="check compact-check"><input id="templateCommon" type="checkbox" ${this._templateOnlyCommon ? "checked" : ""}>${this._t("recommendedOnly")}</label></div>${activeFilters ? `<div class="active-filter-chips">${activeFilters}</div>` : ""}</div>
        </section>
      </section>
      ${templates.length ? groupsHtml : this._emptyMessage("mdi:shape-outline", this._t("noTemplatesMatch"))}
      ${packs.length ? `<section class="starter-packs ${this._starterPacksCollapsed ? "collapsed" : ""}"><div class="section-title"><div><h2>${this._t("starterPacks")} ${starterCount}</h2><p>${this._t("onboardingHint")}</p></div><button class="ghost starter-toggle" data-action="toggle-starter-packs"><ha-icon icon="${this._starterPacksCollapsed ? "mdi:chevron-down" : "mdi:chevron-up"}"></ha-icon>${this._starterPacksCollapsed ? this._t("expandStarterPacks") : this._t("collapseStarterPacks")}</button></div>${this._starterPacksCollapsed ? "" : `<div class="pack-strip">${packs.map(pack => `<article class="pack-mini"><ha-icon icon="${this._html(pack.icon || "mdi:package-variant")}"></ha-icon><div><strong>${this._html(pack.name)}</strong><p>${this._html(pack.description || "")}</p><small>${(pack.template_ids || []).length} ${this._t("templates")}</small></div><button class="ghost pack-mini-action" data-add-pack="${this._html(pack.id)}"><ha-icon icon="mdi:plus"></ha-icon>${this._t("addPackage")}</button></article>`).join("")}</div>`}</section>` : ""}`;
  },

  _filteredTemplates() {
    return (this._state.templates || []).filter(template => {
      if (this._templateCategory === "recommended" && !(template.recommended || Number(template.priority || 0) >= 4)) return false;
      if (this._templateCategory === "favorites" && !this._templateFavorites.has(template.id)) return false;
      if (this._templateCategory === "seasonal" && !template.season) return false;
      if (!["all", "favorites", "recommended", "seasonal"].includes(this._templateCategory) && template.category !== this._templateCategory) return false;
      if (this._templateSeason !== "all" && template.season !== this._templateSeason) return false;
      if (this._templateOnlyCommon && !(template.recommended || template.common || Number(template.priority || 0) >= 4)) return false;
      return this._matches(template);
    });
  },

  _scrollTemplateResults() {
    requestAnimationFrame(() => {
      this.shadowRoot.querySelector("[data-template-results]")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  },

  _openTemplatesSettings() {
    this._view = "settings";
    this._settingsTab = "templates";
    this._quickCreateOpen = false;
    this._render();
  },
});
