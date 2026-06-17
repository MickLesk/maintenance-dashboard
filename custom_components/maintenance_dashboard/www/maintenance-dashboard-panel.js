// ---- frontend/src/core/constants.ts ----
// @ts-nocheck
const VERSION = "2.2.1";
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

const TEMPLATE_CATEGORY_KEYS = ["all", "favorites", "recommended", "heating", "ventilation", "water", "electrical", "safety", "solar", "garden", "building", "it_network", "household", "garage", "seasonal"];
const SCHEDULE_MODES = ["interval", "one_time", "fixed_date", "seasonal"];
const RECURRENCE_MODES = ["standard", "persistent"];
const WORKFLOW_STATES = ["planned", "ready", "in_progress", "blocked"];

const EMPTY = {
  name: "", type: "time", schedule_mode: "interval", calendar_repeat: "yearly", due_date: "",
  interval: "90", interval_unit: "days", entity_id: "", category: "general", custom_category: "",
  area_id: "", area_name: "", priority: "3", icon: "mdi:wrench-clock", icon_color: "", card_color: "",
  enabled: true, warning_threshold: "70", critical_threshold: "90", description: "", last_done: "",
  fixed_month: "9", fixed_day: "1", season: "autumn", tags: [], workflow_state: "planned", recurrence_mode: "standard", checklist: [],
  completion_requirements_note: false, completion_requirements_material: false, completion_requirements_cost: false,
  completion_requirements_performed_by: false, completion_requirements_checklist: false,
  notifications_enabled: true, notifications_inherit: true, notifications_warning: true,
  notifications_critical: true, notifications_overdue: true, notifications_unavailable: false,
  notifications_once_per_status: true, notifications_repeat_days: "3",
  notifications_escalation_enabled: true, notifications_escalation_after_days: "3",
  notifications_actionable: true, notifications_notify_service: ""
};


// ---- generated from frontend/src/i18n/*.json ----
const I18N_LOCALES = Object.freeze(["de","en"]);
const I18N = Object.freeze({
  "de": {
    "actionBackupCreated": "Backup erstellt",
    "actionBackupDeleted": "Backup gelöscht",
    "actionBackupUpdated": "Backup aktualisiert",
    "actionBulkDone": "Mehrfachaktion ausgeführt",
    "actionDeleted": "Wartungseintrag gelöscht",
    "actionDone": "Wartungseintrag erledigt",
    "actionExported": "Export erstellt",
    "actionFilterDeleted": "Filter gelöscht",
    "actionFilterSaved": "Filter gespeichert",
    "actionFilterUpdated": "Filter aktualisiert",
    "actionImported": "Daten importiert",
    "actionIntegrityRepaired": "Integrität repariert",
    "actionNotificationSent": "Benachrichtigung gesendet",
    "actionReactivated": "Einmalige Aufgabe reaktiviert",
    "actionRestored": "Backup wiederhergestellt",
    "actionSaved": "Wartungseintrag gespeichert",
    "actionWorkflowReset": "Workflow-Fortschritt zurückgesetzt",
    "actionWorkflowUpdated": "Workflow aktualisiert",
    "actionCycleRestarted": "Aufgabenzyklus neu gestartet",
    "actionCycleSkipped": "Aufgabenzyklus übersprungen",
    "actionSnoozeCleared": "Pause aufgehoben",
    "actionSnoozeDays": "Pause-Aktion (Tage)",
    "actionSnoozed": "Wartungseintrag pausiert",
    "actionTemplatesAdded": "Vorlagen hinzugefügt",
    "actionUndo": "Historieneintrag rückgängig gemacht",
    "addPackage": "Paket hinzufügen",
    "actionableNotifications": "Aktionsbuttons",
    "active": "Offen",
    "activitiesToday": "Aktivitäten heute",
    "activitiesWeek": "Aktivitäten diese Woche",
    "add": "Wartungseintrag hinzufügen",
    "addFirst": "Ersten Wartungseintrag hinzufügen",
    "addSelected": "Gewählte hinzufügen",
    "addTemplate": "Vorlage hinzufügen",
    "added": "Hinzugefügt",
    "advancedFilters": "Erweiterte Filter",
    "all": "Alle",
    "allActions": "Alle Aktionen",
    "allTasks": "Alle Aufgaben",
    "allTime": "Alle Zeiträume",
    "appSubtitle": "Backend-gespeicherte Wartungsplanung mit Historie, Backups und Sidebar-Panel.",
    "appTitle": "Hauswartung & Technik",
    "appearance": "Darstellung",
    "appearanceHint": "Farben sind optional. Leer bedeutet: Home-Assistant-Theme verwenden.",
    "archived": "Archiviert",
    "area": "Bereich",
    "areaFilter": "Bereich",
    "auditChanges": "Änderungen",
    "auditEmpty": "Noch keine Audit-Einträge vorhanden.",
    "auditEvent": "Audit-Ereignis",
    "auditLog": "Audit-Log",
    "auditRetention": "Audit-Retention",
    "auditSection": "Audit-Log",
    "auditSource": "Quelle",
    "auditTask": "Aufgabe",
    "automatic": "Automatisch",
    "automaticLabel": "Automatisch",
    "autumn": "Herbst",
    "availableRestoreTasks": "geänderte oder hinzugefügte Aufgaben verfügbar",
    "backupActivities": "Backup-Ereignisse",
    "backupBeforeBulk": "Backup vor Mehrfachaktionen",
    "backupBeforeImport": "Backup vor Import",
    "backupBeforeMigration": "Backup vor Migration",
    "backupBeforeRestore": "Backup vor Wiederherstellung",
    "backupBeforeTaskDelete": "Backup vor Task-Löschung",
    "backupBeforeTaskUpdate": "Backup vor Task-Änderungen",
    "backupDiff": "Backup-Vergleich",
    "backupLabel": "Backup",
    "backupName": "Backup-Name",
    "backupRestore": "Backup & Restore",
    "backupRotation": "Backup-Rotation",
    "backups": "Backups",
    "basic": "Basis",
    "brandName": "Maintenance Dashboard",
    "building": "Gebäude",
    "bulkAction": "Mehrfachaktion",
    "bulkArea": "Bereich ändern",
    "bulkCategory": "Kategorie ändern",
    "bulkClearSnooze": "Pausen aufheben",
    "bulkDelete": "Löschen",
    "bulkDisable": "Deaktivieren",
    "bulkDone": "Erledigen",
    "bulkDuplicate": "Duplizieren",
    "bulkEnable": "Aktivieren",
    "bulkPreview": "Vorschau der Mehrfachaktion",
    "bulkPriority": "Priorität ändern",
    "bulkResetProgress": "Fortschritt zurücksetzen",
    "bulkRestore": "Wiederherstellen",
    "bulkSnooze": "Pausieren",
    "bulkWorkflow": "Workflow setzen",
    "calendarDuration": "Kalenderdauer (Minuten)",
    "calendarIncludeSnoozed": "Pausierte Aufgaben im Kalender anzeigen",
    "calendarPlatform": "Kalender-Plattform",
    "calendarRepeat": "Wiederholung",
    "cancel": "Abbrechen",
    "cardColor": "Kartenfarbe",
    "cardsView": "Kachel",
    "category": "Kategorie",
    "categoryFilter": "Kategorie",
    "changeActivities": "Änderungen",
    "changed": "Geändert",
    "changes": "Änderungen",
    "cleanupEntitiesNow": "Entities bereinigen",
    "cleanupRemovedEntities": "Verwaiste Entities automatisch entfernen",
    "clear": "Aufheben",
    "clearColors": "Farben zurücksetzen",
    "clearNotificationHistory": "Verlauf leeren",
    "clearSelection": "Auswahl aufheben",
    "clearSnooze": "Pause aufheben",
    "common": "Empfohlen",
    "compactView": "Liste",
    "compareBackup": "Vergleichen",
    "collapseStarterPacks": "Starter-Pakete einklappen",
    "completed": "Erledigt",
    "completedActivities": "Abgeschlossene Aufgaben",
    "completedEvent": "Erledigt",
    "completedThisYear": "Dieses Jahr erledigt",
    "completionCost": "Kosten",
    "completionCurrency": "Währung",
    "completionMaterial": "Material / Ersatzteile",
    "completionNote": "Erledigt-Notiz",
    "confirmBulk": "Mehrfachaktion wirklich ausführen?",
    "confirmBulkTitle": "Änderungen prüfen und bestätigen",
    "copyDiagnostics": "Diagnose kopieren",
    "createBackup": "Backup erstellen",
    "created": "Erstellt",
    "critical": "Kritisch",
    "criticalNotifications": "Kritisch",
    "custom": "Manuell",
    "customCategoryMissing": "Eigene Kategorie fehlt",
    "dailyDigest": "Täglicher Digest",
    "dashboard": "Dashboard",
    "dashboardDensity": "Dichte",
    "dashboardLayout": "Dashboard-Ansicht",
    "dashboardSurfaceHint": "Ansicht, Dichte und Filterverhalten.",
    "dashboardToolbarHint": "Neuen Eintrag anlegen, offene Aufgaben durchsuchen und die Liste nach Status oder Priorität eingrenzen.",
    "dataIntegrity": "Datenintegrität",
    "dataSafety": "Datensicherheit",
    "dataSafetyExportHint": "Aufgaben, Historie, Einstellungen, Benachrichtigungsstatus, Quarantäne, Audit und Backup-Metadaten.",
    "days": "Tage",
    "defaultDueFilter": "Standard-Fälligkeitsfilter",
    "defaultTaskRelevance": "Standard-Relevanz",
    "delete": "Löschen",
    "deleteFilter": "Filter löschen",
    "deleteRecord": "Datensatz löschen",
    "deleted": "Gelöscht",
    "deletedEvent": "Gelöscht",
    "disabled": "Deaktiviert",
    "densityComfortable": "Komfortabel",
    "densityCompact": "Kompakt",
    "description": "Beschreibung",
    "deselectAll": "Auswahl leeren",
    "diagnostics": "Diagnose",
    "digestTime": "Digest-Zeit",
    "done": "Erledigt",
    "downloadBackup": "Backup herunterladen",
    "dragHint": "Manuelle Sortierung per Drag & Drop oder Pfeile. Smart-Sortierung nutzt Status, Priorität, Fälligkeit und manuelle Position.",
    "due": "Fällig",
    "dueDate": "Fällig am",
    "dueDateMissing": "Fälligkeitsdatum fehlt",
    "dueFilter": "Fälligkeit",
    "dueNotifications": "Fällig-Benachrichtigungen",
    "dueOnly": "Nur fällig",
    "dueThisMonth": "Diesen Monat fällig",
    "dueThisWeek": "Diese Woche fällig",
    "dueToday": "Heute fällig",
    "dueNext7": "in 7 Tagen",
    "dueNext30": "in 30 Tagen",
    "duplicateMode": "Duplikate",
    "duplicateNewId": "Neue IDs erzeugen",
    "duplicateOverwrite": "Überschreiben",
    "duplicateSkip": "Überspringen",
    "edit": "Bearbeiten",
    "electrical": "Elektrik",
    "enabled": "Aktiviert",
    "entity": "Entität",
    "entityFilter": "Entity-Verfügbarkeit",
    "entityGrouping": "Gerätezuordnung",
    "entityGroupingCategory": "Pro Kategorie",
    "entityGroupingDashboard": "Ein Dashboard-Gerät",
    "entityGroupingNone": "Keine Gerätezuordnung",
    "entityMode": "Task-Entities",
    "entityModeHint": "Optional pro Wartungseintrag eigene Home-Assistant-Entities erzeugen.",
    "entitySyncHint": "Entities werden ohne Neustart synchronisiert. Eine optionale Bereinigung entfernt verwaiste Registry-Einträge.",
    "escalation": "Eskalation",
    "escalationAfterDays": "Eskalieren nach Tagen",
    "execute": "Ausführen",
    "expandStarterPacks": "Starter-Pakete ausklappen",
    "exportData": "Exportieren",
    "exportRecord": "Datensatz exportieren",
    "exportSelected": "Auswahl exportieren",
    "fieldCalendarRepeat": "Wiederholung",
    "fieldCategory": "Kategorie",
    "fieldDescription": "Beschreibung",
    "fieldDueDate": "Fällig am",
    "fieldEnabled": "Aktiviert",
    "fieldInterval": "Intervall",
    "fieldLastDone": "Zuletzt erledigt",
    "fieldName": "Name",
    "fieldPriority": "Priorität",
    "fieldSchedule": "Zeitplan",
    "fieldSeason": "Saison",
    "filterName": "Filtername",
    "favorite": "Favorit",
    "favorites": "Favoriten",
    "filters": "Filter",
    "fixedDate": "Fixes Datum",
    "fixedDay": "Tag",
    "fixedMonth": "Monat",
    "focusNextTask": "Zur nächsten Aufgabe springen",
    "frontendLabel": "Frontend",
    "full": "Vollständig",
    "garage": "Garage",
    "garden": "Garten",
    "general": "Allgemein",
    "globalLabel": "Global",
    "groupDigestByCategory": "Digest nach Kategorien",
    "hasEntity": "Mit Entity",
    "health": "Health-Score",
    "healthHelp": "Gewichteter Score aus Status, Priorität und Verfügbarkeit. Kritische Aufgaben mit hoher Priorität senken ihn deutlich stärker.",
    "heating": "Heizung",
    "hideCompleted": "Erledigte ausblenden",
    "highPriority": "Hohe Priorität",
    "history": "Verlauf",
    "historyDescription": "Historie, Änderungen und abgeschlossene Wartungen.",
    "historyLabel": "Historie",
    "historyRange": "Zeitraum",
    "historyScopeAll": "Alle",
    "historyScopeChanges": "Änderungen",
    "historyScopeCompleted": "Abgeschlossen",
    "historySearch": "Historie durchsuchen",
    "historySection": "Historie",
    "historyTask": "Aufgabe",
    "historyType": "Aktion",
    "hours": "Stunden",
    "household": "Haushalt",
    "icon": "Icon",
    "iconColor": "Iconfarbe",
    "importData": "Importieren",
    "importJson": "JSON importieren",
    "importMode": "Importmodus",
    "importPaste": "JSON hier einfügen",
    "importPreview": "Import prüfen",
    "importedEvent": "Importiert",
    "includeDashboardLink": "Dashboard-Link einfügen",
    "includeSnoozed": "Pausierte einbeziehen",
    "inheritGlobalRules": "Globale Regeln verwenden",
    "integrationLabel": "Integration",
    "integrityCheckOnStart": "Beim Start prüfen",
    "integrityErrors": "Fehler",
    "integrityHealthy": "Datenbestand ist fehlerfrei",
    "integrityWarnings": "Warnungen",
    "interval": "Intervall",
    "intervalSchedule": "Intervall",
    "intervalUnit": "Einheit",
    "invalidRecord": "Ungültiger Datensatz",
    "invertSelection": "Auswahl umkehren",
    "it_network": "IT/Netzwerk",
    "lastAutomaticBackup": "Letztes automatisches Backup",
    "lastDigest": "Letzter Digest",
    "lastDone": "Zuletzt erledigt",
    "lastMigration": "Letzte Migration",
    "lastSent": "Zuletzt gesendet",
    "later": "Später",
    "loading": "Wird geladen...",
    "manual": "Manuell",
    "markDone": "Als erledigt speichern",
    "matchingRecords": "Übereinstimmend",
    "materialEmpty": "Starte mit einer Vorlage oder lege einen eigenen Wartungseintrag an. Die Daten werden backendseitig in Home Assistant gespeichert.",
    "materialPlaceholder": "Filter, Klingen, Dichtung …",
    "maximumBackupAge": "Maximales Alter (Tage)",
    "maximumBackups": "Maximale Backups",
    "mergeMode": "Zusammenführen",
    "meter": "Sensor/Zähler",
    "migration": "Migration",
    "mobileMore": "Mehr",
    "monthNext": "Nächster Monat",
    "monthPrevious": "Vorheriger Monat",
    "monthRange": "Dieser Monat",
    "monthly": "Monatlich",
    "months": "Monate",
    "name": "Name",
    "nativePlatforms": "Native Home-Assistant-Plattformen",
    "nativePlatformsHint": "Optional in nativen Home-Assistant-Karten und Automationen verwenden.",
    "navigation": "Navigation",
    "newEntry": "Neuer Eintrag",
    "createEmpty": "Leer erstellen",
    "createFromTemplate": "Aus Vorlage starten",
    "newEntryWizard": "Geführter Eintrag",
    "newValue": "Nachher",
    "next": "Nächste Aufgabe",
    "next14Days": "Nächste 14 Tage",
    "next90Days": "Nächste 90 Tage",
    "nextTask": "Nächste Aufgabe",
    "nextTaskHint": "Klicken, um zur Aufgabe zu springen",
    "no": "Nein",
    "noChanges": "Keine Feldänderungen gespeichert",
    "noCompletionDetails": "Keine zusätzlichen Angaben",
    "noDueDate": "Ohne Fälligkeit",
    "noDueTasks": "Keine Aufgaben in diesem Zeitraum",
    "noHistory": "Noch keine Historie vorhanden.",
    "noNotes": "Noch keine Notizen.",
    "noTasks": "Noch keine Wartungseinträge vorhanden.",
    "noTasksMatch": "Keine passenden Wartungseinträge gefunden.",
    "noTemplatesMatch": "Keine passenden Vorlagen gefunden.",
    "noteOptional": "Optionale Notiz",
    "notePlaceholder": "Kurze Notiz zur Aufgabe ...",
    "noteSaved": "Notiz gespeichert",
    "notificationFailed": "Fehlgeschlagen",
    "notificationHistory": "Benachrichtigungsverlauf",
    "notificationHistoryCleared": "Benachrichtigungsverlauf geleert",
    "notificationHistoryEmpty": "Noch keine Benachrichtigungen gesendet",
    "notificationHistoryRetention": "Verlaufseinträge behalten",
    "notificationLabel": "Benachrichtigung",
    "notificationPreview": "Vorschau",
    "notificationRules": "Benachrichtigungsregeln",
    "notificationRulesHint": "Statuswechsel, Wiederholungen, Eskalationen, Ruhezeiten und mobile Aktionsbuttons werden zentral verarbeitet.",
    "notificationServiceOverride": "Eigener Notify-Service",
    "notificationStateSection": "Benachrichtigungsstatus",
    "notificationStatus": "Benachrichtigungen",
    "notifications": "Benachrichtigungen",
    "notifyCritical": "Bei kritisch",
    "notifyDueTasks": "Fällige Aufgaben senden",
    "notifyOverdue": "Bei überfällig",
    "notifyService": "Notify-Service",
    "notifyUnavailable": "Bei nicht verfügbar",
    "notifyWarning": "Bei Warnung",
    "off": "Aus",
    "ok": "OK",
    "onboarding": "Schnellstart",
    "onboardingHint": "Wähle ein oder mehrere Starter-Pakete. Du kannst jeden Eintrag anschließend individuell anpassen oder später weitere Vorlagen ergänzen.",
    "onboardingTitle": "Wartungsplanung in wenigen Klicks starten",
    "oncePerStatus": "Nur einmal pro Status",
    "oneTime": "Einmalig",
    "oneTimeArchiveHint": "Nach dem Erledigen wird die Aufgabe archiviert und kann später reaktiviert werden.",
    "oneTimeCompletionHint": "Diese Aufgabe wird nach dem Speichern archiviert. Sie bleibt in Historie und erledigten Aufgaben erhalten.",
    "openHistory": "Verlauf öffnen",
    "overdue": "Überfällig",
    "overdueNotifications": "Überfällig",
    "ownCategory": "Eigene Kategorie",
    "packAdded": "Starter-Paket hinzugefügt",
    "pausedUntil": "Pausiert bis",
    "pendingRepairs": "Offene Reparaturen",
    "performedBy": "Ausgeführt von",
    "pinBackup": "Backup schützen",
    "pinned": "Geschützt",
    "popular": "Beliebt",
    "preview": "Vorschau",
    "previewRequired": "Bitte den Import zuerst prüfen",
    "previewTask": "Aufgabe für Vorschau",
    "previousTask": "Vorherige Aufgabe",
    "previousValue": "Vorher",
    "priority": "Priorität",
    "priority1": "Niedrig",
    "priority2": "Normal",
    "priority3": "Wichtig",
    "priority4": "Hoch",
    "priority5": "Kritisch",
    "priorityFilter": "Priorität",
    "priorityHint": "Priorität beeinflusst Smart-Sortierung und Health-Score.",
    "processNotificationsNow": "Regeln jetzt prüfen",
    "progress": "Fortschritt",
    "quarantine": "Quarantäne",
    "quarantineInvalidRecords": "Ungültige Datensätze quarantänisieren",
    "quarantineRetention": "Quarantäne-Retention",
    "quarantineSection": "Quarantäne",
    "quietFrom": "Ruhe ab",
    "quietHours": "Ruhezeiten",
    "quietTo": "Ruhe bis",
    "randomColors": "Zufällige Farben",
    "reactivate": "Reaktivieren",
    "reactivatedEvent": "Reaktiviert",
    "workflowChangedEvent": "Workflow geändert",
    "workflowResetEvent": "Workflow zurückgesetzt",
    "workflowResetSummary": "Fortschritt wurde zurückgesetzt.",
    "cycleRestartedEvent": "Zyklus neu gestartet",
    "cycleRestartedSummary": "Zyklus wurde neu gestartet.",
    "cycleSkippedEvent": "Zyklus übersprungen",
    "cycleSkippedSummary": "Zyklus wurde übersprungen.",
    "recommended": "Empfohlen",
    "recommendedOnly": "Nur empfohlen",
    "records": "Datensätze",
    "remaining": "verbleibend",
    "rememberDashboardView": "Letzte Ansicht merken",
    "removed": "Entfernt",
    "repairIntegrity": "Automatisch reparieren",
    "repeatEveryDays": "Wiederholen nach Tagen",
    "repeatNotifications": "Wiederholungen",
    "replaceMode": "Ersetzen",
    "restore": "Wiederherstellen",
    "restoreBackup": "Backup wiederherstellen",
    "restoreRecord": "Datensatz wiederherstellen",
    "restoreSections": "Wiederherstellungsbereiche",
    "restoredEvent": "Wiederhergestellt",
    "runIntegrityCheck": "Integrität prüfen",
    "safety": "Sicherheit",
    "safetyBackup": "Sicherheitsbackup",
    "save": "Speichern",
    "saveDashboardSettings": "Dashboard-Einstellungen speichern",
    "saveFilter": "Filter speichern",
    "savePinnedFilter": "Angepinnt speichern",
    "savedFilters": "Gespeicherte Filter",
    "schedule": "Zeitplan",
    "scheduleFilter": "Planung",
    "scheduleMode": "Planung",
    "schemaLabel": "Schema",
    "search": "Suche",
    "seasonal": "Saisonal",
    "selectAllVisible": "Sichtbare auswählen",
    "selectProblems": "Probleme auswählen",
    "selectionToolbarHint": "Aktionen für die aktuelle Auswahl",
    "selectTemplate": "Aus Vorlage starten",
    "applyTemplate": "Vorlage übernehmen",
    "selectedTasks": "ausgewählte Aufgaben",
    "selectedTasksCount": "Aufgaben ausgewählt",
    "selectedTemplates": "ausgewählt",
    "selectiveRestore": "Selektiv wiederherstellen",
    "sendDigest": "Digest senden",
    "settings": "Einstellungen",
    "settingsDescription": "Konfiguration, Daten, Benachrichtigungen und Integrationen.",
    "settingsIntro": "Konfiguration, Diagnose und Backups für dein Maintenance Dashboard.",
    "settingsSection": "Einstellungen",
    "showCompleted": "Erledigte anzeigen",
    "showQuickFilters": "Quick-Filter anzeigen",
    "skip": "Überspringen",
    "snooze": "Pausieren",
    "snoozeClearedEvent": "Pause aufgehoben",
    "snoozeFor": "Pausieren für",
    "snoozedEvent": "Pausiert",
    "solar": "Solar",
    "sort": "Sortieren",
    "sortArea": "Bereich",
    "sortCreated": "Erstellt",
    "sortDue": "Fälligkeit",
    "sortName": "Name",
    "sortPosition": "Manuell",
    "sortPriority": "Priorität",
    "sortSmart": "Smart",
    "sortStatus": "Status",
    "sortUpdated": "Aktualisiert",
    "spring": "Frühling",
    "startSetup": "Auswahl hinzufügen",
    "starterPacks": "Starter-Pakete",
    "status": "Status",
    "summer": "Sommer",
    "tagFilter": "Tag",
    "tagPlaceholder": "filter, sicherheit, saisonal",
    "tags": "Tags",
    "taskCounter": "Aufgabe",
    "taskEntities": "Task-Entities",
    "taskFocused": "Aufgabe hervorgehoben",
    "taskLabel": "Aufgaben",
    "todayFocus": "Heute fällig",
    "taskNotificationsEnabled": "Benachrichtigungen für diese Aufgabe",
    "taskType": "Typ",
    "tasksSection": "Aufgaben",
    "templateCategory": "Vorlagen-Kategorie",
    "templateSelectHint": "Wähle mehrere Vorlagen aus und füge nur die passenden hinzu – kein Vollspammen mehr.",
    "templatePickerHint": "Wähle eine Vorlage aus der kompakten Liste oder starte ohne Vorlage.",
    "templatePickerPlaceholder": "Vorlage suchen oder leer starten",
    "templatePickerSelected": "Vorlage ausgewählt: {name}",
    "templateCreates": "Wird angelegt",
    "templates": "Vorlagen",
    "testMode": "Testmodus",
    "testNotification": "Test senden",
    "thisMonth": "Diesen Monat",
    "thisWeek": "Diese Woche",
    "time": "Zeit",
    "timelineView": "Zeitachse",
    "today": "Heute",
    "todayRange": "Heute",
    "todoIncludeDisabled": "Deaktivierte Aufgaben in To-do anzeigen",
    "todoPlatform": "To-do-Plattform",
    "unavailable": "Nicht verfügbar",
    "unavailableHelp": "Sensor-/Zähleraufgaben ohne valide Entity, ungültige Limits oder aktuell nicht lesbare HA-States.",
    "unavailableNotifications": "Nicht verfügbar",
    "undo": "Rückgängig",
    "undoCompletedEvent": "Erledigung rückgängig",
    "unknownLabel": "Unbekannt",
    "upcomingWeek": "Nächste 7 Tage",
    "updated": "Aktualisiert",
    "ventilation": "Lüftung",
    "warning": "Warnung",
    "warningNotifications": "Warnungen",
    "warnings": "Warnungen",
    "water": "Wasser",
    "weekRange": "Diese Woche",
    "weeks": "Wochen",
    "winter": "Winter",
    "withoutEntity": "Ohne Entity",
    "yearly": "Jährlich",
    "yes": "Ja",
    "checklist": "Checkliste",
    "checklistEmpty": "Noch keine Checklistenpunkte vorhanden.",
    "checklistHint": "Nutze Checklistenpunkte für wiederkehrende Arbeitsschritte und Abschlussregeln.",
    "checklistItemPlaceholder": "Beispiel: Hauptwasserhahn absperren",
    "checklistMore": "+{count} weitere",
    "completionRequirementChecklist": "Checkliste abschließen",
    "completionRequirementCost": "Kosten eintragen",
    "completionRequirementMaterial": "Material angeben",
    "completionRequirementNote": "Notiz ausfüllen",
    "completionRequirementPerformedBy": "Ausführende Person angeben",
    "completionRequirements": "Abschlussregeln",
    "fieldChecklist": "Checkliste",
    "fieldCompletionRequirements": "Abschlussregeln",
    "fieldWorkflowState": "Workflow-Status",
    "taskRelevance": "Aufgaben-Relevanz",
    "recurrenceStandard": "Geplanter Zyklus",
    "recurrencePersistent": "Immer relevant",
    "recurrenceStandardShort": "Geplant",
    "recurrencePersistentShort": "Persistent",
    "persistentDefaultState": "Startstatus für persistente Aufgaben",
    "label": "Bezeichnung",
    "nameMissing": "Name ist erforderlich",
    "required": "Erforderlich",
    "resetChecklistOnCompletion": "Checkliste nach Abschluss zurücksetzen",
    "restartCycle": "Zyklus neu starten",
    "showChecklists": "Checklisten auf Karten anzeigen",
    "skipCycle": "Zyklus überspringen",
    "workflow": "Workflow",
    "workflowDefaults": "Standards",
    "workflowHint": "Vorbereitung, laufende Arbeit und Abschlussregeln direkt an der Aufgabe abbilden.",
    "workflowSettingsHint": "Standardverhalten für Workflow und Abschluss neuer oder wiederkehrender Aufgaben.",
    "workflowState": "Workflow-Status",
    "advancedSettings": "Erweiterte Einstellungen",
    "workflowPreset": "Workflow-Preset",
    "presetMaintenance": "Normale Wartung",
    "presetPersistent": "Immer relevant",
    "presetRepair": "Störung/Reparatur",
    "yearlyCosts": "Kosten dieses Jahr",
    "saveNote": "Notiz speichern",
    "maintenanceNotes": "Wartungsnotizen",
    "qualityCheck": "Qualitätscheck",
    "groupBlocked": "Blockiert",
    "groupOverdue": "Überfällig",
    "groupThisWeek": "Diese Woche",
    "groupLater": "Später",
    "workflowStart": "Arbeit starten",
    "workflowStartShort": "Start",
    "workflowReady": "Auf bereit setzen",
    "workflowPauseShort": "Bereit",
    "workflowBlock": "Blockieren",
    "workflowResetAction": "Fortschritt zurücksetzen",
    "workflowResets": "Resets",
    "runsCompleted": "Abgeschlossene Durchläufe",
    "runsSkipped": "Übersprungene Durchläufe",
    "workflow_blocked": "Blockiert",
    "workflow_completed": "Abgeschlossen",
    "workflow_in_progress": "In Arbeit",
    "workflow_planned": "Geplant",
    "workflow_ready": "Bereit",
    "workflowSet_planned": "Aufgabe wurde auf Geplant gesetzt.",
    "workflowSet_ready": "Aufgabe ist wieder bereit.",
    "workflowSet_in_progress": "Arbeit wurde gestartet.",
    "workflowSet_blocked": "Aufgabe wurde blockiert.",
    "defaultWorkflowState": "Standard-Workflow-Status",
    "addChecklistItem": "Checklistenpunkt hinzufügen",
    "moreActions": "Weitere Aktionen",
    "openBreakdown": "Offene Aufgaben",
    "wizardStepStart": "Start",
    "wizardStartHint": "Lege den Eintrag leer an oder übernimm eine passende Vorlage.",
    "wizardScheduleHint": "Definiere, wann die Aufgabe wieder relevant wird.",
    "wizardMissingHint": "{count} Angaben fehlen",
    "wizardBack": "Zurück",
    "wizardNext": "Weiter",
    "wizardReadyHint": "Alle notwendigen Angaben sind vorhanden"
  },
  "en": {
    "actionBackupCreated": "Backup created",
    "actionBackupDeleted": "Backup deleted",
    "actionBackupUpdated": "Backup updated",
    "actionBulkDone": "Bulk action completed",
    "actionDeleted": "Maintenance task deleted",
    "actionDone": "Maintenance task marked as done",
    "actionExported": "Export created",
    "actionFilterDeleted": "Filter deleted",
    "actionFilterSaved": "Filter saved",
    "actionFilterUpdated": "Filter updated",
    "actionImported": "Data imported",
    "actionIntegrityRepaired": "Integrity repaired",
    "actionNotificationSent": "Notification sent",
    "actionReactivated": "One-time task reactivated",
    "actionRestored": "Backup restored",
    "actionSaved": "Maintenance task saved",
    "actionWorkflowReset": "Workflow progress reset",
    "actionWorkflowUpdated": "Workflow updated",
    "actionCycleRestarted": "Task cycle restarted",
    "actionCycleSkipped": "Task cycle skipped",
    "actionSnoozeCleared": "Snooze cleared",
    "actionSnoozeDays": "Snooze action days",
    "actionSnoozed": "Maintenance task snoozed",
    "actionTemplatesAdded": "Templates added",
    "actionUndo": "History entry undone",
    "addPackage": "Add package",
    "actionableNotifications": "Action buttons",
    "active": "Open",
    "activitiesToday": "Activities today",
    "activitiesWeek": "Activities this week",
    "add": "Add maintenance task",
    "addFirst": "Add first maintenance task",
    "addSelected": "Add selected",
    "addTemplate": "Add template",
    "added": "Added",
    "advancedFilters": "Advanced filters",
    "all": "All",
    "allActions": "All actions",
    "allTasks": "All tasks",
    "allTime": "All time",
    "appSubtitle": "Backend-managed maintenance planning with history, backups and a dedicated sidebar panel.",
    "appTitle": "Home Maintenance & Technology",
    "appearance": "Appearance",
    "appearanceHint": "Colors are optional. Empty means: use the Home Assistant theme.",
    "archived": "Archived",
    "area": "Area",
    "areaFilter": "Area",
    "auditChanges": "Changes",
    "auditEmpty": "No audit entries yet.",
    "auditEvent": "Audit event",
    "auditLog": "Audit log",
    "auditRetention": "Audit retention",
    "auditSection": "Audit log",
    "auditSource": "Source",
    "auditTask": "Task",
    "automatic": "Automatic",
    "automaticLabel": "Automatic",
    "autumn": "Autumn",
    "availableRestoreTasks": "changed or added tasks available",
    "backupActivities": "Backup events",
    "backupBeforeBulk": "Backup before bulk actions",
    "backupBeforeImport": "Backup before import",
    "backupBeforeMigration": "Backup before migration",
    "backupBeforeRestore": "Backup before restore",
    "backupBeforeTaskDelete": "Backup before task deletion",
    "backupBeforeTaskUpdate": "Backup before task updates",
    "backupDiff": "Backup diff",
    "backupLabel": "Backup",
    "backupName": "Backup name",
    "backupRestore": "Backup & Restore",
    "backupRotation": "Backup rotation",
    "backups": "Backups",
    "basic": "Basics",
    "brandName": "Maintenance Dashboard",
    "building": "Building",
    "bulkAction": "Bulk action",
    "bulkArea": "Change area",
    "bulkCategory": "Change category",
    "bulkClearSnooze": "Clear snoozes",
    "bulkDelete": "Delete",
    "bulkDisable": "Disable",
    "bulkDone": "Mark done",
    "bulkDuplicate": "Duplicate",
    "bulkEnable": "Enable",
    "bulkPreview": "Bulk action preview",
    "bulkPriority": "Change priority",
    "bulkResetProgress": "Reset progress",
    "bulkRestore": "Restore",
    "bulkSnooze": "Snooze",
    "bulkWorkflow": "Set workflow",
    "calendarDuration": "Calendar duration (minutes)",
    "calendarIncludeSnoozed": "Show snoozed tasks in Calendar",
    "calendarPlatform": "Calendar platform",
    "calendarRepeat": "Repeat",
    "cancel": "Cancel",
    "cardColor": "Card color",
    "cardsView": "Grid",
    "category": "Category",
    "categoryFilter": "Category",
    "changeActivities": "Changes",
    "changed": "Changed",
    "changes": "Changes",
    "cleanupEntitiesNow": "Clean up entities",
    "cleanupRemovedEntities": "Automatically remove orphaned entities",
    "clear": "Clear",
    "clearColors": "Reset colors",
    "clearNotificationHistory": "Clear history",
    "clearSelection": "Clear selection",
    "clearSnooze": "Clear snooze",
    "common": "Recommended",
    "compactView": "List",
    "compareBackup": "Compare",
    "collapseStarterPacks": "Collapse starter packs",
    "completed": "Done",
    "completedActivities": "Completed tasks",
    "completedEvent": "Completed",
    "completedThisYear": "Done this year",
    "completionCost": "Cost",
    "completionCurrency": "Currency",
    "completionMaterial": "Material / parts",
    "completionNote": "Completion note",
    "confirmBulk": "Run this bulk action?",
    "confirmBulkTitle": "Review and confirm changes",
    "copyDiagnostics": "Copy diagnostics",
    "createBackup": "Create backup",
    "created": "Created",
    "critical": "Critical",
    "criticalNotifications": "Critical",
    "custom": "Manual",
    "customCategoryMissing": "Custom category is required",
    "dailyDigest": "Daily digest",
    "dashboard": "Dashboard",
    "dashboardDensity": "Density",
    "dashboardLayout": "Dashboard view",
    "dashboardSurfaceHint": "View, density and filter behavior.",
    "dashboardToolbarHint": "Create a task, search open maintenance items and narrow the list by status or priority.",
    "dataIntegrity": "Data integrity",
    "dataSafety": "Data safety",
    "dataSafetyExportHint": "Tasks, history, settings, notification state, quarantine, audit and backup metadata.",
    "days": "Days",
    "defaultDueFilter": "Default due filter",
    "defaultTaskRelevance": "Default task relevance",
    "delete": "Delete",
    "deleteFilter": "Delete filter",
    "deleteRecord": "Delete record",
    "deleted": "Deleted",
    "deletedEvent": "Deleted",
    "disabled": "Disabled",
    "densityComfortable": "Comfortable",
    "densityCompact": "Compact",
    "description": "Description",
    "deselectAll": "Clear selection",
    "diagnostics": "Diagnostics",
    "digestTime": "Digest time",
    "done": "Done",
    "downloadBackup": "Download backup",
    "dragHint": "Manual sorting via drag & drop or arrows. Smart sorting uses status, priority, due date and manual position.",
    "due": "Due",
    "dueDate": "Due date",
    "dueDateMissing": "Due date is required",
    "dueFilter": "Due",
    "dueNotifications": "Due notifications",
    "dueOnly": "Due only",
    "dueThisMonth": "Due this month",
    "dueThisWeek": "Due this week",
    "dueToday": "Due today",
    "dueNext7": "in 7 days",
    "dueNext30": "in 30 days",
    "duplicateMode": "Duplicates",
    "duplicateNewId": "Generate new IDs",
    "duplicateOverwrite": "Overwrite",
    "duplicateSkip": "Skip",
    "edit": "Edit",
    "electrical": "Electrical",
    "enabled": "Enabled",
    "entity": "Entity",
    "entityFilter": "Entity availability",
    "entityGrouping": "Device grouping",
    "entityGroupingCategory": "Per category",
    "entityGroupingDashboard": "Single dashboard device",
    "entityGroupingNone": "No device grouping",
    "entityMode": "Task entities",
    "entityModeHint": "Optionally create Home Assistant entities for individual maintenance tasks.",
    "entitySyncHint": "Entities are synchronized without a restart. Optional cleanup removes orphaned registry entries.",
    "escalation": "Escalation",
    "escalationAfterDays": "Escalate after days",
    "execute": "Execute",
    "expandStarterPacks": "Expand starter packs",
    "exportData": "Export",
    "exportRecord": "Export record",
    "exportSelected": "Export selected",
    "fieldCalendarRepeat": "Repeat",
    "fieldCategory": "Category",
    "fieldDescription": "Description",
    "fieldDueDate": "Due date",
    "fieldEnabled": "Enabled",
    "fieldInterval": "Interval",
    "fieldLastDone": "Last done",
    "fieldName": "Name",
    "fieldPriority": "Priority",
    "fieldSchedule": "Schedule",
    "fieldSeason": "Season",
    "filterName": "Filter name",
    "favorite": "Favorite",
    "favorites": "Favorites",
    "filters": "Filters",
    "fixedDate": "Fixed date",
    "fixedDay": "Day",
    "fixedMonth": "Month",
    "focusNextTask": "Jump to next task",
    "frontendLabel": "Frontend",
    "full": "Full",
    "garage": "Garage",
    "garden": "Garden",
    "general": "General",
    "globalLabel": "Global",
    "groupDigestByCategory": "Group digest by category",
    "hasEntity": "With entity",
    "health": "Health score",
    "healthHelp": "Weighted score based on status, priority and availability. High-priority critical tasks reduce it much more strongly.",
    "heating": "Heating",
    "hideCompleted": "Hide completed",
    "highPriority": "High priority",
    "history": "History",
    "historyDescription": "History, changes and completed maintenance.",
    "historyLabel": "history",
    "historyRange": "Period",
    "historyScopeAll": "All",
    "historyScopeChanges": "Changes",
    "historyScopeCompleted": "Completed",
    "historySearch": "Search history",
    "historySection": "History",
    "historyTask": "Task",
    "historyType": "Action",
    "hours": "Hours",
    "household": "Household",
    "icon": "Icon",
    "iconColor": "Icon color",
    "importData": "Import",
    "importJson": "Import JSON",
    "importMode": "Import mode",
    "importPaste": "Paste JSON here",
    "importPreview": "Preview import",
    "importedEvent": "Imported",
    "includeDashboardLink": "Include dashboard link",
    "includeSnoozed": "Include snoozed",
    "inheritGlobalRules": "Use global rules",
    "integrationLabel": "Integration",
    "integrityCheckOnStart": "Check on startup",
    "integrityErrors": "Errors",
    "integrityHealthy": "Data is healthy",
    "integrityWarnings": "Warnings",
    "interval": "Interval",
    "intervalSchedule": "Interval",
    "intervalUnit": "Unit",
    "invalidRecord": "Invalid record",
    "invertSelection": "Invert selection",
    "it_network": "IT/Network",
    "lastAutomaticBackup": "Last automatic backup",
    "lastDigest": "Last digest",
    "lastDone": "Last done",
    "lastMigration": "Last migration",
    "lastSent": "Last sent",
    "later": "Later",
    "loading": "Loading...",
    "manual": "Manual",
    "markDone": "Save completion",
    "matchingRecords": "Matching",
    "materialEmpty": "Start with a template or create a custom maintenance task. Data is stored by the backend inside Home Assistant.",
    "materialPlaceholder": "Filter, blades, seal …",
    "maximumBackupAge": "Maximum age (days)",
    "maximumBackups": "Maximum backups",
    "mergeMode": "Merge",
    "meter": "Sensor/Meter",
    "migration": "Migration",
    "mobileMore": "More",
    "monthNext": "Next month",
    "monthPrevious": "Previous month",
    "monthRange": "This month",
    "monthly": "Monthly",
    "months": "Months",
    "name": "Name",
    "nativePlatforms": "Native Home Assistant platforms",
    "nativePlatformsHint": "Optionally use tasks in native Home Assistant cards and automations.",
    "navigation": "Navigation",
    "newEntry": "New entry",
    "createEmpty": "Create empty",
    "createFromTemplate": "Start from template",
    "newEntryWizard": "Guided entry",
    "newValue": "After",
    "next": "Next task",
    "next14Days": "Next 14 days",
    "next90Days": "Next 90 days",
    "nextTask": "Next task",
    "nextTaskHint": "Click to jump to the task",
    "no": "No",
    "noChanges": "No field changes stored",
    "noCompletionDetails": "No additional details",
    "noDueDate": "No due date",
    "noDueTasks": "No tasks in this period",
    "noHistory": "No history yet.",
    "noNotes": "No notes yet.",
    "noTasks": "No maintenance tasks yet.",
    "noTasksMatch": "No matching maintenance tasks found.",
    "noTemplatesMatch": "No matching templates found.",
    "noteOptional": "Optional note",
    "notePlaceholder": "Short note for this task ...",
    "noteSaved": "Note saved",
    "notificationFailed": "Failed",
    "notificationHistory": "Notification history",
    "notificationHistoryCleared": "Notification history cleared",
    "notificationHistoryEmpty": "No notifications sent yet",
    "notificationHistoryRetention": "Keep history entries",
    "notificationLabel": "Notification",
    "notificationPreview": "Preview",
    "notificationRules": "Notification rules",
    "notificationRulesHint": "Status changes, repeats, escalations, quiet hours and mobile action buttons are processed centrally.",
    "notificationServiceOverride": "Custom notify service",
    "notificationStateSection": "Notification state",
    "notificationStatus": "Notifications",
    "notifications": "Notifications",
    "notifyCritical": "On critical",
    "notifyDueTasks": "Send due tasks",
    "notifyOverdue": "On overdue",
    "notifyService": "Notify service",
    "notifyUnavailable": "On unavailable",
    "notifyWarning": "On warning",
    "off": "Off",
    "ok": "OK",
    "onboarding": "Quick start",
    "onboardingHint": "Choose one or more starter packs. Every entry can be adjusted afterwards and more templates can be added later.",
    "onboardingTitle": "Start maintenance planning in a few clicks",
    "oncePerStatus": "Only once per status",
    "oneTime": "One-time",
    "oneTimeArchiveHint": "After completion, the task is archived and can be reactivated later.",
    "oneTimeCompletionHint": "This task will be archived after saving. It remains available in history and completed tasks.",
    "openHistory": "Open history",
    "overdue": "Overdue",
    "overdueNotifications": "Overdue",
    "ownCategory": "Custom category",
    "packAdded": "Starter pack added",
    "pausedUntil": "Paused until",
    "pendingRepairs": "Pending repairs",
    "performedBy": "Performed by",
    "pinBackup": "Pin backup",
    "pinned": "Pinned",
    "popular": "Popular",
    "preview": "Preview",
    "previewRequired": "Preview the import first",
    "previewTask": "Task for preview",
    "previousTask": "Previous task",
    "previousValue": "Before",
    "priority": "Priority",
    "priority1": "Low",
    "priority2": "Normal",
    "priority3": "Important",
    "priority4": "High",
    "priority5": "Critical",
    "priorityFilter": "Priority",
    "priorityHint": "Priority affects smart sorting and health score.",
    "processNotificationsNow": "Evaluate rules now",
    "progress": "Progress",
    "quarantine": "Quarantine",
    "quarantineInvalidRecords": "Quarantine invalid records",
    "quarantineRetention": "Quarantine retention",
    "quarantineSection": "Quarantine",
    "quietFrom": "Quiet from",
    "quietHours": "Quiet hours",
    "quietTo": "Quiet to",
    "randomColors": "Random colors",
    "reactivate": "Reactivate",
    "reactivatedEvent": "Reactivated",
    "workflowChangedEvent": "Workflow changed",
    "workflowResetEvent": "Workflow reset",
    "workflowResetSummary": "Progress was reset.",
    "cycleRestartedEvent": "Cycle restarted",
    "cycleRestartedSummary": "Cycle was restarted.",
    "cycleSkippedEvent": "Cycle skipped",
    "cycleSkippedSummary": "Cycle was skipped.",
    "recommended": "Recommended",
    "recommendedOnly": "Recommended only",
    "records": "records",
    "remaining": "remaining",
    "rememberDashboardView": "Remember last view",
    "removed": "Removed",
    "repairIntegrity": "Repair automatically",
    "repeatEveryDays": "Repeat after days",
    "repeatNotifications": "Repeats",
    "replaceMode": "Replace",
    "restore": "Restore",
    "restoreBackup": "Restore backup",
    "restoreRecord": "Restore record",
    "restoreSections": "Restore sections",
    "restoredEvent": "Restored",
    "runIntegrityCheck": "Check integrity",
    "safety": "Safety",
    "safetyBackup": "Safety backup",
    "save": "Save",
    "saveDashboardSettings": "Save dashboard settings",
    "saveFilter": "Save filter",
    "savePinnedFilter": "Save pinned",
    "savedFilters": "Saved filters",
    "schedule": "Schedule",
    "scheduleFilter": "Schedule",
    "scheduleMode": "Schedule",
    "schemaLabel": "Schema",
    "search": "Search",
    "seasonal": "Seasonal",
    "selectAllVisible": "Select visible",
    "selectProblems": "Select problems",
    "selectionToolbarHint": "Actions for the current selection",
    "selectTemplate": "Start from template",
    "applyTemplate": "Apply template",
    "selectedTasks": "selected tasks",
    "selectedTasksCount": "tasks selected",
    "selectedTemplates": "selected",
    "selectiveRestore": "Selective restore",
    "sendDigest": "Send digest",
    "settings": "Settings",
    "settingsDescription": "Configuration, data, notifications and integrations.",
    "settingsIntro": "Configuration, diagnostics and backups for your Maintenance Dashboard.",
    "settingsSection": "Settings",
    "showCompleted": "Show completed",
    "showQuickFilters": "Show quick filters",
    "skip": "Skip",
    "snooze": "Snooze",
    "snoozeClearedEvent": "Snooze cleared",
    "snoozeFor": "Snooze for",
    "snoozedEvent": "Snoozed",
    "solar": "Solar",
    "sort": "Sort",
    "sortArea": "Area",
    "sortCreated": "Created",
    "sortDue": "Due date",
    "sortName": "Name",
    "sortPosition": "Manual",
    "sortPriority": "Priority",
    "sortSmart": "Smart",
    "sortStatus": "Status",
    "sortUpdated": "Updated",
    "spring": "Spring",
    "startSetup": "Add selection",
    "starterPacks": "Starter packs",
    "status": "Status",
    "summer": "Summer",
    "tagFilter": "Tag",
    "tagPlaceholder": "filter, safety, seasonal",
    "tags": "Tags",
    "taskCounter": "Task",
    "taskEntities": "Task entities",
    "taskFocused": "Task highlighted",
    "taskLabel": "tasks",
    "todayFocus": "Due today",
    "taskNotificationsEnabled": "Notifications for this task",
    "taskType": "Type",
    "tasksSection": "Tasks",
    "templateCategory": "Template category",
    "templateSelectHint": "Select multiple templates and add only what fits.",
    "templatePickerHint": "Pick a template from the compact list or start without one.",
    "templatePickerPlaceholder": "Search template or start empty",
    "templatePickerSelected": "Selected template: {name}",
    "templateCreates": "Will create",
    "templates": "Templates",
    "testMode": "Test mode",
    "testNotification": "Send test",
    "thisMonth": "This month",
    "thisWeek": "This week",
    "time": "Time",
    "timelineView": "Timeline",
    "today": "Today",
    "todayRange": "Today",
    "todoIncludeDisabled": "Show disabled tasks in To-do",
    "todoPlatform": "To-do platform",
    "unavailable": "Unavailable",
    "unavailableHelp": "Meter tasks without a valid entity, invalid limits or currently unreadable Home Assistant states.",
    "unavailableNotifications": "Unavailable",
    "undo": "Undo",
    "undoCompletedEvent": "Completion undone",
    "unknownLabel": "Unknown",
    "upcomingWeek": "Next 7 days",
    "updated": "Updated",
    "ventilation": "Ventilation",
    "warning": "Warning",
    "warningNotifications": "Warnings",
    "warnings": "Warnings",
    "water": "Water",
    "weekRange": "This week",
    "weeks": "Weeks",
    "winter": "Winter",
    "withoutEntity": "Without entity",
    "yearly": "Yearly",
    "yes": "Yes",
    "checklist": "Checklist",
    "checklistEmpty": "No checklist items yet.",
    "checklistHint": "Use checklist items for repeatable work steps and completion gates.",
    "checklistItemPlaceholder": "Example: Shut off the main valve",
    "checklistMore": "+{count} more",
    "completionRequirementChecklist": "Complete checklist",
    "completionRequirementCost": "Enter cost",
    "completionRequirementMaterial": "Add material",
    "completionRequirementNote": "Add note",
    "completionRequirementPerformedBy": "Add executor",
    "completionRequirements": "Completion requirements",
    "fieldChecklist": "Checklist",
    "fieldCompletionRequirements": "Completion rules",
    "fieldWorkflowState": "Workflow state",
    "taskRelevance": "Task relevance",
    "recurrenceStandard": "Scheduled cycle",
    "recurrencePersistent": "Always relevant",
    "recurrenceStandardShort": "Scheduled",
    "recurrencePersistentShort": "Persistent",
    "persistentDefaultState": "Persistent start state",
    "label": "Label",
    "nameMissing": "Name is required",
    "required": "Required",
    "resetChecklistOnCompletion": "Reset checklist after completion",
    "restartCycle": "Restart cycle",
    "showChecklists": "Show checklists on cards",
    "skipCycle": "Skip cycle",
    "workflow": "Workflow",
    "workflowDefaults": "Defaults",
    "workflowHint": "Track preparation, work in progress and completion rules directly on the task.",
    "workflowSettingsHint": "Default workflow behavior for new and recurring tasks.",
    "workflowState": "Workflow state",
    "advancedSettings": "Advanced settings",
    "workflowPreset": "Workflow preset",
    "presetMaintenance": "Normal maintenance",
    "presetPersistent": "Always relevant",
    "presetRepair": "Incident/repair",
    "yearlyCosts": "Costs this year",
    "saveNote": "Save note",
    "maintenanceNotes": "Maintenance notes",
    "qualityCheck": "Quality check",
    "groupBlocked": "Blocked",
    "groupOverdue": "Overdue",
    "groupThisWeek": "This week",
    "groupLater": "Later",
    "workflowStart": "Start work",
    "workflowStartShort": "Start",
    "workflowReady": "Set ready",
    "workflowPauseShort": "Ready",
    "workflowBlock": "Block work",
    "workflowResetAction": "Reset progress",
    "workflowResets": "Resets",
    "runsCompleted": "Completed runs",
    "runsSkipped": "Skipped runs",
    "workflow_blocked": "Blocked",
    "workflow_completed": "Completed",
    "workflow_in_progress": "In progress",
    "workflow_planned": "Planned",
    "workflow_ready": "Ready",
    "workflowSet_planned": "Task was set to planned.",
    "workflowSet_ready": "Task is ready again.",
    "workflowSet_in_progress": "Work was started.",
    "workflowSet_blocked": "Task was blocked.",
    "defaultWorkflowState": "Default workflow state",
    "addChecklistItem": "Add checklist item",
    "moreActions": "More actions",
    "openBreakdown": "Open tasks",
    "wizardStepStart": "Start",
    "wizardStartHint": "Create an empty entry or apply a matching template.",
    "wizardScheduleHint": "Define when the task becomes relevant again.",
    "wizardMissingHint": "{count} fields missing",
    "wizardBack": "Back",
    "wizardNext": "Continue",
    "wizardReadyHint": "All required fields are complete"
  }
});

// ---- frontend/src/types.ts ----
// Runtime data contracts for the backend-owned Maintenance Dashboard panel.
// JSDoc is used because the lightweight build concatenates browser-compatible
// source modules directly into the final Home Assistant panel bundle.

/**
 * @typedef {Object} ChecklistItem
 * @property {string} id
 * @property {string} label
 * @property {boolean} done
 * @property {boolean} required
 */

/**
 * @typedef {Object} CompletionRequirements
 * @property {boolean} note
 * @property {boolean} material
 * @property {boolean} cost
 * @property {boolean} performed_by
 * @property {boolean} checklist
 */

/**
 * @typedef {Object} TaskExecution
 * @property {string} id
 * @property {number} sequence
 * @property {"planned"|"ready"|"in_progress"|"blocked"|"completed"|"skipped"|"canceled"} state
 * @property {string|null} [started_at]
 * @property {string|null} [updated_at]
 * @property {string|null} [completed_at]
 * @property {number} [reset_count]
 */

/**
 * @typedef {Object} ExecutionStats
 * @property {number} completed
 * @property {number} skipped
 * @property {number} restarted
 * @property {number} resets
 * @property {number} canceled
 */

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
 * @property {"planned"|"ready"|"in_progress"|"blocked"|"completed"|"skipped"|"canceled"} [workflow_state]
 * @property {"standard"|"persistent"} [recurrence_mode]
 * @property {ChecklistItem[]} [checklist]
 * @property {CompletionRequirements} [completion_requirements]
 * @property {TaskExecution} [current_execution]
 * @property {ExecutionStats} [execution_stats]
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
  settings: ["notifications", "task_entities", "workflow", "onboarding"],
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
 * @property {"cards"|"compact"|"timeline"} view_mode
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
    this._toast = null;
    this._toastTimer = null;
    this._templateCategory = "all";
    this._templateSeason = "all";
    this._templateOnlyCommon = false;
    this._templatePreview = null;
    this._templateDraftId = "";
    this._templatePickerQuery = "";
    this._templateFavorites = new Set(JSON.parse(localStorage.getItem("maintenance_dashboard_template_favorites") || "[]"));
    this._taskDetailId = "";
    this._taskNoteDraft = "";
    this._quickCreateOpen = false;
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
    this.shadowRoot.innerHTML = `${this._styles()}<main class="shell density-${this._html(this._density)}">${this._hero()}${content}${this._dialogHtml()}${this._taskDetailSheetHtml()}${this._historyDialogHtml()}${this._diagnosticsHtml()}${this._dataDialogHtml()}${this._notificationDialogHtml()}${this._templatePreviewHtml()}${this._completionDialogHtml()}${this._bulkPreviewHtml()}${this._onboardingDialogHtml()}${this._toastHtml()}</main>`;
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
    return `<header class="hero top-app-bar"><div class="hero-brand compact-brand"><strong>${this._t("brandName")}</strong></div><nav class="hero-actions" aria-label="${this._t("navigation")}">${this._nav("dashboard", "mdi:view-dashboard", this._t("dashboard"))}${this._nav("templates", "mdi:shape-outline", this._t("templates"))}${this._nav("history", "mdi:history", this._t("history"))}${this._nav("settings", "mdi:cog", this._t("settings"))}</nav></header>`;
  },

  _nav(view, icon, label) { return `<button data-view="${view}" class="nav ${this._view === view ? "active" : ""}" title="${label}" aria-label="${label}"><ha-icon icon="${icon}"></ha-icon><span>${label}</span></button>`; },

  _viewHtml() { if (this._view === "templates") return this._templatesHtml(); if (this._view === "history") return this._historyPageHtml(); if (this._view === "settings") return this._settingsHtml(); return this._dashboardHtml(); }
});


// ---- frontend/src/views/dashboard-view.ts ----
// Dashboard view rendering, configurable KPI widgets, layouts, filters and bulk actions.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _dashboardHtml() {
    const tasks = this._filteredTasks(false);
    const savedFilters = this._state?.settings?.dashboard?.saved_filters || [];
    return `
      ${this._dashboardWidgetsHtml()}
      <section class="toolbar dashboard-toolbar compact-dashboard-toolbar">
        <div class="toolbar-main dashboard-main">
          <input id="search" class="search" placeholder="${this._t("search")}" value="${this._html(this._search)}">
          <label><span>${this._t("status")}</span><select id="statusFilter">${["all", "ok", "warning", "critical", "overdue", "snoozed", "unavailable", "completed"].map(x => `<option value="${x}" ${this._statusFilter === x ? "selected" : ""}>${this._t(x)}</option>`).join("")}</select></label>
          <label><span>${this._t("sort")}</span><select id="sortMode">${["smart", "position", "priority", "due", "status", "name", "area", "created", "updated"].map(x => `<option value="${x}" ${this._sortMode === x ? "selected" : ""}>${this._t(`sort${x[0].toUpperCase()}${x.slice(1)}`)}</option>`).join("")}</select></label>
          <button class="ghost icon-only" data-action="toggle-quick-filters" title="${this._t("filters")}"><ha-icon icon="mdi:filter-variant"></ha-icon></button>
          <button class="ghost completed-toggle" data-action="toggle-completed"><ha-icon icon="mdi:archive-check-outline"></ha-icon>${this._showCompleted ? this._t("hideCompleted") : this._t("showCompleted")}</button>
        </div>
        <div class="layout-switch" role="group" aria-label="${this._t("dashboardLayout")}">
          ${this._layoutButton("cards", "mdi:view-grid-outline", "cardsView")}
          ${this._layoutButton("compact", "mdi:view-list-outline", "compactView")}
          ${this._layoutButton("timeline", "mdi:timeline-clock-outline", "timelineView")}
        </div>
      </section>
      ${this._quickFiltersOpen ? this._quickFiltersHtml() : ""}
      ${this._showAdvancedFilters ? this._advancedFiltersHtml(savedFilters) : ""}
      ${tasks.length ? this._taskLayoutHtml(tasks) : this._emptyHtml()}
      ${this._selectedTasks.size ? this._bulkToolbarHtml() : ""}
      <div class="quick-create-wrap">${this._quickCreateOpen ? `<div class="quick-create-menu"><button data-action="create"><ha-icon icon="mdi:plus"></ha-icon>${this._t("createEmpty")}</button><button data-action="quick-create-template"><ha-icon icon="mdi:shape-plus-outline"></ha-icon>${this._t("createFromTemplate")}</button></div>` : ""}<button class="dashboard-fab extended-fab" data-action="toggle-quick-create" title="${this._t("newEntry")}" aria-label="${this._t("newEntry")}"><ha-icon icon="mdi:plus"></ha-icon><span>${this._t("newEntry")}</span></button></div>
    `;
  },

  _dashboardWidgetsHtml() {
    const s = this._state?.summary || {};
    const health = Number(s.health ?? 100);
    const unavailable = Number(s.unavailable ?? 0);
    const items = [
      `<strong class="status-health ${health < 70 ? "warning" : ""}"><ha-icon icon="mdi:heart-pulse"></ha-icon>${health}% ${this._t("health")}</strong>`,
      `<span class="status-open metric-popover"><ha-icon icon="mdi:circle-outline"></ha-icon><b>${s.open ?? s.active ?? 0}</b> ${this._t("active")}${this._openBreakdownHtml()}</span>`,
      `<span class="${s.critical ? "critical" : ""}"><ha-icon icon="mdi:alert-circle-outline"></ha-icon><b>${s.critical ?? 0}</b> ${this._t("critical")}</span>`,
      `<span><ha-icon icon="mdi:calendar-today-outline"></ha-icon><b>${this._countDueByFilter("today")}</b> ${this._t("todayFocus")}</span>`,
      `<span><ha-icon icon="mdi:calendar-week-outline"></ha-icon><b>${this._countDueWithinDays(7)}</b> ${this._t("dueNext7")}</span>`,
      `<span><ha-icon icon="mdi:calendar-month-outline"></ha-icon><b>${this._countDueWithinDays(30)}</b> ${this._t("dueNext30")}</span>`,
      `<span><ha-icon icon="mdi:clipboard-search-outline"></ha-icon><b>${this._qualityIssues().length}</b> ${this._t("qualityCheck")}</span>`,
      `<span><ha-icon icon="mdi:check-circle-outline"></ha-icon><b>${s.completed_this_year ?? 0}</b> ${this._t("completedThisYear")}</span>`,
      unavailable ? `<span title="${this._t("unavailableHelp")}"><ha-icon icon="mdi:cloud-question-outline"></ha-icon><b>${unavailable}</b> ${this._t("unavailable")}</span>` : "",
    ];
    return `<section class="dashboard-status-line">${items.filter(Boolean).join("<i></i>")}</section>`;
  },

  _openBreakdownHtml() {
    const tasks = (this._state?.tasks || []).filter(task => {
      const status = this._state?.runtime?.[task.id]?.status;
      return !task.deleted && status !== "completed";
    });
    const byPriority = [5, 4, 3, 2, 1].map(priority => [priority, tasks.filter(task => Number(task.priority || 0) === priority).length]).filter(([, count]) => count);
    const workflow = [
      ["in_progress", "workflow_in_progress", tasks.filter(task => task.workflow_state === "in_progress").length],
      ["blocked", "workflow_blocked", tasks.filter(task => task.workflow_state === "blocked").length],
      ["ready", "workflow_ready", tasks.filter(task => task.workflow_state === "ready").length],
    ].filter(([, , count]) => count);
    const rows = [
      ...byPriority.map(([priority, count]) => `<div><span>${this._priorityLabel(priority)}</span><strong>${count}</strong></div>`),
      ...workflow.map(([, label, count]) => `<div><span>${this._t(label)}</span><strong>${count}</strong></div>`),
    ];
    return rows.length ? `<aside class="status-popover"><strong>${this._t("openBreakdown")}</strong>${rows.join("")}</aside>` : "";
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
    return `<section class="quick-filter-strip"><button data-action="toggle-advanced-filters"><ha-icon icon="mdi:tune-variant"></ha-icon><span>${this._t("advancedFilters")}</span></button>${chips.map(([kind, value, icon, label, count]) => {
      const active = (kind === "status" && this._statusFilter === value) || (kind === "due" && this._dueFilter === value) || (kind === "priority" && String(this._priorityFilter) === String(value)) || (kind === "entity" && this._entityFilter === value);
      return `<button class="${active ? "active" : ""}" data-quick-filter="${kind}:${value}"><ha-icon icon="${icon}"></ha-icon><span>${this._t(label)}</span><strong>${count}</strong></button>`;
    }).join("")}</section>`;
  },

  _countDueWithinDays(days) {
    const now = Date.now();
    const end = now + days * 86400000;
    return (this._state?.tasks || []).filter(task => {
      if (task.deleted || task.enabled === false) return false;
      const status = this._state?.runtime?.[task.id]?.status;
      if (status === "completed") return false;
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
    return `<section class="panel bulk-toolbar floating-bulk-toolbar">
      <div class="bulk-toolbar-head"><strong>${selected.length} ${this._t("selectedTasksCount")}</strong><span>${this._t("selectionToolbarHint")}</span></div>
      <label class="bulk-toolbar-field"><span>${this._t("bulkAction")}</span><select id="bulkAction">${[
        ["done","bulkDone"],["workflow","bulkWorkflow"],["reset_progress","bulkResetProgress"],["snooze","bulkSnooze"],["clear_snooze","bulkClearSnooze"],["category","bulkCategory"],["area","bulkArea"],["priority","bulkPriority"],["enable","bulkEnable"],["disable","bulkDisable"],["delete","bulkDelete"],["restore","bulkRestore"],["duplicate","bulkDuplicate"]
      ].map(([value,key]) => `<option value="${value}" ${this._bulkAction === value ? "selected" : ""}>${this._t(key)}</option>`).join("")}</select></label>
      ${this._bulkValueInputHtml()}
      <button class="primary" data-action="execute-bulk"><ha-icon icon="mdi:playlist-check"></ha-icon>${this._t("execute")}</button>
      <div class="bulk-toolbar-secondary">
        <button class="ghost" data-action="export-selected"><ha-icon icon="mdi:download-multiple"></ha-icon>${this._t("exportSelected")}</button>
        <button class="ghost" data-action="select-problem-tasks"><ha-icon icon="mdi:alert-plus-outline"></ha-icon>${this._t("selectProblems")}</button>
        <button class="ghost" data-action="invert-task-selection"><ha-icon icon="mdi:select-inverse"></ha-icon>${this._t("invertSelection")}</button>
        <button class="ghost" data-action="clear-task-selection"><ha-icon icon="mdi:selection-remove"></ha-icon>${this._t("clearSelection")}</button>
      </div>
    </section>`;
  },

  _bulkValueInputHtml() {
    if (this._bulkAction === "snooze") return `<label class="bulk-toolbar-field"><span>${this._t("days")}</span><input id="bulkValue" type="number" min="1" max="365" value="${this._html(this._bulkValue || "7")}"></label>`;
    if (this._bulkAction === "priority") return `<label class="bulk-toolbar-field"><span>${this._t("priority")}</span><select id="bulkValue">${[1,2,3,4,5].map(v => `<option value="${v}" ${String(this._bulkValue || 3) === String(v) ? "selected" : ""}>${v} · ${this._priorityLabel(v)}</option>`).join("")}</select></label>`;
    if (this._bulkAction === "workflow") return `<label class="bulk-toolbar-field"><span>${this._t("workflowState")}</span><select id="bulkValue">${["ready","in_progress","blocked"].map(state => `<option value="${state}" ${String(this._bulkValue || "ready") === state ? "selected" : ""}>${this._workflowStateLabel(state)}</option>`).join("")}</select></label>`;
    if (this._bulkAction === "category") return `<label class="bulk-toolbar-field"><span>${this._t("category")}</span><select id="bulkValue">${CATEGORY_KEYS.map(key => `<option value="${key}" ${this._bulkValue === key ? "selected" : ""}>${this._t(key)}</option>`).join("")}</select></label>`;
    if (this._bulkAction === "area") return `<label class="bulk-toolbar-field"><span>${this._t("area")}</span><input id="bulkValue" value="${this._html(this._bulkValue)}"></label>`;
    return "";
  },

  _taskLayoutHtml(tasks) {
    if (this._layoutMode === "compact") return this._compactTasksHtml(tasks);
    if (this._layoutMode === "timeline") return this._timelineTasksHtml(tasks);
    return `<section class="smart-task-groups">${this._smartTaskGroups(tasks).map(group => group.tasks.length ? `<section class="smart-task-group"><header><div><h2>${this._t(group.label)}</h2><p>${group.tasks.length} ${this._t("taskLabel")}</p></div><span>${group.tasks.length}</span></header><div class="task-grid">${group.tasks.map(t => this._taskCard(t)).join("")}</div></section>` : "").join("")}</section>`;
  },

  _smartTaskGroups(tasks) {
    const now = Date.now();
    const endWeek = now + 7 * 86400000;
    const buckets = [
      { label: "groupBlocked", tasks: [] },
      { label: "groupOverdue", tasks: [] },
      { label: "groupThisWeek", tasks: [] },
      { label: "groupLater", tasks: [] },
    ];
    for (const task of tasks) {
      const runtime = this._state?.runtime?.[task.id] || {};
      const due = runtime.due_at ? new Date(runtime.due_at).getTime() : Number.MAX_SAFE_INTEGER;
      if (task.workflow_state === "blocked") buckets[0].tasks.push(task);
      else if (runtime.status === "overdue" || due < now) buckets[1].tasks.push(task);
      else if (due <= endWeek) buckets[2].tasks.push(task);
      else buckets[3].tasks.push(task);
    }
    return buckets;
  },

  _compactTasksHtml(tasks) {
    return `<section class="compact-task-list">${tasks.map(task => {
      const runtime = this._state?.runtime?.[task.id] || {};
      const workflowState = task.workflow_state || "planned";
      const completed = runtime.status === "completed";
      return `<article class="compact-task-row ${runtime.status || "unavailable"}" data-task-card="${this._html(task.id)}">
        <label class="task-select"><input type="checkbox" data-select-task="${task.id}" ${this._selectedTasks.has(task.id) ? "checked" : ""}><span></span></label>
        <span class="icon-chip"><ha-icon icon="${this._html(task.icon || "mdi:wrench-clock")}"></ha-icon></span>
        <div class="grow"><strong>${this._html(task.name)}</strong><small>${this._categoryLabel(task)} · ${this._scheduleSummary(task)} · ${this._workflowStateLabel(workflowState)}</small></div>
        <span>${this._date(runtime.due_at)}</span><span class="status ${runtime.status || "unavailable"}">${this._t(runtime.status || "unavailable")}</span>
        <button class="icon" data-edit="${task.id}"><ha-icon icon="mdi:pencil"></ha-icon></button>${completed ? `<button class="icon" data-reactivate="${task.id}"><ha-icon icon="mdi:restore"></ha-icon></button>` : `<button class="icon" data-task-id="${task.id}" data-workflow-state="${workflowState === "in_progress" ? "ready" : "in_progress"}"><ha-icon icon="${workflowState === "in_progress" ? "mdi:rewind" : "mdi:play"}"></ha-icon></button><button class="icon" data-reset-task-progress="${task.id}"><ha-icon icon="mdi:restart"></ha-icon></button><button class="primary small" data-done="${task.id}"><ha-icon icon="mdi:check"></ha-icon></button>`}
      </article>`;
    }).join("")}</section>`;
  },

  _timelineTasksHtml(tasks) {
    const sorted = [...tasks].sort((a,b) => this._dueValue(this._state?.runtime?.[a.id]) - this._dueValue(this._state?.runtime?.[b.id]));
    return `<section class="timeline-view">${sorted.map(task => {
      const runtime = this._state?.runtime?.[task.id] || {};
      const status = runtime.status || "unavailable";
      const progress = status === "completed" ? 100 : Math.min(100, Math.max(0, runtime.progress || 0));
      const accent = this._statusAccent(status, task.card_color || task.icon_color || "var(--primary-color)");
      const workflowState = task.workflow_state || "planned";
      return `<article class="timeline-entry ${status}">
        <div class="timeline-marker"><span></span></div>
        <div class="timeline-card" data-task-card="${this._html(task.id)}" style="--task-accent:${this._html(accent)}">
          <span class="icon-chip"><ha-icon icon="${this._html(task.icon || "mdi:wrench-clock")}"></ha-icon></span>
          <div class="timeline-main"><strong>${this._html(task.name)}</strong><small>${this._categoryLabel(task)} · ${this._scheduleSummary(task)} · ${this._workflowStateLabel(workflowState)}</small></div>
          <div class="timeline-date"><span>${status === "completed" ? this._t("lastDone") : this._t("due")}</span><strong>${this._date(status === "completed" ? runtime.last_done : runtime.due_at)}</strong></div>
          <span class="status ${status}">${this._t(status)}</span>
          <div class="timeline-progress"><strong>${Math.round(progress)}%</strong><div class="progress"><div style="width:${progress}%"></div></div></div>
          <div class="timeline-actions"><button class="icon" title="${this._t("edit")}" data-edit="${task.id}"><ha-icon icon="mdi:pencil"></ha-icon></button>${status === "completed" ? `<button class="icon" title="${this._t("reactivate")}" data-reactivate="${task.id}"><ha-icon icon="mdi:restore"></ha-icon></button>` : `<button class="icon" title="${workflowState === "in_progress" ? this._t("workflowReady") : this._t("workflowStart")}" data-task-id="${task.id}" data-workflow-state="${workflowState === "in_progress" ? "ready" : "in_progress"}"><ha-icon icon="${workflowState === "in_progress" ? "mdi:rewind" : "mdi:play"}"></ha-icon></button><button class="icon" title="${this._t("workflowResetAction")}" data-reset-task-progress="${task.id}"><ha-icon icon="mdi:restart"></ha-icon></button><button class="icon" title="${this._t("done")}" data-done="${task.id}"><ha-icon icon="mdi:check"></ha-icon></button>`}</div>
        </div>
      </article>`;
    }).join("")}</section>`;
  },

  _emptyHtml() {
    return `<section class="empty expressive-empty"><div class="empty-orb"><ha-icon icon="mdi:clipboard-plus-outline"></ha-icon></div><h2>${this._t("noTasks")}</h2><p>${this._t("materialEmpty")}</p><div class="empty-actions"><button class="primary big" data-action="create"><ha-icon icon="mdi:plus"></ha-icon>${this._t("addFirst")}</button><button class="ghost big" data-view="templates"><ha-icon icon="mdi:shape-plus-outline"></ha-icon>${this._t("templates")}</button></div></section>`;
  }
});

Object.assign(MaintenanceDashboardPanel.prototype, {
  _taskDetailSheetHtml() {
    const task = (this._state?.tasks || []).find(item => item.id === this._taskDetailId);
    if (!task) return "";
    const runtime = this._state?.runtime?.[task.id] || {};
    const history = (this._state?.history || []).filter(event => event.task_id === task.id).slice(0, 12);
    const notes = Array.isArray(task.notes) ? task.notes : [];
    const checklist = Array.isArray(task.checklist) ? task.checklist : [];
    const totalCost = this._taskYearCost(task.id);
    return `<div class="sheet-backdrop"><aside class="task-detail-sheet"><header><div class="detail-title"><span class="icon-chip"><ha-icon icon="${this._html(task.icon || "mdi:wrench-clock")}"></ha-icon></span><div><h2>${this._html(task.name)}</h2><p>${this._categoryLabel(task)} · ${this._scheduleSummary(task)}</p></div></div><button class="icon" data-action="close-task-detail"><ha-icon icon="mdi:close"></ha-icon></button></header>
      <section class="detail-metrics"><div><span>${this._t("status")}</span><strong>${this._t(runtime.status || "unavailable")}</strong></div><div><span>${this._t("workflow")}</span><strong>${this._workflowStateLabel(task.workflow_state || "planned")}</strong></div><div><span>${this._t("due")}</span><strong>${this._date(runtime.due_at)}</strong></div><div><span>${this._t("yearlyCosts")}</span><strong>${totalCost}</strong></div></section>
      <section class="detail-actions"><button class="ghost" data-edit="${task.id}"><ha-icon icon="mdi:pencil"></ha-icon>${this._t("edit")}</button><button class="ghost" data-task-id="${task.id}" data-workflow-state="ready">${this._t("workflowReady")}</button><button class="ghost" data-task-id="${task.id}" data-workflow-state="in_progress">${this._t("workflowStart")}</button><button class="ghost" data-task-id="${task.id}" data-workflow-state="blocked">${this._t("workflowBlock")}</button><button class="primary" data-done="${task.id}"><ha-icon icon="mdi:check"></ha-icon>${this._t("done")}</button></section>
      ${task.description ? `<section class="detail-section"><h3>${this._t("description")}</h3><p>${this._html(task.description)}</p></section>` : ""}
      <section class="detail-section"><h3>${this._t("checklist")}</h3>${checklist.length ? checklist.map((item, index) => `<label class="checklist-item ${item.done ? "done" : ""}"><input type="checkbox" data-toggle-checklist="${task.id}:${index}" ${item.done ? "checked" : ""}><span>${this._html(item.label)}</span>${item.required ? `<span class="required-mark" title="${this._t("required")}"></span>` : ""}</label>`).join("") : `<p class="section-hint">${this._t("checklistEmpty")}</p>`}</section>
      <section class="detail-section"><h3>${this._t("maintenanceNotes")}</h3><div class="note-composer"><textarea id="taskNoteDraft" placeholder="${this._t("notePlaceholder")}">${this._html(this._taskNoteDraft)}</textarea><button class="primary" data-action="save-task-note">${this._t("saveNote")}</button></div>${notes.length ? `<div class="note-list">${notes.slice(0, 8).map(note => `<article><strong>${this._datetime(note.created_at)}</strong><p>${this._html(note.text || "")}</p></article>`).join("")}</div>` : `<p class="section-hint">${this._t("noNotes")}</p>`}</section>
      <section class="detail-section"><h3>${this._t("history")}</h3><div class="detail-timeline">${history.length ? history.map(event => `<article><ha-icon icon="${this._historyIcon(event.type)}"></ha-icon><div><strong>${this._historyEventLabel(event.type)}</strong><p>${this._historySummaryLine(event)}</p><small>${this._datetime(event.created_at)}</small></div></article>`).join("") : `<p class="section-hint">${this._t("noHistory")}</p>`}</div></section>
    </aside></div>`;
  },

  _taskYearCost(taskId) {
    const year = new Date().getFullYear();
    const total = (this._state?.history || [])
      .filter(event => event.task_id === taskId && new Date(event.created_at || 0).getFullYear() === year)
      .map(event => Number((event.details?.completion || event.details || {}).cost || 0))
      .reduce((sum, value) => sum + (Number.isFinite(value) ? value : 0), 0);
    return total ? `${total.toFixed(2)} EUR` : "—";
  },
});

Object.assign(MaintenanceDashboardPanel.prototype, {
  _bulkPreviewHtml() {
    const preview = this._bulkPreview;
    if (!preview) return "";
    return `<div class="dialog-backdrop"><section class="dialog bulk-preview-dialog"><header><div class="dialog-title-block"><h2>${this._t("confirmBulkTitle")}</h2><p class="section-hint">${this._t("bulkPreview")}</p></div><button class="icon" data-action="close-bulk-preview"><ha-icon icon="mdi:close"></ha-icon></button></header><div class="dialog-body">
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
    const checklist = Array.isArray(task.checklist) ? task.checklist : [];
    const checklistProgress = this._checklistProgress(task);
    const showChecklist = this._workflowSettings().show_checklists !== false && checklist.length;
    const workflowState = task.workflow_state || "planned";
    const recurrenceMode = task.recurrence_mode || "standard";
    const execution = task.current_execution || {};
    const executionStats = task.execution_stats || {};
    const canStart = !completed && workflowState !== "in_progress";
    const canBlock = !completed && workflowState !== "blocked";
    const statTotal = Number(executionStats.completed || 0) + Number(executionStats.skipped || 0) + Number(executionStats.resets || 0);
    const primaryWorkflow = canStart
      ? `<button class="ghost" title="${this._t("workflowStart")}" data-task-id="${task.id}" data-workflow-state="in_progress"><ha-icon icon="mdi:play"></ha-icon>${this._t("workflowStartShort")}</button>`
      : `<button class="ghost" title="${this._t("workflowReady")}" data-task-id="${task.id}" data-workflow-state="ready"><ha-icon icon="mdi:pause"></ha-icon>${this._t("workflowPauseShort")}</button>`;
    const workflowMenu = !completed ? `<div class="workflow-menu-wrap"><button class="ghost icon-only" title="${this._t("moreActions")}" data-workflow-menu="${task.id}"><ha-icon icon="mdi:dots-vertical"></ha-icon></button>${this._workflowMenu === task.id ? `<div class="workflow-menu"><button data-task-id="${task.id}" data-workflow-state="${canBlock ? "blocked" : "ready"}"><ha-icon icon="${canBlock ? "mdi:pause-octagon-outline" : "mdi:play-pause"}"></ha-icon>${canBlock ? this._t("workflowBlock") : this._t("workflowReady")}</button><button data-reset-task-progress="${task.id}"><ha-icon icon="mdi:restart"></ha-icon>${this._t("workflowResetAction")}</button>${task.schedule_mode !== "one_time" ? `<button data-restart-task-cycle="${task.id}"><ha-icon icon="mdi:refresh"></ha-icon>${this._t("restartCycle")}</button><button data-skip-task-cycle="${task.id}"><ha-icon icon="mdi:skip-next"></ha-icon>${this._t("skipCycle")}</button>` : ""}</div>` : ""}</div>` : "";
    return `<article class="task-card ${status}" data-task-card="${this._html(task.id)}" style="--task-accent:${this._html(accent)}">
      <header>
        <label class="task-select" title="${this._t("selectedTasksCount")}"><input type="checkbox" data-select-task="${task.id}" ${this._selectedTasks.has(task.id) ? "checked" : ""}><span></span></label>
        <div class="title-row"><span class="icon-chip" style="${task.icon_color ? `color:${this._html(task.icon_color)}` : ""}"><ha-icon icon="${this._html(task.icon || "mdi:wrench-clock")}"></ha-icon></span><div><h3>${this._html(task.name)}</h3><p>${this._categoryLabel(task)} · ${this._scheduleSummary(task)}${task.area_name ? ` · ${this._html(task.area_name)}` : ""}</p></div></div>
        <span class="status ${status}">${completed ? this._t("archived") : this._t(status)}</span>
      </header>
      <div class="workflow-strip"><span class="workflow-state state-${this._html(workflowState)}">${this._workflowStateLabel(workflowState)}</span><span class="workflow-metric">${this._t(recurrenceMode === "persistent" ? "recurrencePersistentShort" : "recurrenceStandardShort")}</span>${execution.sequence ? `<span class="workflow-metric">#${execution.sequence}</span>` : ""}${showChecklist ? `<span class="workflow-metric">${this._t("checklist")}: ${checklistProgress.done}/${checklistProgress.total}</span>` : ""}</div>
      ${task.description ? `<p class="description">${this._html(task.description)}</p>` : ""}
      ${task.tags?.length ? `<div class="tag-strip">${task.tags.slice(0, 6).map(tag => `<button data-quick-tag="${this._html(tag)}">#${this._html(tag)}</button>`).join("")}</div>` : ""}
      ${showChecklist ? `<div class="checklist-preview">${checklist.slice(0, 4).map((item, index) => `<label class="checklist-item ${item.done ? "done" : ""} ${item.required ? "is-required" : ""}"><input type="checkbox" data-toggle-checklist="${task.id}:${index}" ${item.done ? "checked" : ""} ${completed ? "disabled" : ""}><span>${this._html(item.label)}</span>${item.required ? `<span class="required-mark" aria-label="${this._t("required")}" title="${this._t("required")}"></span>` : ""}</label>`).join("")}${checklist.length > 4 ? `<small>${this._t("checklistMore").replace("{count}", String(checklist.length - 4))}</small>` : ""}</div>` : ""}
      <div class="progress-line"><span>${this._t("progress")}</span><strong>${Math.round(progress)}%</strong></div>
      <div class="progress"><div style="width:${progress}%"></div></div>
      <div class="meta-grid">
        <div><span>${this._t("lastDone")}</span><strong>${this._date(r.last_done)}</strong></div>
        <div><span>${completed ? this._t("archived") : this._t("due")}</span><strong>${completed ? this._date(task.completed_at) : this._date(r.due_at)}</strong></div>
        <div><span>${this._t("remaining")}</span><strong>${completed ? "—" : this._remaining(r, task)}</strong></div>
        <div><span>${this._t("priority")}</span><strong>${this._priorityLabel(task.priority)}<em>${task.priority}/5</em></strong></div>
      </div>
      ${statTotal ? `<div class="workflow-meta-row"><small>${this._t("runsCompleted")}: ${executionStats.completed || 0}</small><small>${this._t("runsSkipped")}: ${executionStats.skipped || 0}</small><small>${this._t("workflowResets")}: ${executionStats.resets || 0}</small></div>` : ""}
      ${snoozed ? `<div class="snooze-note"><ha-icon icon="mdi:pause-circle-outline"></ha-icon>${this._t("pausedUntil")} ${this._datetime(task.snoozed_until)}</div>` : ""}
      <footer class="actions">
        <button class="ghost icon-only" title="${this._t("edit")}" data-edit="${task.id}"><ha-icon icon="mdi:pencil"></ha-icon></button>
        ${completed ? `<button class="primary" data-reactivate="${task.id}"><ha-icon icon="mdi:restore"></ha-icon>${this._t("reactivate")}</button>` : `${primaryWorkflow}<div class="snooze-wrap"><button class="ghost icon-only" title="${this._t("snooze")}" data-snooze-menu="${task.id}"><ha-icon icon="mdi:clock-plus-outline"></ha-icon></button>${this._snoozeMenu === task.id ? `<div class="snooze-menu"><strong>${this._t("snoozeFor")}</strong>${options.map(days => `<button data-snooze-days="${task.id}:${days}">${days} ${this._t("days")}</button>`).join("")}</div>` : ""}</div>${snoozed ? `<button class="ghost" data-clear-snooze="${task.id}"><ha-icon icon="mdi:play-circle-outline"></ha-icon>${this._t("clearSnooze")}</button>` : ""}${workflowMenu}<button class="primary" data-done="${task.id}"><ha-icon icon="mdi:check"></ha-icon>${this._t("done")}</button>`}
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
    const resultMeta = `<div class="template-results-meta"><strong>${templates.length}</strong><span>${this._t("templates")}</span><em>${order.length} ${this._t("category").toLowerCase()}</em></div>`;
    const groupsHtml = order.map(key => `
      <section class="template-group">
        <div class="template-group-header"><div class="template-group-title"><span class="template-group-icon"><ha-icon icon="${this._categoryIcon(key)}"></ha-icon></span><div><small>${this._t("category")}</small><h3>${this._t(key)}</h3></div></div><span>${grouped[key].length}</span></div>
        <div class="template-grid compact">${grouped[key].map(t => this._templateCard(t)).join("")}</div>
      </section>
    `).join("");
    const packs = this._state?.template_packs || [];
    const starterCount = packs.length ? `<span class="starter-count">${packs.length}</span>` : "";
    return `<section class="page-header page-header-compact"><div><h1>${this._t("templates")}</h1><p>${this._t("templateSelectHint")}</p></div></section>
      <section class="panel templates-workbench">
        <div class="templates-toolbar-main">
          <input id="search" class="search" placeholder="${this._t("search")}" value="${this._html(this._search)}">
          <div class="template-selection-actions">
            <button class="ghost" data-action="select-visible"><ha-icon icon="mdi:checkbox-multiple-marked-outline"></ha-icon>${this._t("selectAllVisible")}</button>
            <button class="ghost" data-action="clear-template-selection"><ha-icon icon="mdi:checkbox-blank-off-outline"></ha-icon>${this._t("deselectAll")}</button>
            <button class="primary big" data-action="add-selected" ${selected.length ? "" : "disabled"}><ha-icon icon="mdi:plus-box-multiple-outline"></ha-icon>${this._t("addSelected")} · ${selected.length}</button>
          </div>
        </div>
        <section class="template-filter-bar" data-template-results>
          <div class="category-tabs" aria-label="${this._t("templateCategory")}">${TEMPLATE_CATEGORY_KEYS.map(k => `<button class="tab ${this._templateCategory === k ? "active" : ""}" data-template-category="${k}"><ha-icon icon="${this._categoryIcon(k)}"></ha-icon><span>${this._t(k)}</span></button>`).join("")}</div>
          <div class="template-secondary-filters">${resultMeta}<div class="template-filter-controls"><label><span>${this._t("seasonal")}</span><select id="templateSeason"><option value="all">${this._t("all")}</option>${["spring","summer","autumn","winter"].map(x => `<option value="${x}" ${this._templateSeason === x ? "selected" : ""}>${this._t(x)}</option>`).join("")}</select></label><label class="check compact-check"><input id="templateCommon" type="checkbox" ${this._templateOnlyCommon ? "checked" : ""}>${this._t("recommendedOnly")}</label></div></div>
        </section>
      </section>
      ${templates.length ? groupsHtml : this._emptyMessage("mdi:shape-outline", this._t("noTemplatesMatch"))}
      ${packs.length ? `<section class="starter-packs ${this._starterPacksCollapsed ? "collapsed" : ""}"><div class="section-title"><div><h2>${this._t("starterPacks")} ${starterCount}</h2><p>${this._t("onboardingHint")}</p></div><button class="ghost starter-toggle" data-action="toggle-starter-packs"><ha-icon icon="${this._starterPacksCollapsed ? "mdi:chevron-down" : "mdi:chevron-up"}"></ha-icon>${this._starterPacksCollapsed ? this._t("expandStarterPacks") : this._t("collapseStarterPacks")}</button></div>${this._starterPacksCollapsed ? "" : `<div class="pack-strip">${packs.map(pack => `<article class="pack-mini"><ha-icon icon="${this._html(pack.icon || "mdi:package-variant")}"></ha-icon><div><strong>${this._html(pack.name)}</strong><p>${this._html(pack.description || "")}</p><small>${(pack.template_ids || []).length} ${this._t("templates")}</small></div><button class="ghost pack-mini-action" data-add-pack="${this._html(pack.id)}"><ha-icon icon="mdi:plus"></ha-icon>${this._t("addPackage")}</button></article>`).join("")}</div>`}</section>` : ""}`;
  },

  _filteredTemplates() {
    return (this._state.templates || []).filter(template => {
      if (this._templateCategory === "recommended" && !(template.recommended || Number(template.priority || 0) >= 4)) return false;
      if (this._templateCategory === "favorites" && !this._templateFavorites.has(template.id)) return false;
      if (this._templateCategory === "seasonal" && !template.season) return false;
      if (!["all", "favorites", "recommended", "seasonal"].includes(this._templateCategory) && template.category !== this._templateCategory) return false;
      if (this._templateSeason !== "all" && template.season !== this._templateSeason) return false;
      if (this._templateOnlyCommon && !(template.recommended || template.common || Number(template.priority || 0) >= 4)) return false;
      return this._matches(template);
    });
  },

  _scrollTemplateResults() {
    requestAnimationFrame(() => {
      this.shadowRoot.querySelector("[data-template-results]")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
});


// ---- frontend/src/components/template-card.ts ----
// Template card rendering and preview entry points.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _templateCard(t) {
    const checked = this._selectedTemplates.has(t.id);
    const exists = (this._state.tasks || []).some(task => !task.deleted && (task.template_id ? task.template_id === t.id : String(task.name).toLowerCase() === String(t.name).toLowerCase()));
    const favorite = this._templateFavorites?.has(t.id);
    const badges = [
      t.recommended ? `<span class="template-badge">${this._t("recommended")}</span>` : "",
      t.season ? `<span class="template-badge season">${this._t(t.season)}</span>` : "",
    ].filter(Boolean).join("");
    return `<article class="template-card compact ${checked ? "selected" : ""} ${exists ? "exists" : ""}" data-template-preview="${this._html(t.id)}"><header><label class="template-check" onclick="event.stopPropagation()"><input type="checkbox" data-template-check="${t.id}" ${checked ? "checked" : ""}><span></span></label><ha-icon icon="${this._html(t.icon)}"></ha-icon><div class="template-title"><h3>${this._html(t.name)}</h3><div class="template-badges">${badges}</div></div><button class="icon favorite-button ${favorite ? "active" : ""}" data-template-favorite="${this._html(t.id)}" title="${this._t("favorite")}"><ha-icon icon="${favorite ? "mdi:star" : "mdi:star-outline"}"></ha-icon></button></header><small><ha-icon icon="${this._categoryIcon(t.category)}"></ha-icon>${this._categoryLabel(t)} · ${this._scheduleSummary(t)} · ${this._t("priority")} ${t.priority}/5</small>${Array.isArray(t.tags) && t.tags.length ? `<div class="tag-list">${t.tags.slice(0,4).map(tag => `<span>${this._html(tag)}</span>`).join("")}</div>` : ""}<footer><button class="ghost" data-template-preview-btn="${t.id}"><ha-icon icon="mdi:eye-outline"></ha-icon>${this._t("preview")}</button><button class="ghost" data-template="${t.id}" ${exists ? "disabled" : ""}><ha-icon icon="mdi:plus"></ha-icon>${exists ? this._t("ok") : this._t("add")}</button></footer></article>`;
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
    const workflow = settings.workflow || {};
    const workflowDefaults = workflow.default_completion_requirements || {};
    const native = settings.native_platforms || {};
    const notifications = settings.notifications || {};
    const tabs = [
      ["general", "mdi:tune-variant", this._t("general")],
      ["data", "mdi:database-cog-outline", this._t("dataSafety")],
      ["workflow", "mdi:timeline-check-outline", this._t("workflow")],
      ["platforms", "mdi:home-assistant", this._t("nativePlatforms")],
      ["manual", "mdi:sort-variant", this._t("sortPosition")],
      ["notifications", "mdi:bell-outline", this._t("notifications")],
    ];
    const activeTab = ["general", "data", "workflow", "platforms", "manual", "notifications"].includes(this._settingsTab) ? this._settingsTab : "general";
    return `
      <section class="page-header page-header-compact settings-head">
        <div><h1>${this._t("settings")}</h1><p>${this._t("settingsDescription")}</p></div>
        <div class="settings-utility-bar">
          <button class="ghost" data-action="open-onboarding"><ha-icon icon="mdi:rocket-launch-outline"></ha-icon>${this._t("onboarding")}</button>
          <button class="ghost" data-action="diagnostics"><ha-icon icon="mdi:alert-circle-outline"></ha-icon>${this._t("diagnostics")}</button>
        </div>
      </section>

      <nav class="settings-nav segmented-tabs" aria-label="${this._t("settings")}">
        ${tabs.map(([id, icon, label]) => `<button class="tab ${activeTab === id ? "active" : ""}" data-settings-tab="${id}"><ha-icon icon="${icon}"></ha-icon><span>${label}</span></button>`).join("")}
      </nav>

      <section class="settings-stack">
        ${activeTab === "general" ? `<article class="panel settings-section" id="dashboard-settings">
          <header><ha-icon icon="mdi:view-dashboard-edit-outline"></ha-icon><div><h3>${this._t("dashboardLayout")}</h3><p>${this._t("dashboardSurfaceHint")}</p></div></header>
          <div class="settings-section-grid three-column"><label class="field"><span>${this._t("dashboardLayout")}</span><select id="dashboardViewMode">${["cards","compact","timeline"].map(mode => `<option value="${mode}" ${(dashboard.view_mode || "cards") === mode ? "selected" : ""}>${this._t(`${mode}View`)}</option>`).join("")}</select></label><label class="field"><span>${this._t("dashboardDensity")}</span><select id="dashboardDensity"><option value="comfortable" ${(dashboard.density || "comfortable") !== "compact" ? "selected" : ""}>${this._t("densityComfortable")}</option><option value="compact" ${dashboard.density === "compact" ? "selected" : ""}>${this._t("densityCompact")}</option></select></label><label class="field"><span>${this._t("defaultDueFilter")}</span><select id="dashboardDefaultDue">${["all","overdue","today","week","next14","month","next90","later","no_due"].map(value => `<option value="${value}" ${(dashboard.default_due_filter || "all") === value ? "selected" : ""}>${this._dueFilterLabel(value)}</option>`).join("")}</select></label></div>
          <div class="check-grid"><label class="check"><input id="dashboardQuickFilters" type="checkbox" ${dashboard.show_quick_filters !== false ? "checked" : ""}>${this._t("showQuickFilters")}</label><label class="check"><input id="dashboardRememberView" type="checkbox" ${dashboard.remember_last_view !== false ? "checked" : ""}>${this._t("rememberDashboardView")}</label></div>
          <footer class="settings-section-footer"><button class="primary big" data-action="save-general-settings"><ha-icon icon="mdi:content-save"></ha-icon>${this._t("saveDashboardSettings")}</button></footer>
        </article>` : ""}

        ${activeTab === "data" ? `<article class="panel settings-section" id="data-settings">
          <header><ha-icon icon="mdi:backup-restore"></ha-icon><div><h3>${this._t("dataSafety")}</h3><p>${this._t("backupRotation")} · ${this._t("dataIntegrity")}</p></div></header>
          <div class="settings-section-grid two-column">
            <div class="settings-subpanel"><h4>${this._t("backupRotation")}</h4><div class="form-grid"><label class="field"><span>${this._t("maximumBackups")}</span><input id="maximumBackups" type="number" min="1" max="500" value="${Number(backups.maximum_count || 30)}"></label><label class="field"><span>${this._t("maximumBackupAge")}</span><input id="maximumBackupAge" type="number" min="1" max="3650" value="${Number(backups.maximum_age_days || 90)}"></label></div><div class="check-grid">
            ${[
              ["beforeTaskUpdate","before_task_update",this._t("backupBeforeTaskUpdate")],
              ["beforeTaskDelete","before_task_delete",this._t("backupBeforeTaskDelete")],
              ["beforeImport","before_import",this._t("backupBeforeImport")],
              ["beforeMigration","before_migration",this._t("backupBeforeMigration")],
              ["beforeRestore","before_restore",this._t("backupBeforeRestore")],
              ["beforeBulk","before_bulk_operation",this._t("backupBeforeBulk")],
            ].map(([id,key,label]) => `<label class="check"><input id="${id}" type="checkbox" ${backups[key] !== false ? "checked" : ""}>${label}</label>`).join("")}
          </div></div><div class="settings-subpanel"><h4>${this._t("dataIntegrity")}</h4><div class="check-grid"><label class="check"><input id="checkIntegrityOnStart" type="checkbox" ${integrity.check_on_start !== false ? "checked" : ""}>${this._t("integrityCheckOnStart")}</label><label class="check"><input id="quarantineInvalidRecords" type="checkbox" ${integrity.quarantine_invalid_records !== false ? "checked" : ""}>${this._t("quarantineInvalidRecords")}</label></div><div class="form-grid"><label class="field"><span>${this._t("auditRetention")}</span><input id="auditRetention" type="number" min="100" max="10000" value="${Number(integrity.audit_retention || 1000)}"></label><label class="field"><span>${this._t("quarantineRetention")}</span><input id="quarantineRetention" type="number" min="20" max="5000" value="${Number(integrity.quarantine_retention || 200)}"></label></div><div class="settings-inline-actions"><button class="ghost" data-action="data-dialog"><ha-icon icon="mdi:database-search-outline"></ha-icon>${this._t("backupRestore")}</button></div></div>
          </div>
          <footer class="settings-section-footer"><button class="primary big" data-action="save-general-settings"><ha-icon icon="mdi:content-save"></ha-icon>${this._t("saveDashboardSettings")}</button></footer>
        </article>` : ""}

        ${activeTab === "workflow" ? `<article class="panel settings-section" id="workflow-settings">
          <header><ha-icon icon="mdi:timeline-check-outline"></ha-icon><div><h3>${this._t("workflow")}</h3><p>${this._t("workflowSettingsHint")}</p></div></header>
          <div class="settings-section-grid two-column">
            <div class="settings-subpanel"><h4>${this._t("workflowDefaults")}</h4><div class="form-grid"><label class="field"><span>${this._t("defaultWorkflowState")}</span><select id="defaultWorkflowState">${["planned","ready","in_progress","blocked"].map(state => `<option value="${state}" ${(workflow.default_state || "planned") === state ? "selected" : ""}>${this._workflowStateLabel(state)}</option>`).join("")}</select></label><label class="field"><span>${this._t("defaultTaskRelevance")}</span><select id="defaultRecurrenceMode">${["standard","persistent"].map(mode => `<option value="${mode}" ${(workflow.default_recurrence_mode || "standard") === mode ? "selected" : ""}>${this._t(mode === "persistent" ? "recurrencePersistent" : "recurrenceStandard")}</option>`).join("")}</select></label><label class="field"><span>${this._t("persistentDefaultState")}</span><select id="persistentDefaultState">${["planned","ready","in_progress","blocked"].map(state => `<option value="${state}" ${(workflow.persistent_default_state || "ready") === state ? "selected" : ""}>${this._workflowStateLabel(state)}</option>`).join("")}</select></label></div><div class="check-grid"><label class="check"><input id="workflowShowChecklists" type="checkbox" ${workflow.show_checklists !== false ? "checked" : ""}>${this._t("showChecklists")}</label><label class="check"><input id="workflowResetChecklist" type="checkbox" ${workflow.reset_checklist_on_completion !== false ? "checked" : ""}>${this._t("resetChecklistOnCompletion")}</label></div></div>
            <div class="settings-subpanel"><h4>${this._t("completionRequirements")}</h4><div class="check-grid">
              <label class="check"><input id="workflowRequireNote" type="checkbox" ${workflowDefaults.note ? "checked" : ""}>${this._t("completionRequirementNote")}</label>
              <label class="check"><input id="workflowRequireMaterial" type="checkbox" ${workflowDefaults.material ? "checked" : ""}>${this._t("completionRequirementMaterial")}</label>
              <label class="check"><input id="workflowRequireCost" type="checkbox" ${workflowDefaults.cost ? "checked" : ""}>${this._t("completionRequirementCost")}</label>
              <label class="check"><input id="workflowRequirePerformedBy" type="checkbox" ${workflowDefaults.performed_by ? "checked" : ""}>${this._t("completionRequirementPerformedBy")}</label>
              <label class="check"><input id="workflowRequireChecklist" type="checkbox" ${workflowDefaults.checklist ? "checked" : ""}>${this._t("completionRequirementChecklist")}</label>
            </div></div>
          </div>
          <footer class="settings-section-footer"><button class="primary big" data-action="save-general-settings"><ha-icon icon="mdi:content-save"></ha-icon>${this._t("saveDashboardSettings")}</button></footer>
        </article>` : ""}

        ${activeTab === "platforms" ? `<article class="panel settings-section" id="platform-settings">
          <header><ha-icon icon="mdi:home-assistant"></ha-icon><div><h3>${this._t("nativePlatforms")}</h3><p>${this._t("nativePlatformsHint")}</p></div></header>
          <div class="check-grid platform-grid">
            <label class="check"><input id="todoPlatformEnabled" type="checkbox" ${native.todo_enabled !== false ? "checked" : ""}>${this._t("todoPlatform")}</label>
            <label class="check"><input id="todoIncludeDisabled" type="checkbox" ${native.todo_include_disabled === true ? "checked" : ""}>${this._t("todoIncludeDisabled")}</label>
            <label class="check"><input id="calendarPlatformEnabled" type="checkbox" ${native.calendar_enabled !== false ? "checked" : ""}>${this._t("calendarPlatform")}</label>
            <label class="check"><input id="calendarIncludeSnoozed" type="checkbox" ${native.calendar_include_snoozed === true ? "checked" : ""}>${this._t("calendarIncludeSnoozed")}</label>
          </div>
          <div class="form-grid"><label class="field"><span>${this._t("calendarDuration")}</span><input id="calendarEventDuration" type="number" min="15" max="1440" step="15" value="${Number(native.calendar_event_duration_minutes || 60)}"></label></div>
          <footer class="settings-section-footer"><button class="primary big" data-action="save-general-settings"><ha-icon icon="mdi:content-save"></ha-icon>${this._t("saveDashboardSettings")}</button></footer>
        </article>` : ""}

        ${activeTab === "manual" ? `<article class="panel settings-section" id="ordering-settings">
          <header><ha-icon icon="mdi:sort-variant"></ha-icon><div><h3>${this._t("sortPosition")}</h3><p>${this._t("dragHint")}</p></div></header>
          <div class="settings-ordering-head">${this._lastOrder ? `<button class="ghost" data-action="undo-reorder"><ha-icon icon="mdi:undo"></ha-icon>${this._t("undo")}</button>` : ""}<button class="primary big" data-action="save-general-settings"><ha-icon icon="mdi:content-save"></ha-icon>${this._t("saveDashboardSettings")}</button></div>
          <section class="settings-list">${tasks.map((t, idx) => `<article class="settings-row" draggable="true" data-drag="${t.id}" data-drop="${t.id}"><button class="drag icon" type="button" data-keyboard-reorder="${t.id}" aria-label="${this._t("dragHint")}"><ha-icon icon="mdi:drag"></ha-icon></button><ha-icon icon="${this._html(t.icon)}"></ha-icon><div><strong>${this._html(t.name)}</strong><small>${this._categoryLabel(t)} · ${this._scheduleSummary(t)} · ${this._t("priority")} ${t.priority}/5</small></div><button class="icon" data-move="${t.id}:up" ${idx === 0 ? "disabled" : ""}><ha-icon icon="mdi:chevron-up"></ha-icon></button><button class="icon" data-move="${t.id}:down" ${idx === tasks.length - 1 ? "disabled" : ""}><ha-icon icon="mdi:chevron-down"></ha-icon></button><button class="icon" data-edit="${t.id}"><ha-icon icon="mdi:pencil"></ha-icon></button><button class="icon danger" data-delete="${t.id}"><ha-icon icon="mdi:delete-outline"></ha-icon></button></article>`).join("")}</section>
        </article>` : ""}

        ${activeTab === "notifications" ? `<article class="panel settings-section" id="notification-settings">
          <header><ha-icon icon="mdi:bell-outline"></ha-icon><div><h3>${this._t("notifications")}</h3><p>${this._t("notificationRulesHint")}</p></div></header>
          <div class="settings-section-grid two-column">
            <div class="settings-subpanel"><h4>${this._t("notificationRules")}</h4><div class="form-grid"><label class="field"><span>${this._t("notifyService")}</span><input id="notifyService" value="${this._html(notifications.notify_service || "")}" placeholder="notify.mobile_app_phone"></label><label class="field"><span>${this._t("digestTime")}</span><input id="digestTime" type="time" value="${this._html(notifications.digest_time || "08:00")}"></label><label class="field"><span>${this._t("repeatEveryDays")}</span><input id="notificationRepeatDays" type="number" min="0" max="365" value="${this._html(notifications.repeat_days ?? 3)}"></label><label class="field"><span>${this._t("escalationAfterDays")}</span><input id="notificationEscalationDays" type="number" min="0" max="365" value="${this._html(notifications.escalation_after_days ?? 3)}"></label><label class="field"><span>${this._t("actionSnoozeDays")}</span><input id="actionSnoozeDays" type="number" min="1" max="365" value="${this._html(notifications.action_snooze_days ?? 7)}"></label><label class="field"><span>${this._t("notificationHistoryRetention")}</span><input id="notificationHistoryRetention" type="number" min="20" max="2000" value="${this._html(notifications.history_retention ?? 200)}"></label></div></div>
            <div class="settings-subpanel"><h4>${this._t("notifications")}</h4><div class="check-grid"><label class="check"><input id="notifyEnabled" type="checkbox" ${notifications.enabled !== false ? "checked" : ""}>${this._t("enabled")}</label><label class="check"><input id="notifyWarning" type="checkbox" ${notifications.warning !== false ? "checked" : ""}>${this._t("warningNotifications")}</label><label class="check"><input id="notifyCritical" type="checkbox" ${notifications.critical !== false ? "checked" : ""}>${this._t("criticalNotifications")}</label><label class="check"><input id="notifyOverdue" type="checkbox" ${notifications.overdue !== false ? "checked" : ""}>${this._t("overdueNotifications")}</label><label class="check"><input id="notifyDue" type="checkbox" ${notifications.due !== false ? "checked" : ""}>${this._t("dueNotifications")}</label><label class="check"><input id="dailyDigest" type="checkbox" ${notifications.daily_digest ? "checked" : ""}>${this._t("dailyDigest")}</label><label class="check"><input id="notificationEscalation" type="checkbox" ${notifications.escalation_enabled !== false ? "checked" : ""}>${this._t("escalation")}</label><label class="check"><input id="actionableNotifications" type="checkbox" ${notifications.actionable !== false ? "checked" : ""}>${this._t("actionableNotifications")}</label></div></div>
          </div>
          <footer class="settings-section-footer"><button class="ghost" data-action="notification-dialog"><ha-icon icon="mdi:tune-variant"></ha-icon>${this._t("advancedSettings")}</button><button class="ghost" data-action="test-notification"><ha-icon icon="mdi:bell-ring-outline"></ha-icon>${this._t("testNotification")}</button><button class="primary big" data-action="save-notification-settings"><ha-icon icon="mdi:content-save"></ha-icon>${this._t("save")}</button></footer>
        </article>` : ""}
      </section>
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
    const grouped = this._historyGroupedEvents(events.slice(0, 160));
    const rows = grouped.map(([day, items]) => `<section class="history-day-group"><div class="history-day-header"><strong>${this._historyDayLabel(day)}</strong><span>${items.length}</span></div><div class="history-day-entries">${items.map(event => {
      const completion = event.details?.completion || event.details || {};
      const source = event.source || event.details?.source || event.details?.origin || "";
      const checklistSnapshot = event.details?.checklist_completed || [];
      const completionBits = [
        completion.note ? `<span><ha-icon icon="mdi:note-text-outline"></ha-icon>${this._html(completion.note)}</span>` : "",
        completion.material ? `<span><ha-icon icon="mdi:package-variant-closed"></ha-icon>${this._html(completion.material)}</span>` : "",
        completion.cost != null ? `<span><ha-icon icon="mdi:cash"></ha-icon>${this._html(completion.cost)} ${this._html(completion.currency || "EUR")}</span>` : "",
        completion.performed_by ? `<span><ha-icon icon="mdi:account-wrench-outline"></ha-icon>${this._html(completion.performed_by)}</span>` : "",
        checklistSnapshot.length ? `<span><ha-icon icon="mdi:format-list-checks"></ha-icon>${checklistSnapshot.filter(item => item.done).length}/${checklistSnapshot.length} ${this._t("checklist")}</span>` : "",
      ].filter(Boolean).join("");
      const changes = this._historyChanges(event);
      return `<article class="history-row ${this._html(event.type || "event")}"><ha-icon icon="${this._historyIcon(event.type)}"></ha-icon><div class="history-content"><div class="history-title"><strong>${this._html(event.task_name || event.task_id || this._t("globalLabel"))}</strong><div class="history-meta-strip"><span class="history-event-type">${this._historyEventLabel(event.type)}</span>${source ? `<span class="history-source">${this._html(source)}</span>` : ""}<span class="history-time">${this._datetime(event.created_at)}</span></div></div><p class="history-summary-line">${this._historySummaryLine(event)}</p>${event.details?.runtime_before ? `<small>${this._runtimeSummary(event.details.runtime_before)}</small>` : ""}${completionBits ? `<div class="completion-details">${completionBits}</div>` : ""}${changes}</div>${event.type === "completed" && !event.undone_at ? `<button class="ghost" data-undo="${event.id}">${this._t("undo")}</button>` : ""}</article>`;
    }).join("")}</div></section>`).join("");
    return `<section class="panel history-panel">${this._historySummaryHtml(events)}<div class="history-toolbar">
      <label class="history-search-field"><span>${this._t("search")}</span><input id="historySearch" class="search history-search-input" placeholder="${this._t("historySearch")}" value="${this._html(this._historySearch)}"></label>
      <label><span>${this._t("historyType")}</span><select id="historyType"><option value="all">${this._t("allActions")}</option>${types.map(type => `<option value="${type}" ${this._historyType === type ? "selected" : ""}>${this._historyEventLabel(type)}</option>`).join("")}</select></label>
      <label><span>${this._t("historyRange")}</span><select id="historyRange">${["all","today","week","month"].map(value => `<option value="${value}" ${this._historyRange === value ? "selected" : ""}>${this._t(value === "all" ? "allTime" : value === "today" ? "todayRange" : value === "week" ? "weekRange" : "monthRange")}</option>`).join("")}</select></label>
      <label><span>${this._t("historyTask")}</span><select id="historyTask"><option value="all">${this._t("allTasks")}</option>${taskOptions.map(([id, name]) => `<option value="${this._html(id)}" ${this._historyTask === id ? "selected" : ""}>${this._html(name)}</option>`).join("")}</select></label>
      <div class="history-scope segmented" role="group" aria-label="${this._t("history")}">${["all","completed","changes"].map(scope => `<button class="${this._historyScope === scope ? "active" : ""}" data-history-scope="${scope}">${this._t(scope === "all" ? "historyScopeAll" : scope === "completed" ? "historyScopeCompleted" : "historyScopeChanges")}</button>`).join("")}</div>
    </div><div class="history-results-meta"><strong>${events.length}</strong><span>${this._t("matchingRecords")}</span></div><div class="history-list">${rows || `<p>${this._t("noHistory")}</p>`}</div></section>`;
  },

  _historyPageHtml() {
    return `<section class="page-header page-header-compact"><div><h1>${this._t("history")}</h1><p>${this._t("historyDescription")}</p></div></section>${this._historyHtml()}`;
  },

  _historySummaryHtml(events) {
    const now = new Date();
    const startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const startWeek = now.getTime() - 7 * 86400000;
    const countSince = start => events.filter(event => new Date(event.created_at || 0).getTime() >= start).length;
    const items = [
      ["mdi:calendar-today-outline", "activitiesToday", countSince(startToday)],
      ["mdi:calendar-week-outline", "activitiesWeek", countSince(startWeek)],
      ["mdi:check-circle-outline", "completedActivities", events.filter(event => event.type === "completed").length],
      ["mdi:backup-restore", "backupActivities", events.filter(event => String(event.type || "").includes("backup")).length],
      ["mdi:compare-horizontal", "changeActivities", events.filter(event => ["created","updated","deleted","restored","reactivated","imported","snoozed","snooze_cleared","undo_completed","workflow_changed","workflow_reset","cycle_restarted","cycle_skipped"].includes(event.type)).length],
    ];
    return `<aside class="history-summary history-summary-strip" aria-label="${this._t("history")}">${items.map(([icon, label, value]) => `<div><ha-icon icon="${icon}"></ha-icon><span>${this._t(label)}</span><strong>${value}</strong></div>`).join("")}</aside>`;
  },

  _historyIcon(type) {
    return {
      completed: "mdi:check-circle-outline",
      created: "mdi:plus-circle-outline",
      updated: "mdi:pencil-circle-outline",
      deleted: "mdi:delete-circle-outline",
      restored: "mdi:restore",
      reactivated: "mdi:restart",
      workflow_changed: "mdi:timeline-text-outline",
      workflow_reset: "mdi:restart-alert",
      cycle_restarted: "mdi:refresh",
      cycle_skipped: "mdi:skip-next",
      imported: "mdi:import",
      snoozed: "mdi:clock-plus-outline",
      snooze_cleared: "mdi:play-circle-outline",
      undo_completed: "mdi:undo",
    }[type] || "mdi:history";
  },

  _historyEventLabel(type) {
    return {
      created: this._t("created"),
      updated: this._t("updated"),
      completed: this._t("completedEvent"),
      deleted: this._t("deletedEvent"),
      restored: this._t("restoredEvent"),
      reactivated: this._t("reactivatedEvent"),
      workflow_changed: this._t("workflowChangedEvent"),
      workflow_reset: this._t("workflowResetEvent"),
      cycle_restarted: this._t("cycleRestartedEvent"),
      cycle_skipped: this._t("cycleSkippedEvent"),
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
      ["workflow_state", "fieldWorkflowState"], ["checklist", "fieldChecklist"], ["completion_requirements", "fieldCompletionRequirements"],
    ];
    const changes = fields.filter(([key]) => JSON.stringify(previous[key] ?? null) !== JSON.stringify(next[key] ?? null));
    if (!changes.length) return "";
    const rows = changes.map(([key, label]) => `<div class="history-change-row"><strong>${this._t(label)}</strong><span>${this._historyValue(key, previous[key])}</span><ha-icon icon="mdi:arrow-right"></ha-icon><span>${this._historyValue(key, next[key])}</span></div>`).join("");
    return `<details class="history-changes"><summary><ha-icon icon="mdi:compare-horizontal"></ha-icon>${this._t("changes")} · ${changes.length}</summary><div class="history-change-head"><span></span><strong>${this._t("previousValue")}</strong><span></span><strong>${this._t("newValue")}</strong></div>${rows}</details>`;
  },

  _historySummaryLine(event) {
    if (event.type === "workflow_changed") {
      const state = event.new_state?.workflow_state || event.details?.state || "";
      return this._html(state ? this._workflowTransitionLabel(state) : this._historyEventLabel(event.type));
    }
    if (event.type === "workflow_reset") return this._html(this._t("workflowResetSummary"));
    if (event.type === "cycle_restarted") return this._html(this._t("cycleRestartedSummary"));
    if (event.type === "cycle_skipped") return this._html(this._t("cycleSkippedSummary"));
    return this._html(event.summary || this._historyEventLabel(event.type));
  },

  _historyValue(key, value) {
    if (value == null || value === "") return "—";
    if (["due_date", "last_done"].includes(key)) return this._html(this._datetime(value));
    if (key === "enabled") return value ? "✓" : "—";
    if (key === "priority") return `${this._html(this._priorityLabel(value))} (${this._html(value)}/5)`;
    if (key === "schedule_mode") return this._html(this._scheduleModeLabel(value));
    if (key === "workflow_state") return this._html(this._workflowStateLabel(value));
    if (key === "calendar_repeat" || key === "season" || key === "interval_unit") return this._html(this._t(String(value)));
    if (key === "checklist" && Array.isArray(value)) return this._html(value.map(item => `${item.done ? "✓" : "○"} ${item.label}${item.required ? " *" : ""}`).join(", "));
    if (key === "completion_requirements" && typeof value === "object") return this._html(Object.entries(value).filter(([, enabled]) => enabled).map(([entry]) => this._t(`completionRequirement${entry === "performed_by" ? "PerformedBy" : entry.charAt(0).toUpperCase() + entry.slice(1)}`)).join(", ") || "—");
    if (Array.isArray(value)) return this._html(value.join(", "));
    if (typeof value === "object") return this._html(JSON.stringify(value));
    return this._html(value);
  },

  _historyGroupedEvents(events) {
    const groups = new Map();
    for (const event of events) {
      const key = String(event.created_at || "").slice(0, 10) || "unknown";
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(event);
    }
    return [...groups.entries()];
  },

  _historyDayLabel(value) {
    if (!value || value === "unknown") return this._t("unknownLabel");
    return new Intl.DateTimeFormat(this._lang() === "de" ? "de-DE" : "en-US", { weekday: "long", day: "2-digit", month: "long", year: "numeric" }).format(new Date(`${value}T00:00:00`));
  },

  _filteredHistory() {
    const query = String(this._historySearch || "").trim().toLowerCase();
    const changeTypes = ["created","updated","deleted","restored","reactivated","imported","snoozed","snooze_cleared","undo_completed","workflow_changed","workflow_reset","cycle_restarted","cycle_skipped"];
    const now = new Date();
    const rangeStart = {
      today: new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime(),
      week: now.getTime() - 7 * 86400000,
      month: new Date(now.getFullYear(), now.getMonth(), 1).getTime(),
    }[this._historyRange || "all"];
    return (this._state.history || []).filter(event => {
      if (this._historyType !== "all" && event.type !== this._historyType) return false;
      if (this._historyTask !== "all" && event.task_id !== this._historyTask) return false;
      if (this._historyScope === "completed" && event.type !== "completed") return false;
      if (this._historyScope === "changes" && !changeTypes.includes(event.type)) return false;
      if (rangeStart && new Date(event.created_at || 0).getTime() < rangeStart) return false;
      if (!query) return true;
      const completion = event.details?.completion || event.details || {};
      return [event.task_name, event.task_id, event.summary, completion.note, completion.material, completion.performed_by, event.type, event.source, event.details?.source]
        .concat((event.details?.checklist_completed || []).map(item => item.label), event.previous_state?.workflow_state, event.new_state?.workflow_state)
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
    const steps = this._wizardSteps();
    const activeStep = Math.min(steps.length - 1, Math.max(0, Number(this._dialogStep || 0)));
    const missingTotal = this._dialogMissingTotal();
    const stepHtml = [
      this._wizardStartStepHtml(d),
      this._wizardScheduleStepHtml(d),
      this._workflowFieldsHtml(d),
      this._taskNotificationFieldsHtml(d),
    ][activeStep];
    const stepper = `<nav class="wizard-steps" aria-label="${this._t("newEntryWizard")}">${steps.map(([icon, label], index) => `<button class="${activeStep === index ? "active" : ""} ${this._dialogStepMissing(index).length ? "has-missing" : ""}" data-action="${index < activeStep ? "wizard-back" : "wizard-next"}" ${index === activeStep ? "disabled" : ""}><ha-icon icon="${icon}"></ha-icon><span>${this._t(label)}</span></button>`).join("")}</nav>`;
    return `<div class="dialog-backdrop"><section class="dialog wizard-dialog"><header><div class="dialog-title-block"><h2>${this._dialog === "edit" ? this._t("edit") : this._t("newEntry")}</h2><p class="section-hint">${missingTotal ? this._t("wizardMissingHint").replace("{count}", String(missingTotal)) : this._t("wizardReadyHint")}</p></div><button class="icon" data-action="close"><ha-icon icon="mdi:close"></ha-icon></button></header>${stepper}<div class="dialog-body wizard-body">
      ${stepHtml}
      ${this._error ? `<div class="error">${this._html(this._error)}</div>` : ""}
    </div><footer><button class="ghost" data-action="close">${this._t("cancel")}</button>${activeStep > 0 ? `<button class="ghost" data-action="wizard-back"><ha-icon icon="mdi:arrow-left"></ha-icon>${this._t("wizardBack")}</button>` : ""}${activeStep < steps.length - 1 ? `<button class="primary" data-action="wizard-next">${this._t("wizardNext")}</button>` : `<button class="primary" data-action="save" ${this._busy ? "disabled" : ""}>${this._t("save")}</button>`}</footer></section></div>`;
  },

  _wizardStartStepHtml(d) {
    const scheduleFields = this._scheduleFieldsHtml(d);
    const areas = this._areas();
    const picked = this._selectedTemplateDraft();
    const templateOptions = this._templateAutocompleteOptions();
    const pickerQuery = this._templatePickerQuery || "";
    const templatePicker = this._dialog === "create" ? `<div class="template-autocomplete"><div class="template-picker-head"><label class="field grow"><span>${this._t("selectTemplate")}</span><input id="templatePicker" value="${this._html(pickerQuery)}" placeholder="${this._t("templatePickerPlaceholder")}" autocomplete="off"></label><button class="ghost" data-action="apply-picked-template" ${picked ? "" : "disabled"}><ha-icon icon="mdi:shape-plus-outline"></ha-icon>${this._t("applyTemplate")}</button></div><p class="section-hint">${picked ? this._t("templatePickerSelected").replace("{name}", this._html(picked.name || "")) : this._t("templatePickerHint")}</p><div class="template-picker-list">${templateOptions.map(t => `<button type="button" class="template-picker-option ${picked?.id === t.id ? "active" : ""}" data-pick-template="${this._html(t.id)}"><ha-icon icon="${this._html(t.icon || "mdi:wrench-clock")}"></ha-icon><span><strong>${this._html(t.name)}</strong><small>${this._categoryLabel(t)} · ${this._scheduleSummary(t)} · ${this._t("priority")} ${t.priority || 3}/5</small></span></button>`).join("")}</div></div>` : "";
    return `<section class="dialog-section wizard-section"><div class="section-heading"><div><h3>${this._t("wizardStepStart")}</h3><p class="section-hint">${this._t("wizardStartHint")}</p></div></div>
      ${templatePicker}
      <div class="form-grid">${this._input("name", this._fieldLabel("name"), "text")}<label class="field"><span>${this._t("category")}</span><select data-draft="category">${CATEGORY_KEYS.map(k => `<option value="${k}" ${d.category === k ? "selected" : ""}>${this._t(k)}</option>`).join("")}</select></label>${d.category === "custom" ? this._input("custom_category", this._fieldLabel("custom_category", "ownCategory"), "text") : ""}<label class="field"><span>${this._t("area")}</span><select data-draft="area_id"><option value="">—</option>${areas.map(a => `<option value="${a.area_id}" ${d.area_id === a.area_id ? "selected" : ""}>${this._html(a.name)}</option>`).join("")}</select></label></div>
      <label class="entity-field"><span>${this._t("entity")}</span><ha-entity-picker id="entityPicker" allow-custom-entity></ha-entity-picker></label>
      <label class="description-field"><span>${this._t("description")}</span><textarea data-draft="description">${this._html(d.description)}</textarea></label>
      <label class="field"><span>${this._t("tags")}</span><input data-draft="tags" type="text" value="${this._html(Array.isArray(d.tags) ? d.tags.join(", ") : d.tags || "")}" placeholder="${this._t("tagPlaceholder")}"></label>
      <div class="wizard-split"><section class="inline-priority"><div class="priority-head"><div><h4>${this._t("priority")}</h4><p class="section-hint">${this._t("priorityHint")}</p></div><strong>${this._priorityLabel(d.priority)} (${d.priority}/5)</strong></div><input class="priority-slider" data-draft="priority" type="range" min="1" max="5" step="1" value="${this._html(d.priority || 3)}"><div class="priority-scale">${[1,2,3,4,5].map(p => `<span class="${Number(d.priority || 3) === p ? "active" : ""}">${this._priorityLabel(p)}</span>`).join("")}</div></section>${this._appearanceCompactHtml(d)}</div>
    </section>`;
  },

  _wizardScheduleStepHtml(d) {
    const scheduleFields = this._scheduleFieldsHtml(d);
    return `<section class="dialog-section wizard-section"><div class="section-heading"><div><h3>${this._t("schedule")}</h3><p class="section-hint">${this._t("wizardScheduleHint")}</p></div></div><div class="form-grid"><label class="field"><span>${this._t("taskType")}</span><select data-draft="type"><option value="time" ${d.type === "time" ? "selected" : ""}>${this._t("time")}</option><option value="meter" ${d.type === "meter" ? "selected" : ""}>${this._t("meter")}</option></select></label><label class="field"><span>${this._t("scheduleMode")}</span><select data-draft="schedule_mode">${(d.type === "meter" ? ["interval"] : SCHEDULE_MODES).map(m => `<option value="${m}" ${d.schedule_mode === m ? "selected" : ""}>${this._scheduleModeLabel(m)}</option>`).join("")}</select></label></div>${scheduleFields}<div class="form-grid">${this._input("warning_threshold", this._t("warning"), "number")}${this._input("critical_threshold", this._t("critical"), "number")}</div></section>`;
  },

  _appearanceCompactHtml(d) {
    return `<section class="appearance-compact"><div class="section-heading compact-heading"><div><h4>${this._t("appearance")}</h4><p class="section-hint">${this._t("appearanceHint")}</p></div></div><div class="appearance-grid"><label class="field icon-picker-field appearance-icon-field"><span>${this._t("icon")}</span><div id="iconHost"></div></label><label class="field color-field"><span>${this._t("iconColor")}</span><div class="color-input-row"><input id="iconColorInput" data-draft="icon_color" type="color" value="${this._html(d.icon_color || "#a855f7")}"><button class="ghost small" data-action="random-icon-color" type="button" title="${this._t("randomColors")}"><ha-icon icon="mdi:palette"></ha-icon></button></div></label><label class="field color-field"><span>${this._t("cardColor")}</span><div class="color-input-row"><input id="cardColorInput" data-draft="card_color" type="color" value="${this._html(d.card_color || "#6b5a00")}"><button class="ghost small" data-action="random-card-color" type="button" title="${this._t("randomColors")}"><ha-icon icon="mdi:palette"></ha-icon></button></div></label></div><div class="color-actions"><button class="ghost" data-action="random-colors" type="button"><ha-icon icon="mdi:palette-swatch-outline"></ha-icon>${this._t("randomColors")}</button><button class="ghost" data-action="clear-colors" type="button"><ha-icon icon="mdi:close-circle-outline"></ha-icon>${this._t("clearColors")}</button><label class="check inline-check"><input data-draft="enabled" type="checkbox" ${d.enabled ? "checked" : ""}>${this._t("enabled")}</label></div></section>`;
  },

  _workflowFieldsHtml(d) {
    const checklist = Array.isArray(d.checklist) ? d.checklist : [];
    return `<section class="dialog-section wizard-section"><div class="section-heading"><div><h3>${this._t("workflow")}</h3><p class="section-hint">${this._t("workflowHint")}</p></div></div><div class="preset-row">${[["maintenance","mdi:wrench-clock","presetMaintenance"],["persistent","mdi:infinity","presetPersistent"],["repair","mdi:alert-wrench-outline","presetRepair"]].map(([id, icon, label]) => `<button class="ghost" data-workflow-preset="${id}"><ha-icon icon="${icon}"></ha-icon>${this._t(label)}</button>`).join("")}</div><div class="form-grid"><label class="field"><span>${this._t("taskRelevance")}</span><select data-draft="recurrence_mode">${RECURRENCE_MODES.map(mode => `<option value="${mode}" ${d.recurrence_mode === mode ? "selected" : ""}>${this._t(mode === "persistent" ? "recurrencePersistent" : "recurrenceStandard")}</option>`).join("")}</select></label><label class="field"><span>${this._t("workflowState")}</span><select data-draft="workflow_state">${WORKFLOW_STATES.map(state => `<option value="${state}" ${d.workflow_state === state ? "selected" : ""}>${this._workflowStateLabel(state)}</option>`).join("")}</select></label></div><div class="checklist-editor"><div class="checklist-editor-head"><div><strong>${this._t("checklist")}</strong><p class="section-hint">${this._t("checklistHint")}</p></div><button class="ghost small" type="button" data-action="add-checklist-item"><ha-icon icon="mdi:plus"></ha-icon>${this._t("addChecklistItem")}</button></div>${checklist.length ? checklist.map((item, index) => `<div class="checklist-editor-row"><label class="check compact"><input type="checkbox" data-draft-checklist-done="${index}" ${item.done ? "checked" : ""}>${this._t("done")}</label><label class="field"><span>${this._t("label")}</span><input type="text" data-draft-checklist-label="${index}" value="${this._html(item.label || "")}" placeholder="${this._t("checklistItemPlaceholder")}"></label><label class="check compact icon-check" title="${this._t("required")}"><input type="checkbox" data-draft-checklist-required="${index}" ${item.required ? "checked" : ""}><ha-icon icon="mdi:asterisk"></ha-icon></label><button class="ghost icon-only" type="button" title="${this._t("delete")}" data-action="remove-checklist-item" data-checklist-index="${index}"><ha-icon icon="mdi:delete-outline"></ha-icon></button></div>`).join("") : `<p class="section-hint">${this._t("checklistEmpty")}</p>`}</div><div class="completion-requirements"><strong>${this._t("completionRequirements")}</strong><div class="check-grid">${[
      ["completion_requirements_note", "completionRequirementNote"],
      ["completion_requirements_material", "completionRequirementMaterial"],
      ["completion_requirements_cost", "completionRequirementCost"],
      ["completion_requirements_performed_by", "completionRequirementPerformedBy"],
      ["completion_requirements_checklist", "completionRequirementChecklist"],
    ].map(([key, label]) => `<label class="check"><input data-draft="${key}" type="checkbox" ${d[key] ? "checked" : ""}>${this._t(label)}</label>`).join("")}</div></div></section>`;
  },

  _scheduleFieldsHtml(d) {
    if (d.type === "meter") {
      return `<div class="form-grid">${this._input("interval", this._t("interval"), "number")}<label class="field"><span>${this._t("intervalUnit")}</span><select data-draft="interval_unit">${["hours","days","weeks","months"].map(u => `<option value="${u}" ${d.interval_unit === u ? "selected" : ""}>${this._t(u)}</option>`).join("")}</select></label>${this._input("last_done", this._t("lastDone"), "datetime-local")}</div>`;
    }
    if (d.schedule_mode === "one_time") {
      return `<div class="schedule-callout"><ha-icon icon="mdi:calendar-check-outline"></ha-icon><div><strong>${this._t("oneTime")}</strong><p>${this._t("oneTimeArchiveHint")}</p></div></div><div class="form-grid">${this._input("due_date", this._fieldLabel("due_date", "dueDate"), "datetime-local")}</div>`;
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
    return `<section class="dialog-section wizard-section"><div class="section-heading"><div><h3>${this._t("notificationRules")}</h3><p class="section-hint">${this._t("notificationRulesHint")}</p></div></div><label class="check"><input data-draft="notifications_enabled" type="checkbox" ${d.notifications_enabled ? "checked" : ""}>${this._t("taskNotificationsEnabled")}</label><label class="check"><input data-draft="notifications_inherit" type="checkbox" ${d.notifications_inherit ? "checked" : ""}>${this._t("inheritGlobalRules")}</label><div class="toggle-grid"><label class="check"><input data-draft="notifications_warning" type="checkbox" ${d.notifications_warning ? "checked" : ""} ${disabled}>${this._t("notifyWarning")}</label><label class="check"><input data-draft="notifications_critical" type="checkbox" ${d.notifications_critical ? "checked" : ""} ${disabled}>${this._t("notifyCritical")}</label><label class="check"><input data-draft="notifications_overdue" type="checkbox" ${d.notifications_overdue ? "checked" : ""} ${disabled}>${this._t("notifyOverdue")}</label><label class="check"><input data-draft="notifications_unavailable" type="checkbox" ${d.notifications_unavailable ? "checked" : ""} ${disabled}>${this._t("notifyUnavailable")}</label><label class="check"><input data-draft="notifications_once_per_status" type="checkbox" ${d.notifications_once_per_status ? "checked" : ""} ${disabled}>${this._t("oncePerStatus")}</label><label class="check"><input data-draft="notifications_escalation_enabled" type="checkbox" ${d.notifications_escalation_enabled ? "checked" : ""} ${disabled}>${this._t("escalation")}</label><label class="check"><input data-draft="notifications_actionable" type="checkbox" ${d.notifications_actionable ? "checked" : ""} ${disabled}>${this._t("actionableNotifications")}</label></div><div class="form-grid"><label class="field"><span>${this._t("repeatEveryDays")}</span><input data-draft="notifications_repeat_days" type="number" min="0" max="365" value="${this._html(d.notifications_repeat_days || "3")}" ${disabled}></label><label class="field"><span>${this._t("escalationAfterDays")}</span><input data-draft="notifications_escalation_after_days" type="number" min="0" max="365" value="${this._html(d.notifications_escalation_after_days || "3")}" ${disabled}></label><label class="field"><span>${this._t("notificationServiceOverride")}</span><input data-draft="notifications_notify_service" value="${this._html(d.notifications_notify_service || "")}" placeholder="notify.mobile_app_phone" ${disabled}></label></div></section>`;
  },

  _fieldLabel(key, labelKey = key) { return `${this._t(labelKey)}${this._isRequiredDraftField(key) ? `<span class="required-mark inline-required" title="${this._t("required")}"></span>` : ""}`; },

  _input(key, label, type) { return `<label class="field ${this._isRequiredDraftField(key) ? "is-required" : ""}"><span>${label}</span><input data-draft="${key}" type="${type}" value="${this._html(this._draft[key] || "")}"></label>`; },

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
    return `<div class="dialog-backdrop"><section class="dialog wide diagnostics-dialog"><header><div class="dialog-title-block"><h2>${this._t("diagnostics")}</h2><p class="section-hint">${this._t("settingsIntro")}</p></div><button class="icon" data-action="close-diagnostics"><ha-icon icon="mdi:close"></ha-icon></button></header><div class="dialog-body">
      <section class="dialog-section"><div class="diagnostic-grid">
        <div><span>${this._t("integrationLabel")}</span><strong>${VERSION}</strong></div><div><span>${this._t("frontendLabel")}</span><strong>${VERSION}</strong></div><div><span>${this._t("schemaLabel")}</span><strong>${this._state?.schema_version ?? "—"}</strong></div>
        <div><span>${this._t("taskLabel")}</span><strong>${payload.task_count}</strong></div><div><span>${this._t("historyLabel")}</span><strong>${payload.history_count}</strong></div><div><span>${this._t("backups")}</span><strong>${payload.backup_count}</strong></div>
        <div><span>${this._t("quarantine")}</span><strong>${payload.quarantine_count}</strong></div><div><span>${this._t("auditLog")}</span><strong>${payload.audit_count}</strong></div><div><span>${this._t("notificationHistory")}</span><strong>${notificationHistory.length}</strong></div>
        <div><span>${this._t("lastDigest")}</span><strong>${lastDigestAt ? this._datetime(lastDigestAt) : "—"}</strong></div><div><span>${this._t("lastAutomaticBackup")}</span><strong>${meta.last_automatic_backup?.created_at ? this._datetime(meta.last_automatic_backup.created_at) : "—"}</strong></div><div><span>${this._t("pendingRepairs")}</span><strong>${integrity.errors || 0}</strong></div>
        <div><span>${this._t("taskEntities")}</span><strong>${this._t(entitySettings.mode || "off")}</strong></div><div><span>${this._t("notifications")}</span><strong>${notificationSettings.enabled ? this._t("enabled") : this._t("off")}</strong></div><div><span>${this._t("testMode")}</span><strong>${notificationSettings.test_mode ? this._t("enabled") : this._t("off")}</strong></div>
      </div></section>
      <section class="dialog-section integrity-summary ${integrity.healthy ? "healthy" : "has-errors"}"><div class="section-title-actions"><div><h3>${this._t("dataIntegrity")}</h3><p>${integrity.healthy ? this._t("integrityHealthy") : `${integrity.errors || 0} ${this._t("integrityErrors")} · ${integrity.warnings || 0} ${this._t("integrityWarnings")}`}</p></div><div class="button-row"><button class="ghost" data-action="check-integrity"><ha-icon icon="mdi:shield-search-outline"></ha-icon>${this._t("runIntegrityCheck")}</button><button class="primary" data-action="repair-integrity" ${integrity.repairable ? "" : "disabled"}><ha-icon icon="mdi:shield-sync-outline"></ha-icon>${this._t("repairIntegrity")}</button></div></div>
        ${(integrity.issues || []).map(issue => `<p class="${this._html(issue.severity || "warning")}"><strong>${this._html(issue.code || issue.message)}</strong>${issue.task_id ? ` · ${this._html(issue.task_id)}` : ""}</p>`).join("") || `<p>${this._t("ok")}</p>`}
      </section>
      <section class="dialog-section"><h3>${this._t("migration")}</h3>${meta.last_migration ? `<pre>${this._html(JSON.stringify(meta.last_migration, null, 2))}</pre>` : `<p>—</p>`}</section>
      <section class="dialog-section"><h3>${this._t("diagnostics")}</h3>${diag.length ? diag.map(i => `<p class="${this._html(i.severity || "warning")}">${this._html(i.task_id || this._t("globalLabel"))}: ${this._html(i.message)}</p>`).join("") : `<p>${this._t("ok")}</p>`}</section>
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
    const notifications = t.notifications || {};
    const checklist = Array.isArray(t.checklist) ? t.checklist : [];
    return `<div class="dialog-backdrop"><section class="dialog small"><header><h2>${this._t("preview")}</h2><button class="icon" data-action="close-template-preview"><ha-icon icon="mdi:close"></ha-icon></button></header><div class="dialog-body"><section class="dialog-section template-preview"><div class="template-preview-heading"><ha-icon icon="${this._html(t.icon)}"></ha-icon><div><h3>${this._html(t.name)}</h3><p>${this._html(t.description || "")}</p></div></div><div class="meta-grid"><div><span>${this._t("category")}</span><strong>${this._categoryLabel(t)}</strong></div><div><span>${this._t("schedule")}</span><strong>${this._scheduleSummary(t)}</strong></div><div><span>${this._t("priority")}</span><strong>${this._priorityLabel(t.priority)} ${t.priority}/5</strong></div><div><span>${this._t("workflowPreset")}</span><strong>${this._t((t.recurrence_mode || "standard") === "persistent" ? "presetPersistent" : "presetMaintenance")}</strong></div></div><div class="preview-plan"><h3>${this._t("templateCreates")}</h3><ul><li>${this._t("schedule")}: ${this._scheduleSummary(t)}</li><li>${this._t("workflow")}: ${this._workflowStateLabel(t.workflow_state || this._workflowStartState(t.recurrence_mode || "standard"))}</li><li>${this._t("notifications")}: ${notifications.enabled === false ? this._t("disabled") : this._t("enabled")}</li>${checklist.length ? `<li>${this._t("checklist")}: ${checklist.length}</li>` : ""}</ul></div>${Array.isArray(t.tags) && t.tags.length ? `<div class="preview-tags"><span>${this._t("tags")}</span><div class="tag-list">${t.tags.map(tag => `<span>${this._html(tag)}</span>`).join("")}</div></div>` : ""}</section></div><footer><button class="ghost" data-action="close-template-preview">${this._t("cancel")}</button><button class="primary" data-template="${this._html(t.id)}"><ha-icon icon="mdi:plus"></ha-icon>${this._t("addTemplate")}</button></footer></section></div>`;
  }
});


// ---- frontend/src/dialogs/completion-dialog.ts ----
// Completion details dialog rendering.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _completionDialogHtml() {
    if (!this._completionDialog) return "";
    const task = (this._state?.tasks || []).find(t => t.id === this._completionDialog);
    const requirements = this._completionRequirementsFromTask(task);
    const missing = this._completionMissing(task);
    const requiredMark = (active) => active ? `<span class="required-mark" aria-label="${this._t("required")}" title="${this._t("required")}"></span>` : "";
    return `<div class="dialog-backdrop"><section class="dialog small"><header><h2>${this._t("done")}</h2><button class="icon" data-action="close-completion"><ha-icon icon="mdi:close"></ha-icon></button></header><div class="dialog-body"><section class="dialog-section"><div class="completion-heading"><ha-icon icon="${this._html(task?.icon || "mdi:wrench-clock")}"></ha-icon><div><h3>${this._html(task?.name || "")}</h3><p>${this._scheduleModeLabel(task?.schedule_mode || "interval")}</p></div></div>${missing.length ? `<div class="schedule-callout warning"><ha-icon icon="mdi:clipboard-alert-outline"></ha-icon><div><strong>${this._t("completionRequirements")}</strong><p>${missing.map(key => this._t(key)).join(" • ")}</p></div></div>` : ""}<label class="description-field ${requirements.note ? "is-required" : ""}"><span class="field-head"><span>${this._t("completionNote")}</span>${requiredMark(requirements.note)}</span><textarea id="completionNote" placeholder="${this._t("noteOptional")}">${this._html(this._completionNote)}</textarea></label><div class="form-grid"><label class="field ${requirements.material ? "is-required" : ""}"><span class="field-head"><span>${this._t("completionMaterial")}</span>${requiredMark(requirements.material)}</span><input id="completionMaterial" value="${this._html(this._completionMaterial)}" placeholder="${this._t("materialPlaceholder")}"></label><label class="field ${requirements.performed_by ? "is-required" : ""}"><span class="field-head"><span>${this._t("performedBy")}</span>${requiredMark(requirements.performed_by)}</span><input id="completionPerformedBy" value="${this._html(this._completionPerformedBy)}"></label><label class="field ${requirements.cost ? "is-required" : ""}"><span class="field-head"><span>${this._t("completionCost")}</span>${requiredMark(requirements.cost)}</span><input id="completionCost" type="number" min="0" step="0.01" value="${this._html(this._completionCost)}"></label><label class="field"><span>${this._t("completionCurrency")}</span><select id="completionCurrency">${["EUR","USD","GBP","CHF"].map(currency => `<option value="${currency}" ${this._completionCurrency === currency ? "selected" : ""}>${currency}</option>`).join("")}</select></label></div>${this._completionChecklist.length ? `<div class="completion-checklist"><div class="completion-checklist-head"><strong>${this._t("checklist")}</strong><span>${this._checklistProgress(this._completionChecklist).done}/${this._checklistProgress(this._completionChecklist).total}</span></div>${this._completionChecklist.map((item, index) => `<label class="check completion-check-item ${item.done ? "done" : ""} ${item.required ? "is-required" : ""}"><input type="checkbox" data-completion-checklist="${index}" ${item.done ? "checked" : ""}><span>${this._html(item.label)}</span>${item.required ? `<span class="required-mark" aria-label="${this._t("required")}" title="${this._t("required")}"></span>` : ""}</label>`).join("")}</div>` : ""}${task?.schedule_mode === "one_time" ? `<div class="schedule-callout"><ha-icon icon="mdi:archive-check-outline"></ha-icon><div><strong>${this._t("oneTime")}</strong><p>${this._t("oneTimeCompletionHint")}</p></div></div>` : ""}</section></div><footer><button class="ghost" data-action="close-completion">${this._t("cancel")}</button><button class="primary" data-action="confirm-done" ${missing.length ? "disabled" : ""}><ha-icon icon="mdi:check"></ha-icon>${this._t("markDone")}</button></footer></section></div>`;
  }
});


// ---- frontend/src/dialogs/onboarding-dialog.ts ----
// First-run onboarding and starter pack selection.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _onboardingDialogHtml() {
    if (!this._onboardingDialog) return "";
    const packs = this._state?.template_packs || [];
    return `<div class="dialog-backdrop"><section class="dialog onboarding-dialog"><header><div class="dialog-title-block"><h2>${this._t("onboarding")}</h2><p class="section-hint">${this._t("onboardingHint")}</p></div><button class="icon" data-action="skip-onboarding" title="${this._t("skip")}"><ha-icon icon="mdi:close"></ha-icon></button></header><div class="dialog-body"><section class="onboarding-hero"><div class="empty-orb"><ha-icon icon="mdi:home-wrench-outline"></ha-icon></div><div><h3>${this._t("onboardingTitle")}</h3></div></section><section class="pack-grid">${packs.map(pack => { const checked = this._selectedPacks.has(pack.id); return `<button type="button" class="pack-card ${checked ? "selected" : ""}" data-pack-toggle="${this._html(pack.id)}"><ha-icon icon="${this._html(pack.icon || "mdi:package-variant")}"></ha-icon><div><strong>${this._html(pack.name)}</strong><p>${this._html(pack.description || "")}</p><small>${(pack.template_ids || []).length} ${this._t("templates")}</small></div><span class="pack-check"><ha-icon icon="${checked ? "mdi:check-circle" : "mdi:circle-outline"}"></ha-icon></span></button>`; }).join("")}</section></div><footer><button class="ghost" data-action="skip-onboarding">${this._t("skip")}</button><button class="primary big" data-action="apply-onboarding" ${this._selectedPacks.size ? "" : "disabled"}><ha-icon icon="mdi:rocket-launch-outline"></ha-icon>${this._t("startSetup")} · ${this._selectedPacks.size}</button></footer></section></div>`;
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
    return `<div class="dialog-backdrop"><section class="dialog wide data-dialog"><header><div class="dialog-title-block"><h2>${this._t("dataSafety")}</h2><div class="dialog-meta-row"><span class="dialog-meta-chip">v${VERSION}</span></div></div><button class="icon" data-action="close-data-dialog"><ha-icon icon="mdi:close"></ha-icon></button></header><div class="dialog-body">
      <section class="dialog-section integrity-summary ${integrity.healthy === false ? "has-errors" : "healthy"}">
        <div class="section-title-actions"><div><h3>${this._t("dataIntegrity")}</h3><p>${integrity.healthy ? this._t("integrityHealthy") : `${integrity.errors || 0} ${this._t("integrityErrors")} · ${integrity.warnings || 0} ${this._t("integrityWarnings")}`}</p></div><div class="button-row"><button class="ghost" data-action="check-integrity"><ha-icon icon="mdi:shield-search-outline"></ha-icon>${this._t("runIntegrityCheck")}</button><button class="primary" data-action="repair-integrity" ${integrity.repairable ? "" : "disabled"}><ha-icon icon="mdi:shield-sync-outline"></ha-icon>${this._t("repairIntegrity")}</button></div></div>
        ${Array.isArray(integrity.issues) && integrity.issues.length ? `<div class="issue-list">${integrity.issues.slice(0, 20).map(issue => `<article class="issue ${this._html(issue.severity || "warning")}"><ha-icon icon="${issue.severity === "error" ? "mdi:alert-circle" : "mdi:alert-outline"}"></ha-icon><div><strong>${this._html(issue.code || issue.message || "integrity_issue")}</strong><small>${this._html(issue.task_id || issue.record_id || issue.section || this._t("globalLabel"))}</small></div>${issue.repairable ? `<span>${this._t("repairIntegrity")}</span>` : ""}</article>`).join("")}</div>` : ""}
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
        ${quarantine.length ? `<div class="quarantine-list">${quarantine.map(record => `<article><div><strong>${this._html(record.reason || this._t("invalidRecord"))}</strong><small>${this._datetime(record.detected_at)} · ${this._html(record.source || this._t("unknownLabel"))}</small></div><div class="button-row"><button class="ghost small" data-export-quarantine="${record.id}"><ha-icon icon="mdi:download"></ha-icon></button><button class="ghost small" data-restore-quarantine="${record.id}"><ha-icon icon="mdi:restore"></ha-icon>${this._t("restoreRecord")}</button><button class="icon danger" data-delete-quarantine="${record.id}"><ha-icon icon="mdi:delete-outline"></ha-icon></button></div></article>`).join("")}</div>` : `<p>${this._t("noHistory")}</p>`}
      </section>

      <section class="dialog-section audit-section">
        <div class="section-title-actions"><div><h3>${this._t("auditLog")}</h3><p>${audit.length} ${this._t("records")}</p></div></div>
        ${audit.length ? `<div class="audit-list">${audit.slice(0, 100).map(event => `<article><div class="audit-icon"><ha-icon icon="mdi:text-box-search-outline"></ha-icon></div><div class="audit-content"><strong>${this._html(event.action || this._t("auditEvent"))}</strong><small>${this._datetime(event.created_at)} · ${this._t("auditSource")}: ${this._html(event.source || this._t("unknownLabel"))}${event.task_id ? ` · ${this._t("auditTask")}: ${this._html(event.task_id)}` : ""}</small>${event.previous || event.current ? `<details><summary>${this._t("auditChanges")}</summary><pre>${this._html(JSON.stringify({ previous: event.previous, current: event.current, details: event.details }, null, 2))}</pre></details>` : ""}</div></article>`).join("")}</div>` : `<p>${this._t("auditEmpty")}</p>`}
      </section>
    </div></section></div>`;
  },

  _backupRowHtml(backup) {
    return `<article class="backup-row ${backup.pinned ? "pinned" : ""}"><div class="backup-main"><ha-icon icon="${backup.pinned ? "mdi:pin" : backup.automatic ? "mdi:backup-restore" : "mdi:database-outline"}"></ha-icon><div><strong>${this._html(backup.name || backup.reason || this._t("backupLabel"))}</strong><small>${this._datetime(backup.created_at)} · ${backup.task_count || 0} ${this._t("taskLabel")} · ${backup.history_count || 0} ${this._t("historyLabel")}${backup.automatic ? ` · ${this._t("automaticLabel")}` : ""}</small></div></div><div class="button-row"><button class="icon" data-pin-backup="${backup.id}" data-pinned="${backup.pinned ? "1" : "0"}" title="${this._t("pinBackup")}"><ha-icon icon="${backup.pinned ? "mdi:pin-off-outline" : "mdi:pin-outline"}"></ha-icon></button><button class="ghost small" data-diff-backup="${backup.id}"><ha-icon icon="mdi:compare"></ha-icon>${this._t("compareBackup")}</button><button class="ghost small" data-restore="${backup.id}"><ha-icon icon="mdi:restore"></ha-icon>${this._t("restore")}</button><button class="icon danger" data-delete-backup="${backup.id}" title="${this._t("delete")}"><ha-icon icon="mdi:delete-outline"></ha-icon></button></div></article>`;
  },

  _backupDiffHtml() {
    const diff = this._backupDiff;
    const taskDiff = diff.tasks || {};
    const changed = taskDiff.changed || [];
    const restorableTaskIds = [...(taskDiff.added || []), ...changed].map(item => item.id).filter(Boolean);
    return `<section class="dialog-section backup-diff-section"><div class="section-title-actions"><div><h3>${this._t("backupDiff")}</h3><p>${diff.backup?.name || diff.backup?.reason || this._t("backupLabel")}</p></div><button class="icon" data-action="close-backup-diff"><ha-icon icon="mdi:close"></ha-icon></button></div>
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
        <div class="dialog-title-block"><h3>${this._t("notificationRules")}</h3><p class="section-hint">${this._t("notificationRulesHint")}</p></div>
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
      <section class="dialog-section"><div class="section-title-actions"><h3>${this._t("notificationHistory")}</h3><button class="ghost small" data-action="clear-notification-history" ${history.length ? "" : "disabled"}><ha-icon icon="mdi:delete-sweep-outline"></ha-icon>${this._t("clearNotificationHistory")}</button></div>${history.length ? `<div class="notification-history">${history.map(item => `<article><div><strong>${this._html(item.task_name || item.title || item.kind || this._t("notificationLabel"))}</strong><small>${this._datetime(item.sent_at)} · ${this._html(item.status || item.kind || "")}${item.automatic ? ` · ${this._t("automatic")}` : ` · ${this._t("manual")}`}${item.error ? ` · ${this._html(item.error)}` : ""}</small></div><span class="status ${item.success === false ? "critical" : this._html(item.status || item.level || "ok")}">${item.success === false ? this._t("notificationFailed") : this._t(item.level || item.status || "ok")}</span></article>`).join("")}</div>` : `<p>${this._t("notificationHistoryEmpty")}</p>`}</section>
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
    onAll("[data-action='toggle-quick-create']", "click", () => { this._quickCreateOpen = !this._quickCreateOpen; this._render(); });
    onAll("[data-action='quick-create-template']", "click", () => { this._quickCreateOpen = false; this._openCreate(); });
    onAll("[data-action='close']", "click", () => { this._dialog = null; this._error = ""; this._render(); });
    onAll("[data-action='save']", "click", () => this._save());
    onAll("[data-action='wizard-next']", "click", () => this._goDialogStep(1));
    onAll("[data-action='wizard-back']", "click", () => this._goDialogStep(-1));
    onAll("[data-action='apply-picked-template']", "click", () => this._applySelectedTemplateDraft());
    onAll("[data-pick-template]", "click", el => { const template = this._template(el.dataset.pickTemplate); this._templateDraftId = template?.id || ""; this._templatePickerQuery = template?.name || ""; this._render(); });
    onAll("[data-action='diagnostics']", "click", () => { this._diagnostics = true; this._render(); });
    onAll("[data-settings-tab]", "click", el => { this._settingsTab = el.dataset.settingsTab || "general"; this._render(); });
    onAll("[data-action='history-dialog']", "click", () => { this._historyDialog = true; this._render(); });
    onAll("[data-action='close-history']", "click", () => { this._historyDialog = false; this._render(); });
    onAll("[data-history-scope]", "click", el => { this._historyScope = el.dataset.historyScope || "all"; this._render(); });
    onAll("[data-action='close-diagnostics']", "click", () => { this._diagnostics = false; this._render(); });
    onAll("[data-action='data-dialog']", "click", () => { this._dataDialog = true; this._render(); });
    onAll("[data-action='close-data-dialog']", "click", () => { this._dataDialog = false; this._backupDiff = null; this._render(); });
    onAll("[data-action='notification-dialog']", "click", () => { this._notificationDialog = true; this._render(); });
    onAll("[data-action='close-notification-dialog']", "click", () => { this._notificationDialog = false; this._render(); });
    onAll("[data-action='close-template-preview']", "click", () => { this._templatePreview = null; this._render(); });
    onAll("[data-action='close-task-detail']", "click", () => { this._taskDetailId = ""; this._taskNoteDraft = ""; this._render(); });
    onAll("[data-action='close-completion']", "click", () => { this._completionDialog = null; this._render(); });
    onAll("[data-action='confirm-done']", "click", () => this._confirmDone());
    onAll("[data-completion-checklist]", "change", (el, event) => this._updateCompletionChecklist(Number(el.dataset.completionChecklist), event.target.checked));

    // Dashboard layout, filters and bulk actions.
    onAll("[data-layout]", "click", el => this._setLayout(el.dataset.layout));
    onAll("[data-action='toggle-quick-filters']", "click", () => { this._quickFiltersOpen = !this._quickFiltersOpen; this._render(); });
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

    // Templates and onboarding.
    onAll("[data-action='select-visible']", "click", () => { this._filteredTemplates().forEach(t => this._selectedTemplates.add(t.id)); this._render(); });
    onAll("[data-action='clear-template-selection']", "click", () => { this._selectedTemplates.clear(); this._render(); });
    onAll("[data-template-category]", "click", el => { this._templateCategory = el.dataset.templateCategory; this._render(); this._scrollTemplateResults(); });
    onAll("[data-action='add-selected']", "click", () => this._addSelectedTemplates());
    onAll("[data-add-pack]", "click", el => this._addStarterPack(el.dataset.addPack));
    onAll("[data-action='toggle-starter-packs']", "click", () => { this._starterPacksCollapsed = !this._starterPacksCollapsed; this._render(); });
    onAll("[data-pack-toggle]", "click", el => { const id = el.dataset.packToggle; this._selectedPacks.has(id) ? this._selectedPacks.delete(id) : this._selectedPacks.add(id); this._render(); });
    onAll("[data-action='apply-onboarding']", "click", () => this._applyOnboarding());
    onAll("[data-action='open-onboarding']", "click", () => { this._onboardingDialog = true; this._selectedPacks.clear(); this._render(); });
    onAll("[data-action='skip-onboarding']", "click", () => this._skipOnboarding());

    // Editor-specific controls. Prevent button clicks from submitting/re-opening the dialog.
    onAll("[data-action='random-colors']", "click", (_el, e) => { e.preventDefault(); e.stopPropagation(); this._randomizeColors("both"); });
    onAll("[data-action='random-icon-color']", "click", (_el, e) => { e.preventDefault(); e.stopPropagation(); this._randomizeColors("icon"); });
    onAll("[data-action='random-card-color']", "click", (_el, e) => { e.preventDefault(); e.stopPropagation(); this._randomizeColors("card"); });
    onAll("[data-action='clear-colors']", "click", (_el, e) => { e.preventDefault(); e.stopPropagation(); this._draft.icon_color = ""; this._draft.card_color = ""; this._render(); });
    onAll("[data-action='add-checklist-item']", "click", (_el, e) => { e.preventDefault(); e.stopPropagation(); this._addDraftChecklistItem(); });
    onAll("[data-action='remove-checklist-item']", "click", (el, e) => { e.preventDefault(); e.stopPropagation(); this._removeDraftChecklistItem(Number(el.dataset.checklistIndex)); });
    onAll("[data-workflow-preset]", "click", (el, e) => { e.preventDefault(); e.stopPropagation(); this._applyWorkflowPreset(el.dataset.workflowPreset); });
    onAll("[data-draft-checklist-label]", "input", (el, event) => this._updateDraftChecklistItem(Number(el.dataset.draftChecklistLabel), "label", event.target.value));
    onAll("[data-draft-checklist-done]", "change", (el, event) => this._updateDraftChecklistItem(Number(el.dataset.draftChecklistDone), "done", event.target.checked));
    onAll("[data-draft-checklist-required]", "change", (el, event) => this._updateDraftChecklistItem(Number(el.dataset.draftChecklistRequired), "required", event.target.checked));

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
    on("templateSeason", "change", e => { this._templateSeason = e.target.value; this._render(); this._scrollTemplateResults(); });
    on("templateCommon", "change", e => { this._templateOnlyCommon = e.target.checked; this._render(); this._scrollTemplateResults(); });
    on("templatePicker", "input", e => { this._setTemplateDraft(e.target.value); this._renderSoon(120); });
    on("historySearch", "input", e => { this._historySearch = e.target.value; this._renderSoon(150); });
    on("historyType", "change", e => { this._historyType = e.target.value; this._render(); });
    on("historyRange", "change", e => { this._historyRange = e.target.value; this._render(); });
    on("historyTask", "change", e => { this._historyTask = e.target.value; this._render(); });
    on("notificationPreviewTask", "change", e => { this._notificationPreviewTask = e.target.value; this._notificationPreview = null; this._render(); });
    on("importPayload", "input", e => { this._importPayload = e.target.value; this._importPreview = null; });
    on("importMode", "change", e => { this._importMode = e.target.value; this._importPreview = null; this._render(); });
    on("importDuplicateMode", "change", e => { this._importDuplicateMode = e.target.value; this._importPreview = null; this._render(); });
    on("backupName", "input", e => { this._backupName = e.target.value; });
    on("backupPinned", "change", e => { this._backupPinned = e.target.checked; });
    on("notifyService", "input", e => { this._notifyService = e.target.value; });
    on("taskNoteDraft", "input", e => { this._taskNoteDraft = e.target.value; });

    // Task actions and ordering.
    onAll("[data-edit]", "click", el => this._openEdit(el.dataset.edit));
    onAll("[data-done]", "click", (el, e) => { e.preventDefault(); e.stopPropagation(); this._openCompletion(el.dataset.done); });
    onAll("[data-task-card]", "click", (el, e) => {
      if (e.target.closest("button,a,input,select,textarea,label")) return;
      this._taskDetailId = el.dataset.taskCard || "";
      this._taskNoteDraft = "";
      this._render();
    });
    onAll("[data-action='save-task-note']", "click", () => this._saveTaskNote());
    onAll("[data-toggle-checklist]", "change", (el, event) => { const [id, index] = el.dataset.toggleChecklist.split(":"); this._toggleChecklistItem(id, Number(index), event.target.checked); });
    onAll("[data-reactivate]", "click", el => this._reactivate(el.dataset.reactivate));
    onAll("[data-workflow-state]", "click", el => this._setWorkflowState(el.dataset.taskId, el.dataset.workflowState));
    onAll("[data-workflow-menu]", "click", el => { this._workflowMenu = this._workflowMenu === el.dataset.workflowMenu ? null : el.dataset.workflowMenu; this._render(); });
    onAll("[data-reset-task-progress]", "click", el => this._resetTaskProgress(el.dataset.resetTaskProgress));
    onAll("[data-restart-task-cycle]", "click", el => this._restartTaskCycle(el.dataset.restartTaskCycle));
    onAll("[data-skip-task-cycle]", "click", el => this._skipTaskCycle(el.dataset.skipTaskCycle));
    onAll("[data-snooze-menu]", "click", el => { this._snoozeMenu = this._snoozeMenu === el.dataset.snoozeMenu ? null : el.dataset.snoozeMenu; this._render(); });
    onAll("[data-snooze-days]", "click", el => { const [id, days] = el.dataset.snoozeDays.split(":"); this._snooze(id, Number(days)); });
    onAll("[data-clear-snooze]", "click", el => this._clearSnooze(el.dataset.clearSnooze));
    onAll("[data-delete]", "click", el => this._delete(el.dataset.delete));
    onAll("[data-undo]", "click", el => this._undo(el.dataset.undo));
    onAll("[data-restore]", "click", el => this._restoreBackup(el.dataset.restore));
    onAll("[data-copy-diagnostics]", "click", el => { navigator.clipboard?.writeText(el.dataset.copyDiagnostics || ""); this._showToast(this._t("copyDiagnostics")); });
    onAll("[data-template]", "click", (el, e) => { e.stopPropagation(); this._openCreate(this._template(el.dataset.template)); this._templatePreview = null; });
    onAll("[data-template-favorite]", "click", (el, e) => { e.preventDefault(); e.stopPropagation(); const id = el.dataset.templateFavorite; this._templateFavorites.has(id) ? this._templateFavorites.delete(id) : this._templateFavorites.add(id); localStorage.setItem("maintenance_dashboard_template_favorites", JSON.stringify([...this._templateFavorites])); this._render(); });
    onAll("[data-template-preview],[data-template-preview-btn]", "click", (el, e) => { e.stopPropagation(); this._templatePreview = el.dataset.templatePreview || el.dataset.templatePreviewBtn; this._render(); });
    onAll("[data-template-check]", "change", el => { el.checked ? this._selectedTemplates.add(el.dataset.templateCheck) : this._selectedTemplates.delete(el.dataset.templateCheck); this._render(); });
    onAll("[data-apply-template]", "click", el => { this._applyTemplate(this._template(el.dataset.applyTemplate)); this._templateDraftId = el.dataset.applyTemplate || ""; this._render(); });
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
    if (!this._draft.name.trim()) { this._error = this._t("nameMissing"); this._render(); return; }
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
      checklist: this._completionChecklist,
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
    this._completionChecklist = [];
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

  async _toggleChecklistItem(taskId, index, done) {
    const task = (this._state?.tasks || []).find(item => item.id === taskId);
    if (!task) return;
    const checklist = Array.isArray(task.checklist) ? task.checklist.map(item => ({ ...item })) : [];
    if (!checklist[index]) return;
    checklist[index].done = Boolean(done);
    await this.hass.callWS({ type: "maintenance_dashboard/update_task", task_id: taskId, patch: { checklist } });
    await this._load();
  },

  async _reactivate(id) {
    await this.hass.callWS({ type: "maintenance_dashboard/reactivate_task", task_id: id });
    await this._load();
    this._showCompleted = true;
    this._showToast(this._t("actionReactivated"));
  },

  async _setWorkflowState(id, state) {
    await this.hass.callWS({ type: "maintenance_dashboard/set_workflow_state", task_id: id, state });
    await this._load();
    this._showToast(this._t("actionWorkflowUpdated"));
  },

  async _resetTaskProgress(id) {
    await this.hass.callWS({ type: "maintenance_dashboard/reset_task_progress", task_id: id });
    await this._load();
    this._showToast(this._t("actionWorkflowReset"));
  },

  async _restartTaskCycle(id) {
    await this.hass.callWS({ type: "maintenance_dashboard/restart_task_cycle", task_id: id });
    await this._load();
    this._showToast(this._t("actionCycleRestarted"));
  },

  async _skipTaskCycle(id) {
    await this.hass.callWS({ type: "maintenance_dashboard/skip_task_cycle", task_id: id });
    await this._load();
    this._showToast(this._t("actionCycleSkipped"));
  },

  async _exportData() { const payload = await this.hass.callWS({ type: "maintenance_dashboard/export_data" }); const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" }); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = `maintenance-dashboard-${new Date().toISOString().slice(0,10)}.json`; a.click(); URL.revokeObjectURL(url); this._showToast(this._t("actionExported")); },

  async _importData() { const payload = JSON.parse(this._importPayload || "{}"); await this.hass.callWS({ type: "maintenance_dashboard/import_data", payload }); this._importPayload = ""; this._dataDialog = false; await this._load(); this._showToast(this._t("actionImported")); },

  async _saveNotificationSettings() {
    const current = this._state?.settings || {};
    const currentNotifications = current.notifications || {};
    const currentEntities = current.task_entities || {};
    const checked = (id, fallback = false) => this.shadowRoot.getElementById(id) ? Boolean(this.shadowRoot.getElementById(id)?.checked) : fallback;
    const value = (id, fallback = "") => this.shadowRoot.getElementById(id)?.value ?? fallback;
    const patch = {
      notifications: {
        enabled: checked("notifyEnabled", currentNotifications.enabled !== false),
        notify_service: value("notifyService", currentNotifications.notify_service || ""),
        warning: checked("notifyWarning", currentNotifications.warning !== false),
        critical: checked("notifyCritical", currentNotifications.critical !== false),
        overdue: checked("notifyOverdue", currentNotifications.overdue !== false),
        unavailable: checked("notifyUnavailable", Boolean(currentNotifications.unavailable)),
        due: checked("notifyDue", currentNotifications.due !== false),
        once_per_status: checked("oncePerStatus", currentNotifications.once_per_status !== false),
        repeat_days: Number(value("notificationRepeatDays", currentNotifications.repeat_days ?? 0)),
        escalation_enabled: checked("notificationEscalation", currentNotifications.escalation_enabled !== false),
        escalation_after_days: Number(value("notificationEscalationDays", currentNotifications.escalation_after_days ?? 0)),
        actionable: checked("actionableNotifications", currentNotifications.actionable !== false),
        action_snooze_days: Number(value("actionSnoozeDays", currentNotifications.action_snooze_days ?? 7)),
        history_retention: Number(value("notificationHistoryRetention", currentNotifications.history_retention ?? 200)),
        test_mode: checked("notificationTestMode", Boolean(currentNotifications.test_mode)),
        daily_digest: checked("dailyDigest", Boolean(currentNotifications.daily_digest)),
        digest_time: value("digestTime", currentNotifications.digest_time || "08:00"),
        digest_group_by_category: checked("digestGroupByCategory", currentNotifications.digest_group_by_category !== false),
        quiet_hours_enabled: checked("quietHours", Boolean(currentNotifications.quiet_hours_enabled)),
        quiet_from: value("quietFrom", currentNotifications.quiet_from || "22:00"),
        quiet_to: value("quietTo", currentNotifications.quiet_to || "07:00"),
        include_snoozed: checked("includeSnoozed", Boolean(currentNotifications.include_snoozed)),
        include_dashboard_link: checked("includeDashboardLink", currentNotifications.include_dashboard_link !== false),
      },
      task_entities: {
        mode: value("entityMode", currentEntities.mode || "off"),
        device_grouping: value("entityGrouping", currentEntities.device_grouping || "dashboard"),
        cleanup_removed: checked("cleanupRemovedEntities", Boolean(currentEntities.cleanup_removed)),
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
    if (this._bulkAction === "workflow") value = value || "ready";
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

  async _saveTaskNote() {
    const task = (this._state?.tasks || []).find(item => item.id === this._taskDetailId);
    const text = String(this._taskNoteDraft || "").trim();
    if (!task || !text) return;
    const notes = Array.isArray(task.notes) ? task.notes.map(note => ({ ...note })) : [];
    notes.unshift({ id: `note_${Date.now().toString(36)}`, text, created_at: new Date().toISOString() });
    await this.hass.callWS({ type: "maintenance_dashboard/update_task", task_id: task.id, patch: { notes } });
    this._taskNoteDraft = "";
    await this._load();
    this._showToast(this._t("noteSaved"));
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
    const current = this._state?.settings || {};
    const currentDashboard = current.dashboard || {};
    const currentBackups = current.backups || {};
    const currentIntegrity = current.data_integrity || {};
    const currentWorkflow = current.workflow || {};
    const currentWorkflowRequirements = currentWorkflow.default_completion_requirements || {};
    const currentNative = current.native_platforms || {};
    const patch = {
      dashboard: {
        view_mode: this.shadowRoot.getElementById("dashboardViewMode")?.value || currentDashboard.view_mode || "cards",
        density: this.shadowRoot.getElementById("dashboardDensity")?.value || currentDashboard.density || "comfortable",
        default_due_filter: this.shadowRoot.getElementById("dashboardDefaultDue")?.value || currentDashboard.default_due_filter || "all",
        show_quick_filters: this.shadowRoot.getElementById("dashboardQuickFilters") ? Boolean(this.shadowRoot.getElementById("dashboardQuickFilters")?.checked) : Boolean(currentDashboard.show_quick_filters),
        remember_last_view: this.shadowRoot.getElementById("dashboardRememberView") ? Boolean(this.shadowRoot.getElementById("dashboardRememberView")?.checked) : currentDashboard.remember_last_view !== false,
      },
      backups: {
        maximum_count: Number(this.shadowRoot.getElementById("maximumBackups")?.value || currentBackups.maximum_count || 30),
        maximum_age_days: Number(this.shadowRoot.getElementById("maximumBackupAge")?.value || currentBackups.maximum_age_days || 90),
        before_task_update: this.shadowRoot.getElementById("beforeTaskUpdate") ? Boolean(this.shadowRoot.getElementById("beforeTaskUpdate")?.checked) : currentBackups.before_task_update !== false,
        before_task_delete: this.shadowRoot.getElementById("beforeTaskDelete") ? Boolean(this.shadowRoot.getElementById("beforeTaskDelete")?.checked) : currentBackups.before_task_delete !== false,
        before_import: this.shadowRoot.getElementById("beforeImport") ? Boolean(this.shadowRoot.getElementById("beforeImport")?.checked) : currentBackups.before_import !== false,
        before_migration: this.shadowRoot.getElementById("beforeMigration") ? Boolean(this.shadowRoot.getElementById("beforeMigration")?.checked) : currentBackups.before_migration !== false,
        before_restore: this.shadowRoot.getElementById("beforeRestore") ? Boolean(this.shadowRoot.getElementById("beforeRestore")?.checked) : currentBackups.before_restore !== false,
        before_bulk_operation: this.shadowRoot.getElementById("beforeBulk") ? Boolean(this.shadowRoot.getElementById("beforeBulk")?.checked) : currentBackups.before_bulk_operation !== false,
      },
      data_integrity: {
        check_on_start: this.shadowRoot.getElementById("checkIntegrityOnStart") ? Boolean(this.shadowRoot.getElementById("checkIntegrityOnStart")?.checked) : currentIntegrity.check_on_start !== false,
        quarantine_invalid_records: this.shadowRoot.getElementById("quarantineInvalidRecords") ? Boolean(this.shadowRoot.getElementById("quarantineInvalidRecords")?.checked) : currentIntegrity.quarantine_invalid_records !== false,
        audit_retention: Number(this.shadowRoot.getElementById("auditRetention")?.value || currentIntegrity.audit_retention || 1000),
        quarantine_retention: Number(this.shadowRoot.getElementById("quarantineRetention")?.value || currentIntegrity.quarantine_retention || 200),
      },
      workflow: {
        default_state: this.shadowRoot.getElementById("defaultWorkflowState")?.value || currentWorkflow.default_state || "planned",
        default_recurrence_mode: this.shadowRoot.getElementById("defaultRecurrenceMode")?.value || currentWorkflow.default_recurrence_mode || "standard",
        persistent_default_state: this.shadowRoot.getElementById("persistentDefaultState")?.value || currentWorkflow.persistent_default_state || "ready",
        show_checklists: this.shadowRoot.getElementById("workflowShowChecklists") ? Boolean(this.shadowRoot.getElementById("workflowShowChecklists")?.checked) : currentWorkflow.show_checklists !== false,
        reset_checklist_on_completion: this.shadowRoot.getElementById("workflowResetChecklist") ? Boolean(this.shadowRoot.getElementById("workflowResetChecklist")?.checked) : currentWorkflow.reset_checklist_on_completion !== false,
        default_completion_requirements: {
          note: this.shadowRoot.getElementById("workflowRequireNote") ? Boolean(this.shadowRoot.getElementById("workflowRequireNote")?.checked) : Boolean(currentWorkflowRequirements.note),
          material: this.shadowRoot.getElementById("workflowRequireMaterial") ? Boolean(this.shadowRoot.getElementById("workflowRequireMaterial")?.checked) : Boolean(currentWorkflowRequirements.material),
          cost: this.shadowRoot.getElementById("workflowRequireCost") ? Boolean(this.shadowRoot.getElementById("workflowRequireCost")?.checked) : Boolean(currentWorkflowRequirements.cost),
          performed_by: this.shadowRoot.getElementById("workflowRequirePerformedBy") ? Boolean(this.shadowRoot.getElementById("workflowRequirePerformedBy")?.checked) : Boolean(currentWorkflowRequirements.performed_by),
          checklist: this.shadowRoot.getElementById("workflowRequireChecklist") ? Boolean(this.shadowRoot.getElementById("workflowRequireChecklist")?.checked) : Boolean(currentWorkflowRequirements.checklist),
        },
      },
      native_platforms: {
        todo_enabled: this.shadowRoot.getElementById("todoPlatformEnabled") ? Boolean(this.shadowRoot.getElementById("todoPlatformEnabled")?.checked) : currentNative.todo_enabled !== false,
        todo_include_disabled: this.shadowRoot.getElementById("todoIncludeDisabled") ? Boolean(this.shadowRoot.getElementById("todoIncludeDisabled")?.checked) : Boolean(currentNative.todo_include_disabled),
        calendar_enabled: this.shadowRoot.getElementById("calendarPlatformEnabled") ? Boolean(this.shadowRoot.getElementById("calendarPlatformEnabled")?.checked) : currentNative.calendar_enabled !== false,
        calendar_include_snoozed: this.shadowRoot.getElementById("calendarIncludeSnoozed") ? Boolean(this.shadowRoot.getElementById("calendarIncludeSnoozed")?.checked) : Boolean(currentNative.calendar_include_snoozed),
        calendar_event_duration_minutes: Number(this.shadowRoot.getElementById("calendarEventDuration")?.value || currentNative.calendar_event_duration_minutes || 60),
      },
    };
    await this.hass.callWS({ type: "maintenance_dashboard/update_settings", patch });
    this._layoutMode = patch.dashboard.view_mode;
    this._density = patch.dashboard.density;
    await this._load();
    this._showToast(this._t("actionSaved"));
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
    if (key === "recurrence_mode") {
      this._draft.workflow_state = this._workflowStartState(el.value || "standard");
    }
    if (["category", "type", "schedule_mode", "calendar_repeat", "season", "priority", "notifications_inherit", "recurrence_mode"].includes(key)) this._render();
  },

  _workflowSettings() {
    return this._state?.settings?.workflow || {};
  },

  _defaultWorkflowState() {
    const state = this._workflowSettings().default_state || "planned";
    return ["planned", "ready", "in_progress", "blocked"].includes(state) ? state : "planned";
  },

  _defaultRecurrenceMode() {
    const value = this._workflowSettings().default_recurrence_mode || "standard";
    return ["standard", "persistent"].includes(value) ? value : "standard";
  },

  _persistentWorkflowState() {
    const value = this._workflowSettings().persistent_default_state || "ready";
    return ["planned", "ready", "in_progress", "blocked"].includes(value) ? value : "ready";
  },

  _workflowStartState(recurrenceMode = "standard") {
    return recurrenceMode === "persistent" ? this._persistentWorkflowState() : this._defaultWorkflowState();
  },

  _defaultCompletionRequirements() {
    const defaults = this._workflowSettings().default_completion_requirements || {};
    return {
      note: Boolean(defaults.note),
      material: Boolean(defaults.material),
      cost: Boolean(defaults.cost),
      performed_by: Boolean(defaults.performed_by),
      checklist: Boolean(defaults.checklist),
    };
  },

  _draftChecklist() {
    if (!Array.isArray(this._draft.checklist)) this._draft.checklist = [];
    return this._draft.checklist;
  },

  _addDraftChecklistItem() {
    this._draftChecklist().push({
      id: `check_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`,
      label: "",
      done: false,
      required: false,
    });
    this._render();
  },

  _updateDraftChecklistItem(index, key, value) {
    const item = this._draftChecklist()[index];
    if (!item) return;
    item[key] = key === "label" ? value : Boolean(value);
    this._render();
  },

  _removeDraftChecklistItem(index) {
    this._draftChecklist().splice(index, 1);
    this._render();
  },

  _completionRequirementsFromTask(task) {
    const defaults = this._defaultCompletionRequirements();
    const requirements = task?.completion_requirements || {};
    return {
      note: Boolean(requirements.note ?? defaults.note),
      material: Boolean(requirements.material ?? defaults.material),
      cost: Boolean(requirements.cost ?? defaults.cost),
      performed_by: Boolean(requirements.performed_by ?? defaults.performed_by),
      checklist: Boolean(requirements.checklist ?? defaults.checklist),
    };
  },

  _workflowStateLabel(state) {
    return this._t(`workflow_${state || "planned"}`);
  },

  _workflowTransitionLabel(state) {
    return this._t(`workflowSet_${state || "planned"}`);
  },

  _checklistProgress(taskOrChecklist) {
    const checklist = Array.isArray(taskOrChecklist) ? taskOrChecklist : taskOrChecklist?.checklist;
    const items = Array.isArray(checklist) ? checklist : [];
    const total = items.length;
    const done = items.filter(item => item?.done).length;
    return { total, done, pending: Math.max(total - done, 0) };
  },

  _completionMissing(task) {
    const requirements = this._completionRequirementsFromTask(task);
    const missing = [];
    if (requirements.note && !String(this._completionNote || "").trim()) missing.push("completionRequirementNote");
    if (requirements.material && !String(this._completionMaterial || "").trim()) missing.push("completionRequirementMaterial");
    if (requirements.cost && this._completionCost === "") missing.push("completionRequirementCost");
    if (requirements.performed_by && !String(this._completionPerformedBy || "").trim()) missing.push("completionRequirementPerformedBy");
    if (requirements.checklist) {
      const requiredOnly = this._completionChecklist.filter(item => item.required);
      const targets = requiredOnly.length ? requiredOnly : this._completionChecklist;
      if (targets.some(item => !item.done)) missing.push("completionRequirementChecklist");
    }
    return missing;
  },

  _updateCompletionChecklist(index, checked) {
    const item = this._completionChecklist[index];
    if (!item) return;
    item.done = Boolean(checked);
    this._render();
  },

  _openCreate(template) {
    const defaults = this._defaultCompletionRequirements();
    this._dialogStep = 0;
    this._templateDraftId = template?.id || "";
    this._templatePickerQuery = template?.name || "";
    this._draft = {
      ...EMPTY,
      recurrence_mode: this._defaultRecurrenceMode(),
      workflow_state: this._workflowStartState(this._defaultRecurrenceMode()),
      completion_requirements_note: defaults.note,
      completion_requirements_material: defaults.material,
      completion_requirements_cost: defaults.cost,
      completion_requirements_performed_by: defaults.performed_by,
      completion_requirements_checklist: defaults.checklist,
      last_done: this._dateInput(new Date()),
    };
    if (template) this._applyTemplate(template);
    this._dialog = "create";
    this._render();
  },

  _openEdit(id) {
    const t = this._state.tasks.find(x => x.id === id);
    if (!t) return;
    const n = t.notifications || {};
    this._dialogStep = 0;
    this._templateDraftId = "";
    this._templatePickerQuery = "";
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
      workflow_state: t.workflow_state || this._workflowStartState(t.recurrence_mode || "standard"),
      recurrence_mode: t.recurrence_mode || "standard",
      checklist: Array.isArray(t.checklist) ? t.checklist.map(item => ({ ...item })) : [],
      completion_requirements_note: Boolean(t.completion_requirements?.note),
      completion_requirements_material: Boolean(t.completion_requirements?.material),
      completion_requirements_cost: Boolean(t.completion_requirements?.cost),
      completion_requirements_performed_by: Boolean(t.completion_requirements?.performed_by),
      completion_requirements_checklist: Boolean(t.completion_requirements?.checklist),
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
      recurrence_mode: t.recurrence_mode || this._draft.recurrence_mode || this._defaultRecurrenceMode(),
      workflow_state: t.workflow_state || this._draft.workflow_state || this._workflowStartState(t.recurrence_mode || this._draft.recurrence_mode || "standard"),
      checklist: Array.isArray(t.checklist) ? t.checklist.map(item => ({ ...item })) : this._draftChecklist(),
      completion_requirements_note: Boolean(t.completion_requirements?.note ?? this._draft.completion_requirements_note),
      completion_requirements_material: Boolean(t.completion_requirements?.material ?? this._draft.completion_requirements_material),
      completion_requirements_cost: Boolean(t.completion_requirements?.cost ?? this._draft.completion_requirements_cost),
      completion_requirements_performed_by: Boolean(t.completion_requirements?.performed_by ?? this._draft.completion_requirements_performed_by),
      completion_requirements_checklist: Boolean(t.completion_requirements?.checklist ?? this._draft.completion_requirements_checklist),
      template_id: t.id,
    });
    this._templateDraftId = t.id;
    this._templatePickerQuery = t.name || "";
    if (!this._draft.workflow_state) this._draft.workflow_state = this._workflowStartState(this._draft.recurrence_mode || "standard");
  },

  _templateAutocompleteOptions() {
    const query = String(this._templatePickerQuery || "").trim().toLowerCase();
    const templates = this._state?.templates || [];
    const scored = templates
      .filter(template => {
        if (!query) return template.recommended || template.common || Number(template.priority || 0) >= 4;
        const haystack = [
          template.name,
          this._categoryLabel(template),
          template.description,
          ...(Array.isArray(template.tags) ? template.tags : []),
        ].join(" ").toLowerCase();
        return haystack.includes(query);
      })
      .map(template => ({
        template,
        score:
          (template.id === this._templateDraftId ? 100 : 0) +
          (template.recommended ? 20 : 0) +
          (template.common ? 12 : 0) +
          (Number(template.priority || 0) >= 4 ? 8 : 0),
      }))
      .sort((a, b) => b.score - a.score || String(a.template.name || "").localeCompare(String(b.template.name || "")));
    return scored.slice(0, 8).map(item => item.template);
  },

  _selectedTemplateDraft() {
    return this._template(this._templateDraftId || this._draft.template_id);
  },

  _setTemplateDraft(value) {
    const raw = String(value || "").trim();
    this._templatePickerQuery = raw;
    const templates = this._state?.templates || [];
    const found = templates.find(template => template.id === raw || template.name === raw || String(template.name || "").toLowerCase() === raw.toLowerCase());
    this._templateDraftId = found?.id || "";
  },

  _applySelectedTemplateDraft() {
    const template = this._selectedTemplateDraft();
    if (!template) return;
    this._applyTemplate(template);
    this._render();
  },

  _applyWorkflowPreset(preset) {
    if (preset === "persistent") {
      this._draft.recurrence_mode = "persistent";
      this._draft.workflow_state = "ready";
      this._draft.completion_requirements_note = false;
      this._draft.completion_requirements_checklist = false;
    } else if (preset === "repair") {
      this._draft.recurrence_mode = "standard";
      this._draft.workflow_state = "in_progress";
      this._draft.priority = "5";
      this._draft.completion_requirements_note = true;
      this._draft.completion_requirements_material = true;
    } else {
      this._draft.recurrence_mode = "standard";
      this._draft.workflow_state = "planned";
    }
    this._render();
  },

  _wizardSteps() {
    return [
      ["mdi:clipboard-edit-outline", "wizardStepStart"],
      ["mdi:calendar-clock-outline", "schedule"],
      ["mdi:timeline-check-outline", "workflow"],
      ["mdi:bell-outline", "notifications"],
    ];
  },

  _dialogStepMissing(step = this._dialogStep) {
    const missing = [];
    if (step === 0) {
      if (!String(this._draft.name || "").trim()) missing.push("name");
      if (this._draft.category === "custom" && !String(this._draft.custom_category || "").trim()) missing.push("ownCategory");
    }
    if (step === 1 && this._draft.schedule_mode === "one_time" && !this._draft.due_date) missing.push("dueDate");
    return missing;
  },

  _dialogMissingTotal() {
    return this._wizardSteps().reduce((total, _step, index) => total + this._dialogStepMissing(index).length, 0);
  },

  _isRequiredDraftField(key) {
    if (key === "name") return true;
    if (key === "custom_category") return this._draft.category === "custom";
    if (key === "due_date") return this._draft.schedule_mode === "one_time";
    return false;
  },

  _goDialogStep(direction) {
    const steps = this._wizardSteps();
    this._dialogStep = Math.min(steps.length - 1, Math.max(0, Number(this._dialogStep || 0) + direction));
    this._render();
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
      workflow_state: this._draft.workflow_state || this._workflowStartState(this._draft.recurrence_mode || "standard"),
      recurrence_mode: this._draft.recurrence_mode || this._defaultRecurrenceMode(),
      checklist: this._draftChecklist().map(item => ({ id: item.id, label: String(item.label || "").trim(), done: Boolean(item.done), required: Boolean(item.required) })).filter(item => item.label),
      completion_requirements: {
        note: Boolean(this._draft.completion_requirements_note),
        material: Boolean(this._draft.completion_requirements_material),
        cost: Boolean(this._draft.completion_requirements_cost),
        performed_by: Boolean(this._draft.completion_requirements_performed_by),
        checklist: Boolean(this._draft.completion_requirements_checklist),
      },
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
    const task = (this._state?.tasks || []).find(x => x.id === id);
    this._completionChecklist = Array.isArray(task?.checklist) ? task.checklist.map(item => ({ ...item })) : [];
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
    return this._t(`priority${normalized}`) || String(normalized);
  },

  _scheduleModeLabel(value) {
    return { interval: this._t("intervalSchedule"), one_time: this._t("oneTime"), fixed_date: this._t("fixedDate"), seasonal: this._t("seasonal") }[value] || value;
  },

  _categoryIcon(value) {
    return ({
      all: "mdi:view-grid-outline",
      favorites: "mdi:star-outline",
      recommended: "mdi:thumb-up-outline",
      seasonal: "mdi:leaf-circle-outline",
      general: "mdi:home-outline",
      heating: "mdi:radiator",
      ventilation: "mdi:fan",
      water: "mdi:water-outline",
      electrical: "mdi:flash-outline",
      safety: "mdi:shield-check-outline",
      solar: "mdi:solar-power-variant-outline",
      garden: "mdi:flower-outline",
      building: "mdi:home-city-outline",
      it_network: "mdi:router-network",
      household: "mdi:washing-machine",
      garage: "mdi:garage-variant",
      custom: "mdi:shape-outline",
    })[value] || "mdi:shape-outline";
  },

  _bulkActionLabel(value) {
    return ({
      done: this._t("bulkDone"),
      snooze: this._t("bulkSnooze"),
      clear_snooze: this._t("bulkClearSnooze"),
      category: this._t("bulkCategory"),
      area: this._t("bulkArea"),
      priority: this._t("bulkPriority"),
      workflow: this._t("bulkWorkflow"),
      reset_progress: this._t("bulkResetProgress"),
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
    const tokens = q.split(/\s+/).filter(Boolean);
    const free = [];
    for (const token of tokens) {
      const [key, ...rest] = token.split(":");
      const value = rest.join(":");
      if (!value) { free.push(token); continue; }
      if (key === "tag" && !(task.tags || []).some(tag => String(tag).toLowerCase().includes(value))) return false;
      else if ((key === "prio" || key === "priority") && Number(task.priority) !== Number(value)) return false;
      else if (key === "due" && !this._taskDueWithin(task, Number(value))) return false;
      else if (key === "status" && this._state?.runtime?.[task.id]?.status !== value) return false;
      else if (key === "workflow" && String(task.workflow_state || "") !== value) return false;
      else if (key === "quality" && value === "issue" && !this._taskQualityIssues(task).length) return false;
      else if (!["tag","prio","priority","due","status","workflow","quality"].includes(key)) free.push(token);
    }
    if (!free.length) return true;
    const freeQuery = free.join(" ");
    return [task.name, task.description, task.area_name, task.category, task.custom_category, ...(task.tags || [])]
      .filter(Boolean).join(" ").toLowerCase().includes(freeQuery);
  },

  _taskDueWithin(task, days) {
    const dueAt = this._state?.runtime?.[task.id]?.due_at;
    const due = dueAt ? new Date(dueAt).getTime() : Number.NaN;
    if (!Number.isFinite(due) || !Number.isFinite(days)) return false;
    const now = Date.now();
    return due >= now && due <= now + days * 86400000;
  },

  _taskQualityIssues(task) {
    const issues = [];
    if (!String(task.description || "").trim()) issues.push("description");
    if (!task.category || task.category === "custom" && !task.custom_category) issues.push("category");
    if (Number(this._intervalAsDays(task)) > 730) issues.push("interval");
    if (!Array.isArray(task.tags) || !task.tags.length) issues.push("tags");
    return issues;
  },

  _qualityIssues() {
    return (this._state?.tasks || []).filter(task => !task.deleted && this._taskQualityIssues(task).length);
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

  _remaining(runtime, task) { if (!runtime || runtime.remaining == null) return "—"; const unit = task.schedule_mode && task.schedule_mode !== "interval" ? "days" : task.interval_unit; return runtime.remaining < 0 ? `${Math.ceil(Math.abs(runtime.remaining))} ${this._unitLabel(unit)} ${this._t("overdue")}` : `${Math.ceil(Math.abs(runtime.remaining))} ${this._unitLabel(unit)}`; },

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
    .shell{min-height:100vh;box-sizing:border-box;padding:14px 32px 84px;max-width:1880px;margin:0 auto;}
    .hero{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:8px 4px 10px;border-bottom:1px solid color-mix(in srgb,var(--divider-color) 70%,transparent);margin-bottom:8px;}
    .hero-brand{display:flex;align-items:center;gap:16px;min-width:0}.compact-brand strong{font-size:.95rem;font-weight:900;letter-spacing:.01em}.hero-logo{width:58px;height:58px;border-radius:18px;object-fit:contain;filter:drop-shadow(0 8px 20px rgb(0 0 0 / 28%));flex:0 0 auto}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}.icon-nav{min-width:42px;padding:0 12px}.icon-nav .sr-only{display:none}
    .eyebrow{margin:0 0 6px;color:var(--primary-color);font-weight:850;letter-spacing:.08em;text-transform:uppercase;font-size:.72rem;} h1{margin:0;font-size:clamp(1.5rem,3vw,2.6rem);letter-spacing:-.045em;} h2,h3,h4{margin:0;} p{margin:0;color:var(--secondary-text-color);} button,input,select,textarea{font:inherit;} button{cursor:pointer;transition:transform .1s ease,background .15s ease,border-color .15s ease;} button:active{transform:scale(.97);} button[disabled]{opacity:.45;pointer-events:none;}
    .hero-actions,.empty-actions,footer,.actions,.button-row{display:flex;gap:10px;flex-wrap:wrap;align-items:center;}.nav,.ghost,.primary,.icon{display:inline-flex;align-items:center;justify-content:center;gap:8px;border-radius:999px;border:1px solid var(--divider-color);min-height:40px;padding:0 16px;background:color-mix(in srgb,var(--card-background-color) 92%,transparent);color:var(--primary-text-color);} .nav.active,.ghost:hover{background:color-mix(in srgb,var(--primary-color) 18%,transparent);border-color:color-mix(in srgb,var(--primary-color) 55%,var(--divider-color));}.primary{border:0;background:var(--primary-color);color:var(--text-primary-color);font-weight:850;}.big{min-height:48px;padding:0 22px;}.icon,.icon-only{width:40px;min-width:40px;padding:0;color:var(--secondary-text-color);}.danger{color:var(--error-color);}
    .dashboard-status-line{display:flex;align-items:center;gap:9px;flex-wrap:wrap;margin:6px 0 12px;color:var(--secondary-text-color);font-size:.88rem}.dashboard-status-line i{width:3px;height:3px;border-radius:50%;background:color-mix(in srgb,var(--secondary-text-color) 60%,transparent)}.dashboard-status-line b,.dashboard-status-line strong{color:var(--primary-text-color)}.dashboard-status-line .status-health{display:inline-flex;align-items:center;min-height:30px;padding:0 10px;border-radius:999px;box-shadow:0 0 0 1px color-mix(in srgb,var(--success-color,#4caf50) 35%,transparent),0 0 24px color-mix(in srgb,var(--success-color,#4caf50) 20%,transparent);color:var(--primary-text-color)}.dashboard-status-line .status-health.warning{box-shadow:0 0 0 1px color-mix(in srgb,var(--warning-color) 45%,transparent),0 0 24px color-mix(in srgb,var(--warning-color) 22%,transparent)}.dashboard-status-line .critical{color:var(--error-color)}.dashboard-status-line .warning{color:var(--warning-color)}.panel,.toolbar,.task-card,.empty,.template-card,.settings-row,.template-group{border:1px solid var(--divider-color);border-radius:24px;background:var(--card-background-color);box-shadow:var(--ha-card-box-shadow);}.toolbar{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:12px;padding:10px 12px;margin-bottom:12px;align-items:end;}.toolbar-copy{display:none}.toolbar-main{display:grid;grid-template-columns:minmax(240px,1fr) minmax(120px,150px) minmax(130px,160px) 42px auto;gap:10px;align-items:end;}.toolbar label{display:grid;gap:3px;color:var(--secondary-text-color);font-size:.68rem;font-weight:850;}.templates-main{grid-template-columns:minmax(260px,1fr) repeat(2,minmax(180px,max-content)) minmax(220px,max-content);}.expressive{background:radial-gradient(circle at 15% 0%,color-mix(in srgb,var(--primary-color) 16%,transparent),transparent 35%),var(--card-background-color);}.search,select,input,textarea{background:var(--input-fill-color,color-mix(in srgb,var(--primary-text-color) 7%,transparent));color:var(--primary-text-color);border:1px solid var(--divider-color);border-radius:14px;min-height:42px;padding:0 12px;outline:none;}.search{min-width:0;width:100%;}textarea{min-height:90px;padding:12px;resize:vertical;}
    .task-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,420px),1fr));gap:18px;align-items:stretch;}.task-card{--task-accent:var(--primary-color);position:relative;padding:18px;display:grid;grid-template-rows:auto auto auto auto 1fr auto;gap:14px;min-width:0;border-color:color-mix(in srgb,var(--task-accent) 34%,var(--divider-color));background:linear-gradient(135deg,color-mix(in srgb,var(--task-accent) 8%,transparent),transparent 42%),var(--card-background-color);overflow:visible;}.task-card header{display:flex;justify-content:space-between;gap:12px;align-items:flex-start;}.title-row{display:flex;gap:12px;align-items:flex-start;min-width:0;}.title-row h3{overflow-wrap:anywhere;line-height:1.25;}.icon-chip{display:grid;place-items:center;width:42px;height:42px;border-radius:16px;background:color-mix(in srgb,var(--task-accent) 15%,transparent);color:var(--task-accent);flex:0 0 auto;}.status{border-radius:999px;padding:5px 9px;font-weight:850;font-size:.72rem;background:color-mix(in srgb,var(--primary-text-color) 8%,transparent);white-space:nowrap;}.status.warning{color:var(--warning-color);background:color-mix(in srgb,var(--warning-color) 15%,transparent);}.status.critical,.status.overdue{color:var(--error-color);background:color-mix(in srgb,var(--error-color) 15%,transparent);}.status.snoozed{color:var(--primary-color);background:color-mix(in srgb,var(--primary-color) 15%,transparent);}.description{line-height:1.45;min-height:2.7em;}.progress-line{display:flex;justify-content:space-between;color:var(--secondary-text-color);}.progress{height:12px;background:color-mix(in srgb,var(--disabled-text-color) 16%,transparent);border-radius:999px;overflow:hidden;}.progress div{height:100%;background:var(--task-accent);border-radius:999px;}.task-card.overdue,.task-card.critical{border-color:color-mix(in srgb,var(--error-color) 62%,var(--divider-color));}.task-card.warning{border-color:color-mix(in srgb,var(--warning-color) 62%,var(--divider-color));}.task-card.unavailable{border-color:color-mix(in srgb,var(--disabled-text-color) 55%,var(--divider-color));}.meta-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;}.meta-grid div{background:color-mix(in srgb,var(--primary-text-color) 7%,transparent);border-radius:16px;padding:10px;min-width:0;}.meta-grid span{display:block;color:color-mix(in srgb,var(--primary-text-color) 78%,var(--secondary-text-color));font-size:.68rem;font-weight:900;text-transform:uppercase;}.meta-grid strong{display:block;margin-top:4px;color:var(--primary-text-color);overflow:hidden;text-overflow:ellipsis;}.meta-grid em{font-style:normal;color:var(--secondary-text-color);font-size:.8rem;margin-left:6px;}.snooze-note{display:flex;align-items:center;gap:7px;padding:9px 11px;border-radius:14px;background:color-mix(in srgb,var(--primary-color) 12%,transparent);color:var(--primary-color);font-weight:850;}.snooze-wrap{position:relative;}.snooze-menu{position:absolute;right:0;bottom:48px;z-index:20;display:grid;gap:6px;min-width:170px;padding:10px;border:1px solid var(--divider-color);border-radius:18px;background:var(--card-background-color);box-shadow:0 16px 40px rgb(0 0 0 / 35%);}.snooze-menu strong{font-size:.8rem;color:var(--secondary-text-color);}.snooze-menu button{border:0;border-radius:12px;min-height:34px;background:color-mix(in srgb,var(--primary-text-color) 6%,transparent);color:var(--primary-text-color);}@keyframes task-focus-pulse{0%{transform:scale(1);box-shadow:0 0 0 0 color-mix(in srgb,var(--task-accent) 50%,transparent)}20%{transform:scale(1.015);box-shadow:0 0 0 7px color-mix(in srgb,var(--task-accent) 26%,transparent)}45%{transform:scale(.997);box-shadow:0 0 0 13px color-mix(in srgb,var(--task-accent) 12%,transparent)}70%{transform:scale(1.008);box-shadow:0 0 0 5px color-mix(in srgb,var(--task-accent) 22%,transparent)}100%{transform:scale(1);box-shadow:var(--ha-card-box-shadow)}}.task-card.focus-pulse{animation:task-focus-pulse 1.45s ease both;z-index:5;}
    .empty{min-height:330px;display:grid;place-items:center;text-align:center;padding:34px;gap:14px;}.empty-orb{display:grid;place-items:center;width:90px;height:90px;border-radius:32px;color:var(--primary-color);background:radial-gradient(circle,color-mix(in srgb,var(--primary-color) 28%,transparent),color-mix(in srgb,var(--primary-color) 8%,transparent));}.empty-orb ha-icon{--mdc-icon-size:46px;}.template-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr));gap:16px;}.template-group{padding:18px;margin-bottom:18px;display:grid;gap:16px}.template-group-header{display:flex;align-items:end;justify-content:space-between;gap:12px;padding-bottom:6px;border-bottom:1px solid color-mix(in srgb,var(--primary-text-color) 10%,transparent)}.template-group-header span{display:inline-grid;place-items:center;min-width:36px;height:36px;padding:0 10px;border-radius:999px;background:color-mix(in srgb,var(--primary-color) 12%,transparent);color:var(--primary-color);font-weight:850}.template-card{padding:16px;display:grid;gap:12px;}.template-card.selected{border-color:color-mix(in srgb,var(--primary-color) 60%,var(--divider-color));background:linear-gradient(135deg,color-mix(in srgb,var(--primary-color) 10%,transparent),transparent 50%),var(--card-background-color);}.template-card header{display:flex;align-items:center;gap:10px;}.template-card h3{line-height:1.25;}.template-check input{display:none;}.template-check span{display:grid;width:22px;height:22px;border-radius:7px;border:1px solid var(--divider-color);background:color-mix(in srgb,var(--primary-text-color) 4%,transparent);}.template-check input:checked + span{background:var(--primary-color);border-color:var(--primary-color);}.template-check input:checked + span:after{content:'✓';color:var(--text-primary-color);font-weight:900;text-align:center;line-height:21px;}.panel{padding:18px;margin-bottom:16px;}.history-dialog .panel{margin-bottom:0;border:0;background:transparent;box-shadow:none;padding:0;}.history-list,.settings-list{display:grid;gap:10px;}.history-row,.settings-row{display:flex;align-items:center;gap:12px;padding:13px;}.history-row div,.settings-row div{flex:1;}.history-row small,.settings-row small{display:block;color:var(--secondary-text-color);margin-top:3px;}.settings-head{display:flex;align-items:center;justify-content:space-between;gap:14px;}.drag{color:var(--secondary-text-color);cursor:grab;}
    .dialog-backdrop{position:fixed;inset:0;z-index:2147483000;display:grid;place-items:center;padding:24px;background:rgb(3 5 14 / 94%);}.dialog{width:min(1060px,100%);max-height:90vh;overflow:auto;border-radius:28px;background:var(--card-background-color);border:1px solid var(--divider-color);box-shadow:0 28px 90px rgb(0 0 0 / 48%);}.dialog.small{width:min(760px,100%);}.dialog>header,.dialog>footer{padding:18px 22px;border-bottom:1px solid var(--divider-color);display:flex;justify-content:space-between;align-items:center;}.dialog>footer{border-top:1px solid var(--divider-color);border-bottom:0;justify-content:flex-end;}.dialog-body{display:grid;gap:16px;padding:18px;}.dialog-section{display:grid;gap:14px;padding:16px;border:1px solid var(--divider-color);border-radius:20px;background:color-mix(in srgb,var(--primary-text-color) 2%,transparent);}.dialog-section .section-hint{margin:0;color:var(--secondary-text-color);font-size:.82rem;line-height:1.35}.form-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:14px;}.appearance-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;align-items:start}.appearance-icon-field{grid-column:1 / -1}.field,.entity-field,.description-field{display:grid;gap:7px;color:var(--secondary-text-color);font-size:.78rem;font-weight:850;}.field input[type=color]{width:56px;height:44px;padding:4px;border-radius:13px}.color-input-row{display:flex;align-items:center;gap:8px}.color-field input[type=color]{flex:0 0 auto}.color-actions{display:flex;flex-wrap:wrap;gap:10px}.ghost.small{min-height:34px;padding:0 10px}.icon-picker-field{min-width:0}.icon-picker-field ha-icon-picker{width:100%;max-width:100%;display:block}.check{display:flex;gap:10px;align-items:center;font-weight:850;}.template-strip,.icon-grid{display:flex;flex-wrap:wrap;gap:8px;}.template-pill,.icon-choice{border:1px solid var(--divider-color);border-radius:999px;min-height:36px;padding:0 12px;background:transparent;color:var(--primary-text-color);display:inline-flex;gap:7px;align-items:center;}.icon-choice{width:42px;padding:0;justify-content:center;}.inline-priority{display:grid;gap:12px;margin-top:4px;padding:14px;border-radius:18px;background:color-mix(in srgb,var(--primary-text-color) 3%,transparent);}.priority-head{display:flex;align-items:start;justify-content:space-between;gap:12px}.priority-head strong{font-size:1rem}.priority-slider{width:100%;accent-color:var(--primary-color);min-height:28px;padding:0;border:0;background:transparent}.priority-scale{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px}.priority-scale span{font-size:.74rem;color:var(--secondary-text-color);text-align:center;padding-top:4px}.priority-scale span.active{color:var(--primary-text-color);font-weight:850}.error{color:var(--error-color);font-weight:850;padding:12px;border-radius:14px;background:color-mix(in srgb,var(--error-color) 12%,transparent);}.backup-row{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px;border:1px solid var(--divider-color);border-radius:14px;}.toast{position:fixed;right:22px;bottom:22px;z-index:2147483001;display:flex;align-items:center;gap:10px;max-width:min(420px,calc(100vw - 32px));padding:13px 16px;border-radius:18px;background:color-mix(in srgb,var(--card-background-color) 96%,black);border:1px solid color-mix(in srgb,var(--primary-color) 38%,var(--divider-color));box-shadow:0 18px 55px rgb(0 0 0 / 42%);font-weight:850}.toast ha-icon{color:var(--primary-color)}@media(max-width:820px){.appearance-grid{grid-template-columns:1fr}.dialog{border-radius:20px}.dialog-backdrop{padding:10px}}
    @media (max-width:980px){.toolbar,.templates-toolbar{grid-template-columns:1fr}.toolbar-main,.templates-main{grid-template-columns:1fr 1fr}.toolbar-main>.primary.big,.templates-main>.primary.big{grid-column:1/-1}.templates-main .search{grid-column:1/-1}}
    @media (max-width:760px){.shell{padding:12px}.hero,.settings-head{flex-direction:column;align-items:stretch}.hero-brand{align-items:flex-start}.hero-logo{width:46px;height:46px}.hero-actions,.empty-actions,footer,.actions{flex-direction:column;align-items:stretch}.task-grid,.template-grid{grid-template-columns:1fr}.dialog-backdrop{padding:8px}.snooze-menu{left:0;right:auto}}
    .category-tabs{display:flex;gap:8px;overflow-x:auto;padding:4px 0 16px;scrollbar-width:thin}.tab{border:1px solid var(--divider-color);border-radius:999px;background:transparent;color:var(--primary-text-color);padding:10px 14px;white-space:nowrap;font-weight:800}.tab.active{background:color-mix(in srgb,var(--primary-color) 24%,transparent);border-color:color-mix(in srgb,var(--primary-color) 70%,var(--divider-color));}.template-grid.compact{grid-template-columns:repeat(auto-fill,minmax(min(100%,260px),1fr));}.template-card.compact p{display:none}.template-card.compact footer{display:flex;gap:8px;align-items:center}.settings-actions{display:flex;gap:10px;flex-wrap:wrap}.toggle-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px}.toggle-grid .check{padding:10px;border:1px solid var(--divider-color);border-radius:14px;background:color-mix(in srgb,var(--primary-text-color) 3%,transparent)}.diagnostic-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px}.diagnostic-grid div{padding:10px;border-radius:14px;background:color-mix(in srgb,var(--primary-text-color) 4%,transparent)}.diagnostic-grid span{display:block;color:var(--secondary-text-color);font-size:.72rem;text-transform:uppercase;font-weight:850}.template-preview>ha-icon{--mdc-icon-size:44px;color:var(--primary-color)}
    @media (max-width: 620px){.shell{padding:10px}.hero{gap:12px;border-bottom:0;margin-bottom:8px;padding-bottom:8px}.hero-brand{display:grid;grid-template-columns:42px 1fr;gap:10px}.hero-brand h1{font-size:1.35rem}.hero-brand p:not(.eyebrow){font-size:.8rem;line-height:1.25}.hero-actions{display:grid;grid-template-columns:1fr 1fr 44px 44px;gap:8px}.hero-actions .nav{min-height:42px;padding:0 10px}.hero-actions .icon-nav{width:auto}.toolbar{padding:12px}.toolbar-main,.templates-main{grid-template-columns:1fr;gap:10px}.toolbar .primary.big,.templates-main .primary.big,.templates-main .search{grid-column:auto}.search{width:100%;min-width:0}.task-card{padding:14px;border-radius:22px}.task-card header{align-items:flex-start}.description{min-height:auto;font-size:.9rem}.meta-grid{grid-template-columns:1fr 1fr;gap:8px}.meta-grid div{padding:9px}.actions{display:grid!important;grid-template-columns:44px 44px 1fr;gap:8px}.actions .ghost:not(.icon-only){grid-column:1/-1}.actions .primary{min-width:0}.template-grid.compact{grid-template-columns:1fr}.template-card.compact{padding:14px}.template-card.compact footer{display:grid;grid-template-columns:1fr 1fr}.dialog-backdrop{align-items:end;place-items:end stretch;padding:0}.dialog{max-height:94vh;width:100%;border-radius:24px 24px 0 0}.dialog.small{width:100%}.dialog>header,.dialog>footer{padding:14px 16px}.dialog-body{padding:14px}.form-grid,.appearance-grid{grid-template-columns:1fr}.toast{left:10px;right:10px;bottom:10px}.category-tabs{margin:0 -4px;padding:2px 4px 12px}.settings-row{display:grid;grid-template-columns:28px 28px 1fr 36px 36px;gap:8px}.settings-row .danger{grid-column:5}.settings-actions{display:grid;grid-template-columns:1fr}.history-row{align-items:flex-start}.priority-head{display:grid;gap:6px}.priority-scale{grid-template-columns:1fr}.priority-scale span{text-align:left}.template-group{padding:14px}}

    .schedule-callout{display:flex;gap:12px;align-items:flex-start;padding:14px;border-radius:18px;background:color-mix(in srgb,var(--primary-color) 10%,transparent);border:1px solid color-mix(in srgb,var(--primary-color) 24%,var(--divider-color));}.schedule-callout ha-icon{color:var(--primary-color);flex:0 0 auto}.task-card.completed{opacity:.88;border-style:dashed}.task-card.completed .progress div{background:var(--success-color,#4caf50)}.dashboard-main{grid-template-columns:minmax(220px,auto) minmax(260px,1fr) minmax(130px,160px) minmax(130px,160px) auto}.completed-toggle{align-self:end;min-height:42px}
    .template-filter-bar{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:18px}.template-secondary-filters{display:flex;align-items:end;gap:10px;flex-wrap:wrap}.template-secondary-filters label:not(.check){display:grid;gap:5px;color:var(--secondary-text-color);font-size:.75rem;font-weight:850}.compact-check{min-height:42px;padding:0 12px;border:1px solid var(--divider-color);border-radius:14px;background:var(--card-background-color)}.starter-packs{display:grid;gap:14px;margin-bottom:18px}.section-title{display:flex;justify-content:space-between;align-items:end}.pack-strip{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:12px}.pack-mini,.pack-card{display:grid;grid-template-columns:44px 1fr auto;gap:12px;align-items:center;padding:14px;border:1px solid var(--divider-color);border-radius:20px;background:var(--card-background-color);color:var(--primary-text-color);text-align:left}.pack-mini>ha-icon,.pack-card>ha-icon{display:grid;place-items:center;padding:10px;border-radius:14px;background:color-mix(in srgb,var(--primary-color) 14%,transparent);color:var(--primary-color)}.pack-mini p,.pack-card p{font-size:.82rem;line-height:1.35;margin-top:4px}.pack-mini small,.pack-card small{display:block;color:var(--secondary-text-color);margin-top:6px}.pack-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:12px}.pack-card{width:100%;cursor:pointer}.pack-card.selected{border-color:var(--primary-color);background:linear-gradient(135deg,color-mix(in srgb,var(--primary-color) 14%,transparent),transparent),var(--card-background-color)}.pack-check{color:var(--primary-color)}.onboarding-dialog{width:min(980px,100%)}.onboarding-hero{display:grid;grid-template-columns:auto 1fr;gap:18px;align-items:center;padding:18px;border-radius:22px;background:radial-gradient(circle at 0 0,color-mix(in srgb,var(--primary-color) 18%,transparent),transparent 50%),color-mix(in srgb,var(--primary-text-color) 2%,transparent)}
    .template-title{min-width:0;display:grid;gap:6px}.template-badges{display:flex;gap:6px;flex-wrap:wrap}.template-badge{padding:3px 7px;border-radius:999px;background:color-mix(in srgb,var(--primary-color) 13%,transparent);color:var(--primary-color);font-size:.66rem;font-weight:900;text-transform:uppercase}.template-badge.popular{background:color-mix(in srgb,var(--warning-color) 16%,transparent);color:var(--warning-color)}.template-badge.season{background:color-mix(in srgb,var(--success-color,#4caf50) 14%,transparent);color:var(--success-color,#4caf50)}.tag-list{display:flex;gap:6px;flex-wrap:wrap}.tag-list>span{padding:4px 8px;border-radius:999px;background:color-mix(in srgb,var(--primary-text-color) 5%,transparent);color:var(--secondary-text-color);font-size:.7rem}.template-preview-heading,.completion-heading{display:flex;gap:14px;align-items:flex-start}.template-preview-heading>ha-icon,.completion-heading>ha-icon{--mdc-icon-size:38px;color:var(--primary-color);padding:10px;border-radius:16px;background:color-mix(in srgb,var(--primary-color) 12%,transparent)}.preview-tags{display:grid;gap:8px}
    .history-panel{display:grid;gap:14px}.history-toolbar{display:grid;grid-template-columns:minmax(220px,1fr) repeat(2,minmax(150px,220px));gap:10px;align-items:end}.history-toolbar label{display:grid;gap:5px;color:var(--secondary-text-color);font-size:.75rem;font-weight:850}.completion-details{display:flex;gap:8px;flex-wrap:wrap;margin-top:8px}.completion-details span{display:inline-flex;align-items:center;gap:5px;padding:5px 8px;border-radius:10px;background:color-mix(in srgb,var(--primary-text-color) 5%,transparent);font-size:.75rem;color:var(--secondary-text-color)}.completion-details ha-icon{--mdc-icon-size:16px}.history-dialog{width:min(1100px,100%)}
    @media(max-width:980px){.dashboard-main{grid-template-columns:1fr 1fr}.completed-toggle{grid-column:1/-1}.template-filter-bar{align-items:stretch;flex-direction:column}.template-secondary-filters{display:grid;grid-template-columns:1fr 1fr}.history-toolbar{grid-template-columns:1fr 1fr}.history-toolbar .search{grid-column:1/-1}}
    @media(max-width:620px){.pack-strip,.pack-grid{grid-template-columns:1fr}.pack-mini,.pack-card{grid-template-columns:38px 1fr}.pack-mini button,.pack-check{grid-column:1/-1;width:100%}.onboarding-hero{grid-template-columns:1fr;text-align:center}.onboarding-hero .empty-orb{margin:auto}.template-secondary-filters,.history-toolbar{grid-template-columns:1fr}.history-toolbar .search{grid-column:auto}.completion-details{display:grid}.completed-toggle{grid-column:auto}}

    .history-content{min-width:0}.history-title{display:flex;align-items:center;gap:10px;flex-wrap:wrap}.history-event-type{display:inline-flex;padding:4px 8px;border-radius:999px;background:color-mix(in srgb,var(--primary-color) 12%,transparent);color:var(--primary-color);font-size:.7rem;font-weight:850}.history-changes{margin-top:10px;border:1px solid var(--divider-color);border-radius:14px;overflow:hidden}.history-changes summary{display:flex;align-items:center;gap:8px;padding:10px 12px;cursor:pointer;font-weight:850;background:color-mix(in srgb,var(--primary-text-color) 3%,transparent)}.history-changes summary::-webkit-details-marker{display:none}.history-change-head,.history-change-row{display:grid;grid-template-columns:minmax(110px,.8fr) minmax(120px,1fr) 24px minmax(120px,1fr);gap:8px;align-items:center;padding:8px 12px}.history-change-head{color:var(--secondary-text-color);font-size:.7rem;text-transform:uppercase;border-top:1px solid var(--divider-color)}.history-change-row{border-top:1px solid color-mix(in srgb,var(--divider-color) 70%,transparent);font-size:.82rem}.history-change-row>span{overflow-wrap:anywhere}.history-change-row>ha-icon{--mdc-icon-size:16px;color:var(--secondary-text-color)}
    @media(max-width:620px){.history-change-head{display:none}.history-change-row{grid-template-columns:1fr;gap:4px}.history-change-row>ha-icon{transform:rotate(90deg);justify-self:center}}

    .advanced-section{padding:0;overflow:hidden}.advanced-section>summary{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:16px;cursor:pointer;font-weight:850;list-style:none}.advanced-section>summary::-webkit-details-marker{display:none}.advanced-section>summary>span{display:flex;align-items:center;gap:9px}.advanced-section>summary small{color:var(--secondary-text-color);font-weight:700}.advanced-body{display:grid;gap:14px;padding:0 16px 16px;border-top:1px solid var(--divider-color)}.advanced-body>.check{margin-top:14px}
    .section-title-actions{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}.notification-overview{display:flex;align-items:center;justify-content:space-between;gap:18px;background:radial-gradient(circle at 0 0,color-mix(in srgb,var(--primary-color) 16%,transparent),transparent 48%),color-mix(in srgb,var(--primary-text-color) 2%,transparent)}.switch-card{display:flex;align-items:center;gap:12px;padding:12px 14px;border:1px solid var(--divider-color);border-radius:18px;min-width:200px;background:var(--card-background-color)}.switch-card span{display:grid;gap:2px}.switch-card small{color:var(--secondary-text-color)}.notification-preview-card{display:grid;gap:8px;padding:14px;border:1px solid var(--divider-color);border-radius:18px;background:color-mix(in srgb,var(--primary-text-color) 3%,transparent)}.notification-preview-card.escalated{border-color:color-mix(in srgb,var(--error-color) 65%,var(--divider-color));background:color-mix(in srgb,var(--error-color) 10%,var(--card-background-color))}.notification-preview-card pre{white-space:pre-wrap;overflow-wrap:anywhere;margin:0;font:inherit;color:var(--secondary-text-color)}.preview-actions{display:flex;gap:8px;flex-wrap:wrap}.preview-actions span{padding:6px 9px;border-radius:999px;background:color-mix(in srgb,var(--primary-color) 12%,transparent);color:var(--primary-color);font-size:.75rem;font-weight:800}.notification-history{display:grid;gap:8px}.notification-history article{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:11px 12px;border:1px solid var(--divider-color);border-radius:14px;background:color-mix(in srgb,var(--primary-text-color) 3%,transparent)}.notification-history small{display:block;color:var(--secondary-text-color);margin-top:3px}
    @media(max-width:620px){.section-title-actions{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}.notification-overview{display:grid}.switch-card{min-width:0}.advanced-section>summary{align-items:flex-start}.advanced-section>summary small{display:none}.notification-history article{align-items:flex-start}}

    /* v1.6 dashboard layouts, recovery and settings */
    .layout-switch{display:flex;gap:6px;flex-wrap:wrap;grid-column:1/-1;justify-content:flex-end}.layout-switch .icon{width:auto;min-width:42px;padding:0 12px}.layout-switch .icon span{display:none}.layout-switch .icon.active{background:color-mix(in srgb,var(--primary-color) 18%,transparent);border-color:var(--primary-color);color:var(--primary-color)}
    .compact-dashboard-toolbar{position:sticky;top:0;z-index:10;background:color-mix(in srgb,var(--card-background-color) 86%,transparent);backdrop-filter:blur(18px);border-radius:18px}.compact-dashboard-toolbar .dashboard-main{grid-template-columns:minmax(260px,1fr) minmax(120px,150px) minmax(130px,160px) 42px auto}.compact-dashboard-toolbar .layout-switch{grid-column:auto;align-self:end;flex-wrap:nowrap}.compact-dashboard-toolbar .completed-toggle{min-height:42px}.dashboard-fab{position:fixed;right:28px;bottom:28px;z-index:2147482900;display:grid;place-items:center;width:58px;height:58px;border:0;border-radius:22px;background:color-mix(in srgb,var(--primary-color) 92%,transparent);color:var(--text-primary-color);box-shadow:0 14px 34px color-mix(in srgb,var(--primary-color) 32%,transparent),0 7px 18px rgb(0 0 0 / 34%)}.dashboard-fab ha-icon{--mdc-icon-size:30px}.dashboard-fab span{display:none}.dashboard-fab:hover{box-shadow:0 0 0 8px color-mix(in srgb,var(--primary-color) 16%,transparent),0 20px 44px color-mix(in srgb,var(--primary-color) 38%,transparent);transform:translateY(-1px)}
    .density-compact .task-card,.density-compact .panel{border-radius:14px}.density-compact .task-card{gap:10px;padding:14px}.density-compact .meta-grid{gap:8px}.density-compact .description{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.quick-filter-strip{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 12px}.quick-filter-strip button{display:inline-flex;align-items:center;gap:7px;min-height:34px;padding:0 10px;border:1px solid var(--divider-color);border-radius:999px;background:var(--card-background-color);color:var(--primary-text-color);font-weight:800}.quick-filter-strip button.active{border-color:var(--primary-color);background:color-mix(in srgb,var(--primary-color) 14%,transparent);color:var(--primary-color)}.quick-filter-strip strong{padding:2px 7px;border-radius:999px;background:color-mix(in srgb,var(--primary-text-color) 8%,transparent);font-size:.72rem}.tag-strip{display:flex;gap:6px;flex-wrap:wrap}.tag-strip button{border:1px solid var(--divider-color);border-radius:999px;background:transparent;color:var(--secondary-text-color);min-height:28px;padding:0 9px;font-size:.75rem;font-weight:800}.tag-strip button:hover{border-color:var(--primary-color);color:var(--primary-color)}
    .advanced-filter-panel{padding:18px;margin-bottom:18px;display:grid;gap:16px}.filter-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:12px}.filter-grid label,.saved-filter-bar label,.bulk-toolbar label{display:grid;gap:5px;color:var(--secondary-text-color);font-size:.75rem;font-weight:850}.saved-filter-bar{display:flex;gap:10px;align-items:end;flex-wrap:wrap}.saved-filter-bar .grow{min-width:220px;flex:1}.saved-filter-list{display:flex;gap:7px;flex-wrap:wrap;width:100%}.saved-filter-chip{display:inline-flex;border:1px solid var(--divider-color);border-radius:999px;overflow:hidden;background:color-mix(in srgb,var(--primary-text-color) 4%,transparent)}.saved-filter-chip button{border:0;background:transparent;color:var(--primary-text-color);padding:7px 10px}.saved-filter-chip .icon{width:30px;min-width:30px;padding:0}
    .bulk-toolbar{display:flex;align-items:end;gap:12px;flex-wrap:wrap;padding:14px 18px;margin-bottom:18px;border-color:color-mix(in srgb,var(--primary-color) 55%,var(--divider-color));position:sticky;top:8px;z-index:12}.bulk-toolbar>strong{align-self:center;margin-right:auto}.bulk-toolbar input,.bulk-toolbar select{min-width:130px}.task-select{display:grid;place-items:center;flex:0 0 auto}.task-select input{width:18px;height:18px;min-height:0;padding:0;accent-color:var(--primary-color)}.task-card>header>.task-select{position:absolute;left:10px;top:10px;z-index:2}.task-card>header{padding-left:22px}
    .compact-task-list{display:grid;gap:8px}.compact-task-row{display:grid;grid-template-columns:auto auto minmax(180px,1fr) minmax(110px,auto) auto auto auto;gap:12px;align-items:center;padding:12px 14px;border:1px solid var(--divider-color);border-radius:18px;background:var(--card-background-color)}.compact-task-row small{display:block;color:var(--secondary-text-color);margin-top:3px}.compact-task-row .icon-chip{width:36px;height:36px;border-radius:12px}.grow{min-width:0;flex:1}
    .timeline-view{position:relative;display:grid;gap:0;padding-left:28px}.timeline-view:before{content:"";position:absolute;left:10px;top:10px;bottom:10px;width:2px;background:var(--divider-color)}.timeline-entry{position:relative;display:grid;grid-template-columns:140px 1fr;gap:16px;padding:0 0 18px}.timeline-marker{position:absolute;left:-24px;top:18px;width:12px;height:12px;border-radius:50%;background:var(--primary-color);box-shadow:0 0 0 5px var(--primary-background-color)}.timeline-entry.warning .timeline-marker{background:var(--warning-color)}.timeline-entry.critical .timeline-marker,.timeline-entry.overdue .timeline-marker{background:var(--error-color)}.timeline-date{padding-top:14px;color:var(--secondary-text-color);font-weight:800}.timeline-card{padding:14px 16px;border:1px solid var(--divider-color);border-radius:18px;background:var(--card-background-color)}.timeline-card header{display:flex;justify-content:space-between;gap:12px}.timeline-card p{margin:8px 0 12px}
    .settings-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;margin-bottom:18px}.settings-section{padding:18px;display:grid;gap:16px}.settings-section>header{display:flex;gap:12px;align-items:flex-start}.settings-section>header>ha-icon{padding:10px;border-radius:14px;background:color-mix(in srgb,var(--primary-color) 14%,transparent);color:var(--primary-color)}.settings-section>header p{margin-top:4px}.check-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:9px}.settings-save{display:flex;justify-content:flex-end;padding:14px 18px;margin-bottom:18px}
    .data-dialog,.diagnostics-dialog{width:min(1120px,100%)}.integrity-summary{border-color:color-mix(in srgb,var(--success-color,#4caf50) 45%,var(--divider-color))}.integrity-summary.has-errors{border-color:color-mix(in srgb,var(--error-color) 55%,var(--divider-color));background:color-mix(in srgb,var(--error-color) 5%,transparent)}.issue-list{display:grid;gap:7px;margin-top:12px}.issue{display:flex;gap:10px;align-items:center;padding:10px;border:1px solid var(--divider-color);border-radius:14px}.issue>div{flex:1}.issue small{display:block;color:var(--secondary-text-color)}.issue.error>ha-icon{color:var(--error-color)}.issue.warning>ha-icon{color:var(--warning-color)}
    .backup-list,.quarantine-list{display:grid;gap:8px}.backup-row,.quarantine-list article{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:11px 12px;border:1px solid var(--divider-color);border-radius:15px;background:color-mix(in srgb,var(--primary-text-color) 3%,transparent)}.backup-row.pinned{border-color:color-mix(in srgb,var(--primary-color) 55%,var(--divider-color))}.backup-main{display:flex;align-items:center;gap:10px;min-width:0}.backup-main>ha-icon{color:var(--primary-color)}.backup-main small,.quarantine-list small{display:block;color:var(--secondary-text-color);margin-top:3px}.backup-diff-section details{border:1px solid var(--divider-color);border-radius:15px;padding:10px 12px}.backup-diff-section summary{cursor:pointer;font-weight:850}.diff-summary{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}.diff-summary>div{display:grid;place-items:center;padding:12px;border-radius:15px;background:color-mix(in srgb,var(--primary-text-color) 4%,transparent)}.diff-summary strong{font-size:1.3rem}.diff-summary span{color:var(--secondary-text-color);font-size:.75rem}.change-list{display:grid;gap:10px;margin-top:10px}.change-list article{padding:10px;border-top:1px solid var(--divider-color)}.field-diff{display:grid;grid-template-columns:110px minmax(0,1fr) auto minmax(0,1fr);gap:8px;align-items:center;margin-top:6px}.field-diff code{padding:5px 7px;border-radius:8px;background:color-mix(in srgb,var(--primary-text-color) 6%,transparent);overflow-wrap:anywhere}.restore-options{display:flex;gap:10px;flex-wrap:wrap}.import-preview{display:flex;gap:12px;flex-wrap:wrap;padding:11px 13px;border-radius:14px;background:color-mix(in srgb,var(--success-color,#4caf50) 10%,transparent)}.import-preview.error{background:color-mix(in srgb,var(--error-color) 10%,transparent)}.diagnostics-dialog pre{white-space:pre-wrap;overflow:auto;max-height:260px;padding:12px;border-radius:14px;background:color-mix(in srgb,var(--primary-text-color) 5%,transparent)}
    .small{min-height:34px;padding:0 11px;font-size:.78rem}
    @media(max-width:980px){.settings-grid{grid-template-columns:1fr}.compact-task-row{grid-template-columns:auto auto minmax(140px,1fr) auto auto}.compact-task-row>span:nth-of-type(2){display:none}.timeline-entry{grid-template-columns:110px 1fr}.diff-summary{grid-template-columns:repeat(2,1fr)}.field-diff{grid-template-columns:1fr}.field-diff>ha-icon{transform:rotate(90deg);justify-self:center}}
    @media(max-width:620px){.layout-switch{justify-content:stretch}.layout-switch .icon{flex:1}.compact-brand{display:block}.compact-brand strong{display:block}.compact-dashboard-toolbar{position:static;grid-template-columns:1fr}.compact-dashboard-toolbar .dashboard-main{grid-template-columns:1fr}.compact-dashboard-toolbar .layout-switch{justify-content:stretch}.compact-task-row{grid-template-columns:auto auto 1fr auto}.compact-task-row>.status,.compact-task-row>span:not(.icon-chip){display:none}.bulk-toolbar{position:static;align-items:stretch}.bulk-toolbar>*{width:100%}.timeline-entry{grid-template-columns:1fr}.timeline-date{padding-top:0}.backup-row,.quarantine-list article{align-items:flex-start;flex-direction:column}.backup-row .button-row,.quarantine-list .button-row{width:100%}.diff-summary{grid-template-columns:1fr 1fr}}
    .ordering-help{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 18px;margin-bottom:16px}.settings-row.dragging{opacity:.55;transform:scale(.99);border-color:var(--primary-color)}.settings-row.drop-target{border-color:var(--primary-color);box-shadow:inset 0 3px 0 var(--primary-color);background:color-mix(in srgb,var(--primary-color) 9%,var(--card-background-color))}
    .settings-row .drag:focus-visible{outline:2px solid var(--primary-color);outline-offset:2px}
    .audit-list{display:grid;gap:8px}.audit-list article{display:flex;gap:10px;padding:11px 12px;border:1px solid var(--divider-color);border-radius:15px;background:color-mix(in srgb,var(--primary-text-color) 3%,transparent)}.audit-icon{display:grid;place-items:center;width:36px;height:36px;border-radius:12px;background:color-mix(in srgb,var(--primary-color) 12%,transparent);color:var(--primary-color);flex:0 0 auto}.audit-content{min-width:0;flex:1}.audit-content small{display:block;color:var(--secondary-text-color);margin-top:3px}.audit-content details{margin-top:8px}.audit-content pre{white-space:pre-wrap;overflow:auto;max-height:220px;padding:10px;border-radius:12px;background:color-mix(in srgb,var(--primary-text-color) 5%,transparent)}
    .bulk-preview-dialog{width:min(920px,100%)}.bulk-preview-dialog .change-list{max-height:55vh;overflow:auto}.bulk-preview-dialog .diff-summary{grid-template-columns:repeat(3,1fr)}
    @media(max-width:620px){.bulk-preview-dialog .diff-summary{grid-template-columns:1fr}.audit-list article{align-items:flex-start}}
    /* v1.9.0 Material 3 workflow and checklist foundations */
    :host{
      --md-sys-color-background:#141218;
      --md-sys-color-on-background:#e6e1e5;
      --md-sys-color-surface:#141218;
      --md-sys-color-surface-container-low:#1d1b20;
      --md-sys-color-surface-container:#211f26;
      --md-sys-color-surface-container-high:#2b2930;
      --md-sys-color-on-surface:#e6e1e5;
      --md-sys-color-on-surface-variant:#cac4d0;
      --md-sys-color-primary:#d0bcff;
      --md-sys-color-on-primary:#381e72;
      --md-sys-color-primary-container:#4f378b;
      --md-sys-color-on-primary-container:#eaddff;
      --md-sys-color-outline:#938f99;
      --md-sys-color-outline-variant:#49454f;
      --md-sys-color-success:#9bd67d;
      --md-sys-color-warning:#ffb95c;
      --md-sys-color-error:#ffb4ab;
      --md-sys-color-info:#a8c7fa;
      --md-sys-shape-corner-small:8px;
      --md-sys-shape-corner-medium:12px;
      --md-sys-shape-corner-large:16px;
      --md-sys-shape-corner-extra-large:24px;
      --md-sys-shape-corner-full:9999px;
      --md-motion-easing-emphasized:cubic-bezier(.2,0,0,1);
      --primary-background-color:var(--md-sys-color-background);
      --primary-text-color:var(--md-sys-color-on-surface);
      --secondary-text-color:var(--md-sys-color-on-surface-variant);
      --card-background-color:var(--md-sys-color-surface-container);
      --primary-color:var(--md-sys-color-primary);
      --text-primary-color:var(--md-sys-color-on-primary);
      --divider-color:var(--md-sys-color-outline-variant);
      --success-color:var(--md-sys-color-success);
      --warning-color:var(--md-sys-color-warning);
      --error-color:var(--md-sys-color-error);
      --disabled-text-color:var(--md-sys-color-outline);
      --input-fill-color:var(--md-sys-color-surface-container-low);
      --ha-card-box-shadow:none;
      background:var(--md-sys-color-background);
      color:var(--md-sys-color-on-surface);
      font-family:Inter,"Google Sans",system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
    }
    .shell{max-width:1680px;padding:0 32px 112px;background:var(--md-sys-color-background);color:var(--md-sys-color-on-surface);}
    h1,h2,h3,.compact-brand strong{letter-spacing:0;}
    .hero.top-app-bar{height:64px;margin:0 -32px 0;padding:0 32px;border-bottom:1px solid var(--md-sys-color-outline-variant);background:var(--md-sys-color-background);}
    .compact-brand strong{font-size:1.12rem;font-weight:850;color:var(--md-sys-color-on-surface);}
    .hero-actions{height:100%;gap:20px;flex-wrap:nowrap;}
    .nav{position:relative;height:64px;min-height:64px;padding:0 4px;border:0;border-radius:0;background:transparent;color:var(--md-sys-color-on-surface-variant);font-weight:750;}
    .nav ha-icon{--mdc-icon-size:25px;}
    .nav.active,.nav:hover{background:transparent;border-color:transparent;color:var(--md-sys-color-on-surface);}
    .nav.active:after{content:"";position:absolute;left:0;right:0;bottom:0;height:3px;border-radius:3px 3px 0 0;background:var(--md-sys-color-primary);}
    button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible,a:focus-visible{outline:2px solid var(--md-sys-color-primary);outline-offset:3px;}
    .dashboard-status-line{min-height:58px;margin:0 -32px 28px;padding:0 32px;border-bottom:1px solid var(--md-sys-color-outline-variant);gap:20px;font-size:1rem;color:var(--md-sys-color-on-surface-variant);}
    .dashboard-status-line i{width:1px;height:22px;border-radius:0;background:var(--md-sys-color-outline-variant);}
    .dashboard-status-line b,.dashboard-status-line strong{color:var(--md-sys-color-on-surface);font-weight:850;}
    .dashboard-status-line .status-health{min-height:32px;padding:0;box-shadow:none;color:var(--md-sys-color-success);font-size:1.05rem;}
    .dashboard-status-line span,.dashboard-status-line strong{display:inline-flex;align-items:center;gap:8px;}
    .dashboard-status-line ha-icon{--mdc-icon-size:22px;color:currentColor;opacity:.9;}
    .dashboard-status-line .status-health.warning{box-shadow:none;color:var(--md-sys-color-warning);}
    .toolbar,.panel,.task-card,.template-card,.settings-row,.template-group,.empty,.pack-mini,.pack-card,.history-row{box-shadow:none;background:var(--md-sys-color-surface-container);border-color:var(--md-sys-color-outline-variant);}
    .toolbar.compact-dashboard-toolbar,.templates-toolbar{position:static;z-index:auto;margin:0 0 26px;padding:0;border:0;border-radius:0;background:transparent;backdrop-filter:none;box-shadow:none;grid-template-columns:minmax(0,1fr) auto;align-items:end;gap:16px;}
    .compact-dashboard-toolbar .dashboard-main{display:grid;grid-template-columns:minmax(320px,1fr) 168px 210px 48px 220px;gap:12px;align-items:end;min-width:0;}
    .compact-dashboard-toolbar .dashboard-main>*{min-width:0;}
    .compact-dashboard-toolbar .search,.compact-dashboard-toolbar select,.compact-dashboard-toolbar .completed-toggle,.compact-dashboard-toolbar .icon-only{height:48px;min-height:48px;}
    .compact-dashboard-toolbar .completed-toggle{justify-content:center;white-space:nowrap;padding:0 16px;overflow:hidden;text-overflow:ellipsis;}
    .compact-dashboard-toolbar .layout-switch{min-width:350px}
    .toolbar label span{display:none;}
    .search,select,input,textarea{border-radius:var(--md-sys-shape-corner-large);border-color:var(--md-sys-color-outline-variant);background:var(--md-sys-color-surface-container-low);color:var(--md-sys-color-on-surface);min-height:56px;padding:0 20px;}
    textarea{padding:14px 18px;}
    .search::placeholder{color:var(--md-sys-color-on-surface-variant);}
    .ghost,.primary,.icon{min-height:44px;border-radius:var(--md-sys-shape-corner-full);box-shadow:none;font-weight:800;}
    .ghost{background:transparent;border-color:var(--md-sys-color-outline-variant);color:var(--md-sys-color-on-surface);}
    .ghost:hover{background:color-mix(in srgb,var(--md-sys-color-primary) 10%,transparent);border-color:var(--md-sys-color-outline);}
    .primary{background:var(--md-sys-color-primary);color:var(--md-sys-color-on-primary);}
    .layout-switch{display:flex;align-items:center;gap:0;padding:3px;border:1px solid var(--md-sys-color-outline-variant);border-radius:var(--md-sys-shape-corner-large);background:var(--md-sys-color-surface-container-low);justify-content:flex-end;}
    .layout-switch .icon{width:auto;min-width:112px;min-height:50px;border:0;border-radius:14px;background:transparent;color:var(--md-sys-color-on-surface-variant);}
    .layout-switch .icon span{display:inline;font-weight:760;}
    .layout-switch .icon.active{background:var(--md-sys-color-primary);color:var(--md-sys-color-on-primary);border-color:transparent;}
    .quick-filter-strip{margin:-12px 0 24px;gap:8px;}
    .quick-filter-strip button{min-height:36px;background:transparent;border-color:var(--md-sys-color-outline-variant);color:var(--md-sys-color-on-surface-variant);}
    .quick-filter-strip button.active{background:color-mix(in srgb,var(--md-sys-color-primary) 16%,transparent);border-color:var(--md-sys-color-primary);color:var(--md-sys-color-on-surface);}
    .smart-task-groups{display:grid;gap:20px}
    .smart-task-group{display:grid;gap:12px}
    .smart-task-group>header{display:flex;align-items:end;justify-content:space-between;gap:12px;padding:0 4px}
    .smart-task-group h2{font-size:1.08rem;color:var(--md-sys-color-on-surface)}
    .smart-task-group p{color:var(--md-sys-color-on-surface-variant);font-size:.85rem}
    .smart-task-group>header>span{display:inline-grid;place-items:center;min-width:30px;height:30px;padding:0 10px;border-radius:999px;background:var(--md-sys-color-surface-container-high);color:var(--md-sys-color-primary);font-weight:850}
    .task-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:28px;}
    .task-card{min-height:440px;padding:32px;border-radius:24px;background:var(--md-sys-color-surface-container);background-image:none;border-color:var(--md-sys-color-outline-variant);grid-template-rows:auto auto auto auto 1fr auto;}
    .task-card header{align-items:flex-start;}
    .task-card>header>.task-select{left:14px;top:14px;}
    .task-card>header{padding-left:0;}
    .title-row{gap:22px;align-items:center;}
    .title-row h3{font-size:1.28rem;line-height:1.22;color:var(--md-sys-color-on-surface);}
    .title-row p,.description{color:var(--md-sys-color-on-surface-variant);}
    .icon-chip{width:74px;height:74px;border-radius:20px;background:color-mix(in srgb,var(--task-accent,var(--md-sys-color-primary)) 22%,var(--md-sys-color-surface-container-high));color:var(--md-sys-color-on-surface);}
    .icon-chip ha-icon{--mdc-icon-size:38px;}
    .status{min-height:34px;padding:0 16px;display:inline-flex;align-items:center;background:var(--md-sys-color-surface-container-high);color:var(--md-sys-color-success);}
    .status.warning{background:color-mix(in srgb,var(--md-sys-color-warning) 14%,var(--md-sys-color-surface-container));color:var(--md-sys-color-warning);}
    .status.critical,.status.overdue{background:color-mix(in srgb,var(--md-sys-color-error) 15%,var(--md-sys-color-surface-container));color:var(--md-sys-color-error);}
    .status.snoozed{background:color-mix(in srgb,var(--md-sys-color-primary) 15%,var(--md-sys-color-surface-container));color:var(--md-sys-color-primary);}
    .workflow-strip{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-top:-4px}
    .workflow-state,.workflow-metric{display:inline-flex;align-items:center;min-height:30px;padding:0 10px;border-radius:999px;background:var(--md-sys-color-surface-container-high);color:var(--md-sys-color-on-surface-variant);font-size:.76rem;font-weight:800}
    .workflow-state.state-ready{background:color-mix(in srgb,var(--md-sys-color-primary) 12%,var(--md-sys-color-surface-container-high));color:var(--md-sys-color-primary)}
    .workflow-state.state-in_progress{background:color-mix(in srgb,var(--md-sys-color-success) 18%,var(--md-sys-color-surface-container-high));color:var(--md-sys-color-success)}
    .workflow-state.state-blocked{background:color-mix(in srgb,var(--md-sys-color-error) 16%,var(--md-sys-color-surface-container-high));color:var(--md-sys-color-error)}
    .workflow-state.state-completed{background:color-mix(in srgb,var(--md-sys-color-primary) 16%,var(--md-sys-color-surface-container-high));color:var(--md-sys-color-primary)}
    .workflow-actions{display:flex;gap:8px;flex-wrap:wrap}
    .workflow-meta-row{display:flex;gap:10px;flex-wrap:wrap;margin-top:-2px;color:var(--md-sys-color-on-surface-variant)}
    .workflow-meta-row small{display:inline-flex;align-items:center;min-height:24px;padding:0 8px;border-radius:999px;background:var(--md-sys-color-surface-container-low)}
    .description{min-height:0;margin-top:2px;font-size:.98rem;}
    .checklist-preview{display:grid;gap:8px;padding:12px 14px;border-radius:18px;background:var(--md-sys-color-surface-container-low)}
    .checklist-preview small{color:var(--md-sys-color-on-surface-variant);font-size:.78rem}
    .checklist-item,.completion-check-item{display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:10px}
    .checklist-item input,.completion-check-item input{width:18px;height:18px;min-height:0;padding:0;accent-color:var(--md-sys-color-primary)}
    .checklist-item span,.completion-check-item span{overflow-wrap:anywhere}
    .checklist-item em,.completion-check-item em{font-style:normal;color:var(--md-sys-color-primary);font-size:.74rem;font-weight:800}
    .checklist-item.done span,.completion-check-item.done span{text-decoration:line-through;color:var(--md-sys-color-on-surface-variant)}
    .progress-line{margin-top:8px;color:var(--md-sys-color-on-surface-variant);font-weight:800;}
    .progress{height:6px;background:var(--md-sys-color-surface-container-high);}
    .meta-grid{gap:0;margin-top:10px;border-top:1px solid var(--md-sys-color-outline-variant);}
    .meta-grid div{padding:22px 16px 18px 0;border-radius:0;background:transparent;border-bottom:1px solid var(--md-sys-color-outline-variant);}
    .meta-grid div:nth-child(2n){padding-left:28px;border-left:1px solid var(--md-sys-color-outline-variant);}
    .meta-grid span{font-size:.88rem;text-transform:none;color:var(--md-sys-color-on-surface-variant);letter-spacing:0;font-weight:650;}
    .meta-grid strong{font-size:1.28rem;white-space:normal;color:var(--md-sys-color-on-surface);}
    .meta-grid em{font-size:.95rem;color:var(--md-sys-color-on-surface-variant);}
    .actions{justify-content:flex-end;align-items:center;margin-top:8px;}
    .actions .icon-only{width:52px;min-width:52px;border-radius:16px;}
    .quick-create-wrap{position:fixed;right:32px;bottom:32px;z-index:2147482900;display:grid;gap:10px;justify-items:end}
    .quick-create-menu{display:grid;gap:8px;padding:10px;border:1px solid var(--md-sys-color-outline-variant);border-radius:22px;background:var(--md-sys-color-surface-container-high)}
    .quick-create-menu button{display:flex;align-items:center;gap:10px;min-height:42px;padding:0 14px;border:0;border-radius:999px;background:transparent;color:var(--md-sys-color-on-surface);font-weight:850}
    .quick-create-menu button:hover{background:var(--md-sys-color-surface-container)}
    .dashboard-fab{position:static;width:auto;height:64px;min-height:64px;padding:0 24px;display:inline-flex;gap:14px;border-radius:18px;background:var(--md-sys-color-primary);color:var(--md-sys-color-on-primary);box-shadow:none;}
    .dashboard-fab span{display:inline;font-weight:850;}
    .dashboard-fab ha-icon{--mdc-icon-size:28px;}
    .dashboard-fab:hover{box-shadow:0 0 0 8px color-mix(in srgb,var(--md-sys-color-primary) 14%,transparent);transform:translateY(-1px);}
    .page-header{display:flex;align-items:flex-end;justify-content:space-between;gap:18px;margin:28px 0 22px;padding:0;border:0;border-radius:0;background:transparent;box-shadow:none;}
    .page-header-compact{margin:18px 0 16px;}
    .page-header h1{font-size:1.72rem;line-height:1.15;color:var(--md-sys-color-on-surface);}
    .page-header p:not(.eyebrow){max-width:720px;color:var(--md-sys-color-on-surface-variant);}
    .page-header .eyebrow{color:var(--md-sys-color-primary);}
    .dialog-title-block{display:grid;gap:4px;}
    .dialog-title-block .section-hint{margin:0;color:var(--md-sys-color-on-surface-variant);}
    .dialog-meta-row{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
    .dialog-meta-chip{display:inline-flex;align-items:center;min-height:28px;padding:0 10px;border-radius:999px;border:1px solid var(--md-sys-color-outline-variant);background:var(--md-sys-color-surface-container-low);color:var(--md-sys-color-on-surface-variant);font-size:.78rem;font-weight:800}
    .templates-main{grid-template-columns:minmax(280px,1fr) repeat(2,max-content) max-content;gap:14px;}
    .template-filter-bar{align-items:flex-start;margin-bottom:22px;}
    .category-tabs{padding:0;gap:8px;}
    .tab{min-height:44px;border-radius:var(--md-sys-shape-corner-full);background:transparent;border-color:var(--md-sys-color-outline-variant);color:var(--md-sys-color-on-surface);}
    .tab.active{background:var(--md-sys-color-primary);color:var(--md-sys-color-on-primary);border-color:var(--md-sys-color-primary);}
    .template-group{border-radius:24px;background:transparent;border-color:var(--md-sys-color-outline-variant);}
    .template-card,.pack-mini{border-radius:20px;background:var(--md-sys-color-surface-container);background-image:none;}
    .template-card.selected,.pack-card.selected{background:color-mix(in srgb,var(--md-sys-color-primary) 12%,var(--md-sys-color-surface-container));border-color:var(--md-sys-color-primary);}
    .empty,.empty-orb,.expressive,.onboarding-hero{background:var(--md-sys-color-surface-container);background-image:none;}
    .settings-utility-bar{display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end}
    .settings-nav{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 18px;}
    .settings-nav .tab{display:inline-flex;align-items:center;gap:8px;min-height:42px;padding:0 14px}
    .settings-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;}
    .settings-section{border-radius:24px;background:var(--md-sys-color-surface-container);}
    .settings-section>header>ha-icon,.pack-mini>ha-icon,.pack-card>ha-icon,.template-preview-heading>ha-icon,.completion-heading>ha-icon{background:var(--md-sys-color-surface-container-high);color:var(--md-sys-color-primary);}
    .settings-section-footer{display:flex;justify-content:flex-end}
    .settings-inline-actions{display:flex;justify-content:flex-start}
    .check-grid .check,.toggle-grid .check{border-color:var(--md-sys-color-outline-variant);background:var(--md-sys-color-surface-container-low);border-radius:16px;}
    .check.compact{min-height:44px;padding:0 12px}
    .check.compact.icon-check{width:44px;min-width:44px;justify-content:center;padding:0}
    .check.compact.icon-check ha-icon{--mdc-icon-size:18px;color:var(--md-sys-color-primary)}
    .checklist-editor,.completion-checklist,.completion-requirements{display:grid;gap:12px}
    .checklist-editor-head,.completion-checklist-head{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
    .checklist-editor-row{display:grid;grid-template-columns:auto minmax(0,1fr) auto 44px;gap:10px;align-items:end;padding:12px;border:1px solid var(--md-sys-color-outline-variant);border-radius:18px;background:var(--md-sys-color-surface-container-low)}
    .completion-checklist{padding:14px;border-radius:20px;background:var(--md-sys-color-surface-container-low)}
    .field-head{display:inline-flex;align-items:center;gap:8px}
    .required-mark{display:inline-grid;place-items:center;width:8px;height:8px;border-radius:999px;background:var(--md-sys-color-primary);box-shadow:0 0 0 4px color-mix(in srgb,var(--md-sys-color-primary) 15%,transparent)}
    .is-required input,.is-required textarea,.is-required select{border-color:color-mix(in srgb,var(--md-sys-color-primary) 45%,var(--md-sys-color-outline-variant))}
    .schedule-callout.warning{background:color-mix(in srgb,var(--md-sys-color-error) 10%,transparent);border-color:color-mix(in srgb,var(--md-sys-color-error) 24%,var(--md-sys-color-outline-variant))}
    .schedule-callout.warning ha-icon{color:var(--md-sys-color-error)}
    .history-panel{border-radius:24px;background:transparent;border:0;padding:0;}
    .history-summary-strip{position:static;display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:10px;margin:0 0 14px;padding:0;border:0;background:transparent}
    .history-summary-strip div{display:grid;grid-template-columns:36px 1fr auto;gap:10px;align-items:center;padding:12px 14px;border:1px solid var(--md-sys-color-outline-variant);border-radius:18px;background:var(--md-sys-color-surface-container)}
    .history-toolbar{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;align-items:end;margin-bottom:16px;}
    .history-search-field{display:grid;gap:5px}
    .history-search-input{max-width:100%}
    .history-scope.segmented{grid-column:1/-1;justify-self:start;display:flex;gap:0;padding:3px;border:1px solid var(--md-sys-color-outline-variant);border-radius:var(--md-sys-shape-corner-large);background:var(--md-sys-color-surface-container-low);}
    .history-scope button{min-height:42px;padding:0 16px;border:0;border-radius:13px;background:transparent;color:var(--md-sys-color-on-surface-variant);font-weight:800;}
    .history-scope button.active{background:var(--md-sys-color-primary);color:var(--md-sys-color-on-primary);}
    .history-list{gap:10px;}
    .history-row{border-radius:20px;background:var(--md-sys-color-surface-container);padding:18px;border:1px solid var(--md-sys-color-outline-variant);}
    .history-row>ha-icon{display:grid;place-items:center;width:44px;height:44px;padding:10px;border-radius:15px;background:var(--md-sys-color-surface-container-high);color:var(--md-sys-color-primary);flex:0 0 auto;}
    .history-row.completed>ha-icon{color:var(--md-sys-color-success);}
    .history-row.deleted>ha-icon{color:var(--md-sys-color-error);}
    .history-summary ha-icon{color:var(--md-sys-color-primary);}
    .history-summary span{color:var(--md-sys-color-on-surface-variant);font-size:.86rem;}
    .history-summary strong{color:var(--md-sys-color-on-surface);}
    .timeline-view{padding-left:78px;gap:12px;}
    .timeline-view:before{left:32px;top:18px;bottom:18px;background:var(--md-sys-color-outline-variant);}
    .timeline-entry{display:block;padding:0;position:relative;}
    .timeline-marker{left:-52px;top:34px;width:20px;height:20px;background:transparent;box-shadow:none;border:1px solid var(--md-sys-color-outline);}
    .timeline-marker span{display:block;width:10px;height:10px;margin:4px;border-radius:50%;background:var(--md-sys-color-info);}
    .timeline-entry.ok .timeline-marker span,.timeline-entry.completed .timeline-marker span{background:var(--md-sys-color-success);}
    .timeline-entry.warning .timeline-marker span{background:var(--md-sys-color-warning);}
    .timeline-entry.critical .timeline-marker span,.timeline-entry.overdue .timeline-marker span{background:var(--md-sys-color-error);}
    .timeline-card{display:grid;grid-template-columns:74px minmax(220px,1.5fr) minmax(140px,.55fr) minmax(120px,.5fr) minmax(160px,.7fr) auto;gap:18px;align-items:center;min-height:96px;padding:16px 20px;border-radius:20px;background:var(--md-sys-color-surface-container);border:1px solid var(--md-sys-color-outline-variant);}
    .timeline-main strong{display:block;font-size:1.12rem;color:var(--md-sys-color-on-surface);}
    .timeline-main small,.timeline-date span{display:block;color:var(--md-sys-color-on-surface-variant);margin-top:4px;}
    .timeline-date{padding:0;color:var(--md-sys-color-on-surface);}
    .timeline-progress{display:grid;grid-template-columns:46px minmax(90px,1fr);gap:10px;align-items:center;}
    .timeline-actions{display:flex;gap:8px;justify-content:flex-end;}
    @media(max-width:1280px){
      .toolbar.compact-dashboard-toolbar{grid-template-columns:1fr;}
      .compact-dashboard-toolbar .dashboard-main{grid-template-columns:minmax(260px,1fr) minmax(130px,160px) minmax(150px,180px) 48px;}
      .compact-dashboard-toolbar .completed-toggle{grid-column:1 / 3;}
      .compact-dashboard-toolbar .layout-switch{min-width:0;justify-content:flex-start;}
    }
    @media(max-width:1180px){
      .task-grid,.settings-grid{grid-template-columns:1fr;}
      .history-summary-strip{grid-template-columns:repeat(2,minmax(0,1fr));}
      .timeline-card{grid-template-columns:58px minmax(180px,1fr) minmax(130px,auto) auto;}
      .timeline-card .status,.timeline-progress{grid-column:auto;}
    }
    @media(max-width:760px){
      .shell{padding:0 16px 104px;}
      .hero.top-app-bar{margin:0 -16px;padding:0 16px;height:auto;min-height:64px;align-items:center;}
      .hero-actions{gap:8px;display:grid;grid-template-columns:repeat(4,1fr);height:auto;}
      .nav{height:56px;min-height:56px;font-size:.78rem;}
      .nav span{display:none;}
      .dashboard-status-line{margin:0 -16px 20px;padding:12px 16px;min-height:auto;gap:12px;}
      .dashboard-status-line i{display:none;}
      .compact-dashboard-toolbar,.templates-toolbar{grid-template-columns:1fr;}
      .compact-dashboard-toolbar .dashboard-main,.templates-main,.history-toolbar{grid-template-columns:1fr;}
      .layout-switch{justify-content:stretch;}
      .layout-switch .icon{min-width:0;flex:1;}
      .layout-switch .icon span{display:none;}
      .task-card{min-height:0;padding:22px;}
      .icon-chip{width:58px;height:58px;}
      .icon-chip ha-icon{--mdc-icon-size:30px;}
      .checklist-editor-row{grid-template-columns:1fr}
      .meta-grid div:nth-child(2n){padding-left:16px;}
      .dashboard-fab{right:16px;bottom:18px;height:58px;min-height:58px;padding:0 20px;}
      .page-header{margin:22px 0 18px;}
      .settings-utility-bar{display:grid;grid-template-columns:1fr;}
      .history-scope.segmented{justify-self:stretch;}
      .history-scope button{flex:1;padding:0 8px;}
      .history-summary-strip{grid-template-columns:1fr;}
      .timeline-view{padding-left:38px;}
      .timeline-view:before{left:16px;}
      .timeline-marker{left:-32px;}
      .timeline-card{grid-template-columns:50px minmax(0,1fr) auto;gap:12px;}
      .timeline-date,.timeline-progress{grid-column:2/-1;}
      .timeline-actions{grid-column:1/-1;justify-content:flex-end;}
    }
    .task-grid{grid-template-columns:repeat(4,minmax(0,1fr));gap:18px}
    .task-card{min-height:332px;padding:22px}
    .title-row{gap:16px}
    .title-row h3{font-size:1.08rem}
    .description{font-size:.92rem}
    .meta-grid strong{font-size:1.05rem}
    .bulk-toolbar.floating-bulk-toolbar{position:fixed;left:32px;right:32px;bottom:108px;z-index:2147482950;display:flex;align-items:center;gap:12px;flex-wrap:wrap;padding:14px 16px;border-radius:22px;background:color-mix(in srgb,var(--md-sys-color-surface-container) 95%,black);box-shadow:0 20px 42px rgb(0 0 0 / 34%)}
    .bulk-toolbar-head{display:grid;gap:4px;min-width:180px;margin-right:auto}
    .bulk-toolbar-head span{color:var(--md-sys-color-on-surface-variant);font-size:.84rem}
    .bulk-toolbar-field{display:grid;gap:5px;min-width:180px;max-width:220px;color:var(--md-sys-color-on-surface-variant);font-size:.75rem;font-weight:800}
    .bulk-toolbar-field span{display:block}
    .bulk-toolbar-secondary{display:flex;gap:8px;flex-wrap:wrap}
    .templates-workbench{display:grid;gap:12px;padding:14px 16px;margin-bottom:18px}
    .templates-toolbar-main{display:grid;grid-template-columns:minmax(280px,520px) minmax(0,1fr);gap:12px;align-items:center;justify-content:space-between}
    .templates-toolbar-main .search{height:48px;min-height:48px}
    .template-selection-actions{display:flex;justify-content:flex-end;gap:8px;flex-wrap:wrap}
    .template-selection-actions .ghost,.template-selection-actions .primary{min-height:42px;padding:0 14px}
    .template-filter-bar{margin:0;display:grid;gap:10px}
    .category-tabs{display:flex;gap:8px;flex-wrap:wrap;overflow:visible}
    .category-tabs .tab{display:inline-flex;align-items:center;gap:8px;min-height:38px;padding:0 12px}
    .category-tabs .tab ha-icon{--mdc-icon-size:18px}
    .template-secondary-filters{display:flex;justify-content:space-between;align-items:end;gap:12px;flex-wrap:wrap}
    .template-filter-controls{display:flex;align-items:end;justify-content:flex-end;gap:10px;flex-wrap:wrap;margin-left:auto}
    .template-filter-controls label:not(.check){display:grid;gap:5px;color:var(--md-sys-color-on-surface-variant);font-size:.75rem;font-weight:850}
    .template-filter-controls select{height:44px;min-height:44px;min-width:120px}
    .template-results-meta{display:inline-flex;align-items:center;gap:10px;min-height:40px;padding:0 12px;border:1px solid var(--md-sys-color-outline-variant);border-radius:999px;background:var(--md-sys-color-surface-container-low)}
    .template-results-meta strong{color:var(--md-sys-color-on-surface)}
    .template-results-meta span,.template-results-meta em{font-style:normal;color:var(--md-sys-color-on-surface-variant)}
    .template-group-title{display:flex;align-items:center;gap:12px}
    .template-group-title small{display:block;margin-bottom:2px;color:var(--md-sys-color-on-surface-variant);font-size:.76rem;font-weight:800;letter-spacing:0;text-transform:none}
    .template-group-icon{display:grid;place-items:center;width:42px;height:42px;border-radius:14px;background:var(--md-sys-color-surface-container-high);color:var(--md-sys-color-primary)}
    .template-group-icon ha-icon{--mdc-icon-size:20px}
    .template-card.compact small{display:flex;align-items:center;gap:7px;line-height:1.35}
    .template-card.compact small ha-icon{--mdc-icon-size:16px;color:var(--md-sys-color-primary)}
    .template-card.compact{min-width:0;overflow:hidden}
    .template-card.compact header{display:grid;grid-template-columns:24px 28px minmax(0,1fr) 38px;align-items:start;gap:10px}
    .template-card.compact header>ha-icon{width:28px;min-width:28px}
    .template-title{min-width:0}
    .template-title h3{overflow-wrap:anywhere}
    .favorite-button{width:38px;min-width:38px;height:38px;min-height:38px;margin:0;color:var(--md-sys-color-on-surface-variant)}
    .favorite-button.active{color:var(--md-sys-color-primary);background:color-mix(in srgb,var(--md-sys-color-primary) 14%,transparent)}
    .starter-count{display:inline-grid;place-items:center;min-width:28px;height:28px;padding:0 10px;border-radius:999px;background:var(--md-sys-color-surface-container-high);color:var(--md-sys-color-primary);font-size:.82rem}
    .starter-toggle{min-height:40px}
    .pack-strip{grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}
    .pack-mini{grid-template-columns:40px 1fr auto;align-items:start;padding:16px}
    .pack-mini-action{min-height:40px;white-space:nowrap;align-self:center}
    .starter-packs.collapsed{padding-bottom:10px}
    .settings-stack{display:grid;gap:18px}
    .settings-section-grid{display:grid;gap:16px}
    .settings-section-grid.two-column{grid-template-columns:repeat(2,minmax(0,1fr))}
    .settings-section-grid.three-column{grid-template-columns:repeat(3,minmax(0,1fr))}
    .settings-subpanel{display:grid;gap:12px;padding:16px;border:1px solid var(--md-sys-color-outline-variant);border-radius:18px;background:var(--md-sys-color-surface-container-low)}
    .settings-subpanel h4{font-size:1rem;color:var(--md-sys-color-on-surface)}
    .platform-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
    .settings-ordering-head{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:16px}
    .settings-row{display:grid;grid-template-columns:40px 32px minmax(0,1fr) 36px 36px 36px 36px;gap:10px;align-items:center}
    .history-results-meta{display:flex;align-items:center;gap:10px;margin:0 0 16px;padding:0 4px;color:var(--md-sys-color-on-surface-variant)}
    .history-results-meta strong{font-size:1.15rem;color:var(--md-sys-color-on-surface)}
    .history-list{display:grid;gap:18px}
    .history-day-group{display:grid;gap:10px}
    .history-day-header{display:flex;align-items:center;justify-content:space-between;padding:0 4px}
    .history-day-header strong{font-size:.95rem;color:var(--md-sys-color-on-surface)}
    .history-day-header span{display:inline-grid;place-items:center;min-width:30px;height:30px;padding:0 10px;border-radius:999px;background:var(--md-sys-color-surface-container-high);color:var(--md-sys-color-on-surface-variant)}
    .history-day-entries{display:grid;gap:10px}
    .history-row{display:grid;grid-template-columns:44px minmax(0,1fr) auto;align-items:start;gap:14px}
    .history-title{display:grid;gap:6px}
    .history-meta-strip{display:flex;gap:8px;flex-wrap:wrap}
    .history-event-type,.history-source,.history-time{display:inline-flex;align-items:center;min-height:28px;padding:0 10px;border-radius:999px;background:var(--md-sys-color-surface-container-high);font-size:.78rem}
    .history-summary-line{margin:0;color:var(--md-sys-color-on-surface)}
    .history-change-head,.history-change-row{display:grid;grid-template-columns:minmax(120px,160px) 1fr auto 1fr;gap:10px;align-items:start}
    .history-change-head{margin-top:10px;color:var(--md-sys-color-on-surface-variant);font-size:.78rem}
    .history-change-row{padding:10px 0;border-top:1px solid color-mix(in srgb,var(--md-sys-color-outline-variant) 70%,transparent)}
    .history-change-row code{padding:8px 10px;border-radius:12px;background:var(--md-sys-color-surface-container-low);white-space:pre-wrap}
    .sheet-backdrop{position:fixed;inset:0;z-index:2147483000;background:rgb(0 0 0 / 38%);display:flex;justify-content:flex-end}
    .task-detail-sheet{width:min(560px,100%);height:100%;overflow:auto;display:grid;align-content:start;gap:16px;padding:22px;border-left:1px solid var(--md-sys-color-outline-variant);background:var(--md-sys-color-surface-container);color:var(--md-sys-color-on-surface)}
    .task-detail-sheet>header{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}
    .detail-title{display:flex;align-items:center;gap:14px;min-width:0}
    .detail-title h2{font-size:1.35rem;line-height:1.18}
    .detail-title p{color:var(--md-sys-color-on-surface-variant)}
    .detail-metrics{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
    .detail-metrics div{display:grid;gap:5px;padding:12px;border-radius:16px;background:var(--md-sys-color-surface-container-low)}
    .detail-metrics span{color:var(--md-sys-color-on-surface-variant);font-size:.76rem;font-weight:800}
    .detail-actions{display:flex;gap:8px;flex-wrap:wrap}
    .detail-section{display:grid;gap:10px;padding:14px;border:1px solid var(--md-sys-color-outline-variant);border-radius:18px;background:var(--md-sys-color-surface-container-low)}
    .note-composer{display:grid;gap:8px}
    .note-composer textarea{min-height:88px}
    .note-list,.detail-timeline{display:grid;gap:8px}
    .note-list article,.detail-timeline article{display:grid;gap:4px;padding:10px;border-radius:14px;background:var(--md-sys-color-surface-container)}
    .detail-timeline article{grid-template-columns:32px minmax(0,1fr);align-items:start}
    .detail-timeline ha-icon{color:var(--md-sys-color-primary)}
    .preview-plan{display:grid;gap:8px;padding:12px;border-radius:16px;background:var(--md-sys-color-surface-container-low)}
    .preview-plan ul{margin:0;padding-left:18px;color:var(--md-sys-color-on-surface-variant)}
    .wizard-dialog{width:min(980px,100%);overflow:hidden;display:grid;grid-template-rows:auto auto minmax(0,1fr) auto}
    .wizard-dialog .dialog-body{overflow:auto}
    .wizard-steps{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;padding:12px 18px;border-bottom:1px solid var(--md-sys-color-outline-variant);background:var(--md-sys-color-surface-container-low)}
    .wizard-steps button{display:flex;align-items:center;justify-content:center;gap:8px;min-height:44px;border:1px solid transparent;border-radius:999px;background:transparent;color:var(--md-sys-color-on-surface-variant);font-weight:850}
    .wizard-steps button.active{background:var(--md-sys-color-primary);color:var(--md-sys-color-on-primary)}
    .wizard-steps button.has-missing:not(.active){border-color:color-mix(in srgb,var(--md-sys-color-error) 38%,transparent)}
    .wizard-section{min-height:420px;align-content:start}
    .section-heading{display:flex;align-items:start;justify-content:space-between;gap:14px}
    .template-autocomplete{display:grid;gap:10px;padding:12px;border:1px solid var(--md-sys-color-outline-variant);border-radius:18px;background:var(--md-sys-color-surface-container-low)}
    .template-picker-head{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:12px;align-items:end}
    .template-picker-head input{height:48px;min-height:48px}
    .template-picker-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;max-height:234px;overflow:auto;padding-right:2px}
    .template-picker-option{display:grid;grid-template-columns:38px minmax(0,1fr);gap:10px;align-items:center;min-height:58px;padding:8px 10px;border:1px solid var(--md-sys-color-outline-variant);border-radius:16px;background:var(--md-sys-color-surface-container);color:var(--md-sys-color-on-surface);text-align:left}
    .template-picker-option ha-icon{display:grid;place-items:center;width:38px;height:38px;border-radius:13px;background:var(--md-sys-color-surface-container-high);color:var(--md-sys-color-primary)}
    .template-picker-option strong,.template-picker-option small{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .template-picker-option small{margin-top:3px;color:var(--md-sys-color-on-surface-variant);font-size:.76rem}
    .template-picker-option.active{border-color:var(--md-sys-color-primary);background:color-mix(in srgb,var(--md-sys-color-primary) 14%,var(--md-sys-color-surface-container))}
    .preset-row{display:flex;gap:8px;flex-wrap:wrap}
    .preset-row .ghost{min-height:40px;padding:0 12px}
    .wizard-split{display:grid;grid-template-columns:minmax(0,1fr) minmax(280px,.9fr);gap:14px;align-items:start}
    .appearance-compact{display:grid;gap:12px;padding:14px;border-radius:18px;background:var(--md-sys-color-surface-container-low)}
    .compact-heading h4{font-size:1rem}
    .inline-required{display:inline-grid;vertical-align:middle;margin-left:8px}
    .inline-check{min-height:40px;padding:0 12px;border:1px solid var(--md-sys-color-outline-variant);border-radius:999px;background:var(--md-sys-color-surface-container-low)}
    .metric-popover{position:relative}
    .status-popover{position:absolute;left:0;top:calc(100% + 10px);z-index:20;display:none;min-width:220px;padding:12px;border:1px solid var(--md-sys-color-outline-variant);border-radius:16px;background:var(--md-sys-color-surface-container-high);box-shadow:0 18px 42px rgb(0 0 0 / 32%);color:var(--md-sys-color-on-surface)}
    .metric-popover:hover .status-popover,.metric-popover:focus-within .status-popover{display:grid;gap:8px}
    .status-popover>strong{font-size:.86rem}
    .status-popover div{display:flex;align-items:center;justify-content:space-between;gap:18px;color:var(--md-sys-color-on-surface-variant)}
    .status-popover div strong{color:var(--md-sys-color-on-surface)}
    .workflow-menu-wrap{position:relative}
    .workflow-menu{position:absolute;right:0;bottom:50px;z-index:25;display:grid;gap:6px;min-width:210px;padding:10px;border:1px solid var(--md-sys-color-outline-variant);border-radius:18px;background:var(--md-sys-color-surface-container-high);box-shadow:0 18px 42px rgb(0 0 0 / 32%)}
    .workflow-menu button{display:flex;align-items:center;justify-content:flex-start;gap:10px;min-height:38px;padding:0 10px;border:0;border-radius:12px;background:transparent;color:var(--md-sys-color-on-surface);font-weight:800}
    .workflow-menu button:hover{background:var(--md-sys-color-surface-container)}
    .template-results-anchor{display:flex;justify-content:flex-start;margin:0 0 12px}
    @media(max-width:1500px){.task-grid,.pack-strip{grid-template-columns:repeat(3,minmax(0,1fr))}}
    @media(max-width:1180px){.task-grid,.pack-strip,.settings-section-grid.two-column,.settings-section-grid.three-column,.history-summary-strip{grid-template-columns:repeat(2,minmax(0,1fr))}.templates-toolbar-main,.template-picker-list{grid-template-columns:1fr}.template-selection-actions{justify-content:flex-start}.template-secondary-filters{display:grid;grid-template-columns:1fr}.template-filter-controls{justify-content:flex-start;margin-left:0}.template-results-meta{justify-content:flex-start}.bulk-toolbar.floating-bulk-toolbar{bottom:96px}}
    @media(max-width:900px){.compact-dashboard-toolbar .dashboard-main{grid-template-columns:1fr 1fr}.compact-dashboard-toolbar .search,.compact-dashboard-toolbar .completed-toggle{grid-column:1/-1}.compact-dashboard-toolbar .layout-switch{width:100%;}.compact-dashboard-toolbar .layout-switch .icon{flex:1;min-width:0}}
    @media(max-width:760px){.compact-dashboard-toolbar .dashboard-main{grid-template-columns:1fr}.bulk-toolbar.floating-bulk-toolbar{left:16px;right:16px;bottom:86px}.pack-strip,.settings-section-grid.two-column,.settings-section-grid.three-column,.platform-grid,.template-secondary-filters,.wizard-split,.template-picker-head,.detail-metrics{grid-template-columns:1fr}.wizard-steps{grid-template-columns:1fr 1fr}.wizard-steps button span{display:none}.settings-row{grid-template-columns:32px 28px minmax(0,1fr) 36px 36px;gap:8px}.settings-row [data-edit]{grid-column:4}.settings-row [data-delete]{grid-column:5}.settings-row [data-move$=':up'],.settings-row [data-move$=':down']{grid-row:2}.task-grid{grid-template-columns:1fr}.task-detail-sheet{border-left:0;border-radius:28px 28px 0 0;margin-top:74px;height:calc(100% - 74px)}}
    @media(prefers-reduced-motion:reduce){
      *,*:before,*:after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;scroll-behavior:auto!important;}
    }
  </style>`;
  }
});


// ---- frontend/src/register.ts ----
// Custom element registration and visible frontend version log.
if (!customElements.get("maintenance-dashboard-panel")) {
  customElements.define("maintenance-dashboard-panel", MaintenanceDashboardPanel);
}
console.info(`%cmaintenance-dashboard-panel%c v${VERSION}`, "color: var(--primary-color); font-weight: 800;", "color: inherit;");

