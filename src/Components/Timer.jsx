const { useState, useEffect, useRef } = require("react");

const fixedTimeString = (time) => {
  return time < 10 ? `0${time}` : time;
};
const formateTimetoString = (time) => {
  const seconds = parseInt(time / 100) % 60;
  const minutes = Math.floor(time / 6000) % 60;
  const hours = Math.floor(time / 3600000) % 60;
  return `${hours!==0 ? `${fixedTimeString(hours)}h` : ""}
  ${minutes!==0?`${fixedTimeString(minutes)}m`:""}
  ${fixedTimeString(seconds)}s`;
};

function Timer() {
  const [value, setValue] = useState(30000);
  const [isInput, setInp] = useState(false);
  const ref = useRef(null);
  const refaudio = useRef(null);
  // const refaudioTimerid = useRef(null);

  useEffect(() => {
    window.addEventListener("click", getInp);
    const cleanup = () => {
      stopTimer();
    };
    return cleanup;
     // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const cleanup = () => {
      stopTimerAudio();
    };
    return cleanup;
  }, []);

  function makeSound() {
    if (refaudio.current !== null || ref.current !== null) return;
    var audio = new Audio(
      "https://www.timeanddate.com/sfx/telephone-ring-3.mp3"
    );
    refaudio.current = setInterval(() => {
      audio.play();
      // console.log("interval");
    }, 100);
    setTimeout(() => {
      // console.log("timeout");
      stopTimerAudio()
      refaudio.current = null;
    }, 10000);
  }
  const stopTimerAudio=()=>{
    console.log("stop timer audio");
    clearInterval(refaudio.current);
    // clearTimeout(refaudioTimerid.current);
  }


  const startTimer = () => {
    if (ref.current !== null) return;
    ref.current = setInterval(() => {
      setValue((Prevalue) => {
        // console.log(Prevalue, " check ");
        if (Prevalue === 0) {
          stopTimer();
          makeSound();
          return 0;
        }
        return Prevalue - 1;
      });
    }, 10);
  };
  const stopTimer = () => {
    clearInterval(ref.current);
    ref.current = null;
  };

  const resetTimer = () => {
    stopTimer();
    setValue(30000);
  };
  // console.log(ref.current);
  function getInp(e) {
    if (e.target.id === "showtimer" || e.target.id === "inpTimer") {
      setInp(true);
      stopTimerAudio()
    } else {
      setInp(false);
    }
    // console.log(e.target.value, " check value ");
  }

  const getInpputvalue = (e) => {
    const inpVal = e.target.value;
    console.log(typeof inpVal);
    if (inpVal > 0) {
      setValue(inpVal * 100);
    }
  };

  return (
    <div>
      <br />
      <div>
        {isInput ? (
          <input
            type="text"
            onChange={getInpputvalue}
            id="inpTimer"
            placeholder="in seconds"
          />
        ) : (
          <div style={{
            width:"200px",
            margin:"auto"
          }}>
            <h1 id="showtimer">{formateTimetoString(value)}</h1>
          </div>
        )}
      </div>
      <br />
      <button onClick={startTimer}>START</button>
      <button onClick={stopTimer}>STOP</button>
      <button onClick={resetTimer}>RESET</button>
      <br /><br />
      <img onClick={stopTimerAudio} width="50px" src="https://www.freeiconspng.com/thumbs/sound-off-icon/sound-off-music-mute-off-sound-speaker-volume-icon-16.png" alt="" />
    </div>
  );
}
export { Timer };
