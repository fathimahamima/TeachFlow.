const express = require("express");
const router = express.Router();
const passport = require("passport");

// Login Route
router.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({ message: "Login successful", user: req.user });
});

// Logout Route
router.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.json({ message: "Logout successful" });
  });
});

// Get User Session
router.get("/session", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});
router.get("/", (req, res) => {
  res.json({ message: "Auth Route is Working!" });
});

module.exports = router;
