import fs from 'node:fs/promises'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const isProduction = process.env.NODE_ENV === 'production'

// Initialize express app
const app = express()

// Serverless function handler
export default async function handler(req, res) {
  try {
    const url = req.url || '/'
    
    // In production on Vercel, use relative paths
    const template = await fs.readFile(
      path.join(__dirname, '../dist/client/index.html'),
      'utf-8'
    )
    
    const { render } = await import(
      path.join(__dirname, '../dist/server/entry-server.js')
    )
    
    const { pipe } = await render(url)
    
    res.setHeader('Content-Type', 'text/html')
    
    const [before, after] = template.split('<!--app-html-->')
    res.write(before)
    await new Promise((resolve) => {
      pipe(res)
      res.on('finish', resolve)
    })
    res.write(after)
    res.end()

  } catch (e) {
    console.error(e.stack)
    res.status(500).end(e.stack)
  }
}

// Only start server in development
if (!isProduction) {
  const port = process.env.PORT || 5173
  app.listen(port, () => {
    console.log(`Dev server started at http://localhost:${port}`)
  })
}
