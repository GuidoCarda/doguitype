import React from "react";
import { RxReload } from "react-icons/rx";
import { calculateWPM } from "../App";

const Result = ({ charCount, handleRestart, time }) => {
  return (
    <div className="finished-test">
      <h2>Se finalizo el tiempo</h2>

      <div className="result">
        <h2>Current WPM: {calculateWPM(charCount, time)}</h2>
      </div>

      <button type="button" className="btn reset-btn" onClick={handleRestart}>
        <RxReload />
      </button>
    </div>
  );
};

export default Result;
