import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const template = fs.readFileSync(path.resolve(__dirname, '../dist/client/index.html'), 'utf-8');
const ssrManifest = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../dist/client/ssr-manifest.json'), 'utf-8'));

export default async function handler(req, res) {
  try {
    const { render } = await import('../dist/server/entry-server.js');
    const { html: appHtml, helmet } = await render(req.url);
    
    const html = template
      .replace(`<div id="root"></div>`, `<div id="root">${appHtml}</div>`)
      .replace('</head>', `${helmet.title.toString()}${helmet.meta.toString()}</head>`);

    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(html);
  } catch (e) {
    console.error(e);
    return res.status(500).send('Internal Server Error');
  }
}
