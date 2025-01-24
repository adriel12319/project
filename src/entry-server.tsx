import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'

export function render(url: string) {
  const helmetContext = {}

  const html = ReactDOMServer.renderToString(
    <HelmetProvider context={helmetContext}>
      <App />
    </HelmetProvider>
  )

  return {
    html,
    helmet: helmetContext.helmet
  }
}
