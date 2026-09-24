import {cookies} from 'next/headers';
import {Pool} from 'pg';
export const memberDb=new Pool({connectionString:process.env.DATABASE_URL});
export async function currentMember(){const token=(await cookies()).get('aly_session')?.value;if(!token)return null;const {rows}=await memberDb.query(`SELECT m.id,m.name,m.email,m.phone,m.city,m.country,m.instagram,m.newsletter,m.created_at,m.username,m.birth_date FROM club_sessions s JOIN club_members m ON m.id=s.member_id WHERE s.token=$1 AND s.expires_at>NOW() AND m.active=TRUE LIMIT 1`,[token]);return rows[0]||null}
