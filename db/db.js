const { drizzle } = require("drizzle-orm/node-postgres");
const { Pool } = require("pg");
require("dotenv").config(); // Load .env variables

// Create a PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Use your Neon PostgreSQL URL
});

const db = drizzle(pool);

module.exports = { db };
