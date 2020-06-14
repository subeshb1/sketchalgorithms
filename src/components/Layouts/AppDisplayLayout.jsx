import React from 'react'
import { Link } from 'gatsby'

const AppDisplayLayout = React.memo(({ data, category }) => {
  return (
    <div>
      <ul>
        {data.nodes.map((x, i) => {
          return (
            <li key={i}>
              <Link to={x.url}>{x.title}</Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
})

export default AppDisplayLayout
