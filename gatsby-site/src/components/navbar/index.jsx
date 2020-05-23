import React from 'react'
import { Link } from 'gatsby'

import Logo from '../../assets/logo.png'
import Popover from '../Popover'

import { navDropDownFactory } from './common'
import ThemePicker from './ThemePicker'
export default function NavBar() {
  return (
    <nav className="lg-navbar">
      <img className={'lg-navbar-img'} src={Logo} />
      <Link to="/" className="lg-navbar__item lg-navbar__header">
        Subesh Bhandari
      </Link>
      <Popover elementAs={navDropDownFactory('/blogs', 'Blogs')}>
        <div className="lg-navbar__drop-down" key="1">
          <div>1</div>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>2</div>
          <div>3</div>
        </div>
      </Popover>
      <Popover elementAs={navDropDownFactory('/apps', 'Apps')}>
        <div className="lg-navbar__drop-down" key="1">
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </div>
      </Popover>
      <Popover elementAs={navDropDownFactory('/projects', 'Projects')}>
        <div className="lg-navbar__drop-down" key="1">
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </div>
      </Popover>
      <ThemePicker />
    </nav>
  )
}
