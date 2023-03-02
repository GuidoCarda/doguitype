import React from "react";
import useTimer from "../hooks/useTimer";

const Timer = () => {
  const timer = useTimer();

  return (
    <div>
      <span>{timer?.time}</span>
      <button onClick={() => timer.setTimer(100)}>start</button>
    </div>
  );
};

export default Timer;
