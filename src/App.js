import "./App.css";
import useMIDIAccess from "./Music Hooks/useMIDIAccess";
import StartAudioButton from "./GUI/StartAudioButton/StartAudioButton";
import SmartPadModel from "./GUI/SmartPadModel";
import useRepeater from "./Music Hooks/useRepeater";

function App() {
  const [sendMIDImessage] = useMIDIAccess();
  sendMIDImessage(1, [144, 86, 30]);
  // compare the usefulness of perfomance.now() and the Tone.js Sequencer
  //for sending steady midi signals
  // and Dom animations

  const [repeatTone, repeatNow] = useRepeater();
  return (
    <div className="App">
      <header>{/* <StartAudioButton /> */}</header>
      <section>
        <SmartPadModel />
      </section>
    </div>
  );
}

export default App;
