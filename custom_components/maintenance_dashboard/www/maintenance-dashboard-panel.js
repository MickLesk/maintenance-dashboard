// ---- frontend/src/core/constants.ts ----
// @ts-nocheck
const VERSION = "1.7.1";
const LOGO_URL = `/api/maintenance_dashboard/static/logo.png?v=${VERSION}`;

const CATEGORY_KEYS = ["general", "heating", "ventilation", "water", "electrical", "safety", "solar", "garden", "building", "it_network", "household", "garage", "custom"];
const STATUS_ORDER = { overdue: 0, critical: 1, warning: 2, unavailable: 3, snoozed: 4, ok: 5, completed: 6, disabled: 7, deleted: 8 };
const STATUS_ACCENTS = {
  overdue: "var(--error-color)",
  critical: "var(--error-color)",
  warning: "var(--warning-color)",
  unavailable: "var(--disabled-text-color)",
  snoozed: "var(--primary-color)",
  ok: null,
  completed: "var(--success-color, #4caf50)"
};
const ICONS = [
  "mdi:wrench-clock", "mdi:air-filter", "mdi:heat-pump-outline", "mdi:fan", "mdi:water-pump", "mdi:smoke-detector-outline",
  "mdi:home-battery-outline", "mdi:robot-mower-outline", "mdi:fire-extinguisher", "mdi:server-network", "mdi:home-roof", "mdi:garage",
  "mdi:solar-power-variant-outline", "mdi:medical-bag", "mdi:tumble-dryer", "mdi:fridge-outline", "mdi:router-network", "mdi:valve"
];

const COLOR_PALETTE = [
  "#00bcd4", "#03a9f4", "#3f51b5", "#673ab7", "#9c27b0", "#e91e63",
  "#f44336", "#ff5722", "#ff9800", "#ffc107", "#8bc34a", "#4caf50",
  "#009688", "#607d8b", "#795548"
];

const CARD_COLOR_PALETTE = [
  "#102a43", "#123524", "#2d1b3d", "#3a1f1f", "#332800", "#16213e",
  "#102f2f", "#2b2435", "#232323", "#1f2937", "#312e21", "#1f2a1f"
];

const PRIORITY_LABELS = {
  de: { 1: "Niedrig", 2: "Normal", 3: "Wichtig", 4: "Hoch", 5: "Kritisch" },
  en: { 1: "Low", 2: "Normal", 3: "Important", 4: "High", 5: "Critical" }
};

const I18N = {
  de: {
    add: "Wartungseintrag hinzufügen", addFirst: "Ersten Wartungseintrag hinzufügen", active: "Offen", all: "Alle", backups: "Backups", cancel: "Abbrechen", cardColor: "Kartenfarbe", category: "Kategorie", clear: "Aufheben", clearSnooze: "Pause aufheben", completedThisYear: "Dieses Jahr erledigt", critical: "Kritisch", dashboard: "Dashboard", delete: "Löschen", deleted: "Gelöscht", description: "Beschreibung", diagnostics: "Diagnose", done: "Erledigt", due: "Fällig", edit: "Bearbeiten", enabled: "Aktiviert", entity: "Entität", health: "Health-Score", healthHelp: "Gewichteter Score aus Status, Priorität und Verfügbarkeit. Kritische Aufgaben mit hoher Priorität senken ihn deutlich stärker.", history: "Historie", icon: "Icon", iconColor: "Iconfarbe", interval: "Intervall", intervalUnit: "Einheit", lastDone: "Zuletzt erledigt", materialEmpty: "Starte mit einer Vorlage oder lege einen eigenen Wartungseintrag an. Die Daten werden backendseitig in Home Assistant gespeichert.", meter: "Sensor/Zähler", name: "Name", next: "Nächste Aufgabe", noTasks: "Noch keine Wartungseinträge vorhanden.", ok: "OK", overdue: "Überfällig", priority: "Priorität", progress: "Fortschritt", remaining: "verbleibend", restore: "Wiederherstellen", save: "Speichern", search: "Suche", selectTemplate: "Aus Vorlage starten", selectedTemplates: "ausgewählt", settings: "Einstellungen", snooze: "Pausieren", snoozeFor: "Pausieren für", sort: "Sortieren", sortSmart: "Smart", sortPosition: "Manuell", sortPriority: "Priorität", sortDue: "Fälligkeit", sortStatus: "Status", status: "Status", templates: "Vorlagen", templateSelectHint: "Wähle mehrere Vorlagen aus und füge nur die passenden hinzu – kein Vollspammen mehr.", time: "Zeit", undo: "Rückgängig", unavailable: "Nicht verfügbar", unavailableHelp: "Sensor-/Zähleraufgaben ohne valide Entity, ungültige Limits oder aktuell nicht lesbare HA-States.", warning: "Warnung", warnings: "Warnungen", days: "Tage", hours: "Stunden", weeks: "Wochen", months: "Monate", general: "Allgemein", heating: "Heizung", ventilation: "Lüftung", water: "Wasser", electrical: "Elektrik", safety: "Sicherheit", solar: "Solar", garden: "Garten", building: "Gebäude", it_network: "IT/Netzwerk", household: "Haushalt", garage: "Garage", custom: "Manuell", addSelected: "Gewählte hinzufügen", selectAllVisible: "Sichtbare auswählen", deselectAll: "Auswahl leeren", pausedUntil: "Pausiert bis", dragHint: "Manuelle Sortierung per Drag & Drop oder Pfeile. Smart-Sortierung nutzt Status, Priorität, Fälligkeit und manuelle Position.", randomColors: "Zufällige Farben", clearColors: "Farben zurücksetzen", priorityHint: "Priorität beeinflusst Smart-Sortierung und Health-Score.", appearanceHint: "Farben sind optional. Leer bedeutet: Home-Assistant-Theme verwenden.", openHistory: "Historie öffnen", focusNextTask: "Zur nächsten Aufgabe springen", noHistory: "Noch keine Historie vorhanden.", nextTaskHint: "Klicken, um zur Aufgabe zu springen", taskFocused: "Aufgabe hervorgehoben", previousTask: "Vorherige Aufgabe", nextTask: "Nächste Aufgabe", taskCounter: "Aufgabe", noTemplatesMatch: "Keine passenden Vorlagen gefunden.", noTasksMatch: "Keine passenden Wartungseinträge gefunden.", settingsIntro: "Konfiguration, Diagnose und Backups für dein Maintenance Dashboard.", actionSaved: "Wartungseintrag gespeichert", actionDone: "Wartungseintrag erledigt", actionSnoozed: "Wartungseintrag pausiert", actionSnoozeCleared: "Pause aufgehoben", actionUndo: "Historieneintrag rückgängig gemacht", actionDeleted: "Wartungseintrag gelöscht", actionRestored: "Backup wiederhergestellt", actionTemplatesAdded: "Vorlagen hinzugefügt"
  },
  en: {
    add: "Add maintenance task", addFirst: "Add first maintenance task", active: "Open", all: "All", backups: "Backups", cancel: "Cancel", cardColor: "Card color", category: "Category", clear: "Clear", clearSnooze: "Clear snooze", completedThisYear: "Done this year", critical: "Critical", dashboard: "Dashboard", delete: "Delete", deleted: "Deleted", description: "Description", diagnostics: "Diagnostics", done: "Done", due: "Due", edit: "Edit", enabled: "Enabled", entity: "Entity", health: "Health score", healthHelp: "Weighted score based on status, priority and availability. High-priority critical tasks reduce it much more strongly.", history: "History", icon: "Icon", iconColor: "Icon color", interval: "Interval", intervalUnit: "Unit", lastDone: "Last done", materialEmpty: "Start with a template or create a custom maintenance task. Data is stored by the backend inside Home Assistant.", meter: "Sensor/Meter", name: "Name", next: "Next task", noTasks: "No maintenance tasks yet.", ok: "OK", overdue: "Overdue", priority: "Priority", progress: "Progress", remaining: "remaining", restore: "Restore", save: "Save", search: "Search", selectTemplate: "Start from template", selectedTemplates: "selected", settings: "Settings", snooze: "Snooze", snoozeFor: "Snooze for", sort: "Sort", sortSmart: "Smart", sortPosition: "Manual", sortPriority: "Priority", sortDue: "Due date", sortStatus: "Status", status: "Status", templates: "Templates", templateSelectHint: "Select multiple templates and add only what fits.", time: "Time", undo: "Undo", unavailable: "Unavailable", unavailableHelp: "Meter tasks without a valid entity, invalid limits or currently unreadable Home Assistant states.", warning: "Warning", warnings: "Warnings", days: "Days", hours: "Hours", weeks: "Weeks", months: "Months", general: "General", heating: "Heating", ventilation: "Ventilation", water: "Water", electrical: "Electrical", safety: "Safety", solar: "Solar", garden: "Garden", building: "Building", it_network: "IT/Network", household: "Household", garage: "Garage", custom: "Manual", addSelected: "Add selected", selectAllVisible: "Select visible", deselectAll: "Clear selection", pausedUntil: "Paused until", dragHint: "Manual sorting via drag & drop or arrows. Smart sorting uses status, priority, due date and manual position.", randomColors: "Random colors", clearColors: "Reset colors", priorityHint: "Priority affects smart sorting and health score.", appearanceHint: "Colors are optional. Empty means: use the Home Assistant theme.", openHistory: "Open history", focusNextTask: "Jump to next task", noHistory: "No history yet.", nextTaskHint: "Click to jump to the task", taskFocused: "Task highlighted", previousTask: "Previous task", nextTask: "Next task", taskCounter: "Task", noTemplatesMatch: "No matching templates found.", noTasksMatch: "No matching maintenance tasks found.", settingsIntro: "Configuration, diagnostics and backups for your Maintenance Dashboard.", actionSaved: "Maintenance task saved", actionDone: "Maintenance task marked as done", actionSnoozed: "Maintenance task snoozed", actionSnoozeCleared: "Snooze cleared", actionUndo: "History entry undone", actionDeleted: "Maintenance task deleted", actionRestored: "Backup restored", actionTemplatesAdded: "Templates added"
  }
};

Object.assign(I18N.de, {
  entityMode: "Task-Entities", entityModeHint: "Optional pro Wartungseintrag eigene Home-Assistant-Entities erzeugen.", off: "Aus", dueOnly: "Nur fällig", basic: "Basis", full: "Vollständig", dueNotifications: "Fällig-Benachrichtigungen", warningNotifications: "Warnungen", criticalNotifications: "Kritisch", dailyDigest: "Täglicher Digest", digestTime: "Digest-Zeit", quietHours: "Ruhezeiten", quietFrom: "Ruhe ab", quietTo: "Ruhe bis", includeSnoozed: "Pausierte einbeziehen", includeDashboardLink: "Dashboard-Link einfügen", notifyDueTasks: "Fällige Aufgaben senden",
  dataSafety: "Datensicherheit", exportData: "Exportieren", importData: "Importieren", backupRestore: "Backup & Restore", downloadBackup: "Backup herunterladen", importJson: "JSON importieren", importPaste: "JSON hier einfügen", restoreBackup: "Backup wiederherstellen", copyDiagnostics: "Diagnose kopieren", notifications: "Benachrichtigungen", notifyService: "Notify-Service", testNotification: "Test senden", sendDigest: "Digest senden", templateCategory: "Vorlagen-Kategorie", preview: "Vorschau", addTemplate: "Vorlage hinzufügen", recommended: "Empfohlen", seasonal: "Saisonal", spring: "Frühling", summer: "Sommer", autumn: "Herbst", winter: "Winter", scheduleMode: "Planung", intervalSchedule: "Intervall", oneTime: "Einmalig", fixedDate: "Fixes Datum", completionNote: "Erledigt-Notiz", markDone: "Als erledigt speichern", noteOptional: "Optionale Notiz", actionExported: "Export erstellt", actionImported: "Daten importiert", actionNotificationSent: "Benachrichtigung gesendet", mobileMore: "Mehr", completed: "Erledigt"
});
Object.assign(I18N.en, {
  entityMode: "Task entities", entityModeHint: "Optionally create Home Assistant entities for individual maintenance tasks.", off: "Off", dueOnly: "Due only", basic: "Basic", full: "Full", dueNotifications: "Due notifications", warningNotifications: "Warnings", criticalNotifications: "Critical", dailyDigest: "Daily digest", digestTime: "Digest time", quietHours: "Quiet hours", quietFrom: "Quiet from", quietTo: "Quiet to", includeSnoozed: "Include snoozed", includeDashboardLink: "Include dashboard link", notifyDueTasks: "Send due tasks",
  dataSafety: "Data safety", exportData: "Export", importData: "Import", backupRestore: "Backup & Restore", downloadBackup: "Download backup", importJson: "Import JSON", importPaste: "Paste JSON here", restoreBackup: "Restore backup", copyDiagnostics: "Copy diagnostics", notifications: "Notifications", notifyService: "Notify service", testNotification: "Send test", sendDigest: "Send digest", templateCategory: "Template category", preview: "Preview", addTemplate: "Add template", recommended: "Recommended", seasonal: "Seasonal", spring: "Spring", summer: "Summer", autumn: "Autumn", winter: "Winter", scheduleMode: "Schedule", intervalSchedule: "Interval", oneTime: "One-time", fixedDate: "Fixed date", completionNote: "Completion note", markDone: "Save completion", noteOptional: "Optional note", actionExported: "Export created", actionImported: "Data imported", actionNotificationSent: "Notification sent", mobileMore: "More", completed: "Done"
});

Object.assign(I18N.de, {
  notificationRules: "Benachrichtigungsregeln", notificationRulesHint: "Statuswechsel, Wiederholungen, Eskalationen, Ruhezeiten und mobile Aktionsbuttons werden zentral verarbeitet.", entitySyncHint: "Entities werden ohne Neustart synchronisiert. Eine optionale Bereinigung entfernt verwaiste Registry-Einträge.", inheritGlobalRules: "Globale Regeln verwenden", taskNotificationsEnabled: "Benachrichtigungen für diese Aufgabe", notifyWarning: "Bei Warnung", notifyCritical: "Bei kritisch", notifyOverdue: "Bei überfällig", notifyUnavailable: "Bei nicht verfügbar", oncePerStatus: "Nur einmal pro Status", repeatEveryDays: "Wiederholen nach Tagen", escalation: "Eskalation", escalationAfterDays: "Eskalieren nach Tagen", actionableNotifications: "Aktionsbuttons", notificationPreview: "Vorschau", notificationHistory: "Benachrichtigungsverlauf", testMode: "Testmodus", groupDigestByCategory: "Digest nach Kategorien", overdueNotifications: "Überfällig", unavailableNotifications: "Nicht verfügbar", actionSnoozeDays: "Pause-Aktion (Tage)", entityGrouping: "Gerätezuordnung", entityGroupingDashboard: "Ein Dashboard-Gerät", entityGroupingCategory: "Pro Kategorie", entityGroupingNone: "Keine Gerätezuordnung", cleanupRemovedEntities: "Verwaiste Entities automatisch entfernen", cleanupEntitiesNow: "Entities bereinigen", processNotificationsNow: "Regeln jetzt prüfen", repeatNotifications: "Wiederholungen", notificationServiceOverride: "Eigener Notify-Service", notificationHistoryEmpty: "Noch keine Benachrichtigungen gesendet", notificationHistoryRetention: "Verlaufseinträge behalten", clearNotificationHistory: "Verlauf leeren", notificationHistoryCleared: "Benachrichtigungsverlauf geleert", notificationFailed: "Fehlgeschlagen", previewTask: "Aufgabe für Vorschau", lastSent: "Zuletzt gesendet", automatic: "Automatisch", manual: "Manuell"
});
Object.assign(I18N.en, {
  notificationRules: "Notification rules", notificationRulesHint: "Status changes, repeats, escalations, quiet hours and mobile action buttons are processed centrally.", entitySyncHint: "Entities are synchronized without a restart. Optional cleanup removes orphaned registry entries.", inheritGlobalRules: "Use global rules", taskNotificationsEnabled: "Notifications for this task", notifyWarning: "On warning", notifyCritical: "On critical", notifyOverdue: "On overdue", notifyUnavailable: "On unavailable", oncePerStatus: "Only once per status", repeatEveryDays: "Repeat after days", escalation: "Escalation", escalationAfterDays: "Escalate after days", actionableNotifications: "Action buttons", notificationPreview: "Preview", notificationHistory: "Notification history", testMode: "Test mode", groupDigestByCategory: "Group digest by category", overdueNotifications: "Overdue", unavailableNotifications: "Unavailable", actionSnoozeDays: "Snooze action days", entityGrouping: "Device grouping", entityGroupingDashboard: "Single dashboard device", entityGroupingCategory: "Per category", entityGroupingNone: "No device grouping", cleanupRemovedEntities: "Automatically remove orphaned entities", cleanupEntitiesNow: "Clean up entities", processNotificationsNow: "Evaluate rules now", repeatNotifications: "Repeats", notificationServiceOverride: "Custom notify service", notificationHistoryEmpty: "No notifications sent yet", notificationHistoryRetention: "Keep history entries", clearNotificationHistory: "Clear history", notificationHistoryCleared: "Notification history cleared", notificationFailed: "Failed", previewTask: "Task for preview", lastSent: "Last sent", automatic: "Automatic", manual: "Manual"
});

const TEMPLATE_CATEGORY_KEYS = ["all", "recommended", "popular", "heating", "ventilation", "water", "electrical", "safety", "solar", "garden", "building", "it_network", "household", "garage", "seasonal"];
const SCHEDULE_MODES = ["interval", "one_time", "fixed_date", "seasonal"];

const EMPTY = {
  name: "", type: "time", schedule_mode: "interval", calendar_repeat: "yearly", due_date: "",
  interval: "90", interval_unit: "days", entity_id: "", category: "general", custom_category: "",
  area_id: "", area_name: "", priority: "3", icon: "mdi:wrench-clock", icon_color: "", card_color: "",
  enabled: true, warning_threshold: "70", critical_threshold: "90", description: "", last_done: "",
  fixed_month: "9", fixed_day: "1", season: "autumn", tags: [],
  notifications_enabled: true, notifications_inherit: true, notifications_warning: true,
  notifications_critical: true, notifications_overdue: true, notifications_unavailable: false,
  notifications_once_per_status: true, notifications_repeat_days: "3",
  notifications_escalation_enabled: true, notifications_escalation_after_days: "3",
  notifications_actionable: true, notifications_notify_service: ""
};

Object.assign(I18N.de, {
  popular: "Beliebt", onboarding: "Schnellstart", starterPacks: "Starter-Pakete", skip: "Überspringen",
  startSetup: "Auswahl hinzufügen", showCompleted: "Erledigte anzeigen", hideCompleted: "Erledigte ausblenden",
  reactivate: "Reaktivieren", monthly: "Monatlich", yearly: "Jährlich", calendarRepeat: "Wiederholung",
  dueDate: "Fällig am", fixedDay: "Tag", fixedMonth: "Monat", completionMaterial: "Material / Ersatzteile",
  completionCost: "Kosten", completionCurrency: "Währung", performedBy: "Ausgeführt von",
  historyType: "Aktion", historyTask: "Aufgabe", historySearch: "Historie durchsuchen",
  allActions: "Alle Aktionen", allTasks: "Alle Aufgaben", noCompletionDetails: "Keine zusätzlichen Angaben",
  tags: "Tags", common: "Häufig genutzt", schedule: "Zeitplan", archived: "Archiviert",
  actionReactivated: "Einmalige Aufgabe reaktiviert", packAdded: "Starter-Paket hinzugefügt",

  appTitle: "Hauswartung & Technik", appSubtitle: "Backend-gespeicherte Wartungsplanung mit Historie, Backups und Sidebar-Panel.",
  basic: "Basis", area: "Bereich", ownCategory: "Eigene Kategorie", taskType: "Typ", appearance: "Darstellung",
  dashboardToolbarHint: "Neuen Eintrag anlegen, offene Aufgaben durchsuchen und die Liste nach Status oder Priorität eingrenzen.",
  onboardingTitle: "Wartungsplanung in wenigen Klicks starten", onboardingHint: "Wähle ein oder mehrere Starter-Pakete. Du kannst jeden Eintrag anschließend individuell anpassen oder später weitere Vorlagen ergänzen.",
  oneTimeArchiveHint: "Nach dem Erledigen wird die Aufgabe archiviert und kann später reaktiviert werden.",
  oneTimeCompletionHint: "Diese Aufgabe wird nach dem Speichern archiviert. Sie bleibt in Historie und erledigten Aufgaben erhalten.",
  customCategoryMissing: "Eigene Kategorie fehlt", dueDateMissing: "Fälligkeitsdatum fehlt", materialPlaceholder: "Filter, Klingen, Dichtung …",
  changes: "Änderungen", previousValue: "Vorher", newValue: "Nachher", noChanges: "Keine Feldänderungen gespeichert",
  created: "Erstellt", updated: "Aktualisiert", completedEvent: "Erledigt", deletedEvent: "Gelöscht", restoredEvent: "Wiederhergestellt", reactivatedEvent: "Reaktiviert", importedEvent: "Importiert", snoozedEvent: "Pausiert", snoozeClearedEvent: "Pause aufgehoben", undoCompletedEvent: "Erledigung rückgängig",
  fieldName: "Name", fieldSchedule: "Zeitplan", fieldDueDate: "Fällig am", fieldLastDone: "Zuletzt erledigt", fieldPriority: "Priorität", fieldCategory: "Kategorie", fieldDescription: "Beschreibung", fieldEnabled: "Aktiviert", fieldInterval: "Intervall", fieldSeason: "Saison", fieldCalendarRepeat: "Wiederholung"
});
Object.assign(I18N.en, {
  popular: "Popular", onboarding: "Quick start", starterPacks: "Starter packs", skip: "Skip",
  startSetup: "Add selection", showCompleted: "Show completed", hideCompleted: "Hide completed",
  reactivate: "Reactivate", monthly: "Monthly", yearly: "Yearly", calendarRepeat: "Repeat",
  dueDate: "Due date", fixedDay: "Day", fixedMonth: "Month", completionMaterial: "Material / parts",
  completionCost: "Cost", completionCurrency: "Currency", performedBy: "Performed by",
  historyType: "Action", historyTask: "Task", historySearch: "Search history",
  allActions: "All actions", allTasks: "All tasks", noCompletionDetails: "No additional details",
  tags: "Tags", common: "Common", schedule: "Schedule", archived: "Archived",
  actionReactivated: "One-time task reactivated", packAdded: "Starter pack added",

  appTitle: "Home Maintenance & Technology", appSubtitle: "Backend-managed maintenance planning with history, backups and a dedicated sidebar panel.",
  basic: "Basics", area: "Area", ownCategory: "Custom category", taskType: "Type", appearance: "Appearance",
  dashboardToolbarHint: "Create a task, search open maintenance items and narrow the list by status or priority.",
  onboardingTitle: "Start maintenance planning in a few clicks", onboardingHint: "Choose one or more starter packs. Every entry can be adjusted afterwards and more templates can be added later.",
  oneTimeArchiveHint: "After completion, the task is archived and can be reactivated later.",
  oneTimeCompletionHint: "This task will be archived after saving. It remains available in history and completed tasks.",
  customCategoryMissing: "Custom category is required", dueDateMissing: "Due date is required", materialPlaceholder: "Filter, blades, seal …",
  changes: "Changes", previousValue: "Before", newValue: "After", noChanges: "No field changes stored",
  created: "Created", updated: "Updated", completedEvent: "Completed", deletedEvent: "Deleted", restoredEvent: "Restored", reactivatedEvent: "Reactivated", importedEvent: "Imported", snoozedEvent: "Snoozed", snoozeClearedEvent: "Snooze cleared", undoCompletedEvent: "Completion undone",
  fieldName: "Name", fieldSchedule: "Schedule", fieldDueDate: "Due date", fieldLastDone: "Last done", fieldPriority: "Priority", fieldCategory: "Category", fieldDescription: "Description", fieldEnabled: "Enabled", fieldInterval: "Interval", fieldSeason: "Season", fieldCalendarRepeat: "Repeat"
});

Object.assign(I18N.de, {
  cardsView: "Karten", compactView: "Kompakt", tableView: "Tabelle", calendarView: "Kalender", timelineView: "Zeitachse",
  filters: "Filter", advancedFilters: "Erweiterte Filter", areaFilter: "Bereich", categoryFilter: "Kategorie",
  priorityFilter: "Priorität", scheduleFilter: "Planung", dueFilter: "Fälligkeit", tagFilter: "Tag",
  entityFilter: "Entity-Verfügbarkeit", hasEntity: "Mit Entity", withoutEntity: "Ohne Entity",
  today: "Heute", thisWeek: "Diese Woche", thisMonth: "Diesen Monat", later: "Später",
  savedFilters: "Gespeicherte Filter", saveFilter: "Filter speichern", filterName: "Filtername", deleteFilter: "Filter löschen",
  selectedTasksCount: "Aufgaben ausgewählt", bulkAction: "Mehrfachaktion", execute: "Ausführen", exportSelected: "Auswahl exportieren",
  bulkDone: "Erledigen", bulkSnooze: "Pausieren", bulkCategory: "Kategorie ändern", bulkArea: "Bereich ändern",
  bulkPriority: "Priorität ändern", bulkEnable: "Aktivieren", bulkDisable: "Deaktivieren", bulkDelete: "Löschen",
  dataIntegrity: "Datenintegrität", runIntegrityCheck: "Integrität prüfen", repairIntegrity: "Automatisch reparieren",
  integrityHealthy: "Datenbestand ist fehlerfrei", integrityErrors: "Fehler", integrityWarnings: "Warnungen",
  createBackup: "Backup erstellen", backupName: "Backup-Name", pinBackup: "Backup schützen", pinned: "Geschützt",
  compareBackup: "Vergleichen", selectiveRestore: "Selektiv wiederherstellen", restoreSections: "Wiederherstellungsbereiche",
  tasksSection: "Aufgaben", historySection: "Historie", settingsSection: "Einstellungen",
  notificationStateSection: "Benachrichtigungsstatus", quarantineSection: "Quarantäne", auditSection: "Audit-Log",
  importPreview: "Import prüfen", importMode: "Importmodus", replaceMode: "Ersetzen", mergeMode: "Zusammenführen",
  duplicateMode: "Duplikate", duplicateSkip: "Überspringen", duplicateOverwrite: "Überschreiben", duplicateNewId: "Neue IDs erzeugen",
  quarantine: "Quarantäne", restoreRecord: "Datensatz wiederherstellen", deleteRecord: "Datensatz löschen", exportRecord: "Datensatz exportieren",
  auditLog: "Audit-Log", backupRotation: "Backup-Rotation", maximumBackups: "Maximale Backups", maximumBackupAge: "Maximales Alter (Tage)",
  nativePlatforms: "Native Home-Assistant-Plattformen", todoPlatform: "To-do-Plattform", calendarPlatform: "Kalender-Plattform",
  dashboardLayout: "Dashboard-Ansicht", dashboardWidgets: "Dashboard-Widgets", saveDashboardSettings: "Dashboard-Einstellungen speichern",
  upcomingWeek: "Nächste 7 Tage", notificationStatus: "Benachrichtigungen", migration: "Migration", lastMigration: "Letzte Migration",
  lastAutomaticBackup: "Letztes automatisches Backup", pendingRepairs: "Offene Reparaturen", clearSelection: "Auswahl aufheben",
  noDueTasks: "Keine Aufgaben in diesem Zeitraum", monthPrevious: "Vorheriger Monat", monthNext: "Nächster Monat",
  actionBackupCreated: "Backup erstellt", actionBackupUpdated: "Backup aktualisiert", actionBackupDeleted: "Backup gelöscht",
  actionIntegrityRepaired: "Integrität repariert", actionBulkDone: "Mehrfachaktion ausgeführt", actionFilterSaved: "Filter gespeichert",
  actionFilterUpdated: "Filter aktualisiert", actionFilterDeleted: "Filter gelöscht", previewRequired: "Bitte den Import zuerst prüfen", confirmBulk: "Mehrfachaktion wirklich ausführen?",
  savePinnedFilter: "Angepinnt speichern", selectProblems: "Probleme auswählen", invertSelection: "Auswahl umkehren",
  bulkClearSnooze: "Pausen aufheben", bulkRestore: "Wiederherstellen", bulkDuplicate: "Duplizieren",
  dueToday: "Heute fällig", dueThisWeek: "Diese Woche fällig", dueThisMonth: "Diesen Monat fällig",
  highPriority: "Hohe Priorität", next14Days: "Nächste 14 Tage", next90Days: "Nächste 90 Tage", noDueDate: "Ohne Fälligkeit",
  dashboardDensity: "Dichte", densityComfortable: "Komfortabel", densityCompact: "Kompakt",
  defaultDueFilter: "Standard-Fälligkeitsfilter", showQuickFilters: "Quick-Filter anzeigen", rememberDashboardView: "Letzte Ansicht merken",
  sortName: "Name", sortArea: "Bereich", sortCreated: "Erstellt", sortUpdated: "Aktualisiert"
});
Object.assign(I18N.en, {
  cardsView: "Cards", compactView: "Compact", tableView: "Table", calendarView: "Calendar", timelineView: "Timeline",
  filters: "Filters", advancedFilters: "Advanced filters", areaFilter: "Area", categoryFilter: "Category",
  priorityFilter: "Priority", scheduleFilter: "Schedule", dueFilter: "Due", tagFilter: "Tag",
  entityFilter: "Entity availability", hasEntity: "With entity", withoutEntity: "Without entity",
  today: "Today", thisWeek: "This week", thisMonth: "This month", later: "Later",
  savedFilters: "Saved filters", saveFilter: "Save filter", filterName: "Filter name", deleteFilter: "Delete filter",
  selectedTasksCount: "tasks selected", bulkAction: "Bulk action", execute: "Execute", exportSelected: "Export selected",
  bulkDone: "Mark done", bulkSnooze: "Snooze", bulkCategory: "Change category", bulkArea: "Change area",
  bulkPriority: "Change priority", bulkEnable: "Enable", bulkDisable: "Disable", bulkDelete: "Delete",
  dataIntegrity: "Data integrity", runIntegrityCheck: "Check integrity", repairIntegrity: "Repair automatically",
  integrityHealthy: "Data is healthy", integrityErrors: "Errors", integrityWarnings: "Warnings",
  createBackup: "Create backup", backupName: "Backup name", pinBackup: "Pin backup", pinned: "Pinned",
  compareBackup: "Compare", selectiveRestore: "Selective restore", restoreSections: "Restore sections",
  tasksSection: "Tasks", historySection: "History", settingsSection: "Settings",
  notificationStateSection: "Notification state", quarantineSection: "Quarantine", auditSection: "Audit log",
  importPreview: "Preview import", importMode: "Import mode", replaceMode: "Replace", mergeMode: "Merge",
  duplicateMode: "Duplicates", duplicateSkip: "Skip", duplicateOverwrite: "Overwrite", duplicateNewId: "Generate new IDs",
  quarantine: "Quarantine", restoreRecord: "Restore record", deleteRecord: "Delete record", exportRecord: "Export record",
  auditLog: "Audit log", backupRotation: "Backup rotation", maximumBackups: "Maximum backups", maximumBackupAge: "Maximum age (days)",
  nativePlatforms: "Native Home Assistant platforms", todoPlatform: "To-do platform", calendarPlatform: "Calendar platform",
  dashboardLayout: "Dashboard view", dashboardWidgets: "Dashboard widgets", saveDashboardSettings: "Save dashboard settings",
  upcomingWeek: "Next 7 days", notificationStatus: "Notifications", migration: "Migration", lastMigration: "Last migration",
  lastAutomaticBackup: "Last automatic backup", pendingRepairs: "Pending repairs", clearSelection: "Clear selection",
  noDueTasks: "No tasks in this period", monthPrevious: "Previous month", monthNext: "Next month",
  actionBackupCreated: "Backup created", actionBackupUpdated: "Backup updated", actionBackupDeleted: "Backup deleted",
  actionIntegrityRepaired: "Integrity repaired", actionBulkDone: "Bulk action completed", actionFilterSaved: "Filter saved",
  actionFilterUpdated: "Filter updated", actionFilterDeleted: "Filter deleted", previewRequired: "Preview the import first", confirmBulk: "Run this bulk action?",
  savePinnedFilter: "Save pinned", selectProblems: "Select problems", invertSelection: "Invert selection",
  bulkClearSnooze: "Clear snoozes", bulkRestore: "Restore", bulkDuplicate: "Duplicate",
  dueToday: "Due today", dueThisWeek: "Due this week", dueThisMonth: "Due this month",
  highPriority: "High priority", next14Days: "Next 14 days", next90Days: "Next 90 days", noDueDate: "No due date",
  dashboardDensity: "Density", densityComfortable: "Comfortable", densityCompact: "Compact",
  defaultDueFilter: "Default due filter", showQuickFilters: "Show quick filters", rememberDashboardView: "Remember last view",
  sortName: "Name", sortArea: "Area", sortCreated: "Created", sortUpdated: "Updated"
});

Object.assign(I18N.de, {
  backupBeforeTaskUpdate: "Backup vor Task-Änderungen", backupBeforeTaskDelete: "Backup vor Task-Löschung",
  backupBeforeImport: "Backup vor Import", backupBeforeMigration: "Backup vor Migration",
  backupBeforeRestore: "Backup vor Wiederherstellung", backupBeforeBulk: "Backup vor Mehrfachaktionen",
  integrityCheckOnStart: "Beim Start prüfen", quarantineInvalidRecords: "Ungültige Datensätze quarantänisieren",
  auditRetention: "Audit-Retention", quarantineRetention: "Quarantäne-Retention",
  nativePlatformsHint: "Optional in nativen Home-Assistant-Karten und Automationen verwenden.",
  dataSafetyExportHint: "Aufgaben, Historie, Einstellungen, Benachrichtigungsstatus, Quarantäne, Audit und Backup-Metadaten.",
  matchingRecords: "Übereinstimmend", automaticLabel: "Automatisch", records: "Datensätze",
  taskLabel: "Aufgaben", historyLabel: "Historie", selectedTasks: "ausgewählte Aufgaben",
  availableRestoreTasks: "geänderte oder hinzugefügte Aufgaben verfügbar"
});
Object.assign(I18N.en, {
  backupBeforeTaskUpdate: "Backup before task updates", backupBeforeTaskDelete: "Backup before task deletion",
  backupBeforeImport: "Backup before import", backupBeforeMigration: "Backup before migration",
  backupBeforeRestore: "Backup before restore", backupBeforeBulk: "Backup before bulk actions",
  integrityCheckOnStart: "Check on startup", quarantineInvalidRecords: "Quarantine invalid records",
  auditRetention: "Audit retention", quarantineRetention: "Quarantine retention",
  nativePlatformsHint: "Optionally use tasks in native Home Assistant cards and automations.",
  dataSafetyExportHint: "Tasks, history, settings, notification state, quarantine, audit and backup metadata.",
  matchingRecords: "Matching", automaticLabel: "Automatic", records: "records",
  taskLabel: "tasks", historyLabel: "history", selectedTasks: "selected tasks",
  availableRestoreTasks: "changed or added tasks available"
});

Object.assign(I18N.de, {
  bulkPreview: "Vorschau der Mehrfachaktion", confirmBulkTitle: "Änderungen prüfen und bestätigen",
  safetyBackup: "Sicherheitsbackup", yes: "Ja", no: "Nein",
  auditSource: "Quelle", auditTask: "Aufgabe", auditChanges: "Änderungen", auditEmpty: "Noch keine Audit-Einträge vorhanden.",
  widgetOrderHint: "Widgets per Drag & Drop oder Pfeiltasten sortieren.", moveWidget: "Widget verschieben"
});
Object.assign(I18N.en, {
  bulkPreview: "Bulk action preview", confirmBulkTitle: "Review and confirm changes",
  safetyBackup: "Safety backup", yes: "Yes", no: "No",
  auditSource: "Source", auditTask: "Task", auditChanges: "Changes", auditEmpty: "No audit entries yet.",
  widgetOrderHint: "Reorder widgets using drag and drop or the arrow keys.", moveWidget: "Move widget"
});


// ---- frontend/src/types.ts ----
// Runtime data contracts for the backend-owned Maintenance Dashboard panel.
// JSDoc is used because the lightweight build concatenates browser-compatible
// source modules directly into the final Home Assistant panel bundle.

/**
 * @typedef {Object} MaintenanceTask
 * @property {string} id
 * @property {string} name
 * @property {"time"|"meter"} type
 * @property {"interval"|"one_time"|"fixed_date"|"seasonal"} schedule_mode
 * @property {"monthly"|"yearly"} [calendar_repeat]
 * @property {string|null} [due_date]
 * @property {number} interval
 * @property {"hours"|"days"|"weeks"|"months"} interval_unit
 * @property {number} [fixed_month]
 * @property {number} [fixed_day]
 * @property {"spring"|"summer"|"autumn"|"winter"|null} [season]
 * @property {string|null} [last_scheduled_due]
 * @property {string|null} [completed_at]
 * @property {string|null} [archived_at]
 * @property {number} priority
 * @property {string} category
 * @property {string[]} tags
 * @property {string|null} [template_id]
 * @property {string|null} [starter_pack]
 * @property {boolean} enabled
 * @property {string} [entity_key]
 * @property {Object} [notifications]
 */

/**
 * @typedef {Object} RuntimeState
 * @property {"ok"|"warning"|"critical"|"overdue"|"snoozed"|"unavailable"|"completed"|"disabled"|"deleted"} status
 * @property {number} progress
 * @property {number|null} remaining
 * @property {string|null} due_at
 * @property {string|null} period_start
 * @property {string|null} schedule_label
 */

/**
 * @typedef {Object} MaintenanceTemplate
 * @property {string} id
 * @property {string} name
 * @property {string} category
 * @property {number} interval
 * @property {number} priority
 * @property {string[]} tags
 * @property {boolean} [popular]
 * @property {boolean} [common]
 * @property {boolean} [recommended]
 */

/**
 * @typedef {Object} TemplatePack
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {string[]} template_ids
 */

/**
 * @typedef {Object} NotificationSettings
 * @property {boolean} enabled
 * @property {string} notify_service
 * @property {boolean} once_per_status
 * @property {number} repeat_days
 * @property {boolean} escalation_enabled
 * @property {number} escalation_after_days
 * @property {boolean} actionable
 * @property {boolean} test_mode
 */

/**
 * @typedef {Object} TaskEntitySettings
 * @property {"off"|"due_only"|"basic"|"full"} mode
 * @property {"none"|"dashboard"|"category"} device_grouping
 * @property {boolean} cleanup_removed
 */

const FRONTEND_CONTRACTS = Object.freeze({
  task: ["id", "name", "type", "schedule_mode", "interval", "interval_unit", "priority", "category", "enabled"],
  runtime: ["status", "progress", "remaining", "due_at"],
  template: ["id", "name", "category", "interval", "priority", "description", "tags"],
  templatePack: ["id", "name", "description", "template_ids"],
  backup: ["id", "created_at", "task_count", "history_count"],
  settings: ["notifications", "task_entities", "onboarding"],
  integrity: ["healthy", "errors", "warnings", "repairable", "issues"],
  quarantine: ["id", "reason", "detected_at", "original_data"],
  audit: ["id", "action", "created_at", "source"],
});

function hasContractFields(value, contract) {
  return Boolean(value && FRONTEND_CONTRACTS[contract]?.every((key) => Object.prototype.hasOwnProperty.call(value, key)));
}

/**
 * @typedef {Object} BackupMetadata
 * @property {string} id
 * @property {string} created_at
 * @property {string|null} [name]
 * @property {string} reason
 * @property {boolean} pinned
 * @property {boolean} automatic
 * @property {number} task_count
 * @property {number} history_count
 */

/**
 * @typedef {Object} IntegrityIssue
 * @property {"error"|"warning"} severity
 * @property {string} code
 * @property {boolean} repairable
 * @property {string} [task_id]
 */

/**
 * @typedef {Object} IntegrityReport
 * @property {boolean} healthy
 * @property {number} errors
 * @property {number} warnings
 * @property {number} repairable
 * @property {number} quarantined
 * @property {IntegrityIssue[]} issues
 */

/**
 * @typedef {Object} DashboardSettings
 * @property {"cards"|"compact"|"table"|"calendar"|"timeline"} view_mode
 * @property {string[]} widgets
 * @property {Array<{id:string,name:string,values:Object}>} saved_filters
 */


// ---- frontend/src/maintenance-dashboard-panel.ts ----
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
    this._nextTaskOffset = 0;
    this._toast = null;
    this._toastTimer = null;
    this._templateCategory = "all";
    this._templateSeason = "all";
    this._templateOnlyCommon = false;
    this._templatePreview = null;
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
    this._historySearch = "";
    this._historyType = "all";
    this._historyTask = "all";
    this._importPayload = "";
    this._notifyService = "";
    this._notificationPreview = null;
    this._notificationPreviewTask = "";
    this._layoutMode = "cards";
    this._density = "comfortable";
    this._layoutInitialized = false;
    this._selectedTasks = new Set();
    this._showAdvancedFilters = false;
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
    this._backupDiff = null;
    this._backupDiffId = null;
    this._restoreSections = new Set(["tasks", "history", "settings", "notification_state"]);
    this._restoreTaskIds = new Set();
    this._importMode = "replace";
    this._importDuplicateMode = "overwrite";
    this._importPreview = null;
    this._integrityResult = null;
    this._backupName = "";
    this._backupPinned = false;
    this._widgetOrder = [];
    this._widgetOrderInitialized = false;
    this._widgetDragId = null;
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
      if (!this._widgetOrderInitialized) {
        this._widgetOrder = [...(this._state?.settings?.dashboard?.widgets || [])];
        this._widgetOrderInitialized = true;
      }
      const onboarding = this._state?.settings?.onboarding || {};
      if (!this._onboardingDismissed && !onboarding.completed && !(this._state?.tasks || []).some(task => !task.deleted)) {
        this._onboardingDialog = true;
      }
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
    this.shadowRoot.innerHTML = `${this._styles()}<main class="shell density-${this._html(this._density)}">${this._hero()}${content}${this._dialogHtml()}${this._historyDialogHtml()}${this._diagnosticsHtml()}${this._dataDialogHtml()}${this._notificationDialogHtml()}${this._templatePreviewHtml()}${this._completionDialogHtml()}${this._bulkPreviewHtml()}${this._onboardingDialogHtml()}${this._toastHtml()}</main>`;
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


// ---- frontend/src/components/app-header.ts ----
// Header and navigation rendering.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _hero() {
    return `<section class="hero"><div class="hero-brand"><img src="${LOGO_URL}" alt="Maintenance Dashboard" class="hero-logo"><div><p class="eyebrow">Maintenance Dashboard</p><h1>${this._t("appTitle")}</h1><p>${this._t("appSubtitle")}</p></div></div><div class="hero-actions">${this._nav("dashboard", "mdi:view-dashboard", this._t("dashboard"))}${this._nav("templates", "mdi:shape-outline", this._t("templates"))}<button data-action="history-dialog" class="nav icon-nav" title="${this._t("openHistory")}"><ha-icon icon="mdi:history"></ha-icon><span class="sr-only">${this._t("history")}</span></button><button data-view="settings" class="nav icon-nav ${this._view === "settings" ? "active" : ""}" title="${this._t("settings")}"><ha-icon icon="mdi:cog"></ha-icon><span class="sr-only">${this._t("settings")}</span></button></div></section>`;
  },

  _nav(view, icon, label) { return `<button data-view="${view}" class="nav ${this._view === view ? "active" : ""}"><ha-icon icon="${icon}"></ha-icon>${label}</button>`; },

  _viewHtml() { if (this._view === "templates") return this._templatesHtml(); if (this._view === "settings") return this._settingsHtml(); return this._dashboardHtml(); }
});


// ---- frontend/src/views/dashboard-view.ts ----
// Dashboard view rendering, configurable KPI widgets, layouts, filters and bulk actions.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _dashboardHtml() {
    const tasks = this._filteredTasks(false);
    const savedFilters = this._state?.settings?.dashboard?.saved_filters || [];
    return `
      ${this._dashboardWidgetsHtml()}
      <section class="toolbar expressive dashboard-toolbar">
        <div class="toolbar-copy">
          <p class="eyebrow">${this._t("dashboard")}</p>
          <h2>${this._t("dashboard")}</h2>
          <p>${this._t("dashboardToolbarHint")}</p>
        </div>
        <div class="toolbar-main dashboard-main">
          <button data-action="create" class="primary big"><ha-icon icon="mdi:plus"></ha-icon>${this._t("add")}</button>
          <input id="search" class="search" placeholder="${this._t("search")}" value="${this._html(this._search)}">
          <label><span>${this._t("status")}</span><select id="statusFilter">${["all", "ok", "warning", "critical", "overdue", "snoozed", "unavailable", "completed"].map(x => `<option value="${x}" ${this._statusFilter === x ? "selected" : ""}>${this._t(x)}</option>`).join("")}</select></label>
          <label><span>${this._t("sort")}</span><select id="sortMode">${["smart", "position", "priority", "due", "status", "name", "area", "created", "updated"].map(x => `<option value="${x}" ${this._sortMode === x ? "selected" : ""}>${this._t(`sort${x[0].toUpperCase()}${x.slice(1)}`)}</option>`).join("")}</select></label>
          <button class="ghost" data-action="toggle-advanced-filters"><ha-icon icon="mdi:filter-variant"></ha-icon>${this._t("advancedFilters")}</button>
          <button class="ghost completed-toggle" data-action="toggle-completed"><ha-icon icon="mdi:archive-check-outline"></ha-icon>${this._showCompleted ? this._t("hideCompleted") : this._t("showCompleted")}</button>
        </div>
        <div class="layout-switch" role="group" aria-label="${this._t("dashboardLayout")}">
          ${this._layoutButton("cards", "mdi:view-grid-outline", "cardsView")}
          ${this._layoutButton("compact", "mdi:view-list-outline", "compactView")}
          ${this._layoutButton("table", "mdi:table", "tableView")}
          ${this._layoutButton("calendar", "mdi:calendar-month-outline", "calendarView")}
          ${this._layoutButton("timeline", "mdi:timeline-clock-outline", "timelineView")}
        </div>
      </section>
      ${this._state?.settings?.dashboard?.show_quick_filters !== false ? this._quickFiltersHtml() : ""}
      ${this._showAdvancedFilters ? this._advancedFiltersHtml(savedFilters) : ""}
      ${this._selectedTasks.size ? this._bulkToolbarHtml() : ""}
      ${tasks.length ? this._taskLayoutHtml(tasks) : this._emptyHtml()}
    `;
  },

  _dashboardWidgetsHtml() {
    const s = this._state?.summary || {};
    const notifications = this._state?.settings?.notifications || {};
    const widgets = [];
    if (this._dashboardWidgetEnabled("health")) widgets.push(this._kpi("mdi:heart-pulse", this._t("health"), `${s.health ?? 100}%`, this._t("healthHelp")));
    if (this._dashboardWidgetEnabled("open")) widgets.push(this._kpi("mdi:clipboard-list-outline", this._t("active"), s.open ?? s.active ?? 0, `${s.ok ?? 0} ${this._t("ok")}`));
    if (this._dashboardWidgetEnabled("critical")) widgets.push(this._kpi("mdi:alert-circle", this._t("critical"), s.critical ?? 0));
    if (this._dashboardWidgetEnabled("warning")) widgets.push(this._kpi("mdi:alert-outline", this._t("warnings"), s.warning ?? 0));
    if (this._dashboardWidgetEnabled("next")) widgets.push(this._nextKpi());
    if (this._dashboardWidgetEnabled("completed_this_year")) widgets.push(this._kpi("mdi:check-decagram", this._t("completedThisYear"), s.completed_this_year ?? 0));
    if (this._dashboardWidgetEnabled("upcoming_week")) widgets.push(this._kpi("mdi:calendar-week", this._t("upcomingWeek"), this._countDueWithinDays(7)));
    if (this._dashboardWidgetEnabled("due_today")) widgets.push(this._kpi("mdi:calendar-today", this._t("dueToday"), this._countDueByFilter("today")));
    if (this._dashboardWidgetEnabled("due_week")) widgets.push(this._kpi("mdi:calendar-week-begin", this._t("dueThisWeek"), this._countDueByFilter("week")));
    if (this._dashboardWidgetEnabled("due_month")) widgets.push(this._kpi("mdi:calendar-month", this._t("dueThisMonth"), this._countDueByFilter("month")));
    if (this._dashboardWidgetEnabled("paused")) widgets.push(this._kpi("mdi:pause-circle-outline", this._t("snoozed"), this._countByStatus("snoozed")));
    if (this._dashboardWidgetEnabled("high_priority")) widgets.push(this._kpi("mdi:flag-variant", this._t("highPriority"), this._countHighPriority()));
    if (this._dashboardWidgetEnabled("meter_tasks")) widgets.push(this._kpi("mdi:gauge", this._t("meter"), this._countByTaskType("meter")));
    if (this._dashboardWidgetEnabled("one_time")) widgets.push(this._kpi("mdi:calendar-check-outline", this._t("oneTime"), this._countBySchedule("one_time")));
    if (this._dashboardWidgetEnabled("notification_status")) widgets.push(this._kpi("mdi:bell-check-outline", this._t("notificationStatus"), notifications.enabled ? this._t("enabled") : this._t("off"), notifications.notify_service || "—"));
    if (this._dashboardWidgetEnabled("unavailable")) widgets.push(this._kpi("mdi:cloud-question", this._t("unavailable"), s.unavailable ?? 0, this._t("unavailableHelp")));
    return `<section class="kpis">${widgets.join("")}</section>`;
  },

  _quickFiltersHtml() {
    const chips = [
      ["status", "all", "mdi:format-list-bulleted", "all", (this._state?.tasks || []).filter(task => !task.deleted).length],
      ["status", "overdue", "mdi:alert-octagon-outline", "overdue", this._countByStatus("overdue")],
      ["status", "critical", "mdi:alert-circle", "critical", this._countByStatus("critical")],
      ["status", "warning", "mdi:alert-outline", "warning", this._countByStatus("warning")],
      ["due", "today", "mdi:calendar-today", "today", this._countDueByFilter("today")],
      ["due", "week", "mdi:calendar-week", "thisWeek", this._countDueByFilter("week")],
      ["priority", "5", "mdi:flag-variant", "highPriority", this._countHighPriority()],
      ["entity", "missing", "mdi:cloud-question", "withoutEntity", this._countMissingEntities()],
    ];
    return `<section class="quick-filter-strip">${chips.map(([kind, value, icon, label, count]) => {
      const active = (kind === "status" && this._statusFilter === value) || (kind === "due" && this._dueFilter === value) || (kind === "priority" && String(this._priorityFilter) === String(value)) || (kind === "entity" && this._entityFilter === value);
      return `<button class="${active ? "active" : ""}" data-quick-filter="${kind}:${value}"><ha-icon icon="${icon}"></ha-icon><span>${this._t(label)}</span><strong>${count}</strong></button>`;
    }).join("")}</section>`;
  },

  _countDueWithinDays(days) {
    const now = Date.now();
    const end = now + days * 86400000;
    return (this._state?.tasks || []).filter(task => {
      if (task.deleted || task.enabled === false) return false;
      const due = this._state?.runtime?.[task.id]?.due_at;
      const ts = due ? new Date(due).getTime() : Number.NaN;
      return Number.isFinite(ts) && ts >= now && ts <= end;
    }).length;
  },

  _layoutButton(mode, icon, labelKey) {
    return `<button class="icon ${this._layoutMode === mode ? "active" : ""}" data-layout="${mode}" title="${this._t(labelKey)}"><ha-icon icon="${icon}"></ha-icon><span>${this._t(labelKey)}</span></button>`;
  },

  _advancedFiltersHtml(savedFilters) {
    const areas = [...new Map((this._state?.tasks || []).filter(t => t.area_id || t.area_name).map(t => [t.area_id || t.area_name, t.area_name || t.area_id])).entries()];
    const tags = [...new Set((this._state?.tasks || []).flatMap(t => t.tags || []))].sort();
    return `<section class="panel advanced-filter-panel">
      <header class="section-title-actions"><div><h3>${this._t("advancedFilters")}</h3><p>${this._t("filters")}</p></div><button class="icon" data-action="reset-filters" title="${this._t("clear")}"><ha-icon icon="mdi:filter-remove-outline"></ha-icon></button></header>
      <div class="filter-grid">
        <label><span>${this._t("categoryFilter")}</span><select id="categoryFilter"><option value="all">${this._t("all")}</option>${CATEGORY_KEYS.map(key => `<option value="${key}" ${this._categoryFilter === key ? "selected" : ""}>${this._t(key)}</option>`).join("")}</select></label>
        <label><span>${this._t("areaFilter")}</span><select id="areaFilter"><option value="all">${this._t("all")}</option>${areas.map(([value, label]) => `<option value="${this._html(value)}" ${this._areaFilter === value ? "selected" : ""}>${this._html(label)}</option>`).join("")}</select></label>
        <label><span>${this._t("priorityFilter")}</span><select id="priorityFilter"><option value="all">${this._t("all")}</option>${[1,2,3,4,5].map(value => `<option value="${value}" ${String(this._priorityFilter) === String(value) ? "selected" : ""}>${value} · ${this._priorityLabel(value)}</option>`).join("")}</select></label>
        <label><span>${this._t("scheduleFilter")}</span><select id="scheduleFilter"><option value="all">${this._t("all")}</option>${SCHEDULE_MODES.map(value => `<option value="${value}" ${this._scheduleFilter === value ? "selected" : ""}>${this._scheduleModeLabel(value)}</option>`).join("")}</select></label>
        <label><span>${this._t("dueFilter")}</span><select id="dueFilter">${["all","overdue","today","week","next14","month","next90","later","no_due"].map(value => `<option value="${value}" ${this._dueFilter === value ? "selected" : ""}>${this._dueFilterLabel(value)}</option>`).join("")}</select></label>
        <label><span>${this._t("tagFilter")}</span><input id="tagFilter" list="maintenanceTagOptions" value="${this._html(this._tagFilter)}"><datalist id="maintenanceTagOptions">${tags.map(tag => `<option value="${this._html(tag)}"></option>`).join("")}</datalist></label>
        <label><span>${this._t("entityFilter")}</span><select id="entityFilter"><option value="all">${this._t("all")}</option><option value="available" ${this._entityFilter === "available" ? "selected" : ""}>${this._t("hasEntity")}</option><option value="missing" ${this._entityFilter === "missing" ? "selected" : ""}>${this._t("withoutEntity")}</option></select></label>
      </div>
      <div class="saved-filter-bar">
        <label class="grow"><span>${this._t("filterName")}</span><input id="savedFilterName" value="${this._html(this._savedFilterName)}"></label>
        <button class="ghost" data-action="save-filter"><ha-icon icon="mdi:content-save-outline"></ha-icon>${this._t("saveFilter")}</button>
        <button class="ghost" data-action="save-filter-pinned"><ha-icon icon="mdi:pin-outline"></ha-icon>${this._t("savePinnedFilter")}</button>
        ${savedFilters.length ? `<div class="saved-filter-list">${savedFilters.map(filter => `<span class="saved-filter-chip"><button data-apply-filter="${this._html(filter.id)}">${this._html(filter.name)}</button><button class="icon" data-delete-filter="${this._html(filter.id)}" title="${this._t("deleteFilter")}"><ha-icon icon="mdi:close"></ha-icon></button></span>`).join("")}</div>` : ""}
      </div>
    </section>`;
  },

  _bulkToolbarHtml() {
    const selected = this._selectedTaskList();
    return `<section class="panel bulk-toolbar">
      <strong>${selected.length} ${this._t("selectedTasksCount")}</strong>
      <label><span>${this._t("bulkAction")}</span><select id="bulkAction">${[
        ["done","bulkDone"],["snooze","bulkSnooze"],["clear_snooze","bulkClearSnooze"],["category","bulkCategory"],["area","bulkArea"],["priority","bulkPriority"],["enable","bulkEnable"],["disable","bulkDisable"],["delete","bulkDelete"],["restore","bulkRestore"],["duplicate","bulkDuplicate"]
      ].map(([value,key]) => `<option value="${value}" ${this._bulkAction === value ? "selected" : ""}>${this._t(key)}</option>`).join("")}</select></label>
      ${this._bulkValueInputHtml()}
      <button class="primary" data-action="execute-bulk"><ha-icon icon="mdi:playlist-check"></ha-icon>${this._t("execute")}</button>
      <button class="ghost" data-action="export-selected"><ha-icon icon="mdi:download-multiple"></ha-icon>${this._t("exportSelected")}</button>
      <button class="ghost" data-action="select-problem-tasks"><ha-icon icon="mdi:alert-plus-outline"></ha-icon>${this._t("selectProblems")}</button>
      <button class="ghost" data-action="invert-task-selection"><ha-icon icon="mdi:select-inverse"></ha-icon>${this._t("invertSelection")}</button>
      <button class="ghost" data-action="clear-task-selection"><ha-icon icon="mdi:selection-remove"></ha-icon>${this._t("clearSelection")}</button>
    </section>`;
  },

  _bulkValueInputHtml() {
    if (this._bulkAction === "snooze") return `<label><span>${this._t("days")}</span><input id="bulkValue" type="number" min="1" max="365" value="${this._html(this._bulkValue || "7")}"></label>`;
    if (this._bulkAction === "priority") return `<label><span>${this._t("priority")}</span><select id="bulkValue">${[1,2,3,4,5].map(v => `<option value="${v}" ${String(this._bulkValue || 3) === String(v) ? "selected" : ""}>${v} · ${this._priorityLabel(v)}</option>`).join("")}</select></label>`;
    if (this._bulkAction === "category") return `<label><span>${this._t("category")}</span><select id="bulkValue">${CATEGORY_KEYS.map(key => `<option value="${key}" ${this._bulkValue === key ? "selected" : ""}>${this._t(key)}</option>`).join("")}</select></label>`;
    if (this._bulkAction === "area") return `<label><span>${this._t("area")}</span><input id="bulkValue" value="${this._html(this._bulkValue)}"></label>`;
    return "";
  },

  _taskLayoutHtml(tasks) {
    if (this._layoutMode === "compact") return this._compactTasksHtml(tasks);
    if (this._layoutMode === "table") return this._tableTasksHtml(tasks);
    if (this._layoutMode === "calendar") return this._calendarTasksHtml(tasks);
    if (this._layoutMode === "timeline") return this._timelineTasksHtml(tasks);
    return `<section class="task-grid">${tasks.map(t => this._taskCard(t)).join("")}</section>`;
  },

  _compactTasksHtml(tasks) {
    return `<section class="compact-task-list">${tasks.map(task => {
      const runtime = this._state?.runtime?.[task.id] || {};
      return `<article class="compact-task-row ${runtime.status || "unavailable"}" data-task-card="${this._html(task.id)}">
        <label class="task-select"><input type="checkbox" data-select-task="${task.id}" ${this._selectedTasks.has(task.id) ? "checked" : ""}><span></span></label>
        <span class="icon-chip"><ha-icon icon="${this._html(task.icon || "mdi:wrench-clock")}"></ha-icon></span>
        <div class="grow"><strong>${this._html(task.name)}</strong><small>${this._categoryLabel(task)} · ${this._scheduleSummary(task)}</small></div>
        <span>${this._date(runtime.due_at)}</span><span class="status ${runtime.status || "unavailable"}">${this._t(runtime.status || "unavailable")}</span>
        <button class="icon" data-edit="${task.id}"><ha-icon icon="mdi:pencil"></ha-icon></button><button class="primary small" data-done="${task.id}"><ha-icon icon="mdi:check"></ha-icon></button>
      </article>`;
    }).join("")}</section>`;
  },

  _tableTasksHtml(tasks) {
    return `<section class="task-table-wrap"><table class="task-table"><thead><tr><th><input type="checkbox" data-action="select-visible-tasks" ${tasks.every(t => this._selectedTasks.has(t.id)) ? "checked" : ""}></th><th>${this._t("name")}</th><th>${this._t("category")}</th><th>${this._t("status")}</th><th>${this._t("due")}</th><th>${this._t("priority")}</th><th>${this._t("schedule")}</th><th></th></tr></thead><tbody>${tasks.map(task => {
      const runtime = this._state?.runtime?.[task.id] || {};
      return `<tr class="${runtime.status || "unavailable"}"><td><input type="checkbox" data-select-task="${task.id}" ${this._selectedTasks.has(task.id) ? "checked" : ""}></td><td><strong>${this._html(task.name)}</strong>${task.area_name ? `<small>${this._html(task.area_name)}</small>` : ""}</td><td>${this._categoryLabel(task)}</td><td><span class="status ${runtime.status || "unavailable"}">${this._t(runtime.status || "unavailable")}</span></td><td>${this._date(runtime.due_at)}</td><td>${task.priority}/5</td><td>${this._scheduleSummary(task)}</td><td><button class="icon" data-edit="${task.id}"><ha-icon icon="mdi:pencil"></ha-icon></button><button class="icon" data-done="${task.id}"><ha-icon icon="mdi:check"></ha-icon></button></td></tr>`;
    }).join("")}</tbody></table></section>`;
  },

  _calendarTasksHtml(tasks) {
    const groups = new Map();
    for (const task of tasks) {
      const dueAt = this._state?.runtime?.[task.id]?.due_at;
      const key = dueAt ? new Date(dueAt).toISOString().slice(0, 10) : "none";
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(task);
    }
    const keys = [...groups.keys()].sort((a,b) => a === "none" ? 1 : b === "none" ? -1 : a.localeCompare(b));
    return `<section class="calendar-task-view">${keys.map(key => `<article class="calendar-day"><header><strong>${key === "none" ? this._t("noDueTasks") : this._date(`${key}T12:00:00`)}</strong><span>${groups.get(key).length}</span></header>${groups.get(key).map(task => { const runtime = this._state?.runtime?.[task.id] || {}; return `<button class="calendar-task ${runtime.status || "unavailable"}" data-edit="${task.id}"><ha-icon icon="${this._html(task.icon || "mdi:wrench-clock")}"></ha-icon><span>${this._html(task.name)}</span><small>${this._categoryLabel(task)}</small></button>`; }).join("")}</article>`).join("")}</section>`;
  },

  _timelineTasksHtml(tasks) {
    const sorted = [...tasks].sort((a,b) => this._dueValue(this._state?.runtime?.[a.id]) - this._dueValue(this._state?.runtime?.[b.id]));
    return `<section class="timeline-view">${sorted.map(task => { const runtime = this._state?.runtime?.[task.id] || {}; return `<article class="timeline-entry ${runtime.status || "unavailable"}"><div class="timeline-marker"></div><div class="timeline-date">${this._date(runtime.due_at)}</div><div class="timeline-card"><header><strong>${this._html(task.name)}</strong><span class="status ${runtime.status || "unavailable"}">${this._t(runtime.status || "unavailable")}</span></header><p>${this._categoryLabel(task)} · ${this._scheduleSummary(task)}</p><div class="button-row"><button class="ghost" data-edit="${task.id}"><ha-icon icon="mdi:pencil"></ha-icon>${this._t("edit")}</button>${runtime.status !== "completed" ? `<button class="primary" data-done="${task.id}"><ha-icon icon="mdi:check"></ha-icon>${this._t("done")}</button>` : ""}</div></div></article>`; }).join("")}</section>`;
  },

  _kpi(icon, label, value, sub = "", extraClass = "") {
    return `<article class="kpi ${this._html(extraClass)}" title="${this._html(sub)}"><ha-icon icon="${icon}"></ha-icon><div><small>${this._html(label)}</small><strong>${this._html(value)}</strong>${sub ? `<span>${this._html(sub)}</span>` : ""}</div></article>`;
  },

  _nextKpi() {
    const candidates = this._nextTaskCandidates();
    if (!candidates.length) return this._kpi("mdi:calendar-clock", this._t("next"), "—");
    if (this._nextTaskOffset >= candidates.length) this._nextTaskOffset = 0;
    const candidate = candidates[this._nextTaskOffset] || candidates[0];
    const task = candidate.task;
    const runtime = candidate.runtime;
    const name = this._shortTaskName(task.name || "—");
    const sub = runtime.remaining != null ? `${Math.ceil(Math.abs(runtime.remaining))} ${this._t("days")} ${runtime.remaining < 0 ? this._t("overdue") : this._t("remaining")}` : this._t("focusNextTask");
    const status = runtime.status || "ok";
    return `<article class="kpi next-kpi ${status}" data-focus-task="${this._html(task.id)}" title="${this._t("nextTaskHint")}">
      <ha-icon icon="mdi:calendar-clock"></ha-icon>
      <div class="next-kpi-body"><small>${this._t("next")}</small><strong>${this._html(name)}</strong><span>${this._html(sub)} · ${this._t("priority")} ${task.priority || 3}/5</span></div>
      ${candidates.length > 1 ? `<div class="next-cycle" title="${this._t("taskCounter")}"><button data-action="prev-next-task" title="${this._t("previousTask")}"><ha-icon icon="mdi:chevron-left"></ha-icon></button><span>${this._nextTaskOffset + 1}/${candidates.length}</span><button data-action="next-next-task" title="${this._t("nextTask")}"><ha-icon icon="mdi:chevron-right"></ha-icon></button></div>` : ""}
    </article>`;
  },

  _nextTaskCandidates() {
    const tasks = (this._state?.tasks || []).filter(task => !task.deleted && task.enabled !== false);
    return tasks.map(task => ({ task, runtime: this._state?.runtime?.[task.id] || {} }))
      .filter(item => !["snoozed", "disabled", "deleted", "completed"].includes(item.runtime.status) && item.runtime.remaining != null)
      .sort((a, b) => (STATUS_ORDER[a.runtime.status] ?? 99) - (STATUS_ORDER[b.runtime.status] ?? 99)
        || (b.task.priority ?? 0) - (a.task.priority ?? 0)
        || this._dueValue(a.runtime) - this._dueValue(b.runtime)
        || (a.task.position ?? 0) - (b.task.position ?? 0));
  },

  _shortTaskName(name) {
    const clean = String(name || "—").trim();
    return clean.length <= 24 ? clean : `${clean.slice(0, 23)}…`;
  },

  _emptyHtml() {
    return `<section class="empty expressive-empty"><div class="empty-orb"><ha-icon icon="mdi:clipboard-plus-outline"></ha-icon></div><h2>${this._t("noTasks")}</h2><p>${this._t("materialEmpty")}</p><div class="empty-actions"><button class="primary big" data-action="create"><ha-icon icon="mdi:plus"></ha-icon>${this._t("addFirst")}</button><button class="ghost big" data-view="templates"><ha-icon icon="mdi:shape-plus-outline"></ha-icon>${this._t("templates")}</button></div></section>`;
  }
});

Object.assign(MaintenanceDashboardPanel.prototype, {
  _bulkPreviewHtml() {
    const preview = this._bulkPreview;
    if (!preview) return "";
    return `<div class="dialog-backdrop"><section class="dialog bulk-preview-dialog"><header><div><p class="eyebrow">${this._t("bulkPreview")}</p><h2>${this._t("confirmBulkTitle")}</h2></div><button class="icon" data-action="close-bulk-preview"><ha-icon icon="mdi:close"></ha-icon></button></header><div class="dialog-body">
      <section class="dialog-section"><div class="diff-summary"><div><strong>${preview.affected || 0}</strong><span>${this._t("selectedTasksCount")}</span></div><div><strong>${this._bulkActionLabel(preview.action)}</strong><span>${this._t("bulkAction")}</span></div><div><strong>${preview.backup_will_be_created ? this._t("yes") : this._t("no")}</strong><span>${this._t("safetyBackup")}</span></div></div>
      <div class="change-list">${(preview.tasks || []).map(task => `<article><strong>${this._html(task.name || task.id)}</strong>${(task.changes || []).map(change => `<div class="field-diff"><span>${this._html(change.field)}</span><code>${this._html(JSON.stringify(change.before))}</code><ha-icon icon="mdi:arrow-right"></ha-icon><code>${this._html(JSON.stringify(change.after))}</code></div>`).join("")}</article>`).join("")}</div></section>
    </div><footer><button class="ghost" data-action="close-bulk-preview">${this._t("cancel")}</button><button class="primary" data-action="confirm-bulk"><ha-icon icon="mdi:playlist-check"></ha-icon>${this._t("execute")}</button></footer></section></div>`;
  }
});


// ---- frontend/src/components/task-card.ts ----
// Task card rendering.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _taskCard(task) {
    const r = this._state.runtime[task.id] || {};
    const status = r.status || "unavailable";
    const completed = status === "completed";
    const progress = completed ? 100 : Math.min(100, Math.max(0, r.progress || 0));
    const accent = this._statusAccent(status, task.card_color || task.icon_color || "var(--primary-color)");
    const snoozed = status === "snoozed";
    const options = this._snoozeOptions(task);
    return `<article class="task-card ${status}" data-task-card="${this._html(task.id)}" style="--task-accent:${this._html(accent)}">
      <header>
        <label class="task-select" title="${this._t("selectedTasksCount")}"><input type="checkbox" data-select-task="${task.id}" ${this._selectedTasks.has(task.id) ? "checked" : ""}><span></span></label>
        <div class="title-row"><span class="icon-chip" style="${task.icon_color ? `color:${this._html(task.icon_color)}` : ""}"><ha-icon icon="${this._html(task.icon || "mdi:wrench-clock")}"></ha-icon></span><div><h3>${this._html(task.name)}</h3><p>${this._categoryLabel(task)}${task.area_name ? ` · ${this._html(task.area_name)}` : ""}</p></div></div>
        <span class="status ${status}">${completed ? this._t("archived") : this._t(status)}</span>
      </header>
      ${task.description ? `<p class="description">${this._html(task.description)}</p>` : ""}
      ${task.tags?.length ? `<div class="tag-strip">${task.tags.slice(0, 6).map(tag => `<button data-quick-tag="${this._html(tag)}">#${this._html(tag)}</button>`).join("")}</div>` : ""}
      <div class="schedule-chip"><ha-icon icon="${task.schedule_mode === "one_time" ? "mdi:calendar-check-outline" : task.schedule_mode === "seasonal" ? "mdi:weather-partly-cloudy" : task.schedule_mode === "fixed_date" ? "mdi:calendar-sync-outline" : "mdi:repeat"}"></ha-icon><span>${this._scheduleSummary(task)}</span></div>
      <div class="progress-line"><span>${this._t("progress")}</span><strong>${Math.round(progress)}%</strong></div>
      <div class="progress"><div style="width:${progress}%"></div></div>
      <div class="meta-grid">
        <div><span>${this._t("lastDone")}</span><strong>${this._date(r.last_done)}</strong></div>
        <div><span>${completed ? this._t("archived") : this._t("due")}</span><strong>${completed ? this._date(task.completed_at) : this._date(r.due_at)}</strong></div>
        <div><span>${this._t("remaining")}</span><strong>${completed ? "—" : this._remaining(r, task)}</strong></div>
        <div><span>${this._t("priority")}</span><strong>${this._priorityLabel(task.priority)}<em>${task.priority}/5</em></strong></div>
      </div>
      ${snoozed ? `<div class="snooze-note"><ha-icon icon="mdi:pause-circle-outline"></ha-icon>${this._t("pausedUntil")} ${this._datetime(task.snoozed_until)}</div>` : ""}
      <footer class="actions">
        <button class="ghost icon-only" title="${this._t("edit")}" data-edit="${task.id}"><ha-icon icon="mdi:pencil"></ha-icon></button>
        ${completed ? `<button class="primary" data-reactivate="${task.id}"><ha-icon icon="mdi:restore"></ha-icon>${this._t("reactivate")}</button>` : `<div class="snooze-wrap"><button class="ghost icon-only" title="${this._t("snooze")}" data-snooze-menu="${task.id}"><ha-icon icon="mdi:clock-plus-outline"></ha-icon></button>${this._snoozeMenu === task.id ? `<div class="snooze-menu"><strong>${this._t("snoozeFor")}</strong>${options.map(days => `<button data-snooze-days="${task.id}:${days}">${days} ${this._t("days")}</button>`).join("")}</div>` : ""}</div>${snoozed ? `<button class="ghost" data-clear-snooze="${task.id}"><ha-icon icon="mdi:play-circle-outline"></ha-icon>${this._t("clearSnooze")}</button>` : ""}<button class="primary" data-done="${task.id}"><ha-icon icon="mdi:check"></ha-icon>${this._t("done")}</button>`}
      </footer>
    </article>`;
  }
});


// ---- frontend/src/views/templates-view.ts ----
// Categorized template library view rendering with starter packs and metadata filters.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _templatesHtml() {
    const templates = this._filteredTemplates();
    const selected = templates.filter(t => this._selectedTemplates.has(t.id));
    const grouped = templates.reduce((acc, template) => {
      const key = template.category || "general";
      (acc[key] ||= []).push(template);
      return acc;
    }, {});
    const order = CATEGORY_KEYS.filter(key => grouped[key]?.length);
    const groupsHtml = order.map(key => `
      <section class="template-group">
        <div class="template-group-header"><div><p class="eyebrow">${this._t("category")}</p><h3>${this._t(key)}</h3></div><span>${grouped[key].length}</span></div>
        <div class="template-grid compact">${grouped[key].map(t => this._templateCard(t)).join("")}</div>
      </section>
    `).join("");
    const packs = this._state?.template_packs || [];
    return `<section class="toolbar expressive templates-toolbar"><div class="toolbar-copy"><p class="eyebrow">${this._t("templates")}</p><h2>${this._t("templates")}</h2><p>${this._t("templateSelectHint")}</p></div><div class="toolbar-main templates-main"><input id="search" class="search" placeholder="${this._t("search")}" value="${this._html(this._search)}"><button class="ghost" data-action="select-visible"><ha-icon icon="mdi:checkbox-multiple-marked-outline"></ha-icon>${this._t("selectAllVisible")}</button><button class="ghost" data-action="clear-template-selection"><ha-icon icon="mdi:checkbox-blank-off-outline"></ha-icon>${this._t("deselectAll")}</button><button class="primary big" data-action="add-selected" ${selected.length ? "" : "disabled"}><ha-icon icon="mdi:plus-box-multiple-outline"></ha-icon>${this._t("addSelected")} · ${selected.length}</button></div></section>
      <section class="template-filter-bar"><div class="category-tabs" aria-label="${this._t("templateCategory")}">${TEMPLATE_CATEGORY_KEYS.map(k => `<button class="tab ${this._templateCategory === k ? "active" : ""}" data-template-category="${k}">${this._t(k)}</button>`).join("")}</div><div class="template-secondary-filters"><label><span>${this._t("seasonal")}</span><select id="templateSeason"><option value="all">${this._t("all")}</option>${["spring","summer","autumn","winter"].map(x => `<option value="${x}" ${this._templateSeason === x ? "selected" : ""}>${this._t(x)}</option>`).join("")}</select></label><label class="check compact-check"><input id="templateCommon" type="checkbox" ${this._templateOnlyCommon ? "checked" : ""}>${this._t("common")}</label></div></section>
      ${packs.length ? `<section class="starter-packs"><div class="section-title"><div><p class="eyebrow">${this._t("onboarding")}</p><h2>${this._t("starterPacks")}</h2></div></div><div class="pack-strip">${packs.map(pack => `<article class="pack-mini"><ha-icon icon="${this._html(pack.icon || "mdi:package-variant")}"></ha-icon><div><strong>${this._html(pack.name)}</strong><p>${this._html(pack.description || "")}</p><small>${(pack.template_ids || []).length} ${this._t("templates")}</small></div><button class="ghost" data-add-pack="${this._html(pack.id)}"><ha-icon icon="mdi:plus"></ha-icon>${this._t("add")}</button></article>`).join("")}</div></section>` : ""}
      ${templates.length ? groupsHtml : this._emptyMessage("mdi:shape-outline", this._t("noTemplatesMatch"))}`;
  },

  _filteredTemplates() {
    return (this._state.templates || []).filter(template => {
      if (this._templateCategory === "recommended" && !(template.recommended || Number(template.priority || 0) >= 4)) return false;
      if (this._templateCategory === "popular" && !template.popular) return false;
      if (this._templateCategory === "seasonal" && !template.season) return false;
      if (!["all", "recommended", "popular", "seasonal"].includes(this._templateCategory) && template.category !== this._templateCategory) return false;
      if (this._templateSeason !== "all" && template.season !== this._templateSeason) return false;
      if (this._templateOnlyCommon && !template.common) return false;
      return this._matches(template);
    });
  }
});


// ---- frontend/src/components/template-card.ts ----
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
    return `<article class="template-card compact ${checked ? "selected" : ""} ${exists ? "exists" : ""}" data-template-preview="${this._html(t.id)}"><header><label class="template-check" onclick="event.stopPropagation()"><input type="checkbox" data-template-check="${t.id}" ${checked ? "checked" : ""}><span></span></label><ha-icon icon="${this._html(t.icon)}"></ha-icon><div class="template-title"><h3>${this._html(t.name)}</h3><div class="template-badges">${badges}</div></div></header><small>${this._categoryLabel(t)} · ${this._scheduleSummary(t)} · ${this._t("priority")} ${t.priority}/5</small>${Array.isArray(t.tags) && t.tags.length ? `<div class="tag-list">${t.tags.slice(0,4).map(tag => `<span>${this._html(tag)}</span>`).join("")}</div>` : ""}<footer><button class="ghost" data-template-preview-btn="${t.id}"><ha-icon icon="mdi:eye-outline"></ha-icon>${this._t("preview")}</button><button class="ghost" data-template="${t.id}" ${exists ? "disabled" : ""}><ha-icon icon="mdi:plus"></ha-icon>${exists ? this._t("ok") : this._t("add")}</button></footer></article>`;
  }
});


// ---- frontend/src/views/settings-view.ts ----
// Settings view rendering for dashboard, recovery, native HA platforms and task ordering.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _settingsHtml() {
    const tasks = this._filteredTasks(true).sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
    const settings = this._state?.settings || {};
    const dashboard = settings.dashboard || {};
    const backups = settings.backups || {};
    const integrity = settings.data_integrity || {};
    const native = settings.native_platforms || {};
    const widgets = dashboard.widgets || [];
    const widgetOptions = [
      ["health", "health"], ["open", "active"], ["critical", "critical"], ["warning", "warnings"],
      ["next", "next"], ["completed_this_year", "completedThisYear"], ["upcoming_week", "upcomingWeek"],
      ["due_today", "dueToday"], ["due_week", "dueThisWeek"], ["due_month", "dueThisMonth"],
      ["paused", "snoozed"], ["high_priority", "highPriority"], ["meter_tasks", "meter"], ["one_time", "oneTime"],
      ["notification_status", "notificationStatus"], ["unavailable", "unavailable"],
    ];
    const widgetLabels = new Map(widgetOptions);
    const widgetOrder = [...new Set([...(this._widgetOrder || []), ...widgetOptions.map(([value]) => value)])]
      .filter(value => widgetLabels.has(value));
    this._widgetOrder = widgetOrder;
    return `
      <section class="panel settings-head"><div><h2>${this._t("settings")}</h2><p>${this._t("settingsIntro")}</p></div><div class="settings-actions">
        <button class="ghost" data-action="open-onboarding"><ha-icon icon="mdi:rocket-launch-outline"></ha-icon>${this._t("onboarding")}</button>
        <button class="ghost" data-action="data-dialog"><ha-icon icon="mdi:database-cog-outline"></ha-icon>${this._t("dataSafety")}</button>
        <button class="ghost" data-action="notification-dialog"><ha-icon icon="mdi:bell-outline"></ha-icon>${this._t("notifications")}</button>
        <button class="ghost" data-action="diagnostics"><ha-icon icon="mdi:alert-circle-outline"></ha-icon>${this._t("diagnostics")}</button>
      </div></section>

      <section class="settings-grid">
        <article class="panel settings-section">
          <header><ha-icon icon="mdi:view-dashboard-edit-outline"></ha-icon><div><h3>${this._t("dashboardLayout")}</h3><p>${this._t("dashboardWidgets")}</p></div></header>
          <div class="form-grid">
            <label class="field"><span>${this._t("dashboardLayout")}</span><select id="dashboardViewMode">${["cards","compact","table","calendar","timeline"].map(mode => `<option value="${mode}" ${(dashboard.view_mode || "cards") === mode ? "selected" : ""}>${this._t(`${mode}View`)}</option>`).join("")}</select></label>
            <label class="field"><span>${this._t("dashboardDensity")}</span><select id="dashboardDensity"><option value="comfortable" ${(dashboard.density || "comfortable") !== "compact" ? "selected" : ""}>${this._t("densityComfortable")}</option><option value="compact" ${dashboard.density === "compact" ? "selected" : ""}>${this._t("densityCompact")}</option></select></label>
            <label class="field"><span>${this._t("defaultDueFilter")}</span><select id="dashboardDefaultDue">${["all","overdue","today","week","next14","month","next90","later","no_due"].map(value => `<option value="${value}" ${(dashboard.default_due_filter || "all") === value ? "selected" : ""}>${this._dueFilterLabel(value)}</option>`).join("")}</select></label>
          </div>
          <div class="check-grid">
            <label class="check"><input id="dashboardQuickFilters" type="checkbox" ${dashboard.show_quick_filters !== false ? "checked" : ""}>${this._t("showQuickFilters")}</label>
            <label class="check"><input id="dashboardRememberView" type="checkbox" ${dashboard.remember_last_view !== false ? "checked" : ""}>${this._t("rememberDashboardView")}</label>
          </div>
          <p class="section-hint">${this._t("widgetOrderHint")}</p>
          <div class="widget-order-list">${widgetOrder.map((value, index) => `<article draggable="true" data-widget-drag="${value}" data-widget-drop="${value}"><button class="icon drag" type="button" data-widget-keyboard="${value}" aria-label="${this._t("moveWidget")}"><ha-icon icon="mdi:drag"></ha-icon></button><label class="check grow"><input type="checkbox" data-dashboard-widget="${value}" ${widgets.includes(value) ? "checked" : ""}>${this._t(widgetLabels.get(value))}</label><button class="icon" type="button" data-widget-move="${value}:up" ${index === 0 ? "disabled" : ""}><ha-icon icon="mdi:chevron-up"></ha-icon></button><button class="icon" type="button" data-widget-move="${value}:down" ${index === widgetOrder.length - 1 ? "disabled" : ""}><ha-icon icon="mdi:chevron-down"></ha-icon></button></article>`).join("")}</div>
        </article>

        <article class="panel settings-section">
          <header><ha-icon icon="mdi:backup-restore"></ha-icon><div><h3>${this._t("backupRotation")}</h3><p>${this._t("dataSafety")}</p></div></header>
          <div class="form-grid">
            <label class="field"><span>${this._t("maximumBackups")}</span><input id="maximumBackups" type="number" min="1" max="500" value="${Number(backups.maximum_count || 30)}"></label>
            <label class="field"><span>${this._t("maximumBackupAge")}</span><input id="maximumBackupAge" type="number" min="1" max="3650" value="${Number(backups.maximum_age_days || 90)}"></label>
          </div>
          <div class="check-grid">
            ${[
              ["beforeTaskUpdate","before_task_update",this._t("backupBeforeTaskUpdate")],
              ["beforeTaskDelete","before_task_delete",this._t("backupBeforeTaskDelete")],
              ["beforeImport","before_import",this._t("backupBeforeImport")],
              ["beforeMigration","before_migration",this._t("backupBeforeMigration")],
              ["beforeRestore","before_restore",this._t("backupBeforeRestore")],
              ["beforeBulk","before_bulk_operation",this._t("backupBeforeBulk")],
            ].map(([id,key,label]) => `<label class="check"><input id="${id}" type="checkbox" ${backups[key] !== false ? "checked" : ""}>${label}</label>`).join("")}
          </div>
        </article>

        <article class="panel settings-section">
          <header><ha-icon icon="mdi:shield-check-outline"></ha-icon><div><h3>${this._t("dataIntegrity")}</h3><p>${this._t("integrityHealthy")}</p></div></header>
          <div class="check-grid">
            <label class="check"><input id="checkIntegrityOnStart" type="checkbox" ${integrity.check_on_start !== false ? "checked" : ""}>${this._t("integrityCheckOnStart")}</label>
            <label class="check"><input id="quarantineInvalidRecords" type="checkbox" ${integrity.quarantine_invalid_records !== false ? "checked" : ""}>${this._t("quarantineInvalidRecords")}</label>
          </div>
          <div class="form-grid">
            <label class="field"><span>${this._t("auditRetention")}</span><input id="auditRetention" type="number" min="100" max="10000" value="${Number(integrity.audit_retention || 1000)}"></label>
            <label class="field"><span>${this._t("quarantineRetention")}</span><input id="quarantineRetention" type="number" min="20" max="5000" value="${Number(integrity.quarantine_retention || 200)}"></label>
          </div>
        </article>

        <article class="panel settings-section">
          <header><ha-icon icon="mdi:home-assistant"></ha-icon><div><h3>${this._t("nativePlatforms")}</h3><p>${this._t("nativePlatformsHint")}</p></div></header>
          <div class="check-grid">
            <label class="check"><input id="todoPlatformEnabled" type="checkbox" ${native.todo_enabled !== false ? "checked" : ""}>${this._t("todoPlatform")}</label>
            <label class="check"><input id="calendarPlatformEnabled" type="checkbox" ${native.calendar_enabled !== false ? "checked" : ""}>${this._t("calendarPlatform")}</label>
          </div>
        </article>
      </section>

      <section class="panel settings-save"><button class="primary big" data-action="save-general-settings"><ha-icon icon="mdi:content-save"></ha-icon>${this._t("saveDashboardSettings")}</button></section>
      <section class="panel ordering-help"><p>${this._t("dragHint")}</p>${this._lastOrder ? `<button class="ghost" data-action="undo-reorder"><ha-icon icon="mdi:undo"></ha-icon>${this._t("undo")}</button>` : ""}</section>
      <section class="settings-list">${tasks.map((t, idx) => `<article class="settings-row" draggable="true" data-drag="${t.id}" data-drop="${t.id}"><button class="drag icon" type="button" data-keyboard-reorder="${t.id}" aria-label="${this._t("dragHint")}"><ha-icon icon="mdi:drag"></ha-icon></button><ha-icon icon="${this._html(t.icon)}"></ha-icon><div><strong>${this._html(t.name)}</strong><small>${this._categoryLabel(t)} · ${this._scheduleSummary(t)} · ${this._t("priority")} ${t.priority}/5</small></div><button class="icon" data-move="${t.id}:up" ${idx === 0 ? "disabled" : ""}><ha-icon icon="mdi:chevron-up"></ha-icon></button><button class="icon" data-move="${t.id}:down" ${idx === tasks.length - 1 ? "disabled" : ""}><ha-icon icon="mdi:chevron-down"></ha-icon></button><button class="icon" data-edit="${t.id}"><ha-icon icon="mdi:pencil"></ha-icon></button><button class="icon danger" data-delete="${t.id}"><ha-icon icon="mdi:delete-outline"></ha-icon></button></article>`).join("")}</section>
    `;
  }
});


// ---- frontend/src/dialogs/history-dialog.ts ----
// History modal rendering with filters, completion metadata and before/after changes.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _historyHtml() {
    const events = this._filteredHistory();
    const taskOptions = [...new Map((this._state.history || []).filter(event => event.task_id).map(event => [event.task_id, event.task_name || event.task_id])).entries()];
    const types = [...new Set((this._state.history || []).map(event => event.type).filter(Boolean))].sort();
    const rows = events.slice(0, 120).map(event => {
      const completion = event.details?.completion || event.details || {};
      const completionBits = [
        completion.note ? `<span><ha-icon icon="mdi:note-text-outline"></ha-icon>${this._html(completion.note)}</span>` : "",
        completion.material ? `<span><ha-icon icon="mdi:package-variant-closed"></ha-icon>${this._html(completion.material)}</span>` : "",
        completion.cost != null ? `<span><ha-icon icon="mdi:cash"></ha-icon>${this._html(completion.cost)} ${this._html(completion.currency || "EUR")}</span>` : "",
        completion.performed_by ? `<span><ha-icon icon="mdi:account-wrench-outline"></ha-icon>${this._html(completion.performed_by)}</span>` : "",
      ].filter(Boolean).join("");
      const changes = this._historyChanges(event);
      return `<article class="history-row"><ha-icon icon="${event.type === "completed" ? "mdi:check-circle-outline" : event.type === "reactivated" ? "mdi:restore" : "mdi:history"}"></ha-icon><div class="history-content"><div class="history-title"><strong>${this._html(event.task_name || event.task_id || "Global")}</strong><span class="history-event-type">${this._historyEventLabel(event.type)}</span></div><p>${this._html(event.summary)} · ${this._datetime(event.created_at)}</p>${event.details?.runtime_before ? `<small>${this._runtimeSummary(event.details.runtime_before)}</small>` : ""}${completionBits ? `<div class="completion-details">${completionBits}</div>` : ""}${changes}</div>${event.type === "completed" && !event.undone_at ? `<button class="ghost" data-undo="${event.id}">${this._t("undo")}</button>` : ""}</article>`;
    }).join("");
    return `<section class="panel history-panel"><div class="history-toolbar"><input id="historySearch" class="search" placeholder="${this._t("historySearch")}" value="${this._html(this._historySearch)}"><label><span>${this._t("historyType")}</span><select id="historyType"><option value="all">${this._t("allActions")}</option>${types.map(type => `<option value="${type}" ${this._historyType === type ? "selected" : ""}>${this._historyEventLabel(type)}</option>`).join("")}</select></label><label><span>${this._t("historyTask")}</span><select id="historyTask"><option value="all">${this._t("allTasks")}</option>${taskOptions.map(([id, name]) => `<option value="${this._html(id)}" ${this._historyTask === id ? "selected" : ""}>${this._html(name)}</option>`).join("")}</select></label></div><div class="history-list">${rows || `<p>${this._t("noHistory")}</p>`}</div></section>`;
  },

  _historyEventLabel(type) {
    return {
      created: this._t("created"),
      updated: this._t("updated"),
      completed: this._t("completedEvent"),
      deleted: this._t("deletedEvent"),
      restored: this._t("restoredEvent"),
      reactivated: this._t("reactivatedEvent"),
      imported: this._t("importedEvent"),
      snoozed: this._t("snoozedEvent"),
      snooze_cleared: this._t("snoozeClearedEvent"),
      undo_completed: this._t("undoCompletedEvent"),
    }[type] || this._html(type || "—");
  },

  _historyChanges(event) {
    const previous = event.previous_state;
    const next = event.new_state;
    if (!previous || !next) return "";
    const fields = [
      ["name", "fieldName"], ["description", "fieldDescription"], ["category", "fieldCategory"],
      ["priority", "fieldPriority"], ["enabled", "fieldEnabled"], ["schedule_mode", "fieldSchedule"],
      ["calendar_repeat", "fieldCalendarRepeat"], ["interval", "fieldInterval"], ["interval_unit", "intervalUnit"],
      ["due_date", "fieldDueDate"], ["last_done", "fieldLastDone"], ["season", "fieldSeason"],
    ];
    const changes = fields.filter(([key]) => JSON.stringify(previous[key] ?? null) !== JSON.stringify(next[key] ?? null));
    if (!changes.length) return "";
    const rows = changes.map(([key, label]) => `<div class="history-change-row"><strong>${this._t(label)}</strong><span>${this._historyValue(key, previous[key])}</span><ha-icon icon="mdi:arrow-right"></ha-icon><span>${this._historyValue(key, next[key])}</span></div>`).join("");
    return `<details class="history-changes"><summary><ha-icon icon="mdi:compare-horizontal"></ha-icon>${this._t("changes")} · ${changes.length}</summary><div class="history-change-head"><span></span><strong>${this._t("previousValue")}</strong><span></span><strong>${this._t("newValue")}</strong></div>${rows}</details>`;
  },

  _historyValue(key, value) {
    if (value == null || value === "") return "—";
    if (["due_date", "last_done"].includes(key)) return this._html(this._datetime(value));
    if (key === "enabled") return value ? "✓" : "—";
    if (key === "priority") return `${this._html(this._priorityLabel(value))} (${this._html(value)}/5)`;
    if (key === "schedule_mode") return this._html(this._scheduleModeLabel(value));
    if (key === "calendar_repeat" || key === "season" || key === "interval_unit") return this._html(this._t(String(value)));
    if (Array.isArray(value)) return this._html(value.join(", "));
    if (typeof value === "object") return this._html(JSON.stringify(value));
    return this._html(value);
  },

  _filteredHistory() {
    const query = String(this._historySearch || "").trim().toLowerCase();
    return (this._state.history || []).filter(event => {
      if (this._historyType !== "all" && event.type !== this._historyType) return false;
      if (this._historyTask !== "all" && event.task_id !== this._historyTask) return false;
      if (!query) return true;
      const completion = event.details?.completion || event.details || {};
      return [event.task_name, event.task_id, event.summary, completion.note, completion.material, completion.performed_by]
        .filter(Boolean).join(" ").toLowerCase().includes(query);
    });
  },

  _historyDialogHtml() {
    if (!this._historyDialog) return "";
    return `<div class="dialog-backdrop"><section class="dialog history-dialog"><header><h2>${this._t("history")}</h2><button class="icon" data-action="close-history"><ha-icon icon="mdi:close"></ha-icon></button></header><div class="dialog-body">${this._historyHtml()}</div></section></div>`;
  }
});


// ---- frontend/src/dialogs/task-editor-dialog.ts ----
// Task editor dialog rendering.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _dialogHtml() {
    if (!this._dialog) return "";
    const d = this._draft;
    const areas = this._areas();
    const scheduleFields = this._scheduleFieldsHtml(d);
    return `<div class="dialog-backdrop"><section class="dialog"><header><h2>${this._dialog === "edit" ? this._t("edit") : this._t("add")}</h2><button class="icon" data-action="close"><ha-icon icon="mdi:close"></ha-icon></button></header><div class="dialog-body">
      ${this._dialog === "create" ? `<section class="dialog-section"><h3>${this._t("selectTemplate")}</h3><div class="template-strip">${(this._state.templates || []).filter(t => t.recommended || t.popular).slice(0, 12).map(t => `<button class="template-pill" data-apply-template="${t.id}"><ha-icon icon="${this._html(t.icon)}"></ha-icon>${this._html(t.name)}</button>`).join("")}</div></section>` : ""}
      <section class="dialog-section"><h3>${this._t("basic")}</h3><div class="form-grid">${this._input("name", this._t("name"), "text")}<label class="field"><span>${this._t("category")}</span><select data-draft="category">${CATEGORY_KEYS.map(k => `<option value="${k}" ${d.category === k ? "selected" : ""}>${this._t(k)}</option>`).join("")}</select></label>${d.category === "custom" ? this._input("custom_category", this._t("ownCategory"), "text") : ""}<label class="field"><span>${this._t("area")}</span><select data-draft="area_id"><option value="">—</option>${areas.map(a => `<option value="${a.area_id}" ${d.area_id === a.area_id ? "selected" : ""}>${this._html(a.name)}</option>`).join("")}</select></label></div><label class="entity-field"><span>${this._t("entity")}</span><ha-entity-picker id="entityPicker" allow-custom-entity></ha-entity-picker></label><label class="description-field"><span>${this._t("description")}</span><textarea data-draft="description">${this._html(d.description)}</textarea></label><label class="field"><span>${this._t("tags")}</span><input data-draft="tags" type="text" value="${this._html(Array.isArray(d.tags) ? d.tags.join(", ") : d.tags || "")}" placeholder="filter, sicherheit, saisonal"></label><section class="inline-priority"><div class="priority-head"><div><h4>${this._t("priority")}</h4><p class="section-hint">${this._t("priorityHint")}</p></div><strong>${this._priorityLabel(d.priority)} (${d.priority}/5)</strong></div><input class="priority-slider" data-draft="priority" type="range" min="1" max="5" step="1" value="${this._html(d.priority || 3)}"><div class="priority-scale">${[1,2,3,4,5].map(p => `<span class="${Number(d.priority || 3) === p ? "active" : ""}">${this._priorityLabel(p)}</span>`).join("")}</div></section></section>
      <section class="dialog-section"><h3>${this._t("schedule")}</h3><div class="form-grid"><label class="field"><span>${this._t("taskType")}</span><select data-draft="type"><option value="time" ${d.type === "time" ? "selected" : ""}>${this._t("time")}</option><option value="meter" ${d.type === "meter" ? "selected" : ""}>${this._t("meter")}</option></select></label><label class="field"><span>${this._t("scheduleMode")}</span><select data-draft="schedule_mode">${(d.type === "meter" ? ["interval"] : SCHEDULE_MODES).map(m => `<option value="${m}" ${d.schedule_mode === m ? "selected" : ""}>${this._scheduleModeLabel(m)}</option>`).join("")}</select></label></div>${scheduleFields}<div class="form-grid">${this._input("warning_threshold", this._t("warning"), "number")}${this._input("critical_threshold", this._t("critical"), "number")}</div></section>
      <section class="dialog-section"><h3>${this._t("appearance")}</h3><p class="section-hint">${this._t("appearanceHint")}</p><div class="appearance-grid"><label class="field icon-picker-field appearance-icon-field"><span>${this._t("icon")}</span><div id="iconHost"></div></label><label class="field color-field"><span>${this._t("iconColor")}</span><div class="color-input-row"><input id="iconColorInput" data-draft="icon_color" type="color" value="${this._html(d.icon_color || "#a855f7")}"><button class="ghost small" data-action="random-icon-color" type="button" title="${this._t("randomColors")}">↻</button></div></label><label class="field color-field"><span>${this._t("cardColor")}</span><div class="color-input-row"><input id="cardColorInput" data-draft="card_color" type="color" value="${this._html(d.card_color || "#6b5a00")}"><button class="ghost small" data-action="random-card-color" type="button" title="${this._t("randomColors")}">↻</button></div></label></div><div class="color-actions"><button class="ghost" data-action="random-colors" type="button"><ha-icon icon="mdi:palette-swatch-outline"></ha-icon>${this._t("randomColors")}</button><button class="ghost" data-action="clear-colors" type="button"><ha-icon icon="mdi:close-circle-outline"></ha-icon>${this._t("clearColors")}</button></div><label class="check"><input data-draft="enabled" type="checkbox" ${d.enabled ? "checked" : ""}>${this._t("enabled")}</label></section>
      ${this._taskNotificationFieldsHtml(d)}
      ${this._error ? `<div class="error">${this._html(this._error)}</div>` : ""}
    </div><footer><button class="ghost" data-action="close">${this._t("cancel")}</button><button class="primary" data-action="save" ${this._busy ? "disabled" : ""}>${this._t("save")}</button></footer></section></div>`;
  },

  _scheduleFieldsHtml(d) {
    if (d.type === "meter") {
      return `<div class="form-grid">${this._input("interval", this._t("interval"), "number")}<label class="field"><span>${this._t("intervalUnit")}</span><select data-draft="interval_unit">${["hours","days","weeks","months"].map(u => `<option value="${u}" ${d.interval_unit === u ? "selected" : ""}>${this._t(u)}</option>`).join("")}</select></label>${this._input("last_done", this._t("lastDone"), "datetime-local")}</div>`;
    }
    if (d.schedule_mode === "one_time") {
      return `<div class="schedule-callout"><ha-icon icon="mdi:calendar-check-outline"></ha-icon><div><strong>${this._t("oneTime")}</strong><p>${this._t("oneTimeArchiveHint")}</p></div></div><div class="form-grid">${this._input("due_date", this._t("dueDate"), "datetime-local")}</div>`;
    }
    if (d.schedule_mode === "fixed_date") {
      return `<div class="form-grid"><label class="field"><span>${this._t("calendarRepeat")}</span><select data-draft="calendar_repeat"><option value="monthly" ${d.calendar_repeat === "monthly" ? "selected" : ""}>${this._t("monthly")}</option><option value="yearly" ${d.calendar_repeat !== "monthly" ? "selected" : ""}>${this._t("yearly")}</option></select></label>${d.calendar_repeat === "monthly" ? "" : this._input("fixed_month", this._t("fixedMonth"), "number")}${this._input("fixed_day", this._t("fixedDay"), "number")}${this._input("last_done", this._t("lastDone"), "datetime-local")}</div>`;
    }
    if (d.schedule_mode === "seasonal") {
      return `<div class="form-grid"><label class="field"><span>${this._t("seasonal")}</span><select data-draft="season">${["spring","summer","autumn","winter"].map(x => `<option value="${x}" ${d.season === x ? "selected" : ""}>${this._t(x)}</option>`).join("")}</select></label>${this._input("fixed_day", this._t("fixedDay"), "number")}${this._input("last_done", this._t("lastDone"), "datetime-local")}</div>`;
    }
    return `<div class="form-grid">${this._input("interval", this._t("interval"), "number")}<label class="field"><span>${this._t("intervalUnit")}</span><select data-draft="interval_unit">${["days", "hours", "weeks", "months"].map(u => `<option value="${u}" ${d.interval_unit === u ? "selected" : ""}>${this._t(u)}</option>`).join("")}</select></label>${this._input("last_done", this._t("lastDone"), "datetime-local")}</div>`;
  },

  _taskNotificationFieldsHtml(d) {
    const disabled = d.notifications_inherit ? "disabled" : "";
    return `<details class="dialog-section advanced-section"><summary><span><ha-icon icon="mdi:bell-cog-outline"></ha-icon>${this._t("notificationRules")}</span><small>${d.notifications_inherit ? this._t("inheritGlobalRules") : this._t("taskNotificationsEnabled")}</small></summary><div class="advanced-body"><label class="check"><input data-draft="notifications_enabled" type="checkbox" ${d.notifications_enabled ? "checked" : ""}>${this._t("taskNotificationsEnabled")}</label><label class="check"><input data-draft="notifications_inherit" type="checkbox" ${d.notifications_inherit ? "checked" : ""}>${this._t("inheritGlobalRules")}</label><div class="toggle-grid"><label class="check"><input data-draft="notifications_warning" type="checkbox" ${d.notifications_warning ? "checked" : ""} ${disabled}>${this._t("notifyWarning")}</label><label class="check"><input data-draft="notifications_critical" type="checkbox" ${d.notifications_critical ? "checked" : ""} ${disabled}>${this._t("notifyCritical")}</label><label class="check"><input data-draft="notifications_overdue" type="checkbox" ${d.notifications_overdue ? "checked" : ""} ${disabled}>${this._t("notifyOverdue")}</label><label class="check"><input data-draft="notifications_unavailable" type="checkbox" ${d.notifications_unavailable ? "checked" : ""} ${disabled}>${this._t("notifyUnavailable")}</label><label class="check"><input data-draft="notifications_once_per_status" type="checkbox" ${d.notifications_once_per_status ? "checked" : ""} ${disabled}>${this._t("oncePerStatus")}</label><label class="check"><input data-draft="notifications_escalation_enabled" type="checkbox" ${d.notifications_escalation_enabled ? "checked" : ""} ${disabled}>${this._t("escalation")}</label><label class="check"><input data-draft="notifications_actionable" type="checkbox" ${d.notifications_actionable ? "checked" : ""} ${disabled}>${this._t("actionableNotifications")}</label></div><div class="form-grid"><label class="field"><span>${this._t("repeatEveryDays")}</span><input data-draft="notifications_repeat_days" type="number" min="0" max="365" value="${this._html(d.notifications_repeat_days || "3")}" ${disabled}></label><label class="field"><span>${this._t("escalationAfterDays")}</span><input data-draft="notifications_escalation_after_days" type="number" min="0" max="365" value="${this._html(d.notifications_escalation_after_days || "3")}" ${disabled}></label><label class="field"><span>${this._t("notificationServiceOverride")}</span><input data-draft="notifications_notify_service" value="${this._html(d.notifications_notify_service || "")}" placeholder="notify.mobile_app_phone" ${disabled}></label></div></div></details>`;
  },

  _input(key, label, type) { return `<label class="field"><span>${label}</span><input data-draft="${key}" type="${type}" value="${this._html(this._draft[key] || "")}"></label>`; },

  _mountIconPicker(host) {
    if (customElements.get("ha-icon-picker")) {
      const picker = document.createElement("ha-icon-picker");
      picker.hass = this.hass; picker.value = this._draft.icon;
      picker.addEventListener("value-changed", e => { this._draft.icon = String(e.detail?.value || "mdi:wrench-clock"); });
      host.appendChild(picker);
    } else {
      host.innerHTML = `<input data-draft="icon" value="${this._html(this._draft.icon)}"><div class="icon-grid">${ICONS.map(i => `<button class="icon-choice" data-icon-choice="${i}"><ha-icon icon="${i}"></ha-icon></button>`).join("")}</div>`;
      host.querySelector("input").addEventListener("input", e => this._draft.icon = e.target.value);
      host.querySelectorAll("[data-icon-choice]").forEach(btn => btn.addEventListener("click", () => { this._draft.icon = btn.dataset.iconChoice; this._render(); }));
    }
  }
});


// ---- frontend/src/dialogs/diagnostics-dialog.ts ----
// Extended diagnostics and structured integrity report.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _diagnosticsHtml() {
    if (!this._diagnostics) return "";
    const diag = this._state?.diagnostics || [];
    const integrity = this._integrityResult || this._state?.integrity || {};
    const notificationState = this._state?.notification_state || {};
    const notificationHistory = Array.isArray(notificationState.history) ? notificationState.history : [];
    const notificationSettings = this._state?.settings?.notifications || {};
    const entitySettings = this._state?.settings?.task_entities || {};
    const meta = this._state?.meta || {};
    const lastDigest = notificationState?.last_sent?.digest;
    const lastDigestAt = typeof lastDigest === "object" ? lastDigest?.at : lastDigest;
    const payload = {
      integration_version: VERSION,
      frontend_version: VERSION,
      schema_version: this._state?.schema_version,
      task_count: (this._state?.tasks || []).length,
      history_count: (this._state?.history || []).length,
      backup_count: (this._state?.backups || []).length,
      quarantine_count: (this._state?.quarantine || []).length,
      audit_count: (this._state?.audit || []).length,
      summary: this._state?.summary,
      diagnostics: diag,
      integrity,
      settings: this._state?.settings,
      meta,
      notification_state: notificationState,
      loaded_at: new Date().toISOString(),
    };
    return `<div class="dialog-backdrop"><section class="dialog wide diagnostics-dialog"><header><div><p class="eyebrow">Maintenance Dashboard</p><h2>${this._t("diagnostics")}</h2></div><button class="icon" data-action="close-diagnostics"><ha-icon icon="mdi:close"></ha-icon></button></header><div class="dialog-body">
      <section class="dialog-section"><div class="diagnostic-grid">
        <div><span>Integration</span><strong>${VERSION}</strong></div><div><span>Frontend</span><strong>${VERSION}</strong></div><div><span>Schema</span><strong>${this._state?.schema_version ?? "—"}</strong></div>
        <div><span>Tasks</span><strong>${payload.task_count}</strong></div><div><span>History</span><strong>${payload.history_count}</strong></div><div><span>Backups</span><strong>${payload.backup_count}</strong></div>
        <div><span>${this._t("quarantine")}</span><strong>${payload.quarantine_count}</strong></div><div><span>${this._t("auditLog")}</span><strong>${payload.audit_count}</strong></div><div><span>Notification history</span><strong>${notificationHistory.length}</strong></div>
        <div><span>Last digest</span><strong>${lastDigestAt ? this._datetime(lastDigestAt) : "—"}</strong></div><div><span>${this._t("lastAutomaticBackup")}</span><strong>${meta.last_automatic_backup?.created_at ? this._datetime(meta.last_automatic_backup.created_at) : "—"}</strong></div><div><span>${this._t("pendingRepairs")}</span><strong>${integrity.errors || 0}</strong></div>
        <div><span>Task entities</span><strong>${this._html(entitySettings.mode || "off")}</strong></div><div><span>Notifications</span><strong>${notificationSettings.enabled ? "enabled" : "off"}</strong></div><div><span>Test mode</span><strong>${notificationSettings.test_mode ? "enabled" : "off"}</strong></div>
      </div></section>
      <section class="dialog-section integrity-summary ${integrity.healthy ? "healthy" : "has-errors"}"><div class="section-title-actions"><div><h3>${this._t("dataIntegrity")}</h3><p>${integrity.healthy ? this._t("integrityHealthy") : `${integrity.errors || 0} ${this._t("integrityErrors")} · ${integrity.warnings || 0} ${this._t("integrityWarnings")}`}</p></div><div class="button-row"><button class="ghost" data-action="check-integrity"><ha-icon icon="mdi:shield-search-outline"></ha-icon>${this._t("runIntegrityCheck")}</button><button class="primary" data-action="repair-integrity" ${integrity.repairable ? "" : "disabled"}><ha-icon icon="mdi:shield-sync-outline"></ha-icon>${this._t("repairIntegrity")}</button></div></div>
        ${(integrity.issues || []).map(issue => `<p class="${this._html(issue.severity || "warning")}"><strong>${this._html(issue.code || issue.message)}</strong>${issue.task_id ? ` · ${this._html(issue.task_id)}` : ""}</p>`).join("") || `<p>${this._t("ok")}</p>`}
      </section>
      <section class="dialog-section"><h3>${this._t("migration")}</h3>${meta.last_migration ? `<pre>${this._html(JSON.stringify(meta.last_migration, null, 2))}</pre>` : `<p>—</p>`}</section>
      <section class="dialog-section"><h3>${this._t("diagnostics")}</h3>${diag.length ? diag.map(i => `<p class="${this._html(i.severity || "warning")}">${this._html(i.task_id || "global")}: ${this._html(i.message)}</p>`).join("") : `<p>${this._t("ok")}</p>`}</section>
      <section class="dialog-section"><div class="button-row"><button class="ghost" data-copy-diagnostics="${this._html(JSON.stringify(payload))}"><ha-icon icon="mdi:content-copy"></ha-icon>${this._t("copyDiagnostics")}</button><button class="ghost" data-action="data-dialog"><ha-icon icon="mdi:database-cog-outline"></ha-icon>${this._t("dataSafety")}</button></div></section>
    </div></section></div>`;
  }
});


// ---- frontend/src/dialogs/template-preview-dialog.ts ----
// Template preview dialog rendering.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _templatePreviewHtml() {
    if (!this._templatePreview) return "";
    const t = this._template(this._templatePreview);
    if (!t) return "";
    return `<div class="dialog-backdrop"><section class="dialog small"><header><h2>${this._t("preview")}</h2><button class="icon" data-action="close-template-preview"><ha-icon icon="mdi:close"></ha-icon></button></header><div class="dialog-body"><section class="dialog-section template-preview"><div class="template-preview-heading"><ha-icon icon="${this._html(t.icon)}"></ha-icon><div><h3>${this._html(t.name)}</h3><p>${this._html(t.description || "")}</p></div></div><div class="meta-grid"><div><span>${this._t("category")}</span><strong>${this._categoryLabel(t)}</strong></div><div><span>${this._t("schedule")}</span><strong>${this._scheduleSummary(t)}</strong></div><div><span>${this._t("priority")}</span><strong>${this._priorityLabel(t.priority)} ${t.priority}/5</strong></div><div><span>${this._t("scheduleMode")}</span><strong>${this._scheduleModeLabel(t.schedule_mode || "interval")}</strong></div></div>${Array.isArray(t.tags) && t.tags.length ? `<div class="preview-tags"><span>${this._t("tags")}</span><div class="tag-list">${t.tags.map(tag => `<span>${this._html(tag)}</span>`).join("")}</div></div>` : ""}</section></div><footer><button class="ghost" data-action="close-template-preview">${this._t("cancel")}</button><button class="primary" data-template="${this._html(t.id)}"><ha-icon icon="mdi:plus"></ha-icon>${this._t("addTemplate")}</button></footer></section></div>`;
  }
});


// ---- frontend/src/dialogs/completion-dialog.ts ----
// Completion details dialog rendering.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _completionDialogHtml() {
    if (!this._completionDialog) return "";
    const task = (this._state?.tasks || []).find(t => t.id === this._completionDialog);
    return `<div class="dialog-backdrop"><section class="dialog small"><header><h2>${this._t("done")}</h2><button class="icon" data-action="close-completion"><ha-icon icon="mdi:close"></ha-icon></button></header><div class="dialog-body"><section class="dialog-section"><div class="completion-heading"><ha-icon icon="${this._html(task?.icon || "mdi:wrench-clock")}"></ha-icon><div><h3>${this._html(task?.name || "")}</h3><p>${this._scheduleModeLabel(task?.schedule_mode || "interval")}</p></div></div><label class="description-field"><span>${this._t("completionNote")}</span><textarea id="completionNote" placeholder="${this._t("noteOptional")}">${this._html(this._completionNote)}</textarea></label><div class="form-grid"><label class="field"><span>${this._t("completionMaterial")}</span><input id="completionMaterial" value="${this._html(this._completionMaterial)}" placeholder="${this._t("materialPlaceholder")}"></label><label class="field"><span>${this._t("performedBy")}</span><input id="completionPerformedBy" value="${this._html(this._completionPerformedBy)}"></label><label class="field"><span>${this._t("completionCost")}</span><input id="completionCost" type="number" min="0" step="0.01" value="${this._html(this._completionCost)}"></label><label class="field"><span>${this._t("completionCurrency")}</span><select id="completionCurrency">${["EUR","USD","GBP","CHF"].map(currency => `<option value="${currency}" ${this._completionCurrency === currency ? "selected" : ""}>${currency}</option>`).join("")}</select></label></div>${task?.schedule_mode === "one_time" ? `<div class="schedule-callout"><ha-icon icon="mdi:archive-check-outline"></ha-icon><div><strong>${this._t("oneTime")}</strong><p>${this._t("oneTimeCompletionHint")}</p></div></div>` : ""}</section></div><footer><button class="ghost" data-action="close-completion">${this._t("cancel")}</button><button class="primary" data-action="confirm-done"><ha-icon icon="mdi:check"></ha-icon>${this._t("markDone")}</button></footer></section></div>`;
  }
});


// ---- frontend/src/dialogs/onboarding-dialog.ts ----
// First-run onboarding and starter pack selection.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _onboardingDialogHtml() {
    if (!this._onboardingDialog) return "";
    const packs = this._state?.template_packs || [];
    return `<div class="dialog-backdrop"><section class="dialog onboarding-dialog"><header><div><p class="eyebrow">Maintenance Dashboard</p><h2>${this._t("onboarding")}</h2></div><button class="icon" data-action="skip-onboarding" title="${this._t("skip")}"><ha-icon icon="mdi:close"></ha-icon></button></header><div class="dialog-body"><section class="onboarding-hero"><div class="empty-orb"><ha-icon icon="mdi:home-wrench-outline"></ha-icon></div><div><h3>${this._t("onboardingTitle")}</h3><p>${this._t("onboardingHint")}</p></div></section><section class="pack-grid">${packs.map(pack => { const checked = this._selectedPacks.has(pack.id); return `<button type="button" class="pack-card ${checked ? "selected" : ""}" data-pack-toggle="${this._html(pack.id)}"><ha-icon icon="${this._html(pack.icon || "mdi:package-variant")}"></ha-icon><div><strong>${this._html(pack.name)}</strong><p>${this._html(pack.description || "")}</p><small>${(pack.template_ids || []).length} ${this._t("templates")}</small></div><span class="pack-check"><ha-icon icon="${checked ? "mdi:check-circle" : "mdi:circle-outline"}"></ha-icon></span></button>`; }).join("")}</section></div><footer><button class="ghost" data-action="skip-onboarding">${this._t("skip")}</button><button class="primary big" data-action="apply-onboarding" ${this._selectedPacks.size ? "" : "disabled"}><ha-icon icon="mdi:rocket-launch-outline"></ha-icon>${this._t("startSetup")} · ${this._selectedPacks.size}</button></footer></section></div>`;
  }
});


// ---- frontend/src/dialogs/data-dialog.ts ----
// Data integrity, backup rotation, diff, selective restore, import and quarantine UI.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _dataDialogHtml() {
    if (!this._dataDialog) return "";
    const backups = this._state?.backups || [];
    const quarantine = this._state?.quarantine || [];
    const audit = this._state?.audit || [];
    const integrity = this._integrityResult || this._state?.integrity || {};
    return `<div class="dialog-backdrop"><section class="dialog wide data-dialog"><header><div><p class="eyebrow">v${VERSION}</p><h2>${this._t("dataSafety")}</h2></div><button class="icon" data-action="close-data-dialog"><ha-icon icon="mdi:close"></ha-icon></button></header><div class="dialog-body">
      <section class="dialog-section integrity-summary ${integrity.healthy === false ? "has-errors" : "healthy"}">
        <div class="section-title-actions"><div><h3>${this._t("dataIntegrity")}</h3><p>${integrity.healthy ? this._t("integrityHealthy") : `${integrity.errors || 0} ${this._t("integrityErrors")} · ${integrity.warnings || 0} ${this._t("integrityWarnings")}`}</p></div><div class="button-row"><button class="ghost" data-action="check-integrity"><ha-icon icon="mdi:shield-search-outline"></ha-icon>${this._t("runIntegrityCheck")}</button><button class="primary" data-action="repair-integrity" ${integrity.repairable ? "" : "disabled"}><ha-icon icon="mdi:shield-sync-outline"></ha-icon>${this._t("repairIntegrity")}</button></div></div>
        ${Array.isArray(integrity.issues) && integrity.issues.length ? `<div class="issue-list">${integrity.issues.slice(0, 20).map(issue => `<article class="issue ${this._html(issue.severity || "warning")}"><ha-icon icon="${issue.severity === "error" ? "mdi:alert-circle" : "mdi:alert-outline"}"></ha-icon><div><strong>${this._html(issue.code || issue.message || "integrity_issue")}</strong><small>${this._html(issue.task_id || issue.record_id || issue.section || "global")}</small></div>${issue.repairable ? `<span>${this._t("repairIntegrity")}</span>` : ""}</article>`).join("")}</div>` : ""}
      </section>

      <section class="dialog-section">
        <div class="section-title-actions"><div><h3>${this._t("createBackup")}</h3><p>${this._t("backupRotation")}</p></div><button class="primary" data-action="create-backup"><ha-icon icon="mdi:database-plus-outline"></ha-icon>${this._t("createBackup")}</button></div>
        <div class="form-grid"><label class="field"><span>${this._t("backupName")}</span><input id="backupName" value="${this._html(this._backupName)}"></label><label class="check"><input id="backupPinned" type="checkbox" ${this._backupPinned ? "checked" : ""}>${this._t("pinBackup")}</label></div>
        ${backups.length ? `<div class="backup-list">${backups.map(backup => this._backupRowHtml(backup)).join("")}</div>` : `<p>${this._t("noHistory")}</p>`}
      </section>

      ${this._backupDiff ? this._backupDiffHtml() : ""}

      <section class="dialog-section">
        <div class="section-title-actions"><div><h3>${this._t("exportData")}</h3><p>${this._t("dataSafetyExportHint")}</p></div><button class="primary" data-action="export-data"><ha-icon icon="mdi:download"></ha-icon>${this._t("exportData")}</button></div>
      </section>

      <section class="dialog-section import-section">
        <h3>${this._t("importData")}</h3>
        <div class="form-grid"><label class="field"><span>${this._t("importMode")}</span><select id="importMode"><option value="replace" ${this._importMode === "replace" ? "selected" : ""}>${this._t("replaceMode")}</option><option value="merge" ${this._importMode === "merge" ? "selected" : ""}>${this._t("mergeMode")}</option></select></label><label class="field"><span>${this._t("duplicateMode")}</span><select id="importDuplicateMode"><option value="overwrite" ${this._importDuplicateMode === "overwrite" ? "selected" : ""}>${this._t("duplicateOverwrite")}</option><option value="skip" ${this._importDuplicateMode === "skip" ? "selected" : ""}>${this._t("duplicateSkip")}</option><option value="new_id" ${this._importDuplicateMode === "new_id" ? "selected" : ""}>${this._t("duplicateNewId")}</option></select></label></div>
        <textarea id="importPayload" placeholder="${this._t("importPaste")}">${this._html(this._importPayload)}</textarea>
        <div class="button-row"><button class="ghost" data-action="preview-import"><ha-icon icon="mdi:file-search-outline"></ha-icon>${this._t("importPreview")}</button><button class="primary" data-action="import-data" ${this._importPreview?.ok ? "" : "disabled"}><ha-icon icon="mdi:upload"></ha-icon>${this._t("importJson")}</button></div>
        ${this._importPreview ? `<div class="import-preview ${this._importPreview.ok ? "ok" : "error"}"><strong>${this._importPreview.ok ? this._t("ok") : this._t("integrityErrors")}</strong><span>${this._importPreview.task_count || 0} ${this._t("tasksSection")} · +${this._importPreview.added || 0} / -${this._importPreview.removed || 0} · ${this._importPreview.matching || 0} ${this._t("matchingRecords")}</span><span>${this._importPreview.integrity?.errors || 0} ${this._t("integrityErrors")} · ${this._importPreview.integrity?.warnings || 0} ${this._t("integrityWarnings")}</span></div>` : ""}
      </section>

      <section class="dialog-section">
        <div class="section-title-actions"><div><h3>${this._t("quarantine")}</h3><p>${quarantine.length} ${this._t("records")}</p></div>${quarantine.length ? `<button class="ghost" data-action="export-quarantine"><ha-icon icon="mdi:download"></ha-icon>${this._t("exportData")}</button>` : ""}</div>
        ${quarantine.length ? `<div class="quarantine-list">${quarantine.map(record => `<article><div><strong>${this._html(record.reason || "invalid_record")}</strong><small>${this._datetime(record.detected_at)} · ${this._html(record.source || "unknown")}</small></div><div class="button-row"><button class="ghost small" data-export-quarantine="${record.id}"><ha-icon icon="mdi:download"></ha-icon></button><button class="ghost small" data-restore-quarantine="${record.id}"><ha-icon icon="mdi:restore"></ha-icon>${this._t("restoreRecord")}</button><button class="icon danger" data-delete-quarantine="${record.id}"><ha-icon icon="mdi:delete-outline"></ha-icon></button></div></article>`).join("")}</div>` : `<p>${this._t("noHistory")}</p>`}
      </section>

      <section class="dialog-section audit-section">
        <div class="section-title-actions"><div><h3>${this._t("auditLog")}</h3><p>${audit.length} ${this._t("records")}</p></div></div>
        ${audit.length ? `<div class="audit-list">${audit.slice(0, 100).map(event => `<article><div class="audit-icon"><ha-icon icon="mdi:text-box-search-outline"></ha-icon></div><div class="audit-content"><strong>${this._html(event.action || "audit_event")}</strong><small>${this._datetime(event.created_at)} · ${this._t("auditSource")}: ${this._html(event.source || "unknown")}${event.task_id ? ` · ${this._t("auditTask")}: ${this._html(event.task_id)}` : ""}</small>${event.previous || event.current ? `<details><summary>${this._t("auditChanges")}</summary><pre>${this._html(JSON.stringify({ previous: event.previous, current: event.current, details: event.details }, null, 2))}</pre></details>` : ""}</div></article>`).join("")}</div>` : `<p>${this._t("auditEmpty")}</p>`}
      </section>
    </div></section></div>`;
  },

  _backupRowHtml(backup) {
    return `<article class="backup-row ${backup.pinned ? "pinned" : ""}"><div class="backup-main"><ha-icon icon="${backup.pinned ? "mdi:pin" : backup.automatic ? "mdi:backup-restore" : "mdi:database-outline"}"></ha-icon><div><strong>${this._html(backup.name || backup.reason || "Backup")}</strong><small>${this._datetime(backup.created_at)} · ${backup.task_count || 0} ${this._t("taskLabel")} · ${backup.history_count || 0} ${this._t("historyLabel")}${backup.automatic ? ` · ${this._t("automaticLabel")}` : ""}</small></div></div><div class="button-row"><button class="icon" data-pin-backup="${backup.id}" data-pinned="${backup.pinned ? "1" : "0"}" title="${this._t("pinBackup")}"><ha-icon icon="${backup.pinned ? "mdi:pin-off-outline" : "mdi:pin-outline"}"></ha-icon></button><button class="ghost small" data-diff-backup="${backup.id}"><ha-icon icon="mdi:compare"></ha-icon>${this._t("compareBackup")}</button><button class="ghost small" data-restore="${backup.id}"><ha-icon icon="mdi:restore"></ha-icon>${this._t("restore")}</button><button class="icon danger" data-delete-backup="${backup.id}" title="${this._t("delete")}"><ha-icon icon="mdi:delete-outline"></ha-icon></button></div></article>`;
  },

  _backupDiffHtml() {
    const diff = this._backupDiff;
    const taskDiff = diff.tasks || {};
    const changed = taskDiff.changed || [];
    const restorableTaskIds = [...(taskDiff.added || []), ...changed].map(item => item.id).filter(Boolean);
    return `<section class="dialog-section backup-diff-section"><div class="section-title-actions"><div><h3>${this._t("backupDiff")}</h3><p>${diff.backup?.name || diff.backup?.reason || "Backup"}</p></div><button class="icon" data-action="close-backup-diff"><ha-icon icon="mdi:close"></ha-icon></button></div>
      <div class="diff-summary"><div><strong>${taskDiff.added_count || 0}</strong><span>${this._t("added")}</span></div><div><strong>${taskDiff.changed_count || 0}</strong><span>${this._t("changed")}</span></div><div><strong>${taskDiff.removed_count || 0}</strong><span>${this._t("removed")}</span></div><div><strong>${diff.history?.backup_count || 0}</strong><span>${this._t("historySection")}</span></div></div>
      ${changed.length ? `<details open><summary>${this._t("changed")} (${changed.length})</summary><div class="change-list">${changed.map(item => `<article><label class="check"><input type="checkbox" data-restore-task="${item.id}" ${this._restoreTaskIds.has(item.id) ? "checked" : ""}><strong>${this._html(item.name || item.id)}</strong></label>${(item.fields || []).map(field => `<div class="field-diff"><span>${this._html(field.field)}</span><code>${this._html(JSON.stringify(field.before))}</code><ha-icon icon="mdi:arrow-right"></ha-icon><code>${this._html(JSON.stringify(field.after))}</code></div>`).join("")}</article>`).join("")}</div></details>` : ""}
      ${taskDiff.added?.length ? `<details><summary>${this._t("added")} (${taskDiff.added.length})</summary>${taskDiff.added.map(item => `<label class="check"><input type="checkbox" data-restore-task="${item.id}" ${this._restoreTaskIds.has(item.id) ? "checked" : ""}>${this._html(item.name || item.id)}</label>`).join("")}</details>` : ""}
      <div class="restore-options"><h4>${this._t("restoreSections")}</h4>${[["tasks","tasksSection"],["history","historySection"],["settings","settingsSection"],["notification_state","notificationStateSection"],["quarantine","quarantineSection"],["audit","auditSection"]].map(([section,key]) => `<label class="check"><input type="checkbox" data-restore-section="${section}" ${this._restoreSections.has(section) ? "checked" : ""}>${this._t(key)}</label>`).join("")}</div>
      <p class="section-hint">${this._restoreTaskIds.size ? `${this._restoreTaskIds.size} ${this._t("selectedTasks")}` : `${restorableTaskIds.length} ${this._t("availableRestoreTasks")}`}</p>
      <button class="primary" data-action="restore-selected-backup"><ha-icon icon="mdi:restore"></ha-icon>${this._t("selectiveRestore")}</button>
    </section>`;
  }
});


// ---- frontend/src/dialogs/notification-dialog.ts ----
// Notification settings, per-task preview, history and entity integration settings.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _notificationDialogHtml() {
    if (!this._notificationDialog) return "";
    const settings = this._state?.settings || {};
    const n = settings.notifications || {};
    const e = settings.task_entities || {};
    const checked = value => value ? "checked" : "";
    const tasks = (this._state?.tasks || []).filter(task => !task.deleted);
    const history = (this._state?.notification_state?.history || []).slice(0, 30);
    const preview = this._notificationPreview;
    return `<div class="dialog-backdrop"><section class="dialog"><header><h2>${this._t("notifications")}</h2><button class="icon" data-action="close-notification-dialog"><ha-icon icon="mdi:close"></ha-icon></button></header><div class="dialog-body">
      <section class="dialog-section notification-overview">
        <div><p class="eyebrow">Maintenance Dashboard</p><h3>${this._t("notificationRules")}</h3><p class="section-hint">${this._t("notificationRulesHint")}</p></div>
        <label class="switch-card"><input id="notifyEnabled" type="checkbox" ${checked(n.enabled)}><span><strong>${this._t("notifications")}</strong><small>${n.enabled ? this._t("enabled") : this._t("off")}</small></span></label>
      </section>
      <section class="dialog-section">
        <h3>${this._t("notifications")}</h3>
        <div class="form-grid">
          <label class="field"><span>${this._t("notifyService")}</span><input id="notifyService" value="${this._html(n.notify_service || this._notifyService || "")}" placeholder="notify.mobile_app_phone"></label>
          <label class="field"><span>${this._t("digestTime")}</span><input id="digestTime" type="time" value="${this._html(n.digest_time || "08:00")}"></label>
          <label class="field"><span>${this._t("repeatEveryDays")}</span><input id="notificationRepeatDays" type="number" min="0" max="365" value="${this._html(n.repeat_days ?? 3)}"></label>
          <label class="field"><span>${this._t("escalationAfterDays")}</span><input id="notificationEscalationDays" type="number" min="0" max="365" value="${this._html(n.escalation_after_days ?? 3)}"></label>
          <label class="field"><span>${this._t("actionSnoozeDays")}</span><input id="actionSnoozeDays" type="number" min="1" max="365" value="${this._html(n.action_snooze_days ?? 7)}"></label>
          <label class="field"><span>${this._t("notificationHistoryRetention")}</span><input id="notificationHistoryRetention" type="number" min="20" max="2000" value="${this._html(n.history_retention ?? 200)}"></label>
        </div>
        <div class="toggle-grid">
          <label class="check"><input id="notifyWarning" type="checkbox" ${checked(n.warning !== false)}><span>${this._t("warningNotifications")}</span></label>
          <label class="check"><input id="notifyCritical" type="checkbox" ${checked(n.critical !== false)}><span>${this._t("criticalNotifications")}</span></label>
          <label class="check"><input id="notifyOverdue" type="checkbox" ${checked(n.overdue !== false)}><span>${this._t("overdueNotifications")}</span></label>
          <label class="check"><input id="notifyUnavailable" type="checkbox" ${checked(Boolean(n.unavailable))}><span>${this._t("unavailableNotifications")}</span></label>
          <label class="check"><input id="notifyDue" type="checkbox" ${checked(n.due !== false)}><span>${this._t("dueNotifications")}</span></label>
          <label class="check"><input id="oncePerStatus" type="checkbox" ${checked(n.once_per_status !== false)}><span>${this._t("oncePerStatus")}</span></label>
          <label class="check"><input id="notificationEscalation" type="checkbox" ${checked(n.escalation_enabled !== false)}><span>${this._t("escalation")}</span></label>
          <label class="check"><input id="actionableNotifications" type="checkbox" ${checked(n.actionable !== false)}><span>${this._t("actionableNotifications")}</span></label>
          <label class="check"><input id="notificationTestMode" type="checkbox" ${checked(Boolean(n.test_mode))}><span>${this._t("testMode")}</span></label>
        </div>
      </section>
      <section class="dialog-section">
        <h3>${this._t("dailyDigest")}</h3>
        <div class="toggle-grid">
          <label class="check"><input id="dailyDigest" type="checkbox" ${checked(n.daily_digest)}><span>${this._t("dailyDigest")}</span></label>
          <label class="check"><input id="digestGroupByCategory" type="checkbox" ${checked(n.digest_group_by_category !== false)}><span>${this._t("groupDigestByCategory")}</span></label>
          <label class="check"><input id="includeSnoozed" type="checkbox" ${checked(n.include_snoozed)}><span>${this._t("includeSnoozed")}</span></label>
          <label class="check"><input id="includeDashboardLink" type="checkbox" ${checked(n.include_dashboard_link !== false)}><span>${this._t("includeDashboardLink")}</span></label>
        </div>
      </section>
      <section class="dialog-section">
        <h3>${this._t("quietHours")}</h3>
        <div class="form-grid">
          <label class="field"><span>${this._t("quietFrom")}</span><input id="quietFrom" type="time" value="${this._html(n.quiet_from || "22:00")}"></label>
          <label class="field"><span>${this._t("quietTo")}</span><input id="quietTo" type="time" value="${this._html(n.quiet_to || "07:00")}"></label>
        </div>
        <label class="check"><input id="quietHours" type="checkbox" ${checked(n.quiet_hours_enabled)}><span>${this._t("quietHours")}</span></label>
      </section>
      <section class="dialog-section">
        <h3>${this._t("notificationPreview")}</h3>
        <div class="form-grid"><label class="field"><span>${this._t("previewTask")}</span><select id="notificationPreviewTask"><option value="">—</option>${tasks.map(task => `<option value="${this._html(task.id)}" ${this._notificationPreviewTask === task.id ? "selected" : ""}>${this._html(task.name)}</option>`).join("")}</select></label></div>
        <div class="button-row"><button class="ghost" data-action="preview-notification" ${this._notificationPreviewTask ? "" : "disabled"}><ha-icon icon="mdi:eye-outline"></ha-icon>${this._t("notificationPreview")}</button><button class="ghost" data-action="test-notification"><ha-icon icon="mdi:bell-ring-outline"></ha-icon>${this._t("testNotification")}</button><button class="ghost" data-action="send-digest"><ha-icon icon="mdi:message-text-clock-outline"></ha-icon>${this._t("sendDigest")}</button><button class="ghost" data-action="notify-due"><ha-icon icon="mdi:alert-outline"></ha-icon>${this._t("notifyDueTasks")}</button><button class="ghost" data-action="process-notifications"><ha-icon icon="mdi:refresh-auto"></ha-icon>${this._t("processNotificationsNow")}</button></div>
        ${preview ? `<article class="notification-preview-card ${this._html(preview.level || "normal")}"><small>${this._html(preview.service || "")}</small><h4>${this._html(preview.title || "")}</h4><pre>${this._html(preview.message || "")}</pre><div class="preview-actions">${(preview.data?.actions || []).map(action => `<span>${this._html(action.title)}</span>`).join("")}</div></article>` : ""}
      </section>
      <section class="dialog-section">
        <h3>${this._t("entityMode")}</h3><p class="section-hint">${this._t("entitySyncHint")}</p>
        <div class="form-grid"><label class="field"><span>${this._t("entityMode")}</span><select id="entityMode"><option value="off" ${e.mode === "off" ? "selected" : ""}>${this._t("off")}</option><option value="due_only" ${e.mode === "due_only" ? "selected" : ""}>${this._t("dueOnly")}</option><option value="basic" ${e.mode === "basic" ? "selected" : ""}>${this._t("basic")}</option><option value="full" ${e.mode === "full" ? "selected" : ""}>${this._t("full")}</option></select></label><label class="field"><span>${this._t("entityGrouping")}</span><select id="entityGrouping"><option value="dashboard" ${e.device_grouping === "dashboard" ? "selected" : ""}>${this._t("entityGroupingDashboard")}</option><option value="category" ${e.device_grouping === "category" ? "selected" : ""}>${this._t("entityGroupingCategory")}</option><option value="none" ${e.device_grouping === "none" ? "selected" : ""}>${this._t("entityGroupingNone")}</option></select></label></div>
        <label class="check"><input id="cleanupRemovedEntities" type="checkbox" ${checked(Boolean(e.cleanup_removed))}><span>${this._t("cleanupRemovedEntities")}</span></label>
        <button class="ghost" data-action="cleanup-task-entities"><ha-icon icon="mdi:broom"></ha-icon>${this._t("cleanupEntitiesNow")}</button>
      </section>
      <section class="dialog-section"><div class="section-title-actions"><h3>${this._t("notificationHistory")}</h3><button class="ghost small" data-action="clear-notification-history" ${history.length ? "" : "disabled"}><ha-icon icon="mdi:delete-sweep-outline"></ha-icon>${this._t("clearNotificationHistory")}</button></div>${history.length ? `<div class="notification-history">${history.map(item => `<article><div><strong>${this._html(item.task_name || item.title || item.kind || "Notification")}</strong><small>${this._datetime(item.sent_at)} · ${this._html(item.status || item.kind || "")}${item.automatic ? ` · ${this._t("automatic")}` : ` · ${this._t("manual")}`}${item.error ? ` · ${this._html(item.error)}` : ""}</small></div><span class="status ${item.success === false ? "critical" : this._html(item.status || item.level || "ok")}">${item.success === false ? this._t("notificationFailed") : this._html(item.level || item.status || "ok")}</span></article>`).join("")}</div>` : `<p>${this._t("notificationHistoryEmpty")}</p>`}</section>
      <section class="dialog-section"><div class="button-row"><button class="primary" data-action="save-notification-settings"><ha-icon icon="mdi:content-save"></ha-icon>${this._t("save")}</button></div></section>
    </div></section></div>`;
  }
});


// ---- frontend/src/events.ts ----
// Event binding and UI interaction handlers.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _bind() {
    const onAll = (selector, event, handler) => this.shadowRoot.querySelectorAll(selector).forEach(el => el.addEventListener(event, ev => handler(el, ev)));
    const on = (id, event, handler) => { const el = this.shadowRoot.getElementById(id); if (el) el.addEventListener(event, handler); };

    onAll("[data-view]", "click", el => { this._view = el.dataset.view; this._snoozeMenu = null; this._render(); });
    onAll("[data-action='create']", "click", () => this._openCreate());
    onAll("[data-action='close']", "click", () => { this._dialog = null; this._error = ""; this._render(); });
    onAll("[data-action='save']", "click", () => this._save());
    onAll("[data-action='diagnostics']", "click", () => { this._diagnostics = true; this._render(); });
    onAll("[data-action='history-dialog']", "click", () => { this._historyDialog = true; this._render(); });
    onAll("[data-action='close-history']", "click", () => { this._historyDialog = false; this._render(); });
    onAll("[data-action='close-diagnostics']", "click", () => { this._diagnostics = false; this._render(); });
    onAll("[data-action='data-dialog']", "click", () => { this._dataDialog = true; this._render(); });
    onAll("[data-action='close-data-dialog']", "click", () => { this._dataDialog = false; this._backupDiff = null; this._render(); });
    onAll("[data-action='notification-dialog']", "click", () => { this._notificationDialog = true; this._render(); });
    onAll("[data-action='close-notification-dialog']", "click", () => { this._notificationDialog = false; this._render(); });
    onAll("[data-action='close-template-preview']", "click", () => { this._templatePreview = null; this._render(); });
    onAll("[data-action='close-completion']", "click", () => { this._completionDialog = null; this._render(); });
    onAll("[data-action='confirm-done']", "click", () => this._confirmDone());

    // Dashboard layout, filters and bulk actions.
    onAll("[data-layout]", "click", el => this._setLayout(el.dataset.layout));
    onAll("[data-quick-filter]", "click", el => { const [kind, value] = el.dataset.quickFilter.split(":"); this._applyQuickFilter(kind, value); });
    onAll("[data-quick-tag]", "click", el => { this._tagFilter = el.dataset.quickTag || ""; this._showAdvancedFilters = true; this._render(); });
    onAll("[data-action='toggle-advanced-filters']", "click", () => { this._showAdvancedFilters = !this._showAdvancedFilters; this._render(); });
    onAll("[data-action='reset-filters']", "click", () => { this._applyFilterPayload({}); this._render(); });
    onAll("[data-action='toggle-completed']", "click", () => { this._showCompleted = !this._showCompleted; this._render(); });
    onAll("[data-select-task]", "change", el => { el.checked ? this._selectedTasks.add(el.dataset.selectTask) : this._selectedTasks.delete(el.dataset.selectTask); this._render(); });
    onAll("[data-action='select-visible-tasks']", "change", el => { this._filteredTasks(false).forEach(task => el.checked ? this._selectedTasks.add(task.id) : this._selectedTasks.delete(task.id)); this._render(); });
    onAll("[data-action='clear-task-selection']", "click", () => { this._selectedTasks.clear(); this._render(); });
    onAll("[data-action='select-problem-tasks']", "click", () => { this._selectedTasks.clear(); this._filteredTasks(false).filter(task => ["overdue", "critical", "warning", "unavailable"].includes(this._state?.runtime?.[task.id]?.status)).forEach(task => this._selectedTasks.add(task.id)); this._render(); });
    onAll("[data-action='invert-task-selection']", "click", () => { this._filteredTasks(false).forEach(task => this._selectedTasks.has(task.id) ? this._selectedTasks.delete(task.id) : this._selectedTasks.add(task.id)); this._render(); });
    onAll("[data-action='execute-bulk']", "click", () => this._executeBulk());
    onAll("[data-action='close-bulk-preview']", "click", () => { this._bulkPreview = null; this._render(); });
    onAll("[data-action='confirm-bulk']", "click", () => this._confirmBulk());
    onAll("[data-action='export-selected']", "click", () => this._exportSelected());
    onAll("[data-action='save-filter']", "click", () => this._saveCurrentFilter());
    onAll("[data-action='save-filter-pinned']", "click", () => this._saveCurrentFilter({ pinned: true }));
    onAll("[data-apply-filter]", "click", el => this._applySavedFilter(el.dataset.applyFilter));
    onAll("[data-delete-filter]", "click", el => this._deleteSavedFilter(el.dataset.deleteFilter));

    // Data safety and recovery.
    onAll("[data-action='export-data']", "click", () => this._exportData());
    onAll("[data-action='preview-import']", "click", () => this._previewImport());
    onAll("[data-action='import-data']", "click", () => this._importData());
    onAll("[data-action='check-integrity']", "click", () => this._checkIntegrity());
    onAll("[data-action='repair-integrity']", "click", () => this._repairIntegrity());
    onAll("[data-action='create-backup']", "click", () => this._createBackup());
    onAll("[data-pin-backup]", "click", el => this._updateBackup(el.dataset.pinBackup, { pinned: el.dataset.pinned !== "1" }));
    onAll("[data-diff-backup]", "click", el => this._loadBackupDiff(el.dataset.diffBackup));
    onAll("[data-delete-backup]", "click", el => this._deleteBackup(el.dataset.deleteBackup));
    onAll("[data-action='close-backup-diff']", "click", () => { this._backupDiff = null; this._backupDiffId = null; this._restoreTaskIds.clear(); this._render(); });
    onAll("[data-restore-section]", "change", el => { el.checked ? this._restoreSections.add(el.dataset.restoreSection) : this._restoreSections.delete(el.dataset.restoreSection); });
    onAll("[data-restore-task]", "change", el => { el.checked ? this._restoreTaskIds.add(el.dataset.restoreTask) : this._restoreTaskIds.delete(el.dataset.restoreTask); });
    onAll("[data-action='restore-selected-backup']", "click", () => this._restoreSelectedBackup());
    onAll("[data-restore-quarantine]", "click", el => this._restoreQuarantine(el.dataset.restoreQuarantine));
    onAll("[data-delete-quarantine]", "click", el => this._deleteQuarantine(el.dataset.deleteQuarantine));
    onAll("[data-export-quarantine]", "click", el => this._exportQuarantine(el.dataset.exportQuarantine));
    onAll("[data-action='export-quarantine']", "click", () => this._exportQuarantine());

    // Notification controls.
    onAll("[data-action='save-notification-settings']", "click", () => this._saveNotificationSettings());
    onAll("[data-action='test-notification']", "click", () => this._sendNotification(true));
    onAll("[data-action='send-digest']", "click", () => this._sendNotification(false));
    onAll("[data-action='notify-due']", "click", () => this._notifyDueTasks());
    onAll("[data-action='preview-notification']", "click", () => this._previewNotification());
    onAll("[data-action='process-notifications']", "click", () => this._processNotifications());
    onAll("[data-action='cleanup-task-entities']", "click", () => this._cleanupTaskEntities());
    onAll("[data-action='clear-notification-history']", "click", () => this._clearNotificationHistory());
    onAll("[data-action='save-general-settings']", "click", () => this._saveGeneralSettings());
    onAll("[data-action='undo-reorder']", "click", () => this._undoReorder());
    onAll("[data-widget-move]", "click", el => { const [id, dir] = el.dataset.widgetMove.split(":"); this._moveWidget(id, dir === "up" ? -1 : 1); });
    onAll("[data-widget-keyboard]", "keydown", (el, e) => { if (e.key === "ArrowUp" || e.key === "ArrowLeft") { e.preventDefault(); this._moveWidget(el.dataset.widgetKeyboard, -1); } else if (e.key === "ArrowDown" || e.key === "ArrowRight") { e.preventDefault(); this._moveWidget(el.dataset.widgetKeyboard, 1); } });
    onAll("[data-widget-drag]", "dragstart", el => { this._widgetDragId = el.dataset.widgetDrag; el.classList.add("dragging"); });
    onAll("[data-widget-drag]", "dragend", el => { el.classList.remove("dragging"); this._widgetDragId = null; this.shadowRoot.querySelectorAll(".widget-order-list .drop-target").forEach(row => row.classList.remove("drop-target")); });
    onAll("[data-widget-drag]", "dragover", (el, e) => { e.preventDefault(); el.classList.add("drop-target"); });
    onAll("[data-widget-drag]", "dragleave", el => el.classList.remove("drop-target"));
    onAll("[data-widget-drag]", "drop", el => { el.classList.remove("drop-target"); this._dropWidget(el.dataset.widgetDrop); });

    // Templates and onboarding.
    onAll("[data-action='select-visible']", "click", () => { this._filteredTemplates().forEach(t => this._selectedTemplates.add(t.id)); this._render(); });
    onAll("[data-action='clear-template-selection']", "click", () => { this._selectedTemplates.clear(); this._render(); });
    onAll("[data-template-category]", "click", el => { this._templateCategory = el.dataset.templateCategory; this._render(); });
    onAll("[data-action='add-selected']", "click", () => this._addSelectedTemplates());
    onAll("[data-add-pack]", "click", el => this._addStarterPack(el.dataset.addPack));
    onAll("[data-pack-toggle]", "click", el => { const id = el.dataset.packToggle; this._selectedPacks.has(id) ? this._selectedPacks.delete(id) : this._selectedPacks.add(id); this._render(); });
    onAll("[data-action='apply-onboarding']", "click", () => this._applyOnboarding());
    onAll("[data-action='open-onboarding']", "click", () => { this._onboardingDialog = true; this._selectedPacks.clear(); this._render(); });
    onAll("[data-action='skip-onboarding']", "click", () => this._skipOnboarding());

    // Editor-specific controls. Prevent button clicks from submitting/re-opening the dialog.
    onAll("[data-action='random-colors']", "click", (_el, e) => { e.preventDefault(); e.stopPropagation(); this._randomizeColors("both"); });
    onAll("[data-action='random-icon-color']", "click", (_el, e) => { e.preventDefault(); e.stopPropagation(); this._randomizeColors("icon"); });
    onAll("[data-action='random-card-color']", "click", (_el, e) => { e.preventDefault(); e.stopPropagation(); this._randomizeColors("card"); });
    onAll("[data-action='clear-colors']", "click", (_el, e) => { e.preventDefault(); e.stopPropagation(); this._draft.icon_color = ""; this._draft.card_color = ""; this._render(); });

    // Basic controls.
    on("search", "input", e => { this._search = e.target.value; this._renderSoon(180); });
    on("statusFilter", "change", e => { this._statusFilter = e.target.value; this._render(); });
    on("sortMode", "change", e => { this._sortMode = e.target.value; this._render(); });
    on("categoryFilter", "change", e => { this._categoryFilter = e.target.value; this._render(); });
    on("areaFilter", "change", e => { this._areaFilter = e.target.value; this._render(); });
    on("priorityFilter", "change", e => { this._priorityFilter = e.target.value; this._render(); });
    on("scheduleFilter", "change", e => { this._scheduleFilter = e.target.value; this._render(); });
    on("dueFilter", "change", e => { this._dueFilter = e.target.value; this._render(); });
    on("tagFilter", "input", e => { this._tagFilter = e.target.value; this._renderSoon(150); });
    on("entityFilter", "change", e => { this._entityFilter = e.target.value; this._render(); });
    on("savedFilterName", "input", e => { this._savedFilterName = e.target.value; });
    on("bulkAction", "change", e => { this._bulkAction = e.target.value; this._bulkValue = ""; this._render(); });
    on("bulkValue", "input", e => { this._bulkValue = e.target.value; });
    on("templateSeason", "change", e => { this._templateSeason = e.target.value; this._render(); });
    on("templateCommon", "change", e => { this._templateOnlyCommon = e.target.checked; this._render(); });
    on("historySearch", "input", e => { this._historySearch = e.target.value; this._renderSoon(150); });
    on("historyType", "change", e => { this._historyType = e.target.value; this._render(); });
    on("historyTask", "change", e => { this._historyTask = e.target.value; this._render(); });
    on("notificationPreviewTask", "change", e => { this._notificationPreviewTask = e.target.value; this._notificationPreview = null; this._render(); });
    on("importPayload", "input", e => { this._importPayload = e.target.value; this._importPreview = null; });
    on("importMode", "change", e => { this._importMode = e.target.value; this._importPreview = null; this._render(); });
    on("importDuplicateMode", "change", e => { this._importDuplicateMode = e.target.value; this._importPreview = null; this._render(); });
    on("backupName", "input", e => { this._backupName = e.target.value; });
    on("backupPinned", "change", e => { this._backupPinned = e.target.checked; });
    on("notifyService", "input", e => { this._notifyService = e.target.value; });

    // Task actions and ordering.
    onAll("[data-focus-task]", "click", (el, e) => { if (e.target.closest(".next-cycle")) return; this._focusTask(el.dataset.focusTask); });
    onAll("[data-action='prev-next-task']", "click", (_el, e) => { e.stopPropagation(); this._cycleNextTask(-1); });
    onAll("[data-action='next-next-task']", "click", (_el, e) => { e.stopPropagation(); this._cycleNextTask(1); });
    onAll("[data-edit]", "click", el => this._openEdit(el.dataset.edit));
    onAll("[data-done]", "click", (el, e) => { e.preventDefault(); e.stopPropagation(); this._openCompletion(el.dataset.done); });
    onAll("[data-reactivate]", "click", el => this._reactivate(el.dataset.reactivate));
    onAll("[data-snooze-menu]", "click", el => { this._snoozeMenu = this._snoozeMenu === el.dataset.snoozeMenu ? null : el.dataset.snoozeMenu; this._render(); });
    onAll("[data-snooze-days]", "click", el => { const [id, days] = el.dataset.snoozeDays.split(":"); this._snooze(id, Number(days)); });
    onAll("[data-clear-snooze]", "click", el => this._clearSnooze(el.dataset.clearSnooze));
    onAll("[data-delete]", "click", el => this._delete(el.dataset.delete));
    onAll("[data-undo]", "click", el => this._undo(el.dataset.undo));
    onAll("[data-restore]", "click", el => this._restoreBackup(el.dataset.restore));
    onAll("[data-copy-diagnostics]", "click", el => { navigator.clipboard?.writeText(el.dataset.copyDiagnostics || ""); this._showToast(this._t("copyDiagnostics")); });
    onAll("[data-template]", "click", (el, e) => { e.stopPropagation(); this._openCreate(this._template(el.dataset.template)); this._templatePreview = null; });
    onAll("[data-template-preview],[data-template-preview-btn]", "click", (el, e) => { e.stopPropagation(); this._templatePreview = el.dataset.templatePreview || el.dataset.templatePreviewBtn; this._render(); });
    onAll("[data-template-check]", "change", el => { el.checked ? this._selectedTemplates.add(el.dataset.templateCheck) : this._selectedTemplates.delete(el.dataset.templateCheck); this._render(); });
    onAll("[data-apply-template]", "click", el => { this._applyTemplate(this._template(el.dataset.applyTemplate)); this._render(); });
    onAll("[data-move]", "click", el => { const [id, dir] = el.dataset.move.split(":"); this._move(id, dir === "up" ? -1 : 1); });
    onAll("[data-keyboard-reorder]", "keydown", (el, e) => { if (e.key === "ArrowUp") { e.preventDefault(); this._move(el.dataset.keyboardReorder, -1); } else if (e.key === "ArrowDown") { e.preventDefault(); this._move(el.dataset.keyboardReorder, 1); } });
    onAll("[data-drag]", "dragstart", el => { this._dragTaskId = el.dataset.drag; el.classList.add("dragging"); });
    onAll("[data-drag]", "dragend", el => { el.classList.remove("dragging"); this.shadowRoot.querySelectorAll(".drop-target").forEach(row => row.classList.remove("drop-target")); });
    onAll("[data-drag]", "dragover", (el, e) => { e.preventDefault(); el.classList.add("drop-target"); });
    onAll("[data-drag]", "dragleave", el => el.classList.remove("drop-target"));
    onAll("[data-drag]", "drop", el => { el.classList.remove("drop-target"); this._dropOn(el.dataset.drop); });
    onAll("[data-drag]", "pointerdown", (el, e) => { if (e.pointerType === "mouse") return; clearTimeout(this._longPressTimer); this._longPressTimer = setTimeout(() => { this._dragTaskId = el.dataset.drag; el.classList.add("dragging"); this._showToast(this._t("dragHint")); }, 500); });
    onAll("[data-drag]", "pointerenter", el => { if (this._dragTaskId) el.classList.add("drop-target"); });
    onAll("[data-drag]", "pointerleave", el => { if (this._dragTaskId) el.classList.remove("drop-target"); });
    onAll("[data-drag]", "pointerup", el => { clearTimeout(this._longPressTimer); if (this._dragTaskId && this._dragTaskId !== el.dataset.drop) this._dropOn(el.dataset.drop); el.classList.remove("dragging"); });
    onAll("[data-draft]", "input", (_el, e) => this._draftChange(e));
    onAll("select[data-draft]", "change", (_el, e) => this._draftChange(e));

    const picker = this.shadowRoot.getElementById("entityPicker");
    if (picker) { picker.hass = this.hass; picker.value = this._draft.entity_id; picker.addEventListener("value-changed", e => { this._draft.entity_id = String(e.detail?.value || ""); }); }
    const iconHost = this.shadowRoot.getElementById("iconHost"); if (iconHost) this._mountIconPicker(iconHost);
    const completionBindings = { completionNote: "_completionNote", completionMaterial: "_completionMaterial", completionCost: "_completionCost", completionCurrency: "_completionCurrency", completionPerformedBy: "_completionPerformedBy" };
    Object.entries(completionBindings).forEach(([id, property]) => on(id, "input", event => { this[property] = event.target.value; }));
  }
});


// ---- frontend/src/api.ts ----
// WebSocket API helpers and backend mutation methods.
Object.assign(MaintenanceDashboardPanel.prototype, {
  async _save() {
    if (!this.hass) return;
    if (!this._draft.name.trim()) { this._error = "Name fehlt"; this._render(); return; }
    if (this._draft.category === "custom" && !this._draft.custom_category.trim()) { this._error = this._t("customCategoryMissing"); this._render(); return; }
    if (this._draft.schedule_mode === "one_time" && !this._draft.due_date) { this._error = this._t("dueDateMissing"); this._render(); return; }
    const task = this._draftToTask();
    try {
      this._busy = true;
      if (this._dialog === "edit" && this._draft.id) await this.hass.callWS({ type: "maintenance_dashboard/update_task", task_id: this._draft.id, patch: task });
      else await this.hass.callWS({ type: "maintenance_dashboard/create_task", task });
      this._dialog = null; await this._load(); this._showToast(this._t("actionSaved"));
    } catch (e) { this._error = String(e); this._render(); }
    finally { this._busy = false; }
  },

  async _createTemplateTask(template, starterPack = undefined) {
    const task = { ...template, template_id: template.id, starter_pack: starterPack };
    delete task.id;
    if (task.schedule_mode === "interval" && !task.last_done) task.last_done = new Date().toISOString();
    await this.hass.callWS({ type: "maintenance_dashboard/create_task", task });
  },

  async _addSelectedTemplates() {
    if (!this.hass || !this._selectedTemplates.size) return;
    const selected = (this._state.templates || []).filter(t => this._selectedTemplates.has(t.id));
    for (const template of selected) await this._createTemplateTask(template);
    this._selectedTemplates.clear();
    await this._load();
    this._view = "dashboard";
    this._render();
    this._showToast(this._t("actionTemplatesAdded"));
  },

  async _addStarterPack(packId, { completeOnboarding = false, reload = true } = {}) {
    const pack = (this._state?.template_packs || []).find(item => item.id === packId);
    if (!pack) return;
    const existingTasks = (this._state.tasks || []).filter(task => !task.deleted);
    const existingTemplateIds = new Set(existingTasks.map(task => task.template_id).filter(Boolean));
    const existingNames = new Set(existingTasks.map(task => String(task.name || "").trim().toLowerCase()).filter(Boolean));
    for (const templateId of pack.template_ids || []) {
      const template = this._template(templateId);
      if (!template || existingTemplateIds.has(templateId) || existingNames.has(String(template.name || "").trim().toLowerCase())) continue;
      await this._createTemplateTask(template, pack.id);
      existingTemplateIds.add(templateId);
      existingNames.add(String(template.name || "").trim().toLowerCase());
    }
    if (completeOnboarding) {
      await this.hass.callWS({
        type: "maintenance_dashboard/update_settings",
        patch: { onboarding: { completed: true, selected_packs: [...this._selectedPacks] } },
      });
    }
    if (reload) {
      await this._load();
      this._showToast(`${this._t("packAdded")}: ${pack.name}`);
    }
  },

  async _applyOnboarding() {
    const packIds = [...this._selectedPacks];
    const selectedPacks = (this._state?.template_packs || []).filter(pack => this._selectedPacks.has(pack.id));
    const templateIds = [...new Set(selectedPacks.flatMap(pack => pack.template_ids || []))];
    const existingTasks = (this._state.tasks || []).filter(task => !task.deleted);
    const existingTemplateIds = new Set(existingTasks.map(task => task.template_id).filter(Boolean));
    const existingNames = new Set(existingTasks.map(task => String(task.name || "").trim().toLowerCase()).filter(Boolean));
    for (const templateId of templateIds) {
      const template = this._template(templateId);
      if (!template || existingTemplateIds.has(templateId) || existingNames.has(String(template.name || "").trim().toLowerCase())) continue;
      const owner = selectedPacks.find(pack => (pack.template_ids || []).includes(templateId));
      await this._createTemplateTask(template, owner?.id);
      existingTemplateIds.add(templateId);
      existingNames.add(String(template.name || "").trim().toLowerCase());
    }
    await this.hass.callWS({
      type: "maintenance_dashboard/update_settings",
      patch: { onboarding: { completed: true, selected_packs: packIds } },
    });
    this._onboardingDialog = false;
    this._onboardingDismissed = true;
    this._selectedPacks.clear();
    await this._load();
    this._showToast(this._t("actionTemplatesAdded"));
  },

  async _skipOnboarding() {
    this._onboardingDialog = false;
    this._onboardingDismissed = true;
    await this.hass.callWS({
      type: "maintenance_dashboard/update_settings",
      patch: { onboarding: { completed: true, selected_packs: [] } },
    });
    await this._load();
  },

  async _confirmDone() {
    const id = this._completionDialog;
    if (!id) return;
    await this._markDone(id, {
      note: this._completionNote,
      material: this._completionMaterial,
      cost: this._completionCost === "" ? undefined : Number(this._completionCost),
      currency: this._completionCurrency,
      performed_by: this._completionPerformedBy,
    });
    this._completionDialog = null;
    this._completionNote = "";
    this._completionMaterial = "";
    this._completionCost = "";
    this._completionPerformedBy = "";
  },

  async _markDone(id, details = {}) {
    try {
      await this.hass.callWS({ type: "maintenance_dashboard/mark_done", task_id: id, ...details });
      await this._load();
      this._showToast(this._t("actionDone"));
    } catch (error) {
      this._showToast(String(error));
    }
  },

  async _reactivate(id) {
    await this.hass.callWS({ type: "maintenance_dashboard/reactivate_task", task_id: id });
    await this._load();
    this._showCompleted = true;
    this._showToast(this._t("actionReactivated"));
  },

  async _exportData() { const payload = await this.hass.callWS({ type: "maintenance_dashboard/export_data" }); const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" }); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = `maintenance-dashboard-${new Date().toISOString().slice(0,10)}.json`; a.click(); URL.revokeObjectURL(url); this._showToast(this._t("actionExported")); },

  async _importData() { const payload = JSON.parse(this._importPayload || "{}"); await this.hass.callWS({ type: "maintenance_dashboard/import_data", payload }); this._importPayload = ""; this._dataDialog = false; await this._load(); this._showToast(this._t("actionImported")); },

  async _saveNotificationSettings() {
    const patch = {
      notifications: {
        enabled: Boolean(this.shadowRoot.getElementById("notifyEnabled")?.checked),
        notify_service: this.shadowRoot.getElementById("notifyService")?.value || "",
        warning: Boolean(this.shadowRoot.getElementById("notifyWarning")?.checked),
        critical: Boolean(this.shadowRoot.getElementById("notifyCritical")?.checked),
        overdue: Boolean(this.shadowRoot.getElementById("notifyOverdue")?.checked),
        unavailable: Boolean(this.shadowRoot.getElementById("notifyUnavailable")?.checked),
        due: Boolean(this.shadowRoot.getElementById("notifyDue")?.checked),
        once_per_status: Boolean(this.shadowRoot.getElementById("oncePerStatus")?.checked),
        repeat_days: Number(this.shadowRoot.getElementById("notificationRepeatDays")?.value || 0),
        escalation_enabled: Boolean(this.shadowRoot.getElementById("notificationEscalation")?.checked),
        escalation_after_days: Number(this.shadowRoot.getElementById("notificationEscalationDays")?.value || 0),
        actionable: Boolean(this.shadowRoot.getElementById("actionableNotifications")?.checked),
        action_snooze_days: Number(this.shadowRoot.getElementById("actionSnoozeDays")?.value || 7),
        history_retention: Number(this.shadowRoot.getElementById("notificationHistoryRetention")?.value || 200),
        test_mode: Boolean(this.shadowRoot.getElementById("notificationTestMode")?.checked),
        daily_digest: Boolean(this.shadowRoot.getElementById("dailyDigest")?.checked),
        digest_time: this.shadowRoot.getElementById("digestTime")?.value || "08:00",
        digest_group_by_category: Boolean(this.shadowRoot.getElementById("digestGroupByCategory")?.checked),
        quiet_hours_enabled: Boolean(this.shadowRoot.getElementById("quietHours")?.checked),
        quiet_from: this.shadowRoot.getElementById("quietFrom")?.value || "22:00",
        quiet_to: this.shadowRoot.getElementById("quietTo")?.value || "07:00",
        include_snoozed: Boolean(this.shadowRoot.getElementById("includeSnoozed")?.checked),
        include_dashboard_link: Boolean(this.shadowRoot.getElementById("includeDashboardLink")?.checked),
      },
      task_entities: {
        mode: this.shadowRoot.getElementById("entityMode")?.value || "off",
        device_grouping: this.shadowRoot.getElementById("entityGrouping")?.value || "dashboard",
        cleanup_removed: Boolean(this.shadowRoot.getElementById("cleanupRemovedEntities")?.checked),
      },
    };
    await this.hass.callWS({ type: "maintenance_dashboard/update_settings", patch });
    await this._load();
    this._showToast(this._t("actionSaved"));
  },

  async _sendNotification(test) {
    const service = this.shadowRoot.getElementById("notifyService")?.value || this._state?.settings?.notifications?.notify_service || undefined;
    if (test) await this.hass.callWS({ type: "maintenance_dashboard/test_notification", service });
    else await this.hass.callWS({ type: "maintenance_dashboard/send_digest", service, include_snoozed: Boolean(this.shadowRoot.getElementById("includeSnoozed")?.checked) });
    await this._load();
    this._showToast(this._t("actionNotificationSent"));
  },

  async _notifyDueTasks() {
    const service = this.shadowRoot.getElementById("notifyService")?.value || this._state?.settings?.notifications?.notify_service || undefined;
    const result = await this.hass.callWS({ type: "maintenance_dashboard/notify_due_tasks", service, statuses: ["warning", "critical", "overdue", "unavailable"] });
    await this._load();
    this._showToast(`${this._t("actionNotificationSent")}: ${result.sent || 0}${result.failed ? ` · ${result.failed} ${this._t("notificationFailed")}` : ""}`);
  },

  async _previewNotification() {
    if (!this._notificationPreviewTask) return;
    const service = this.shadowRoot.getElementById("notifyService")?.value || undefined;
    this._notificationPreview = await this.hass.callWS({ type: "maintenance_dashboard/preview_notification", task_id: this._notificationPreviewTask, service });
    this._render();
  },

  async _processNotifications() {
    const result = await this.hass.callWS({ type: "maintenance_dashboard/process_notifications" });
    await this._load();
    const sent = Number(result.sent || 0) + Number(result.digest_sent || 0);
    this._showToast(result.suppressed ? `${this._t("processNotificationsNow")}: ${result.suppressed}` : `${this._t("actionNotificationSent")}: ${sent}`);
  },

  async _cleanupTaskEntities() {
    const result = await this.hass.callWS({ type: "maintenance_dashboard/cleanup_task_entities" });
    await this._load();
    this._showToast(`${this._t("cleanupEntitiesNow")}: ${result.removed || 0}`);
  },

  async _clearNotificationHistory() {
    await this.hass.callWS({ type: "maintenance_dashboard/clear_notification_history" });
    await this._load();
    this._showToast(this._t("notificationHistoryCleared"));
  },

  async _snooze(id, days) { this._snoozeMenu = null; await this.hass.callWS({ type: "maintenance_dashboard/snooze", task_id: id, days }); await this._load(); this._showToast(`${this._t("actionSnoozed")} · ${days} ${this._t("days")}`); },

  async _clearSnooze(id) { await this.hass.callWS({ type: "maintenance_dashboard/clear_snooze", task_id: id }); await this._load(); this._showToast(this._t("actionSnoozeCleared")); },

  async _undo(id) { await this.hass.callWS({ type: "maintenance_dashboard/undo_completion", event_id: id }); await this._load(); this._showToast(this._t("actionUndo")); },

  async _delete(id) { await this.hass.callWS({ type: "maintenance_dashboard/delete_task", task_id: id }); await this._load(); this._showToast(this._t("actionDeleted")); },

  async _restoreBackup(id) { await this.hass.callWS({ type: "maintenance_dashboard/restore_backup", backup_id: id }); await this._load(); this._showToast(this._t("actionRestored")); },

  async _move(id, delta) { const tasks = this._filteredTasks(true).sort((a, b) => (a.position ?? 0) - (b.position ?? 0)); const idx = tasks.findIndex(t => t.id === id); const target = idx + delta; if (idx < 0 || target < 0 || target >= tasks.length) return; const [item] = tasks.splice(idx, 1); tasks.splice(target, 0, item); await this.hass.callWS({ type: "maintenance_dashboard/reorder", ordered_ids: tasks.map(t => t.id) }); await this._load(); },

  async _dropOn(targetId) { if (!this._dragTaskId || this._dragTaskId === targetId) return; const tasks = this._filteredTasks(true).sort((a, b) => (a.position ?? 0) - (b.position ?? 0)); const from = tasks.findIndex(t => t.id === this._dragTaskId); const to = tasks.findIndex(t => t.id === targetId); if (from < 0 || to < 0) return; const [item] = tasks.splice(from, 1); tasks.splice(to, 0, item); this._dragTaskId = null; await this.hass.callWS({ type: "maintenance_dashboard/reorder", ordered_ids: tasks.map(t => t.id) }); await this._load(); }
});

// v1.6 data safety, bulk operation, saved filter and dashboard settings API helpers.
Object.assign(MaintenanceDashboardPanel.prototype, {
  async _setLayout(mode) {
    this._layoutMode = mode || "cards";
    this._render();
    try {
      await this.hass.callWS({ type: "maintenance_dashboard/update_settings", patch: { dashboard: { view_mode: this._layoutMode } } });
      if (this._state?.settings?.dashboard) this._state.settings.dashboard.view_mode = this._layoutMode;
    } catch (error) { this._showToast(String(error)); }
  },

  async _saveCurrentFilter({ pinned = false } = {}) {
    const name = String(this._savedFilterName || "").trim();
    if (!name) { this._showToast(this._t("filterName")); return; }
    const current = this._state?.settings?.dashboard?.saved_filters || [];
    const existing = current.find(item => String(item.name || "").toLowerCase() === name.toLowerCase());
    const now = new Date().toISOString();
    const filter = {
      ...(existing || {}),
      id: existing?.id || `filter_${Date.now().toString(36)}`,
      name,
      pinned: pinned || Boolean(existing?.pinned),
      created_at: existing?.created_at || now,
      updated_at: now,
      values: this._currentFilterPayload(),
    };
    const filters = existing ? current.map(item => item.id === existing.id ? filter : item) : [...current, filter];
    filters.sort((a, b) => Number(Boolean(b.pinned)) - Number(Boolean(a.pinned)) || String(a.name || "").localeCompare(String(b.name || ""), this._lang()));
    await this.hass.callWS({ type: "maintenance_dashboard/update_settings", patch: { dashboard: { saved_filters: filters } } });
    this._savedFilterName = "";
    await this._load();
    this._showToast(existing ? this._t("actionFilterUpdated") : this._t("actionFilterSaved"));
  },

  _applySavedFilter(id) {
    const filter = (this._state?.settings?.dashboard?.saved_filters || []).find(item => item.id === id);
    if (!filter) return;
    this._applyFilterPayload(filter.values || {});
    this._showAdvancedFilters = true;
    this._render();
  },

  async _deleteSavedFilter(id) {
    const filters = (this._state?.settings?.dashboard?.saved_filters || []).filter(item => item.id !== id);
    await this.hass.callWS({ type: "maintenance_dashboard/update_settings", patch: { dashboard: { saved_filters: filters } } });
    await this._load();
    this._showToast(this._t("actionFilterDeleted"));
  },

  async _executeBulk() {
    const taskIds = this._selectedTaskList();
    if (!taskIds.length) return;
    let value = this._bulkValue;
    if (this._bulkAction === "snooze" || this._bulkAction === "priority") value = Number(value || (this._bulkAction === "snooze" ? 7 : 3));
    this._bulkPreview = await this.hass.callWS({
      type: "maintenance_dashboard/preview_bulk_operation",
      task_ids: taskIds,
      action: this._bulkAction,
      value,
    });
    this._render();
  },

  async _confirmBulk() {
    if (!this._bulkPreview) return;
    const taskIds = (this._bulkPreview.tasks || []).map(task => task.id);
    const result = await this.hass.callWS({
      type: "maintenance_dashboard/bulk_operation",
      task_ids: taskIds,
      action: this._bulkPreview.action,
      value: this._bulkPreview.value,
    });
    this._bulkPreview = null;
    this._selectedTasks.clear();
    await this._load();
    this._showToast(`${this._t("actionBulkDone")}: ${result.affected || taskIds.length}`);
  },

  async _exportSelected() {
    const ids = new Set(this._selectedTaskList());
    const payload = await this.hass.callWS({ type: "maintenance_dashboard/export_data" });
    payload.tasks = (payload.tasks || []).filter(task => ids.has(task.id));
    payload.history = (payload.history || []).filter(event => ids.has(event.task_id));
    payload.backups = [];
    this._downloadJson(payload, `maintenance-dashboard-selection-${new Date().toISOString().slice(0,10)}.json`);
  },

  _downloadJson(payload, filename) {
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = filename; anchor.click();
    URL.revokeObjectURL(url);
  },

  async _checkIntegrity() {
    this._integrityResult = await this.hass.callWS({ type: "maintenance_dashboard/check_integrity" });
    if (this._state) this._state.integrity = this._integrityResult;
    this._render();
    this._showToast(this._integrityResult.healthy ? this._t("integrityHealthy") : `${this._integrityResult.errors} ${this._t("integrityErrors")}`);
  },

  async _repairIntegrity() {
    const result = await this.hass.callWS({ type: "maintenance_dashboard/repair_integrity" });
    this._integrityResult = result.integrity || result;
    await this._load();
    this._showToast(this._t("actionIntegrityRepaired"));
  },

  async _createBackup() {
    await this.hass.callWS({ type: "maintenance_dashboard/create_backup", name: String(this._backupName || "").trim() || undefined, pinned: Boolean(this._backupPinned) });
    this._backupName = ""; this._backupPinned = false;
    await this._load();
    this._showToast(this._t("actionBackupCreated"));
  },

  async _updateBackup(id, patch) {
    await this.hass.callWS({ type: "maintenance_dashboard/update_backup", backup_id: id, ...patch });
    await this._load();
    this._showToast(this._t("actionBackupUpdated"));
  },

  async _deleteBackup(id) {
    if (!window.confirm(this._t("delete"))) return;
    await this.hass.callWS({ type: "maintenance_dashboard/delete_backup", backup_id: id });
    if (this._backupDiffId === id) { this._backupDiff = null; this._backupDiffId = null; }
    await this._load();
    this._showToast(this._t("actionBackupDeleted"));
  },

  async _loadBackupDiff(id) {
    this._backupDiffId = id;
    this._restoreTaskIds.clear();
    this._backupDiff = await this.hass.callWS({ type: "maintenance_dashboard/backup_diff", backup_id: id });
    this._render();
  },

  async _restoreSelectedBackup() {
    if (!this._backupDiffId || !this._restoreSections.size) return;
    const payload = { type: "maintenance_dashboard/restore_backup_sections", backup_id: this._backupDiffId, sections: [...this._restoreSections] };
    if (this._restoreTaskIds.size && this._restoreSections.has("tasks")) payload.task_ids = [...this._restoreTaskIds];
    await this.hass.callWS(payload);
    this._backupDiff = null; this._backupDiffId = null; this._restoreTaskIds.clear();
    await this._load();
    this._showToast(this._t("actionRestored"));
  },

  async _previewImport() {
    try {
      const payload = JSON.parse(this._importPayload || "{}");
      this._importPreview = await this.hass.callWS({ type: "maintenance_dashboard/preview_import", payload, mode: this._importMode, duplicate_mode: this._importDuplicateMode });
      this._render();
    } catch (error) { this._importPreview = null; this._showToast(String(error)); }
  },

  async _importData() {
    if (!this._importPreview?.ok) { this._showToast(this._t("previewRequired")); return; }
    const payload = JSON.parse(this._importPayload || "{}");
    await this.hass.callWS({ type: "maintenance_dashboard/import_data", payload, mode: this._importMode, duplicate_mode: this._importDuplicateMode });
    this._importPayload = ""; this._importPreview = null;
    await this._load();
    this._showToast(this._t("actionImported"));
  },

  async _restoreQuarantine(id) {
    await this.hass.callWS({ type: "maintenance_dashboard/restore_quarantine", quarantine_id: id });
    await this._load();
    this._showToast(this._t("restoreRecord"));
  },

  async _deleteQuarantine(id) {
    if (!window.confirm(this._t("deleteRecord"))) return;
    await this.hass.callWS({ type: "maintenance_dashboard/delete_quarantine", quarantine_id: id });
    await this._load();
  },

  _exportQuarantine(id = undefined) {
    const records = id ? (this._state?.quarantine || []).filter(record => record.id === id) : (this._state?.quarantine || []);
    this._downloadJson({ version: VERSION, exported_at: new Date().toISOString(), quarantine: records }, `maintenance-dashboard-quarantine-${new Date().toISOString().slice(0,10)}.json`);
  },

  async _saveGeneralSettings() {
    const checkedWidgets = new Set([...this.shadowRoot.querySelectorAll("[data-dashboard-widget]:checked")].map(el => el.dataset.dashboardWidget));
    const widgets = (this._widgetOrder || []).filter(widget => checkedWidgets.has(widget));
    const patch = {
      dashboard: {
        view_mode: this.shadowRoot.getElementById("dashboardViewMode")?.value || "cards",
        density: this.shadowRoot.getElementById("dashboardDensity")?.value || "comfortable",
        default_due_filter: this.shadowRoot.getElementById("dashboardDefaultDue")?.value || "all",
        show_quick_filters: Boolean(this.shadowRoot.getElementById("dashboardQuickFilters")?.checked),
        remember_last_view: Boolean(this.shadowRoot.getElementById("dashboardRememberView")?.checked),
        widgets,
      },
      backups: {
        maximum_count: Number(this.shadowRoot.getElementById("maximumBackups")?.value || 30),
        maximum_age_days: Number(this.shadowRoot.getElementById("maximumBackupAge")?.value || 90),
        before_task_update: Boolean(this.shadowRoot.getElementById("beforeTaskUpdate")?.checked),
        before_task_delete: Boolean(this.shadowRoot.getElementById("beforeTaskDelete")?.checked),
        before_import: Boolean(this.shadowRoot.getElementById("beforeImport")?.checked),
        before_migration: Boolean(this.shadowRoot.getElementById("beforeMigration")?.checked),
        before_restore: Boolean(this.shadowRoot.getElementById("beforeRestore")?.checked),
        before_bulk_operation: Boolean(this.shadowRoot.getElementById("beforeBulk")?.checked),
      },
      data_integrity: {
        check_on_start: Boolean(this.shadowRoot.getElementById("checkIntegrityOnStart")?.checked),
        quarantine_invalid_records: Boolean(this.shadowRoot.getElementById("quarantineInvalidRecords")?.checked),
        audit_retention: Number(this.shadowRoot.getElementById("auditRetention")?.value || 1000),
        quarantine_retention: Number(this.shadowRoot.getElementById("quarantineRetention")?.value || 200),
      },
      native_platforms: {
        todo_enabled: Boolean(this.shadowRoot.getElementById("todoPlatformEnabled")?.checked),
        calendar_enabled: Boolean(this.shadowRoot.getElementById("calendarPlatformEnabled")?.checked),
      },
    };
    await this.hass.callWS({ type: "maintenance_dashboard/update_settings", patch });
    this._layoutMode = patch.dashboard.view_mode;
    this._density = patch.dashboard.density;
    await this._load();
    this._showToast(this._t("actionSaved"));
  },

  _moveWidget(id, delta) {
    const order = [...(this._widgetOrder || [])];
    const index = order.indexOf(id);
    const target = index + delta;
    if (index < 0 || target < 0 || target >= order.length) return;
    const [item] = order.splice(index, 1);
    order.splice(target, 0, item);
    this._widgetOrder = order;
    this._render();
  },

  _dropWidget(targetId) {
    if (!this._widgetDragId || this._widgetDragId === targetId) return;
    const order = [...(this._widgetOrder || [])];
    const from = order.indexOf(this._widgetDragId);
    const to = order.indexOf(targetId);
    if (from < 0 || to < 0) return;
    const [item] = order.splice(from, 1);
    order.splice(to, 0, item);
    this._widgetDragId = null;
    this._widgetOrder = order;
    this._render();
  },

  async _restoreBackup(id) {
    if (!window.confirm(this._t("restoreBackup"))) return;
    await this.hass.callWS({ type: "maintenance_dashboard/restore_backup", backup_id: id });
    await this._load();
    this._showToast(this._t("actionRestored"));
  },
});

Object.assign(MaintenanceDashboardPanel.prototype, {
  async _move(id, delta) {
    const tasks = this._filteredTasks(true).sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
    const idx = tasks.findIndex(t => t.id === id); const target = idx + delta;
    if (idx < 0 || target < 0 || target >= tasks.length) return;
    this._lastOrder = tasks.map(t => t.id);
    const [item] = tasks.splice(idx, 1); tasks.splice(target, 0, item);
    await this.hass.callWS({ type: "maintenance_dashboard/reorder", ordered_ids: tasks.map(t => t.id) });
    await this._load();
  },
  async _dropOn(targetId) {
    if (!this._dragTaskId || this._dragTaskId === targetId) return;
    const tasks = this._filteredTasks(true).sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
    const from = tasks.findIndex(t => t.id === this._dragTaskId); const to = tasks.findIndex(t => t.id === targetId);
    if (from < 0 || to < 0) return;
    this._lastOrder = tasks.map(t => t.id);
    const [item] = tasks.splice(from, 1); tasks.splice(to, 0, item);
    this._dragTaskId = null;
    await this.hass.callWS({ type: "maintenance_dashboard/reorder", ordered_ids: tasks.map(t => t.id) });
    await this._load();
  },
  async _undoReorder() {
    if (!this._lastOrder?.length) return;
    const order = [...this._lastOrder]; this._lastOrder = null;
    await this.hass.callWS({ type: "maintenance_dashboard/reorder", ordered_ids: order });
    await this._load();
    this._showToast(this._t("actionUndo"));
  },
});


// ---- frontend/src/state.ts ----
// Draft state conversion and task focus helpers.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _draftChange(e) {
    const el = e.target;
    const key = el.dataset.draft;
    this._draft[key] = el.type === "checkbox" ? el.checked : el.value;
    if (key === "area_id") {
      const area = this._areas().find(x => x.area_id === el.value);
      this._draft.area_name = area?.name || "";
    }
    if (key === "type" && el.value === "meter") this._draft.schedule_mode = "interval";
    if (key === "season") {
      this._draft.fixed_month = String({ spring: 3, summer: 6, autumn: 9, winter: 12 }[el.value] || 9);
    }
    if (["category", "type", "schedule_mode", "calendar_repeat", "season", "priority", "notifications_inherit"].includes(key)) this._render();
  },

  _openCreate(template) {
    this._draft = { ...EMPTY, last_done: this._dateInput(new Date()) };
    if (template) this._applyTemplate(template);
    this._dialog = "create";
    this._render();
  },

  _openEdit(id) {
    const t = this._state.tasks.find(x => x.id === id);
    if (!t) return;
    const n = t.notifications || {};
    this._draft = {
      id: t.id,
      name: t.name || "",
      type: t.type || "time",
      schedule_mode: t.schedule_mode || "interval",
      calendar_repeat: t.calendar_repeat || "yearly",
      due_date: t.due_date ? this._dateInput(new Date(t.due_date)) : "",
      interval: String(t.interval || 90),
      interval_unit: t.interval_unit || "days",
      entity_id: t.entity_id || "",
      category: t.category || "general",
      custom_category: t.custom_category || "",
      area_id: t.area_id || "",
      area_name: t.area_name || "",
      priority: String(t.priority || 3),
      icon: t.icon || "mdi:wrench-clock",
      icon_color: t.icon_color || "",
      card_color: t.card_color || "",
      enabled: t.enabled !== false,
      warning_threshold: String(t.warning_threshold ?? 70),
      critical_threshold: String(t.critical_threshold ?? 90),
      description: t.description || "",
      fixed_month: String(t.fixed_month || 9),
      fixed_day: String(t.fixed_day || 1),
      season: t.season || "autumn",
      tags: Array.isArray(t.tags) ? t.tags : [],
      last_done: t.last_done ? this._dateInput(new Date(t.last_done)) : "",
      notifications_enabled: n.enabled !== false,
      notifications_inherit: n.inherit !== false,
      notifications_warning: n.warning !== false,
      notifications_critical: n.critical !== false,
      notifications_overdue: n.overdue !== false,
      notifications_unavailable: Boolean(n.unavailable),
      notifications_once_per_status: n.once_per_status !== false,
      notifications_repeat_days: String(n.repeat_days ?? 3),
      notifications_escalation_enabled: n.escalation_enabled !== false,
      notifications_escalation_after_days: String(n.escalation_after_days ?? 3),
      notifications_actionable: n.actionable !== false,
      notifications_notify_service: n.notify_service || "",
    };
    this._dialog = "edit";
    this._render();
  },

  _applyTemplate(t) {
    if (!t) return;
    const seasonMonth = { spring: 3, summer: 6, autumn: 9, winter: 12 }[t.season] || t.fixed_month || 9;
    Object.assign(this._draft, {
      name: t.name || this._draft.name,
      type: t.type || "time",
      schedule_mode: t.schedule_mode || "interval",
      calendar_repeat: t.calendar_repeat || "yearly",
      due_date: t.due_date || "",
      interval: String(t.interval || this._draft.interval),
      interval_unit: t.interval_unit || "days",
      category: t.category || "general",
      area_name: t.area_name || "",
      priority: String(t.priority || 3),
      icon: t.icon || "mdi:wrench-clock",
      description: t.description || "",
      fixed_month: String(seasonMonth),
      fixed_day: String(t.fixed_day || 1),
      season: t.season || "autumn",
      tags: Array.isArray(t.tags) ? [...t.tags] : [],
      template_id: t.id,
    });
  },

  _draftToTask() {
    const area = this._areas().find(a => a.area_id === this._draft.area_id);
    const parseDate = value => value ? new Date(value).toISOString() : undefined;
    return {
      name: this._draft.name.trim(),
      type: this._draft.type,
      schedule_mode: this._draft.schedule_mode || "interval",
      calendar_repeat: this._draft.calendar_repeat || "yearly",
      due_date: this._draft.schedule_mode === "one_time" ? parseDate(this._draft.due_date) : undefined,
      interval: Number(this._draft.interval) || 1,
      interval_unit: this._draft.interval_unit,
      entity_id: this._draft.entity_id || undefined,
      category: this._draft.category,
      custom_category: this._draft.category === "custom" ? this._draft.custom_category.trim() : undefined,
      area_id: this._draft.area_id || undefined,
      area_name: area?.name || this._draft.area_name || undefined,
      priority: Number(this._draft.priority) || 3,
      icon: this._draft.icon || "mdi:wrench-clock",
      icon_color: this._draft.icon_color || undefined,
      card_color: this._draft.card_color || undefined,
      enabled: Boolean(this._draft.enabled),
      warning_threshold: Number(this._draft.warning_threshold) || 70,
      critical_threshold: Number(this._draft.critical_threshold) || 90,
      description: this._draft.description || "",
      fixed_month: Number(this._draft.fixed_month) || 1,
      fixed_day: Number(this._draft.fixed_day) || 1,
      season: this._draft.schedule_mode === "seasonal" ? this._draft.season || "autumn" : undefined,
      tags: Array.isArray(this._draft.tags) ? this._draft.tags : String(this._draft.tags || "").split(",").map(x => x.trim()).filter(Boolean),
      template_id: this._draft.template_id || undefined,
      last_done: this._draft.last_done ? parseDate(this._draft.last_done) : undefined,
      notifications: {
        enabled: Boolean(this._draft.notifications_enabled),
        inherit: Boolean(this._draft.notifications_inherit),
        warning: Boolean(this._draft.notifications_warning),
        critical: Boolean(this._draft.notifications_critical),
        overdue: Boolean(this._draft.notifications_overdue),
        unavailable: Boolean(this._draft.notifications_unavailable),
        once_per_status: Boolean(this._draft.notifications_once_per_status),
        repeat_days: Number(this._draft.notifications_repeat_days) || 0,
        escalation_enabled: Boolean(this._draft.notifications_escalation_enabled),
        escalation_after_days: Number(this._draft.notifications_escalation_after_days) || 0,
        actionable: Boolean(this._draft.notifications_actionable),
        notify_service: String(this._draft.notifications_notify_service || "").trim(),
      },
    };
  },

  _focusTask(id) {
    if (!id) return;
    this._view = "dashboard";
    this._statusFilter = "all";
    this._showCompleted = true;
    this._search = "";
    this._render();
    requestAnimationFrame(() => {
      const card = this.shadowRoot.querySelector(`[data-task-card="${CSS.escape(id)}"]`);
      if (!card) return;
      card.scrollIntoView({ behavior: "smooth", block: "center" });
      card.classList.remove("focus-pulse");
      void card.offsetWidth;
      card.classList.add("focus-pulse");
      setTimeout(() => card.classList.remove("focus-pulse"), 1800);
    });
  },

  _openCompletion(id) {
    this._completionDialog = id;
    this._completionNote = "";
    this._completionMaterial = "";
    this._completionCost = "";
    this._completionCurrency = "EUR";
    this._completionPerformedBy = "";
    this._render();
  }
});


// ---- frontend/src/utils.ts ----
// Shared frontend formatting, sorting, filtering and UI utility helpers.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _randomColor(list) { return list[Math.floor(Math.random() * list.length)] || "#00bcd4"; },

  _randomizeColors(target = "both") {
    if (target === "both" || target === "icon") this._draft.icon_color = this._randomColor(COLOR_PALETTE);
    if (target === "both" || target === "card") this._draft.card_color = this._randomColor(CARD_COLOR_PALETTE);
    this._render();
  },

  _priorityLabel(value) {
    const normalized = Math.min(5, Math.max(1, Number(value) || 3));
    return PRIORITY_LABELS[this._lang()]?.[normalized] || PRIORITY_LABELS.en[normalized] || String(normalized);
  },

  _scheduleModeLabel(value) {
    return { interval: this._t("intervalSchedule"), one_time: this._t("oneTime"), fixed_date: this._t("fixedDate"), seasonal: this._t("seasonal") }[value] || value;
  },

  _bulkActionLabel(value) {
    return ({
      done: this._t("bulkDone"),
      snooze: this._t("bulkSnooze"),
      clear_snooze: this._t("bulkClearSnooze"),
      category: this._t("bulkCategory"),
      area: this._t("bulkArea"),
      priority: this._t("bulkPriority"),
      enable: this._t("bulkEnable"),
      disable: this._t("bulkDisable"),
      delete: this._t("bulkDelete"),
      restore: this._t("bulkRestore"),
      duplicate: this._t("bulkDuplicate"),
    })[value] || value;
  },

  _statusAccent(status, fallback) {
    return STATUS_ACCENTS[status] || fallback || "var(--primary-color)";
  },

  _cycleNextTask(delta) {
    const total = this._nextTaskCandidates().length;
    if (!total) return;
    this._nextTaskOffset = (this._nextTaskOffset + delta + total) % total;
    this._render();
  },

  _showToast(message) {
    if (!message) return;
    this._toast = message;
    if (this._toastTimer) clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => { this._toast = null; this._render(); }, 3200);
    this._render();
  },

  _toastHtml() {
    return this._toast ? `<aside class="toast"><ha-icon icon="mdi:check-circle-outline"></ha-icon><span>${this._html(this._toast)}</span></aside>` : "";
  },

  _emptyMessage(icon, message, action = "") {
    return `<section class="empty compact-empty"><div class="empty-orb"><ha-icon icon="${icon}"></ha-icon></div><h2>${this._html(message)}</h2>${action}</section>`;
  },

  _filteredTasks(includeDeleted) {
    return (this._state?.tasks || [])
      .filter(task => includeDeleted || !task.deleted)
      .filter(task => {
        const status = this._state?.runtime?.[task.id]?.status;
        if (!includeDeleted && status === "completed" && !this._showCompleted && this._statusFilter !== "completed") return false;
        return true;
      })
      .filter(task => this._matches(task))
      .filter(task => this._statusFilter === "all" || this._state?.runtime?.[task.id]?.status === this._statusFilter)
      .filter(task => this._categoryFilter === "all" || task.category === this._categoryFilter)
      .filter(task => this._areaFilter === "all" || (task.area_id || task.area_name || "") === this._areaFilter)
      .filter(task => this._priorityFilter === "all" || Number(task.priority) === Number(this._priorityFilter))
      .filter(task => this._scheduleFilter === "all" || task.schedule_mode === this._scheduleFilter)
      .filter(task => this._matchesDueFilter(task))
      .filter(task => !this._tagFilter.trim() || (task.tags || []).some(tag => String(tag).toLowerCase().includes(this._tagFilter.trim().toLowerCase())))
      .filter(task => this._entityFilter === "all" || (this._entityFilter === "available" ? Boolean(task.entity_id && this.hass?.states?.[task.entity_id]) : !task.entity_id || !this.hass?.states?.[task.entity_id]))
      .sort((a, b) => this._compareTasks(a, b));
  },

  _compareTasks(a, b) {
    const ar = this._state?.runtime[a.id] || {};
    const br = this._state?.runtime[b.id] || {};
    if (this._sortMode === "position") return (a.position ?? 0) - (b.position ?? 0);
    if (this._sortMode === "priority") return (b.priority ?? 0) - (a.priority ?? 0) || this._dueValue(ar) - this._dueValue(br);
    if (this._sortMode === "due") return this._dueValue(ar) - this._dueValue(br);
    if (this._sortMode === "status") return (STATUS_ORDER[ar.status] ?? 99) - (STATUS_ORDER[br.status] ?? 99) || (b.priority ?? 0) - (a.priority ?? 0);
    if (this._sortMode === "name") return String(a.name || "").localeCompare(String(b.name || ""), this._lang());
    if (this._sortMode === "area") return String(a.area_name || a.area_id || "").localeCompare(String(b.area_name || b.area_id || ""), this._lang()) || String(a.name || "").localeCompare(String(b.name || ""), this._lang());
    if (this._sortMode === "created") return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
    if (this._sortMode === "updated") return new Date(b.updated_at || 0).getTime() - new Date(a.updated_at || 0).getTime();
    return (STATUS_ORDER[ar.status] ?? 99) - (STATUS_ORDER[br.status] ?? 99) || (b.priority ?? 0) - (a.priority ?? 0) || this._dueValue(ar) - this._dueValue(br) || (a.position ?? 0) - (b.position ?? 0);
  },

  _dueValue(runtime) { return runtime?.due_at ? new Date(runtime.due_at).getTime() : Number.MAX_SAFE_INTEGER; },

  _matches(task) {
    const q = this._search.trim().toLowerCase();
    if (!q) return true;
    return [task.name, task.description, task.area_name, task.category, task.custom_category, ...(task.tags || [])]
      .filter(Boolean).join(" ").toLowerCase().includes(q);
  },

  _snoozeOptions(task) { const days = this._intervalAsDays(task); if (days <= 30) return [1, 3, 7]; if (days <= 90) return [1, 3, 7, 14]; return [1, 3, 7, 14, 30]; },

  _intervalAsDays(task) { const n = Number(task.interval) || 1; const u = task.interval_unit || "days"; if (u === "hours") return Math.max(1, Math.ceil(n / 24)); if (u === "weeks") return n * 7; if (u === "months") return n * 30; return n; },

  _template(id) { return (this._state.templates || []).find(t => t.id === id); },

  _areas() { const raw = this.hass?.areas; if (!raw) return []; return Array.isArray(raw) ? raw : Object.values(raw); },

  _categoryLabel(task) { return task.category === "custom" ? this._html(task.custom_category || this._t("custom")) : this._t(task.category || "general"); },

  _unitLabel(unit) { return this._t(unit || "days"); },

  _date(value) { if (!value) return "—"; return new Intl.DateTimeFormat(this._lang() === "de" ? "de-DE" : "en-US", { dateStyle: "medium" }).format(new Date(value)); },

  _datetime(value) { if (!value) return "—"; return new Intl.DateTimeFormat(this._lang() === "de" ? "de-DE" : "en-US", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value)); },

  _dateInput(date) { return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}T${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`; },

  _remaining(runtime, task) { if (!runtime || runtime.remaining == null) return "—"; const unit = task.schedule_mode && task.schedule_mode !== "interval" ? "days" : task.interval_unit; return `${Math.ceil(Math.abs(runtime.remaining))} ${this._unitLabel(unit)} ${runtime.remaining < 0 ? this._t("overdue") : this._t("remaining")}`; },

  _runtimeSummary(runtime) { return `${this._t("progress")}: ${Math.round(runtime.progress || 0)}%, ${this._t("remaining")}: ${runtime.remaining ?? "—"}`; },

  _scheduleSummary(task) {
    const mode = task?.schedule_mode || "interval";
    if (mode === "one_time") return `${this._t("oneTime")} · ${this._date(task.due_date)}`;
    if (mode === "fixed_date") {
      if (task.calendar_repeat === "monthly") return `${this._t("monthly")} · ${this._t("fixedDay")} ${task.fixed_day || 1}`;
      return `${this._t("yearly")} · ${String(task.fixed_day || 1).padStart(2,"0")}.${String(task.fixed_month || 1).padStart(2,"0")}.`;
    }
    if (mode === "seasonal") return `${this._t("seasonal")} · ${this._t(task.season || "autumn")}`;
    return `${task.interval} ${this._unitLabel(task.interval_unit)}`;
  },

  _matchesDueFilter(task) {
    if (this._dueFilter === "all") return true;
    const dueAt = this._state?.runtime?.[task.id]?.due_at;
    if (this._dueFilter === "no_due") return !dueAt;
    if (!dueAt) return false;
    const due = new Date(dueAt);
    const now = new Date();
    const endToday = new Date(now); endToday.setHours(23, 59, 59, 999);
    const endWeek = new Date(endToday); endWeek.setDate(endWeek.getDate() + 7);
    const endNext14 = new Date(endToday); endNext14.setDate(endNext14.getDate() + 14);
    const endNext90 = new Date(endToday); endNext90.setDate(endNext90.getDate() + 90);
    const endMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
    if (this._dueFilter === "overdue") return due < now;
    if (this._dueFilter === "today") return due >= new Date(now.getFullYear(), now.getMonth(), now.getDate()) && due <= endToday;
    if (this._dueFilter === "week") return due > endToday && due <= endWeek;
    if (this._dueFilter === "next14") return due > endWeek && due <= endNext14;
    if (this._dueFilter === "month") return due > endWeek && due <= endMonth;
    if (this._dueFilter === "next90") return due > endMonth && due <= endNext90;
    if (this._dueFilter === "later") return due > endNext90;
    return true;
  },

  _dueFilterLabel(value) {
    return ({ all: this._t("all"), overdue: this._t("overdue"), today: this._t("today"), week: this._t("thisWeek"), next14: this._t("next14Days"), month: this._t("thisMonth"), next90: this._t("next90Days"), later: this._t("later"), no_due: this._t("noDueDate") })[value] || value;
  },

  _countByStatus(status) {
    return (this._state?.tasks || []).filter(task => !task.deleted && this._state?.runtime?.[task.id]?.status === status).length;
  },

  _countDueByFilter(filter) {
    const previous = this._dueFilter;
    this._dueFilter = filter;
    const count = (this._state?.tasks || []).filter(task => !task.deleted && this._matchesDueFilter(task)).length;
    this._dueFilter = previous;
    return count;
  },

  _countHighPriority() {
    return (this._state?.tasks || []).filter(task => !task.deleted && Number(task.priority || 0) >= 5).length;
  },

  _countMissingEntities() {
    return (this._state?.tasks || []).filter(task => !task.deleted && (!task.entity_id || !this.hass?.states?.[task.entity_id])).length;
  },

  _countByTaskType(type) {
    return (this._state?.tasks || []).filter(task => !task.deleted && task.type === type).length;
  },

  _countBySchedule(mode) {
    return (this._state?.tasks || []).filter(task => !task.deleted && task.schedule_mode === mode).length;
  },

  _currentFilterPayload() {
    return {
      search: this._search,
      status: this._statusFilter,
      category: this._categoryFilter,
      area: this._areaFilter,
      priority: this._priorityFilter,
      schedule: this._scheduleFilter,
      due: this._dueFilter,
      tag: this._tagFilter,
      entity: this._entityFilter,
      sort: this._sortMode,
      show_completed: this._showCompleted,
    };
  },

  _applyFilterPayload(filter = {}) {
    this._search = filter.search || "";
    this._statusFilter = filter.status || "all";
    this._categoryFilter = filter.category || "all";
    this._areaFilter = filter.area || "all";
    this._priorityFilter = filter.priority || "all";
    this._scheduleFilter = filter.schedule || "all";
    this._dueFilter = filter.due || "all";
    this._tagFilter = filter.tag || "";
    this._entityFilter = filter.entity || "all";
    this._sortMode = filter.sort || "smart";
    this._showCompleted = Boolean(filter.show_completed);
  },

  _dashboardWidgetEnabled(key) {
    const widgets = this._state?.settings?.dashboard?.widgets || [];
    return widgets.includes(key);
  },

  _selectedTaskList() {
    return [...this._selectedTasks].filter(id => (this._state?.tasks || []).some(task => task.id === id));
  },

  _applyQuickFilter(kind, value) {
    if (kind === "status") this._statusFilter = value || "all";
    if (kind === "due") this._dueFilter = value || "all";
    if (kind === "priority") this._priorityFilter = value || "all";
    if (kind === "entity") this._entityFilter = value || "all";
    this._render();
  },

});


// ---- frontend/src/styles.ts ----
// Panel stylesheet.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _styles() {
    return `<style>
    :host{display:block;min-height:100vh;background:var(--primary-background-color);color:var(--primary-text-color);}
    .shell{min-height:100vh;box-sizing:border-box;padding:24px 32px;max-width:1880px;margin:0 auto;}
    .hero{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:18px 4px 22px;border-bottom:1px solid var(--divider-color);margin-bottom:18px;}
    .hero-brand{display:flex;align-items:center;gap:16px;min-width:0}.hero-logo{width:58px;height:58px;border-radius:18px;object-fit:contain;filter:drop-shadow(0 8px 20px rgb(0 0 0 / 28%));flex:0 0 auto}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}.icon-nav{min-width:48px;padding:0 14px}.icon-nav .sr-only{display:none}
    .eyebrow{margin:0 0 6px;color:var(--primary-color);font-weight:850;letter-spacing:.08em;text-transform:uppercase;font-size:.72rem;} h1{margin:0;font-size:clamp(1.5rem,3vw,2.6rem);letter-spacing:-.045em;} h2,h3,h4{margin:0;} p{margin:0;color:var(--secondary-text-color);} button,input,select,textarea{font:inherit;} button{cursor:pointer;transition:transform .1s ease,background .15s ease,border-color .15s ease;} button:active{transform:scale(.97);} button[disabled]{opacity:.45;pointer-events:none;}
    .hero-actions,.empty-actions,footer,.actions,.button-row{display:flex;gap:10px;flex-wrap:wrap;align-items:center;}.nav,.ghost,.primary,.icon{display:inline-flex;align-items:center;justify-content:center;gap:8px;border-radius:999px;border:1px solid var(--divider-color);min-height:40px;padding:0 16px;background:color-mix(in srgb,var(--card-background-color) 92%,transparent);color:var(--primary-text-color);} .nav.active,.ghost:hover{background:color-mix(in srgb,var(--primary-color) 18%,transparent);border-color:color-mix(in srgb,var(--primary-color) 55%,var(--divider-color));}.primary{border:0;background:var(--primary-color);color:var(--text-primary-color);font-weight:850;}.big{min-height:48px;padding:0 22px;}.icon,.icon-only{width:40px;min-width:40px;padding:0;color:var(--secondary-text-color);}.danger{color:var(--error-color);}
    .kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:14px;margin-bottom:18px;}.kpi,.panel,.toolbar,.task-card,.empty,.template-card,.settings-row,.template-group{border:1px solid var(--divider-color);border-radius:24px;background:var(--card-background-color);box-shadow:var(--ha-card-box-shadow);}.kpi{display:flex;gap:13px;align-items:center;min-height:86px;padding:16px;overflow:hidden;}.kpi.next-kpi{cursor:pointer;position:relative}.kpi.warning{--kpi-accent:var(--warning-color)}.kpi.critical,.kpi.overdue{--kpi-accent:var(--error-color)}.kpi.unavailable{--kpi-accent:var(--disabled-text-color)}.kpi.next-kpi ha-icon{color:var(--kpi-accent,var(--primary-color));background:color-mix(in srgb,var(--kpi-accent,var(--primary-color)) 16%,transparent)}.kpi.next-kpi:hover{border-color:color-mix(in srgb,var(--primary-color) 55%,var(--divider-color));background:linear-gradient(135deg,color-mix(in srgb,var(--primary-color) 9%,transparent),transparent 55%),var(--card-background-color);}.kpi ha-icon{padding:12px;border-radius:16px;background:color-mix(in srgb,var(--primary-color) 16%,transparent);color:var(--primary-color);flex:0 0 auto;}.kpi small{color:var(--secondary-text-color);text-transform:uppercase;font-size:.72rem;font-weight:900;}.kpi strong{display:block;font-size:1.25rem;margin-top:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}.kpi span{display:block;color:var(--secondary-text-color);font-size:.76rem;margin-top:2px;line-height:1.25;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}.next-kpi-body{min-width:0;flex:1}.next-cycle{display:flex;align-items:center;gap:4px;margin-left:auto;padding-left:6px;color:var(--secondary-text-color);font-size:.75rem;font-weight:850}.next-cycle button{display:grid;place-items:center;width:26px;height:26px;border-radius:999px;border:1px solid var(--divider-color);background:transparent;color:var(--primary-text-color);padding:0}.next-cycle ha-icon{padding:0;background:transparent;color:inherit;--mdc-icon-size:18px}
    .toolbar{display:grid;grid-template-columns:minmax(260px,1.1fr) minmax(320px,1.9fr);gap:18px;padding:18px;margin-bottom:18px;align-items:center;}.toolbar-copy{display:grid;gap:6px;align-self:stretch;align-content:center;}.toolbar-copy h2{font-size:1.6rem;letter-spacing:-.03em}.toolbar-main{display:grid;grid-template-columns:minmax(220px,auto) minmax(260px,1fr) minmax(140px,170px) minmax(140px,170px);gap:12px;align-items:end;}.toolbar label{display:grid;gap:5px;color:var(--secondary-text-color);font-size:.75rem;font-weight:850;}.templates-main{grid-template-columns:minmax(260px,1fr) repeat(2,minmax(180px,max-content)) minmax(220px,max-content);}.expressive{background:radial-gradient(circle at 15% 0%,color-mix(in srgb,var(--primary-color) 16%,transparent),transparent 35%),var(--card-background-color);}.search,select,input,textarea{background:var(--input-fill-color,color-mix(in srgb,var(--primary-text-color) 7%,transparent));color:var(--primary-text-color);border:1px solid var(--divider-color);border-radius:14px;min-height:42px;padding:0 12px;outline:none;}.search{min-width:0;width:100%;}textarea{min-height:90px;padding:12px;resize:vertical;}
    .task-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,380px),1fr));gap:18px;align-items:stretch;}.task-card{--task-accent:var(--primary-color);position:relative;padding:18px;display:grid;grid-template-rows:auto auto auto auto 1fr auto;gap:14px;min-width:0;border-color:color-mix(in srgb,var(--task-accent) 34%,var(--divider-color));background:linear-gradient(135deg,color-mix(in srgb,var(--task-accent) 8%,transparent),transparent 42%),var(--card-background-color);overflow:visible;}.task-card header{display:flex;justify-content:space-between;gap:12px;align-items:flex-start;}.title-row{display:flex;gap:12px;align-items:flex-start;min-width:0;}.title-row h3{overflow-wrap:anywhere;line-height:1.25;}.icon-chip{display:grid;place-items:center;width:42px;height:42px;border-radius:16px;background:color-mix(in srgb,var(--task-accent) 15%,transparent);color:var(--task-accent);flex:0 0 auto;}.status{border-radius:999px;padding:5px 9px;font-weight:850;font-size:.72rem;background:color-mix(in srgb,var(--primary-text-color) 8%,transparent);white-space:nowrap;}.status.warning{color:var(--warning-color);background:color-mix(in srgb,var(--warning-color) 15%,transparent);}.status.critical,.status.overdue{color:var(--error-color);background:color-mix(in srgb,var(--error-color) 15%,transparent);}.status.snoozed{color:var(--primary-color);background:color-mix(in srgb,var(--primary-color) 15%,transparent);}.description{line-height:1.45;min-height:2.7em;}.progress-line{display:flex;justify-content:space-between;color:var(--secondary-text-color);}.progress{height:12px;background:color-mix(in srgb,var(--disabled-text-color) 16%,transparent);border-radius:999px;overflow:hidden;}.progress div{height:100%;background:var(--task-accent);border-radius:999px;}.task-card.overdue,.task-card.critical{border-color:color-mix(in srgb,var(--error-color) 62%,var(--divider-color));}.task-card.warning{border-color:color-mix(in srgb,var(--warning-color) 62%,var(--divider-color));}.task-card.unavailable{border-color:color-mix(in srgb,var(--disabled-text-color) 55%,var(--divider-color));}.meta-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;}.meta-grid div{background:color-mix(in srgb,var(--primary-text-color) 4%,transparent);border-radius:16px;padding:10px;min-width:0;}.meta-grid span{display:block;color:var(--secondary-text-color);font-size:.70rem;font-weight:850;text-transform:uppercase;}.meta-grid strong{display:block;margin-top:4px;overflow:hidden;text-overflow:ellipsis;}.meta-grid em{font-style:normal;color:var(--secondary-text-color);font-size:.8rem;margin-left:6px;}.snooze-note{display:flex;align-items:center;gap:7px;padding:9px 11px;border-radius:14px;background:color-mix(in srgb,var(--primary-color) 12%,transparent);color:var(--primary-color);font-weight:850;}.snooze-wrap{position:relative;}.snooze-menu{position:absolute;right:0;bottom:48px;z-index:20;display:grid;gap:6px;min-width:170px;padding:10px;border:1px solid var(--divider-color);border-radius:18px;background:var(--card-background-color);box-shadow:0 16px 40px rgb(0 0 0 / 35%);}.snooze-menu strong{font-size:.8rem;color:var(--secondary-text-color);}.snooze-menu button{border:0;border-radius:12px;min-height:34px;background:color-mix(in srgb,var(--primary-text-color) 6%,transparent);color:var(--primary-text-color);}@keyframes task-focus-pulse{0%{transform:scale(1);box-shadow:0 0 0 0 color-mix(in srgb,var(--task-accent) 50%,transparent)}20%{transform:scale(1.015);box-shadow:0 0 0 7px color-mix(in srgb,var(--task-accent) 26%,transparent)}45%{transform:scale(.997);box-shadow:0 0 0 13px color-mix(in srgb,var(--task-accent) 12%,transparent)}70%{transform:scale(1.008);box-shadow:0 0 0 5px color-mix(in srgb,var(--task-accent) 22%,transparent)}100%{transform:scale(1);box-shadow:var(--ha-card-box-shadow)}}.task-card.focus-pulse{animation:task-focus-pulse 1.45s ease both;z-index:5;}
    .empty{min-height:330px;display:grid;place-items:center;text-align:center;padding:34px;gap:14px;}.empty-orb{display:grid;place-items:center;width:90px;height:90px;border-radius:32px;color:var(--primary-color);background:radial-gradient(circle,color-mix(in srgb,var(--primary-color) 28%,transparent),color-mix(in srgb,var(--primary-color) 8%,transparent));}.empty-orb ha-icon{--mdc-icon-size:46px;}.template-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr));gap:16px;}.template-group{padding:18px;margin-bottom:18px;display:grid;gap:16px}.template-group-header{display:flex;align-items:end;justify-content:space-between;gap:12px;padding-bottom:6px;border-bottom:1px solid color-mix(in srgb,var(--primary-text-color) 10%,transparent)}.template-group-header span{display:inline-grid;place-items:center;min-width:36px;height:36px;padding:0 10px;border-radius:999px;background:color-mix(in srgb,var(--primary-color) 12%,transparent);color:var(--primary-color);font-weight:850}.template-card{padding:16px;display:grid;gap:12px;}.template-card.selected{border-color:color-mix(in srgb,var(--primary-color) 60%,var(--divider-color));background:linear-gradient(135deg,color-mix(in srgb,var(--primary-color) 10%,transparent),transparent 50%),var(--card-background-color);}.template-card header{display:flex;align-items:center;gap:10px;}.template-card h3{line-height:1.25;}.template-check input{display:none;}.template-check span{display:grid;width:22px;height:22px;border-radius:7px;border:1px solid var(--divider-color);background:color-mix(in srgb,var(--primary-text-color) 4%,transparent);}.template-check input:checked + span{background:var(--primary-color);border-color:var(--primary-color);}.template-check input:checked + span:after{content:'✓';color:var(--text-primary-color);font-weight:900;text-align:center;line-height:21px;}.panel{padding:18px;margin-bottom:16px;}.history-dialog .panel{margin-bottom:0;border:0;background:transparent;box-shadow:none;padding:0;}.history-list,.settings-list{display:grid;gap:10px;}.history-row,.settings-row{display:flex;align-items:center;gap:12px;padding:13px;}.history-row div,.settings-row div{flex:1;}.history-row small,.settings-row small{display:block;color:var(--secondary-text-color);margin-top:3px;}.settings-head{display:flex;align-items:center;justify-content:space-between;gap:14px;}.drag{color:var(--secondary-text-color);cursor:grab;}
    .dialog-backdrop{position:fixed;inset:0;z-index:2147483000;display:grid;place-items:center;padding:24px;background:rgb(3 5 14 / 94%);}.dialog{width:min(1060px,100%);max-height:90vh;overflow:auto;border-radius:28px;background:var(--card-background-color);border:1px solid var(--divider-color);box-shadow:0 28px 90px rgb(0 0 0 / 48%);}.dialog.small{width:min(760px,100%);}.dialog>header,.dialog>footer{padding:18px 22px;border-bottom:1px solid var(--divider-color);display:flex;justify-content:space-between;align-items:center;}.dialog>footer{border-top:1px solid var(--divider-color);border-bottom:0;justify-content:flex-end;}.dialog-body{display:grid;gap:16px;padding:18px;}.dialog-section{display:grid;gap:14px;padding:16px;border:1px solid var(--divider-color);border-radius:20px;background:color-mix(in srgb,var(--primary-text-color) 2%,transparent);}.dialog-section .section-hint{margin:0;color:var(--secondary-text-color);font-size:.82rem;line-height:1.35}.form-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:14px;}.appearance-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;align-items:start}.appearance-icon-field{grid-column:1 / -1}.field,.entity-field,.description-field{display:grid;gap:7px;color:var(--secondary-text-color);font-size:.78rem;font-weight:850;}.field input[type=color]{width:56px;height:44px;padding:4px;border-radius:13px}.color-input-row{display:flex;align-items:center;gap:8px}.color-field input[type=color]{flex:0 0 auto}.color-actions{display:flex;flex-wrap:wrap;gap:10px}.ghost.small{min-height:34px;padding:0 10px}.icon-picker-field{min-width:0}.icon-picker-field ha-icon-picker{width:100%;max-width:100%;display:block}.check{display:flex;gap:10px;align-items:center;font-weight:850;}.template-strip,.icon-grid{display:flex;flex-wrap:wrap;gap:8px;}.template-pill,.icon-choice{border:1px solid var(--divider-color);border-radius:999px;min-height:36px;padding:0 12px;background:transparent;color:var(--primary-text-color);display:inline-flex;gap:7px;align-items:center;}.icon-choice{width:42px;padding:0;justify-content:center;}.inline-priority{display:grid;gap:12px;margin-top:4px;padding:14px;border-radius:18px;background:color-mix(in srgb,var(--primary-text-color) 3%,transparent);}.priority-head{display:flex;align-items:start;justify-content:space-between;gap:12px}.priority-head strong{font-size:1rem}.priority-slider{width:100%;accent-color:var(--primary-color);min-height:28px;padding:0;border:0;background:transparent}.priority-scale{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px}.priority-scale span{font-size:.74rem;color:var(--secondary-text-color);text-align:center;padding-top:4px}.priority-scale span.active{color:var(--primary-text-color);font-weight:850}.error{color:var(--error-color);font-weight:850;padding:12px;border-radius:14px;background:color-mix(in srgb,var(--error-color) 12%,transparent);}.backup-row{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px;border:1px solid var(--divider-color);border-radius:14px;}.toast{position:fixed;right:22px;bottom:22px;z-index:2147483001;display:flex;align-items:center;gap:10px;max-width:min(420px,calc(100vw - 32px));padding:13px 16px;border-radius:18px;background:color-mix(in srgb,var(--card-background-color) 96%,black);border:1px solid color-mix(in srgb,var(--primary-color) 38%,var(--divider-color));box-shadow:0 18px 55px rgb(0 0 0 / 42%);font-weight:850}.toast ha-icon{color:var(--primary-color)}@media(max-width:820px){.appearance-grid{grid-template-columns:1fr}.dialog{border-radius:20px}.dialog-backdrop{padding:10px}}
    @media (max-width:980px){.toolbar,.templates-toolbar{grid-template-columns:1fr}.toolbar-main,.templates-main{grid-template-columns:1fr 1fr}.toolbar-main>.primary.big,.templates-main>.primary.big{grid-column:1/-1}.templates-main .search{grid-column:1/-1}}
    @media (max-width:760px){.shell{padding:12px}.hero,.settings-head{flex-direction:column;align-items:stretch}.hero-brand{align-items:flex-start}.hero-logo{width:46px;height:46px}.hero-actions,.empty-actions,footer,.actions{flex-direction:column;align-items:stretch}.task-grid,.template-grid{grid-template-columns:1fr}.dialog-backdrop{padding:8px}.snooze-menu{left:0;right:auto}}
    .category-tabs{display:flex;gap:8px;overflow-x:auto;padding:4px 0 16px;scrollbar-width:thin}.tab{border:1px solid var(--divider-color);border-radius:999px;background:transparent;color:var(--primary-text-color);padding:10px 14px;white-space:nowrap;font-weight:800}.tab.active{background:color-mix(in srgb,var(--primary-color) 24%,transparent);border-color:color-mix(in srgb,var(--primary-color) 70%,var(--divider-color));}.template-grid.compact{grid-template-columns:repeat(auto-fill,minmax(min(100%,260px),1fr));}.template-card.compact p{display:none}.template-card.compact footer{display:flex;gap:8px;align-items:center}.settings-actions{display:flex;gap:10px;flex-wrap:wrap}.toggle-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px}.toggle-grid .check{padding:10px;border:1px solid var(--divider-color);border-radius:14px;background:color-mix(in srgb,var(--primary-text-color) 3%,transparent)}.diagnostic-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px}.diagnostic-grid div{padding:10px;border-radius:14px;background:color-mix(in srgb,var(--primary-text-color) 4%,transparent)}.diagnostic-grid span{display:block;color:var(--secondary-text-color);font-size:.72rem;text-transform:uppercase;font-weight:850}.template-preview>ha-icon{--mdc-icon-size:44px;color:var(--primary-color)}
    @media (max-width: 620px){.shell{padding:10px}.hero{gap:12px;border-bottom:0;margin-bottom:8px;padding-bottom:8px}.hero-brand{display:grid;grid-template-columns:42px 1fr;gap:10px}.hero-brand h1{font-size:1.35rem}.hero-brand p:not(.eyebrow){font-size:.8rem;line-height:1.25}.hero-actions{display:grid;grid-template-columns:1fr 1fr 44px 44px;gap:8px}.hero-actions .nav{min-height:42px;padding:0 10px}.hero-actions .icon-nav{width:auto}.kpis{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.kpi{min-height:98px;padding:12px}.kpi strong{font-size:1.05rem}.kpi span{font-size:.72rem;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.toolbar{padding:12px}.toolbar-main,.templates-main{grid-template-columns:1fr;gap:10px}.toolbar .primary.big,.templates-main .primary.big,.templates-main .search{grid-column:auto}.search{width:100%;min-width:0}.task-card{padding:14px;border-radius:22px}.task-card header{align-items:flex-start}.description{min-height:auto;font-size:.9rem}.meta-grid{grid-template-columns:1fr 1fr;gap:8px}.meta-grid div{padding:9px}.actions{display:grid!important;grid-template-columns:44px 44px 1fr;gap:8px}.actions .ghost:not(.icon-only){grid-column:1/-1}.actions .primary{min-width:0}.template-grid.compact{grid-template-columns:1fr}.template-card.compact{padding:14px}.template-card.compact footer{display:grid;grid-template-columns:1fr 1fr}.dialog-backdrop{align-items:end;place-items:end stretch;padding:0}.dialog{max-height:94vh;width:100%;border-radius:24px 24px 0 0}.dialog.small{width:100%}.dialog>header,.dialog>footer{padding:14px 16px}.dialog-body{padding:14px}.form-grid,.appearance-grid{grid-template-columns:1fr}.toast{left:10px;right:10px;bottom:10px}.category-tabs{margin:0 -4px;padding:2px 4px 12px}.settings-row{display:grid;grid-template-columns:28px 28px 1fr 36px 36px;gap:8px}.settings-row .danger{grid-column:5}.settings-actions{display:grid;grid-template-columns:1fr}.history-row{align-items:flex-start}.next-cycle{align-self:end}.priority-head{display:grid;gap:6px}.priority-scale{grid-template-columns:1fr}.priority-scale span{text-align:left}.template-group{padding:14px}}

    .schedule-callout{display:flex;gap:12px;align-items:flex-start;padding:14px;border-radius:18px;background:color-mix(in srgb,var(--primary-color) 10%,transparent);border:1px solid color-mix(in srgb,var(--primary-color) 24%,var(--divider-color));}.schedule-callout ha-icon{color:var(--primary-color);flex:0 0 auto}.schedule-chip{display:inline-flex;align-items:center;gap:7px;width:max-content;max-width:100%;padding:7px 10px;border-radius:999px;background:color-mix(in srgb,var(--task-accent) 10%,transparent);color:var(--secondary-text-color);font-size:.78rem;font-weight:800}.schedule-chip span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.task-card.completed{opacity:.88;border-style:dashed}.task-card.completed .progress div{background:var(--success-color,#4caf50)}.dashboard-main{grid-template-columns:minmax(220px,auto) minmax(260px,1fr) minmax(130px,160px) minmax(130px,160px) auto}.completed-toggle{align-self:end;min-height:42px}
    .template-filter-bar{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:18px}.template-secondary-filters{display:flex;align-items:end;gap:10px;flex-wrap:wrap}.template-secondary-filters label:not(.check){display:grid;gap:5px;color:var(--secondary-text-color);font-size:.75rem;font-weight:850}.compact-check{min-height:42px;padding:0 12px;border:1px solid var(--divider-color);border-radius:14px;background:var(--card-background-color)}.starter-packs{display:grid;gap:14px;margin-bottom:18px}.section-title{display:flex;justify-content:space-between;align-items:end}.pack-strip{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:12px}.pack-mini,.pack-card{display:grid;grid-template-columns:44px 1fr auto;gap:12px;align-items:center;padding:14px;border:1px solid var(--divider-color);border-radius:20px;background:var(--card-background-color);color:var(--primary-text-color);text-align:left}.pack-mini>ha-icon,.pack-card>ha-icon{display:grid;place-items:center;padding:10px;border-radius:14px;background:color-mix(in srgb,var(--primary-color) 14%,transparent);color:var(--primary-color)}.pack-mini p,.pack-card p{font-size:.82rem;line-height:1.35;margin-top:4px}.pack-mini small,.pack-card small{display:block;color:var(--secondary-text-color);margin-top:6px}.pack-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:12px}.pack-card{width:100%;cursor:pointer}.pack-card.selected{border-color:var(--primary-color);background:linear-gradient(135deg,color-mix(in srgb,var(--primary-color) 14%,transparent),transparent),var(--card-background-color)}.pack-check{color:var(--primary-color)}.onboarding-dialog{width:min(980px,100%)}.onboarding-hero{display:grid;grid-template-columns:auto 1fr;gap:18px;align-items:center;padding:18px;border-radius:22px;background:radial-gradient(circle at 0 0,color-mix(in srgb,var(--primary-color) 18%,transparent),transparent 50%),color-mix(in srgb,var(--primary-text-color) 2%,transparent)}
    .template-title{min-width:0;display:grid;gap:6px}.template-badges{display:flex;gap:6px;flex-wrap:wrap}.template-badge{padding:3px 7px;border-radius:999px;background:color-mix(in srgb,var(--primary-color) 13%,transparent);color:var(--primary-color);font-size:.66rem;font-weight:900;text-transform:uppercase}.template-badge.popular{background:color-mix(in srgb,var(--warning-color) 16%,transparent);color:var(--warning-color)}.template-badge.season{background:color-mix(in srgb,var(--success-color,#4caf50) 14%,transparent);color:var(--success-color,#4caf50)}.tag-list{display:flex;gap:6px;flex-wrap:wrap}.tag-list>span{padding:4px 8px;border-radius:999px;background:color-mix(in srgb,var(--primary-text-color) 5%,transparent);color:var(--secondary-text-color);font-size:.7rem}.template-preview-heading,.completion-heading{display:flex;gap:14px;align-items:flex-start}.template-preview-heading>ha-icon,.completion-heading>ha-icon{--mdc-icon-size:38px;color:var(--primary-color);padding:10px;border-radius:16px;background:color-mix(in srgb,var(--primary-color) 12%,transparent)}.preview-tags{display:grid;gap:8px}
    .history-panel{display:grid;gap:14px}.history-toolbar{display:grid;grid-template-columns:minmax(220px,1fr) repeat(2,minmax(150px,220px));gap:10px;align-items:end}.history-toolbar label{display:grid;gap:5px;color:var(--secondary-text-color);font-size:.75rem;font-weight:850}.completion-details{display:flex;gap:8px;flex-wrap:wrap;margin-top:8px}.completion-details span{display:inline-flex;align-items:center;gap:5px;padding:5px 8px;border-radius:10px;background:color-mix(in srgb,var(--primary-text-color) 5%,transparent);font-size:.75rem;color:var(--secondary-text-color)}.completion-details ha-icon{--mdc-icon-size:16px}.history-dialog{width:min(1100px,100%)}
    @media(max-width:980px){.dashboard-main{grid-template-columns:1fr 1fr}.completed-toggle{grid-column:1/-1}.template-filter-bar{align-items:stretch;flex-direction:column}.template-secondary-filters{display:grid;grid-template-columns:1fr 1fr}.history-toolbar{grid-template-columns:1fr 1fr}.history-toolbar .search{grid-column:1/-1}}
    @media(max-width:620px){.pack-strip,.pack-grid{grid-template-columns:1fr}.pack-mini,.pack-card{grid-template-columns:38px 1fr}.pack-mini button,.pack-check{grid-column:1/-1;width:100%}.onboarding-hero{grid-template-columns:1fr;text-align:center}.onboarding-hero .empty-orb{margin:auto}.template-secondary-filters,.history-toolbar{grid-template-columns:1fr}.history-toolbar .search{grid-column:auto}.completion-details{display:grid}.schedule-chip{width:auto}.completed-toggle{grid-column:auto}}

    .history-content{min-width:0}.history-title{display:flex;align-items:center;gap:10px;flex-wrap:wrap}.history-event-type{display:inline-flex;padding:4px 8px;border-radius:999px;background:color-mix(in srgb,var(--primary-color) 12%,transparent);color:var(--primary-color);font-size:.7rem;font-weight:850}.history-changes{margin-top:10px;border:1px solid var(--divider-color);border-radius:14px;overflow:hidden}.history-changes summary{display:flex;align-items:center;gap:8px;padding:10px 12px;cursor:pointer;font-weight:850;background:color-mix(in srgb,var(--primary-text-color) 3%,transparent)}.history-changes summary::-webkit-details-marker{display:none}.history-change-head,.history-change-row{display:grid;grid-template-columns:minmax(110px,.8fr) minmax(120px,1fr) 24px minmax(120px,1fr);gap:8px;align-items:center;padding:8px 12px}.history-change-head{color:var(--secondary-text-color);font-size:.7rem;text-transform:uppercase;border-top:1px solid var(--divider-color)}.history-change-row{border-top:1px solid color-mix(in srgb,var(--divider-color) 70%,transparent);font-size:.82rem}.history-change-row>span{overflow-wrap:anywhere}.history-change-row>ha-icon{--mdc-icon-size:16px;color:var(--secondary-text-color)}
    @media(max-width:620px){.history-change-head{display:none}.history-change-row{grid-template-columns:1fr;gap:4px}.history-change-row>ha-icon{transform:rotate(90deg);justify-self:center}}

    .advanced-section{padding:0;overflow:hidden}.advanced-section>summary{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:16px;cursor:pointer;font-weight:850;list-style:none}.advanced-section>summary::-webkit-details-marker{display:none}.advanced-section>summary>span{display:flex;align-items:center;gap:9px}.advanced-section>summary small{color:var(--secondary-text-color);font-weight:700}.advanced-body{display:grid;gap:14px;padding:0 16px 16px;border-top:1px solid var(--divider-color)}.advanced-body>.check{margin-top:14px}
    .section-title-actions{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}.notification-overview{display:flex;align-items:center;justify-content:space-between;gap:18px;background:radial-gradient(circle at 0 0,color-mix(in srgb,var(--primary-color) 16%,transparent),transparent 48%),color-mix(in srgb,var(--primary-text-color) 2%,transparent)}.switch-card{display:flex;align-items:center;gap:12px;padding:12px 14px;border:1px solid var(--divider-color);border-radius:18px;min-width:200px;background:var(--card-background-color)}.switch-card span{display:grid;gap:2px}.switch-card small{color:var(--secondary-text-color)}.notification-preview-card{display:grid;gap:8px;padding:14px;border:1px solid var(--divider-color);border-radius:18px;background:color-mix(in srgb,var(--primary-text-color) 3%,transparent)}.notification-preview-card.escalated{border-color:color-mix(in srgb,var(--error-color) 65%,var(--divider-color));background:color-mix(in srgb,var(--error-color) 10%,var(--card-background-color))}.notification-preview-card pre{white-space:pre-wrap;overflow-wrap:anywhere;margin:0;font:inherit;color:var(--secondary-text-color)}.preview-actions{display:flex;gap:8px;flex-wrap:wrap}.preview-actions span{padding:6px 9px;border-radius:999px;background:color-mix(in srgb,var(--primary-color) 12%,transparent);color:var(--primary-color);font-size:.75rem;font-weight:800}.notification-history{display:grid;gap:8px}.notification-history article{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:11px 12px;border:1px solid var(--divider-color);border-radius:14px;background:color-mix(in srgb,var(--primary-text-color) 3%,transparent)}.notification-history small{display:block;color:var(--secondary-text-color);margin-top:3px}
    @media(max-width:620px){.section-title-actions{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}.notification-overview{display:grid}.switch-card{min-width:0}.advanced-section>summary{align-items:flex-start}.advanced-section>summary small{display:none}.notification-history article{align-items:flex-start}}

    /* v1.6 dashboard layouts, recovery and settings */
    .layout-switch{display:flex;gap:6px;flex-wrap:wrap;grid-column:1/-1;justify-content:flex-end}.layout-switch .icon{width:auto;min-width:42px;padding:0 12px}.layout-switch .icon span{display:none}.layout-switch .icon.active{background:color-mix(in srgb,var(--primary-color) 18%,transparent);border-color:var(--primary-color);color:var(--primary-color)}
    .density-compact .task-card,.density-compact .panel,.density-compact .kpi{border-radius:14px}.density-compact .task-card{gap:10px;padding:14px}.density-compact .meta-grid{gap:8px}.density-compact .description{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.quick-filter-strip{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 16px}.quick-filter-strip button{display:inline-flex;align-items:center;gap:7px;min-height:36px;padding:0 11px;border:1px solid var(--divider-color);border-radius:999px;background:var(--card-background-color);color:var(--primary-text-color);font-weight:800}.quick-filter-strip button.active{border-color:var(--primary-color);background:color-mix(in srgb,var(--primary-color) 14%,transparent);color:var(--primary-color)}.quick-filter-strip strong{padding:2px 7px;border-radius:999px;background:color-mix(in srgb,var(--primary-text-color) 8%,transparent);font-size:.72rem}.tag-strip{display:flex;gap:6px;flex-wrap:wrap}.tag-strip button{border:1px solid var(--divider-color);border-radius:999px;background:transparent;color:var(--secondary-text-color);min-height:28px;padding:0 9px;font-size:.75rem;font-weight:800}.tag-strip button:hover{border-color:var(--primary-color);color:var(--primary-color)}
    .advanced-filter-panel{padding:18px;margin-bottom:18px;display:grid;gap:16px}.filter-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:12px}.filter-grid label,.saved-filter-bar label,.bulk-toolbar label{display:grid;gap:5px;color:var(--secondary-text-color);font-size:.75rem;font-weight:850}.saved-filter-bar{display:flex;gap:10px;align-items:end;flex-wrap:wrap}.saved-filter-bar .grow{min-width:220px;flex:1}.saved-filter-list{display:flex;gap:7px;flex-wrap:wrap;width:100%}.saved-filter-chip{display:inline-flex;border:1px solid var(--divider-color);border-radius:999px;overflow:hidden;background:color-mix(in srgb,var(--primary-text-color) 4%,transparent)}.saved-filter-chip button{border:0;background:transparent;color:var(--primary-text-color);padding:7px 10px}.saved-filter-chip .icon{width:30px;min-width:30px;padding:0}
    .bulk-toolbar{display:flex;align-items:end;gap:12px;flex-wrap:wrap;padding:14px 18px;margin-bottom:18px;border-color:color-mix(in srgb,var(--primary-color) 55%,var(--divider-color));position:sticky;top:8px;z-index:12}.bulk-toolbar>strong{align-self:center;margin-right:auto}.bulk-toolbar input,.bulk-toolbar select{min-width:130px}.task-select{display:grid;place-items:center;flex:0 0 auto}.task-select input{width:18px;height:18px;min-height:0;padding:0;accent-color:var(--primary-color)}.task-card>header>.task-select{position:absolute;left:10px;top:10px;z-index:2}.task-card>header{padding-left:22px}
    .compact-task-list{display:grid;gap:8px}.compact-task-row{display:grid;grid-template-columns:auto auto minmax(180px,1fr) minmax(110px,auto) auto auto auto;gap:12px;align-items:center;padding:12px 14px;border:1px solid var(--divider-color);border-radius:18px;background:var(--card-background-color)}.compact-task-row small{display:block;color:var(--secondary-text-color);margin-top:3px}.compact-task-row .icon-chip{width:36px;height:36px;border-radius:12px}.grow{min-width:0;flex:1}
    .task-table-wrap{overflow:auto;border:1px solid var(--divider-color);border-radius:20px;background:var(--card-background-color)}.task-table{width:100%;border-collapse:collapse;min-width:940px}.task-table th,.task-table td{padding:12px 14px;border-bottom:1px solid var(--divider-color);text-align:left}.task-table th{position:sticky;top:0;background:var(--card-background-color);z-index:1;font-size:.72rem;text-transform:uppercase;color:var(--secondary-text-color)}.task-table td small{display:block;color:var(--secondary-text-color);margin-top:4px}.task-table tr:last-child td{border-bottom:0}.task-table tr.overdue,.task-table tr.critical{background:color-mix(in srgb,var(--error-color) 5%,transparent)}.task-table tr.warning{background:color-mix(in srgb,var(--warning-color) 5%,transparent)}
    .calendar-task-view{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:14px;align-items:start}.calendar-day{border:1px solid var(--divider-color);border-radius:20px;background:var(--card-background-color);overflow:hidden}.calendar-day>header{display:flex;justify-content:space-between;padding:12px 14px;background:color-mix(in srgb,var(--primary-text-color) 4%,transparent)}.calendar-day>header span{color:var(--secondary-text-color)}.calendar-task{display:grid;grid-template-columns:auto 1fr auto;gap:9px;align-items:center;width:100%;padding:11px 14px;border:0;border-top:1px solid var(--divider-color);background:transparent;color:var(--primary-text-color);text-align:left}.calendar-task small{color:var(--secondary-text-color)}.calendar-task.overdue,.calendar-task.critical{border-left:4px solid var(--error-color)}.calendar-task.warning{border-left:4px solid var(--warning-color)}
    .timeline-view{position:relative;display:grid;gap:0;padding-left:28px}.timeline-view:before{content:"";position:absolute;left:10px;top:10px;bottom:10px;width:2px;background:var(--divider-color)}.timeline-entry{position:relative;display:grid;grid-template-columns:140px 1fr;gap:16px;padding:0 0 18px}.timeline-marker{position:absolute;left:-24px;top:18px;width:12px;height:12px;border-radius:50%;background:var(--primary-color);box-shadow:0 0 0 5px var(--primary-background-color)}.timeline-entry.warning .timeline-marker{background:var(--warning-color)}.timeline-entry.critical .timeline-marker,.timeline-entry.overdue .timeline-marker{background:var(--error-color)}.timeline-date{padding-top:14px;color:var(--secondary-text-color);font-weight:800}.timeline-card{padding:14px 16px;border:1px solid var(--divider-color);border-radius:18px;background:var(--card-background-color)}.timeline-card header{display:flex;justify-content:space-between;gap:12px}.timeline-card p{margin:8px 0 12px}
    .settings-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;margin-bottom:18px}.settings-section{padding:18px;display:grid;gap:16px}.settings-section>header{display:flex;gap:12px;align-items:flex-start}.settings-section>header>ha-icon{padding:10px;border-radius:14px;background:color-mix(in srgb,var(--primary-color) 14%,transparent);color:var(--primary-color)}.settings-section>header p{margin-top:4px}.check-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:9px}.settings-save{display:flex;justify-content:flex-end;padding:14px 18px;margin-bottom:18px}
    .data-dialog,.diagnostics-dialog{width:min(1120px,100%)}.integrity-summary{border-color:color-mix(in srgb,var(--success-color,#4caf50) 45%,var(--divider-color))}.integrity-summary.has-errors{border-color:color-mix(in srgb,var(--error-color) 55%,var(--divider-color));background:color-mix(in srgb,var(--error-color) 5%,transparent)}.issue-list{display:grid;gap:7px;margin-top:12px}.issue{display:flex;gap:10px;align-items:center;padding:10px;border:1px solid var(--divider-color);border-radius:14px}.issue>div{flex:1}.issue small{display:block;color:var(--secondary-text-color)}.issue.error>ha-icon{color:var(--error-color)}.issue.warning>ha-icon{color:var(--warning-color)}
    .backup-list,.quarantine-list{display:grid;gap:8px}.backup-row,.quarantine-list article{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:11px 12px;border:1px solid var(--divider-color);border-radius:15px;background:color-mix(in srgb,var(--primary-text-color) 3%,transparent)}.backup-row.pinned{border-color:color-mix(in srgb,var(--primary-color) 55%,var(--divider-color))}.backup-main{display:flex;align-items:center;gap:10px;min-width:0}.backup-main>ha-icon{color:var(--primary-color)}.backup-main small,.quarantine-list small{display:block;color:var(--secondary-text-color);margin-top:3px}.backup-diff-section details{border:1px solid var(--divider-color);border-radius:15px;padding:10px 12px}.backup-diff-section summary{cursor:pointer;font-weight:850}.diff-summary{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}.diff-summary>div{display:grid;place-items:center;padding:12px;border-radius:15px;background:color-mix(in srgb,var(--primary-text-color) 4%,transparent)}.diff-summary strong{font-size:1.3rem}.diff-summary span{color:var(--secondary-text-color);font-size:.75rem}.change-list{display:grid;gap:10px;margin-top:10px}.change-list article{padding:10px;border-top:1px solid var(--divider-color)}.field-diff{display:grid;grid-template-columns:110px minmax(0,1fr) auto minmax(0,1fr);gap:8px;align-items:center;margin-top:6px}.field-diff code{padding:5px 7px;border-radius:8px;background:color-mix(in srgb,var(--primary-text-color) 6%,transparent);overflow-wrap:anywhere}.restore-options{display:flex;gap:10px;flex-wrap:wrap}.import-preview{display:flex;gap:12px;flex-wrap:wrap;padding:11px 13px;border-radius:14px;background:color-mix(in srgb,var(--success-color,#4caf50) 10%,transparent)}.import-preview.error{background:color-mix(in srgb,var(--error-color) 10%,transparent)}.diagnostics-dialog pre{white-space:pre-wrap;overflow:auto;max-height:260px;padding:12px;border-radius:14px;background:color-mix(in srgb,var(--primary-text-color) 5%,transparent)}
    .small{min-height:34px;padding:0 11px;font-size:.78rem}
    @media(max-width:980px){.settings-grid{grid-template-columns:1fr}.compact-task-row{grid-template-columns:auto auto minmax(140px,1fr) auto auto}.compact-task-row>span:nth-of-type(2){display:none}.timeline-entry{grid-template-columns:110px 1fr}.diff-summary{grid-template-columns:repeat(2,1fr)}.field-diff{grid-template-columns:1fr}.field-diff>ha-icon{transform:rotate(90deg);justify-self:center}}
    @media(max-width:620px){.layout-switch{justify-content:stretch}.layout-switch .icon{flex:1}.compact-task-row{grid-template-columns:auto auto 1fr auto}.compact-task-row>.status,.compact-task-row>span:not(.icon-chip){display:none}.bulk-toolbar{position:static;align-items:stretch}.bulk-toolbar>*{width:100%}.calendar-task-view{grid-template-columns:1fr}.timeline-entry{grid-template-columns:1fr}.timeline-date{padding-top:0}.backup-row,.quarantine-list article{align-items:flex-start;flex-direction:column}.backup-row .button-row,.quarantine-list .button-row{width:100%}.diff-summary{grid-template-columns:1fr 1fr}}
    .ordering-help{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 18px;margin-bottom:16px}.settings-row.dragging{opacity:.55;transform:scale(.99);border-color:var(--primary-color)}.settings-row.drop-target{border-color:var(--primary-color);box-shadow:inset 0 3px 0 var(--primary-color);background:color-mix(in srgb,var(--primary-color) 9%,var(--card-background-color))}
    .widget-order-list{display:grid;gap:8px}.widget-order-list article{display:flex;align-items:center;gap:8px;padding:8px 10px;border:1px solid var(--divider-color);border-radius:14px;background:color-mix(in srgb,var(--primary-text-color) 3%,transparent)}.widget-order-list article.dragging{opacity:.55;border-color:var(--primary-color)}.widget-order-list article.drop-target{box-shadow:inset 0 3px 0 var(--primary-color);background:color-mix(in srgb,var(--primary-color) 9%,var(--card-background-color))}.widget-order-list .drag{cursor:grab}.widget-order-list .drag:focus-visible,.settings-row .drag:focus-visible{outline:2px solid var(--primary-color);outline-offset:2px}
    .audit-list{display:grid;gap:8px}.audit-list article{display:flex;gap:10px;padding:11px 12px;border:1px solid var(--divider-color);border-radius:15px;background:color-mix(in srgb,var(--primary-text-color) 3%,transparent)}.audit-icon{display:grid;place-items:center;width:36px;height:36px;border-radius:12px;background:color-mix(in srgb,var(--primary-color) 12%,transparent);color:var(--primary-color);flex:0 0 auto}.audit-content{min-width:0;flex:1}.audit-content small{display:block;color:var(--secondary-text-color);margin-top:3px}.audit-content details{margin-top:8px}.audit-content pre{white-space:pre-wrap;overflow:auto;max-height:220px;padding:10px;border-radius:12px;background:color-mix(in srgb,var(--primary-text-color) 5%,transparent)}
    .bulk-preview-dialog{width:min(920px,100%)}.bulk-preview-dialog .change-list{max-height:55vh;overflow:auto}.bulk-preview-dialog .diff-summary{grid-template-columns:repeat(3,1fr)}
    @media(max-width:620px){.bulk-preview-dialog .diff-summary{grid-template-columns:1fr}.widget-order-list article{flex-wrap:wrap}.audit-list article{align-items:flex-start}}
  </style>`;
  }
});


// ---- frontend/src/register.ts ----
// Custom element registration and visible frontend version log.
if (!customElements.get("maintenance-dashboard-panel")) {
  customElements.define("maintenance-dashboard-panel", MaintenanceDashboardPanel);
}
console.info(`%cmaintenance-dashboard-panel%c v${VERSION}`, "color: var(--primary-color); font-weight: 800;", "color: inherit;");

