import {cookies} from 'next/headers';
import crypto from 'crypto';
import {db} from './db';

export {db};
export const tokenHash = t => crypto.createHash('sha256').update(t).digest('hex');

export async function currentStaff() {
  const token = cookies().get('aly_staff_session')?.value;
  if (!token) return null;
  const {rows} = await db.query(
    `SELECT u.id,u.name,u.email,u.role,u.active FROM staff_sessions s JOIN staff_users u ON u.id=s.staff_id
     WHERE s.token_hash=$1 AND s.expires_at>NOW() AND u.active=TRUE`,
    [tokenHash(token)]
  );
  return rows[0] || null;
}

export async function requireStaff(roles = ['admin', 'worker']) {
  const user = await currentStaff();
  if (!user) return {error: Response.json({message: 'Potrebna je prijava.'}, {status: 401})};
  if (!roles.includes(user.role)) return {error: Response.json({message: 'Nemate dozvolu za ovu akciju.'}, {status: 403})};
  return {user};
}

// Format: "salt:hash"
export function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  return new Promise((resolve, reject) =>
    crypto.scrypt(password, salt, 64, (e, key) => (e ? reject(e) : resolve(`${salt}:${key.toString('hex')}`)))
  );
}

export async function verifyPassword(password, stored) {
  if (!stored || typeof password !== 'string') return false;
  const [salt, hex] = stored.split(':');
  if (!salt || !hex) return false;
  const actual = Buffer.from(await hashPassword(password, salt));
  const expected = Buffer.from(stored);
  return actual.length === expected.length && crypto.timingSafeEqual(actual, expected);
}
