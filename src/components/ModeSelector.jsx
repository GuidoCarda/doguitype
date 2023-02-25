import React from "react";

const timeBounds = ["15", "30", "60", "120"];

const ModeSelector = ({ handleModeSelection, timer }) => {
  return (
    <div className="mode-selector-container">
      <button className="">time</button>
      <button className="">words</button>
      <div>
        {timeBounds.map((timeBound) => (
          <button
            onClick={() => handleModeSelection(timeBound)}
            key={timeBound}
            className={`${
              timer.timeBound === Number(timeBound) ? "selected" : ""
            }`}
          >
            {timeBound}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ModeSelector;
