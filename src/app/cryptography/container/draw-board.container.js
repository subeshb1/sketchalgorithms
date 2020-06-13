import React from "react";
import { connect } from "react-redux";
import { getDrawBoardState } from "../reducers";

const DrawBoard = props => {
  const {
    state: { swap, boundary, pivot, finished },
    list,
    loading
  } = props.draw;
  return (
    <div className="drawboard">
      {loading && (
        <div className="logo">
          <img src="/logo.svg" alt="" />
        </div>
      )}
      <svg
        preserveAspectRatio="none"
        viewBox={`0 0 ${list.length}0 ${list.length}0`}
      >
        {list.map((x, i) => (
          <rect
            {...x}
            x={i * 10}
            width="10"
            key={i}
            fill={
              finished
                ? "green"
                : swap.includes(i)
                  ? "green"
                  : pivot === i
                    ? "blue"
                    : boundary.includes(i)
                      ? "red"
                      : "black"
            }
          />
        ))}
      </svg>
    </div>
  );
};

const mapStateToProps = state => ({
  draw: getDrawBoardState(state)
});

export default connect(mapStateToProps)(DrawBoard);
