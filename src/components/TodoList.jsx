import { useReducer, useContext, useEffect, useState } from 'react';
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
  const [listName, setListName] = useState('all');

  const handleSubmit = e => {
    e.preventDefault();
    dispatch({ type: ACTIONS.ADD_TODO, payload: name });
    setName('');
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  function displayList() {
    switch (listName) {
      case 'all':
        return todos.map(todo => (
          <Todo key={todo.id} todo={todo} dispatch={dispatch} />
        ));
      case 'completed':
        const arr = todos.filter(todo => todo.complete) || [];
        return arr.map(todo => (
          <Todo key={todo.id} todo={todo} dispatch={dispatch} />
        ));
      case 'active':
        const arrActive = todos.filter(todo => !todo.complete) || [];
        return arrActive.map(todo => (
          <Todo key={todo.id} todo={todo} dispatch={dispatch} />
        ));

      default:
        return [];
    }
  }

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
        {displayList()}

        <li className="p-4 bg-green-400 list-none">
          <nav className="flex justify-between">
            <button onClick={() => setListName('all')}>all</button>
            <button onClick={() => setListName('active')}>active</button>
            <button onClick={() => setListName('completed')}>completed</button>
          </nav>
        </li>
      </ul>
    </div>
  );
}
