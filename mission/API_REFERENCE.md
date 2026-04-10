# 📘 API Reference

Complete documentation for the Artemis II Mission Control API.

---

## Base URL

```
{{BASE_URL}}
```

---

## Authentication

Most endpoints require authentication via API key header:

```
x-api-key: YOUR_API_KEY
```

**Authenticated endpoints:**
- All `/logs` endpoints
- `GET /mission`
- `POST /mission/brief`

**Public endpoints (no auth required):**
- `POST /register`
- `GET /health`
- `GET /leaderboard`
- `GET /mission/debrief` (uses query param)

---

## Endpoints

### Registration

#### `POST /register`

Register for a new mission or retrieve existing credentials.

**Auth Required:** No

**Request Body:**
```json
{
  "name": "string (required)",
  "email": "string (required, valid email format)"
}
```

**Success Response (201 Created / 200 OK):**
```json
{
  "message": "Mission clearance granted. Welcome aboard, Flight Director.",
  "name": "string",
  "email": "string",
  "callsign": "string",
  "api_key": "string",
  "sigil": "string (SVG)"
}
```

**Error Responses:**
| Status | Condition |
|--------|-----------|
| 400 | Missing or invalid name |
| 400 | Missing or invalid email |

**Notes:**
- Idempotent: re-registering with same email returns existing credentials
- Callsign is auto-generated and unique
- Sigil is a unique SVG mission patch

---

### Health Check

#### `GET /health`

Check if the API is running.

**Auth Required:** No

**Success Response (200 OK):**
```json
{
  "status": "ok",
  "timestamp": "ISO 8601 timestamp"
}
```

---

### Mission Status

#### `GET /mission`

Get your current mission status, progress, and statistics.

**Auth Required:** Yes

**Success Response (200 OK):**
```json
{
  "callsign": "string",
  "name": "string",
  "sigil": "string (SVG)",
  "mission_status": {
    "current_step": "number (1-5)",
    "current_phase": "string",
    "steps_completed": "number",
    "total_steps": 5,
    "steps": [
      {
        "step": "number",
        "phase": "string",
        "label": "string",
        "completed": "boolean"
      }
    ],
    "completion_percentage": "number"
  },
  "crew_roster": {
    "wiseman": { "name": "Reid Wiseman", "role": "Commander" },
    "glover": { "name": "Victor Glover", "role": "Pilot" },
    "koch": { "name": "Christina Koch", "role": "Mission Specialist" },
    "hansen": { "name": "Jeremy Hansen", "role": "Mission Specialist (CSA)" }
  },
  "stats": {
    "categories": [{ "category": "string", "count": "number" }],
    "crew": [{ "crew_member": "string", "count": "number" }],
    "totalLogs": "number"
  }
}
```

**Content Negotiation:**
- `Accept: application/json` → JSON response
- `Accept: text/html` → HTML dashboard

---

#### `GET /mission/debrief`

Get a formatted HTML mission debrief page.

**Auth Required:** Via query parameter

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `api_key` | string | Yes | Your API key |

**Example:**
```
GET /mission/debrief?api_key=EAGLE-42_abc123...
```

**Success Response (200 OK):**
HTML page with mission summary

**Error Response:**
HTML error page if API key is invalid or missing

---

### Mission Brief

#### `POST /mission/brief`

Get a comprehensive mission briefing with recommendations.

**Auth Required:** Yes

**Request Body:**
```json
{
  "phase": "string (optional)"
}
```

If `phase` is omitted, returns briefing for all phases.

**Valid Phases:**
```
pre-launch, launch, orbit, transit, lunar-approach, flyby, return, reentry
```

**Success Response (200 OK):**
```json
{
  "briefing": {
    "phase": "string ('all' or specific phase)",
    "total_logs": "number",
    "categories": {
      "navigation": "number",
      "life-support": "number",
      "communication": "number",
      "science": "number",
      "crew-status": "number",
      "anomaly": "number"
    },
    "crew": {
      "wiseman": { "name": "Reid Wiseman", "count": "number" },
      "glover": { "name": "Victor Glover", "count": "number" },
      "koch": { "name": "Christina Koch", "count": "number" },
      "hansen": { "name": "Jeremy Hansen", "count": "number" }
    },
    "recommendations": ["string"]
  },
  "mission_status": { ... }
}
```

**Error Responses:**
| Status | Condition |
|--------|-----------|
| 400 | Invalid phase value |
| 401 | Missing or invalid API key |

**Side Effects:**
- Records `used_mission_brief` milestone (required for Step 4)

---

### Mission Logs

#### `POST /logs`

Create a new mission log entry.

**Auth Required:** Yes

**Request Body:**
```json
{
  "title": "string (required, max 200 chars)",
  "description": "string (optional)",
  "phase": "string (required)",
  "category": "string (required)",
  "crew_member": "string (required)"
}
```

**Valid Values:**

| Field | Options |
|-------|---------|
| `phase` | `pre-launch`, `launch`, `orbit`, `transit`, `lunar-approach`, `flyby`, `return`, `reentry` |
| `category` | `navigation`, `life-support`, `communication`, `science`, `crew-status`, `anomaly` |
| `crew_member` | `wiseman`, `glover`, `koch`, `hansen` |

**Success Response (201 Created):**
```json
{
  "message": "Log entry recorded.",
  "log": {
    "id": "number",
    "user_id": "number",
    "title": "string",
    "description": "string",
    "phase": "string",
    "category": "string",
    "crew_member": "string",
    "created_at": "ISO 8601 timestamp",
    "updated_at": "ISO 8601 timestamp"
  },
  "mission_status": { ... }
}
```

**Error Responses:**
| Status | Condition |
|--------|-----------|
| 400 | Missing title |
| 400 | Title exceeds 200 characters |
| 400 | Invalid phase |
| 400 | Invalid category |
| 400 | Invalid crew_member |
| 401 | Missing or invalid API key |

---

#### `GET /logs`

Get all your mission logs with optional filtering.

**Auth Required:** Yes

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `phase` | string | Filter by phase |
| `category` | string | Filter by category |
| `crew_member` | string | Filter by crew member |
| `sort` | string | `asc` (default) or `desc` |

**Examples:**
```
GET /logs
GET /logs?phase=transit
GET /logs?category=anomaly
GET /logs?crew_member=koch
GET /logs?phase=transit&category=science
GET /logs?sort=desc
```

**Success Response (200 OK):**
```json
{
  "count": "number",
  "logs": [
    {
      "id": "number",
      "title": "string",
      "description": "string",
      "phase": "string",
      "category": "string",
      "crew_member": "string",
      "created_at": "ISO 8601 timestamp",
      "updated_at": "ISO 8601 timestamp"
    }
  ]
}
```

**Error Responses:**
| Status | Condition |
|--------|-----------|
| 400 | Invalid filter value |
| 401 | Missing or invalid API key |

---

#### `GET /logs/:id`

Get a specific log entry by ID.

**Auth Required:** Yes

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | number | Log ID |

**Success Response (200 OK):**
```json
{
  "log": {
    "id": "number",
    "title": "string",
    "description": "string",
    "phase": "string",
    "category": "string",
    "crew_member": "string",
    "created_at": "ISO 8601 timestamp",
    "updated_at": "ISO 8601 timestamp"
  }
}
```

**Error Responses:**
| Status | Condition |
|--------|-----------|
| 404 | Log not found |
| 401 | Missing or invalid API key |

---

#### `PATCH /logs/:id`

Update an existing log entry.

**Auth Required:** Yes

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | number | Log ID |

**Request Body (all fields optional, at least one required):**
```json
{
  "title": "string (max 200 chars)",
  "description": "string",
  "phase": "string",
  "category": "string",
  "crew_member": "string"
}
```

**Success Response (200 OK):**
```json
{
  "message": "Log entry updated.",
  "log": { ... },
  "mission_status": { ... }
}
```

**Error Responses:**
| Status | Condition |
|--------|-----------|
| 400 | No fields provided to update |
| 400 | Invalid field value |
| 404 | Log not found |
| 401 | Missing or invalid API key |

**Side Effects:**
- Updates `updated_at` timestamp
- Records update milestone (required for Step 3)

---

#### `DELETE /logs/:id`

Delete a log entry.

**Auth Required:** Yes

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | number | Log ID |

**Success Response (200 OK):**
```json
{
  "message": "Log entry deleted.",
  "mission_status": { ... }
}
```

**Error Responses:**
| Status | Condition |
|--------|-----------|
| 403 | Attempt to delete anomaly log |
| 404 | Log not found |
| 401 | Missing or invalid API key |

**Important:**
- Logs with `category: "anomaly"` **cannot be deleted**
- Anomalies are permanent mission records

---

### Leaderboard

#### `GET /leaderboard`

View the mission leaderboard.

**Auth Required:** No

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `limit` | number | 10 | Number of entries to return |

**Success Response (200 OK):**
```json
{
  "leaderboard": [
    {
      "callsign": "string",
      "name": "string",
      "steps_completed": "number",
      "total_logs": "number"
    }
  ]
}
```

---

## Error Response Format

All errors follow this format:

```json
{
  "error": "Human-readable error message"
}
```

---

## Status Codes Summary

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (missing/invalid API key) |
| 403 | Forbidden (e.g., deleting anomaly) |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## Rate Limits

Currently no rate limiting is enforced. Please be respectful of shared resources.

---

## Webhooks

Not currently supported.

---

## Versioning

This is v1 of the API. No version prefix is currently required.
