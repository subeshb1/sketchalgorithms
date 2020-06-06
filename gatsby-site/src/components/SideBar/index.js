import React, { useState } from 'react'
import { Link } from 'gatsby'

const categorizeSeries = series =>
  series.reduce((acc, x) => {
    const key = Math.floor(x.position / 100)
    if (!acc[key]) {
      acc[key] = {
        category: x.category,
        items: [x],
      }
    } else {
      acc[key].items.push(x)
    }
    return acc
  }, [])

export default function SideBar({ seriesElements }) {
  if (!(seriesElements && seriesElements.length)) return null

  const categorizedSeries = categorizeSeries(seriesElements)
  console.log(categorizedSeries)
  return (
    <aside className="blog-sidebar">
      {categorizedSeries.map(elements => {
        return (
          <>
            {elements.category && <div className="blog-sidebar__header">{elements.category}</div>}
            {elements.items.map(element => (
              <Link
                className="blog-sidebar__item"
                key={element.title}
                activeClassName="blog-sidebar__item--active"
                to={element.slug}
              >
                {element.title}
              </Link>
            ))}
          </>
        )
      })}
    </aside>
  )
}
