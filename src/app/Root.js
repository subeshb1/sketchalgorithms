import { Provider } from "react-redux";
import React from "react";
import App from "./app/App";
import { BrowserRouter as Router, Route } from "react-router-dom";

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Route path="/"  component={App} />
    </Router>
  </Provider>
);

export default Root;
