import React, { useRef, useEffect, useState } from "react";
import usePadStore from "./Hooks/usePadStore";
import useSmartPadInputs from "./Hooks/useSmartPadInputs";
import useSmartPadLights from "./Hooks/useSmartPadLights";
import SmartPadModel from "./SmartPadModel";

const SmartPad = (props) => {
  const [getButtonColor, setButtonColor] = useState([
    // "on", { padX: 1, padY: 8 }, "red"
  ]);

  /////////////Functions From Props
  const sendMIDIMessage = props.sendMIDIMessage;
  const getSequence = props.getSequence + 1;

  const [sendLightCoordinates] = useSmartPadLights({
    sendMIDIMessage: sendMIDIMessage,
  });

  useSmartPadInputs({
    getMIDIMessage: props.getMIDIMessage,
    buttons: getButtonsOut,
    modeButtons: getModeButtons,
    encoders: getEncoders,
  });

  function getButtonsOut(isOn, coordinates) {
    console.log("buttons out", isOn, coordinates);
    const { padX, padY } = coordinates;
    //apply button for toggles
    if (isOn) {
      updateStore(padX, padY, "trigger", true);
    }
    //apply button to SmartPad state
  }

  function sendButtonColor(buttonSignal) {
    sendLightCoordinates(buttonSignal);
    // setButtonColor(buttonSignal);
  }

  const [updateStore] = usePadStore({
    returnStore: returnStore,
  });

  function returnStore(getPadStore) {
    console.log("pad store:", getPadStore);
    return getPadStore;
  }

  useEffect(() => {
    applyPadModel();
  }, [getSequence]);

  function applyPadModel() {
    //loop over smartPad state apply the triggers with sendButtonColor
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
