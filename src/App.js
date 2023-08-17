import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navbar";
import MilestoneTracker from "./pages/MilestoneTracker";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Routes>
          <Route path="/milestoneTracker" element={<MilestoneTracker />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
