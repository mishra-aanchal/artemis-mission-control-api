const PHASES = ['pre-launch', 'launch', 'orbit', 'transit', 'lunar-approach', 'flyby', 'return', 'reentry'];
const CATEGORIES = ['navigation', 'life-support', 'communication', 'science', 'crew-status', 'anomaly'];
const CREW_MEMBERS = ['wiseman', 'glover', 'koch', 'hansen'];

const CREW_DISPLAY = {
  wiseman: { name: 'Reid Wiseman', role: 'Commander' },
  glover: { name: 'Victor Glover', role: 'Pilot' },
  koch: { name: 'Christina Koch', role: 'Mission Specialist' },
  hansen: { name: 'Jeremy Hansen', role: 'Mission Specialist (CSA)' },
};

module.exports = {
  PHASES,
  CATEGORIES,
  CREW_MEMBERS,
  CREW_DISPLAY,
};
