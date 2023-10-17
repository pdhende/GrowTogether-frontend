import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

const EditReminderModal = ({ show, onHide, reminder, onUpdate }) => {
  const [editedReminder, setEditedReminder] = useState({
    child_name: reminder.child_name,
    category: reminder.category,
    description: reminder.description,
    notes: reminder.notes,
    date: new Date(reminder.date),
  });

  const handleUpdate = () => {
    axios
      .put(`http://localhost:3000/reminders/${reminder.id}.json`, editedReminder)
      .then((response) => {
        onUpdate(response.data); // Pass the updated reminder data to the parent component
        window.location.href = "/reminders";
      })
      .catch((error) => {
        console.error("Error updating reminder:", error);
      });
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Reminder</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              value={editedReminder.description}
              onChange={(e) => setEditedReminder({ ...editedReminder, description: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select" // Set the input type to "select"
              value={editedReminder.category}
              onChange={(e) => setEditedReminder({ ...editedReminder, category: e.target.value })}
            >
              <option value="School Event">School Event</option>
              <option value="Medical Appointment">Medical Appointment</option>
              <option value="Extracurricular Activity">Extracurricular Activity</option>
              <option value="Assignment">Assignment</option>
              <option value="Family Event">Family Event</option>
              <option value="Other">Other</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Child Name</Form.Label>
            <Form.Control
              type="text"
              value={editedReminder.child_name}
              onChange={(e) => setEditedReminder({ ...editedReminder, child_name: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Notes</Form.Label>
            <Form.Control
              type="text"
              value={editedReminder.notes}
              onChange={(e) => setEditedReminder({ ...editedReminder, notes: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Date</Form.Label>
            <DatePicker
              selected={editedReminder.date}
              onChange={(date) => setEditedReminder({ ...editedReminder, date: date })}
              showTimeSelect
              dateFormat="Pp"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="edit-reminder-btn" onClick={onHide}>
          Close
        </Button>
        <Button className="custom-save-btn" onClick={handleUpdate}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditReminderModal;
