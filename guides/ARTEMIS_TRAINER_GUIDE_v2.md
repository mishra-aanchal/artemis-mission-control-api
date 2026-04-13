# 🚀 Artemis II Mission Control — Trainer Guide v2

## Facilitator Handbook (Simplified 5-Step Mission)

---

## What Changed

The API and mission structure have been simplified to reduce friction:

| Before | Now |
|--------|-----|
| 8 mission steps with specific conditions | **5 clear steps** — register, create 3 (2 cats), update, delete, brief |
| 5 enums (phase, category, crew, priority, status) | **3 enums** — phase, category, crew_member |
| Status flow enforcement | **Removed** — a log is just a record |
| Critical priority requires description | **Removed** — no priority field |
| Complex mission brief with recommendations | **Simple summary** — counts, categories, crew distribution |
| Anomaly delete protection | **Kept** — anomalies can't be deleted |

**Why:** Less time explaining rules = more time in Agent Mode.

---

## The 5-Step Mission

```
STEP 1        2          3            4          5
  🚀─────────🌍─────────➡️──────────🌑─────────🌊
 LAUNCH     ORBIT     TRANSIT      FLYBY    SPLASHDOWN
```

| Step | Action | API Call |
|------|--------|---------|
| 1 | Register | `POST /register` |
| 2 | Create 3 logs (2 categories) | `POST /logs` |
| 3 | Update a log | `PATCH /logs/:id` |
| 4 | Delete a log | `DELETE /logs/:id` |
| 5 | Get a briefing | `POST /mission/brief` |

**Min requests to splashdown:** ~7
**Each step = one API concept:** register → create → update → delete → smart endpoint

---

## Workshop Overview

| Detail | Value |
|--------|-------|
| Total session | 50 minutes |
| Active content | 35 minutes |
| Float/buffer | 15 minutes |
| Participants | Up to 40 |
| TAs | 2 |

---

## Pre-Workshop Checklist

### One Week Before
- [ ] API deployed, all endpoints verified
- [ ] OpenAPI spec hosted at stable URL
- [ ] Documentation collection created, fork link tested
- [ ] Public repo set up
- [ ] MCP demo environment configured and tested
- [ ] Full dry run timed end-to-end
- [ ] TAs briefed and have done independent dry runs
- [ ] Participant guide placeholders replaced with real URLs

### Day Of (30 min before)
- [ ] `GET /health` — server is up
- [ ] `POST /admin/reset` — clean slate
- [ ] Register yourself — get facilitator API key
- [ ] Create 5 demo logs (different phases, categories, crew)
- [ ] Create one anomaly log (for delete protection demo)
- [ ] Fork link works, spec import works, MCP demo works
- [ ] Leaderboard and debrief pages render correctly
- [ ] Screen layout ready: Postman + browser tabs + links slide

---

## Minute-by-Minute Script

---

### ACT 1 — SETUP & EXPLORE (0:00–12:00)

---

#### 0:00–2:00 | Scene Setting

**Mode:** You talk, they listen

**SAY:**

> "Welcome to Mission Control. You're Flight Directors for the Artemis II lunar flyby — the same mission that just flew around the Moon this week."
>
> "Every API request advances your rocket along the trajectory. Five steps to splashdown. Let's go."
>
> "Four links on screen — start by forking the collection."

---

#### 2:00–5:00 | Fork, Register, Verify (Step 1)

**SAY:**

> "Fork the collection. Open Register. Put in your name and email. Send."

**DEMO on screen — send `POST /register`:**

```json
{
  "name": "Flight Director Demo",
  "email": "demo@missioncontrol.nasa"
}
```

**NARRATE:**

> "Callsign — that's your mission identity. API key — your clearance. Sigil — your unique mission patch."
>
> "Copy the api_key. Collection variables. Paste. Save."

**DEMO:** Show variable being set.

> "Now hit GET /mission. 200? You're at Step 1 — Launch. Let's move."

**CHECKPOINT:** "Hands up if you do NOT have a 200."

**TA CUE:** Both TAs help stragglers immediately.

---

#### 5:00–9:00 | Create Logs (Step 2)

**SAY:**

> "Open Create Log — POST /logs. Simple body: title, description, phase, category, crew member. That's it."

**DEMO — first log:**

```json
{
  "title": "Pre-flight navigation check complete",
  "description": "All star trackers aligned and verified",
  "phase": "pre-launch",
  "category": "navigation",
  "crew_member": "wiseman"
}
```

> "Send. Now create 2 more. Make sure you use at least two different categories across your logs. You need 3 total to reach Earth Orbit."

**Show a second example if needed:**

```json
{
  "title": "CO2 scrubber maintenance",
  "description": "Routine check on primary scrubbers",
  "phase": "launch",
  "category": "life-support",
  "crew_member": "koch"
}
```

**LET THEM WORK** for 3 minutes.

> "Use GET /logs to see everything you've created. Filter with query params if you want: `?phase=transit` or `?crew_member=glover`."

---

#### 9:00–10:00 | Update a Log (Step 3)

**SAY:**

> "Step 3 — update a log. PATCH /logs/:id. Pick an ID from your logs."

**DEMO:**

```json
{
  "title": "Navigation check — verified and complete",
  "description": "All systems nominal. Ready for transit."
}
```

> "Rocket moves to Step 3 — Transit."

---

#### 10:00–11:00 | Delete a Log (Step 4)

**SAY:**

> "Step 4 — delete a log. DELETE /logs/:id."
>
> "Quick test. If you created a log with category 'anomaly', try deleting it."

**DEMO — delete an anomaly:**

> "403 Forbidden. Anomalies cannot be deleted from the record. That's a real mission rule — you never erase anomalies, you document and resolve them. You can update them, but never delete."
>
> "Delete a non-anomaly log — works fine. Rocket moves to Step 4 — Lunar Flyby."

**Try an invalid value (optional, only if time):**

```json
{
  "title": "Test",
  "phase": "warp-speed",
  "category": "navigation",
  "crew_member": "wiseman"
}
```

> "400 — invalid phase. The API tells you exactly what's wrong."

---

#### 11:00–12:00 | Import Spec + Mission Brief (Step 5)

**SAY:**

> "Two things. First — hit POST /mission/brief."

**DEMO:**

```json
{
  "phase": "transit"
}
```

> "That's your mission briefing — summary of operations for that phase. Rocket moves to Step 5 — Splashdown."
>
> "Now import the OpenAPI spec. Click Import, paste the URL, import."

**CHECKPOINT:**

> "Quick check. GET /mission — where's your rocket? If you're at Step 5 and have done a briefing, you've hit splashdown."

**TIMING CHECK:** Should be ~12:00. Up to 15:00 is fine (float used).

---

### ACT 2 — AGENT MODE (12:00–27:00)

---

**TRANSITION:**

> "Everything you just did — creating, updating, organizing — Agent Mode can do from a spec. And much more."

---

#### 12:00–17:00 | Task 1: Collection from Spec

**YOU DEMO (12:00–13:30):**

Open Agent Mode. Type:

> *"Read my imported Artemis II Mission Control API spec and create a new collection with organized folders for each tag. Set up all requests with proper auth using the api_key collection variable in the x-api-key header."*

**NARRATE:**

> "Reading the spec... creating folders... setting up auth... every request gets the right method, URL, headers, and body template."

When done — open a request, send it.

> "Works. A complete collection from a spec in 30 seconds."

**THEY DO (13:30–17:00):**

> "Your turn. The prompt is in your participant guide."

Let them work. TA 2 helps with Agent Mode issues.

---

#### 17:00–22:00 | Task 2: Orchestrate a Flow

**YOU DEMO (17:00–18:30):**

> "Individual requests are useful. But real API work is flows."

Type:

> *"Create a flow called 'Mission Operations' that:*
> *1. Creates a navigation log assigned to Glover in the transit phase*
> *2. Lists all logs to confirm it was created*
> *3. Updates that log's title to 'Navigation check — verified'*
> *4. Requests a mission briefing for the transit phase*
> *Chain the log ID from step 1 into step 3."*

**NARRATE:**

> "Creating the log... extracting the ID from the response... storing it as a variable... the update uses that variable... now the briefing. Four requests, chained automatically."

**Run the flow.**

**THEY DO (18:30–22:00):**

> "Build your own. Some ideas:"

Read out:
- "Create logs for all 4 crew members, then get a full briefing"
- "Create an anomaly, try to delete it — expect 403 — then update its title instead"
- "Create 5 logs across different phases, then get a briefing for each"

> "If the output isn't perfect, tell Agent Mode what to fix. That's the workflow — prompt, run, refine."

---

#### 22:00–27:00 | Task 3: Generate Tests

**YOU DEMO (22:00–23:30):**

Type:

> *"Add tests to my Mission Operations flow:*
> *- Create log: verify 201, response has id field*
> *- List logs: verify 200, response is not empty*
> *- Update log: verify 200, title changed*
> *- Mission brief: verify 200, response has briefing field*
> *- Negative test: create an anomaly log, try to delete it, verify 403"*

**Run. Show green checkmarks.**

> "Not just status codes — it's checking data fields and the anomaly protection rule."

**THEY DO (23:30–27:00):**

> "Add tests to your flow. Then push further:"

- "Test that an invalid phase returns 400"
- "Test that deleting a non-anomaly works with 200"
- "Generate a complete test suite for all endpoints"

> "If a test fails, paste the error to Agent Mode."

**CHECKPOINT at 27:00:**

> "Run your flow. Green checkmarks? That's an AI-built, AI-tested mission operations workflow."

---

### ACT 3 — MCP DEMO (27:00–35:00)

---

#### 27:00–28:00 | What is MCP

> "MCP turns API endpoints into tools AI agents call directly. Not 'write me a curl command' — the agent actually calls the API. Real auth, real data."

---

#### 28:00–31:00 | Build MCP Server (You Drive)

Demo MCP generation in Postman on screen.

**NARRATE key moments:**

> "See these tools? createLog, listLogs, createMissionBrief. The agent sees these as actions."
>
> "The API key goes here. The agent authenticates as me — my callsign, my data."

---

#### 31:00–34:00 | Live AI Agent Demo

**Prompt 1:** "What's the status of my mission?"
→ Calls `GET /mission`

**Prompt 2:** "Log a navigation anomaly assigned to Koch during the flyby phase."
→ Calls `POST /logs` with category anomaly, crew_member koch

**Prompt 3:** "Give me a mission briefing."
→ Calls `POST /mission/brief`

**Prompt 4:** "Update that anomaly's description to say the issue was caused by a sensor calibration drift."
→ Calls `PATCH /logs/:id`

> "Same API. Three interfaces. Manual, orchestrated by Agent Mode, and now autonomous via MCP. That's the lifecycle."

**Pause.** Let it land.

---

#### 34:00–35:00 | Handoff

> "MCP setup is documented in your collection. API stays live. Connect your own agent on your own time."

---

### ACT 4 — SPLASHDOWN (35:00–37:00)

---

#### 35:00–36:00 | Leaderboard

> "GET /mission — where's your rocket?"

**Switch to leaderboard.** Refresh.

> "All your rockets on one trajectory. [Callsign] — splashdown! [Callsign] — Step 4."

---

#### 36:00–37:00 | Debrief & Close

Show debrief URL: `{{BASE_URL}}/mission/debrief?api_key=YOUR_KEY`

> "Screenshot your debrief. Share it."
>
> "You started with a spec. Agent Mode built your collection, orchestrated a flow, wrote the tests. An AI agent ran Mission Control through MCP. That's the full API lifecycle."
>
> "Splashdown confirmed. Thank you, Flight Directors."

---

## Float Strategy (15 min)

| Act | Content | Max Float | Hard Stop |
|-----|---------|-----------|-----------|
| Act 1 | 12 min | +3 min | 15:00 |
| Act 2 | 15 min | +7 min | 34:00 |
| Act 3 | 8 min | +3 min | 45:00 |
| Act 4 | 2 min | +2 min | 50:00 |

**Act 2 gets the lion's share.** Never steal from Act 3 or 4.

---

## TA Assignments

### TA 1 — Setup Specialist

| Act | Focus |
|-----|-------|
| Act 1 | **PRIMARY** — fork, API key, variables |
| Act 2 | Fix broken generated collections |
| Act 3–4 | Help with debrief URLs |

### TA 2 — Agent Mode Specialist

| Act | Focus |
|-----|-------|
| Act 1 | Secondary support |
| Act 2 | **PRIMARY** — prompts, chaining, test failures |
| Act 3 | Help with MCP setup |
| Act 4 | Help with debrief URLs |

### Common Issues (Simplified API)

| Issue | Fix |
|-------|-----|
| 401 on everything | Check api_key Current Value is set and saved |
| 400 on create | Check phase/category/crew_member values against allowed enums |
| 403 on delete | It's an anomaly log — can't delete, can only update |
| 404 on patch/delete | Wrong log ID — check with GET /logs |
| Agent Mode generates wrong auth | Should be `x-api-key` header with `{{api_key}}` |
| Agent Mode flow broken | Check variable names in chaining scripts |

### Signals

| Signal | Meaning |
|--------|---------|
| TA: 1 finger | 1 stuck, keep going |
| TA: 5 fingers | 5+ stuck, slow down |
| TA: thumbs up | All good |
| TA: flat hand | Need 1 more minute |
| Facilitator: taps wrist | Wrapping in 60s |

---

## Emergency Protocols

**Server down** → TA restarts. Data survives. Fill with MCP explanation.

**Agent Mode slow** → Shorter prompts. If persists, demo on screen.

**Agent Mode broke something** → "Ask it to fix it. Paste the error." (Teaching moment.)

**MCP fails** → Backup screenshots/recording. Walk through it.

**Participant behind** → Point to documentation collection fork. Working requests already there.

---

## Demo Request Bodies

Keep these in a text file for instant paste.

### Register
```json
{
  "name": "Flight Director Demo",
  "email": "demo@missioncontrol.nasa"
}
```

### Log — Navigation
```json
{
  "title": "Pre-flight navigation check complete",
  "description": "All star trackers aligned and verified for lunar transit",
  "phase": "pre-launch",
  "category": "navigation",
  "crew_member": "wiseman"
}
```

### Log — Life Support
```json
{
  "title": "CO2 scrubber maintenance",
  "description": "Routine check on primary CO2 scrubbing system",
  "phase": "launch",
  "category": "life-support",
  "crew_member": "koch"
}
```

### Log — Science
```json
{
  "title": "Lunar surface photography sequence",
  "description": "High-res imaging of Mare Tranquillitatis approach corridor",
  "phase": "lunar-approach",
  "category": "science",
  "crew_member": "hansen"
}
```

### Log — Communication
```json
{
  "title": "Deep Space Network handoff verification",
  "description": "Verify DSN antenna handoff from Goldstone to Canberra",
  "phase": "transit",
  "category": "communication",
  "crew_member": "glover"
}
```

### Log — Anomaly (for delete protection demo)
```json
{
  "title": "Oxygen pressure fluctuation detected",
  "description": "Port-side O2 tank showing intermittent pressure drops",
  "phase": "transit",
  "category": "anomaly",
  "crew_member": "koch"
}
```

### Log — Crew Status
```json
{
  "title": "Crew rest cycle initiated",
  "description": "8-hour mandatory rest period for Commander and Pilot",
  "phase": "transit",
  "category": "crew-status",
  "crew_member": "wiseman"
}
```

### Update Log
```json
{
  "title": "Navigation check — verified and complete",
  "description": "All systems nominal. Ready for transit."
}
```

### Mission Brief — Filtered
```json
{
  "phase": "transit"
}
```

### Mission Brief — Full
```json
{}
```

### Trigger Error — Invalid Phase
```json
{
  "title": "Test log",
  "phase": "warp-speed",
  "category": "navigation",
  "crew_member": "wiseman"
}
```

### Trigger Error — Delete Anomaly
Use `DELETE /logs/:id` on any anomaly log → `403`
