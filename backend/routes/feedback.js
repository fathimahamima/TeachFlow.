const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Feedback Model
const Feedback = mongoose.model("Feedback", new mongoose.Schema({
  teacherId: String,
  studentId: String,
  feedback: String,
  timestamp: { type: Date, default: Date.now }
}));

// Submit Feedback
router.post("/submit", async (req, res) => {
  try {
    const newFeedback = new Feedback(req.body);
    await newFeedback.save();
    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error submitting feedback", error });
  }
});

// Get Feedback for a Teacher
router.get("/:teacherId", async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ teacherId: req.params.teacherId });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving feedback", error });
  }
});

module.exports = router;
