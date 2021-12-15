import { useContext } from 'react';
import { GlobalContext } from './context/GlobalContext';
import Header from './components/Header';
import Main from './components/Main';

function App() {
  const { dark } = useContext(GlobalContext);
  const [darkMode] = dark;

  return (
    <div
      className={
        darkMode
          ? 'dark bg-black text-stone-50 min-h-screen'
          : 'light bg-white text-stone-900 min-h-screen'
      }
    >
      <Header />
      <Main />
    </div>
  );
}

export default App;
