import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";

import App from "./App";
import filterReducer, { filterChange } from "./reducers/filterReducer";
import noteService from "./services/notes";
import noteReducer, {
  appendNote,
  setNotes,
  createNote,
} from "./reducers/noteReducer";

import store from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
