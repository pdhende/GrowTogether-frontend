import React, { useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import auth from "../utils/auth";

function Navigation() {
  return (
    <>
      <Navbar className="nav-bar" expand="lg">
        <Nav>
          <Nav.Link href="#home" as={Link} to="/">
            Home |
          </Nav.Link>
          <Nav.Link href="#profile" as={Link} to="/dashboard">
            Profile |
          </Nav.Link>
          <Nav.Link href="#milestone" as={Link} to="/milestoneTracker">
            Milestone Tracker |
          </Nav.Link>
          <Nav.Link href="#resources" as={Link} to="/resources">
            Resources |
          </Nav.Link>
          <Nav.Link href="#reminders" as={Link} to="/reminders">
            Reminders |
          </Nav.Link>
          <Nav.Link href="#photos" as={Link} to="/photos">
            Photo Album |
          </Nav.Link>
          <Nav.Link href="#logout" onClick={auth.logout}>
            Logout
          </Nav.Link>
        </Nav>
      </Navbar>
    </>
  );
}

export default Navigation;
