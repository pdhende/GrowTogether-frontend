import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import swal from "sweetalert";
import moment from "moment";
import axios from "axios";

function EmailReminderForm({ show, onHide, reminder }) {
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [contacts, setContacts] = useState([]); // State variable to store contacts

  // Fetch contacts data when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:3000/contacts.json")
      .then((response) => {
        // Store contacts in the state
        setContacts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching contacts:", error);
      });
  }, []);

  useEffect(() => {
    if (reminder) {
      // Pre-fill the form fields with reminder data
      setSubject(reminder.description);
      const formattedDate = moment(reminder.date).format("DD/MM/YYYY HH:mm");
      const messageBody = `Date: ${formattedDate}\nNotes: ${reminder.notes}`;
      setBody(messageBody);
    }
  }, [reminder]);

  const sendEmail = () => {
    axios
      .post("http://localhost:3000/send_email", {
        recipient,
        subject,
        body,
      })
      .then((response) => {
        swal({
          title: "Done!",
          text: "Email has been sent successfully",
          icon: "success",
          type: "success",
          confirmButtonText: "OK!",
          allowOutsideClick: true,
        }).then(() => {
          // Close the modal after the "OK" button is clicked
          onHide();
        });
        console.log("200 OK: ", response.data.message);
      })
      .catch((error) => {
        console.error("Error saving article:", error);
      });
  };
  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>Send Email</Modal.Title>
        <Button className="add-reminder-btn" onClick={onHide}>
          Close
        </Button>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Send to:</Form.Label>
            <Form.Control
              as="select" // Use a select input for recipients
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            >
              <option value="">Select a recipient</option>
              {contacts.map((contact) => (
                <option key={contact.id} value={contact.email_address}>
                  {contact.contact_type}: {contact.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Subject:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              type="text"
              placeholder="Email Body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              style={{ height: "300px" }}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="green-btn" onClick={sendEmail}>
          Send
        </Button>
      </Modal.Footer>
      <Button className="add-reminder-btn" onClick={onHide}>
        Cancle
      </Button>
    </Modal>
  );
}

export default EmailReminderForm;
