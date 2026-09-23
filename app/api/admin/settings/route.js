import {Pool} from 'pg';
export const runtime='nodejs';export const dynamic='force-dynamic';const pool=new Pool({connectionString:process.env.DATABASE_URL});
export async function GET(){try{const {rows}=await pool.query('SELECT data FROM admin_settings WHERE id=1');return Response.json(rows[0]?.data||{})}catch(e){return Response.json({message:'Postavke nisu učitane.'},{status:500})}}
export async function PUT(req){try{const data=await req.json();await pool.query(`INSERT INTO admin_settings(id,data,updated_at) VALUES(1,$1,NOW()) ON CONFLICT(id) DO UPDATE SET data=EXCLUDED.data,updated_at=NOW()`,[data]);return Response.json(data)}catch(e){console.error(e);return Response.json({message:'Postavke nisu sačuvane.'},{status:500})}}
