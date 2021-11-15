import React, { useRef } from "react";

const useMIDIAccess = () => {
  const requestMIDI = useRef(navigator.requestMIDIAccess());

  async function accessMIDIInputs() {
    return requestMIDI.current
      .then(function (access) {
        return addMIDIListeners(access.inputs);
      })
      .then((result) => {
        return result;
      });
  }
  //local
  function addMIDIListeners(map) {
    let array = [];
    map.forEach((item) => {
      item.addEventListener("midimessage", function (e) {
        // console.log(e);
      });
      item.addEventListener("statechange", function (e) {
        // console.log(e);
      });
      array.push(item.name);
    });
    return array;
  }

  function accessMIDIOutputs() {
    return requestMIDI.current.then(function (access) {
      return addMIDIListeners(access.outputs);
    });
  }

  //useMIDIOutput
  function sendMIDIMessage(outputNumber, message) {
    accessMIDIOutputs().then((outputs) => {
      if (outputs[outputNumber]) {
        console.log(`MIDI out:`, outputs[outputNumber].name, message);
        outputs[outputNumber].send(message);
      }
    });
  }

  return [accessMIDIInputs, accessMIDIOutputs, sendMIDIMessage];
};

export default useMIDIAccess;
