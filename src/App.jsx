import { useEffect, useRef, useState } from "react";
import "./App.css";

const timeBounds = { cuarter: 15, half: 30, minute: 60 };

const sampleText =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima incidunt magni qui cumque rem labore facere, facilis doloribus perspiciatis ipsa vitae similique voluptatem inventore blanditiis fuga? Libero est maxime ";

function App() {
  const [input, setInput] = useState("");
  const words = sampleText.split(" ");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [time, setTime] = useState(timeBounds.cuarter);
  const [incorrectWords, SetIncorrectWords] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    setInputFocus();
  }, []);

  useEffect(() => {
    if (currentWordIndex === words.length - 1) {
      handleRestart();
    }
  }, [currentWordIndex, words]);

  // Countdown timer
  useEffect(() => {
    if (time === 0) return;

    const timeout = setTimeout(() => {
      setTime((time) => time - 1);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [time]);

  const setInputFocus = () => {
    inputRef.current.focus();
  };

  const handleRestart = () => {
    setCurrentWordIndex(0);
    setInput("");
    setInputFocus();
    setWords(sampleText.split(" "));
  };

  const handleInput = (e) => {
    const inputValue = e.target.value.trim();

    setInput(inputValue);
  };

  const handleOnKeyUp = (e) => {
    const pressedKeyCode = e.keyCode;

    if (pressedKeyCode === 32) {
      if (!checkCharEquality(input, words[currentWordIndex])) {
        SetIncorrectWords(incorrectWords.concat(currentWordIndex));
      }
      setCurrentWordIndex((prev) => prev + 1);
      setInput("");
    }
  };

  const checkCharEquality = (char1, char2) => char1 === char2;
  const checkStringEquality = (str1, str2) => str1 === str2;

  return (
    <div className="App">
      <div className="temporary-data">
        <h2>Time: {time}</h2>
        <span>Current Input: {input}</span>
        <span>Current Word: {words[currentWordIndex]}</span>
        <span>Current Words: {words.length}</span>
        {/* {input.length ? (
          <span>{inputMatches ? "match" : "no-match"}</span>
        ) : (
          <span>Empty</span>
        )} */}

        <span>Current word idx: {currentWordIndex}</span>
      </div>

      {Boolean(time) && (
        <div className="text-container sample-text">
          {words.length != 0 &&
            words.map((word, idx) => (
              <Word
                word={word}
                key={idx}
                input={input}
                currentWordIndex={currentWordIndex}
                status={incorrectWords.includes(idx) ? "incorrect" : "correct"}
                idx={idx}
              />
            ))}
        </div>
      )}

      {time ? (
        <div className="form">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onKeyUp={handleOnKeyUp}
            onChange={handleInput}
          />
          <button type="button" onClick={handleRestart} className="btn">
            restart
          </button>
        </div>
      ) : (
        <div className="finished-test">
          <h2>Se finalizo el tiempo</h2>
          <button type="button" onClick={handleRestart} className="btn">
            restart
          </button>
        </div>
      )}
    </div>
  );
}

export default App;

function Word({ word, input, currentWordIndex, idx, status }) {
  const [errors, setErrors] = useState([]);

  const isCurrentWord = currentWordIndex === idx;

  const matchingState = word.includes(input.trim()) ? "correct" : "incorrect";

  useEffect(() => {
    if (!isCurrentWord) return;
    if (input[input.length - 1] === word[input.length - 1]) return;

    setErrors(errors.concat(input.length - 1));
  }, [input]);

  return (
    <div className={`word`}>
      {[...word].map((letter, letterIdx) => {
        const isCurrentLetter = input.length - 1 === letterIdx;

        if (!isCurrentWord && currentWordIndex > idx) {
          return (
            <span
              key={letterIdx}
              className={`${
                errors.includes(letterIdx) ? "incorrect" : "correct"
              }`}
            >
              {letter}
            </span>
          );
        }

        if (isCurrentWord && input.length - 1 > letterIdx) {
          return (
            <span
              key={letterIdx}
              className={`${
                errors.includes(letterIdx) ? "incorrect" : "correct"
              }`}
            >
              {letter}
            </span>
          );
        }

        return (
          <span
            key={letterIdx}
            className={`${
              isCurrentWord && isCurrentLetter
                ? input.at(-1) === letter
                  ? "correct"
                  : "incorrect"
                : ""
            }`}
          >
            {letter}
          </span>
        );
      })}
    </div>
  );
}

// ${
//   currentWordIndex === idx && input.length === 0
//     ? "active"
//     : currentWordIndex === idx && input.length > 0
//     ? `active ${matchingState}`
//     : ""
// } ${currentWordIndex > idx ? status : ""}

// ${currentWordIndex === idx ? "active" : ""}
