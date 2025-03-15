import { createSlice, current } from "@reduxjs/toolkit";
import { showMessage } from "./messageReducer";

const anecdotesAtStart = [];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};
const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload);
    },
    vote(state, action) {
      const id = action.payload;
      const noteToVote = state.find((n) => n.id === id);
      const changeAnecdote = { ...noteToVote, votes: noteToVote.votes + 1 };

      console.log(current(state));
      return state.map((note) => (note.id == id ? changeAnecdote : note));
    },
    appendAnecdotes(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});
export const { createAnecdote, vote, appendAnecdotes, setAnecdotes } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
