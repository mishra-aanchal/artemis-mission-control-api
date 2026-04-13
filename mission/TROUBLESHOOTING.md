# 🔧 Troubleshooting Guide

Common issues and solutions for the Artemis II Mission Control API.

---

## Authentication Issues

### 401 Unauthorized

**Error:**
```json
{
  "error": "Unauthorized - Missing or invalid API key"
}
```

**Causes & Solutions:**

| Cause | Solution |
|-------|----------|
| Missing `x-api-key` header | Add header: `x-api-key: YOUR_API_KEY` |
| Typo in API key | Copy-paste directly from registration response |
| API key not saved in Postman | Go to Collection → Variables → paste in `api_key` Current Value → Save |
| Using wrong variable syntax | Use `{{api_key}}` in Postman, `$API_KEY` in curl |

**Verify your key works:**
```bash
curl "$BASE_URL/health"  # Should work (no auth needed)
curl "$BASE_URL/mission" -H "x-api-key: $API_KEY"  # Should work with valid key
```

---

## Registration Issues

### "Name is required"

**Error:**
```json
{
  "error": "Name is required."
}
```

**Solution:** Ensure your request body includes a non-empty `name` field:
```json
{
  "name": "Your Name",
  "email": "your@email.com"
}
```

### "A valid email is required"

**Error:**
```json
{
  "error": "A valid email is required."
}
```

**Solution:** Ensure email includes `@` and `.`:
```json
{
  "email": "user@example.com"
}
```

### Already Registered

**Not an error!** If you register with the same email twice, you get your existing credentials back. This is by design (idempotent registration).

---

## Log Creation Issues

### Invalid Phase

**Error:**
```json
{
  "error": "Phase must be one of: pre-launch, launch, orbit, transit, lunar-approach, flyby, return, reentry"
}
```

**Solution:** Use exact phase values (case-sensitive, hyphenated):
```
✅ "phase": "pre-launch"
✅ "phase": "lunar-approach"
❌ "phase": "prelaunch"
❌ "phase": "Pre-Launch"
❌ "phase": "lunarApproach"
```

### Invalid Category

**Error:**
```json
{
  "error": "Category must be one of: navigation, life-support, communication, science, crew-status, anomaly"
}
```

**Solution:** Use exact category values:
```
✅ "category": "life-support"
✅ "category": "crew-status"
❌ "category": "lifesupport"
❌ "category": "Life Support"
```

### Invalid Crew Member

**Error:**
```json
{
  "error": "Crew member must be one of: wiseman, glover, koch, hansen"
}
```

**Solution:** Use lowercase crew IDs:
```
✅ "crew_member": "wiseman"
✅ "crew_member": "koch"
❌ "crew_member": "Wiseman"
❌ "crew_member": "Reid Wiseman"
```

### Title Too Long

**Error:**
```json
{
  "error": "Title must be 200 characters or fewer."
}
```

**Solution:** Shorten your title to 200 characters or less.

---

## Log Update Issues

### "At least one field must be provided"

**Error:**
```json
{
  "error": "At least one field must be provided to update."
}
```

**Solution:** Include at least one field to update:
```json
{
  "title": "Updated title"
}
```

### Log Not Found

**Error:**
```json
{
  "error": "Log entry not found in mission records."
}
```

**Causes:**
- Wrong log ID
- Trying to access another user's log
- Log was deleted

**Solution:** Check your logs with `GET /logs` to find valid IDs.

---

## Log Deletion Issues

### 403 Forbidden - Cannot Delete Anomaly

**Error:**
```json
{
  "error": "Anomaly logs cannot be deleted. They are part of the permanent mission record."
}
```

**This is intentional behavior!** Anomaly logs are protected:
- You CAN update anomaly logs
- You CANNOT delete anomaly logs

**If you need to remove bad data:**
1. Update the anomaly log with corrected information
2. Or create a new log and accept the anomaly stays on record

---

## Mission Progress Issues

### Stuck at Step 1 (Launch)

**Requirement:** Create 3 logs with at least 2 diverse categories

**Check:**
```bash
curl "$BASE_URL/logs" -H "x-api-key: $API_KEY"
```

Verify your `count` is at least 3, and ensure the `category` fields differ across the entries.

---

### Stuck at Step 2 (Earth Orbit)

**Requirement:** Update a log entry

**Solution:**
```bash
# Get your log IDs
curl "$BASE_URL/logs" -H "x-api-key: $API_KEY"

# Update any log
curl -X PATCH "$BASE_URL/logs/1" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{"title": "Updated title"}'
```

---

### Stuck at Step 3 (Transit)

**Requirement:** Delete a log entry

**Solution:**
**Important:** You cannot delete anomalous logs. Target a routine log!
```bash
curl -X DELETE "$BASE_URL/logs/2" \
  -H "x-api-key: $API_KEY"
```

---

### Stuck at Step 4 (Lunar Flyby)

**Requirement:** Get a mission briefing

**Solution:**
```bash
curl -X POST "$BASE_URL/mission/brief" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{}'
```

---

### Steps Not in Order

Steps must be completed in sequence:
1. Registration (automatic)
2. Create 3 logs with 2 diverse categories
3. Update a log
4. Delete a log
5. Get briefing

Even if you completed a later requirement, it won't trigger until the previous step is finished!

**Check your status:**
```bash
curl "$BASE_URL/mission" -H "x-api-key: $API_KEY"
```

Look at the `steps` array to see which are completed.

---

## Postman-Specific Issues

### Variables Not Working

**Symptom:** Seeing `{{api_key}}` literally in requests instead of the value

**Solutions:**
1. Click collection name → **Variables** tab
2. Ensure value is in **Current Value** column (not just Initial Value)
3. **Save** the collection (Ctrl/Cmd + S)
4. Make sure you're using the request from the forked collection

### Collection Not Forked

**Symptom:** Changes not saving, or shared collection

**Solution:** Fork the collection to your own workspace:
1. Click the three dots next to collection name
2. Select **Create a Fork**
3. Choose your workspace
4. Use the forked copy

### Wrong Environment Selected

**Symptom:** `{{BASE_URL}}` not resolving

**Solution:**
1. Check environment selector (top right)
2. Make sure correct environment is selected
3. Or use collection variables instead of environment variables

---

## Content Type Issues

### 415 Unsupported Media Type

**Error:** Request rejected

**Solution:** Add Content-Type header for POST/PATCH requests:
```
Content-Type: application/json
```

### Malformed JSON

**Error:**
```json
{
  "error": "Bad Request"
}
```

**Common JSON mistakes:**
```
❌ {name: "Test"}           // Missing quotes on key
❌ {"name": 'Test'}         // Single quotes
❌ {"name": "Test",}        // Trailing comma
❌ {"name": Test}           // Unquoted string value

✅ {"name": "Test"}         // Correct
```

---

## Network Issues

### Connection Refused

**Symptom:** Cannot connect to server

**Solutions:**
1. Verify the BASE_URL is correct
2. Check if API is running (try `/health` endpoint)
3. Check your internet connection
4. Try from a different network (might be firewall)

### Timeout

**Symptom:** Request hangs then fails

**Solutions:**
1. Try again (might be temporary)
2. Check your internet connection
3. API might be under heavy load

---

## Quick Diagnostic Checklist

Run through this checklist when something isn't working:

```
□ Is the API reachable? (GET /health)
□ Is my API key set correctly?
□ Am I using the right HTTP method? (GET vs POST vs PATCH)
□ Do I have Content-Type: application/json header?
□ Is my JSON valid?
□ Are all values using the exact expected format?
□ Am I targeting the right endpoint URL?
□ Did I save my changes in Postman?
```

---

## Getting Help

If you're still stuck:

1. Check `GET /mission` to see your current status
2. Review the [API_REFERENCE.md](API_REFERENCE.md) for exact requirements
3. Try the examples from [CURL_EXAMPLES.md](CURL_EXAMPLES.md) verbatim
4. Ask your workshop facilitator

---

## Valid Values Quick Reference

**Phases:**
```
pre-launch | launch | orbit | transit | lunar-approach | flyby | return | reentry
```

**Categories:**
```
navigation | life-support | communication | science | crew-status | anomaly
```

**Crew Members:**
```
wiseman | glover | koch | hansen
```
