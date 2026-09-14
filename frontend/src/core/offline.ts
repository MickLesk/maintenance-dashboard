// @ts-nocheck
// Completions happen in the cellar, the garage, the loft: exactly where the
// connection is not. A completion that cannot reach the backend is kept and
// replayed instead of being lost with the tap that recorded it.
const PENDING_KEY = "maintenance-dashboard-pending-completions";
const MAX_PENDING = 50;

Object.assign(MaintenanceDashboardPanel.prototype, {
  _pendingCompletions() {
    try {
      const raw = JSON.parse(localStorage.getItem(PENDING_KEY) || "[]");
      return Array.isArray(raw) ? raw : [];
    } catch {
      return [];
    }
  },

  _writePendingCompletions(items) {
    try {
      if (items.length) localStorage.setItem(PENDING_KEY, JSON.stringify(items.slice(-MAX_PENDING)));
      else localStorage.removeItem(PENDING_KEY);
    } catch { /* ignore quota */ }
  },

  _queueCompletion(taskId, details) {
    const items = this._pendingCompletions();
    items.push({ task_id: taskId, details: details || {}, queued_at: new Date().toISOString() });
    this._writePendingCompletions(items);
  },

  _isConnectionError(error) {
    if (this.hass?.connection?.connected === false) return true;
    const message = String(error?.message || error || "").toLowerCase();
    return ["connection", "disconnect", "not_connected", "websocket", "timeout", "network", "failed to fetch"]
      .some(marker => message.includes(marker));
  },

  async _flushPendingCompletions() {
    const items = this._pendingCompletions();
    if (!items.length || !this.hass?.callWS || this._flushingCompletions) return false;
    this._flushingCompletions = true;
    let sent = 0;
    try {
      while (items.length) {
        const entry = items[0];
        try {
          await this.hass.callWS({ type: "maintenance_dashboard/mark_done", task_id: entry.task_id, ...(entry.details || {}) });
        } catch (error) {
          if (this._isConnectionError(error)) break;
          // A completion the backend rejects would block the queue forever.
          console.warn("maintenance-dashboard: dropped a queued completion", error);
        }
        items.shift();
        sent += 1;
        this._writePendingCompletions(items);
      }
    } finally {
      this._flushingCompletions = false;
    }
    if (sent) this._showToast(this._t("offlineQueueSent").replace("{count}", String(sent)));
    return sent > 0;
  },

  _pendingBadgeHtml() {
    const count = this._pendingCompletions().length;
    if (!count) return "";
    return `<button class="status-metric warning" data-action="flush-pending" title="${this._t("offlineQueueHint")}"><ha-icon icon="mdi:cloud-off-outline"></ha-icon><b>${count}</b> ${this._t("offlineQueued")}</button>`;
  },
});
