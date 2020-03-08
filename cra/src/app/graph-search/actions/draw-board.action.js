import { getGraph } from "../reducers";
import { generateGraph, graphSearch } from "../../workers";

const sortList = data => async (dispatch, getState) => {
  let i = 0;
  let action = { type: "NULL" };
  const {
    draw: {
      list: { graph, row, col, displayText }
    }
  } = getGraph(getState());
  for (let item of data) {
    const {
      tool: { step, interval },
      draw: { searching }
    } = getGraph(getState());
    if (!searching) return;
    if (!item.path) {
      graph[item.pos].color = item.color;
      if (item.text) graph[item.pos].text = item.text;
      action = {
        type: "GRAPH_LIST_ACTION",
        payload: { graph, row, col, displayText }
      };
    } else {
      action = {
        type: "GRAPH_LIST_ACTION",
        payload: { graph, row, col, path: item.path, displayText }
      };
    }

    if (i % step === 0 || !step) {
      // eslint-disable-next-line
      await new Promise(resolve =>
        setTimeout(() => {
          const {
            draw: { searching }
          } = getGraph(getState());
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
  dispatch({ type: "GRAPH_FINISHED" });
};

export const generateList = () => (dispatch, getState) => {
  dispatch({
    type: "GRAPH_LIST_GENERATE",
    payload: generateGraph
  });
  const {
    draw: {
      worker,
      list: { displayText }
    },
    tool: { row, col, start, end }
  } = getGraph(getState());
  worker.onmessage = e => {
    dispatch({
      type: "GRAPH_LIST_GENERATED",
      payload: e.data
    });
  };
  worker.postMessage([row, col, start, end, displayText]);
};
export const processList = algo => (dispatch, getState) => {
  dispatch({ type: "GRAPH_LIST_WHITE" });
  dispatch({ type: "GRAPH_LIST_PROCESS", payload: graphSearch });
  const {
    draw: { worker, list },
    tool: { start, end, diagonal }
  } = getGraph(getState());
  worker.onmessage = e => {
    dispatch({ type: "GRAPH_LIST_PROCESSED" });
    dispatch(sortList(e.data));
  };
  worker.postMessage([algo, list, start, end, diagonal]);
};

export const cancel = () => ({ type: "GRAPH_CANCELLED" });

export const makeBlock = (i, mode = 0) => (dispatch, getState) => {
  if (!getGraph(getState()).draw.searching) {
    dispatch({
      type: "GRAPH_LIST_BLOCK",
      payload: i,
      mode
    });
  }
};

export const onRelease = i => ({ type: "GRAPH_RELEASE" });
export const onPress = i => ({ type: "GRAPH_PRESS" });
export const clearColor = i => ({ type: "GRAPH_LIST_WHITE" });
export const changeDisplayText = payload => ({
  type: "GRAPH_LIST_TEXT",
  payload
});
