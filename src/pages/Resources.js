import React from "react";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import RSSFeed from "../components/RSSFeed";
import { Button, Card, Row, Col, Modal, CarouselItem } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";

function Resources() {
  const [videoData, setVideoData] = useState([]);
  const [source, setSource] = useState("");
  const [showVideo, setShowVideo] = useState(false);
  const [videoProperty, setVideoProperty] = useState({});

  const reduceVideos = (acc, cur, index) => {
    const groupIndex = Math.floor(index / 3);
    if (!acc[groupIndex]) acc[groupIndex] = [];
    acc[groupIndex].push(cur);
    console.log(acc);
    return acc;
  };

  let reqURL =
    "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=parenting&channelId=UCAuUUnT6oDeKwE6v1NGQxug&type=video&key=";
  reqURL += `${process.env.REACT_APP_API_KEY}`;

  useEffect(() => {
    const script = document.createElement("script");
    document.head.append(script);
    script.src = "https://cse.google.com/cse.js?cx=56d40e6379e314c98";

    fetch(reqURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      setVideoData(data.items);
    });
  }, []);

  return (
    <>
      <Header />
      <div className="background-img-resources-pg">
        <br />
        <section className="container">
          <div className="mb-2">
            <div className="gcse-search">
              <br></br>
            </div>
          </div>
          <p>
            Discover answers to your pressing questions using our Google search bar
            <br />
          </p>
        </section>
        <br></br>
        <section className="container">
          <RSSFeed />
        </section>
        <div>
            <Carousel>
              {videoData.reduce(reduceVideos, []).map((item, index) => (
                <Carousel.Item key={index}>
                  <div className="d-flex justify-content-center">
                    {item.map((video, index) => {
                      return (
                        <Card
                          className="custom-video-card"
                          onClick={() => {
                            setVideoProperty(video);
                            setShowVideo(true);
                            setSource(
                              "https://www.youtube.com/embed/" +
                                video.id.videoId
                            );
                          }}
                        >
                          {video.snippet.title}
                          <img
                            src={video.snippet.thumbnails.medium.url}
                            id={video.id.videoId}
                            alt={video.snippet.title}
                          />
                        </Card>
                      );
                    })}
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
      </div>
      <Modal
        show={showVideo}
        className="centered-modal"
        onHide={() => setShowVideo(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe
            width="450"
            height="315"
            src={source}
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen
          ></iframe>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}

export default Resources;
