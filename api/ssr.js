import fs from 'node:fs/promises'
import express from 'express'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import * as React from 'react'

const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 5173
const base = process.env.BASE || '/'

// Create http server
const app = express()

// Add Vite or respective production middlewares
let vite
if (!isProduction) {
  const { createServer } = await import('vite')
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base,
  })
  app.use(vite.middlewares)
} else {
  const compression = (await import('compression')).default
  const sirv = (await import('sirv')).default
  app.use(compression())
  app.use(base, sirv('./dist/client', { extensions: [] }))
}

app.use('*', async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, '')

    let template
    let render
    
    if (!isProduction) {
      // Development: get template from Vite
      template = await fs.readFile('./index.html', 'utf-8')
      template = await vite.transformIndexHtml(url, template)
      render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render
    } else {
      // Production: use built files
      template = await fs.readFile('./dist/client/index.html', 'utf-8')
      render = (await import('./dist/server/entry-server.js')).render
    }

    const stream = await render(url, {
      onShellReady() {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html')
        
        // Split the template and inject the app HTML
        const [beforeApp, afterApp] = template.split('<!--app-html-->')
        res.write(beforeApp)
        stream.pipe(res)
        res.write(afterApp)
      },
      onShellError(err) {
        console.error(err)
        res.statusCode = 500
        res.send('<!DOCTYPE html><html><body>Server Error</body></html>')
      },
      onError(err) {
        console.error(err)
        stream.abort()
      }
    })
  } catch (e) {
    vite?.ssrFixStacktrace(e)
    console.log(e.stack)
    res.status(500).end(e.stack)
  }
})

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
