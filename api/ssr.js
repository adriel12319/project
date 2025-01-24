import fs from 'node:fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default async function handler(req, res) {
  try {
    const url = req.url || '/'
    
    // Lê o template HTML
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

    // Lê o manifest para obter o caminho correto do arquivo
    const manifestPath = path.join(__dirname, '../dist/server/.vite/manifest.json')
    const manifestContent = await fs.readFile(manifestPath, 'utf-8')
    const manifest = JSON.parse(manifestContent)

    // Obtém o caminho do arquivo entry-server
    const serverEntryPath = manifest['src/entry-server.tsx'].file
    
    // Importa o arquivo entry-server usando o caminho do manifest
    const { render } = await import(path.join(__dirname, `../dist/server/${serverEntryPath}`))
    
    const { html, helmet } = await render(url)

    // Injeta meta tags e conteúdo SSR
    const finalHtml = template
      .replace('<!--app-head-->', helmet ? helmet.title.toString() + helmet.meta.toString() : '')
      .replace('<!--app-html-->', html)
      
    res.setHeader('Content-Type', 'text/html')
    res.send(finalHtml)

  } catch (e) {
    console.error('SSR Error:', e)
    console.error('Error details:', e.stack)
    res.status(500).send('Server Error')
  }
}