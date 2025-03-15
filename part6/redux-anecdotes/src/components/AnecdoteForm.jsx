import { useDispatch } from "react-redux";
import anecdoteReducer, { createAnecdote } from "../reducers/anecdoteReducer";
import { showMessage, removeMessage } from "../reducers/messageReducer";
const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.vaue = "";
    dispatch(createAnecdote(content));
    dispatch(showMessage(content));
    setTimeout(() => {
      dispatch(removeMessage());
    }, 5000);
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
