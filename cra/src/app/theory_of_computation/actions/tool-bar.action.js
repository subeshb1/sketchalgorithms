export const changeStep = payload => ({
  type: "TOC_TOOL_STEP",
  payload
});

export const changeInterval = payload => ({
  type: "TOC_TOOL_INTERVAL",
  payload
});

export const changeDistance = payload => ({
  type: "TOC_TOOL_DISTANCE",
  payload
});

export const clear = () => ({ type: "TOC_CLEAR" });
