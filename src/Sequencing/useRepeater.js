import React, { useRef, useEffect, useState } from "react";

const useRepeater = (sendMIDIMessage, getMIDIMessage, advance) => {
  useEffect(() => {
    startBeatLoop();
  }, []);

  const currentTime = useRef(1);
  const step = useRef(0);
  const step2 = useRef(0);

  function startBeatLoop() {
    function time(timestamp) {
      //detect if the step number has changed
      const stepRaw = Math.floor(timestamp / 1000);
      if (stepRaw !== currentTime.current) {
        currentTime.current += 1;
      }
      if (currentTime.current % 50 === 0) {
        step.current = (step.current % 8) + 1;

        // console.log(`step.current`, step.current);
        advance(step.current, 1, 6);
      }
      // if (currentTime.current % 100 === 0) {
      //   step2.current = (step2.current % 8) + 1;

      //   console.log(`step2.current`, step2.current);
      //   advance(step2.current, 7, 8);
      // }

      requestAnimationFrame(time);
    }
    requestAnimationFrame(time);
  }

  return step.current;
};

export default useRepeater;
