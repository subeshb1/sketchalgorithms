import React from "react";
import Menu from "../components/menu";
import ToolBar from "./container/tool-bar.container";
import DrawBoard from "./container/draw-board.container";
import IconBar from "./container/icon-bar.container";
import "./css/index.css";
import { Helmet } from "react-helmet";

const headData = {
  bfs: {
    description:
      "Breadth First Search (BFS) algorithm traverses a graph in a breadthward motion and uses a queue to remember to get the next vertex to start a search, when a dead end occurs in any iteration. Learn and visualize BFS",
    title: "Breadth First Search (BFS) | Sketch Algorithms",
    keyword:
      "breadth first search, bfs, searching, algorithms, complexity, design and analysis of algorithm, bfs code, breadth first search code, graph search, graph algorithms,c++,java,javascript,html,python,c,data structure"
  },
  dfs: {
    description:
      "Depth-first search (DFS) is an algorithm for traversing or searching tree or graph data structures. The algorithm starts at the root node (selecting some arbitrary node as the root node in the case of a graph) and explores as far as possible along each branch before backtracking. Learn Visualize DFS",
    title: "Depth First Search (DFS) | Sketch Algorithms",
    keyword:
      "depth first search, dfs, searching, algorithms, complexity, design and analysis of algorithm, dfs code, depth first search code, graph search, graph algorithms,c++,java,javascript,html,python,c,data structure"
  },
  "a-star": {
    description:
      "A* is the most popular choice for pathfinding, because it's fairly flexible and can be used in a wide range of contexts. A* is like Dijkstra's Algorithm in that it can be used to find a shortest path. Learn and Visualize A star.",
    title: "A Star (A*) | Sketch Algorithms",
    keyword:
      "a-star search, a*, searching, algorithms, complexity, design and analysis of algorithm, a star code, a-star search code, graph search, graph algorithms,c++,java,javascript,html,python,c,data structure"
  },
  dijkstras: {
    description:
      "One algorithm for finding the shortest path from a starting node to a target node in a weighted graph is Dijkstra's algorithm.  Learn and Visualize Dijkstras",
    title: "Heap Sort | Sketch Algorithms",
    keyword:
      "dijkstras  search, dijkstras, searching, algorithms, complexity, design and analysis of algorithm, dijkstras code, dijkstras algorithm search code, graph search, graph algorithms,c++,java,javascript,html,python,c,data structure"
  },
  home: {
    description:
      "Learn about different types of Graph Algorithms following different paradigms. Calculate Complexity, visualize, get programming code and implement it yourself. a star search, dijkstras search, dfs search,bfs search...",
    title: "Graph Algorithms | Sketch Algorithms",
    keyword:
      "searching, search, a star search, dijkstras search, dfs search,bfs search"
  }
};
class Head extends React.Component {
  render() {
    const { algo } = this.props;
    const data = headData[algo];
    return (
      <Helmet>
        <meta charSet="utf-8" />
        <title>{data.title}</title>
        <meta name="description" content={data.description} />
        <meta name="keyword" content={data.keyword} />
      </Helmet>
    );
  }
}

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

const TOC = ({ match: { path }, location: { pathname } }) => {
  const current = pathname.replace(path, "");
  const algo = getAlgoFromPath(current);
  return (
    <div className="container">
      <Head algo={current ? algo : "home"} />
      <Menu className="menu" items={menuItems} />
      <IconBar />
      <DrawBoard algo={algo} />
      <ToolBar algo={algo} className="tool-bar draw-tool-bar" />
    </div>
  );
};

export default TOC;
