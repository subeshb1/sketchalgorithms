import React from 'react'
import { Link } from 'gatsby'

export function NextBlog({ previousNode, nextNode, series, current }) {
  let previous, next
  if (series && series.length) {
    const currentBlogIndex = series.findIndex(x => x.slug == current)
    if (currentBlogIndex !== -1) {
      next = series[currentBlogIndex + 1]
      previous = series[currentBlogIndex - 1]
    }
  } else {
    previousNode &&
      (previous = {
        slug: previousNode.fields.slug,
        title: previousNode.frontmatter.title,
      })
    nextNode &&
      (previous = {
        slug: nextNode.fields.slug,
        title: nextNode.frontmatter.title,
      })
  }
  return (
    <ul
      style={{
        display: `flex`,
        flexWrap: `wrap`,
        justifyContent: `space-between`,
        listStyle: `none`,
        padding: 0,
      }}
    >
      <li>
        {previous && (
          <Link to={previous.slug} rel="prev">
            ← {previous.title}
          </Link>
        )}
      </li>
      <li>
        {next && (
          <Link to={next.slug} rel="next">
            {next.title} →
          </Link>
        )}
      </li>
    </ul>
  )
}
