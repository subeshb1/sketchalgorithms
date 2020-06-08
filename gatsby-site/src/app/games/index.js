import React, { Component } from 'react'
import './css/index.css'
import { Menu, Head } from '../components'
import { Snake } from './statefulComponents'
// import Loadable from "react-loadable";
import SnakeTut from './components/snake-tut'
// const SnakeTut = Loadable({
//   loader: () => import("./components/snake-tut"),
//   loading: () => <div>Loading...</div>,
//   delay: 0
// });

const links = ['/snake-game']

const getAlgoFromPath = pathname => {
  return 'snake-game'
}

const getName = pathname =>
  getAlgoFromPath(pathname)
    .split('-')
    .map(x => x.toUpperCase())
    .join(' ')

// Menu Component
let menuItems = links.map(item => ({
  className: 'item',
  children: getName(item),
  to: '/games' + item,
}))

const data = {
  description:
    'Learn how to make a Simple Games using several programming languages. Follow the step by step process to build your own games.',
  title: 'Games | Tutorial | Subesh Bhandari',
  url: '/games/',
}

export default class Games extends Component {
  render() {
    return (
      <React.Fragment>
        <Head data={data} />
        <div className="container">
          <Menu className="menu" items={menuItems} />

          <Snake path="/games/snake-game" /> 
        </div>

        <div className="section-container">
          <SnakeTut path="/games/snake-game" />
        </div>
      </React.Fragment>
    )
  }
}
