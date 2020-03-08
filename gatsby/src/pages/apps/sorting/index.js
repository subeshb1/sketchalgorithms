import React, { useState } from 'react'
import BubbleSort from './algo/bubble-sort'

const generateList = (x, n) => {
  switch (n) {
    case 1:
      return new Array(x)
        .fill(1)
        .map((_, i) => ({ height: (i + 1) * 10, y: x * 10 - (i + 1) * 10 }))
    case 2:
      return new Array(x).fill(1).map((_, i) => {
        const k = x - i - 1
        return { height: (k + 1) * 10, y: x * 10 - (k + 1) * 10 }
      })
    case 3:
      let arr = new Array(x).fill(1).map((_, i) => i + 1)
      return new Array(x).fill(1).map((_, i) => {
        let item = Math.floor(Math.random() * arr.length)
        const [height] = arr.splice(item, 1)
        return { height: height * 10, y: x * 10 - height * 10 }
      })
    default:
      return []
  }
}

const DrawBoard = props => {
  const [{ list, swap = [], pivot = [], boundary = [] }, setSettings] = useState(() => ({list:  generateList(100, 3)  }))
  const [result,_] = useState(() =>  new BubbleSort([...list]).sort((a, b) => a.height > b.height))
  
  const requestRef = React.useRef()
  let start = 0
  const animate = time => {
    // The 'state' will always be the initial value here

    if (result.length) {
      const item = result.shift()
      const temp = list[item.payload.pos[0]]
      list[item.payload.pos[0]] = list[item.payload.pos[1]]
      list[item.payload.pos[1]] = temp
      setSettings({
        list,
        pivot: item.payload.pivot,
        boundary: item.payload.boundary || [],
        swap: item.payload.pos || [],
      })
      start++
    }
    requestRef.current = requestAnimationFrame(animate)
  }

  // React.useEffect(() => {
  //   requestRef.current = requestAnimationFrame(animate)
  //   return () => cancelAnimationFrame(requestRef.current)
  // }, []) // Make sure the effect runs only once

  return (
    <div className="drawboard">
      {/* {loading && (
        <div className="logo">
          <img src="/logo.svg" alt="" />
        </div>
      )} */}
      <svg
        preserveAspectRatio="none"
        viewBox={`0 0 ${list.length}0 ${list.length}0`}
      >
        {list.map((x, i) => (
          <rect
          {...x}
          x={i * 10}
          width="10"
          key={x.height}
          fill={
            false
            ? 'green'
            : swap.includes(i)
            ? 'green'
            : pivot === i
            ? 'blue'
            : boundary.includes(i)
                ? 'red'
                : 'black'
            }
          />
        ))}
      </svg>
    </div>
  )
}

export default DrawBoard
