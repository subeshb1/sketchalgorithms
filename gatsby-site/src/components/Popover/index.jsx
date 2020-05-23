import React, { useState, useRef } from 'react'

import { useClickAway } from 'react-use'
import { usePopper } from 'react-popper'
import { If } from '../utils'
const OPEN = 0
const CLOSE = 1
const OUT_CLOSE = 2
const Popover = React.memo(
  ({
    children,
    text,
    closeOnClick = false,
    className = '',
    placement = 'bottom',
    elementAs = 'div',
    render,
    ...otherProps
  }) => {
    const referenceElement = useRef(null)
    const [popperElement, setPopperElement] = useState(null)
    const { styles, attributes } = usePopper(
      referenceElement && referenceElement.current,
      popperElement,
      {
        placement: placement,
      }
    )
    const [popoverState, setPopoverState] = useState(CLOSE)
    const toggle = () =>
      setPopoverState(
        popoverState === OUT_CLOSE
          ? CLOSE
          : popoverState === CLOSE
          ? OPEN
          : CLOSE
      )
    useClickAway(
      { current: popperElement },
      ({ target }) =>
        referenceElement &&
        popoverState === OPEN &&
        setPopoverState(
          referenceElement.current === target ||
            referenceElement.current.contains(target)
            ? OUT_CLOSE
            : CLOSE
        )
    )
    const As = elementAs

    return (
      <>
        <As
          className={className}
          ref={referenceElement}
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
)
export default Popover
