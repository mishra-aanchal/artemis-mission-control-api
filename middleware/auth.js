const db = require('../db');

async function authenticate(req, res, next) {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    return res.status(401).json({
      error: 'Missing API key. Register at POST /register to get your mission clearance.',
    });
  }

  try {
    const result = await db.query(
      'SELECT id, name, email, callsign FROM users WHERE api_key = $1',
      [apiKey]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid API key. Clearance denied.' });
    }

    req.user = result.rows[0];
    next();
  } catch (err) {
    console.error('Auth error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
}

module.exports = authenticate;
