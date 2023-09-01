import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MilestoneTracker from "./pages/MilestoneTracker";
import "./App.css";
// import { ChildrenIndex } from "./components/ChildrenIndex";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
        <Routes>
          <Route path="/milestoneTracker" element={<MilestoneTracker />} />
        </Routes>
        {/* <Routes>
          <Route path="/children" element={<ChildrenIndex />} />
        </Routes> */}
      </Router>
    </div>
  );
}

export default App;
