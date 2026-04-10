const db = require('./db');

const WORDS = [
  'EAGLE', 'ODYSSEY', 'INTREPID', 'COLUMBIA', 'CHALLENGER',
  'ENDEAVOUR', 'DISCOVERY', 'ATLANTIS', 'ORION', 'PHOENIX',
  'HORIZON', 'PIONEER', 'VOYAGER', 'ARTEMIS', 'APOLLO',
  'GEMINI', 'MERCURY', 'TITAN', 'NOVA', 'COSMOS',
  'FALCON', 'AURORA', 'VANGUARD', 'LIBERTY',
];

async function generateCallsign() {
  for (let attempt = 0; attempt < 50; attempt++) {
    const word = WORDS[Math.floor(Math.random() * WORDS.length)];
    const number = Math.floor(Math.random() * 99) + 1;
    const callsign = `${word}-${number}`;

    const result = await db.query(
      'SELECT id FROM users WHERE callsign = $1', [callsign]
    );

    if (result.rows.length === 0) return callsign;
  }
  return `MISSION-${Date.now() % 10000}`;
}

module.exports = { generateCallsign };
