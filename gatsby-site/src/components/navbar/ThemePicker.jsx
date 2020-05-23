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
    '--theme-navbar-box-shadow': '#424653',
  },
]

const variableMap = {
  '--theme-primary-bg': 'Primary BG',
  '--theme-primary-color': 'Primary Color',
  '--theme-secondary-color': 'Secondary Color',
  '--theme-secondary-bg': 'Secondary BG',
  '--theme-primary-hover': 'Primary Hover',
  '--theme-navbar-box-shadow': 'Navbar Shadow',
}

const primaryColors = [
  {
    name: 'Blue',
    variables: {
      '--theme-primary-bg': '#1d5baf',
      '--theme-primary-color': '#000000',
      '--theme-secondary-color': '#ffffff',
      '--theme-secondary-bg': '#000000',
      '--theme-primary-hover': '#3068b7',
      '--theme-navbar-box-shadow': '#131313ab',
    },
  },
  {
    name: 'Red',
    variables: {
      '--theme-primary-bg': '#af1d4c',
      '--theme-primary-color': '#000000',
      '--theme-secondary-color': '#ffffff',
      '--theme-secondary-bg': '#f4f4f4',
      '--theme-primary-hover': '#e4316a96',
      '--theme-navbar-box-shadow': '#131313ab',
    },
  },
  {
    name: 'White',
    variables: {
      '--theme-primary-bg': '#ffffff',
      '--theme-primary-color': '#000000',
      '--theme-secondary-color': '#000000',
      '--theme-secondary-bg': '#f4f4f4',
      '--theme-primary-hover': '#e0e0e096',
      '--theme-navbar-box-shadow': '#c9c9c9ab',
    },
  },
  {
    name: 'Black',
    variables: {
      '--theme-primary-bg': '#2a2c35',
      '--theme-primary-color': '#000000',
      '--theme-secondary-color': '#ffffff',
      '--theme-secondary-bg': '#f4f4f4',
      '--theme-primary-hover': '#424653',
      '--theme-navbar-box-shadow': '#131313ab',
    },
  },
]

const ThemeButton = ({ name, onClick, background }) => (
  <button className="theme-picker__item" onClick={onClick}>
    <div className="theme-picker__object" style={{ background }}></div>
    {name}
  </button>
)
function ThemeChanger() {
  const [primaryColor, setPrimaryColor, remove] = useLocalStorage(
    'color-theme',
    {
      '--theme-primary-bg': '#1d5baf',
      '--theme-primary-color': '#000000',
      '--theme-secondary-color': '#ffffff',
      '--theme-secondary-bg': '#000000',
      '--theme-primary-hover': '#3068b7',
      '--theme-navbar-box-shadow': '#c9c9c9ab',
    }
  )
  useEffect(() => {
    Object.entries(primaryColor).map(([key, value]) => {
      document.documentElement.style.setProperty(key, value)
    })
  }, [primaryColor])
  const [show, setShow] = useState(false)
  return (
    <div className="theme-picker">
      <div className="theme-picker__theme">
        <div className="theme-picker__header">Theme</div>
        <div className="theme-picker__content">
          {themes.map((x, i) => {
            return (
              <div className="theme-picker__item" key={i}>
                <div className="theme-picker__object"></div>
                {x.name}
              </div>
            )
          })}
        </div>
        <div className="theme-picker__header">Primary Colors</div>
        <div className="theme-picker__content">
          {primaryColors.map((x, i) => {
            return (
              <ThemeButton
                key={i}
                onClick={() => setPrimaryColor(x.variables)}
                background={x.variables['--theme-primary-bg']}
                name={x.name}
              />
            )
          })}
        </div>
        <button onClick={() => setShow(!show)}>{!show?"Show more":"Hide"}</button>
        {show &&
          Object.entries(primaryColor).map(([key, value], i) => {
            return (
              <div className="theme-picker__input-group">
                <div className="theme-picker__header">{variableMap[key]}</div>
                <Popover
                  key={i}
                  elementAs="input"
                  value={value}
                  readOnly
                  placement="bottom"
                >
                  <SketchPicker
                    color={value}
                    onChange={color => {
                      setPrimaryColor({
                        ...primaryColor,
                        [key]: color.hex,
                      })
                    }}
                  />
                </Popover>
              </div>
            )
          })}
      </div>
    </div>
  )
}
export default function ThemePicker() {
  return (
    <Popover
      // show
      debug={'EWHATT'}
      elementAs={React.forwardRef((props, ref) => (
        <Tooltip
          elementAs="button"
          closeOnClick
          ref={ref}
          {...props}
          placement="left"
          text={'Change website theme'}
          className="lg-navbar__item lg-navbar__item--right lg-navbar__item--circular"
        >
          <IoIosColorPalette size={'1.5em'} />
        </Tooltip>
      ))}
    >
      <ThemeChanger />
    </Popover>
  )
}
