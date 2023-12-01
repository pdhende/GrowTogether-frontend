import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Row, Button, Card } from "react-bootstrap";

function RSSFeed() {
  const [loading, setLoading] = useState(true);
  const [feedData, setFeedData] = useState([]);
  const [articlesToShow, setArticlesToShow] = useState(6);

  const fetchData = () => {
    axios.get("http://localhost:3000/fetch_data").then((response) => {
      console.log(response.data);
      setFeedData(response.data.data);
      setLoading(false);
    });
  };

  const loadMoreArticles = () => {
    setArticlesToShow(articlesToShow + 6);
  };

  const saveArticle = (article) => {
    axios
      .post("http://localhost:3000/favorites", article)
      .then((response) => {
        swal({
          title: "Done!",
          text: "Article has been added saved!",
          icon: "success",
          type: "success",
          confirmButtonText: "OK!",
          allowOutsideClick: true,
        });
        console.log("Article saved:", response.data);
      })
      .catch((error) => {
        console.error("Error saving article:", error);
      });
  };

  const removeHTMLTags = (str) => {
    return str.replace(/<[^>]*>/g, "");
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="backgroung-img">
      <h1>Articles</h1>
      <br />
      <div>
        {loading ? (
          <h3>
            <strong>Loading ...</strong>
          </h3>
        ) : (
          <Row xs={1} md={3} className="g-4 justify-content-center">
            {feedData.slice(0, articlesToShow).map((item, index) => (
              <section key={index}>
                <Card className="custom-article-card">
                  <Card.Img variant="top" src={item.images[0]} />
                  <Card.Body>
                    <Card.Title>
                      <strong>{item.title}</strong>{" "}
                    </Card.Title>
                    <Card.Text>{removeHTMLTags(item.description)}</Card.Text>
                  </Card.Body>
                  <Card.Body>
                    <Button
                      className="custom-all-btn btn-rounded"
                      onClick={() => window.open(item.link, "_blank")}
                    >
                      Full Article
                    </Button>{" "}
                    <Button
                      className="custom-save-btn"
                      onClick={() =>
                        saveArticle({
                          title: item.title,
                          description: removeHTMLTags(item.description),
                          thumbnail: item.images[0],
                          link: item.link,
                        })
                      }
                    >
                      Save Article
                    </Button>{" "}
                  </Card.Body>
                </Card>
                <br />
              </section>
            ))}
          </Row>
        )}
        {feedData.length > articlesToShow && (
          <div className="text-center">
            <Button className="custom-all-btn" onClick={loadMoreArticles}>
              Load More
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
export default RSSFeed;
