import { renderToPipeableStream } from 'react-dom/server'
import { StrictMode } from 'react'
import { Helmet } from 'react-helmet'
import App from './App'

export function render() {
  return new Promise((resolve) => {
    let didError = false
    
    const stream = renderToPipeableStream(
      <StrictMode>
        <App />
      </StrictMode>,
      {
        bootstrapModules: ['/dist/client/entry-client.js'],
        onShellReady() {
          const helmet = Helmet.renderStatic()
          resolve({
            pipe: (res) => {
              res.write('<!DOCTYPE html>\n<html')
              res.write(helmet.htmlAttributes.toString())
              res.write('><head>')
              res.write(helmet.title.toString())
              res.write(helmet.meta.toString())
              res.write(helmet.link.toString())
              stream.pipe(res)
            }
          })
        },
        onError(err) {
          didError = true
          console.error(err)
        }
      }
    )
  })
}
