import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "antd/dist/antd.css";
import * as serviceWorker from "./serviceWorker";
import thunk from "redux-thunk";
import RootReducer from "./reducers/RootReducer";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";

const store = createStore(RootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
