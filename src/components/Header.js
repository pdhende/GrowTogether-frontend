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
          <Col>
            <img src={AppLogo} className="app-logo" />
          </Col>
          {/* <Col>
            <Navigation />
          </Col> */}
        </Row>
        <Row className="header-color"></Row>
        {localStorage.jwt !== undefined ? (
          <Row>
            <Navigation />
          </Row>
        ) : null}
      </Container>
    </>
  );
}

export default Header;
