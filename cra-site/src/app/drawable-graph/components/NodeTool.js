import React from "react";

import { compose, minOf, maxOf, toInt } from "../../lib";
const normalizedInt = compose(
  minOf(1000),
  maxOf(0),
  toInt
);
const Node = ({
  item,
  value,
  x,
  y,
  change,
  nkey,
  start,
  deleteSelected,
  end,
  setStart,
  algo,
  distance,
  setEnd,
  h
}) => {
  return (
    <React.Fragment>
      <div className="logo">
        <svg viewBox="0 0 100 100">
          <circle
            cx={50}
            cy="50"
            r={48}
            stroke="black"
            strokeWidth="2"
            fill="white"
          />
          <text x={42} y={55} fontSize={20}>
            {value}
          </text>
        </svg>
      </div>
      <div className="group">
        <label>
          Name
          <input
            type="text"
            value={value || ""}
            onChange={({ target: { value } }) =>
              change({ value: value.substr(0, 3) })
            }
          />
        </label>
        <label>
          Key
          <input type="text" value={nkey} readOnly />
        </label>
      </div>
      <div className="group">
        <label>
          X
          <input
            type="number"
            value={x}
            onChange={({ target: { value } }) =>
              change({ x: normalizedInt(value) })
            }
          />
        </label>
        <label>
          Y
          <input
            type="number"
            value={y}
            onChange={({ target: { value } }) =>
              change({ y: normalizedInt(value) })
            }
          />
        </label>
      </div>
      {algo === "a-star" &&
        !distance && (
          <label>
            Heuristic Value
            <input
              type="number"
              value={h || 0}
              onChange={({ target: { value } }) =>
                change({ h: normalizedInt(value) })
              }
            />
          </label>
        )}
      <div className="group">
        <label className="checkbox">
          <input
            type="checkbox"
            checked={Boolean(start === nkey)}
            onChange={() => setStart(nkey)}
            // disabled={loading || searching}
          />
          Start
        </label>
        <label className="checkbox">
          <input
            type="checkbox"
            checked={Boolean(end === nkey)}
            onChange={() => setEnd(nkey)}
            // disabled={loading || searching}
          />
          Goal
        </label>
      </div>
      <button
        onClick={() => deleteSelected(nkey, "NODE")}
        style={{ "--btn-color": 360 }}
      >
        Delete
      </button>
    </React.Fragment>
  );
};
export default Node;
