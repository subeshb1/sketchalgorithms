import React from 'react'
import { Link } from 'gatsby'
import { FaChevronDown } from 'react-icons/fa'
import { IoIosColorPalette } from 'react-icons/io'
import Logo from '../../assets/logo.png'
import Tooltip from '../ToolTip'
// import {
//   Popover,
//   PopoverTrigger,
//   PopoverContent,
//   PopoverHeader,
//   PopoverBody,
//   PopoverFooter,
//   PopoverArrow,
//   PopoverCloseButton,
//   Button
// } from "@chakra-ui/core";

const NabDropDownLink = ({
  onChevronClick = () => {},
  onHover = () => {},
  to,
  linkName,
}) => {
  return (
    <div className="lg-navbar__item" onHover={onHover}>
      <Link to={to}>{linkName}</Link>
      <FaChevronDown size={'0.8em'} onClick={onChevronClick} className="lg-navbar__svg"/>
    </div>
  )
}
export default function NavBar() {
  return (
    <nav className="lg-navbar">
      <img className={'lg-navbar-img'} src={Logo} />
      <Link to="/" className="lg-navbar__item lg-navbar__header">
        Subesh Bhandari
      </Link>
      <NabDropDownLink
        to="/blog"
        onChevronClick={() => alert('Blog')}
        linkName="Blog"
      />
      <NabDropDownLink
        to="/apps"
        onChevronClick={() => alert('Apps')}
        linkName="Apps"
      />
      <NabDropDownLink
        to="/projects"
        onChevronClick={() => alert('Projects')}
        linkName="Projects"
      />
      <div className="lg-navbar__item lg-navbar__item--right lg-navbar__item--circular ">
        <IoIosColorPalette size={'1.5em'} />
      </div>
    </nav>
  )
}
