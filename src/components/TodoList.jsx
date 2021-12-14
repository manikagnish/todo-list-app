import { useReducer, useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { reducer } from '../context/AppReducer';
import Todo from './Todo';
import { ACTIONS } from '../context/GlobalContext';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function TodoList() {
  const [todos, dispatch] = useReducer(
    reducer,
    JSON.parse(localStorage.getItem('todos')) || []
  );
  const { getName } = useContext(GlobalContext);
  const [name, setName] = getName;
  const [listName, setListName] = useState('all');
  // const [tasks, updateTasks] = useState(todos);

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
        return todos.map((todo, index) => (
          <Draggable
            key={todo.id}
            draggableId={todo.id.toString()}
            index={index}
          >
            {provided => (
              <li
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                className="p-4 bg-green-400 list-none border-4 border-y-cyan-900"
              >
                <button
                  onClick={() =>
                    dispatch({
                      type: ACTIONS.TOGGLE_TODO,
                      payload: { id: todo.id },
                    })
                  }
                  className="p-2 bg-gray-700 text-stone-300"
                >
                  toggle
                </button>
                <span
                  className={
                    todo.complete
                      ? 'text-slate-500 line-through'
                      : 'text-slate-900'
                  }
                >
                  {todo.name}
                </span>
                <button
                  onClick={() =>
                    dispatch({
                      type: ACTIONS.DELETE_TODO,
                      payload: { id: todo.id },
                    })
                  }
                  className="p-2 bg-gray-700 text-stone-300"
                >
                  close
                </button>
              </li>
            )}
          </Draggable>
        ));
      case 'completed':
        const arr = todos.filter(todo => todo.complete) || [];
        return arr.map((todo, index) => (
          <Draggable
            key={todo.id}
            draggableId={todo.id.toString()}
            index={index}
          >
            {provided => (
              <li
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                className="p-4 bg-green-400 list-none border-4 border-y-cyan-900"
              >
                <button
                  onClick={() =>
                    dispatch({
                      type: ACTIONS.TOGGLE_TODO,
                      payload: { id: todo.id },
                    })
                  }
                  className="p-2 bg-gray-700 text-stone-300"
                >
                  toggle
                </button>
                <span
                  className={
                    todo.complete
                      ? 'text-slate-500 line-through'
                      : 'text-slate-900'
                  }
                >
                  {todo.name}
                </span>
                <button
                  onClick={() =>
                    dispatch({
                      type: ACTIONS.DELETE_TODO,
                      payload: { id: todo.id },
                    })
                  }
                  className="p-2 bg-gray-700 text-stone-300"
                >
                  close
                </button>
              </li>
            )}
          </Draggable>
        ));
      case 'active':
        const arrActive = todos.filter(todo => !todo.complete) || [];
        return arrActive.map((todo, index) => (
          <Draggable
            key={todo.id}
            draggableId={todo.id.toString()}
            index={index}
          >
            {provided => (
              <li
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                className="p-4 bg-green-400 list-none border-4 border-y-cyan-900"
              >
                <button
                  onClick={() =>
                    dispatch({
                      type: ACTIONS.TOGGLE_TODO,
                      payload: { id: todo.id },
                    })
                  }
                  className="p-2 bg-gray-700 text-stone-300"
                >
                  toggle
                </button>
                <span
                  className={
                    todo.complete
                      ? 'text-slate-500 line-through'
                      : 'text-slate-900'
                  }
                >
                  {todo.name}
                </span>
                <button
                  onClick={() =>
                    dispatch({
                      type: ACTIONS.DELETE_TODO,
                      payload: { id: todo.id },
                    })
                  }
                  className="p-2 bg-gray-700 text-stone-300"
                >
                  close
                </button>
              </li>
            )}
          </Draggable>
        ));

      default:
        return [];
    }
  }

  const handleDragEnd = result => {
    if (!result.destination) return;

    dispatch({
      type: ACTIONS.DRAG_TODO,
      payload: { des: result.destination.index, origin: result.source.index },
    });
  };

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

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks">
          {provided => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {displayList()}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <div className="p-4 bg-green-400 list-none">
        <nav className="flex justify-between">
          <button onClick={() => setListName('all')}>all</button>
          <button onClick={() => setListName('active')}>active</button>
          <button onClick={() => setListName('completed')}>completed</button>
        </nav>
      </div>
    </div>
  );
}
