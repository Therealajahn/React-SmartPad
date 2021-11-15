import "./App.css";
import SmartPad from "./GUI/SmartPad";

function App() {
  // UI COMPONENT SmartPad houses smartpad model and hooks useSmartPad and useSmartPadInput to manipulate and recieve input from both the onscreen and physical Smartpads.

  //get location of smartpad from list
  return (
    <div className="App">
      <header>{/* <StartAudioButton /> */}</header>
      <section>
        <SmartPad />
      </section>
    </div>
  );
}

export default App;
