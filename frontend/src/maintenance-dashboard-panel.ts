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
    this._showCompleted = false;
    this._dragTaskId = null;
    this._lastOrder = null;
    this._longPressTimer = null;
    this._snoozeMenu = null;
    this._selectedTemplates = new Set();
    this._busy = false;
    this._error = "";
    this._searchTimer = null;
    this._toast = null;
    this._toastTimer = null;
    this._templateCategory = "all";
    this._templateSeason = "all";
    this._templateOnlyCommon = false;
    this._templatePreview = null;
    this._templateDraftId = "";
    this._templatePickerQuery = "";
    this._templateFavorites = new Set();
    this._taskDetailTab = "overview";
    this._mobileActionTaskId = "";
    this._qualityDialogOpen = false;
    this._statusMetricsExpanded = false;
    this._templateImportOpen = false;
    this._templateImportPayload = "";
    this._templateImportPreview = null;
    this._completionAttachments = [];
    this._duplicateTaskWarning = "";
    this._taskDetailId = "";
    this._taskNoteDraft = "";
    this._quickCreateOpen = false;
    this._createSource = null;
    this._templatePickPhase = false;
    this._starterPacksCollapsed = true;
    this._selectedPacks = new Set();
    this._onboardingDialog = false;
    this._onboardingDismissed = false;
    this._dataDialog = false;
    this._notificationDialog = false;
    this._completionDialog = null;
    this._completionNote = "";
    this._completionMaterial = "";
    this._completionCost = "";
    this._completionCurrency = "EUR";
    this._completionPerformedBy = "";
    this._completionChecklist = [];
    this._historySearch = "";
    this._historyType = "all";
    this._historyTask = "all";
    this._historyRange = "all";
    this._historyScope = "all";
    this._importPayload = "";
    this._notifyService = "";
    this._notificationPreview = null;
    this._notificationPreviewTask = "";
    this._layoutMode = "cards";
    this._density = "comfortable";
    this._layoutInitialized = false;
    this._selectedTasks = new Set();
    this._showAdvancedFilters = false;
    this._quickFiltersOpen = false;
    this._categoryFilter = "all";
    this._areaFilter = "all";
    this._priorityFilter = "all";
    this._scheduleFilter = "all";
    this._dueFilter = "all";
    this._tagFilter = "";
    this._entityFilter = "all";
    this._savedFilterName = "";
    this._bulkAction = "done";
    this._bulkValue = "";
    this._bulkPreview = null;
    this._dialogStep = 0;
    this._workflowMenu = null;
    this._backupDiff = null;
    this._backupDiffId = null;
    this._restoreSections = new Set(["tasks", "history", "settings", "notification_state"]);
    this._restoreTaskIds = new Set();
    this._settingsTab = "general";
    this._importMode = "replace";
    this._importDuplicateMode = "overwrite";
    this._importPreview = null;
    this._integrityResult = null;
    this._backupName = "";
    this._backupPinned = false;
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
      if (!this._layoutInitialized) {
        this._layoutMode = this._state?.settings?.dashboard?.view_mode || "cards";
        this._density = this._state?.settings?.dashboard?.density || "comfortable";
        this._dueFilter = this._state?.settings?.dashboard?.default_due_filter || "all";
        this._layoutInitialized = true;
      }
      const favorites = this._state?.template_favorites || this._state?.settings?.user_templates?.favorites || [];
      this._templateFavorites = new Set(Array.isArray(favorites) ? favorites : []);
      const onboarding = this._state?.settings?.onboarding || {};
      if (!this._onboardingDismissed && !onboarding.completed && !(this._state?.tasks || []).some(task => !task.deleted)) {
        this._onboardingDialog = true;
      }
    } catch (e) {
      this._error = String(e);
    }
    this._render();
  }

  _lang() {
    const raw = String(this.hass?.language || this.hass?.locale?.language || document.documentElement.lang || "en").toLowerCase();
    const base = raw.split(/[-_]/)[0];
    if (I18N_LOCALES.includes(raw)) return raw;
    if (I18N_LOCALES.includes(base)) return base;
    return "en";
  }

  _t(key) { return I18N[this._lang()]?.[key] ?? I18N.en?.[key] ?? key; }

  _html(value) { return String(value ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[c])); }

  _render() {
    const focusState = this._captureFocus();
    const content = this._state ? this._viewHtml() : `<div class="loading">${this._t("loading")}</div>`;
    this.shadowRoot.innerHTML = `${this._styles()}<main class="shell density-${this._html(this._density)}">${this._hero()}${content}${this._dialogHtml()}${this._taskDetailSheetHtml()}${this._qualityDialogHtml()}${this._templateImportDialogHtml()}${this._mobileActionSheetHtml()}${this._historyDialogHtml()}${this._diagnosticsHtml()}${this._dataDialogHtml()}${this._notificationDialogHtml()}${this._templatePreviewHtml()}${this._completionDialogHtml()}${this._bulkPreviewHtml()}${this._onboardingDialogHtml()}${this._toastHtml()}</main>`;
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
