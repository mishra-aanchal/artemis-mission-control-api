require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '100kb' }));

// Routes
app.use('/', require('./routes/health'));
app.use('/', require('./routes/register'));
app.use('/', require('./routes/mission'));
app.use('/', require('./routes/logs'));
app.use('/', require('./routes/brief'));
app.use('/', require('./routes/leaderboard'));
app.use('/', require('./routes/guide'));
app.use('/', require('./routes/admin'));

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error. Mission Control is investigating.' });
});

// Start
const PORT = process.env.PORT || 3000;

async function start() {
  await db.initDB();
  app.listen(PORT, () => {
    console.log(`🚀 Artemis II Mission Control API running on port ${PORT}`);
  });
}

start().catch(err => {
  console.error('Failed to start:', err);
  process.exit(1);
});
