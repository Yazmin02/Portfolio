import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const PORT = process.env.PORT || 4000;
const __dirname = dirname(fileURLToPath(import.meta.url));

const DIST_FOLDER = join(__dirname, 'dist/portafolio/browser');
const SERVER_FOLDER = join(__dirname, 'dist/portafolio/server');

// Importar bundle del servidor
const { AppServerModuleNgFactory, renderModule } = await import(
  pathToFileURL(join(SERVER_FOLDER, 'main.server.mjs')).href
);

const app = express();

// Servir assets estáticos
app.use(express.static(DIST_FOLDER, { maxAge: '1y' }));

// SSR para todas las demás rutas
app.get('*', async (req, res) => {
  try {
    const html = await renderModule(AppServerModuleNgFactory, { url: req.url });
    res.status(200).send(html);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server listo en http://localhost:${PORT}`);
});
