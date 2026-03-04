import React from "react";
import "./Grid.css";

function Grid({ grid, toggleCell, color }) {
  return (
    <div className="grid">
      {grid.map((cell, index) => (
        <div
          key={index}
          className="cell"
          style={{
            backgroundColor: cell ? color : "white"
          }}
          onClick={() => toggleCell(index)}
        />
      ))}
    </div>
  );
}

export default Grid;