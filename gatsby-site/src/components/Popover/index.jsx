import React, { useState } from 'react'

import { useClickAway } from 'react-use'
import { usePopper } from 'react-popper'
import { If } from '../utils'
const OPEN = 0
const CLOSE = 1
const OUT_CLOSE = 2
const Popover = ({
  children,
  text,
  closeOnClick = false,
  className = '',
  placement = 'bottom',
  elementAs = 'div',
  render,
  ...otherProps
}) => {
  const [referenceElement, setReferenceElement] = useState(null)
  const [popperElement, setPopperElement] = useState(null)
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: placement,
  })
  const [popoverState, setPopoverState] = useState(CLOSE)
  const toggle = () =>
    setPopoverState(
      popoverState === OUT_CLOSE ? CLOSE : popoverState === CLOSE ? OPEN : CLOSE
    )
  useClickAway(
    { current: popperElement },
    ({ target }) =>
      popoverState === OPEN &&
      setPopoverState(
        referenceElement === target || referenceElement.contains(target)
          ? OUT_CLOSE
          : CLOSE
      )
  )
  const As = elementAs
  console.log(popoverState === OPEN ? 'block' : 'none', popoverState)

  return (
    <>
      <As
        className={className}
        ref={setReferenceElement}
        onClick={toggle}
        {...otherProps}
      >
        {render}
      </As>

      <If condition={popoverState === OPEN}>
        <div
          ref={setPopperElement}
          style={{
            ...styles.popper,
          }}
          {...attributes.popper}
          // className="popper-tool-tip"
        >
          {children}
        </div>
      </If>
    </>
  )
}
export default Popover
