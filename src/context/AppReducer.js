import { ACTIONS } from './GlobalContext';

function newTodos(name) {
  return { id: Date.now(), name: name, complete: false };
}

function dragTodos(result, todos) {
  const items = Array.from(todos);
  const [reorderItem] = items.splice(result.origin, 1);
  items.splice(result.des, 0, reorderItem);

  return items;
}

export const reducer = (todos, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...todos, newTodos(action.payload)];

    case ACTIONS.TOGGLE_TODO:
      return todos.map(todo => {
        if (todo.id === action.payload.id) {
          return { ...todo, complete: !todo.complete };
        }
        return todo;
      });

    case ACTIONS.DELETE_TODO:
      return todos.filter(todo => todo.id !== action.payload.id);

    case ACTIONS.EDIT_TODO:
      return todos.map(todo => {
        if (todo.id === action.payload.id) {
          return { ...todo, name: todo.name };
        }
        return todo;
      });

    case ACTIONS.DRAG_TODO:
      return dragTodos(action.payload, todos);

    default:
      return todos;
  }
};
