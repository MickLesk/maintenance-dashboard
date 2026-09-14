# Data, backups and recovery

Where the data lives, how it is checked and how it is restored.

## Data integrity and recovery

Version 1.6.0 introduces an application-level storage schema with additive migrations. Existing unknown fields are preserved, the Home Assistant Store serializer version remains stable, and a safety backup can be created before migration.

The integrity engine checks tasks, history, backups, notification state, quarantine and audit records. It detects duplicate or missing IDs, invalid schedules and thresholds, broken timestamps, orphaned references and malformed backup snapshots.

Safe problems can be repaired automatically. Records that cannot be normalized are moved to quarantine instead of being deleted. Quarantined data can be inspected, exported, restored or deliberately removed from the Data Safety dialog.

Home Assistant Repairs issues are created for:

- Data-integrity errors
- Failed storage migrations
- Invalid or missing notify services
- Unreadable backup records

The technical audit log records task mutations, settings changes, imports, backups, restores, repairs and bulk operations with timestamps, source information and before/after data where available.

## Backup and import workflow

Automatic backups are rotated by configurable maximum count and age. Manual backups can be named and pinned; pinned backups are excluded from automatic rotation.

Backup snapshots can include:

- Tasks
- History
- Settings
- Notification state and delivery history
- Quarantine
- Audit log

Before restoring, the panel can calculate a task-level diff showing added, removed and changed tasks with field-level before/after values. Restore can target complete sections or selected changed tasks only. A fresh safety backup is created before restore when enabled.

JSON import uses a staged workflow:

1. Parse and validate the payload.
2. Normalize records without dropping unknown fields.
3. Show an import preview and integrity result.
4. Create a safety backup.
5. Apply replace or merge mode.
6. Handle duplicate IDs by skipping, overwriting or generating new IDs.
7. Run a post-import integrity check.

A failed import restores the pre-import in-memory state and leaves the existing storage unchanged.

## Data storage and safety

Maintenance Dashboard does not store task definitions in Lovelace configuration and does not use the Recorder database as its primary application database. It uses Home Assistant's internal storage layer for:

```text
maintenance_dashboard.tasks
maintenance_dashboard.history
maintenance_dashboard.backups
maintenance_dashboard.settings
maintenance_dashboard.notification_state
maintenance_dashboard.meta
maintenance_dashboard.quarantine
maintenance_dashboard.audit
```

Safety behavior:

- A backup is created before task mutations and full imports.
- Deletes are soft deletes where possible.
- Completion events preserve the previous task state for undo.
- Existing warning and critical thresholds are retained during partial updates.
- Older task records are normalized additively when loaded.
- Unknown task fields are preserved where possible.
- Full JSON export/import is available from the Data Safety dialog, including notification settings, delivery history and deduplication state.
- Storage documents are migrated additively through the integration-owned schema version.
- Invalid records are quarantined rather than silently removed.
- Automatic backup rotation honors pinned backups.
- Backup diff and selective restore preserve sections that were not selected.
- Imports are previewed and rolled back in memory when validation or persistence fails.

## Devices and their papers

The documents module gives every device a folder holding invoices, proofs,
warranties, manuals, meter readings and photos. Anything without a device lands
in an unfiled folder.

Each folder also shows what the device has cost so far and how many maintenance
runs it has had since the first recorded completion, which is the number behind
repairing or replacing it.

Warranties and maintenance contracts that expire within 60 days are listed at
the top of the documents page and raise an integrity warning.
