import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import swal from "sweetalert";
import moment from "moment";
import axios from "axios";

function EmailPhotoModal({ show, onHide, photo }) {
  const [recipient, setRecipient] = useState("");
  const [customRecipient, setCustomRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [contacts, setContacts] = useState([]); 
  const [selectedPhoto, setSelectedPhoto] = useState(null); 

  useEffect(() => {
    axios
      .get("http://localhost:3000/contacts.json")
      .then((response) => {
        setContacts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching contacts:", error);
      });
  }, []);

  useEffect(() => {
    if (photo) {
      setSelectedPhoto(photo);

      setSubject(photo.description);
      const formattedDate = moment(photo.date).format("DD/MM/YYYY HH:mm");
      const messageBody = `Date: ${formattedDate}\nImageURL: ${photo.image}`;
      setBody(messageBody);
    }
  }, [photo]);

  const sendEmail = () => {
    const recipientToUse = customRecipient || recipient;

    axios
      .post("http://localhost:3000/send_email", {
        recipient: recipientToUse,
        subject,
        body,
        image: selectedPhoto ? selectedPhoto.image : null,
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
          onHide();
        });
        console.log("200 OK: ", response.data.message);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
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
            <Form.Control as="select" value={recipient} onChange={(e) => setRecipient(e.target.value)}>
              <option value="">-- Select a recipient --</option>
              {contacts.map((contact) => (
                <option key={contact.id} value={contact.email_address}>
                  {contact.name}
                </option>
              ))}
              <option value="other">Other</option>
            </Form.Control>
          </Form.Group>

          {recipient === "other" && (
            <Form.Group>
              <Form.Label>Recipient's Email:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Recipient's Email"
                value={customRecipient}
                onChange={(e) => setCustomRecipient(e.target.value)}
              />
            </Form.Group>
          )}
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              placeholder="Email Subject"
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
              style={{ height: "400px" }}
            />
          </Form.Group>
          {selectedPhoto && (
            <div>
              <label>Selected Photo:</label>
              <img
                src={selectedPhoto.image}
                alt="Selected Photo"
                style={{ maxWidth: "100%" }}
              />
            </div>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="green-btn" onClick={sendEmail}>
          Send
        </Button>
      </Modal.Footer>
      <Button className="blue-btn" onClick={onHide}>
        Cancel
      </Button>
    </Modal>
  );
}

export default EmailPhotoModal;
