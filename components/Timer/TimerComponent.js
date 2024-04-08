import React, { useState, useEffect } from "react";

const TimerComponent = () => {
  const [elapsedTime, setElapsedTime] = useState("00:00:00");
  const startTime = "2023-09-22T09:33:11.000Z"; // Replace with your actual start time

  const timeGap = (startTime) => {
    if (startTime != null) {
      const timeNow = new Date();
      const time = new Date(startTime);

      const timeDiff = timeNow.getTime() - time.getTime();

      const hours = String(Math.floor(timeDiff / (1000 * 60 * 60))).padStart(
        2,
        "0"
      );
      const minutes = String(
        Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
      ).padStart(2, "0");
      const seconds = String(
        Math.floor((timeDiff % (1000 * 60)) / 1000)
      ).padStart(2, "0");

      return hours + ":" + minutes + ":" + seconds;
    } else {
      return "00:00:00";
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsedTime = timeGap(startTime);
      setElapsedTime(elapsedTime);
    }, 1000);

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [startTime]);

  return (
    <div className="!font-bold mtx-label text-black">
      Ongoing session {elapsedTime}
      {startTime}
    </div>
  );
};

export default TimerComponent;
