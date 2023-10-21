import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Row, Button, ListGroup } from "react-bootstrap";
import Header from "../components/Header";
import swal from "sweetalert";
import UpdateContactModal from "../components/UpdateContactModal";
import NewContact from "../components/NewContact";

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [showAddContactModal, setShowAddContactModal] = useState(false);
  const [showUpdateContactModal, setShowUpdateContactModal] = useState(false);

  const handleIndexContacts = () => {
    axios.get("http://localhost:3000/contacts.json").then((response) => {
      console.log(response.data);
      setContacts(response.data);
    });
  };

  const handleAddContact = (newContact) => {
    axios
      .post("http://localhost:3000/contacts.json", newContact)
      .then((response) => {
        handleIndexContacts();
        setShowAddContactModal(false);
      })
      .catch((error) => {
        console.error("Error adding contact", error);
      });
  };

  const openUpdateContactModal = () => {
    setShowUpdateContactModal(true);
  };

  const handleContactUpdate = (updatedContactData) => {
    // Handle the update of the contact data
    // This function should update your contacts state
    // For example:
    const updatedContacts = contacts.map((c) => {
      if (c.id === updatedContactData.id) {
        return updatedContactData;
      } else {
        return c;
      }
    });

    setContacts(updatedContacts);
  };

  const handleDeleteContact = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this item!",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`http://localhost:3000/contacts/${id}.json`)
          .then(() => {
            swal("Poof! Your item has been deleted!", {
              icon: "success",
            }).then(() => {
              window.location.reload(); // Refresh the window
            });
          })
          .catch((error) => {
            swal("Oops! Something went wrong.", {
              icon: "error",
            });
          });
      } else {
        swal("Your item is safe!", {
          icon: "info",
        });
      }
    });
  };

  useEffect(() => {
    handleIndexContacts();
  }, []);
  return (
    <div>
      <Header />
      <h1>Contact List</h1>
      <Button className="custom-all-btn" onClick={() => setShowAddContactModal(true)}>
        Add Contact
      </Button>
      <Row xs={1} md={3} className="g-4 justify-content-center">
        {contacts.map((contact, index) => (
          <section key={index}>
            <Card style={{ width: "18rem" }}>
              <Card.Header>
                <strong>{contact.name}</strong>
              </Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item>{contact.email_address}</ListGroup.Item>
                <ListGroup.Item>{contact.contact_type}</ListGroup.Item>
                <ListGroup.Item>
                  <Button className="custom-all-btn" onClick={openUpdateContactModal}>
                    Update Contact{" "}
                  </Button>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button className="custom-save-btn" onClick={() => handleDeleteContact(contact.id)}>
                    Remove from Contacts
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
            <UpdateContactModal show={showUpdateContactModal} contact={contact} onUpdate={handleContactUpdate} />
            <br />
          </section>
        ))}
      </Row>
      <NewContact show={showAddContactModal} onHide={() => setShowAddContactModal(false)} onSave={handleAddContact} />
    </div>
  );
}
export default Contacts;
