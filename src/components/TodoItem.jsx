import { ACTIONS } from '../context/GlobalContext';
import { ImBin } from 'react-icons/im';
import { RiEdit2Fill } from 'react-icons/ri';
import { IoCheckmarkDoneCircle } from 'react-icons/io5';

export default function TodoItem({ arr, Draggable, dispatch, focus }) {
  return arr.map((todo, index) => (
    <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
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
}
