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

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer,
  },
});

noteService.getAll().then((notes) =>
  notes.forEach((note) => {
    store.dispatch(setNotes(notes));
  })
);

store.subscribe(() => console.log(store.getState()));
store.dispatch(filterChange("IMPORTANT"));
store.dispatch(
  createNote("combineReducers forms one reducer from many simple reducers")
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
