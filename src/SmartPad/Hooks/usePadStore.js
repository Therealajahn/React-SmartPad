import React, { useRef, useEffect, useState } from "react";

const usePadStore = (send) => {
  const { setPadStore } = send;

  useEffect(() => {
    storeDefault();
  }, []);

  function storeDefault() {
    setPadStore({
      1: [
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
      ],
      2: [
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
      ],
      3: [
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
      ],
      4: [
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
      ],
      5: [
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
      ],
      6: [
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
      ],
      7: [
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
      ],
      8: [
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
      ],
    });
  }

  //action: row col propertyToUpdate

  function updateButton(col, row, propertyToUpdate, value) {
    setPadStore((prevState) => {
      if (value === "toggle") {
        // console.log("valuetoggle");
        prevState[row][col - 1][propertyToUpdate] =
          !prevState[row][col - 1][propertyToUpdate];
      } else {
        prevState[row][col - 1][propertyToUpdate] = value;
      }
      return { ...prevState };
    });
  }

  return [updateButton];
};

export default usePadStore;
