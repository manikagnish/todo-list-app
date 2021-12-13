import Header from './components/Header';
import Main from './components/Main';
import { useContext } from 'react';
import { GlobalContext } from './context/GlobalContext';

function App() {
  const { dark } = useContext(GlobalContext);
  const [darkMode] = dark;

  return (
    <div className={darkMode ? 'dark' : 'light'}>
      <Header />
      <Main />
    </div>
  );
}

export default App;
