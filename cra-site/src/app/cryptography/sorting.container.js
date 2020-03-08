import React from "react";
import ToolBar from "./container/tool-bar.container";

import Menu from "../components/menu";
import DrawBoard from "./container/draw-board.container";

const links = [
  "/bubble-sort",
  "/quick-sort",
  "/selection-sort",
  "/merge-sort",
  "/heap-sort"
];

const getAlgoFromPath = pathname => {
  const algo = pathname.slice(1);
  if (
    algo !== "bubble-sort" &&
    algo !== "selection-sort" &&
    algo !== "quick-sort" &&
    algo !== "merge-sort" &&
    algo !== "heap-sort"
  )
    return "bubble-sort";
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
  to: "/sorting" + item
}));

const Sorting = ({ match: { path }, location: { pathname } }) => {
  return (
    <div className="container">
      <Menu className="menu" items={menuItems} />
      <DrawBoard />
      <ToolBar algo={getAlgoFromPath(pathname.replace(path, ""))} />
    </div>
  );
};

export default Sorting;
