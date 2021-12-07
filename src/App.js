import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import SmartPad from "./SmartPad/SmartPad";
import useMIDIAccess from "./MIDI/useMIDIAccess";
import usePureData from "./MIDI/usePuredata";

function App() {
  console.log("render");
  ////////////////MIDI STATE
  const [getMIDIInputs, setMIDIInputs] = useState([
    { name: "", type: "", state: "" },
  ]);

  const [getMIDIOutputs, setMIDIOutputs] = useState([
    { name: "", type: "", state: "" },
  ]);

  const [getMIDIMessage, setMIDIMessage] = useState({
    device: { name: "", type: "", state: "" },
    message: [0, 0, 0],
  });
  /////////////MIDI Access
  const [sendMIDIMessage] = useMIDIAccess({
    messages: getMIDIMessagesOut,
    inputs: getInputsOut,
    outputs: getOutputsOut,
  });

  function getMIDIMessagesOut(device, message) {
    setMIDIMessage({ device: device, message: message });
  }
  function getInputsOut(inputs) {
    setMIDIInputs(inputs);
    // console.log(`inputs`, inputs);
  }
  function getOutputsOut(outputs) {
    setMIDIOutputs(outputs);
    // console.log(`outputs`, outputs);
  }

  //////////////PUREDATA

  // usePureData({
  //   sendMIDIMessage: sendMIDIMessage,
  //   getMIDIMessage: getMIDIMessage,
  //   midiInputs: midiInputs.current,
  //   advanceSequence: advanceSequence,
  // });

  return (
    <div className="App">
      <section>
        <SmartPad
          sendMIDIMessage={sendMIDIMessage}
          getMIDIMessage={getMIDIMessage}
          getMIDIInputs={getMIDIInputs}
          getMIDIOutputs={getMIDIOutputs}
        />
      </section>
    </div>
  );
}

export default App;
