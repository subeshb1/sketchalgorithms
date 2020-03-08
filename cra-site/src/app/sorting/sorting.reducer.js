import { combineReducers } from "redux";

const extractData = e => e.target.value;

const toolBarReducer = (
  state = {
    size: 100,
    mode: 3,
    step: 1,
    interval: 10
  },
  action
) => {
  switch (action.type) {
    case "TOOL_SIZE":
      return { ...state, size: extractData(action.payload) };
    case "TOOL_MODE":
      return { ...state, mode: extractData(action.payload) };
    case "TOOL_STEP":
      return { ...state, step: extractData(action.payload) };
    case "TOOL_INTERVAL":
      return { ...state, interval: extractData(action.payload) };
    default:
      return state;
  }
};

export default combineReducers({ tool: toolBarReducer });

export const getToolsState = state => {
  return state.tool;
};
