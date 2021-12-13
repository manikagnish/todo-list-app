import { ACTIONS } from './GlobalContext';

function newTodos(name) {
  return { id: Date.now(), name: name, complete: false };
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

    default:
      return todos;
  }
};
