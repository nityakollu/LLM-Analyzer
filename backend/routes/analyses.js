// routes/analyses.js
const express = require('express');
const fs = require('fs-extra');
const path = require('path');
const { authenticate, requireRole } = require('../middleware/authMiddleware');
const { analyzeWithOllama } = require('../utils/ollama');

const router = express.Router();
const DATA_FILE = path.join(__dirname, '..', 'data', 'analyses.json');

async function readData(){
  await fs.ensureFile(DATA_FILE);
  const arr = await fs.readJson(DATA_FILE).catch(()=>[]);
  return arr || [];
}
async function writeData(arr){ await fs.writeJson(DATA_FILE, arr, { spaces: 2 }); }

router.get('/', authenticate, async (req, res) => {
  const data = await readData();
  res.json(data);
});

router.post('/', authenticate, requireRole('writer'), async (req, res) => {
  const { text } = req.body;
  if(!text) return res.status(400).json({ message: 'No text provided' });

  try {
    const analysis = await analyzeWithOllama(text);
    const entry = {
      id: Date.now(),
      text,
      summary: analysis.summary,
      sentiment: analysis.sentiment,
      createdAt: new Date().toISOString(),
      createdBy: req.user.username
    };
    const arr = await readData();
    arr.unshift(entry);
    await writeData(arr);
    res.json(entry);
  } catch (err) {
    console.error('Analysis failed:', err);
    res.status(500).json({ message: 'Analysis failed', detail: err.message });
  }
});

module.exports = router;
