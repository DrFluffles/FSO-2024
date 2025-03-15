import { useDispatch, useSelector } from "react-redux";
import { vote, increaseVote } from "../reducers/anecdoteReducer";
import {
  showVote,
  removeMessage,
  setNotification,
} from "../reducers/messageReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) =>
    state.anecdotes.filter((anecdote) =>
      anecdote.content.includes(state.filter)
    )
  );
  const handleVote = (id, content) => {
    dispatch(increaseVote(id));
    dispatch(setNotification(`You votes for ' ${content}'`, 2000));
  };

  const dispatch = useDispatch();
  return (
    <div>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote.id, anecdote.content)}>
                vote
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;
