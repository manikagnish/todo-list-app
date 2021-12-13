import { BsMoonStarsFill } from 'react-icons/bs';
import { IoSunnySharp } from 'react-icons/io5';
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';

export default function Navbar() {
  const { dark } = useContext(GlobalContext);
  const [darkMode, setDarkMode] = dark;

  return (
    <nav className="flex w-full justify-between items-center">
      <span>TODO</span>
      {darkMode ? (
        <IoSunnySharp
          className="cursor-pointer"
          onClick={() => setDarkMode(false)}
        />
      ) : (
        <BsMoonStarsFill
          className="cursor-pointer"
          onClick={() => setDarkMode(true)}
        />
      )}
    </nav>
  );
}
