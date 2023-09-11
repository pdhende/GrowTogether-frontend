import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/customGT.css";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import { Row, Col, Button } from "react-bootstrap";
import { Navbar, Nav, Container, Modal, Tab } from "react-bootstrap";
import { UserDashboard } from "../components/UserDashboard";

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
          {localStorage.jwt === undefined ? (
            <>
              <Row
                className="home-content"
                style={{
                  color: "#0C6980",
                  fontSize: "4rem",
                }}
              >
                A Parent Friendly App
              </Row>
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
                  color: "#008080",
                  fontSize: "10rem",
                }}
              >
                <UserDashboard />
              </Row>
            </>
          )}
        </section>
        <Footer />
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
