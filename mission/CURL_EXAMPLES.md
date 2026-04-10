# 🖥️ Curl Examples

Copy-paste-ready curl commands for the Artemis II Mission Control API.

---

## Setup

Set your base URL and API key as environment variables:

```bash
# Set your base URL
export BASE_URL="https://your-api-url.com"

# After registration, set your API key
export API_KEY="EAGLE-42_your-api-key-here"
```

---

## Complete Mission in Curl

### Step 1: Register (Launch) 🚀

```bash
curl -X POST "$BASE_URL/register" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Your Name",
    "email": "your.email@example.com"
  }'
```

**Save your API key from the response:**
```bash
export API_KEY="EAGLE-42_a1b2c3d4-e5f6-7890-abcd-ef1234567890"
```

---

### Step 2: Create First Log (Earth Orbit) 🌍

```bash
curl -X POST "$BASE_URL/logs" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "title": "Pre-flight navigation check complete",
    "description": "All star trackers aligned and verified for lunar transit",
    "phase": "pre-launch",
    "category": "navigation",
    "crew_member": "wiseman"
  }'
```

---

### Create Additional Logs (toward Step 5)

**Log 2 - Life Support:**
```bash
curl -X POST "$BASE_URL/logs" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "title": "CO2 scrubber maintenance",
    "description": "Routine check on primary CO2 scrubbing system - all nominal",
    "phase": "launch",
    "category": "life-support",
    "crew_member": "koch"
  }'
```

**Log 3 - Communication:**
```bash
curl -X POST "$BASE_URL/logs" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "title": "Deep Space Network handoff test",
    "description": "Verify DSN antenna handoff from Goldstone to Canberra",
    "phase": "transit",
    "category": "communication",
    "crew_member": "glover"
  }'
```

**Log 4 - Science:**
```bash
curl -X POST "$BASE_URL/logs" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "title": "Lunar surface photography sequence",
    "description": "Capture high-res images of Mare Tranquillitatis",
    "phase": "lunar-approach",
    "category": "science",
    "crew_member": "hansen"
  }'
```

**Log 5 - Anomaly:**
```bash
curl -X POST "$BASE_URL/logs" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "title": "Oxygen pressure fluctuation detected",
    "description": "Port-side O2 tank showing intermittent pressure drops",
    "phase": "transit",
    "category": "anomaly",
    "crew_member": "koch"
  }'
```

---

### Step 3: Update a Log (Transit) ➡️

```bash
# Replace 1 with your actual log ID
curl -X PATCH "$BASE_URL/logs/1" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "title": "Pre-flight navigation check — verified and documented",
    "description": "Complete verification logged. All systems go."
  }'
```

---

### Step 4: Get Mission Briefing (Lunar Flyby) 🌑

**Full mission briefing:**
```bash
curl -X POST "$BASE_URL/mission/brief" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{}'
```

**Phase-specific briefing:**
```bash
curl -X POST "$BASE_URL/mission/brief" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "phase": "transit"
  }'
```

---

### Step 5: Verify Splashdown 🌊

```bash
curl -X GET "$BASE_URL/mission" \
  -H "x-api-key: $API_KEY"
```

When `steps_completed` is 5, you've achieved **SPLASHDOWN**! 🎉

---

## All Endpoint Examples

### Health Check

```bash
curl "$BASE_URL/health"
```

---

### Registration

```bash
curl -X POST "$BASE_URL/register" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane.doe@example.com"
  }'
```

---

### Mission Status

**JSON response:**
```bash
curl "$BASE_URL/mission" \
  -H "x-api-key: $API_KEY"
```

**HTML response:**
```bash
curl "$BASE_URL/mission" \
  -H "x-api-key: $API_KEY" \
  -H "Accept: text/html"
```

---

### Mission Debrief (HTML page)

```bash
curl "$BASE_URL/mission/debrief?api_key=$API_KEY"
```

Or open in browser:
```bash
open "$BASE_URL/mission/debrief?api_key=$API_KEY"
```

---

### Create Log

```bash
curl -X POST "$BASE_URL/logs" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "title": "Log title here",
    "description": "Optional description",
    "phase": "transit",
    "category": "navigation",
    "crew_member": "wiseman"
  }'
```

---

### Get All Logs

```bash
curl "$BASE_URL/logs" \
  -H "x-api-key: $API_KEY"
```

**With sorting (newest first):**
```bash
curl "$BASE_URL/logs?sort=desc" \
  -H "x-api-key: $API_KEY"
```

---

### Filter Logs

**By phase:**
```bash
curl "$BASE_URL/logs?phase=transit" \
  -H "x-api-key: $API_KEY"
```

**By category:**
```bash
curl "$BASE_URL/logs?category=anomaly" \
  -H "x-api-key: $API_KEY"
```

**By crew member:**
```bash
curl "$BASE_URL/logs?crew_member=koch" \
  -H "x-api-key: $API_KEY"
```

**Multiple filters:**
```bash
curl "$BASE_URL/logs?phase=transit&category=science&crew_member=hansen" \
  -H "x-api-key: $API_KEY"
```

---

### Get Specific Log

```bash
curl "$BASE_URL/logs/1" \
  -H "x-api-key: $API_KEY"
```

---

### Update Log

**Update title only:**
```bash
curl -X PATCH "$BASE_URL/logs/1" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "title": "Updated title"
  }'
```

**Update multiple fields:**
```bash
curl -X PATCH "$BASE_URL/logs/1" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "title": "Updated title",
    "description": "Updated description",
    "phase": "orbit",
    "category": "crew-status",
    "crew_member": "glover"
  }'
```

---

### Delete Log

```bash
curl -X DELETE "$BASE_URL/logs/1" \
  -H "x-api-key: $API_KEY"
```

> **Note:** Anomaly logs cannot be deleted. You'll get a 403 error.

---

### Leaderboard

**Default (top 10):**
```bash
curl "$BASE_URL/leaderboard"
```

**Custom limit:**
```bash
curl "$BASE_URL/leaderboard?limit=25"
```

---

## One-Liner Scripts

### Complete Mission Script (Bash)

```bash
#!/bin/bash
# Complete Artemis II Mission in one script

BASE_URL="https://your-api-url.com"

# Register and extract API key
echo "Registering..."
RESPONSE=$(curl -s -X POST "$BASE_URL/register" \
  -H "Content-Type: application/json" \
  -d '{"name": "Script Runner", "email": "script@example.com"}')
API_KEY=$(echo $RESPONSE | grep -o '"api_key":"[^"]*' | cut -d'"' -f4)
echo "API Key: $API_KEY"

# Create 5 logs
echo "Creating logs..."
for i in 1 2 3 4 5; do
  curl -s -X POST "$BASE_URL/logs" \
    -H "Content-Type: application/json" \
    -H "x-api-key: $API_KEY" \
    -d "{\"title\": \"Log $i\", \"phase\": \"transit\", \"category\": \"navigation\", \"crew_member\": \"wiseman\"}" > /dev/null
  echo "Log $i created"
done

# Update a log
echo "Updating log..."
curl -s -X PATCH "$BASE_URL/logs/1" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{"title": "Updated Log 1"}' > /dev/null

# Get mission briefing
echo "Getting briefing..."
curl -s -X POST "$BASE_URL/mission/brief" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{}' > /dev/null

# Check status
echo "Final status:"
curl -s "$BASE_URL/mission" -H "x-api-key: $API_KEY" | grep -o '"steps_completed":[0-9]*'
echo ""
echo "Mission complete! 🚀"
```

---

### Quick Status Check

```bash
curl -s "$BASE_URL/mission" \
  -H "x-api-key: $API_KEY" | \
  python3 -c "import sys,json; d=json.load(sys.stdin); print(f\"Step {d['mission_status']['current_step']}/5 - {d['mission_status']['current_phase']}\")"
```

---

## Pretty Print JSON

Add `| python3 -m json.tool` or `| jq` to any command:

```bash
curl "$BASE_URL/mission" \
  -H "x-api-key: $API_KEY" | jq
```

Or with Python:

```bash
curl "$BASE_URL/mission" \
  -H "x-api-key: $API_KEY" | python3 -m json.tool
```

---

## Error Handling

Check HTTP status code:

```bash
curl -s -w "\n%{http_code}\n" "$BASE_URL/logs" \
  -H "x-api-key: $API_KEY"
```

Verbose output for debugging:

```bash
curl -v "$BASE_URL/mission" \
  -H "x-api-key: $API_KEY"
```

---

## HTTPie Alternative

If you prefer [HTTPie](https://httpie.io/):

```bash
# Register
http POST $BASE_URL/register name="Your Name" email="your@email.com"

# Create log
http POST $BASE_URL/logs \
  x-api-key:$API_KEY \
  title="Log title" \
  phase=transit \
  category=navigation \
  crew_member=wiseman

# Get mission status
http $BASE_URL/mission x-api-key:$API_KEY
```
