import React, { useState } from "react";

const modes = [
  {
    type: "time",
    bounds: [15, 30, 60, 120],
  },
  {
    type: "words",
    bounds: [10, 25, 50, 100],
  },
];

const ModeSelector = ({ handleModeSelection, currentMode }) => {
  return (
    <div className="mode-selector-container">
      {modes.map((mode, idx) => {
        return (
          <button key={mode.type} className={``}>
            {mode.type}
          </button>
        );
      })}

      <div>
        {modes[0].bounds.map((bound) => (
          <button
            onClick={() => handleModeSelection({ type: "time", bound })}
            key={bound}
            className={`${currentMode.bound === bound && "selected"}`}
          >
            {bound}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ModeSelector;
