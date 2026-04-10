const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/admin/reset', async (req, res) => {
  try {
    const adminKey = req.headers['x-admin-key'];

    if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
      return res.status(401).json({ error: 'Invalid admin key. Access denied.' });
    }

    await db.query('TRUNCATE TABLE user_milestones, logs, users RESTART IDENTITY CASCADE');

    res.json({ message: 'All missions scrubbed. Database reset complete.' });
  } catch (err) {
    console.error('POST /admin/reset error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;
