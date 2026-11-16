import {randomBytes} from 'crypto';
import {db} from '@/lib/db';
import {MEMBER_COOKIE, memberTokenHash, verifyMemberPassword} from '@/lib/memberAuth';
import {clientIp, rateLimit, resetRateLimit, tooManyAttempts} from '@/lib/rateLimit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const {email: rawEmail, password, remember} = await request.json();
    const email = typeof rawEmail === 'string' ? rawEmail.trim().toLowerCase() : '';
    if (!email || !password) return Response.json({message: 'Unesite e-mail adresu i lozinku.'}, {status: 400});

    const ip = clientIp(request);
    const byIp = rateLimit(`member-login-ip:${ip}`, {limit: 30, windowMs: 15 * 60 * 1000});
    const byEmail = rateLimit(`member-login:${email}`, {limit: 8, windowMs: 15 * 60 * 1000});
    if (!byIp.ok || !byEmail.ok) return tooManyAttempts(Math.max(byIp.retryAfter || 0, byEmail.retryAfter || 0));

    const result = await db.query('SELECT id, name, email, password_hash FROM club_members WHERE email = $1 AND active = TRUE LIMIT 1', [email]);
    const member = result.rows[0];
    if (!member || !(await verifyMemberPassword(String(password), member.password_hash))) return Response.json({message: 'E-mail adresa ili lozinka nisu ispravni.'}, {status: 401});
    resetRateLimit(`member-login:${email}`);

    const token = randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + (remember ? 30 : 1) * 24 * 60 * 60 * 1000);
    await db.query('INSERT INTO club_sessions (token, member_id, expires_at) VALUES ($1, $2, $3)', [memberTokenHash(token), member.id, expiresAt]);
    return Response.json({message: 'Dobro došla nazad.', name: member.name}, {
      headers: {'Set-Cookie': `${MEMBER_COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Expires=${expiresAt.toUTCString()}`}
    });
  } catch (error) {
    console.error(error);
    return Response.json({message: 'Prijava trenutno nije dostupna. Pokušajte ponovo.'}, {status: 500});
  }
}
