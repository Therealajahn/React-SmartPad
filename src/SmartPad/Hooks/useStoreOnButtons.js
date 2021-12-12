import React, { useRef, useEffect, useState } from "react";

const useStoreOnButtons = (getPadStore, update, cleanup) => {
  useEffect(() => {
    // console.log("return store:", getPadStore);
    function applyStoreToPad() {
      for (let row in getPadStore) {
        getPadStore[row].forEach((button, col) => {
          col += 1;
          // console.log("applyStoreToPad input:", button, col);
          if (button.trigger) {
            row = Number(row);
            // console.log(`button on at ${col},${row}`);
            update("on", col, row, "white");
          }
          if (!button.trigger && !button.playhead) {
            update("off", col, row, "white");
          }
          if (button.playhead) {
            row = Number(row);
            // console.log(`playhead on at ${col},${row}`);
            update("on", col, row, "red");
          }
        });
      }
    }
    applyStoreToPad();
    return () => {
      if (cleanup) {
        cleanup();
      }
    };
  }, [getPadStore]);
};

export default useStoreOnButtons;
