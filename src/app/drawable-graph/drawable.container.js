import React from 'react'
import { Menu, Head, NavLink } from '../components'
import ToolBar from './container/tool-bar.container'
import DrawBoard from './container/draw-board.container'
import IconBar from './container/icon-bar.container'
import './css/index.css'

import { Router } from '@reach/router'

const headData = {
  bfs: {
    description:
      'Draw and Visualize Graph Algorithms. Breadth First Search (BFS) algorithm traverses a graph in a breadthward motion and uses a queue to remember to get the next vertex to start a search, when a dead end occurs in any iteration. Learn and visualize BFS',
    title: 'Breadth First Search (BFS) | Graph Algorithms',
    image: 'bfs-draw.png',
    url: '/app/drawable-graph/bfs',
  },
  dfs: {
    description:
      'Draw and Visualize Graph Algorithms. Depth-first search (DFS) is an algorithm for traversing or searching tree or graph data structures. The algorithm starts at the root node (selecting some arbitrary node as the root node in the case of a graph) and explores as far as possible along each branch before backtracking. Learn Visualize DFS',
    title: 'Depth First Search (DFS) | Graph Algorithms',
    image: 'dfs-draw.png',
    url: '/app/drawable-graph/dfs',
  },
  'a-star': {
    description:
      "Draw and Visualize Graph Algorithms. A* is the most popular choice for pathfinding, because it's fairly flexible and can be used in a wide range of contexts. A* is like Dijkstra's Algorithm in that it can be used to find a shortest path. Learn and Visualize A star.",
    title: 'A Star (A*) | Graph Algorithms',
    image: 'a-star-draw.png',
    url: '/app/drawable-graph/a-star',
  },
  dijkstras: {
    description:
      "Draw and Visualize Graph Algorithms. One algorithm for finding the shortest path from a starting node to a target node in a weighted graph is Dijkstra's algorithm.  Learn and Visualize Dijkstras",
    title: 'Dijkstras Sort | Graph Algorithms',
    image: 'dijkstras-draw.png',
    url: '/app/drawable-graph/dijkstras',
  },
  home: {
    description:
      'Draw and Visualize Graph Algorithms. Learn about different types of Graph Algorithms following different paradigms. Calculate Complexity, visualize, get programming code and implement it yourself. a star search, dijkstras search, dfs search,bfs search...',
    title: 'Graph Algorithms',
    url: '/app/drawable-graph/',
  },
}

const algorithms = ['bfs', 'dfs', 'a-star', 'dijkstras']

const getAlgoFromPath = algo => {
  if (!algorithms.includes(algo)) return 'bfs'
  return algo
}

const getName = pathname =>
  getAlgoFromPath(pathname)
    .split('-')
    .join(' ')

// Menu Component
let menuItems = algorithms.map(item => ({
  className: 'item',
  as: NavLink,
  children: getName(item),
  to: '/app/drawable-graph/' + item,
}))

const DrawableGraph = React.memo(() => {
  return (
    <Router basepath="/app/drawable-graph">
      {algorithms.map((algo, i) => {
        return <DrawableGraphAlgorithm key={i} path={`/${algo}`} algo={algo} />
      })}
      <DrawableGraphAlgorithm path={`/*`} algo={'bfs'} />
    </Router>
  )
})

const DrawableGraphAlgorithm = React.memo(({ algo }) => {
  return (
    <div className="container">
      <Head data={headData[algo] || headData.home} />
      <Menu className="menu" items={menuItems} />
      <IconBar />
      <DrawBoard algo={algo} />
      <ToolBar algo={algo} className="tool-bar draw-tool-bar" />
    </div>
  )
})

export default DrawableGraph
