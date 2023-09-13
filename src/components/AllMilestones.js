import React from "react";
import { Card, Button, Form, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

function AllMilestones(props) {
  const { childId } = props;
  const [msData, setMSData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/milestones/" + childId + ".json")
      .then((res) => setMSData(res.data))
      .catch((err) => {
        setError(err.message);
      });
  }, []);
  return (
    <>
      <h1>Hi!</h1>
    </>
  );
}

export default AllMilestones;
