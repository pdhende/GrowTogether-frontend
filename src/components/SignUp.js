import React from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";

function SignUp() {
  // set initial form state
  const [userFormData, setUserFormData] = useState({
    firstname: "",
    email: "",
    password: "",
    role: "",
  });
  // set state for form validation
  const [validated] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setUserFormData({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    });
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Form.Group>
          <Form.Label htmlFor="firstname">First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="First Name"
            name="firstname"
            onChange={handleInputChange}
            value={userFormData.firstname}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="lastname">Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Last Name"
            name="lastname"
            onChange={handleInputChange}
            value={userFormData.lastname}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your email"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
        </Form.Group>
        <Button
          type="submit"
          disabled={!(userFormData.email && userFormData.password)}
          style={
            !(userFormData.email && userFormData.password)
              ? {
                  backgroundColor: "#ffc2c7",
                  borderColor: "white",
                  borderRadius: "1.5rem",
                }
              : {
                  backgroundColor: "white",
                  color: "#4e9c86",
                  border: "0.3rem solid #4e9c86",
                  borderRadius: "1.5rem",
                }
          }
        >
          Submit
        </Button>
      </Form>
    </>
  );
}

export default SignUp;
