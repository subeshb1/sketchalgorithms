// custom typefaces
import 'typeface-lora'
import 'typeface-libre-baskerville'
import 'typeface-ibm-plex-mono'
require('prismjs/plugins/command-line/prism-command-line.css')
import { ThemeProvider, CSSReset } from '@chakra-ui/core'
import customTheme from './theme'

function App({ children }) {
  return (
    <ThemeProvider theme={customTheme}>
      <CSSReset />
      {children}
    </ThemeProvider>
  )
}
// import { wrapRootElement as wrap } from './wrap-root-element'

// export const wrapRootElement = wrap
