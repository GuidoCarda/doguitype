import { useState } from "react";
import { THEMES } from "../constants";
import useTheme from "../hooks/useTheme";
import { GrPaint } from "react-icons/gr";
import { motion, AnimatePresence } from "framer-motion";

const ThemePicker = () => {
  const [show, setShow] = useState(false);
  const [, setTheme] = useTheme();

  const handleToggle = () => setShow((show) => !show);

  const handleThemeSelection = (theme) => {
    setTheme(theme);
    setShow(false);
  };

  return (
    <div className="themes-picker-container">
      <button
        aria-label="pick a theme"
        className="theme-picker-toggler"
        onClick={handleToggle}
      >
        <GrPaint />
      </button>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="themes-container"
          >
            {THEMES.map((theme) => (
              <button
                key={theme}
                aria-label={`select ${theme}`}
                onClick={() => handleThemeSelection(theme)}
              ></button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemePicker;
