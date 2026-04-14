function renderGuideWorkshop() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Artemis Mission Control — API & MCP Workshop</title>
  <meta name="description" content="Hands-on workshop guide for Git-native API workflows, AI-powered testing, and MCP agent integration with Postman.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
  <style>
    /* ========================================
       DESIGN SYSTEM — CSS Custom Properties
       ======================================== */
    :root {
      /* Core palette */
      --bg-primary: #0a0e1a;
      --bg-secondary: #0f1628;
      --bg-card: rgba(15, 22, 42, 0.7);
      --bg-card-hover: rgba(20, 30, 55, 0.8);

      /* Accent colors */
      --accent-blue: #00d4ff;
      --accent-blue-dim: rgba(0, 212, 255, 0.15);
      --accent-blue-glow: rgba(0, 212, 255, 0.4);
      --accent-amber: #f5a623;
      --accent-amber-dim: rgba(245, 166, 35, 0.12);
      --accent-amber-glow: rgba(245, 166, 35, 0.4);
      --accent-green: #10b981;
      --accent-green-dim: rgba(16, 185, 129, 0.12);
      --accent-red: #ef4444;

      /* Text */
      --text-primary: #e8eaf0;
      --text-secondary: #94a3b8;
      --text-dim: #64748b;
      --text-heading: #f1f5f9;

      /* Borders */
      --border-subtle: rgba(255, 255, 255, 0.06);
      --border-card: rgba(0, 212, 255, 0.12);
      --border-active: rgba(0, 212, 255, 0.35);
      --border-complete: rgba(16, 185, 129, 0.4);

      /* Typography */
      --font-body: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-heading: 'Space Grotesk', sans-serif;
      --font-mono: 'JetBrains Mono', 'SF Mono', 'Fira Code', monospace;

      /* Spacing */
      --radius-sm: 6px;
      --radius-md: 10px;
      --radius-lg: 16px;

      /* Shadows */
      --shadow-card: 0 4px 24px rgba(0, 0, 0, 0.4), 0 0 0 1px var(--border-card);
      --shadow-glow-blue: 0 0 20px rgba(0, 212, 255, 0.15);
      --shadow-glow-green: 0 0 20px rgba(16, 185, 129, 0.15);
    }

    /* ========================================
       LIGHT MODE OVERRIDES
       ======================================== */
    :root[data-theme="light"] {
      --bg-primary: #f8f9fc;
      --bg-secondary: #eef1f6;
      --bg-card: rgba(255, 255, 255, 0.85);
      --bg-card-hover: rgba(255, 255, 255, 0.95);

      --accent-blue: #0284c7;
      --accent-blue-dim: rgba(2, 132, 199, 0.1);
      --accent-blue-glow: rgba(2, 132, 199, 0.2);
      --accent-amber: #d97706;
      --accent-amber-dim: rgba(217, 119, 6, 0.08);
      --accent-amber-glow: rgba(217, 119, 6, 0.2);
      --accent-green: #059669;
      --accent-green-dim: rgba(5, 150, 105, 0.08);
      --accent-red: #dc2626;

      --text-primary: #1e293b;
      --text-secondary: #475569;
      --text-dim: #94a3b8;
      --text-heading: #0f172a;

      --border-subtle: rgba(0, 0, 0, 0.08);
      --border-card: rgba(2, 132, 199, 0.15);
      --border-active: rgba(2, 132, 199, 0.35);
      --border-complete: rgba(5, 150, 105, 0.35);

      --shadow-card: 0 2px 12px rgba(0, 0, 0, 0.08), 0 0 0 1px var(--border-card);
      --shadow-glow-blue: 0 0 12px rgba(2, 132, 199, 0.1);
      --shadow-glow-green: 0 0 12px rgba(5, 150, 105, 0.1);
    }

    /* ========================================
       RESET & BASE
       ======================================== */
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    
    html { scroll-behavior: smooth; }
    
    body {
      background: var(--bg-primary);
      background-image:
        radial-gradient(ellipse at 50% 0%, rgba(0, 212, 255, 0.06) 0%, transparent 60%),
        radial-gradient(ellipse at 80% 50%, rgba(245, 166, 35, 0.03) 0%, transparent 50%);
      background-attachment: fixed;
      color: var(--text-primary);
      font-family: var(--font-body);
      font-size: 15px;
      line-height: 1.7;
      min-height: 100vh;
      -webkit-font-smoothing: antialiased;
      transition: background-color 0.3s ease, color 0.3s ease;
    }
    :root[data-theme="light"] body {
      background-image:
        radial-gradient(ellipse at 50% 0%, rgba(2, 132, 199, 0.04) 0%, transparent 60%),
        radial-gradient(ellipse at 80% 50%, rgba(217, 119, 6, 0.03) 0%, transparent 50%);
    }

    /* ========================================
       LAYOUT — Docs-style two-column
       ======================================== */
    .docs-layout {
      display: flex;
      max-width: 1280px;
      width: 100%;
      margin: 0 auto;
      min-height: calc(100vh - 52px);
    }

    /* ── Sidebar ── */
    .sidebar {
      position: sticky;
      top: 52px;
      width: 260px;
      flex-shrink: 0;
      height: calc(100vh - 52px);
      overflow-y: auto;
      padding: 24px 16px 40px 24px;
      border-right: 1px solid var(--border-subtle);
      background: var(--bg-secondary);
      scrollbar-width: thin;
      scrollbar-color: var(--border-subtle) transparent;
      transition: background 0.3s ease;
    }
    .sidebar::-webkit-scrollbar { width: 4px; }
    .sidebar::-webkit-scrollbar-track { background: transparent; }
    .sidebar::-webkit-scrollbar-thumb { background: var(--border-subtle); border-radius: 2px; }
    .sidebar-title {
      font-family: var(--font-heading);
      font-size: 0.72rem;
      font-weight: 600;
      color: var(--text-dim);
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-bottom: 12px;
      padding-left: 12px;
    }
    .sidebar-part {
      font-family: var(--font-heading);
      font-size: 0.68rem;
      font-weight: 600;
      color: var(--accent-blue);
      letter-spacing: 1.5px;
      text-transform: uppercase;
      margin: 20px 0 8px;
      padding-left: 12px;
    }
    .sidebar-part:first-of-type { margin-top: 8px; }
    .nav-link {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 12px;
      border-radius: var(--radius-sm);
      color: var(--text-secondary);
      text-decoration: none;
      font-size: 0.9rem;
      line-height: 1.4;
      transition: all 0.15s ease;
      border-left: 2px solid transparent;
      margin-left: 0;
    }
    .nav-link:hover {
      color: var(--text-heading);
      background: rgba(255,255,255,0.04);
    }
    :root[data-theme="light"] .nav-link:hover { background: rgba(0,0,0,0.03); }
    .nav-link.active {
      color: var(--accent-blue);
      background: var(--accent-blue-dim);
      border-left-color: var(--accent-blue);
      font-weight: 500;
    }
    .nav-link.completed {
      color: var(--accent-green);
    }
    .nav-link.completed.active {
      background: var(--accent-green-dim);
      border-left-color: var(--accent-green);
    }
    .nav-dot {
      flex-shrink: 0;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      border: 1.5px solid var(--text-dim);
      transition: all 0.2s ease;
    }
    .nav-link.active .nav-dot { border-color: var(--accent-blue); background: var(--accent-blue); }
    .nav-link.completed .nav-dot { border-color: var(--accent-green); background: var(--accent-green); }

    /* ── Main Content ── */
    .content-area {
      flex: 1;
      min-width: 0;
      padding: 32px 48px 80px;
      max-width: 860px;
    }

    /* Mobile sidebar toggle */
    .sidebar-toggle {
      display: none;
      position: fixed;
      bottom: 20px;
      left: 20px;
      z-index: 150;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      border: 1px solid var(--border-active);
      background: var(--bg-card);
      backdrop-filter: blur(12px);
      color: var(--accent-blue);
      cursor: pointer;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 20px rgba(0,0,0,0.4);
    }
    .sidebar-overlay {
      display: none;
      position: fixed;
      inset: 0;
      z-index: 140;
      background: rgba(0,0,0,0.5);
    }

    /* ========================================
       STICKY PROGRESS BAR
       ======================================== */
    .progress-header {
      position: sticky;
      top: 0;
      z-index: 100;
      background: rgba(10, 14, 26, 0.92);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border-subtle);
      padding: 12px 0;
      transition: box-shadow 0.3s ease, background 0.3s ease;
    }
    :root[data-theme="light"] .progress-header {
      background: rgba(248, 249, 252, 0.92);
    }
    .progress-header.scrolled {
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
    }
    :root[data-theme="light"] .progress-header.scrolled {
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    }
    /* ── Theme Toggle ── */
    .theme-toggle {
      flex-shrink: 0;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 1px solid var(--border-subtle);
      background: rgba(255, 255, 255, 0.05);
      color: var(--text-dim);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      padding: 0;
    }
    .theme-toggle:hover {
      background: rgba(255, 255, 255, 0.1);
      color: var(--accent-blue);
      border-color: var(--border-active);
    }
    :root[data-theme="light"] .theme-toggle:hover {
      background: rgba(0, 0, 0, 0.06);
    }
    .theme-toggle:focus-visible {
      outline: 2px solid var(--accent-blue);
      outline-offset: 2px;
    }
    .theme-toggle .icon-sun,
    .theme-toggle .icon-moon { display: none; }
    :root[data-theme="light"] .theme-toggle .icon-moon { display: block; }
    :root[data-theme="light"] .theme-toggle .icon-sun { display: none; }
    :root:not([data-theme="light"]) .theme-toggle .icon-sun { display: block; }
    :root:not([data-theme="light"]) .theme-toggle .icon-moon { display: none; }
    .progress-inner {
      max-width: 1280px;
      width: 100%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 0 24px;
    }
    .progress-label {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--text-secondary);
      white-space: nowrap;
      letter-spacing: 0.5px;
    }
    .progress-label span {
      color: var(--accent-blue);
      font-weight: 500;
    }
    .progress-track {
      flex: 1;
      height: 6px;
      background: rgba(255, 255, 255, 0.06);
      border-radius: 3px;
      overflow: hidden;
    }
    .progress-fill {
      height: 100%;
      width: 0%;
      background: linear-gradient(90deg, var(--accent-blue), #00b4d8);
      border-radius: 3px;
      transition: width 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      box-shadow: 0 0 8px var(--accent-blue-glow);
    }
    .progress-fill.complete {
      background: linear-gradient(90deg, var(--accent-green), #34d399);
      box-shadow: 0 0 8px var(--accent-green-dim);
    }

    /* ========================================
       HERO
       ======================================== */
    .hero {
      display: flex;
      align-items: center;
      gap: 24px;
      padding: 36px 0 32px;
    }
    .hero-icon {
      flex-shrink: 0;
    }
    .hero-text {
      flex: 1;
    }
    .hero h1 {
      font-family: var(--font-heading);
      font-size: clamp(1.4rem, 3vw, 1.8rem);
      font-weight: 700;
      color: var(--text-heading);
      letter-spacing: 1.5px;
      text-transform: uppercase;
      text-shadow: 0 0 30px var(--accent-blue-glow);
      margin-bottom: 4px;
    }
    .hero p {
      color: var(--text-secondary);
      font-size: 0.95rem;
      line-height: 1.6;
      margin-top: 8px;
    }

    /* ========================================
       RESOURCES PANEL
       ======================================== */
    .resources-section {
      margin-bottom: 36px;
    }
    .resources-section h3 {
      font-family: var(--font-heading);
      font-size: 0.7rem;
      font-weight: 600;
      color: var(--text-dim);
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-bottom: 16px;
    }
    .resources-columns {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }
    .resources-col-title {
      font-family: var(--font-heading);
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--accent-blue);
      letter-spacing: 1px;
      text-transform: uppercase;
      margin-bottom: 10px;
      padding-bottom: 6px;
      border-bottom: 1px solid var(--border-subtle);
    }
    .resources-list {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .resource-card {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 12px;
      background: var(--bg-card);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      color: var(--text-primary);
      text-decoration: none;
      font-size: 0.82rem;
      transition: all 0.2s ease;
    }
    .resource-card:hover {
      background: var(--bg-card-hover);
      border-color: var(--border-active);
      box-shadow: var(--shadow-glow-blue);
    }
    .resource-card .rc-icon {
      flex-shrink: 0;
      width: 26px;
      height: 26px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--accent-blue-dim);
      border-radius: 5px;
      font-size: 13px;
    }
    .resource-card .rc-label {
      flex: 1;
      min-width: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .resource-card .rc-actions {
      flex-shrink: 0;
      display: flex;
      gap: 4px;
      opacity: 0;
      transition: opacity 0.15s ease;
    }
    .resource-card:hover .rc-actions {
      opacity: 1;
    }
    .rc-action-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 26px;
      height: 26px;
      border-radius: 4px;
      border: 1px solid var(--border-subtle);
      background: transparent;
      color: var(--text-dim);
      cursor: pointer;
      transition: all 0.15s ease;
      padding: 0;
    }
    .rc-action-btn:hover {
      background: var(--accent-blue-dim);
      color: var(--accent-blue);
      border-color: var(--border-active);
    }
    .rc-action-btn.copied {
      color: var(--accent-green);
      border-color: var(--border-complete);
    }

    /* ========================================
       PART DIVIDER
       ======================================== */
    .part-divider {
      display: flex;
      align-items: center;
      gap: 16px;
      margin: 40px 0 24px;
    }
    .part-divider::before,
    .part-divider::after {
      content: '';
      flex: 1;
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--border-active), transparent);
    }
    .part-divider h2 {
      font-family: var(--font-heading);
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--accent-blue);
      letter-spacing: 3px;
      text-transform: uppercase;
      white-space: nowrap;
    }

    /* ========================================
       STEP SECTIONS (Docs-style, always visible)
       ======================================== */
    .step-section {
      padding-top: 8px;
      margin-bottom: 48px;
      scroll-margin-top: 68px;
    }
    .step-section-header {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-bottom: 20px;
      padding-bottom: 14px;
      border-bottom: 1px solid var(--border-subtle);
    }
    .step-badge {
      flex-shrink: 0;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-mono);
      font-size: 0.8rem;
      font-weight: 600;
      background: var(--accent-blue-dim);
      color: var(--accent-blue);
      border: 1px solid rgba(0, 212, 255, 0.25);
      transition: all 0.3s ease;
    }
    .step-section.completed .step-badge {
      background: var(--accent-green-dim);
      color: var(--accent-green);
      border-color: rgba(16, 185, 129, 0.3);
    }
    .step-title {
      flex: 1;
      font-family: var(--font-heading);
      font-size: 1.15rem;
      font-weight: 600;
      color: var(--text-heading);
      letter-spacing: 0.3px;
    }
    .step-content {
      padding: 0;
    }

    /* ========================================
       CONTENT TYPOGRAPHY
       ======================================== */
    .step-content h3 {
      font-family: var(--font-heading);
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--accent-blue);
      letter-spacing: 1px;
      text-transform: uppercase;
      margin: 20px 0 10px;
    }
    .step-content p {
      margin: 8px 0;
      color: var(--text-primary);
    }
    .step-content ol, .step-content ul {
      margin: 8px 0;
      padding-left: 24px;
    }
    .step-content li {
      margin: 6px 0;
      color: var(--text-primary);
    }
    .step-content a {
      color: var(--accent-blue);
      text-decoration: none;
      border-bottom: 1px solid rgba(0, 212, 255, 0.3);
      transition: border-color 0.2s;
    }
    .step-content a:hover {
      border-bottom-color: var(--accent-blue);
    }
    .inline-code {
      font-family: var(--font-mono);
      font-size: 0.85em;
      background: rgba(0, 212, 255, 0.08);
      padding: 2px 6px;
      border-radius: 4px;
      color: var(--accent-blue);
    }

    /* ========================================
       CODE BLOCKS
       ======================================== */
    .code-wrapper {
      position: relative;
      margin: 12px 0;
    }
    .code-block {
      background: rgba(0, 0, 0, 0.45);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      padding: 16px 18px;
      padding-right: 50px;
      font-family: var(--font-mono);
      font-size: 0.82rem;
      line-height: 1.65;
      color: #c9d1d9;
      overflow-x: auto;
      white-space: pre-wrap;
      word-break: break-word;
    }
    .copy-btn {
      position: absolute;
      top: 8px;
      right: 8px;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 4px;
      padding: 4px 8px;
      cursor: pointer;
      color: var(--text-dim);
      font-family: var(--font-mono);
      font-size: 0.65rem;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .copy-btn:hover {
      background: rgba(255, 255, 255, 0.1);
      color: var(--text-primary);
      border-color: rgba(255, 255, 255, 0.2);
    }
    .copy-btn:focus-visible {
      outline: 2px solid var(--accent-blue);
      outline-offset: 1px;
    }
    .copy-btn.copied {
      color: var(--accent-green);
      border-color: rgba(16, 185, 129, 0.4);
    }

    /* ========================================
       AGENT MODE PROMPT (Amber-tinted)
       ======================================== */
    .agent-prompt {
      position: relative;
      margin: 12px 0;
    }
    .agent-prompt-label {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-family: var(--font-mono);
      font-size: 0.7rem;
      font-weight: 500;
      color: var(--accent-amber);
      letter-spacing: 1px;
      text-transform: uppercase;
      margin-bottom: 6px;
    }
    .agent-prompt .code-block {
      background: rgba(245, 166, 35, 0.06);
      border-color: rgba(245, 166, 35, 0.2);
      color: #fde68a;
    }
    :root[data-theme="light"] .agent-prompt .code-block {
      background: rgba(217, 119, 6, 0.06);
      border-color: rgba(217, 119, 6, 0.2);
      color: #92400e;
    }
    :root[data-theme="light"] .code-block {
      background: rgba(0, 0, 0, 0.04);
      border-color: rgba(0, 0, 0, 0.1);
      color: #334155;
    }
    :root[data-theme="light"] .alert-warning {
      color: #92400e;
    }
    :root[data-theme="light"] .alert-tip {
      color: #0369a1;
    }
    :root[data-theme="light"] .check-item.checked {
      background: rgba(5, 150, 105, 0.08);
      border-color: rgba(5, 150, 105, 0.2);
    }
    :root[data-theme="light"] .celebration {
      background: rgba(248, 249, 252, 0.95);
    }

    /* ========================================
       ALERT BOXES
       ======================================== */
    .alert {
      padding: 14px 16px;
      border-radius: var(--radius-sm);
      margin: 14px 0;
      font-size: 0.88rem;
      line-height: 1.6;
    }
    .alert-warning {
      background: var(--accent-amber-dim);
      border: 1px solid rgba(245, 166, 35, 0.25);
      color: #fcd34d;
    }
    .alert-warning strong { color: var(--accent-amber); }
    .alert-tip {
      background: var(--accent-blue-dim);
      border: 1px solid rgba(0, 212, 255, 0.2);
      color: #93c5fd;
    }
    .alert-tip strong { color: var(--accent-blue); }
    .alert-info {
      background: rgba(100, 116, 139, 0.1);
      border: 1px solid rgba(100, 116, 139, 0.2);
      color: var(--text-secondary);
    }
    .alert-emoji {
      margin-right: 6px;
    }

    /* ========================================
       COLLAPSIBLE TROUBLESHOOTING
       ======================================== */
    .troubleshoot-toggle {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: none;
      border: none;
      color: var(--accent-amber);
      font-family: var(--font-mono);
      font-size: 0.78rem;
      cursor: pointer;
      padding: 6px 0;
      margin: 8px 0;
      letter-spacing: 0.5px;
    }
    .troubleshoot-toggle:hover { text-decoration: underline; }
    .troubleshoot-toggle:focus-visible {
      outline: 2px solid var(--accent-amber);
      outline-offset: 2px;
    }
    .troubleshoot-body {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease;
    }
    .troubleshoot-body.open {
      max-height: 400px;
    }

    /* ========================================
       CHECKBOXES
       ======================================== */
    .check-group {
      margin: 16px 0 4px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .check-item {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 8px 12px;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .check-item:hover {
      background: rgba(255, 255, 255, 0.04);
      border-color: var(--border-active);
    }
    .check-item.checked {
      background: var(--accent-green-dim);
      border-color: rgba(16, 185, 129, 0.25);
    }
    .check-item input[type="checkbox"] {
      /* Visually hidden but accessible */
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }
    .check-box {
      flex-shrink: 0;
      width: 20px;
      height: 20px;
      border-radius: 4px;
      border: 2px solid var(--text-dim);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      margin-top: 1px;
    }
    .check-item.checked .check-box {
      background: var(--accent-green);
      border-color: var(--accent-green);
    }
    .check-box svg {
      width: 12px;
      height: 12px;
      color: white;
      opacity: 0;
      transform: scale(0);
      transition: all 0.2s ease;
    }
    .check-item.checked .check-box svg {
      opacity: 1;
      transform: scale(1);
    }
    .check-label {
      font-size: 0.88rem;
      color: var(--text-secondary);
      line-height: 1.5;
    }
    .check-item.checked .check-label {
      color: var(--accent-green);
    }

    /* ========================================
       MINI-LOG CARDS (Step 5 special)
       ======================================== */
    .log-card {
      background: rgba(0, 0, 0, 0.25);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      padding: 18px;
      margin: 12px 0;
      transition: border-color 0.3s ease, background 0.3s ease;
    }
    :root[data-theme="light"] .log-card {
      background: rgba(0, 0, 0, 0.03);
      border-color: rgba(0, 0, 0, 0.1);
    }
    .log-card.completed {
      border-color: rgba(16, 185, 129, 0.3);
    }
    .log-card-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 10px;
    }
    .log-badge {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--accent-amber);
      background: var(--accent-amber-dim);
      padding: 3px 10px;
      border-radius: 12px;
      letter-spacing: 0.5px;
    }
    .log-card-title {
      font-family: var(--font-heading);
      font-size: 0.95rem;
      font-weight: 600;
      color: var(--text-heading);
    }
    .log-card-desc {
      font-size: 0.85rem;
      color: var(--text-dim);
      font-style: italic;
      margin-bottom: 10px;
    }
    .docs-indicator {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 14px;
      background: var(--accent-amber-dim);
      border: 1px solid rgba(245, 166, 35, 0.2);
      border-radius: var(--radius-sm);
      font-family: var(--font-mono);
      font-size: 0.78rem;
      color: var(--accent-amber);
      margin-bottom: 16px;
    }
    .docs-indicator.done {
      background: var(--accent-green-dim);
      border-color: rgba(16, 185, 129, 0.25);
      color: var(--accent-green);
    }
    .mini-progress {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--text-dim);
      text-align: right;
      margin-top: 8px;
    }

    /* ========================================
       MISSION TRACKER TABLE (Step 6)
       ======================================== */
    .mission-tracker {
      width: 100%;
      border-collapse: collapse;
      margin: 14px 0;
      font-size: 0.85rem;
    }
    .mission-tracker th {
      text-align: left;
      padding: 8px 12px;
      border-bottom: 1px solid var(--border-subtle);
      color: var(--text-dim);
      font-family: var(--font-mono);
      font-size: 0.7rem;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
    .mission-tracker td {
      padding: 10px 12px;
      border-bottom: 1px solid rgba(255,255,255,0.03);
      color: var(--text-primary);
    }
    .mission-tracker tr:hover td {
      background: rgba(255,255,255,0.02);
    }
    .status-done {
      color: var(--accent-green);
      font-family: var(--font-mono);
      font-size: 0.8rem;
    }
    .status-todo {
      color: var(--accent-amber);
      font-family: var(--font-mono);
      font-size: 0.8rem;
    }

    /* ========================================
       VALID VALUES TABLE
       ======================================== */
    .values-table {
      width: 100%;
      border-collapse: collapse;
      margin: 12px 0;
      font-size: 0.82rem;
    }
    .values-table th {
      text-align: left;
      padding: 8px 12px;
      background: rgba(0, 0, 0, 0.3);
      border: 1px solid var(--border-subtle);
      color: var(--text-dim);
      font-family: var(--font-mono);
      font-size: 0.72rem;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }
    .values-table td {
      padding: 8px 12px;
      border: 1px solid var(--border-subtle);
      color: var(--text-secondary);
      font-family: var(--font-mono);
      font-size: 0.8rem;
    }

    /* ========================================
       MCP COMMAND TABLE (Step 8)
       ======================================== */
    .mcp-table {
      width: 100%;
      border-collapse: collapse;
      margin: 14px 0;
    }
    .mcp-table td {
      padding: 10px 14px;
      border-bottom: 1px solid var(--border-subtle);
      font-size: 0.85rem;
      vertical-align: top;
    }
    .mcp-table td:first-child {
      color: var(--accent-amber);
      font-style: italic;
      width: 45%;
    }
    .mcp-table td:last-child {
      color: var(--text-secondary);
    }

    /* ========================================
       INNER SECTION DIVIDER
       ======================================== */
    .section-divider {
      border: none;
      border-top: 1px solid var(--border-subtle);
      margin: 20px 0;
    }

    /* ========================================
       RESET BUTTON
       ======================================== */
    .reset-btn {
      display: block;
      margin: 40px auto 0;
      background: none;
      border: 1px solid rgba(239, 68, 68, 0.3);
      color: var(--accent-red);
      padding: 10px 24px;
      border-radius: var(--radius-sm);
      font-family: var(--font-mono);
      font-size: 0.75rem;
      letter-spacing: 1px;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .reset-btn:hover {
      background: rgba(239, 68, 68, 0.1);
      border-color: rgba(239, 68, 68, 0.5);
    }
    .reset-btn:focus-visible {
      outline: 2px solid var(--accent-red);
      outline-offset: 2px;
    }

    /* ========================================
       FOOTER
       ======================================== */
    .workshop-footer {
      text-align: center;
      padding: 32px 0 16px;
      border-top: 1px solid var(--border-subtle);
      margin-top: 48px;
    }
    .workshop-footer p {
      color: var(--text-dim);
      font-size: 0.78rem;
      letter-spacing: 1px;
      margin: 4px 0;
    }
    .workshop-footer .accent {
      color: var(--accent-blue);
    }

    /* ========================================
       CELEBRATION OVERLAY
       ======================================== */
    .celebration {
      display: none;
      position: fixed;
      inset: 0;
      z-index: 1000;
      background: rgba(10, 14, 26, 0.9);
      backdrop-filter: blur(8px);
      justify-content: center;
      align-items: center;
      flex-direction: column;
      text-align: center;
      padding: 24px;
      animation: fadeIn 0.5s ease;
    }
    .celebration.show {
      display: flex;
    }
    .celebration h2 {
      font-family: var(--font-heading);
      font-size: clamp(1.4rem, 4vw, 2rem);
      color: var(--accent-green);
      text-shadow: 0 0 30px rgba(16, 185, 129, 0.5);
      margin-bottom: 12px;
      letter-spacing: 2px;
      text-transform: uppercase;
    }
    .celebration p {
      color: var(--text-secondary);
      max-width: 400px;
      margin: 8px auto;
    }
    .celebration button {
      margin-top: 24px;
      background: var(--accent-green-dim);
      border: 1px solid rgba(16, 185, 129, 0.3);
      color: var(--accent-green);
      padding: 10px 28px;
      border-radius: var(--radius-sm);
      font-family: var(--font-mono);
      font-size: 0.8rem;
      cursor: pointer;
      transition: all 0.2s;
    }
    .celebration button:hover {
      background: rgba(16, 185, 129, 0.2);
    }

    /* Confetti canvas */
    #confetti-canvas {
      position: fixed;
      inset: 0;
      z-index: 999;
      pointer-events: none;
    }

    /* ========================================
       ANIMATIONS
       ======================================== */
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-8px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    .pulse { animation: pulse 2s ease-in-out infinite; }

    /* ========================================
       RESPONSIVE
       ======================================== */
    @media (max-width: 900px) {
      .sidebar {
        position: fixed;
        top: 52px;
        left: -280px;
        z-index: 145;
        width: 270px;
        height: calc(100vh - 52px);
        transition: left 0.3s ease;
        box-shadow: 4px 0 30px rgba(0,0,0,0.5);
      }
      .sidebar.open { left: 0; }
      .sidebar-toggle { display: flex; }
      .sidebar-overlay.show { display: block; }
      .content-area { padding: 24px 20px 80px; }
    }
    @media (max-width: 600px) {
      .content-area { padding: 20px 14px 80px; }
      .step-content { padding: 0; }
      .resources-columns { grid-template-columns: 1fr; }
      .progress-inner { gap: 10px; padding: 0 14px; }
      .progress-label { font-size: 0.68rem; }
      .code-block { font-size: 0.75rem; padding: 12px 14px; }
      .mcp-table td:first-child { width: auto; }
    }
  </style>
</head>
<body>

  <!-- ============== STICKY PROGRESS BAR ============== -->
  <div class="progress-header" id="progressHeader">
    <div class="progress-inner">
      <div class="progress-label">Step <span id="stepCount">0</span>/8 · <span id="checkCount">0</span>/<span id="checkTotal">0</span> checks</div>
      <div class="progress-track">
        <div class="progress-fill" id="progressFill"></div>
      </div>
      <button class="theme-toggle" id="themeToggle" aria-label="Toggle light/dark mode" title="Toggle theme">
        <svg class="icon-sun" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
        <svg class="icon-moon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
      </button>
    </div>
  </div>

  <!-- ============== MOBILE SIDEBAR TOGGLE ============== -->
  <button class="sidebar-toggle" id="sidebarToggle" aria-label="Toggle navigation">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
  </button>
  <div class="sidebar-overlay" id="sidebarOverlay"></div>

  <div class="docs-layout">
    <!-- ============== SIDEBAR NAV ============== -->
    <nav class="sidebar" id="sidebar" role="navigation" aria-label="Workshop steps">
      <div class="sidebar-title">Workshop Guide</div>

      <div class="sidebar-part">Part 1 — Git-Native API</div>
      <a href="#section-1" class="nav-link" data-nav="1"><span class="nav-dot"></span>1. Blank Workspace</a>
      <a href="#section-2" class="nav-link" data-nav="2"><span class="nav-dot"></span>2. Import OpenAPI Spec</a>
      <a href="#section-3" class="nav-link" data-nav="3"><span class="nav-dot"></span>3. Environment (Agent)</a>
      <a href="#section-4" class="nav-link" data-nav="4"><span class="nav-dot"></span>4. Update Env Variable</a>

      <div class="sidebar-part">Part 2 — Agent Mode</div>
      <a href="#section-5" class="nav-link" data-nav="5"><span class="nav-dot"></span>5. Health Check & Register</a>
      <a href="#section-6" class="nav-link" data-nav="6"><span class="nav-dot"></span>6. Auto-Save API Key</a>

      <div class="sidebar-part">Part 3 — Mission Sprint</div>
      <a href="#section-7" class="nav-link" data-nav="7"><span class="nav-dot"></span>7. Mission Dashboard</a>
      <a href="#section-8" class="nav-link" data-nav="8"><span class="nav-dot"></span>8. Docs + Log Blitz</a>
      <a href="#section-9" class="nav-link" data-nav="9"><span class="nav-dot"></span>9. Complete Mission</a>

      <div class="sidebar-part">Part 4 — Advanced</div>
      <a href="#section-10" class="nav-link" data-nav="10"><span class="nav-dot"></span>10. Integration Tests</a>
      <a href="#section-11" class="nav-link" data-nav="11"><span class="nav-dot"></span>11. MCP Agent</a>
    </nav>

    <!-- ============== CONTENT AREA ============== -->
    <main class="content-area">

    <!-- ============== HERO ============== -->
    <div class="hero">
      <div class="hero-icon">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <style>
            .hero-orbit { stroke: rgba(0,212,255,0.15); }
            .hero-orbit-inner { stroke: rgba(0,212,255,0.08); }
            .hero-moon { fill: #1a1a2e; stroke: rgba(200,200,200,0.3); }
            .hero-moon-crater1 { fill: rgba(200,200,200,0.15); }
            .hero-moon-crater2 { fill: rgba(200,200,200,0.1); }
            .hero-rocket-body { fill: #e2e8f0; stroke: rgba(255,255,255,0.3); }
            :root[data-theme="light"] .hero-orbit { stroke: rgba(2,132,199,0.2); }
            :root[data-theme="light"] .hero-orbit-inner { stroke: rgba(2,132,199,0.12); }
            :root[data-theme="light"] .hero-moon { fill: #e2e8f0; stroke: rgba(0,0,0,0.15); }
            :root[data-theme="light"] .hero-moon-crater1 { fill: rgba(0,0,0,0.08); }
            :root[data-theme="light"] .hero-moon-crater2 { fill: rgba(0,0,0,0.05); }
            :root[data-theme="light"] .hero-rocket-body { fill: #334155; stroke: rgba(0,0,0,0.15); }
          </style>
          <!-- Moon arc -->
          <circle cx="40" cy="40" r="35" class="hero-orbit" stroke-width="1" fill="none"/>
          <circle cx="40" cy="40" r="28" class="hero-orbit-inner" stroke-width="1" fill="none"/>
          <!-- Moon -->
          <circle cx="58" cy="18" r="8" class="hero-moon" stroke-width="1"/>
          <circle cx="56" cy="16" r="2" class="hero-moon-crater1"/>
          <circle cx="60" cy="20" r="1.5" class="hero-moon-crater2"/>
          <!-- Rocket -->
          <g transform="translate(32, 52) rotate(-45)">
            <path d="M0,-20 C4,-20 6,-15 6,-8 L6,4 L4,8 L-4,8 L-6,4 L-6,-8 C-6,-15 -4,-20 0,-20Z" class="hero-rocket-body" stroke-width="0.5"/>
            <path d="M-6,0 L-10,6 L-6,4Z" fill="var(--accent-blue)"/>
            <path d="M6,0 L10,6 L6,4Z" fill="var(--accent-blue)"/>
            <circle cx="0" cy="-10" r="2" fill="var(--accent-blue)" opacity="0.6"/>
            <path d="M-3,8 L0,16 L3,8Z" fill="var(--accent-amber)" opacity="0.8"/>
            <path d="M-2,8 L0,12 L2,8Z" fill="#ef4444" opacity="0.6"/>
          </g>
          <!-- Orbit trail -->
          <path d="M26,60 Q10,40 26,22" stroke="var(--accent-blue)" stroke-width="1" fill="none" stroke-dasharray="3,3" opacity="0.4"/>
        </svg>
      </div>
      <div class="hero-text">
        <h1>Artemis Mission Control</h1>
        <h1 style="font-size: clamp(0.85rem, 2vw, 1.1rem); font-weight: 500; color: var(--text-secondary); text-shadow: none; margin-top: -2px;">API & MCP Workshop</h1>
        <p>Your hands-on guide to Git-native API workflows, AI-powered testing, and MCP agent integration.</p>
      </div>
    </div>

    <!-- ============== RESOURCES (always visible, two columns) ============== -->
    <div class="resources-section">
      <h3>Workshop Resources</h3>
      <div class="resources-columns">
        <div>
          <div class="resources-col-title">Workshop Materials</div>
          <div class="resources-list">
            <div class="resource-card" data-url="https://github.com/mishra-aanchal/artemis-mission-control-api-workshop">
              <div class="rc-icon">📦</div>
              <div class="rc-label">API Git Repo</div>
              <div class="rc-actions">
                <button class="rc-action-btn rc-copy" title="Copy URL"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg></button>
                <button class="rc-action-btn rc-view" title="Open link"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></button>
              </div>
            </div>
            <div class="resource-card" data-url="https://www.postman.com/devrel/postman-git-native-and-agentic-workshop/overview">
              <div class="rc-icon"><img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/postman-icon.png" alt="Postman" width="18" height="18" style="display:block;"></div>
              <div class="rc-label">Postman Workspace</div>
              <div class="rc-actions">
                <button class="rc-action-btn rc-copy" title="Copy URL"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg></button>
                <button class="rc-action-btn rc-view" title="Open link"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></button>
              </div>
            </div>
            <div class="resource-card" data-url="https://github.com/mishra-aanchal/artemis-mission-control-api-workshop/archive/refs/heads/main.zip">
              <div class="rc-icon">⬇️</div>
              <div class="rc-label">Download Code (ZIP)</div>
              <div class="rc-actions">
                <button class="rc-action-btn rc-copy" title="Copy URL"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg></button>
                <button class="rc-action-btn rc-view" title="Open link"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></button>
              </div>
            </div>
            <div class="resource-card" data-url="https://raw.githubusercontent.com/mishra-aanchal/artemis-mission-control-api-workshop/refs/heads/main/openapi.yaml">
              <div class="rc-icon">📄</div>
              <div class="rc-label">OpenAPI Spec</div>
              <div class="rc-actions">
                <button class="rc-action-btn rc-copy" title="Copy URL"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg></button>
                <button class="rc-action-btn rc-view" title="Open link"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></button>
              </div>
            </div>
            <div class="resource-card" data-url="https://artemis.up.railway.app">
              <div class="rc-icon">🚀</div>
              <div class="rc-label">Hosted API URL</div>
              <div class="rc-actions">
                <button class="rc-action-btn rc-copy" title="Copy URL"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg></button>
                <button class="rc-action-btn rc-view" title="Open link"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></button>
              </div>
            </div>
            <div class="resource-card" data-url="https://docs.google.com/presentation/d/1VcF-BT7PYGcL4WURUsw9eG9ms-GO2IVn/edit">
              <div class="rc-icon">📊</div>
              <div class="rc-label">Workshop Slides</div>
              <div class="rc-actions">
                <button class="rc-action-btn rc-copy" title="Copy URL"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg></button>
                <button class="rc-action-btn rc-view" title="Open link"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="resources-col-title">Tools & References</div>
          <div class="resources-list">
            <div class="resource-card" data-url="https://academy.postman.com/meet-agent-mode">
              <div class="rc-icon">🤖</div>
              <div class="rc-label">Meet Agent Mode</div>
              <div class="rc-actions">
                <button class="rc-action-btn rc-copy" title="Copy URL"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg></button>
                <button class="rc-action-btn rc-view" title="Open link"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></button>
              </div>
            </div>
            <div class="resource-card" data-url="https://postman.com/templates/agent-mode/">
              <div class="rc-icon">💡</div>
              <div class="rc-label">Prompt Library</div>
              <div class="rc-actions">
                <button class="rc-action-btn rc-copy" title="Copy URL"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg></button>
                <button class="rc-action-btn rc-view" title="Open link"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></button>
              </div>
            </div>
            <div class="resource-card" data-url="https://github.com/postmanlabs/postman-mcp-server">
              <div class="rc-icon">🔌</div>
              <div class="rc-label">Postman MCP Server</div>
              <div class="rc-actions">
                <button class="rc-action-btn rc-copy" title="Copy URL"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg></button>
                <button class="rc-action-btn rc-view" title="Open link"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></button>
              </div>
            </div>
            <div class="resource-card" data-url="https://github.com/Postman-Devrel/postman-claude-code-plugin">
              <div class="rc-icon">🧩</div>
              <div class="rc-label">Claude Code Plugin</div>
              <div class="rc-actions">
                <button class="rc-action-btn rc-copy" title="Copy URL"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg></button>
                <button class="rc-action-btn rc-view" title="Open link"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- ======================================================================
         PART 1: GIT-NATIVE API WORKFLOW
         ====================================================================== -->
    <div class="part-divider">
      <h2>Part 1 — Git-Native API Workflow</h2>
    </div>

    <!-- STEP 1 -->
    <div class="step-section" id="section-1" data-step="1">
      <div class="step-section-header">
        <div class="step-badge">1</div>
        <div class="step-title">Create a Blank Workspace</div>
      </div>
              <div class="step-content">
          <ol>
            <li>Sign in or sign up at <a href="https://postman.com" target="_blank" rel="noopener">postman.com</a>.</li>
            <li>Create a new <strong>Blank Workspace</strong>.</li>
            <li>Name it: <span class="inline-code">Artemis II - [your name]</span></li>
          </ol>
          <div class="check-group">
            <label class="check-item" data-check="s1-workspace">
              <input type="checkbox" id="check-s1-workspace">
              <div class="check-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div>
              <span class="check-label">I created a workspace named <span class="inline-code">Artemis II - [my name]</span></span>
            </label>
          </div>
        </div>
    </div>

    <!-- STEP 2 -->
    <div class="step-section" id="section-2" data-step="2">
      <div class="step-section-header">
        <div class="step-badge">2</div>
        <div class="step-title">Import the OpenAPI Spec</div>
      </div>
              <div class="step-content">
          <ol>
            <li>Click the <strong>+</strong> icon → <strong>Import</strong>.</li>
            <li>Paste this URL and click Import:</li>
          </ol>
          <div class="code-wrapper">
            <pre class="code-block" id="code-openapi-url">https://raw.githubusercontent.com/mishra-aanchal/artemis-mission-control-api-workshop/refs/heads/main/openapi.yaml</pre>
            <button class="copy-btn" data-copy="code-openapi-url" aria-label="Copy OpenAPI URL">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
              Copy
            </button>
          </div>
          <ol start="3">
            <li>Postman auto-generates a collection from the spec.</li>
          </ol>
          <div class="check-group">
            <label class="check-item" data-check="s2-collection">
              <input type="checkbox" id="check-s2-collection">
              <div class="check-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div>
              <span class="check-label">I can see the generated collection in my workspace</span>
            </label>
          </div>
        </div>
    </div>

    <!-- STEP 3 -->
    <div class="step-section" id="section-3" data-step="3">
      <div class="step-section-header">
        <div class="step-badge">3</div>
        <div class="step-title">Create the Environment with Agent Mode</div>
      </div>
              <div class="step-content">
          <ol>
            <li>Open <strong>Agent Mode</strong> (the AI chat panel in Postman).</li>
            <li>Use this prompt:</li>
          </ol>
          <div class="agent-prompt">
            <div class="agent-prompt-label">🤖 Agent Mode Prompt</div>
            <div class="code-wrapper">
              <pre class="code-block" id="code-env-prompt">Create an environment called artemis.local with variables - baseUrl, apiKey and logId.</pre>
              <button class="copy-btn" data-copy="code-env-prompt" aria-label="Copy Agent Mode prompt">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                Copy
              </button>
            </div>
          </div>
          <div class="check-group">
            <label class="check-item" data-check="s3-env">
              <input type="checkbox" id="check-s3-env">
              <div class="check-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div>
              <span class="check-label">I see an <span class="inline-code">artemis.local</span> environment with <span class="inline-code">baseUrl</span>, <span class="inline-code">apiKey</span>, and <span class="inline-code">logId</span></span>
            </label>
          </div>
        </div>
    </div>

    <!-- STEP 4 -->
    <div class="step-section" id="section-4" data-step="4">
      <div class="step-section-header">
        <div class="step-badge">4</div>
        <div class="step-title">Update the Environment Variable</div>
      </div>
              <div class="step-content">
          <ol>
            <li>Click on the <span class="inline-code">artemis.local</span> environment.</li>
            <li>Set <span class="inline-code">baseUrl</span> to:</li>
          </ol>
          <div class="code-wrapper">
            <pre class="code-block" id="code-base-url">https://artemis.up.railway.app</pre>
            <button class="copy-btn" data-copy="code-base-url" aria-label="Copy base URL">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
              Copy
            </button>
          </div>
          <ol start="3">
            <li>Mark <span class="inline-code">apiKey</span> as <strong>secret</strong> (so it's hidden when screen-sharing).</li>
          </ol>
          <div class="check-group">
            <label class="check-item" data-check="s4-baseurl">
              <input type="checkbox" id="check-s4-baseurl">
              <div class="check-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div>
              <span class="check-label"><span class="inline-code">baseUrl</span> is set to <span class="inline-code">https://artemis.up.railway.app</span></span>
            </label>
            <label class="check-item" data-check="s4-secret">
              <input type="checkbox" id="check-s4-secret">
              <div class="check-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div>
              <span class="check-label"><span class="inline-code">apiKey</span> is marked as secret</span>
            </label>
          </div>
        </div>
    </div>

    <!-- ======================================================================
         PART 2: ARTEMIS MISSION CONTROL WORKFLOW
         ====================================================================== -->
    <div class="part-divider">
      <h2>Part 2 — Artemis Mission Control Workflow</h2>
    </div>

    <!-- STEP 5 -->
    <div class="step-section" id="section-5" data-step="5">
      <div class="step-section-header">
        <div class="step-badge">5</div>
        <div class="step-title">Health Check & Registration</div>
      </div>
              <div class="step-content">
          <h3>5A — Verify the API is Running</h3>
          <ol>
            <li>Open the <strong>Health Check</strong> request in the collection.</li>
            <li>Click <strong>Send</strong>.</li>
            <li>Expect a <span class="inline-code">200 OK</span> response.</li>
          </ol>
          <div class="alert alert-info">
            <span class="alert-emoji">📖</span>
            <strong>Self-guided references:</strong><br>
            Simple guide: <a href="https://artemis.up.railway.app/guide/story" target="_blank" rel="noopener">artemis.up.railway.app/guide/story</a><br>
          </div>

          <hr class="section-divider">

          <h3>5B — Register as Crew Member</h3>
          <ol>
            <li>Open <strong>Register Crew Member</strong> (<span class="inline-code">POST /register</span>).</li>
            <li>Go to the Body tab, enter:</li>
          </ol>
          <div class="code-wrapper">
            <pre class="code-block" id="code-register">{
  "name": "Your Name",
  "email": "your.email@example.com"
}</pre>
            <button class="copy-btn" data-copy="code-register" aria-label="Copy registration JSON">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
              Copy
            </button>
          </div>
          <ol start="3">
            <li>Click <strong>Send</strong>.</li>
            <li>You'll receive your <strong>callsign</strong>, <strong>API key</strong>, and <strong>sigil</strong> (SVG badge).</li>
          </ol>
          <div class="alert alert-warning">
            <span class="alert-emoji">⚠️</span>
            Using <span class="inline-code">{{$randomEmail}}</span> creates a new user every time — use your <strong>real email</strong>.
          </div>
          <div class="alert alert-warning">
            <span class="alert-emoji">⚠️</span>
            If you re-send with the same email, the API returns the <strong>previous API key</strong>.
          </div>

          <div class="check-group">
            <label class="check-item" data-check="s5-health">
              <input type="checkbox" id="check-s5-health">
              <div class="check-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div>
              <span class="check-label">Health check returned <span class="inline-code">200 OK</span></span>
            </label>
            <label class="check-item" data-check="s5-registered">
              <input type="checkbox" id="check-s5-registered">
              <div class="check-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div>
              <span class="check-label">I received my callsign and API key</span>
            </label>
          </div>
        </div>
    </div>

    <!-- STEP 6 -->
    <div class="step-section" id="section-6" data-step="6">
      <div class="step-section-header">
        <div class="step-badge">6</div>
        <div class="step-title">Auto-Save API Key with Agent Mode</div>
      </div>
              <div class="step-content">
          <ol>
            <li>Stay on the <strong>Register Crew Member</strong> request.</li>
            <li>Open a <strong>new chat</strong> in Agent Mode.</li>
            <li>Drag and drop the Register request into the chat.</li>
            <li>Enter this prompt:</li>
          </ol>
          <div class="agent-prompt">
            <div class="agent-prompt-label">🤖 Agent Mode Prompt</div>
            <div class="code-wrapper">
              <pre class="code-block" id="code-save-key">Generate a script to save the api key from response to the environment variable apiKey</pre>
              <button class="copy-btn" data-copy="code-save-key" aria-label="Copy Agent Mode prompt">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                Copy
              </button>
            </div>
          </div>
          <ol start="5">
            <li><strong>Re-send</strong> the Register request to trigger the script.</li>
            <li>Verify: open your Environment — <span class="inline-code">apiKey</span> should be populated.</li>
            <li><strong>Test it</strong>: Open <strong>Get Mission Overview</strong> (<span class="inline-code">GET /mission</span>) → Send → should return <span class="inline-code">200 OK</span>.</li>
          </ol>

          <button class="troubleshoot-toggle" aria-expanded="false" aria-controls="troubleshoot-6" onclick="this.nextElementSibling.classList.toggle('open'); this.setAttribute('aria-expanded', this.nextElementSibling.classList.contains('open'))">
            ⚠️ Troubleshooting — Getting 401?
          </button>
          <div class="troubleshoot-body" id="troubleshoot-6">
            <div class="alert alert-warning">
              Check that <span class="inline-code">apiKey</span> is set in the environment and the request header uses <span class="inline-code">x-api-key: {{apiKey}}</span>. Also ensure the environment is selected in the top-right dropdown.
            </div>
          </div>

          <div class="check-group">
            <label class="check-item" data-check="s6-script">
              <input type="checkbox" id="check-s6-script">
              <div class="check-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div>
              <span class="check-label">Agent Mode added a post-response script</span>
            </label>
            <label class="check-item" data-check="s6-apikey">
              <input type="checkbox" id="check-s6-apikey">
              <div class="check-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div>
              <span class="check-label"><span class="inline-code">apiKey</span> is auto-populated in my environment</span>
            </label>
            <label class="check-item" data-check="s6-mission">
              <input type="checkbox" id="check-s6-mission">
              <div class="check-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div>
              <span class="check-label"><span class="inline-code">GET /mission</span> returns <span class="inline-code">200 OK</span></span>
            </label>
          </div>
        </div>
    </div>

    <!-- STEP 7 -->
    <div class="step-section" id="section-7" data-step="7">
      <div class="step-section-header">
        <div class="step-badge">7</div>
        <div class="step-title">Build a Mission Dashboard</div>
      </div>
              <div class="step-content">
          <ol>
            <li>Stay on <strong>Get Mission Overview</strong>.</li>
            <li>Open Agent Mode, drag the request into the chat.</li>
            <li>Enter this prompt:</li>
          </ol>
          <div class="agent-prompt">
            <div class="agent-prompt-label">🤖 Agent Mode Prompt</div>
            <div class="code-wrapper">
              <pre class="code-block" id="code-dashboard">Create a card-style visualisation by rendering the SVG as HTML rather than an image. Keep all the fields in the card. Make it like a mission dashboard;</pre>
              <button class="copy-btn" data-copy="code-dashboard" aria-label="Copy dashboard prompt">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                Copy
              </button>
            </div>
          </div>
          <ol start="4">
            <li>Send the request again.</li>
            <li>In the response panel, click the <strong>Visualize</strong> tab.</li>
          </ol>
          <div class="alert alert-tip">
            <span class="alert-emoji">💡</span>
            Results vary since LLM outputs differ. Tell Agent Mode what to fix: "Make the sigil bigger" or "Add a progress percentage."
          </div>
          <div class="check-group">
            <label class="check-item" data-check="s7-dashboard">
              <input type="checkbox" id="check-s7-dashboard">
              <div class="check-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div>
              <span class="check-label">I can see a styled mission dashboard in the Visualize tab</span>
            </label>
          </div>
        </div>
    </div>

    <!-- STEP 5 (PARTICIPANT) — Docs + Logs Split-Flow -->
    <div class="step-section" id="section-8" data-step="8">
      <div class="step-section-header">
        <div class="step-badge">5</div>
        <div class="step-title">Documentation + Mission Log Blitz</div>
      </div>
              <div class="step-content">
          <div class="alert alert-info" style="margin-top:16px;">
            <span class="alert-emoji">📋</span>
            <strong>How this step works:</strong> Start documentation generation first — it runs in the background while you create your 3 mission logs.
          </div>

          <!-- Docs indicator -->
          <div class="docs-indicator" id="docsIndicator">
            <span class="pulse">⏳</span> Docs generating in background...
          </div>

          <h3>Part A — Start Documentation (Background)</h3>
          <ol>
            <li>Open <strong>Agent Mode</strong> (new chat).</li>
            <li>Drag and drop your <strong>entire collection</strong> into the chat.</li>
            <li>Enter this prompt:</li>
          </ol>
          <div class="agent-prompt">
            <div class="agent-prompt-label">🤖 Agent Mode Prompt</div>
            <div class="code-wrapper">
              <pre class="code-block" id="code-docs">Add documentation for this collection. Refer to the spec for specific examples</pre>
              <button class="copy-btn" data-copy="code-docs" aria-label="Copy docs prompt">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                Copy
              </button>
            </div>
          </div>
          <ol start="4">
            <li>Let it run — <strong>do not wait for it to finish.</strong> Move on to Part B immediately.</li>
          </ol>
          <div class="alert alert-tip">
            <span class="alert-emoji">💡</span>
            Postman handles docs generation and your API requests in parallel. By the time you finish your 3 logs, the docs will likely be done.
          </div>

          <div class="check-group">
            <label class="check-item" data-check="s8-docs-started">
              <input type="checkbox" id="check-s8-docs-started">
              <div class="check-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div>
              <span class="check-label">Documentation generation started in Agent Mode</span>
            </label>
          </div>

          <hr class="section-divider">

          <h3>Part B — Mission Log Blitz: Create 3 Logs</h3>
          <p>You need <strong>3 mission logs with different categories</strong> to advance your mission. Send them one by one using <span class="inline-code">POST /logs</span>.</p>
          <ol>
            <li>Go to the <strong>Logs</strong> folder in your collection.</li>
            <li>Open <strong>Create Mission Log</strong> (<span class="inline-code">POST /logs</span>).</li>
            <li>Work through each log below.</li>
          </ol>

          <div class="mini-progress" id="logProgress">🚀 Logs: 0 of 3 complete</div>

          <!-- LOG 1 -->
          <div class="log-card" id="logCard1">
            <div class="log-card-header">
              <span class="log-badge">🚀 1/3</span>
              <span class="log-card-title">Pre-Launch Navigation Check</span>
            </div>
            <div class="log-card-desc">Your crew is verifying star tracker alignment before leaving Earth orbit.</div>
            <p>Go to the <strong>Body</strong> tab, paste the following, and click <strong>Send</strong>:</p>
            <div class="code-wrapper">
              <pre class="code-block" id="code-log1">{
  "title": "Pre-flight navigation check complete",
  "description": "All star trackers aligned and verified for lunar transit",
  "phase": "pre-launch",
  "category": "navigation",
  "crew_member": "wiseman"
}</pre>
              <button class="copy-btn" data-copy="code-log1" aria-label="Copy Log 1 JSON">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                Copy
              </button>
            </div>
            <p>Expected: <span class="inline-code">201 Created</span>. Note the <span class="inline-code">log.id</span> in the response — you'll need it later.</p>
            <div class="check-group">
              <label class="check-item" data-check="s8-log1">
                <input type="checkbox" id="check-s8-log1">
                <div class="check-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div>
                <span class="check-label">Log 1 sent — got <span class="inline-code">201 Created</span> and noted the <span class="inline-code">log.id</span></span>
              </label>
            </div>
          </div>

          <!-- LOG 2 -->
          <div class="log-card" id="logCard2">
            <div class="log-card-header">
              <span class="log-badge">🚀 2/3</span>
              <span class="log-card-title">Life Support Systems Check</span>
            </div>
            <div class="log-card-desc">Mid-flight, Koch runs maintenance on the CO2 scrubbers to keep the cabin air breathable.</div>
            <p><strong>Replace</strong> the body with the following and click <strong>Send</strong>:</p>
            <div class="code-wrapper">
              <pre class="code-block" id="code-log2">{
  "title": "CO2 scrubber maintenance",
  "description": "Replaced CO2 scrubber filter cartridge B. Cabin pressure nominal at 14.7 psi.",
  "phase": "launch",
  "category": "life-support",
  "crew_member": "koch"
}</pre>
              <button class="copy-btn" data-copy="code-log2" aria-label="Copy Log 2 JSON">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                Copy
              </button>
            </div>
            <p>Expected: <span class="inline-code">201 Created</span>.</p>
            <div class="check-group">
              <label class="check-item" data-check="s8-log2">
                <input type="checkbox" id="check-s8-log2">
                <div class="check-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div>
                <span class="check-label">Log 2 sent — got <span class="inline-code">201 Created</span></span>
              </label>
            </div>
          </div>

          <!-- LOG 3 -->
          <div class="log-card" id="logCard3">
            <div class="log-card-header">
              <span class="log-badge">🚀 3/3</span>
              <span class="log-card-title">Deep Space Comms Handoff</span>
            </div>
            <div class="log-card-desc">Glover tests the antenna handoff to NASA's Deep Space Network as the crew moves beyond Earth-orbit range.</div>
            <p><strong>Replace</strong> the body with the following and click <strong>Send</strong>:</p>
            <div class="code-wrapper">
              <pre class="code-block" id="code-log3">{
  "title": "Deep Space Network handoff test",
  "description": "Successfully switched primary comms from TDRS to DSN Madrid station. Signal strength 4.2 dBW.",
  "phase": "transit",
  "category": "communication",
  "crew_member": "glover"
}</pre>
              <button class="copy-btn" data-copy="code-log3" aria-label="Copy Log 3 JSON">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                Copy
              </button>
            </div>
            <p>Expected: <span class="inline-code">201 Created</span>.</p>
            <div class="check-group">
              <label class="check-item" data-check="s8-log3">
                <input type="checkbox" id="check-s8-log3">
                <div class="check-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div>
                <span class="check-label">Log 3 sent — got <span class="inline-code">201 Created</span></span>
              </label>
            </div>
          </div>

          <!-- BONUS LOG -->
          <button class="troubleshoot-toggle" aria-expanded="false" aria-controls="bonus-log" onclick="this.nextElementSibling.classList.toggle('open'); this.setAttribute('aria-expanded', this.nextElementSibling.classList.contains('open'))">
            🎯 Bonus: Create Your Own Log (optional)
          </button>
          <div class="troubleshoot-body" id="bonus-log">
            <p style="margin: 8px 0; color: var(--text-secondary);">Use this reference to craft a custom log:</p>
            <table class="values-table">
              <thead>
                <tr><th>Field</th><th>Allowed Values</th></tr>
              </thead>
              <tbody>
                <tr><td>phase</td><td>pre-launch, launch, transit, lunar-approach, orbit</td></tr>
                <tr><td>category</td><td>navigation, life-support, communication, science, anomaly, crew-status</td></tr>
                <tr><td>crew_member</td><td>wiseman, glover, koch, hansen</td></tr>
              </tbody>
            </table>
            <p style="margin: 8px 0; font-size: 0.85rem;">Full sample list: <a href="https://artemis.up.railway.app/guide/logs" target="_blank" rel="noopener">artemis.up.railway.app/guide/logs</a></p>
            <div class="alert alert-warning">
              <span class="alert-emoji">⚠️</span>
              Logs with category <span class="inline-code">"anomaly"</span> <strong>cannot be deleted</strong> — only updated. Anomalies are permanent mission records.
            </div>
          </div>

          <hr class="section-divider">

          <h3>Part A Check-In — Documentation Done?</h3>
          <p>Head back to your Agent Mode chat. If docs are done, browse your collection and check that requests now have descriptions and example payloads.</p>
          <div class="check-group">
            <label class="check-item" data-check="s8-docs-done">
              <input type="checkbox" id="check-s8-docs-done">
              <div class="check-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div>
              <span class="check-label">Documentation has been applied to my collection</span>
            </label>
          </div>
        </div>
    </div>

    <!-- STEP 6 (PARTICIPANT) — Complete Your Mission -->
    <div class="step-section" id="section-9" data-step="9">
      <div class="step-section-header">
        <div class="step-badge">6</div>
        <div class="step-title">Complete Your Mission — Update, Brief, Splashdown</div>
      </div>
              <div class="step-content">
          <p style="margin-top:16px;">You've created 3 logs. Now finish the remaining mission requirements.</p>

          <table class="mission-tracker">
            <thead>
              <tr><th>#</th><th>Requirement</th><th>Status</th><th>Request</th></tr>
            </thead>
            <tbody>
              <tr><td>1</td><td>3+ logs created</td><td class="status-done">✅ Done</td><td>—</td></tr>
              <tr><td>2</td><td>Update at least one log</td><td class="status-todo">⬇️ Do now</td><td><span class="inline-code">PATCH /logs/:id</span></td></tr>
              <tr><td>3</td><td>Delete a log</td><td class="status-todo">⬇️ Do now</td><td><span class="inline-code">DELETE /logs/:id</span></td></tr>
              <tr><td>4</td><td>Get a mission briefing</td><td class="status-todo">⬇️ Do now</td><td><span class="inline-code">POST /mission/brief</span></td></tr>
              <tr><td>5</td><td>Verify splashdown</td><td class="status-todo">⬇️ Do now</td><td><span class="inline-code">GET /mission</span></td></tr>
            </tbody>
          </table>

          <hr class="section-divider">

          <h3>6A — Update a Log</h3>
          <ol>
            <li>List your logs: send <span class="inline-code">GET /logs</span> to see all your entries.</li>
            <li>Pick a log ID (or use the one from Log 1).</li>
            <li>Open <strong>Update Mission Log</strong> (<span class="inline-code">PATCH /logs/:id</span>).</li>
            <li>Replace <span class="inline-code">:id</span> in the URL with your actual log ID.</li>
            <li>Set the body:</li>
          </ol>
          <div class="code-wrapper">
            <pre class="code-block" id="code-update-log">{
  "title": "Pre-flight navigation check complete — VERIFIED BY FLIGHT DIRECTOR",
  "description": "All star trackers aligned. Secondary backup nav confirmed. Ready for TLI burn."
}</pre>
            <button class="copy-btn" data-copy="code-update-log" aria-label="Copy update log JSON">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
              Copy
            </button>
          </div>
          <ol start="6">
            <li>Click <strong>Send</strong> — expect <span class="inline-code">200 OK</span>.</li>
          </ol>
          <div class="check-group">
            <label class="check-item" data-check="s9-update">
              <input type="checkbox" id="check-s9-update">
              <div class="check-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div>
              <span class="check-label">Updated a log — got <span class="inline-code">200 OK</span></span>
            </label>
          </div>

          <hr class="section-divider">

          <h3>6B — Delete a Log</h3>
          <ol>
            <li>Delete one of the logs you created using the log ID from a previous request.</li>
            <li>Open <strong>Delete Mission Log</strong> (<span class="inline-code">DELETE /logs/:id</span>).</li>
            <li>Replace <span class="inline-code">:id</span> in the URL with your actual log ID.</li>
            <li>Click <strong>Send</strong> — expect <span class="inline-code">200 OK</span>.</li>
          </ol>
          <div class="alert alert-warning">
            <span class="alert-emoji">⚠️</span>
            Logs with category <span class="inline-code">"anomaly"</span> <strong>cannot be deleted</strong> — only updated. Choose a non-anomaly log.
          </div>
          <div class="check-group">
            <label class="check-item" data-check="s9-delete">
              <input type="checkbox" id="check-s9-delete">
              <div class="check-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div>
              <span class="check-label">Deleted a log — got <span class="inline-code">200 OK</span></span>
            </label>
          </div>

          <hr class="section-divider">

          <h3>6C — Request a Mission Briefing</h3>
          <ol>
            <li>Open <span class="inline-code">POST /mission/brief</span>.</li>
            <li>Set the body to:</li>
          </ol>
          <div class="code-wrapper">
            <pre class="code-block" id="code-brief">{}</pre>
            <button class="copy-btn" data-copy="code-brief" aria-label="Copy brief JSON">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
              Copy
            </button>
          </div>
          <ol start="3">
            <li>Click <strong>Send</strong> — expect a briefing response summarizing your mission status.</li>
          </ol>
          <div class="check-group">
            <label class="check-item" data-check="s9-brief">
              <input type="checkbox" id="check-s9-brief">
              <div class="check-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div>
              <span class="check-label">Received a mission briefing response</span>
            </label>
          </div>

          <hr class="section-divider">

          <h3>6D — Verify Splashdown 🎯</h3>
          <ol>
            <li>Open <span class="inline-code">GET /mission</span> and click <strong>Send</strong>.</li>
            <li>Look for <span class="inline-code">completion_percentage: 100</span> and all steps showing <span class="inline-code">completed: true</span>.</li>
          </ol>
          <div class="alert alert-tip">
            <span class="alert-emoji">🎉</span>
            <strong>If you see 100% — congratulations, you've achieved splashdown!</strong> If not, check which step is incomplete in the response and go back to address it.
          </div>
          <div class="check-group">
            <label class="check-item" data-check="s9-splashdown">
              <input type="checkbox" id="check-s9-splashdown">
              <div class="check-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div>
              <span class="check-label"><span class="inline-code">GET /mission</span> shows <span class="inline-code">completion_percentage: 100</span> — SPLASHDOWN!</span>
            </label>
          </div>
        </div>
    </div>

    <!-- STEP 7 (PARTICIPANT) — Integration Tests -->
    <div class="step-section" id="section-10" data-step="10">
      <div class="step-section-header">
        <div class="step-badge">7</div>
        <div class="step-title">Generate an Integration Test Suite</div>
      </div>
              <div class="step-content">
          <ol>
            <li>Start a <strong>new chat</strong> in Agent Mode.</li>
            <li>Drag and drop your collection into the chat.</li>
            <li>Enter this prompt:</li>
          </ol>
          <div class="agent-prompt">
            <div class="agent-prompt-label">🤖 Agent Mode Prompt</div>
            <div class="code-wrapper">
              <pre class="code-block" id="code-test-gen">Generate a new collection to do an end-to-end integration test

- Refer to example responses for data to be sent in the body.
- Refer to the collection attached for the request type and add scripts
  to chain data between the requests.
- Create an environment "artemis.test" (baseUrl: https://artemis.up.railway.app)

Flow:
1. Register crew member (POST /register) — save api_key & callsign
2. Generate Mission Briefing (POST /mission/brief) with phase: transit
3. Get Mission Overview (GET /mission)
4. Create 3 mission logs (POST /logs) — save each log ID (path is response.log.id)
   Crew: wiseman, glover, koch, hansen
   Category: navigation, life-support, communication, science, crew-status, anomaly
5. Update one log (PATCH /logs/{logId1}) — category to science
6. Delete communication log (DELETE /logs/{logId2})
7. Generate final briefing (POST /mission/brief) with empty body
8. Verify mission completion (GET /mission) — all steps completed: true

Do not write tests yet — we will add them subsequently.</pre>
              <button class="copy-btn" data-copy="code-test-gen" aria-label="Copy test generation prompt">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                Copy
              </button>
            </div>
          </div>
          <ol start="4">
            <li>Run the collection using the <strong>Collection Runner</strong> — verify green checkmarks.</li>
            <li>Then, in the same chat, enter:</li>
          </ol>
          <div class="agent-prompt">
            <div class="agent-prompt-label">🤖 Agent Mode Prompt</div>
            <div class="code-wrapper">
              <pre class="code-block" id="code-test-run">Run the collection using the collection runner and add integration tests based on the responses.</pre>
              <button class="copy-btn" data-copy="code-test-run" aria-label="Copy test runner prompt">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                Copy
              </button>
            </div>
          </div>
          <div class="alert alert-tip">
            <span class="alert-emoji">💡</span>
            If tests fail, paste the error into Agent Mode: "This test is failing with [error]. Debug it."
          </div>
          <div class="check-group">
            <label class="check-item" data-check="s10-collection">
              <input type="checkbox" id="check-s10-collection">
              <div class="check-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div>
              <span class="check-label">Agent Mode created a test collection with the full flow</span>
            </label>
            <label class="check-item" data-check="s10-runner">
              <input type="checkbox" id="check-s10-runner">
              <div class="check-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div>
              <span class="check-label">Collection Runner shows all green checkmarks</span>
            </label>
            <label class="check-item" data-check="s10-tests">
              <input type="checkbox" id="check-s10-tests">
              <div class="check-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div>
              <span class="check-label">Integration tests are added and passing</span>
            </label>
          </div>
        </div>
    </div>

    <!-- STEP 8 (PARTICIPANT) — MCP -->
    <div class="step-section" id="section-11" data-step="11">
      <div class="step-section-header">
        <div class="step-badge">8</div>
        <div class="step-title">MCP — Connect an AI Agent to Your API</div>
      </div>
              <div class="step-content">
          <div class="alert alert-info" style="margin-top:16px;">
            <span class="alert-emoji">🔌</span>
            <strong>What is MCP?</strong> MCP (Model Context Protocol) turns your Postman collection into <strong>tools</strong> that an AI agent (like Claude) can call. The agent reads the collection, understands the endpoints, and calls them based on natural language.
          </div>

          <h3>Setup</h3>
          <ol>
            <li>Install Postman's official MCP server in your AI tool (Claude Desktop, etc.).</li>
            <li>Generate a Postman API key at: <a href="https://go.postman.co/settings/me/api-keys" target="_blank" rel="noopener">go.postman.co/settings/me/api-keys</a></li>
            <li>Add the key to your MCP server configuration.</li>
          </ol>

          <h3>Try It — Send This to Claude</h3>
          <div class="agent-prompt">
            <div class="agent-prompt-label">🤖 MCP Prompt</div>
            <div class="code-wrapper">
              <pre class="code-block" id="code-mcp">Check the Artemis leaderboard from my Postman collection id - &lt;your collection id&gt;
and tell me status of all participants progress.</pre>
              <button class="copy-btn" data-copy="code-mcp" aria-label="Copy MCP prompt">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                Copy
              </button>
            </div>
          </div>

          <h3>More MCP Commands to Try</h3>
          <table class="mcp-table">
            <tbody>
              <tr><td>"What's the status of my mission?"</td><td>Calls <span class="inline-code">GET /mission</span> and summarizes progress</td></tr>
              <tr><td>"Log a navigation anomaly for Koch"</td><td>Calls <span class="inline-code">POST /logs</span> with the right body</td></tr>
              <tr><td>"Give me a mission briefing"</td><td>Calls <span class="inline-code">POST /mission/brief</span> and interprets it</td></tr>
              <tr><td>"Update that anomaly - it's resolved"</td><td>Calls <span class="inline-code">PATCH /logs/:id</span> with updated title</td></tr>
              <tr><td>"Who's leading?"</td><td>Calls <span class="inline-code">GET /leaderboard</span> and ranks everyone</td></tr>
            </tbody>
          </table>

          <div class="check-group">
            <label class="check-item" data-check="s11-mcp">
              <input type="checkbox" id="check-s11-mcp">
              <div class="check-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div>
              <span class="check-label">MCP server is connected to my AI tool</span>
            </label>
            <label class="check-item" data-check="s11-called">
              <input type="checkbox" id="check-s11-called">
              <div class="check-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div>
              <span class="check-label">Claude successfully called an API endpoint via MCP</span>
            </label>
          </div>
    </div>

    <!-- ============== RESET ============== -->
    <button class="reset-btn" id="resetBtn">↺ RESET ALL PROGRESS</button>

    <!-- ============== FOOTER ============== -->
    <div class="workshop-footer">
      <p class="accent" style="font-size: 0.85rem; font-family: var(--font-heading); letter-spacing: 2px;">THE API STAYS LIVE AFTER THE WORKSHOP</p>
      <p>Your callsign, sigil, and mission record persist. Keep exploring.</p>
      <p style="margin-top: 12px;">ARTEMIS WORKSHOP · APR 2026 · POSTMAN API</p>
      <p style="margin-top: 8px;"><a href="https://www.linkedin.com/in/mishra-aanchal/" target="_blank" rel="noopener" style="color: var(--accent-blue); text-decoration: none; border-bottom: 1px solid rgba(0, 212, 255, 0.3);">Made by Aanchal Mishra</a></p>
    </div>
    </main><!-- /content-area -->
  </div><!-- /docs-layout -->

  <!-- ============== CELEBRATION OVERLAY ============== -->
  <canvas id="confetti-canvas"></canvas>
  <div class="celebration" id="celebrationOverlay">
    <h2>Mission Complete</h2>
    <p style="font-size: 1.1rem; color: var(--accent-green);">Splashdown confirmed. Welcome home, Flight Director.</p>
    <p>You've completed all 8 steps of the Artemis Mission Control workshop.</p>
    <button onclick="document.getElementById('celebrationOverlay').classList.remove('show')">DISMISS</button>
  </div>

  <!-- ============== JAVASCRIPT ============== -->
  <script>
    (function() {
      'use strict';

      // ── State ─────────────────────────────
      const STORAGE_KEY = 'artemis-workshop-progress';
      let state = {};

      // Step-to-checkboxes mapping (participant-facing step numbers)
      const STEP_CHECKS = {
        1: ['s1-workspace'],
        2: ['s2-collection'],
        3: ['s3-env'],
        4: ['s4-baseurl', 's4-secret'],
        5: ['s5-health', 's5-registered'],
        6: ['s6-script', 's6-apikey', 's6-mission'],
        7: ['s7-dashboard'],
        8: ['s8-docs-started', 's8-log1', 's8-log2', 's8-log3', 's8-docs-done'],
        9: ['s9-update', 's9-delete', 's9-brief', 's9-splashdown'],
        10: ['s10-collection', 's10-runner', 's10-tests'],
        11: ['s11-mcp', 's11-called']
      };

      // Internal step IDs to participant-facing step numbers
      const INTERNAL_TO_PARTICIPANT = {
        1: 1, 2: 2, 3: 3, 4: 4,
        5: 5, 6: 5, 7: 5,  // steps 5-7 internal → step 5 participant
        8: 5, 9: 6, 10: 7, 11: 8
      };

      // Total number of participant-facing steps
      const TOTAL_STEPS = 8;

      // ── Persistence ───────────────────────
      function loadState() {
        try {
          const raw = localStorage.getItem(STORAGE_KEY);
          state = raw ? JSON.parse(raw) : {};
        } catch (e) {
          state = {};
        }
      }

      function saveState() {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (e) {
          // localStorage full or unavailable — degrade gracefully
        }
      }

      // ── Checkbox Management ───────────────
      function getAllCheckIds() {
        return Object.values(STEP_CHECKS).flat();
      }

      function applyState() {
        getAllCheckIds().forEach(id => {
          const el = document.querySelector('[data-check="' + id + '"]');
          if (!el) return;
          const input = el.querySelector('input');
          if (state[id]) {
            el.classList.add('checked');
            if (input) input.checked = true;
          } else {
            el.classList.remove('checked');
            if (input) input.checked = false;
          }
        });
      }

      function onCheckChange(checkId, isChecked) {
        state[checkId] = isChecked;
        saveState();
        applyState();
        updateProgress();
        updateStepStates();
        updateSidebarStates();
        updateDocsIndicator();
        updateLogProgress();
        checkCompletion();
      }

      // ── Progress Bar ──────────────────────
      function updateProgress() {
        const all = getAllCheckIds();
        const total = all.length;
        const checked = all.filter(id => state[id]).length;

        // Count completed participant steps
        let completedSteps = 0;
        const participantStepsDone = new Set();
        for (const [internalStep, checks] of Object.entries(STEP_CHECKS)) {
          const pStep = INTERNAL_TO_PARTICIPANT[internalStep];
          if (checks.every(c => state[c])) {
            participantStepsDone.add(pStep);
          }
        }
        // A participant step is complete only if ALL internal steps mapping to it are complete
        for (let ps = 1; ps <= TOTAL_STEPS; ps++) {
          const internalSteps = Object.entries(INTERNAL_TO_PARTICIPANT)
            .filter(([_, p]) => p === ps)
            .map(([i, _]) => parseInt(i));
          if (internalSteps.every(is => STEP_CHECKS[is].every(c => state[c]))) {
            completedSteps++;
          }
        }

        const pct = total > 0 ? Math.round((checked / total) * 100) : 0;

        const fill = document.getElementById('progressFill');
        const stepCount = document.getElementById('stepCount');
        const checkCount = document.getElementById('checkCount');
        const checkTotal = document.getElementById('checkTotal');

        if (fill) fill.style.width = pct + '%';
        if (fill && pct === 100) fill.classList.add('complete');
        else if (fill) fill.classList.remove('complete');
        if (stepCount) stepCount.textContent = completedSteps;
        if (checkCount) checkCount.textContent = checked;
        if (checkTotal) checkTotal.textContent = total;
      }

      // ── Step Card States ──────────────────
      function isInternalStepComplete(stepNum) {
        const checks = STEP_CHECKS[stepNum];
        return checks && checks.every(c => state[c]);
      }

      function updateStepStates() {
        const cards = document.querySelectorAll('.step-section');
        let firstIncomplete = null;

        cards.forEach(card => {
          const stepNum = parseInt(card.dataset.step);
          const checks = STEP_CHECKS[stepNum] || [];
          const complete = checks.every(c => state[c]);

          card.classList.toggle('completed', complete);

          // Determine the badge content
          const badge = card.querySelector('.step-badge');
          if (badge && complete) {
            badge.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>';
          }

          if (!complete && !firstIncomplete) {
            firstIncomplete = card;
          }
        });
      }

      // ── Scroll-Spy & Sidebar ────────────
      let currentActiveNav = null;

      function updateActiveNav(stepNum) {
        if (currentActiveNav) currentActiveNav.classList.remove('active');
        const link = document.querySelector('.nav-link[data-nav="' + stepNum + '"]');
        if (link) {
          link.classList.add('active');
          currentActiveNav = link;
          // Keep active link visible in sidebar
          link.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
      }

      function initScrollSpy() {
        const sections = document.querySelectorAll('.step-section');
        const io = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              updateActiveNav(entry.target.dataset.step);
            }
          });
        }, { rootMargin: '-80px 0px -60% 0px', threshold: 0 });
        sections.forEach(s => io.observe(s));
      }

      function initSidebar() {
        const sidebar = document.getElementById('sidebar');
        const toggle = document.getElementById('sidebarToggle');
        const overlay = document.getElementById('sidebarOverlay');

        // Nav link clicks
        document.querySelectorAll('.nav-link').forEach(link => {
          link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Close mobile sidebar
            if (sidebar) sidebar.classList.remove('open');
            if (overlay) overlay.classList.remove('show');
          });
        });

        // Mobile toggle
        if (toggle && sidebar && overlay) {
          toggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            overlay.classList.toggle('show');
          });
          overlay.addEventListener('click', () => {
            sidebar.classList.remove('open');
            overlay.classList.remove('show');
          });
        }
      }

      function updateSidebarStates() {
        document.querySelectorAll('.nav-link').forEach(link => {
          const stepNum = parseInt(link.dataset.nav);
          if (isInternalStepComplete(stepNum)) {
            link.classList.add('completed');
          } else {
            link.classList.remove('completed');
          }
        });
      }

      function autoAdvance(currentSection) {
        const stepNum = parseInt(currentSection.dataset.step);
        if (!isInternalStepComplete(stepNum)) return;
        const allSections = Array.from(document.querySelectorAll('.step-section'));
        const idx = allSections.indexOf(currentSection);
        if (idx < 0 || idx >= allSections.length - 1) return;
        const next = allSections[idx + 1];
        next.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      // ── Docs Indicator (Step 8 special) ───
      function updateDocsIndicator() {
        const indicator = document.getElementById('docsIndicator');
        if (!indicator) return;
        const docsStarted = state['s8-docs-started'];
        const docsDone = state['s8-docs-done'];

        if (docsDone) {
          indicator.innerHTML = '<span>✅</span> Docs complete!';
          indicator.classList.add('done');
        } else if (docsStarted) {
          indicator.innerHTML = '<span class="pulse">⏳</span> Docs generating in background...';
          indicator.classList.remove('done');
        } else {
          indicator.innerHTML = '<span>📋</span> Start docs generation in Part A below';
          indicator.classList.remove('done');
        }
      }

      // ── Log Progress (Step 8 special) ─────
      function updateLogProgress() {
        const logEl = document.getElementById('logProgress');
        if (!logEl) return;
        let count = 0;
        if (state['s8-log1']) count++;
        if (state['s8-log2']) count++;
        if (state['s8-log3']) count++;
        logEl.textContent = '🚀 Logs: ' + count + ' of 3 complete';

        // Update log card styles
        ['logCard1', 'logCard2', 'logCard3'].forEach((id, i) => {
          const card = document.getElementById(id);
          if (card) {
            card.classList.toggle('completed', !!state['s8-log' + (i + 1)]);
          }
        });
      }

      // ── Copy to Clipboard ─────────────────
      function handleCopy(btn) {
        const targetId = btn.getAttribute('data-copy');
        const target = document.getElementById(targetId);
        if (!target) return;

        const text = target.textContent;
        navigator.clipboard.writeText(text).then(() => {
          btn.classList.add('copied');
          const label = btn.querySelector('span') || btn.lastChild;
          const original = btn.innerHTML;
          btn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg> Copied ✓';
          setTimeout(() => {
            btn.innerHTML = original;
            btn.classList.remove('copied');
          }, 2000);
        }).catch(() => {
          // Fallback for older browsers
          const textarea = document.createElement('textarea');
          textarea.value = text;
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          document.body.appendChild(textarea);
          textarea.select();
          try { document.execCommand('copy'); } catch(e) {}
          document.body.removeChild(textarea);
        });
      }

      // ── Completion Check ──────────────────
      function checkCompletion() {
        const all = getAllCheckIds();
        const allDone = all.every(id => state[id]);
        if (allDone) {
          launchConfetti();
          setTimeout(() => {
            document.getElementById('celebrationOverlay').classList.add('show');
          }, 800);
        }
      }

      // ── Confetti Animation ────────────────
      function launchConfetti() {
        const canvas = document.getElementById('confetti-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const colors = ['#00d4ff', '#f5a623', '#10b981', '#ef4444', '#a855f7', '#fbbf24'];
        const particles = [];
        for (let i = 0; i < 150; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            w: Math.random() * 8 + 4,
            h: Math.random() * 6 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            vy: Math.random() * 3 + 2,
            vx: (Math.random() - 0.5) * 2,
            rot: Math.random() * 360,
            rotSpeed: (Math.random() - 0.5) * 10,
            opacity: 1
          });
        }

        let frame = 0;
        function animate() {
          frame++;
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          particles.forEach(p => {
            p.y += p.vy;
            p.x += p.vx;
            p.rot += p.rotSpeed;
            if (frame > 100) p.opacity -= 0.01;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rot * Math.PI / 180);
            ctx.globalAlpha = Math.max(0, p.opacity);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
            ctx.restore();
          });

          if (frame < 200 && particles.some(p => p.opacity > 0)) {
            requestAnimationFrame(animate);
          } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
          }
        }
        animate();
      }

      // ── Reset ─────────────────────────────
      function resetProgress() {
        if (!confirm('Reset all progress? This cannot be undone.')) return;
        state = {};
        saveState();
        applyState();
        updateProgress();
        updateStepStates();
        updateDocsIndicator();
        updateLogProgress();

        // Update sidebar states
        updateSidebarStates();

        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      // ── Scroll shadow on progress bar ─────
      function handleScroll() {
        const header = document.getElementById('progressHeader');
        if (header) {
          header.classList.toggle('scrolled', window.scrollY > 20);
        }
      }

      // ── Init ──────────────────────────────
      function init() {
        loadState();

        // Wire up checkbox clicks
        document.querySelectorAll('.check-item').forEach(item => {
          const checkId = item.dataset.check;
          item.addEventListener('click', (e) => {
            e.preventDefault();
            const isNowChecked = !state[checkId];
            onCheckChange(checkId, isNowChecked);

            // Auto-advance if step is complete
            const card = item.closest('.step-section');
            if (card && isNowChecked) {
              setTimeout(() => autoAdvance(card), 500);
            }
          });
          // Keyboard support
          item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              item.click();
            }
          });
        });


        // Wire up copy buttons
        document.querySelectorAll('.copy-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            handleCopy(btn);
          });
        });


        // Wire up resource card actions
        document.querySelectorAll('.resource-card[data-url]').forEach(card => {
          const url = card.dataset.url;
          const copyBtn = card.querySelector('.rc-copy');
          const viewBtn = card.querySelector('.rc-view');
          if (copyBtn) {
            copyBtn.addEventListener('click', () => {
              navigator.clipboard.writeText(url).then(() => {
                copyBtn.classList.add('copied');
                setTimeout(() => copyBtn.classList.remove('copied'), 1500);
              });
            });
          }
          if (viewBtn) {
            viewBtn.addEventListener('click', () => {
              window.open(url, '_blank', 'noopener');
            });
          }
        });

        // Wire up reset
        const resetBtn = document.getElementById('resetBtn');
        if (resetBtn) {
          resetBtn.addEventListener('click', resetProgress);
        }

        // Wire up theme toggle
        const THEME_KEY = 'artemis-theme';
        const themeToggle = document.getElementById('themeToggle');
        const savedTheme = localStorage.getItem(THEME_KEY);
        if (savedTheme) {
          document.documentElement.setAttribute('data-theme', savedTheme);
        }
        if (themeToggle) {
          themeToggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', next);
            try { localStorage.setItem(THEME_KEY, next); } catch(e) {}
          });
        }

        // Scroll handler
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Apply saved state
        applyState();
        updateProgress();
        updateStepStates();
        updateDocsIndicator();
        updateLogProgress();

        // Init sidebar navigation & scroll-spy
        initSidebar();
        initScrollSpy();
        updateSidebarStates();
      }

      // Start when DOM is ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
      } else {
        init();
      }
    })();
  </script>
</body>
</html>`;
}

module.exports = { renderGuideWorkshop };
