import React, { useRef, useEffect, useState } from "react";

const useRepeater = (sendMIDIMessage, getMIDIMessage, returnStep) => {
  useEffect(() => {
    startBeatLoop(returnStep);
  }, []);

  const currentTime = useRef(1);
  const step = useRef(0);

  function startBeatLoop(returnStep) {
    function time(timestamp) {
      //detect if the step number has changed
      const stepRaw = Math.floor(timestamp / 1000);
      if (stepRaw !== currentTime.current) {
        currentTime.current += 1;
      }
      if (currentTime.current % 10 === 0) {
        step.current = (step.current + 1) % 8;
        returnStep(step.current);
      }

      requestAnimationFrame(time);
    }
    requestAnimationFrame(time);
  }

  return step.current;
};

export default useRepeater;
