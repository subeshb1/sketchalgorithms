import React from "react";
import ToolBar from "./container/tool-bar.container";

import { Head, Menu } from "../components";
import DrawBoard from "./container/draw-board.container";

const headData = {
  bfs: {
    description:
      "Breadth First Search (BFS) algorithm traverses a graph in a breadthward motion and uses a queue to remember to get the next vertex to start a search, when a dead end occurs in any iteration. Learn and visualize BFS",
    title:
      "Breadth First Search (BFS) | Searching Algorithms | Sketch Algorithms",
    image: "bfs.PNG",
    url: "/graph-search/bfs"
  },
  dfs: {
    description:
      "Depth-first search (DFS) is an algorithm for traversing or searching tree or graph data structures. The algorithm starts at the root node (selecting some arbitrary node as the root node in the case of a graph) and explores as far as possible along each branch before backtracking. Learn Visualize DFS",
    title:
      "Depth First Search (DFS) | Searching Algorithms | Sketch Algorithms",
    image: "dfs.PNG",
    url: "/graph-search/dfs"
  },
  "a-star": {
    description:
      "A* is the most popular choice for pathfinding, because it's fairly flexible and can be used in a wide range of contexts. A* is like Dijkstra's Algorithm in that it can be used to find a shortest path. Learn and Visualize A star.",
    title: "A Star (A*) | Searching Algorithms | Sketch Algorithms",
    image: "a-star.PNG",
    url: "/graph-search/a-star"
  },
  dijkstras: {
    description:
      "One algorithm for finding the shortest path from a starting node to a target node in a weighted graph is Dijkstra's algorithm.  Learn and Visualize Dijkstras",
    title: "Dijkstras | Searching Algorithms | Sketch Algorithms",
    image: "dijkstras.PNG",
    url: "/graph-search/dijkstras"
  },
  home: {
    description:
      "Learn about different types of Searching Algorithms following different paradigms. Calculate Complexity, visualize, get programming code and implement it yourself.Prims Algorithm,  a star search, dijkstras search, dfs search,bfs search...",
    title: "Searching Algorithms | Sketch Algorithms",
    url: "/graph-search/"
  }
};

const links = ["/bfs", "/dfs", "/a-star", "/dijkstras"];

const getAlgoFromPath = pathname => {
  const algo = pathname.slice(1);
  if (algo !== "dfs" && algo !== "a-star" && algo !== "dijkstras") return "bfs";
  return algo;
};

const getName = pathname =>
  getAlgoFromPath(pathname)
    .split("-")
    .map(x => x.toUpperCase())
    .join(" ");

// Menu Component
let menuItems = links.map(item => ({
  className: "item",
  children: getName(item),
  to: "/graph-search" + item
}));

const Searching = ({ match: { path }, location: { pathname } }) => {
  const current = pathname.replace(path, "");
  const algo = getAlgoFromPath(current);
  return (
    <div className="container">
      <Head data={headData[current ? algo : "home"]} />
      <Menu className="menu" items={menuItems} />
      <DrawBoard />
      <ToolBar algo={algo} />
    </div>
  );
};

export default Searching;
