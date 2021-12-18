export default function BottomNav({ setListName }) {
  return (
    <div
      className="p-4 shadow-xl dark:shadow-black
bg-white
dark:bg-darkDesatBlue"
    >
      <nav
        className="flex justify-evenly  text-blueGray500 dark:text-grayBlue500 
  
  "
      >
        <button
          className="bottom-nav-btn focus:text-cyan-500 dark:focus:text-cyan-200"
          onClick={() => setListName('all')}
        >
          All
        </button>
        <button
          className="bottom-nav-btn focus:text-cyan-500 dark:focus:text-cyan-200"
          onClick={() => setListName('active')}
        >
          Active
        </button>
        <button
          className="bottom-nav-btn focus:text-cyan-500 dark:focus:text-cyan-200"
          onClick={() => setListName('completed')}
        >
          Completed
        </button>
      </nav>
    </div>
  );
}
