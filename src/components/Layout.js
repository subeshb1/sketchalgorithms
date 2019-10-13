import React, { useState, useEffect } from 'react'

import AniLink from 'gatsby-plugin-transition-link/AniLink'
import { css } from '@emotion/core'
import '../css/index.scss'
import { NavBar } from '.'
import { rhythm, scale } from '../utils/typography'

const fetchTheme = () => {
  if (window.localStorage) {
    return window.localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
  }
  return 'light'
}
const Layout = props => {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    setTheme(fetchTheme())
  }, [])

  const { location, title, children } = props
  const rootPath = `${__PATH_PREFIX__}/`
  let header

  if (location.pathname === rootPath) {
    header = (
      <h1
        style={{
          ...scale(1.5),
          marginBottom: rhythm(1.5),
          marginTop: 0,
        }}
      >
        <AniLink paintDrip to={`/`} hex="#4b9bff3b">
          {title}
        </AniLink>
      </h1>
    )
  } else {
    header = (
      <h3
        style={{
          fontFamily: `Lora, sans-serif`,
          marginTop: 0,
        }}
      >
        <AniLink paintDrip hex="#4b9bff3b" to={`/`}>
          {title}
        </AniLink>
      </h3>
    )
  }
  return (
    <div className={`theme-${theme}`}>
     <NavBar />
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: 900,
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        {header}
        <button
          onClick={() => {
            const nextTheme = theme === 'dark' ? 'light' : 'dark'
            localStorage.setItem('theme', nextTheme)
            setTheme(nextTheme)
          }}
        >
          Toggle Theme
        </button>
        {children}
      </div>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout
