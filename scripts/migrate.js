const { Client } = require('pg');
async function migrate(){
  if(!process.env.DATABASE_URL) throw new Error('DATABASE_URL nije postavljen');
  const client=new Client({connectionString:process.env.DATABASE_URL}); await client.connect();
  await client.query(`CREATE TABLE IF NOT EXISTS club_members (id BIGSERIAL PRIMARY KEY,email VARCHAR(320) UNIQUE NOT NULL,created_at TIMESTAMPTZ NOT NULL DEFAULT NOW());
    ALTER TABLE club_members ADD COLUMN IF NOT EXISTS name VARCHAR(160);
    ALTER TABLE club_members ADD COLUMN IF NOT EXISTS phone VARCHAR(60);
    ALTER TABLE club_members ADD COLUMN IF NOT EXISTS instagram VARCHAR(100);
    ALTER TABLE club_members ADD COLUMN IF NOT EXISTS city VARCHAR(120);
    ALTER TABLE club_members ADD COLUMN IF NOT EXISTS country VARCHAR(120);
    ALTER TABLE club_members ADD COLUMN IF NOT EXISTS password_hash TEXT;
    ALTER TABLE club_members ADD COLUMN IF NOT EXISTS newsletter BOOLEAN NOT NULL DEFAULT FALSE;
    ALTER TABLE club_members ADD COLUMN IF NOT EXISTS terms_accepted_at TIMESTAMPTZ;`);
  await client.end(); console.log('Migracije završene.');
}
migrate().catch(error=>{console.error(error);process.exit(1)});
