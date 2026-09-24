import {db} from '@/lib/adminAuth';
export const runtime='nodejs';export const dynamic='force-dynamic';
export async function GET(){try{const {rows}=await db.query('SELECT data FROM admin_settings WHERE id=1');const d=rows[0]?.data||{};return Response.json({maintenance:Boolean(d.maintenance),shop_name:d.shop_name||'MADE BY ALY',logo:d.logo||'',favicon:d.favicon||''},{headers:{'Cache-Control':'no-store, no-cache, must-revalidate'}})}catch{return Response.json({maintenance:false,shop_name:'MADE BY ALY',logo:'',favicon:''})}}
