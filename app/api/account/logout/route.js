import {cookies} from 'next/headers';
import {memberDb, memberTokenHash, MEMBER_COOKIE} from '@/lib/memberAuth';

export const runtime = 'nodejs';

export async function POST() {
  const c = cookies();
  const token = c.get(MEMBER_COOKIE)?.value;
  if (token) await memberDb.query('DELETE FROM club_sessions WHERE token=$1', [memberTokenHash(token)]);
  c.set(MEMBER_COOKIE, '', {path: '/', maxAge: 0});
  return Response.json({ok: true});
}
