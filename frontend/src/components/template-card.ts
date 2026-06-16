// Template card rendering and preview entry points.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _templateCard(t) {
    const checked = this._selectedTemplates.has(t.id);
    const exists = (this._state.tasks || []).some(task => !task.deleted && (task.template_id ? task.template_id === t.id : String(task.name).toLowerCase() === String(t.name).toLowerCase()));
    const badges = [
      t.popular ? `<span class="template-badge popular">${this._t("popular")}</span>` : "",
      t.recommended ? `<span class="template-badge">${this._t("recommended")}</span>` : "",
      t.season ? `<span class="template-badge season">${this._t(t.season)}</span>` : "",
    ].filter(Boolean).join("");
    return `<article class="template-card compact ${checked ? "selected" : ""} ${exists ? "exists" : ""}" data-template-preview="${this._html(t.id)}"><header><label class="template-check" onclick="event.stopPropagation()"><input type="checkbox" data-template-check="${t.id}" ${checked ? "checked" : ""}><span></span></label><ha-icon icon="${this._html(t.icon)}"></ha-icon><div class="template-title"><h3>${this._html(t.name)}</h3><div class="template-badges">${badges}</div></div></header><small><ha-icon icon="${this._categoryIcon(t.category)}"></ha-icon>${this._categoryLabel(t)} · ${this._scheduleSummary(t)} · ${this._t("priority")} ${t.priority}/5</small>${Array.isArray(t.tags) && t.tags.length ? `<div class="tag-list">${t.tags.slice(0,4).map(tag => `<span>${this._html(tag)}</span>`).join("")}</div>` : ""}<footer><button class="ghost" data-template-preview-btn="${t.id}"><ha-icon icon="mdi:eye-outline"></ha-icon>${this._t("preview")}</button><button class="ghost" data-template="${t.id}" ${exists ? "disabled" : ""}><ha-icon icon="mdi:plus"></ha-icon>${exists ? this._t("ok") : this._t("add")}</button></footer></article>`;
  }
});
