from __future__ import annotations

# Neutral, brand-independent default templates.
# The frontend can import these through the WebSocket state response.
TEMPLATES: list[dict] = [
    {"id": "heat_pump_filter", "name": "Wärmepumpenfilter", "category": "heating", "area_name": "Technikraum", "icon": "mdi:air-filter", "interval": 90, "interval_unit": "days", "priority": 2, "description": "Filter der Wärmepumpe prüfen oder wechseln."},
    {"id": "heating_service", "name": "Heizungswartung", "category": "heating", "area_name": "Technikraum", "icon": "mdi:heat-pump-outline", "interval": 365, "interval_unit": "days", "priority": 5, "description": "Jährliche Wartung der Heizungsanlage."},
    {"id": "expansion_vessel", "name": "Ausdehnungsgefäß prüfen", "category": "heating", "area_name": "Technikraum", "icon": "mdi:gauge", "interval": 365, "interval_unit": "days", "priority": 4, "description": "Druck und Zustand des Ausdehnungsgefäßes prüfen."},
    {"id": "radiator_bleed", "name": "Heizkörper entlüften", "category": "heating", "area_name": "Haus", "icon": "mdi:radiator", "interval": 180, "interval_unit": "days", "priority": 2, "description": "Heizkörper auf Luft prüfen und bei Bedarf entlüften."},
    {"id": "underfloor_heating_manifold", "name": "Fußbodenheizung Verteiler prüfen", "category": "heating", "area_name": "Haus", "icon": "mdi:pipe-valve", "interval": 365, "interval_unit": "days", "priority": 3, "description": "Verteiler, Durchfluss und Ventile prüfen."},

    {"id": "ventilation_filter", "name": "Lüftungsfilter", "category": "ventilation", "area_name": "Haus", "icon": "mdi:fan", "interval": 180, "interval_unit": "days", "priority": 3, "description": "Filter der Lüftungsanlage prüfen oder wechseln."},
    {"id": "extractor_filter", "name": "Dunstabzug Filter", "category": "ventilation", "area_name": "Küche", "icon": "mdi:air-filter", "interval": 90, "interval_unit": "days", "priority": 2, "description": "Fettfilter reinigen oder tauschen."},
    {"id": "bathroom_fan_clean", "name": "Badlüfter reinigen", "category": "ventilation", "area_name": "Bad", "icon": "mdi:fan-alert", "interval": 180, "interval_unit": "days", "priority": 2, "description": "Lüfterabdeckung und Staub entfernen."},

    {"id": "water_filter", "name": "Hauswasserfilter", "category": "water", "area_name": "Hausanschlussraum", "icon": "mdi:water-pump", "interval": 180, "interval_unit": "days", "priority": 4, "description": "Hauswasserfilter prüfen oder wechseln."},
    {"id": "softener_salt", "name": "Enthärtungsanlage Salz prüfen", "category": "water", "area_name": "Hausanschlussraum", "icon": "mdi:shaker-outline", "interval": 30, "interval_unit": "days", "priority": 3, "description": "Salzstand prüfen und bei Bedarf auffüllen."},
    {"id": "siphon_clean", "name": "Siphons reinigen", "category": "water", "area_name": "Haus", "icon": "mdi:pipe-disconnected", "interval": 180, "interval_unit": "days", "priority": 2, "description": "Siphons auf Ablagerungen prüfen und reinigen."},
    {"id": "main_water_valve", "name": "Hauptwasserhahn bewegen", "category": "water", "area_name": "Hausanschlussraum", "icon": "mdi:valve", "interval": 365, "interval_unit": "days", "priority": 3, "description": "Hauptabsperrung kurz bewegen, damit sie nicht festsetzt."},
    {"id": "outdoor_tap_winter", "name": "Außenwasser winterfest machen", "category": "water", "area_name": "Außenbereich", "icon": "mdi:pipe-valve", "interval": 365, "interval_unit": "days", "priority": 4, "description": "Außenwasser abstellen und Leitungen entleeren."},

    {"id": "rcd_test", "name": "FI-Schutzschalter Test", "category": "electrical", "area_name": "Haus", "icon": "mdi:lightning-bolt-outline", "interval": 180, "interval_unit": "days", "priority": 5, "description": "FI/RCD-Testtaste auslösen und Funktion prüfen."},
    {"id": "distribution_box_check", "name": "Sicherungskasten Sichtprüfung", "category": "electrical", "area_name": "Hausanschlussraum", "icon": "mdi:fuse", "interval": 365, "interval_unit": "days", "priority": 4, "description": "Sichtprüfung auf Wärme, Geruch, lose Abdeckungen und Beschriftung."},
    {"id": "surge_protection", "name": "Überspannungsschutz prüfen", "category": "electrical", "area_name": "Hausanschlussraum", "icon": "mdi:flash-triangle-outline", "interval": 365, "interval_unit": "days", "priority": 4, "description": "Statusanzeigen des Überspannungsschutzes prüfen."},
    {"id": "ups_battery_test", "name": "USV Batterie-Test", "category": "electrical", "area_name": "IT/Netzwerk", "icon": "mdi:battery-clock-outline", "interval": 180, "interval_unit": "days", "priority": 3, "description": "USV Selbsttest ausführen und Batteriestatus prüfen."},

    {"id": "smoke_detector_test", "name": "Rauchmelder-Test", "category": "safety", "area_name": "Haus", "icon": "mdi:smoke-detector-outline", "interval": 180, "interval_unit": "days", "priority": 5, "description": "Funktionstest aller Rauchmelder."},
    {"id": "fire_extinguisher_check", "name": "Feuerlöscher Sichtprüfung", "category": "safety", "area_name": "Haus", "icon": "mdi:fire-extinguisher", "interval": 365, "interval_unit": "days", "priority": 4, "description": "Druckanzeige, Plombe und Standort prüfen."},
    {"id": "co_detector_test", "name": "CO-Melder Test", "category": "safety", "area_name": "Haus", "icon": "mdi:molecule-co", "interval": 180, "interval_unit": "days", "priority": 5, "description": "CO-Melder testen und Batteriestand prüfen."},
    {"id": "first_aid_check", "name": "Erste-Hilfe-Set prüfen", "category": "safety", "area_name": "Haus", "icon": "mdi:medical-bag", "interval": 365, "interval_unit": "days", "priority": 3, "description": "Ablaufdaten und Vollständigkeit prüfen."},
    {"id": "alarm_system_test", "name": "Alarmanlage Funktionstest", "category": "safety", "area_name": "Haus", "icon": "mdi:shield-home-outline", "interval": 180, "interval_unit": "days", "priority": 4, "description": "Sensoren, Sirene und Benachrichtigung testen."},

    {"id": "solar_storage_check", "name": "Solarspeicher Sichtprüfung", "category": "solar", "area_name": "Technikraum", "icon": "mdi:home-battery-outline", "interval": 180, "interval_unit": "days", "priority": 3, "description": "Solarspeicher, Statusanzeigen und Fehlermeldungen prüfen."},
    {"id": "pv_inverter_check", "name": "PV-Wechselrichter Sichtprüfung", "category": "solar", "area_name": "Technikraum", "icon": "mdi:solar-power-variant-outline", "interval": 180, "interval_unit": "days", "priority": 3, "description": "Wechselrichterstatus und Fehlerspeicher prüfen."},
    {"id": "pv_yield_review", "name": "PV-Ertrag plausibilisieren", "category": "solar", "area_name": "Haus", "icon": "mdi:chart-line", "interval": 30, "interval_unit": "days", "priority": 2, "description": "Monatlichen Ertrag auf Auffälligkeiten prüfen."},
    {"id": "pv_visual_roof", "name": "PV-Anlage Sichtprüfung", "category": "solar", "area_name": "Außenbereich", "icon": "mdi:solar-panel-large", "interval": 365, "interval_unit": "days", "priority": 3, "description": "Module auf offensichtliche Schäden oder Verschmutzung prüfen."},

    {"id": "robot_mower_blades", "name": "Rasenroboter Klingenwechsel", "category": "garden", "area_name": "Garten", "icon": "mdi:robot-mower-outline", "interval": 30, "interval_unit": "days", "priority": 3, "description": "Klingen prüfen oder tauschen."},
    {"id": "lawn_mower_service", "name": "Rasenmäher Wartung", "category": "garden", "area_name": "Garage", "icon": "mdi:grass", "interval": 365, "interval_unit": "days", "priority": 3, "description": "Messer, Öl, Luftfilter und Zündkerze prüfen."},
    {"id": "irrigation_check", "name": "Bewässerung prüfen", "category": "garden", "area_name": "Garten", "icon": "mdi:sprinkler-variant", "interval": 90, "interval_unit": "days", "priority": 2, "description": "Düsen, Leckagen und Zeitpläne prüfen."},
    {"id": "garden_tools", "name": "Gartengeräte prüfen", "category": "garden", "area_name": "Garage", "icon": "mdi:shovel", "interval": 365, "interval_unit": "days", "priority": 2, "description": "Akkus, Klingen, Stiele und Sicherheit prüfen."},
    {"id": "hedge_trimmer", "name": "Heckenschere warten", "category": "garden", "area_name": "Garage", "icon": "mdi:content-cut", "interval": 365, "interval_unit": "days", "priority": 2, "description": "Messer reinigen, ölen und Akkus prüfen."},

    {"id": "rain_gutter", "name": "Dachrinne reinigen", "category": "building", "area_name": "Außenbereich", "icon": "mdi:home-roof", "interval": 180, "interval_unit": "days", "priority": 4, "description": "Dachrinne auf Laub und Verstopfungen prüfen."},
    {"id": "roof_inspection", "name": "Dach Sichtprüfung", "category": "building", "area_name": "Außenbereich", "icon": "mdi:home-roof", "interval": 365, "interval_unit": "days", "priority": 4, "description": "Dach, Anschlüsse und sichtbare Schäden prüfen."},
    {"id": "window_seals", "name": "Fensterdichtungen pflegen", "category": "building", "area_name": "Haus", "icon": "mdi:window-closed-variant", "interval": 365, "interval_unit": "days", "priority": 2, "description": "Dichtungen reinigen und pflegen."},
    {"id": "door_locks", "name": "Türschlösser schmieren", "category": "building", "area_name": "Haus", "icon": "mdi:door-closed-lock", "interval": 365, "interval_unit": "days", "priority": 2, "description": "Schlösser und Beschläge prüfen und pflegen."},
    {"id": "facade_check", "name": "Fassade Sichtprüfung", "category": "building", "area_name": "Außenbereich", "icon": "mdi:home-search-outline", "interval": 365, "interval_unit": "days", "priority": 3, "description": "Risse, Feuchtigkeit und Schäden prüfen."},
    {"id": "garage_door", "name": "Garagentor warten", "category": "garage", "area_name": "Garage", "icon": "mdi:garage", "interval": 180, "interval_unit": "days", "priority": 3, "description": "Laufschienen, Federn, Sensoren und Antrieb prüfen."},

    {"id": "network_rack_check", "name": "Netzwerkschrank Sichtprüfung", "category": "it_network", "area_name": "IT/Netzwerk", "icon": "mdi:server-network", "interval": 90, "interval_unit": "days", "priority": 3, "description": "Lüftung, Kabel, USV und Geräte prüfen."},
    {"id": "nas_backup_check", "name": "NAS Backup prüfen", "category": "it_network", "area_name": "IT/Netzwerk", "icon": "mdi:nas", "interval": 30, "interval_unit": "days", "priority": 5, "description": "Letzte Backups und Restore-Fähigkeit prüfen."},
    {"id": "router_update_check", "name": "Router Updates prüfen", "category": "it_network", "area_name": "IT/Netzwerk", "icon": "mdi:router-network", "interval": 90, "interval_unit": "days", "priority": 3, "description": "Firmware-Updates und Konfigurationsbackup prüfen."},
    {"id": "wifi_check", "name": "WLAN Abdeckung prüfen", "category": "it_network", "area_name": "Haus", "icon": "mdi:wifi-check", "interval": 180, "interval_unit": "days", "priority": 2, "description": "Signalqualität und Client-Probleme prüfen."},

    {"id": "dryer_filter", "name": "Trockner Filter reinigen", "category": "household", "area_name": "Hauswirtschaft", "icon": "mdi:tumble-dryer", "interval": 14, "interval_unit": "days", "priority": 2, "description": "Flusenfilter und Wärmetauscher reinigen."},
    {"id": "washing_machine_clean", "name": "Waschmaschine reinigen", "category": "household", "area_name": "Hauswirtschaft", "icon": "mdi:washing-machine", "interval": 90, "interval_unit": "days", "priority": 2, "description": "Trommelreinigung, Flusensieb und Dichtungen prüfen."},
    {"id": "dishwasher_clean", "name": "Spülmaschine reinigen", "category": "household", "area_name": "Küche", "icon": "mdi:dishwasher", "interval": 60, "interval_unit": "days", "priority": 2, "description": "Sieb, Sprüharme und Maschinenpflege durchführen."},
    {"id": "refrigerator_coils", "name": "Kühlschrank Rückseite reinigen", "category": "household", "area_name": "Küche", "icon": "mdi:fridge-outline", "interval": 365, "interval_unit": "days", "priority": 1, "description": "Staub an Rückseite/Kondensator entfernen."},
    {"id": "vacuum_robot", "name": "Saugroboter Wartung", "category": "household", "area_name": "Haus", "icon": "mdi:robot-vacuum", "interval": 30, "interval_unit": "days", "priority": 2, "description": "Bürsten, Filter, Sensoren und Räder reinigen."},
    {"id": "air_purifier_filter", "name": "Luftreiniger Filter", "category": "household", "area_name": "Haus", "icon": "mdi:air-purifier", "interval": 180, "interval_unit": "days", "priority": 2, "description": "Filterzustand prüfen oder Filter wechseln."},
    {"id": "season_autumn_gutter", "name": "Dachrinne vor Herbst/Winter reinigen", "category": "building", "area_name": "Außenbereich", "icon": "mdi:home-roof", "interval": 365, "interval_unit": "days", "priority": 4, "schedule_mode": "seasonal", "season": "autumn", "description": "Dachrinne vor der Laub- und Frostperiode reinigen."},
    {"id": "season_winter_outdoor_water", "name": "Außenwasser winterfest machen", "category": "water", "area_name": "Außenbereich", "icon": "mdi:pipe-valve", "interval": 365, "interval_unit": "days", "priority": 4, "schedule_mode": "seasonal", "season": "autumn", "description": "Außenwasser absperren und Leitungen entleeren."},
    {"id": "season_spring_irrigation", "name": "Bewässerung in Betrieb nehmen", "category": "garden", "area_name": "Garten", "icon": "mdi:sprinkler-variant", "interval": 365, "interval_unit": "days", "priority": 3, "schedule_mode": "seasonal", "season": "spring", "description": "Gartenbewässerung nach dem Winter prüfen und starten."},
    {"id": "season_heating_precheck", "name": "Heizung vor Saison prüfen", "category": "heating", "area_name": "Technikraum", "icon": "mdi:radiator", "interval": 365, "interval_unit": "days", "priority": 4, "schedule_mode": "seasonal", "season": "autumn", "description": "Heizung vor der Heizperiode prüfen."},
    {"id": "season_robot_mower_winter", "name": "Mähroboter einwintern", "category": "garden", "area_name": "Garage", "icon": "mdi:robot-mower-outline", "interval": 365, "interval_unit": "days", "priority": 3, "schedule_mode": "seasonal", "season": "autumn", "description": "Mähroboter reinigen, Akku pflegen und trocken lagern."},
    {"id": "season_pv_summer_check", "name": "PV-Anlage Sommercheck", "category": "solar", "area_name": "Außenbereich", "icon": "mdi:solar-panel-large", "interval": 365, "interval_unit": "days", "priority": 3, "schedule_mode": "seasonal", "season": "summer", "description": "PV-Ertrag und sichtbare Verschmutzung im Sommer prüfen."},

]

TEMPLATES.extend([
    {"id": "monthly_water_meter_review", "name": "Wasserverbrauch monatlich prüfen", "category": "water", "area_name": "Haus", "icon": "mdi:meter-water-outline", "interval": 1, "interval_unit": "months", "priority": 2, "schedule_mode": "fixed_date", "calendar_repeat": "monthly", "fixed_day": 1, "description": "Monatlichen Wasserverbrauch auf ungewöhnliche Abweichungen prüfen.", "tags": ["wasser", "verbrauch", "monatlich"], "popular": True},
    {"id": "annual_heating_preseason", "name": "Heizung vor Saisonstart prüfen", "category": "heating", "area_name": "Technikraum", "icon": "mdi:radiator", "interval": 365, "interval_unit": "days", "priority": 4, "schedule_mode": "fixed_date", "calendar_repeat": "yearly", "fixed_month": 9, "fixed_day": 1, "description": "Heizungsanlage jährlich vor Beginn der Heizperiode prüfen.", "tags": ["heizung", "jährlich", "herbst"], "recommended": True},
    {"id": "annual_insurance_documents", "name": "Versicherungsunterlagen prüfen", "category": "general", "area_name": "Haus", "icon": "mdi:file-document-check-outline", "interval": 365, "interval_unit": "days", "priority": 2, "schedule_mode": "fixed_date", "calendar_repeat": "yearly", "fixed_month": 1, "fixed_day": 15, "description": "Deckung, Ansprechpartner und wichtige Vertragsdaten jährlich prüfen.", "tags": ["dokumente", "jährlich", "organisation"]},

])

TEMPLATES.extend([
    {"id": "thermostat_batteries", "name": "Thermostat-Batterien prüfen", "category": "heating", "area_name": "Haus", "icon": "mdi:thermostat", "interval": 365, "interval_unit": "days", "priority": 2, "description": "Batteriestand und Erreichbarkeit der Heizkörperthermostate prüfen.", "tags": ["thermostat", "batterie", "heizung"], "common": True},
    {"id": "condensate_drain_check", "name": "Kondensatablauf prüfen", "category": "heating", "area_name": "Technikraum", "icon": "mdi:pipe-leak", "interval": 180, "interval_unit": "days", "priority": 3, "description": "Kondensatablauf auf Verstopfung, Geruch und Leckagen prüfen.", "tags": ["kondensat", "ablauf", "heizung"]},
    {"id": "heat_recovery_clean", "name": "Wärmerückgewinnung reinigen", "category": "ventilation", "area_name": "Technikraum", "icon": "mdi:hvac", "interval": 365, "interval_unit": "days", "priority": 3, "description": "Wärmetauscher und Kondensatbereich der Lüftungsanlage reinigen.", "tags": ["lüftung", "wärmerückgewinnung", "wärmetauscher"]},
    {"id": "air_conditioning_filter", "name": "Klimaanlagenfilter reinigen", "category": "ventilation", "area_name": "Haus", "icon": "mdi:air-conditioner", "interval": 180, "interval_unit": "days", "priority": 3, "schedule_mode": "seasonal", "season": "spring", "description": "Filter und sichtbare Kondensatbereiche vor der Kühlsaison reinigen.", "tags": ["klimaanlage", "filter", "frühling"], "popular": True},
    {"id": "leak_detector_test", "name": "Wassermelder testen", "category": "water", "area_name": "Haus", "icon": "mdi:water-alert-outline", "interval": 180, "interval_unit": "days", "priority": 4, "description": "Wassermelder auslösen, Batterie und Benachrichtigung prüfen.", "tags": ["wasser", "leckage", "melder", "sicherheit"], "recommended": True},
    {"id": "backflow_preventer_check", "name": "Rückflussverhinderer prüfen", "category": "water", "area_name": "Hausanschlussraum", "icon": "mdi:valve-closed", "interval": 365, "interval_unit": "days", "priority": 3, "description": "Rückflussverhinderer und sichtbare Armaturen auf Zustand und Leckagen prüfen.", "tags": ["wasser", "armatur", "rückfluss"]},
    {"id": "outdoor_socket_check", "name": "Außensteckdosen Sichtprüfung", "category": "electrical", "area_name": "Außenbereich", "icon": "mdi:power-socket-de", "interval": 365, "interval_unit": "days", "priority": 4, "schedule_mode": "seasonal", "season": "spring", "description": "Abdeckungen, Dichtungen und sichtbare Beschädigungen der Außensteckdosen prüfen.", "tags": ["elektrik", "außen", "steckdose", "frühling"]},
    {"id": "ev_charger_visual", "name": "Wallbox Sichtprüfung", "category": "electrical", "area_name": "Garage", "icon": "mdi:ev-station", "interval": 180, "interval_unit": "days", "priority": 4, "description": "Kabel, Stecker, Gehäuse und Fehlermeldungen der Ladeeinrichtung prüfen.", "tags": ["wallbox", "elektroauto", "laden", "garage"]},
    {"id": "escape_routes_check", "name": "Fluchtwege prüfen", "category": "safety", "area_name": "Haus", "icon": "mdi:exit-run", "interval": 180, "interval_unit": "days", "priority": 4, "description": "Fluchtwege freihalten und wichtige Schlüssel sowie Öffnungswege prüfen.", "tags": ["fluchtweg", "sicherheit", "brandschutz"]},
    {"id": "emergency_lighting_test", "name": "Notbeleuchtung testen", "category": "safety", "area_name": "Haus", "icon": "mdi:lightbulb-alert-outline", "interval": 180, "interval_unit": "days", "priority": 3, "description": "Akkuleuchten und Taschenlampen auf Funktion und Ladestand prüfen.", "tags": ["notbeleuchtung", "akku", "sicherheit"]},
    {"id": "solar_backup_operation", "name": "Ersatzstrombetrieb testen", "category": "solar", "area_name": "Technikraum", "icon": "mdi:home-lightning-bolt-outline", "interval": 365, "interval_unit": "days", "priority": 4, "description": "Sofern vorhanden, Ersatzstrom- oder Notstrombetrieb kontrolliert testen.", "tags": ["solar", "ersatzstrom", "notstrom", "speicher"]},
    {"id": "pond_filter_service", "name": "Teichfilter warten", "category": "garden", "area_name": "Garten", "icon": "mdi:water-circle", "interval": 90, "interval_unit": "days", "priority": 2, "schedule_mode": "seasonal", "season": "spring", "description": "Pumpe, Filtermedien, Schläuche und sichtbare Dichtungen prüfen.", "tags": ["teich", "pumpe", "filter", "garten"]},
    {"id": "garden_furniture_winterize", "name": "Gartenmöbel einwintern", "category": "garden", "area_name": "Außenbereich", "icon": "mdi:table-chair", "interval": 365, "interval_unit": "days", "priority": 2, "schedule_mode": "seasonal", "season": "autumn", "description": "Gartenmöbel reinigen, trocknen und geschützt einlagern.", "tags": ["gartenmöbel", "winter", "herbst"]},
    {"id": "basement_moisture_check", "name": "Keller auf Feuchtigkeit prüfen", "category": "building", "area_name": "Keller", "icon": "mdi:home-flood", "interval": 90, "interval_unit": "days", "priority": 4, "description": "Wände, Böden und typische Problemstellen auf Feuchtigkeit oder Geruch prüfen.", "tags": ["keller", "feuchtigkeit", "gebäude"], "popular": True},
    {"id": "silicone_joints_check", "name": "Silikonfugen prüfen", "category": "building", "area_name": "Bad", "icon": "mdi:format-paint", "interval": 365, "interval_unit": "days", "priority": 3, "description": "Silikonfugen in Nassbereichen auf Risse, Ablösung und Schimmel prüfen.", "tags": ["silikon", "fugen", "bad", "feuchtigkeit"]},
    {"id": "garage_emergency_release", "name": "Garagentor-Notentriegelung testen", "category": "garage", "area_name": "Garage", "icon": "mdi:garage-alert-variant", "interval": 365, "interval_unit": "days", "priority": 4, "description": "Notentriegelung und manuelle Bedienbarkeit des Garagentors testen.", "tags": ["garage", "tor", "notentriegelung", "sicherheit"]},
    {"id": "tire_change_spring", "name": "Sommerreifenwechsel vorbereiten", "category": "garage", "area_name": "Garage", "icon": "mdi:tire", "interval": 365, "interval_unit": "days", "priority": 2, "schedule_mode": "seasonal", "season": "spring", "description": "Reifen, Profiltiefe, Luftdruck und Termin für den saisonalen Wechsel prüfen.", "tags": ["reifen", "auto", "frühling", "garage"]},
    {"id": "tire_change_autumn", "name": "Winterreifenwechsel vorbereiten", "category": "garage", "area_name": "Garage", "icon": "mdi:tire", "interval": 365, "interval_unit": "days", "priority": 3, "schedule_mode": "seasonal", "season": "autumn", "description": "Winterreifen, Profiltiefe, Luftdruck und Wechseltermin rechtzeitig prüfen.", "tags": ["reifen", "auto", "herbst", "garage"]},
    {"id": "password_emergency_access", "name": "Digitalen Notfallzugang prüfen", "category": "it_network", "area_name": "IT/Netzwerk", "icon": "mdi:key-chain-variant", "interval": 365, "interval_unit": "days", "priority": 4, "description": "Notfallzugang, Wiederherstellungscodes und hinterlegte Kontaktinformationen prüfen.", "tags": ["passwort", "notfall", "recovery", "it"]},
    {"id": "backup_restore_drill", "name": "Backup-Wiederherstellung testen", "category": "it_network", "area_name": "IT/Netzwerk", "icon": "mdi:backup-restore", "interval": 180, "interval_unit": "days", "priority": 5, "description": "Eine repräsentative Datei oder Anwendung testweise aus dem Backup wiederherstellen.", "tags": ["backup", "restore", "test", "it"], "recommended": True, "popular": True},
    {"id": "oven_deep_clean", "name": "Backofen Grundreinigung", "category": "household", "area_name": "Küche", "icon": "mdi:stove", "interval": 180, "interval_unit": "days", "priority": 2, "description": "Backraum, Dichtungen, Bleche und Lüftungsbereiche reinigen.", "tags": ["backofen", "küche", "reinigung"]},
    {"id": "coffee_machine_descale", "name": "Kaffeemaschine entkalken", "category": "household", "area_name": "Küche", "icon": "mdi:coffee-maker", "interval": 90, "interval_unit": "days", "priority": 2, "description": "Entkalkungsprogramm durchführen und zugängliche Brühgruppenbereiche reinigen.", "tags": ["kaffee", "entkalken", "küche"]},
    {"id": "freezer_defrost", "name": "Gefrierschrank abtauen", "category": "household", "area_name": "Küche", "icon": "mdi:fridge-industrial-outline", "interval": 365, "interval_unit": "days", "priority": 2, "schedule_mode": "seasonal", "season": "winter", "description": "Gefriergerät bei Bedarf abtauen, reinigen und Dichtungen prüfen.", "tags": ["gefrierschrank", "abtauen", "reinigung", "winter"]},
    {"id": "annual_property_documents", "name": "Hausunterlagen jährlich prüfen", "category": "general", "area_name": "Haus", "icon": "mdi:folder-home-outline", "interval": 365, "interval_unit": "days", "priority": 2, "schedule_mode": "fixed_date", "calendar_repeat": "yearly", "fixed_month": 1, "fixed_day": 15, "description": "Wichtige Haus-, Versicherungs- und Ansprechpartner-Unterlagen auf Aktualität prüfen.", "tags": ["dokumente", "haus", "jährlich", "organisation"]},
])

POPULAR_TEMPLATE_IDS = {
    "smoke_detector_test",
    "rcd_test",
    "heating_service",
    "water_filter",
    "ventilation_filter",
    "rain_gutter",
    "robot_mower_blades",
    "nas_backup_check",
    "dryer_filter",
    "washing_machine_clean",
    "leak_detector_test",
    "basement_moisture_check",
    "backup_restore_drill",
    "coffee_machine_descale",
}

TEMPLATE_TAGS: dict[str, list[str]] = {
    "heat_pump_filter": ["filter", "wärmepumpe", "heating", "technikraum"],
    "heating_service": ["heizung", "service", "annual", "safety"],
    "ventilation_filter": ["filter", "lüftung", "air", "indoor"],
    "water_filter": ["wasser", "filter", "house connection"],
    "softener_salt": ["wasser", "salz", "enthärtung"],
    "rcd_test": ["fi", "rcd", "elektrik", "sicherheit"],
    "smoke_detector_test": ["rauchmelder", "brandschutz", "sicherheit"],
    "co_detector_test": ["co", "melder", "sicherheit"],
    "solar_storage_check": ["solar", "batterie", "speicher"],
    "pv_inverter_check": ["solar", "wechselrichter", "pv"],
    "robot_mower_blades": ["rasen", "mähroboter", "klingen", "garten"],
    "rain_gutter": ["dachrinne", "laub", "gebäude", "herbst"],
    "nas_backup_check": ["nas", "backup", "restore", "it"],
    "router_update_check": ["router", "firmware", "security", "it"],
    "dryer_filter": ["trockner", "filter", "haushalt"],
    "washing_machine_clean": ["waschmaschine", "pflege", "haushalt"],
}

for item in TEMPLATES:
    item.setdefault("schedule_mode", "interval")
    item.setdefault("recommended", item.get("priority", 0) >= 4 or item.get("id") in {"heating_service", "main_water_valve", "nas_backup_check"})
    item.setdefault("tags", TEMPLATE_TAGS.get(item["id"], [item.get("category", "general")]))
    item.setdefault("popular", item["id"] in POPULAR_TEMPLATE_IDS)
    item.setdefault("common", item["id"] in POPULAR_TEMPLATE_IDS or item.get("priority", 0) >= 4)
    if item.get("schedule_mode") == "seasonal":
        item.setdefault("fixed_month", {"spring": 3, "summer": 6, "autumn": 9, "winter": 12}.get(item.get("season"), 1))
        item.setdefault("fixed_day", 1)
    if item.get("schedule_mode") == "fixed_date":
        item.setdefault("calendar_repeat", "yearly")

TEMPLATE_PACKS: list[dict] = [
    {
        "id": "home_essentials",
        "name": "Haus-Grundausstattung",
        "description": "Die wichtigsten wiederkehrenden Prüfungen für ein Einfamilienhaus.",
        "icon": "mdi:home-heart",
        "recommended": True,
        "template_ids": [
            "smoke_detector_test", "rcd_test", "heating_service", "water_filter",
            "main_water_valve", "rain_gutter", "first_aid_check", "distribution_box_check",
        ],
    },
    {
        "id": "safety_first",
        "name": "Sicherheit",
        "description": "Rauch-, CO-, FI- und Erste-Hilfe-Prüfungen gebündelt.",
        "icon": "mdi:shield-check-outline",
        "recommended": True,
        "template_ids": [
            "smoke_detector_test", "co_detector_test", "rcd_test",
            "fire_extinguisher_check", "first_aid_check", "alarm_system_test",
        ],
    },
    {
        "id": "heating_and_air",
        "name": "Heizung & Raumluft",
        "description": "Heizung, Wärmepumpe, Lüftung und Filter im Blick behalten.",
        "icon": "mdi:heat-pump-outline",
        "template_ids": [
            "heat_pump_filter", "heating_service", "expansion_vessel",
            "radiator_bleed", "ventilation_filter", "bathroom_fan_clean",
        ],
    },
    {
        "id": "garden_season",
        "name": "Garten & Saison",
        "description": "Gartenpflege und saisonale Vorbereitungen für Frühling bis Winter.",
        "icon": "mdi:flower-outline",
        "template_ids": [
            "robot_mower_blades", "lawn_mower_service", "irrigation_check",
            "season_spring_irrigation", "season_robot_mower_winter", "season_autumn_gutter",
        ],
    },
    {
        "id": "solar_and_energy",
        "name": "Solar & Energie",
        "description": "PV-Anlage, Speicher, Wechselrichter und USV regelmäßig prüfen.",
        "icon": "mdi:solar-power-variant-outline",
        "template_ids": [
            "solar_storage_check", "pv_inverter_check", "pv_yield_review",
            "pv_visual_roof", "season_pv_summer_check", "ups_battery_test",
        ],
    },
    {
        "id": "it_and_backup",
        "name": "IT & Backup",
        "description": "Netzwerk, NAS, Router und Wiederherstellbarkeit kontrollieren.",
        "icon": "mdi:server-network",
        "template_ids": [
            "network_rack_check", "nas_backup_check", "router_update_check", "wifi_check", "ups_battery_test",
        ],
    },
    {
        "id": "household_care",
        "name": "Haushaltsgeräte",
        "description": "Pflegeintervalle für typische Haushaltsgeräte.",
        "icon": "mdi:washing-machine",
        "template_ids": [
            "dryer_filter", "washing_machine_clean", "dishwasher_clean",
            "refrigerator_coils", "vacuum_robot", "air_purifier_filter",
            "oven_deep_clean", "coffee_machine_descale", "freezer_defrost",
        ],
    },
    {
        "id": "water_and_leak_safety",
        "name": "Wasser & Leckageschutz",
        "description": "Filter, Absperrungen und Wassermelder für die Hausinstallation.",
        "icon": "mdi:water-alert-outline",
        "template_ids": [
            "water_filter", "main_water_valve", "leak_detector_test",
            "backflow_preventer_check", "softener_salt", "siphon_clean",
        ],
    },
    {
        "id": "building_envelope",
        "name": "Gebäude & Feuchtigkeit",
        "description": "Dach, Fassade, Keller, Fenster und Nassbereiche im Blick behalten.",
        "icon": "mdi:home-search-outline",
        "template_ids": [
            "roof_inspection", "rain_gutter", "facade_check", "window_seals",
            "basement_moisture_check", "silicone_joints_check",
        ],
    },
    {
        "id": "garage_and_mobility",
        "name": "Garage & Mobilität",
        "description": "Garagentor, Ladeeinrichtung und saisonale Fahrzeugvorbereitung.",
        "icon": "mdi:garage-variant",
        "template_ids": [
            "garage_door", "garage_emergency_release", "ev_charger_visual",
            "tire_change_spring", "tire_change_autumn",
        ],
    },
]
