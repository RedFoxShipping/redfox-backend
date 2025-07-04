const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Test route to check DB
app.get('/test-db', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()');
    res.json({ success: true, time: result.rows[0] });
  } catch (error) {
    res.json({ success: false, error: error.message, details: error.stack });
  }
});

// 🔥 Your new webhook route goes here
app.post('/webhook', express.json(), (req, res) => {
  console.log('Incoming WhatsApp message:', req.body);

  // Respond back to Gupshup
  res.status(200).json({ success: true });
});

// Start server
app.listen(PORT, () => {
  console.log(`🦊 Redfox Courier API running on port ${PORT}`);
});

