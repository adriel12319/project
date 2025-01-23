import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import compression from 'compression';
import serveStatic from 'serve-static';
import { createServer as createViteServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3000;

async function createServer() {
  const app = express();
  app.use(compression());

  // Serve static files from client build
  app.use('/assets', express.static(path.resolve(__dirname, 'dist/client/assets')));

  let vite;
  if (!isProduction) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    app.use(vite.middlewares);
  } else {
    app.use(serveStatic(path.resolve(__dirname, 'dist/client')));
  }

  app.use('*', async (req, res) => {
    const url = req.originalUrl;
    try {
      let template;
      let render;

      if (!isProduction) {
        template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render;
      } else {
        template = fs.readFileSync(
          path.resolve(__dirname, 'dist/client/index.html'),
          'utf-8'
        );
        render = (await import('./dist/server/entry-server.js')).render;
      }

      const { html: appHtml, helmet } = await render(url);
      
      const html = template
        .replace(`<div id="root"></div>`, `<div id="root">${appHtml}</div>`)
        .replace('</head>', `${helmet.title.toString()}${helmet.meta.toString()}</head>`);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      if (!isProduction) {
        vite.ssrFixStacktrace(e);
      }
      console.error(e);
      res.status(500).end(e.message);
    }
  });

  if (!isProduction) {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  }

  return app;
}

// For Vercel deployment
if (isProduction) {
  createServer().then(app => {
    module.exports = app;
  });
} else {
  createServer();
}