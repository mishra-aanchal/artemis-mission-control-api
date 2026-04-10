// 5 step positions along a curved Earth -> Moon -> Earth trajectory
// Coordinates for a 700x200 viewBox
const TRAJECTORY_POINTS = [
  { x: 70, y: 170 },   // Step 1: Launch
  { x: 210, y: 60 },   // Step 2: Earth Orbit
  { x: 350, y: 30 },   // Step 3: Transit
  { x: 490, y: 60 },   // Step 4: Lunar Flyby
  { x: 630, y: 170 },  // Step 5: Splashdown
];

function getBaseCSS(isComplete) {
  const accentColor = isComplete ? '#ffd600' : '#00e5ff';
  return `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: #0a0e17;
      color: #e0e0e0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      line-height: 1.6;
      min-height: 100vh;
    }
    .container {
      max-width: 700px;
      width: 95%;
      margin: 0 auto;
      padding: 24px 0;
    }
    .mono {
      font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
    }
    h1, h2, h3 {
      color: ${accentColor};
      letter-spacing: 1px;
    }
    h1 { font-size: 1.4rem; margin-bottom: 8px; }
    h2 { font-size: 1.1rem; margin: 24px 0 12px; border-bottom: 1px solid #1a2035; padding-bottom: 6px; }
    .accent { color: ${accentColor}; }
    .dim { color: #555; }
    .card {
      background: #111827;
      border: 1px solid #1a2035;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 16px;
    }
    .progress-bar-bg {
      background: #1a2035;
      border-radius: 4px;
      height: 10px;
      width: 100%;
      overflow: hidden;
      margin: 8px 0;
    }
    .progress-bar-fill {
      height: 100%;
      border-radius: 4px;
      background: linear-gradient(90deg, ${accentColor}, ${isComplete ? '#ffab00' : '#0288d1'});
      transition: width 1.5s ease-out;
    }
    .step-list {
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      gap: 6px 16px;
      font-size: 0.85rem;
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
  `;
}

function getTrajectoryPath(currentStep, options = {}) {
  const { width = 700, height = 200, isComplete = false } = options;
  const accentColor = isComplete ? '#ffd600' : '#00e5ff';
  const dimColor = '#1a2035';

  const scaleX = width / 700;
  const scaleY = height / 200;
  const pts = TRAJECTORY_POINTS.map(p => ({ x: p.x * scaleX, y: p.y * scaleY }));

  const pathD = `M ${pts[0].x} ${pts[0].y} C ${pts[0].x + 60 * scaleX} ${pts[0].y - 80 * scaleY}, ${pts[1].x - 60 * scaleX} ${pts[1].y}, ${pts[1].x} ${pts[1].y} C ${pts[1].x + 60 * scaleX} ${pts[1].y - 20 * scaleY}, ${pts[2].x - 60 * scaleX} ${pts[2].y}, ${pts[2].x} ${pts[2].y} C ${pts[2].x + 60 * scaleX} ${pts[2].y}, ${pts[3].x - 60 * scaleX} ${pts[3].y - 20 * scaleY}, ${pts[3].x} ${pts[3].y} C ${pts[3].x + 60 * scaleX} ${pts[3].y}, ${pts[4].x - 60 * scaleX} ${pts[4].y - 80 * scaleY}, ${pts[4].x} ${pts[4].y}`;

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

  const earth = `<text x="${pts[0].x - 20 * scaleX}" y="${pts[0].y + 5}" font-size="20">🌍</text>`;
  const moon = `<text x="${pts[2].x}" y="${pts[2].y - 20}" text-anchor="middle" font-size="18">🌑</text>`;
  const splash = currentStep >= 5 ? `<text x="${pts[4].x + 18 * scaleX}" y="${pts[4].y + 5}" font-size="18">🌊</text>` : '';

  return `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;">
    <style>.pulse { animation: pulse 1.5s ease-in-out infinite; } @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }</style>
    <path d="${pathD}" fill="none" stroke="#1a2035" stroke-width="2" stroke-dasharray="6,4"/>
    ${currentStep > 0 ? `<path d="${pathD}" fill="none" stroke="${accentColor}" stroke-width="2" opacity="0.4"/>` : ''}
    ${earth}${moon}${splash}
    ${markers}
    ${rocket}
  </svg>`;
}

function getProgressBar(percentage, isComplete) {
  return `
    <div class="progress-bar-bg">
      <div class="progress-bar-fill" style="width: ${percentage}%"></div>
    </div>
    <div class="mono" style="font-size:0.85rem; text-align:right; color:${isComplete ? '#ffd600' : '#00e5ff'};">${percentage}%</div>
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
  getBaseCSS,
  getTrajectoryPath,
  getProgressBar,
  getStepChecklist,
};
