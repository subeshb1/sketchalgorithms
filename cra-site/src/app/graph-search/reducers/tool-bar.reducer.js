const normalize = x => Math.abs(parseInt(x, 10));
const extractData = (e, m = 1000) =>
  Math.min(normalize(e.target.value, 10), m) || "";

const range = (e, m, n, mode = 0) => {
  const arr = e.target.value.split(/\s+|,/g);
  const i = normalize(arr[0]);
  const j = normalize(arr[1]);
  const s = [i < m ? i : !mode ? 0 : m - 1, j < n ? j : !mode ? 0 : n - 1];
  e.target.value = s;
  console.log(s);
  return s;
};
const toolBarReducer = (
  state = {
    row: 15,
    col: 15,
    step: 1,
    interval: 10,
    start: [7, 7],
    end: [14, 14],
    diagonal: true,
    displayText: false
  },
  action
) => {
  switch (action.type) {
    case "GRAPH_TOOL_ROW":
      return { ...state, row: extractData(action.payload, 50) };
    case "GRAPH_TOOL_COLUMN":
      return { ...state, col: extractData(action.payload, 50) };
    case "GRAPH_TOOL_STEP":
      return { ...state, step: extractData(action.payload) };
    case "GRAPH_TOOL_INTERVAL":
      return { ...state, interval: extractData(action.payload, 10000) };
    case "GRAPH_TOOL_START":
      return { ...state, start: range(action.payload, state.row, state.col) };
    case "GRAPH_TOOL_END":
      return { ...state, end: range(action.payload, state.row, state.col, 1) };
    case "GRAPH_TOOL_DIAGONAL":
      return { ...state, diagonal: action.payload.target.checked };
    case "GRAPH_TOOL_TEXT":
      return { ...state, displayText: action.payload.target.checked };
    default:
      return state;
  }
};

export default toolBarReducer;

// export const getGraph = s => s.graph;
export const getToolsState = state => {
  return state.graph.tool;
};
