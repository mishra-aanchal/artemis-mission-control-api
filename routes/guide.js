const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { renderGuideLogs } = require('../templates/guide_logs');
const { renderGuideStory } = require('../templates/guide_story');
const { renderGuideMission } = require('../templates/guide_mission');

router.get('/guide/logs', (req, res) => {
  try {
    const rawData = fs.readFileSync(path.join(__dirname, '../sample_logs.json'), 'utf8');
    const logs = JSON.parse(rawData);
    
    // Removed cache header to allow logs to randomize on every page reload
    res.send(renderGuideLogs(logs));
  } catch (err) {
    console.error("Error loading sample_logs.json", err);
    res.status(500).send("Error reading sample logs database.");
  }
});

router.get('/guide/story', (req, res) => {
  try {
    const rawData = fs.readFileSync(path.join(__dirname, '../sample_logs.json'), 'utf8');
    const logs = JSON.parse(rawData);
    res.send(renderGuideStory(logs));
  } catch (err) {
    console.error(err);
    res.status(500).send("Error reading sample logs.");
  }
});

router.get('/guide/mission', (req, res) => {
  res.send(renderGuideMission());
});

module.exports = router;
