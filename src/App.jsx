import { useEffect, useRef, useState } from "react";
import "./App.css";

//components
import Navbar from "./components/Navbar";
import Result from "./components/Result";
import Footer from "./components/Footer";
import ModeSelector from "./components/ModeSelector";
import WordsContainer from "./components/WordsContainer";

//icons
import { RxReload } from "react-icons/rx";

//Custom hooks
import useTimer from "./hooks/useTimer";
import useStopwatch from "./hooks/useStopwatch";
import useWords from "./hooks/useWords";

//Animations
import { AnimatePresence } from "framer-motion";
import { checkStringEquality } from "./Utils";
import useTheme from "./hooks/useTheme";

function App() {
  const { words, isLoading, getWords, updateWords } = useWords();
  const [theme] = useTheme();

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

  const currWordRef = useRef(null);

  //Move showing words when reached 2nd line
  useEffect(() => {
    if (isLoading || !words.size || words.size < 15 || isFinished) return;

    const crrWordY = currWordRef?.current.offsetTop;
    const crrWordX = currWordRef?.current.offsetLeft;

    if (crrWordY >= 35 && crrWordX === 0) {
      const currWordIdx = currWordRef?.current.id;

      const wordsCopy = new Map(words);

      wordsCopy.forEach((_, idx) => {
        if (idx < currWordIdx) {
          wordsCopy.delete(idx);
        }
      });
      updateWords(wordsCopy);
    }
  }, [currWordRef.current]);

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
    getWords(currentMode === "words" ? currentMode.bound : null);
  };

  const handleModeSelection = (mode) => {
    setCurrentMode(mode);
    getWords(mode.type === "time" ? 200 : mode.bound);
  };

  const isFinished =
    (currentMode.type === "time" && timer.state === "finished") ||
    (currentMode.type === "words" && currentWordIndex === currentMode.bound);

  const isTyping = timer.state === "playing" || stopwatch.isOn;

  const wordsData = { currentWordIndex, incorrectWords, currWordRef };
  const modeConfig = { currentMode, stopwatch, timer, currentWordIndex };
  const formActions = { handleInput, handleOnKeyUp };
  const resultProps = {
    charCount,
    handleRestart,
    currentMode,
    time: currentMode.type === "time" ? currentMode.bound : stopwatch.time,
  };

  return (
    <div className={`app ${theme}`}>
      <ThemePicker />
      <div className="container">
        <Navbar />

        {!isFinished ? (
          <div className="test">
            <AnimatePresence>
              {!isTyping && (
                <ModeSelector
                  key={"mode-selector"}
                  handleModeSelection={handleModeSelection}
                  currentMode={currentMode}
                />
              )}
            </AnimatePresence>

            <Mode {...modeConfig} />

            <WordsContainer {...wordsData} input={input} />

            <Form input={input} {...formActions} />

            <button
              type="button"
              aria-label="restart test"
              onClick={handleRestart}
              className="btn restart-btn"
              disabled={isLoading}
            >
              <RxReload />
            </button>
          </div>
        ) : (
          <Result {...resultProps} />
        )}

        <Footer />
      </div>
    </div>
  );
}

const Form = ({ input, handleInput, handleOnKeyUp }) => {
  const { isLoading } = useWords();

  return (
    <div className="form">
      <input
        type="text"
        value={input}
        onKeyUp={handleOnKeyUp}
        onChange={handleInput}
        disabled={isLoading}
      />
    </div>
  );
};

const Mode = ({ currentMode, stopwatch, timer, currentWordIndex }) => {
  const wordsLeftProps = {
    stopwatch,
    currentWordIndex,
    bound: currentMode.bound,
  };

  return (
    <div className="timer-container">
      {currentMode.type === "time" && <Timer timer={timer} />}
      {currentMode.type === "words" && <WordsLeft {...wordsLeftProps} />}
    </div>
  );
};

const Timer = ({ timer }) => {
  if (timer.state !== "playing") return;

  return <span className="timer">{timer.time}</span>;
};

const WordsLeft = ({ stopwatch, currentWordIndex, bound }) => {
  if (!stopwatch.isOn) return;

  return (
    <span className="timer">
      {currentWordIndex}/{bound}
    </span>
  );
};

const ThemePicker = () => {
  const [, setTheme] = useTheme();

  return (
    <div style={{ position: "absolute", top: "10rem", marginInline: "auto" }}>
      <button onClick={() => setTheme("theme-1")}>Tema 1</button>
      <button onClick={() => setTheme("theme-2")}>Tema 2</button>
      <button onClick={() => setTheme("theme-3")}>Tema 3</button>
    </div>
  );
};

export default App;
