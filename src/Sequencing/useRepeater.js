import React, { useRef, useEffect, useState } from "react";

const useRepeater = (sendMIDIMessage, getMIDIMessage, advance) => {
  useEffect(() => {
    startBeatLoop();
  }, []);

  function startBeatLoop() {
    function time() {
      metronome();
      requestAnimationFrame(time);
    }
    requestAnimationFrame(time);
  }

  const step = useRef(0);
  const tick = useRef(0);

  function metronome() {
    tick.current += 1;
    // console.log(`tick`, tick);

    if (tick.current % 60 === 0) {
      step.current = (step.current % 8) + 1;
      // console.log(`step`, step.current);
      part(step.current);
      advance(step.current, 1, 6);
    }
  }

  function part() {
    sendMIDIMessage("USB Midi MIDI 1", [144, 0, 127]);
  }
};
export default useRepeater;
