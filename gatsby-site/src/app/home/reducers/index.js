import { combineReducers } from "redux";
import tool from "./tool-bar.reducer";
import draw from "./draw-board.reducer";

export default combineReducers({ draw,tool });
export * from "./tool-bar.reducer";
export * from "./draw-board.reducer";
