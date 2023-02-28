import { useEffect, useState } from "react";

const useTimer = () => {
  const [time, setTime] = useState(0);
  const [state, setState] = useState("idle");

  useEffect(() => {
    if (state === "idle") return;

    if (time === 0) {
      setState("finished");
      return;
    }

    const intervalId = setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [time]);

  const set = (timeBound) => {
    setTime(timeBound);
    setState("playing");
  };

  const reset = () => {
    setTime(0);
    setState("idle");
  };

  return { time, state, set, reset };
};

export default useTimer;
