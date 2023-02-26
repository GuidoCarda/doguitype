import React from "react";
import { calculateWPM } from "../App";

const Test = ({
  words,
  currentWordIndex,
  incorrectWords,
  isLoading,
  currWordRef,
  input,
}) => {
  const isInputMatching = () => {
    return words.get(currentWordIndex).slice(0, input.length) === input;
  };

  return (
    <div className="text-container">
      {isLoading ? (
        <h2>loading...</h2>
      ) : (
        <div className="words">
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
        </div>
      )}
    </div>
  );
};

export default Test;
