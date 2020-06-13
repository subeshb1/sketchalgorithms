import {
  getToc,
  getTocMode,
  getTocAction,
  getDrawBoardState,
  getDrawBoardList
} from "../reducers";

import { drawable } from "../../workers";

const run = data => async (dispatch, getState) => {
  let i = 0;

  let action = { type: "NULL" };
  const {
    draw: {
      list: { node, arc, start, end }
    }
  } = getToc(getState());
  for (let item of data) {
    const {
      tool: { step, interval },
      draw: { searching }
    } = getToc(getState());
    if (!searching) return;
    if (!item.type) {
      node[item.key].color = item.color;
    } else {
      arc[item.key].color = item.color;
    }
    action = {
      type: "TOC_LIST_ACTION",
      payload: { arc, node, start, end }
    };
    if (i % step === 0 || !step) {
      // eslint-disable-next-line
      await new Promise(resolve =>
        setTimeout(() => {
          const {
            draw: { searching }
          } = getToc(getState());
          if (!searching) return;
          dispatch(action);
          resolve();
        }, interval)
      );
      i = 0;
    }

    i++;
  }
  dispatch(action);
  dispatch({ type: "TOC_FINISHED" });
};

export const processList = algo => (dispatch, getState) => {
  dispatch({
    type: "TOC_LIST_WHITE"
  });
  dispatch({
    type: "TOC_LIST_PROCESS",
    payload: drawable
  });
  const {
    draw: { worker, list },
    tool: { distance }
  } = getToc(getState());
  worker.onmessage = e => {
    dispatch({ type: "TOC_LIST_PROCESSED" });
    dispatch(run(e.data));
  };
  worker.postMessage([algo, list, distance]);
};

export const cancel = () => ({ type: "TOC_CANCELLED" });

export const clearColor = i => ({ type: "TOC_LIST_WHITE" });

const getOffset = e => {
  const { left: x, top: y } = e.currentTarget.getBoundingClientRect();
  let offsetX;
  let offsetY;
  if (e.clientX !== undefined) {
    offsetX = e.clientX - x;
    offsetY = e.clientY - y;
  } else {
    offsetX = e.touches[0].clientX - x;
    offsetY = e.touches[0].clientY - y;
  }
  return {
    x: parseInt(Math.max(0, offsetX), 10),
    y: parseInt(Math.max(offsetY, 0), 10)
  };
};
export const onNodeAdd = e => dispatch => {
  if (e.currentTarget === e.target) {
    dispatch({
      type: "TOC_LIST_ADD_NODE",
      payload: getOffset(e)
    });
  }
};

export const onNodePress = key => (dispatch, getState) => {
  const state = getState();
  const mode = getTocMode(state);
  if (mode === 1) return;
  const { selected, temp } = getTocAction(state);
  if (mode === 0) {
    dispatch({
      type: "TOC_DRAG_ITEM",
      payload: true
    });
    if ((selected && selected.item !== key) || !selected) {
      dispatch({
        type: "TOC_SELECT_ITEM",
        name: "NODE",
        item: key
      });
    }
  } else if (mode === 2) {
    const {
      list: { arc }
    } = getDrawBoardState(state);
    if (temp !== undefined) {
      let k1 = [temp, key].join(",");
      if (temp !== key && arc[k1] === undefined)
        dispatch({
          type: "TOC_LIST_ADD_ARC",
          payload: {
            from: temp,
            to: key
          },
          key: k1
        });
      dispatch({
        type: "TOC_ACTION_RESET"
      });
    } else {
      dispatch({
        type: "TOC_ARC_ITEM",
        payload: key
      });
    }
  }
};
export const onArcPress = key => (dispatch, getState) => {
  const state = getState();
  const mode = getTocMode(state);
  if (mode !== 0) return;
  const { selected } = getTocAction(state);
  if ((selected && selected.item !== key) || !selected) {
    dispatch({
      type: "TOC_SELECT_ITEM",
      name: "ARC",
      item: key
    });
  }
};
export const onNodeRelease = key => (dispatch, getState) => {
  const state = getState();
  const mode = getTocMode(state);
  if (mode === 1 || mode === 2) return;
  const { isDrag } = getTocAction(state);
  if (isDrag)
    dispatch({
      type: "TOC_DRAG_ITEM",
      payload: false
    });
};
export const onSVGDown = e => (dispatch, getState) => {
  const state = getState();
  const mode = getTocMode(state);
  if (mode === 1) {
    return onNodeAdd(e)(dispatch, getState);
  } else if (e.currentTarget === e.target)
    dispatch({
      type: "TOC_ACTION_RESET"
    });
};

export const onNodeMove = e => (dispatch, getState) => {
  const state = getState();
  const mode = getTocMode(state);
  if (mode === 1 || mode === 2) return;
  const { isDrag, selected } = getTocAction(state);
  if (isDrag) {
    const { node } = getDrawBoardList(state);
    dispatch({
      type: "TOC_LIST_ADD_NODE",
      key: selected.item,
      payload: { ...node[selected.item], ...getOffset(e) }
    });
  }
};

export const onSelectedPropChange = prop => (dispatch, getState) => {
  const state = getState();
  const {
    selected: { type, item }
  } = getTocAction(state);
  const { node, arc } = getDrawBoardList(state);
  if (type === "NODE") {
    dispatch({
      type: "TOC_LIST_ADD_NODE",
      key: item,
      payload: { ...node[item], ...prop }
    });
  } else
    dispatch({
      type: "TOC_LIST_ADD_ARC",
      key: item,
      payload: { ...arc[item], ...prop }
    });
};

export const setStart = key => (dispatch, getState) => {
  const state = getState();
  const { start } = getDrawBoardList(state);
  if (start !== key) {
    dispatch({
      type: "TOC_LIST_START",
      payload: key
    });
  } else
    dispatch({
      type: "TOC_LIST_START",
      payload: undefined
    });
};
export const setEnd = key => (dispatch, getState) => {
  const state = getState();

  const { end } = getDrawBoardList(state);
  if (!end.includes(key)) {
    dispatch({
      type: "TOC_LIST_END",
      payload: [...end, key]
    });
  } else
    dispatch({
      type: "TOC_LIST_END",
      payload: []
    });
};

export const deleteAll = () => ({
  type: "TOC_LIST_DELETE_ALL"
});

export const deleteSelected = (key, type) => dispatch => {
  dispatch({
    type: "TOC_ACTION_RESET"
  });
  if (type === "NODE")
    dispatch({
      type: "TOC_LIST_DELETE_NODE",
      payload: key
    });
  else
    dispatch({
      type: "TOC_LIST_DELETE_ARC",
      payload: key
    });
};
