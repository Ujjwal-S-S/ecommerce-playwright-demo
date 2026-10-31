import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

export function createServer() {
  return http.createServer((req, res) => {
    // Health check endpoint
    if (req.url === '/health') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'ok', uptime: process.uptime() }));
      return;
    }

    // Serve CSS
    if (req.url === '/app.css') {
      const cssPath = path.join(publicDir, 'app.css');
      if (fs.existsSync(cssPath)) {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.end(fs.readFileSync(cssPath, 'utf8'));
        return;
      }
    }

    // Serve HTML
    const indexPath = path.join(publicDir, 'index.html');
    if (fs.existsSync(indexPath)) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(fs.readFileSync(indexPath, 'utf8'));
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  });
}

// Start server
const server = createServer();
server.listen(PORT, () => {
  console.log(`[QuickShop] Server running at http://localhost:${PORT}`);
});
