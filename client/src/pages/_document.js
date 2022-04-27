import * as React from "react"
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import { ColorModeScript } from '@chakra-ui/react'
import {Provider} from 'react-redux'
import {store} from '../store/store.js'
export default class Document extends NextDocument {
  render() {
    return (
      <Provider store={store}>
      <Html>
        <Head />
        <body>
          {/* Make Color mode to persists when you refresh the page. */}
          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
      </Provider>
    )
  }
}
