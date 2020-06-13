import {getSorting} from '../reducers';
const sortList = data => async (dispatch, getState) => {
  let i = 0;
  const {
    draw: { list }
  } = getSorting(getState());
  for (let item of data) {
    const {
      tool: { step, interval },
      draw: { sorting }
    } = getSorting(getState());
    if (!sorting) return;
    switch (item.type) {
      case "LIST_STORE":
        list[item.payload.i] = item.payload.val;
        break;
      case "LIST_SWAP":
        const temp = list[item.payload.pos[0]];
        list[item.payload.pos[0]] = list[item.payload.pos[1]];
        list[item.payload.pos[1]] = temp;
        break;
      default:
        break;
    }

    if (i % step === 0 || !step) {
      await new Promise(resolve =>
        setTimeout(() => {
          const {
            draw: { sorting }
          } = getSorting(getState());
          if (!sorting) return;
          dispatch({
            type: "LIST_ACTION",
            pivot: item.payload.pivot,
            boundary: item.payload.boundary || [],
            swap: item.payload.pos || []
          });
          resolve();
        }, interval)
      );
      i = 0;
    }

    i++;
  }
  dispatch({ type: "FINISHED", payload: [...list] });
};

export const generateList = () => (dispatch, getState) => {
  dispatch({ type: "LIST_GENERATE", payload: "/workers/generate.js" });
  const {
    draw: { worker },
    tool: { size, mode }
  } = getSorting(getState());
  worker.onmessage = e => {
    dispatch({
      type: "LIST_GENERATED",
      payload: e.data
    });
  };
  worker.postMessage([size, mode]);
};
export const processList = algo => (dispatch, getState) => {
  dispatch({ type: "LIST_PROCESS", payload: "/workers/algo.js" });
  const {
    draw: { worker, list }
  } = getSorting(getState());
  worker.onmessage = e => {
    dispatch({ type: "LIST_PROCESSED" });
    dispatch(sortList(e.data));
  };
  worker.postMessage([algo, list]);
};

export const cancel = () => ({ type: "CANCELLED" });
