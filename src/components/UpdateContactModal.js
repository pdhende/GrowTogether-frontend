import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

const UpdateContactModal = ({ show, onHide, contact, onUpdate }) => {
  const [editedcontact, setEditedcontact] = useState({
    name: contact.name,
    email_address: contact.email_address,
    contact_type: contact.contact_type,
  });

  const handleUpdate = () => {
    axios
      .put(`http://localhost:3000/contacts/${contact.id}.json`, editedcontact)
      .then((response) => {
        onUpdate(response.data); // Pass the updated contact data to the parent component
        window.location.href = "/contacts";
      })
      .catch((error) => {
        console.error("Error updating contact:", error);
      });
  };

  const refreshWindow = () => {
    window.location.href = "/contacts";
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit contact</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={editedcontact.name}
              onChange={(e) => setEditedcontact({ ...editedcontact, name: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Contact Type</Form.Label>
            <Form.Control
              as="select" // Set the input type to "select"
              value={editedcontact.contact_type}
              onChange={(e) => setEditedcontact({ ...editedcontact, contact_type: e.target.value })}
            >
              <option value="Family">Family</option>
              <option value="School">School</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Other">Other</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="text"
              value={editedcontact.email_address}
              onChange={(e) => setEditedcontact({ ...editedcontact, email_address: e.target.value })}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="custom-all-btn" onClick={handleUpdate}>
          Save Changes
        </Button>
      </Modal.Footer>
      <Button className="edit-reminder-btn" onClick={refreshWindow}>
        Cancel
      </Button>
    </Modal>
  );
};

export default UpdateContactModal;
