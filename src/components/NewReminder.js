import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const NewReminder = ({ show, onHide, onSave }) => {
  const [newReminder, setNewReminder] = useState({
    child_name: "",
    category: "",
    description: "",
    notes: "",
    date: new Date(),
  });

  const handleSave = () => {
    onSave({
      child_name: newReminder.child_name,
      category: newReminder.category,
      description: newReminder.description,
      notes: newReminder.notes,
      date: newReminder.date,
    });
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Reminder</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Child Name</Form.Label>
            <Form.Control
              type="text"
              value={newReminder.child_name}
              onChange={(e) => setNewReminder({ ...newReminder, child_name: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              value={newReminder.category}
              onChange={(e) => setNewReminder({ ...newReminder, category: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              value={newReminder.description}
              onChange={(e) => setNewReminder({ ...newReminder, description: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Notes</Form.Label>
            <Form.Control
              type="text"
              value={newReminder.notes}
              onChange={(e) => setNewReminder({ ...newReminder, notes: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Date</Form.Label>
            <DatePicker
              selected={newReminder.date}
              onChange={(date) => {
                setNewReminder({ ...newReminder, date: date });
              }}
              showTimeSelect
              dateFormat="Pp"
            />
          </Form.Group>

          {/* Add more Form.Group for other reminder properties */}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="add-reminder-btn" onClick={onHide}>
          Close
        </Button>
        <Button className="custom-save-btn" onClick={handleSave}>
          Save Reminder
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewReminder;