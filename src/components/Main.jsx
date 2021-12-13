import Navbar from './Navbar';
import TodoList from './TodoList';

export default function Main() {
  return (
    <main className="bg-slate-500 dark:bg-red-500">
      <Navbar />
      <TodoList />
      <footer>Drag and drop to reorder list</footer>
    </main>
  );
}
