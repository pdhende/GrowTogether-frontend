import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/customGT.css";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import { Row, Col, Button } from "react-bootstrap";
import { Navbar, Nav, Container, Modal, Tab } from "react-bootstrap";
import auth from "../utils/auth";

function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const [formType, setFormType] = useState("");

  return (
    <>
      <div>
        <Header />
        <section>
          <div className="home-img"></div>
          <div className="overlay"></div>
        </section>
        <section>
          <Row className="home-content">A Parent Friendly App</Row>
          {localStorage.jwt === undefined ? (
            <>
              <Row className="home-content-btn">
                <Col>
                  <Button
                    className="custom-btn"
                    onClick={() => {
                      setShowModal(true);
                      setFormType("signIn");
                    }}
                  >
                    Sign In
                  </Button>
                  <Button
                    className="custom-btn btn-rounded"
                    onClick={() => {
                      setShowModal(true);
                      setFormType("signOut");
                    }}
                  >
                    Sign Up
                  </Button>
                </Col>
              </Row>
            </>
          ) : (
            <>
              <Row
                className="home-content"
                style={{
                  width: "60%",
                  top: "65vh",
                  left: "21vw",
                  fontSize: "1.5rem",
                  padding: "1%",
                }}
              >
                Keep track of your children's milestones, set reminders to important meetings, search for reliable
                resources and save photo memories of your kids.
              </Row>
            </>
          )}
        </section>
        {/* <Footer /> */}
      </div>

      {/* set modal data up */}

      <Modal show={showModal} className="modal-xl" onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          {formType === "signIn" ? <Modal.Title>Sign In</Modal.Title> : <Modal.Title>Sign Up</Modal.Title>}
        </Modal.Header>
        <Modal.Body>
          {formType === "signIn" ? (
            <SignIn
              handleModalClose={() => {
                setShowModal(false);
                setFormType("");
              }}
            />
          ) : (
            <SignUp
              handleModalClose={() => {
                setShowModal(false);
                setFormType("");
              }}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default HomePage;
