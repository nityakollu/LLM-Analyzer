// utils/ollama.js
// Use the global fetch available in modern Node versions.
// If running on older Node (<18), install node-fetch and uncomment the next line.
// import fetch from 'node-fetch';

const OLLAMA_BASE = process.env.OLLAMA_BASE || 'http://localhost:11434';
const MODEL = process.env.OLLAMA_MODEL || 'llama3'; // change to your available model name

async function analyzeWithOllama(text){
  // craft a strict prompt requesting ONLY JSON
  const prompt = `
You are an assistant. Given the text between triple backticks, produce ONLY valid JSON with exactly two keys:
- "summary": short 1-3 sentence summary.
- "sentiment": must be one of "Positive", "Negative", or "Neutral".

Text:
\`\`\`
${text.replace(/`/g, "'")}
\`\`\`

Return ONLY JSON, for example:
{"summary":"...","sentiment":"Neutral"}
`;

  const body = {
    model: MODEL,
    prompt,
    temperature: 0.1,
    max_tokens: 300,
    format: 'json',
    stream: false
  };

  const res = await fetch(`${OLLAMA_BASE}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if(!res.ok){
    const txt = await res.text();
    throw new Error('Ollama error: ' + txt);
  }

  const j = await res.json();  // { response: "{...}" , ... }
  let inner;
  try {
    inner = typeof j.response === 'string' ? JSON.parse(j.response) : j.response;
  } catch(e){
    console.error('Failed parsing inner response field:', j);
    throw e;
  }

  const summary   = inner.summary ?? inner.Summary ?? inner.SUMMARY;
  const sentiment = inner.sentiment ?? inner.Sentiment ?? inner.SENTIMENT;

  if(!summary || !sentiment){
    console.error('Inner JSON missing fields:', inner);
    throw new Error('Model JSON missing fields');
  }
  return { summary, sentiment };
}

module.exports = { analyzeWithOllama };
