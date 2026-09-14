// @ts-nocheck
// Status must not be carried by colour alone, and the panel rebuilds its whole
// shadow tree on every render, so dialogs and menus are re-labelled each time.
const STATUS_ICONS = {
  overdue: "mdi:calendar-alert",
  critical: "mdi:alert-octagon",
  warning: "mdi:alert-outline",
  unavailable: "mdi:cloud-question-outline",
  snoozed: "mdi:pause-circle-outline",
  ok: "mdi:check-circle-outline",
  completed: "mdi:archive-check-outline",
  disabled: "mdi:cancel",
  deleted: "mdi:delete-outline",
};

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled]):not([type=hidden])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

Object.assign(MaintenanceDashboardPanel.prototype, {
  _statusIcon(status) {
    return STATUS_ICONS[status] || STATUS_ICONS.unavailable;
  },

  _statusChip(status, label) {
    return `<span class="status ${this._html(status)}"><ha-icon icon="${this._statusIcon(status)}"></ha-icon>${label}</span>`;
  },

  _topDialog() {
    const backdrops = this.shadowRoot?.querySelectorAll(".dialog-backdrop");
    return backdrops?.length ? backdrops[backdrops.length - 1] : null;
  },

  _openMenu() {
    return this.shadowRoot?.querySelector(".snooze-menu,.workflow-menu") || null;
  },

  _focusableIn(root) {
    return Array.from(root?.querySelectorAll(FOCUSABLE) || []).filter(el => el.getClientRects().length);
  },

  _applyAccessibility() {
    const root = this.shadowRoot;
    if (!root) return;

    root.querySelectorAll(".dialog-backdrop").forEach((backdrop, index) => {
      const dialog = backdrop.querySelector(".dialog");
      if (!dialog) return;
      dialog.setAttribute("role", "dialog");
      dialog.setAttribute("aria-modal", "true");
      dialog.setAttribute("tabindex", "-1");
      const heading = dialog.querySelector("h2");
      if (!heading) return;
      if (!heading.id) heading.id = `maintenance-dialog-title-${index}`;
      dialog.setAttribute("aria-labelledby", heading.id);
    });

    const toast = root.querySelector(".toast");
    if (toast) {
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
    }

    root.querySelectorAll(".snooze-menu,.workflow-menu").forEach(menu => {
      menu.setAttribute("role", "menu");
      menu.querySelectorAll("button").forEach(button => button.setAttribute("role", "menuitem"));
    });
    root.querySelectorAll("[data-snooze-menu],[data-workflow-menu]").forEach(button => {
      const id = button.dataset.snoozeMenu || button.dataset.workflowMenu;
      button.setAttribute("aria-haspopup", "menu");
      button.setAttribute("aria-expanded", String(this._snoozeMenu === id || this._workflowMenu === id));
    });

    this._syncOverlayFocus();
  },

  // Only move focus when a different overlay appears, so typing is never interrupted.
  _syncOverlayFocus() {
    const dialog = this._topDialog()?.querySelector(".dialog") || null;
    const menu = this._openMenu();
    const signature = dialog
      ? `dialog:${dialog.className}:${dialog.querySelector("h2")?.textContent || ""}`
      : menu ? `menu:${this._snoozeMenu || this._workflowMenu}` : "";
    if (signature === this._overlaySignature) return;
    this._overlaySignature = signature;
    const container = dialog || menu;
    if (!container) return;
    requestAnimationFrame(() => {
      if (!container.isConnected) return;
      (this._focusableIn(container)[0] || container).focus?.();
    });
  },

  _handleOverlayKeys(event) {
    const menu = this._openMenu();
    if (menu && (event.key === "ArrowDown" || event.key === "ArrowUp")) {
      const items = this._focusableIn(menu);
      if (!items.length) return false;
      const current = items.indexOf(this.shadowRoot.activeElement);
      const step = event.key === "ArrowDown" ? 1 : -1;
      const next = items[(current + step + items.length) % items.length] || items[0];
      event.preventDefault();
      next.focus();
      return true;
    }

    if (event.key !== "Tab") return false;
    const container = this._topDialog()?.querySelector(".dialog") || menu;
    if (!container) return false;
    const items = this._focusableIn(container);
    if (!items.length) return false;
    const current = items.indexOf(this.shadowRoot.activeElement);
    const step = event.shiftKey ? -1 : 1;
    const next = current === -1 ? items[event.shiftKey ? items.length - 1 : 0] : items[(current + step + items.length) % items.length];
    event.preventDefault();
    next.focus();
    return true;
  },
});
