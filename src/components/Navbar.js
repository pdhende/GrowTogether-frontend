import React, { useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import MilestoneTracker from "../pages/MilestoneTracker";

function Navigation() {
  return (
    <>
      <Navbar className="nav-bar" expand="lg">
        <Nav>
          <Nav.Link href="#home" as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link href="#milestone" as={Link} to="/milestoneTracker">
            Milestone Tracker
          </Nav.Link>
          <Nav.Link href="#resources" as={Link} to="/resources">
            Resources
          </Nav.Link>
          <Nav.Link href="#reminders" as={Link} to="/reminders">
            Reminders
          </Nav.Link>
          <Nav.Link href="#reminders" as={Link} to="/photos">
            Photo Album
          </Nav.Link>
          <Nav.Link href="#logout" as={Link} to="/logout">
            Logout
          </Nav.Link>
        </Nav>
      </Navbar>
    </>
  );
}

export default Navigation;
