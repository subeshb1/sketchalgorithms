import React, { useState, useRef } from 'react'
import { usePopper } from 'react-popper'
const ToolTip = React.forwardRef(
  (
    {
      children,
      text,
      closeOnClick = false,
      className = '',
      placement = 'bottom',
      elementAs = 'div',
      ...otherProps
    },
    forwardedRef
  ) => {
    const referenceElement = useRef(null)
    const [popperElement, setPopperElement] = useState(null)
    const [arrowElement, setArrowElement] = useState(null)
    const { styles, attributes } = usePopper(
      referenceElement && referenceElement.current,
      popperElement,
      {
        modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
        placement: placement,
      }
    )
    if (forwardedRef && referenceElement && referenceElement.current) {
      forwardedRef.current = referenceElement.current
    }
    const [isOpen, setOpen] = useState(false)
    const open = () => setOpen(true)
    const close = () => setOpen(false)
    const As = elementAs
    return (
      <>
        <As
          className={className}
          ref={referenceElement}
          onMouseEnter={open}
          onMouseDown={() => closeOnClick && close()}
          onMouseLeave={close}
          {...otherProps}
        >
          {children}
        </As>
        {isOpen && (
          <div
            ref={setPopperElement}
            style={{
              ...styles.popper,
              background: 'black',
              color: 'white',
              borderRadius: 4,
              padding: '0px 8px',
              fontSize: 14,
            }}
            {...attributes.popper}
            className="popper-tool-tip"
          >
            {text}
            <div
              ref={setArrowElement}
              style={styles.arrow}
              className="popper-tool-tip__arrow"
            />
          </div>
        )}
      </>
    )
  }
)
export default ToolTip
