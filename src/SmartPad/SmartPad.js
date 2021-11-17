import React, { useEffect, useState } from "react";
import useMIDIAccess from "../MIDI/useMIDIAccess";
import useSmartPadInputs from "./Hooks/useSmartPadInput.js";
import useSmartPadLights from "./Hooks/useSmartPadLights";
import SmartPadModel from "./SmartPadModel";

const SmartPad = (props) => {
  //prettier-ignore
  const [getInputs, setInputs] = useState([
      { name: "", type: "", state: "" },
    ]);
  const [getOutputs, setOutputs] = useState([
    { name: "", type: "", state: "" },
  ]);
  const [getMIDIMessage, setMIDIMessage] = useState({
    device: { name: "", type: "", state: "" },
    message: [0, 0, 0],
  });

  function getMIDIMessagesOut(device, message) {
    setMIDIMessage({ device: device, message: message });
  }
  function getInputsOut(inputs) {
    setInputs(inputs);
    console.log(`inputs`, inputs);
  }
  function getOutputsOut(outputs) {
    setOutputs(outputs);
    console.log(`outputs`, outputs);
  }

  const [sendMIDIMessage] = useMIDIAccess({
    messages: getMIDIMessagesOut,
    inputs: getInputsOut,
    outputs: getOutputsOut,
  });

  function sendLightCoordinates(trigger, coordinateObject, color) {
    return [trigger, coordinateObject, color];
  }

  useSmartPadLights({
    sendMIDIMessage: sendMIDIMessage,
    sendLightCoordinates: sendLightCoordinates,
  });

  function getButtonsOut() {
    console.log("buttons out");
  }

  function getModeButtons() {
    console.log("mode buttons out");
  }

  function getEncoders() {
    console.log("get encoders out");
  }

  useSmartPadInputs({
    getMIDIMessage: getMIDIMessage,
    buttons: getButtonsOut,
    modeButtons: getModeButtons,
    encoders: getEncoders,
  });

  return (
    <div>
      <SmartPadModel />
    </div>
  );
};

export default SmartPad;
