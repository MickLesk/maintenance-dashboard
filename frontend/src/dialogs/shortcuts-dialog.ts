// Keyboard shortcuts help dialog.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _shortcutsDialogHtml() {
    if (!this._shortcutsDialogOpen) return "";
    const rows = [
      ["/", "shortcutFocusSearch"],
      ["?", "shortcutShowHelp"],
      ["Esc", "shortcutCloseOverlay"],
    ];
    return `<div class="dialog-backdrop"><section class="dialog small shortcuts-dialog"><header><div class="dialog-title-block"><h2>${this._t("keyboardShortcuts")}</h2><p class="section-hint">${this._t("keyboardShortcutsHint")}</p></div><button class="icon" data-action="close-shortcuts"><ha-icon icon="mdi:close"></ha-icon></button></header><div class="dialog-body"><div class="shortcut-list">${rows.map(([key, label]) => `<article class="shortcut-row"><kbd>${this._html(key)}</kbd><span>${this._t(label)}</span></article>`).join("")}</div></div><footer><button class="ghost" data-action="close-shortcuts">${this._t("cancel")}</button></footer></section></div>`;
  },
});
