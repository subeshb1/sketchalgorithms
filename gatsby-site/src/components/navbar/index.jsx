import React from 'react'
import { Link } from 'gatsby'
import { FaChevronDown } from 'react-icons/fa'
import { IoIosColorPalette } from 'react-icons/io'
import Logo from '../../assets/logo.png'
import Tooltip from '../ToolTip'
import Popover from '../Popover'
import { SketchPicker } from 'react-color'
const NavDropDownLink = React.forwardRef(
  ({ onChevronClick = () => {}, to, linkName, className, ...props }, ref) => {
    return (
      <div className={`lg-navbar__item ${className}`} {...props} ref={ref}>
        {linkName}
        <FaChevronDown
          size={'0.8em'}
          onClick={onChevronClick}
          className="lg-navbar__svg"
        />
      </div>
    )
  }
)

const navDropDownFactory = (to, linkName) =>
  React.forwardRef((props, ref) => {
    return <NavDropDownLink to={to} linkName={linkName} {...props} ref={ref} />
  })
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
      <Popover
        elementAs={React.forwardRef((props, ref) => (
          <Tooltip
            closeOnClick
            ref={ref}
            {...props}
            placement="right"
            text={'Change website theme'}
            className="lg-navbar__item lg-navbar__item--right lg-navbar__item--circular"
          >
            <IoIosColorPalette size={'1.5em'} />
          </Tooltip>
        ))}
      >
        <SketchPicker />
      </Popover>
      <Tooltip
        closeOnClick
        placement="right"
        text={'Change website theme'}
        className="lg-navbar__item lg-navbar__item--right lg-navbar__item--circular"
      >
        <IoIosColorPalette size={'1.5em'} />
      </Tooltip>
    </nav>
  )
}
