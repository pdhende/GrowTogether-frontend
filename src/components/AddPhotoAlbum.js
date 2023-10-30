import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";

function AddPhotoAlbum({ show, onSave, onHide }) {
  const [children, setChildren] = useState([]); 
const [selectedChildId, setSelectedChildId] = useState(''); 

  const [newPhoto, setNewPhoto] = useState({
    image: "",
    description: "",
    date: new Date(),
    child_id: selectedChildId,
    milestone_id: "",
  });

  const handleSavePhoto = () => {
    onSave({
      image: newPhoto.image,
      description: newPhoto.description,
      date: newPhoto.date,
      child_id: selectedChildId,
      milestone_id: newPhoto.milestone_id,
    });
      onHide();
    };

    useEffect(() => {
      axios.get("http://localhost:3000/children.json").then((response) => {
        setChildren(response.data);
      });
    }, []);

    

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Photo To Album</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="URL (will be form later)"
              value={newPhoto.image}
              onChange={(e) => setNewPhoto({ ...newPhoto, image: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Description"
              value={newPhoto.description}
              onChange={(e) => setNewPhoto({ ...newPhoto, description: e.target.value })}
            />
            </Form.Group>
            <Form.Group>
            <Form.Label>Date</Form.Label>
            <DatePicker
              selected={newPhoto.date}
              onChange={(date) => {
                setNewPhoto({ ...newPhoto, date: date });
              }}
              showTimeSelect
              dateFormat="Pp"
            />
          </Form.Group>
          <Form.Label>Child</Form.Label>
  <Form.Control
    as="select"
    value={selectedChildId}
    onChange={(e) => setSelectedChildId(e.target.value)}
  >
    <option value="">-- Select a child --</option>
    {children.map((child) => (
      <option key={child.id} value={child.id}>
        {child.name}
      </option>
    ))}
  </Form.Control>
            <Form.Group>
            <Form.Label>milestone_id</Form.Label>
            <Form.Control
              type="number"
              placeholder="milestone_id"
              value={newPhoto.milestone_id}
              onChange={(e) => setNewPhoto({ ...newPhoto, milestone_id: e.target.value })}
            />
            </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="green-btn" onClick={handleSavePhoto}>
          Save Photo
        </Button>
      </Modal.Footer>
      <Button className="blue-btn" onClick={onHide}>
        Cancel
      </Button>
    </Modal>
  )
}

export default AddPhotoAlbum;
