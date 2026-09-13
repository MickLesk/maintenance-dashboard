"""Panel appearance and the lifecycle of the calendar feed token."""

from __future__ import annotations

import unittest

try:  # discovery imports these as top level modules, direct runs as a package
    from ._integration import load
except ImportError:
    from _integration import load

settings = load("settings")


def native(patch=None):
    return settings.normalize_settings({"native_platforms": patch or {}})["native_platforms"]


def dashboard(patch=None):
    return settings.normalize_settings({"dashboard": patch or {}})["dashboard"]


class PanelThemeTest(unittest.TestCase):
    def test_defaults_to_following_home_assistant(self):
        self.assertEqual(settings.default_settings()["dashboard"]["theme"], "auto")

    def test_accepts_the_three_choices(self):
        for value in ("auto", "dark", "light"):
            self.assertEqual(dashboard({"theme": value})["theme"], value)

    def test_falls_back_for_anything_else(self):
        for value in ("neon", "", None, 5):
            self.assertEqual(dashboard({"theme": value})["theme"], "auto")


class CalendarFeedTokenTest(unittest.TestCase):
    def test_the_feed_is_off_and_has_no_token(self):
        defaults = settings.default_settings()["native_platforms"]
        self.assertFalse(defaults["ical_enabled"])
        self.assertEqual(defaults["ical_token"], "")

    def test_switching_it_on_creates_a_token(self):
        result = native({"ical_enabled": True})
        self.assertTrue(result["ical_enabled"])
        self.assertGreaterEqual(len(result["ical_token"]), 24)

    def test_an_existing_token_survives_a_reload(self):
        token = native({"ical_enabled": True})["ical_token"]
        self.assertEqual(native({"ical_enabled": True, "ical_token": token})["ical_token"], token)

    def test_clearing_the_token_hands_out_a_new_one(self):
        token = native({"ical_enabled": True})["ical_token"]
        rotated = native({"ical_enabled": True, "ical_token": ""})["ical_token"]
        self.assertNotEqual(rotated, token)
        self.assertGreaterEqual(len(rotated), 24)

    def test_switching_it_off_drops_the_token(self):
        token = native({"ical_enabled": True})["ical_token"]
        self.assertEqual(native({"ical_enabled": False, "ical_token": token})["ical_token"], "")

    def test_tokens_are_not_predictable(self):
        tokens = {native({"ical_enabled": True})["ical_token"] for _ in range(20)}
        self.assertEqual(len(tokens), 20)

    def test_the_switch_is_coerced_to_a_boolean(self):
        self.assertIs(native({"ical_enabled": "yes"})["ical_enabled"], True)
        self.assertIs(native({"ical_enabled": 0})["ical_enabled"], False)


if __name__ == "__main__":
    unittest.main()
