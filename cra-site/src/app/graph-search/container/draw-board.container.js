import React from "react";
import { connect } from "react-redux";
import { getDrawBoardState } from "../reducers";
import { draw_action } from "../actions";

const DrawBoard = props => {
  const {
    draw: {
      list: { graph, row, col, path, displayText },
      loading,
      pressed
    },
    onPress,
    onRelease,
    makeBlock
  } = props;
  return (
    <div className="drawboard">
      {loading && (
        <div className="logo">
          <img src="/logo.svg" alt="" />
        </div>
      )}
      <svg
        preserveAspectRatio="none"
        viewBox={`0 0 ${col}0 ${row}0`}
        vectorEffect="none"
        onMouseDown={() => onPress()}
        onMouseUp={() => onRelease()}
      >
        <style>
          {`
            rect {
            stroke: ${loading ? "white" : "grey"}; 
            vector-effect:${loading ? "" : "non-scaling-stroke"};
            }
            rect.start {
              fill: ${loading ? "white" : "#ff9696"};
            }
            rect.end {
              fill: ${loading ? "white" : "#39e6ab"};
            }
            rect.UNVISITED {
              fill: white;
            }
            rect.VISITED {
              fill:  ${loading ? "white" : "#9effac"};
            }
            rect.EXPLORED {
              fill:  ${loading ? "white" : "#aff6ff"};
            }
            rect.PATH {
              fill:  ${loading ? "white" : "#94e3ff"};
            }
            rect.BLOCK {
              fill:  ${loading ? "white" : "#c1c1c1"};
            }
            svg text {
              -webkit-user-select: none;
                 -moz-user-select: none;
                  -ms-user-select: none;
                      user-select: none;
          }
          svg text::selection {
              background: none;
          }
          text {
            position: relative;
            z-index:1 ;
          }
          `}
        </style>
        {graph.map(({ color, className, text = [], ...x }, i) => (
          <g key={i}>
            <rect
              className={className || color}
              {...x}
              width="10"
              height="10"
              stroke="grey"
              strokeWidth="0.5"
              onMouseDown={() => makeBlock(i)}
              onMouseOver={() => pressed && makeBlock(i, 1)}
            />

            {displayText && (
              <text x={x.x + 4} y={x.y + 6} fontSize="2px">
                {i}
              </text>
            )}
            {displayText &&
              text.map(({ text, offsetX, offsetY }, i) => (
                <text
                  x={x.x + offsetX}
                  y={x.y + offsetY}
                  fontSize="2px"
                  key={i}
                >
                  {text}
                </text>
              ))}
          </g>
        ))}
        {path && (
          <path
            d={path}
            stroke="#f3fd24"
            strokeWidth="2"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
        )}
      </svg>
    </div>
  );
};
const mapStateToProps = (state, ownProps) => ({
  draw: getDrawBoardState(state)
});

export default connect(
  mapStateToProps,
  draw_action
)(DrawBoard);
