import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { SessionProvider } from "next-auth/react";
import { motion } from "framer-motion";
import { signIn, signOut, useSession } from "next-auth/react";
import * as tf from "@tensorflow/tfjs";
import { FaBars, FaTimes } from "react-icons/fa";

import Features from "./routes/Features";
import Feedback from "./routes/Feedback";
import Leaderboard from "./routes/Leaderboard";
import Dashboard from "./routes/components/Dashboard";
import Courses from "./routes/components/Courses";
import Analytics from "./routes/components/Analytics";
import DarkModeToggle from "./routes/components/DarkModeToggle";
import "./App.css";

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
        <img src="/logo.png" alt="TeachFlow Logo" width="120" />
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
        <Link to="/feedback">
          <button className="px-6 py-3 text-lg bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition-all">
            Student Feedback
          </button>
        </Link>
        <Link to="/leaderboard">
          <button className="px-6 py-3 text-lg bg-yellow-600 text-white rounded-lg shadow-md hover:bg-yellow-700 transition-all">
            Leaderboard
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

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <SessionProvider>
      <Router>
        <div className={`app-container ${darkMode ? "dark" : "light"}`}>
          <header className="header">
            <div className="logo">TeachFlow</div>
            <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
            <nav className={`nav-menu ${sidebarOpen ? "open" : ""}`}>
              <ul>
                <li><Link to="/" onClick={() => setSidebarOpen(false)}>Home</Link></li>
                <li><Link to="/dashboard" onClick={() => setSidebarOpen(false)}>Dashboard</Link></li>
                <li><Link to="/courses" onClick={() => setSidebarOpen(false)}>Courses</Link></li>
                <li><Link to="/feedback" onClick={() => setSidebarOpen(false)}>Feedback</Link></li>
                <li><Link to="/analytics" onClick={() => setSidebarOpen(false)}>Analytics</Link></li>
              </ul>
            </nav>
            <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
          </header>

          <main>
            <Routes>
              <Route path="/" element={<HomePage toggleDarkMode={toggleDarkMode} darkMode={darkMode} />} />
              <Route path="/features" element={<Features />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
          </main>
        </div>
      </Router>
    </SessionProvider>
  );
}
