import {requireStaff, db} from '@/lib/adminAuth';
import {clearInstagramCache} from '@/lib/instagram';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const a = await requireStaff(['admin']);
  if (a.error) return a.error;
  try {
    const {rows} = await db.query('SELECT data FROM admin_settings WHERE id=1');
    return Response.json(rows[0]?.data || {});
  } catch (e) {
    return Response.json({message: 'Postavke nisu učitane.'}, {status: 500});
  }
}

export async function PUT(req) {
  const a = await requireStaff(['admin']);
  if (a.error) return a.error;
  try {
    const data = await req.json();
    const {rows} = await db.query('SELECT data FROM admin_settings WHERE id=1');
    const old = rows[0]?.data || {};
    if (typeof data.instagram_token === 'string') data.instagram_token = data.instagram_token.trim();
    // Novi Instagram token: počni brojati period obnove od sada.
    if (data.instagram_token !== old.instagram_token) data.instagram_token_refreshed_at = new Date().toISOString();
    await db.query(
      `INSERT INTO admin_settings(id,data,updated_at) VALUES(1,$1,NOW()) ON CONFLICT(id) DO UPDATE SET data=EXCLUDED.data,updated_at=NOW()`,
      [data]
    );
    if (data.instagram_token !== old.instagram_token || data.instagram_url !== old.instagram_url) clearInstagramCache();
    return Response.json(data);
  } catch (e) {
    return Response.json({message: 'Postavke nisu sačuvane.'}, {status: 500});
  }
}
