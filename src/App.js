import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MilestoneTracker from "./pages/MilestoneTracker";
// import { LogoutLink } from "./components/LogoutLink";
import { UserDashboard } from "./pages/UserDashboard";
import "./App.css";
import AllMilestones from "./pages/AllMilestones";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="*" element={<HomePage />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/milestoneTracker" element={<MilestoneTracker />} />
          <Route path="/allMilestones" element={<AllMilestones />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
