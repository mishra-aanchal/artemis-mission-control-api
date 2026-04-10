const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const db = require('../db');
const { computeSteps } = require('../milestones');
const { PHASES, CATEGORIES, CREW_DISPLAY } = require('../constants');

router.post('/mission/brief', auth, async (req, res) => {
  try {
    const { phase } = req.body || {};

    if (phase !== undefined && !PHASES.includes(phase)) {
      return res.status(400).json({ error: `Phase must be one of: ${PHASES.join(', ')}` });
    }

    const phaseFilter = phase ? ' AND phase = $2' : '';
    const baseParams = phase ? [req.user.id, phase] : [req.user.id];

    const [logsResult, categoriesUsed, crewWorkload] = await Promise.all([
      db.query(
        `SELECT COUNT(*) as count FROM logs WHERE user_id = $1${phaseFilter}`,
        baseParams
      ),
      db.query(
        `SELECT category, COUNT(*) as count FROM logs WHERE user_id = $1${phaseFilter} GROUP BY category`,
        baseParams
      ),
      db.query(
        `SELECT crew_member, COUNT(*) as count FROM logs WHERE user_id = $1${phaseFilter} GROUP BY crew_member`,
        baseParams
      ),
    ]);

    const totalLogs = parseInt(logsResult.rows[0].count);

    const categories = {};
    for (const row of categoriesUsed.rows) categories[row.category] = parseInt(row.count);

    const crew = {};
    for (const row of crewWorkload.rows) {
      const display = CREW_DISPLAY[row.crew_member];
      crew[row.crew_member] = { name: display?.name || row.crew_member, count: parseInt(row.count) };
    }

    // Simple recommendations
    const recommendations = [];

    const unusedCategories = CATEGORIES.filter(c => !categories[c]);
    if (unusedCategories.length > 0) {
      recommendations.push(`No logs for: ${unusedCategories.join(', ')} — consider logging these areas`);
    }

    if (categories['anomaly'] && categories['anomaly'] > 0) {
      recommendations.push(`${categories['anomaly']} anomaly log(s) recorded — remember, anomalies cannot be deleted`);
    }

    if (totalLogs < 5) {
      recommendations.push(`${totalLogs}/5 logs created — you need 5 to complete your mission`);
    }

    // Record milestone
    await db.query(
      `INSERT INTO user_milestones (user_id, milestone)
       VALUES ($1, 'used_mission_brief')
       ON CONFLICT (user_id, milestone) DO NOTHING`,
      [req.user.id]
    );

    const missionStatus = await computeSteps(req.user.id);

    res.json({
      briefing: {
        phase: phase || 'all',
        total_logs: totalLogs,
        categories,
        crew,
        recommendations,
      },
      mission_status: missionStatus,
    });
  } catch (err) {
    console.error('POST /mission/brief error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;
