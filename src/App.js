import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MilestoneTracker from "./pages/MilestoneTracker";
import { UserDashboard } from "./pages/UserDashboard";
import "./App.css";
import AllMilestones from "./pages/AllMilestones";
import Resources from "./pages/Resources";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="*" element={<HomePage />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/milestoneTracker" element={<MilestoneTracker />} />
          <Route path="/allMilestones" element={<AllMilestones />} />
          <Route path="/resources" element={<Resources />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
