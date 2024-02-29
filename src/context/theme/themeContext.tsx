import React, { useState, createContext, Dispatch, SetStateAction } from 'react';

type ThemeContextType = {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
};

const defaultThemeContextValue: ThemeContextType = {
  theme: 'main',
  setTheme: () => {}, // Cette fonction est juste une fonction vide par défaut, elle sera remplacée par useState
};

const ThemeContext = createContext<ThemeContextType>(defaultThemeContextValue);

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState('main');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
