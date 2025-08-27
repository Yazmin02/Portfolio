import 'zone.js/node';
import { join } from 'path';
import { existsSync } from 'fs';
import express from 'express';
import { renderApplication } from '@angular/platform-server';
import bootstrap from './main.server';
import { isDevMode } from '@angular/core';

const DIST_FOLDER = join(process.cwd(), 'dist/portafolio/browser');
const app = express();

// Servir archivos estáticos con MIME types correctos
app.use(express.static(DIST_FOLDER, {
  maxAge: '1y',
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    } else if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));

// SSR para todas las rutas
app.get('*', async (req, res) => {
  const indexHtml = join(DIST_FOLDER, 'index.html');
  try {
    const html = await renderApplication(bootstrap, {
      document: existsSync(indexHtml) ? indexHtml : '<app-root></app-root>',
      url: req.url,
    });
    res.send(html);
  } catch (err) {
    console.error('Error en SSR:', err);
    res.status(500).send(err instanceof Error ? err.message : err);
  }
});

// Solo levantar puerto en desarrollo local
if (isDevMode()) {
  const PORT = Number(process.env['PORT'] || 4000);
  app.listen(PORT, () => {
    console.log(`✅ Server listo en http://localhost:${PORT}`);
  });
}

export default app;
