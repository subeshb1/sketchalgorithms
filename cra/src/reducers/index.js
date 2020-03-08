import sorting from "../app/sorting/reducers";
import graph from "../app/graph-search/reducers";
import drawable from "../app/drawable-graph/reducers";
import toc from "../app/theory_of_computation/reducers";
import { combineReducers } from "redux";

export default combineReducers({ sorting, graph, drawable, toc });
