import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import { Card, Row } from "react-bootstrap";
import moment from "moment";

function PhotoAlbum() {

  const [photos, setPhotos] = useState([]);

  const handleIndexPhotos = () => {
    axios.get("http://localhost:3000/photos.json").then((response) => {
      console.log(response.data);
      setPhotos(response.data);
    });
  }

  useEffect(() => {
    handleIndexPhotos();
  }, []);
  return(
    <div>
      <Header />
      <h1>Photo Album</h1>
      <br />
      <Row xs={1} md={3} className="g-4 justify-content-center">
        {photos.map((photo, index) => (
          <div key={index}>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={photo.image} />
              <Card.Body>
                <Card.Text>{photo.description}<br /> {moment(photo?.date).format("MMMM D, YYYY h:mm A")}</Card.Text>

              </Card.Body>
              </Card>
          </div>
        ))}
      </Row>
    </div>
  );
        };
export default PhotoAlbum;