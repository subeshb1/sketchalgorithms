// custom typefaces
import 'typeface-lora'
import 'typeface-libre-baskerville'
import 'typeface-ibm-plex-mono'

import { Provider } from 'react-redux'
import React from 'react'
import store from './src/app/store'

export const wrapRootElement = ({ element }) => {
  return <Provider store={store()}>{element}</Provider>
}
