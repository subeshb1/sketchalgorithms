const extractData = (e,m) => Math.min(parseInt(e.target.value,10), m?10000:1000) || "";

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
      return { ...state, interval: extractData(action.payload,1) };
    default:
      return state;
  }
};

export default toolBarReducer;

export const getToolsState = state => {
  return state.sorting.tool;
};
