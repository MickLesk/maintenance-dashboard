"""Matching a spoken task name, and answering what is due."""

from __future__ import annotations

import unittest
from types import SimpleNamespace

try:  # discovery imports these as top level modules, direct runs as a package
    from ._integration import load
except ImportError:
    from _integration import load

intents = load("intents")


class Manager:
    def __init__(self, tasks, runtimes):
        self.tasks = tasks
        self._runtimes = runtimes

    def runtime_for_task(self, task):
        return self._runtimes[task["id"]]


def hass_with(tasks, runtimes):
    return SimpleNamespace(data={"maintenance_dashboard": {"entry": Manager(tasks, runtimes)}})


TASKS = [
    {"id": "t1", "name": "Heizung warten", "enabled": True},
    {"id": "t2", "name": "Lüftungsfilter wechseln", "enabled": True},
    {"id": "t3", "name": "Dachrinne reinigen", "enabled": True},
    {"id": "t4", "name": "Alter Eintrag", "enabled": True, "deleted": True},
    {"id": "t5", "name": "", "enabled": True},
]
RUNTIMES = {
    "t1": SimpleNamespace(status="overdue", due_at="2026-08-31T00:00:00+00:00"),
    "t2": SimpleNamespace(status="warning", due_at="2026-09-21T00:00:00+00:00"),
    "t3": SimpleNamespace(status="ok", due_at="2026-10-28T00:00:00+00:00"),
    "t4": SimpleNamespace(status="deleted", due_at=None),
    "t5": SimpleNamespace(status="ok", due_at=None),
}


class FindTaskTest(unittest.TestCase):
    def setUp(self):
        self.hass = hass_with(TASKS, RUNTIMES)

    def find(self, spoken):
        _, task = intents.find_task(self.hass, spoken)
        return task["id"] if task else None

    def test_exact_name(self):
        self.assertEqual(self.find("Heizung warten"), "t1")

    def test_is_case_and_space_insensitive(self):
        self.assertEqual(self.find("  heizung   WARTEN "), "t1")

    def test_a_contained_name(self):
        self.assertEqual(self.find("Heizung"), "t1")

    def test_speech_around_the_name(self):
        self.assertEqual(self.find("dachrinne reinigen bitte"), "t3")

    def test_falls_back_to_word_overlap(self):
        self.assertEqual(self.find("wechseln"), "t2")

    def test_exact_wins_over_contained(self):
        tasks = [
            {"id": "long", "name": "Filter wechseln im Keller", "enabled": True},
            {"id": "short", "name": "Filter", "enabled": True},
        ]
        runtimes = {"long": SimpleNamespace(status="ok", due_at=None), "short": SimpleNamespace(status="ok", due_at=None)}
        _, task = intents.find_task(hass_with(tasks, runtimes), "Filter")
        self.assertEqual(task["id"], "short")

    def test_deleted_tasks_are_not_matched(self):
        self.assertIsNone(self.find("Alter Eintrag"))

    def test_unknown_name(self):
        self.assertIsNone(self.find("völlig unbekannt"))

    def test_empty_input(self):
        self.assertIsNone(self.find(""))
        self.assertIsNone(self.find("   "))

    def test_without_any_manager(self):
        _, task = intents.find_task(SimpleNamespace(data={}), "Heizung")
        self.assertIsNone(task)


class DueTasksTest(unittest.TestCase):
    def test_lists_warning_critical_and_overdue_worst_first(self):
        rows = intents.due_tasks(hass_with(TASKS, RUNTIMES))
        self.assertEqual([row["name"] for row in rows], ["Heizung warten", "Lüftungsfilter wechseln"])

    def test_orders_by_status_then_due_date(self):
        tasks = [
            {"id": "a", "name": "Später überfällig", "enabled": True},
            {"id": "b", "name": "Früher überfällig", "enabled": True},
            {"id": "c", "name": "Warnung", "enabled": True},
        ]
        runtimes = {
            "a": SimpleNamespace(status="overdue", due_at="2026-09-02T00:00:00+00:00"),
            "b": SimpleNamespace(status="overdue", due_at="2026-08-02T00:00:00+00:00"),
            "c": SimpleNamespace(status="warning", due_at="2026-01-02T00:00:00+00:00"),
        }
        rows = intents.due_tasks(hass_with(tasks, runtimes))
        self.assertEqual([row["name"] for row in rows], ["Früher überfällig", "Später überfällig", "Warnung"])

    def test_disabled_and_deleted_tasks_are_ignored(self):
        tasks = [
            {"id": "a", "name": "Aus", "enabled": False},
            {"id": "b", "name": "Gelöscht", "enabled": True, "deleted": True},
        ]
        runtimes = {"a": SimpleNamespace(status="overdue", due_at=None), "b": SimpleNamespace(status="overdue", due_at=None)}
        self.assertEqual(intents.due_tasks(hass_with(tasks, runtimes)), [])

    def test_nothing_due(self):
        tasks = [{"id": "a", "name": "Alles gut", "enabled": True}]
        runtimes = {"a": SimpleNamespace(status="ok", due_at=None)}
        self.assertEqual(intents.due_tasks(hass_with(tasks, runtimes)), [])


if __name__ == "__main__":
    unittest.main()
