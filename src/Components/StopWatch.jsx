const { useState, useEffect, useRef } = require("react");

const fixedTimeString = (time) => {
  return time < 10 ? `0${time}` : time;
};

const formateTimetoString = (time) => {
  const milisecond = time % 100;
  const seconds = parseInt(time / 100) % 60;
  const minutes = Math.floor(time / 6000) % 60;
  const hours = Math.floor(time / 3600000) % 60;
  return `${hours !== 0 ? `${fixedTimeString(hours)}h` : ""}
  ${minutes !== 0 ? `${fixedTimeString(minutes)}m` : ""}
  ${fixedTimeString(seconds)}s
  ${fixedTimeString(milisecond)}`;
};

function StopWatch() {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const cleanup = () => {
      stopTimer();
    };
    return cleanup;
  }, []);

  const startTimer = () => {
    if (ref.current !== null) return;
    ref.current = setInterval(() => {
      setValue((Prevalue) => {
        return Prevalue + 1;
      });
    }, 10);
  };
  const stopTimer = () => {
    clearInterval(ref.current);
    ref.current = null;
  };

  const resetTimer = () => {
    stopTimer();
    setValue(0);
  };
  // console.log(ref.current);

  return (
    <div>
      <h1>{formateTimetoString(value)}</h1>
      <button onClick={startTimer}>START</button>
      <button onClick={stopTimer}>STOP</button>
      <button onClick={resetTimer}>RESET</button>
    </div>
  );
}
export { StopWatch };
