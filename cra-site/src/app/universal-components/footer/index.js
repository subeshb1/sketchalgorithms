import React, { Component } from "react";
import "./footer.css";
// import { a } from "react-router-dom";

export default class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="links">
          <div className="group">
            Site Links
            <a href="/" className="item">
              Home
            </a>
            <a href="/sorting/" className="item">
              Sorting
            </a>
            <a href="/graph-search/" className="item">
              Graph
            </a>
            <a href="/drawable-graph" className="item">
              Drawable Graph
            </a>
            <a href="/toc/" className="item">
              Theory of Computation
            </a>
          </div>
          <div className="group">
            Company
            <a href="" className="item">
              About
            </a>
            <a href="" className="item">
              Contact
            </a>
            <a href="" className="item">
              Hire
            </a>
            <a href="" className="item">
              Privacy Policy
            </a>
            <a href="" className="item">
              Terms of Service
            </a>
          </div>
          <div className="group">
            Stay In Touch
            <a
              href="https://www.facebook.com/sketchalgorithms/"
              className="item"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/sketchalgorithms/"
              className="item"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a
              href="https://twitter.com/sketchalgorithm"
              className="item"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
            <a
              href="https://www.youtube.com/channel/UCdKunpByu5YTHeUfS8cT8rw"
              className="item"
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube
            </a>
          </div>
        </div>
        <div className="copyright">Subesh Bhandari 2018</div>
      </div>
    );
  }
}
