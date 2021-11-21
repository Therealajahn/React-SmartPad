import React, { useRef, useEffect, useState } from "react";

const usePuredata = (send) => {
  const getMIDIMessage = send.getMIDIMessage;
  const advanceSequence = send.advanceSequence;
  useEffect(() => {
    // console.log(
    //   "from Puredata",
    //   getMIDIMessage.device.name,
    //   getMIDIMessage.message
    // );
    if (getMIDIMessage.device.name === "Midi Through Port-0") {
      advanceSequence();
    }
  }, [getMIDIMessage]);
  //'Midi Through Port-0'
};

export default usePuredata;
