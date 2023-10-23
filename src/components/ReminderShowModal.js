import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import moment from "moment";
import EditReminderModal from "./EditReminderModal";
import EmailReminderForm from "./EmailReminderForm";

import axios from "axios";
import swal from "sweetalert";

const ReminderShowModal = ({ show, onHide, reminder, onUpdate }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);

  const openEditModal = () => {
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  const handleDelete = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this item!",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`http://localhost:3000/reminders/${reminder.id}.json`)
          .then((response) => {
            swal("Poof! Your item has been deleted!", {
              icon: "success",
            }).then(() => {
              window.location.reload(); // Refresh the window
            });
          })
          .catch((error) => {
            swal("Oops! Something went wrong.", {
              icon: "error",
            });
          });
      } else {
        swal("Your item is safe!", {
          icon: "info",
        });
      }
    });
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
          <strong>Title:</strong> <br /> {reminder?.description}
        </p>
        <p>
          <strong>Notes:</strong> <br /> {reminder?.notes}
        </p>
        <p>
          <strong>Date and Time:</strong> <br /> {moment(reminder?.date).format("MMMM D, YYYY h:mm A")}
        </p>
        <Button className="blue-btn" onClick={openEditModal}>
          Edit
        </Button>
        <br />
        <br />
        <Button className="custom-save-btn" onClick={handleDelete}>
          Delete
        </Button>
        <br />
        <br />

        <EditReminderModal show={showEditModal} reminder={reminder} onUpdate={onUpdate} onHide={closeEditModal} />
      </Modal.Body>
      <Modal.Footer>
        <Button className="green-btn" onClick={() => setShowEmailModal(true)}>
          Share
        </Button>
      </Modal.Footer>

      <EmailReminderForm show={showEmailModal} onHide={() => setShowEmailModal(false)} reminder={reminder} />
    </Modal>
  );
};

export default ReminderShowModal;
