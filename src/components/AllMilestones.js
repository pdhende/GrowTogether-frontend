import React from "react";
import { Card, Button, Form, Modal } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

function AllMilestones(props) {
  const { childName, dob, childId } = props;

  //   useEffect(() => {
  //     axios
  //       .get("http://localhost:3000/milestones/:id")
  //       .then((res) => setChildrenData(res.data))
  //       .catch((err) => {
  //         setError(err.message);
  //       });
  //   }, []);
  return (
    <>
      <h1>Hi!</h1>
    </>
  );
}

export default AllMilestones;
