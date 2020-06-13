import React from "react";
const euclideanDistance = (x1, x2, y1, y2) =>
  parseInt(Math.pow(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2), 0.5), 10);
const Arc = ({
  x1,
  x2,
  y1,
  y2,
  mode,
  nkey,
  show,
  distance,
  algo,
  selected,
  onArcPress,
  color,
  value
}) => {
  let dx = (x1 + x2) / 2;
  let dy = (y1 + y2) / 2;
  let angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
  return (
    <g onPointerDown={() => show && mode === 0 && onArcPress(nkey)}>
      <line
        {...{ x1, x2, y1, y2 }}
        stroke="black"
        strokeWidth="2"
        className={
          (selected && selected.type === "ARC" && selected.item === nkey
            ? "selected"
            : "") +
            " " +
            color || ""
        }
      />
      <text
        x={dx}
        y={dy - 15}
        fontSize={20}
        transform={`rotate(${angle},${dx},${dy})`}
      >
        {algo === "bfs" || algo === "dfs"
          ? 1
          : distance
            ? euclideanDistance(x1, x2, y1, y2)
            : value}
      </text>
    </g>
  );
};

export default Arc;
