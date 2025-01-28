import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = {
    isDarkMode,
    colors: isDarkMode ? {
      primary: '#1E1E1E',
      background: '#121212',
      card: '#2D2D2D',
      text: '#FFFFFF',
      border: '#404040',
      accent: '#CD5C5C'
    } : {
      primary: '#CD5C5C',
      background: '#CD5C5C',
      card: '#FFFFFF',
      text: '#333333',
      border: '#f0f0f0',
      accent: '#CD5C5C'
    },
    toggleTheme: () => setIsDarkMode(prev => !prev)
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
} 