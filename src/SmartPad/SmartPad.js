import React, { useRef, useEffect, useState } from "react";
import usePadStore from "./Hooks/usePadStore";
import useInputFilter from "./Hooks/useInputFilter";
import useOutputFilter from "./Hooks/useOutputFilter";
import useSmartPadInputs from "./Hooks/useSmartPadInputs";
import useSmartPadLights from "./Hooks/useSmartPadLights";
import useSmartPadModel from "./Hooks/useSmartPadModel";

const SmartPad = (props) => {
  const sendMIDIMessage = props.sendMIDIMessage;
  const getSequence = props.getSequence + 1;

  /////////////////SMART PAD MODEL
  const [getButtonColor, setButtonColor] = useState([]);
  //[trigger, col, row, color]

  const [smartPadHTML] = useSmartPadModel([getButtonColor]);
  console.log(`smartPadHTML`, smartPadHTML);

  /////////////////SMART PAD LIGHTS
  const [sendLightCoordinates] = useSmartPadLights({
    sendMIDIMessage: sendMIDIMessage,
  });

  ///////////////PAD STORE
  const [getPadStore, setPadStore] = useState();

  const [updateButton] = usePadStore({
    setPadStore: setPadStore,
  });

  ////////////////INPUT FILTER
  const [buttonPressed] = useInputFilter({
    changeMode: changeMode,
    updateButton: updateButton,
  });

  function changeMode() {
    return "normal";
  }
  ////////////////OUTPUT FILTER

  useOutputFilter({
    changeMode: changeMode,
    getPadStore: getPadStore,
    sendLightCoordinates: sendLightCoordinates,
    setButtonColor: setButtonColor,
  });

  /////////////////PLAYHEAD
  //usePlayhead takes in getSequence prop and modifies Pad State
  //should this live in the output filter?
  //I am going to need this to change based on what mode I'm in
  //I can just send it a mode change

  /////////////////SMART PAD INPUTS
  useSmartPadInputs({
    getMIDIMessage: props.getMIDIMessage,
    buttons: getButtonsOut,
    modeButtons: getModeButtons,
    encoders: getEncoders,
  });

  function getButtonsOut(isOn, coordinates) {
    // console.log("buttons out", isOn, coordinates);
    buttonPressed(isOn, coordinates);
  }

  function getModeButtons() {
    console.log("mode buttons out");
  }

  function getEncoders() {
    console.log("get encoders out");
  }

  return <div></div>;
};

export default SmartPad;
