import {NextResponse} from 'next/server';
export async function middleware(request){const {pathname}=request.nextUrl;if(pathname==='/coming-soon'||pathname.startsWith('/admin')||pathname.startsWith('/staff-login')||pathname.startsWith('/api')||pathname.startsWith('/_next'))return NextResponse.next();try{const url=new URL('/api/site-settings',request.url);const r=await fetch(url,{cache:'no-store'});const s=await r.json();if(s.maintenance)return NextResponse.redirect(new URL('/coming-soon',request.url))}catch{}return NextResponse.next()}
export const config={matcher:['/((?!.*\\..*).*)']};
