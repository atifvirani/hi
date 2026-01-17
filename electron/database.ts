import Database from 'better-sqlite3';
import path from 'path';
import { app } from 'electron';

// Save DB in User Data folder (safe from app updates)
const dbPath = path.join(app.getPath('userData'), 'ts_saloon.db');
const db = new Database(dbPath, { verbose: console.log });

// Enable Foreign Keys for data safety
db.pragma('foreign_keys = ON');

export function initDatabase() {
  const schema = `
    -- 1. CLIENTS (The Core)
    CREATE TABLE IF NOT EXISTS clients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT UNIQUE,
      email TEXT,
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- 2. STAFF
    CREATE TABLE IF NOT EXISTS staff (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      role TEXT NOT NULL, -- 'stylist', 'manager'
      phone TEXT,
      is_active BOOLEAN DEFAULT 1
    );

    -- 3. SERVICES (The Menu)
    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT,
      price REAL NOT NULL,
      duration_minutes INTEGER DEFAULT 30,
      description TEXT
    );

    -- 4. CHAIRS (For Tablet Mapping)
    CREATE TABLE IF NOT EXISTS chairs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      label TEXT NOT NULL, -- e.g., "Chair 1", "Wash Station"
      ip_address TEXT, -- To identify which tablet is connected
      status TEXT DEFAULT 'available' -- 'available', 'occupied', 'cleaning'
    );

    -- 5. BILLS & INVOICES
    CREATE TABLE IF NOT EXISTS bills (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_id INTEGER,
      staff_id INTEGER,
      total_amount REAL NOT NULL,
      discount REAL DEFAULT 0,
      final_amount REAL NOT NULL,
      payment_method TEXT, -- 'cash', 'upi', 'card'
      status TEXT DEFAULT 'paid', -- 'paid', 'pending', 'draft'
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(client_id) REFERENCES clients(id),
      FOREIGN KEY(staff_id) REFERENCES staff(id)
    );

    -- 6. BILL ITEMS (Connecting Services to Bills)
    CREATE TABLE IF NOT EXISTS bill_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      bill_id INTEGER NOT NULL,
      service_id INTEGER NOT NULL,
      price_at_time REAL NOT NULL,
      qty INTEGER DEFAULT 1,
      FOREIGN KEY(bill_id) REFERENCES bills(id),
      FOREIGN KEY(service_id) REFERENCES services(id)
    );

    -- 7. APPOINTMENTS / LIVE CHAIR SESSIONS
    CREATE TABLE IF NOT EXISTS sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      chair_id INTEGER,
      client_id INTEGER,
      start_time DATETIME DEFAULT CURRENT_TIMESTAMP,
      end_time DATETIME,
      status TEXT DEFAULT 'active', -- 'active', 'completed'
      FOREIGN KEY(chair_id) REFERENCES chairs(id),
      FOREIGN KEY(client_id) REFERENCES clients(id)
    );
    
    -- 8. SETTINGS (Store GST, Salon Name, etc.)
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT
    );
  `;

  db.exec(schema);
  console.log('✅ Database Foundation Loaded');
}

export default db;
