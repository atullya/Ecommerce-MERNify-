import React from "react";
import "./NewsLetter.css";
const NewsLetter = () => {
  return (
    <div>
      <div className="newsletter">
        <h1>Get Exclusive Offers on Your Email.</h1>
        <p>Subscribe to our newsletter and stay updated</p>
        <div>
          <input type="email" placeholder="Your Email ID" />
          <button>Subscribe</button>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
