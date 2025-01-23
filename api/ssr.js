import fs from 'node:fs/promises'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const isProduction = process.env.NODE_ENV === 'production'

async function handleSSR(req, res) {
  try {
    const url = req.url || '/'
    
    let template = ''
    try {
      template = await fs.readFile(
        path.join(process.cwd(), 'dist/client/index.html'),
        'utf-8'
      )
    } catch (e) {
      console.error('Failed to read template:', e)
      res.status(500).send('Error loading template')
      return
    }

    // Get asset manifests
    const manifestPath = path.join(process.cwd(), 'dist/client/manifest.json')
    const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf-8'))
    
    const { render } = await import('../dist/server/entry-server.js')
    const { pipe } = await render(url)
    
    res.setHeader('Content-Type', 'text/html')

    // Insert CSS links
    template = template.replace('<!--app-head-->', `
      <link rel="stylesheet" href="/dist/client/${manifest['src/main.css'].file}">
    `)
    
    const [before, after] = template.split('<!--app-html-->')
    res.write(before)
    await new Promise((resolve) => {
      pipe(res)
      res.on('finish', resolve)
    })
    res.write(after)
    res.end()

  } catch (e) {
    console.error('SSR Error:', e)
    res.status(500).send('Server error')
  }
}

// Express app for development
const app = express()

if (!isProduction) {
  const port = process.env.PORT || 5173
  app.use('*', handleSSR)
  app.listen(port, () => {
    console.log(`Dev server started at http://localhost:${port}`)
  })
}

// Export the handler for Vercel
export default handleSSR
