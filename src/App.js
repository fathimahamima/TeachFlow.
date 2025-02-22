import React, { useState } from "react";
import { motion } from "framer-motion";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import * as tf from "@tensorflow/tfjs";
import { signIn, signOut, useSession } from "next-auth/react";

function HomePage({ toggleDarkMode, darkMode }) {
  const { data: session } = useSession();
  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 transition-all duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <motion.h1
        className="text-5xl font-extrabold text-center tracking-tight"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Welcome to TeachFlow
      </motion.h1>
      <p className="text-lg text-center mt-4 max-w-xl">
        AI-powered Teacher Professional Development platform with gamification, analytics, and interactive learning experiences.
      </p>
      <div className="mt-6 flex gap-4">
        <Link to="/features">
          <button className="px-6 py-3 text-lg bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all">
            Explore Features
          </button>
        </Link>
        <button onClick={toggleDarkMode} className="px-6 py-3 text-lg bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-800 transition-all">
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        {!session ? (
          <button onClick={() => signIn()} className="px-6 py-3 text-lg bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all">
            Login / Register
          </button>
        ) : (
          <button onClick={() => signOut()} className="px-6 py-3 text-lg bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-all">
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

function FeaturesPage({ toggleDarkMode, darkMode }) {
  const [trainingRecommendation, setTrainingRecommendation] = useState("");

  const generateRecommendation = () => {
    const data = [
      { name: "Classroom Management Basics", score: 85 },
      { name: "Effective Student Motivation", score: 78 },
      { name: "Gamification in Learning", score: 90 },
      { name: "Interactive Teaching Strategies", score: 88 },
      { name: "Advanced Online Teaching Techniques", score: 75 },
      { name: "Leadership in Education", score: 80 },
    ];
    
    const sortedData = data.sort((a, b) => b.score - a.score);
    setTrainingRecommendation(sortedData[0].name);
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 transition-all duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
      <h1 className="text-4xl font-extrabold">TeachFlow Features</h1>
      <ul className="mt-4 text-lg max-w-xl space-y-2">
        <li>📊 AI-Based Training Recommendations</li>
        <li>🎯 AI Insights on Student Engagement</li>
        <li>🔔 Feedback & Interaction Tracker</li>
        <li>🎮 Gamification for Professional Growth</li>
        <li>🏆 Leaderboard & Performance Metrics</li>
        <li>📈 Implementation Tracking in Classroom</li>
        <li>🎥 Post-Training Tutorials & Best Practices</li>
        <li>📝 Student Performance Monitoring & Reports</li>
        <li>📊 Insights & Performance Analysis</li>
        <li>📱 Mobile-Friendly Access</li>
        <li>🗣️ Real-Time Discussion Forum & Collaboration</li>
        <li>🎨 Interactive Lesson Planning Tool</li>
        <li>📚 Exam Marks Entry & Performance Visualization</li>
      </ul>
      <div className="mt-6 text-center">
        <button onClick={generateRecommendation} className="px-6 py-3 text-lg bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all">
          Get AI Training Recommendation
        </button>
        {trainingRecommendation && (
          <p className="mt-4 text-lg text-blue-400">Recommended: {trainingRecommendation}</p>
        )}
      </div>
      <button onClick={toggleDarkMode} className="mt-6 px-6 py-3 text-lg bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-800 transition-all">
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <Link to="/">
        <button className="mt-6 px-6 py-3 text-lg bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all">
          Back to Home
        </button>
      </Link>
    </div>
  );
}

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage toggleDarkMode={toggleDarkMode} darkMode={darkMode} />} />
        <Route path="/features" element={<FeaturesPage toggleDarkMode={toggleDarkMode} darkMode={darkMode} />} />
      </Routes>
    </Router>
  );
}
