import React from "react";
import { RxReload } from "react-icons/rx";
import { calculateWPM } from "../App";

const Result = ({ charCount, handleRestart, time, currentMode }) => {
  return (
    <div className="finished-test">
      {currentMode.type === "words" && (
        <h2>
          Finalizaste el test! Completaste las {currentMode.bound} palabras.
        </h2>
      )}
      {currentMode.type === "time" && (
        <h2>
          Finalizaste el test! Se cumplieron los {currentMode.bound} segundos.
        </h2>
      )}

      <div className="result">
        <h2>Tu resultado!</h2>
        <h2>{calculateWPM(charCount, time).toFixed(0)} WPM</h2>
      </div>

      <button type="button" className="btn reset-btn" onClick={handleRestart}>
        <RxReload />
      </button>
    </div>
  );
};

export default Result;
