const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const db = require('../db');
const { computeSteps } = require('../milestones');
const { generateSigil } = require('../sigil');
const { CREW_DISPLAY } = require('../constants');
const { renderMissionDashboard } = require('../templates/mission-dashboard');
const { renderDebrief, renderDebriefError } = require('../templates/debrief');

async function getMissionStats(userId) {
  const [categories, crew, totalResult] = await Promise.all([
    db.query('SELECT category, COUNT(*) as count FROM logs WHERE user_id = $1 GROUP BY category', [userId]),
    db.query('SELECT crew_member, COUNT(*) as count FROM logs WHERE user_id = $1 GROUP BY crew_member', [userId]),
    db.query('SELECT COUNT(*) as count FROM logs WHERE user_id = $1', [userId]),
  ]);

  return {
    categories: categories.rows.map(r => ({ category: r.category, count: parseInt(r.count) })),
    crew: crew.rows.map(r => ({ crew_member: r.crew_member, count: parseInt(r.count) })),
    totalLogs: parseInt(totalResult.rows[0].count),
  };
}

// GET /mission
router.get('/mission', auth, async (req, res) => {
  try {
    const [missionStatus, stats] = await Promise.all([
      computeSteps(req.user.id),
      getMissionStats(req.user.id),
    ]);

    const sigil = generateSigil(req.user.callsign);

    // Content negotiation
    if (req.headers.accept && req.headers.accept.includes('text/html')) {
      const html = renderMissionDashboard({
        user: req.user,
        sigil,
        missionStatus,
        stats,
      });
      return res.type('html').send(html);
    }

    res.json({
      callsign: req.user.callsign,
      name: req.user.name,
      sigil,
      mission_status: missionStatus,
      crew_roster: CREW_DISPLAY,
      stats,
    });
  } catch (err) {
    console.error('GET /mission error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// GET /mission/debrief
router.get('/mission/debrief', async (req, res) => {
  try {
    const apiKey = req.query.api_key;

    if (!apiKey) {
      return res.type('html').send(renderDebriefError());
    }

    const result = await db.query(
      'SELECT id, name, email, callsign FROM users WHERE api_key = $1',
      [apiKey]
    );

    if (result.rows.length === 0) {
      return res.type('html').send(renderDebriefError());
    }

    const user = result.rows[0];
    const [missionStatus, stats] = await Promise.all([
      computeSteps(user.id),
      getMissionStats(user.id),
    ]);

    const sigil = generateSigil(user.callsign);

    const html = renderDebrief({ user, sigil, missionStatus, stats });
    res.type('html').send(html);
  } catch (err) {
    console.error('GET /mission/debrief error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;
