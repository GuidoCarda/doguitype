const Timer = ({ timer }) => {
  if (timer.state !== "playing") return;

  return <span className="mode-value">{timer.time}</span>;
};

export default Timer;
