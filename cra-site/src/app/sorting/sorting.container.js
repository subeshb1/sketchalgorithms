import React from "react";
import ToolBar from "./container/tool-bar.container";

import { Menu, Head } from "../components";
import DrawBoard from "./container/draw-board.container";

const headData = {
  "bubble-sort": {
    description:
      "Bubble Sort is one of the simplest Algorithms. Learn how bubble sort works and visualize it. It's complexity is O(n). It works by repeatedly swapping the adjacent elements if they are in wrong order.",
    title: "Bubble Sort | Sorting Algorithms | Sketch Algorithms",
    image: "bubble.PNG",
    url: "/sorting/bubble-sort"
  },
  "merge-sort": {
    description:
      "Merge Sort is a Divide and Conquer Algorithm like Quick Sort. Learn how Merge sort works and visualize it. It's complexity is O(n logn). It divides input array in two halves, calls itself for the two halves and then merges the two sorted arrays.",
    title: "Merge Sort | Sorting Algorithms | Sketch Algorithms",
    image: "merge.PNG",
    url: "/sorting/merge-sort"
  },
  "quick-sort": {
    description:
      "Quick Sort is a Divide and Conquer Algorithm like Merge Sort. Learn how Quick sort works and visualize it. It's complexity is O(n logn). It picks an element as pivot and partitions the given array around the picked pivot.",
    title: "Quick Sort | Sorting Algorithms | Sketch Algorithms",
    image: "quick.PNG",
    url: "/sorting/quick-sort"
  },
  "heap-sort": {
    description:
      "Heap sort sorts by building a heap tree. Learn how Heap sort works and visualize it. It's complexity is O(n logn). A heap is a partially sorted binary tree that is stored inside an array.",
    title: "Heap Sort | Sorting Algorithms | Sketch Algorithms",
    image: "heap.PNG",
    url: "/sorting/heap-sort"
  },
  "selection-sort": {
    description:
      "Selection sort like its name suggests selects the smallest element at every pass, meaning in every pass an item is placed in order. Learn how Selection sort works and visualize it. It's complexity is O(n^2). Selection ",
    title: "Selection Sort | Sorting Algorithms | Sketch Algorithms",
    image: "bubble.PNG",
    url: "/sorting/selection-sort"
  },
  home: {
    description:
      "Learn about different types of Sorting Algorithms following different paradigms. Calculate Complexity, visualize, get programming code and implement it yourself.",
    title: "Sorting Algorithms | Sketch Algorithms",
    url: "/sorting/"
  }
};

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
  const current = pathname.replace(path, "");
  const algo = getAlgoFromPath(current);
  return (
    <React.Fragment>
      <div className="container">
        <Head data={headData[current ? algo : "home"]} />
        <Menu className="menu" items={menuItems} />
        <DrawBoard />
        <ToolBar algo={algo} />
      </div>
    </React.Fragment>
  );
};

export default Sorting;
