import React from "react";
import { motion } from "framer-motion";

const MODES = [
  { type: "time", bounds: [15, 30, 60, 120] },
  { type: "words", bounds: [10, 25, 50, 100] },
];

const ModeSelector = ({ handleModeSelection, currentMode }) => {
  return (
    <motion.div
      className="mode-selector-container"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5 }}
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

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {MODES[
          MODES.findIndex((mode) => mode.type === currentMode.type)
        ].bounds.map((bound) => (
          <button
            onClick={() => handleModeSelection({ ...currentMode, bound })}
            key={bound}
            className={`${currentMode.bound === bound && "selected"}`}
          >
            {bound}
          </button>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ModeSelector;
