import React, { useRef, useEffect, useState } from "react";
import useMIDIAccess from "../MIDI/useMIDIAccess";
import useSmartPadInputs from "./Hooks/useSmartPadInput.js";
import useSmartPadLights from "./Hooks/useSmartPadLights";
import SmartPadModel from "./SmartPadModel";

const SmartPad = (props) => {
  const midiInputs = useRef([{ name: "", type: "", state: "" }]);

  const midiOutputs = useRef([{ name: "", type: "", state: "" }]);

  const [getMIDIMessage, setMIDIMessage] = useState({
    device: { name: "", type: "", state: "" },
    message: [0, 0, 0],
  });
  //shouldn't these three live in the app component? along with the midiaccess Hook? pass down as props?
  const [getButtonColor, setButtonColor] = useState([
    // "on", { padX: 1, padY: 8 }, "red"
  ]);

  const [sendMIDIMessage] = useMIDIAccess({
    messages: getMIDIMessagesOut,
    inputs: getInputsOut,
    outputs: getOutputsOut,
  });

  function getMIDIMessagesOut(device, message) {
    setMIDIMessage({ device: device, message: message });
  }
  function getInputsOut(inputs) {
    midiInputs.current = inputs;
    console.log(`inputs`, inputs);
  }
  function getOutputsOut(outputs) {
    midiOutputs.current = outputs;
    console.log(`outputs`, outputs);
  }

  const [sendLightCoordinates] = useSmartPadLights({
    sendMIDIMessage: sendMIDIMessage,
  });

  useEffect(() => {
    sendButtonColor(["on", { padX: 1, padY: 2 }, "red"]);
  }, []);

  function sendButtonColor(buttonSignal) {
    sendLightCoordinates(buttonSignal);
    setButtonColor(buttonSignal);
  }

  useSmartPadInputs({
    getMIDIMessage: getMIDIMessage,
    buttons: getButtonsOut,
    modeButtons: getModeButtons,
    encoders: getEncoders,
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

  return (
    <div>
      <SmartPadModel sendButton={getButtonColor} />
    </div>
  );
};

export default SmartPad;
