const { getBaseCSS, getTrajectoryPath, getProgressBar, getStepChecklist } = require('./shared');
const { CREW_DISPLAY } = require('../constants');

function renderDebrief({ user, sigil, missionStatus, stats }) {
  const isComplete = missionStatus.completion_percentage === 100;
  const title = isComplete
    ? 'MISSION COMPLETE — SPLASHDOWN CONFIRMED'
    : 'MISSION IN PROGRESS';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mission ${user.callsign} — Debrief</title>
  <meta property="og:title" content="Mission ${user.callsign} — Debrief" />
  <meta property="og:description" content="Flight Director ${user.name} completed ${missionStatus.steps_completed} of 8 mission steps" />
  <style>
    ${getBaseCSS(isComplete)}
    .debrief-sigil { width: 200px; height: 200px; margin: 0 auto 16px; display: block; }
    .debrief-title {
      text-align: center;
      font-size: 1.3rem;
      letter-spacing: 3px;
      color: ${isComplete ? '#ffd600' : '#00e5ff'};
      margin-bottom: 4px;
    }
    .debrief-subtitle {
      text-align: center;
      color: #888;
      font-size: 0.9rem;
      margin-bottom: 24px;
    }
    ${isComplete ? `
    .debrief-sigil svg polygon[stroke] { stroke: #ffd600 !important; stroke-width: 3 !important; }
    @keyframes splash {
      0% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.05); opacity: 0.8; }
      100% { transform: scale(1); opacity: 1; }
    }
    .splash-anim { animation: splash 2s ease-in-out infinite; }
    ` : ''}
  </style>
</head>
<body>
  <div class="container">
    <div class="debrief-sigil ${isComplete ? 'splash-anim' : ''}">${sigil}</div>

    <div class="debrief-title mono">${title}</div>
    <h1 style="text-align:center;" class="mono accent">${user.callsign}</h1>
    <div class="debrief-subtitle">FLIGHT DIRECTOR: ${user.name.toUpperCase()}</div>

    <div class="card">
      ${getTrajectoryPath(missionStatus.current_step, { isComplete })}
      ${getProgressBar(missionStatus.completion_percentage, isComplete)}
    </div>

    <div class="card">
      <h2>MISSION CHECKLIST</h2>
      ${getStepChecklist(missionStatus.steps)}
    </div>

    <div class="card">
      <h2>MISSION STATS</h2>
      <div class="stat-grid">
        <div class="stat-item"><div class="stat-value">${stats.totalLogs}</div><div class="stat-label">Total Logs</div></div>
        <div class="stat-item"><div class="stat-value">${(stats.categories || []).length}</div><div class="stat-label">Categories</div></div>
        <div class="stat-item"><div class="stat-value">${(stats.crew || []).length}</div><div class="stat-label">Crew Active</div></div>
      </div>
    </div>

    ${!isComplete ? '<p style="text-align:center;color:#888;margin-top:16px;font-size:0.85rem;">Continue your mission — the API is still live.</p>' : ''}

    <div class="footer">ARTEMIS WORKSHOP &bull; APR 2026 &bull; POWERED BY POSTMAN</div>
  </div>
</body>
</html>`;
}

function renderDebriefError() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Clearance Denied</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: #0a0e17; color: #e0e0e0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      display: flex; align-items: center; justify-content: center; min-height: 100vh;
    }
    .box {
      text-align: center; max-width: 400px; padding: 40px;
      background: #111827; border: 1px solid #b71c1c; border-radius: 12px;
    }
    h1 { color: #ef5350; font-size: 1.2rem; letter-spacing: 2px; margin-bottom: 12px; }
    p { color: #888; font-size: 0.9rem; }
  </style>
</head>
<body>
  <div class="box">
    <h1>CLEARANCE DENIED</h1>
    <p>Invalid or missing API key. Register at POST /register to obtain mission clearance.</p>
  </div>
</body>
</html>`;
}

module.exports = { renderDebrief, renderDebriefError };
