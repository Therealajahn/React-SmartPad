import React, { useRef, useEffect, useState } from "react";

const usePadStore = (send) => {
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

  //action: row col propertyToUpdate

  function updateStore(col, row, propertyToUpdate, value) {
    console.log("update store");
    setPadStore((prevState) => {
      prevState[row][col - 1][propertyToUpdate] = value;
      return { ...prevState };
    });
  }

  useEffect(() => {
    send.returnStore(getPadStore);
  }, [getPadStore]);

  return [updateStore];
};

export default usePadStore;
