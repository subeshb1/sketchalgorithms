export const changeStep = payload => ({
  type: "DRAWABLE_TOOL_STEP",
  payload
});

export const changeInterval = payload => ({
  type: "DRAWABLE_TOOL_INTERVAL",
  payload
});

export const changeDistance = payload => ({
  type: "DRAWABLE_TOOL_DISTANCE",
  payload
});

export const clear = () => ({ type: "DRAWABLE_CLEAR" });
