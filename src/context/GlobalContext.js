import { useState, createContext } from 'react';

export const ACTIONS = {
  ADD_TODO: 'add-todo',
  TOGGLE_TODO: 'toggle-todo',
  DELETE_TODO: 'delete-todo',
};

export const GlobalContext = createContext();

export const GlobalProvider = props => {
  const [darkMode, setDarkMode] = useState(false);
  const [name, setName] = useState('');

  return (
    <GlobalContext.Provider
      value={{
        dark: [darkMode, setDarkMode],
        getName: [name, setName],
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
