const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const db = require('../db');
const { generateCallsign } = require('../callsign');
const { generateSigil } = require('../sigil');

router.post('/register', async (req, res) => {
  try {
    const { name, email } = req.body || {};

    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ error: 'Name is required.' });
    }
    if (!email || typeof email !== 'string' || !email.includes('@') || !email.includes('.')) {
      return res.status(400).json({ error: 'A valid email is required.' });
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();

    // Check existing user (idempotent)
    const existing = await db.query(
      'SELECT id, name, email, callsign, api_key FROM users WHERE email = $1',
      [trimmedEmail]
    );

    if (existing.rows.length > 0) {
      const user = existing.rows[0];
      const sigil = generateSigil(user.callsign);

      return res.status(200).json({
        message: 'Mission clearance granted. Welcome aboard, Flight Director.',
        name: user.name,
        email: user.email,
        callsign: user.callsign,
        api_key: user.api_key,
        sigil,
      });
    }

    // Generate unique callsign and API key
    const callsign = await generateCallsign();
    const apiKey = `${callsign}_${crypto.randomUUID()}`;
    const sigil = generateSigil(callsign);

    const result = await db.query(
      `INSERT INTO users (name, email, callsign, api_key)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email, callsign, api_key, created_at`,
      [trimmedName, trimmedEmail, callsign, apiKey]
    );

    const user = result.rows[0];

    res.status(201).json({
      message: 'Mission clearance granted. Welcome aboard, Flight Director.',
      name: user.name,
      email: user.email,
      callsign: user.callsign,
      api_key: user.api_key,
      sigil,
    });
  } catch (err) {
    console.error('POST /register error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;
