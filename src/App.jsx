import { useEffect, useRef, useState } from "react";
import "./App.css";

const timeBounds = { cuarter: 15, half: 30, minute: 60 };

function App() {
  const [input, setInput] = useState("");
  const [words, setWords] = useState(new Map());
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [incorrectWords, SetIncorrectWords] = useState(() => new Set());
  const [charCount, setCharCount] = useState(0);
  const [timer, setTimer] = useState({ time: 0, state: "paused" });
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
    if (!words.size || timer.time === 0) return;
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

    fetchWords().then((data) => {
      setWords(parseData(data));
      setIsLoading(false);
    });

    return () => {
      fetchRun.current = true;
    };
  }, []);

  const parseData = (data) => {
    const map = new Map();
    data.forEach((word, idx) => map.set(idx, word));
    return map;
  };

  const setInputFocus = () => inputRef.current.focus();

  const handleInput = (e) => {
    const inputValue = e.target.value.trim();
    setInput(inputValue);
  };

  const handleOnKeyUp = (e) => {
    const pressedKeyCode = e.keyCode;

    console.log(currentWordIndex, input.length);
    if (currentWordIndex === 0 && timer.state === "paused") {
      setTimer({ time: timeBounds.minute, state: "playing" });
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

  const isInputMatching = () => words.get(currentWordIndex).includes(input);

  const handleRestart = () => {
    setCurrentWordIndex(0);
    setTimer({ time: 0, state: "paused" });
    setCharCount(0);
    SetIncorrectWords(new Set());
    setInputFocus();
    setInput("");
    setIsLoading(true);
    fetchWords().then((data) => {
      setWords(parseData(data));
      setIsLoading(false);
    });
  };

  return (
    <div className="App">
      <div className="temporary-data">
        <h3>Left time: {timer.time} seconds</h3>
        <span>Current Input: {input}</span>
        <span>Current Word: {words[currentWordIndex]}</span>
        <span>Current Words: {words.length}</span>
        <span>Written Characters count: {charCount}</span>
        <span>Current word idx: {currentWordIndex}</span>
      </div>

      <div className="text-container sample-text">
        {isLoading ? (
          <h1>loading...</h1>
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
                        incorrectWords.has(idx) ? "incorrect" : "correct"
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

      {!Boolean(timer.time) && timer.state === "finished" && (
        <div className="result">
          <h2>Current WPM: {calculateWPM(charCount)}</h2>
        </div>
      )}
      <div className="form">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onKeyUp={handleOnKeyUp}
          onChange={handleInput}
          disabled={isLoading || timer.state === "finished"}
        />
        {timer.time !== 0 && timer.state === "playing" && (
          <button type="button" onClick={handleRestart} className="btn">
            restart
          </button>
        )}
      </div>

      {!Boolean(timer.time) && (
        <div className="finished-test">
          <h2>Se finalizo el tiempo</h2>
          <button type="button" className="btn" onClick={handleRestart}>
            restart
          </button>
        </div>
      )}
    </div>
  );
}

export default App;

const calculateWPM = (charCount) => charCount / 5 / 1;

const checkCharEquality = (char1, char2) => char1 === char2;
const checkStringEquality = (str1, str2) => str1 === str2;
