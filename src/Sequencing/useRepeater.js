import React, { useRef, useEffect, useState } from "react";

const useRepeater = (
  sendMIDIMessage,
  getMIDIMessage,
  sendPlayheadArray,
  getPadStore
) => {
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

    if (tick.current % 30 === 0) {
      step.current = (step.current % 8) + 1;
      // console.log(`step`, step.current);
      volcaDrum(step.current, sendMIDIMessage, getMIDIMessage);
      sendPlayheadArray(step.current, 1, 6);
    }
  }

  function volcaDrum(step, sendMIDIMessage, getMIDIMessage) {
    function partOne() {
      console.log(getPadStore);
      let currentStep = getPadStore["1"][step - 1];

      if (currentStep.trigger && currentStep.playhead) {
        sendMIDIMessage("USB Midi MIDI 1", [144, 0, 127]);
      }
    }
    function partTwo() {
      let rhythm = [0, 1, 0, 1, 0, 1, 0, 1];
      if (rhythm[step - 1]) {
        sendMIDIMessage("USB Midi MIDI 1", [145, 0, 127]);
      }
    }
    partOne();
    partTwo();
  }
};
export default useRepeater;
