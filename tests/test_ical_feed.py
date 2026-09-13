"""The calendar feed: RFC 5545 shape, and which tasks reach it."""

from __future__ import annotations

import unittest
from datetime import UTC, datetime, timedelta, timezone
from types import SimpleNamespace

try:  # discovery imports these as top level modules, direct runs as a package
    from ._integration import load
except ImportError:
    from _integration import load

ical = load("ical")
NOW = datetime(2026, 9, 13, 8, 0, tzinfo=UTC)


def runtime(status: str, due_at: str | None, schedule_label: str = "every 90 days"):
    return SimpleNamespace(status=status, due_at=due_at, schedule_label=schedule_label)


class EscapingTest(unittest.TestCase):
    def test_escapes_the_reserved_characters(self):
        self.assertEqual(ical.escape_text("a,b;c\\d"), "a\\,b\\;c\\\\d")

    def test_newlines_become_literal_n(self):
        self.assertEqual(ical.escape_text("a\r\nb\nc\rd"), "a\\nb\\nc\\nd")

    def test_none_is_empty(self):
        self.assertEqual(ical.escape_text(None), "")


class FoldingTest(unittest.TestCase):
    def test_short_lines_are_untouched(self):
        self.assertEqual(ical.fold("SUMMARY:short"), ["SUMMARY:short"])

    def test_long_lines_are_folded_with_a_leading_space(self):
        chunks = ical.fold("SUMMARY:" + "x" * 200)
        self.assertGreater(len(chunks), 1)
        self.assertTrue(all(chunk.startswith(" ") for chunk in chunks[1:]))
        self.assertEqual("".join([chunks[0], *[chunk[1:] for chunk in chunks[1:]]]), "SUMMARY:" + "x" * 200)

    def test_no_line_exceeds_the_octet_limit(self):
        # Multi byte characters must not be split across the boundary either.
        for chunk in ical.fold("SUMMARY:" + "ü" * 120):
            self.assertLessEqual(len(chunk.encode("utf-8")), ical.MAX_LINE_OCTETS)


class TimestampTest(unittest.TestCase):
    def test_renders_utc(self):
        self.assertEqual(ical.format_timestamp(NOW), "20260913T080000Z")

    def test_converts_from_another_offset(self):
        berlin = timezone(timedelta(hours=2))
        self.assertEqual(ical.format_timestamp(datetime(2026, 9, 13, 10, 0, tzinfo=berlin)), "20260913T080000Z")

    def test_naive_datetimes_are_treated_as_utc(self):
        self.assertEqual(ical.format_timestamp(datetime(2026, 9, 13, 8, 0)), "20260913T080000Z")


class FeedEventsTest(unittest.TestCase):
    def setUp(self):
        self.tasks = [
            {"id": "t1", "name": "Boiler service", "priority": 5, "area_name": "Cellar", "enabled": True},
            {"id": "t2", "name": "Mower blades", "priority": 2, "enabled": True},
            {"id": "t3", "name": "Snoozed", "priority": 3, "enabled": True},
            {"id": "t4", "name": "Disabled", "priority": 3, "enabled": False},
            {"id": "t5", "name": "Deleted", "priority": 3, "enabled": True, "deleted": True},
            {"id": "t6", "name": "No sensor", "priority": 3, "enabled": True},
            {"id": "t7", "name": "No due date", "priority": 3, "enabled": True},
        ]
        self.runtimes = {
            "t1": runtime("overdue", (NOW - timedelta(days=12)).isoformat()),
            "t2": runtime("ok", (NOW + timedelta(days=20)).isoformat()),
            "t3": runtime("snoozed", (NOW + timedelta(days=5)).isoformat()),
            "t4": runtime("disabled", None),
            "t5": runtime("deleted", None),
            "t6": runtime("unavailable", None),
            "t7": runtime("ok", None),
        }

    def build(self, **kwargs):
        return ical.feed_events(self.tasks, lambda task: self.runtimes[task["id"]], **kwargs)

    def test_only_scheduled_open_tasks_reach_the_feed(self):
        self.assertEqual([event["summary"] for event in self.build()], ["Boiler service", "Mower blades"])

    def test_snoozed_tasks_can_be_included(self):
        summaries = [event["summary"] for event in self.build(include_snoozed=True)]
        self.assertIn("Snoozed", summaries)

    def test_events_are_ordered_by_due_date(self):
        starts = [event["start"] for event in self.build()]
        self.assertEqual(starts, sorted(starts))

    def test_duration_is_clamped(self):
        for minutes, expected in ((5, 15), (60, 60), (99999, 1440)):
            event = self.build(duration_minutes=minutes)[0]
            self.assertEqual(event["end"] - event["start"], timedelta(minutes=expected))

    def test_uid_is_stable_per_task_and_day(self):
        self.assertEqual(self.build()[0]["uid"], self.build()[0]["uid"])
        self.assertTrue(self.build()[0]["uid"].startswith("maintenance-dashboard-t1-"))

    def test_description_carries_priority_and_schedule(self):
        event = self.build(priority_label=lambda value: {5: "Critical"}.get(value, str(value)))[0]
        self.assertEqual(event["description"], "Critical (5/5) · every 90 days")

    def test_area_becomes_the_location(self):
        events = self.build()
        self.assertEqual(events[0]["location"], "Cellar")
        self.assertIsNone(events[1]["location"])

    def test_unparsable_due_dates_are_skipped(self):
        self.runtimes["t1"] = runtime("overdue", "not a date")
        self.assertEqual([event["summary"] for event in self.build()], ["Mower blades"])


class CalendarDocumentTest(unittest.TestCase):
    def document(self, events=()):
        return ical.build_calendar(events, name="Maintenance", now=NOW)

    def test_wraps_the_events(self):
        text = self.document()
        self.assertTrue(text.startswith("BEGIN:VCALENDAR\r\n"))
        self.assertTrue(text.endswith("END:VCALENDAR\r\n"))
        self.assertIn("VERSION:2.0\r\n", text)

    def test_every_line_ends_with_crlf(self):
        text = self.document([{"uid": "a", "start": NOW, "end": NOW, "summary": "S"}])
        self.assertNotIn("\n", text.replace("\r\n", ""))

    def test_optional_fields_are_omitted(self):
        text = self.document([{"uid": "a", "start": NOW, "end": NOW, "summary": "S"}])
        self.assertNotIn("DESCRIPTION:", text)
        self.assertNotIn("LOCATION:", text)

    def test_event_carries_the_required_properties(self):
        text = self.document([
            {"uid": "a", "start": NOW, "end": NOW + timedelta(hours=1), "summary": "S",
             "description": "D", "location": "L", "status": "overdue"},
        ])
        for expected in ("UID:a", "DTSTAMP:20260913T080000Z", "DTSTART:20260913T080000Z",
                         "DTEND:20260913T090000Z", "SUMMARY:S", "DESCRIPTION:D",
                         "LOCATION:L", "CATEGORIES:overdue"):
            self.assertIn(f"{expected}\r\n", text)


if __name__ == "__main__":
    unittest.main()
