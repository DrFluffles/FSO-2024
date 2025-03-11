import { useSelector, useDispatch } from "react-redux";
import { vote } from "./reducers/anecdoteReducer";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList></AnecdoteList>
      <h2>Add</h2>
      <AnecdoteForm></AnecdoteForm>
    </div>
  );
};

export default App;
