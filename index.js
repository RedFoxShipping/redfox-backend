// index.js
require('dotenv').config({ path: './.env' });
const express = require('express');
const db = require('./db');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('🦊 Welcome to Redfox Courier API!');
});

app.get('/test-db', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()');
    res.json({ success: true, data: result.rows });
  } catch (err) {
    console.error('🔥 FULL ERROR:', err);
    res.status(500).json({
      success: false,
      error: err.message || 'Unknown error',
      details: err.stack,
    });
  }
});

app.listen(port, () => {
  console.log(`🦊 Redfox Courier API running on port ${port}`);
});
