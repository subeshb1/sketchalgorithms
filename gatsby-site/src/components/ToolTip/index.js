import React from 'react'
import { ToggleLayer, Arrow,Transition } from 'react-laag'

export default function Tooltip({ children, text }) {
  return (
    <ToggleLayer
      renderLayer={({ isOpen, layerProps, arrowStyle, layerSide }) => (
        <Transition isOpen={isOpen}>
          {(isOpen, onTransitionEnd) => (
            <div
              ref={layerProps.ref}
              onTransitionEnd={onTransitionEnd}
              className=""
              style={{
                ...layerProps.style,
                backgroundColor: '#000000',
                zIndex:1000,
                color:'white',
                padding:10,
                transition: 'opacity 250ms, transform 250ms',
                opacity: isOpen ? 1 : 0,
                transform: 'scale(' + isOpen ? 1 : 0.5 + ')',
              }}
            >
              Layer{' '}
              <Arrow
                style={arrowStyle}
                layerSide={layerSide}
                backgroundColor="#000000"
                angle={39}
                roundness={0.7}
              />
            </div>
          )}
        </Transition>
      )}
      placement={{
        anchor: 'BOTTOM_CENTER',

        triggerOffset: 19,
      }}
      fixed
      closeOnDisappear="full"
    >
      {({ triggerRef, toggle }) => (
        <button ref={triggerRef} className="toggle-btn" onClick={toggle}>
          Toggle
        </button>
      )}
    </ToggleLayer>
  )
}
