// custom typefaces
import 'typeface-lora'
import 'typeface-libre-baskerville'
import 'typeface-ibm-plex-mono'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'
import customTheme from './theme'

export const wrapRootElement = ({ element }) => {
  return <ThemeProvider theme={customTheme}>{element}</ThemeProvider>
}
