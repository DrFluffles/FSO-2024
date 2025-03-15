import { useSelector, useDispatch } from "react-redux";
import { setAnecdotes, vote } from "./reducers/anecdoteReducer";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import { useEffect } from "react";
import anecdoteService from "./services/anecdoteService";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, []);
  return (
    <div>
      <Notification></Notification>
      <Filter></Filter>
      <h2>Anecdotes</h2>
      <AnecdoteList></AnecdoteList>
      <h2>Add</h2>
      <AnecdoteForm></AnecdoteForm>
    </div>
  );
};

export default App;
