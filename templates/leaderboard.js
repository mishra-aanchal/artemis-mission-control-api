const { getBaseCSS, TRAJECTORY_POINTS } = require('./shared');
const { hashCallsign, PALETTE } = require('../sigil');

function renderLeaderboard(entries) {
  const width = 700;
  const height = 200;
  const pts = TRAJECTORY_POINTS;

  const pathD = `M ${pts[0].x} ${pts[0].y} C ${pts[0].x + 60} ${pts[0].y - 80}, ${pts[1].x - 60} ${pts[1].y}, ${pts[1].x} ${pts[1].y} C ${pts[1].x + 60} ${pts[1].y - 20}, ${pts[2].x - 60} ${pts[2].y}, ${pts[2].x} ${pts[2].y} C ${pts[2].x + 60} ${pts[2].y}, ${pts[3].x - 60} ${pts[3].y - 20}, ${pts[3].x} ${pts[3].y} C ${pts[3].x + 60} ${pts[3].y}, ${pts[4].x - 60} ${pts[4].y - 80}, ${pts[4].x} ${pts[4].y}`;

  const labels = ['Launch', 'Orbit', 'Transit', 'Flyby', 'Splash'];
  let stepMarkers = '';
  for (let i = 0; i < 5; i++) {
    stepMarkers += `<circle cx="${pts[i].x}" cy="${pts[i].y}" r="4" fill="#1a2035"/>`;
    stepMarkers += `<text x="${pts[i].x}" y="${pts[i].y + 20}" text-anchor="middle" font-size="8" fill="#444" font-family="-apple-system,sans-serif">${labels[i]}</text>`;
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
        <circle cx="${point.x}" cy="${point.y + offsetY - 12}" r="5" fill="${colors.accent}" stroke="${colors.primary}" stroke-width="1.5"/>
      </g>`;
    });
  }

  const raceSvg = `<svg viewBox="0 0 ${width} ${height + 20}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;">
    <text x="${pts[0].x - 22}" y="${pts[0].y + 5}" font-size="16">🌍</text>
    <text x="${pts[2].x}" y="${pts[2].y - 18}" text-anchor="middle" font-size="14">🌑</text>
    <path d="${pathD}" fill="none" stroke="#1a2035" stroke-width="2" stroke-dasharray="6,4"/>
    ${stepMarkers}
    ${dots}
  </svg>`;

  const rows = entries.map((entry, i) => {
    const pct = entry.mission_status.completion_percentage;
    const hash = hashCallsign(entry.user.callsign);
    const colors = PALETTE[hash % PALETTE.length];
    return `<div style="display:flex;align-items:center;gap:12px;padding:8px 12px;background:#111827;border-radius:6px;margin-bottom:4px;">
      <span class="mono" style="color:#555;width:24px;text-align:right;">${i + 1}</span>
      <span style="width:10px;height:10px;border-radius:50%;background:${colors.accent};flex-shrink:0;"></span>
      <span class="mono accent" style="flex:1;">${entry.user.callsign}</span>
      <span style="color:#888;font-size:0.8rem;">${entry.user.name}</span>
      <div style="width:100px;">
        <div style="background:#1a2035;border-radius:3px;height:6px;overflow:hidden;">
          <div style="width:${pct}%;height:100%;background:${pct === 100 ? '#ffd600' : '#00e5ff'};border-radius:3px;"></div>
        </div>
      </div>
      <span class="mono" style="width:40px;text-align:right;font-size:0.8rem;color:${pct === 100 ? '#ffd600' : '#00e5ff'};">${pct}%</span>
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
