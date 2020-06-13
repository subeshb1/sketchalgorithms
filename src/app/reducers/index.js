import sorting from "../sorting/reducers";
import graph from "../graph-search/reducers";
import drawable from "../drawable-graph/reducers";
import toc from "../theory_of_computation/reducers";
import { combineReducers } from "redux";

export default combineReducers({ sorting, graph, drawable, toc });
