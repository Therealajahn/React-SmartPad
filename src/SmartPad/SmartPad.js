import React, { useRef, useEffect, useState } from "react";
import useSmartPadInputs from "./Hooks/useSmartPadInputs";
import useSmartPadLights from "./Hooks/useSmartPadLights";
import SmartPadModel from "./SmartPadModel";

const SmartPad = (props) => {
  const [getButtonColor, setButtonColor] = useState([
    // "on", { padX: 1, padY: 8 }, "red"
  ]);

  const sendMIDIMessage = props.sendMIDIMessage;
  const getSequence = props.getSequence + 1;

  const [sendLightCoordinates] = useSmartPadLights({
    sendMIDIMessage: sendMIDIMessage,
  });

  const [getTriggers, setTriggers] = useState([]);
  const triggerToggle = useRef(false);

  useSmartPadInputs({
    getMIDIMessage: props.getMIDIMessage,
    buttons: getButtonsOut,
    modeButtons: getModeButtons,
    encoders: getEncoders,
  });

  function getButtonsOut(isOn, coordinates) {
    // console.log("buttons out", coordinates);
    // console.log(`getTriggers`, getTriggers);

    setTriggers((triggers) => {
      // console.log(`triggers`, triggers);
      const isTriggerInList = () => {
        const repeatTrigger = triggers.filter(
          (trigger) => JSON.stringify(trigger) === JSON.stringify(coordinates)
        );
        if (repeatTrigger.length > 0) {
          return true;
        } else {
          return false;
        }
      };

      const deleteTrigger = () => {
        return triggers.filter(
          (trigger) => JSON.stringify(trigger) !== JSON.stringify(coordinates)
        );
      };

      if (isOn && triggers && isTriggerInList()) {
        // console.log(`delete trigger`);
        return deleteTrigger();
      } else if (isOn && triggers) {
        // console.log("add new trigger");

        return [...triggers, { ...coordinates }];
      } else if (isOn && !triggers) {
        // console.log("init triggers");
        return [{ ...coordinates }];
      }
      // console.log("keep triggers the same");
      return [...triggers];
    });
  }

  function sendButtonColor(buttonSignal) {
    sendLightCoordinates(buttonSignal);
    // setButtonColor(buttonSignal);
  }

  useEffect(() => {
    applyPadModel();
  }, [getSequence, getTriggers]);

  function applyPadModel() {
    function applyTriggers() {
      // console.log(`getTriggers`, getTriggers);
      if (getTriggers) {
        getTriggers.forEach((coordinates) => {
          // console.log(`{...coordinates}`, { ...coordinates });
          sendButtonColor(["on", { ...coordinates }, "white"]);
        });
      }
    }
    applyTriggers();
    function applySequence() {
      sendButtonColor(["on", { padX: getSequence, padY: 1 }, "blue"]);
      sendButtonColor(["on", { padX: getSequence, padY: 2 }, "blue"]);
      sendButtonColor(["on", { padX: getSequence, padY: 3 }, "blue"]);
      sendButtonColor(["on", { padX: getSequence, padY: 4 }, "blue"]);
      sendButtonColor(["on", { padX: getSequence, padY: 5 }, "blue"]);
      sendButtonColor(["on", { padX: getSequence, padY: 6 }, "blue"]);
      sendButtonColor(["on", { padX: getSequence, padY: 7 }, "blue"]);
      sendButtonColor(["on", { padX: getSequence, padY: 8 }, "blue"]);
    }
    applySequence();

    let cleanupSequence = getSequence - 1;

    if (getSequence === 1) {
      cleanupSequence = 8;
    }

    function removePastSequence() {
      sendButtonColor(["off", { padX: cleanupSequence, padY: 1 }, "blue"]);
      sendButtonColor(["off", { padX: cleanupSequence, padY: 2 }, "blue"]);
      sendButtonColor(["off", { padX: cleanupSequence, padY: 3 }, "blue"]);
      sendButtonColor(["off", { padX: cleanupSequence, padY: 4 }, "blue"]);
      sendButtonColor(["off", { padX: cleanupSequence, padY: 5 }, "blue"]);
      sendButtonColor(["off", { padX: cleanupSequence, padY: 6 }, "blue"]);
      sendButtonColor(["off", { padX: cleanupSequence, padY: 7 }, "blue"]);
      sendButtonColor(["off", { padX: cleanupSequence, padY: 8 }, "blue"]);
    }
    removePastSequence();
  }

  function getModeButtons() {
    console.log("mode buttons out");
  }

  function getEncoders() {
    console.log("get encoders out");
  }

  return (
    <div>
      <SmartPadModel sendButton={getButtonColor} />
    </div>
  );
};

export default SmartPad;
