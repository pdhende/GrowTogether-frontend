import React, { useEffect, useState, useContext } from "react";
import Header from "../components/Header";
import Card from "react-bootstrap/Card";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import ChildProfile from "../components/ChildProfile";
import AllMilestones from "../components/AllMilestones";

function MilestoneTracker(props) {
  const [childrenData, setChildrenData] = useState([]);
  const [error, setError] = useState("");

  console.log(props.showAllMS);
  useEffect(() => {
    axios
      .get("http://localhost:3000/children.json")
      .then((res) => setChildrenData(res.data))
      .catch((err) => {
        setError(err.message);
      });
  }, []);

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
          <Row>
            {childrenData.map((child) => (
              <Col md={3} style={{ marginRight: "5%" }} key={child.id}>
                <ChildProfile
                  childName={child.name}
                  dob={child.dob}
                  childId={child.id}
                  childProfile={child.profile_image}
                />
              </Col>
            ))}
          </Row>
        </section>
      </div>
    </>
  );
}

export default MilestoneTracker;
