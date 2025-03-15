import { useDispatch } from "react-redux";
import anecdoteReducer, { createAnecdote } from "../reducers/anecdoteReducer";
import {
  showMessage,
  removeMessage,
  setNotification,
} from "../reducers/messageReducer";
import anecdoteService from "../services/anecdoteService";
const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;

    event.target.anecdote.vaue = "";

    const newAnecdote = { content, votes: 0 };
    dispatch(createAnecdote(newAnecdote));
    dispatch(setNotification(`You added ${newAnecdote.content}`, 5000));
  };

  return (
    <form onSubmit={addAnecdote}>
      <div>
        <input type="text" name="anecdote" />
      </div>
      <button type="submit">create</button>
    </form>
  );
};
export default AnecdoteForm;
