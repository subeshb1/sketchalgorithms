import React from 'react'
import { Link } from 'gatsby'

export default function SideBar({ seriesElements }) {
  return seriesElements && seriesElements.length ? (
    <aside className="blog-sidebar">
      {seriesElements.map(element => {
        return (
          <Link
            className="blog-sidebar__item"
            key={element.title}
            activeClassName="blog-sidebar__item--active"
            to={element.slug}
          >
            {element.title}
          </Link>
        )
      })}
    </aside>
  ) : null
}
