import React, { useState, useEffect } from 'react'
import '../../css/index.scss'
import  NavBar  from '../navbar/index'

const fetchTheme = () => {
  if (window.localStorage) {
    return window.localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
  }
  return 'light'
}
const Layout = props => {
  const [, setTheme] = useState('light')
  const { children } = props

  useEffect(() => {
    setTheme(fetchTheme())
  }, [])

  return (
    <div id="project-main-container">
      <NavBar />
      <div className="nav-breaker"></div>
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
