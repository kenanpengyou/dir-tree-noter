import "../common/common.js";
import "./index.scss";

import React from "react";
import ReactDOM from "react-dom";
import "babel-polyfill";
import { Provider } from "react-redux";
import App from "../components/App";
import Footer from "../components/Footer";
import store from "../store";

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
);

ReactDOM.render(
    <Provider store={store}>
      <Footer />
    </Provider>,
    document.getElementById("footer")
);
