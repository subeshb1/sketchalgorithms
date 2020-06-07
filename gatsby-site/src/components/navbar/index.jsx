import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'
import Popover from '../Popover'

import { navDropDownFactory } from './common'
import ThemePicker from './ThemePicker'
const NavBar = React.memo(props => {
  const { navLogo, snakeGrid } = useStaticQuery(
    graphql`
      query images {
        navLogo: file(absolutePath: { regex: "/logo.png/" }) {
          childImageSharp {
            fixed(width: 50, height: 50) {
              ...GatsbyImageSharpFixed
            }
          }
        }

        snakeGrid: file(absolutePath: { regex: "/snake-grid.png/" }) {
          childImageSharp {
            fixed(width: 50, height: 50) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `
  )
  return (
    <nav className="lg-navbar">
      <Image
        fixed={navLogo.childImageSharp.fixed}
        alt="Website logo"
        className={'lg-navbar-img'}
      />
      <Link to="/" className="lg-navbar__item lg-navbar__header">
        Subesh Bhandari
      </Link>
      <Popover
        strategy="fixed"
        elementAs={navDropDownFactory('/blogs', 'Blogs')}
      >
        <div className="lg-navbar__drop-down" key="1">
          <DropDownDisplayItem
            as={Link}
            to={'/blog/games/snake-game'}
            image={snakeGrid.childImageSharp.fixed}
            title="Build a Snake Game"
            info=" Using javascript, HTML5 and canvas"
          />
        </div>
      </Popover>
      <Popover strategy="fixed" elementAs={navDropDownFactory('/apps', 'Apps')}>
        <div className="lg-navbar__drop-down" key="1">
          <DropDownDisplayItem
            as={Link}
            to={'/blog/games/snake-game'}
            image={snakeGrid.childImageSharp.fixed}
            title="Sorting Algorithms"
            info="Bubble sort, Merge sort heap sort and more"
          />
          <DropDownDisplayItem
            as={Link}
            to={'/blog/games/snake-game'}
            image={snakeGrid.childImageSharp.fixed}
            title="Searching Algorithms"
            info="A* search, BFS, DFS, Dijkstra"
          />
          <DropDownDisplayItem
            as={Link}
            to={'/blog/games/snake-game'}
            image={snakeGrid.childImageSharp.fixed}
            title="Theory of computation"
            info="DFA, NFA"
          />
        </div>
      </Popover>
      <Popover
        strategy="fixed"
        elementAs={navDropDownFactory('/projects', 'Projects')}
      >
        <div className="lg-navbar__drop-down" key="1">
          <DropDownDisplayItem
            as={Link}
            to={'/api-test'}
            image={snakeGrid.childImageSharp.fixed}
            title="API testing with api-test"
            info="JSON API automated testing program"
          />
        </div>
      </Popover>
      <ThemePicker />
    </nav>
  )
})

function DropDownDisplayItem({ image, title, info, as = 'div', ...props }) {
  const As = as
  return (
    <As
      className="lg-navbar__drop-down__item lg-navbar__drop-down__display-item"
      {...props}
    >
      <div className="lg-navbar__drop-down__image">
        <Image fixed={image} alt="Website logo" className={'lg-navbar-img'} />
      </div>
      <div className="lg-navbar__drop-down__text">
        {title}
        <div className="lg-navbar__drop-down__dim">{info}</div>
      </div>
    </As>
  )
}
export default NavBar
