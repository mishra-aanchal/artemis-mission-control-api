const { getBaseCSS, TRAJECTORY_POINTS, FIGURE_8_PATH, getSplashSVG, getSlsSVG, getThemeToggleHTML, getThemeToggleJS } = require('./shared');

function renderGuideStory(allLogs = []) {
  const css = getBaseCSS(false);
  const width = 700;
  const height = 260;
  
  // Create trajectory markers
  let stepMarkers = '';
  const labels = ['Launch', 'Orbit', 'Transit', 'Flyby', 'Splash'];
  for (let i = 0; i < 5; i++) {
    stepMarkers += `<circle cx="${TRAJECTORY_POINTS[i].x}" cy="${TRAJECTORY_POINTS[i].y}" r="6" fill="#111827" stroke="rgba(0,229,255,0.6)" stroke-width="2"/>`;
    stepMarkers += `<text x="${TRAJECTORY_POINTS[i].x}" y="${TRAJECTORY_POINTS[i].y + 24}" text-anchor="middle" font-size="9" fill="#888" font-family="-apple-system,sans-serif">${labels[i]}</text>`;
  }

  // Pure SVG string of the rocket
  const rocketSVG = getSlsSVG({ x: 0, y: 0 });
  
  const oceanOnlySVG = `
    <g transform="translate(${TRAJECTORY_POINTS[4].x - 30}, ${TRAJECTORY_POINTS[4].y + 2})">
      <ellipse id="ocean-water" cx="30" cy="8" rx="40" ry="10" fill="rgba(0, 150, 255, 0.2)" filter="drop-shadow(0 0 4px rgba(0,229,255,0.4))"/>
      <path d="M -5 5 Q 10 0, 25 5 T 55 5 L 45 15 L 0 15 Z" fill="rgba(0, 200, 255, 0.4)"/>
      <path id="water-ripple" d="M 0 10 Q 15 5, 30 10 T 60 10" fill="none" stroke="#00e5ff" stroke-width="1.5" opacity="0.8"/>
    </g>
  `;

  const flyingOrionSVG = `
    <!-- Centered at 0,0, rotate 15 so it looks like it's pointing properly horizontally -->
    <g transform="scale(0.65) rotate(15)">
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
      <path d="M8,-8 L14,-4" stroke="#e53935" stroke-width="1.5"/>
      <circle cx="12" cy="0" r="1.5" fill="#424242"/>
    </g>
  `;

  const mapSvg = `<svg viewBox="0 0 ${width} ${height + 20}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;filter:drop-shadow(0 0 8px rgba(0,229,255,0.1));">
    <defs>
      <radialGradient id="glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="rgba(0,229,255,0.4)" />
        <stop offset="100%" stop-color="rgba(0,229,255,0)" />
      </radialGradient>
    </defs>
    <rect x="-10" y="-10" width="${width+20}" height="${height+40}" fill="none"/>
    
    <!-- Planets -->
    <circle cx="150" cy="130" r="60" fill="url(#glow)"/>
    <text x="150" y="130" text-anchor="middle" dominant-baseline="central" font-size="80">🌍</text>
    <text x="600" y="130" text-anchor="middle" dominant-baseline="central" font-size="50">🌑</text>
    
    <!-- Path & Markers -->
    <path d="${FIGURE_8_PATH}" fill="none" stroke="rgba(0,229,255,0.2)" stroke-width="3" stroke-dasharray="8,6"/>
    ${oceanOnlySVG}
    ${stepMarkers}
    
    <!-- Animated Rocket Container -->
    <g id="animated-rocket" style="offset-path: path('${FIGURE_8_PATH}'); offset-rotate: auto 90deg; offset-distance: 0%; transition: offset-distance 2s ease-in-out;">
      <g id="rocket-sls" style="transition: opacity 0.5s;">${rocketSVG}</g>
      <g id="rocket-orion" style="opacity: 0; transition: opacity 0.5s;">${flyingOrionSVG}</g>
    </g>
  </svg>`;

  // Shuffle and pick 3 dynamic logs for the story
  const shuffled = allLogs.sort(() => 0.5 - Math.random());
  const log1 = shuffled[0] || { title: "Test 1", description: "Default", phase: "launch", category: "navigation", crew_member: "wiseman" };
  const log2 = shuffled.find(l => l.category !== log1.category) || shuffled[1];
  const log3 = shuffled.find(l => l.category !== log1.category && l.category !== log2.category) || shuffled[2];
  
  const orbitPayload1 = {
    title: log1.title,
    description: log1.description,
    phase: "launch",
    category: log1.category,
    crew_member: log1.crew_member
  };
  const orbitPayload2 = {
    title: log2.title,
    description: log2.description,
    phase: "orbit",
    category: log2.category,
    crew_member: log2.crew_member
  };
  const orbitPayload3 = {
    title: log3.title,
    description: log3.description,
    phase: "transit",
    category: log3.category,
    crew_member: log3.crew_member
  };

  const patchPayload = {
    title: log2.title + " (RESOLVED)",
    description: "The issue described in the log has been fully investigated and resolved by the crew."
  };

  const STEPS_DATA = [
    {
      title: "Step 1: The Launch",
      description: "Your journey begins. Authenticate with Mission Control to receive your unique callsign, API key, and mission sigil. Enter your name below — it will be embedded into your payload.",
      method: "POST",
      endpoint: "/register",
      headers: { "Content-Type": "application/json" },
      body: {
        "name": "YOUR_NAME",
        "email": "{{$randomEmail}}"
      },
      isEditable: true
    },
    {
      title: "Step 2: Earth Orbit (Log 1 of 3)",
      description: "The SLS core detaches. Now flying Orion. You must submit at least 3 logs, covering at least 2 different categories. (Here is your 1st securely generated payload).",
      method: "POST",
      endpoint: "/logs",
      headers: { "x-api-key": "{{API_KEY}}", "Content-Type": "application/json" },
      body: orbitPayload1
    },
    {
      title: "Step 2: Earth Orbit (Log 2 of 3)",
      description: "Keep pushing telemetry to the Gateway network. Here is your 2nd payload to send in a new Postman request.",
      method: "POST",
      endpoint: "/logs",
      headers: { "x-api-key": "{{API_KEY}}", "Content-Type": "application/json" },
      body: orbitPayload2
    },
    {
      title: "Step 2: Earth Orbit (Log 3 of 3)",
      description: "Final telemetry package. Notice how the categories have shuffled. Send this final piece of data to close the orbit milestone.",
      method: "POST",
      endpoint: "/logs",
      headers: { "x-api-key": "{{API_KEY}}", "Content-Type": "application/json" },
      body: orbitPayload3
    },
    {
      title: "Step 3: Transit",
      description: "An anomaly occurred, and you fixed it! Update an existing log to indicate the resolution. <b>Replace :id with your log's ID.</b>",
      method: "PATCH",
      endpoint: "/logs/1",
      headers: { "x-api-key": "{{API_KEY}}", "Content-Type": "application/json" },
      body: patchPayload
    },
    {
      title: "Step 4: Lunar Flyby",
      description: "Clear out deprecated routine diagnostic data to save bandwidth by deleting a non-anomaly log. <b>Replace :id with an existing log ID.</b>",
      method: "DELETE",
      endpoint: "/logs/2",
      headers: { "x-api-key": "{{API_KEY}}" },
      body: null
    },
    {
      title: "Step 5: Splashdown",
      description: "The mission is complete! Generate your final mission briefing to review the data.",
      method: "POST",
      endpoint: "/mission/brief",
      headers: { "x-api-key": "{{API_KEY}}", "Content-Type": "application/json" },
      body: {
        "phase": "launch"
      }
    }
  ];

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Artemis II — Interactive Tutorial</title>
  <style>
    ${css}
    .controls { display: flex; justify-content: space-between; margin-top: 24px; gap: 16px; }
    .btn { background: rgba(0, 229, 255, 0.1); border: 1px solid rgba(0, 229, 255, 0.4); color: #00e5ff; padding: 12px 24px; border-radius: 6px; font-weight: bold; cursor: pointer; transition: all 0.2s; letter-spacing: 1px; flex: 1; text-align: center; }
    .btn:hover:not(.disabled) { background: rgba(0, 229, 255, 0.2); box-shadow: 0 0 15px rgba(0,229,255,0.4); }
    .btn.disabled { opacity: 0.3; cursor: not-allowed; border-color: #555; color: #555; background: transparent; }
    .btn-copy { background: #28a74522; border-color: #28a745; color: #4ade80; display: block; margin-top: 16px; width: 100%; box-sizing: border-box; }
    .btn-copy:hover { background: #28a74544; box-shadow: 0 0 15px rgba(40,167,69,0.4); }
    
    .code-block { background: rgba(0,0,0,0.6); padding: 16px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1); overflow-x: auto; font-family: monospace; font-size: 0.85rem; color: #a8a29e; line-height: 1.5; }
    .method { font-weight: bold; padding: 2px 6px; border-radius: 4px; margin-right: 8px; color: #fff; }
    .method-POST { background: #d97706; }
    .method-PATCH { background: #059669; }
    .method-DELETE { background: #dc2626; }
    
    .step-card { transition: opacity 0.3s ease, transform 0.3s ease; display: none; }
    .step-card.active { display: block; animation: slideUp 0.4s ease forwards; }
    @keyframes megaSplash {
      0% { transform: scale(1); opacity: 0.8; stroke-width: 1.5; }
      50% { transform: scale(1.5); opacity: 1; stroke-width: 3; stroke: #00e5ff; }
      100% { transform: scale(1); opacity: 0; }
    }
    .trigger-splash { animation: megaSplash 1s ease-out; }

    /* ── Light Mode Overrides ── */
    :root[data-theme="light"] .btn {
      background: rgba(2,132,199,0.08);
      border-color: rgba(2,132,199,0.35);
      color: #0284c7;
    }
    :root[data-theme="light"] .btn:hover:not(.disabled) {
      background: rgba(2,132,199,0.15);
      box-shadow: 0 0 10px rgba(2,132,199,0.15);
    }
    :root[data-theme="light"] .btn.disabled {
      color: #cbd5e1;
      border-color: #e2e8f0;
    }
    :root[data-theme="light"] .btn-copy {
      background: rgba(5,150,105,0.08);
      border-color: rgba(5,150,105,0.35);
      color: #059669;
    }
    :root[data-theme="light"] .btn-copy:hover {
      background: rgba(5,150,105,0.15);
      box-shadow: 0 0 10px rgba(5,150,105,0.15);
    }
    :root[data-theme="light"] .code-block {
      background: rgba(0,0,0,0.03) !important;
      border-color: rgba(0,0,0,0.1) !important;
      color: #475569;
    }
    :root[data-theme="light"] .code-block span[style*="color:#00e5ff"],
    :root[data-theme="light"] .code-block span[style*="color: #00e5ff"] {
      color: #0284c7 !important;
    }
    :root[data-theme="light"] .code-block span[style*="color:#6ee7b7"] {
      color: #059669 !important;
    }
    :root[data-theme="light"] .code-block span[style*="color:#e2e8f0"] {
      color: #334155 !important;
    }
    :root[data-theme="light"] .code-block span[style*="color:#a8a29e"] {
      color: #475569 !important;
    }
    :root[data-theme="light"] #pilot-name-input {
      background: rgba(0,0,0,0.03) !important;
      border-color: rgba(2,132,199,0.3) !important;
      color: #0f172a !important;
    }
    :root[data-theme="light"] #pilot-name-input::placeholder {
      color: #94a3b8;
    }
    :root[data-theme="light"] label[style*="color:#00e5ff"] {
      color: #0284c7 !important;
    }
    /* Step card description text */
    :root[data-theme="light"] .step-card p[style*="color:#aaa"] {
      color: #475569 !important;
    }
    /* Step card header */
    :root[data-theme="light"] .step-card h2[style*="color:#fff"] {
      color: #0f172a !important;
    }
    /* Map text labels */
    :root[data-theme="light"] svg text[fill="#888"] {
      fill: #64748b;
    }
    /* SVG step markers */
    :root[data-theme="light"] svg circle[fill="#111827"] {
      fill: #f1f5f9;
    }
  </style>
</head>
<body>
  ${getThemeToggleHTML()}
  <div class="container" style="max-width: 1400px;">
    <h1 style="text-align:center; letter-spacing:3px;">ARTEMIS II — DYNAMIC MISSION STORY</h1>
    <p style="text-align:center; color:#888; font-size:0.9rem; margin-bottom:40px;">Complete the 5 milestones. The JSON payloads shown below are uniquely generated for your session!</p>

    <div style="display: flex; gap: 40px; align-items: flex-start; flex-wrap: wrap;">
      <!-- Map Render -->
      <div class="card" style="padding:20px; flex: 1.5; min-width: 650px;">
        ${mapSvg}
      </div>

      <!-- Active Step Content Area & Navigation -->
      <div style="flex: 1; display:flex; flex-direction:column; min-width: 400px;">
        <div id="tutorial-content" class="card" style="min-height: 480px; flex-grow:1; display:flex; flex-direction:column; justify-content:center;">
          <!-- JavaScript will inject step cards here -->
        </div>

        <!-- Navigation -->
        <div class="controls" style="margin-top:20px;">
          <button class="btn mono disabled" id="btn-back">« RETREAT</button>
          <button class="btn mono" id="btn-next">ADVANCE »</button>
        </div>
      </div>
    </div>
    
    <div class="footer">ARTEMIS WORKSHOP &bull; APR 2026 &bull; POSTMAN API<br>Made by <a href="https://www.linkedin.com/in/mishra-aanchal/" target="_blank" rel="noopener">Aanchal Mishra</a></div>
  </div>

  <script>
    // Warn user on reload about unique story gen keeping API safe
    window.addEventListener('beforeunload', function (e) {
      e.preventDefault();
      e.returnValue = "If you refresh, this story will disappear but you'll see a new story! Your data is secured via the REST API so your actual progress is intact.";
    });

    const STEPS_DATA = ${JSON.stringify(STEPS_DATA)};
    const PATH_DISTANCES = [0, 15, 15, 15, 28, 65, 100];
    let currentStep = 0;

    const contentDiv = document.getElementById('tutorial-content');
    const btnBack = document.getElementById('btn-back');
    const btnNext = document.getElementById('btn-next');
    const rocketSls = document.getElementById('rocket-sls');
    const rocketOrion = document.getElementById('rocket-orion');
    const rocketContainer = document.getElementById('animated-rocket');
    const waterRipple = document.getElementById('water-ripple');

    function copyToClipboard(text, btnElement) {
      navigator.clipboard.writeText(text).then(() => {
        const oldText = btnElement.innerText;
        btnElement.innerText = '[ COPIED PAYLOAD! ]';
        btnElement.style.color = '#fff';
        btnElement.style.borderColor = '#fff';
        setTimeout(() => {
          btnElement.innerText = oldText;
          btnElement.style.color = '';
          btnElement.style.borderColor = '';
        }, 2000);
      });
    }

    function renderStep() {
      const step = STEPS_DATA[currentStep];
      let headersHtml = '';
      for (const [key, val] of Object.entries(step.headers)) {
        headersHtml += \`\${key}: \${val}\\n\`;
      }
      
      let bodiesHtml = '';
      let buttonsHtml = '';
      
      const bodiesArr = step.bodies ? step.bodies : (step.body ? [step.body] : []);
      
      if (bodiesArr.length > 0) {
        bodiesArr.forEach((b, idx) => {
          const bStr = JSON.stringify(b, null, 2);
          const lbl = bodiesArr.length > 1 ? \` \${idx + 1}\` : '';
          bodiesHtml += \`<br><span style="color:#6ee7b7;">// Body\${lbl}</span>\\n<span style="color:#e2e8f0;">\${bStr}</span>\\n\`;
          buttonsHtml += \`<button class="btn btn-copy mono" style="margin-top:8px" onclick='copyToClipboard(\\\`\${bStr.replace(/'/g, "\\\\'")}\\\`, this)'>[ COPY RAW JSON\${lbl} ]</button>\`;
        });
      }

      // Build the view — with special interactive mode for Step 1
      let view;
      if (currentStep === 0 && step.isEditable) {
        const defaultBody = JSON.stringify(step.body, null, 2);
        view = \`
          <div class="step-card active">
            <h2 style="margin-top:0; color:#fff;">\${step.title}</h2>
            <p style="color:#aaa; font-size:0.95rem; margin-bottom: 20px; line-height: 1.5;">\${step.description}</p>
            
            <div style="margin-bottom:16px;">
              <label style="display:block; color:#00e5ff; font-size:0.8rem; letter-spacing:2px; margin-bottom:6px; font-weight:bold;">FLIGHT DIRECTOR NAME</label>
              <input id="pilot-name-input" type="text" placeholder="Enter your name..." 
                style="width:100%; padding:12px 16px; background:rgba(0,0,0,0.6); border:1px solid rgba(0,229,255,0.4); border-radius:6px; color:#fff; font-size:1rem; font-family:monospace; outline:none; box-sizing:border-box;"
              />
            </div>
            
            <div class="code-block" style="margin-bottom: 12px; font-size:1rem; border-color: rgba(0,229,255,0.4); background: rgba(0,229,255,0.05);">
              <span class="method method-\${step.method}">\${step.method}</span>
              <span style="color:#00e5ff;">\${step.endpoint}</span>
            </div>
            
            <div class="code-block" style="max-height: 240px;">
              <span style="color:#6ee7b7;">// Headers</span>\\n\${headersHtml}
              <br><span style="color:#6ee7b7;">// Body (updates as you type)</span>\\n<span id="live-body-preview" style="color:#e2e8f0;">\${defaultBody}</span>
            </div>
            
            <button id="live-copy-btn" class="btn btn-copy mono" style="margin-top:8px" onclick='copyToClipboard(\\\`\${defaultBody.replace(/'/g, "\\\\'")}\\\`, this)'>[ COPY RAW JSON ]</button>
          </div>
        \`;
      } else {
        view = \`
          <div class="step-card active">
            <h2 style="margin-top:0; color:#fff;">\${step.title}</h2>
            <p style="color:#aaa; font-size:0.95rem; margin-bottom: 20px; line-height: 1.5;">\${step.description}</p>
            
            <div class="code-block" style="margin-bottom: 12px; font-size:1rem; border-color: rgba(0,229,255,0.4); background: rgba(0,229,255,0.05);">
              <span class="method method-\${step.method}">\${step.method}</span>
              <span style="color:#00e5ff;">\${step.endpoint}</span>
            </div>
            
            <div class="code-block" style="max-height: 240px;">
              <span style="color:#6ee7b7;">// Headers</span>\\n\${headersHtml}\${bodiesHtml}
            </div>
            
            <div style="display:flex; flex-direction:column; gap:4px; margin-top:8px;">
              \${buttonsHtml}
            </div>
          </div>
        \`;
      }

      contentDiv.innerHTML = view;

      // Special interactive mode for Step 1 (editable name)
      if (currentStep === 0 && step.isEditable) {
        const nameInput = document.getElementById('pilot-name-input');
        if (nameInput) {
          nameInput.addEventListener('input', function() {
            const name = this.value || 'YOUR_NAME';
            const liveBody = JSON.stringify({ name: name, email: '{{$randomEmail}}' }, null, 2);
            document.getElementById('live-body-preview').textContent = liveBody;
            // Update the copy button
            const copyBtn = document.getElementById('live-copy-btn');
            if (copyBtn) {
              copyBtn.onclick = function() { copyToClipboard(liveBody, copyBtn); };
            }
          });
        }
      }
      rocketContainer.style.offsetDistance = PATH_DISTANCES[currentStep] + '%';
      
      // Stage Separation Logic (SLS detaches after step 0)
      if (currentStep > 0) {
        rocketSls.style.opacity = '0';
        rocketOrion.style.opacity = '1';
      } else {
        rocketSls.style.opacity = '1';
        rocketOrion.style.opacity = '0';
      }

      // Splashdown Logic
      if (currentStep === 6) {
        setTimeout(() => waterRipple.classList.add('trigger-splash'), 1500); // trigger splash when rocket arrives
        btnNext.innerText = '↺ RESET STORY';
        btnNext.style.background = '#d9770644';
        btnNext.style.borderColor = '#d97706';
        btnNext.style.color = '#d97706';
      } else {
        waterRipple.classList.remove('trigger-splash');
        btnNext.innerText = 'ADVANCE »';
        btnNext.style.background = '';
        btnNext.style.borderColor = '';
        btnNext.style.color = '';
      }
      
      btnBack.classList.toggle('disabled', currentStep === 0);
    }

    btnNext.addEventListener('click', () => {
      if (currentStep === 6) {
        if (confirm("Proceed to Reset? The API keeps your progress, but this unique storyline will shuffle.")) {
          window.removeEventListener('beforeunload', null); // clear reload warning
          window.location.reload();
        }
        return;
      }
      if (currentStep < STEPS_DATA.length - 1) {
        currentStep++;
        renderStep();
      }
    });

    btnBack.addEventListener('click', () => {
      if (currentStep > 0) {
        currentStep--;
        renderStep();
      }
    });

    // Initial render
    renderStep();
  </script>
  <script>${getThemeToggleJS()}</script>
</body>
</html>`;
}

module.exports = { renderGuideStory };
