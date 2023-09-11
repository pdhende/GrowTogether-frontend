import React from "react";
import { Card, Button, Form, Modal } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import AllMilestones from "./AllMilestones";

function ChildProfile(props) {
  const { childName, dob, childId, childProfile } = props;
  const [showModal, setShowModal] = useState(false);
  const [msFormData, setMsFormData] = useState({
    child_id: childId,
    childProfile: "",
    title: "",
    milestone_category: "",
    date: "",
    description: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMsFormData({ ...msFormData, [name]: value });
  };

  const submitForm = async (event) => {
    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    event.preventDefault();
    axios
      .post("http://localhost:3000/milestones.json", msFormData)
      .then((response) => {
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + response.data.jwt;
        localStorage.setItem("jwt", response.data.jwt);
        window.location.href("/dashboard");
      })
      .catch((error) => {
        console.log(error.response);
      });

    setMsFormData({
      child_id: "",
      title: "",
      milestone_category: "",
      date: "",
      description: "",
    });
  };
  return (
    <>
      <div>
        <Card className="custom-card">
          <Card.Img className="child-img" variant="top" src={childProfile} />
          <Card.Body>
            <Card.Title>{childName}</Card.Title>
            <Card.Text>{dob}</Card.Text>
          </Card.Body>
          <Card.Body>
            <Button
              className="custom-btn custom-all-btn btn-rounded"
              onClick={() => setShowModal(true)}
            >
              Add Milestone
            </Button>
            <Button
              className="custom-btn custom-all-btn btn-rounded"
              onClick={() => {
                <AllMilestones />;
              }}
            >
              View All Milestones
            </Button>
          </Card.Body>
        </Card>
      </div>

      {/* set modal data up */}

      <Modal
        show={showModal}
        className="modal-xl"
        onHide={() => setShowModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Milestone</Modal.Title>
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
                value={msFormData.title}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="Category">Category : </Form.Label>
              <Form.Control
                as="select"
                name="milestone_category"
                onChange={handleInputChange}
                value={msFormData.milestone_category}
              >
                <option value="Empty">-- Choose a category --</option>
                <option value="Social">Social</option>
                <option value="Communication">Communication</option>
                <option value="Cognitive">Cognitive</option>
                <option value="Physical">Physical Development</option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="date">Date : </Form.Label>
              <Form.Control
                type="date"
                placeholder=""
                name="date"
                onChange={handleInputChange}
                value={msFormData.date}
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
                value={msFormData.description}
                required
              />
            </Form.Group>

            <Button onClick={submitForm}>Submit</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}

export default ChildProfile;
