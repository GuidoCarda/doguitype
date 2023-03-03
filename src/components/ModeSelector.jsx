import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const MODES = [
  { type: "time", bounds: [15, 30, 60, 120] },
  { type: "words", bounds: [10, 25, 50, 100] },
];

const modeSelector = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
  fadeInStart: { opacity: 0, y: -10 },
  fadeInEnd: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ModeSelector = ({ handleModeSelection, currentMode }) => {
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
          {MODES[
            MODES.findIndex((mode) => mode.type === currentMode.type)
          ].bounds.map((bound) => (
            <motion.button
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
