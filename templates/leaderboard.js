const { getBaseCSS, TRAJECTORY_POINTS, FIGURE_8_PATH } = require('./shared');
const { hashCallsign, PALETTE } = require('../sigil');

function renderLeaderboard(entries) {
  const width = 700;
  const height = 260;
  const pts = TRAJECTORY_POINTS;

  const pathD = FIGURE_8_PATH;

  const labels = ['Launch', 'Orbit', 'Transit', 'Flyby', 'Splash'];
  let stepMarkers = '';
  for (let i = 0; i < 5; i++) {
    stepMarkers += `<circle cx="${pts[i].x}" cy="${pts[i].y}" r="5" fill="#0A0E17" stroke="rgba(0,229,255,0.4)" stroke-width="2"/>`;
    stepMarkers += `<text x="${pts[i].x}" y="${pts[i].y + 24}" text-anchor="middle" font-size="9" fill="#888" font-family="-apple-system,sans-serif">${labels[i]}</text>`;
  }

  const stepClusters = {};
  for (const entry of entries) {
    const step = entry.mission_status.current_step;
    if (!stepClusters[step]) stepClusters[step] = [];
    stepClusters[step].push(entry);
  }

  let dots = '';
  for (const [step, cluster] of Object.entries(stepClusters)) {
    const s = parseInt(step);
    const point = s > 0 && s <= 5 ? pts[s - 1] : { x: pts[0].x - 20, y: pts[0].y };

    cluster.forEach((entry, idx) => {
      const hash = hashCallsign(entry.user.callsign);
      const colors = PALETTE[hash % PALETTE.length];
      const offsetY = (idx - (cluster.length - 1) / 2) * 12;

      dots += `<g>
        <title>${entry.user.callsign} — ${entry.mission_status.completion_percentage}%</title>
        <circle cx="${point.x}" cy="${point.y + offsetY}" r="5" fill="${colors.accent}" stroke="${colors.primary}" stroke-width="1.5" style="filter:drop-shadow(0 0 5px ${colors.accent});">
          <animate attributeName="opacity" values="1;0.5;1" dur="${1.5 + Math.random()}s" repeatCount="indefinite" />
        </circle>
      </g>`;
    });
  }

  const raceSvg = `<svg viewBox="0 0 ${width} ${height + 20}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;">
    <defs>
      <radialGradient id="glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="rgba(0,229,255,0.4)" />
        <stop offset="100%" stop-color="rgba(0,229,255,0)" />
      </radialGradient>
    </defs>
    <rect x="-10" y="-10" width="${width+20}" height="${height+40}" fill="none"/>
    <circle cx="150" cy="130" r="60" fill="url(#glow)"/>
    <text x="150" y="130" text-anchor="middle" dominant-baseline="central" font-size="80">🌍</text>
    <text x="600" y="130" text-anchor="middle" dominant-baseline="central" font-size="50">🌑</text>
    <path d="${pathD}" fill="none" stroke="rgba(0,229,255,0.2)" stroke-width="2" stroke-dasharray="8,6"/>
    ${stepMarkers}
    ${dots}
  </svg>`;

  const rows = entries.map((entry, i) => {
    const pct = entry.mission_status.completion_percentage;
    const hash = hashCallsign(entry.user.callsign);
    const colors = PALETTE[hash % PALETTE.length];
    return `<div class="glass-row">
      <div style="display:flex;align-items:center;gap:8px;">
        <span class="mono dim" style="font-size:0.9rem;">${i + 1}</span>
        <span style="width:8px;height:8px;border-radius:50%;background:${colors.accent};box-shadow:0 0 6px ${colors.accent};"></span>
      </div>
      <div>
        <div class="mono accent" style="font-size:1.05rem;">${entry.user.callsign}</div>
        <div style="color:#888;font-size:0.75rem;text-transform:uppercase;letter-spacing:1px;">${entry.user.name}</div>
      </div>
      <div style="flex:1;">
        <div class="progress-bar-bg" style="height:6px; background:rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.05);">
          <div class="progress-bar-fill" style="width:${pct}%; background:linear-gradient(90deg, ${colors.primary}, ${pct === 100 ? '#ffeb3b' : colors.accent}); box-shadow:0 0 8px ${pct === 100 ? '#ffeb3b' : colors.accent};"></div>
        </div>
      </div>
      <div class="mono" style="font-size:0.85rem; color:#888;">Step ${entry.mission_status.current_step} / 5</div>
      <div class="mono" style="text-align:right;font-size:1rem;color:${pct === 100 ? '#ffeb3b' : colors.accent}; text-shadow:0 0 5px ${pct === 100 ? '#ffeb3b' : colors.accent}55;">${pct}%</div>
    </div>`;
  }).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Artemis II — Mission Leaderboard</title>
  <style>${getBaseCSS(false)}</style>
</head>
<body>
  <div class="container">
    <h1 style="text-align:center;letter-spacing:3px;">ARTEMIS II — MISSION LEADERBOARD</h1>
    <p style="text-align:center;color:#888;font-size:0.85rem;margin-bottom:20px;">${entries.length} Flight Director${entries.length !== 1 ? 's' : ''} active</p>

    <div class="card">
      ${raceSvg}
    </div>

    <div style="margin-top:16px;">
      ${entries.length > 0 ? rows : '<p style="text-align:center;color:#555;">No flight directors registered yet.</p>'}
    </div>

    <div class="footer">ARTEMIS WORKSHOP &bull; APR 2026 &bull; MISSION CONTROL</div>
  </div>
</body>
</html>`;
}

module.exports = { renderLeaderboard };
