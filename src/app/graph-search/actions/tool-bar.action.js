export const changeStep = payload => ({
  type: "GRAPH_TOOL_STEP",
  payload
});
export const changeRow = payload => ({
  type: "GRAPH_TOOL_ROW",
  payload
});
export const changeColumn = payload => ({
  type: "GRAPH_TOOL_COLUMN",
  payload
});
export const changeInterval = payload => ({
  type: "GRAPH_TOOL_INTERVAL",
  payload
});
export const changeStart = payload => ({
  type: "GRAPH_TOOL_START",
  payload
});
export const changeEnd = payload => ({
  type: "GRAPH_TOOL_END",
  payload
});
export const changeDiagonal = payload => ({
  type: "GRAPH_TOOL_DIAGONAL",
  payload
});


export const clear = () => ({ type: "GRAPH_CLEAR" });
