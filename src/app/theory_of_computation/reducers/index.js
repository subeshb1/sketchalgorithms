import { combineReducers } from "redux";
import tool from "./tool-bar.reducer";
import draw from "./draw-board.reducer";
import icon from "./icon-bar.reducer";

export default combineReducers({ draw, tool, icon });
export * from "./tool-bar.reducer";
export * from "./draw-board.reducer";
export * from "./icon-bar.reducer";
