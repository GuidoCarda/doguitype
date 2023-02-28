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

const ModeSelector = ({ handleModeSelection, timer }) => {
  const [selectedMode, setSelectedMode] = useState(0);

  return (
    <div className="mode-selector-container">
      {modes.map((mode, idx) => {
        return (
          <button
            key={mode.type}
            onClick={() => setSelectedMode(idx)}
            className={`${selectedMode === idx ? "selected" : ""} `}
          >
            {mode.type}
          </button>
        );
      })}

      <div>
        {modes[selectedMode].bounds.map((bound) => (
          <button
            onClick={() => handleModeSelection(bound)}
            key={bound}
            className={``}
          >
            {bound}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ModeSelector;
