import React, { useRef, useEffect, useState } from "react";

const useSmartPadLights = (sendMIDIMessage) => {
  function sendLightCoordinates(trigger, col, row, color) {
    let lightSwitch = 144;
    //144 for on 128 for off
    if (trigger === "on") {
      lightSwitch = 144;
    } else if (trigger === "off") {
      lightSwitch = 128;
    }

    const convertY = {
      1: 0, // to 7
      2: 16, // to 23
      3: 32, // to 39
      4: 48, // to 55
      5: 64, // to 71
      6: 80, // to 87
      7: 96, // to 103
      8: 112, // to 119
    };
    const convertX = {
      1: 0,
      2: 1,
      3: 2,
      4: 3,
      5: 4,
      6: 5,
      7: 6,
      8: 7,
    };
    const buttonId = convertX[col] + convertY[row];

    const padColors = {
      black: 0,
      white: 15,
      purple: 63,
      blue: 47,
      green: 96,
      yellow: 31,
      red: 122,
    };

    const lightColor = padColors[color];

    // console.log("lights args", arguments);

    sendMIDIMessage(2, [lightSwitch, buttonId, lightColor]);
  }
  return [sendLightCoordinates];
};

export default useSmartPadLights;
