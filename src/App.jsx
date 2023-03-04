import { useEffect, useRef, useState } from "react";
import "./App.css";

//components
import Navbar from "./components/Navbar";
import Result from "./components/Result";
import Footer from "./components/Footer";
import ModeSelector from "./components/ModeSelector";
import Test from "./components/Test";

//temp data
import { dummyData } from "./data";

//icons
import { RxReload } from "react-icons/rx";
import useTimer from "./hooks/useTimer";
import useStopwatch from "./hooks/useStopwatch";
import { motion, AnimatePresence } from "framer-motion";
import useWords from "./hooks/useWords";

function App() {
  const { words, isLoading, error, getWords, updateWords } = useWords();

  const [currentMode, setCurrentMode] = useState({
    type: "time",
    bound: 30,
  });

  const [input, setInput] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [incorrectWords, SetIncorrectWords] = useState(() => new Set());
  const [charCount, setCharCount] = useState(0);

  const timer = useTimer();
  const stopwatch = useStopwatch();

  const inputRef = useRef(null);
  const currWordRef = useRef(null);

  const fetchWords = async () => {
    const res = await fetch(
      "https://random-word-api.herokuapp.com/word?number=100"
    );
    const data = await res.json();
    return data;
  };

  // setWords(getWords(currentMode.type === "time" ? 200 : currentMode.bound));

  //Move showing words when reached 2nd line
  useEffect(() => {
    if (isLoading || !words.size || words.size < 15 || isFinished) return;

    if (
      currWordRef?.current.offsetTop >= 35 &&
      currWordRef?.current.offsetLeft === 0
    ) {
      const currWordIdx = currWordRef?.current.id;

      const wordsCopy = new Map(words);

      wordsCopy.forEach((value, idx) => {
        if (idx < currWordIdx) {
          wordsCopy.delete(idx);
        }
      });
      updateWords(wordsCopy);
    }
  }, [currWordRef.current]);

  // const getWords = (wordsQty) => {
  //   return parseData(
  //     dummyData[
  //       Math.floor(Math.random() * (0 + (dummyData.length - 1) + 1) + 0)
  //     ]
  //       .split(" ")
  //       .slice(0, wordsQty)
  //   );
  // };

  const handleInput = (e) => {
    const inputValue = e.target.value.trim();
    setInput(inputValue);
  };

  const handleOnKeyUp = (e) => {
    const pressedKeyCode = e.keyCode;

    if (pressedKeyCode === 9) return;

    if (currentMode.type === "time" && timer.time === 0) {
      timer.set(currentMode.bound);
    }

    if (currentMode.type === "words" && !Boolean(currentWordIndex)) {
      stopwatch.start();
    }

    if (pressedKeyCode === 32) {
      if (!checkStringEquality(input, words.get(currentWordIndex))) {
        SetIncorrectWords(incorrectWords.add(currentWordIndex));
      }

      setCharCount((prevCount) => prevCount + input.length);
      setCurrentWordIndex((prev) => prev + 1);
      setInput("");

      if (
        currentMode.type === "words" &&
        currentWordIndex + 1 === currentMode.bound
      ) {
        stopwatch.stop();
      }
    }
  };

  const handleRestart = () => {
    setCurrentWordIndex(0);
    setCharCount(0);
    SetIncorrectWords(new Set());
    setInput("");
    timer.reset();
    stopwatch.reset();
    getWords();
  };

  const handleModeSelection = (mode) => {
    setCurrentMode(mode);
    getWords(mode.type === "time" ? 200 : mode.bound);
  };

  const isFinished =
    (currentMode.type === "time" && timer.state === "finished") ||
    (currentMode.type === "words" && currentWordIndex === currentMode.bound);

  return (
    <div className="container">
      <Navbar />
      {!isFinished && (
        <div className="test">
          <AnimatePresence>
            {((currentMode.type === "time" && timer.state === "idle") ||
              (currentMode.type === "words" && !stopwatch.isOn)) && (
              <ModeSelector
                key={"mode-selector"}
                handleModeSelection={handleModeSelection}
                currentMode={currentMode}
              />
            )}
          </AnimatePresence>

          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="timer-container"
          >
            {currentMode.type === "time" && timer.state === "playing" && (
              <span className="timer">{timer.time}</span>
            )}
          </motion.div>

          <div className="timer-container">
            {currentMode.type === "words" && stopwatch.isOn && (
              <span className="timer">
                {currentWordIndex}/{currentMode.bound}
              </span>
            )}
          </div>

          <Test
            currentWordIndex={currentWordIndex}
            incorrectWords={incorrectWords}
            currWordRef={currWordRef}
            input={input}
          />

          <div className="form">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onKeyUp={handleOnKeyUp}
              onChange={handleInput}
              disabled={isLoading}
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

      {isFinished && (
        <Result
          charCount={charCount}
          handleRestart={handleRestart}
          currentMode={currentMode}
          time={
            currentMode.type === "time" ? currentMode.bound : stopwatch.time
          }
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
