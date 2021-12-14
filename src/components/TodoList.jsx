import { useReducer, useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { reducer } from '../context/AppReducer';
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
                className="todo-items"
              >
                <button
                  onClick={() => {
                    dispatch({
                      type: ACTIONS.TOGGLE_TODO,
                      payload: { id: todo.id },
                    });
                  }}
                  className="p-2 bg-gray-700 text-stone-300 mr-4"
                >
                  {todo.complete ? 'Uncheck' : 'Check'}
                </button>
                <span
                  className={
                    todo.complete
                      ? 'text-blueGray200 dark:text-grayBlue600 line-through '
                      : 'text-slate-900 dark:text-grayBlue100hover'
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
                  className="p-2 bg-gray-700 text-stone-300 ml-auto"
                >
                  remove
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
                className="todo-items"
              >
                <button
                  onClick={() =>
                    dispatch({
                      type: ACTIONS.TOGGLE_TODO,
                      payload: { id: todo.id },
                    })
                  }
                  className="p-2 bg-gray-700 text-stone-300 mr-4"
                >
                  {todo.complete ? 'Uncheck' : 'Check'}
                </button>
                <span
                  className={
                    todo.complete
                      ? 'text-blueGray200 dark:text-grayBlue600 line-through '
                      : 'text-slate-900 dark:text-grayBlue100hover'
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
                  className="p-2 bg-gray-700 text-stone-300 ml-auto"
                >
                  remove
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
                className="todo-items"
              >
                <button
                  onClick={() =>
                    dispatch({
                      type: ACTIONS.TOGGLE_TODO,
                      payload: { id: todo.id },
                    })
                  }
                  className="p-2 bg-gray-700 text-stone-300 mr-4"
                >
                  Check
                </button>
                <span
                  className={
                    todo.complete
                      ? 'text-blueGray200 dark:text-grayBlue600 line-through '
                      : 'text-slate-900 dark:text-grayBlue100hover'
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
                  className="p-2 bg-gray-700 text-stone-300 ml-auto"
                >
                  remove
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
          className="text-black w-full rounded p-4 mb-4 shadow-xl"
          placeholder="Create a new todo..."
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </form>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks">
          {provided => (
            <ul
              className="rounded overflow-hidden shadow-xl"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {displayList()}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>

      <div
        className="p-4 shadow-xl 
      bg-white
      dark:bg-darkDesatBlue"
      >
        <nav
          className="flex justify-evenly  text-blueGray500 dark:text-grayBlue500 
        
        "
        >
          <button className="bottom-nav-btn" onClick={() => setListName('all')}>
            All
          </button>
          <button
            className="bottom-nav-btn"
            onClick={() => setListName('active')}
          >
            Active
          </button>
          <button
            className="bottom-nav-btn"
            onClick={() => setListName('completed')}
          >
            Completed
          </button>
        </nav>
      </div>
    </div>
  );
}
