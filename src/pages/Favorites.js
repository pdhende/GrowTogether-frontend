import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Row, Button } from "react-bootstrap";
import Header from "../components/Header";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  const handleIndexFavorites = () => {
    axios.get("http://localhost:3000/favorites.json").then((response) => {
      console.log(response.data.thumbnail);
      setFavorites(response.data);
    });
  };

  useEffect(() => {
    handleIndexFavorites();
  }, []);

  return (
    <>
      <Header />
      <div className="background-img-resources-pg">
        <h1>Favorites Page</h1>
        <br />
        <Row xs={1} md={3} className="g-4 justify-content-center">
          {favorites.map((fav, index) => (
            <section key={index}>
              <Card
                border="dark"
                style={{
                  width: "20rem",
                  margin: "5rem", // Remove any margin
                }}
              >
                {" "}
                <Card.Img variant="top" src={fav.thumbnail} />
                <Card.Body>
                  <Card.Title>
                    <strong>{fav.title}</strong>{" "}
                  </Card.Title>
                  <Card.Text>{fav.description}</Card.Text>
                </Card.Body>
                <Card.Body>
                  <Button className="custom-all-btn" onClick={() => window.open(fav.link, "_blank")}>
                    Full Article
                  </Button>{" "}
                </Card.Body>
              </Card>
              <br />
            </section>
          ))}
        </Row>
      </div>
    </>
  );
}
export default Favorites;
