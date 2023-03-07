const WordsLeft = ({ stopwatch, currentWordIndex, bound }) => {
  if (!stopwatch.isOn) return;

  return (
    <span className="mode-value">
      {currentWordIndex}/{bound}
    </span>
  );
};

export default WordsLeft;
