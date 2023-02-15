import { useState } from "react";
import "./App.css";

const sampleText =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima incidunt magni qui cumque rem labore facere, facilis doloribus perspiciatis ipsa vitae similique voluptatem inventore blanditiis fuga? Libero est maxime ";
function App() {
  const [input, setInput] = useState("");
  const [objectiveInputs, setObjectiveInputs] = useState(sampleText.split(" "));

  const [userText, setUserText] = useState("");

  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const inputMatches = objectiveInputs[currentWordIndex]
    .toLowerCase()
    .includes(input.trim().toLowerCase());

  const handleInput = (e) => {
    let inputValue = e.target.value;
    setInput(inputValue);

    objectiveInputs[currentWordIndex]
      .toLowerCase()
      .includes(inputValue.toLowerCase());
  };

  const handleSubmit = () => {};

  const handleOnKeyDown = (e) => {
    if (e.keyCode === 32) {
      setUserText(input);
      setCurrentWordIndex((prev) => prev + 1);
      setInput("");
    }
  };

  return (
    <div className="App">
      <div className="text-container">
        <p className={`input-text ${inputMatches ? "match" : "no-match"}`}>
          {" "}
          {input}{" "}
        </p>
        <p className="sample-text">{sampleText}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onKeyDown={handleOnKeyDown}
          onChange={handleInput}
        />
      </form>
    </div>
  );
}

export default App;
