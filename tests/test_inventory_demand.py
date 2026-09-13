"""Restock alerts from the minimum stock and from the work already due."""

from __future__ import annotations

import unittest
from datetime import UTC, datetime, timedelta

try:  # discovery imports these as top level modules, direct runs as a package
    from ._integration import load
except ImportError:
    from _integration import load

inventory = load("inventory")
NOW = datetime(2026, 9, 13, 12, 0, tzinfo=UTC)


def step(part_id: str, quantity, done: bool = False):
    return {"id": f"s-{part_id}", "label": "Step", "part_id": part_id, "quantity": quantity, "done": done}


class UpcomingDemandTest(unittest.TestCase):
    def setUp(self):
        self.tasks = [
            {"id": "t1", "enabled": True, "checklist": [step("p1", 2), step("p2", 1, done=True)]},
            {"id": "t2", "enabled": True, "checklist": [step("p1", 3)]},
            {"id": "t3", "enabled": True, "checklist": [step("p1", 9)]},
            {"id": "t4", "enabled": False, "checklist": [step("p1", 50)]},
            {"id": "t5", "enabled": True, "deleted": True, "checklist": [step("p1", 50)]},
            {"id": "t6", "enabled": True, "checklist": []},
        ]
        self.due = {
            "t1": (NOW - timedelta(days=2)).isoformat(),
            "t2": (NOW + timedelta(days=10)).isoformat(),
            "t3": (NOW + timedelta(days=200)).isoformat(),
            "t4": NOW.isoformat(),
            "t5": NOW.isoformat(),
            "t6": NOW.isoformat(),
        }

    def demand(self, **kwargs):
        return inventory.upcoming_demand(self.tasks, self.due, now=NOW, **kwargs)

    def test_adds_up_the_parts_of_tasks_inside_the_horizon(self):
        self.assertEqual(self.demand(), {"p1": 5.0})

    def test_overdue_work_counts(self):
        self.assertGreaterEqual(self.demand()["p1"], 2)

    def test_work_beyond_the_horizon_does_not(self):
        self.assertEqual(self.demand(days=365)["p1"], 14.0)

    def test_finished_steps_are_not_booked_again(self):
        self.assertNotIn("p2", self.demand())

    def test_disabled_and_deleted_tasks_are_ignored(self):
        self.assertEqual(self.demand()["p1"], 5.0)

    def test_tasks_without_a_due_date_are_ignored(self):
        self.assertEqual(inventory.upcoming_demand(self.tasks, {}, now=NOW), {})

    def test_steps_without_a_part_or_quantity(self):
        tasks = [{"id": "t", "enabled": True, "checklist": [step("", 5), step("p", 0), step("p", None), "nonsense"]}]
        self.assertEqual(inventory.upcoming_demand(tasks, {"t": NOW.isoformat()}, now=NOW), {})


class RestockAlertTest(unittest.TestCase):
    def setUp(self):
        self.parts = [
            {"id": "p1", "name": "Filter set", "stock": 4, "minimum": 1, "supplier": "Shop"},
            {"id": "p2", "name": "Gasket", "stock": 0, "minimum": 2},
            {"id": "p3", "name": "Screw", "stock": 99, "minimum": 10},
        ]

    def test_without_demand_only_the_minimum_matters(self):
        alerts = inventory.restock_alerts(self.parts)
        self.assertEqual([alert["name"] for alert in alerts], ["Gasket"])
        self.assertEqual(alerts[0]["reason"], "minimum")

    def test_a_part_short_for_upcoming_work_is_listed(self):
        alerts = inventory.restock_alerts(self.parts, {"p1": 5})
        by_name = {alert["name"]: alert for alert in alerts}
        self.assertIn("Filter set", by_name)
        self.assertEqual(by_name["Filter set"]["reason"], "demand")
        self.assertEqual(by_name["Filter set"]["shortfall"], 1)
        self.assertEqual(by_name["Filter set"]["needed"], 5)

    def test_enough_stock_for_the_demand_raises_nothing(self):
        self.assertEqual([alert["name"] for alert in inventory.restock_alerts(self.parts, {"p1": 4, "p3": 20})], ["Gasket"])

    def test_out_of_stock_comes_first(self):
        alerts = inventory.restock_alerts(self.parts, {"p1": 99})
        self.assertEqual(alerts[0]["name"], "Gasket")
        self.assertTrue(alerts[0]["out_of_stock"])

    def test_a_minimum_of_zero_never_alerts_on_its_own(self):
        parts = [{"id": "p", "name": "Spare", "stock": 0, "minimum": 0}]
        self.assertEqual(inventory.restock_alerts(parts), [])
        self.assertEqual(inventory.restock_alerts(parts, {"p": 1})[0]["reason"], "demand")


if __name__ == "__main__":
    unittest.main()
