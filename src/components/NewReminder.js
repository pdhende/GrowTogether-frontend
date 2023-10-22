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
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>Add Reminder</Modal.Title>
        <Button className="add-reminder-btn" onClick={onHide}>
          Close
        </Button>
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
              as="select" // Set the input type to "select"
              value={newReminder.category}
              onChange={(e) => setNewReminder({ ...newReminder, category: e.target.value })}
            >
              <option value="Empty">-- Choose a category --</option>
              <option value="School Event">School Event</option>
              <option value="Medical Appointment">Medical Appointment</option>
              <option value="Extracurricular Activity">Extracurricular Activity</option>
              <option value="Assignment">Assignment</option>
              <option value="Family Event">Family Event</option>
              <option value="Other">Other</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={newReminder.description}
              onChange={(e) => setNewReminder({ ...newReminder, description: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
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
        <Button className="green-btn" onClick={handleSave}>
          Save Reminder
        </Button>
      </Modal.Footer>
      <Button className="edit-reminder-btn" onClick={onHide}>
        Cancel
      </Button>
    </Modal>
  );
};

export default NewReminder;
