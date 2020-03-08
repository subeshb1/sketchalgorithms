import reducers from "./reducers";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { saveState, loadState } from "./local-storage";
import { throttle } from "./app/lib";
const configureStore = () => {
  const preLoadedState = loadState();
  const store = createStore(
    reducers,
    preLoadedState,
    composeWithDevTools(applyMiddleware(thunk))
  );
  store.subscribe(
    throttle(() => {
      const {
        graph: { tool },
        drawable: { tool: tool1 },
        sorting: { tool: tool2 }
      } = store.getState();
      saveState({
        graph: { tool },
        drawable: { tool: tool1 },
        sorting: { tool: tool2 }
      });
    }, 300)
  );
  return store;
};

export default configureStore;
