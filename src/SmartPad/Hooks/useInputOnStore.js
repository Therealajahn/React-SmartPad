import React, { useRef, useEffect, useState } from "react";

const useInputOnStore = (changeMode, updateButton) => {
  function buttonPressed(isOn, coordinates) {
    const { padX, padY } = coordinates;
    normalMode(isOn, padX, padY);
    return [isOn, coordinates];
  }
  function normalMode(isOn, padX, padY) {
    if (isOn && padY <= 6) {
      // console.log("send togggle");
      return updateButton(padX, padY, "trigger", "toggle");
    }
  }

  return [buttonPressed];
};

export default useInputOnStore;
