import React, { useEffect } from "react";

function StartAudioButton() {
  // useEffect(() => {
  //   handleStartButton();
  // }, []);

  function handleStartButton() {
    const startButton =
      document.getElementsByClassName("start audio button")[0];
    //start audio context
    startButton.addEventListener("click", (e) => {});
    startButton.addEventListener("mousedown", (e) => {
      e.target.style.marginTop = "10px";
      e.target.style.boxShadow = "none";
    });
    startButton.addEventListener("mouseup", (e) => {
      e.target.style.marginTop = "0px";
      e.target.style.boxShadow = "#fff 0px 10px";
    });
  }
  return <div className="StartAudioButton">Start Audio</div>;
}

export default StartAudioButton();
