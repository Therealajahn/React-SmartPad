import React, { useRef, useEffect } from "react";

function SmartPadModel(props) {
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
    backgroundColor: "#fff",
    display: "grid",
    gridTemplateRows: "repeat(8, 1fr)",
    gridTemplateColumns: "repeat(8, 1fr)",
  };

  //////////BUTTON
  const buttonWidth = bedWidth / 8 - 0.2;
  const buttonRadius = 0.2;

  //JSX version of button:
  // const buttonStyle = {
  //   width: `${buttonWidth}em`,
  //   height: `${buttonWidth}em`,
  //   backgroundColor: "#adaaaa",
  //   borderRadius: `${buttonRadius}em`,
  //   placeSelf: "center",
  // };
  {
    /* <div class="button" style={buttonStyle} ref={button}></div> */
  }

  //////////BUTTON MULTIPLIER
  const buttonBed = useRef();

  ///DECLARATIVE BAD!!!!!!
  useEffect(() => {
    for (let y = 1; y <= 8; y++) {
      for (let x = 1; x <= 8; x++) {
        const button = document.createElement("div");
        button.classList.add(`button`);
        //added the 'x' and 'y' because classes that are the same will not be added, making 1 1 => 1 and 8 8 => 8
        button.classList.add(`x${x}`);
        button.classList.add(`y${y}`);
        button.style.width = `${buttonWidth}em`;
        button.style.height = `${buttonWidth}em`;
        button.style.backgroundColor = "#adaaaa";
        button.style.borderRadius = `${buttonRadius}em`;
        button.style.placeSelf = "center";
        buttonBed.current.appendChild(button);
      }
    }
  }, []);

  const firstRun = useRef(true);

  useEffect(() => {
    let buttonColor;

    if (props.sendButton[0] === "off") {
      buttonColor = "#adaaaa";
    } else {
      buttonColor = `${props.sendButton[2]}`;
    }

    if (!firstRun.current) {
      const x = `x${props.sendButton[1].padX}`;
      const y = `y${props.sendButton[1].padY}`;
      //TODO: make this iterate over a list of lights turned on in state
      //find the button with the correct coordinates and change its color
      [...document.getElementsByClassName("button")].find(
        (div) => div.classList[1] === x && div.classList[2] === y
      ).style.backgroundColor = buttonColor;
    } else {
      firstRun.current = false;
    }
  }, [props.sendButton]);
  ///DECLARATIVE BAD!!!!!!

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

  return (
    <div className="SmartPadModel" style={{ placeSelf: "center" }}>
      <div class="base" style={baseStyle}>
        <div class="button-bed" style={bedStyle} ref={buttonBed}></div>
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
    </div>
  );
}

export default SmartPadModel;
