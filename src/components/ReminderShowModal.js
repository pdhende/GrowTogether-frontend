import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import moment from "moment";
import EditReminderModal from "./EditReminderModal";

const ReminderShowModal = ({ show, onHide, reminder, onUpdate }) => {
  const [showEditModal, setShowEditModal] = useState(false);

  const openEditModal = () => {
    setShowEditModal(true);
  };

  const closeShowModal = () => {
    onHide();
  };

  const refreshWindow = () => {
    setShowEditModal(false);
    window.location.href = "/reminders";
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Reminder Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
        <Button className="custom-save-btn" onClick={openEditModal}>
          Edit
        </Button>

        <EditReminderModal show={showEditModal} onHide={closeShowModal} reminder={reminder} onUpdate={onUpdate} />
      </Modal.Body>
      <Modal.Footer>
        <Button className="custom-all-btn btn-rounded" onClick={refreshWindow}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReminderShowModal;
