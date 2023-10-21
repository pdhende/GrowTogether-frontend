import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const NewContact = ({ show, onHide, onSave }) => {
  const [newContact, setNewContact] = useState({
    name: "",
    email_address: "",
    description: "",
  });

  const handleSave = () => {
    onSave({
      name: newContact.name,
      email_address: newContact.email_address,
      description: newContact.description,
    });
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Contact</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={newContact.name}
              onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="text"
              value={newContact.email_address}
              onChange={(e) => setNewContact({ ...newContact, email_address: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Contact Type</Form.Label>
            <Form.Control
              as="select" // Set the input type to "select"
              value={newContact.contact_type}
              onChange={(e) => setNewContact({ ...newContact, contact_type: e.target.value })}
            >
              <option value="Empty">-- Choose a Contact Type --</option>
              <option value="Family">Family</option>
              <option value="School">School</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Other">Other</option>
            </Form.Control>
          </Form.Group>
        </Form>
        <Button className="custom-save-btn" onClick={handleSave}>
          Save Contact
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <Button className="add-Contact-btn" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewContact;
