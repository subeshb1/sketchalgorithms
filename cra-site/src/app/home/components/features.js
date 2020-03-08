import React, { Component } from "react";
import interactive from "../../assets/svg/interactive.svg";
import userFriendly from "../../assets/svg/user-friendly.svg";
import crossPlatform from "../../assets/svg/cross-platform.svg";
import offline from "../../assets/svg/offline.svg";

export default class Features extends Component {
  render() {
    return (
      <div className="section">
        <article id="features">
          <h2>Features</h2>
          <article id="interactive">
            <h3>Interactive Playground</h3>
            <p>
              <img src={interactive} alt="" />
              Sketch Algorithms provides a very Interactive Playground. Change
              inputs, configuration, move nodes, change speed and interval of
              the entire visualization process. We've provided a set of
              tutorials to get you started with the basics and get you started.
              Interact with any algorithms and request visualization for new
              algorithms.
              <br />
              Check out our set of tutorials on How to use our Playground{" "}
              <a href="" style={{ color: "blue" }}>
                Here
              </a>
              .
            </p>
          </article>
          <article id="user-friendly">
            <h3>User Friendly</h3>
            <p>
              <img src={userFriendly} alt="" />
              What we excel at, is User Friendliness. There are lot of sites out
              there providing the same functionalities minus the user
              friendliness. Get started with a simple push of a button with fast
              and beautiful UI. Designed equally for all screen sizes and
              devices Sketch Algorithms provides wide variety of designs and
              themes to customize how you want to view your workspace
            </p>
          </article>
          <article id="cross-platform">
            <h3>Cross Platform</h3>
            <p>
              <img src={crossPlatform} alt="" />
              Use Sketch Algorithms across all platform, Desktops, Mobiles,
              Tablets. It supports almost all platforms capable of supporting
              any web browsers. It supports any screen size, stays responsive
              and is always User Friendly. Use Sketch Algorithms on the go with
              your smart phones and tablets or visualize with large data in you
              Desktops. Add the site to home screen in mobile devices to use it
              like a native app.The choice is yours!
            </p>
          </article>
          <article id="offline">
            <h3>Offline Support</h3>
            <p>
              <img src={offline} alt="" />
              Sketch Algorithms can work offline i.e even when there is no
              internet connection. It requires loading at first visit, and is
              blazing fast to load then. It utilizes Web APIs to fully function
              as an independent app that you can rely even when there is no
              connection. We use service workers to cache our content during
              first visit which is updated whenever newer version of site is
              available.
            </p>
          </article>
        </article>
      </div>
    );
  }
}
