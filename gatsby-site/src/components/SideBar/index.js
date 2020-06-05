import React from 'react'
import { title } from 'change-case'

export default function SideBar({ seriesElements }) {
  return seriesElements && seriesElements.length ? (
    <div className="blog-sidebar">
      {seriesElements.map(element => {
        return (
          <div className="blog-sidebar__item" key={element.title}>
            {element.title}
          </div>
        )
      })}
    </div>
  ) : null
}
