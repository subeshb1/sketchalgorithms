import Typography from 'typography'

const typography = new Typography({
  baseFontSize: '18px',
  baseLineHeight: '1.5em',
  headerFontFamily: [
    "Lora", "Libre Baskerville", "serif"
  ],
  bodyFontFamily: ['Libre Baskerville', 'serif'],
})

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
