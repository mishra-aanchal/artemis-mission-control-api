# 🚀 End-to-End Mission Completion Examples

This guide provides complete, copy-paste-ready examples to complete your Artemis II mission from **Launch to Splashdown**.

---

## Mission Progress Tracker

```
STEP 1        2          3            4          5
  🚀─────────🌍─────────➡️──────────🌑─────────🌊
 LAUNCH     ORBIT     TRANSIT      FLYBY    SPLASHDOWN
```

---

## Complete Mission Scenario: The Perfect Flight

This walkthrough simulates a realistic Artemis II mission with authentic log entries.

---

### 🚀 STEP 1: LAUNCH — Register for Mission

**Request:**
```http
POST {{BASE_URL}}/register
Content-Type: application/json

{
  "name": "Alex Chen",
  "email": "alex.chen@nasa.example.gov"
}
```

**Response (201 Created):**
```json
{
  "message": "Mission clearance granted. Welcome aboard, Flight Director.",
  "name": "Alex Chen",
  "email": "alex.chen@nasa.example.gov",
  "callsign": "EAGLE-42",
  "api_key": "EAGLE-42_a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "sigil": "<svg viewBox='0 0 200 200'>...</svg>"
}
```

**What Happened:**
- You received your unique callsign (mission identity)
- You received your API key (mission clearance)
- You received your sigil (unique mission patch)
- Rocket moved to **Step 1: Launch** ✅

**Save This:**
```
API_KEY=EAGLE-42_a1b2c3d4-e5f6-7890-abcd-ef1234567890
```

---

### 🌍 STEP 2: EARTH ORBIT — Create Your First Log

**Request:**
```http
POST {{BASE_URL}}/logs
x-api-key: {{API_KEY}}
Content-Type: application/json

{
  "title": "Pre-flight systems check complete",
  "description": "All primary and backup systems verified. Navigation computer aligned with star tracker data. Launch readiness confirmed.",
  "phase": "pre-launch",
  "category": "navigation",
  "crew_member": "wiseman"
}
```

**Response (201 Created):**
```json
{
  "message": "Log entry recorded.",
  "log": {
    "id": 1,
    "user_id": 1,
    "title": "Pre-flight systems check complete",
    "description": "All primary and backup systems verified...",
    "phase": "pre-launch",
    "category": "navigation",
    "crew_member": "wiseman",
    "created_at": "2024-04-08T10:30:00.000Z",
    "updated_at": "2024-04-08T10:30:00.000Z"
  },
  "mission_status": {
    "current_step": 2,
    "current_phase": "orbit",
    "steps_completed": 2,
    "total_steps": 5,
    "completion_percentage": 40
  }
}
```

**What Happened:**
- First mission log created
- Rocket moved to **Step 2: Earth Orbit** ✅

---

### Additional Logs (Building Toward Step 5)

Create 4 more logs to reach the 5+ required for splashdown:

---

#### Log 2: Launch Phase - Life Support

```http
POST {{BASE_URL}}/logs
x-api-key: {{API_KEY}}
Content-Type: application/json

{
  "title": "Environmental control system activated",
  "description": "Cabin pressure stabilized at 14.7 psi. CO2 scrubbers online. Humidity control nominal at 45%.",
  "phase": "launch",
  "category": "life-support",
  "crew_member": "koch"
}
```

**Response (201 Created):**
```json
{
  "message": "Log entry recorded.",
  "log": {
    "id": 2,
    "title": "Environmental control system activated",
    "phase": "launch",
    "category": "life-support",
    "crew_member": "koch"
  },
  "mission_status": {
    "current_step": 2,
    "steps_completed": 2
  }
}
```

---

#### Log 3: Orbit Phase - Communication

```http
POST {{BASE_URL}}/logs
x-api-key: {{API_KEY}}
Content-Type: application/json

{
  "title": "Deep Space Network link established",
  "description": "Primary antenna locked onto DSN Goldstone. Backup link to Canberra confirmed. Telemetry flowing at 2 Mbps.",
  "phase": "orbit",
  "category": "communication",
  "crew_member": "glover"
}
```

---

#### Log 4: Transit Phase - Science

```http
POST {{BASE_URL}}/logs
x-api-key: {{API_KEY}}
Content-Type: application/json

{
  "title": "Earth imaging sequence initiated",
  "description": "Capturing high-resolution imagery of Earth's terminator. Data stored for downlink during next DSN pass.",
  "phase": "transit",
  "category": "science",
  "crew_member": "hansen"
}
```

---

#### Log 5: Transit Phase - Anomaly (Important!)

```http
POST {{BASE_URL}}/logs
x-api-key: {{API_KEY}}
Content-Type: application/json

{
  "title": "Minor thermal fluctuation detected",
  "description": "Sensor 4B showing intermittent readings in service module. Backup sensor cross-checked. Monitoring continues.",
  "phase": "transit",
  "category": "anomaly",
  "crew_member": "koch"
}
```

> ⚠️ **Note:** Anomaly logs cannot be deleted — they are permanent mission records. Choose carefully!

---

### ➡️ STEP 3: TRANSIT — Update a Log

Update one of your existing logs. This simulates real mission operations where logs are revised as situations develop.

**Request:**
```http
PATCH {{BASE_URL}}/logs/2
x-api-key: {{API_KEY}}
Content-Type: application/json

{
  "title": "Environmental control system — optimization complete",
  "description": "Cabin pressure stabilized at 14.7 psi. CO2 scrubbers online. Humidity control optimized to 42% for crew comfort. Oxygen flow reduced to conservation mode."
}
```

**Response (200 OK):**
```json
{
  "message": "Log entry updated.",
  "log": {
    "id": 2,
    "title": "Environmental control system — optimization complete",
    "description": "Cabin pressure stabilized at 14.7 psi...",
    "updated_at": "2024-04-08T11:15:00.000Z"
  },
  "mission_status": {
    "current_step": 3,
    "current_phase": "transit",
    "steps_completed": 3
  }
}
```

**What Happened:**
- Log entry updated with new information
- Rocket moved to **Step 3: Transit** ✅

---

### 🌑 STEP 4: LUNAR FLYBY — Get Mission Briefing

Request a comprehensive mission status briefing.

**Request (Full Mission Briefing):**
```http
POST {{BASE_URL}}/mission/brief
x-api-key: {{API_KEY}}
Content-Type: application/json

{}
```

**Response (200 OK):**
```json
{
  "briefing": {
    "phase": "all",
    "total_logs": 5,
    "categories": {
      "navigation": 1,
      "life-support": 1,
      "communication": 1,
      "science": 1,
      "anomaly": 1
    },
    "crew": {
      "wiseman": { "name": "Reid Wiseman", "count": 1 },
      "koch": { "name": "Christina Koch", "count": 2 },
      "glover": { "name": "Victor Glover", "count": 1 },
      "hansen": { "name": "Jeremy Hansen", "count": 1 }
    },
    "recommendations": [
      "No logs for: crew-status — consider logging these areas",
      "1 anomaly log(s) recorded — remember, anomalies cannot be deleted"
    ]
  },
  "mission_status": {
    "current_step": 4,
    "current_phase": "flyby",
    "steps_completed": 4
  }
}
```

**What Happened:**
- Received comprehensive mission analysis
- System recorded that you used the briefing feature
- Rocket moved to **Step 4: Lunar Flyby** ✅

---

**Request (Phase-Specific Briefing):**
```http
POST {{BASE_URL}}/mission/brief
x-api-key: {{API_KEY}}
Content-Type: application/json

{
  "phase": "transit"
}
```

---

### 🌊 STEP 5: SPLASHDOWN — Mission Complete!

With 5+ logs created, your mission is complete!

**Verify with Mission Status:**
```http
GET {{BASE_URL}}/mission
x-api-key: {{API_KEY}}
```

**Response (200 OK):**
```json
{
  "callsign": "EAGLE-42",
  "name": "Alex Chen",
  "sigil": "<svg>...</svg>",
  "mission_status": {
    "current_step": 5,
    "current_phase": "splashdown",
    "steps_completed": 5,
    "total_steps": 5,
    "steps": [
      { "step": 1, "phase": "launch", "label": "Launch", "completed": true },
      { "step": 2, "phase": "orbit", "label": "Earth Orbit", "completed": true },
      { "step": 3, "phase": "transit", "label": "Transit", "completed": true },
      { "step": 4, "phase": "flyby", "label": "Lunar Flyby", "completed": true },
      { "step": 5, "phase": "splashdown", "label": "Splashdown", "completed": true }
    ],
    "completion_percentage": 100
  },
  "crew_roster": {
    "wiseman": { "name": "Reid Wiseman", "role": "Commander" },
    "glover": { "name": "Victor Glover", "role": "Pilot" },
    "koch": { "name": "Christina Koch", "role": "Mission Specialist" },
    "hansen": { "name": "Jeremy Hansen", "role": "Mission Specialist (CSA)" }
  },
  "stats": {
    "categories": [
      { "category": "navigation", "count": 1 },
      { "category": "life-support", "count": 1 },
      { "category": "communication", "count": 1 },
      { "category": "science", "count": 1 },
      { "category": "anomaly", "count": 1 }
    ],
    "crew": [
      { "crew_member": "wiseman", "count": 1 },
      { "crew_member": "koch", "count": 2 },
      { "crew_member": "glover", "count": 1 },
      { "crew_member": "hansen", "count": 1 }
    ],
    "totalLogs": 5
  }
}
```

🎉 **MISSION COMPLETE — SPLASHDOWN CONFIRMED!**

---

## Request Summary

Here's everything you did to complete the mission:

| # | Method | Endpoint | Purpose | Step |
|---|--------|----------|---------|------|
| 1 | POST | `/register` | Get callsign and API key | 1 |
| 2 | POST | `/logs` | Create first log | 2 |
| 3 | POST | `/logs` | Create log 2 | — |
| 4 | POST | `/logs` | Create log 3 | — |
| 5 | POST | `/logs` | Create log 4 | — |
| 6 | POST | `/logs` | Create log 5 | 5 |
| 7 | PATCH | `/logs/2` | Update a log | 3 |
| 8 | POST | `/mission/brief` | Get briefing | 4 |
| 9 | GET | `/mission` | Verify completion | — |

**Total: 9 requests** (minimum 8 required)

---

## Alternative Mission Scenarios

### Scenario A: Speed Run (Minimum Requests)

```
1. POST /register          → Step 1
2. POST /logs              → Step 2 (log 1)
3. POST /logs              → (log 2)
4. POST /logs              → (log 3)
5. POST /logs              → (log 4)
6. POST /logs              → Step 5 (log 5)
7. PATCH /logs/1           → Step 3
8. POST /mission/brief     → Step 4
```

**8 requests total** — the absolute minimum!

---

### Scenario B: Explorer's Journey (Full API Coverage)

For participants who want to explore all endpoints:

```
1.  POST   /register              → Get credentials
2.  GET    /health                → Verify API is running
3.  GET    /mission               → Check initial status
4.  POST   /logs                  → Create log 1
5.  POST   /logs                  → Create log 2
6.  POST   /logs                  → Create log 3
7.  GET    /logs                  → View all logs
8.  GET    /logs?phase=transit    → Filter by phase
9.  GET    /logs/1                → View specific log
10. PATCH  /logs/1                → Update log
11. POST   /logs                  → Create log 4
12. POST   /logs (anomaly)        → Create log 5
13. DELETE /logs/5                → Try delete anomaly (403!)
14. DELETE /logs/2                → Delete non-anomaly (200)
15. POST   /logs                  → Create replacement log
16. POST   /mission/brief         → Get briefing
17. POST   /mission/brief         → Phase-specific briefing
18. GET    /mission               → Final status check
```

**18 requests** — covers every feature!

---

### Scenario C: Anomaly Investigation

Deep-dive into anomaly handling:

```http
# Create an anomaly log
POST /logs
{
  "title": "Unusual radiation readings detected",
  "phase": "lunar-approach",
  "category": "anomaly",
  "crew_member": "hansen"
}

# Try to delete it (will fail)
DELETE /logs/{{ANOMALY_ID}}
# Response: 403 Forbidden
# "Anomaly logs cannot be deleted. They are part of the permanent mission record."

# Update it instead (works!)
PATCH /logs/{{ANOMALY_ID}}
{
  "description": "Radiation spike attributed to solar flare. Levels returning to normal. Crew dose within acceptable limits."
}
```

---

## Log Examples by Category

### Navigation Logs

```json
{
  "title": "Star tracker calibration complete",
  "description": "Primary and backup star trackers aligned. Position accuracy within 0.01 degrees.",
  "phase": "orbit",
  "category": "navigation",
  "crew_member": "glover"
}
```

```json
{
  "title": "Trans-lunar injection burn nominal",
  "description": "TLI burn completed. Delta-V: 3,150 m/s. Trajectory confirmed for lunar flyby.",
  "phase": "transit",
  "category": "navigation",
  "crew_member": "wiseman"
}
```

### Life Support Logs

```json
{
  "title": "Water reclamation system status",
  "description": "WRS processing at 98% efficiency. 45 gallons recovered in past 24 hours.",
  "phase": "transit",
  "category": "life-support",
  "crew_member": "koch"
}
```

```json
{
  "title": "Radiation shelter drill completed",
  "description": "All crew reached shelter positions within 4 minutes. Procedures verified.",
  "phase": "lunar-approach",
  "category": "life-support",
  "crew_member": "hansen"
}
```

### Communication Logs

```json
{
  "title": "Lunar far-side communication blackout briefing",
  "description": "Crew briefed on 20-minute communication blackout during lunar far-side passage.",
  "phase": "lunar-approach",
  "category": "communication",
  "crew_member": "glover"
}
```

```json
{
  "title": "Video downlink to Mission Control",
  "description": "Live HD video streamed during lunar surface observation. Public broadcast confirmed.",
  "phase": "flyby",
  "category": "communication",
  "crew_member": "wiseman"
}
```

### Science Logs

```json
{
  "title": "Lunar surface photography complete",
  "description": "324 high-resolution images captured of potential Artemis III landing sites.",
  "phase": "flyby",
  "category": "science",
  "crew_member": "hansen"
}
```

```json
{
  "title": "Microgravity crystal growth experiment",
  "description": "Protein crystallization experiment initiated. First results expected in 72 hours.",
  "phase": "return",
  "category": "science",
  "crew_member": "koch"
}
```

### Crew Status Logs

```json
{
  "title": "Crew rest period completed",
  "description": "All crew members completed 8-hour sleep cycle. Fitness reports nominal.",
  "phase": "transit",
  "category": "crew-status",
  "crew_member": "wiseman"
}
```

```json
{
  "title": "Medical check completed",
  "description": "Routine medical exams completed. All vitals within normal ranges.",
  "phase": "return",
  "category": "crew-status",
  "crew_member": "koch"
}
```

### Anomaly Logs

```json
{
  "title": "Thruster valve sensor malfunction",
  "description": "RCS thruster 3B valve position sensor showing intermittent faults. Backup sensor nominal. Monitoring.",
  "phase": "orbit",
  "category": "anomaly",
  "crew_member": "glover"
}
```

```json
{
  "title": "Unexpected computer reboot",
  "description": "Guidance computer 2 experienced unexpected restart. Root cause under investigation. Backup computer operational.",
  "phase": "transit",
  "category": "anomaly",
  "crew_member": "wiseman"
}
```

---

## View Your Mission Debrief

After completing your mission, view your personalized debrief page:

```
{{BASE_URL}}/mission/debrief?api_key={{API_KEY}}
```

This provides a formatted HTML summary of your entire mission!

---

## Next Steps

- Try filtering logs: `GET /logs?phase=transit&category=science`
- Explore the leaderboard: `GET /leaderboard`
- Check the [API_REFERENCE.md](API_REFERENCE.md) for all endpoint details
- See [CURL_EXAMPLES.md](CURL_EXAMPLES.md) for command-line examples
- Try the immersive [STORY_EXAMPLES.md](STORY_EXAMPLES.md) for narrative-driven missions
