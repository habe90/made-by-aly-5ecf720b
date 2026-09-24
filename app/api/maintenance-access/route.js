import {currentStaff,db} from '@/lib/adminAuth';
export const runtime='nodejs';export const dynamic='force-dynamic';
export async function GET(){try{const [{rows},staff]=await Promise.all([db.query('SELECT data FROM admin_settings WHERE id=1'),currentStaff()]);const maintenance=Boolean(rows[0]?.data?.maintenance);return Response.json({maintenance,admin:staff?.role==='admin'},{headers:{'Cache-Control':'private, no-store, max-age=0'}})}catch{return Response.json({maintenance:false,admin:false},{headers:{'Cache-Control':'no-store'}})}}
