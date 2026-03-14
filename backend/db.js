const Database = require("better-sqlite3");
const path = require("path");

const db = new Database(path.join(__dirname, "shading.db"));

// Auto-create table on startup
db.exec(`
  CREATE TABLE IF NOT EXISTS problems (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question TEXT NOT NULL,
    correct_count INTEGER NOT NULL,
    explanation TEXT DEFAULT '',
    color TEXT DEFAULT '#4ade80',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

console.log("SQLite connected — shading.db ready");

module.exports = db;