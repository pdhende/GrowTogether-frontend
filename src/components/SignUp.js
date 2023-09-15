import React from "react";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";

function SignUp() {
  // set initial form state
  const [userFormData, setUserFormData] = useState({
    name: "",
    email: "",
    profilePicURL: "",
    password: "",
    // passwordConfirmation: "",
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

    const params = new FormData(event.target);
    axios
      .post("http://localhost:3000/users.json", params)
      .then((response) => {
        event.target.reset();
        // Assuming your server responds with a JWT token upon successful signup
        const jwt = response.data.jwt;

        // Store the JWT token in localStorage
        localStorage.setItem("jwt", jwt);

        window.location.href = "/dashboard"; // Change this to redirect to the dashboard.
      })
      .catch((error) => {
        console.log(error.response.data.errors);
      });

    setUserFormData({
      name: "",
      email: "",
      profilePicURL: "",
      password: "",
      // passwordConfirmation: "",
    });
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Form.Group>
          <Form.Label htmlFor="name">Your Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your Name"
            name="name"
            onChange={handleInputChange}
            value={userFormData.name}
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
          <Form.Label htmlFor="profilePicURL">Profile Picture URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Profile Picture URL"
            name="profilePicURL"
            onChange={handleInputChange}
            value={userFormData.profilePicURL}
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

        {/* <Form.Group>
          <Form.Label htmlFor="password_confirmation">Password Confirmation</Form.Label>
          <Form.Control
            type="password_confirmation"
            placeholder="Type your password agian"
            name="password_confirmation"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
        </Form.Group> */}

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
