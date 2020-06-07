import React from 'react'
import { Link, useStaticQuery,graphql } from 'gatsby'
import Image from 'gatsby-image'
import Popover from '../Popover'

import { navDropDownFactory } from './common'
import ThemePicker from './ThemePicker'
const NavBar = React.memo(props => {
  const { avatar } = useStaticQuery(
    graphql`
      query navLogo {
        avatar: file(absolutePath: { regex: "/logo.png/" }) {
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
        fixed={avatar.childImageSharp.fixed}
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
          <div>1</div>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>2</div>
          <div>3</div>
        </div>
      </Popover>
      <Popover strategy="fixed" elementAs={navDropDownFactory('/apps', 'Apps')}>
        <div className="lg-navbar__drop-down" key="1">
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </div>
      </Popover>
      <Popover
        strategy="fixed"
        elementAs={navDropDownFactory('/projects', 'Projects')}
      >
        <div className="lg-navbar__drop-down" key="1">
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </div>
      </Popover>
      <ThemePicker />
    </nav>
  )
})

export default NavBar
