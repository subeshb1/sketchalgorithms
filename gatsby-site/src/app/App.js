import React, { Component } from 'react'
import { Link, Router } from '@reach/router'
import './App.css'
import './css/index.css'
import { createComponent, createPortal } from './lib'
import { Sorting, DrawableGraph, Graph, Home, Games, TOC } from './containers'


const App = React.memo(() => {
  const isSSr = false
  return !isSSr ? (
    <Router>
      <Graph path="graph-search" />
      <Sorting path="sorting/*" />
    </Router>
  ) : null
})
export default App
