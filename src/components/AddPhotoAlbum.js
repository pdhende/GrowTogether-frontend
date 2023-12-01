import React from "react";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";

function AddPhotoAlbum({ show, onSave, onHide }) {
  const [newPhoto, setNewPhoto] = useState({
    image: "",
    description: "",
    date: new Date(),
    child_id: null,
    milestone_id: null,
  });

  const handleSavePhoto = () => {
    onSave({
      image: newPhoto.image,
      description: newPhoto.description,
      date: newPhoto.date,
    });
    setNewPhoto({
      image: "",
      description: "",
      date: new Date(),
    });
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Photo To Album</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Image</Form.Label>
            {/* <Form.Control
              type="text"
              placeholder="URL (will be form later)"
              value={newPhoto.image}
              onChange={(e) => setNewPhoto({ ...newPhoto, image: e.target.value })}
            /> */}
            <Form.Control
              type="file"
              // placeholder="URL (will be form later)"
              // value={newPhoto.image}
              onChange={(e) =>
                setNewPhoto({ ...newPhoto, image: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Description"
              value={newPhoto.description}
              onChange={(e) =>
                setNewPhoto({ ...newPhoto, description: e.target.value })
              }
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
  );
}

export default AddPhotoAlbum;
