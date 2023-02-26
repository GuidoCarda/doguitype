import { useEffect, useRef, useState } from "react";
import "./App.css";

import { RxReload } from "react-icons/rx";
import Navbar from "./components/Navbar";
import Result from "./components/Result";
import Footer from "./components/Footer";
import { dummyData } from "./data";
import ModeSelector from "./components/ModeSelector";

const timeBounds = { cuarter: 15, half: 30, minute: 60 };

function App() {
  const [input, setInput] = useState("");
  const [words, setWords] = useState(new Map());
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [incorrectWords, SetIncorrectWords] = useState(() => new Set());
  const [charCount, setCharCount] = useState(0);
  const [timer, setTimer] = useState({
    timeBound: 60,
    time: 0,
    state: "paused",
  });
  const [isLoading, setIsLoading] = useState(true);

  const inputRef = useRef(null);
  const currWordRef = useRef(null);
  const fetchRun = useRef(false);

  // Countdown timer
  useEffect(() => {
    console.log(timer.state);
    if (timer.state !== "playing") return;

    if (timer.time === 0 && timer.state === "playing") {
      setTimer({ ...timer, state: "finished" });
      setInput("");
      return;
    }

    const timeout = setTimeout(() => {
      setTimer((timer) => ({ ...timer, time: timer.time - 1 }));
    }, 1000);

    return () => clearTimeout(timeout);
  }, [timer]);

  useEffect(() => {
    setInputFocus();
  }, [isLoading]);

  //Move showing words when reached 2nd line
  useEffect(() => {
    if (!words.size || timer.time === 0 || isLoading) return;
    if (
      currWordRef?.current.offsetTop >= 35 &&
      currWordRef?.current.offsetLeft === 0
    ) {
      console.log(currWordRef?.current.offsetTop);
      const currWordIdx = currWordRef?.current.id;

      console.log("move showed words");

      const wordsCopy = new Map(words);

      wordsCopy.forEach((value, idx) => {
        if (idx < currWordIdx) {
          wordsCopy.delete(idx);
        }
      });

      setWords(wordsCopy);
    }
  }, [currWordRef.current]);

  const fetchWords = async () => {
    const res = await fetch(
      "https://random-word-api.herokuapp.com/word?number=100"
    );
    const data = await res.json();
    return data;
  };

  useEffect(() => {
    if (fetchRun.current) return;

    setTimeout(() => {
      setIsLoading(false);

      return setWords(
        parseData(
          dummyData[
            Math.floor(Math.random() * (0 + (dummyData.length - 1) + 1) + 0)
          ].split(" ")
        )
      );
    }, 1000);

    // fetchWords().then((data) => {
    //   setWords(parseData(data));
    //   setIsLoading(false);
    // });

    return () => {
      // clearTimeout(id);
      fetchRun.current = true;
    };
  }, []);

  const parseData = (data) => {
    const map = new Map();
    data.forEach((word, idx) => map.set(idx, word));
    return map;
  };

  const setInputFocus = () =>
    timer.state !== "finished" && inputRef.current.focus();

  const handleInput = (e) => {
    const inputValue = e.target.value.trim();
    setInput(inputValue);
  };

  const handleOnKeyUp = (e) => {
    const pressedKeyCode = e.keyCode;

    if (pressedKeyCode === 9) return;

    if (currentWordIndex === 0 && timer.state === "paused") {
      setTimer({ ...timer, time: Number(timer.timeBound), state: "playing" });
    }

    if (pressedKeyCode === 32) {
      if (!checkStringEquality(input, words.get(currentWordIndex))) {
        SetIncorrectWords(incorrectWords.add(currentWordIndex));
      }

      setCharCount((prevCount) => prevCount + input.length);
      setCurrentWordIndex((prev) => prev + 1);
      setInput("");
    }
  };

  const isInputMatching = () => {
    return words.get(currentWordIndex).slice(0, input.length) === input;
  };

  const handleRestart = () => {
    setCurrentWordIndex(0);
    setTimer({ ...timer, time: 0, state: "paused" });
    setCharCount(0);
    SetIncorrectWords(new Set());
    setInputFocus();
    setInput("");
    setIsLoading(true);

    // fetchWords().then((data) => {
    //   setWords(parseData(data));
    //   setIsLoading(false);
    // });

    setTimeout(() => {
      setIsLoading(false);

      return setWords(
        parseData(
          dummyData[
            Math.floor(Math.random() * (0 + (dummyData.length - 1) + 1) + 0)
          ].split(" ")
        )
      );
    }, 1000);
  };

  const handleModeSelection = (mode) => {
    setTimer({ ...timer, timeBound: mode, time: mode });
    setInputFocus();
  };

  return (
    <div className="container">
      <Navbar />

      {timer.state !== "finished" && (
        <div className="test">
          {timer.state === "paused" && (
            <ModeSelector
              handleModeSelection={handleModeSelection}
              timer={timer}
            />
          )}

          <div className="timer-container">
            {timer.state === "playing" && (
              <span className="timer">{timer.time}</span>
            )}
          </div>

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

          <div className="form">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onKeyUp={handleOnKeyUp}
              onChange={handleInput}
              disabled={isLoading || timer.state === "finished"}
            />
            <button
              type="button"
              onClick={handleRestart}
              className="btn restart-btn"
              disabled={isLoading}
            >
              <RxReload />
            </button>
          </div>
        </div>
      )}

      {!Boolean(timer.time) && timer.state === "finished" && (
        <Result
          charCount={charCount}
          handleRestart={handleRestart}
          time={timer.timeBound}
        />
      )}

      <Footer />
    </div>
  );
}

export default App;

export const calculateWPM = (charCount, time) => charCount / 5 / (time / 60);

const checkCharEquality = (char1, char2) => char1 === char2;
const checkStringEquality = (str1, str2) => str1 === str2;
