const db = require('./db');

const STEP_DEFINITIONS = [
  { step: 1, phase: 'launch', label: 'Launch' },
  { step: 2, phase: 'orbit', label: 'Earth Orbit' },
  { step: 3, phase: 'transit', label: 'Transit' },
  { step: 4, phase: 'flyby', label: 'Lunar Flyby' },
  { step: 5, phase: 'splashdown', label: 'Splashdown' },
];

async function computeSteps(userId) {
  const [logStats, updatedLogs, milestones] = await Promise.all([
    db.query(
      'SELECT COUNT(*) as total_logs, COUNT(DISTINCT category) as num_categories FROM logs WHERE user_id = $1',
      [userId]
    ),
    db.query(
      'SELECT COUNT(*) as count FROM logs WHERE user_id = $1 AND updated_at > created_at',
      [userId]
    ),
    db.query(
      'SELECT milestone FROM user_milestones WHERE user_id = $1',
      [userId]
    ),
  ]);

  const totalLogs = parseInt(logStats.rows[0].total_logs);
  const numCategories = parseInt(logStats.rows[0].num_categories);
  const hasUpdated = parseInt(updatedLogs.rows[0].count) > 0;
  const milestoneSet = new Set(milestones.rows.map(r => r.milestone));

  if (!milestoneSet.has('3_logs_created') && totalLogs >= 3 && numCategories >= 2) {
    await db.query('INSERT INTO user_milestones (user_id, milestone) VALUES ($1, $2) ON CONFLICT DO NOTHING', [userId, '3_logs_created']);
    milestoneSet.add('3_logs_created');
  }

  if (!milestoneSet.has('1_log_updated') && hasUpdated) {
    await db.query('INSERT INTO user_milestones (user_id, milestone) VALUES ($1, $2) ON CONFLICT DO NOTHING', [userId, '1_log_updated']);
    milestoneSet.add('1_log_updated');
  }

  // Steps are sequential
  const checks = [
    true,                                    // Step 1: Registration
    milestoneSet.has('3_logs_created'),      // Step 2: 3 logs created (at least 2 categories)
    milestoneSet.has('1_log_updated'),       // Step 3: Update a log
    milestoneSet.has('deleted_log'),         // Step 4: Delete a log
    milestoneSet.has('used_mission_brief'),  // Step 5: Get a mission briefing
  ];

  let stepsCompleted = 0;
  const steps = STEP_DEFINITIONS.map((def, i) => {
    const completed = i <= stepsCompleted && checks[i];
    if (completed) stepsCompleted = i + 1;
    return { ...def, completed };
  });

  return {
    current_step: stepsCompleted,
    current_phase: stepsCompleted > 0 ? STEP_DEFINITIONS[stepsCompleted - 1].phase : 'pre-launch',
    steps_completed: stepsCompleted,
    total_steps: 5,
    steps,
    completion_percentage: Math.round((stepsCompleted / 5) * 1000) / 10,
  };
}

async function computeStepsBatch() {
  const [logStats, updatedLogs, milestones, users] = await Promise.all([
    db.query(
      'SELECT user_id, COUNT(*) as total_logs, COUNT(DISTINCT category) as num_categories FROM logs GROUP BY user_id'
    ),
    db.query(
      'SELECT user_id, COUNT(*) as count FROM logs WHERE updated_at > created_at GROUP BY user_id'
    ),
    db.query('SELECT user_id, milestone FROM user_milestones'),
    db.query('SELECT id, name, callsign, created_at FROM users ORDER BY created_at'),
  ]);

  const statsMap = {};
  const categoriesMap = {};
  for (const row of logStats.rows) {
    statsMap[row.user_id] = parseInt(row.total_logs);
    categoriesMap[row.user_id] = parseInt(row.num_categories);
  }

  const updatedMap = {};
  for (const row of updatedLogs.rows) updatedMap[row.user_id] = parseInt(row.count);

  const milestoneMap = {};
  for (const row of milestones.rows) {
    if (!milestoneMap[row.user_id]) milestoneMap[row.user_id] = new Set();
    milestoneMap[row.user_id].add(row.milestone);
  }

  return users.rows.map(user => {
    const totalLogs = statsMap[user.id] || 0;
    const numCategories = categoriesMap[user.id] || 0;
    const hasUpdated = (updatedMap[user.id] || 0) > 0;
    const ms = milestoneMap[user.id] || new Set();

    const checks = [
      true,
      ms.has('3_logs_created'),
      ms.has('1_log_updated'),
      ms.has('deleted_log'),
      ms.has('used_mission_brief'),
    ];

    let stepsCompleted = 0;
    const steps = STEP_DEFINITIONS.map((def, i) => {
      const completed = i <= stepsCompleted && checks[i];
      if (completed) stepsCompleted = i + 1;
      return { ...def, completed };
    });

    return {
      user,
      mission_status: {
        current_step: stepsCompleted,
        current_phase: stepsCompleted > 0 ? STEP_DEFINITIONS[stepsCompleted - 1].phase : 'pre-launch',
        steps_completed: stepsCompleted,
        total_steps: 5,
        steps,
        completion_percentage: Math.round((stepsCompleted / 5) * 1000) / 10,
      },
    };
  });
}

module.exports = { computeSteps, computeStepsBatch, STEP_DEFINITIONS };
