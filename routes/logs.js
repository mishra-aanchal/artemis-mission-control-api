const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const db = require('../db');
const { computeSteps } = require('../milestones');
const { PHASES, CATEGORIES, CREW_MEMBERS } = require('../constants');

// POST /logs
router.post('/logs', auth, async (req, res) => {
  try {
    const { title, description, phase, category, crew_member } = req.body || {};

    if (!title || typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ error: 'Title is required.' });
    }
    if (title.trim().length > 200) {
      return res.status(400).json({ error: 'Title must be 200 characters or fewer.' });
    }
    if (!phase || !PHASES.includes(phase)) {
      return res.status(400).json({ error: `Phase must be one of: ${PHASES.join(', ')}` });
    }
    if (!category || !CATEGORIES.includes(category)) {
      return res.status(400).json({ error: `Category must be one of: ${CATEGORIES.join(', ')}` });
    }
    if (!crew_member || !CREW_MEMBERS.includes(crew_member)) {
      return res.status(400).json({ error: `Crew member must be one of: ${CREW_MEMBERS.join(', ')}` });
    }

    const result = await db.query(
      `INSERT INTO logs (user_id, title, description, phase, category, crew_member)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [req.user.id, title.trim(), description || '', phase, category, crew_member]
    );

    const missionStatus = await computeSteps(req.user.id);

    res.status(201).json({
      message: 'Log entry recorded.',
      log: result.rows[0],
      mission_status: missionStatus,
    });
  } catch (err) {
    console.error('POST /logs error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// GET /logs
router.get('/logs', auth, async (req, res) => {
  try {
    let query = 'SELECT * FROM logs WHERE user_id = $1';
    const params = [req.user.id];
    let paramIndex = 2;

    if (req.query.phase) {
      if (!PHASES.includes(req.query.phase)) {
        return res.status(400).json({ error: 'Invalid phase filter.' });
      }
      query += ` AND phase = $${paramIndex++}`;
      params.push(req.query.phase);
    }
    if (req.query.category) {
      if (!CATEGORIES.includes(req.query.category)) {
        return res.status(400).json({ error: 'Invalid category filter.' });
      }
      query += ` AND category = $${paramIndex++}`;
      params.push(req.query.category);
    }
    if (req.query.crew_member) {
      if (!CREW_MEMBERS.includes(req.query.crew_member)) {
        return res.status(400).json({ error: 'Invalid crew_member filter.' });
      }
      query += ` AND crew_member = $${paramIndex++}`;
      params.push(req.query.crew_member);
    }

    const sortOrder = req.query.sort === 'desc' ? 'DESC' : 'ASC';
    query += ` ORDER BY created_at ${sortOrder}`;

    const result = await db.query(query, params);

    res.json({
      count: result.rows.length,
      logs: result.rows,
    });
  } catch (err) {
    console.error('GET /logs error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// GET /logs/:id
router.get('/logs/:id', auth, async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM logs WHERE id = $1 AND user_id = $2',
      [req.params.id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Log entry not found in mission records.' });
    }

    res.json({ log: result.rows[0] });
  } catch (err) {
    console.error('GET /logs/:id error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// PATCH /logs/:id
router.patch('/logs/:id', auth, async (req, res) => {
  try {
    const existing = await db.query(
      'SELECT * FROM logs WHERE id = $1 AND user_id = $2',
      [req.params.id, req.user.id]
    );

    if (existing.rows.length === 0) {
      return res.status(404).json({ error: 'Log entry not found in mission records.' });
    }

    const body = req.body || {};
    const allowedFields = ['title', 'description', 'phase', 'category', 'crew_member'];
    const hasUpdate = allowedFields.some(f => body[f] !== undefined);

    if (!hasUpdate) {
      return res.status(400).json({ error: 'At least one field must be provided to update.' });
    }

    if (body.title !== undefined && (!body.title || typeof body.title !== 'string' || !body.title.trim())) {
      return res.status(400).json({ error: 'Title must be a non-empty string.' });
    }
    if (body.phase !== undefined && !PHASES.includes(body.phase)) {
      return res.status(400).json({ error: `Phase must be one of: ${PHASES.join(', ')}` });
    }
    if (body.category !== undefined && !CATEGORIES.includes(body.category)) {
      return res.status(400).json({ error: `Category must be one of: ${CATEGORIES.join(', ')}` });
    }
    if (body.crew_member !== undefined && !CREW_MEMBERS.includes(body.crew_member)) {
      return res.status(400).json({ error: `Crew member must be one of: ${CREW_MEMBERS.join(', ')}` });
    }

    const fields = [];
    const values = [];
    let paramIndex = 1;

    if (body.title !== undefined) {
      fields.push(`title = $${paramIndex++}`);
      values.push(body.title.trim());
    }
    if (body.description !== undefined) {
      fields.push(`description = $${paramIndex++}`);
      values.push(body.description);
    }
    if (body.phase !== undefined) {
      fields.push(`phase = $${paramIndex++}`);
      values.push(body.phase);
    }
    if (body.category !== undefined) {
      fields.push(`category = $${paramIndex++}`);
      values.push(body.category);
    }
    if (body.crew_member !== undefined) {
      fields.push(`crew_member = $${paramIndex++}`);
      values.push(body.crew_member);
    }

    fields.push(`updated_at = NOW()`);
    values.push(req.params.id);
    values.push(req.user.id);

    const query = `
      UPDATE logs SET ${fields.join(', ')}
      WHERE id = $${paramIndex++} AND user_id = $${paramIndex++}
      RETURNING *
    `;

    const result = await db.query(query, values);
    const missionStatus = await computeSteps(req.user.id);

    res.json({
      message: 'Log entry updated.',
      log: result.rows[0],
      mission_status: missionStatus,
    });
  } catch (err) {
    console.error('PATCH /logs/:id error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// DELETE /logs/:id
router.delete('/logs/:id', auth, async (req, res) => {
  try {
    const existing = await db.query(
      'SELECT * FROM logs WHERE id = $1 AND user_id = $2',
      [req.params.id, req.user.id]
    );

    if (existing.rows.length === 0) {
      return res.status(404).json({ error: 'Log entry not found in mission records.' });
    }

    const log = existing.rows[0];

    if (log.category === 'anomaly') {
      return res.status(403).json({
        error: 'Anomalies cannot be deleted from the record. Update the log instead.',
      });
    }

    await db.query('DELETE FROM logs WHERE id = $1 AND user_id = $2', [req.params.id, req.user.id]);

    const missionStatus = await computeSteps(req.user.id);

    res.json({
      message: 'Log entry deleted.',
      deleted_log: log,
      mission_status: missionStatus,
    });
  } catch (err) {
    console.error('DELETE /logs/:id error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;
