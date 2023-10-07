import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Col, Row, Button } from "react-bootstrap";
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

  const removeHTMLTag = (str) => {
    return str.replace(/<[^>]*>/g, "");
  };
  return (
    <>
      <Header />
      <div className="background-img">
        <h1>Favorites Page</h1>
        {favorites.map((fav) => (
          <section className="custom-container container" key={fav.id}>
            <Row className="rss-col" key={fav.link}>
              <Col>
                <Row style={{ fontSize: "20px" }}>
                  <strong>{fav.title}</strong>{" "}
                </Row>
                <Row>
                  <img src={fav.thumbnail} alt="pic here" style={{ width: "400px", height: "auto" }} />
                </Row>
                <br />
                {/* <Row>{removeHTMLTag(fav.description)}</Row> */}
                <Row>
                  <Button className="custom-all-btn" onClick={() => window.open(fav.link, "_blank")}>
                    Read Full Article
                  </Button>
                </Row>
              </Col>
            </Row>
            <br />
          </section>
        ))}
      </div>
    </>
  );
}
export default Favorites;
