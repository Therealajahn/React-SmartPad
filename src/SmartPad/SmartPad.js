import React, { useRef, useEffect, useState } from "react";
import usePadStore from "./Hooks/usePadStore";
import useStoreOnButtons from "./Hooks/useStoreOnButtons";
import useSmartPadInputs from "./Hooks/useSmartPadInputs";
import useSmartPadLights from "./Hooks/useSmartPadLights";
import useSmartPadModel from "./Hooks/useSmartPadModel";
import useInputOnStore from "./Hooks/useInputOnStore";
import useRepeater from "../Sequencing/useRepeater";

const SmartPad = (props) => {
  const { sendMIDIMessage, getMIDIMessage, getMIDIInputs, getMIDIOutputs } =
    props;

  //////////////REPEATER
  //this will live here until I have multiple instruments, when I
  //make a dedicated Sequencer component to keep time between all the instruments
  //although each instrument will have the option to be timed independently(based on the same timer)
  const [getStep, setStep] = useState(0);

  useRepeater(sendMIDIMessage, getMIDIMessage, returnStep);

  function returnStep(step) {
    // console.log(`step`, step);
    setStep(step);
  }

  ///////////////UPDATE PAD STORE

  const [getPadStore, setPadStore] = useState();

  const [updateButton] = usePadStore({
    setPadStore: setPadStore,
  });

  ////////////////WRITE INPUT TO PAD STORE

  const [buttonPressed] = useInputOnStore(changeMode, updateButton);

  function changeMode() {
    return "normal";
  }

  /////////////////GET SMART PAD INPUTS

  useSmartPadInputs(
    getMIDIMessage,
    buttonPressed
    // modeButtonPressed,
    // encoderTurned
  );

  /////////////////SMART PAD MODEL

  const smartPadElements = useSmartPadModel(getPadStore);

  /////////////////SMART PAD LIGHTS

  const [sendLightCoordinates] = useSmartPadLights(sendMIDIMessage);

  ////////////////WRITE STORE TO BUTTONS

  useStoreOnButtons(getPadStore, sendLightCoordinates);

  /////////////////PLAYHEAD
  //usePlayhead takes in getSequence prop and modifies Pad State
  //should this live in the output filter?
  //I am going to need this to change based on what mode I'm in
  //I can just send it a mode change

  return (
    <div className="SmartPadModel" style={{ placeSelf: "center" }}>
      {smartPadElements}
    </div>
  );
};

export default SmartPad;
