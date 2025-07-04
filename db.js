require('dotenv').config({ path: './.env' });
const { Pool } = require('pg');

console.log('Connecting to DB:', process.env.REDFOX_DB_URL);

const pool = new Pool({
  connectionString: process.env.REDFOX_DB_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
