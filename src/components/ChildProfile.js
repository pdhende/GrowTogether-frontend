import React from "react";
import { Card, Button, Form, Modal } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";

function ChildProfile(props) {
  const navigate = useNavigate();
  const { childName, dob, childId, childProfile } = props;
  const [showModal, setShowModal] = useState(false);
  const [msFormData, setMsFormData] = useState({
    child_id: childId,
    child_image: childProfile,
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
        swal({
          title: "Done!",
          text: "Your child's milestone has been added to their profile",
          icon: "success",
          type: "success",
          confirmButtonText: "Close",
          allowOutsideClick: true,
        });
        const newChild = response.data;
        console.log("created Child profile", newChild);
        setShowModal(false);
      })
      .catch((error) => {
        console.log(error.response);
        swal({
          title: "Oops...",
          text: "Something went wrong!",
          icon: "error",
        });
      });

    setMsFormData({
      child_id: "",
      title: "",
      milestone_category: "",
      date: "",
      description: "",
    });
  };

  const handleClick = () => {
    const data = props;
    navigate("/allMilestones", { state: { data } });
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
            <div>
              <Button
                className="custom-btn custom-all-btn btn-rounded"
                onClick={() => setShowModal(true)}
              >
                Add Milestone
              </Button>
            </div>
            <div style={{ paddingTop: "5%" }}>
              <Button
                className="custom-btn custom-all-btn btn-rounded"
                onClick={handleClick}
              >
                View All Milestones
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* set modal data up */}
      <Modal
        show={showModal}
        className="centered-modal"
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
    </>
  );
}

export default ChildProfile;
