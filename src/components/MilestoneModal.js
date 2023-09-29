import React from "react";
import { Card, Button, Form, Modal } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import format from "date-fns/format";
import { parseISO } from "date-fns";

function MilestoneModal(props) {
  const [msData, setMSData] = useState([]);
  const [error, setError] = useState("");
  const [showEditModal, setShowEditModal] = useState(props.showEditModal);
  const [msProperty, setMSProperty] = useState(props.milestone);

  const handleInputChange = (event) => {
    let { name, value } = event.target;
    console.log(name, value);
    setMSProperty({ ...msProperty, [name]: value });
  };

  const submitForm = async (event) => {
    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      window.location.href = "/allMilestones";
    }

    event.preventDefault();
    axios
      .patch(
        "http://localhost:3000/milestones/" + msProperty.id + ".json",
        msProperty
      )
      .then((response) => {
        window.location.href("/milestoneTracker");
      })
      .catch((error) => {
        console.log(error.response);
        swal({
          title: "Oops...",
          text: "Something went wrong!",
          icon: "error",
        });
      });

    setShowEditModal(false);
  };

  return (
    <Modal
      className="centered-modal"
      show={showEditModal}
      onHide={() => setShowEditModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Milestone</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate>
          <Form.Group>
            <Form.Label htmlFor="Title">Title</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              name="title"
              onChange={handleInputChange}
              value={msProperty.title}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="Category">Category : </Form.Label>
            <Form.Control
              as="select"
              name="milestone_category"
              onChange={handleInputChange}
              value={msProperty.milestone_category}
            >
              <option value="Empty">-- Choose a category --</option>
              <option value="Social">Social</option>
              <option value="Communication">Communication</option>
              <option value="Cognitive">Cognitive</option>
              <option value="Physical">Physical</option>
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="date">Date : </Form.Label>
            <Form.Control
              type="date"
              placeholder=""
              name="date"
              onChange={handleInputChange}
              value={msProperty.date}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="description">Description : </Form.Label>
            <Form.Control
              as="textarea"
              placeholder=""
              name="description"
              rows={5}
              onChange={handleInputChange}
              value={msProperty.description}
              required
            />
          </Form.Group>

          <Button
            className="custom-btn custom-all-btn btn-rounded"
            onClick={submitForm}
          >
            Submit
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}

export default MilestoneModal;
