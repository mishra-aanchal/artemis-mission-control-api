# 🚀 Artemis II Mission Control — Participant Guide

## Your Mission: Launch to Splashdown in 35 Minutes

Welcome, Flight Director. You're running Mission Control for the Artemis II lunar flyby — the same mission that just flew around the Moon this week.

Every API request you send advances your rocket along the Artemis II trajectory. Complete all 5 steps to achieve splashdown.

```
STEP 1        2          3            4          5
  🚀─────────🌍─────────➡️──────────🌑─────────🌊
 LAUNCH     ORBIT     TRANSIT      FLYBY    SPLASHDOWN
```

| Step | Phase | What You Do |
|------|-------|-------------|
| 1 | **Launch** | Register for the mission |
| 2 | **Earth Orbit** | Create your first mission log |
| 3 | **Transit** | Update a log entry |
| 4 | **Lunar Flyby** | Get a mission briefing |
| 5 | **Splashdown** | Have 5+ total logs |

**Minimum requests to splashdown:** ~8 (register + 5 creates + 1 update + 1 brief)

---

## Before We Start

Make sure you have:

- [ ] Postman installed ([desktop](https://www.postman.com/downloads/) or [web](https://www.postman.com))
- [ ] A Postman account (free is fine)

Links (also on screen):

| Resource | Link |
|----------|------|
| Fork the Documentation Collection | `{{FORK_LINK}}` |
| OpenAPI Spec (for import) | `{{SPEC_URL}}` |
| Source Code (optional) | `{{REPO_URL}}` |
| API Base URL | `{{BASE_URL}}` |

---

## Your Crew

The real Artemis II crew:

| ID | Name | Role |
|----|------|------|
| `wiseman` | Reid Wiseman | Commander |
| `glover` | Victor Glover | Pilot |
| `koch` | Christina Koch | Mission Specialist |
| `hansen` | Jeremy Hansen | Mission Specialist (CSA) |

---

## Quick Reference — Values You'll Use

**Phases** (the real Artemis II mission timeline):
```
pre-launch · launch · orbit · transit · lunar-approach · flyby · return · reentry
```

**Categories** (types of mission operations):
```
navigation · life-support · communication · science · crew-status · anomaly
```

**Crew members:**
```
wiseman · glover · koch · hansen
```

That's it. Three fields define every log: **phase**, **category**, **crew_member**.

---

## Part 1 — Setup & Explore Your Mission (12 min)

### ✅ Step 1 → LAUNCH: Register

#### Fork the Collection

1. Click the **fork link** on screen
2. Choose your workspace → **Fork Collection**

#### Register

Open **Register** → `POST /register`

**Body:**
```json
{
  "name": "Your Name",
  "email": "your.email@example.com"
}
```

Click **Send**. You'll get:

```json
{
  "message": "Registration successful",
  "callsign": "EAGLE-42",
  "api_key": "ak_abc123def456",
  "sigil": "<svg>...</svg>",
  "mission_status": "active"
}
```

You now have your **callsign** (mission identity), **API key** (clearance), and **sigil** (unique mission patch).

> **Registered twice?** No problem — returns the same key.

#### Save Your API Key

1. Click collection name → **Variables** tab
2. Paste your key in `api_key` **Current Value**
3. **Save** (Ctrl/Cmd + S)

#### Verify

Open `GET /health` → Send. Then `GET /mission` → Send. If you see 200 responses, you're in.

❌ Got a 401? Check your `api_key` variable is saved.

🚀 **Rocket position: Step 1 — Launch**

---

### ✅ Step 2 → EARTH ORBIT: Create Your First Log

Open **Create Log** → `POST /logs`

**Body:**
```json
{
  "title": "Pre-flight navigation check complete",
  "description": "All star trackers aligned and verified for lunar transit",
  "phase": "pre-launch",
  "category": "navigation",
  "crew_member": "wiseman"
}
```

Click **Send**. Your log is created and your rocket advances.

🌍 **Rocket position: Step 2 — Earth Orbit**

---

### Build More Logs (toward Step 5)

You need **5+ total logs** for splashdown. Create more now — mix up the phases, categories, and crew members:

**Log 2 — Life Support:**
```json
{
  "title": "CO2 scrubber maintenance",
  "description": "Routine check on primary CO2 scrubbing system",
  "phase": "launch",
  "category": "life-support",
  "crew_member": "koch"
}
```

**Log 3 — Science Observation:**
```json
{
  "title": "Lunar surface photography sequence",
  "description": "Capture high-res images of Mare Tranquillitatis",
  "phase": "lunar-approach",
  "category": "science",
  "crew_member": "hansen"
}
```

**Log 4 — Communication:**
```json
{
  "title": "Deep Space Network handoff test",
  "description": "Verify DSN antenna handoff from Goldstone to Canberra",
  "phase": "transit",
  "category": "communication",
  "crew_member": "glover"
}
```

**Log 5 — Anomaly:**
```json
{
  "title": "Oxygen pressure fluctuation detected",
  "description": "Port-side O2 tank showing intermittent pressure drops",
  "phase": "transit",
  "category": "anomaly",
  "crew_member": "koch"
}
```

> **Tip:** Use `GET /logs` to see all your logs. Filter with query params: `?phase=transit`, `?category=anomaly`, `?crew_member=koch`

---

### ✅ Step 3 → TRANSIT: Update a Log

Open **Update Log** → `PATCH /logs/:id`

Replace `:id` with one of your log IDs (check `GET /logs` for IDs).

**Body:**
```json
{
  "title": "CO2 scrubber maintenance — completed",
  "description": "All scrubbers inspected and filters replaced"
}
```

Click **Send**. The log updates and your rocket advances.

➡️ **Rocket position: Step 3 — Transit**

---

### 🧪 Test the Guardrails

Try triggering some validation rules:

**Try deleting an anomaly log:**
Run `DELETE /logs/:id` on your anomaly log (the one with `"category": "anomaly"`).

→ `403 Forbidden` — **Anomalies cannot be deleted from the record.** They're part of the mission history. You can update them, but never erase them.

**Try an invalid phase:**
```json
{
  "title": "Test",
  "phase": "warp-speed",
  "category": "navigation",
  "crew_member": "wiseman"
}
```
→ `400` — invalid phase value.

**Try deleting a non-anomaly log:**
Pick a log that isn't an anomaly and run `DELETE /logs/:id`.
→ `200` — works fine. Only anomalies are protected.

---

### ✅ Step 4 → LUNAR FLYBY: Get a Mission Briefing

Open **Mission Brief** → `POST /mission/brief`

**For a phase-specific briefing:**
```json
{
  "phase": "transit"
}
```

**For a full mission briefing (all phases):**
```json
{}
```

You'll get back a summary of your mission operations — log counts, categories used, crew distribution.

🌑 **Rocket position: Step 4 — Lunar Flyby**

---

### ✅ Step 5 → SPLASHDOWN: 5+ Total Logs

If you've been following along, you should have 5+ logs already. Check with `GET /logs`.

If you need more, create them now — use different phases, categories, and crew members.

Once you hit 5+ logs, your rocket reaches **Splashdown**!

🌊 **MISSION COMPLETE — SPLASHDOWN CONFIRMED**

---

### 📥 Import the OpenAPI Spec

Before Agent Mode:

1. Click **Import** in Postman (top left)
2. Paste the spec URL or upload the file
3. Click **Import**

You now have your documentation collection (the fork) + the imported spec. Agent Mode works with the spec next.

---

## Part 2 — Postman Agent Mode (15 min)

### Task 1: Create a Collection from the Spec (5 min)

Open Agent Mode in Postman (sparkle/AI icon).

> **Prompt:**
> "Read my imported Artemis II Mission Control API spec and create a new collection with organized folders for each tag (Health, Auth, Mission, Logs, Leaderboard). Set up all requests with proper auth using the `api_key` collection variable in the `x-api-key` header."

Agent Mode reads the spec, creates folders, wires up auth. Once done — open a request and hit Send. Does it work?

> **Didn't work?** Tell Agent Mode:
> "The request to /logs is returning 401. Check the auth header — it should use x-api-key with the {{api_key}} variable."

---

### Task 2: Orchestrate a Mission Flow (5 min)

> **Prompt:**
> "Create a flow called 'Mission Operations' that does this:
> 1. Create a log for a navigation check assigned to Glover in the transit phase
> 2. List all logs to confirm it was created
> 3. Update that log's title to 'Navigation check — verified'
> 4. Request a mission briefing for the transit phase
>
> Chain the log ID from step 1 into step 3. Use response data to connect requests."

**Run the flow** — watch data pass between requests.

> **Your own ideas:**
> - "Create logs for all 4 crew members, then get a full mission briefing"
> - "Create an anomaly log, try to delete it (expect 403), then update its title instead"
> - "Create 5 logs across different phases, then get a briefing for each phase"

---

### Task 3: Generate Tests (5 min)

> **Prompt:**
> "Add tests to my Mission Operations flow:
> - Create log: verify 201 status and response has an `id` field
> - List logs: verify 200 and response array is not empty
> - Update log: verify 200 and the title changed
> - Mission brief: verify 200 and response has a `briefing` field
> - Add a negative test: create a log with category 'anomaly', then try to delete it and verify 403"

**Run the flow.** Green checkmarks = passing.

> **Test failed?** Paste the error to Agent Mode: "This test is failing with [error]. Debug it."

> **Want more?**
> - "Test that an invalid phase returns 400"
> - "Test that deleting a non-anomaly log returns 200"
> - "Generate a full test suite for all CRUD operations"

---

## Part 3 — MCP: AI Agent as Mission Control (8 min)

Watch the facilitator demo live:

1. **MCP server generated** from the API using Postman
2. **API key configured** — the agent authenticates as a Flight Director
3. **AI agent calls the API:**
   - *"What's the status of my mission?"* → `GET /mission`
   - *"Log a navigation anomaly assigned to Koch"* → `POST /logs`
   - *"Give me a mission briefing"* → `POST /mission/brief`
   - *"Update that log's description"* → `PATCH /logs/:id`

**Replicate later:** Setup steps are in your forked collection. API stays live.

---

## Part 4 — Splashdown! (2 min)

### Check Your Mission
`GET /mission` → See your rocket position

### Leaderboard
Open in browser: `{{BASE_URL}}/leaderboard`

### Your Mission Debrief
Open in browser: `{{BASE_URL}}/mission/debrief?api_key=YOUR_API_KEY`

Screenshot it. Share it. 🎖️

---

## Endpoint Reference

| Method | Endpoint | Auth | What It Does |
|--------|----------|------|-------------|
| `GET` | `/health` | No | Health check |
| `POST` | `/register` | No | Register → callsign + API key |
| `GET` | `/mission` | `x-api-key` | Mission dashboard (JSON or HTML) |
| `POST` | `/logs` | `x-api-key` | Create a mission log |
| `GET` | `/logs` | `x-api-key` | List logs (filters: `phase`, `category`, `crew_member`, `sort`) |
| `GET` | `/logs/:id` | `x-api-key` | Get a single log |
| `PATCH` | `/logs/:id` | `x-api-key` | Update a log |
| `DELETE` | `/logs/:id` | `x-api-key` | Delete a log (anomalies protected) |
| `POST` | `/mission/brief` | `x-api-key` | Mission briefing |
| `GET` | `/leaderboard` | No | Leaderboard (JSON or HTML) |
| `GET` | `/mission/debrief` | `?api_key=` | Shareable debrief page |

---

## Log Entry — Fields

| Field | Required | What It Is |
|-------|----------|-----------|
| `title` | Yes | Short description (max 200 chars) |
| `description` | No | Detailed notes |
| `phase` | Yes | Mission phase (see values above) |
| `category` | Yes | Type of operation (see values above) |
| `crew_member` | Yes | Which crew member (see values above) |

That's it. Three enums, two text fields.

---

## Validation Rules

| Rule | Error |
|------|-------|
| Missing title, phase, category, or crew_member | `400` |
| Invalid phase, category, or crew_member value | `400` |
| Deleting an anomaly log | `403` — anomalies can't be deleted |
| Missing or invalid API key | `401` |

---

## Troubleshooting

**"401 Unauthorized"** → Check `api_key` in collection variables. Current Value set? Saved?

**"400 Bad Request"** → Read the error. Check field names and enum values against the reference above.

**"403 Forbidden" on delete** → That's an anomaly log. Update it instead of deleting.

**"404 Not Found"** → Check the log ID. Run `GET /logs` to see your IDs.

**Agent Mode not responding** → Try a shorter prompt. One task at a time.

**Agent Mode broke something** → Tell it: "This returns [error]. Fix it."

---

## After the Workshop

- 🔗 **API stays live** for `{{DURATION}}`
- 💻 **Source code** — `{{REPO_URL}}`
- 🤖 **MCP setup** — documented in your forked collection
- 📖 **Postman resources** — `{{POSTMAN_RESOURCES_LINK}}`

**Splashdown confirmed. Thank you, Flight Director.** 🌊
