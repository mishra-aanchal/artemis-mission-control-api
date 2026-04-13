# Artemis II Mission Control API

A hosted multi-user Mission Control API themed around NASA's Artemis II lunar mission. Participants register as Flight Directors, receive a unique callsign and procedural SVG sigil, and complete a 5-step lunar mission by sending API requests. Each step corresponds to a phase of the Artemis II trajectory -- from launch through splashdown.

## Quick Start

```bash
git clone <repo-url> artemis-api
cd artemis-api
npm install
cp .env.example .env   # then edit .env with your values
npm start
```

The server starts on `https://artemis.up.railway.app` by default.

## PostgreSQL Setup

1. Install PostgreSQL if you haven't already.
2. Create the database:

```sql
CREATE DATABASE artemis_workshop;
```

3. Set the `DATABASE_URL` environment variable in your `.env` file:

```
DATABASE_URL=postgresql://user:password@localhost:5432/artemis_workshop
```

The database schema is created automatically on startup -- no manual migration step is needed.

## The 5-Step Mission

| Step | Phase       | Action                                                    |
|------|-------------|-----------------------------------------------------------|
| 1    | Launch      | Register (POST /register)                                 |
| 2    | Earth Orbit | Create 3 logs with at least 2 categories (POST /logs)     |
| 3    | Transit     | Update a log (PATCH /logs/:id)                            |
| 4    | Lunar Flyby | Delete a log (DELETE /logs/:id)                           |
| 5    | Splashdown  | Get a mission briefing (POST /mission/brief)              |

## Endpoint Reference

| Method | Path               | Description                                    | Auth Required |
|--------|--------------------|------------------------------------------------|---------------|
| GET    | /health            | Health check and API status                    | No            |
| POST   | /register          | Register as a Flight Director                  | No            |
| GET    | /mission           | View your mission progress and stats           | Yes           |
| POST   | /mission/brief     | Generate a mission briefing                    | Yes           |
| GET    | /mission/debrief   | HTML debrief page (pass `api_key` as query param) | No (query key) |
| POST   | /logs              | Create a new mission log entry                 | Yes           |
| GET    | /logs              | List your log entries (supports filters)       | Yes           |
| GET    | /logs/:id          | Get a single log entry by ID                   | Yes           |
| PATCH  | /logs/:id          | Update a log entry                             | Yes           |
| DELETE | /logs/:id          | Delete a log entry                             | Yes           |
| GET    | /leaderboard       | View the mission leaderboard                   | No            |
| POST   | /admin/reset       | Reset the entire database (requires admin key) | Admin         |

**Authentication:** Include your API key in the `x-api-key` header:

```
x-api-key: <your_api_key>
```

**Log fields:**

- `title` (required): Log title, max 200 characters
- `description` (optional): Additional details
- `phase` (required): pre-launch, launch, orbit, transit, lunar-approach, flyby, return, reentry
- `category` (required): navigation, life-support, communication, science, crew-status, anomaly
- `crew_member` (required): wiseman, glover, koch, hansen

> **Note:** Logs with category `anomaly` cannot be deleted. Update them instead.

## Curl Examples

### Register

```bash
curl -X POST https://artemis.up.railway.app/register \
  -H "Content-Type: application/json" \
  -d '{"name": "Ada Lovelace", "email": "ada@example.com"}'
```

### Create a Log

```bash
curl -X POST https://artemis.up.railway.app/logs \
  -H "Content-Type: application/json" \
  -H "x-api-key: YOUR_API_KEY" \
  -d '{
    "title": "Navigation system calibrated",
    "phase": "orbit",
    "category": "navigation",
    "crew_member": "wiseman"
  }'
```

### Check Mission Progress

```bash
curl https://artemis.up.railway.app/mission \
  -H "x-api-key: YOUR_API_KEY"
```

### Get a Mission Briefing

```bash
curl -X POST https://artemis.up.railway.app/mission/brief \
  -H "Content-Type: application/json" \
  -H "x-api-key: YOUR_API_KEY" \
  -d '{}'
```

### View the Leaderboard

```bash
curl https://artemis.up.railway.app/leaderboard
```

## Environment Variables

| Variable       | Description                                      | Default                                              |
|----------------|--------------------------------------------------|------------------------------------------------------|
| `PORT`         | Port the server listens on                       | `3000`                                               |
| `ADMIN_KEY`    | Secret key for admin endpoints                   | *(required for /admin/reset)*                        |
| `DATABASE_URL` | Full PostgreSQL connection string                | `postgresql://user:password@localhost:5432/artemis_workshop` |
| `PGHOST`       | PostgreSQL host (if DATABASE_URL is not set)     | `localhost`                                          |
| `PGPORT`       | PostgreSQL port (if DATABASE_URL is not set)     | `5432`                                               |
| `PGDATABASE`   | PostgreSQL database name                         | `artemis_workshop`                                   |
| `PGUSER`       | PostgreSQL user                                  | `artemis`                                            |
| `PGPASSWORD`   | PostgreSQL password                              | *(none)*                                             |

`DATABASE_URL` takes precedence over the individual `PG*` variables when both are set.

## License

MIT
