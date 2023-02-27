import { useEffect, useState } from "react";

const useTimer = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (time === 0) return;

    const intervalId = setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [time]);

  const setTimer = (timeBound) => setTime(timeBound);

  return { time, setTimer };
};

export default useTimer;
