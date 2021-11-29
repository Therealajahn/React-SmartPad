import React, { useRef, useEffect, useState } from "react";

const useOutputFilter = (send) => {
  const { getPadStore, sendLightCoordinates } = send;
  let { setButtonColor } = send;
  useEffect(() => {
    // console.log("return store:", getPadStore);
    function applyStoreToPad() {
      for (let row in getPadStore) {
        getPadStore[row].forEach((button, col) => {
          col += 1;
          if (button.trigger) {
            row = Number(row);
            console.log(`button on at ${col},${row}`);
            sendLightCoordinates("on", col, row, "white");
            setButtonColor((prevState) => {
              console.log(`prevState`, prevState);

              let newButton = [];
              for (button of prevState) {
                if (button.col !== col && button.row !== row) {
                  console.log("outputFilterButton", button);
                  newButton = ["on", col, row, "white"];
                }
              }

              return [...prevState, newButton];
            });
          } else if (!button.trigger) {
            sendLightCoordinates("off", col, row, "white");
            // setButtonColor(["off", col, row, "white"]);
          }
        });
      }
    }
    applyStoreToPad();
  }, [getPadStore]);
};

export default useOutputFilter;
