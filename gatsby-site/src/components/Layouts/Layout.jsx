import React, { useState, useEffect } from 'react'
import { graphql, Link } from 'gatsby'
import '../../css/index.scss'
import { NavBar } from '..'
import { rhythm, scale } from '../../utils/typography'

const fetchTheme = () => {
  if (window.localStorage) {
    return window.localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
  }
  return 'light'
}
const Layout = props => {
  const [theme, setTheme] = useState('light')
  const { location, title, children } = props
  const rootPath = `${__PATH_PREFIX__}/`

  useEffect(() => {
    setTheme(fetchTheme())
  }, [])

  return (
    <div className={`theme-${theme}`} id="project-main-container">
      <NavBar />
      <div className="nav-breaker"></div>
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
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout
