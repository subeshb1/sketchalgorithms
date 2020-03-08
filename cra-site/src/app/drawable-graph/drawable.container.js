import React from "react";
import { Menu, Head } from "../components";
import ToolBar from "./container/tool-bar.container";
import DrawBoard from "./container/draw-board.container";
import IconBar from "./container/icon-bar.container";
import "./css/index.css";

const headData = {
  bfs: {
    description:
      "Draw and Visualize Graph Algorithms. Breadth First Search (BFS) algorithm traverses a graph in a breadthward motion and uses a queue to remember to get the next vertex to start a search, when a dead end occurs in any iteration. Learn and visualize BFS",
    title: "Breadth First Search (BFS) | Graph Algorithms | Sketch Algorithms",
    image: "bfs-draw.PNG",
    url: "/drawable/bfs"
  },
  dfs: {
    description:
      "Draw and Visualize Graph Algorithms. Depth-first search (DFS) is an algorithm for traversing or searching tree or graph data structures. The algorithm starts at the root node (selecting some arbitrary node as the root node in the case of a graph) and explores as far as possible along each branch before backtracking. Learn Visualize DFS",
    title: "Depth First Search (DFS) | Graph Algorithms | Sketch Algorithms",
    image: "dfs-draw.PNG",
    url: "/drawable/dfs"
  },
  "a-star": {
    description:
      "Draw and Visualize Graph Algorithms. A* is the most popular choice for pathfinding, because it's fairly flexible and can be used in a wide range of contexts. A* is like Dijkstra's Algorithm in that it can be used to find a shortest path. Learn and Visualize A star.",
    title: "A Star (A*) | Graph Algorithms | Sketch Algorithms",
    image: "a-star-draw.PNG",
    url: "/drawable/a-star"
  },
  dijkstras: {
    description:
      "Draw and Visualize Graph Algorithms. One algorithm for finding the shortest path from a starting node to a target node in a weighted graph is Dijkstra's algorithm.  Learn and Visualize Dijkstras",
    title: "Dijkstras Sort | Graph Algorithms | Sketch Algorithms",
    image: "dijkstras-draw.PNG",
    url: "/drawable/dijkstras"
  },
  home: {
    description:
      "Draw and Visualize Graph Algorithms. Learn about different types of Graph Algorithms following different paradigms. Calculate Complexity, visualize, get programming code and implement it yourself. a star search, dijkstras search, dfs search,bfs search...",
    title: "Graph Algorithms | Sketch Algorithms",
    url: "/drawable/"
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
  to: "/drawable-graph" + item
}));

const Sorting = ({ match: { path }, location: { pathname } }) => {
  const current = pathname.replace(path, "");
  const algo = getAlgoFromPath(current);
  return (
    <div className="container">
      <Head data={headData[current ? algo : "home"]} />
      <Menu className="menu" items={menuItems} />
      <IconBar />
      <DrawBoard algo={algo} />
      <ToolBar algo={algo} className="tool-bar draw-tool-bar" />
    </div>
  );
};

export default Sorting;
