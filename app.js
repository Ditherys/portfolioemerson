/* ══════════════════════════════════════════════════════════════════════════════
   DRGS Supply Chain S&OP Dashboard — app.js
   Dither Reyes Global Solutions | Portfolio Demo
   All data is fictional and created solely to demonstrate supply chain analytics skills.
   ══════════════════════════════════════════════════════════════════════════════ */

// ── Chart.js global defaults ────────────────────────────────────────────────
Chart.defaults.font.family = "'Inter', system-ui, Arial, sans-serif";
Chart.defaults.font.size   = 12;
Chart.defaults.color       = '#94A3B8';
Chart.defaults.plugins.legend.position = 'bottom';
Chart.defaults.plugins.legend.labels.usePointStyle  = true;
Chart.defaults.plugins.legend.labels.pointStyleWidth = 10;
Chart.defaults.plugins.legend.labels.boxHeight = 8;
Chart.defaults.plugins.legend.labels.padding   = 16;

// ── Color palette (DR logo: navy #1B3A5C, blue #0B6FBF, teal #00A8D4) ──────
const C = {
  navy:     '#1B3A5C',
  blue:     '#0B6FBF',
  teal:     '#00A8D4',
  skyBlue:  '#5BAED6',
  slate:    '#8BBDD9',
  target:   '#E84040',
  success:  '#1E8B4F',
  warning:  '#D08730',
  danger:   '#C0392B',
};

const FAMILY_COLORS = {
  beverages:   C.blue,
  foodItems:   C.teal,
  packaging:   C.navy,
  consumables: C.slate,
};

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

// ── Simulated Data ───────────────────────────────────────────────────────────
const DATA = {
  // Forecast Accuracy (%) by product family, Jan–Dec 2024
  forecastAccuracy: {
    beverages:   [82.1, 79.4, 84.8, 87.2, 84.5, 87.9, 89.6, 86.3, 83.8, 87.7, 90.4, 88.9],
    foodItems:   [75.3, 78.1, 80.2, 82.4, 81.0, 84.1, 87.3, 85.2, 83.1, 85.8, 88.2, 90.1],
    packaging:   [88.4, 86.2, 89.1, 91.3, 90.2, 88.5, 92.1, 91.4, 89.3, 93.2, 92.4, 94.1],
    consumables: [70.2, 72.5, 75.1, 78.3, 77.4, 80.2, 82.1, 81.3, 79.6, 83.4, 85.2, 87.3],
    overall:     [79.0, 79.1, 82.3, 84.8, 83.3, 85.2, 87.8, 86.1, 84.0, 87.5, 89.1, 90.1],
  },

  // Days of Supply by family
  dos: {
    beverages:   [58.2, 62.1, 55.4, 51.8, 49.2, 46.5, 44.1, 45.8, 47.3, 44.2, 41.8, 40.3],
    foodItems:   [45.1, 48.3, 42.7, 40.5, 42.1, 39.8, 38.2, 40.1, 41.5, 39.2, 37.4, 36.1],
    packaging:   [38.2, 41.1, 36.5, 34.8, 36.2, 34.1, 32.5, 33.8, 35.1, 33.4, 31.8, 30.5],
    consumables: [65.3, 68.2, 62.1, 58.4, 60.2, 56.8, 54.1, 55.7, 57.3, 53.8, 51.2, 49.6],
    overall:     [51.7, 54.9, 49.2, 46.4, 46.9, 44.3, 42.2, 43.9, 45.3, 42.7, 40.6, 39.1],
  },

  // Demand plan vs actual shipments (units '000s)
  demand: {
    plan:   [3120, 2980, 3260, 2800, 2830, 2820, 2950, 3120, 3060, 2900, 2750, 2640],
    actual: [3050, 2880, 3180, 2765, 2795, 2835, 2968, 3088, 3028, 2912, 2762, 2618],
  },

  // On-time delivery (%)
  otd: [92.3, 90.8, 94.1, 95.4, 93.2, 96.1, 97.3, 95.8, 93.7, 96.4, 97.1, 97.8],

  // Fill rate (%)
  fillRate: [94.2, 93.8, 95.1, 96.3, 95.8, 97.1, 97.8, 97.2, 96.4, 97.5, 97.9, 98.1],

  // Open orders (count)
  openOrders: [1240, 1180, 1320, 1050, 1080, 980, 920, 1020, 1100, 950, 870, 820],

  // Inventory value ($M) by family
  invValue: {
    beverages:   [8.24, 7.85, 8.71, 7.28, 6.95, 6.48, 6.75, 7.28, 7.62, 7.15, 6.62, 6.28],
    foodItems:   [5.62, 5.43, 5.82, 5.03, 5.23, 5.36, 5.75, 5.95, 5.62, 5.43, 5.23, 5.03],
    packaging:   [4.11, 3.91, 4.23, 3.84, 4.03, 4.17, 4.30, 4.50, 4.23, 3.97, 3.84, 3.70],
    consumables: [2.51, 2.38, 2.65, 2.25, 2.38, 2.51, 2.58, 2.78, 2.65, 2.51, 2.38, 2.25],
  },

  // Inventory turnover (annualized) by family
  turnover: {
    beverages:   [5.2, 5.1, 5.8, 6.2, 6.4, 6.9, 7.2, 6.9, 6.5, 7.1, 7.5, 7.9],
    foodItems:   [6.8, 6.5, 7.1, 7.5, 7.2, 7.8, 8.1, 7.7, 7.3, 7.9, 8.3, 8.7],
    packaging:   [7.9, 7.6, 8.3, 8.9, 8.5, 9.1, 9.5, 9.0, 8.6, 9.2, 9.7,10.1],
    consumables: [3.8, 3.6, 4.1, 4.5, 4.2, 4.8, 5.1, 4.7, 4.4, 4.9, 5.3, 5.7],
    overall:     [5.9, 5.7, 6.3, 6.8, 6.6, 7.2, 7.5, 7.1, 6.7, 7.3, 7.7, 8.1],
  },

  // Shipment breakdown (count)
  shipmentStatus: {
    onTime: [2814, 2614, 2992, 2637, 2601, 2723, 2880, 2959, 2837, 2803, 2680, 2560],
    early:  [  78,   91,   60,   35,   55,   27,   19,   29,   61,   25,   15,    8],
    late:   [ 158,  175,  128,   93,  139,   85,   69,  100,  130,   84,   67,   50],
  },

  // S&OP Scorecard — metric × month
  sopScorecard: {
    'Forecast Accuracy %': {
      values: [79.0, 79.1, 82.3, 84.8, 83.3, 85.2, 87.8, 86.1, 84.0, 87.5, 89.1, 90.1],
      target: 85,  higherIsBetter: true,  suffix: '%',
    },
    'Days of Supply': {
      values: [51.7, 54.9, 49.2, 46.4, 46.9, 44.3, 42.2, 43.9, 45.3, 42.7, 40.6, 39.1],
      target: 45,  higherIsBetter: false, suffix: ' days',
    },
    'On-Time Delivery %': {
      values: [92.3, 90.8, 94.1, 95.4, 93.2, 96.1, 97.3, 95.8, 93.7, 96.4, 97.1, 97.8],
      target: 95,  higherIsBetter: true,  suffix: '%',
    },
    'Fill Rate %': {
      values: [94.2, 93.8, 95.1, 96.3, 95.8, 97.1, 97.8, 97.2, 96.4, 97.5, 97.9, 98.1],
      target: 95,  higherIsBetter: true,  suffix: '%',
    },
    'Demand Attainment %': {
      values: [97.8, 96.6, 97.5, 98.8, 98.7,100.5,100.6, 99.0, 99.0,100.4,100.4, 99.2],
      target: 98,  higherIsBetter: true,  suffix: '%',
    },
  },

  // Top 30 inventory SKUs
  top30: [
    { rank:1,  sku:'BEV-A001', desc:'Espresso Dark Roast Blend 1kg',          family:'Beverages',    dos:78.3, value:245000, units:3420, status:'At Risk',  action:'Reduce PO' },
    { rank:2,  sku:'BEV-A002', desc:'House Blend Medium Roast 500g',          family:'Beverages',    dos:65.1, value:198000, units:2180, status:'At Risk',  action:'Reduce PO' },
    { rank:3,  sku:'CSM-S010', desc:'Barista Cleaning Tablets 100pk',         family:'Consumables',  dos:71.4, value:187500, units:1840, status:'At Risk',  action:'Review DOS' },
    { rank:4,  sku:'FOD-X100', desc:'Egg White & Red Pepper Egg Bite 2-pk',   family:'Food Items',   dos:55.8, value:187000, units:1540, status:'Monitor',  action:'Review Forecast' },
    { rank:5,  sku:'BEV-B007', desc:'Oat Milk 1L Carton',                     family:'Beverages',    dos:48.2, value:156000, units:2890, status:'Monitor',  action:'Monitor Weekly' },
    { rank:6,  sku:'BEV-C015', desc:'Vanilla Syrup 750ml Bottle',             family:'Beverages',    dos:52.1, value:148000, units:2640, status:'Monitor',  action:'Monitor Weekly' },
    { rank:7,  sku:'PKG-G003', desc:'12oz Paper Cup Sleeve 50u',              family:'Packaging',    dos:42.3, value:134000, units:890,  status:'Normal',   action:'On Plan' },
    { rank:8,  sku:'FOD-X200', desc:'Club Sandwich Chilled Ready-to-Sell',    family:'Food Items',   dos:44.8, value:128000, units:1120, status:'Normal',   action:'On Plan' },
    { rank:9,  sku:'CSM-S088', desc:'Antibacterial Hand Soap 500ml',          family:'Consumables',  dos:61.5, value:121500, units:1340, status:'Monitor',  action:'Monitor Weekly' },
    { rank:10, sku:'PKG-H001', desc:'Hot Cup Lid 12oz Sleeve 50u',            family:'Packaging',    dos:39.8, value:118000, units:620,  status:'Normal',   action:'On Plan' },
    { rank:11, sku:'BEV-D020', desc:'Caramel Sauce Drizzle 1L',               family:'Beverages',    dos:45.2, value:112000, units:1780, status:'Normal',   action:'On Plan' },
    { rank:12, sku:'FOD-Y050', desc:'Chicken & Quinoa Protein Bowl Chilled',   family:'Food Items',   dos:50.4, value:108500, units:980,  status:'Monitor',  action:'Monitor Weekly' },
    { rank:13, sku:'BEV-E008', desc:'Hazelnut Syrup 750ml Bottle',            family:'Beverages',    dos:38.7, value:102000, units:3120, status:'Normal',   action:'On Plan' },
    { rank:14, sku:'PKG-K012', desc:'Cold Cup 24oz Sleeve 50u',               family:'Packaging',    dos:41.1, value:98400,  units:510,  status:'Normal',   action:'On Plan' },
    { rank:15, sku:'CSM-M030', desc:'Paper Straw Wrapped 500pk',              family:'Consumables',  dos:58.9, value:94200,  units:820,  status:'Monitor',  action:'Monitor Weekly' },
    { rank:16, sku:'BEV-F004', desc:'Cold Brew Concentrate 1L',               family:'Beverages',    dos:36.2, value:91000,  units:2450, status:'Normal',   action:'On Plan' },
    { rank:17, sku:'FOD-Z075', desc:'Smoked Ham & Swiss Panini Chilled',       family:'Food Items',   dos:47.3, value:87800,  units:760,  status:'Normal',   action:'On Plan' },
    { rank:18, sku:'BEV-G019', desc:'Matcha Powder Ceremonial Grade 1kg',     family:'Beverages',    dos:43.8, value:84600,  units:1920, status:'Normal',   action:'On Plan' },
    { rank:19, sku:'PKG-P002', desc:'Kraft Paper Bag Small 250pk',            family:'Packaging',    dos:35.4, value:81200,  units:340,  status:'Normal',   action:'On Plan' },
    { rank:20, sku:'CSM-V011', desc:'Barista Cloth Cleaning Wipes 200pk',     family:'Consumables',  dos:55.2, value:78900,  units:1100, status:'Monitor',  action:'Monitor Weekly' },
    { rank:21, sku:'BEV-H003', desc:'Dark Chocolate Mocha Sauce 1L',          family:'Beverages',    dos:40.5, value:76400,  units:2100, status:'Normal',   action:'On Plan' },
    { rank:22, sku:'FOD-W040', desc:'Cheese & Fruit Protein Box Chilled',      family:'Food Items',   dos:33.8, value:72100,  units:890,  status:'Normal',   action:'On Plan' },
    { rank:23, sku:'BEV-I006', desc:'Toffee Nut Syrup 750ml Bottle',          family:'Beverages',    dos:38.1, value:69800,  units:1680, status:'Normal',   action:'On Plan' },
    { rank:24, sku:'PKG-R005', desc:'Paper Carrier Bag Medium 500pk',         family:'Packaging',    dos:32.6, value:67300,  units:280,  status:'Normal',   action:'On Plan' },
    { rank:25, sku:'CSM-Q025', desc:'Espresso Machine Descaler Tabs 30pk',    family:'Consumables',  dos:49.7, value:64800,  units:740,  status:'Normal',   action:'On Plan' },
    { rank:26, sku:'BEV-J010', desc:'Coconut Milk 1L Carton',                 family:'Beverages',    dos:35.9, value:62200,  units:1820, status:'Normal',   action:'On Plan' },
    { rank:27, sku:'FOD-V065', desc:'Egg & Cheddar Breakfast Wrap Chilled',   family:'Food Items',   dos:42.4, value:59700,  units:620,  status:'Normal',   action:'On Plan' },
    { rank:28, sku:'BEV-K014', desc:'White Mocha Sauce 1L',                   family:'Beverages',    dos:33.2, value:57100,  units:1540, status:'Normal',   action:'On Plan' },
    { rank:29, sku:'PKG-T008', desc:'Hot Cup Sleeve Corrugated 500pk',        family:'Packaging',    dos:30.8, value:54900,  units:220,  status:'Normal',   action:'On Plan' },
    { rank:30, sku:'CSM-U018', desc:'Disposable Gloves L-Size 100pk',         family:'Consumables',  dos:44.6, value:52400,  units:680,  status:'Normal',   action:'On Plan' },
  ],

  // Top forecast misses
  forecastMisses: [
    { sku:'BEV-A002', desc:'House Blend Medium Roast 500g',       family:'Beverages',   month:'Nov', plan:3400, actual:2850, variance:-16.2, reason:'Promo Pull-forward' },
    { sku:'FOD-X200', desc:'Club Sandwich Chilled Ready-to-Sell', family:'Food Items',  month:'Sep', plan:1580, actual:1240, variance:-21.5, reason:'New Menu Launch Impact' },
    { sku:'BEV-C015', desc:'Vanilla Syrup 750ml Bottle',          family:'Beverages',   month:'Oct', plan:2420, actual:1980, variance:-18.2, reason:'Seasonal Demand Drop' },
    { sku:'PKG-G003', desc:'12oz Paper Cup Sleeve 50u',           family:'Packaging',   month:'Aug', plan:950,  actual:820,  variance:-13.7, reason:'Store Expansion Delay' },
    { sku:'CSM-S088', desc:'Antibacterial Hand Soap 500ml',       family:'Consumables', month:'Dec', plan:1820, actual:1540, variance:-15.4, reason:'Supplier Delivery Delay' },
    { sku:'FOD-X100', desc:'Egg White & Red Pepper Egg Bite 2-pk', family:'Food Items',  month:'Nov', plan:1050, actual:890,  variance:-15.2, reason:'Online Order Surge' },
    { sku:'BEV-B007', desc:'Oat Milk 1L Carton',                  family:'Beverages',   month:'Dec', plan:3480, actual:3120, variance:-10.3, reason:'Holiday Promo Underperformance' },
    { sku:'PKG-H001', desc:'Hot Cup Lid 12oz Sleeve 50u',         family:'Packaging',   month:'Jul', plan:710,  actual:640,  variance: -9.9, reason:'Seasonal Slowdown' },
  ],
};

// ── Utility helpers ──────────────────────────────────────────────────────────
const last = (arr) => arr[arr.length - 1];
const prev = (arr) => arr[arr.length - 2];
const avg  = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
const fmt  = (n, d = 1) => n.toFixed(d);
const fmtCurrency = (n) => n >= 1000 ? `$${(n / 1000).toFixed(0)}K` : `$${n}`;

function deltaLabel(cur, prv, higherIsBetter = true) {
  const diff = cur - prv;
  const pct  = Math.abs(diff / prv * 100);
  const dir  = diff >= 0 ? 'up' : 'down';
  const goodDir = higherIsBetter ? 'up' : 'down';
  const arrow   = diff >= 0 ? '▲' : '▼';
  return { text: `${arrow} ${fmt(pct, 1)}%`, dir, isGood: dir === goodDir };
}

function statusClass(value, target, higherIsBetter, tolerance = 0.05) {
  const ratio = value / target;
  if (higherIsBetter) {
    if (ratio >= 1) return 'success';
    if (ratio >= 1 - tolerance) return 'warning';
    return 'danger';
  } else {
    if (ratio <= 1) return 'success';
    if (ratio <= 1 + tolerance) return 'warning';
    return 'danger';
  }
}

function heatClass(value, target, higherIsBetter, tolerance = 0.05) {
  const cls = statusClass(value, target, higherIsBetter, tolerance);
  return `heat-${cls}`;
}

// ── Chart registry (so we can destroy on tab re-render) ─────────────────────
const charts = {};

function mkChart(id, config) {
  if (charts[id]) { charts[id].destroy(); }
  const ctx = document.getElementById(id);
  if (!ctx) return;
  charts[id] = new Chart(ctx, config);
  return charts[id];
}

// ── Shared chart options ─────────────────────────────────────────────────────
const TOOLTIP_OPTS = {
  backgroundColor: 'rgba(27, 58, 92, 0.93)',
  titleColor: '#fff',
  bodyColor: 'rgba(255,255,255,.85)',
  borderColor: 'rgba(255,255,255,.1)',
  borderWidth: 1,
  padding: 10,
  cornerRadius: 8,
};

function lineDefaults(yLabel = '', yMin, yMax, targetValue) {
  const plugins = { tooltip: TOOLTIP_OPTS, legend: { display: true } };
  if (targetValue !== undefined) {
    plugins.annotation = {
      annotations: {
        target: {
          type: 'line', yMin: targetValue, yMax: targetValue,
          borderColor: C.target, borderWidth: 2, borderDash: [6, 4],
          label: { content: `Target: ${targetValue}`, enabled: true,
            backgroundColor: C.target, color: '#fff', font: { size: 10, weight: 'bold' }, padding: 4 },
        },
      },
    };
  }
  return {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    scales: {
      x: { grid: { color: 'rgba(11,111,191,.06)' }, ticks: { font: { size: 11 } } },
      y: {
        grid: { color: 'rgba(11,111,191,.06)' },
        ticks: { font: { size: 11 } },
        title: { display: !!yLabel, text: yLabel, font: { size: 11 }, color: '#5A7A90' },
        ...(yMin !== undefined ? { min: yMin } : {}),
        ...(yMax !== undefined ? { max: yMax } : {}),
      },
    },
    plugins,
    elements: { line: { tension: 0.35 }, point: { radius: 4, hoverRadius: 6 } },
  };
}

// ── KPI Cards ────────────────────────────────────────────────────────────────
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
      targetText: 'target ≥ 85%',
      barPct: Math.min(curFA, 100),
      ...deltaLabel(curFA, prvFA, true),
      status: statusClass(curFA, 85, true),
    },
    {
      label: 'Days of Supply', value: `${fmt(curDOS)}`,
      targetText: 'target ≤ 45 days',
      barPct: Math.min(Math.round(45 / curDOS * 100), 100),
      ...deltaLabel(curDOS, prvDOS, false),
      status: statusClass(curDOS, 45, false),
    },
    {
      label: 'On-Time Delivery', value: `${fmt(curOTD)}%`,
      targetText: 'target ≥ 95%',
      barPct: Math.min(curOTD, 100),
      ...deltaLabel(curOTD, prvOTD, true),
      status: statusClass(curOTD, 95, true),
    },
    {
      label: 'Fill Rate', value: `${fmt(curFR)}%`,
      targetText: 'target ≥ 95%',
      barPct: Math.min(curFR, 100),
      ...deltaLabel(curFR, prvFR, true),
      status: statusClass(curFR, 95, true),
    },
    {
      label: 'Inv. Turnover', value: `${fmt(curTO)}×`,
      targetText: 'target ≥ 6.0×',
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

// ── Forecast KPI cards (Forecast tab) ───────────────────────────────────────
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

// ── Overview Charts ──────────────────────────────────────────────────────────
function initOverviewCharts() {
  // 1. Forecast Accuracy Trend — multi-line
  mkChart('faOverviewChart', {
    type: 'line',
    data: {
      labels: MONTHS,
      datasets: [
        { label: 'Beverages',   data: DATA.forecastAccuracy.beverages,   borderColor: FAMILY_COLORS.beverages,   backgroundColor: FAMILY_COLORS.beverages   + '18', borderWidth: 2.5, fill: false },
        { label: 'Food Items',  data: DATA.forecastAccuracy.foodItems,   borderColor: FAMILY_COLORS.foodItems,   backgroundColor: FAMILY_COLORS.foodItems   + '18', borderWidth: 2.5, fill: false },
        { label: 'Packaging',   data: DATA.forecastAccuracy.packaging,   borderColor: FAMILY_COLORS.packaging,   backgroundColor: FAMILY_COLORS.packaging   + '18', borderWidth: 2.5, fill: false },
        { label: 'Consumables', data: DATA.forecastAccuracy.consumables, borderColor: FAMILY_COLORS.consumables, backgroundColor: FAMILY_COLORS.consumables + '18', borderWidth: 2.5, fill: false },
        { label: 'Overall',    data: DATA.forecastAccuracy.overall,     borderColor: C.navy,                   backgroundColor: C.navy + '10',                  borderWidth: 3,   fill: false, borderDash: [6,3] },
        { label: 'Target (85%)', data: Array(12).fill(85), borderColor: C.target, borderWidth: 2, borderDash: [5,5], pointRadius: 0, fill: false },
      ],
    },
    options: lineDefaults('Forecast Accuracy (%)', 65, 100),
  });

  // 2. Demand vs Actual
  mkChart('demandActualChart', {
    type: 'bar',
    data: {
      labels: MONTHS,
      datasets: [
        { label: 'Demand Plan',      data: DATA.demand.plan,   backgroundColor: C.blue + 'BB', borderRadius: 4 },
        { label: 'Actual Shipments', data: DATA.demand.actual, backgroundColor: C.teal + 'BB', borderRadius: 4 },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      scales: {
        x: { grid: { display: false } },
        y: { grid: { color: 'rgba(11,111,191,.06)' }, title: { display: true, text: "Units ('000s)", font: { size: 11 } }, min: 2600 },
      },
      plugins: { tooltip: TOOLTIP_OPTS, legend: { display: true } },
    },
  });

  // 3. OTD & Fill Rate
  mkChart('otdFillChart', {
    type: 'line',
    data: {
      labels: MONTHS,
      datasets: [
        { label: 'On-Time Delivery %', data: DATA.otd,      borderColor: C.blue, backgroundColor: C.blue + '15', borderWidth: 2.5, fill: true },
        { label: 'Fill Rate %',        data: DATA.fillRate, borderColor: C.teal, backgroundColor: C.teal + '15', borderWidth: 2.5, fill: true },
        { label: 'Target (95%)', data: Array(12).fill(95), borderColor: C.target, borderWidth: 2, borderDash: [5,5], pointRadius: 0, fill: false },
      ],
    },
    options: lineDefaults('Rate (%)', 88, 100),
  });

  // 4. S&OP Heatmap (overview)
  renderHeatmap('sopHeatmap');
}

// ── Inventory Charts ─────────────────────────────────────────────────────────
function initInventoryCharts() {
  // DOS by family
  mkChart('dosChart', {
    type: 'line',
    data: {
      labels: MONTHS,
      datasets: [
        { label: 'Beverages',   data: DATA.dos.beverages,   borderColor: FAMILY_COLORS.beverages,   fill: false, borderWidth: 2.5 },
        { label: 'Food Items',  data: DATA.dos.foodItems,   borderColor: FAMILY_COLORS.foodItems,   fill: false, borderWidth: 2.5 },
        { label: 'Packaging',   data: DATA.dos.packaging,   borderColor: FAMILY_COLORS.packaging,   fill: false, borderWidth: 2.5 },
        { label: 'Consumables', data: DATA.dos.consumables, borderColor: FAMILY_COLORS.consumables, fill: false, borderWidth: 2.5 },
        { label: 'Target (45 days)', data: Array(12).fill(45), borderColor: C.target, borderWidth: 2, borderDash: [5,5], pointRadius: 0, fill: false },
      ],
    },
    options: lineDefaults('Days of Supply', 20, 75),
  });

  // Inventory Value stacked bar
  mkChart('invValueChart', {
    type: 'bar',
    data: {
      labels: MONTHS,
      datasets: [
        { label: 'Beverages',   data: DATA.invValue.beverages,   backgroundColor: FAMILY_COLORS.beverages   + 'CC', stack: 'inv', borderRadius: { topLeft:0, topRight:0, bottomLeft:3, bottomRight:3 } },
        { label: 'Food Items',  data: DATA.invValue.foodItems,   backgroundColor: FAMILY_COLORS.foodItems   + 'CC', stack: 'inv' },
        { label: 'Packaging',   data: DATA.invValue.packaging,   backgroundColor: FAMILY_COLORS.packaging   + 'CC', stack: 'inv' },
        { label: 'Consumables', data: DATA.invValue.consumables, backgroundColor: FAMILY_COLORS.consumables + 'CC', stack: 'inv', borderRadius: { topLeft:4, topRight:4, bottomLeft:0, bottomRight:0 } },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      scales: {
        x: { stacked: true, grid: { display: false } },
        y: { stacked: true, grid: { color: 'rgba(11,111,191,.06)' }, title: { display: true, text: 'Inventory Value ($M)', font: { size: 11 } } },
      },
      plugins: { tooltip: TOOLTIP_OPTS, legend: { display: true } },
    },
  });

  // Top 30 table
  renderTop30Table();
}

// ── Forecast Charts ──────────────────────────────────────────────────────────
function initForecastCharts() {
  renderForecastKpiCards();

  // FA by family trend
  mkChart('faFamilyChart', {
    type: 'line',
    data: {
      labels: MONTHS,
      datasets: [
        { label: 'Beverages',   data: DATA.forecastAccuracy.beverages,   borderColor: FAMILY_COLORS.beverages,   fill: false, borderWidth: 2.5 },
        { label: 'Food Items',  data: DATA.forecastAccuracy.foodItems,   borderColor: FAMILY_COLORS.foodItems,   fill: false, borderWidth: 2.5 },
        { label: 'Packaging',   data: DATA.forecastAccuracy.packaging,   borderColor: FAMILY_COLORS.packaging,   fill: false, borderWidth: 2.5 },
        { label: 'Consumables', data: DATA.forecastAccuracy.consumables, borderColor: FAMILY_COLORS.consumables, fill: false, borderWidth: 2.5 },
        { label: 'Target (85%)', data: Array(12).fill(85), borderColor: C.target, borderWidth: 2, borderDash: [5,5], pointRadius: 0, fill: false },
      ],
    },
    options: lineDefaults('Forecast Accuracy (%)', 65, 100),
  });

  // FA current month bar
  const decValues = [
    last(DATA.forecastAccuracy.beverages),
    last(DATA.forecastAccuracy.foodItems),
    last(DATA.forecastAccuracy.packaging),
    last(DATA.forecastAccuracy.consumables),
  ];
  const barColors = decValues.map(v => v >= 85 ? C.teal + 'CC' : v >= 80.75 ? '#F5A623CC' : C.danger + 'CC');

  mkChart('faCurrentChart', {
    type: 'bar',
    data: {
      labels: ['Beverages', 'Food Items', 'Packaging', 'Consumables'],
      datasets: [
        { label: 'Dec FA (%)', data: decValues, backgroundColor: barColors, borderRadius: 6, borderSkipped: false },
        { label: 'Target (85%)', data: [85, 85, 85, 85], borderColor: C.target, borderWidth: 2, borderDash: [5,5], type: 'line', pointRadius: 0 },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { grid: { display: false } },
        y: { min: 70, max: 100, grid: { color: 'rgba(11,111,191,.06)' }, title: { display: true, text: 'Forecast Accuracy (%)', font: { size: 11 } } },
      },
      plugins: { tooltip: TOOLTIP_OPTS, legend: { display: true } },
    },
  });

  // Forecast Misses table
  renderForecastMissTable();
}

// ── S&OP Charts ──────────────────────────────────────────────────────────────
function initSopCharts() {
  // Demand attainment — grouped bar + variance line
  const variance = DATA.demand.actual.map((a, i) => +((a / DATA.demand.plan[i] * 100 - 100).toFixed(1)));

  mkChart('sopDemandChart', {
    type: 'bar',
    data: {
      labels: MONTHS,
      datasets: [
        { label: 'Demand Plan',      data: DATA.demand.plan,   backgroundColor: C.navy + '99', borderRadius: 4, yAxisID: 'y' },
        { label: 'Actual Shipments', data: DATA.demand.actual, backgroundColor: C.teal + '99', borderRadius: 4, yAxisID: 'y' },
        { label: 'Attainment Variance %', data: variance, type: 'line', borderColor: C.warning, backgroundColor: C.warning + '20', borderWidth: 2.5, yAxisID: 'y2', fill: false, pointRadius: 5 },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      scales: {
        x: { grid: { display: false } },
        y:  { min: 2600, grid: { color: 'rgba(11,111,191,.06)' }, title: { display: true, text: "Units ('000s)", font: { size: 11 } } },
        y2: { position: 'right', min: -5, max: 5, grid: { display: false }, title: { display: true, text: 'Variance %', font: { size: 11 } },
              ticks: { callback: (v) => `${v > 0 ? '+' : ''}${v}%` } },
      },
      plugins: { tooltip: TOOLTIP_OPTS, legend: { display: true } },
    },
  });

  // DOS trend (overall)
  mkChart('sopDosChart', {
    type: 'line',
    data: {
      labels: MONTHS,
      datasets: [
        { label: 'Overall DOS', data: DATA.dos.overall, borderColor: C.blue, backgroundColor: C.blue + '18', fill: true, borderWidth: 3 },
        { label: 'Target (45 days)', data: Array(12).fill(45), borderColor: C.target, borderWidth: 2, borderDash: [5,5], pointRadius: 0, fill: false },
      ],
    },
    options: lineDefaults('Days of Supply', 35, 60),
  });

  // Turnover by family
  mkChart('turnoverChart', {
    type: 'line',
    data: {
      labels: MONTHS,
      datasets: [
        { label: 'Beverages',   data: DATA.turnover.beverages,   borderColor: FAMILY_COLORS.beverages,   fill: false, borderWidth: 2.5 },
        { label: 'Food Items',  data: DATA.turnover.foodItems,   borderColor: FAMILY_COLORS.foodItems,   fill: false, borderWidth: 2.5 },
        { label: 'Packaging',   data: DATA.turnover.packaging,   borderColor: FAMILY_COLORS.packaging,   fill: false, borderWidth: 2.5 },
        { label: 'Consumables', data: DATA.turnover.consumables, borderColor: FAMILY_COLORS.consumables, fill: false, borderWidth: 2.5 },
        { label: 'Target (6.0×)', data: Array(12).fill(6), borderColor: C.target, borderWidth: 2, borderDash: [5,5], pointRadius: 0, fill: false },
      ],
    },
    options: lineDefaults('Turnover (×)', 2, 12),
  });

  // Full S&OP heatmap
  renderHeatmap('sopHeatmapFull');
}

// ── Shipments Charts ─────────────────────────────────────────────────────────
function initShipmentsCharts() {
  // OTD trend
  mkChart('otdChart', {
    type: 'line',
    data: {
      labels: MONTHS,
      datasets: [
        { label: 'On-Time Delivery %', data: DATA.otd, borderColor: C.blue, backgroundColor: C.blue + '18', fill: true, borderWidth: 3 },
        { label: 'Target (95%)', data: Array(12).fill(95), borderColor: C.target, borderWidth: 2, borderDash: [5,5], pointRadius: 0, fill: false },
      ],
    },
    options: lineDefaults('OTD (%)', 88, 100),
  });

  // Fill rate trend
  mkChart('fillRateChart', {
    type: 'line',
    data: {
      labels: MONTHS,
      datasets: [
        { label: 'Fill Rate %', data: DATA.fillRate, borderColor: C.teal, backgroundColor: C.teal + '18', fill: true, borderWidth: 3 },
        { label: 'Target (95%)', data: Array(12).fill(95), borderColor: C.target, borderWidth: 2, borderDash: [5,5], pointRadius: 0, fill: false },
      ],
    },
    options: lineDefaults('Fill Rate (%)', 92, 100),
  });

  // Open orders bar
  mkChart('openOrdersChart', {
    type: 'bar',
    data: {
      labels: MONTHS,
      datasets: [
        { label: 'Open Orders', data: DATA.openOrders, backgroundColor: MONTHS.map((_, i) => i === 11 ? C.navy + 'EE' : C.skyBlue + 'BB'), borderRadius: 5 },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { grid: { display: false } },
        y: { min: 700, grid: { color: 'rgba(11,111,191,.06)' }, title: { display: true, text: 'Open Orders (count)', font: { size: 11 } } },
      },
      plugins: { tooltip: TOOLTIP_OPTS, legend: { display: false } },
    },
  });

  // Shipment status donut (Dec)
  const decOnTime = last(DATA.shipmentStatus.onTime);
  const decEarly  = last(DATA.shipmentStatus.early);
  const decLate   = last(DATA.shipmentStatus.late);
  mkChart('shipmentStatusChart', {
    type: 'doughnut',
    data: {
      labels: ['On-Time', 'Early', 'Late'],
      datasets: [{
        data: [decOnTime, decEarly, decLate],
        backgroundColor: [C.teal + 'DD', C.blue + 'DD', C.danger + 'DD'],
        borderWidth: 2,
        borderColor: '#fff',
        hoverOffset: 8,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '65%',
      plugins: {
        tooltip: {
          ...TOOLTIP_OPTS,
          callbacks: {
            label: (ctx) => {
              const total = decOnTime + decEarly + decLate;
              const pct   = (ctx.parsed / total * 100).toFixed(1);
              return ` ${ctx.label}: ${ctx.parsed.toLocaleString()} (${pct}%)`;
            },
          },
        },
        legend: { display: true },
      },
    },
  });
}

// ── S&OP Heatmap renderer ────────────────────────────────────────────────────
const _heatmapResizeListeners = {};

function renderHeatmap(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;

  const metrics = Object.keys(DATA.sopScorecard);
  const cols    = MONTHS.length;

  let gridHtml = `<div class="heatmap-grid" style="grid-template-columns: var(--hm-label, 175px) repeat(${cols}, minmax(38px, 1fr))">`;

  // Header row
  gridHtml += `<div class="heatmap-corner"></div>`;
  MONTHS.forEach(m => { gridHtml += `<div class="heatmap-col-label">${m}</div>`; });

  // Data rows
  metrics.forEach(metric => {
    const cfg = DATA.sopScorecard[metric];
    gridHtml += `<div class="heatmap-row-label">${metric}</div>`;
    cfg.values.forEach(v => {
      const cls  = heatClass(v, cfg.target, cfg.higherIsBetter);
      const disp = `${fmt(v)}${cfg.suffix}`;
      gridHtml += `<div class="heatmap-cell ${cls}" title="${metric}: ${disp}">${disp}</div>`;
    });
  });

  gridHtml += `</div>`;

  el.innerHTML = `
    <div class="heatmap-scroll-box">
      ${gridHtml}
      <div class="heatmap-fade-right"></div>
    </div>
    <div class="heatmap-legend">
      <span class="heatmap-legend-chip heat-success">At / Above Target</span>
      <span class="heatmap-legend-chip heat-warning">Within 5% of Target</span>
      <span class="heatmap-legend-chip heat-danger">Below Target</span>
    </div>
    <p class="heatmap-scroll-hint">← swipe to see all 12 months →</p>
  `;

  const scrollBox = el.querySelector('.heatmap-scroll-box');
  const fade      = el.querySelector('.heatmap-fade-right');
  const hint      = el.querySelector('.heatmap-scroll-hint');

  const updateFade = () => {
    const grid = scrollBox.querySelector('.heatmap-grid');
    if (grid) fade.style.height = grid.offsetHeight + 'px';
    const needsScroll = scrollBox.scrollWidth > scrollBox.clientWidth + 6;
    fade.style.display = needsScroll ? 'block' : 'none';
    if (hint) hint.style.display = needsScroll ? 'block' : 'none';
  };

  updateFade();
  if (_heatmapResizeListeners[containerId]) {
    window.removeEventListener('resize', _heatmapResizeListeners[containerId]);
  }
  _heatmapResizeListeners[containerId] = updateFade;
  window.addEventListener('resize', updateFade, { passive: true });

  scrollBox.addEventListener('scroll', () => {
    const atEnd = scrollBox.scrollLeft + scrollBox.clientWidth >= scrollBox.scrollWidth - 6;
    fade.style.opacity = atEnd ? '0' : '1';
  }, { passive: true });
}

// ── Top 30 Table ─────────────────────────────────────────────────────────────
function renderTop30Table() {
  const tbody = document.getElementById('top30Body');
  if (!tbody) return;

  tbody.innerHTML = DATA.top30.map(r => {
    const badgeClass = r.status === 'At Risk' ? 'badge-risk' : r.status === 'Monitor' ? 'badge-monitor' : 'badge-normal';
    const dosColor   = r.dos > 60 ? 'color:var(--danger-text);font-weight:700' : r.dos > 45 ? 'color:var(--warning-text);font-weight:700' : '';
    return `
      <tr>
        <td>${r.rank}</td>
        <td><code style="font-size:.78rem;background:var(--surface-soft);padding:.1rem .35rem;border-radius:4px">${r.sku}</code></td>
        <td>${r.desc}</td>
        <td>${r.family}</td>
        <td style="${dosColor}">${fmt(r.dos)}</td>
        <td>${fmtCurrency(r.value)}</td>
        <td>${r.units.toLocaleString()}</td>
        <td><span class="status-badge ${badgeClass}">${r.status}</span></td>
        <td>${r.action}</td>
      </tr>
    `;
  }).join('');
}

// ── Forecast Misses Table ────────────────────────────────────────────────────
function renderForecastMissTable() {
  const tbody = document.getElementById('forecastMissBody');
  if (!tbody) return;

  tbody.innerHTML = DATA.forecastMisses.map(r => {
    const varClass = r.variance < 0 ? 'variance-neg' : 'variance-pos';
    const varLabel = `${r.variance > 0 ? '+' : ''}${fmt(r.variance)}%`;
    return `
      <tr>
        <td><code style="font-size:.78rem;background:var(--surface-soft);padding:.1rem .35rem;border-radius:4px">${r.sku}</code></td>
        <td>${r.desc}</td>
        <td>${r.family}</td>
        <td>${r.month}</td>
        <td>${r.plan.toLocaleString()}</td>
        <td>${r.actual.toLocaleString()}</td>
        <td class="${varClass}">${varLabel}</td>
        <td>${r.reason}</td>
      </tr>
    `;
  }).join('');
}

// ── CSV Export ───────────────────────────────────────────────────────────────
function exportCsv(filename, headers, rows) {
  const csv  = [headers, ...rows].map(r => r.map(cell => `"${String(cell).replace(/"/g,'""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const a    = Object.assign(document.createElement('a'), { href: URL.createObjectURL(blob), download: filename });
  a.click();
}

document.addEventListener('click', (e) => {
  if (e.target.id === 'exportTop30') {
    exportCsv('top30_inventory.csv',
      ['Rank','SKU','Description','Family','DOS (days)','Inventory Value','Units OH','Status','Recommended Action'],
      DATA.top30.map(r => [r.rank, r.sku, r.desc, r.family, r.dos, r.value, r.units, r.status, r.action])
    );
  }
  if (e.target.id === 'exportMisses') {
    exportCsv('forecast_misses.csv',
      ['SKU','Description','Family','Month','Plan (units)','Actual (units)','Variance %','Root Cause'],
      DATA.forecastMisses.map(r => [r.sku, r.desc, r.family, r.month, r.plan, r.actual, r.variance, r.reason])
    );
  }
});

// ── Keyboard navigation for tab list ────────────────────────────────────────
(function () {
  const tabList = document.querySelector('.tab-nav[role="tablist"]');
  if (!tabList) return;
  tabList.addEventListener('keydown', (e) => {
    const tabs = [...tabList.querySelectorAll('.tab-btn')];
    const cur  = tabs.findIndex(t => t.getAttribute('aria-selected') === 'true');
    let next   = -1;
    if (e.key === 'ArrowRight') next = (cur + 1) % tabs.length;
    if (e.key === 'ArrowLeft')  next = (cur - 1 + tabs.length) % tabs.length;
    if (e.key === 'Home')       next = 0;
    if (e.key === 'End')        next = tabs.length - 1;
    if (next >= 0) {
      e.preventDefault();
      switchTab(tabs[next].dataset.tab);
      tabs[next].focus();
    }
  });
})();

// ── Tab Switching ────────────────────────────────────────────────────────────
const TAB_INIT = {
  overview:  initOverviewCharts,
  inventory: initInventoryCharts,
  forecast:  initForecastCharts,
  sop:       initSopCharts,
  shipments: initShipmentsCharts,
};

const initialised = new Set();

function switchTab(tabId) {
  // Update primary tab buttons
  document.querySelectorAll('.tab-btn').forEach(b => {
    const active = b.dataset.tab === tabId;
    b.classList.toggle('is-active', active);
    b.setAttribute('aria-selected', active);
  });

  // Update sticky tab buttons
  document.querySelectorAll('.sticky-tab').forEach(b => {
    b.classList.toggle('is-active', b.dataset.stickyTab === tabId);
  });

  // Show/hide panes
  document.querySelectorAll('.tab-pane').forEach(p => {
    p.classList.toggle('hidden', p.id !== `tab-${tabId}`);
  });

  // Init charts for this tab (once only)
  if (!initialised.has(tabId)) {
    initialised.add(tabId);
    TAB_INIT[tabId]?.();
  }
}

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});

document.querySelectorAll('.sticky-tab').forEach(btn => {
  btn.addEventListener('click', () => { switchTab(btn.dataset.stickyTab); window.scrollTo({ top: 0, behavior: 'smooth' }); });
});

// ── Sticky tab bar scroll behaviour ─────────────────────────────────────────
const stickyBar = document.getElementById('stickyTabBar');
const pageHeader = document.querySelector('.page-header');

const headerObserver = new IntersectionObserver(entries => {
  stickyBar.classList.toggle('is-visible', !entries[0].isIntersecting);
}, { threshold: 0 });

if (pageHeader) headerObserver.observe(pageHeader);

// ── Initialise ───────────────────────────────────────────────────────────────
function init() {
  renderKpiCards();
  switchTab('overview'); // also inits overview charts
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
