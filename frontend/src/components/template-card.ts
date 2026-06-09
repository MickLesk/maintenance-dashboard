// Template card rendering and preview entry points.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _templateCard(t) {
    const checked = this._selectedTemplates.has(t.id);
    const exists = (this._state.tasks || []).some(task => !task.deleted && String(task.name).toLowerCase() === String(t.name).toLowerCase());
    return `<article class="template-card compact ${checked ? "selected" : ""} ${exists ? "exists" : ""}" data-template-preview="${this._html(t.id)}"><header><label class="template-check" onclick="event.stopPropagation()"><input type="checkbox" data-template-check="${t.id}" ${checked ? "checked" : ""}><span></span></label><ha-icon icon="${this._html(t.icon)}"></ha-icon><h3>${this._html(t.name)}</h3></header><small>${this._categoryLabel(t)} · ${t.interval} ${this._unitLabel(t.interval_unit)} · ${this._t("priority")} ${t.priority}/5${t.season ? ` · ${this._t(t.season)}` : ""}</small><footer><button class="ghost" data-template-preview-btn="${t.id}"><ha-icon icon="mdi:eye-outline"></ha-icon>${this._t("preview")}</button><button class="ghost" data-template="${t.id}" ${exists ? "disabled" : ""}><ha-icon icon="mdi:plus"></ha-icon>${exists ? this._t("ok") : this._t("add")}</button></footer></article>`;
  }
});
