import React from "react";
import { RxReload } from "react-icons/rx";
import { motion } from "framer-motion";
import { calculateWPM } from "../Utils";

const resultVariants = {
  enter: { opacity: 0, y: 20 },
  exit: { opacity: 1, y: 0 },
};

const Result = ({ charCount, handleRestart, time, currentMode }) => {
  return (
    <motion.div
      initial="enter"
      animate="exit"
      variants={resultVariants}
      transition={{ duration: 0.75, type: "tween" }}
      className="finished-test"
    >
      {currentMode.type === "words" ? (
        <h2>
          Finalizaste el test! Completaste las {currentMode.bound} palabras.
        </h2>
      ) : (
        <h2>
          Finalizaste el test! Se cumplieron los {currentMode.bound} segundos.
        </h2>
      )}

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 10 }}
        transition={{ delay: 0.75 }}
        className="result"
      >
        <h2>Tu resultado!</h2>
        <h2>{calculateWPM(charCount, time).toFixed(0)} WPM</h2>
      </motion.div>

      <button
        type="button"
        aria-label="restart test"
        className="btn reset-btn"
        onClick={handleRestart}
      >
        <RxReload />
      </button>
    </motion.div>
  );
};

export default Result;
