const { getBaseCSS, getStepChecklist, TRAJECTORY_POINTS, FIGURE_8_PATH, getSlsSVG } = require('./shared');
const { CREW_DISPLAY } = require('../constants');

function renderDebrief({ user, sigil, missionStatus, stats }) {
  const isComplete = missionStatus.completion_percentage === 100;
  const title = isComplete ? 'MISSION COMPLETE &mdash; SPLASHDOWN CONFIRMED' : 'MISSION IN PROGRESS &mdash; AWAITING DATA';
  const accentColor = isComplete ? '#ffd600' : '#00e5ff';
  
  // Custom Map SVG Engine
  const width = 700;
  const height = 260;
  
  let stepMarkers = '';
  const labels = ['Launch', 'Orbit', 'Transit', 'Flyby', 'Splash'];
  for (let i = 0; i < 5; i++) {
    const isPast = (missionStatus.completion_percentage / 100) >= (i / 4);
    const color = isPast ? accentColor : '#111827';
    stepMarkers += `<circle cx="${TRAJECTORY_POINTS[i].x}" cy="${TRAJECTORY_POINTS[i].y}" r="6" fill="${color}" stroke="${accentColor}" stroke-width="2"/>`;
    stepMarkers += `<text x="${TRAJECTORY_POINTS[i].x}" y="${TRAJECTORY_POINTS[i].y + 24}" text-anchor="middle" font-size="9" fill="#888" font-family="-apple-system,sans-serif">${labels[i]}</text>`;
  }

  const rocketSVG = getSlsSVG({ x: 0, y: 0 });
  const oceanOnlySVG = `
    <g transform="translate(${TRAJECTORY_POINTS[4].x - 30}, ${TRAJECTORY_POINTS[4].y + 2})">
      <ellipse cx="30" cy="8" rx="40" ry="10" fill="rgba(0, 150, 255, 0.2)" filter="drop-shadow(0 0 4px rgba(0,229,255,0.4))"/>
      <path d="M -5 5 Q 10 0, 25 5 T 55 5 L 45 15 L 0 15 Z" fill="rgba(0, 200, 255, 0.4)"/>
      <path ${isComplete ? 'class="splash-anim"' : ''} d="M 0 10 Q 15 5, 30 10 T 60 10" fill="none" stroke="#00e5ff" stroke-width="1.5" opacity="0.8"/>
    </g>
  `;

  const flyingOrionSVG = `
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

  const targetDistance = isComplete ? 100 : Math.max(0, missionStatus.completion_percentage - 10);
  const showOrion = missionStatus.completion_percentage > 20;

  const mapSvg = `<svg viewBox="0 0 ${width} ${height + 20}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;filter:drop-shadow(0 0 8px rgba(0,229,255,0.1));">
    <defs>
      <radialGradient id="glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="rgba(0,229,255,0.4)" />
        <stop offset="100%" stop-color="rgba(0,229,255,0)" />
      </radialGradient>
    </defs>
    
    <circle cx="150" cy="130" r="60" fill="url(#glow)"/>
    <text x="150" y="130" text-anchor="middle" dominant-baseline="central" font-size="80">🌍</text>
    <text x="600" y="130" text-anchor="middle" dominant-baseline="central" font-size="50">🌑</text>
    
    <path d="${FIGURE_8_PATH}" fill="none" stroke="rgba(0,229,255,0.2)" stroke-width="2" stroke-dasharray="8,6"/>
    ${oceanOnlySVG}
    ${stepMarkers}
    
    <g id="animated-rocket" style="offset-path: path('${FIGURE_8_PATH}'); offset-rotate: auto 90deg; offset-distance: ${targetDistance}%; transition: offset-distance 3s ease-out;">
      <g style="opacity: ${showOrion ? 0 : 1}; transition: opacity 1s;">${rocketSVG}</g>
      <g style="opacity: ${showOrion ? 1 : 0}; transition: opacity 1s;">${flyingOrionSVG}</g>
    </g>
  </svg>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mission ${user.callsign} — Debrief</title>
  <style>
    ${getBaseCSS(false)}
    body { background: radial-gradient(circle at 50% 0%, #0c1838, #030610 80%); color: #e0e0e0; min-height: 100vh; padding: 40px 20px; font-family: -apple-system, sans-serif; }
    
    .hud-container { max-width: 1200px; margin: 0 auto; display: flex; flex-direction: column; gap: 24px; }
    
    .hud-header {
      display: flex; align-items: center; gap: 24px; background: rgba(0,0,0,0.4); border: 1px solid rgba(0,229,255,0.1); padding: 24px; border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.5); backdrop-filter: blur(10px);
    }
    .hud-logo { width: 120px; height: 120px; filter: drop-shadow(0 0 10px ${accentColor}); }
    ${isComplete ? `
    .hud-logo svg polygon[stroke] { stroke: #ffd600 !important; stroke-width: 3 !important; }
    @keyframes heartbeat { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
    .hud-logo { animation: heartbeat 2s infinite ease-in-out; }
    ` : ''}
    
    .hud-identity { flex: 1; }
    .hud-identity h1 { font-family: monospace; font-size: 2.5rem; color: #fff; margin: 0 0 4px; letter-spacing: 2px; text-shadow: 0 0 15px ${accentColor}; }
    .hud-identity h2 { font-size: 1rem; color: #888; letter-spacing: 4px; margin: 0; }
    
    .hud-status {
      padding: 12px 24px; border-radius: 6px; font-family: monospace; font-weight: bold; font-size: 1.1rem; letter-spacing: 2px;
      border: 1px solid ${accentColor}; color: ${accentColor}; background: ${isComplete ? 'rgba(255,214,0,0.1)' : 'rgba(0,229,255,0.1)'};
    }

    .hud-grid { display: grid; grid-template-columns: 350px 1fr; gap: 24px; }
    
    .hud-card {
      background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.05); padding: 24px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    }
    .hud-card h3 { font-size: 0.9rem; color: #888; letter-spacing: 3px; margin-top: 0; margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 12px; }
    
    .stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom:24px; }
    .stat-item { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 16px; border-radius: 8px; text-align: center; }
    .stat-value { font-family: monospace; font-size: 2rem; color: ${accentColor}; font-weight: bold; }
    .stat-label { font-size: 0.7rem; color: #666; text-transform: uppercase; letter-spacing: 1px; margin-top: 4px; }
    
    @keyframes megaSplash { 0% { transform: scale(1); opacity: 0.8; stroke-width: 1.5; } 50% { transform: scale(1.5); opacity: 1; stroke-width: 3; stroke: #00e5ff; } 100% { transform: scale(1); opacity: 0; } }
    .splash-anim { animation: megaSplash 2s ease-out infinite; }

    /* Tablet breakpoint */
    @media (max-width: 960px) {
      body { padding: 20px 12px; }
      .hud-header { flex-direction: column; text-align: center; gap: 16px; padding: 20px; }
      .hud-logo { width: 90px; height: 90px; }
      .hud-identity h1 { font-size: 1.8rem; }
      .hud-identity h2 { font-size: 0.85rem; letter-spacing: 2px; }
      .hud-status { font-size: 0.85rem; letter-spacing: 1px; padding: 10px 16px; text-align: center; }
      .hud-grid { grid-template-columns: 1fr; }
      .stat-value { font-size: 1.6rem; }
    }

    /* Mobile breakpoint */
    @media (max-width: 600px) {
      body { padding: 12px 8px; }
      .hud-container { gap: 16px; }
      .hud-header { padding: 16px; gap: 12px; }
      .hud-logo { width: 70px; height: 70px; }
      .hud-identity h1 { font-size: 1.4rem; letter-spacing: 1px; }
      .hud-identity h2 { font-size: 0.75rem; letter-spacing: 1px; }
      .hud-status { font-size: 0.7rem; padding: 8px 12px; letter-spacing: 1px; word-break: break-word; }
      .hud-card { padding: 16px; border-radius: 8px; }
      .hud-card h3 { font-size: 0.8rem; letter-spacing: 2px; margin-bottom: 14px; }
      .stat-grid { grid-template-columns: 1fr; gap: 10px; margin-bottom: 16px; }
      .stat-value { font-size: 1.4rem; }
      .stat-label { font-size: 0.65rem; }
    }
  </style>
</head>
<body>
  <div class="hud-container">
    
    <!-- Top Identity Header -->
    <header class="hud-header">
      <div class="hud-logo">${sigil}</div>
      <div class="hud-identity">
        <h1>${user.callsign}</h1>
        <h2>FLIGHT DIRECTOR: ${user.name.toUpperCase()}</h2>
      </div>
      <div class="hud-status">${title}</div>
    </header>

    <main class="hud-grid">
      <!-- Left Column -->
      <aside style="display:flex; flex-direction:column; gap:24px;">
        <div class="hud-card">
          <h3>TELEMETRY OVERVIEW</h3>
          <div class="stat-grid">
            <div class="stat-item"><div class="stat-value">${stats.totalLogs}</div><div class="stat-label">Total Logs</div></div>
            <div class="stat-item"><div class="stat-value">${(stats.categories || []).length}</div><div class="stat-label">Categories</div></div>
          </div>
          <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 16px; border-radius: 8px; text-align: center;">
             <div class="stat-value">${(stats.crew || []).length} / 4</div><div class="stat-label">Crew Active</div>
          </div>
        </div>

        <div class="hud-card" style="flex: 1;">
          <h3>PROTOCOL SEQUENCE</h3>
          ${getStepChecklist(missionStatus.steps)}
        </div>
      </aside>

      <!-- Right Column: Trajectory Display -->
      <section class="hud-card" style="display:flex; flex-direction:column; position:relative;">
        <h3>ORBITAL TRAJECTORY DATA</h3>
        
        <div style="background: rgba(0,0,0,0.8); border-radius: 8px; border: 1px solid rgba(0,229,255,0.15); flex:1; display:flex; align-items:center; justify-content:center; padding:20px; overflow:hidden;">
          ${mapSvg}
        </div>
        
        <div style="margin-top:20px;">
          <div style="display:flex; justify-content:space-between; font-family:monospace; font-size:0.8rem; color:#888; margin-bottom:8px;">
            <span>TRAJECTORY PROGRESSION</span>
            <span style="color:${accentColor}; font-weight:bold;">${missionStatus.completion_percentage}% COMPLETION</span>
          </div>
          <div style="height:4px; background:rgba(255,255,255,0.1); border-radius:2px; overflow:hidden;">
            <div style="height:100%; width:${missionStatus.completion_percentage}%; background:${accentColor}; box-shadow:0 0 10px ${accentColor}; transition:width 1s ease;"></div>
          </div>
        </div>
        ${!isComplete ? '<p style="text-align:right; color:#666; margin-top:16px; font-size:0.75rem; letter-spacing:1px;">AWAITING FURTHER DATA PACKETS...</p>' : ''}
        
        <!-- Decorative Binary/Morse Code Footer -->
        <div style="margin-top: 15px; font-size: 0.6rem; color: #aaa; text-align: justify; font-family: monospace;">
          01000101 01000111 01000111 01010011 
          <span style="float: right;">. --. --. ...</span>
        </div>

        <!-- The "Invisible" Watermark -->
        <div style="position: absolute; bottom: 5px; right: 8px; font-size: 10px; color: rgba(255,255,255,0.03); user-select: none;">
          COORD: 200K_MILES_OUT
        </div>
      </section>
    </main>
    
    <div style="text-align:center; color:#444; font-size:0.75rem; letter-spacing:2px; margin-top:20px;">
      ARTEMIS WORKSHOP &bull; APR 2026 &bull; POSTMAN API
    </div>
  </div>
  <script>
    // Force a re-flow to trigger the CSS transition for the rocket offeset distance beautifully on load
    setTimeout(() => {
      document.getElementById('animated-rocket').style.offsetDistance = "${targetDistance}%";
    }, 100);
  </script>
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
    body { background: #0a0e17; color: #e0e0e0; font-family: -apple-system, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
    .box { text-align: center; max-width: 400px; padding: 40px; background: #111827; border: 1px solid #b71c1c; border-radius: 12px; }
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
