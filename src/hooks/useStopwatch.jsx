import { useState, useEffect } from "react";

const useStopwatch = () => {
  const [time, setTime] = useState(0);
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    if (!isOn) return;

    const intervalId = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isOn, time]);

  const start = () => setIsOn(true);
  const stop = () => setIsOn(false);
  const restart = () => {
    stop();
    setTime(0);
  };

  return { time, isOn, start, stop, restart };
};

export default useStopwatch;
