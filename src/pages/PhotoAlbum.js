import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import { Button, Card } from "react-bootstrap";
import moment from "moment";
import AddPhotoAlbum from "../components/AddPhotoAlbum";
import { MDBContainer, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import swal from "sweetalert";


function PhotoAlbum() {
  const [photos, setPhotos] = useState([]);
  const [showAddPhotoModal, setShowAddPhotoModal] = useState(false);

  const handleIndexPhotos = () => {
    //update later to call to AWS S3 bucket
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
    //update later to call to AWS S3 bucket
    axios
      .post("http://localhost:3000/photos.json", newPhoto)
      .then((response) => {
          swal({
            title: "Done!",
            text: "Photo has been added to your album",
            icon: "success",
            type: "success",
            confirmButtonText: "OK!",
            allowOutsideClick: true,
          });
          handleIndexPhotos();
          setShowAddPhotoModal(false);
          console.log("Photo saved:", response.data);
        })
        .catch((error) => {
          console.error("Error saving article:", error);
        });
  };

  useEffect(() => {
    handleIndexPhotos();
  }, []);
  

  return(
    <div>
      <Header />
    <h1>Photo Album</h1>
    <br />
    <Button className="custom-all-btn" onClick={openAddPhotoAlbum}>
      Add Photo
    </Button>

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