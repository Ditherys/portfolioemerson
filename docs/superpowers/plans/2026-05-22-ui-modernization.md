# UI Modernization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the vibecoded sidebar layout with a clean, full-width, Clean Corporate dashboard using updated KPI cards (progress bar + delta), a navy header strip, and consistent spacing throughout.

**Architecture:** Three files change — `style.css` (CSS tokens + layout + components), `index.html` (remove sidebar, restructure header, remove about-banner), `app.js` (update KPI card HTML templates). No new libraries. No data changes. No chart type changes.

**Tech Stack:** Pure HTML/CSS/JS, Chart.js 4.4 (unchanged), Inter font (unchanged)

---

## File Map

| File | What changes |
|------|-------------|
| `style.css` | Full rewrite of tokens, app-shell, header, KPI cards, chart cards, table, sticky bar, responsive |
| `index.html` | Remove sidebar, restructure header (add sub-strip + badges), remove about-banner, add footer note |
| `app.js` | Rewrite `renderKpiCards()` and `renderForecastKpiCards()` with progress bar template |

---

### Task 1: Update design tokens and app shell

**Files:**
- Modify: `style.css` (lines 1–71)

- [ ] **Step 1: Replace the `:root` token block and body/reset rules**

Replace everything from line 1 through the `.app-shell` block (currently ends around line 71) with:

```css
/* ── Design Tokens ── */
:root {
  --navy:         #1B3A5C;
  --blue:         #0B6FBF;
  --teal:         #00A8D4;
  --sky:          #C8E4F4;
  --bg:           #F1F5F9;
  --surface:      #FFFFFF;
  --surface-soft: #F8FAFC;
  --line:         #E2E8F0;
  --text:         #1E293B;
  --muted:        #94A3B8;
  --success-bg:   #DCFCE7;
  --success-text: #15803D;
  --warning-bg:   #FEF9C3;
  --warning-text: #A16207;
  --danger-bg:    #FEE2E2;
  --danger-text:  #DC2626;
  --shadow:    0 2px 8px rgba(0,0,0,.06);
  --shadow-md: 0 8px 24px rgba(27,58,92,.12);
  --shadow-lg: 0 16px 40px rgba(27,58,92,.18);
  --radius:    12px;
  --radius-sm: 8px;
  --radius-xs: 6px;
}

/* ── Reset ── */
*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  min-height: 100vh;
  font-family: 'Inter', system-ui, Arial, sans-serif;
  font-size: 14px;
  color: var(--text);
  background: var(--bg);
}
button, select, input { font: inherit; }
button { cursor: pointer; }
img { display: block; max-width: 100%; }
h1, h2, h3 { margin: 0; line-height: 1.2; }
p { margin: 0; }

/* ── Accessibility ── */
.skip-link {
  position: absolute;
  top: -100%;
  left: 50%;
  transform: translateX(-50%);
  padding: .75rem 1.5rem;
  background: var(--navy);
  color: #fff;
  font-weight: 700;
  text-decoration: none;
  border-radius: 0 0 var(--radius) var(--radius);
  z-index: 1000;
  transition: top .2s;
}
.skip-link:focus { top: 0; }
.hidden { display: none !important; }

/* ── App Shell ── */
.app-shell {
  max-width: 1440px;
  margin: 0 auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 100vh;
}
```

- [ ] **Step 2: Delete the entire sidebar block**

In `style.css`, delete everything between and including:
```css
/* ── Sidebar ── */
```
...down to and including:
```css
.sidebar-note { color: var(--muted); font-size: .71rem; line-height: 1.45; }
```
(approximately lines 74–188 in the original file)

- [ ] **Step 3: Delete the `.main-content` rule**

Delete:
```css
/* ── Main Content ── */
.main-content {
  display: flex;
  flex-direction: column;
  gap: .9rem;
  min-width: 0;
}
```

- [ ] **Step 4: Open dev server and confirm page loads without layout errors**

```bash
node dev-server.js
```

Open `http://localhost:3000`. The page should load (it will look broken — that's fine at this stage). No JS errors in console.

---

### Task 2: Build the full-width navy header

**Files:**
- Modify: `style.css` — replace the `/* ── Page Header ── */` block

- [ ] **Step 1: Replace the existing Page Header + Tab nav CSS block**

Find and replace the entire block from `/* ── Page Header ── */` through `.tab-btn.is-active { ... }` with:

```css
/* ── Page Header ── */
.page-header {
  background: var(--navy);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

.header-top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 24px 16px;
  gap: 16px;
  min-width: 0;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
}

.header-logo-slot {
  width: 44px;
  height: 44px;
  background: rgba(255,255,255,.12);
  border: 1px solid rgba(255,255,255,.2);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
}
.header-logo { max-height: 32px; width: auto; object-fit: contain; }

.header-copy { min-width: 0; flex: 1; }
.header-kicker {
  display: block;
  color: rgba(200,228,244,.75);
  font-size: .72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .1em;
  margin-bottom: .2rem;
}
.header-copy h1 {
  color: #fff;
  font-size: clamp(1.1rem, 2.5vw, 1.5rem);
  font-weight: 800;
  line-height: 1.1;
}

.header-badges {
  display: flex;
  gap: 6px;
  flex-shrink: 0;
  flex-wrap: wrap;
  justify-content: flex-end;
}
.header-badge {
  background: rgba(255,255,255,.12);
  border: 1px solid rgba(255,255,255,.18);
  border-radius: var(--radius-xs);
  padding: 4px 10px;
  color: rgba(255,255,255,.8);
  font-size: .7rem;
  font-weight: 600;
  white-space: nowrap;
}
.header-badge.badge-accent {
  background: rgba(0,168,212,.25);
  border-color: rgba(0,168,212,.45);
  color: #7DD3FC;
}

.header-sub-strip {
  background: rgba(255,255,255,.07);
  padding: 10px 24px;
  color: rgba(200,228,244,.7);
  font-size: .82rem;
  line-height: 1.55;
}
.header-sub-strip strong { color: rgba(255,255,255,.92); }

/* Tab nav */
.tab-nav {
  display: flex;
  gap: 2px;
  padding: 10px 24px 0;
  flex-wrap: wrap;
}
.tab-btn {
  padding: 8px 18px;
  border: none;
  border-radius: 8px 8px 0 0;
  background: transparent;
  color: rgba(255,255,255,.5);
  font-size: .82rem;
  font-weight: 600;
  transition: all .15s ease;
  white-space: nowrap;
}
.tab-btn:hover { color: rgba(255,255,255,.85); background: rgba(255,255,255,.08); }
.tab-btn.is-active {
  background: var(--bg);
  color: var(--navy);
  font-weight: 700;
}
```

- [ ] **Step 2: Delete the `.about-banner` CSS block**

Find and delete the entire block:
```css
/* ── About Banner ── */
.about-banner { ... }
.about-content { ... }
.about-name { ... }
.about-sep { ... }
.about-text { ... }
.about-text strong { ... }
.about-guide-link { ... }
.about-guide-link:hover { ... }
```

- [ ] **Step 3: Verify in browser**

Refresh `http://localhost:3000`. The header should now be a dark navy bar. Tabs may still not look right — that's fine, HTML hasn't changed yet.

---

### Task 3: Redesign KPI cards

**Files:**
- Modify: `style.css` — replace `/* ── KPI Grid ── */` block

- [ ] **Step 1: Replace the KPI Grid + card CSS**

Find and replace everything from `/* ── KPI Grid ── */` through `.kpi-delta.down { ... }` with:

```css
/* ── KPI Grid ── */
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 12px;
}
#forecastKpiGrid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.kpi-card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 16px 14px 14px;
  transition: box-shadow .18s ease, transform .18s ease;
}
.kpi-card:hover { box-shadow: var(--shadow-md); transform: translateY(-2px); }

.kpi-label {
  color: var(--muted);
  font-size: .7rem;
  font-weight: 700;
  letter-spacing: .09em;
  text-transform: uppercase;
  margin-bottom: 6px;
}
.kpi-value {
  display: block;
  color: var(--navy);
  font-size: 1.6rem;
  font-weight: 800;
  line-height: 1;
  margin-bottom: 8px;
}
.kpi-meta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 6px;
}
.kpi-target-text {
  color: var(--muted);
  font-size: .7rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.kpi-delta { font-size: .72rem; font-weight: 700; white-space: nowrap; flex-shrink: 0; }
.kpi-delta.delta-up   { color: var(--success-text); }
.kpi-delta.delta-warn { color: var(--warning-text); }
.kpi-delta.delta-down { color: var(--danger-text);  }

.kpi-bar-track {
  background: #F1F5F9;
  border-radius: 999px;
  height: 4px;
  overflow: hidden;
}
.kpi-bar-fill {
  height: 100%;
  border-radius: 999px;
  transition: width .5s ease;
}
.kpi-bar-fill.bar-success { background: linear-gradient(90deg, var(--teal), var(--blue)); }
.kpi-bar-fill.bar-warning { background: linear-gradient(90deg, #F59E0B, #D97706); }
.kpi-bar-fill.bar-danger  { background: linear-gradient(90deg, #F87171, #DC2626); }
```

- [ ] **Step 2: Verify the CSS is valid — no stray rules left from old `.kpi-badge`, `.kpi-sub`, `.kpi-delta.up/.down`**

Search `style.css` for `kpi-badge`, `kpi-sub`, `kpi-delta.up`, `kpi-delta.down`. All should be gone (replaced with the new rules above).

---

### Task 4: Update chart cards, tables, sticky bar, and misc components

**Files:**
- Modify: `style.css` — update remaining component blocks

- [ ] **Step 1: Update `.chart-card` block**

Find `.chart-card {` and replace the full `.chart-card` + `.chart-card:hover` rules with:

```css
.chart-card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 20px;
  transition: box-shadow .18s ease, transform .18s ease;
}
.chart-card:hover { box-shadow: var(--shadow-md); transform: translateY(-1px); }
```

- [ ] **Step 2: Update `.chart-header` and text styles**

Find `.chart-header {` and replace `.chart-header` + `.eyebrow` + `.chart-header h3` + `.chart-note` with:

```css
.chart-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: .75rem;
  margin-bottom: 16px;
}
.eyebrow {
  color: var(--teal);
  font-size: .72rem;
  font-weight: 700;
  letter-spacing: .1em;
  text-transform: uppercase;
  margin-bottom: .2rem;
}
.chart-header h3 { font-size: 1rem; color: var(--navy); margin-bottom: .15rem; }
.chart-note { color: var(--muted); font-size: .75rem; line-height: 1.4; }
```

- [ ] **Step 3: Update `.tab-pane` and `.chart-row` gaps**

Find `.tab-pane {` and update gap:
```css
.tab-pane { display: flex; flex-direction: column; gap: 12px; }
.tab-pane.hidden { display: none; }
```

Find `.chart-row {` and update:
```css
.chart-row { display: grid; gap: 12px; }
.chart-row-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
```

- [ ] **Step 4: Update sticky tab bar**

Find `/* ── Sticky Tab Bar ── */` and replace the full block through `.sticky-tab.is-active { ... }` with:

```css
/* ── Sticky Tab Bar ── */
.sticky-tab-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 300;
  background: rgba(27,58,92,.97);
  border-bottom: 1px solid rgba(255,255,255,.1);
  box-shadow: 0 2px 12px rgba(27,58,92,.3);
  transform: translateY(-110%);
  transition: transform .22s ease;
  backdrop-filter: blur(12px);
}
.sticky-tab-bar.is-visible { transform: translateY(0); }
.sticky-inner {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: .35rem 1.25rem;
  overflow-x: auto;
  scrollbar-width: none;
}
.sticky-inner::-webkit-scrollbar { display: none; }
.sticky-brand {
  font-size: .68rem;
  font-weight: 700;
  color: rgba(255,255,255,.5);
  white-space: nowrap;
  flex-shrink: 0;
  padding-right: .6rem;
  border-right: 1px solid rgba(255,255,255,.15);
}
.sticky-tabs { display: flex; gap: .25rem; }
.sticky-tab {
  min-height: 26px;
  padding: 0 .65rem;
  border: 1px solid rgba(255,255,255,.15);
  border-radius: 999px;
  background: transparent;
  color: rgba(255,255,255,.55);
  font-size: .7rem;
  font-weight: 700;
  transition: all .15s;
  white-space: nowrap;
}
.sticky-tab:hover { background: rgba(255,255,255,.1); color: rgba(255,255,255,.9); }
.sticky-tab.is-active { background: rgba(255,255,255,.18); color: #fff; border-color: rgba(255,255,255,.3); }
```

- [ ] **Step 5: Add disclaimer footer rule**

At the end of `style.css`, before the `/* ── Focus styles ── */` block, add:

```css
/* ── Disclaimer Footer ── */
.disclaimer-footer {
  padding: 12px 4px;
  color: var(--muted);
  font-size: .72rem;
  line-height: 1.5;
  text-align: center;
  border-top: 1px solid var(--line);
  margin-top: 8px;
}
.disclaimer-footer strong { color: var(--text); }
```

- [ ] **Step 6: Update responsive breakpoints**

Find `@media (max-width: 1024px)` and replace the full responsive block through the closing `@media (max-width: 480px)` with:

```css
/* ── Responsive ── */
@media (max-width: 1100px) {
  .kpi-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  #forecastKpiGrid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .header-badges { display: none; }
}

@media (max-width: 780px) {
  .app-shell { padding: 10px; }
  .chart-row-2 { grid-template-columns: 1fr; }
  .kpi-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  #forecastKpiGrid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .chart-wrap { height: 240px; }
  .header-top-row { padding: 14px 16px 12px; }
  .header-sub-strip { padding: 8px 16px; font-size: .78rem; }
  .tab-nav { padding: 8px 16px 0; }

  /* Heatmap mobile */
  :root { --hm-label: 108px; }
  .heatmap-row-label { font-size: .65rem; min-width: var(--hm-label); max-width: var(--hm-label); padding-right: .35rem; }
  .heatmap-cell { min-width: 38px; height: 30px; font-size: .58rem; border-radius: 4px; }
  .heatmap-col-label { font-size: .54rem; }
  .heatmap-fade-right { display: block; }
  .heatmap-scroll-hint { display: block; }
}

@media (max-width: 480px) {
  .kpi-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .tab-btn { font-size: .75rem; padding: 6px 12px; }
}
```

---

### Task 5: Restructure index.html

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Remove the entire sidebar**

Delete the `<aside class="sidebar">...</aside>` block (lines 18–64 in the original). Remove everything from:
```html
<!-- ── Sidebar ── -->
<aside class="sidebar">
```
through the closing:
```html
</aside>
```

- [ ] **Step 2: Replace the `<header class="page-header">` block**

Find and replace the existing `<header class="page-header">...</header>` with:

```html
<header class="page-header">
  <div class="header-top-row">
    <div class="header-left">
      <div class="header-logo-slot">
        <img src="./drlogo2.png" alt="DRGS" class="header-logo" />
      </div>
      <div class="header-copy">
        <span class="header-kicker">Supply Chain Analytics · Portfolio Demo · by Dither Reyes</span>
        <h1>S&amp;OP Performance Dashboard</h1>
      </div>
    </div>
    <div class="header-badges">
      <span class="header-badge">FY 2024</span>
      <span class="header-badge">Metro Brew F&amp;B Corp.</span>
      <span class="header-badge badge-accent">Simulated Data</span>
    </div>
  </div>
  <div class="header-sub-strip">
    <strong>Dither Reyes</strong> — Supply chain professional demonstrating <strong>S&amp;OP analytics</strong>, inventory management, and BI capabilities for a Senior Supply Chain Analyst role. This simulates a 12-month FY 2024 F&amp;B supply chain with forecast accuracy, DOS, and delivery KPIs.
  </div>
  <nav class="tab-nav" role="tablist" aria-label="Dashboard sections">
    <button class="tab-btn is-active" data-tab="overview"  role="tab" aria-selected="true"  type="button">Overview</button>
    <button class="tab-btn"           data-tab="inventory" role="tab" aria-selected="false" type="button">Inventory</button>
    <button class="tab-btn"           data-tab="forecast"  role="tab" aria-selected="false" type="button">Forecast</button>
    <button class="tab-btn"           data-tab="sop"       role="tab" aria-selected="false" type="button">S&amp;OP</button>
    <button class="tab-btn"           data-tab="shipments" role="tab" aria-selected="false" type="button">Shipments</button>
  </nav>
</header>
```

- [ ] **Step 3: Remove the `.about-banner` div**

Delete the entire block:
```html
<!-- About / Personal context banner -->
<div class="about-banner">
  ...
</div>
```

- [ ] **Step 4: Change `.main-content` to just a `<div>` wrapper**

The `<main class="main-content" id="main-content">` is fine as-is. Just make sure the `app-shell` direct child is the main element (no sidebar sibling).

- [ ] **Step 5: Add disclaimer footer before closing `</main>`**

Just before the `</main>` closing tag (after the last `</div>` for tab-shipments), add:

```html
<footer class="disclaimer-footer">
  <strong>Data Disclaimer:</strong> All data in this dashboard is <strong>entirely fictional</strong> and was created solely to demonstrate supply chain analytics and S&amp;OP dashboarding skills. No real company, product, or business data was used.
</footer>
```

- [ ] **Step 6: Verify in browser**

Refresh `http://localhost:3000`. You should see:
- Full-width navy header with logo, title, badges, sub-strip, and tabs
- No sidebar
- KPI cards will be visible but still using old HTML (no progress bars yet — that's Task 6)
- Charts should render correctly on their tabs

---

### Task 6: Rewrite KPI card render functions in app.js

**Files:**
- Modify: `app.js` — `renderKpiCards()` (lines 259–323) and `renderForecastKpiCards()` (lines 325–351)

- [ ] **Step 1: Replace `renderKpiCards()`**

Find and replace the entire `function renderKpiCards()` with:

```js
function renderKpiCards() {
  const grid = document.getElementById('kpiGrid');
  if (!grid) return;

  const curFA  = last(DATA.forecastAccuracy.overall);
  const prvFA  = prev(DATA.forecastAccuracy.overall);
  const curDOS = last(DATA.dos.overall);
  const prvDOS = prev(DATA.dos.overall);
  const curOTD = last(DATA.otd);
  const prvOTD = prev(DATA.otd);
  const curFR  = last(DATA.fillRate);
  const prvFR  = prev(DATA.fillRate);
  const curTO  = last(DATA.turnover.overall);
  const prvTO  = prev(DATA.turnover.overall);
  const curOO  = last(DATA.openOrders);
  const prvOO  = prev(DATA.openOrders);

  const cards = [
    {
      label: 'Forecast Accuracy', value: `${fmt(curFA)}%`,
      targetText: `target ≥ 85%`,
      barPct: Math.min(curFA, 100),
      ...deltaLabel(curFA, prvFA, true),
      status: statusClass(curFA, 85, true),
    },
    {
      label: 'Days of Supply', value: `${fmt(curDOS)}`,
      targetText: `target ≤ 45 days`,
      barPct: Math.min(Math.round(45 / curDOS * 100), 100),
      ...deltaLabel(curDOS, prvDOS, false),
      status: statusClass(curDOS, 45, false),
    },
    {
      label: 'On-Time Delivery', value: `${fmt(curOTD)}%`,
      targetText: `target ≥ 95%`,
      barPct: Math.min(curOTD, 100),
      ...deltaLabel(curOTD, prvOTD, true),
      status: statusClass(curOTD, 95, true),
    },
    {
      label: 'Fill Rate', value: `${fmt(curFR)}%`,
      targetText: `target ≥ 95%`,
      barPct: Math.min(curFR, 100),
      ...deltaLabel(curFR, prvFR, true),
      status: statusClass(curFR, 95, true),
    },
    {
      label: 'Inv. Turnover', value: `${fmt(curTO)}×`,
      targetText: `target ≥ 6.0×`,
      barPct: Math.min(Math.round(curTO / 10 * 100), 100),
      ...deltaLabel(curTO, prvTO, true),
      status: statusClass(curTO, 6, true),
    },
    {
      label: 'Open Orders', value: curOO.toLocaleString(),
      targetText: `Dec 2024 · prior: ${prvOO.toLocaleString()}`,
      barPct: Math.min(Math.round(prvOO / curOO * 80), 100),
      ...deltaLabel(curOO, prvOO, false),
      status: statusClass(curOO, prvOO, false, 0.15),
    },
  ];

  grid.innerHTML = cards.map(c => {
    const barClass   = c.status === 'success' ? 'bar-success' : c.status === 'warning' ? 'bar-warning' : 'bar-danger';
    const deltaClass = c.isGood ? (c.status === 'warning' ? 'delta-warn' : 'delta-up') : 'delta-down';
    return `
      <div class="kpi-card">
        <div class="kpi-label">${c.label}</div>
        <strong class="kpi-value">${c.value}</strong>
        <div class="kpi-meta-row">
          <span class="kpi-target-text">${c.targetText}</span>
          <span class="kpi-delta ${deltaClass}">${c.text}</span>
        </div>
        <div class="kpi-bar-track">
          <div class="kpi-bar-fill ${barClass}" style="width:${c.barPct}%"></div>
        </div>
      </div>
    `;
  }).join('');
}
```

- [ ] **Step 2: Replace `renderForecastKpiCards()`**

Find and replace the entire `function renderForecastKpiCards()` with:

```js
function renderForecastKpiCards() {
  const grid = document.getElementById('forecastKpiGrid');
  if (!grid) return;

  const families = [
    { key: 'beverages',   label: 'Beverages',   target: 85 },
    { key: 'foodItems',   label: 'Food Items',  target: 85 },
    { key: 'packaging',   label: 'Packaging',   target: 85 },
    { key: 'consumables', label: 'Consumables', target: 85 },
  ];

  grid.innerHTML = families.map(f => {
    const cur = last(DATA.forecastAccuracy[f.key]);
    const prv = prev(DATA.forecastAccuracy[f.key]);
    const st  = statusClass(cur, f.target, true);
    const dl  = deltaLabel(cur, prv, true);
    const barClass   = st === 'success' ? 'bar-success' : st === 'warning' ? 'bar-warning' : 'bar-danger';
    const deltaClass = dl.isGood ? (st === 'warning' ? 'delta-warn' : 'delta-up') : 'delta-down';
    return `
      <div class="kpi-card">
        <div class="kpi-label">${f.label}</div>
        <strong class="kpi-value">${fmt(cur)}%</strong>
        <div class="kpi-meta-row">
          <span class="kpi-target-text">target ≥ ${f.target}% · FY Avg: ${fmt(avg(DATA.forecastAccuracy[f.key]))}%</span>
          <span class="kpi-delta ${deltaClass}">${dl.text}</span>
        </div>
        <div class="kpi-bar-track">
          <div class="kpi-bar-fill ${barClass}" style="width:${Math.min(cur, 100)}%"></div>
        </div>
      </div>
    `;
  }).join('');
}
```

- [ ] **Step 3: Update Chart.js global defaults**

Find the `// ── Chart.js global defaults ──` block at the top of `app.js` and update:

```js
Chart.defaults.font.family = "'Inter', system-ui, Arial, sans-serif";
Chart.defaults.font.size   = 12;
Chart.defaults.color       = '#94A3B8';
Chart.defaults.plugins.legend.position           = 'bottom';
Chart.defaults.plugins.legend.labels.usePointStyle  = true;
Chart.defaults.plugins.legend.labels.pointStyleWidth = 10;
Chart.defaults.plugins.legend.labels.boxHeight      = 8;
Chart.defaults.plugins.legend.labels.padding        = 16;
```

- [ ] **Step 4: Verify in browser — full visual check**

Refresh `http://localhost:3000`. Check each tab:
- **Overview**: Navy header, 6 KPI cards with progress bars and delta labels, 3 chart cards, heatmap
- **Inventory**: Charts render, Top 30 table looks clean
- **Forecast**: 4 family KPI cards with progress bars, 2 charts, Forecast Misses table
- **S&OP**: All 4 charts, full heatmap
- **Shipments**: 4 charts including donut
- No console errors

---

### Task 7: Final polish pass

**Files:**
- Modify: `style.css` — minor tweaks after visual review

- [ ] **Step 1: Remove any lingering `.kpi-sub`, `.kpi-badge`, `status-success/warning/danger` class references from CSS**

Search `style.css` for: `kpi-sub`, `kpi-badge`, `status-neutral`, `status-success`, `status-warning`, `status-danger`. Delete any rules found that are no longer used.

- [ ] **Step 2: Check heatmap legend chips still have correct styles**

The `.heatmap-legend-chip` uses `heat-success`, `heat-warning`, `heat-danger` classes. Verify in `style.css` that `.heatmap-cell.heat-success`, `.heatmap-cell.heat-warning`, `.heatmap-cell.heat-danger` rules are still present and unchanged.

- [ ] **Step 3: Verify `status-badge` (table badges) still work**

In the Top 30 table, `badge-risk`, `badge-monitor`, `badge-normal` classes are used. Confirm these rules still exist in `style.css`. They should be unchanged.

- [ ] **Step 4: Final browser check — scroll test**

1. Open `http://localhost:3000`
2. Scroll down — sticky nav should appear with navy background
3. Click each sticky tab — should jump to top, switch tabs
4. Resize to 780px wide — kpi-grid should show 2 columns, charts stack
5. Click "Export CSV" on Top 30 table — file should download

- [ ] **Step 5: Commit all changes**

```bash
git add index.html style.css app.js
git commit -m "redesign: modern full-width Clean Corporate layout

- Remove sidebar; full-width navy header with sub-strip + badges
- KPI cards redesigned with progress bar + delta vs target
- Consistent 12px spacing scale and updated design tokens
- Sticky tab bar matches new navy theme
- Disclaimer moved to footer"
```

---

## Self-Review

**Spec coverage:**
- [x] Clean Corporate direction → Task 2 (header CSS), Task 4 (chart cards)
- [x] Full-width no sidebar → Task 1 (app-shell), Task 5 (HTML restructure)
- [x] Progress bar + delta KPI cards → Task 3 (CSS), Task 6 (JS)
- [x] Chart types unchanged → Confirmed (no chart type tasks)
- [x] Responsive breakpoints updated → Task 4 Step 6
- [x] Disclaimer → Task 5 Step 5 + Task 4 Step 5

**Placeholder scan:** No TBD or vague steps found.

**Type consistency:**
- `barPct` used in Task 6 JS matches `kpi-bar-fill` + `width:${c.barPct}%` — consistent
- `bar-success/warning/danger` CSS classes in Task 3 match `barClass` logic in Task 6 — consistent
- `delta-up/warn/down` CSS in Task 3 matches `deltaClass` in Task 6 — consistent
- `header-sub-strip`, `header-badges`, `header-badge` defined in Task 2 CSS, used in Task 5 HTML — consistent
