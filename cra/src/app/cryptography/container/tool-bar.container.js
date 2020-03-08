import React, { Component } from "react";
import { connect } from "react-redux";
import { getToolsState, getDrawBoardState } from "../reducers";
import { tools_action, draw_action } from "../actions";
import { withRouter } from "react-router-dom";
class ToolBarC extends Component {
  componentDidMount() {
    this.props.generateList();
  }
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
    const { size, mode, step, interval } = props.tool;
    const { sorting, loading } = props.draw;
    const { algo } = props;
    return (
      <div className="tool-bar">
        <h2>
          {algo
            .split("-")
            .map(x => x.toUpperCase())
            .join(" ")}
        </h2>
        <label>
          No of Items
          <input
            type="number"
            step="1"
            min="0"
            max="10000"
            value={size}
            onChange={props.changeSize}
            disabled={loading || sorting}
          />
        </label>
        <label>
          Items Order
          <select
            value={mode}
            onChange={props.changeMode}
            disabled={loading || sorting}
          >
            <option value="3">Random</option>
            <option value="1">Ascending</option>
            <option value="2">Descending</option>
          </select>
        </label>
        <button onClick={props.generateList} disabled={loading || sorting}>
          {" "}
          Generate
        </button>
        <label>
          Step<input type="number" value={step} onChange={props.changeStep} />
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
        <div className="btn-group">
          <button
            className="green"
            disabled={loading || sorting}
            onClick={() => props.processList(props.algo)}
          >
            Sort
          </button>
          <button
            className="red"
            disabled={!sorting && !loading}
            onClick={props.cancel}
          >
            Stop
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tool: getToolsState(state),
  draw: getDrawBoardState(state)
});

export default withRouter(
  connect(
    mapStateToProps,
    { ...tools_action, ...draw_action }
  )(ToolBarC)
);
