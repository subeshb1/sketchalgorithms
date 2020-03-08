import React, { Component } from "react";
import { connect } from "react-redux";
import { getToolsState, getDrawBoardState } from "../reducers";
import { tools_action, draw_action } from "../actions";
import { NodeTool, ArcTool } from "../components";
class ToolBarC extends Component {
  componentDidUpdate({ algo }) {
    if (algo !== this.props.algo) {
      this.props.cancel();
    }
  }
  componentWillUnmount() {
    this.props.cancel();
    this.props.clear();
  }
  render() {
    const { props } = this;
    const {
      algo,
      draw: {
        action: { selected },
        list: { node, arc, start, end },
        loading,
        searching
      },
      tool: { step, interval, distance },
      setStart,
      setEnd,
      deleteSelected,
      deleteAll,
      onSelectedPropChange
    } = props;
    return (
      <div className="tool-bar draw-tool-bar" key={"#2"}>
        <h2>
          {algo
            .split("-")
            .map(x => x.toUpperCase())
            .join(" ")}
        </h2>

        {!loading && !searching && selected ? (
          selected.type === "NODE" ? (
            <NodeTool
              {...node[selected.item]}
              nkey={node[selected.item].key}
              change={onSelectedPropChange}
              {...{ start, end, setStart, setEnd, deleteSelected,algo,distance }}
            />
          ) : (
            <ArcTool
              from={{ ...node[arc[selected.item].from] }}
              to={{ ...node[arc[selected.item].to] }}
              id={selected.item}
              {...{
                onSelectedPropChange,
                deleteSelected,
                distance,
                value: arc[selected.item].value,
                algo
              }}
            />
          )
        ) : (
          <React.Fragment>
            <label>
              Step<input
                type="number"
                value={step}
                onChange={props.changeStep}
              />
            </label>
            <label>
              Interval<input
                type="number"
                step="1"
                min="1"
                max="10000"
                value={interval}
                onChange={props.changeInterval}
              />
            </label>
            <label className="checkbox">
              <input
                type="checkbox"
                checked={distance}
                onChange={props.changeDistance}
                disabled={loading || searching || algo==="bfs" || algo==="dfs"}
              />
              Use calculated Distance
            </label>
            <div
              className="btn-group"
              style={{ justifyContent: "space-between" }}
            >
              <button
                className="green"
                disabled={loading || searching}
                onClick={() => props.processList(props.algo)}
              >
                Search
              </button>
              <button
                className="red"
                disabled={!searching && !loading}
                onClick={props.cancel}
              >
                Stop
              </button>
            </div>

            <div
              className="btn-group"
              style={{ justifyContent: "space-between" }}
            >
              <button
                style={{ "--btn-color": 300 }}
                onClick={props.clearColor}
                disabled={loading || searching}
              >
                Clear
              </button>
              <button
                style={{ "--btn-color": 360 }}
                onClick={deleteAll}
                disabled={loading || searching}
              >
                Delete All
              </button>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tool: getToolsState(state),
  draw: getDrawBoardState(state)
});

export default connect(
  mapStateToProps,
  { ...tools_action, ...draw_action }
)(ToolBarC);
