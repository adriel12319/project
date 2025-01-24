import fs from 'node:fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default async function handler(req, res) {
  try {
    const url = req.url || '/'
    
    let template
    try {
      template = await fs.readFile(
        path.join(__dirname, '../dist/client/index.html'),
        'utf-8'
      )
    } catch (e) {
      console.error('Template read error:', e)
      res.status(500).send('Failed to load template')
      return
    }

    const { render } = await import('../dist/server/entry-server.js')
    const { html, helmet } = await render(url)

    // Inject meta tags and SSR content
    const finalHtml = template
      .replace('<!--app-head-->', helmet ? helmet.title.toString() + helmet.meta.toString() : '')
      .replace('<!--app-html-->', html)
      
    res.setHeader('Content-Type', 'text/html')
    res.send(finalHtml)

  } catch (e) {
    console.error('SSR Error:', e)
    res.status(500).send('Server Error')
  }
}
