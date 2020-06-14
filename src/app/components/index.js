import React from 'react'
import { Match, Link } from '@reach/router'
export { default as Menu } from './menu'
export { default as Head } from './head'

export const NavLink = ({ to, className = '', ...props }) => {
  return (
    <Match path={to}>
      {({ match }) => (
        <Link
          className={match ? className + ' active' : className}
          to={to}
          {...props}
        />
      )}
    </Match>
  )
}
