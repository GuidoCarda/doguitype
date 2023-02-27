import React from "react";
import useStopwatch from "../hooks/useStopwatch";

const Stopwatch = () => {
  const stopwatch = useStopwatch();

  return (
    <div>
      <span>{stopwatch?.time}</span>
      <button onClick={stopwatch.start}>start</button>
      <button onClick={stopwatch.stop}>stop</button>
      {stopwatch.isOn && <button onClick={stopwatch.restart}>restart</button>}
    </div>
  );
};

export default Stopwatch;
