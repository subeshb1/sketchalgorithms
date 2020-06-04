import React from 'react'
import { title } from 'change-case'

export default function SideBar({ seriesElements }) {
  return seriesElements && seriesElements.length ? (
    <div className="blog-left-container">
      {seriesElements.map(element => {
        return <div key={element.title}>{element.title}</div>
      })} 
    </div>
  ) : null
}
