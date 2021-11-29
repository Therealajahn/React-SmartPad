import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import SmartPad from "./SmartPad/SmartPad";
import useMIDIAccess from "./MIDI/useMIDIAccess";
import usePureData from "./MIDI/usePuredata";
import useRepeater from "./Sequencing/useRepeater";

function App() {
  ////////////////MIDI STATE
  const midiInputs = useRef([{ name: "", type: "", state: "" }]);

  const midiOutputs = useRef([{ name: "", type: "", state: "" }]);

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
    midiInputs.current = inputs;
    // console.log(`inputs`, inputs);
  }
  function getOutputsOut(outputs) {
    midiOutputs.current = outputs;
    // console.log(`outputs`, outputs);
  }
  //////////////REPEATER
  const [getSequence, setSequence] = useState(0);

  useRepeater({
    sendMIDIMessage: sendMIDIMessage,
    getMIDIMessage: getMIDIMessage,
    advanceSequence: advanceSequence,
  });

  function advanceSequence() {
    setSequence((sequenceCount) => (sequenceCount += 1) % 8);
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
          getSequence={getSequence}
        />
      </section>
    </div>
  );
}

export default App;
