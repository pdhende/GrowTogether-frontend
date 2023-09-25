import React, { useEffect, useState, useContext } from "react";
import Header from "../components/Header";
import Card from "react-bootstrap/Card";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import ChildProfile from "../components/ChildProfile";

function MilestoneTracker() {
  const [childrenData, setChildrenData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/children.json")
      .then((res) => setChildrenData(res.data))
      .catch((err) => {
        setError(err.message);
      });
  }, []);
  // }
  return (
    <>
      <div>
        <Header />
        <div className="background-img">
          <section className="container">
            <>
              <Row style={{ justifyContent: "center", marginTop: "2%" }}>
                {childrenData.map((child) => (
                  <Col md={3} style={{ marginRight: "5%", marginTop: "5%" }} key={child.id}>
                    <ChildProfile
                      childName={child.name}
                      dob={child.dob}
                      childId={child.id}
                      childProfile={child.profile_image}
                    />
                  </Col>
                ))}
              </Row>
            </>
          </section>
        </div>
      </div>
    </>
  );
}

export default MilestoneTracker;
