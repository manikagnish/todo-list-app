import { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalContext';

import bgDeskLight from './images/bg-desktop-light.jpg';
import bgDeskDark from './images/bg-desktop-dark.jpg';
import bgMobileLight from './images/bg-mobile-light.jpg';
import bgMobileDark from './images/bg-mobile-light.jpg';

export default function Header() {
  const { dark } = useContext(GlobalContext);
  const [darkMode] = dark;
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', changeWidth);

    return () => {
      window.removeEventListener('resize', changeWidth);
    };
  }, []);
  return (
    <div className="absolute top-0 left-0 w-full">
      {screenWidth < 600 ? (
        <img
          src={darkMode ? bgMobileDark : bgMobileLight}
          alt="bgr"
          className="w-full object-cover h-80"
        />
      ) : (
        <img
          src={darkMode ? bgDeskDark : bgDeskLight}
          alt="bgr"
          className="w-full object-cover h-80"
        />
      )}
    </div>
  );
}
