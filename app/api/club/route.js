import {db} from '@/lib/db';
import {hashMemberPassword} from '@/lib/memberAuth';
import {clientIp, rateLimit, tooManyAttempts} from '@/lib/rateLimit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const body = await request.json();
    const email = body.email?.trim().toLowerCase();
    if (!email || email.length > 320 || !/^\S+@\S+\.\S+$/.test(email)) return Response.json({message: 'Unesite ispravnu e-mail adresu.'}, {status: 400});

    const limit = rateLimit(`club:${clientIp(request)}`, {limit: 10, windowMs: 60 * 60 * 1000});
    if (!limit.ok) return tooManyAttempts(limit.retryAfter);

    if (!body.name) {
      await db.query('INSERT INTO club_members (email) VALUES ($1) ON CONFLICT (email) DO NOTHING', [email]);
      return Response.json({message: 'Dobro došli u ALY CLUB.'});
    }
    if (!body.phone || !body.city || !body.country) return Response.json({message: 'Popunite sva obavezna polja.'}, {status: 400});
    if (!body.terms) return Response.json({message: 'Potrebno je prihvatiti uslove korištenja.'}, {status: 400});
    if (typeof body.password !== 'string' || body.password.length < 8) return Response.json({message: 'Lozinka mora imati najmanje 8 znakova.'}, {status: 400});
    if (body.password.length > 200) return Response.json({message: 'Lozinka je predugačka.'}, {status: 400});
    if (body.password !== body.confirmPassword) return Response.json({message: 'Lozinke se ne podudaraju.'}, {status: 400});

    const passwordHash = await hashMemberPassword(body.password);
    // Postojeći red se smije dopuniti samo ako još nema lozinku (npr. prijava samo na newsletter).
    // Nalog koji već ima lozinku se NIKAD ne prepisuje.
    const result = await db.query(
      `INSERT INTO club_members (email,name,phone,instagram,city,country,password_hash,newsletter,terms_accepted_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,NOW())
       ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name,phone=EXCLUDED.phone,instagram=EXCLUDED.instagram,city=EXCLUDED.city,
         country=EXCLUDED.country,password_hash=EXCLUDED.password_hash,newsletter=EXCLUDED.newsletter,terms_accepted_at=NOW()
       WHERE club_members.password_hash IS NULL`,
      [email, String(body.name).trim(), String(body.phone).trim(), body.instagram?.trim() || null, String(body.city).trim(), body.country, passwordHash, !!body.newsletter]
    );
    if (result.rowCount === 0) return Response.json({message: 'Ovaj e-mail je već registrovan. Prijavite se ili koristite drugu adresu.'}, {status: 409});
    return Response.json({message: 'Dobro došla u ALY CLUB.'});
  } catch (error) {
    console.error(error);
    return Response.json({message: 'Pokušajte ponovo za nekoliko trenutaka.'}, {status: 500});
  }
}
