import { combineReducers } from "redux";
import WebWorker from "../../web-worker";
const drawReducer = (
  state = {
    finished: false,
    swap: [],
    pivot: -1,
    boundary: []
  },
  action
) => {
  switch (action.type) {
    case "LIST_ACTION":
      const { pivot, boundary, swap, finished } = action;
      return { ...state, pivot, boundary, swap, finished };
    case "FINISHED":
      return {
        ...state,
        finished: true,
        swap: [],
        pivot: -1,
        boundary: []
      };
    case "CANCELLED":
    case "LIST_GENERATE":
      return {
        ...state,
        finished: false,
        swap: [],
        pivot: -1,
        boundary: []
      };
    default:
      return state;
  }
};
const isLoading = (state = false, action) => {
  switch (action.type) {
    case "LIST_GENERATE":
    case "LIST_PROCESS":
      return true;
    case "LIST_GENERATED":
    case "LIST_PROCESSED":
      return false;
    case "CANCELLED":
      return false;
    default:
      return state;
  }
};
const isSorting = (state = false, action) => {
  switch (action.type) {
    case "LIST_PROCESSED":
      return true;
    case "CANCELLED":
    case "FINISHED":
      return false;
    default:
      return state;
  }
};
const listReducer = (state = [], action) => {
  switch (action.type) {
    case "LIST_GENERATED":
      // case "LIST_ACTION":
      return action.payload;
    case "DRAW_CLEAR":
      return [];
    default:
      return state;
  }
};

export const workerReducer = (state = null, action) => {
  switch (action.type) {
    case "LIST_GENERATE":
    case "LIST_PROCESS":
      return new WebWorker(action.payload);
    case "LIST_GENERATED":
    case "LIST_PROCESSED":
    case "CANCELLED":
      if (state) state.terminate();
      return null;
    default:
      return state;
  }
};
export default combineReducers({
  loading: isLoading,
  sorting: isSorting,
  state: drawReducer,
  worker: workerReducer,
  list: listReducer
});

export const getSorting = state => state.sorting;
export const getDrawBoardState = state => {
  return state.sorting.draw;
};
