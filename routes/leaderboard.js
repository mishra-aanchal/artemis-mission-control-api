const express = require('express');
const router = express.Router();
const { computeStepsBatch } = require('../milestones');
const { renderLeaderboard } = require('../templates/leaderboard');

router.get('/leaderboard', async (req, res) => {
  try {
    const entries = await computeStepsBatch();

    // Sort by current_step DESC, then created_at ASC
    entries.sort((a, b) => {
      if (b.mission_status.current_step !== a.mission_status.current_step) {
        return b.mission_status.current_step - a.mission_status.current_step;
      }
      return new Date(a.user.created_at) - new Date(b.user.created_at);
    });

    // Content negotiation
    if (req.headers.accept && req.headers.accept.includes('text/html')) {
      const html = renderLeaderboard(entries);
      return res.type('html').send(html);
    }

    res.json({
      count: entries.length,
      leaderboard: entries.map((e, i) => ({
        rank: i + 1,
        callsign: e.user.callsign,
        name: e.user.name,
        mission_status: e.mission_status,
      })),
    });
  } catch (err) {
    console.error('GET /leaderboard error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;
