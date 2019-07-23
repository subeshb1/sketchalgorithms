import React from 'react'

import AniLink from 'gatsby-plugin-transition-link/AniLink'

import './index.css'
import { rhythm, scale } from '../utils/typography'

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
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
      <div>
        <div
          style={{
            marginLeft: `auto`,
            marginRight: `auto`,
            background: 'white',
            maxWidth: 900,
            padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          }}
        >
          {header}
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
}

export default Layout
