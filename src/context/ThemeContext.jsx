import { createContext, useState } from "react";

export const ThemeContext = createContext(null);

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("theme-1");

  const handleThemeChange = (newTheme) => {
    if (newTheme === theme) return;
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={[theme, handleThemeChange]}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
