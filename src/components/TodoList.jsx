import { useReducer, useContext, useEffect, useState, useRef } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { reducer } from '../context/AppReducer';
import { ACTIONS } from '../context/GlobalContext';
import { ImBin } from 'react-icons/im';
import { RiEdit2Fill } from 'react-icons/ri';
import { IoCheckmarkDoneCircle } from 'react-icons/io5';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function TodoList() {
  const [todos, dispatch] = useReducer(
    reducer,
    JSON.parse(localStorage.getItem('todos')) || []
  );
  const { getName } = useContext(GlobalContext);
  const [name, setName] = getName;
  const [listName, setListName] = useState('all');
  const inputRef = useRef();
  const [editor, setEditor] = useState('');

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', changeWidth);

    return () => {
      window.removeEventListener('resize', changeWidth);
    };
  }, []);

  function focus(todo) {
    inputRef.current.focus();
    inputRef.current.value = todo.name;
    setEditor(todo.name);
    dispatch({
      type: ACTIONS.DELETE_TODO,
      payload: { id: todo.id },
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    dispatch({ type: ACTIONS.ADD_TODO, payload: name });
    setName('');
  };

  const handleEditSubmit = e => {
    e.preventDefault();
    dispatch({ type: ACTIONS.ADD_TODO, payload: editor });
    setEditor('');
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
                  className={
                    todo.complete
                      ? ' mr-2 text-xl dark:text-grayBlue100'
                      : 'p-2 border border-gray-700 dark:border-grayBlue200 rounded text-gray-700 mr-2'
                  }
                >
                  {todo.complete ? <IoCheckmarkDoneCircle /> : ''}
                </button>

                <span
                  className={
                    todo.complete
                      ? 'text-blueGray200 dark:text-grayBlue600 line-through mr-auto'
                      : 'text-slate-900 dark:text-grayBlue100hover mr-auto'
                  }
                >
                  {todo.name}
                </span>
                <button
                  onClick={() => {
                    focus(todo);
                  }}
                  className="text-gray-700 dark:text-grayBlue100 ml-2"
                >
                  <RiEdit2Fill />
                </button>
                <button
                  onClick={() =>
                    dispatch({
                      type: ACTIONS.DELETE_TODO,
                      payload: { id: todo.id },
                    })
                  }
                  className="text-gray-700 dark:text-grayBlue100 ml-2"
                >
                  <ImBin />
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
                  onClick={() => {
                    dispatch({
                      type: ACTIONS.TOGGLE_TODO,
                      payload: { id: todo.id },
                    });
                  }}
                  className={
                    todo.complete
                      ? ' mr-2 text-xl dark:text-grayBlue100'
                      : 'p-2 border border-gray-700 dark:border-grayBlue200 rounded text-gray-700 mr-2'
                  }
                >
                  {todo.complete ? <IoCheckmarkDoneCircle /> : ''}
                </button>
                <span
                  className={
                    todo.complete
                      ? 'text-blueGray200 dark:text-grayBlue600 line-through mr-auto'
                      : 'text-slate-900 dark:text-grayBlue100hover mr-auto'
                  }
                >
                  {todo.name}
                </span>
                <button
                  onClick={() => {
                    focus(todo);
                  }}
                  className="text-gray-700 dark:text-grayBlue100 ml-2"
                >
                  <RiEdit2Fill />
                </button>
                <button
                  onClick={() =>
                    dispatch({
                      type: ACTIONS.DELETE_TODO,
                      payload: { id: todo.id },
                    })
                  }
                  className="text-gray-700 dark:text-grayBlue100 ml-2"
                >
                  <ImBin />
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
                  onClick={() => {
                    dispatch({
                      type: ACTIONS.TOGGLE_TODO,
                      payload: { id: todo.id },
                    });
                  }}
                  className={
                    todo.complete
                      ? ' mr-2 text-xl dark:text-grayBlue100'
                      : 'p-2 border border-gray-700 dark:border-grayBlue200 rounded text-gray-700 mr-2'
                  }
                >
                  {todo.complete ? <IoCheckmarkDoneCircle /> : ''}
                </button>
                <span
                  className={
                    todo.complete
                      ? 'text-blueGray200 dark:text-grayBlue600 line-through mr-auto'
                      : 'text-slate-900 dark:text-grayBlue100hover mr-auto'
                  }
                >
                  {todo.name}
                </span>
                <button
                  onClick={() => {
                    focus(todo);
                  }}
                  className="text-gray-700 dark:text-grayBlue100 ml-2"
                >
                  <RiEdit2Fill />
                </button>
                <button
                  onClick={() =>
                    dispatch({
                      type: ACTIONS.DELETE_TODO,
                      payload: { id: todo.id },
                    })
                  }
                  className="text-gray-700 dark:text-grayBlue100 ml-2"
                >
                  <ImBin />
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
      <div className="relative">
        <form onSubmit={handleSubmit}>
          <input
            className="text-black w-full rounded p-4 mb-4 shadow-xl"
            placeholder="Create a new todo..."
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </form>

        <form onSubmit={handleEditSubmit}>
          <input
            type="text"
            ref={inputRef}
            className="text-black w-full rounded p-4 mb-4 bg-transparent absolute top-0 left-0 focus:bg-white"
            placeholder="Create a new todo..."
            value={editor}
            onChange={e => setEditor(e.target.value)}
          />
        </form>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks">
          {provided => (
            <ul
              className="rounded overflow-hidden shadow-xl dark:shadow-black text-left"
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
        className="p-4 shadow-xl dark:shadow-black
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
