import React, { useRef, useEffect, useState } from "react";
import usePadStore from "./Hooks/usePadStore";
import useStoreOnButtons from "./Hooks/useStoreOnButtons";
import useSmartPadInputs from "./Hooks/useSmartPadInputs";
import useSmartPadLights from "./Hooks/useSmartPadLights";
import SmartPadModel from "./SmartPadModel";
import useInputOnStore from "./Hooks/useInputOnStore";
import useRepeater from "../Sequencing/useRepeater";
import usePlayhead from "./Hooks/usePlayhead";

const SmartPad = (props) => {
  const { sendMIDIMessage, getMIDIMessage, getMIDIInputs, getMIDIOutputs } =
    props;

  /////////////////UPDATE PAD STORE

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
    buttonPressed,
    modeButtonPressed,
    encoderTurned
  );

  //placeholder functions until I add these to a hook
  function modeButtonPressed(modeButton) {
    console.log(`modeButton`, modeButton);
  }
  function encoderTurned(encoderNumber, encoderCC, encoderDirection) {
    console.log(`encoderNumber`, encoderNumber);
    console.log(`encoderCC`, encoderCC);
    console.log(`encoderDirection`, encoderDirection);
  }

  /////////////////SMART PAD LIGHTS

  const [sendLightCoordinates] = useSmartPadLights(
    sendMIDIMessage,
    getMIDIOutputs
  );

  /////////////////PLAYHEAD

  const [sendPlayheadArray] = usePlayhead(updateManyButtons);

  /////////////////REPEATER

  useRepeater(sendMIDIMessage, getMIDIMessage, sendPlayheadArray);

  /////////////////WRITE STORE TO BUTTONS

  useStoreOnButtons(getPadStore, sendLightCoordinates);

  return (
    <div className="SmartPadModel" style={{ placeSelf: "center" }}>
      <SmartPadModel getPadStore={getPadStore} updateButton={updateButton} />
    </div>
  );
};

export default SmartPad;
