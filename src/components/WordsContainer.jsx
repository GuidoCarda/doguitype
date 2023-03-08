import React from "react";
import { motion } from "framer-motion";
import useWords from "../hooks/useWords";
import Loader from "./Loader";

const wordsContainer = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const WordsContainer = ({
  currentWordIndex,
  incorrectWords,
  currWordRef,
  input,
}) => {
  const { words, isLoading } = useWords();

  const isInputMatching = () => {
    return words.get(currentWordIndex).slice(0, input.length) === input;
  };

  return (
    <div className="text-container">
      {isLoading ? (
        <Loader />
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={wordsContainer}
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

export default WordsContainer;
