import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import configureStore from "./redux/store/configure-store";
import "./assets/scss/Common.scss";
import "antd/dist/antd.css";
import NetworkService from "./redux/networkservice/networkService";
import { setAuthToken, isLoggedIn } from "./services/auth";

const store = configureStore();
if (isLoggedIn()) {
  setAuthToken();
}
NetworkService.setupInterceptors(store);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
