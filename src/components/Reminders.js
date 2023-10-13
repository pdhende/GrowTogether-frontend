import React, { useState, useEffect } from "react";
import Header from "./Header";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const localizer = momentLocalizer(moment);

const AddReminderModal = ({ show, onHide, onSave }) => {
  const [newReminder, setNewReminder] = useState({
    child_name: "",
    category: "",
    description: "",
    notes: "",
    date: Date.now(),
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
        <Button className="custom-all-btn btn-rounded" onClick={onHide}>
          Close
        </Button>
        <Button className="custom-save-btn btn-rounded" onClick={handleSave}>
          Save Reminder
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const ReminderDetailsModal = ({ show, onHide, reminder }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Reminder Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Display the reminder details here */}
        <p>
          <strong>Child Name:</strong> <br /> {reminder?.child_name}
        </p>
        <p>
          <strong>Category:</strong> <br /> {reminder?.category}
        </p>
        <p>
          <strong>Details:</strong> <br /> {reminder?.description}
        </p>
        <p>
          <strong>Notes:</strong> <br /> {reminder?.notes}
        </p>
        <p>
          <strong>Date and Time:</strong> <br /> {moment(reminder?.date).format("MMMM D, YYYY h:mm A")}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button className="custom-all-btn btn-rounded" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

function Reminders() {
  const [reminders, setReminders] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState(null);
  const [showReminderDetailsModal, setShowReminderDetailsModal] = useState(false);

  const fetchReminders = () => {
    axios
      .get("http://localhost:3000/reminders.json")
      .then((response) => {
        setReminders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reminders:", error);
      });
  };

  const handleAddReminder = (newReminder) => {
    // Send the new reminder data to the server and update the reminders.
    axios
      .post("http://localhost:3000/reminders.json", newReminder)
      .then((response) => {
        fetchReminders();
        setShowAddModal(false); // Close the modal
      })
      .catch((error) => {
        console.error("Error adding reminder:", error);
      });
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  console.log(reminders);

  if (!reminders) {
    return null;
  }

  return (
    <div>
      <Header />
      <h1>Reminders</h1>

      <Button className="custom-all-btn" onClick={() => setShowAddModal(true)}>
        Add Reminder
      </Button>

      <Calendar
        localizer={localizer}
        events={reminders.map((reminder) => {
          return {
            start: moment(reminder.date).toDate(),
            end: moment(reminder.date).toDate(),
            title: reminder.description,
          };
        })}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={(event) => {
          // When a reminder is clicked, set it as the selected reminder
          setSelectedReminder(reminders.find((r) => r.description === event.title));
          setShowReminderDetailsModal(true);
        }}
      />

      <ReminderDetailsModal
        show={showReminderDetailsModal}
        onHide={() => setShowReminderDetailsModal(false)}
        reminder={selectedReminder}
      />

      <AddReminderModal show={showAddModal} onHide={() => setShowAddModal(false)} onSave={handleAddReminder} />
    </div>
  );
}

export default Reminders;
