import React from 'react'
import { Link } from 'gatsby'
import { FaChevronDown } from 'react-icons/fa'
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
export default function NavBar() {
  return (
    <nav class="lg-navbar">
      <img className={'lg-navbar-img'} src={Logo} />
      <Link href="/" className="lg-navbar-item lg-navbar-header">
        Subesh Bhandari
      </Link>
      <Link href="/blogs" className="lg-navbar-item">
        Blogs <FaChevronDown size={'0.8em'} />
      </Link>
      <Link href="/apps" className="lg-navbar-item">
        Apps <FaChevronDown size={'0.8em'} />
      </Link>
      <Link href="/apps" className="lg-navbar-item">
        Projects <FaChevronDown size={'0.8em'} />
      </Link>
        
    </nav>
  )
}
