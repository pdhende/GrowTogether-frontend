/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/alt-text */
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
import { Link } from "react-router-dom";

export function UserDashboard() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [users, setUsers] = useState([]);

  const handleShowCreateModal = () => {
    setShowCreateModal(true);
  };

  const handleIndexUsers = () => {
    console.log("handleIndexUser");
    axios.get("http://localhost:3000/users.json").then((response) => {
      console.log(response.data);

      // Convert the single user object into an array with one element
      const userArray = [response.data];

      setUsers(userArray);
    });
  };

  const handleClose = () => setShowCreateModal(false);

  useEffect(() => {
    handleIndexUsers();
  }, []); // Call handleIndexUsers when the component mounts

  return (
    <>
      <div>
        <Header />
        <div className="background-img">
          <section className="custom-container container">
            <Row>
              <Col className="custom-col" md="3">
                <Row style={{ justifyContent: "center" }}>
                  <>
                    {users.length > 0 ? (
                      users.map((user, index) => (
                        <div key={index}>
                          {user.profilePicURL ? (
                            <img
                              src={user.profilePicURL}
                              alt={`Profile Picture of ${user.name}`}
                              style={{
                                width: "200px",
                                height: "200px",
                                borderRadius: "50%",
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            <span>{`Profile Puctire of ${user.name}`}</span>
                          )}
                          <Col>
                            <span style={{ fontSize: "1.3rem" }}>{user.name}</span>
                          </Col>
                          <Col>
                            <span style={{ fontSize: "1.3rem" }}>{user.email}</span>
                          </Col>
                        </div>
                      ))
                    ) : (
                      <p>Loading...</p> // Show a loading message while data is being fetched
                    )}
                  </>
                </Row>
              </Col>
              <Col md="8">
                <Row>
                  <Col className="custom-col" style={{ paddingBottom: "1%" }}>
                    <img src={childImg} style={{ width: "5rem" }}></img>
                    <span style={{ fontSize: "1.3rem" }}>Welcome! Add or edit children information here.</span>
                    <Button className="custom-btn custom-all-btn btn-rounded" onClick={handleShowCreateModal}>
                      <span style={{ fontSize: "1.2rem" }}> Add a Child</span>
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col className="custom-col" style={{ paddingBottom: "1%" }}>
                    <img src={reminderImg} style={{ width: "5rem" }}></img>
                    <span style={{ fontSize: "1.3rem" }}>Set Reminders to appointments and much more!</span>
                    <Button className="custom-btn custom-all-btn btn-rounded">
                      <Link to="/reminders" className="custom-link-dashboard">
                        <span style={{ fontSize: "1.2rem" }}>Set Reminders</span>
                      </Link>
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col className="custom-col" style={{ paddingBottom: "1%" }}>
                    <img src={findImg} style={{ width: "5rem" }}></img>
                    <span style={{ fontSize: "1.3rem" }}>Find the best resources to get your questions answered!</span>
                    <Button className="custom-btn custom-all-btn btn-rounded">
                      <Link to="/resources" className="custom-link-dashboard">
                        <span style={{ fontSize: "1.2rem" }}>Find resources</span>
                      </Link>
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </section>
        </div>

        <Modal show={showCreateModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>New Child</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <NewChild setShowCreateModal={setShowCreateModal} />
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
