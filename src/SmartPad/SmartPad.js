import React, { useRef, useEffect, useState } from "react";
import usePadStore from "./Hooks/usePadStore";
import useStoreOnButtons from "./Hooks/useStoreOnButtons";
import useSmartPadInputs from "./Hooks/useSmartPadInputs";
import useSmartPadLights from "./Hooks/useSmartPadLights";
import useSmartPadModel from "./Hooks/useSmartPadModel";
import useInputOnStore from "./Hooks/useInputOnStore";
import useRepeater from "../Sequencing/useRepeater";
import usePlayhead from "./Hooks/usePlayhead";

const SmartPad = (props) => {
  const { sendMIDIMessage, getMIDIMessage, getMIDIInputs, getMIDIOutputs } =
    props;

  ///////////////UPDATE PAD STORE

  const [getPadStore, setPadStore, updateButton, updateManyButtons] =
    usePadStore();

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
  /////////////////PLAYHEAD

  const [setPlayhead, sendPlayheadArray] = usePlayhead(updateButton);

  //////////////REPEATER
  //this will live here until I have multiple instruments, when I
  //make a dedicated Sequencer component to keep time between all the instruments
  //although each instrument will have the option to be timed independently(based on the same timer)
  const [getStep, setStep] = useState(0);

  useRepeater(sendMIDIMessage, getMIDIMessage, sendPlayheadArray);

  ////////////////WRITE STORE TO BUTTONS

  useStoreOnButtons(getPadStore, sendLightCoordinates);

  return (
    <div className="SmartPadModel" style={{ placeSelf: "center" }}>
      {smartPadElements}
    </div>
  );
};

export default SmartPad;
