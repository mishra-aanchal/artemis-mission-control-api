const { getBaseCSS, getTrajectoryPath, getProgressBar, getStepChecklist } = require('./shared');
const { CREW_DISPLAY } = require('../constants');

function renderMissionDashboard({ user, sigil, missionStatus, stats }) {
  const isComplete = missionStatus.completion_percentage === 100;

  const categoryRows = (stats.categories || [])
    .map(c => `<div class="stat-item"><div class="stat-value">${c.count}</div><div class="stat-label">${c.category}</div></div>`)
    .join('');

  const crewRows = (stats.crew || [])
    .map(c => {
      const display = CREW_DISPLAY[c.crew_member] || { name: c.crew_member, role: '' };
      return `<div class="stat-item"><div class="stat-value">${c.count}</div><div class="stat-label">${display.name}</div></div>`;
    })
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mission ${user.callsign} — Dashboard</title>
  <style>${getBaseCSS(isComplete)}</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="sigil">${sigil}</div>
      <div style="text-align:right;">
        <h1 class="mono accent">${user.callsign}</h1>
        <div style="color:#888;font-size:0.85rem;">Flight Director: ${user.name}</div>
      </div>
    </div>

    <div class="card">
      <h2>MISSION TRAJECTORY</h2>
      ${getTrajectoryPath(missionStatus.current_step, { isComplete })}
      ${getProgressBar(missionStatus.completion_percentage, isComplete)}
    </div>

    <div class="card">
      <h2>MISSION STEPS</h2>
      ${getStepChecklist(missionStatus.steps)}
    </div>

    ${stats.totalLogs > 0 ? `
    <div class="card">
      <h2>LOGS BY CATEGORY</h2>
      <div class="stat-grid">${categoryRows}</div>
    </div>

    <div class="card">
      <h2>CREW ASSIGNMENTS</h2>
      <div class="stat-grid">${crewRows}</div>
    </div>
    ` : '<div class="card"><p class="dim">No mission logs yet. Start logging to advance your mission.</p></div>'}

    <div class="footer">ARTEMIS WORKSHOP &bull; APR 2026 &bull; MISSION CONTROL</div>
  </div>
</body>
</html>`;
}

module.exports = { renderMissionDashboard };
