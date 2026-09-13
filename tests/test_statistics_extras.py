"""The completion calendar, the backlog and the lifetime cost of a device."""

from __future__ import annotations

import unittest
from datetime import UTC, datetime, timedelta

try:  # discovery imports these as top level modules, direct runs as a package
    from ._integration import load
except ImportError:
    from _integration import load

analytics = load("analytics")
NOW = datetime(2026, 9, 13, 12, 0, tzinfo=UTC)


def completion(task_id: str, when: datetime, cost=None, undone=False):
    event = {
        "id": f"h-{task_id}-{when.isoformat()}",
        "type": "completed",
        "task_id": task_id,
        "created_at": when.isoformat(),
        "details": {"completion": {}},
    }
    if cost is not None:
        event["details"]["completion"]["cost"] = cost
    if undone:
        event["undone_at"] = when.isoformat()
    return event


class ActivityTest(unittest.TestCase):
    def test_counts_completions_per_day(self):
        history = [
            completion("a", NOW.replace(month=3, day=4, hour=9)),
            completion("b", NOW.replace(month=3, day=4, hour=18)),
            completion("c", NOW.replace(month=7, day=19)),
        ]
        activity = analytics.build_activity(history, 2026)
        self.assertEqual(activity["days"], {"2026-03-04": 2, "2026-07-19": 1})
        self.assertEqual(activity["total"], 3)
        self.assertEqual(activity["active_days"], 2)
        self.assertEqual(activity["max"], 2)
        self.assertEqual(activity["busiest"], {"date": "2026-03-04", "count": 2})

    def test_ignores_other_years(self):
        history = [completion("a", NOW.replace(year=2025))]
        self.assertEqual(analytics.build_activity(history, 2026)["total"], 0)

    def test_ignores_undone_completions(self):
        history = [completion("a", NOW, undone=True)]
        self.assertEqual(analytics.build_activity(history, 2026)["total"], 0)

    def test_empty_history(self):
        activity = analytics.build_activity([], 2026)
        self.assertEqual(activity["total"], 0)
        self.assertEqual(activity["max"], 0)
        self.assertIsNone(activity["busiest"])


class BacklogTest(unittest.TestCase):
    def setUp(self):
        self.tasks = [
            {"id": "a", "name": "Heating", "priority": 5, "enabled": True},
            {"id": "b", "name": "Filter", "priority": 2, "enabled": True},
            {"id": "c", "name": "Disabled", "priority": 3, "enabled": False},
            {"id": "d", "name": "Deleted", "priority": 3, "enabled": True, "deleted": True},
            {"id": "e", "name": "Future", "priority": 3, "enabled": True},
            {"id": "f", "name": "No due date", "priority": 3, "enabled": True},
        ]
        self.due = {
            "a": (NOW - timedelta(days=12)).isoformat(),
            "b": (NOW - timedelta(days=3)).isoformat(),
            "c": (NOW - timedelta(days=99)).isoformat(),
            "d": (NOW - timedelta(days=99)).isoformat(),
            "e": (NOW + timedelta(days=5)).isoformat(),
            "f": None,
        }

    def test_sums_the_overdue_days_of_open_tasks(self):
        backlog = analytics.build_backlog(self.tasks, self.due, now=NOW)
        self.assertEqual(backlog["total_days"], 15.0)
        self.assertEqual(backlog["tasks"], 2)

    def test_weights_by_priority(self):
        backlog = analytics.build_backlog(self.tasks, self.due, now=NOW)
        self.assertEqual(backlog["weighted_days"], 12 * 5 + 3 * 2)

    def test_worst_offenders_come_first(self):
        backlog = analytics.build_backlog(self.tasks, self.due, now=NOW)
        self.assertEqual([entry["name"] for entry in backlog["worst"]], ["Heating", "Filter"])

    def test_worst_is_capped(self):
        tasks = [{"id": str(index), "name": str(index), "priority": 3, "enabled": True} for index in range(12)]
        due = {str(index): (NOW - timedelta(days=index + 1)).isoformat() for index in range(12)}
        self.assertEqual(len(analytics.build_backlog(tasks, due, now=NOW)["worst"]), 5)

    def test_nothing_overdue(self):
        backlog = analytics.build_backlog(self.tasks, {"e": self.due["e"]}, now=NOW)
        self.assertEqual(backlog["tasks"], 0)
        self.assertEqual(backlog["total_days"], 0)
        self.assertEqual(backlog["worst"], [])


class AssetCostTest(unittest.TestCase):
    def setUp(self):
        self.tasks = [
            {"id": "t1", "asset_id": "boiler"},
            {"id": "t2", "asset_id": "boiler"},
            {"id": "t3", "asset_id": None},
        ]

    def test_sums_cost_and_runs_per_device(self):
        history = [
            completion("t1", NOW.replace(year=2024, month=3), cost=120),
            completion("t2", NOW.replace(year=2025, month=6), cost=80.5),
            completion("t1", NOW.replace(year=2026, month=1)),
            completion("t3", NOW.replace(year=2026, month=2), cost=999),
        ]
        totals = analytics.build_asset_costs(history, self.tasks)
        self.assertEqual(set(totals), {"boiler"})
        self.assertEqual(totals["boiler"]["cost"], 200.5)
        self.assertEqual(totals["boiler"]["completions"], 3)

    def test_tracks_the_first_and_last_completion(self):
        history = [
            completion("t1", NOW.replace(year=2026, month=1)),
            completion("t2", NOW.replace(year=2024, month=3)),
        ]
        totals = analytics.build_asset_costs(history, self.tasks)
        self.assertTrue(totals["boiler"]["first"].startswith("2024-03"))
        self.assertTrue(totals["boiler"]["last"].startswith("2026-01"))

    def test_ignores_undone_completions(self):
        history = [completion("t1", NOW, cost=50, undone=True)]
        self.assertEqual(analytics.build_asset_costs(history, self.tasks), {})

    def test_tasks_without_a_device_are_ignored(self):
        history = [completion("t3", NOW, cost=999)]
        self.assertEqual(analytics.build_asset_costs(history, self.tasks), {})


if __name__ == "__main__":
    unittest.main()
