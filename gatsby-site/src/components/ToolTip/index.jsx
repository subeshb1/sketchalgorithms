import React, { useState } from 'react'
import { usePopper } from 'react-popper'
const ToolTip = ({
  children,
  text,
  closeOnClick = false,
  className = '',
  placement = 'bottom',
  elementAs = 'div',
  ...otherProps
}) => {
  const [referenceElement, setReferenceElement] = useState(null)
  const [popperElement, setPopperElement] = useState(null)
  const [arrowElement, setArrowElement] = useState(null)
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
    placement: placement,
  })
  const [isOpen, setOpen] = useState(false)
  const open = () => setOpen(true)
  const close = () => setOpen(false)
  const As = elementAs
  return (
    <>
      <As
        className={className}
        ref={setReferenceElement}
        onMouseEnter={open}
        onMouseLeave={close}
        onClick={() => closeOnClick && close()}
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
export default ToolTip
