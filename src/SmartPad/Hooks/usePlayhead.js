import React, { useRef, useEffect, useState } from "react";

const usePlayhead = (updateManyButtons) => {
  function sendPlayheadArray(col, rowStart, rowEnd) {
    // console.log("col", col);
    let playheadArray = [];
    for (let row = rowStart; row <= rowEnd; row++) {
      playheadArray.push([col, row, "playhead", true]);

      let previousCol = col - 1;
      const minCol = 1;
      const maxCol = 8;
      if (col === minCol) {
        previousCol = maxCol;
      }
      // console.log(`previousCol`, previousCol);

      playheadArray.push([previousCol, row, "playhead", false]);
    }
    updateManyButtons(playheadArray);
  }
  return [sendPlayheadArray];
};
export default usePlayhead;
