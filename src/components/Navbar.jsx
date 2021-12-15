import { BsMoonStarsFill } from 'react-icons/bs';
import { IoSunnySharp } from 'react-icons/io5';
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';

export default function Navbar() {
  const { dark } = useContext(GlobalContext);
  const [darkMode, setDarkMode] = dark;

  return (
    <nav className="flex w-full justify-between items-center text-slate-50 text-3xl mb-12">
      <span className=" font-bold tracking-widest">TODO</span>
      {darkMode ? (
        <IoSunnySharp
          className="cursor-pointer text-2xl"
          onClick={() => {setDarkMode(false)
          localStorage.setItem('darkMode',false)
          }}
        />
      ) : (
        <BsMoonStarsFill
          className="cursor-pointer text-2xl"
          onClick={() => {setDarkMode(true)
            localStorage.setItem('darkMode',true)}}
        />
      )}
    </nav>
  );
}
