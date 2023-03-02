import React from "react";

const Stopwatch = ({ stopwatch }) => {
  return (
    <div className="stopwatch-precario">
      <span>{stopwatch?.time}</span>
      {/* <button onClick={stopwatch.start}>start</button>
      <button onClick={stopwatch.stop}>stop</button>
      {stopwatch.isOn && <button onClick={stopwatch.restart}>restart</button>} */}
    </div>
  );
};

export default Stopwatch;
