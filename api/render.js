import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default async function handler(req, res) {
  try {
    const templateHtml = fs.readFileSync(
      path.join(__dirname, '../dist/client/index.html'),
      'utf-8'
    )

    const { render } = await import('../dist/server/entry-server.js')
    const { html: appHtml, helmet } = render()

    const finalHtml = templateHtml
      .replace('</head>', `${helmet?.title?.toString()}${helmet?.meta?.toString()}</head>`)
      .replace(`<!--app-html-->`, appHtml)

    res.setHeader('Content-Type', 'text/html')
    return res.status(200).send(finalHtml)
  } catch (e) {
    console.log(e.stack)
    return res.status(500).send(e.stack)
  }
}
