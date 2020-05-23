import React, { useState } from 'react'
import Popover from '../Popover'
import Tooltip from '../ToolTip'
import { IoIosColorPalette } from 'react-icons/io'
import { SketchPicker } from 'react-color'
import { useLocalStorage } from 'react-use'
export default function ThemePicker() {
  const [value, setValue, remove] = useLocalStorage('color-theme', {
    '--theme-primary-bg': '#1d5baf',
    '--theme-primary-color': '#000000',
    '--theme-secondary-color': '#ffffff',
    '--theme-secondary-bg': '#000000',
    '--theme-primary-hover': '#3068b7',
    '--theme-navbar-box-shadow': '#484848ab',
  })
  const [color, setColor] = useState(
    '#4b3b9b'
)

  const [change, setchange] = useState(0)

  const themes = [
    {
      '--theme-primary-bg': '#1d5baf',
      '--theme-primary-color': '#000000',
      '--theme-secondary-color': '#ffffff',
      '--theme-secondary-bg': '#000000',
      '--theme-primary-hover': '#3068b7',
      '--theme-navbar-box-shadow': '#484848ab',
    },
    {
      '--theme-primary-bg': '#af1d4c',
      '--theme-primary-color': '#000000',
      '--theme-secondary-color': '#ffffff',
      '--theme-secondary-bg': '#f4f4f4',
      '--theme-primary-hover': '#e4316a96',
      '--theme-navbar-box-shadow': '#838383ab',
    },
    {
      '--theme-primary-bg': '#ffffff',
      '--theme-primary-color': '#000000',
      '--theme-secondary-color': '#000000',
      '--theme-secondary-bg': '#f4f4f4',
      '--theme-primary-hover': '#e0e0e096',
      '--theme-navbar-box-shadow': '#796c6cab',
    },
    {
      '--theme-primary-bg': '#000000',
      '--theme-primary-color': '#000000',
      '--theme-secondary-color': '#ffffff',
      '--theme-secondary-bg': '#f4f4f4',
      '--theme-primary-hover': '#e0e0e096',
      '--theme-navbar-box-shadow': '#796c6cab',
    },
  ]
  return (
    <Popover
      elementAs={React.forwardRef((props, ref) => (
        <Tooltip
          closeOnClick
          ref={ref}
          {...props}
          placement="right"
          text={'Change website theme'}
          className="lg-navbar__item lg-navbar__item--right lg-navbar__item--circular"
        >
          <IoIosColorPalette size={'1.5em'} />
        </Tooltip>
      ))}
    >
      <form>
        <button
        type="button"
          onClick={() => {
            const newTheme = (change + 1) % themes.length
            console.log(value)
            Object.entries(themes[newTheme]).map(([key, value]) => {
              document.documentElement.style.setProperty(key, value)
              console.log()
            })
            setchange(newTheme)
            setValue({
              '--theme-primary-bg': '#af1d4c',
              '--theme-primary-color': '#000000',
              '--theme-secondary-color': '#ffffff',
              '--theme-secondary-bg': '#f4f4f4',
              '--theme-primary-hover': '#e4316a96',
              '--theme-navbar-box-shadow': '#838383ab',
            })
          }}
        >
          Change theme
        </button>
        <Popover elementAs="input" value={color} readOnly >
          <SketchPicker
            color={color}
            onChange={color => {
              setColor(color.hex)
            }}
          />
        </Popover>
      </form>
    </Popover>
  )
}

{
  /* <SketchPicker /> */
}
