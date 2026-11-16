import crypto from 'crypto';
import {cookies} from 'next/headers';
import {db, tokenHash, verifyPassword} from '@/lib/adminAuth';
import {clientIp, rateLimit, resetRateLimit, tooManyAttempts} from '@/lib/rateLimit';

export const runtime = 'nodejs';

export async function POST(req) {
  try {
    const {email, password} = await req.json();
    const normalized = typeof email === 'string' ? email.trim().toLowerCase() : '';
    const byIp = rateLimit(`staff-login-ip:${clientIp(req)}`, {limit: 20, windowMs: 15 * 60 * 1000});
    const byEmail = rateLimit(`staff-login:${normalized}`, {limit: 5, windowMs: 15 * 60 * 1000});
    if (!byIp.ok || !byEmail.ok) return tooManyAttempts(Math.max(byIp.retryAfter || 0, byEmail.retryAfter || 0));

    const {rows} = await db.query('SELECT id,name,email,role,password_hash,active FROM staff_users WHERE LOWER(email)=$1', [normalized]);
    const u = rows[0];
    if (!u || !u.active || !(await verifyPassword(String(password || ''), u.password_hash)))
      return Response.json({message: 'Pogrešan e-mail ili lozinka.'}, {status: 401});
    resetRateLimit(`staff-login:${normalized}`);

    const token = crypto.randomBytes(32).toString('hex');
    await db.query("INSERT INTO staff_sessions(token_hash,staff_id,expires_at) VALUES($1,$2,NOW()+INTERVAL '7 days')", [tokenHash(token), u.id]);
    await db.query('UPDATE staff_users SET last_login_at=NOW() WHERE id=$1', [u.id]);
    cookies().set('aly_staff_session', token, {httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 604800});
    return Response.json({name: u.name, role: u.role});
  } catch (e) {
    console.error(e);
    return Response.json({message: 'Prijava trenutno nije dostupna.'}, {status: 500});
  }
}
