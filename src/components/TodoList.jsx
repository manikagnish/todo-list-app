import { useReducer, useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { reducer } from '../context/AppReducer';
import Todo from './Todo';
import { ACTIONS } from '../context/GlobalContext';

export default function TodoList() {
  const [todos, dispatch] = useReducer(
    reducer,
    JSON.parse(localStorage.getItem('todos')) || []
  );
  const { getName } = useContext(GlobalContext);
  const [name, setName] = getName;

  const handleSubmit = e => {
    e.preventDefault();
    dispatch({ type: ACTIONS.ADD_TODO, payload: name });
    setName('');
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="text-black"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </form>
      <ul>
        {todos.map(todo => (
          <Todo key={todo.id} todo={todo} dispatch={dispatch} />
        ))}
      </ul>
    </div>
  );
}
