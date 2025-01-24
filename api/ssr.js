import fs from 'node:fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default async function handler(req, res) {
  try {
    // Read HTML template
    const template = await fs.readFile(
      path.join(__dirname, '../dist/client/index.html'),
      'utf-8'
    )

    // Import entry-server directly without manifest
    const { render } = await import('../dist/server/entry-server.js')
    
    const { html, helmet } = await render()

    // Inject meta tags and SSR content
    const finalHtml = template
      .replace('<!--app-head-->', helmet ? helmet.title.toString() + helmet.meta.toString() : '')
      .replace('<!--app-html-->', html)
      
    res.setHeader('Content-Type', 'text/html')
    return res.send(finalHtml)

  } catch (e) {
    console.error('SSR Error:', e)
    console.error('Error details:', e.stack)
    return res.status(500).send(`Server Error: ${e.message}`)
  }
}