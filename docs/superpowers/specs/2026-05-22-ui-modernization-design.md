# UI Modernization Design Spec
**Date:** 2026-05-22  
**Project:** DRGS Supply Chain S&OP Portfolio Dashboard  
**Goal:** Replace the vibecoded sidebar layout with a clean, modern, recruiter-ready full-width dashboard.

---

## Decisions Made

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Visual direction | Clean Corporate | White space, crisp borders — enterprise-grade, high trust |
| Layout | Full-width, no sidebar | Charts get more space; all 6 KPIs visible at once; looks like a real BI tool |
| KPI card style | Progress bar + delta | Most data-rich; shows analytical thinking ("+2.4pp vs target") |
| Chart types | No changes | All 14 charts already use correct types for their data |

---

## Layout Changes

### Remove
- `<aside class="sidebar">` and all sidebar panels (brand, disclaimer, KPI targets, data period)
- Standalone `.about-banner` div
- Duplicate logo in header (only keep in header)
- `app-shell` two-column grid

### Add
- Full-width navy header: logo + title + badge chips (FY 2024, Simulated Data) + about sub-strip + tabs flush to bottom edge
- KPI cards redesigned with progress bar fill + delta value + target text
- Disclaimer integrated as a subtle footer note on the page

### Keep
- All 5 tab panes and their chart/table content (unchanged structure)
- Sticky tab bar (restyled to match new header)
- CSV export buttons
- Heatmap, Top 30 table, Forecast Miss table

---

## Design Tokens (updated)

```css
--radius: 12px          /* was 10px */
--radius-sm: 8px        /* was 6px */
--shadow: 0 2px 8px rgba(0,0,0,.06)     /* lighter, cleaner */
--shadow-md: 0 8px 24px rgba(27,58,92,.12)
/* Spacing scale: 8 / 12 / 16 / 20 / 24px — no more .9rem / .75rem inconsistency */
```

---

## KPI Card Template

```
[ LABEL (9.5px uppercase) ]
[ VALUE  (24px, 800 weight) ]
[ target text (9px muted) ]  [ delta (+2.4pp, colored) ]
[ ████████░░ progress bar (4px, brand gradient) ]
```

Status color applied to delta text and bar fill only — not the card border.

---

## Header Structure

```
┌─────────────────────────────────────────────────────────┐  ← navy #1B3A5C bg
│  [DR]  Supply Chain Analytics · Portfolio · Dither Reyes │
│        S&OP Performance Dashboard          [FY 2024] [▸] │
│─────────────────────────────────────────────────────────│  ← sub-strip, 80% opacity
│  Dither Reyes — Supply chain professional demonstrating… │
├─────────────────────────────────────────────────────────┤  ← tab row, no bg
│  Overview   Inventory   Forecast   S&OP   Shipments      │
└─────────────────────────────────────────────────────────┘
   tabs are white on active, ghost on inactive, sit flush at bottom
```

---

## Files Changed

| File | Scope |
|------|-------|
| `style.css` | Full rewrite of layout, tokens, header, KPI cards, cards, spacing |
| `index.html` | Remove sidebar, restructure header, update KPI card slots |
| `app.js` | Update KPI card render function (progress bar + delta HTML); update Chart.js font sizes |

---

## Out of Scope
- Chart type changes (all current types are correct)
- Data changes
- New features or tabs
- Mobile breakpoints (keep existing responsive rules, update to match new layout)
