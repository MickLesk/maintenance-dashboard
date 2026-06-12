// Template preview dialog rendering.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _templatePreviewHtml() {
    if (!this._templatePreview) return "";
    const t = this._template(this._templatePreview);
    if (!t) return "";
    return `<div class="dialog-backdrop"><section class="dialog small"><header><h2>${this._t("preview")}</h2><button class="icon" data-action="close-template-preview"><ha-icon icon="mdi:close"></ha-icon></button></header><div class="dialog-body"><section class="dialog-section template-preview"><div class="template-preview-heading"><ha-icon icon="${this._html(t.icon)}"></ha-icon><div><h3>${this._html(t.name)}</h3><p>${this._html(t.description || "")}</p></div></div><div class="meta-grid"><div><span>${this._t("category")}</span><strong>${this._categoryLabel(t)}</strong></div><div><span>${this._t("schedule")}</span><strong>${this._scheduleSummary(t)}</strong></div><div><span>${this._t("priority")}</span><strong>${this._priorityLabel(t.priority)} ${t.priority}/5</strong></div><div><span>${this._t("scheduleMode")}</span><strong>${this._scheduleModeLabel(t.schedule_mode || "interval")}</strong></div></div>${Array.isArray(t.tags) && t.tags.length ? `<div class="preview-tags"><span>${this._t("tags")}</span><div class="tag-list">${t.tags.map(tag => `<span>${this._html(tag)}</span>`).join("")}</div></div>` : ""}</section></div><footer><button class="ghost" data-action="close-template-preview">${this._t("cancel")}</button><button class="primary" data-template="${this._html(t.id)}"><ha-icon icon="mdi:plus"></ha-icon>${this._t("addTemplate")}</button></footer></section></div>`;
  }
});
