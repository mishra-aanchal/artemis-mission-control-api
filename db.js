const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      callsign TEXT NOT NULL UNIQUE,
      api_key TEXT NOT NULL UNIQUE,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS logs (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      description TEXT DEFAULT '',
      phase TEXT NOT NULL,
      category TEXT NOT NULL,
      crew_member TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS user_milestones (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      milestone TEXT NOT NULL,
      achieved_at TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE(user_id, milestone)
    );

    CREATE INDEX IF NOT EXISTS idx_logs_user_id ON logs(user_id);
    CREATE INDEX IF NOT EXISTS idx_logs_user_phase ON logs(user_id, phase);
    CREATE INDEX IF NOT EXISTS idx_logs_user_category ON logs(user_id, category);
    CREATE INDEX IF NOT EXISTS idx_users_api_key ON users(api_key);
    CREATE INDEX IF NOT EXISTS idx_users_callsign ON users(callsign);
    CREATE INDEX IF NOT EXISTS idx_milestones_user ON user_milestones(user_id);
  `);
}

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
  initDB,
};
