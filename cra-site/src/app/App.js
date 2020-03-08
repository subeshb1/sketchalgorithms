import React, { Component } from "react";
import { Route, NavLink, Link, Switch } from "react-router-dom";
import "./App.css";
import "./css/index.css";
import { createComponent, createPortal } from "./lib";
import { Sorting, DrawableGraph, Graph, Home, Games, TOC } from "./containers";
import { Footer, ShareBar } from "./universal-components";
const Header = createPortal(document.getElementById("header"), "Header");
const FooterPortal = createPortal(
  document.getElementById("footer"),
  "FooterPortal"
);
const Navbar = createComponent("nav", { className: "navbar" });
const NavItem = createComponent("div", { className: "item" });

const NoContent = () => (
  <h1>
    Page Not Found. Click{" "}
    <Link to="/" style={{ color: "blue" }}>
      Here
    </Link>{" "}
    to Go Back.
  </h1>
);

class App extends Component {
  render() {
    return (
      <React.Fragment>
        {/* Portal */}
        <Header>
          <Navbar>
            <NavItem className="header item">
              <img src="/logo.svg" alt="" />
              <a>Algorithms</a>
            </NavItem>
            <NavItem as={NavLink} to="/" exact>
              Home
            </NavItem>
            <NavItem as={NavLink} to="/sorting/">
              Sorting
            </NavItem>
            <NavItem as={NavLink} to="/graph-search/">
              Graph
            </NavItem>
            <NavItem as={NavLink} to="/drawable-graph/">
              Drawable Graph
            </NavItem>
            <NavItem as={NavLink} to="/games/">
              Games
            </NavItem>
            <NavItem as={NavLink} to="/toc/">
              Theory of Computation
            </NavItem>
          </Navbar>
        </Header>
        <ShareBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/sorting" component={Sorting} />
          <Route path="/graph-search" component={Graph} />
          <Route path="/drawable-graph" component={DrawableGraph} />
          <Route path="/games" component={Games} />
          <Route path="/toc" component={TOC} />
          <Route component={NoContent} />
        </Switch>
        <FooterPortal>
          <Footer />
        </FooterPortal>
      </React.Fragment>
    );
  }
}

export default App;
