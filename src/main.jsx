import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { TrackerStore } from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={TrackerStore}>
    <App />
  </Provider>
);
