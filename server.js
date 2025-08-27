import 'zone.js/node';
import '@angular/compiler';
import { join } from 'path';
import { existsSync } from 'fs';
import express from 'express';
import { renderApplication } from '@angular/platform-server';
import { isDevMode } from '@angular/core';

const DIST_FOLDER = join(process.cwd(), 'dist/portafolio/browser');
const app = express();

// Servir archivos estáticos
app.get('*.*', express.static(DIST_FOLDER, {
  maxAge: '1y'
}));

// SSR para todas las rutas
app.get('*', async (req, res) => {
  const indexHtml = join(DIST_FOLDER, 'index.html');
  try {
    // Importar el bootstrap dinámicamente
    const { default: bootstrap } = await import('./dist/portafolio/server/main.server.mjs');
    
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
