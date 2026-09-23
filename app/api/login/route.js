import { Pool } from 'pg';
import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

function verifyPassword(password, stored) {
  if (!stored || !stored.includes(':')) return false;
  const [hash, salt] = stored.split(':');
  const candidate = scryptSync(password, salt, 64);
  const saved = Buffer.from(hash, 'hex');
  return candidate.length === saved.length && timingSafeEqual(candidate, saved);
}

export async function POST(request) {
  try {
    const { email: rawEmail, password, remember } = await request.json();
    const email = rawEmail?.trim().toLowerCase();
    if (!email || !password) return Response.json({ message: 'Unesite e-mail adresu i lozinku.' }, { status: 400 });
    const result = await pool.query('SELECT id, name, email, password_hash FROM club_members WHERE email = $1 LIMIT 1', [email]);
    const member = result.rows[0];
    if (!member || !verifyPassword(password, member.password_hash)) return Response.json({ message: 'E-mail adresa ili lozinka nisu ispravni.' }, { status: 401 });

    const token = randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + (remember ? 30 : 1) * 24 * 60 * 60 * 1000);
    await pool.query('INSERT INTO club_sessions (token, member_id, expires_at) VALUES ($1, $2, $3)', [token, member.id, expiresAt]);
    return Response.json({ message: 'Dobro došla nazad.', name: member.name }, {
      headers: { 'Set-Cookie': `aly_session=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Expires=${expiresAt.toUTCString()}` }
    });
  } catch (error) {
    console.error(error);
    return Response.json({ message: 'Prijava trenutno nije dostupna. Pokušajte ponovo.' }, { status: 500 });
  }
}
