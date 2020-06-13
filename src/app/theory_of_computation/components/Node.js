import React from "react";
const Node = ({
  x,
  y,
  value,
  mode,
  nkey,
  selected,
  temp,
  show,
  onNodePress,
  start,
  end,
  color
}) => {
  return (
    <g
      onPointerDown={() =>
        (mode === 0 || mode === 2) && show && onNodePress(nkey)
      }
    >
      {end && (
        <circle
          cx={x}
          cy={y}
          r="35"
          className={
            (selected && selected.type === "NODE" && selected.item === nkey) ||
            temp === nkey
              ? "selected"
              : ""
          }
        />
      )}
      <circle
        cx={x}
        cy={y}
        r="30"
        className={
          (selected && selected.type === "NODE" && selected.item === nkey
            ? "selected"
            : temp === nkey
              ? "temp"
              : "") +
          " " +
          color
        }
      />
      {start && (
        <path
          d={`M ${x - 70} ${y - 3} ${x - 50} ${y - 3} ${x - 50} ${y - 10}  ${x -
            40} ${y}  ${x - 50} ${y + 10}  ${x - 50} ${y + 3} ${x - 70} ${y +
            3} Z`}
          stroke="black"
          strokeWidth="2"
          fill="grey"
        />
      )}
      {value && (
        <text x={x - 6} y={y + 5}>
          {value}
        </text>
      )}
    </g>
  );
};

export default Node;
