import {currentMember, memberDb} from '@/lib/memberAuth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const member = await currentMember();
  if (!member) return Response.json({message: 'Prijavite se za pristup profilu.'}, {status: 401});
  const {rows: orders} = await memberDb.query(
    `SELECT order_number,total,status,created_at,items FROM orders WHERE LOWER(customer_email)=LOWER($1) ORDER BY created_at DESC LIMIT 1`,
    [member.email]
  );
  return Response.json({member, lastOrder: orders[0] || null}, {headers: {'Cache-Control': 'private, no-store'}});
}

export async function PATCH(request) {
  const member = await currentMember();
  if (!member) return Response.json({message: 'Niste prijavljeni.'}, {status: 401});
  const b = await request.json();
  if (!b.name?.trim()) return Response.json({message: 'Ime je obavezno.'}, {status: 400});
  // E-mail se ne može mijenjati iz profila: nema verifikacije vlasništva nad novom adresom,
  // a narudžbe se vežu za e-mail.
  if (typeof b.email === 'string' && b.email.trim().toLowerCase() !== member.email.toLowerCase())
    return Response.json({message: 'E-mail adresu nije moguće promijeniti. Kontaktirajte nas za pomoć.'}, {status: 400});
  try {
    const {rows} = await memberDb.query(
      `UPDATE club_members SET name=$1,phone=$2,username=$3,birth_date=$4,newsletter=$5 WHERE id=$6
       RETURNING id,name,email,phone,username,birth_date,newsletter,created_at`,
      [b.name.trim(), b.phone?.trim() || null, b.username?.trim() || null, b.birthDate || null, !!b.newsletter, member.id]
    );
    return Response.json({member: rows[0], message: 'Izmjene su sačuvane.'});
  } catch (e) {
    if (e.code === '23505') return Response.json({message: 'Ovo korisničko ime već postoji.'}, {status: 409});
    return Response.json({message: 'Izmjene trenutno nije moguće sačuvati.'}, {status: 500});
  }
}
