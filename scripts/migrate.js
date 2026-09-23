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
    ALTER TABLE club_members ADD COLUMN IF NOT EXISTS terms_accepted_at TIMESTAMPTZ;
    CREATE TABLE IF NOT EXISTS club_sessions (
      id BIGSERIAL PRIMARY KEY,
      token VARCHAR(128) UNIQUE NOT NULL,
      member_id BIGINT NOT NULL REFERENCES club_members(id) ON DELETE CASCADE,
      expires_at TIMESTAMPTZ NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE INDEX IF NOT EXISTS club_sessions_token_idx ON club_sessions(token);
    ALTER TABLE club_members ADD COLUMN IF NOT EXISTS active BOOLEAN NOT NULL DEFAULT TRUE;
    ALTER TABLE club_members ADD COLUMN IF NOT EXISTS note TEXT;
    CREATE TABLE IF NOT EXISTS products (
      id BIGSERIAL PRIMARY KEY,
      slug VARCHAR(180) UNIQUE NOT NULL,
      name VARCHAR(180) NOT NULL,
      price NUMERIC(10,2) NOT NULL DEFAULT 0,
      category VARCHAR(100), material VARCHAR(180), length VARCHAR(60),
      description TEXT, care TEXT, club_only BOOLEAN NOT NULL DEFAULT FALSE,
      early_access BOOLEAN NOT NULL DEFAULT FALSE, early_start DATE, early_end DATE,
      personalization BOOLEAN NOT NULL DEFAULT FALSE, status VARCHAR(40) NOT NULL DEFAULT 'Aktivan',
      stock JSONB NOT NULL DEFAULT '{}', colors JSONB NOT NULL DEFAULT '[]',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE TABLE IF NOT EXISTS admin_settings (
      id INTEGER PRIMARY KEY,
      data JSONB NOT NULL DEFAULT '{}',
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE TABLE IF NOT EXISTS staff_users (
      id BIGSERIAL PRIMARY KEY, name VARCHAR(160) NOT NULL, email VARCHAR(320) UNIQUE NOT NULL,
      password_hash TEXT NOT NULL, role VARCHAR(20) NOT NULL CHECK(role IN ('admin','worker')),
      active BOOLEAN NOT NULL DEFAULT TRUE, last_login_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE TABLE IF NOT EXISTS staff_sessions (
      id BIGSERIAL PRIMARY KEY, token_hash VARCHAR(64) UNIQUE NOT NULL,
      staff_id BIGINT NOT NULL REFERENCES staff_users(id) ON DELETE CASCADE,
      expires_at TIMESTAMPTZ NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE INDEX IF NOT EXISTS staff_sessions_token_idx ON staff_sessions(token_hash);
    CREATE TABLE IF NOT EXISTS orders (
      id BIGSERIAL PRIMARY KEY, order_number VARCHAR(40) UNIQUE NOT NULL,
      customer_name VARCHAR(160) NOT NULL, customer_email VARCHAR(320) NOT NULL, customer_phone VARCHAR(60),
      shipping_address JSONB NOT NULL DEFAULT '{}', items JSONB NOT NULL DEFAULT '[]',
      subtotal NUMERIC(10,2) NOT NULL DEFAULT 0, shipping NUMERIC(10,2) NOT NULL DEFAULT 0,
      total NUMERIC(10,2) NOT NULL DEFAULT 0, status VARCHAR(30) NOT NULL DEFAULT 'pending',
      payment_status VARCHAR(30) NOT NULL DEFAULT 'unpaid', payment_reference VARCHAR(160), note TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE TABLE IF NOT EXISTS newsletter_campaigns (
      id BIGSERIAL PRIMARY KEY, subject VARCHAR(240) NOT NULL, body TEXT NOT NULL,
      status VARCHAR(30) NOT NULL DEFAULT 'draft', created_by BIGINT REFERENCES staff_users(id) ON DELETE SET NULL,
      recipient_count INTEGER NOT NULL DEFAULT 0, delivered_count INTEGER NOT NULL DEFAULT 0,
      opened_count INTEGER NOT NULL DEFAULT 0, sent_at TIMESTAMPTZ, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    INSERT INTO products(slug,name,price,category,material,length,description,care,club_only,early_access,early_start,early_end,personalization,status,stock,colors)
    VALUES ('luna-haljina','Luna haljina',229,'Haljine','Mekani premium saten','145 cm','Luna haljina spaja eleganciju i skromnost u savršenoj ravnoteži.','Prati ručno ili na programu za osjetljive tkanine.',TRUE,TRUE,'2026-03-01','2026-03-15',TRUE,'Aktivan','{"XS":5,"S":8,"M":12,"L":9,"XL":4}','["Crna","Krem","Taupe"]') ON CONFLICT(slug) DO NOTHING;`);
  const crypto=require('crypto');
  const existing=await client.query('SELECT id FROM staff_users WHERE role=\'admin\' LIMIT 1');
  if(!existing.rows.length){const password=process.env.INITIAL_ADMIN_PASSWORD||crypto.randomBytes(12).toString('base64url');const salt=crypto.randomBytes(16).toString('hex');const key=await new Promise((resolve,reject)=>crypto.scrypt(password,salt,64,(e,k)=>e?reject(e):resolve(k)));await client.query(`INSERT INTO staff_users(name,email,password_hash,role) VALUES($1,$2,$3,'admin')`,[process.env.INITIAL_ADMIN_NAME||'Amina Admin',(process.env.INITIAL_ADMIN_EMAIL||'admin@madebyaly.com').toLowerCase(),`${salt}:${key.toString('hex')}`]);console.log(`Kreiran početni admin: ${process.env.INITIAL_ADMIN_EMAIL||'admin@madebyaly.com'}; lozinka: ${password}`)}
  await client.query(`CREATE TABLE IF NOT EXISTS app_meta (key VARCHAR(100) PRIMARY KEY, value TEXT, created_at TIMESTAMPTZ DEFAULT NOW())`);
  if(process.env.BOOTSTRAP_ADMIN_PASSWORD){const done=await client.query(`SELECT 1 FROM app_meta WHERE key='admin_password_bootstrapped_v1'`);if(!done.rows.length){const salt=crypto.randomBytes(16).toString('hex');const key=await new Promise((resolve,reject)=>crypto.scrypt(process.env.BOOTSTRAP_ADMIN_PASSWORD,salt,64,(e,k)=>e?reject(e):resolve(k)));await client.query(`UPDATE staff_users SET password_hash=$1,updated_at=NOW() WHERE email=$2`,[`${salt}:${key.toString('hex')}`,(process.env.INITIAL_ADMIN_EMAIL||'admin@madebyaly.com').toLowerCase()]);await client.query(`INSERT INTO app_meta(key,value) VALUES('admin_password_bootstrapped_v1','done')`);console.log('Početna admin lozinka je postavljena.')}}
  await client.query(`DELETE FROM staff_sessions WHERE expires_at<NOW()`);
  await client.end(); console.log('Migracije završene.');
}
migrate().catch(error=>{console.error(error);process.exit(1)});
