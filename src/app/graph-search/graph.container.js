import React from 'react'
import ToolBar from './container/tool-bar.container'

import { Head, Menu, NavLink } from '../components'
import DrawBoard from './container/draw-board.container'
import { Router } from '@reach/router'

const headData = {
  bfs: {
    description:
      'Breadth First Search (BFS) algorithm traverses a graph in a breadthward motion and uses a queue to remember to get the next vertex to start a search, when a dead end occurs in any iteration. Learn and visualize BFS',
    title:
      'Breadth First Search (BFS) | Searching Algorithms',
    image: 'bfs.png',
    url: '/app/graph-search/bfs',
  },
  dfs: {
    description:
      'Depth-first search (DFS) is an algorithm for traversing or searching tree or graph data structures. The algorithm starts at the root node (selecting some arbitrary node as the root node in the case of a graph) and explores as far as possible along each branch before backtracking. Learn Visualize DFS',
    title: 'Depth First Search (DFS) | Searching Algorithms',
    image: 'dfs.png',
    url: '/app/graph-search/dfs',
  },
  'a-star': {
    description:
      "A* is the most popular choice for pathfinding, because it's fairly flexible and can be used in a wide range of contexts. A* is like Dijkstra's Algorithm in that it can be used to find a shortest path. Learn and Visualize A star.",
    title: 'A Star (A*) | Searching Algorithms',
    image: 'a-star.png',
    url: '/app/graph-search/a-star',
  },
  dijkstras: {
    description:
      "One algorithm for finding the shortest path from a starting node to a target node in a weighted graph is Dijkstra's algorithm.  Learn and Visualize Dijkstras",
    title: 'Dijkstras | Searching Algorithms',
    image: 'dijkstras.png',
    url: '/app/graph-search/dijkstras',
  },
  home: {
    description:
      'Learn about different types of Searching Algorithms following different paradigms. Calculate Complexity, visualize, get programming code and implement it yourself.Prims Algorithm,  a star search, dijkstras search, dfs search,bfs search...',
    title: 'Searching Algorithms',
    url: '/app/graph-search/',
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

let menuItems = algorithms.map(item => ({
  className: 'item',
  as: NavLink,
  children: getName(item),
  to: '/app/graph-search/' + item,
}))

const Searching = React.memo(() => {
  return (
    <Router basepath="/app/graph-search">
      {algorithms.map((algo, i) => {
        return <SearchingAlgorithm key={i} path={`/${algo}`} algo={algo} />
      })}
      <SearchingAlgorithm path={`/*`} algo={'bubble-sort'} />
    </Router>
  )
})

const SearchingAlgorithm = React.memo(({ algo }) => {
  return (
    <div className="container">
      <Head data={headData[algo] || headData.home} />
      <Menu className="menu" items={menuItems} />
      <ToolBar algo={algo} />
      <DrawBoard />
    </div>
  )
})

export default Searching
