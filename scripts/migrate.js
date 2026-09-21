const { Client } = require('pg');

async function migrate() {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL nije postavljen');
  const client = new Client({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
  await client.connect();
  await client.query(`
    CREATE TABLE IF NOT EXISTS club_members (
      id BIGSERIAL PRIMARY KEY,
      email VARCHAR(320) UNIQUE NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
  await client.end();
  console.log('Migracije završene.');
}

migrate().catch((error) => { console.error(error); process.exit(1); });
