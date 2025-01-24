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
      template = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <link rel="icon" type="image/svg+xml" href="/vite.svg" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Vite + React + TS</title>
            <!--app-head-->
            <link rel="stylesheet" href="/dist/client/assets/index.css">
          </head>
          <body>
            <div id="root"><!--app-html--></div>
          </body>
        </html>
      `
    }
    
    const { render } = await import('../dist/server/entry-server.js')
    const { pipe } = await render(url)
    
    res.setHeader('Content-Type', 'text/html')

    // Insert static assets without manifest
    template = template.replace('<!--app-head-->', `
      <link rel="stylesheet" href="/dist/client/assets/index.css">
      <script type="module" src="/dist/client/assets/index.js"></script>
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
