import React, { useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import MilestoneTracker from "../pages/MilestoneTracker";
import { LogoutLink } from "./LogoutLink";

function Navigation() {
  return (
    <>
      <Navbar expand="lg">
        <Nav>
          <Nav.Link href="#milestone" as={Link} to="/milestoneTracker">
            Milestone Tracker
          </Nav.Link>
          <Nav.Link>
            <LogoutLink />
          </Nav.Link>
        </Nav>
      </Navbar>
    </>
  );
}

export default Navigation;
