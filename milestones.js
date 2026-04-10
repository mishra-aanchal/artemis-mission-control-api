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
      'SELECT COUNT(*) as total_logs FROM logs WHERE user_id = $1',
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
  const hasUpdated = parseInt(updatedLogs.rows[0].count) > 0;
  const milestoneSet = new Set(milestones.rows.map(r => r.milestone));

  // Steps are sequential
  const checks = [
    true,                                    // Step 1: Registration
    totalLogs >= 1,                          // Step 2: Create a log
    hasUpdated,                              // Step 3: Update a log
    milestoneSet.has('used_mission_brief'),  // Step 4: Get a mission briefing
    totalLogs >= 5,                          // Step 5: Have 5+ total logs
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
      'SELECT user_id, COUNT(*) as total_logs FROM logs GROUP BY user_id'
    ),
    db.query(
      'SELECT user_id, COUNT(*) as count FROM logs WHERE updated_at > created_at GROUP BY user_id'
    ),
    db.query('SELECT user_id, milestone FROM user_milestones'),
    db.query('SELECT id, name, callsign, created_at FROM users ORDER BY created_at'),
  ]);

  const statsMap = {};
  for (const row of logStats.rows) statsMap[row.user_id] = parseInt(row.total_logs);

  const updatedMap = {};
  for (const row of updatedLogs.rows) updatedMap[row.user_id] = parseInt(row.count);

  const milestoneMap = {};
  for (const row of milestones.rows) {
    if (!milestoneMap[row.user_id]) milestoneMap[row.user_id] = new Set();
    milestoneMap[row.user_id].add(row.milestone);
  }

  return users.rows.map(user => {
    const totalLogs = statsMap[user.id] || 0;
    const hasUpdated = (updatedMap[user.id] || 0) > 0;
    const ms = milestoneMap[user.id] || new Set();

    const checks = [
      true,
      totalLogs >= 1,
      hasUpdated,
      ms.has('used_mission_brief'),
      totalLogs >= 5,
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
