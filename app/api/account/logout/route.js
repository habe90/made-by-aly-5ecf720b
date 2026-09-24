import {cookies} from 'next/headers';import {memberDb} from '@/lib/memberAuth';
export async function POST(){const c=await cookies();const token=c.get('aly_session')?.value;if(token)await memberDb.query('DELETE FROM club_sessions WHERE token=$1',[token]);c.set('aly_session','',{path:'/',maxAge:0});return Response.json({ok:true})}
