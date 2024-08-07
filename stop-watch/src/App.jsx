import { useEffect, useRef, useState } from "react";
import "./App.css";

function timer(count) {
  let mins = Math.floor(count / 60);
  count %= 60;
  return `${mins} : ${count < 10 ? "0" : ""}${count} `;
}

function App() {
  const [count, setCount] = useState(0);
  const [start, setStart] = useState(false);
  const [reset, setReset] = useState(false);
  let timerId = useRef(null);

  function handleStartPause() {
    setStart((startPause) => !startPause);
  }

  function handleReset() {
    setReset((prev) => !prev);
  }

  useEffect(() => {
    timerId.current = setInterval(() => {
      if (start) {
        setCount((count) => count + 1);
      }
    }, 1000);

    return () => {
      clearInterval(timerId.current);
    };
  }, [start, count]);

  return (
    <div className="container">
      <div className="stopwatch">
        <div className="time-container">
          <h1 className="time">{timer(count)}</h1>
        </div>

        <div className="button-container">
          <button className="start-pause" onClick={handleStartPause}>
            {!start ? "▶" : "⏹"}
          </button>
          <button className="start-pause" onClick={handleReset}>
            🔄️
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
