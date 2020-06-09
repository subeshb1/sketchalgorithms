import { combineReducers } from "redux";

const modeReducer = (state = 0, action) => {
  switch (action.type) {
    case "TOC_CHANGE_MODE":
      return action.payload;
    default:
      return state;
  }
};

export const getTocMode = state => state.toc.icon.mode;
export default combineReducers({ mode: modeReducer });
