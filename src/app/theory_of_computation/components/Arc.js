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
  algo,
  selected,
  onArcPress,
  color,
  value
}) => {
  const angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
  const distance = euclideanDistance(x1, x2, y1, y2);

  const p0 = {
    x: x1,
    y: y1
  };
  const p1 = {
    x: x1 + distance / 2,
    y: y1 - distance / 3
  };
  const p2 = {
    x: x1 + distance,
    y: y1
  };

  let t = 0.5;
  let x = (1 - t) * (1 - t) * p0.x + 2 * (1 - t) * t * p1.x + t * t * p2.x;
  let y = (1 - t) * (1 - t) * p0.y + 2 * (1 - t) * t * p1.y + t * t * p2.y;

  return (
    <g onPointerDown={() => show && mode === 0 && onArcPress(nkey)}>
      <path
        d={`M${x1} ${y1} Q ${p1.x} ${p1.y},  ${x1 + distance} ${y1}`}
        stroke="grey"
        fill="transparent"
        transform={`rotate(${angle},${x1},${y1})`}
        strokeWidth={2}
        style={{ pointerEvents: "stroke " }}
        className={
          (selected && selected.type === "ARC" && selected.item === nkey
            ? "selected"
            : "") +
            " " +
            color || ""
        }
      />

      <g transform={`rotate(${angle},${x1},${y1})`}>
        <svg x={x} y={y - 12}>
          <polygon
            style={{ cursor: "move" }}
            onMouseDown={this.enableSelect}
            points={` ${2},${2},${12},${12},${2},${22} `}
            stroke="black"
            fill="grey"
            strokeWidth="2px"
          />
        </svg>
        <text x={x} y={y - 20} fontSize={20}>
          {algo === "bfs" || algo === "dfs" ? 1 : distance ? distance : value}
        </text>
      </g>
    </g>
  );
};

export default Arc;
