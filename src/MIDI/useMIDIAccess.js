import React, { useRef, useEffect, useState } from "react";

const useMIDIAccess = (send) => {
  const requestMIDI = useRef(navigator.requestMIDIAccess());

  useEffect(() => {
    accessMIDIInputs().then((inputs) => {
      send.inputs(inputs);
    });
    accessMIDIOutputs().then((outputs) => {
      send.outputs(outputs);
    });
    return () => {
      removeMIDIListeners();
    };
  }, []);

  ////////////////PRIVATE

  //OUTPUT
  function accessMIDIInputs() {
    return requestMIDI.current.then((access) => {
      return addMIDIListeners(access.inputs);
    });
  }

  function accessMIDIOutputs() {
    return requestMIDI.current.then((access) => {
      return addMIDIListeners(access.outputs);
    });
  }

  //EVENT LISTENING
  function addMIDIListeners(map) {
    let array = [];
    map.forEach((item) => {
      item.addEventListener("midimessage", inputMessageHandler.current);
      item.addEventListener("statechange", stateChangeHandler.current);
      array.push({ name: item.name, type: item.type, state: item.state });
    });
    return array;
  }

  function removeMIDIListeners(map) {
    let array = [];
    map.forEach((item) => {
      item.removeEventListener("midimessage", inputMessageHandler.current);
      item.removeEventListener("statechange", stateChangeHandler.current);
      array.push(item.name);
    });
    return array;
  }

  const inputMessageHandler = useRef((event) => {
    const item = event.target;
    const device = { name: item.name, type: item.type, state: item.state };
    const message = [event.data[0], event.data[1], event.data[2]];
    send.messages(device, message);
  });

  const stateChangeHandler = useRef((event) => {
    const item = event.port;
    const changedDevice = {
      name: item.name,
      type: item.type,
      state: item.state,
    };
  });

  ////////////////PUBLIC

  function sendMIDIMessage(outputNumber, message) {
    requestMIDI.current.then((access) => {
      let array = [];
      for (const output of access.outputs) {
        array.push(output);
      }
      if (array[outputNumber]) {
        array[outputNumber][1].send(message);
      }
    });
  }

  return [sendMIDIMessage];
};

export default useMIDIAccess;
