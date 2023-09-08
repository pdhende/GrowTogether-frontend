/* eslint-disable no-const-assign */
import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, Col, Row, Modal } from "react-bootstrap";
import { NewChild } from "./NewChild";

export function UserDashboard() {
  const [children, setChildren] = useState([]);

  const handleIndexChildren = () => {
    console.log("handleIndexChildren");
    axios.get("http://localhost:3000/children.json").then((response) => {
      console.log(response.data);
      setChildren(response.data);
    });
  };

  //Modal for add child profile
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleClose = () => setShowCreateModal(false);
  const handleShowCreateModal = () => setShowCreateModal(true);

  useEffect(handleIndexChildren, []);
  return (
    <div>
      <Button className="custom-btn" onClick={handleShowCreateModal}>
        Add a Child
      </Button>

      <Modal show={showCreateModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Child</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewChild />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Save Child
          </Button>
        </Modal.Footer>
      </Modal>

      <Row xs={1} md={3} className="g-4">
        {children.map((child) => (
          <Col style={{ width: "25rem" }} key={child.id}>
            <Card>
              <Card.Img variant="top" src={child.profile_image} />
              <Card.Body>
                <Card.Title style={{ fontSize: 40 }}>{child.name}</Card.Title>
                <Card.Text style={{ fontSize: 25 }}>Birthday: {child.dob}</Card.Text>
                <Button className="custom-btn">View Milestones</Button>
              </Card.Body>
            </Card>
            <br />
          </Col>
        ))}
      </Row>
      <br />
    </div>
  );
}
