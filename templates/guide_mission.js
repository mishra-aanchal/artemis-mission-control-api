const { getBaseCSS, getThemeToggleHTML, getThemeToggleJS } = require('./shared');

const MISSIONS = [
  {
    id: "m1",
    shortName: "Gateway Assembly",
    title: "Mission I: Lunar Gateway Assembly",
    description: "Pilot Orion to the Near-Rectilinear Halo Orbit and initialize the first delivery sequence for the Gateway modules.",
    chapters: [
      {
        title: "1. Initialize Flight Director",
        lore: "Security protocols mandate standard registration before console access is granted.",
        requests: [
          { method: "POST", endpoint: "/register", headers: {"Content-Type": "application/json"}, body: { "name": "Cmdr. Vance", "email": "vance.g@nasa.gov" } }
        ]
      },
      {
        title: "2. Approach Vector Telemetry",
        lore: "As we align with the Halo Orbit, we need fresh telemetry spanning navigation, core life support, and comm arrays.",
        requests: [
          { method: "POST", endpoint: "/logs", headers: {"x-api-key": "{{API_KEY}}", "Content-Type": "application/json"}, body: { "title": "Vector Alignment", "description": "Engine burns completed. We are aligned with NRHO.", "phase": "orbit", "category": "navigation", "crew_member": "glover" } },
          { method: "POST", endpoint: "/logs", headers: {"x-api-key": "{{API_KEY}}", "Content-Type": "application/json"}, body: { "title": "Oxygen Scrubbers Nominal", "description": "Cabin pressure holding steady at 14.7 psi.", "phase": "orbit", "category": "life-support", "crew_member": "koch" } },
          { method: "POST", endpoint: "/logs", headers: {"x-api-key": "{{API_KEY}}", "Content-Type": "application/json"}, body: { "title": "ANOMALY: Docking Latches Stiff", "description": "Sensor indicates resistance in tertiary docking clamp.", "phase": "orbit", "category": "anomaly", "crew_member": "wiseman" } }
        ]
      },
      {
        title: "3. Resolution: Manual Override",
        lore: "Commander Wiseman executed a manual override to lubricate the latches. Update the anomaly report.",
        requests: [
          { method: "PATCH", endpoint: "/logs/3", headers: {"x-api-key": "{{API_KEY}}", "Content-Type": "application/json"}, body: { "title": "ANOMALY RESOLVED: Latches Cleared", "description": "Manual override successfully disengaged the jam. Docking sequence is go." } }
        ]
      },
      {
        title: "4. Clear Bandwidth",
        lore: "To prepare for the massive data handshake with Gateway, purge the routine oxygen scrubber log.",
        requests: [
          { method: "DELETE", endpoint: "/logs/2", headers: {"x-api-key": "{{API_KEY}}"}, body: null }
        ]
      },
      {
        title: "5. Gateway Connected",
        lore: "We've made hard seal! Pull the final mission briefing to review the data transfer.",
        requests: [
          { method: "POST", endpoint: "/mission/brief", headers: {"x-api-key": "{{API_KEY}}", "Content-Type": "application/json"}, body: { "phase": "orbit" } }
        ]
      }
    ]
  },
  {
    id: "m2",
    shortName: "Solar Flare Blackout",
    title: "Mission II: Solar Flare Blackout",
    description: "A massive coronal mass ejection sweeps over the Moon, frying primary systems and forcing a tense manual transit.",
    chapters: [
      {
        title: "1. Emergency Comm Shift",
        lore: "You're taking over the night shift because the previous flight director just collapsed from stress.",
        requests: [ { method: "POST", endpoint: "/register", headers: {"Content-Type": "application/json"}, body: { "name": "Dr. Aris", "email": "aris.j@nasa.gov" } } ]
      },
      {
        title: "2. The Radiation Wave",
        lore: "The CME hits. Alarms blare. Log the cascading failures before the dashboard goes dark.",
        requests: [
          { method: "POST", endpoint: "/logs", headers: {"x-api-key": "{{API_KEY}}", "Content-Type": "application/json"}, body: { "title": "ANOMALY: Main Antenna Fried", "description": "S-Band transmitter overloaded by CME. Switching to backup.", "phase": "transit", "category": "anomaly", "crew_member": "hansen" } },
          { method: "POST", endpoint: "/logs", headers: {"x-api-key": "{{API_KEY}}", "Content-Type": "application/json"}, body: { "title": "Radiation Dosimeters Spiking", "description": "Crew moved to center storm shelter. Radiation shield holding.", "phase": "transit", "category": "science", "crew_member": "koch" } },
          { method: "POST", endpoint: "/logs", headers: {"x-api-key": "{{API_KEY}}", "Content-Type": "application/json"}, body: { "title": "Navigation Rebooting", "description": "Star trackers blinded by solar particles. Flying dead reckoning.", "phase": "transit", "category": "navigation", "crew_member": "glover" } }
        ]
      },
      {
        title: "3. Re-acquiring Signal",
        lore: "The radiation storm passes. Hansen manages to splice the backup antenna into the primary feed. Update the comms log.",
        requests: [ { method: "PATCH", endpoint: "/logs/1", headers: {"x-api-key": "{{API_KEY}}", "Content-Type": "application/json"}, body: { "title": "ANOMALY RESOLVED: Rigged Antenna", "description": "Spliced bypass successful. We have low bandwidth DSN connection." } } ]
      },
      {
        title: "4. Ditching Dead Weight",
        lore: "Bandwidth is crawling at 5kbps. Delete the bloated raw star-tracker log to free up the channel for telemetry.",
        requests: [ { method: "DELETE", endpoint: "/logs/3", headers: {"x-api-key": "{{API_KEY}}"}, body: null } ]
      },
      {
        title: "5. Damage Assessment",
        lore: "Pull the full debrief to understand what the radiation storm cost us.",
        requests: [ { method: "POST", endpoint: "/mission/brief", headers: {"x-api-key": "{{API_KEY}}", "Content-Type": "application/json"}, body: {} } ]
      }
    ]
  },
  {
    id: "m3",
    shortName: "Contagion Protocol",
    title: "Mission III: Medical Emergency",
    description: "Two days into Transit, Commander Wiseman develops a high fever. You must enforce quarantine protocols remotely.",
    chapters: [
      {
        title: "1. Flight Surgeon Login",
        lore: "Medical situations require a certified Flight Surgeon to assume mission command.",
        requests: [ { method: "POST", endpoint: "/register", headers: {"Content-Type": "application/json"}, body: { "name": "Surgeon Patel", "email": "patel.m@nasa.gov" } } ]
      },
      {
        title: "2. Quarantine Actions",
        lore: "Secure the habitat and isolate the illness. Record the medical and life-support adjustments.",
        requests: [
          { method: "POST", endpoint: "/logs", headers: {"x-api-key": "{{API_KEY}}", "Content-Type": "application/json"}, body: { "title": "ANOMALY: Crew Fever", "description": "Wiseman core temp at 102.4F. Isolating in lower deck.", "phase": "transit", "category": "anomaly", "crew_member": "koch" } },
          { method: "POST", endpoint: "/logs", headers: {"x-api-key": "{{API_KEY}}", "Content-Type": "application/json"}, body: { "title": "Air Filters to Max", "description": "Switching HEPA filtration to 100% capacity to prevent spread.", "phase": "transit", "category": "life-support", "crew_member": "glover" } },
          { method: "POST", endpoint: "/logs", headers: {"x-api-key": "{{API_KEY}}", "Content-Type": "application/json"}, body: { "title": "Baseline Vitals Checked", "description": "Remaining crew display nominal vitals.", "phase": "transit", "category": "crew-status", "crew_member": "hansen" } }
        ]
      },
      {
        title: "3. Fever Breaking",
        lore: "After 24 tense hours, the antibiotics take hold. Update the medical anomaly.",
        requests: [ { method: "PATCH", endpoint: "/logs/1", headers: {"x-api-key": "{{API_KEY}}", "Content-Type": "application/json"}, body: { "title": "ANOMALY DOWNGRADED: Fever Breaking", "description": "Temp dropping to 99.1F. Patient responsive and hydrating." } } ]
      },
      {
        title: "4. Scrubbing Routine Logs",
        lore: "Delete the routine vitals check so Medical command can focus purely on the anomaly charts.",
        requests: [ { method: "DELETE", endpoint: "/logs/3", headers: {"x-api-key": "{{API_KEY}}"}, body: null } ]
      },
      {
        title: "5. Medical Debrief",
        lore: "Pull the final medical phase briefing for the CDC and NASA Health archives.",
        requests: [ { method: "POST", endpoint: "/mission/brief", headers: {"x-api-key": "{{API_KEY}}", "Content-Type": "application/json"}, body: { "phase": "transit" } } ]
      }
    ]
  },
  {
    id: "m4",
    shortName: "Meteoroid Evasion",
    title: "Mission IV: Meteoroid Alley",
    description: "Deep Space Radar algorithms predict a 94% collision probability with a micro-meteoroid cluster. Evade immediately.",
    chapters: [
      {
        title: "1. Trajectory Command",
        lore: "FIDO (Flight Dynamics Officer) requires supreme access to orchestrate the burn.",
        requests: [ { method: "POST", endpoint: "/register", headers: {"Content-Type": "application/json"}, body: { "name": "FIDO Officer", "email": "fido@nasa.gov" } } ]
      },
      {
        title: "2. The Drift Calculation",
        lore: "Calculate the evasion drift, log the new trajectory, and ensure we haven't lost DSN lock.",
        requests: [
          { method: "POST", endpoint: "/logs", headers: {"x-api-key": "{{API_KEY}}", "Content-Type": "application/json"}, body: { "title": "Emergency Burn Triggered", "description": "Delta-V of 14m/s applied along Y-axis.", "phase": "flyby", "category": "navigation", "crew_member": "glover" } },
          { method: "POST", endpoint: "/logs", headers: {"x-api-key": "{{API_KEY}}", "Content-Type": "application/json"}, body: { "title": "DSN Lock Fluctuating", "description": "New angle causing slight degradation in Madrid feed.", "phase": "flyby", "category": "communication", "crew_member": "wiseman" } },
          { method: "POST", endpoint: "/logs", headers: {"x-api-key": "{{API_KEY}}", "Content-Type": "application/json"}, body: { "title": "ANOMALY: Hull Impact Detected", "description": "Acoustic sensors picked up a strike on the outer service module.", "phase": "flyby", "category": "anomaly", "crew_member": "koch" } }
        ]
      },
      {
        title: "3. Damage Control",
        lore: "Koch completes a camera sweep of the hull and confirms the damage is superficial.",
        requests: [ { method: "PATCH", endpoint: "/logs/3", headers: {"x-api-key": "{{API_KEY}}", "Content-Type": "application/json"}, body: { "title": "ANOMALY RESOLVED: Superficial Strike", "description": "Visual confirmation: Micrometeoroid hit the thermal blanket. No structural hull breach." } } ]
      },
      {
        title: "4. Return to Trajectory",
        lore: "Purge the fluctuating comms log, we're realigned and locking onto Goldstone perfectly now.",
        requests: [ { method: "DELETE", endpoint: "/logs/2", headers: {"x-api-key": "{{API_KEY}}"}, body: null } ]
      },
      {
        title: "5. Close Call Review",
        lore: "Generate the final summary for the Planetary Defense board.",
        requests: [ { method: "POST", endpoint: "/mission/brief", headers: {"x-api-key": "{{API_KEY}}", "Content-Type": "application/json"}, body: {} } ]
      }
    ]
  },
  {
    id: "m5",
    shortName: "Dark Side Observatory",
    title: "Mission V: The Dark Side Observatory",
    description: "Launch the highly sensitive radio telescope array while hidden from Earth's radio interference behind the moon.",
    chapters: [
      {
        title: "1. Payload Commander",
        lore: "Only the designated Science Officer can authorize payload extraction.",
        requests: [ { method: "POST", endpoint: "/register", headers: {"Content-Type": "application/json"}, body: { "name": "Dr. Sterling", "email": "sterling.sci@nasa.gov" } } ]
      },
      {
        title: "2. Deployment Sequence",
        lore: "We are entering radio silence. Log the deployment steps manually.",
        requests: [
          { method: "POST", endpoint: "/logs", headers: {"x-api-key": "{{API_KEY}}", "Content-Type": "application/json"}, body: { "title": "LOS Confirmed", "description": "Behind the moon. Total radio silence achieved. Ideal telescope conditions.", "phase": "flyby", "category": "communication", "crew_member": "hansen" } },
          { method: "POST", endpoint: "/logs", headers: {"x-api-key": "{{API_KEY}}", "Content-Type": "application/json"}, body: { "title": "Payload Bay Doors Open", "description": "Hydraulics engaged. Deploying observatory array.", "phase": "flyby", "category": "science", "crew_member": "koch" } },
          { method: "POST", endpoint: "/logs", headers: {"x-api-key": "{{API_KEY}}", "Content-Type": "application/json"}, body: { "title": "ANOMALY: Array Snagged", "description": "Tether line 3 tangled. Array is stuck at 45 degree angle.", "phase": "flyby", "category": "anomaly", "crew_member": "glover" } }
        ]
      },
      {
        title: "3. Robotic Intervention",
        lore: "Using the Canadarm, Hansen gently nudges the tether loose.",
        requests: [ { method: "PATCH", endpoint: "/logs/3", headers: {"x-api-key": "{{API_KEY}}", "Content-Type": "application/json"}, body: { "title": "ANOMALY RESOLVED: Array Free", "description": "Canadarm nudged tether 3. Observatory successfully detached and floating free." } } ]
      },
      {
        title: "4. Purge Extraneous Logs",
        lore: "Delete the initial payload bay door log to make room for the massive raw science data incoming.",
        requests: [ { method: "DELETE", endpoint: "/logs/2", headers: {"x-api-key": "{{API_KEY}}"}, body: null } ]
      },
      {
        title: "5. Signal Reacquired",
        lore: "We're out from behind the moon! Generate the brief and beam the telescope success back to Earth.",
        requests: [ { method: "POST", endpoint: "/mission/brief", headers: {"x-api-key": "{{API_KEY}}", "Content-Type": "application/json"}, body: {} } ]
      }
    ]
  },
  {
    id: "m6",
    shortName: "The CO2 Crisis",
    title: "Mission VI: The Scrubber Crisis",
    description: "CO2 levels are rising fast. The primary amine scrubbers have failed. It's Apollo 13 all over again.",
    chapters: [
      {
        title: "1. ECLSS Engineer",
        lore: "Environmental Control experts take the helm. Log in to access the schematics.",
        requests: [ { method: "POST", endpoint: "/register", headers: {"Content-Type": "application/json"}, body: { "name": "Eng. Chen", "email": "chen.eclss@nasa.gov" } } ]
      },
      {
        title: "2. The Failure",
        lore: "CO2 alarms ringing. Establish the baseline and log the emergency.",
        requests: [
          { method: "POST", endpoint: "/logs", headers: {"x-api-key": "{{API_KEY}}", "Content-Type": "application/json"}, body: { "title": "ANOMALY: CO2 Rising Fast", "description": "Primary amine swingbed frozen. CO2 at 4.2 mmHg. Crew reporting headaches.", "phase": "transit", "category": "anomaly", "crew_member": "wiseman" } },
          { method: "POST", endpoint: "/logs", headers: {"x-api-key": "{{API_KEY}}", "Content-Type": "application/json"}, body: { "title": "Crew Status: Fatigued", "description": "High CO2 causing lethargy. Instructed to reduce movement.", "phase": "transit", "category": "crew-status", "crew_member": "hansen" } },
          { method: "POST", endpoint: "/logs", headers: {"x-api-key": "{{API_KEY}}", "Content-Type": "application/json"}, body: { "title": "Building Backup Scrubber", "description": "Using flight manuals, duct tape, and spare LiOH canisters from Orion.", "phase": "transit", "category": "life-support", "crew_member": "koch" } }
        ]
      },
      {
        title: "3. Houston, We Fixed It",
        lore: "The improvised duct-tape scrubber works beautifully.",
        requests: [ { method: "PATCH", endpoint: "/logs/1", headers: {"x-api-key": "{{API_KEY}}", "Content-Type": "application/json"}, body: { "title": "ANOMALY MITIGATED: Improvised Scrubber Active", "description": "CO2 levels dropping rapidly back to 1.1 mmHg. Crew headaches subsiding." } } ]
      },
      {
        title: "4. Scrub the Fatigued Log",
        lore: "Crew is operating at 100% again. Delete the earlier fatigue report to prevent PR panic.",
        requests: [ { method: "DELETE", endpoint: "/logs/2", headers: {"x-api-key": "{{API_KEY}}"}, body: null } ]
      },
      {
        title: "5. Engineering Debrief",
        lore: "Pull the final briefing to praise Chen's duct-tape heroics.",
        requests: [ { method: "POST", endpoint: "/mission/brief", headers: {"x-api-key": "{{API_KEY}}", "Content-Type": "application/json"}, body: {} } ]
      }
    ]
  },
  {
    id: "m7",
    shortName: "The VIP Payload",
    title: "Mission VII: Classified Cargo",
    description: "Transport a highly sensitive, classified Department of Defense probe into high lunar orbit.",
    chapters: [
      {
        title: "1. DoD Clearance",
        lore: "This is black-book ops. Normal flight directors don't have access.",
        requests: [ { method: "POST", endpoint: "/register", headers: {"Content-Type": "application/json"}, body: { "name": "Director Black", "email": "black.ops@dod.gov" } } ]
      },
      {
        title: "2. Silent Running",
        lore: "Cut non-essential comms and deploy the classified probe quietly.",
        requests: [
          { method: "POST", endpoint: "/logs", headers: {"x-api-key": "{{API_KEY}}", "Content-Type": "application/json"}, body: { "title": "Comm Blackout Engaged", "description": "Encrypting all feeds. DSN running on secure band purely.", "phase": "lunar-approach", "category": "communication", "crew_member": "wiseman" } },
          { method: "POST", endpoint: "/logs", headers: {"x-api-key": "{{API_KEY}}", "Content-Type": "application/json"}, body: { "title": "Classified Probe Deployment", "description": "Package X-112 released. Firing its internal thrusters.", "phase": "lunar-approach", "category": "science", "crew_member": "koch" } },
          { method: "POST", endpoint: "/logs", headers: {"x-api-key": "{{API_KEY}}", "Content-Type": "application/json"}, body: { "title": "ANOMALY: Probe Ping Missing", "description": "Did not receive the expected encrypted handshake from X-112.", "phase": "lunar-approach", "category": "anomaly", "crew_member": "glover" } }
        ]
      },
      {
        title: "3. Ghost Protocol",
        lore: "The probe just changed encryption keys autonomously. It's highly advanced.",
        requests: [ { method: "PATCH", endpoint: "/logs/3", headers: {"x-api-key": "{{API_KEY}}", "Content-Type": "application/json"}, body: { "title": "ANOMALY RESOLVED: Rolling Ciphers", "description": "Probe utilized advanced rolling cipher. Handshake caught on secondary channel. Package is active." } } ]
      },
      {
        title: "4. Scrub the Evidence",
        lore: "Delete the deployment log. This never officially happened.",
        requests: [ { method: "DELETE", endpoint: "/logs/2", headers: {"x-api-key": "{{API_KEY}}"}, body: null } ]
      },
      {
        title: "5. Redacted Report",
        lore: "Generate the top-secret mission briefing.",
        requests: [ { method: "POST", endpoint: "/mission/brief", headers: {"x-api-key": "{{API_KEY}}", "Content-Type": "application/json"}, body: {} } ]
      }
    ]
  },
  {
    id: "m8",
    shortName: "Live Media Broadcast",
    title: "Mission VIII: Primary Broadcast",
    description: "The entire world is watching the first 4K Live Broadcast from the far side of the moon.",
    chapters: [
      {
        title: "1. PAO Registration",
        lore: "Public Affairs Office assumes control of the media relay bandwidth.",
        requests: [ { method: "POST", endpoint: "/register", headers: {"Content-Type": "application/json"}, body: { "name": "L. Miller (PAO)", "email": "miller.pao@nasa.gov" } } ]
      },
      {
        title: "2. Setting the Stage",
        lore: "Align the antennas, secure the camera feed, and prep the crew.",
        requests: [
          { method: "POST", endpoint: "/logs", headers: {"x-api-key": "{{API_KEY}}", "Content-Type": "application/json"}, body: { "title": "4K Stream Establishing", "description": "Lasers locked. Beam pushing incredible 400 Mbps bandwidth to Earth.", "phase": "flyby", "category": "communication", "crew_member": "glover" } },
          { method: "POST", endpoint: "/logs", headers: {"x-api-key": "{{API_KEY}}", "Content-Type": "application/json"}, body: { "title": "Crew Ready for Camera", "description": "Hair tied back, mics tested, waiting for the green light.", "phase": "flyby", "category": "crew-status", "crew_member": "wiseman" } },
          { method: "POST", endpoint: "/logs", headers: {"x-api-key": "{{API_KEY}}", "Content-Type": "application/json"}, body: { "title": "ANOMALY: Audio Desync", "description": "The audio is trailing video by 1.2 seconds due to atmospheric diffraction.", "phase": "flyby", "category": "anomaly", "crew_member": "hansen" } }
        ]
      },
      {
        title: "3. Fixing the Feed",
        lore: "A quick buffer algorithm patch fixes the audio trailing perfectly.",
        requests: [ { method: "PATCH", endpoint: "/logs/3", headers: {"x-api-key": "{{API_KEY}}", "Content-Type": "application/json"}, body: { "title": "ANOMALY RESOLVED: Buffer Applied", "description": "Audio buffer inserted. Sync is perfect. Broadcast is going live to 3 billion people." } } ]
      },
      {
        title: "4. Delete Pre-Show Jitters",
        lore: "Delete the crew status log so the public record focuses entirely on the historic broadcast.",
        requests: [ { method: "DELETE", endpoint: "/logs/2", headers: {"x-api-key": "{{API_KEY}}"}, body: null } ]
      },
      {
        title: "5. Historic Debrief",
        lore: "Pull the final engagement metrics and briefing stats.",
        requests: [ { method: "POST", endpoint: "/mission/brief", headers: {"x-api-key": "{{API_KEY}}", "Content-Type": "application/json"}, body: {} } ]
      }
    ]
  },
  {
    id: "m9",
    shortName: "Uncontrolled Spin",
    title: "Mission IX: The Uncontrolled Spin",
    description: "A stuck thruster sends Orion into a dangerous tumbling spin right before Splashdown.",
    chapters: [
      {
        title: "1. Flight Director Priority",
        lore: "This is a Code Red. The absolute highest authority is required to take the controls.",
        requests: [ { method: "POST", endpoint: "/register", headers: {"Content-Type": "application/json"}, body: { "name": "Gene Kranz", "email": "kranz.g@nasa.gov" } } ]
      },
      {
        title: "2. The Spin Begins",
        lore: "Logging the violent telemetry as the capsule plummets towards the atmosphere spinning.",
        requests: [
          { method: "POST", endpoint: "/logs", headers: {"x-api-key": "{{API_KEY}}", "Content-Type": "application/json"}, body: { "title": "ANOMALY: Stuck RCS Thruster", "description": "RCS Yaw thruster stuck open. Capsule spinning at 30 rpm.", "phase": "return", "category": "anomaly", "crew_member": "glover" } },
          { method: "POST", endpoint: "/logs", headers: {"x-api-key": "{{API_KEY}}", "Content-Type": "application/json"}, body: { "title": "Navigation Overload", "description": "Star trackers confused by rapid movement. IMUs holding, barely.", "phase": "return", "category": "navigation", "crew_member": "koch" } },
          { method: "POST", endpoint: "/logs", headers: {"x-api-key": "{{API_KEY}}", "Content-Type": "application/json"}, body: { "title": "Crew Enduring High Gs", "description": "Centripetal forces rising. Crew trained for this, but it's physically brutal.", "phase": "return", "category": "crew-status", "crew_member": "wiseman" } }
        ]
      },
      {
        title: "3. Shutting the Valve",
        lore: "Glover manages to electronically isolate the manifold, killing the thruster.",
        requests: [ { method: "PATCH", endpoint: "/logs/1", headers: {"x-api-key": "{{API_KEY}}", "Content-Type": "application/json"}, body: { "title": "ANOMALY RESOLVED: Manifold Isolated", "description": "Thruster killed. Counter-burn applied. Spin has been stabilized to 0 rpm." } } ]
      },
      {
        title: "4. Scrub the Nav Errata",
        lore: "The navigation logs during the spin are pure noise. Delete the overload log.",
        requests: [ { method: "DELETE", endpoint: "/logs/2", headers: {"x-api-key": "{{API_KEY}}"}, body: null } ]
      },
      {
        title: "5. Safe Splashdown",
        lore: "Parachutes open. Orion is safe. Get the briefing.",
        requests: [ { method: "POST", endpoint: "/mission/brief", headers: {"x-api-key": "{{API_KEY}}", "Content-Type": "application/json"}, body: {} } ]
      }
    ]
  },
  {
    id: "m10",
    shortName: "The Rookie Run",
    title: "Mission X: The Training Sim",
    description: "The absolute purest run for rookie controllers. A textbook flight to prove you know the API.",
    chapters: [
      {
        title: "1. Clocking In",
        lore: "Welcome to Houston. Let's get you in the system.",
        requests: [ { method: "POST", endpoint: "/register", headers: {"Content-Type": "application/json"}, body: { "name": "Rookie Desk", "email": "rookie101@nasa.gov" } } ]
      },
      {
        title: "2. The Textbook Telemetry",
        lore: "We need green lights across life support, comms, and a minor anomaly check.",
        requests: [
          { method: "POST", endpoint: "/logs", headers: {"x-api-key": "{{API_KEY}}", "Content-Type": "application/json"}, body: { "title": "Comms Locked", "description": "Signal strength 100%.", "phase": "launch", "category": "communication", "crew_member": "wiseman" } },
          { method: "POST", endpoint: "/logs", headers: {"x-api-key": "{{API_KEY}}", "Content-Type": "application/json"}, body: { "title": "Air Pressure Good", "description": "Holding at 14.7 psi.", "phase": "launch", "category": "life-support", "crew_member": "koch" } },
          { method: "POST", endpoint: "/logs", headers: {"x-api-key": "{{API_KEY}}", "Content-Type": "application/json"}, body: { "title": "ANOMALY: Blinking Light", "description": "Coffee machine light blinking.", "phase": "launch", "category": "anomaly", "crew_member": "hansen" } }
        ]
      },
      {
        title: "3. Minor Fix",
        lore: "Turns out it just needed beans. Coffee machine is nominal.",
        requests: [ { method: "PATCH", endpoint: "/logs/3", headers: {"x-api-key": "{{API_KEY}}", "Content-Type": "application/json"}, body: { "title": "ANOMALY RESOLVED: Needs Beans", "description": "Espresso added. Crew morale increased." } } ]
      },
      {
        title: "4. Cleaning House",
        lore: "Delete the comm log so the console is tidy for transit.",
        requests: [ { method: "DELETE", endpoint: "/logs/1", headers: {"x-api-key": "{{API_KEY}}"}, body: null } ]
      },
      {
        title: "5. Pass the Test",
        lore: "You've proven you can handle the API interface. Generate your briefing.",
        requests: [ { method: "POST", endpoint: "/mission/brief", headers: {"x-api-key": "{{API_KEY}}", "Content-Type": "application/json"}, body: {} } ]
      }
    ]
  }
];

function renderGuideMission() {
  const css = getBaseCSS(false);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Artemis II — Mission Scenarios</title>
  <style>
    ${css}
    .layout { max-width: 1000px; margin: 0 auto; padding: 20px;}
    
    /* Right Content */
    .content-area { flex: 1; min-width: 0; }
    .mission-content { display: none; animation: fadeIn 0.4s ease; }
    .mission-content.active { display: block; }
    
    .chapter { border-left: 2px solid rgba(0,229,255,0.3); padding-left: 24px; margin-bottom: 40px; position: relative; }
    .chapter::before {
      content: ''; position: absolute; left: -7px; top: 0; width: 12px; height: 12px; 
      border-radius: 50%; background: #00e5ff; box-shadow: 0 0 8px #00e5ff;
    }
    .chapter-title { color: #fff; font-size: 1.3rem; margin-bottom: 8px; font-weight:600;}
    .chapter-lore { color: #bbb; font-size: 0.95rem; margin-bottom: 20px; line-height: 1.6; font-style: italic; }
    
    .request-card { background: rgba(0,0,0,0.6); border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; overflow: hidden; margin-bottom: 16px; }
    .req-header { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: rgba(255,255,255,0.03); border-bottom: 1px solid rgba(255,255,255,0.05); }
    .req-method { font-weight: bold; padding: 3px 8px; border-radius: 4px; font-size: 0.8rem; color: #fff; }
    .method-POST { background: #d97706; }
    .method-PATCH { background: #059669; }
    .method-DELETE { background: #dc2626; }
    .req-url { color: #00e5ff; font-family: monospace; font-size: 0.9rem; margin-left:12px; flex-grow:1; }
    
    .btn-copy { background: transparent; border: 1px solid #4ade80; color: #4ade80; padding: 6px 12px; border-radius: 4px; font-size: 0.75rem; cursor: pointer; transition: all 0.2s; white-space:nowrap; }
    .btn-copy.copied { background: #4ade80; color: #000; font-weight:bold; }
    .btn-copy:hover { box-shadow: 0 0 10px rgba(74,222,128,0.3); }
    
    .req-body-container { padding: 16px; font-family: monospace; font-size: 0.85rem; color: #e2e8f0; white-space: pre-wrap; overflow-x:auto; }
    .headers-block { color: #6ee7b7; margin-bottom: 8px; padding-bottom: 8px; border-bottom: 1px dashed rgba(255,255,255,0.1); }
    
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

    /* Light mode overrides */
    :root[data-theme="light"] .chapter { border-left-color: rgba(2,132,199,0.3); }
    :root[data-theme="light"] .chapter::before { background: #0284c7; box-shadow: none; }
    :root[data-theme="light"] .chapter-title { color: #0f172a; }
    :root[data-theme="light"] .chapter-lore { color: #475569; }
    :root[data-theme="light"] .request-card { background: rgba(0,0,0,0.03); border-color: rgba(0,0,0,0.08); }
    :root[data-theme="light"] .req-header { background: rgba(0,0,0,0.02); border-bottom-color: rgba(0,0,0,0.06); }
    :root[data-theme="light"] .req-url { color: #0284c7; }
    :root[data-theme="light"] .req-body-container { color: #334155; }
    :root[data-theme="light"] .headers-block { color: #059669; border-bottom-color: rgba(0,0,0,0.08); }
  </style>
</head>
<body>
  ${getThemeToggleHTML()}
  <div style="text-align:center; padding: 32px 0 16px;">
    <h1 style="letter-spacing:4px; text-shadow:0 0 15px rgba(0,229,255,0.6);">MISSION CAMPAIGNS ARCHIVE</h1>
    <p class="dim" style="max-width:600px; margin: 0 auto;">Select a narrative scenario below. Follow the chapters chronologically to complete your mission utilizing the postman API configurations.</p>
  </div>

  <div class="layout">
    <!-- Content -->
    <div class="content-area">
      
      <!-- Mission Dropdown Card -->
      <div style="background: rgba(0,0,0,0.5); padding: 16px 20px; border-radius: 8px; border: 1px solid rgba(0,229,255,0.3); margin-bottom: 24px; display:flex; align-items:center; gap:16px; position:relative; box-shadow: 0 4px 15px rgba(0,0,0,0.5);">
        <label for="missionSelect" style="color:#00e5ff; font-weight:bold; letter-spacing:1px; white-space:nowrap;">SELECT MISSION CAMPAIGN:</label>
        <select id="missionSelect" onchange="selectMission(this.value)" style="flex:1; background:rgba(0,0,0,0.8); border:1px solid rgba(255,255,255,0.1); color:#fff; padding:10px 16px; border-radius:6px; font-size:1rem; outline:none; cursor:pointer; -webkit-appearance:none; appearance:none;">
          ${MISSIONS.map(m => `<option value="${m.id}">${m.shortName} &mdash; ${m.title}</option>`).join('')}
        </select>
        <div style="position:absolute; right:35px; top:50%; transform:translateY(-50%); pointer-events:none; color:#00e5ff;">▼</div>
      </div>

      <!-- Mission Header -->
      <div id="mission-header"></div>
      
      <!-- Progress Bar -->
      <div style="background: rgba(0,0,0,0.5); padding: 12px 20px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05); margin-bottom: 24px;">
        <div style="display:flex; justify-content:space-between; font-size: 0.85rem; color: #888; margin-bottom:8px; font-weight:bold; letter-spacing:1px;">
          <span id="progress-text">LOADING...</span>
        </div>
        <div style="height:6px; background:rgba(255,255,255,0.1); border-radius:3px; overflow:hidden;">
          <div id="progress-fill" style="height:100%; background:#00e5ff; width:0%; transition: width 0.3s ease; box-shadow:0 0 10px #00e5ff;"></div>
        </div>
      </div>

      <!-- Single Request View -->
      <div id="step-content" style="min-height: 380px;"></div>

      <!-- Controls -->
      <div style="display:flex; justify-content:space-between; margin-top:20px; gap:16px;">
        <button id="btn-prev" onclick="goToStep(-1)" style="flex:1; padding:12px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#fff; cursor:pointer; border-radius:4px; font-weight:bold; letter-spacing:1px; transition:all 0.2s;">« PREVIOUS REQUEST</button>
        <button id="btn-next" onclick="goToStep(1)" style="flex:1; padding:12px; background:rgba(0,229,255,0.1); border:1px solid rgba(0,229,255,0.4); color:#00e5ff; cursor:pointer; border-radius:4px; font-weight:bold; letter-spacing:1px; transition:all 0.2s;">NEXT REQUEST »</button>
      </div>
    </div>
  </div>

  <script>
    const MISSIONS_DATA = ${JSON.stringify(MISSIONS)};
    let currentMissionId = null;
    let flattenedSteps = [];
    let currentStepIndex = 0;

    function selectMission(id) {
      currentMissionId = id;
      
      const mission = MISSIONS_DATA.find(m => m.id === id);
      
      document.getElementById('mission-header').innerHTML = \`
        <h2 style="font-size: 1.8rem; border:none; color:#fff; text-shadow:0 0 10px rgba(0,229,255,0.4);">\${mission.title}</h2>
        <p style="color:#aaa; margin-bottom: 24px; font-size: 1.05rem;">\${mission.description}</p>
      \`;

      flattenedSteps = [];
      mission.chapters.forEach(ch => {
        ch.requests.forEach((req, idx) => {
          flattenedSteps.push({
            chapterTitle: ch.title,
            lore: ch.lore,
            req: req,
            totalInChapter: ch.requests.length,
            idxInChapter: idx
          });
        });
      });
      
      currentStepIndex = 0;
      renderStep();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function renderStep() {
      const step = flattenedSteps[currentStepIndex];
      const isLogs = step.totalInChapter === 3;
      
      let progressText = \`STEP \${currentStepIndex + 1} OF \${flattenedSteps.length}\`;
      if (isLogs) {
        let added = step.idxInChapter;
        let togo = 3 - added;
        progressText += \` &mdash; TELEMETRY LOGS REQUIRED: \${added} LOGGED, \${togo} MORE TO GO\`;
      }
      
      document.getElementById('progress-text').innerHTML = progressText;
      document.getElementById('progress-fill').style.width = ((currentStepIndex + 1) / flattenedSteps.length * 100) + '%';
      
      let headersHtml = Object.entries(step.req.headers).map(([k,v]) => \`\${k}: \${v}\`).join('\\n');
      let bodyStr = step.req.body ? JSON.stringify(step.req.body, null, 2) : '';
      let rawCopy = bodyStr;

      let html = \`
        <div class="chapter" style="animation: fadeIn 0.4s ease;">
          <div class="chapter-title">\${step.chapterTitle}</div>
          <div class="chapter-lore">\${step.lore}</div>
          
          <div class="request-card">
            <div class="req-header mono">
              <span class="req-method method-\${step.req.method}">\${step.req.method}</span>
              <span class="req-url">\${step.req.endpoint}</span>
              \${bodyStr ? \`<button class="btn-copy mono" onclick='doCopy(\\\`\${rawCopy.replace(/'/g, "\\\\'")}\\\`, this)'>[ COPY RAW JSON ]</button>\` : ''}
            </div>
            <div class="req-body-container">
              <div class="headers-block">\${headersHtml}</div>
              \${bodyStr ? \`<div style="max-height: 200px; overflow: auto;">\${bodyStr}</div>\` : '<div style="color:#666;">// No JSON body required</div>'}
            </div>
          </div>
        </div>
      \`;

      document.getElementById('step-content').innerHTML = html;
      
      const btnPrev = document.getElementById('btn-prev');
      const btnNext = document.getElementById('btn-next');
      
      btnPrev.disabled = currentStepIndex === 0;
      btnPrev.style.opacity = currentStepIndex === 0 ? '0.3' : '1';
      btnPrev.style.cursor = currentStepIndex === 0 ? 'not-allowed' : 'pointer';

      btnNext.disabled = currentStepIndex === flattenedSteps.length - 1;
      btnNext.style.opacity = currentStepIndex === flattenedSteps.length - 1 ? '0.3' : '1';
      btnNext.style.cursor = currentStepIndex === flattenedSteps.length - 1 ? 'not-allowed' : 'pointer';
    }

    function goToStep(dir) {
      if (dir === -1 && currentStepIndex > 0) currentStepIndex--;
      if (dir === 1 && currentStepIndex < flattenedSteps.length - 1) currentStepIndex++;
      renderStep();
    }

    function doCopy(text, btn) {
      navigator.clipboard.writeText(text).then(() => {
        let old = btn.innerText;
        btn.innerText = '[ COPIED JSON ]';
        btn.classList.add('copied');
        setTimeout(() => { btn.innerText = old; btn.classList.remove('copied'); }, 2000);
      });
    }
    
    // Initialize
    selectMission(MISSIONS_DATA[0].id);
  </script>
  <script>${getThemeToggleJS()}</script>
</body>
</html>`;
}

module.exports = { renderGuideMission };
