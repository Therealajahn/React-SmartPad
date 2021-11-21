import React, { useRef, useEffect, useState } from "react";

const useSmartPadInputs = (send) => {
  const { getMIDIMessage } = send;

  const getButtonCoordinates = useRef((buttonType, buttonNumber) => {
    let padY = 0;
    let xMin = 0;

    if (buttonNumber >= 0 && buttonNumber <= 7) {
      padY = 1;
      xMin = 0;
    } else if (buttonNumber >= 16 && buttonNumber <= 23) {
      padY = 2;
      xMin = 16;
    } else if (buttonNumber >= 32 && buttonNumber <= 39) {
      padY = 3;
      xMin = 32;
    } else if (buttonNumber >= 48 && buttonNumber <= 55) {
      padY = 4;
      xMin = 48;
    } else if (buttonNumber >= 64 && buttonNumber <= 71) {
      padY = 5;
      xMin = 64;
    } else if (buttonNumber >= 80 && buttonNumber <= 87) {
      padY = 6;
      xMin = 80;
    } else if (buttonNumber >= 96 && buttonNumber <= 103) {
      padY = 7;
      xMin = 96;
    } else if (buttonNumber >= 112 && buttonNumber <= 119) {
      padY = 8;
      xMin = 112;
    }

    let padX = buttonNumber - xMin + 1;

    let isOn;

    if (buttonType === 144) {
      isOn = true;
    } else if (buttonType === 128) {
      isOn = false;
    }

    send.buttons(isOn, { padX: padX, padY: padY });
  });

  const getModeButton = useRef((modeButton) => {
    //convert the modeButton number to 1-8 range
    send.modeButtons(modeButton - 111);
  });

  const encoderBuffer = useRef(0);

  const encoderHandler = useRef((encoderNumber, encoderCC) => {
    let direction = "";
    if (encoderCC > encoderBuffer.current) {
      encoderBuffer.current = encoderCC;
      direction = "up";
    }
    if (encoderCC < encoderBuffer.current) {
      encoderBuffer.current = encoderCC;
      direction = "down";
    }
    return { id: encoderNumber, cc: encoderCC };
  });

  useEffect(() => {
    // console.log(getMIDIMessage.device.name, getMIDIMessage.message);
    if (getMIDIMessage.device.name === "SmartPAD MIDI 1") {
      routeInput();
    }
  }, [getMIDIMessage]);

  function routeInput() {
    if (getMIDIMessage.device.name === "SmartPAD MIDI 1") {
      //PAD BUTTONS SEND:[(144:on 128:off),(*see reference),((0:on 127:off))]
      switch (getMIDIMessage.message[0]) {
        case 144:
          getButtonCoordinates.current(
            getMIDIMessage.message[0],
            getMIDIMessage.message[1]
          );
          break;
        case 128:
          getButtonCoordinates.current(
            getMIDIMessage.message[0],
            getMIDIMessage.message[1]
          );
          break;

        //MODE BUTTONS SEND: [(159:on 143:off),(112-119),(0:on 127:off)]
        case 159:
          getModeButton.current(getMIDIMessage.message[1]);
          break;
        case 143:
          getModeButton.current(getMIDIMessage.message[1]);
          break;
        //ENCODER SEND
        case 176:
          encoderHandler.current(
            getMIDIMessage.message[1],
            getMIDIMessage.message[2]
          );
          break;
      }
      // sendMIDIMessage(1, getMIDIMessage.message);
    }
  }

  //convert SmartPad to coordinates
};

export default useSmartPadInputs;
