import React, { useEffect, useState } from "react";
import useMIDIAccess from "../MIDI/useMIDIAccess";
import SmartPadModel from "./SmartPadModel";

const SmartPad = (props) => {
  // UI COMPONENT SmartPad houses smartpad model and hooks useSmartPad and useSmartPadInput to manipulate and recieve input from both the onscreen and physical Smartpads.
  const [getSmartPadLocation, updateSmartPadLocation] = useState();

  //run when props.coordinates changes
  useEffect(() => {}, [props.coordinates, props.color]);
  const [
    accessMIDIInputs,
    accessMIDIOutputs,
    addMIDIListeners,
    sendMIDIMessage,
  ] = useMIDIAccess();

  //run on load or if SmartPad index changes
  useEffect(() => {
    //get the index of SmartPad, store in state
    console.log(`accessMIDIInputs()`, accessMIDIInputs());
  }, [getSmartPadLocation]);

  function sendLightColor() {
    //when Smartpad props.coordinates or props.color changes,update the light
    sendMIDIMessage(1, [144, 86, 30]);
  }

  //if SmartPad is disconnected on load or ever send a modal and remove index from state (reset)
  //
  return (
    <div>
      <SmartPadModel />
    </div>
  );
};

export default SmartPad;
