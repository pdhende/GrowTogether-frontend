import React from "react";
import Header from "../components/Header";
import { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import RSSFeed from "../components/RSSFeed";

function Resources() {
  useEffect(() => {
    const script = document.createElement("script");
    document.head.append(script);
    script.src = "https://cse.google.com/cse.js?cx=56d40e6379e314c98";
  }, []);

  return (
    <>
      <Header />
      <div className="background-img-resources-pg">
        <section className="container">
          <div className="mb-2">
            <br></br>
          </div>
          <div className="gcse-search"></div>
        </section>
        <br></br>
        <section className="container">
          <RSSFeed />
        </section>
      </div>
    </>
  );
}

export default Resources;
