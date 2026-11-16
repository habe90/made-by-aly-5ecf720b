import {requireStaff, db, hashPassword} from '@/lib/adminAuth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const ROLES = ['admin', 'worker'];

export async function GET() {
  const a = await requireStaff(['admin']);
  if (a.error) return a.error;
  const {rows} = await db.query('SELECT id,name,email,role,active,last_login_at,created_at FROM staff_users ORDER BY created_at');
  return Response.json(rows);
}

export async function POST(req) {
  const a = await requireStaff(['admin']);
  if (a.error) return a.error;
  try {
    const b = await req.json();
    if (!b.name || !b.email || !b.password || !ROLES.includes(b.role)) return Response.json({message: 'Popunite sva polja.'}, {status: 400});
    if (String(b.password).length < 8) return Response.json({message: 'Lozinka mora imati najmanje 8 znakova.'}, {status: 400});
    const hash = await hashPassword(String(b.password));
    const {rows} = await db.query(
      'INSERT INTO staff_users(name,email,password_hash,role) VALUES($1,LOWER($2),$3,$4) RETURNING id,name,email,role,active,created_at',
      [b.name, String(b.email).trim(), hash, b.role]
    );
    return Response.json(rows[0], {status: 201});
  } catch (e) {
    return Response.json({message: e.code === '23505' ? 'E-mail već postoji.' : 'Član tima nije kreiran.'}, {status: 400});
  }
}

export async function PATCH(req) {
  const a = await requireStaff(['admin']);
  if (a.error) return a.error;
  try {
    const b = await req.json();
    if (!b.name || !ROLES.includes(b.role)) return Response.json({message: 'Neispravni podaci.'}, {status: 400});
    const self = Number(b.id) === Number(a.user.id);
    if (self && b.active === false) return Response.json({message: 'Ne možete deaktivirati vlastiti nalog.'}, {status: 400});
    if (self && b.role !== 'admin') return Response.json({message: 'Ne možete sebi oduzeti administratorska prava.'}, {status: 400});
    const {rows} = await db.query(
      'UPDATE staff_users SET name=$1,role=$2,active=$3,updated_at=NOW() WHERE id=$4 RETURNING id,name,email,role,active,created_at',
      [b.name, b.role, b.active !== false, b.id]
    );
    if (!rows[0]) return Response.json({message: 'Član tima nije pronađen.'}, {status: 404});
    // Deaktiviranom članu odmah prekini sve sesije.
    if (!rows[0].active) await db.query('DELETE FROM staff_sessions WHERE staff_id=$1', [rows[0].id]);
    return Response.json(rows[0]);
  } catch (e) {
    return Response.json({message: 'Izmjene nisu sačuvane.'}, {status: 500});
  }
}
