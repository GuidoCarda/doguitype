import { createContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const ThemeContext = createContext(null);

const ThemeProvider = ({ children }) => {
  const [userPreference, setUserPreference] = useLocalStorage(
    "theme",
    "theme-1"
  );
  const [theme, setTheme] = useState(userPreference);

  useEffect(() => {
    setTheme(userPreference);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("color-scheme", theme);
  }, [theme]);

  const handleThemeChange = (newTheme) => {
    if (newTheme === theme) return;
    setTheme(newTheme);
    setUserPreference(newTheme);
  };

  return (
    <ThemeContext.Provider value={[theme, handleThemeChange]}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
