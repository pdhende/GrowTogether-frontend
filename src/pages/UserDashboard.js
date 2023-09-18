/* eslint-disable no-const-assign */
import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, Col, Row, Modal } from "react-bootstrap";
import { NewChild } from "../components/NewChild";
import Header from "../components/Header";
import blankPP from "../images/blank_pp.jpg";
import childImg from "../images/kids.jpg";
import reminderImg from "../images/reminders.jpg";
import findImg from "../images/find.png";

export function UserDashboard() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleClose = () => setShowCreateModal(false);
  const handleShowCreateModal = () => setShowCreateModal(true);

  return (
    <>
      <div>
        <Header />
        <section className="custom-container container">
          <Row>
            <Col className="custom-col" md="3">
              <Row style={{ justifyContent: "center" }}>
                <img className="child-img" src={blankPP}></img>
              </Row>
              <Row>
                <Col>username</Col>
              </Row>
            </Col>
            <Col md="8">
              <Row>
                <Col className="custom-col">
                  <img src={childImg} style={{ width: "5rem" }}></img>Welcome!
                  Add or edit children information here.
                  <Button
                    className="custom-btn custom-all-btn btn-rounded"
                    onClick={handleShowCreateModal}
                  >
                    Add a Child
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col className="custom-col">
                  <img src={reminderImg} style={{ width: "5rem" }}></img> Set
                  Reminders to appointments and much more!
                  <Button className="custom-btn custom-all-btn btn-rounded">
                    Set reminders
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col className="custom-col">
                  <img src={findImg} style={{ width: "5rem" }}></img>Find the
                  best resources to get your questions answered!
                  <Button className="custom-btn custom-all-btn btn-rounded">
                    Find resources
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </section>

        <Modal show={showCreateModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>New Child</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <NewChild />
          </Modal.Body>
          <Modal.Footer>
            {/* <Button variant="primary" onClick={handleClose}>
              Save Child
            </Button> */}
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
