import { useSelector, useDispatch } from "react-redux";
import { vote } from "./reducers/anecdoteReducer";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";

const App = () => {
  return (
    <div>
      <Filter></Filter>
      <h2>Anecdotes</h2>
      <AnecdoteList></AnecdoteList>
      <h2>Add</h2>
      <AnecdoteForm></AnecdoteForm>
    </div>
  );
};

export default App;
