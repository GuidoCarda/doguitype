import React from "react";
import { motion } from "framer-motion";
import useWords from "../hooks/useWords";

const Test = ({ currentWordIndex, incorrectWords, currWordRef, input }) => {
  const isInputMatching = () => {
    return words.get(currentWordIndex).slice(0, input.length) === input;
  };

  const { words, isLoading } = useWords();

  return (
    <div className="text-container">
      {isLoading ? (
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          loading...
        </motion.h2>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="words"
        >
          {words.size !== 0 &&
            [...words.entries()].map((entry, idx) => {
              const [id, word] = entry;

              if (currentWordIndex === id) {
                return (
                  <div
                    ref={currWordRef}
                    className={`word active ${
                      input.length
                        ? isInputMatching()
                          ? "correct"
                          : "incorrect"
                        : ""
                    }`}
                    key={idx}
                    id={id}
                  >
                    {word}
                  </div>
                );
              }

              if (currentWordIndex > id) {
                return (
                  <div
                    className={`word ${
                      incorrectWords.has(id) ? "incorrect" : "correct"
                    }`}
                    key={idx}
                    id={id}
                  >
                    {word}
                  </div>
                );
              }

              return (
                <div className={`word`} key={idx} id={id}>
                  {word}
                </div>
              );
            })}
        </motion.div>
      )}
    </div>
  );
};

export default Test;
