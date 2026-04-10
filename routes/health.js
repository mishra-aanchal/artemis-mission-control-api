const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/health', async (req, res) => {
  try {
    await db.query('SELECT 1');
    res.json({
      status: 'ok',
      mission: 'Artemis II Mission Control API',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    });
  } catch (err) {
    res.status(503).json({
      status: 'degraded',
      database: 'unreachable',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    });
  }
});

module.exports = router;
