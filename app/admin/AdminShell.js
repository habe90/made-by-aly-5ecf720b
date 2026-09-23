'use client';
import { usePathname } from 'next/navigation';
import './admin.css';

const links=[['⌂','Pregled','/admin'],['♧','Proizvodi','/admin/proizvodi'],['◇','Narudžbe','#'],['♙','ALY članice','/admin/clanice'],['▤','Sadržaj','#'],['✉','Newsletter','/admin/newsletter'],['⚙','Postavke','/admin/postavke']];
export default function AdminShell({children}){const path=usePathname();return <div className={`adm ${path==='/admin'?'dashboardShell':''}`}><aside className="admSide"><div className="admLogo">MADE BY ALY<small>Administracija</small></div><nav>{links.map(([i,l,h])=><a key={l} href={h} className={(h!=='/admin'&&path.startsWith(h))||(h==='/admin'&&path===h)?'on':''}><i>{i}</i>{l}</a>)}</nav><div className="admSideFoot"><span>Demo podaci</span><hr/><b>MADE BY ALY</b><p>Ljepota u skromnosti.</p><small>2026.</small></div></aside><section className="admMain"><header className="admTop"><label>⌕<input placeholder="Pretraži proizvode, narudžbe, članice..."/></label><div className="admUser"><i>♧</i><b>A</b><span>Admin<small>Super admin</small></span>⌄</div></header>{children}</section></div>}
