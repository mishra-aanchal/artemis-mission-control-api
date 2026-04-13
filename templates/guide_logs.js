const { getBaseCSS, getThemeToggleHTML, getThemeToggleJS } = require('./shared');

function renderGuideLogs(logs) {
  const css = getBaseCSS(false);

  const PHASE_ORDER = ['pre-launch', 'launch', 'orbit', 'transit', 'lunar-approach', 'flyby', 'return', 'reentry'];
  const logsByPhase = {};
  for (const phase of PHASE_ORDER) {
    // Shuffle the array elements randomly on every page load
    logsByPhase[phase] = logs.filter(l => l.phase === phase).sort(() => Math.random() - 0.5);
  }

  const categoryColors = {
    'anomaly': '#ff4d4d',
    'science': '#9c27b0',
    'life-support': '#4caf50',
    'communication': '#00bcd4',
    'navigation': '#ff9800',
    'crew-status': '#9e9e9e'
  };

  let htmlBody = '';

  for (const phase of PHASE_ORDER) {
    if (logsByPhase[phase] && logsByPhase[phase].length > 0) {
      htmlBody += `<div class="phase-section" data-phase="${phase}">`;
      htmlBody += `<h2 style="text-transform:uppercase; letter-spacing:2px; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:8px; margin-top:24px; color:#fff; font-size:1.2rem;">▰ ${phase.replace('-', ' ')}</h2>`;
      htmlBody += `<div class="log-grid">`;
      
      logsByPhase[phase].forEach((log, index) => {
        const catColor = categoryColors[log.category] || '#ffffff';
        const copyPayload = {
            title: log.title,
            description: log.description,
            phase: log.phase,
            category: log.category,
            crew_member: log.crew_member
        };
        const rawJson = JSON.stringify(copyPayload, null, 2).replace(/"/g, '&quot;');
        
        htmlBody += `
          <div class="log-card card" data-category="${log.category}" data-search="${log.title.toLowerCase()} ${log.description.toLowerCase()}" style="position:relative; display:flex; flex-direction:column; padding:16px;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px;">
              <span style="background:${catColor}15; color:${catColor}; border:1px solid ${catColor}44; padding:2px 6px; border-radius:4px; font-size:0.65rem; text-transform:uppercase; letter-spacing:1px;" class="mono">${log.category}</span>
              <button class="copy-btn mono" data-json="${rawJson}" style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); color:#00e5ff; padding:2px 6px; border-radius:4px; font-size:0.65rem; cursor:pointer; transition:all 0.2s;">[ COPY JSON ]</button>
            </div>
            <h3 style="font-size:1rem; margin-bottom:6px; color:#fff; font-weight:600; line-height:1.2;">${log.title}</h3>
            <p class="log-desc" style="color:#9e9e9e; font-size:0.8rem; flex-grow:1; margin-bottom:4px; line-height:1.4;">${log.description}</p>
            <button class="read-more-btn mono" style="background:transparent; border:none; color:#bbb; cursor:pointer; text-align:left; padding:0; margin-bottom:10px; font-size:0.65rem;">[ + MORE ]</button>
            <div style="border-top:1px solid rgba(255,255,255,0.05); padding-top:10px; display:flex; justify-content:space-between; font-size:0.75rem; color:#666;" class="mono">
              <span>CREW: <span style="color:#00e5ff;">${log.crew_member.toUpperCase()}</span></span>
            </div>
          </div>
        `;
      });
      htmlBody += `</div></div>`;
    }
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Artemis II — Mission Log Directory</title>
  <style>
    ${css}
    .search-bar {
      display: flex; gap: 12px; background: rgba(0,0,0,0.6); padding: 16px; border-radius: 8px; border: 1px solid rgba(0,229,255,0.2); margin-bottom: 24px; position: sticky; top: 16px; z-index: 100; backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px); box-shadow: 0 4px 20px rgba(0,0,0,0.5); flex-wrap: wrap;
    }
    input, select, .surprise-btn {
      background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #fff; padding: 10px 14px; border-radius: 6px; font-size: 0.95rem; outline: none; transition: all 0.2s; cursor: pointer;
    }
    select:focus, .surprise-btn:focus { border-color: #00e5ff; }
    .surprise-btn { flex: 1; min-width: 200px; font-weight: bold; color: #ffeb3b; border-color: rgba(255,235,59,0.3); }
    .surprise-btn:hover { background: rgba(255,235,59,0.1); border-color: #ffeb3b; text-shadow: 0 0 8px #ffeb3b; }
    .surprise-btn.copied { background: #4caf50; color: #fff; border-color: #4caf50; text-shadow: none; }
    .hidden { display: none !important; }
    .copy-btn:hover { background: rgba(0,229,255,0.1) !important; border-color: rgba(0,229,255,0.4) !important; text-shadow: 0 0 5px #00e5ff; }
    .copy-btn.copied { background: #4caf50 !important; color: #fff !important; border-color: #4caf50 !important; }
    .log-card { transition: transform 0.2s, box-shadow 0.2s; margin-bottom: 0 !important; }
    .log-card:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(0,229,255,0.1); border-color: rgba(0,229,255,0.3); }
    
    .log-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; margin-top: 16px; }
    @media (max-width: 1450px) { .log-grid { grid-template-columns: repeat(4, 1fr); } }
    @media (max-width: 1150px) { .log-grid { grid-template-columns: repeat(3, 1fr); } }
    @media (max-width: 850px)  { .log-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 550px)  { .log-grid { grid-template-columns: 1fr; } }
    
    .log-desc {
      display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
    }
    .log-desc.expanded { -webkit-line-clamp: unset; }
    .read-more-btn:hover { color: #fff !important; text-shadow: 0 0 5px #fff; }

    /* Light mode overrides */
    :root[data-theme="light"] .search-bar {
      background: rgba(255,255,255,0.9); border-color: rgba(0,0,0,0.1); box-shadow: 0 2px 12px rgba(0,0,0,0.06);
    }
    :root[data-theme="light"] input,
    :root[data-theme="light"] select {
      background: rgba(0,0,0,0.04); border-color: rgba(0,0,0,0.12); color: #1e293b;
    }
    :root[data-theme="light"] .surprise-btn { color: #b8860b; border-color: rgba(184,134,11,0.3); }
    :root[data-theme="light"] .surprise-btn:hover { background: rgba(184,134,11,0.08); text-shadow: none; }
    :root[data-theme="light"] .log-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.08); border-color: rgba(2,132,199,0.3); }
  </style>
</head>
<body>
  ${getThemeToggleHTML()}
  <div class="container" style="max-width: 1550px;">
    <h1 style="text-align:center; letter-spacing:3px; margin-bottom:8px;">ARTEMIS II — MISSION LOG LIBRARY</h1>
    <p style="text-align:center; color:#888; font-size:0.95rem; margin-bottom:40px;">Centralized data repository of standard formatted telemetry payloads</p>

    <div class="search-bar">
      <button id="surpriseBtn" class="surprise-btn mono">✨ SURPRISE ME (RANDOM JSON) ✨</button>
      <select id="phaseFilter">
        <option value="all">All Phases</option>
        ${PHASE_ORDER.map(p => `<option value="${p}">${p.toUpperCase()}</option>`).join('')}
      </select>
      <select id="categoryFilter">
        <option value="all">All Categories</option>
        <option value="anomaly">Anomaly</option>
        <option value="science">Science</option>
        <option value="life-support">Life Support</option>
        <option value="communication">Communication</option>
        <option value="navigation">Navigation</option>
        <option value="crew-status">Crew Status</option>
      </select>
    </div>

    <div id="logsContainer">
      ${htmlBody}
    </div>
  </div>

  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const phaseFilter = document.getElementById('phaseFilter');
      const categoryFilter = document.getElementById('categoryFilter');
      const surpriseBtn = document.getElementById('surpriseBtn');
      
      const sections = document.querySelectorAll('.phase-section');
      const cards = document.querySelectorAll('.log-card');
      const copyBtns = document.querySelectorAll('.copy-btn');

      function filterLogs() {
        const phaseValue = phaseFilter.value;
        const categoryValue = categoryFilter.value;

        sections.forEach(section => {
          const sectionPhase = section.getAttribute('data-phase');
          let phaseHasVisibleLogs = false;

          const sectionCards = section.querySelectorAll('.log-card');
          sectionCards.forEach(card => {
            const matchesPhase = phaseValue === 'all' || sectionPhase === phaseValue;
            const matchesCategory = categoryValue === 'all' || card.getAttribute('data-category') === categoryValue;

            if (matchesPhase && matchesCategory) {
              card.classList.remove('hidden');
              phaseHasVisibleLogs = true;
            } else {
              card.classList.add('hidden');
            }
          });

          if (phaseHasVisibleLogs) {
            section.classList.remove('hidden');
          } else {
            section.classList.add('hidden');
          }
        });
      }

      phaseFilter.addEventListener('change', filterLogs);
      categoryFilter.addEventListener('change', filterLogs);

      // Surprise Me Logic
      surpriseBtn.addEventListener('click', () => {
        const randomBtn = copyBtns[Math.floor(Math.random() * copyBtns.length)];
        const payload = randomBtn.getAttribute('data-json');
        
        navigator.clipboard.writeText(payload).then(() => {
          const oldText = surpriseBtn.innerText;
          surpriseBtn.innerText = '✨ COPIED TO CLIPBOARD! ✨';
          surpriseBtn.classList.add('copied');
          
          setTimeout(() => {
            surpriseBtn.innerText = oldText;
            surpriseBtn.classList.remove('copied');
          }, 1500);
        });
      });

      // Copy JSON button logic
      copyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const payload = e.target.getAttribute('data-json');
          
          navigator.clipboard.writeText(payload).then(() => {
            const oldText = e.target.innerText;
            e.target.innerText = '[ COPIED JSON! ]';
            e.target.classList.add('copied');
            
            setTimeout(() => {
              e.target.innerText = oldText;
              e.target.classList.remove('copied');
            }, 1000);
          });
        });
      });
      
      // Read More Toggle
      document.querySelectorAll('.read-more-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const desc = e.target.previousElementSibling;
          desc.classList.toggle('expanded');
          e.target.innerText = desc.classList.contains('expanded') ? '[ - LESS ]' : '[ + MORE ]';
        });
      });
    });
  </script>
  <script>${getThemeToggleJS()}</script>
</body>
</html>`;
}

module.exports = { renderGuideLogs };
