import React from 'react'
import { Link } from 'gatsby'

export default function NavBar() {
  return <nav class="lg-navbar">
    <Link href="/" className="lg-navbar-item">SketchAlgorithm</Link>
    <Link href="/blogs" className="lg-navbar-item">Blogs</Link>
    <Link href="/apps" className="lg-navbar-item">Apps</Link>
  </nav>
}
