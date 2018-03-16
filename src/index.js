import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

// import { createStore, applyMiddleware, compose } from "redux";
// import createSagaMiddleware from "redux-saga";
// import { Provider } from "react-redux";
//
// // create the saga middleware
// const sagaMiddleware = createSagaMiddleware();

// dev tools middleware

// create a redux store with our reducer above and middleware

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
