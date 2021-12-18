import TodoItem from './TodoItem';

export default function ListComponent({
  DragDropContext,
  Droppable,
  handleDragEnd,
  Draggable,
  focus,
  arr,
  dispatch,
  inputRef,
  editor,
  setEditor,
  handleEditSubmit,
}) {
  return (
    <>
      <form onSubmit={handleEditSubmit}>
        <input
          type="text"
          ref={inputRef}
          className="text-black w-full rounded p-4 mb-4  top-0 left-0 focus:bg-white"
          placeholder="Create a new todo..."
          value={editor}
          onChange={e => setEditor(e.target.value)}
        />
      </form>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks">
          {provided => (
            <ul
              className="rounded overflow-hidden shadow-xl dark:shadow-black text-left"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <TodoItem
                Draggable={Draggable}
                focus={focus}
                arr={arr}
                dispatch={dispatch}
              />
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}
