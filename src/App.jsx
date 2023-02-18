import { useEffect, useRef, useState } from "react";
import "./App.css";

const sampleText =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima incidunt magni qui cumque rem labore facere, facilis doloribus perspiciatis ipsa vitae similique voluptatem inventore blanditiis fuga? Libero est maxime ";
function App() {
  const [input, setInput] = useState("");
  const [words, setWords] = useState(sampleText.split(" "));

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const inputMatches = words[currentWordIndex].includes(input.trim());

  const handleInput = (e) => {
    let inputValue = e.target.value;
    setInput(inputValue);
  };

  const handleSubmit = () => {};

  const handleOnKeyUp = (e) => {
    const value = e.target.value;
    const currentWord = words[currentWordIndex];

    if (input.length > 0) {
      console.log(currentWord[input.length - 1]);
      console.log(value.at(-1));
      console.log(currentWord[input.length - 1] === value.at(-1));
    }

    if (input.length === currentWord.length) {
      console.log(
        "Las palabras son iguales : " + (input === currentWord).toString()
      );
    }

    if (e.keyCode === 32) {
      setCurrentWordIndex((prev) => prev + 1);
      setInput("");
    }
  };

  return (
    <div className="App">
      <div className="temporary-data">
        <span>Current Input: {input}</span>
        <span>Current Word: {words[currentWordIndex]}</span>
        {input.length ? (
          <span>{inputMatches ? "match" : "no-match"}</span>
        ) : (
          <span>Empty</span>
        )}

        <span>Current word idx: {currentWordIndex}</span>
      </div>

      <div className="text-container sample-text">
        {words.length != 0 &&
          words.map((word, idx) => (
            <div
              className={`word ${currentWordIndex === idx ? "active" : ""}`}
              key={idx}
            >
              {[...word].map((letter, idx) => (
                <span key={idx}>{letter}</span>
              ))}
            </div>
          ))}
      </div>
      <form onSubmit={handleSubmit} className="form">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onKeyUp={handleOnKeyUp}
          onChange={handleInput}
        />
        <button type="button" className="btn">
          restart
        </button>
      </form>
    </div>
  );
}

export default App;
