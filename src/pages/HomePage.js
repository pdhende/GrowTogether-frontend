import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/customGT.css";
// import SignIn from "../components/SignIn";
// import SignUp from "../components/SignUp";
import { Row, Col, Button } from "react-bootstrap";

function HomePage() {
  return (
    <>
      <div>
        <Header />
        <section>
          <div className="home-img"></div>
          <div className="overlay"></div>
          <Row
            className="home-content"
            style={{
              color: "#0C6980",
              fontSize: " 4rem",
            }}
          >
            A Parent Friendly App
            <div>
              <Button className="custom-btn btn-rounded">Sign In</Button>
              <Button className="custom-btn btn-rounded">Sign Up</Button>
            </div>
          </Row>
        </section>
        <Footer />
      </div>
    </>
  );
}

export default HomePage;
