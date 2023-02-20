import { useEffect, useRef, useState } from "react";
import "./App.css";

const timeBounds = { cuarter: 15, half: 30, minute: 60 };

const sampleText =
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque ab quasi distinctio. Debitis commodi, enim itaque sed optio vel, est sapiente quo porro labore tenetur cumque, hic distinctio. Quod recusandae minima facilis. Dignissimos quas officia tempore animi quos nesciunt quam eveniet vel libero expedita placeat, vitae inventore omnis vero dolor delectus qui, at facere. Deleniti delectus porro eos quibusdam molestiae quas ullam nobis labore repellendus repellat minus nihil, fugit adipisci? Doloremque doloribus vitae consectetur nesciunt. Placeat sunt ipsum voluptatem consequuntur assumenda earum accusantium veritatis architecto dicta itaque. Doloremque saepe enim recusandae iure at eos laborum, accusantium reiciendis voluptas ad aspernatur veritatis, commodi nobis soluta ducimus architecto facere dolorum sint ipsum accusamus amet exercitationem aliquam veniam! Ullam voluptatibus rerum eius aperiam voluptate deleniti dicta ipsum molestias nulla voluptates accusantium, aspernatur necessitatibus. Rem voluptatem iste eius nobis non reiciendis id molestiae quod aut, inventore saepe aliquam sapiente porro nisi sequi distinctio eveniet neque necessitatibus exercitationem dolores! Natus obcaecati reprehenderit velit recusandae voluptatibus qui fugit a maxime! Debitis assumenda delectus distinctio numquam nisi, animi nostrum fugit non rerum dicta fuga cumque, repellat asperiores exercitationem nihil impedit eaque facilis tenetur soluta quas incidunt eum? Praesentium, deleniti repellat consequatur ipsum provident id culpa ut laborum harum quia labore excepturi fugit aliquid, eligendi quasi vel voluptate voluptates. Impedit officiis beatae, molestias nobis excepturi quia atque? Tempore sit laudantium recusandae asperiores adipisci dolore hic qui tenetur aspernatur labore repellendus et, eos culpa, pariatur, quasi nihil officiis. Nobis officiis corporis ratione voluptatum placeat rem animi ipsa, dicta sunt consequatur est. Quod numquam aspernatur delectus possimus magni nobis esse, reiciendis similique explicabo illo aperiam iusto voluptatibus aliquam debitis porro corrupti animi eos accusamus modi? Assumenda repellat quasi quos. Laborum repellendus, commodi non magnam mollitia porro nostrum recusandae eveniet animi aspernatur nihil vero, nemo, repellat cum error cumque? Eveniet, facere.";

function App() {
  const [input, setInput] = useState("");
  const words = sampleText.split(" ");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [time, setTime] = useState(timeBounds.minute);
  const [incorrectWords, SetIncorrectWords] = useState([]);
  const [charCount, setCharCount] = useState(0);
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
    setCharCount(0);
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
      setCharCount((prevCount) => prevCount + input.length);
      setCurrentWordIndex((prev) => prev + 1);
      setInput("");
    }
  };

  const calculateWPM = () => {
    return charCount / 5 / 1;
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
        <span>Written Characters count: {charCount}</span>
        {/* {input.length ? (
          <span>{inputMatches ? "match" : "no-match"}</span>
        ) : (
          <span>Empty</span>
        )} */}

        <span>Current word idx: {currentWordIndex}</span>
      </div>

      {Boolean(time) ? (
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
      ) : (
        <h1 className="result">Gross WPM: {calculateWPM()}</h1>
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

    if (errors.some((error) => error >= input.length - 1)) {
      return setErrors(errors.filter((error) => error < input.length - 1));
    }

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
