import React, { useState } from "react";

const MODES = [
  { type: "time", bounds: [15, 30, 60, 120] },
  { type: "words", bounds: [10, 25, 50, 100] },
];

const ModeSelector = ({ handleModeSelection, currentMode }) => {
  return (
    <div className="mode-selector-container">
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

      <div>
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
      </div>
    </div>
  );
};

export default ModeSelector;
