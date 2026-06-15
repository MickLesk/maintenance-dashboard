// @ts-nocheck
const VERSION = "1.8.0";
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
  cardsView: "Kachel", compactView: "Liste", timelineView: "Zeitachse",
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
  nativePlatforms: "Native Home-Assistant-Plattformen", todoPlatform: "To-do-Plattform", todoIncludeDisabled: "Deaktivierte Aufgaben in To-do anzeigen", calendarPlatform: "Kalender-Plattform", calendarIncludeSnoozed: "Pausierte Aufgaben im Kalender anzeigen", calendarDuration: "Kalenderdauer (Minuten)",
  dashboardLayout: "Dashboard-Ansicht", dashboardSurfaceHint: "Ansicht, Dichte und Filterverhalten.", saveDashboardSettings: "Dashboard-Einstellungen speichern",
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
  cardsView: "Grid", compactView: "List", timelineView: "Timeline",
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
  nativePlatforms: "Native Home Assistant platforms", todoPlatform: "To-do platform", todoIncludeDisabled: "Show disabled tasks in To-do", calendarPlatform: "Calendar platform", calendarIncludeSnoozed: "Show snoozed tasks in Calendar", calendarDuration: "Calendar duration (minutes)",
  dashboardLayout: "Dashboard view", dashboardSurfaceHint: "View, density and filter behavior.", saveDashboardSettings: "Save dashboard settings",
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
  auditSource: "Quelle", auditTask: "Aufgabe", auditChanges: "Änderungen", auditEmpty: "Noch keine Audit-Einträge vorhanden."
});
Object.assign(I18N.en, {
  bulkPreview: "Bulk action preview", confirmBulkTitle: "Review and confirm changes",
  safetyBackup: "Safety backup", yes: "Yes", no: "No",
  auditSource: "Source", auditTask: "Task", auditChanges: "Changes", auditEmpty: "No audit entries yet."
});
