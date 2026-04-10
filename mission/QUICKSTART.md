# ⚡ Quickstart Guide

Get your mission from Launch to Splashdown in 5 minutes.

## Prerequisites

- API client (Postman, curl, or any HTTP client)
- Base URL: `{{BASE_URL}}`

---

## Step 1: Register (Launch) 🚀

```http
POST /register
Content-Type: application/json

{
  "name": "Your Name",
  "email": "your.email@example.com"
}
```

**Response:**
```json
{
  "message": "Mission clearance granted. Welcome aboard, Flight Director.",
  "callsign": "EAGLE-42",
  "api_key": "EAGLE-42_abc123...",
  "sigil": "<svg>...</svg>"
}
```

**Save your `api_key`** — you'll need it for all subsequent requests.

---

## Step 2: Create First Log (Earth Orbit) 🌍

```http
POST /logs
x-api-key: YOUR_API_KEY
Content-Type: application/json

{
  "title": "Pre-flight navigation check complete",
  "description": "All star trackers aligned",
  "phase": "pre-launch",
  "category": "navigation",
  "crew_member": "wiseman"
}
```

---

## Step 3: Update a Log (Transit) ➡️

First, get your log ID from the previous response (or use `GET /logs`).

```http
PATCH /logs/1
x-api-key: YOUR_API_KEY
Content-Type: application/json

{
  "title": "Pre-flight navigation check — verified"
}
```

---

## Step 4: Get Mission Briefing (Lunar Flyby) 🌑

```http
POST /mission/brief
x-api-key: YOUR_API_KEY
Content-Type: application/json

{}
```

---

## Step 5: Create 4 More Logs (Splashdown) 🌊

Create 4 additional logs (you need 5+ total):

```http
POST /logs
x-api-key: YOUR_API_KEY
Content-Type: application/json

{
  "title": "Life support systems nominal",
  "phase": "launch",
  "category": "life-support",
  "crew_member": "koch"
}
```

Repeat with different phases/categories/crew members until you have 5+ logs.

---

## Check Your Progress

```http
GET /mission
x-api-key: YOUR_API_KEY
```

When `steps_completed` reaches **5**, you've achieved **SPLASHDOWN**! 🎉

---

## Quick Reference

| Phases | Categories | Crew |
|--------|------------|------|
| `pre-launch` | `navigation` | `wiseman` |
| `launch` | `life-support` | `glover` |
| `orbit` | `communication` | `koch` |
| `transit` | `science` | `hansen` |
| `lunar-approach` | `crew-status` | |
| `flyby` | `anomaly` | |
| `return` | | |
| `reentry` | | |

---

**Need more details?** See [END_TO_END_EXAMPLES.md](END_TO_END_EXAMPLES.md) for a complete walkthrough.
