import React, { useRef, useEffect, useState } from "react";
import useStoreOnButtons from "./Hooks/useStoreOnButtons";

function SmartPadModel(props) {
  const { getPadStore, updateButton } = props;

  const bezelWidth = 2;
  const centerWidth = 17;

  const baseStyle = {
    display: "grid",
    width: `${centerWidth}em`,
    height: `${centerWidth}em`,
    backgroundColor: "#878787",
    borderTop: `${bezelWidth}em solid #cccccc`,
    borderLeft: `${bezelWidth}em solid #999999`,
    borderBottom: `${bezelWidth}em solid #4f4f4f`,
    borderRight: `${bezelWidth}em solid #757575`,
    placeItems: "center",
  };

  //////////BED

  const bedWidth = 14;
  const bedRadius = 0.2;

  const bedStyle = {
    position: "absolute",
    width: `${bedWidth}em`,
    height: `${bedWidth}em`,
    borderRadius: `${bedRadius}em`,
    backgroundColor: "#d1d1d1",
    display: "grid",
    gridTemplateRows: "repeat(8, 1fr)",
    gridTemplateColumns: "repeat(8, 1fr)",
  };

  //////////KNOB GRID

  const knobGridWidth = bedWidth;
  //find the space in between the bezel and the button bed
  const knobGridHeight = (centerWidth - bedWidth) / 2;

  const knobGridStyle = {
    position: "absolute",
    width: `${knobGridWidth}em`,
    height: `${knobGridHeight}em`,
    alignSelf: "start",
    display: "grid",
    gridTemplateColumns: "repeat(8, 1fr)",
  };

  //////////KNOB

  const knobDiameter = knobGridHeight - 0.2;

  const knobStyle = {
    width: `${knobDiameter}em`,
    height: `${knobDiameter}em`,
    borderRadius: "50%",
    backgroundColor: "#545454",
    placeSelf: "center",
  };

  //////////MODE GRID
  //find the space in between the bezel and the button bed
  const modeGridWidth = (centerWidth - bedWidth) / 2;
  const modeGridHeight = bedWidth;

  const modeGridStyle = {
    position: "absolute",
    width: `${modeGridWidth}em`,
    height: `${modeGridHeight}em`,
    display: "grid",
    justifySelf: "end",
    gridTemplateRows: "repeat(8, 1fr)",
  };

  //////////MODE BUTTON
  const modeDiameter = modeGridWidth - 0.6;

  const modeStyle = {
    width: `${modeDiameter}em`,
    height: `${modeDiameter}em`,
    borderRadius: "50%",
    backgroundColor: "#545454",
    placeSelf: "center",
  };

  //////////BUTTON
  const buttonWidth = bedWidth / 8 - 0.2;
  const buttonRadius = 0.2;

  const [getButtonList, setButtonList] = useState([]);

  useStoreOnButtons(
    getPadStore,
    (trigger, col, row, color) => {
      // console.log(
      //   "useStoreOnButtons in SmartPadModel",
      //   trigger,
      //   col,
      //   row,
      //   color
      // );

      let buttonColor = "#adaaaa";
      if (trigger === "on") {
        buttonColor = color;
      } else if (trigger === "off") {
        buttonColor = "#adaaaa";
      }

      const buttonStyle = {
        width: `${buttonWidth}em`,
        height: `${buttonWidth}em`,
        borderRadius: `${buttonRadius}em`,
        placeSelf: "center",
        backgroundColor: buttonColor,
        gridColumnStart: col,
        gridRowStart: row,
      };
      setButtonList((prevButtonList) => [
        ...prevButtonList,
        <div
          class="button"
          style={buttonStyle}
          onClick={() => {
            buttonClicked(col, row);
          }}
        ></div>,
      ]);
    },
    () => {
      getButtonList.current = [];
    }
  );

  function buttonClicked(col, row) {
    // console.log("buttonClicked", col, row);
    updateButton(col, row, "trigger", "toggle");
  }

  return (
    <div class="base" style={baseStyle}>
      <div class="button-bed" style={bedStyle}>
        {getButtonList.map((button) => button)}
      </div>
      <div class="knob-grid" style={knobGridStyle}>
        <div class="knob" style={knobStyle}></div>
        <div class="knob" style={knobStyle}></div>
        <div class="knob" style={knobStyle}></div>
        <div class="knob" style={knobStyle}></div>
        <div class="knob" style={knobStyle}></div>
        <div class="knob" style={knobStyle}></div>
        <div class="knob" style={knobStyle}></div>
        <div class="knob" style={knobStyle}></div>
      </div>
      <div class="mode-grid" style={modeGridStyle}>
        <div class="mode-button" style={modeStyle}></div>
        <div class="mode-button" style={modeStyle}></div>
        <div class="mode-button" style={modeStyle}></div>
        <div class="mode-button" style={modeStyle}></div>
        <div class="mode-button" style={modeStyle}></div>
        <div class="mode-button" style={modeStyle}></div>
        <div class="mode-button" style={modeStyle}></div>
        <div class="mode-button" style={modeStyle}></div>
      </div>
    </div>
  );
}

export default SmartPadModel;
