const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Leaderboard Model
const Leaderboard = mongoose.model("Leaderboard", new mongoose.Schema({
  teacherId: String,
  points: Number,
  name: String
}));

// Get Leaderboard Rankings
router.get("/", async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find().sort({ points: -1 });
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving leaderboard", error });
  }
});
router.get("/", (req, res) => {
  res.json({ message: "Leaderboard Route is Working!" });
});

module.exports = router;
