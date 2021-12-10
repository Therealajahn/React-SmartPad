import React, { useRef, useEffect, useState } from "react";

const useRepeater = (sendMIDIMessage, getMIDIMessage, advance) => {
  useEffect(() => {
    startBeatLoop();
  }, []);

  const currentTime = useRef(1);
  const step = useRef(0);

  function startBeatLoop() {
    function time(timestamp) {
      //detect if the step number has changed
      const stepRaw = Math.floor(timestamp / 1000);
      if (stepRaw !== currentTime.current) {
        currentTime.current += 1;
      }
      if (currentTime.current % 10 === 0) {
        step.current = (step.current % 8) + 1;

        console.log(`step.current`, step.current);
        advance(step.current);
      }

      requestAnimationFrame(time);
    }
    requestAnimationFrame(time);
  }

  return step.current;
};

export default useRepeater;
