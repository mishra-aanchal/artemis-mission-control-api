# 🚀 Artemis II Mission Documentation

Welcome to the Artemis II Mission Control API documentation. This folder contains comprehensive guides and examples for completing your mission from **Launch to Splashdown**.

## 📂 Contents

| File | Description |
|------|-------------|
| [QUICKSTART.md](QUICKSTART.md) | Get started in 5 minutes |
| [END_TO_END_EXAMPLES.md](END_TO_END_EXAMPLES.md) | Complete mission walkthrough with all API calls |
| [STORY_EXAMPLES.md](STORY_EXAMPLES.md) | Immersive narrative-driven mission scenarios |
| [API_REFERENCE.md](API_REFERENCE.md) | Detailed documentation of all endpoints |
| [CURL_EXAMPLES.md](CURL_EXAMPLES.md) | Ready-to-use curl commands |
| [TROUBLESHOOTING.md](TROUBLESHOOTING.md) | Common issues and solutions |

## 🎯 Mission Overview

Your mission: Complete all 5 steps to achieve splashdown!

```
STEP 1        2          3            4          5
  🚀─────────🌍─────────➡️──────────🌑─────────🌊
 LAUNCH     ORBIT     TRANSIT      FLYBY    SPLASHDOWN
```

| Step | Phase | Requirement |
|------|-------|-------------|
| 1 | **Launch** | Register for mission |
| 2 | **Earth Orbit** | Create your first log |
| 3 | **Transit** | Update a log entry |
| 4 | **Lunar Flyby** | Get a mission briefing |
| 5 | **Splashdown** | Have 5+ total logs |

**Minimum API calls to complete mission:** 8 requests

## 🧑‍🚀 The Crew

| ID | Name | Role |
|----|------|------|
| `wiseman` | Reid Wiseman | Commander |
| `glover` | Victor Glover | Pilot |
| `koch` | Christina Koch | Mission Specialist |
| `hansen` | Jeremy Hansen | Mission Specialist (CSA) |

## 📋 Valid Values

**Phases:**
```
pre-launch · launch · orbit · transit · lunar-approach · flyby · return · reentry
```

**Categories:**
```
navigation · life-support · communication · science · crew-status · anomaly
```

## 🔑 Authentication

All endpoints (except `/register` and `/health`) require an API key in the header:

```
x-api-key: YOUR_API_KEY
```

## ⏱️ Time Estimate

- **Minimum completion time:** 10-15 minutes
- **With exploration:** 25-35 minutes

## 🆘 Need Help?

Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for common issues and solutions.
