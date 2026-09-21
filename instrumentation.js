export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs' || !process.env.DATABASE_URL) return;

  const { Client } = await import('pg');
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  });

  try {
    await client.connect();
    await client.query(`
      CREATE TABLE IF NOT EXISTS club_members (
        id BIGSERIAL PRIMARY KEY,
        email VARCHAR(320) UNIQUE NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);
    console.log('Database migration completed.');
  } finally {
    await client.end();
  }
}
