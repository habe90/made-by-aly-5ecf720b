import {db} from '@/lib/db';
import {DEFAULT_INSTAGRAM_URL} from '@/lib/instagram';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// /instagram → link Instagram profila iz admin postavki.
export async function GET() {
  let url = DEFAULT_INSTAGRAM_URL;
  try {
    const {rows} = await db.query('SELECT data FROM admin_settings WHERE id=1');
    const configured = rows[0]?.data?.instagram_url;
    if (typeof configured === 'string' && /^https:\/\/(www\.)?instagram\.com\//.test(configured)) url = configured;
  } catch {}
  return Response.redirect(url, 302);
}
