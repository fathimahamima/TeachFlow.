const express = require("express");
const router = express.Router();

// AI Training Recommendation
router.post("/recommend", (req, res) => {
  const courses = [
    { name: "Classroom Management Basics", score: 85 },
    { name: "Effective Student Motivation", score: 78 },
    { name: "Gamification in Learning", score: 90 },
    { name: "Interactive Teaching Strategies", score: 88 },
  ];
  
  const recommendation = courses.sort((a, b) => b.score - a.score)[0];
  res.json({ recommendedCourse: recommendation.name });
});

module.exports = router;
