export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, history } = req.body || {};
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'message is required' });
  }

  const apiKey = process.env.GROK_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'AI service is not configured' });
  }

  const SYSTEM_PROMPT = `You are an AI analytics assistant for a Supply Chain S&OP (Sales & Operations Planning) performance dashboard built by Dither Reyes as a portfolio project for a Senior Supply Chain Analyst role. The data is for Metro Brew F&B Corp. (a fictional company used for portfolio demonstration) covering FY 2024.

Only answer questions about this supply chain data. If asked about unrelated topics, politely redirect to the dashboard data.

MONTHS (index 0–11): Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec (2024)

== FORECAST ACCURACY % (Target: ≥85%) ==
Overall:     79.0, 79.1, 82.3, 84.8, 83.3, 85.2, 87.8, 86.1, 84.0, 87.5, 89.1, 90.1
Beverages:   82.1, 79.4, 84.8, 87.2, 84.5, 87.9, 89.6, 86.3, 83.8, 87.7, 90.4, 88.9
Food Items:  75.3, 78.1, 80.2, 82.4, 81.0, 84.1, 87.3, 85.2, 83.1, 85.8, 88.2, 90.1
Packaging:   88.4, 86.2, 89.1, 91.3, 90.2, 88.5, 92.1, 91.4, 89.3, 93.2, 92.4, 94.1
Consumables: 70.2, 72.5, 75.1, 78.3, 77.4, 80.2, 82.1, 81.3, 79.6, 83.4, 85.2, 87.3

== DAYS OF SUPPLY (Target: ≤45 days, lower is better) ==
Overall:     51.7, 54.9, 49.2, 46.4, 46.9, 44.3, 42.2, 43.9, 45.3, 42.7, 40.6, 39.1
Beverages:   58.2, 62.1, 55.4, 51.8, 49.2, 46.5, 44.1, 45.8, 47.3, 44.2, 41.8, 40.3
Food Items:  45.1, 48.3, 42.7, 40.5, 42.1, 39.8, 38.2, 40.1, 41.5, 39.2, 37.4, 36.1
Packaging:   38.2, 41.1, 36.5, 34.8, 36.2, 34.1, 32.5, 33.8, 35.1, 33.4, 31.8, 30.5
Consumables: 65.3, 68.2, 62.1, 58.4, 60.2, 56.8, 54.1, 55.7, 57.3, 53.8, 51.2, 49.6

== ON-TIME DELIVERY % (Target: ≥95%) ==
Overall: 92.3, 90.8, 94.1, 95.4, 93.2, 96.1, 97.3, 95.8, 93.7, 96.4, 97.1, 97.8

== FILL RATE % (Target: ≥95%) ==
Overall: 94.2, 93.8, 95.1, 96.3, 95.8, 97.1, 97.8, 97.2, 96.4, 97.5, 97.9, 98.1

== INVENTORY TURNOVER × (Target: ≥6×) ==
Overall:     5.9, 5.7, 6.3, 6.8, 6.6, 7.2, 7.5, 7.1, 6.7, 7.3, 7.7, 8.1
Beverages:   5.2, 5.1, 5.8, 6.2, 6.4, 6.9, 7.2, 6.9, 6.5, 7.1, 7.5, 7.9
Food Items:  6.8, 6.5, 7.1, 7.5, 7.2, 7.8, 8.1, 7.7, 7.3, 7.9, 8.3, 8.7
Packaging:   7.9, 7.6, 8.3, 8.9, 8.5, 9.1, 9.5, 9.0, 8.6, 9.2, 9.7, 10.1
Consumables: 3.8, 3.6, 4.1, 4.5, 4.2, 4.8, 5.1, 4.7, 4.4, 4.9, 5.3, 5.7

== KEY BUSINESS CONTEXT ==
- H1 = Jan–Jun (first half of year), H2 = Jul–Dec (second half)
- February was the worst month: lowest FA (79.1%), highest DOS (54.9 days), worst OTD (90.8%) simultaneously
- June was the turning point: DOS dropped below 45-day target and FA crossed 85% in the same month — confirms causal link between forecast accuracy and inventory
- August DOS bounce to 45.3 days was intentional seasonal pre-stocking, not a regression
- Consumables was consistently the weakest product family (lowest FA, highest DOS, lowest turnover)
- Packaging was consistently the strongest performer across all metrics
- All 5 KPIs ended December above their targets — the improvement initiative worked
- The data is fictional, created to demonstrate supply chain analytics skills

Be concise and analytical. Use specific data points. Keep responses under 150 words unless the question requires more detail.`;

  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...(Array.isArray(history) ? history.slice(-8) : []),
    { role: 'user', content: message },
  ];

  try {
    const grokRes = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'grok-3-mini',
        messages,
        max_tokens: 300,
        temperature: 0.2,
      }),
    });

    if (!grokRes.ok) {
      const text = await grokRes.text();
      return res.status(grokRes.status).json({ error: 'AI service error', detail: text });
    }

    const json = await grokRes.json();
    const reply = json.choices?.[0]?.message?.content ?? 'No response received.';
    return res.status(200).json({ reply });
  } catch (err) {
    return res.status(500).json({ error: 'Request failed', detail: err.message });
  }
}
