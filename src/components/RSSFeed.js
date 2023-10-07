import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Button } from "react-bootstrap";

function RSSFeed() {
  const [feedData, setFeedData] = useState([]);
  const fetchData = () => {
    axios.get("http://localhost:3000/fetch_data").then((response) => {
      console.log(response.data);
      setFeedData(response.data.data); // Access the 'data' property
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const removeHTMLTags = (str) => {
    return str.replace(/<[^>]*>/g, "");
  };

  return (
    <div className="backgroung-img">
      <h1>Articles</h1>
      {feedData.map((item, index) => (
        <section key={index}>
          <Row className="rss-col" key={item.link}>
            <Col>
              <Row style={{ fontFamily: "Arial", fontSize: "20px" }}>
                <strong>{item.title}</strong>{" "}
              </Row>
              <Row>
                <img src={item.images[0]} alt="pic here" style={{ width: "400px", height: "auto" }} />
              </Row>
              <br />
              <Row>{removeHTMLTags(item.description)}</Row>
              <Row>
                <Button className="custom-all-btn" onClick={() => window.open(item.link, "_blank")}>
                  Read Full Article
                </Button>
              </Row>
            </Col>
          </Row>
          <br />
          {/* // <p>{item.title}</p>
          // <p>{item.description}</p>
          // <src href={item.link} />
          Add more elements as needed */}
        </section>
      ))}
    </div>
  );
}
export default RSSFeed;
