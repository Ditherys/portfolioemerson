# Dashboard Interview Guide
## DRGS Supply Chain S&OP Dashboard — Dither Reyes

---

## PART 1: GLOSSARY — What Every Abbreviation Means

| Abbreviation | Full Name | Simple Meaning |
|---|---|---|
| **S&OP** | Sales & Operations Planning | A monthly meeting/process where the company aligns how much they expect to sell (demand) with how much they can make/ship (supply). Think of it as a coordination meeting between sales, finance, and operations. |
| **KPI** | Key Performance Indicator | A number used to measure if the business is doing well or not. Like a scoreboard. |
| **FA** | Forecast Accuracy | How close the predicted sales number was to what actually sold. If you predicted 1,000 units but sold 900, your accuracy is 90%. |
| **DOS** | Days of Supply | How many days the current inventory will last based on current demand. If you have 4,500 units and sell 100/day, DOS = 45 days. High DOS means too much stock. Low DOS means risk of running out. |
| **OTD** | On-Time Delivery | The percentage of customer orders delivered on or before the promised date. |
| **SKU** | Stock Keeping Unit | A unique code for each individual product. Like a product ID. BEV-A001 is one SKU, FOD-X100 is another. |
| **PO** | Purchase Order | The official order sent to a supplier to buy more stock. |
| **OH** | On Hand | The quantity currently sitting in the warehouse. |
| **FY** | Fiscal Year | The company's 12-month financial period (in this dashboard, January–December 2024). |
| **BI** | Business Intelligence | Using data and dashboards to help make business decisions. |
| **Fill Rate** | (no abbreviation) | The percentage of customer orders fully fulfilled from stock on hand. If 100 orders come in and 97 are completely filled, fill rate is 97%. |
| **Inventory Turnover** | (no abbreviation) | How many times inventory is sold and replaced in a year. If turnover is 6×, you sell through your entire stock 6 times a year. Higher = leaner, more efficient. |
| **Demand Attainment** | (no abbreviation) | How much of the planned demand you actually shipped. 98.8% means you shipped 98.8% of what was planned. |
| **Variance** | (no abbreviation) | The gap between what was planned and what actually happened. Negative variance means actual was less than planned. |
| **Root Cause** | (no abbreviation) | The real reason something went wrong. For forecast misses, examples are "Promo Pull-forward" (customers bought earlier than expected) or "Competition Launch" (a competitor released a new product). |

---

## PART 2: THE DASHBOARD — FULL EXPLANATION

### What Is This Dashboard?

This is a **Supply Chain S&OP Performance Dashboard** covering **January to December 2024**. It tracks 5 major areas of supply chain health across **4 product families** (Beverages, Food Items, Packaging, Consumables):

1. **How accurately demand was forecasted** (Forecast tab)
2. **How healthy inventory levels were** (Inventory tab)
3. **How well demand and supply were aligned** (S&OP tab)
4. **How reliably products were delivered** (Shipments tab)
5. **An overview of all KPIs** (Overview tab)

The goal of the dashboard is to give supply chain managers and business leaders a single place to see **where the business is performing well and where action is needed**.

---

### OVERVIEW TAB

**The 6 KPI Cards at the top are the headline numbers for December 2024 (the latest month):**

| KPI | Dec 2024 Value | Target | Status | What it tells you |
|---|---|---|---|---|
| Forecast Accuracy | **90.1%** | ≥ 85% | ✅ Above target | Demand forecasting improved significantly from Jan (79%) |
| Days of Supply | **39.1 days** | ≤ 45 days | ✅ Below target (good) | Inventory is lean and right-sized — down from 51.7 days in Jan |
| On-Time Delivery | **97.8%** | ≥ 95% | ✅ Above target | Almost all orders are arriving on time |
| Fill Rate | **98.1%** | ≥ 95% | ✅ Above target | Nearly all customer orders are being fully filled |
| Inv. Turnover | **8.1×** | ≥ 6.0× | ✅ Above target | Stock is turning over 8× per year — very efficient |
| Open Orders | **820** | (declining trend) | ✅ Improving | Backlog is shrinking — healthier pipeline |

**The Forecast Accuracy Trend Chart** shows all 4 product families improving over the year, with the target line at 85% visible as a red dashed line. Packaging Division is the top performer, Consumables Division started the year behind but caught up.

**The Demand vs. Supply Plan Chart** shows the monthly demand plan (what was planned to ship) versus actual shipments. The bars are close together, meaning supply and demand were well-aligned.

**The OTD & Fill Rate Chart** shows both lines climbing above the 95% target and staying there in the second half of the year.

**The S&OP Heatmap** is a quick visual scorecard. Each cell shows a monthly value. Green = at or above target. Yellow = within 5% of target. Red = below target. You can immediately see that early months (Jan-Feb) were mostly red/yellow, and later months (Sep-Dec) are mostly green — showing clear improvement.

---

### INVENTORY TAB

**DOS Trend by Product Family:**
- All 4 families started the year with high DOS (especially Beverages at 58.2 days and Consumables at 65.3 days)
- By December, all families are trending down:
  - Beverages: 40.3 days ✅
  - Food Items: 36.1 days ✅
  - Packaging: 30.5 days ✅
  - Consumables: 49.6 days (still slightly above 45-day target — needs attention)

**Inventory Value by Family ($M):**
- Retail is the highest value family (makes sense — it's the largest product line)
- Total inventory value also declined across the year, reflecting the DOS improvement
- This means the business freed up working capital (cash) by reducing excess inventory

**Top 30 Inventory Report:**
This is a key deliverable mentioned in the Emerson job description. It lists the 30 most valuable SKUs sorted by inventory value at risk.

- **At Risk** (red badge) = DOS > 60 days — these SKUs have too much stock and need immediate action (reduce PO, return to supplier, or push promotions)
  - BEV-A001: 78.3 days — highest risk
  - CSM-S010: 71.4 days
  - BEV-A002: 65.1 days
- **Monitor** (yellow badge) = DOS 45–60 days — watch closely week-over-week
- **Normal** (green badge) = DOS ≤ 45 days — no action needed

The "Recommended Action" column gives planners a starting point: Reduce PO, Review Forecast, Monitor Weekly, or On Plan.

---

### FORECAST TAB

**The 4 KPI cards** show each product family's December FA:
- Packaging: **94.1%** (best performer — consistent, predictable demand)
- Beverages: **88.9%** (above target, good)
- Food Items: **90.1%** (above target, strong finish after a slow start)
- Consumables: **87.3%** (just above target — consumable demand can vary with store volume and usage patterns)

**Forecast Accuracy by Family Trend:** Shows that all 4 families improved throughout 2024. This is the result of continuous review of forecast assumptions, better data, and closer collaboration between sales and planning.

**December FA vs. Target Bar Chart:** A quick visual for the current month — all bars reach above the 85% red dashed target line.

**Top Forecast Misses Table:** This is a root cause analysis (RCA) table showing the biggest gaps between planned and actual sales:

| Worst Miss | Variance | Why |
|---|---|---|
| FOD-X200 (Sep) | -21.5% | A new menu launch reduced demand for this item earlier than expected |
| BEV-C015 (Oct) | -18.2% | Seasonal demand drop — syrup sales slowed going into the cooler months |
| BEV-A002 (Nov) | -16.2% | The promotion ran earlier than planned so customers already bought before the forecast month |
| CSM-S088 (Dec) | -15.4% | Supplier delivery delay prevented full shipment even though demand was there |

**Why this matters in an interview:** Being able to explain why a forecast missed — not just by how much — shows analytical thinking. It shows you look for the root cause, not just the symptom.

---

### S&OP TAB

**Demand Plan vs. Actual Shipments with Variance %:**
The chart shows demand plan bars vs actual bars (very close = good alignment), plus a line showing the variance % on the right axis. Values hover between -2% and +1% — meaning supply and demand were almost always within 2% of each other, which is excellent performance.

**Overall DOS Trend:** The single combined line starts at 51.7 days (above the 45-day target) and falls to 39.1 days by December. This represents a successful inventory reduction program — the company reduced excess inventory without hurting service levels (OTD and fill rate both improved at the same time).

**Inventory Turnover by Family:**
- Packaging: best at 10.1× (very fast moving, lean inventory)
- Food Items: 8.7×
- Beverages: 7.9×
- Consumables: 5.7× (slowest — consumable usage rates vary and are harder to predict precisely)

**Full-Year S&OP Scorecard Heatmap:**
The most important chart for S&OP discussions. Reading across each row:
- **Forecast Accuracy:** Red in Jan-Feb (below 85%), green by June onwards
- **Days of Supply:** Red/yellow in Jan-May (over 45 days), green from July onwards
- **On-Time Delivery:** Red Jan-Feb, green from April onwards
- **Fill Rate:** Red-yellow Jan-Feb, green from March onwards
- **Demand Attainment:** Yellow-green throughout — mostly above 98% all year

**The story the heatmap tells:** H1 2024 (Jan-Jun) was a turnaround period. H2 2024 (Jul-Dec) shows sustained improvement across all KPIs. This is a business that made meaningful operational improvements during the year.

---

### SHIPMENTS TAB

**On-Time Delivery Trend:** Clear upward trend from 92.3% (Jan) to 97.8% (Dec). The red dashed target line at 95% shows the business crossed the target in April and maintained it.

**Fill Rate Trend:** Similar pattern — started below 95%, crossed the target in March, ended the year at 98.1%.

**Open Orders Trend:** Started at 1,240 in January and declined to 820 in December. This means fewer orders are waiting to be shipped. Lower backlog = healthier operations and faster customer satisfaction.

**December Shipment Status Donut:**
- Dec On-Time: 2,560 shipments
- Dec Early: 8 shipments
- Dec Late: 50 shipments
- Late Rate = 50 / 2,618 = **1.9%** (very healthy)

---

## PART 3: KEY INSIGHTS TO MENTION IN THE INTERVIEW

These are "analyst observations" — things you noticed in the data that show you can read beyond the numbers:

1. **"The business underwent a successful inventory optimization in 2024."** DOS dropped from 51.7 to 39.1 days (a 24% reduction) while OTD and fill rate both improved simultaneously. This is difficult to achieve — usually reducing inventory hurts service levels. It suggests the team did it by improving forecast accuracy first, then safely reducing safety stock.

2. **"Consumables are the most challenging segment to manage."** They have the lowest forecast accuracy (Consumables started at 70.2% vs Packaging at 88.4%) and the highest DOS by year-end (49.6 days vs Packaging at 30.5 days). This is typical for operational consumables — usage rates vary with store volume, seasonal peaks, and cleaning frequency, making them harder to forecast precisely.

3. **"Forecast improvement drove everything else."** When forecast accuracy goes up, planners can trust the numbers more, order more precisely, reduce buffer stock, and deliver more reliably. The 11.1 percentage point improvement in FA (79% to 90.1%) likely caused the improvements in DOS, OTD, and fill rate.

4. **"The Top 3 at-risk SKUs are all high-value, slow-moving items."** BEV-A001 ($245K, 78 DOS), CSM-S010 ($187K, 71 DOS), and BEV-A002 ($198K, 65 DOS) represent over $630K in inventory that is above the 45-day threshold. These need PO reduction or promotional push.

5. **"The biggest forecast miss had an external root cause, not an internal one."** FOD-X200's -21.5% miss in September was caused by a new menu launch that shifted customer preference — something that could have been caught earlier if the team monitored product lifecycle and menu change schedules more closely. This is an opportunity for process improvement.

6. **"By December, all 5 S&OP KPIs are green."** The heatmap shows a clear transition from red/yellow in H1 to green in H2. This is not accidental — it represents a deliberate improvement in the S&OP process.

---

## YOUR REAL STORY — HOW TO FRAME YOUR EXPERIENCE

When asked about your background, use this framing (without naming your employer):

> "In my previous role managing operations at a high-volume F&B retail chain, I was directly responsible for daily inventory management across 30+ product categories — beverages, food items, packaging, and operational consumables. I ran a twice-weekly ordering cycle with twice-weekly deliveries, which meant I was effectively forecasting 3 to 4 days of demand at a time, every time I placed an order.
>
> Every ordering cycle I reviewed current stock levels, estimated how much we would consume before the next delivery, and calculated reorder quantities to avoid both stockouts and overstocking. I adjusted my forecasts based on upcoming promotions, seasonal demand shifts, and day-of-week patterns — for example, ordering heavier going into a weekend or a holiday.
>
> This dashboard is my way of taking that operational experience and framing it at the S&OP level — showing that I understand not just the execution of ordering, but the analysis and reporting that supports supply chain decisions at scale."

**Key phrases you own (say these naturally):**
- "I ran a twice-weekly ordering and replenishment cycle"
- "I forecasted 3–4 days of demand per order cycle across 30+ SKUs"
- "I tracked consumption trends and adjusted reorder quantities to prevent stockouts and overstocking"
- "I identified demand patterns based on seasonality, promotions, and day-of-week trends"
- "This dashboard represents the analytical layer I would build on top of that kind of operational work"

**How your store-level experience maps to this dashboard:**

| Your Experience (Store Level) | This Dashboard (S&OP Level) |
|---|---|
| Ordering twice a week for one store | Monthly S&OP cycle for a regional distribution network |
| Forecasting 3–4 days of demand per order | 30-day demand plan per product family |
| Monitoring which items are running low | Days of Supply (DOS) tracking across 30 SKUs |
| Adjusting orders based on promotions | Forecast miss analysis with root cause (Promo Pull-forward, etc.) |
| Making sure shelves don't run out | Fill Rate and On-Time Delivery KPIs |
| Reducing waste from over-ordering | Inventory Turnover and DOS reduction trend |

The scale is different, but the logic is identical. You already think like a supply chain planner — this dashboard shows you can also visualize and communicate it like one.

---

## PART 4: POSSIBLE INTERVIEW QUESTIONS & HOW TO ANSWER THEM

---

### Q1: "Walk me through this dashboard."

**How to answer:**
> "This is a Supply Chain S&OP Performance Dashboard covering fiscal year 2024 for Metro Brew F&B Corp., with four product families — Beverages, Food Items, Packaging, and Consumables. The dashboard tracks five major KPIs: forecast accuracy, days of supply, on-time delivery, fill rate, and inventory turnover.
>
> At a high level, the story the data tells is one of improvement. The business started 2024 with most KPIs below target — forecast accuracy was around 79%, days of supply was 51.7 which is too high, and on-time delivery was 92.3% against a 95% target. By December, all KPIs are above their targets. Forecast accuracy reached 90.1%, days of supply came down to 39.1 days, and OTD is at 97.8%.
>
> I organized it into five tabs so different stakeholders can go straight to what they care about. A planning manager would use the Forecast tab, a warehouse manager would use the Inventory tab, and the S&OP tab gives leadership a full-year scorecard in one heatmap view."

---

### Q2: "What is S&OP and how did you use this dashboard to support it?"

**How to answer:**
> "S&OP stands for Sales and Operations Planning. It's a monthly process where sales, finance, operations, and supply chain teams get together to make sure the demand side — what we expect to sell — is aligned with the supply side — what we can actually produce and ship.
>
> This dashboard was designed to support that monthly S&OP cycle. Before the meeting, the planning team would use it to prepare: checking the forecast accuracy report to understand which product families had the biggest gaps, reviewing the Top 30 inventory report to flag any at-risk SKUs, and preparing the scorecard heatmap as a summary slide for leadership. During the meeting, the heatmap is a quick way to say 'here's where we stand on every KPI versus target, for every month of the year.'"

---

### Q3: "What is Days of Supply and why is 45 days the target?"

**How to answer:**
> "Days of Supply is how long current inventory will last at the current rate of sales. If I have 4,500 units in the warehouse and I sell 100 units per day, my DOS is 45 days.
>
> The target of 45 days is a balance. If DOS is too high — say 70 days — you're tying up too much cash in inventory, paying extra warehousing costs, and risking obsolescence if the product changes. If DOS is too low — say 10 days — you risk stockouts and missed customer orders.
>
> 45 days typically allows enough buffer for supplier lead time plus some safety stock, without being wasteful. In this dataset, the Retail family started the year at 58 days and the Parts family at 65 days — both too high. By December, Retail came down to 40 days but Parts is still at 49.6, which means it still needs attention."

---

### Q4: "What does inventory turnover mean and what does 8.1× tell you?"

**How to answer:**
> "Inventory turnover measures how many times a company sells through its entire inventory in a year. An 8.1× turnover means the company replaced its entire stock 8 times in 2024 — roughly every 45 days.
>
> Higher turnover is generally better because it means products aren't sitting in the warehouse collecting dust. It also means the company is converting inventory into cash faster.
>
> In this dashboard, the Industrial Division has the highest turnover at 10.1×, which makes sense — industrial products tend to have more predictable, steady demand. Service Parts has the lowest at 5.7× because those parts only move when something breaks, which is unpredictable."

---

### Q5: "Tell me about the Top 30 Inventory Report. What is it and why is it important?"

**How to answer:**
> "The Top 30 Inventory Report is a weekly or monthly report that lists the 30 most important SKUs by inventory value that are at risk of being overstocked or causing problems.
>
> I prioritize by value because not all SKUs are equal. A SKU worth $245,000 sitting in the warehouse for 78 days is a much bigger problem than a $5,000 SKU sitting for the same time. By focusing on the top 30 by value, the planning team can make the biggest impact with their limited time.
>
> In this report, I also added a recommended action column. For SKUs flagged At Risk, the action is to reduce the next purchase order or negotiate a return with the supplier. For Monitor SKUs, we review them weekly. This makes the report actionable, not just informational."

---

### Q6: "How do you handle a forecast miss? Walk me through your process."

**How to answer:**
> "First, I quantify the miss — how many units and what percentage variance. In this dashboard, the worst miss was PRO-X200 in September, which came in 21.5% below plan.
>
> Second, I identify the root cause. Was it internal — like a data entry error, a wrong assumption — or external, like a competitor launch or an unexpected market shift? PRO-X200's miss was caused by a competitor launching a similar product, which shifted demand away from our SKU.
>
> Third, I adjust the forecast for the next period. If demand shifted permanently to the competitor, I revise the forecast down. If it was a one-time event, I may not change the long-term assumption.
>
> Fourth, I document it in the forecast miss log — the table you see in the dashboard — so leadership and the sales team understand what happened. This also feeds into a pattern analysis: if the same root cause appears repeatedly, it's a signal to change the forecasting method or input assumptions."

---

### Q7: "You mentioned the data is anonymized — why? And how do we know the analysis is real?"

**How to answer:**
> "All data in this dashboard is entirely fictional — it was created specifically to demonstrate supply chain analytics and S&OP dashboarding skills. The simulated company, Metro Brew F&B Corp., does not exist. No real employer data was used.
>
> However, the experience behind this dashboard is real. I spent three years managing inventory in high-volume F&B retail operations. I ran a twice-weekly ordering cycle — placing orders and receiving deliveries twice a week — which meant I was forecasting 3 to 4 days of demand at a time, monitoring stock levels daily, and adjusting reorder quantities based on upcoming promotions, seasonal demand, and day-of-week patterns. This dashboard translates that operational experience into the kind of structured S&OP reporting and analysis that a senior analyst role requires. The DOS concept, the forecast accuracy framework, the Top 30 report, the scorecard — these map directly to the decisions I was already making at the store level, just at a much larger scale."

---

### Q8: "How did you build this dashboard? What tools did you use?"

**How to answer:**
> "I built this entirely in HTML, CSS, and JavaScript — no proprietary BI tool like Tableau or Power BI. I used Chart.js, which is a JavaScript charting library, for the line charts, bar charts, and the donut chart. The heatmap is built with custom HTML and CSS.
>
> I chose this approach specifically for a portfolio context because it can be deployed publicly on the web for free — a recruiter can just click a link and see it without needing any software installed. In a real work environment, I would normally use Power BI or Excel for internal dashboards, or Python with Pandas and Matplotlib for deeper analysis."

---

### Q9: "What would you do if forecast accuracy started declining?"

**How to answer:**
> "The first step is to understand where the decline is coming from. Is it one product family or all of them? Is it one region or a specific sales channel? The dashboard breaks FA down by family and by month, so I can quickly isolate the problem.
>
> Common causes of FA decline are: changes in customer buying patterns that the forecast model hasn't caught up to, new product launches where there's no historical data, or a sudden external event like a supply shortage or a competitor move.
>
> Once I identify the cause, I work with the sales team to update the market assumptions and with the planning team to adjust the statistical baseline. I'd also increase review frequency — instead of monthly, move to weekly check-ins for the affected SKUs until the accuracy stabilizes."

---

### Q10: "What is the most important insight from this dashboard?"

**How to answer:**
> "The most important insight is that improving forecast accuracy is the lever that drives everything else. When I look at the timeline in the S&OP heatmap, forecast accuracy was the first KPI to start improving, and the other KPIs — DOS, OTD, fill rate — followed a few months later.
>
> This makes intuitive sense: when planners trust the forecast, they order the right amount at the right time. That means less excess inventory, which brings DOS down. It also means fewer stockouts, which keeps fill rate and OTD high.
>
> If I were to recommend one area for a supply chain team to focus on, it would be forecast accuracy — it's the root driver of most other supply chain KPIs."

---

## PART 5: QUICK REFERENCE — NUMBERS TO MEMORIZE

These are the key numbers from the dashboard. Being able to cite them naturally in an interview makes a strong impression.

| What | Jan 2024 | Dec 2024 | Target | Change |
|---|---|---|---|---|
| Forecast Accuracy | 79.0% | 90.1% | 85% | +11.1 pp |
| Days of Supply | 51.7 days | 39.1 days | ≤45 days | -12.6 days |
| On-Time Delivery | 92.3% | 97.8% | 95% | +5.5 pp |
| Fill Rate | 94.2% | 98.1% | 95% | +3.9 pp |
| Inventory Turnover | 5.9× | 8.1× | 6.0× | +2.2× |
| Open Orders | 1,240 | 820 | Declining | -420 |

**Worst forecast miss:** FOD-X200, September, -21.5% (new menu launch impact)

**Highest risk SKU:** BEV-A001, 78.3 days of supply, $245K value

**Family with most stable forecast:** Packaging (88.4% in Jan, 94.1% in Dec)

**Family needing most attention:** Consumables (49.6 days DOS in Dec, still above 45-day target)

---

## PART 6: SUPPLY CHAIN BASICS — SHORT DEFINITIONS

In case the interviewer asks something more conceptual:

**What is a supply chain?**
The full process of getting a product from the manufacturer to the end customer — including sourcing raw materials, production, warehousing, transportation, and delivery.

**What is demand planning?**
Using historical sales data, market trends, and business knowledge to estimate how much of each product will be sold in a future period. The output is a demand forecast.

**What is safety stock?**
Extra inventory kept as a buffer against uncertainty — unexpected demand spikes or supply delays. Too much = wasted money. Too little = stockouts.

**What is a purchase order (PO)?**
An official document sent to a supplier saying "please send us X units of product Y at price Z." Reducing a PO means ordering less next time.

**What is obsolescence?**
When inventory becomes unsellable because the product is outdated, discontinued, or expired. High DOS items are at higher risk of obsolescence.

**What is lead time?**
The time between placing an order with a supplier and receiving the goods. If lead time is 30 days and DOS falls below 30 days, you risk a stockout.

**What is working capital?**
Money tied up in inventory, receivables, and payables. Reducing inventory (DOS) frees up working capital — cash the business can use for other things.

---

*This guide was created to support interview preparation for the Emerson Senior Analyst, Supply Chain role. All data in the dashboard is entirely fictional and was created solely to demonstrate supply chain analytics and S&OP dashboarding skills.*
