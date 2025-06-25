const { Pool } = require('pg');

// Debug logging
console.log('Database config:');
console.log('User:', process.env.DATABASE_USER);
console.log('Host:', process.env.DATABASE_HOST);
console.log('Port:', process.env.DATABASE_PORT);
console.log('Database:', process.env.DATABASE_NAME);
console.log('Password type:', typeof process.env.DATABASE_PASSWORD);
console.log('Password length:', process.env.DATABASE_PASSWORD ? process.env.DATABASE_PASSWORD.length : 'undefined');

const pool = new Pool({
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Test connection
pool.on('connect', () => {
  console.log('📦 Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('💥 Database connection error:', err);
});

module.exports = pool;