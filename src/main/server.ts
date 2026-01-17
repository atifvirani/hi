import express from 'express';
import cors from 'cors';
import ip from 'ip';
import db from './database';

const server = express();
const PORT = 4000; // Tablets will connect to http://YOUR_PC_IP:4000

server.use(cors());
server.use(express.json());

// --- API ROUTES FOR TABLETS ---

// 1. Tablets ping this to say "I'm alive"
server.get('/api/status', (req, res) => {
  res.json({ status: 'online', shop_name: 'TS Saloon', ip: ip.address() });
});

// 2. Get Services (For the Stylist UI)
server.get('/api/services', (req, res) => {
  const services = db.prepare('SELECT * FROM services').all();
  res.json(services);
});

// 3. Stylist starts a session on a chair
server.post('/api/session/start', (req, res) => {
  const { chair_id, client_id } = req.body;
  
  // Logic: Mark chair as occupied in DB
  const stmt = db.prepare('INSERT INTO sessions (chair_id, client_id) VALUES (?, ?)');
  const info = stmt.run(chair_id, client_id || null);
  
  // Update Chair Status
  db.prepare('UPDATE chairs SET status = ? WHERE id = ?').run('occupied', chair_id);

  res.json({ success: true, session_id: info.lastInsertRowid });
});

export function startServer() {
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Tablet Server running at: http://${ip.address()}:${PORT}`);
  });
}