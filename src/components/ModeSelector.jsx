import React, { useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MODES } from "../constants";

const modeSelector = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
  fadeInStart: { opacity: 0, y: -10 },
  fadeInEnd: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ModeSelector = ({ handleModeSelection, currentMode }) => {
  const currModeIdx = useCallback(
    () => MODES.findIndex(({ type }) => type === currentMode.type),
    [currentMode]
  );

  const mode = MODES[currModeIdx()].bounds;

  return (
    <motion.div
      className="mode-selector-container"
      initial="fadeInStart"
      animate="fadeInEnd"
      exit="fadeInStart"
      variants={modeSelector}
    >
      {MODES.map(({ type, bounds }) => {
        return (
          <button
            aria-label={`${type} mode`}
            onClick={() =>
              handleModeSelection({
                type,
                bound: bounds[0],
              })
            }
            key={type}
            className={`${currentMode.type === type && "selected"} `}
          >
            {type}
          </button>
        );
      })}
      <div key={currentMode.type}>
        <AnimatePresence>
          {mode.map((bound) => (
            <motion.button
              aria-label={`${bound} ${
                currentMode.type === "time" ? "seconds" : "words"
              }`}
              initial="hidden"
              animate="visible"
              variants={modeSelector}
              onClick={() => handleModeSelection({ ...currentMode, bound })}
              key={bound}
              className={`${currentMode.bound === bound && "selected"}`}
            >
              {bound}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ModeSelector;
