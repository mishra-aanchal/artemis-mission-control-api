# Artemis Mission Control — Essential URLs & Architecture Navigation

This guide serves as a central directory for all local, production, and repository URLs associated with the Artemis II Mission Control API Workshop.

## 📦 Version Control Repository
The source of absolute truth for the finalized codebase, UI modernizations, and workshop payloads.
- **GitHub Repository**: [https://github.com/mishra-aanchal/artemis-mission-control-api](https://github.com/mishra-aanchal/artemis-mission-control-api)
- *All latest patches, telemetry easter eggs, and decoupled log interactions are pushed to the `main` branch.*

## 🚀 Local UI Interfaces (Developer Mode)
When running the stack locally via `npm run dev` (`http://localhost:8080`), you can access these rich, modern front-end dashboards intended for the Postman attendees:
- **Cinematic Story Guide**: `http://localhost:8080/guide/story`
  *(Features the dynamic 5-milestone orbital tracking, dynamic log snippet generation, and synchronized CSS offset stage detachment)*
- **Mission Scenario HUD**: `http://localhost:8080/guide/mission`
  *(Features the dropdown centralized execution map and step-by-step progress tracking)*
- **Flight Director Leaderboard**: `http://localhost:8080/leaderboard`

## 📡 Core API Endpoints
The backend engine simulating the Postman-enabled spacecraft telemetry system:
- **Auth/Registration**: `POST /register`
- **Telemetry Upload**: `POST /logs`
- **Anomaly Patching**: `PATCH /logs/:id`
- **Diagnostic Wipe**: `DELETE /logs/:id`
- **Final Analytics Brief**: `POST /mission/brief`
  *(When authenticated with a 100% completion API key, this renders the final professional aerospace Debrief HUD with the EGGS cryptography watermark.)*

## 🌩️ Production Deployment (Railway)
If the project is synced to deploy off the GitHub `main` branch, the live workshop API will be actively hosted here:
- **Base Production URL**: [https://artemis.up.railway.app](https://artemis.up.railway.app)
*(Ensure your Postman environments are scoped to target this URL instead of localhost during the live audience workshop!)*
