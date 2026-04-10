const PALETTE = [
  { primary: '#1a237e', secondary: '#283593', accent: '#ffd600' },
  { primary: '#0d47a1', secondary: '#1565c0', accent: '#ffffff' },
  { primary: '#1b5e20', secondary: '#2e7d32', accent: '#ffd600' },
  { primary: '#b71c1c', secondary: '#c62828', accent: '#ffffff' },
  { primary: '#4a148c', secondary: '#6a1b9a', accent: '#ffd600' },
  { primary: '#004d40', secondary: '#00695c', accent: '#ffffff' },
  { primary: '#e65100', secondary: '#ef6c00', accent: '#1a237e' },
  { primary: '#263238', secondary: '#37474f', accent: '#00e5ff' },
  { primary: '#1a237e', secondary: '#4a148c', accent: '#ff6f00' },
  { primary: '#0d47a1', secondary: '#01579b', accent: '#ffd600' },
  { primary: '#311b92', secondary: '#4527a0', accent: '#00e5ff' },
  { primary: '#bf360c', secondary: '#d84315', accent: '#ffd600' },
];

function hashCallsign(callsign) {
  let hash = 0;
  for (let i = 0; i < callsign.length; i++) {
    const char = callsign.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

function generateSigil(callsign) {
  const hash = hashCallsign(callsign);
  const colors = PALETTE[hash % PALETTE.length];

  // Derive star positions from hash
  const starCount = 3 + (hash % 4);
  let stars = '';
  for (let i = 0; i < starCount; i++) {
    const seed = hashCallsign(callsign + i);
    const cx = 40 + (seed % 220);
    const cy = 40 + ((seed >> 8) % 160);
    const r = 1.5 + (seed % 3);
    stars += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${colors.accent}" opacity="0.7"/>`;
  }

  // Moon arc position derived from hash
  const moonX = 180 + (hash % 40);
  const moonY = 60 + (hash % 30);

  const parts = [
    `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">`,
    `<defs><clipPath id="hex-${hash}"><polygon points="150,10 280,80 280,220 150,290 20,220 20,80"/></clipPath></defs>`,
    `<polygon points="150,10 280,80 280,220 150,290 20,220 20,80" fill="${colors.secondary}" stroke="${colors.accent}" stroke-width="3"/>`,
    `<g clip-path="url(#hex-${hash})">`,
    `<rect width="300" height="300" fill="${colors.primary}"/>`,
    `<path d="M 30 200 Q 150 100 270 200" stroke="${colors.secondary}" stroke-width="4" fill="none" opacity="0.6"/>`,
    `<circle cx="${moonX}" cy="${moonY}" r="30" fill="${colors.secondary}" opacity="0.8"/>`,
    `<circle cx="${moonX + 10}" cy="${moonY - 5}" r="28" fill="${colors.primary}"/>`,
    stars,
    `<text x="150" y="175" text-anchor="middle" font-family="'SF Mono','Consolas',monospace" font-size="22" font-weight="bold" fill="${colors.accent}" letter-spacing="2">${callsign}</text>`,
    `<text x="150" y="260" text-anchor="middle" font-family="-apple-system,sans-serif" font-size="10" fill="${colors.accent}" opacity="0.7" letter-spacing="3">ARTEMIS WORKSHOP</text>`,
    `</g>`,
    `<polygon points="150,10 280,80 280,220 150,290 20,220 20,80" fill="none" stroke="${colors.accent}" stroke-width="2.5"/>`,
    `</svg>`,
  ];
  return parts.join('');
}

module.exports = { generateSigil, hashCallsign, PALETTE };
