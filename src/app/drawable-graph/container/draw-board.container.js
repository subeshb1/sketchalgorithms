import React from "react";
import { connect } from "react-redux";
import { getDrawBoardState, getDrawableMode, getToolsState } from "../reducers";
import { draw_action } from "../actions";
import { Node, Arc } from "../components";

const DrawBoard = props => {
  const {
    draw: {
      list: { node, arc, start, end },
      loading,
      action: { selected, isDrag, temp },
      searching
    },
    tool: { distance },
    mode,
    onNodePress,
    onArcPress,
    algo
  } = props;
  return (
    <div className="drawboard draw-drawboard">
      <style>
        {`
            .drawboard svg{
              -webkit-user-select: none; /* webkit (safari, chrome) browsers */
              -moz-user-select: none; /* mozilla browsers */
              -khtml-user-select: none; /* webkit (konqueror) browsers */
              -ms-user-select: none; /* IE10+ */
              touch-action: ${selected ? "none" : "auto"};
              cursor: ${mode === 1 ? "crosshair" : ""}
            }
          
            .drawboard circle,line {
            stroke:grey;
            fill:white;
            stroke-width: 2px;
            cursor: ${mode === 0 ? "move" : mode === 2 ? "pointer" : ""}
            }

            .drawboard line.PATH{
              stroke:#00a25d;
              stroke-width:4px;
            }
            .drawboard circle.UNVISITED {
              fill: white;
            }
            .drawboard circle.VISITED {
              fill:  ${loading ? "white" : "#dbefff"};
            }
            .drawboard circle.EXPLORED {
              fill:  ${loading ? "white" : "#00b3ca"};
            }
            .drawboard circle.PATH {
              fill:  ${loading ? "white" : "#50f5ae"};
            }
            .drawboard circle.BLOCK {
              fill:  ${loading ? "white" : "#c1c1c1"};
            }
            .drawboard svg text {
              -webkit-user-select: none;
                 -moz-user-select: none;
                  -ms-user-select: none;
                      user-select: none;
          }
          .drawboard svg text::selection {
              background: none;
          }
          .drawboard text {
            position: relative;
            z-index:1 ;
          }
          .drawboard .selected {
            animation: strokeAnim 0.5s infinite linear;
            stroke-dasharray: 5 4;
          }
          @keyframes strokeAnim {
            to {
              stroke-dashoffset: -9px;
            }
          }
          .drawboard .temp {
            stroke-dasharray: 5;
          }

          `}
      </style>
      {loading && (
        <div className="logo">
          <img src="/logo.svg" alt="" />
        </div>
      )}
      <svg
        onPointerDown={e => !loading && !searching && props.onSVGDown(e)}
        onPointerUp={e => !loading && !searching && props.onNodeRelease(e)}
        onPointerMove={e =>
          !loading && !searching && isDrag && props.onNodeMove(e)
        }
        onTouchMove={e =>
          !loading && !searching && isDrag && props.onNodeMove(e)
        }
      >
        {Object.values(arc).map(({ from, value, to, key, color }) => (
          <Arc
            x1={node[from].x}
            y1={node[from].y}
            x2={node[to].x}
            y2={node[to].y}
            {...{
              nkey: key,
              onArcPress,
              show: !loading && !searching,
              selected,
              mode,
              value,
              distance,
              algo,
              color
            }}
            key={key}
          />
        ))}
        {Object.values(node).map(({ x, y, value, key, color }, i) => (
          <Node
            {...{
              x,
              y,
              nkey: key,
              selected,
              temp,
              mode,
              color,
              onNodePress,
              value,
              show: !loading && !searching,
              start: start === key,
              end: end === key
            }}
            key={i}
          />
        ))}
      </svg>
    </div>
  );
};
const mapStateToProps = state => ({
  draw: getDrawBoardState(state),
  mode: getDrawableMode(state),
  tool: getToolsState(state)
});

export default connect(
  mapStateToProps,
  draw_action
)(DrawBoard);
