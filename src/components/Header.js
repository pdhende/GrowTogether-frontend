import React, { useState } from "react";
import Navigation from "../components/Navbar";
import AppLogo from "../images/grow-together-logo.png";
import { Container, Row, Col } from "react-bootstrap";

function Header() {
  return (
    <>
      <Container fluid>
        <Row className="header-color"></Row>
        <Row>
          <div>
            <img src={AppLogo} className="app-logo" />
          </div>
        </Row>
        <Row className="header-color"></Row>
      </Container>
    </>
  );
}

export default Header;
