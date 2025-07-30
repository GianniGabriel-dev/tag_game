import { useState, useEffect } from "react";

export function Timer({ initialMinutes = 0, initialSeconds = 0, dialogOpen }) {
  const [totalTime, setTotalTime] = useState(
    initialMinutes * 60 + initialSeconds
  );

  useEffect(() => {
    if (dialogOpen) return;
    const interval = setInterval(() => {
      setTotalTime((prevTime) => prevTime + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [dialogOpen]);

  const minutes = Math.floor(totalTime / 60);
  const seconds = totalTime % 60;

  return (
    <div className="timer">
      <h2>
        {/*pad start asegura que se muestren siempre dos digitos 00:00*/}
        {String(minutes).padStart(2, "0")} : {String(seconds).padStart(2, "0")}
      </h2>
    </div>
  );
}
