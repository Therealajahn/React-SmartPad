import React, { useRef, useEffect, useState } from "react";

const usePlayhead = (updateButton) => {
  const col = useRef(1);
  const rowStart = useRef(1);
  const span = useRef(6);

  function sendPlayheadArray(col) {
    // console.log("col", col);

    updateButton(col, 1, "playhead", true);

    let previousCol = col - 1;
    const minCol = 1;
    const maxCol = 8;
    if (col === minCol) {
      previousCol = maxCol;
    }
    // console.log(`previousCol`, previousCol);

    updateButton(previousCol, 1, "playhead", false);
  }

  function setPlayhead(col, rowStart, span) {
    col.current = col || 1;
    rowStart.current = rowStart || 1;
    span.current = span || 6;
  }

  return [setPlayhead, sendPlayheadArray];
};
export default usePlayhead;
