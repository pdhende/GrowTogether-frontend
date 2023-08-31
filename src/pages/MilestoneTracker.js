import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Card from "react-bootstrap/Card";
import { Col, Row } from "react-bootstrap";
import axios from "axios";

function MilestoneTracker() {
  const [childData, setChildData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("api/children")
      .then((res) => setChildData(res.data))
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  console.log(childData);

  return (
    <>
      <div>
        <Header />
        <section className="container">
          <Row>
            <h1 style={{ textAlign: "left", marginLeft: "1em" }}>
              Hi username!
            </h1>
          </Row>
        </section>
      </div>
    </>
  );
}

export default MilestoneTracker;
