import Navbar from './Navbar';
import TodoList from './TodoList';

export default function Main() {
  return (
    <main className="w-11/12 md:w-8/12 lg:w-6/12 mx-auto text-center relative z-10">
      <Navbar />
      <TodoList />
      <footer>Drag and drop to reorder list</footer>
    </main>
  );
}
