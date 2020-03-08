const normalize = x => Math.abs(parseInt(x, 10));
const extractData = (e, m = 1000) =>
  Math.min(normalize(e.target.value), m) || "";

const toolBarReducer = (
  state = {
    step: 1,
    interval: 500,
    distance: true
  },
  action
) => {
  switch (action.type) {
    case "DRAWABLE_TOOL_STEP":
      return { ...state, step: extractData(action.payload, 20) };
    case "DRAWABLE_TOOL_INTERVAL":
      return { ...state, interval: extractData(action.payload, 10000) };
    case "DRAWABLE_TOOL_DISTANCE":
      return { ...state, distance: action.payload.target.checked };
    default:
      return state;
  }
};

export default toolBarReducer;

export const getToolsState = state => {
  return state.drawable.tool;
};
