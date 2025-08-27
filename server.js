import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const PORT = process.env.PORT || 4000;
const __dirname = dirname(fileURLToPath(import.meta.url));

const DIST_FOLDER = join(__dirname, 'dist/portafolio/browser');
const SERVER_FOLDER = join(__dirname, 'dist/portafolio/server');

const app = express();

// Servir assets estáticos
app.use(express.static(DIST_FOLDER, { maxAge: '1y' }));

// SSR para todas las demás rutas
app.get('*', async (req, res) => {
  try {
    // Importar el bundle del servidor dinámicamente
    const { AppServerModuleNgFactory, renderModule } = await import(
      join(SERVER_FOLDER, 'main.server.mjs')
    );
    
    const html = await renderModule(AppServerModuleNgFactory, { 
      url: req.url,
      documentFilePath: join(DIST_FOLDER, 'index.html')
    });
    
    res.status(200).send(html);
  } catch (err) {
    console.error('Error en SSR:', err);
    
    // Fallback: servir el index.html si SSR falla
    try {
      const indexPath = join(DIST_FOLDER, 'index.html');
      res.sendFile(indexPath);
    } catch (fallbackErr) {
      console.error('Error en fallback:', fallbackErr);
      res.status(500).send('Error interno del servidor');
    }
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server listo en http://localhost:${PORT}`);
});
