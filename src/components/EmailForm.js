import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import swal from "sweetalert";
import axios from "axios";

function EmailForm({ show, onHide }) {
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

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
        });
        console.log("200 OK: ", response.data.message);
      })
      .catch((error) => {
        console.error("Error saving article:", error);
      });
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Send Email</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Send to:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Recipient"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
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
            <Form.Control textarea placeholder="Email Body" value={body} onChange={(e) => setBody(e.target.value)} />
          </Form.Group>
        </Form>
        <Button className="send-email-btn" onClick={sendEmail}>
          Send
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <Button className="add-reminder-btn" onClick={onHide}>
          Cancle
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EmailForm;
