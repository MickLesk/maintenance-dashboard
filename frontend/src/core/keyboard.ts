// Global keyboard shortcuts for the panel.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _bindKeyboard() {
    if (this._keyboardBound) return;
    this._keyboardBound = true;
    this._keyboardHandler = event => this._handleKeyboard(event);
    window.addEventListener("keydown", this._keyboardHandler);
  },

  _unbindKeyboard() {
    if (!this._keyboardBound || !this._keyboardHandler) return;
    window.removeEventListener("keydown", this._keyboardHandler);
    this._keyboardBound = false;
    this._keyboardHandler = null;
  },

  _handleKeyboard(event) {
    const target = event.target;
    const tag = String(target?.tagName || "").toLowerCase();
    const editable = tag === "input" || tag === "textarea" || tag === "select" || target?.isContentEditable;
    if (event.key === "Escape") {
      if (this._closeTopOverlay()) { event.preventDefault(); return; }
    }
    if (editable && event.key !== "Escape") return;
    if (event.key === "/" && !event.ctrlKey && !event.metaKey && !event.altKey) {
      const search = this.shadowRoot?.querySelector("#search");
      if (search) { event.preventDefault(); search.focus(); }
      return;
    }
    if ((event.key === "?" || (event.key === "/" && event.shiftKey)) && !event.ctrlKey && !event.metaKey) {
      event.preventDefault();
      this._shortcutsDialogOpen = !this._shortcutsDialogOpen;
      this._render();
    }
  },

  _closeTopOverlay() {
    if (this._shortcutsDialogOpen) { this._shortcutsDialogOpen = false; this._render(); return true; }
    if (this._dialog) { this._closeDialog(); return true; }
    if (this._taskDetailId) { this._taskDetailId = ""; this._taskNoteDraft = ""; this._taskDetailTab = "overview"; this._render(); return true; }
    if (this._mobileActionTaskId) { this._mobileActionTaskId = ""; this._render(); return true; }
    if (this._qualityDialogOpen) { this._qualityDialogOpen = false; this._render(); return true; }
    if (this._templateImportOpen) { this._templateImportOpen = false; this._templateImportPreview = null; this._render(); return true; }
    if (this._bulkPreview) { this._bulkPreview = null; this._render(); return true; }
    if (this._completionDialog) { this._completionDialog = null; this._render(); return true; }
    if (this._quickCreateOpen) { this._quickCreateOpen = false; this._render(); return true; }
    return false;
  },
});
