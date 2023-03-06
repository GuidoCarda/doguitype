import { useState } from "react";
import { THEMES } from "../constants";
import useTheme from "../hooks/useTheme";
import { RiPaintFill } from "react-icons/ri";
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
        className="theme-picker-toggler"
        aria-label="pick a theme"
        onClick={handleToggle}
      >
        <RiPaintFill />
      </button>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, left: "-6rem" }}
            animate={{ opacity: 1, left: "-8rem" }}
            exit={{ opacity: 0, left: "-6rem" }}
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
