import React, { useState, useEffect } from 'react'
import '../../css/index.scss'
import '../../app/css/index.css'
import NavBar from '../navbar/index'
import Footer from '../footer/index'

const Layout = props => {
  const { children } = props

  return (
    <div id="project-main-container">
      <NavBar />
      <div className="nav-breaker"></div>
      <div className="dynamic-container">{children}</div>
      <Footer />
      <div className="st-nav-breaker"></div>
    </div>
  )
}

export default Layout
