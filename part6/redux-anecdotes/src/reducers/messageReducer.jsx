import { createSlice, current } from "@reduxjs/toolkit";

const initialState = "Hello world";
const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    showMessage(state, action) {
      state = "The following anecdote has been added" + action.payload;
      return state;
    },
    showVote(state, action) {
      state = action.payload;
      return state;
    },
    removeMessage(state, action) {
      state = "";
      return state;
    },
  },
});
export const { showMessage, showVote, removeMessage } = messageSlice.actions;
export default messageSlice.reducer;
