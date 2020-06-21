import React, { Component } from 'react'
import './css/index.css'
import { Menu, Head, NavLink } from '../components'
import { Snake } from './statefulComponents'
import { Router } from '@reach/router'

const games = ['snake-game']

const getAlgoFromPath = pathname => {
  if (!games.includes(pathname)) return 'snake-game'
  return pathname
}

const getName = pathname =>
  getAlgoFromPath(pathname)
    .split('-')

    .join(' ')

// Menu Component
let menuItems = games.map(item => ({
  className: 'item',
  as: NavLink,
  children: getName(item),
  to: '/app/games/' + item,
}))

const data = {
  description:
    'Play snake game online. Made using HTML CSS and javascript. Learn how to build your own snake game following the tutorial.',
  title: 'Snake Game | Games',
  url: '/app/games/snake-game',
}

export default class Games extends Component {
  render() {
    return (
      <Router basepath="/app/games/">
        <GamesRoute path="/snake-game" />
        {games.map((game, i) => {
          return <GamesRoute key={i} path={`/${game}`} game={game} />
        })}
      </Router>
    )
  }
}

const GamesRoute = React.memo(({ game }) => {
  return (
    <div className="container">
      <Head data={data} />
      <Menu className="menu" items={menuItems} />
      <Snake path="/snake-game" />
    </div>
  )
})
