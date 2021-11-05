import * as Tone from "tone";

const useRepeater = () => {
  function playSynth() {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("C4", "8n");
  }
  function repeatTone() {
    Tone.Transport.bpm.value = 60;
    new Tone.Sequence(
      (num) => {
        console.log(num);
      },
      [1, 2, 3, 4]
    );
  }
  function repeatNow() {
    function timer() {
      console.log(`performance.now():`, performance.now());
      if (performance.now() < 5000) {
        requestAnimationFrame(timer);
      }
    }
    requestAnimationFrame(timer);
  }
  return [repeatTone, repeatNow];
};

export default useRepeater;
