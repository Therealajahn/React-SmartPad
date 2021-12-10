import React, { useRef, useEffect, useState } from "react";

const usePadStore = () => {
  const [getPadStore, setPadStore] = useState({
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

  function updateButton(col, row, propertyToUpdate, value) {
    // console.log("updateButton", col, row, propertyToUpdate, value);
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

  function updateManyButtons(buttonsToUpdate) {
    setPadStore((prevState) => {
      buttonsToUpdate.forEach((update) => {
        console.log("updateManyButtons", update);
        const [col, row, propertyToUpdate, value] = update;
        if (value === "toggle") {
          // console.log("valuetoggle");
          prevState[row][col - 1][propertyToUpdate] =
            !prevState[row][col - 1][propertyToUpdate];
        } else {
          prevState[row][col - 1][propertyToUpdate] = value;
        }
      });
      return { ...prevState };
    });
  }

  return [getPadStore, setPadStore, updateButton, updateManyButtons];
};

export default usePadStore;
