import React, { useRef, useEffect, useState } from "react";

const useRepeater = (send) => {
  const { sendMIDIMessage } = send;
  useEffect(() => {
    //code that starts a sequencer
    let currentTime = 1;
    let step = 0;
    function time(timestamp) {
      //detect if the step number has changed
      const stepRaw = Math.floor(timestamp / 1000);
      if (stepRaw !== currentTime) {
        currentTime += 1;
      }
      if (currentTime % 10 === 0) {
        //TODO: redo so that each beat is determined with bpm,
        //meaning it counts each tick and makes a beat
        //which will make it possible for future interpolation between rythms
        triggerStep();
      }

      function triggerStep() {
        // console.log(step);
        const rythm = [1, 0, 1, 1, 1, 0, 1, 0];

        if (rythm[step % 8]) {
          sendMIDIMessage(1, [144, 0, 127]);
        }
        step += 1;
      }
      requestAnimationFrame(time);
    }
    requestAnimationFrame(time);
  }, []);
};

export default useRepeater;
