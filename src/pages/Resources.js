import React from "react";
import Header from "../components/Header";
import { useEffect } from "react";
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
        <br />
        <section className="container">
          <div className="mb-2">
            <div className="gcse-search">
              <br></br>
            </div>
          </div>
          <p>Discover answers to your pressing questions using our Google search bar</p>
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
