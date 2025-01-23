import { renderToPipeableStream } from 'react-dom/server'
import { StrictMode } from 'react'
import App from './App'

export function render() {
  return new Promise((resolve) => {
    const stream = renderToPipeableStream(
      <StrictMode>
        <App />
      </StrictMode>,
      {
        bootstrapModules: ['/src/entry-client.tsx'],
        onShellReady() {
          resolve({
            pipe: (res) => stream.pipe(res)
          })
        }
      }
    )
  })
}
