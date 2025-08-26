import 'zone.js/node';
import { join } from 'path';
import { existsSync } from 'fs';
import express from 'express';
import { renderApplication } from '@angular/platform-server';
import bootstrap from './main.server';
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

// Solo levantar puerto en producción
if (!isDevMode()) {
  const PORT = Number(process.env['PORT'] || 4001);
  const listenServer = (port: number) => {
    app.listen(port, () => console.log(`Server listo en http://localhost:${port}`))
       .on('error', (err: any) => {
         if (err.code === 'EADDRINUSE') {
           console.warn(`Puerto ${port} ocupado. Intentando en ${port + 1}...`);
           listenServer(port + 1);
         } else {
           throw err;
         }
       });
  };
  listenServer(PORT);
} else {
  console.log('Modo desarrollo: SSR servirá desde Vite HMR, sin abrir puerto manual.');
}
