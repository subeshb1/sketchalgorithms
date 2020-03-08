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
    const {
      algo,
      tool: { row, col, step, interval, start, end, diagonal },
      draw: { loading, searching,displayText }
    } = props;
    return (
      <div className="tool-bar" key={"#2"}>
        <h2>
          {algo
            .split("-")
            .map(x => x.toUpperCase())
            .join(" ")}
        </h2>
        <div className="group">
          <label>
            Rows
            <input
              type="number"
              step="1"
              min="0"
              max="10000"
              value={row}
              onChange={props.changeRow}
              disabled={loading || searching}
            />
          </label>
          <label>
            Columns
            <input
              type="number"
              step="1"
              min="0"
              max="10000"
              value={col}
              onChange={props.changeColumn}
              disabled={loading || searching}
            />
          </label>
        </div>
        <div className="group">
          <label>
            Start
            <input
              type="text"
              defaultValue={start}
              onBlur={props.changeStart}
              disabled={loading || searching}
            />
          </label>
          <label>
            End
            <input
              type="text"
              defaultValue={end}
              onBlur={props.changeEnd}
              disabled={loading || searching}
            />
          </label>
        </div>
        <div className="btn-group" style={{ justifyContent: "space-between" }}>
          <button onClick={props.generateList} disabled={loading || searching}>
            Generate
          </button>
          <button
            style={{ "--btn-color": 300 }}
            onClick={props.clearColor}
            disabled={loading || searching}
          >
            Clear
          </button>
        </div>
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
        <label className="checkbox">
          <input
            type="checkbox"
            checked={diagonal}
            onChange={props.changeDiagonal}
            disabled={loading || searching}
          />
          Allow Diagonal
        </label>
        <label className="checkbox">
          <input
            type="checkbox"
            checked={displayText}
            onChange={props.changeDisplayText}
            disabled={loading || searching}
          />
          Display Calculations
        </label>

        <div className="btn-group">
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
