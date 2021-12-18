import { useReducer, useEffect, useState, useRef } from 'react';
import { reducer } from '../context/AppReducer';
import { ACTIONS } from '../context/GlobalContext';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import BottomNav from './BottomNav';
import ListComponent from './ListComponent';

export default function TodoList() {
  const [todos, dispatch] = useReducer(
    reducer,
    JSON.parse(localStorage.getItem('todos')) || []
  );

  const active = todos.filter(todo => !todo.complete);
  const completed = todos.filter(todo => todo.complete);
  const [listName, setListName] = useState('active');
  const inputRef = useRef();
  const [editor, setEditor] = useState('');

  function focus(todo) {
    inputRef.current.focus();
    inputRef.current.value = todo.name;
    setEditor(todo.name);
    dispatch({
      type: ACTIONS.DELETE_TODO,
      payload: { id: todo.id },
    });
  }

  const handleEditSubmit = e => {
    e.preventDefault();
    dispatch({ type: ACTIONS.ADD_TODO, payload: editor });
    setEditor('');
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleActiveDragEnd = result => {
    if (!result.destination) return;
    const [reorderItem] = active.splice(result.source.index, 1);
    active.splice(result.destination.index, 0, reorderItem);
  };

  const handleAllDragEnd = result => {
    if (!result.destination) return;
    const [reorderItem] = todos.splice(result.source.index, 1);
    todos.splice(result.destination.index, 0, reorderItem);
  };

  const handleCompleteDragEnd = result => {
    if (!result.destination) return;
    const [reorderItem] = completed.splice(result.source.index, 1);
    completed.splice(result.destination.index, 0, reorderItem);
  };

  return (
    <div>
      <ListComponent
        inputRef={inputRef}
        editor={editor}
        setEditor={setEditor}
        handleEditSubmit={handleEditSubmit}
        DragDropContext={DragDropContext}
        Droppable={Droppable}
        handleDragEnd={
          listName === 'all'
            ? handleAllDragEnd
            : listName === 'active'
            ? handleActiveDragEnd
            : listName === 'completed' && handleCompleteDragEnd
        }
        Draggable={Draggable}
        focus={focus}
        arr={
          listName === 'all'
            ? todos
            : listName === 'active'
            ? active
            : listName === 'completed' && completed
        }
        dispatch={dispatch}
      />

      <BottomNav setListName={setListName} />
    </div>
  );
}
