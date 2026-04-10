# 📖 Story-Based Mission Examples

Immersive narrative scenarios for your Artemis II mission. Each story guides you through complete mission completion while experiencing realistic space drama.

---

## Story 1: The Rookie Flight Director

*Your first day running Mission Control. No pressure.*

---

### Chapter 1: Clearance Granted

You've trained for years. Simulated hundreds of missions. But today is different — today you're running the real thing.

The security officer hands you a terminal. "Register for mission clearance, Flight Director."

**Your hands are steady as you type:**

```http
POST /register
Content-Type: application/json

{
  "name": "Jordan Mitchell",
  "email": "j.mitchell@nasa.gov"
}
```

**The screen flashes green:**

```json
{
  "message": "Mission clearance granted. Welcome aboard, Flight Director.",
  "callsign": "PHOENIX-7",
  "api_key": "PHOENIX-7_a3f8b2c1-d4e5-6789-0abc-def123456789",
  "sigil": "<svg>...</svg>"
}
```

PHOENIX-7. You like the sound of that.

> 💾 **Save your API key** — you'll need it for every command from here.

🚀 **Step 1 Complete: LAUNCH**

---

### Chapter 2: First Contact

Commander Wiseman's voice crackles through the comm: *"Flight, we're T-minus 10 and counting. Status check?"*

Time for your first official log entry.

```http
POST /logs
x-api-key: {{API_KEY}}
Content-Type: application/json

{
  "title": "T-10 minutes: All systems nominal",
  "description": "Final pre-launch verification complete. Primary and backup systems green across the board. Weather is go. Range is go. Crew is go.",
  "phase": "pre-launch",
  "category": "navigation",
  "crew_member": "wiseman"
}
```

**Response:**
```json
{
  "message": "Log entry recorded.",
  "log": {
    "id": 1,
    "title": "T-10 minutes: All systems nominal"
  },
  "mission_status": {
    "current_step": 2,
    "current_phase": "orbit"
  }
}
```

*"Copy that, Flight. Orion is go for launch."*

🌍 **Step 2 Complete: EARTH ORBIT**

---

### Chapter 3: Into the Black

The next hours blur together. You log everything — the SRB separation, the fairing jettison, the precise moment Orion's solar arrays unfurled against the endless dark.

**Life support check from Koch:**

```http
POST /logs
x-api-key: {{API_KEY}}
Content-Type: application/json

{
  "title": "Cabin environment stabilized",
  "description": "Pressure holding at 14.7 psi. O2 at 21%. CO2 scrubbers cycling normally. Humidity comfortable at 45%. Crew reports no issues.",
  "phase": "launch",
  "category": "life-support",
  "crew_member": "koch"
}
```

**Glover on communications:**

```http
POST /logs
x-api-key: {{API_KEY}}
Content-Type: application/json

{
  "title": "DSN lock confirmed - Goldstone",
  "description": "Primary antenna locked to Deep Space Network Goldstone station. Signal strength excellent. Telemetry flowing at 2 Mbps. Backup link to Madrid on standby.",
  "phase": "orbit",
  "category": "communication",
  "crew_member": "glover"
}
```

**Hansen begins the science work:**

```http
POST /logs
x-api-key: {{API_KEY}}
Content-Type: application/json

{
  "title": "Earth observation sequence initiated",
  "description": "High-resolution imaging of hurricane system over Atlantic. 47 images captured for climate research archive. Data queued for downlink.",
  "phase": "orbit",
  "category": "science",
  "crew_member": "hansen"
}
```

---

### Chapter 4: The Anomaly

Three hours into transit. You're starting to breathe easier when the alarm sounds.

**MASTER CAUTION.**

Your screen floods with data. Koch's voice, tight but controlled: *"Flight, we're seeing pressure fluctuations in O2 tank 2."*

You don't hesitate.

```http
POST /logs
x-api-key: {{API_KEY}}
Content-Type: application/json

{
  "title": "ANOMALY: O2 Tank 2 pressure variance",
  "description": "Tank 2 showing 3% pressure oscillation outside nominal range. Pattern suggests possible sensor malfunction vs actual leak. Cross-referencing with Tank 1 readings. Crew implementing contingency procedures.",
  "phase": "transit",
  "category": "anomaly",
  "crew_member": "koch"
}
```

> ⚠️ **This log can never be deleted.** Anomalies are permanent mission records.

The room is silent. Everyone's watching you.

*"Flight... recommendations?"*

---

### Chapter 5: The Fix

Twenty minutes of analysis. Your team is the best in the world, and they prove it.

The original log needs updating — the situation has evolved:

```http
PATCH /logs/5
x-api-key: {{API_KEY}}
Content-Type: application/json

{
  "title": "ANOMALY RESOLVED: O2 Tank 2 sensor recalibrated",
  "description": "Root cause identified: thermal gradient affecting sensor 2B accuracy. Sensor recalibrated using backup reference. Tank pressure confirmed stable at 860 psi. No actual leak. Crew dose unchanged. Resuming nominal operations."
}
```

**Response:**
```json
{
  "message": "Log entry updated.",
  "mission_status": {
    "current_step": 3,
    "current_phase": "transit"
  }
}
```

Koch's voice is warm: *"Nice work, Flight. Orion's doing great."*

You exhale for the first time in an hour.

➡️ **Step 3 Complete: TRANSIT**

---

### Chapter 6: Lunar Approach

The Moon fills the window. You need a status briefing before the critical flyby maneuver.

```http
POST /mission/brief
x-api-key: {{API_KEY}}
Content-Type: application/json

{
  "phase": "transit"
}
```

**Response:**
```json
{
  "briefing": {
    "phase": "transit",
    "total_logs": 3,
    "categories": {
      "anomaly": 1,
      "communication": 1,
      "science": 1
    },
    "crew": {
      "koch": { "name": "Christina Koch", "count": 1 },
      "glover": { "name": "Victor Glover", "count": 1 },
      "hansen": { "name": "Jeremy Hansen", "count": 1 }
    },
    "recommendations": [
      "No logs for: navigation, life-support, crew-status — consider logging these areas",
      "1 anomaly log(s) recorded — remember, anomalies cannot be deleted"
    ]
  },
  "mission_status": {
    "current_step": 4,
    "current_phase": "flyby"
  }
}
```

The briefing confirms what you already knew — your team handled the crisis perfectly.

🌑 **Step 4 Complete: LUNAR FLYBY**

---

### Chapter 7: Splashdown

The Pacific is calm. Recovery ships are in position. Orion's parachutes bloom against the blue sky.

**Final mission check:**

```http
GET /mission
x-api-key: {{API_KEY}}
```

```json
{
  "callsign": "PHOENIX-7",
  "mission_status": {
    "current_step": 5,
    "current_phase": "splashdown",
    "steps_completed": 5,
    "completion_percentage": 100
  }
}
```

The capsule touches water. The room erupts.

*"PHOENIX Flight, Orion. We're home."*

You smile. Not bad for a rookie.

🌊 **MISSION COMPLETE: SPLASHDOWN**

---

## Story 2: The Night Shift Crisis

*When everything goes wrong, and you're the only one who can make it right.*

---

### The Setup

It's 3 AM Houston time. You're the skeleton crew night shift Flight Director. Most of Mission Control is empty. The crew is asleep. Everything is quiet.

Too quiet.

**Register for your shift:**

```http
POST /register
Content-Type: application/json

{
  "name": "Sam Okonkwo",
  "email": "s.okonkwo@nasa.gov"
}
```

**You receive callsign: NIGHTWATCH-3**

---

### Hour 1: The Wake-Up Call

Your console beeps. Then beeps again. Then screams.

Three alarms in rapid succession:
- Communication dropout
- Thermal warning
- Navigation uncertainty

Glover's sleepy voice: *"Flight? What's happening?"*

You start logging. Fast.

**Communication issue:**

```http
POST /logs
x-api-key: {{API_KEY}}
Content-Type: application/json

{
  "title": "DSN handoff failure - loss of signal",
  "description": "Scheduled handoff from Goldstone to Canberra failed. No signal acquisition. Backup Madrid link attempting connection. Crew communications via S-band backup.",
  "phase": "transit",
  "category": "communication",
  "crew_member": "glover"
}
```

**Navigation drift:**

```http
POST /logs
x-api-key: {{API_KEY}}
Content-Type: application/json

{
  "title": "Star tracker data gap during comm loss",
  "description": "Navigation computer missed 12-minute update window during communication blackout. Current position uncertainty: 2km. Acceptable but monitoring.",
  "phase": "transit",
  "category": "navigation",
  "crew_member": "wiseman"
}
```

---

### Hour 2: It Gets Worse

The thermal warning wasn't a glitch.

```http
POST /logs
x-api-key: {{API_KEY}}
Content-Type: application/json

{
  "title": "ANOMALY: Service module thermal excursion",
  "description": "Panel 3B temperature rising beyond nominal range. Cause under investigation. Possible attitude control issue exposing panel to extended sunlight. Crew awakened for contingency planning.",
  "phase": "transit",
  "category": "anomaly",
  "crew_member": "koch"
}
```

Your day shift colleagues are being called in. But right now, it's still your show.

---

### Hour 3: One Problem at a Time

Madrid gets the signal. That's one down.

```http
PATCH /logs/1
x-api-key: {{API_KEY}}
Content-Type: application/json

{
  "title": "DSN restored via Madrid backup",
  "description": "Madrid station acquired signal at 03:47 UTC. Root cause of Canberra handoff failure: software timing error in ground system. Full telemetry restored. Crew back on primary communication."
}
```

Koch solves the thermal problem with a 0.3-degree attitude adjustment.

```http
POST /logs
x-api-key: {{API_KEY}}
Content-Type: application/json

{
  "title": "Thermal issue resolved - attitude adjustment",
  "description": "Spacecraft rolled 0.3 degrees to redistribute thermal load. Panel 3B temperature returning to nominal. All systems stable. Beautiful sunrise view as a bonus.",
  "phase": "transit",
  "category": "life-support",
  "crew_member": "koch"
}
```

---

### Hour 4: The Briefing

Day shift arrives. They need to know what happened.

```http
POST /mission/brief
x-api-key: {{API_KEY}}
Content-Type: application/json

{}
```

```json
{
  "briefing": {
    "total_logs": 5,
    "categories": {
      "communication": 1,
      "navigation": 1,
      "anomaly": 1,
      "life-support": 1
    },
    "recommendations": [
      "No logs for: science, crew-status — consider logging these areas",
      "1 anomaly log(s) recorded — remember, anomalies cannot be deleted"
    ]
  }
}
```

The Lead Flight Director claps you on the shoulder. "Hell of a night, NIGHTWATCH. Get some sleep."

You check your mission status one more time:

```http
GET /mission
x-api-key: {{API_KEY}}
```

**Steps completed: 5. Splashdown achieved.**

Not bad for a night shift.

🌊 **MISSION COMPLETE**

---

## Story 3: The Science Mission

*Dr. Hansen has one chance to photograph the Artemis III landing site. Don't mess this up.*

---

### The Objective

CSA astronaut Jeremy Hansen has trained for years to capture high-resolution imagery of the lunar south pole — potential landing sites for Artemis III. The photography window is exactly 4 minutes and 23 seconds.

You're the Flight Director responsible for making it happen.

**Register:**

```http
POST /register
Content-Type: application/json

{
  "name": "Dr. Yuki Tanaka",
  "email": "y.tanaka@nasa.gov"
}
```

**Callsign: SURVEYOR-1**

---

### Preparation Phase

Days before the flyby window, you start documenting the plan.

**Camera system check:**

```http
POST /logs
x-api-key: {{API_KEY}}
Content-Type: application/json

{
  "title": "Lunar camera calibration complete",
  "description": "High-resolution imaging system tested and calibrated. Focus verified against star field. Color balance adjusted for lunar surface albedo. 847 GB storage available.",
  "phase": "transit",
  "category": "science",
  "crew_member": "hansen"
}
```

**Navigation for precise targeting:**

```http
POST /logs
x-api-key: {{API_KEY}}
Content-Type: application/json

{
  "title": "Trajectory refined for imaging pass",
  "description": "Mid-course correction burn completed. Periapsis altitude: 130 km. Ground track passes directly over Shackleton Crater rim. Imaging window confirmed: 4m 23s.",
  "phase": "lunar-approach",
  "category": "navigation",
  "crew_member": "glover"
}
```

**Crew rest before the critical window:**

```http
POST /logs
x-api-key: {{API_KEY}}
Content-Type: application/json

{
  "title": "Crew rest period before imaging window",
  "description": "All crew completed 8-hour sleep cycle. Hansen reports fully rested and ready. Light meal consumed. Hydration optimal. T-4 hours to imaging window.",
  "phase": "lunar-approach",
  "category": "crew-status",
  "crew_member": "wiseman"
}
```

---

### The Window

Hansen's voice is calm but focused: *"SURVEYOR Flight, camera is armed. I have visual on the south pole."*

```http
POST /logs
x-api-key: {{API_KEY}}
Content-Type: application/json

{
  "title": "Lunar south pole imaging in progress",
  "description": "Camera sequence initiated. Capturing Shackleton Crater, de Gerlache Crater, and connecting ridge. Resolution: 0.5m/pixel. Hansen reports excellent viewing conditions. No shadows in permanently shadowed regions visible.",
  "phase": "flyby",
  "category": "science",
  "crew_member": "hansen"
}
```

Four minutes and twenty-three seconds later:

```http
PATCH /logs/4
x-api-key: {{API_KEY}}
Content-Type: application/json

{
  "title": "Lunar south pole imaging COMPLETE - 1,247 images captured",
  "description": "Full imaging sequence successful. 1,247 high-resolution frames captured. 312 GB data stored. Preliminary review shows excellent detail of potential Artemis III landing sites. Hansen reports seeing ice deposits in permanently shadowed craters with naked eye."
}
```

*"SURVEYOR, this is Hansen. I just saw where we're going to land. It's beautiful."*

---

### Mission Briefing

Time to compile your results:

```http
POST /mission/brief
x-api-key: {{API_KEY}}
Content-Type: application/json

{
  "phase": "flyby"
}
```

```json
{
  "briefing": {
    "phase": "flyby",
    "total_logs": 1,
    "categories": {
      "science": 1
    },
    "crew": {
      "hansen": { "name": "Jeremy Hansen", "count": 1 }
    }
  }
}
```

One log. One perfect moment. One giant leap toward Artemis III.

**Check final mission status:**

```http
GET /mission
x-api-key: {{API_KEY}}
```

**Splashdown achieved.** The science is secured.

🌊 **MISSION COMPLETE**

---

## Story 4: The Anomaly Hunter

*Some Flight Directors prevent problems. You hunt them.*

---

### Your Specialty

You're a specialist. While other Flight Directors manage smooth missions, you get called in when things go sideways. Today, three consecutive anomalies need investigation.

**Register:**

```http
POST /register
Content-Type: application/json

{
  "name": "Alex Reyes",
  "email": "a.reyes@nasa.gov"
}
```

**Callsign: HUNTER-9**

---

### Anomaly 1: The Thruster Ghost

RCS thruster 4 is firing randomly. One-second bursts every 47 minutes.

```http
POST /logs
x-api-key: {{API_KEY}}
Content-Type: application/json

{
  "title": "ANOMALY: RCS-4 uncommanded firing",
  "description": "Thruster 4 firing in 1.2-second bursts at 47-minute intervals. Propellant usage: 0.3 kg per event. Pattern suggests software timing issue, not hardware fault. Attitude impact minimal but fuel consumption concerning.",
  "phase": "transit",
  "category": "anomaly",
  "crew_member": "glover"
}
```

Investigation reveals a memory allocation bug in the flight software. Patch uploaded.

```http
PATCH /logs/1
x-api-key: {{API_KEY}}
Content-Type: application/json

{
  "title": "ANOMALY RESOLVED: RCS-4 software patch applied",
  "description": "Root cause: memory fragmentation in thruster control module causing spurious commands. Flight software patch 2.3.1 uploaded and verified. No uncommanded firings in subsequent 6-hour observation period. Total propellant lost: 1.8 kg (acceptable margin)."
}
```

---

### Anomaly 2: The Vanishing Data

Telemetry packets are arriving corrupted. 3% packet loss and climbing.

```http
POST /logs
x-api-key: {{API_KEY}}
Content-Type: application/json

{
  "title": "ANOMALY: Telemetry corruption increasing",
  "description": "Packet error rate: 3.2% and rising. Affects housekeeping data, not critical command channels. Pattern correlates with high-gain antenna position. Possible multipath interference.",
  "phase": "transit",
  "category": "anomaly",
  "crew_member": "koch"
}
```

Koch adjusts the antenna. Error rate drops to 0.01%.

```http
POST /logs
x-api-key: {{API_KEY}}
Content-Type: application/json

{
  "title": "Telemetry restored - antenna optimization",
  "description": "High-gain antenna repositioned 2.3 degrees to avoid spacecraft structure reflection. Error rate now nominal at 0.01%. Root cause documented for future mission planning.",
  "phase": "transit",
  "category": "communication",
  "crew_member": "koch"
}
```

---

### Anomaly 3: The Mystery Vibration

The crew reports an unusual vibration every time the water recycler activates.

```http
POST /logs
x-api-key: {{API_KEY}}
Content-Type: application/json

{
  "title": "ANOMALY: Vibration during WRS operation",
  "description": "Crew reports low-frequency vibration (est. 15 Hz) during water recycler pump cycles. Duration: 30 seconds. Not harmful but concerning. Structural resonance suspected.",
  "phase": "transit",
  "category": "anomaly",
  "crew_member": "wiseman"
}
```

Engineering finds a loose mounting bracket. Hansen tightens it during scheduled maintenance.

```http
POST /logs
x-api-key: {{API_KEY}}
Content-Type: application/json

{
  "title": "WRS vibration eliminated - bracket secured",
  "description": "Hansen located and secured loose mounting bracket on Water Recovery System pump unit. Vibration eliminated. Root cause: bracket worked loose during launch loads. Added to post-flight inspection checklist.",
  "phase": "transit",
  "category": "life-support",
  "crew_member": "hansen"
}
```

---

### The Hunter's Briefing

```http
POST /mission/brief
x-api-key: {{API_KEY}}
Content-Type: application/json

{}
```

```json
{
  "briefing": {
    "total_logs": 6,
    "categories": {
      "anomaly": 3,
      "communication": 1,
      "life-support": 1
    },
    "recommendations": [
      "3 anomaly log(s) recorded — remember, anomalies cannot be deleted"
    ]
  }
}
```

Three anomalies. Three solutions. Zero mission impact.

That's why they call you HUNTER.

```http
GET /mission
x-api-key: {{API_KEY}}
```

🌊 **MISSION COMPLETE: SPLASHDOWN**

---

## API Calls Summary by Story

| Story | Total Calls | Anomalies | Key Theme |
|-------|-------------|-----------|-----------|
| Rookie Flight Director | 9 | 1 | First-day pressure, learning the ropes |
| Night Shift Crisis | 8 | 1 | Multiple simultaneous failures |
| Science Mission | 7 | 0 | Precision timing, high-stakes science |
| Anomaly Hunter | 9 | 3 | Systematic troubleshooting |

---

## Create Your Own Story

Use this template to craft your own mission narrative:

```
SETTING: Where/when does your story take place?
CONFLICT: What goes wrong or what's at stake?
CHARACTERS: Which crew members are involved?
RESOLUTION: How do you solve it?

API MAPPING:
- Registration → Your callsign and role
- First log → The inciting incident
- Additional logs → Rising action
- Update → The turning point  
- Briefing → Assessment/reflection
- Mission status → Resolution
```

The best missions have stories. What's yours?
