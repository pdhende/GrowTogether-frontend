import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MilestoneTracker from "./pages/MilestoneTracker";
import { LogoutLink } from "./components/LogoutLink";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="*" element={<HomePage />} />
          <Route path="/milestoneTracker" element={<MilestoneTracker />} />
          {/* <Route path="/logout" element={<LogoutLink />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
