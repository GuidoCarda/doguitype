import Timer from "./Timer";
import WordsLeft from "./WordsLeft";

const Mode = ({ currentMode, stopwatch, timer, currentWordIndex }) => {
  const wordsLeftProps = {
    stopwatch,
    currentWordIndex,
    bound: currentMode.bound,
  };

  return (
    <div className="mode-container">
      {currentMode.type === "time" && <Timer timer={timer} />}
      {currentMode.type === "words" && <WordsLeft {...wordsLeftProps} />}
    </div>
  );
};

export default Mode;
