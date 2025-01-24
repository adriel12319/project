import fs from 'fs'
import path from 'path'
import express from 'express'
import compression from 'compression'
import serveStatic from 'serve-static'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Force production mode for serve command
process.env.NODE_ENV = 'production'
const isProduction = true
const port = process.env.PORT || 5173
const base = process.env.BASE || '/'

async function createServer() {
  const app = express()
  app.use(compression())

  const templateHtml = isProduction
    ? fs.readFileSync('./dist/client/index.html', 'utf-8')
    : ''

  if (isProduction) {
    app.use(base, serveStatic('./dist/client', { index: false }))
  }

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl.replace(base, '')

      let template
      let render
      if (isProduction) {
        template = templateHtml
        const serverEntry = await import('./dist/server/entry-server.js')
        render = serverEntry.render
      } else {
        throw new Error('Development mode not implemented in this example')
      }

      const { html: appHtml, helmet } = render()
      
      const finalHtml = template
        .replace('</head>', `${helmet?.title?.toString()}${helmet?.meta?.toString()}</head>`)
        .replace(`<!--app-html-->`, appHtml)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(finalHtml)
    } catch (e) {
      console.log(e.stack)
      res.status(500).end(e.stack)
    }
  })

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
  })
}

createServer()
