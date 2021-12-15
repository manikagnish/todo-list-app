import Navbar from './Navbar';
import TodoList from './TodoList';

export default function Main() {
  return (
    <main className="w-11/12 md:w-8/12 lg:w-6/12 mx-auto text-center relative z-10 mt-14 md:mt-20 ">
      <Navbar />
      <TodoList />
      <footer className="text-blueGray500 dark:text-grayBlue500 mt-8 md:mt-12 pb-16">
        Drag and drop to reorder list
      </footer>
    </main>
  );
}
