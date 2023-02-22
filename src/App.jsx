import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";

const timeBounds = { cuarter: 15, half: 30, minute: 60 };

const sampleText =
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque ab quasi distinctio. Debitis commodi, enim itaque sed optio vel, est sapiente quo porro labore tenetur cumque, hic distinctio. Quod recusandae minima facilis. Dignissimos quas officia tempore animi quos nesciunt quam eveniet vel libero expedita placeat, vitae inventore omnis vero dolor delectus qui, at facere. Deleniti delectus porro eos quibusdam molestiae quas ullam nobis labore repellendus repellat minus nihil, fugit adipisci? Doloremque doloribus vitae consectetur nesciunt. Placeat sunt ipsum voluptatem consequuntur assumenda earum accusantium veritatis architecto dicta itaque. Doloremque saepe enim recusandae iure at eos laborum, accusantium reiciendis voluptas ad aspernatur veritatis, commodi nobis soluta ducimus architecto facere dolorum sint ipsum accusamus amet exercitationem aliquam veniam! Ullam voluptatibus rerum eius aperiam voluptate deleniti dicta ipsum molestias nulla voluptates accusantium, aspernatur necessitatibus. Rem voluptatem iste eius nobis non reiciendis id molestiae quod aut, inventore saepe aliquam sapiente porro nisi sequi distinctio eveniet neque necessitatibus exercitationem dolores! Natus obcaecati reprehenderit velit recusandae voluptatibus qui fugit a maxime! Debitis assumenda delectus distinctio numquam nisi, animi nostrum fugit non rerum dicta fuga cumque, repellat asperiores exercitationem nihil impedit eaque facilis tenetur soluta quas incidunt eum? Praesentium, deleniti repellat consequatur ipsum provident id culpa ut laborum harum quia labore excepturi fugit aliquid, eligendi quasi vel voluptate voluptates. Impedit officiis beatae, molestias nobis excepturi quia atque? Tempore sit laudantium recusandae asperiores adipisci dolore hic qui tenetur aspernatur labore repellendus et, eos culpa, pariatur, quasi nihil officiis. Nobis officiis corporis ratione voluptatum placeat rem animi ipsa, dicta sunt consequatur est. Quod numquam aspernatur delectus possimus magni nobis esse, reiciendis similique explicabo illo aperiam iusto voluptatibus aliquam debitis porro corrupti animi eos accusamus modi? Assumenda repellat quasi quos. Laborum repellendus, commodi non magnam mollitia porro nostrum recusandae eveniet animi aspernatur nihil vero, nemo, repellat cum error cumque? Eveniet, facere.";

function App() {
  const [input, setInput] = useState("");
  const [words, setWords] = useState(new Map());

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [incorrectWords, SetIncorrectWords] = useState(() => new Set());
  const [charCount, setCharCount] = useState(0);
  const inputRef = useRef(null);
  const currWordRef = useRef(null);
  const fetchRun = useRef(false);
  const [time, setTime] = useState(timeBounds.minute);

  // console.log(words);
  // Countdown timer
  useEffect(() => {
    if (time === 0) return;

    const timeout = setTimeout(() => {
      setTime((time) => time - 1);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [time]);

  useEffect(() => {
    setInputFocus();
  }, []);

  useEffect(() => {
    if (currentWordIndex === words.length - 1) {
      handleRestart();
    }
  }, [currentWordIndex, words]);

  useEffect(() => {
    if (!words.size) return;
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
      // setCurrentWordIndex();
    }
  }, [currWordRef.current]);

  const fetchWords = async () => {
    return fetch("https://random-word-api.herokuapp.com/word?number=100")
      .then((res) => res.json())
      .then((data) => data);
  };

  useEffect(() => {
    fetchWords().then((data) => {
      setWords(() => {
        const map = new Map();
        data.forEach((word, idx) => map.set(idx, word));
        return map;
      });
    });

    return () => {
      fetchRun.current = true;
    };
  }, []);

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
      console.log(currWordRef);

      if (!checkCharEquality(input, words.get(currentWordIndex))) {
        SetIncorrectWords(incorrectWords.add(currentWordIndex));
      }

      setCharCount((prevCount) => prevCount + input.length);
      setCurrentWordIndex((prev) => prev + 1);
      setInput("");
    }
  };

  const calculateWPM = () => {
    return charCount / 5 / 1;
  };

  // console.log("re-render");

  const checkCharEquality = (char1, char2) => char1 === char2;
  const checkStringEquality = (str1, str2) => str1 === str2;

  // console.log(currentWordIndex);
  const isInputMatching =
    words.size && words.get(currentWordIndex).includes(input);

  return (
    <div className="App">
      <div className="temporary-data">
        <h3>Left time: {time} seconds</h3>
        <span>Current Input: {input}</span>
        <span>Current Word: {words[currentWordIndex]}</span>
        <span>Current Words: {words.length}</span>
        <span>Written Characters count: {charCount}</span>
        <span>Current word idx: {currentWordIndex}</span>
      </div>

      {Boolean(time) && (
        <div className="text-container sample-text">
          <div className="words">
            {words.size !== 0 &&
              [...words.entries()].map((entry, idx) => {
                const [id, word] = entry;
                if (currentWordIndex === id) {
                  return (
                    <div
                      ref={currWordRef}
                      className={`word active ${
                        isInputMatching ? "correct" : "incorrect"
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
        </div>
      )}

      {!Boolean(time) && (
        <div className="result">
          <h2>Current WPM: {calculateWPM()}</h2>
        </div>
      )}

      {Boolean(time) && (
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
      )}

      <div className="finished-test">
        <h2>Se finalizo el tiempo</h2>
        <button type="button" onClick={handleRestart} className="btn">
          restart
        </button>
      </div>
    </div>
  );
}

export default App;
