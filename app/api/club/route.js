import { Pool } from 'pg';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

export async function POST(request) {
  try {
    const { email } = await request.json();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return Response.json({ message: 'Unesite ispravnu e-mail adresu.' }, { status: 400 });
    }
    await pool.query('INSERT INTO club_members (email) VALUES ($1) ON CONFLICT (email) DO NOTHING', [email.toLowerCase()]);
    return Response.json({ message: 'Dobro došli u ALY CLUB.' });
  } catch (error) {
    console.error(error);
    return Response.json({ message: 'Pokušajte ponovo za nekoliko trenutaka.' }, { status: 500 });
  }
}
