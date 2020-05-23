import React, { useState, useEffect } from 'react'
import Popover from '../Popover'
import Tooltip from '../ToolTip'
import { IoIosColorPalette } from 'react-icons/io'
import { SketchPicker } from 'react-color'
import { useLocalStorage } from 'react-use'

const darkBlue = {
  bg: '#083575',
  color: 'white',
  'box-shadow': '#00193e',
}

const darkRed = {
  bg: '#7a1522',
  color: 'white',
  'box-shadow': '#581019',
}

const themes = [
  {
    '--theme-primary-bg': '#1d5baf',
    '--theme-primary-color': '#000000',
    '--theme-secondary-color': '#ffffff',
    '--theme-secondary-bg': '#000000',
    '--theme-primary-hover': '#3068b7',
    '--theme-navbar-box-shadow': '#131313ab',
  },
  {
    '--theme-primary-bg': '#af1d4c',
    '--theme-primary-color': '#000000',
    '--theme-secondary-color': '#ffffff',
    '--theme-secondary-bg': '#f4f4f4',
    '--theme-primary-hover': '#e4316a96',
    '--theme-navbar-box-shadow': '#131313ab',
  },
  {
    '--theme-primary-bg': '#ffffff',
    '--theme-primary-color': '#000000',
    '--theme-secondary-color': '#000000',
    '--theme-secondary-bg': '#f4f4f4',
    '--theme-primary-hover': '#e0e0e096',
    '--theme-navbar-box-shadow': '#c9c9c9ab',
  },
  {
    '--theme-primary-bg': '#2a2c35',
    '--theme-primary-color': '#000000',
    '--theme-secondary-color': '#ffffff',
    '--theme-secondary-bg': '#f4f4f4',
    '--theme-primary-hover': '#e0e0e096',
    '--theme-navbar-box-shadow': '#131313ab',
  },
]

function ThemeChanger() {
  return (
    <div className="theme-picker">
      <button
        type="button"
        onClick={() => {
          const newTheme = (change + 1) % themes.length
          setchange(newTheme)
          setValue(themes[newTheme])
        }}
      >
        Change theme
      </button>
      <Popover elementAs="input" value={color} readOnly>
        <SketchPicker
          color={color}
          onChange={color => {
            setColor(color.hex)
          }}
        />
      </Popover>
    </div>
  )
}
export default function ThemePicker() {
  const [value, setValue, remove] = useLocalStorage('color-theme', {
    '--theme-primary-bg': '#1d5baf',
    '--theme-primary-color': '#000000',
    '--theme-secondary-color': '#ffffff',
    '--theme-secondary-bg': '#000000',
    '--theme-primary-hover': '#3068b7',
    '--theme-navbar-box-shadow': '#c9c9c9ab',
  })
  const [color, setColor] = useState('#4b3b9b')

  useEffect(() => {
    Object.entries(value).map(([key, value]) => {
      document.documentElement.style.setProperty(key, value)
    })
  }, [value])

  const [change, setchange] = useState(0)

  return (
    <Popover
      elementAs={React.forwardRef((props, ref) => (
        <Tooltip
          closeOnClick
          ref={ref}
          {...props}
          placement="bottom"
          text={'Change website theme'}
          className="lg-navbar__item lg-navbar__item--right lg-navbar__item--circular"
        >
          <IoIosColorPalette size={'1.5em'} />
        </Tooltip>
      ))}
    ></Popover>
  )
}
