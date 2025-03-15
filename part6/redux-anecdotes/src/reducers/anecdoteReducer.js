import { createSlice, current } from "@reduxjs/toolkit";
import { showMessage } from "./messageReducer";
import anecdoteService from "../services/anecdoteService";

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
export const { vote, appendAnecdotes, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdotes(newAnecdote));
  };
};

export const increaseVote = (id) => {
  return async (dispatch) => {
    const voteAnecdote = await anecdoteService.getAnecdote(id);
    const newAnecdote = { ...voteAnecdote, votes: voteAnecdote.votes + 1 };
    const updatedAnecdote = await anecdoteService.increaseVote(id, newAnecdote);
    console.log(updatedAnecdote);
  };
};
export default anecdoteSlice.reducer;
