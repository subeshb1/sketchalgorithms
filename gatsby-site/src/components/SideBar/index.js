import React from 'react'
import { Link } from 'gatsby'

export default function SideBar({ seriesElements }) {
  return seriesElements && seriesElements.length ? (
    <aside className="blog-sidebar">
      {seriesElements.map(element => {
        return (
          <div className="blog-sidebar__item" key={element.title}>
            <Link to={element.slug}>{element.title}</Link>
          </div>
        )
      })}
    </aside>
  ) : null
}
