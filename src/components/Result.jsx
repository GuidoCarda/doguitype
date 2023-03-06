import React from "react";
import { RxReload } from "react-icons/rx";
import { motion } from "framer-motion";
import { calculateWPM } from "../Utils";

const Result = ({ charCount, handleRestart, time, currentMode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, type: "tween" }}
      className="finished-test"
    >
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
    </motion.div>
  );
};

export default Result;
