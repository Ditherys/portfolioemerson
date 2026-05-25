# UI Review — Supply Chain S&OP Dashboard
**Dither Reyes Global Solutions · Portfolio Demo**
Audited: 2026-05-20

---

## Overall Score: 20 / 24 (83%)

| Pillar | Score | Grade |
|---|---|---|
| 1. Visual Hierarchy & Layout | 3 / 4 | Good |
| 2. Color & Branding | 4 / 4 | Excellent |
| 3. Typography & Readability | 3 / 4 | Good |
| 4. Data Visualization Quality | 4 / 4 | Excellent |
| 5. Interactivity & UX | 3 / 4 | Good |
| 6. Professionalism & Portfolio-Readiness | 3 / 4 | Good |

**Verdict: Strong portfolio — impresses on data quality and domain knowledge. Three fixable issues will push it to near-perfect.**

---

## Pillar 1 — Visual Hierarchy & Layout · 3/4

### What works
- Sidebar + main content two-column layout is clean and purposeful. The sidebar serves as persistent context (KPI targets, disclaimer, period) while the main area is all signal.
- Header → KPI cards → tab panes is a natural top-to-bottom reading order.
- `chart-card` with eyebrow/title/note header gives every visualization a consistent information scaffold.
- Sticky tab bar appearing on scroll is a genuine UX upgrade — navigation follows the user.

### Issues to fix

**[HIGH] The KPI row is 6 columns on all viewports above 1200px (style.css:272–273)**
`grid-template-columns: repeat(6, minmax(0, 1fr))` creates a dense strip of 6 cards. On a 1280px laptop, each card is ~180px wide — this forces the KPI label and sub-text to wrap awkwardly. A 3+3 arrangement (two rows of three) is more comfortable and lets the values breathe.

**[MEDIUM] Logo appears in both the sidebar brand panel and the page header simultaneously**
At desktop width, the recruiter sees `drlogo2.png` twice — once in the sidebar at `max-height:110px` and again in the header at `max-height:105px` — side by side. This wastes real estate and reads as an accidental duplication rather than a deliberate brand statement. Pick one placement or reduce one to a wordmark chip.

**[LOW] Header meta chips repeat sidebar data**
`header-meta` shows "Period · Jan–Dec 2024", "Product Lines · 4 Families", "Top 30 SKUs · Monitored" — all three are also in the sidebar's "Data Period" panel. On desktop both are visible simultaneously. These chips are not earning their space.

---

## Pillar 2 — Color & Branding · 4/4

### What works
- Design tokens (`--navy`, `--blue`, `--teal`) are drawn directly from the DRGS logo palette and applied consistently across CSS and JS (`C` object in app.js:18–28).
- Status traffic-light system (green/yellow/red) maps correctly to KPI performance meaning — a recruiter understands at a glance without reading labels.
- Target reference lines on charts use `#E84040` (distinct red) — immediately separable from data series. All target lines are dashed, which is the correct convention.
- Background gradient (teal wash at top-right + light blue body) adds premium texture without distracting.
- Tooltip style (`rgba(27,58,92,0.93)` navy background) is fully on-brand and readable.

### Nothing to fix — this pillar is portfolio-ready as shipped.

---

## Pillar 3 — Typography & Readability · 3/4

### What works
- Inter is the correct choice for a data dashboard — neutral, legible at small sizes, tabular numerals.
- Uppercase tracked labels (`.panel-label`, `.eyebrow`, `.kpi-label`, `.meta-label`) create consistent visual rhythm between sections.
- `kpi-value` at `1.45rem` / `font-weight:800` provides enough hierarchy to scan numbers fast.
- `clamp(1.05rem, 2vw, 1.55rem)` on `h1` adapts gracefully to viewport width.

### Issues to fix

**[HIGH] Supporting text is too small to scan quickly (style.css:310–325)**
Key elements are at or below 10px equivalent on a 16px base:
- `.kpi-label` → `0.61rem` ≈ 9.8px
- `.eyebrow` → `0.62rem` ≈ 9.9px
- `.meta-label` → `0.62rem` ≈ 9.9px
- `.kpi-badge` → `0.60rem` ≈ 9.6px

A recruiter glancing at this on a laptop 60cm away, or on a second monitor, will squint at these. Labels that guide interpretation of numbers must be readable without effort. Recommended floor: `0.70rem` for non-decorative labels, `0.65rem` absolute minimum.

**[MEDIUM] KPI sub-text line is very dense**
`kpi-sub` (`.65rem`, style.css:325) shows two facts: the target AND the FY average, e.g. `"Target ≥ 85% · FY Avg: 85.6%"`. This is the most analytically useful context on the card, but it's the smallest text. Consider bumping to `0.72rem` and splitting to two lines or using a `·` separator with a color distinction.

**[LOW] Header kicker and brand context are undersized**
`.header-kicker` at `0.7rem` introduces the entire dashboard ("Supply Chain Analytics · Portfolio Demo") but is visually subordinate to everything around it. This is the context-setting line a recruiter reads first — it should be confident, not whispered.

---

## Pillar 4 — Data Visualization Quality · 4/4

### What works
- **Chart selection is excellent.** Every chart answers a question an S&OP manager actually asks: FA trend by family, DOS vs target, demand attainment variance, shipment status breakdown. Nothing decorative.
- **S&OP heatmap** (5 metrics × 12 months) is the standout piece — this is exactly what a monthly S&OP review deck looks like. The row-sticky labels on scroll are a technical detail that shows craft.
- **Dual-axis S&OP demand chart** (bars for units, line for variance %) demonstrates the kind of chart that lives in actual business review decks.
- **Target lines** are on every chart that has a target. Labeled, dashed, red — no ambiguity.
- **Forecast Misses table** with Root Cause column (`"Promo Pull-forward"`, `"New Menu Launch Impact"`) is the best piece of domain storytelling in the dashboard. A senior analyst who writes that column is showing they understand *why* forecasts miss, not just *that* they miss.
- **Top 30 Inventory table** with Recommended Action column mirrors a real inventory risk review cadence.
- Tooltip hover mode (`index`) shows all series at a given x-point — correct for comparative charts.
- Donut chart cutout at 65% with hover offset is polished.

### Minor observations (not deducting points)
- `faCurrentChart` hardcodes the label "December FA (%)" in both the chart header HTML and the dataset label. If you ever update the dataset to show a different month, you'd need to change two places.
- KPI cards show a text arrow delta (`▲ 1.1%`) which is functional but a mini sparkline trend line would be more visually powerful. Not required for a good score, but would elevate to exceptional.

---

## Pillar 5 — Interactivity & UX · 3/4

### What works
- Tab lazy initialization (`initialised` Set, app.js:798) is the right pattern — charts only render when the pane is first viewed, keeping initial load fast.
- Sticky tab bar uses `IntersectionObserver` (app.js:837) correctly — far better than scroll event polling.
- `skip-link` for keyboard/screen reader navigation is present and styled correctly.
- ARIA attributes: `role="tablist"`, `role="tab"`, `aria-selected` — correct.
- CSV export with proper quote-escaping (`replace(/"/g,'""')`) — handles commas in descriptions correctly.
- Hover states on KPI cards (translateY -2px) and chart cards (-1px) are subtle and professional.

### Issues to fix

**[HIGH] Keyboard navigation on tabs is incomplete**
ARIA authoring practices for the `tablist` pattern require left/right arrow keys to move between tabs. Currently only mouse click events are wired (app.js:825–827). A recruiter using Tab+Enter to navigate the dashboard won't be able to switch sections without a mouse. One `keydown` handler on the tab container would complete the pattern.

**[MEDIUM] Resize event listeners accumulate on each heatmap render (app.js:711)**
`window.addEventListener('resize', updateFade, { passive: true })` is called inside `renderHeatmap()`. Since `renderHeatmap` is called once for `sopHeatmap` (Overview tab) and once for `sopHeatmapFull` (S&OP tab), two listeners attach. If the heatmap were ever re-rendered, they would multiply. Store the listener reference and call `removeEventListener` before adding, or use a single top-level resize handler.

**[LOW] Sticky tab bar has a CSS/JS class conflict**
The bar starts with `class="sticky-tab-bar hidden"` in HTML (hidden via `display:none`). But `stickyBar.classList.toggle('hidden', false)` in the IntersectionObserver callback (app.js:839) unconditionally removes `hidden` on first scroll. The bar then transitions in via `is-visible`. This means the bar briefly has `display:none` removed but `transform:translateY(-110%)` still applied — functionally invisible but participating in layout. Use `is-visible` as the sole visibility toggle and remove the `hidden` class from the initial HTML state, relying on the transform alone for the hidden state.

---

## Pillar 6 — Professionalism & Portfolio-Readiness · 3/4

### What works
- **Domain vocabulary is senior-level correct.** "Days of Supply", "Demand Attainment", "Fill Rate", "Inventory Turnover", "S&OP Cycle", "Forecast Variance" — a supply chain hiring manager will recognize immediately this was built by someone who has worked the process, not someone who Googled the terms.
- **KPI targets listed in sidebar** (≥85% FA, ≤45 DOS, ≥95% OTD) show system knowledge — these are real-world operational thresholds, not invented.
- **Fictional company "Metro Brew F&B Corp."** with believable SKUs (Espresso Dark Roast Blend, Barista Cleaning Tablets, Paper Cup Sleeves) grounds the demo without looking generic.
- **Data disclaimer** is clear and prominently placed — proactive about the "is this real data?" question recruiters will ask.
- **LinkedIn link** in sidebar with hover state — correct professional call-to-action.

### Issues to fix

**[CRITICAL] No personal introduction anywhere in the dashboard**
A recruiter landing on this URL for the first time sees a supply chain dashboard, but nothing that says *why Dither Reyes built it, what role it's meant to demonstrate, or what the recruiter should take away*. The disclaimer explains the data is fictional, but not the intent. Within 5 seconds of landing, a recruiter should be able to read: *"I built this to demonstrate the S&OP analytics and BI skills required for the Senior Supply Chain Analyst role. The dataset simulates a 12-month F&B cycle with forecast, inventory, and delivery KPIs."*

Add a short "About This Project" block — either a second sidebar panel or a banner at the top of the Overview tab. Two to three sentences maximum.

**[HIGH] "DRGS / Dither Reyes Global Solutions" branding may confuse recruiters**
The header reads "DRGS · Supply Chain" and the dashboard title reads "Dither Reyes Global Solutions". To a recruiter who received a link cold, this reads as a company portfolio page, not a personal portfolio. They may ask "is this a company Dither works for, or is this Dither?" Consider adding a brief "by Dither Reyes" attribution near the LinkedIn link or in the header subline.

**[MEDIUM] No contact path beyond LinkedIn**
The only recruiter action is the LinkedIn button. Consider adding an email link (already known: `d.reyes@allianceglobalsolutions.com`) or a mailto chip alongside LinkedIn. Recruiters often prefer email over LinkedIn connection requests.

**[LOW] The tab labels cover five operational domains but there's no "Executive Summary" or "Read Me First" orientation**
The Overview tab has a good selection of charts but starts immediately with charts — no 2–3 sentence framing of what the viewer is looking at. A portfolio reviewer who isn't a supply chain expert (HR, hiring coordinator) won't know where to start. Even a small paragraph above the KPI grid would help.

---

## Priority Fix List

| Priority | File | Change |
|---|---|---|
| P0 | `index.html` | Add "About This Project" panel — 2–3 sentences on the portfolio purpose and role fit |
| P0 | `index.html` / `style.css` | Add a "by Dither Reyes" attribution or make personal identity clearer vs. "DRGS" brand |
| P1 | `style.css:272` | Change KPI grid to `repeat(3, ...)` or `repeat(auto-fit, minmax(160px, 1fr))` for breathing room |
| P1 | `style.css:310–325` | Raise `.kpi-label`, `.eyebrow`, `.meta-label`, `.kpi-badge` floor to `0.70rem` |
| P1 | `app.js:825–827` | Add arrow-key keyboard navigation for the tab list |
| P2 | `app.js:711` | Store and remove the resize listener before re-adding in `renderHeatmap` |
| P2 | `index.html:373` | Remove `hidden` class from sticky tab bar; use transform-only for hide state |
| P2 | `index.html` | Add email link alongside LinkedIn in the sidebar brand panel |
| P3 | `index.html` / `app.js` | Remove duplicate logo (keep header only, or reduce sidebar to small wordmark) |
| P3 | `index.html:85–89` | Remove header meta chips — info already in sidebar, reduces clutter |

---

## What Will Impress Emerson's Recruiter Most

You've already done the hard part. The chart selection, the S&OP heatmap, the forecast miss root causes, and the domain vocabulary are all senior-level correct. The two things that will make or break the recruiter's first 15 seconds:

1. **They need to know who you are and why you built this.** Fix P0 first.
2. **The KPI numbers need to be scannable in one glance.** Fix the font sizes and KPI grid column count.

Everything else is polish. The dashboard already demonstrates what you know about supply chain. The fixes above ensure the recruiter *sees* that in the first 30 seconds — before they scroll or click a single tab.
