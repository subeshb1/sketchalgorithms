import { combineReducers } from "redux";
import WebWorker from "../../web-worker";

let nodeKey = 0;
let arcKey = 0;

const isLoading = (state = false, action) => {
  switch (action.type) {
    case "TOC_LIST_PROCESS":
      return true;
    case "TOC_LIST_PROCESSED":
      return false;
    case "TOC_CANCELLED":
      return false;
    default:
      return state;
  }
};

const isSearching = (state = false, action) => {
  switch (action.type) {
    case "TOC_LIST_PROCESSED":
      return true;
    case "TOC_CANCELLED":
    case "TOC_FINISHED":
      return false;
    default:
      return state;
  }
};

const listReducer = (
  state = {
    node: {},
    arc: {},
    start: undefined,
    end: []
  },
  action
) => {
  switch (action.type) {
    case "TOC_LIST_ACTION":
      return action.payload;
    case "TOC_LIST_ADD_ARC":
      let akey = action.key !== undefined ? action.key : arcKey++;
      return {
        ...state,
        arc: {
          ...state.arc,
          [akey]: { value: 1, ...action.payload, key: akey }
        }
      };
    case "TOC_LIST_ADD_NODE":
      let nkey = action.key !== undefined ? action.key : nodeKey++;
      return {
        ...state,
        node: {
          ...state.node,
          [nkey]: { color: "UNVISITED", ...action.payload, key: nkey }
        }
      };
    case "TOC_LIST_START":
      return {
        ...state,
        start: action.payload
      };
    case "TOC_LIST_END":
      return {
        ...state,
        end: [...action.payload]
      };
    case "TOC_CLEAR":
    case "TOC_LIST_DELETE_ALL":
      return {
        node: {},
        arc: {},
        start: undefined,
        end: []
      };
    case "TOC_LIST_WHITE":
      let node = { ...state.node };
      Object.keys(node).map(x => (node[x].color = "UNVISITED"));
      Object.keys(state.arc).map(x => (state.arc[x].color = "UNVISITED"));
      return {
        ...state,
        node
      };
    case "TOC_LIST_DELETE_NODE":
      node = { ...state.node };
      let arc = { ...state.arc };
      Object.keys(arc).map(x => {
        if (arc[x].from === action.payload || arc[x].to === action.payload) {
          delete arc[x];
        }
        return x;
      });
      delete node[action.payload];

      return { ...state, arc, node };
    case "TOC_LIST_DELETE_ARC":
      delete state.arc[action.payload];
      return { ...state };

    default:
      return state;
  }
};

export const workerReducer = (state = null, action) => {
  switch (action.type) {
    case "TOC_LIST_PROCESS":
      return new WebWorker(action.payload);
    case "TOC_LIST_GENERATED":
    case "TOC_LIST_PROCESSED":
    case "TOC_CANCELLED":
      if (state) state.terminate();
      return null;
    default:
      return state;
  }
};

const actionReducer = (
  state = { selected: undefined, temp: undefined, isDrag: false },
  action
) => {
  switch (action.type) {
    case "TOC_SELECT_ITEM":
      return { ...state, selected: { item: action.item, type: action.name } };
    case "TOC_DRAG_ITEM":
      return { ...state, isDrag: action.payload };
    case "TOC_ARC_ITEM":
      return { ...state, temp: action.payload };

    case "TOC_CHANGE_MODE":
    case "TOC_ACTION_RESET":
    case "TOC_CLEAR":
      return { selected: undefined, temp: undefined, isDrag: false };
    default:
      return state;
  }
};

export default combineReducers({
  loading: isLoading,
  searching: isSearching,
  worker: workerReducer,
  list: listReducer,
  action: actionReducer
});

export const getToc = s => s.toc;
export const getDrawBoardState = state => {
  return state.toc.draw;
};
export const getDrawBoardList = s => getDrawBoardState(s).list;
export const getTocAction = s => s.toc.draw.action;
