import { Pool } from 'pg';
import { randomBytes, scryptSync } from 'crypto';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function POST(request) {
  try {
    const body = await request.json();
    const email = body.email?.trim().toLowerCase();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) return Response.json({ message:'Unesite ispravnu e-mail adresu.' },{status:400});
    if (!body.name) {
      await pool.query('INSERT INTO club_members (email) VALUES ($1) ON CONFLICT (email) DO NOTHING',[email]);
      return Response.json({ message:'Dobro došli u ALY CLUB.' });
    }
    if (!body.phone || !body.city || !body.country) return Response.json({message:'Popunite sva obavezna polja.'},{status:400});
    if (!body.terms) return Response.json({message:'Potrebno je prihvatiti uslove korištenja.'},{status:400});
    if (!body.password || body.password.length < 8) return Response.json({message:'Lozinka mora imati najmanje 8 znakova.'},{status:400});
    if (body.password !== body.confirmPassword) return Response.json({message:'Lozinke se ne podudaraju.'},{status:400});
    const salt=randomBytes(16).toString('hex'); const passwordHash=scryptSync(body.password,salt,64).toString('hex')+':'+salt;
    await pool.query(`INSERT INTO club_members (email,name,phone,instagram,city,country,password_hash,newsletter,terms_accepted_at)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,NOW())
      ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name,phone=EXCLUDED.phone,instagram=EXCLUDED.instagram,city=EXCLUDED.city,country=EXCLUDED.country,password_hash=EXCLUDED.password_hash,newsletter=EXCLUDED.newsletter,terms_accepted_at=NOW()`,
      [email,body.name.trim(),body.phone.trim(),body.instagram?.trim()||null,body.city.trim(),body.country,passwordHash,!!body.newsletter]);
    return Response.json({message:'Dobro došla u ALY CLUB.'});
  } catch(error){console.error(error);return Response.json({message:'Pokušajte ponovo za nekoliko trenutaka.'},{status:500});}
}
