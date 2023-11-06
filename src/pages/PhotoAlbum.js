import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import { Button, Card, Row } from "react-bootstrap";
import moment from "moment";
import AddPhotoAlbum from "../components/AddPhotoAlbum";
import { MDBContainer, MDBCol, MDBRow } from 'mdb-react-ui-kit';



function PhotoAlbum() {
  const [photos, setPhotos] = useState([]);
  const [showAddPhotoModal, setShowAddPhotoModal] = useState(false);

  const handleIndexPhotos = () => {
    axios.get("http://localhost:3000/photos.json").then((response) => {
      console.log(response.data);
      setPhotos(response.data);
    });
  }

  const openAddPhotoAlbum = () => {
    console.log("Opening Add Photo Modal");
    setShowAddPhotoModal(true);
  };

  const handleAddPhoto = (newPhoto) => {
    axios
      .post("http://localhost:3000/photos.json", newPhoto)
      .then((response) => {
        handleIndexPhotos();
        setShowAddPhotoModal(false);
      })
      .catch((error) => {
        console.error("Error adding photo", error);
      });
  };

  useEffect(() => {
    handleIndexPhotos();
  }, []);
  
  const photoData = photos.map((photo) => {
    return {
      src: photo.image, // URL of the image
      alt: photo.description, // Description of the image
    };
  });


  return(
    <div>
      <Header />
    <h1>Photo Album</h1>
    <br />
    <Button className="custom-all-btn" onClick={openAddPhotoAlbum}>
      Add Photo
    </Button>
    {/* <Row xs={1} md={3} className="g-4 justify-content-center">
      {photos.map((photo, index) => (
        <div key={index}>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={photo.image} />
            <Card.Body>
              <Card.Text>
                {photo.description}<br /> {moment(photo?.date).format("MMMM D, YYYY h:mm A")}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      ))}
    </Row> */}

<MDBContainer className="mt-4">
        <MDBRow>
          {photos.map((photo, index) => (
            <MDBCol md={4} key={index}>
              <Card style={{ width: '100%' }}>
                <Card.Img variant="top" src={photo.image} />
                <Card.Body>
                  <Card.Text>
                    {photo.description}<br /> {moment(photo?.date).format('MMMM D, YYYY h:mm A')}
                  </Card.Text>
                </Card.Body>
              </Card>
            </MDBCol>
          ))}
        </MDBRow>
      </MDBContainer>



    <AddPhotoAlbum show={showAddPhotoModal} onHide={() => setShowAddPhotoModal(false)} onSave={handleAddPhoto} />
  </div>
  );
        };
export default PhotoAlbum;