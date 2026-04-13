// 5 step positions along a Figure-8 Earth -> Moon -> Earth trajectory
// Coordinates for a 750x260 viewBox
const TRAJECTORY_POINTS = [
  { x: 150, y: 70 },   // Step 1: Launch (Earth Top)
  { x: 260, y: 100 },  // Step 2: Earth Orbit (Outbound)
  { x: 375, y: 130 },  // Step 3: Transit (Crossing)
  { x: 640, y: 130 },  // Step 4: Lunar Flyby (Right of Moon)
  { x: 70, y: 195 },   // Step 5: Splashdown (Ocean Outside Earth)
];
const FIGURE_8_PATH = "M 150 70 C 300 70, 450 190, 600 190 C 660 190, 660 70, 600 70 C 450 70, 300 190, 70 195";

function getSplashSVG(pt) {
  const oceanSVG = `
    <g transform="translate(${pt.x - 30}, ${pt.y + 2})">
      <ellipse cx="30" cy="8" rx="40" ry="10" fill="rgba(0, 150, 255, 0.2)" filter="drop-shadow(0 0 4px rgba(0,229,255,0.4))"/>
      <path d="M -5 5 Q 10 0, 25 5 T 55 5 L 45 15 L 0 15 Z" fill="rgba(0, 200, 255, 0.4)"/>
      <path d="M 0 10 Q 15 5, 30 10 T 60 10" fill="none" stroke="#00e5ff" stroke-width="1.5" opacity="0.8"/>
    </g>
  `;

  const orionSVG = `
    <g transform="translate(${pt.x}, ${pt.y - 8}) scale(0.65) rotate(15)">
      <!-- Left Solar Panels (X-Wing) -->
      <path d="M-12,-4 L-32,-24 L-24,-28 L-8,-8 Z" fill="#1a237e" stroke="#5c6bc0" stroke-width="1"/>
      <path d="M-12,4 L-32,24 L-24,28 L-8,8 Z" fill="#1a237e" stroke="#5c6bc0" stroke-width="1"/>
      
      <!-- Right Solar Panels -->
      <path d="M-8,-8 L8,-24 L16,-20 L-4,-4 Z" fill="#1a237e" stroke="#5c6bc0" stroke-width="1"/>
      <path d="M-8,8 L8,24 L16,20 L-4,4 Z" fill="#1a237e" stroke="#5c6bc0" stroke-width="1"/>
      
      <!-- Service Module -->
      <path d="M-15,-12 L3,-12 L3,12 L-15,12 Z" fill="#90a4ae" stroke="#cfd8dc" stroke-width="1"/>
      <rect x="-10" y="-8" width="8" height="4" fill="#37474f" />
      <rect x="-10" y="4" width="8" height="4" fill="#37474f" />

      <!-- Crew Module (Command Cone) -->
      <path d="M3,-14 L18,-7 L18,7 L3,14 Z" fill="#eceff1" stroke="#ffffff" stroke-width="1"/>
      <path d="M8,-8 L14,-4" stroke="#e53935" stroke-width="1.5"/> <!-- NASA logo red swoop -->
      <circle cx="12" cy="0" r="1.5" fill="#424242"/> <!-- Hatch window -->
    </g>
  `;
  return oceanSVG + orionSVG;
}

function getSlsSVG(pt) {
  return `
    <g transform="translate(${pt.x}, ${pt.y - 12}) scale(0.65)">
      <!-- Engine Exhaust / Glow -->
      <ellipse cx="0" cy="50" rx="12" ry="20" fill="rgba(255, 150, 0, 0.4)" filter="blur(4px)">
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="0.5s" repeatCount="indefinite"/>
      </ellipse>
      
      <!-- SRB Flames -->
      <path d="M-15,45 Q-12,70 -9,45 Z" fill="#ffb300" opacity="0.9"><animate attributeName="opacity" values="0.9;0.5;0.9" dur="0.1s" repeatCount="indefinite"/></path>
      <path d="M9,45 Q12,70 15,45 Z" fill="#ffb300" opacity="0.9"><animate attributeName="opacity" values="0.9;0.5;0.9" dur="0.1s" repeatCount="indefinite"/></path>
      <!-- Core Flame -->
      <path d="M-6,45 Q0,90 6,45 Z" fill="#ff3d00" opacity="0.9"><animate attributeName="opacity" values="0.9;0.6;0.9" dur="0.15s" repeatCount="indefinite"/></path>
      
      <!-- Core Stage (Orange) -->
      <rect x="-10" y="-35" width="20" height="80" fill="#e67e22" stroke="#d35400" stroke-width="1" rx="2"/>
      
      <!-- SRBs (White side boosters) -->
      <path d="M-18,-15 L-11,-22 L-10,45 L-18,45 Z" fill="#f5f6fa" stroke="#dcdde1" stroke-width="1" stroke-linejoin="round"/>
      <path d="M11,-22 L18,-15 L18,45 L10,45 Z" fill="#f5f6fa" stroke="#dcdde1" stroke-width="1" stroke-linejoin="round"/>
      
      <!-- Engine nozzles -->
      <path d="M-9,45 L9,45 L11,50 L-11,50 Z" fill="#2d3436"/>
      <path d="M-16,45 L-11,45 L-10,48 L-17,48 Z" fill="#2d3436"/>
      <path d="M11,45 L16,45 L17,48 L10,48 Z" fill="#2d3436"/>

      <!-- ICPS / Upper Stage (White) -->
      <path d="M-10,-35 L10,-35 L8,-55 L-8,-55 Z" fill="#f5f6fa" stroke="#dcdde1" stroke-width="1"/>
      
      <!-- Orion Spacecraft & Launch Abort System -->
      <path d="M-8,-55 L8,-55 L6,-65 L-6,-65 Z" fill="#ffffff" stroke="#dcdde1" stroke-width="1"/>
      <path d="M-6,-65 L6,-65 L0,-90 Z" fill="#ffffff" stroke="#dcdde1" stroke-width="1" stroke-linejoin="round"/>
      
      <!-- Abort Tower Spike -->
      <line x1="0" y1="-90" x2="0" y2="-105" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
    </g>
  `;
}

function getSplashPlaceholderSVG(pt) {
  return `
    <circle cx="${pt.x}" cy="${pt.y}" r="15" fill="none" stroke="rgba(0,150,255,0.2)" stroke-width="1" stroke-dasharray="3,3"/>
    <text x="${pt.x}" y="${pt.y + 24}" text-anchor="middle" font-size="9" fill="#888" font-family="-apple-system,sans-serif">Splashdown Area</text>
  `;
}

function getBaseCSS(isComplete) {
  const accentColor = isComplete ? '#ffd600' : '#00e5ff';
  return `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: radial-gradient(circle at 50% 0%, #0c1838, #030610 80%);
      color: #e0e0e0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      line-height: 1.6;
      min-height: 100vh;
      background-attachment: fixed;
    }
    .container {
      max-width: 800px;
      width: 95%;
      margin: 0 auto;
      padding: 32px 0;
    }
    .mono { font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace; }
    h1, h2, h3 {
      color: #fff;
      letter-spacing: 2px;
      text-transform: uppercase;
      font-weight: 500;
    }
    h1 { font-size: 1.6rem; margin-bottom: 8px; text-shadow: 0 0 10px rgba(0, 229, 255, 0.4); }
    h2 { font-size: 1.1rem; margin: 24px 0 12px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 6px; }
    .accent { color: ${accentColor}; text-shadow: 0 0 6px ${accentColor}88; }
    .dim { color: #888; }
    .card {
      background: rgba(17, 24, 39, 0.6);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(0, 229, 255, 0.15);
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 24px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.4);
    }
    .glass-row {
      display: grid;
      grid-template-columns: 40px 180px 1fr 100px 50px;
      align-items: center;
      gap: 16px;
      padding: 12px 16px;
      background: rgba(255, 255, 255, 0.03);
      border-bottom: 1px solid rgba(255,255,255,0.05);
      border-radius: 6px;
      margin-bottom: 6px;
      transition: all 0.2s ease;
    }
    .glass-row:hover {
      background: rgba(255, 255, 255, 0.07);
      border-color: rgba(0, 229, 255, 0.3);
    }
    .progress-bar-bg {
      background: rgba(0,0,0,0.4);
      border-radius: 6px;
      height: 8px;
      width: 100%;
      overflow: hidden;
      margin: auto 0;
      border: 1px solid rgba(255,255,255,0.1);
    }
    .progress-bar-fill {
      height: 100%;
      border-radius: 4px;
      background: linear-gradient(90deg, ${accentColor}, ${isComplete ? '#ffeb3b' : '#00b4d8'});
      box-shadow: 0 0 8px ${accentColor};
      transition: width 1.5s ease-out;
    }
    .step-list {
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      gap: 8px 20px;
      font-size: 0.9rem;
    }
    .step-list li { display: flex; align-items: center; gap: 6px; }
    .step-done { color: ${accentColor}; }
    .step-pending { color: #333; }
    .stat-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: 8px;
    }
    .stat-item {
      background: #0d1117;
      padding: 10px;
      border-radius: 6px;
      text-align: center;
    }
    .stat-value {
      font-size: 1.4rem;
      font-weight: bold;
      color: ${accentColor};
      font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
    }
    .stat-label { font-size: 0.75rem; color: #888; text-transform: uppercase; letter-spacing: 1px; }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
      flex-wrap: wrap;
      gap: 12px;
    }
    .sigil { width: 80px; height: 80px; }
    .footer {
      text-align: center;
      color: #444;
      font-size: 0.75rem;
      margin-top: 32px;
      padding-top: 16px;
      border-top: 1px solid #1a2035;
      letter-spacing: 2px;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }
    .pulse { animation: pulse 1.5s ease-in-out infinite; }
    
    .user-blip text {
      opacity: 0;
      transition: opacity 0.2s ease;
    }
    .user-blip:hover text {
      opacity: 1;
    }
    .user-blip:hover circle {
      stroke-width: 2.5;
    }
  `;
}

function getTrajectoryPath(currentStep, options = {}) {
  const { width = 700, height = 200, isComplete = false } = options;
  const accentColor = isComplete ? '#ffd600' : '#00e5ff';
  const dimColor = '#1a2035';

  const scaleX = width / 700;
  const scaleY = height / 200;
  const pts = TRAJECTORY_POINTS.map(p => ({ x: p.x * scaleX, y: p.y * scaleY }));

  const pathD = FIGURE_8_PATH;

  let markers = '';
  const labels = ['Launch', 'Orbit', 'Transit', 'Flyby', 'Splash'];

  for (let i = 0; i < 5; i++) {
    const done = i < currentStep;
    const isCurrent = i === currentStep - 1;
    const color = done ? accentColor : dimColor;
    const r = isCurrent ? 8 : 6;

    markers += `<circle cx="${pts[i].x}" cy="${pts[i].y}" r="${r}" fill="${color}" ${isCurrent ? 'class="pulse"' : ''}/>`;

    if (done) {
      markers += `<circle cx="${pts[i].x}" cy="${pts[i].y}" r="${r + 4}" fill="none" stroke="${accentColor}" stroke-width="1" opacity="0.3"/>`;
    }

    const labelY = pts[i].y + 22;
    markers += `<text x="${pts[i].x}" y="${labelY}" text-anchor="middle" font-size="9" fill="${done ? '#ccc' : '#444'}" font-family="-apple-system,sans-serif">${labels[i]}</text>`;
  }

  let rocket = '';
  if (currentStep > 0 && currentStep <= 5) {
    const rp = pts[currentStep - 1];
    rocket = `<text x="${rp.x}" y="${rp.y - 14}" text-anchor="middle" font-size="18">🚀</text>`;
  }

  const earth = `<text x="150" y="130" text-anchor="middle" dominant-baseline="central" font-size="80">🌍</text>`;
  const moon = `<text x="600" y="130" text-anchor="middle" dominant-baseline="central" font-size="50">🌑</text>`;

  const splash = currentStep >= 5 ? getSplashSVG(pts[4]) : getSplashPlaceholderSVG(pts[4]);

  return `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;filter:drop-shadow(0 0 6px rgba(0,229,255,0.2));">
    <style>.pulse { animation: pulse 1.5s ease-in-out infinite; } @keyframes pulse { 0%,100%{opacity:1;filter:drop-shadow(0 0 5px ${accentColor});} 50%{opacity:0.4} }</style>
    <path d="${pathD}" fill="none" stroke="rgba(0,229,255,0.15)" stroke-width="2" stroke-dasharray="8,6"/>
    ${currentStep > 0 ? `<path d="${pathD}" fill="none" stroke="${accentColor}" stroke-width="3" opacity="0.6"/>` : ''}
    ${earth}${moon}${splash}
    ${markers}
    ${rocket}
  </svg>`;
}

function getProgressBar(percentage, isComplete) {
  return `
    <div style="flex:1;">
      <div class="progress-bar-bg">
        <div class="progress-bar-fill" style="width: ${percentage}%"></div>
      </div>
    </div>
  `;
}

function getStepChecklist(steps) {
  const items = steps.map(s =>
    `<li class="${s.completed ? 'step-done' : 'step-pending'}">${s.completed ? '✅' : '○'} ${s.label}</li>`
  ).join('');
  return `<ul class="step-list">${items}</ul>`;
}

module.exports = {
  TRAJECTORY_POINTS,
  FIGURE_8_PATH,
  getBaseCSS,
  getTrajectoryPath,
  getProgressBar,
  getStepChecklist,
  getSplashSVG,
  getSlsSVG
};
