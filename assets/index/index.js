import "../common/common.js";
import "./index.scss";

import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import App from "../components/App";
import appReducer from "../reducers/app";

ReactDOM.render(
    <Provider store={createStore(appReducer)}>
      <App />
    </Provider>,
    document.getElementById("root")
);
