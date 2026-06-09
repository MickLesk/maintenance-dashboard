// Main custom element shell and lifecycle. Feature/rendering methods are attached by split modules.
class MaintenanceDashboardPanel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._view = "dashboard";
    this._state = null;
    this._draft = { ...EMPTY };
    this._dialog = null;
    this._diagnostics = false;
    this._historyDialog = false;
    this._search = "";
    this._statusFilter = "all";
    this._sortMode = "smart";
    this._dragTaskId = null;
    this._snoozeMenu = null;
    this._selectedTemplates = new Set();
    this._busy = false;
    this._error = "";
    this._searchTimer = null;
    this._nextTaskOffset = 0;
    this._toast = null;
    this._toastTimer = null;
    this._templateCategory = "recommended";
    this._templatePreview = null;
    this._dataDialog = false;
    this._notificationDialog = false;
    this._completionDialog = null;
    this._completionNote = "";
    this._importPayload = "";
    this._notifyService = "";
  }

  set hass(value) { this._hass = value; if (!this._state) this._load(); this._subscribe(); }

  get hass() { return this._hass; }

  connectedCallback() { this._load(); this._render(); }

  disconnectedCallback() { if (this._unsubscribe) this._unsubscribe(); }

  async _subscribe() {
    if (!this.hass?.connection?.subscribeEvents || this._unsubscribe) return;
    this._unsubscribe = await this.hass.connection.subscribeEvents(() => this._load(), "maintenance_dashboard_updated");
  }

  async _load() {
    if (!this.hass?.callWS) return;
    try {
      this._state = await this.hass.callWS({ type: "maintenance_dashboard/get_state" });
      this._error = "";
    } catch (e) {
      this._error = String(e);
    }
    this._render();
  }

  _lang() { return String(this.hass?.language || this.hass?.locale?.language || document.documentElement.lang || "en").toLowerCase().startsWith("de") ? "de" : "en"; }

  _t(key) { return I18N[this._lang()][key] || I18N.en[key] || key; }

  _html(value) { return String(value ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[c])); }

  _render() {
    const focusState = this._captureFocus();
    const content = this._state ? this._viewHtml() : `<div class="loading">Loading…</div>`;
    this.shadowRoot.innerHTML = `${this._styles()}<main class="shell">${this._hero()}${content}${this._dialogHtml()}${this._historyDialogHtml()}${this._diagnosticsHtml()}${this._dataDialogHtml()}${this._notificationDialogHtml()}${this._templatePreviewHtml()}${this._completionDialogHtml()}${this._toastHtml()}</main>`;
    this._bind();
    this._restoreFocus(focusState);
  }

  _renderSoon(delay = 180) {
    if (this._searchTimer) clearTimeout(this._searchTimer);
    this._searchTimer = setTimeout(() => { this._searchTimer = null; this._render(); }, delay);
  }

  _captureFocus() {
    const active = this.shadowRoot?.activeElement;
    const dialog = this.shadowRoot?.querySelector(".dialog");
    const shell = this.shadowRoot?.querySelector(".shell");
    return {
      id: active?.id || "",
      start: active?.selectionStart,
      end: active?.selectionEnd,
      dialogScrollTop: dialog?.scrollTop || 0,
      shellScrollTop: shell?.scrollTop || 0,
    };
  }

  _restoreFocus(state) {
    requestAnimationFrame(() => {
      const dialog = this.shadowRoot?.querySelector(".dialog");
      const shell = this.shadowRoot?.querySelector(".shell");
      if (dialog && typeof state?.dialogScrollTop === "number") dialog.scrollTop = state.dialogScrollTop;
      if (shell && typeof state?.shellScrollTop === "number") shell.scrollTop = state.shellScrollTop;
      if (!state?.id) return;
      const el = this.shadowRoot?.getElementById(state.id);
      if (!el) return;
      el.focus();
      if (typeof el.setSelectionRange === "function" && state.start != null) {
        try { el.setSelectionRange(state.start, state.end ?? state.start); } catch (_) { }
      }
    });
  }
}
