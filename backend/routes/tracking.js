const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Tracking Model
const Tracking = mongoose.model("Tracking", new mongoose.Schema({
  teacherId: String,
  courseName: String,
  status: { type: String, enum: ["Not Started", "In Progress", "Completed"], default: "Not Started" },
  implementationDetails: String,
  lastUpdated: { type: Date, default: Date.now }
}));

// ✅ Update Training Status
router.post("/update", async (req, res) => {
  try {
    const { teacherId, courseName, status, implementationDetails } = req.body;
    let tracking = await Tracking.findOne({ teacherId, courseName });

    if (tracking) {
      tracking.status = status;
      tracking.implementationDetails = implementationDetails || tracking.implementationDetails;
      tracking.lastUpdated = Date.now();
    } else {
      tracking = new Tracking({ teacherId, courseName, status, implementationDetails });
    }

    await tracking.save();
    res.json({ message: "Tracking updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating tracking", error });
  }
});

// 📊 Get Tracking Data for a Teacher
router.get("/:teacherId", async (req, res) => {
  try {
    const trackingData = await Tracking.find({ teacherId: req.params.teacherId });
    res.json(trackingData);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving tracking data", error });
  }
});

module.exports = router;
