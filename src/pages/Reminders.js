import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import Button from "react-bootstrap/Button";
import "react-datepicker/dist/react-datepicker.css";
import NewReminder from "../components/NewReminder.js";
import ReminderShowModal from "../components/ReminderShowModal";
const localizer = momentLocalizer(moment);

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
    axios
      .post("http://localhost:3000/reminders.json", newReminder)
      .then((response) => {
        fetchReminders();
        setShowAddModal(false);
      })
      .catch((error) => {
        console.error("Error adding reminder:", error);
      });
  };

  const handleUpdateReminder = (updatedReminder) => {
    const updatedReminders = reminders.map((reminder) =>
      reminder.id === updatedReminder.id ? updatedReminder : reminder
    );
    setReminders(updatedReminders);
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  if (!reminders) {
    return null;
  }

  return (
    <div>
      <Header />
      <h1>Reminders</h1> <br />
      <Button
        className="blue-btn"
        style={{ fontSize: "medium", float: "center" }}
        onClick={() => setShowAddModal(true)}
      >
        Add Reminder
      </Button>
      <br />
      <div style={{ marginLeft: "0.5in", marginRight: "0.5in", marginBottom: "0.5in", marginTop: "0.25in" }}>
        <Calendar
          localizer={localizer}
          events={reminders.map((reminder) => {
            return {
              start: moment(reminder.date).toDate(),
              end: moment(reminder.date).toDate(),
              child_name: reminder.child_name,
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
      </div>
      <ReminderShowModal
        show={showReminderDetailsModal}
        onHide={() => setShowReminderDetailsModal(false)}
        reminder={selectedReminder}
        onUpdate={handleUpdateReminder}
      />
      <NewReminder show={showAddModal} onHide={() => setShowAddModal(false)} onSave={handleAddReminder} />
    </div>
  );
}

export default Reminders;
