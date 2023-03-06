import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext(null);

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("theme-1");

  useEffect(() => {
    document.documentElement.setAttribute("color-scheme", theme);
  }, [theme]);

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
