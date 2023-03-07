const Timer = ({ timer }) => {
  if (timer.state !== "playing") return;

  return <span className="timer">{timer.time}</span>;
};

export default Timer;
