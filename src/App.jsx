import { useEffect, useRef, useState } from "react";
import "./App.css";

const sampleText =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima incidunt magni qui cumque rem labore facere, facilis doloribus perspiciatis ipsa vitae similique voluptatem inventore blanditiis fuga? Libero est maxime ";
function App() {
  const [input, setInput] = useState("");
  const words = sampleText.split(" ");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [time, setTime] = useState(60);
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
    </div>
  );
}

export default App;

function Word({ word, input, currentWordIndex, idx, status }) {
  const matchingState = word.includes(input.trim()) ? "correct" : "incorrect";

  return (
    <div
      className={`word ${
        currentWordIndex === idx && input.length === 0
          ? "active"
          : currentWordIndex === idx && input.length > 0
          ? `active ${matchingState}`
          : ""
      } ${currentWordIndex > idx ? status : ""}`}
    >
      {[...word].map((letter, idx) => (
        <span key={idx}>{letter}</span>
      ))}
    </div>
  );
}

// ${currentWordIndex === idx ? "active" : ""}
