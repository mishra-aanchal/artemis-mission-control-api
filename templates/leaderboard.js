const { getBaseCSS, TRAJECTORY_POINTS, FIGURE_8_PATH, getSlsSVG } = require('./shared');
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

  // Orion module SVG (matching story page)
  const orionSVG = `
    <g transform="scale(0.65) rotate(15)">
      <path d="M-12,-4 L-32,-24 L-24,-28 L-8,-8 Z" fill="#1a237e" stroke="#5c6bc0" stroke-width="1"/>
      <path d="M-12,4 L-32,24 L-24,28 L-8,8 Z" fill="#1a237e" stroke="#5c6bc0" stroke-width="1"/>
      <path d="M-8,-8 L8,-24 L16,-20 L-4,-4 Z" fill="#1a237e" stroke="#5c6bc0" stroke-width="1"/>
      <path d="M-8,8 L8,24 L16,20 L-4,4 Z" fill="#1a237e" stroke="#5c6bc0" stroke-width="1"/>
      <path d="M-15,-12 L3,-12 L3,12 L-15,12 Z" fill="#90a4ae" stroke="#cfd8dc" stroke-width="1"/>
      <rect x="-10" y="-8" width="8" height="4" fill="#37474f" />
      <rect x="-10" y="4" width="8" height="4" fill="#37474f" />
      <path d="M3,-14 L18,-7 L18,7 L3,14 Z" fill="#eceff1" stroke="#ffffff" stroke-width="1"/>
      <path d="M8,-8 L14,-4" stroke="#e53935" stroke-width="1.5"/>
      <circle cx="12" cy="0" r="1.5" fill="#424242"/>
    </g>
  `;

  const oceanOnlySVG = `
    <g transform="translate(${pts[4].x - 30}, ${pts[4].y + 2})">
      <ellipse cx="30" cy="8" rx="40" ry="10" fill="rgba(0, 150, 255, 0.2)" filter="drop-shadow(0 0 4px rgba(0,229,255,0.4))"/>
      <path d="M -5 5 Q 10 0, 25 5 T 55 5 L 45 15 L 0 15 Z" fill="rgba(0, 200, 255, 0.4)"/>
      <path d="M 0 10 Q 15 5, 30 10 T 60 10" fill="none" stroke="#00e5ff" stroke-width="1.5" opacity="0.8"/>
    </g>
  `;

  // Map step -> offset-distance %
  const STEP_DISTANCES = [0, 15, 28, 65, 100];

  const stepClusters = {};
  for (const entry of entries) {
    const step = entry.mission_status.current_step;
    if (!stepClusters[step]) stepClusters[step] = [];
    stepClusters[step].push(entry);
  }

  let dots = '';
  // Animated Orion modules along the offset-path per step cluster
  let animatedCraft = '';
  const usedSteps = new Set();

  for (const [step, cluster] of Object.entries(stepClusters)) {
    const s = parseInt(step);
    const point = s > 0 && s <= 5 ? pts[s - 1] : { x: pts[0].x - 20, y: pts[0].y };

    // Render one animated craft per unique active step (not at 0)
    if (s > 0 && s <= 5 && !usedSteps.has(s)) {
      usedSteps.add(s);
      const dist = STEP_DISTANCES[Math.min(s - 1, 4)];
      if (s === 1) {
        // Step 1: show SLS rocket (pre-separation)
        animatedCraft += `<g style="offset-path: path('${pathD}'); offset-rotate: auto 90deg; offset-distance: ${dist}%;">${getSlsSVG({x:0,y:0})}</g>`;
      } else {
        // Steps 2-5: show Orion module (post-separation)
        animatedCraft += `<g style="offset-path: path('${pathD}'); offset-rotate: auto 90deg; offset-distance: ${dist}%;">${orionSVG}</g>`;
      }
    }

    cluster.forEach((entry, idx) => {
      const hash = hashCallsign(entry.user.callsign);
      const colors = PALETTE[hash % PALETTE.length];
      
      // Sunflower (Fermat's spiral) distribution for organic circular clustering
      let offsetX = 0;
      let offsetY = s > 0 && s <= 5 ? -9 : 0;
      if (cluster.length > 1) {
        const goldenAngle = 137.508 * (Math.PI / 180);
        const radius = Math.sqrt(idx) * 5.5; 
        const theta = idx * goldenAngle;
        offsetX = radius * Math.cos(theta);
        offsetY += radius * Math.sin(theta);
      }

      dots += `<g class="user-blip" style="cursor: pointer;">
        <title>${entry.user.callsign} — ${entry.mission_status.completion_percentage}%</title>
        <circle cx="${point.x + offsetX}" cy="${point.y + offsetY}" r="4" fill="${colors.accent}" stroke="${colors.primary}" stroke-width="1.5" style="filter:drop-shadow(0 0 5px ${colors.accent});">
          <animate attributeName="opacity" values="1;0.5;1" dur="${1.5 + Math.random()}s" repeatCount="indefinite" />
        </circle>
        <text x="${point.x + offsetX}" y="${point.y + offsetY - 8}" text-anchor="middle" font-size="9" fill="#fff" font-weight="bold" style="text-shadow: 0px 2px 4px rgba(0,0,0,0.8); pointer-events: none;">
          ${entry.user.callsign}
        </text>
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
    ${oceanOnlySVG}
    ${stepMarkers}
    ${animatedCraft}
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
