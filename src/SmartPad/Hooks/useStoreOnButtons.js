import React, { useRef, useEffect, useState } from "react";

const useStoreOnButtons = (getPadStore, callback) => {
  useEffect(() => {
    // console.log("return store:", getPadStore);
    function applyStoreToPad() {
      for (let row in getPadStore) {
        getPadStore[row].forEach((button, col) => {
          col += 1;
          if (button.trigger) {
            row = Number(row);
            console.log(`button on at ${col},${row}`);
            callback("on", col, row, "white");
          } else if (!button.trigger) {
            callback("off", col, row, "white");
          }
        });
      }
    }
    applyStoreToPad();
  }, [getPadStore]);
};

export default useStoreOnButtons;
