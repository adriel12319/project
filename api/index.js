import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default async function handler(req, res) {
  try {
    // Lê o template HTML
    const templatePath = path.join(process.cwd(), 'dist', 'client', 'index.html')
    const templateHtml = fs.readFileSync(templatePath, 'utf-8')

    // Importa e executa o renderizador SSR
    const { render } = await import('../dist/server/entry-server.js')
    const { html: appHtml, helmet } = render()

    // Injeta o HTML renderizado e os metadados
    const finalHtml = templateHtml
      .replace('</head>', `${helmet?.title?.toString()}${helmet?.meta?.toString()}</head>`)
      .replace('<!--app-html-->', appHtml)

    // Define os headers e envia a resposta
    res.setHeader('Content-Type', 'text/html')
    return res.status(200).send(finalHtml)
  } catch (e) {
    console.error(e)
    return res.status(500).send(`Server error: ${e.message}`)
  }
}
