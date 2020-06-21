import React, { useEffect } from 'react'
import ToolBar from './container/tool-bar.container'

import { Menu, Head, NavLink } from '../components'
import DrawBoard from './container/draw-board.container'

import { Router } from '@reach/router'
const headData = {
  'bubble-sort': {
    description:
      "Bubble Sort is one of the simplest Algorithms. Learn how bubble sort works and visualize it. It's complexity is O(n). It works by repeatedly swapping the adjacent elements if they are in wrong order.",
    title: 'Bubble Sort | Sorting Algorithms',
    image: 'bubble.png',
    url: '/app/sorting/bubble-sort',
  },
  'merge-sort': {
    description:
      "Merge Sort is a Divide and Conquer Algorithm like Quick Sort. Learn how Merge sort works and visualize it. It's complexity is O(n logn). It divides input array in two halves, calls itself for the two halves and then merges the two sorted arrays.",
    title: 'Merge Sort | Sorting Algorithms',
    image: 'merge.png',
    url: '/app/sorting/merge-sort',
  },
  'quick-sort': {
    description:
      "Quick Sort is a Divide and Conquer Algorithm like Merge Sort. Learn how Quick sort works and visualize it. It's complexity is O(n logn). It picks an element as pivot and partitions the given array around the picked pivot.",
    title: 'Quick Sort | Sorting Algorithms',
    image: 'quick.png',
    url: '/app/sorting/quick-sort',
  },
  'heap-sort': {
    description:
      "Heap sort sorts by building a heap tree. Learn how Heap sort works and visualize it. It's complexity is O(n logn). A heap is a partially sorted binary tree that is stored inside an array.",
    title: 'Heap Sort | Sorting Algorithms',
    image: 'heap.png',
    url: '/app/sorting/heap-sort',
  },
  'selection-sort': {
    description:
      "Selection sort like its name suggests selects the smallest element at every pass, meaning in every pass an item is placed in order. Learn how Selection sort works and visualize it. It's complexity is O(n^2). Selection ",
    title: 'Selection Sort | Sorting Algorithms',
    image: 'bubble.png',
    url: '/app/sorting/selection-sort',
  },
  home: {
    description:
      'Learn about different types of Sorting Algorithms following different paradigms. Calculate Complexity, visualize, get programming code and implement it yourself.',
    title: 'Sorting Algorithms',
    url: '/app/sorting/',
  },
}

const algorithms = [
  'bubble-sort',
  'quick-sort',
  'selection-sort',
  'merge-sort',
  'heap-sort',
]

const getAlgoFromPath = pathname => {
  if (!algorithms.includes(pathname)) return 'bubble-sort'
  return pathname
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
  to: '/app/sorting/' + item,
}))

const Sorting = React.memo(() => {
  return (
    <Router basepath="/app/sorting">
      {algorithms.map((algo, i) => {
        return <SortingAlgorithm key={i} path={`/${algo}`} algo={algo} />
      })}
      <SortingAlgorithm path={`/*`} algo={'bubble-sort'} />
    </Router>
  )
})

const SortingAlgorithm = React.memo(({ algo }) => {
  return (
    <div className="container">
      <Head data={headData[algo] || headData.home} />
      <Menu className="menu" items={menuItems} />
      <ToolBar algo={algo} />
      <DrawBoard />
    </div>
  )
})

export default Sorting
