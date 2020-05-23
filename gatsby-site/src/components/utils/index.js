import React from 'react'

export function If({ condition, children, fallback = null }) {
  return condition ? children : fallback
}
