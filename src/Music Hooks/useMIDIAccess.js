import React, { useRef, useEffect } from "react";

const useMIDIAccess = () => {
  const requestMIDI = useRef(navigator.requestMIDIAccess());

  useEffect(() => {
    accessMIDIInputs();
  }, []);

  function accessMIDIInputs() {
    return requestMIDI.current.then(function (access) {
      return addMIDIListeners(access.inputs);
    });
  }

  function accessMIDIOutputs() {
    return requestMIDI.current.then(function (access) {
      return addMIDIListeners(access.outputs);
    });
  }

  function addMIDIListeners(map) {
    let array = [];
    map.forEach((item) => {
      item.addEventListener("midimessage", function (e) {
        console.log(e);
      });
      item.addEventListener("statechange", function (e) {
        console.log(e);
      });
      array.push(item);
    });
    return array;
  }

  function sendMIDIMessage(outputNumber, message) {
    accessMIDIOutputs().then((outputs) => {
      if (outputs[outputNumber]) {
        console.log(`MIDI out:`, outputs[outputNumber].name, message);
        outputs[outputNumber].send(message);
      }
    });
  }

  return [sendMIDIMessage];
};

export default useMIDIAccess;
