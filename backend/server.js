const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error("MongoDB Connection Error:", err));

// Session & Auth Middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

// Import Routes
const authRoutes = require("./routes/auth");
const feedbackRoutes = require("./routes/feedback");
const leaderboardRoutes = require("./routes/leaderboard");
const aiRoutes = require("./routes/ai");
const trackingRoutes = require("./routes/tracking");  // 🔹 Import Tracking Route

// Use Routes
app.use("/auth", authRoutes);
app.use("/feedback", feedbackRoutes);
app.use("/leaderboard", leaderboardRoutes);
app.use("/ai", aiRoutes);
app.use("/tracking", trackingRoutes);  // 🔹 Use Tracking Route

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
