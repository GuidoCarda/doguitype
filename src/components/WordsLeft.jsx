const WordsLeft = ({ stopwatch, currentWordIndex, bound }) => {
  if (!stopwatch.isOn) return;

  return (
    <span className="timer">
      {currentWordIndex}/{bound}
    </span>
  );
};

export default WordsLeft;
