import React from "react";

import "./ColorPallette.scss";

const colorData = [
  {
    id: 1,
    background: "F65261",
  },
  {
    id: 2,
    background: "424242",
  },
  {
    id: 1,
    background: "232323",
  },
  {
    id: 1,
    background: "555555",
  },
  {
    id: 1,
    background: "FFFFFF",
  },
];

const ColorPallette = () => {
  const border = (color) => (color === "555555" ? "1px solid white" : "");

  return (
    <div className="color-container">
      <h1>Color Pallette</h1>
      {colorData.map((color) => {
        return (
          <div key={color.id} className="color-item">
            <div
              style={{
                background: `#${color.background}`,
                border: border(color.background),
              }}
              className="color-sample"
            />
            <span className="color-code">{color.background}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ColorPallette;
