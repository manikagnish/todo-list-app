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

  const completed = [];
  const active = [];

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));

    for (let i = 0; i < todos.length; i++) {
      if (todos[i].complete) {
        completed.push(todos[i]);
        localStorage.setItem('completedTodos', JSON.stringify(completed));
      } else if (!todos[i].complete) {
        active.push(todos[i]);
        localStorage.setItem('activeTodos', JSON.stringify(active));
      }
    }
  }, [todos, active, completed]);

  function displayList() {
    switch (listName) {
      case 'all':
        return todos.map(todo => (
          <Todo key={todo.id} todo={todo} dispatch={dispatch} />
        ));
      case 'completed':
        const arr = JSON.parse(localStorage.getItem('completedTodos')) || [];
        return arr.map(todo => (
          <Todo key={todo.id} todo={todo} dispatch={dispatch} />
        ));
      case 'active':
        return JSON.parse(localStorage.getItem('activeTodos')).map(todo => (
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
