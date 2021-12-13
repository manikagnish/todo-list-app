import { ACTIONS } from '../context/GlobalContext';

export default function Todo({ todo, dispatch }) {
  return (
    <li className="p-4 bg-green-400 list-none">
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
          todo.complete ? 'text-slate-500 line-through' : 'text-slate-900'
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
  );
}
