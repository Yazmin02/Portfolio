import 'zone.js/node';
import { join } from 'path';
import { existsSync } from 'fs';
import express from 'express';
import { renderModule } from '@angular/platform-server';
import { AppComponent } from './app/app.component';

const DIST_FOLDER = join(process.cwd(), 'dist/portafolio/browser');

const app = express();

// Servir archivos estáticos
app.get('*.*', express.static(DIST_FOLDER, {
  maxAge: '1y'
}));

// SSR para otras rutas
app.get('*', async (req, res) => {
  const indexHtml = join(DIST_FOLDER, 'index.html');
  try {
    const html = await renderModule(AppComponent, {
      document: existsSync(indexHtml) ? indexHtml : '<app-root></app-root>',
      url: req.url,
    });
    res.send(html);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

const PORT = process.env['PORT'] || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server listo en http://localhost:${PORT}`);
});
