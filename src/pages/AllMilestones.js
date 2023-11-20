import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import MilestoneModal from "../components/MilestoneModal";
import axios from "axios";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";

function AllMilestones() {
  const { state } = useLocation();
  const { childName, childId, childProfile } = state.data;

  const [msData, setMSData] = useState([]);
  const [error, setError] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [msProperty, setMSProperty] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3000/milestones/" + childId + ".json")
      .then((res) => setMSData(res.data))
      .catch((err) => {
        setError(err.message);
        console.log(error);
      });
  }, []);

  return (
    <>
      <Header />
      <div className="background-img">
        <section className="custom-container container">
          <Row
            className="custom-col"
            style={{
              backgroundColor: "white",
              border: "3px solid #4e9c86",
              textAlign: "justify",
              padding: "0.5%",
            }}
          >
            <Col md="3">
              <img className="child-img" alt={{ childName }} src={childProfile}></img>
            </Col>
            <Col style={{ textAlign: "justify", padding: "2%" }} md="9">
              <Row>
                <h3>{childName}</h3>
              </Row>
            </Col>
          </Row>
          {msData.map((milestone) => (
            <Row
              className="custom-col"
              style={{
                backgroundColor: "white",
                border: "3px solid #4e9c86",
                textAlign: "justify",
                padding: "2%",
              }}
              key={milestone.id}
            >
              <Col>
                <Row>Title: {milestone.title}</Row>
                <Row>Description: {milestone.description}</Row>
                <Row>Category: {milestone.milestone_category}</Row>
                {/* <Row><img src={milestone.image} width="300" height="auto"/></Row> */}
                <Row>
                  Date: {format(parseISO(milestone.date), "MM/dd/yyyy")}
                </Row>
                <Row style={{ paddingTop: "2%" }}>
                  <Button
                    className="custom-btn"
                    onClick={() => {
                      setMSProperty(milestone);
                      setShowEditModal(true);
                    }}
                  >
                    Edit
                  </Button>
                </Row>
              </Col>
            </Row>
          ))}
        </section>
      </div>
      {showEditModal === true ? <MilestoneModal milestone={msProperty} showEditModal={showEditModal} /> : null}
    </>
  );
}

export default AllMilestones;
