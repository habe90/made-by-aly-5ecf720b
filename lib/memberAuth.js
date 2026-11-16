import {cookies} from 'next/headers';
import crypto from 'crypto';
import {db} from './db';

export const memberDb = db;
export const MEMBER_COOKIE = 'aly_session';

// U bazi se čuva samo SHA-256 hash tokena, nikad sam token.
export const memberTokenHash = t => crypto.createHash('sha256').update(t).digest('hex');

export async function currentMember() {
  const token = cookies().get(MEMBER_COOKIE)?.value;
  if (!token) return null;
  const {rows} = await db.query(
    `SELECT m.id,m.name,m.email,m.phone,m.city,m.country,m.instagram,m.newsletter,m.created_at,m.username,m.birth_date
     FROM club_sessions s JOIN club_members m ON m.id=s.member_id
     WHERE s.token=$1 AND s.expires_at>NOW() AND m.active=TRUE LIMIT 1`,
    [memberTokenHash(token)]
  );
  return rows[0] || null;
}

// Format lozinki članica: "hash:salt" (zadržan zbog postojećih naloga).
export function hashMemberPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  return new Promise((resolve, reject) =>
    crypto.scrypt(password, salt, 64, (e, key) => (e ? reject(e) : resolve(`${key.toString('hex')}:${salt}`)))
  );
}

export async function verifyMemberPassword(password, stored) {
  if (!stored || !stored.includes(':') || typeof password !== 'string') return false;
  const [hash, salt] = stored.split(':');
  const candidate = await new Promise((resolve, reject) =>
    crypto.scrypt(password, salt, 64, (e, key) => (e ? reject(e) : resolve(key)))
  );
  const saved = Buffer.from(hash, 'hex');
  return candidate.length === saved.length && crypto.timingSafeEqual(candidate, saved);
}
