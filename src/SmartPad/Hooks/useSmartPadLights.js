import React, { useRef, useEffect, useState } from "react";

const useSmartPadLights = (send) => {
  const { sendMIDIMessage, sendLightCoordinates } = send;
  useEffect(() => {
    sendMIDIMessage(1, [144, 1, 15]);
  }, []);
};

export default useSmartPadLights;
