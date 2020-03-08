export const changeSize = payload => ({
  type: "TOOL_SIZE",
  payload
});
export const changeMode = payload => ({
  type: "TOOL_MODE",
  payload
});
export const changeStep = payload => ({
  type: "TOOL_STEP",
  payload
});
export const changeInterval = payload => ({
  type: "TOOL_INTERVAL",
  payload
});

export const clear = () => ({ type: "DRAW_CLEAR" });
